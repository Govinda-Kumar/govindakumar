# traefik — Local reverse proxy & TLS (development)

This folder contains configuration for Traefik, the reverse proxy used for local routing and optional TLS termination.

Files:
- `traefik.yml` — Static Traefik configuration (entrypoints, providers, ACME resolver settings).
- `dynamic.yml` — Dynamic rules (redirect to HTTPS, TLS options, middlewares).
- `acme.json` — ACME storage file used by Traefik to store certificates (should be `chmod 600` and kept out of VCS).

Local TLS with mkcert (recommended):

1. Install mkcert and create a local CA (one-time):
   - macOS (Homebrew): `brew install mkcert nss` and `mkcert -install`

2. Generate a single certificate and key covering `admin.localhost`, `api.localhost`, and `ui.localhost` and write them to the `traefik/certs` folder (create folder first):
   - `mkdir -p traefik/certs`
   - `mkcert -cert-file traefik/certs/localhost.pem -key-file traefik/certs/localhost-key.pem admin.localhost api.localhost ui.localhost`

3. The `docker-compose.override.yml` mounts `./traefik/certs` into Traefik at `/certs`. The file provider (`traefik/dynamic.yml`) references `/certs/localhost.pem` and `/certs/localhost-key.pem` for TLS.

Notes:
- These cert files are local-only and should **not** be committed; `.gitignore` contains `traefik/certs/` to keep them out of VCS.
- If you prefer per-host certs, generate separate cert/key pairs and update `traefik/dynamic.yml` to reference them.
- After generating certs, restart Traefik: `docker compose up -d --force-recreate traefik`.

Notes:
- The Traefik dashboard is exposed on port `8080` in `docker-compose.override.yml` for convenience; do not expose the dashboard in public environments.
- `traefik/traefik.yml` uses the staging ACME server by default to avoid hitting Let's Encrypt rate limits during testing. Switch to production CA before going live.
- Add host entries to `/etc/hosts` for `admin.localhost`, `api.localhost`, and `ui.localhost` if you don't use a DNS that resolves them to `127.0.0.1`.
