# Meme generator

## Quick start guide

### Meme Service
```bash
cd service

docker build -t meme-generator .

docker run -v $(pwd)/templates:/app/templates -v $(pwd)/memes:/app/memes -p 3000:3000 meme-generator:latest
```