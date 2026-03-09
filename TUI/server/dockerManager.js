import Docker from "dockerode";

const docker = new Docker();

export async function createContainer() {
  const container = await docker.createContainer({
    Image: "sparklines-tui",
    Tty: true,
    OpenStdin: true,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    HostConfig: {
      Memory: 256 * 1024 * 1024,
      NanoCPUs: 500000000,
      AutoRemove: true
    }
  });

  await container.start();
  return container;
}
