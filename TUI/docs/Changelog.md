# Changelog - Audio Streaming Pipeline

## Completed

### PulseAudio
- Fixed PulseAudio authentication issues inside container
- Identified cookie mismatch between `pulse` and `appuser`
- Synced PulseAudio cookie to `appuser`
- Verified `pactl info` works successfully

### Audio Playback
- Verified `mpv` can play audio through PulseAudio
- Confirmed Sparklines-TUI audio playback is functional
- Identified TUI progress display bug (playback works, UI timestamps not updating correctly)

### Audio Capture
- Verified PulseAudio monitor source exists (`auto_null.monitor`)
- Confirmed ffmpeg can capture audio from PulseAudio
- Successfully generated raw PCM audio files
- Verified captured files contain actual audio data

### FIFO Transport
- Fixed FIFO permission issues
- Fixed host/container FIFO mount issues
- Corrected FIFO creation logic
- Verified audio data can be written through FIFO
- Verified host machine can read FIFO output

### Docker Integration
- Verified Dockerode session creation
- Verified per-session containers launch correctly
- Verified terminal streaming through WebSocket
- Verified FIFO bind mounts between host and containers

### Browser Streaming
- Implemented WebRTC audio transport
- Implemented WebSocket terminal transport
- Successfully negotiated WebRTC connection
- Browser receives remote audio track
- Connection state reaches `connected`

---

## Architecture

```text
Browser
  │
  ├── WebSocket
  │     └── Terminal Output
  │
  └── WebRTC
        └── Audio Stream

Node Server
  │
  ├── Dockerode
  │     └── Session Containers
  │
  └── FIFO Reader
        └── RTCAudioSource

Container
  │
  ├── Sparklines-TUI
  ├── MPV
  ├── PulseAudio
  └── FFmpeg
         │
         ▼
       FIFO
````

## Current Status

### Confirmed Working

* [x] Sparklines audio playback
* [x] PulseAudio
* [x] FFmpeg capture
* [x] FIFO transport
* [x] Docker bind mounts
* [x] Host receives audio bytes
* [x] WebRTC signaling
* [x] Browser receives audio track
* [x] WebRTC peer connection established

### Remaining Investigation

* [ ] Verify Node FIFO reader receives audio continuously
* [ ] Verify RTCAudioSource receives PCM frames
* [ ] Verify RTP packets are being transmitted
* [ ] Verify browser receives RTP audio packets
* [ ] Verify audio playback in browser

## Known Issues

### PulseAudio Startup

* PulseAudio does not reliably start automatically during container startup
* Manual startup sequence works consistently
* Requires further investigation

### Sparklines UI

* Playback progress display appears broken
* Audio continues playing correctly
* Cosmetic issue only
