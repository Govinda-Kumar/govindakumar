# scripts — Helper automation

This directory contains helper shell scripts used by CI and for manual workflows.

## Build & Push
- `build_and_push.sh` — Builds Docker images for `admin-service`, `api-service`, and `portfolio-ui`, tags them for GHCR and pushes them.
  - Required env vars:
    - `GHCR_PAT` — GitHub personal access token with `write:packages`.
    - `GHCR_OWNER` — GitHub username/org under which images will be pushed.
    - `GHCR_REPO` — Optional repo prefix (defaults to `govindakumar`).
  - Example: `GHCR_PAT=... GHCR_OWNER=myuser ./scripts/build_and_push.sh my-tag`

## Deployment
- `deploy_to_render.sh` — Triggers a Render deploy hook (used by CircleCI to deploy after approval).
  - Required env vars:
    - `RENDER_DEPLOY_HOOK_URL` — Render deploy webhook URL (store securely in CI).
  - Example: `RENDER_DEPLOY_HOOK_URL=... ./scripts/deploy_to_render.sh`

## Local Development
- `generate_mkcert.sh` — Generates local TLS certificates using mkcert for HTTPS development.
- `validate_certs.sh` — Validates that local TLS certificates exist and are properly configured.
- `local_check.sh` — Runs local environment checks (POSIX-compatible).

Notes:
- The scripts are intentionally conservative: they show recommended usage and require you to supply secrets via environment variables (CI secrets or local env).
- Make sure scripts have execute permission (`chmod +x scripts/*.sh`).
