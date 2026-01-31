# portfolio-ui — React + Vite (Frontend)

This directory contains the React + Vite application used as the portfolio UI. The production Docker image builds the app and serves it via nginx.

## Useful commands (development)

- Install deps: npm install (or `npm ci` in CI)
- Run dev server with HMR: npm run dev (available on port 5173)
- Lint: npm run lint
- Run unit tests (if present): npm test

## Build & Docker

- Build production bundle: npm run build
- Build Docker image locally: docker build -t govindakumar-portfolio-ui:local .
- Run dockerized UI (prod-like): docker run -p 80:80 govindakumar-portfolio-ui:local

## Working behind Traefik (HTTPS local testing)
- Set `VITE_API_URL` to `https://api.localhost` when testing with Traefik:
  - In docker-compose.yml (dev): set `VITE_API_URL=https://api.localhost` or in `.env` for the frontend container.
- Access via browser: https://ui.localhost (Traefik routes to nginx and serves the built assets over HTTPS)

Notes on SPA routing:
- If you use client-side routing, make sure nginx is configured to fallback to `index.html` for unknown routes (this is handled in `nginx.conf`).

## Env variables
- `VITE_API_URL` — Base URL for API; set in `portfolio-ui/.env` for local dev, or via container env in production.

## Files & their jobs
- `Dockerfile` — Multi-stage build: builds the frontend (`npm run build`) and copies the static output into an nginx image.
- `nginx.conf` — Custom nginx config used to serve the built SPA and handle caching and security headers.
- `package.json` — Has scripts for `dev`, `build`, `lint`, and `test`.

Notes:
- In development the Vite dev server runs on port 5173; in production static files are served on port 80 by nginx inside the container.
