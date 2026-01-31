# traefik — Local reverse proxy & TLS (development)

This folder contains configuration for Traefik, the reverse proxy used for local routing and optional TLS termination.

Files:
- `traefik.yml` — Static Traefik configuration (entrypoints, providers, ACME resolver settings).
- `dynamic.yml` — Dynamic rules (redirect to HTTPS, TLS options, middlewares).
- `acme.json` — ACME storage file used by Traefik to store certificates (should be `chmod 600` and kept out of VCS).

Local TLS with mkcert (recommended):
1. Install mkcert and generate a local CA and certificates for `admin.localhost`, `api.localhost`, `ui.localhost`.
2. Mount your certificates into Traefik or configure a file provider in `traefik.yml` to point to them.
3. Set `acme.json` permissions: `chmod 600 traefik/acme.json`.

Notes:
- The Traefik dashboard is exposed on port `8080` in `docker-compose.override.yml` for convenience; do not expose the dashboard in public environments.
- `traefik/traefik.yml` uses the staging ACME server by default to avoid hitting Let's Encrypt rate limits during testing. Switch to production CA before going live.
- Add host entries to `/etc/hosts` for `admin.localhost`, `api.localhost`, and `ui.localhost` if you don't use a DNS that resolves them to `127.0.0.1`.
