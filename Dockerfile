FROM oven/bun:canary-alpine
WORKDIR /usr/src/app

COPY . .
RUN bun install --frozen-lockfile

CMD [ "bun", "run", "index.ts" ]
