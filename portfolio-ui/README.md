# Portfolio UI

React + Vite frontend application for the portfolio website.

## Quick Start

```bash
# Start service (Docker)
docker compose up -d portfolio-ui

# Access UI
https://ui.localhost

# Local development (without Docker)
cd portfolio-ui
npm install
npm run dev  # Runs on port 5173
```

## Common Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm test
```

## Configuration

Environment variables (configured in docker-compose.yml or Render):
- `VITE_API_URL` - Base URL for API service

## Project Structure

- `src/` - React components and application code
- `public/` - Static assets
- `nginx.conf` - Production nginx configuration
- `Dockerfile` - Multi-stage build (npm build → nginx serve)

## Documentation

See the [main README](../README.md) for complete setup and deployment instructions.
