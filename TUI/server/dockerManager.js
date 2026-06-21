import Docker from "dockerode";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// Create FIFO on host for audio streaming
function ensureAudioFifo(fifoPath) {
  if (fs.existsSync(fifoPath)) {
    try {
      fs.unlinkSync(fifoPath);
    } catch {}
  }

  try {
    execSync(`mkfifo ${fifoPath}`);

    // allow appuser inside container to write
    fs.chmodSync(fifoPath, 0o666);

    console.log(`[docker] Created FIFO at ${fifoPath}`);
  } catch (err) {
    console.error(`[docker] Failed to create FIFO: ${err.message}`);
  }
}
export async function createContainer(fifoDir, sessionId) {
  // Ensure FIFO directory and file exist on host
  if (!fs.existsSync(fifoDir)) {
    fs.mkdirSync(fifoDir, { recursive: true });
  }


  const audioFifoPath = path.join(
    fifoDir,
    `audio-${sessionId}.fifo`
  );
  // Create FIFO on host
  ensureAudioFifo(audioFifoPath);

  // Verify the image exists before trying to create a container
  try {
    await docker.getImage("sparklines-tui").inspect();
  } catch (err) {
    throw new Error(
      `Image 'sparklines-tui' not found. Build it first with: docker build -t sparklines-tui .`
    );
  }

  const container = await docker.createContainer({
    Image: "sparklines-tui",
    Tty: true,
    OpenStdin: true,
    StdinOnce: false,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    HostConfig: {
      Memory: 256 * 1024 * 1024,
      NanoCPUs: 500000000,
      AutoRemove: true,
      // Mount the host FIFO into the container
      Binds: [
        `${audioFifoPath}:/tmp/audio.fifo`
      ]
    }
  });

  await container.start();
  return container;
}