FROM node:20-bookworm-slim

# system deps - add pulseaudio for audio support
RUN apt-get update \
 && apt-get install -y mpv ffmpeg socat alsa-utils pulseaudio \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/sparklines

# copy project
COPY . .

# install dependencies
RUN npm install --omit=dev

# create user
RUN useradd -m appuser

# sparklines config directory
RUN mkdir -p /home/appuser/.sparklines

COPY config/demo-config /home/appuser/.sparklines/config

# mpv configuration - use PulseAudio for audio output
RUN mkdir -p /home/appuser/.config/mpv \
 && printf "ao=pulse\nno-video\n" \
 > /home/appuser/.config/mpv/mpv.conf \
 && chown -R appuser:appuser /home/appuser/.config \
 && chown -R appuser:appuser /home/appuser/.sparklines

# install CLI
RUN npm install -g .

# entrypoint
COPY config/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER appuser

CMD ["/entrypoint.sh"]