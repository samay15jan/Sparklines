import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { createReadStream, createWriteStream } from "fs";
import { createContainer } from "./dockerManager.js";
import wrtc from "wrtc";
import { execSync } from "child_process";
import Docker from "dockerode";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");

// Temp directory for FIFOs
const TEMP_DIR = "/tmp/sparklines-audio";
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

/* HTTP */

const app = express();
app.use(express.static(path.join(PROJECT_ROOT, "public")));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

/* AUDIO CONSTANTS */

const SAMPLE_RATE = 48000;
const CHANNELS = 2;
const BYTES_PER_SAMPLE = 2;
const FRAMES_PER_CHUNK = 480;
const CHUNK_BYTES = FRAMES_PER_CHUNK * CHANNELS * BYTES_PER_SAMPLE;

/* FIFO Management */

function createFifo(fifoPath) {
  try {
    if (fs.existsSync(fifoPath)) {
      fs.unlinkSync(fifoPath);
    }
    execSync(`mkfifo ${fifoPath}`);
    console.log(`[fifo] Created FIFO: ${fifoPath}`);
  } catch (err) {
    console.error(`[fifo] Error creating FIFO: ${err.message}`);
  }
}

function removeFifo(fifoPath) {
  try {
    if (fs.existsSync(fifoPath)) {
      fs.unlinkSync(fifoPath);
      console.log(`[fifo] Removed FIFO: ${fifoPath}`);
    }
  } catch (err) {
    console.error(`[fifo] Error removing FIFO: ${err.message}`);
  }
}

/* AUDIO PIPELINE */

async function startAudioPipeline(fifoPath, audioSource) {
  return new Promise((resolve, reject) => {

    const stream = createReadStream(fifoPath, { highWaterMark: 4096 });
    let pending = Buffer.alloc(0);
    let audioChunks = 0;

    stream.on("data", (chunk) => {
      pending = Buffer.concat([pending, chunk]);

      while (pending.length >= CHUNK_BYTES) {
        const slice = pending.slice(0, CHUNK_BYTES);
        pending = pending.slice(CHUNK_BYTES);
        audioChunks++;

        try {
          audioSource.onData({
            samples: new Int16Array(
              slice.buffer,
              slice.byteOffset,
              slice.byteLength / BYTES_PER_SAMPLE
            ),
            sampleRate: SAMPLE_RATE,
            bitsPerSample: 16,
            channelCount: CHANNELS,
            numberOfFrames: FRAMES_PER_CHUNK
          });
        } catch (err) {
          console.error("[audio] Error feeding audio data:", err.message);
        }
      }
    });

    stream.on("end", () => {
      console.log(`[audio] FIFO stream ended. Total chunks: ${audioChunks}`);
    });

    stream.on("error", (err) => {
      console.error("[audio] FIFO stream error:", err.message);
      reject(err);
    });

    resolve(stream);
  });
}

/* CONNECTION HANDLER */

wss.on("connection", async (ws) => {
  console.log("[ws] user connected");

  let container;
  let termStream;
  let audioStream;
  let pc;
  const sessionId = Math.random().toString(36).substr(2, 9);
  const fifoPath = path.join(TEMP_DIR, `audio-${sessionId}.fifo`);

  /* start container */

  try {
    createFifo(fifoPath);
    container = await createContainer(
      TEMP_DIR,
      sessionId
    );
    console.log("[ws] Container created:", container.id);
  } catch (err) {
    console.error("[ws] Container creation failed:", err.message);
    ws.close();
    removeFifo(fifoPath);
    return;
  }

  /* attach terminal */

  try {
    termStream = await container.attach({
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true,
      hijack: true
    });

    termStream.on("data", (chunk) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({
          type: "terminal",
          data: chunk.toString("utf8")
        }));
      }
    });

    termStream.on("error", (err) => {
      console.error("[terminal] Error:", err.message);
    });
  } catch (err) {
    console.error("[ws] Failed to attach terminal:", err.message);
  }

  /* websocket messages */

  ws.on("message", async (msg) => {
    let data;

    try {
      data = JSON.parse(msg.toString());
    } catch {
      if (termStream) termStream.write(msg);
      return;
    }

    if (data.type === "terminal") {
      if (termStream) termStream.write(data.data);
    }

    if (data.type === "resize") {
      try {
        await container.resize({
          h: data.rows,
          w: data.cols
        });
      } catch { }
    }

    /* WEBRTC AUDIO */

    if (data.type === "webrtc-offer") {
      console.log("[webrtc] WebRTC offer received");

      try {
        if (pc) {
          try { pc.close(); } catch { }
        }

        if (audioStream) {
          try { audioStream.destroy(); } catch { }
        }

        pc = new wrtc.RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        const audioSource = new wrtc.nonstandard.RTCAudioSource();
        const audioTrack = audioSource.createTrack();
        pc.addTrack(audioTrack);

        pc.onicecandidate = ({ candidate }) => {
          if (candidate && ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
              type: "ice",
              candidate
            }));
          }
        };

        await pc.setRemoteDescription(
          new wrtc.RTCSessionDescription(data.offer)
        );

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        ws.send(JSON.stringify({
          type: "webrtc-answer",
          answer: pc.localDescription
        }));

        // Start reading audio from FIFO
        await new Promise(r => setTimeout(r, 1000));
        audioStream = await startAudioPipeline(fifoPath, audioSource);
        console.log("[audio] Audio pipeline started");

      } catch (err) {
        console.error("[webrtc] Error:", err.message);
        ws.send(JSON.stringify({
          type: "error",
          message: err.message
        }));
      }
    }

    if (data.type === "ice" && pc) {
      try {
        if (data.candidate && data.candidate.candidate) {
          await pc.addIceCandidate(new wrtc.RTCIceCandidate({
            candidate: data.candidate.candidate,
            sdpMid: data.candidate.sdpMid,
            sdpMLineIndex: data.candidate.sdpMLineIndex
          }));
        }
      } catch (err) {
        // Silently ignore ICE errors as they're not critical
        console.debug("[ice] Candidate error (non-critical):", err.message);
      }
    }
  });

  /* cleanup */

  ws.on("close", async () => {
    console.log("[ws] user disconnected");

    try { if (pc) pc.close(); } catch { }
    try { if (audioStream) audioStream.destroy(); } catch { }
    try { if (termStream) termStream.destroy(); } catch { }
    try { await container.kill(); } catch { }
    removeFifo(fifoPath);
  });
});

/* start server */

server.listen(8080, () => {
  console.log("server running on http://localhost:8080");
});