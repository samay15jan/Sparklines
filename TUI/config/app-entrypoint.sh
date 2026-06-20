#!/bin/bash

# PulseAudio socket
export PULSE_SERVER=unix:/run/pulse/native

echo "[appuser] Starting sparklines-tui..."

exec sparklines-tui