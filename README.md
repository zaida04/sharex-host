# `sharex-image-host`

I made this because I needed to host my own images for ShareX. It's a simple image host that uses [bun](https://bun.sh) and [typescript](https://www.typescriptlang.org/).


### Setup
```bash
bun install
bun run build
```

### Run
```bash
bun run start
```

### Run (PM2)
```bash
pm2 start
```

### Run (Docker)
```bash
docker build -t sharex-image-host .
docker run -d -p 6000:6000 sharex-image-host
```

## License

[Do Whatever You Want](./LICENSE)