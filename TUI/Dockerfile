FROM node:20-alpine

# system dependencies
RUN apk add --no-cache mpv socat

WORKDIR /opt/sparklines

# copy project
COPY . .

# install node dependencies
RUN npm install --omit=dev

# create non-root user
RUN adduser -D appuser

# create config directory
RUN mkdir -p /home/appuser/.sparklines

# copy demo config
COPY demo-config /home/appuser/.sparklines/config

# set ownership
RUN chown -R appuser:appuser /home/appuser/.sparklines

# install CLI globally
RUN npm install -g .

USER appuser

CMD ["sparklines-tui"]
