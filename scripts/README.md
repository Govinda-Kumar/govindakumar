# scripts — Helper automation

This directory contains helper shell scripts used by CI and for manual workflows.

Files:
- `build_and_push.sh` — Builds Docker images for `admin-service`, `api-service`, and `portfolio-ui`, tags them for GHCR and pushes them.
  - Required env vars when running locally or in CI:
    - `GHCR_PAT` — GitHub personal access token with `write:packages`.
    - `GHCR_OWNER` or `GITHUB_USER` — Owner/account under which images will be pushed.
    - `GHCR_REPO` — Optional repo prefix (defaults to `govindakumar`).
  - Example: `GHCR_PAT=... GHCR_OWNER=myuser ./scripts/build_and_push.sh my-tag`

- `deploy_to_railway.sh` — Helper that demonstrates deploying images to Railway using the Railway CLI or API.
  - Required env vars for use:
    - `RAILWAY_TOKEN` — Railway API token (stored securely in CI).
    - `RAILWAY_PROJECT_ID` — Your Railway project id.
  - This script prints example `railway service update` commands; replace the placeholder service IDs with your real service IDs before running.

- `deploy_to_render.sh` — Helper that triggers a Render deploy hook (useful to trigger a Render deploy from CI).
  - Required env vars for use:
    - `RENDER_DEPLOY_HOOK_URL` — Render deploy webhook URL (store securely in CI).
  - Example: `RENDER_DEPLOY_HOOK_URL=... ./scripts/deploy_to_render.sh`

Notes:
- The scripts are intentionally conservative: they show recommended usage and require you to supply secrets via environment variables (CI secrets or local env).
- Make sure scripts have execute permission (`chmod +x scripts/*.sh`).
