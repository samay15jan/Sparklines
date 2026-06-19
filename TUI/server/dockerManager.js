import Docker from "dockerode";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// Create FIFO on host for audio streaming
function ensureAudioFifo(fifoPath) {
  if (fs.existsSync(fifoPath)) {
    // Remove old FIFO
    try {
      fs.unlinkSync(fifoPath);
    } catch {}
  }
  
  // Create FIFO using mkfifo
  try {
    execSync(`mkfifo ${fifoPath}`);
    console.log(`[docker] Created FIFO at ${fifoPath}`);
  } catch (err) {
    console.error(`[docker] Failed to create FIFO: ${err.message}`);
  }
}

export async function createContainer(audioFifoPath) {
  // Ensure FIFO directory and file exist on host
  const fifoDir = path.dirname(audioFifoPath);
  if (!fs.existsSync(fifoDir)) {
    fs.mkdirSync(fifoDir, { recursive: true });
  }

  // Create FIFO on host
  ensureAudioFifo(audioFifoPath);

  // Verify the image exists before trying to create a container
  try {
    await docker.getImage("tui-tui-server").inspect();
  } catch (err) {
    throw new Error(
      `Image 'tui-tui-server' not found. Build it first with: docker build -t tui-tui-server .`
    );
  }

  const container = await docker.createContainer({
    Image: "tui-tui-server",
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