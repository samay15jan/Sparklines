#!/bin/bash

echo "[entrypoint] Starting..."

# Create FIFO if it doesn't exist
if [ ! -p /tmp/audio.fifo ]; then
  echo "[entrypoint] Creating FIFO..."
  mkfifo /tmp/audio.fifo
  chmod 666 /tmp/audio.fifo
  echo "[entrypoint] FIFO created"
fi

# Start PulseAudio if available
if command -v pulseaudio &> /dev/null; then
  echo "[entrypoint] Starting PulseAudio..."
  mkdir -p /run/pulse
  pulseaudio --system --daemonize --exit-idle-time=-1 2>/dev/null || \
  pulseaudio --daemonize --exit-idle-time=-1 2>/dev/null || true
  sleep 2
fi

# Start ffmpeg to capture audio if available
if command -v ffmpeg &> /dev/null; then
  echo "[entrypoint] Starting ffmpeg audio capture..."
  (ffmpeg -f pulse -i default -f s16le -acodec pcm_s16le -ar 48000 -ac 2 /tmp/audio.fifo 2>/dev/null || \
   ffmpeg -f alsa -i default -f s16le -acodec pcm_s16le -ar 48000 -ac 2 /tmp/audio.fifo 2>/dev/null || \
   cat /dev/zero > /tmp/audio.fifo &) 2>/dev/null &
  sleep 1
fi

echo "[entrypoint] Starting sparklines-tui..."

# Start sparklines-tui - this MUST always succeed
if command -v sparklines-tui &> /dev/null; then
  exec sparklines-tui
else
  echo "[entrypoint] ERROR: sparklines-tui not found!"
  exec /bin/bash
fi