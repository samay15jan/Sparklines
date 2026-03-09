import { WebSocketServer } from "ws";
import { createContainer } from "./dockerManager.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
  console.log("User connected");

  const container = await createContainer();

  const stream = await container.attach({
    stream: true,
    stdin: true,
    stdout: true,
    stderr: true
  });

  stream.on("data", (chunk) => {
    ws.send(chunk.toString("utf8"));
  });

  ws.on("message", (msg) => {
    stream.write(msg);
  });

  ws.on("close", async () => {
    console.log("User disconnected");

    try {
      await container.kill();
    } catch {}
  });
});

console.log("WebSocket server running on :8080");
