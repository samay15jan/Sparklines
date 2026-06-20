FROM node:20-bookworm-slim

# System packages
RUN apt-get update \
 && apt-get install -y \
    mpv \
    ffmpeg \
    socat \
    alsa-utils \
    pulseaudio \
    util-linux \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/sparklines

# Copy project
COPY . .

# Install dependencies
RUN npm install --omit=dev

# Create user
RUN useradd -m appuser

# Sparklines config
RUN mkdir -p /home/appuser/.sparklines
COPY config/demo-config /home/appuser/.sparklines/config

# MPV config
RUN mkdir -p /home/appuser/.config/mpv \
 && printf "ao=pulse\nno-video\n" \
 > /home/appuser/.config/mpv/mpv.conf

# Fix ownership
RUN chown -R appuser:appuser /home/appuser

# Install CLI
RUN npm install -g .

# Entrypoints
COPY config/root-entrypoint.sh /root-entrypoint.sh
COPY config/app-entrypoint.sh /app-entrypoint.sh

RUN chmod +x /root-entrypoint.sh \
 && chmod +x /app-entrypoint.sh

# Start as root
CMD ["/root-entrypoint.sh"]