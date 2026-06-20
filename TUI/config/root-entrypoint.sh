#!/bin/bash

echo "[root] Starting..."

FIFO_PATH="/tmp/audio.fifo"

# Create FIFO directory
chown -R appuser:appuser /home/appuser/.sparklines

# Create audio pipe
if [ ! -p "$FIFO_PATH" ]; then
  mkfifo "$FIFO_PATH"
  chmod 666 "$FIFO_PATH"
fi

# Start PulseAudio
if command -v pulseaudio >/dev/null 2>&1; then
  echo "[root] Starting PulseAudio..."

  pulseaudio --system --daemonize --exit-idle-time=-1 2>/dev/null || \
  pulseaudio --daemonize --exit-idle-time=-1 2>/dev/null || true

  sleep 2

  mkdir -p /home/appuser/.config/pulse

  if [ -f /run/pulse/.config/pulse/cookie ]; then
    cp /run/pulse/.config/pulse/cookie \
      /home/appuser/.config/pulse/cookie

    chown -R appuser:appuser \
      /home/appuser/.config/pulse
  fi
fi

# Start audio capture
if command -v ffmpeg >/dev/null 2>&1; then
  echo "[root] Starting ffmpeg..."

  (
    ffmpeg \
      -f pulse \
      -i auto_null.monitor \
      -f s16le \
      -acodec pcm_s16le \
      -ar 48000 \
      -ac 2 \
      "$FIFO_PATH" 2>/dev/null \
    || cat /dev/zero > "$FIFO_PATH"
  ) &
fi

echo "[root] Starting app..."

exec runuser -u appuser -- /app-entrypoint.sh