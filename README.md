# GovindaKumar Portfolio

## Portfolio

govindakumar/
│
├── admin-service/       # Django (The Control Plane)
│   ├── core/            # Django project settings
│   ├── projects/        # Project & Category models
│   ├── manage.py
│   └── Dockerfile
│
├── api-service/         # FastAPI (The Data Plane)
│   ├── main.py          # Fast API routes
│   ├── database.py      # Connection to Postgres
│   ├── schemas.py       # Pydantic models
│   └── Dockerfile
│
├── portfolio-ui/        # React + Vite (The Frontend)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml   # Orchestrates all services
└── .env                 # Shared environment variables (DB URLs, etc.)

A small monorepo containing:
- `admin-service` — Django backend (control plane)
- `api-service` — FastAPI backend (data plane)
- `portfolio-ui` — React + Vite frontend

This README provides step-by-step commands for Local (development) and Production (local test & deployment) and then explains the role of important files.

---

Quick production build (one-liners):

- Build production images: `docker compose -f docker-compose.prod.yml build`
- Start production stack locally: `docker compose -f docker-compose.prod.yml up -d`

---

## Local Development (quick start) 🔧

Prerequisites:
- Docker & Docker Compose v2+ installed
- mkcert (recommended) or any way to provide TLS certs for Traefik if you want clean HTTPS locally

1) Copy environment examples and configure values:
   - cp .env.example .env
   - cp admin-service/.env.example admin-service/.env
   - cp api-service/.env.example api-service/.env
   - cp portfolio-ui/.env.example portfolio-ui/.env

2) Start Traefik + core services (development):
   - Note: Services are served over HTTPS locally (https://admin.localhost, https://api.localhost, https://ui.localhost).
   - For browser-trusted site certificates, install `mkcert` and run `scripts/generate_mkcert.sh` (this will write certs to `traefik/certs/` which is mounted into Traefik).
   - Restart Traefik after generating certs: `docker compose up -d --force-recreate traefik`.
   - Start services: `docker compose up -d traefik db admin-service api-service portfolio-ui`

3) Useful local commands:
   - View logs (tail): docker compose logs -f admin-service
   - Restart a service: docker compose restart admin-service
   - Execute a shell in a service: docker compose exec admin-service sh
   - Run Django management commands (examples):
     - Make migrations (after model changes): docker compose exec admin-service python manage.py makemigrations
     - Apply migrations: docker compose exec admin-service python manage.py migrate
     - Collect static files: docker compose exec admin-service python manage.py collectstatic --noinput
     - Create superuser (interactive): docker compose exec admin-service python manage.py createsuperuser
   - Run project tests (Django / Python): docker compose exec admin-service python manage.py test
   - Test FastAPI health locally (via Traefik): curl -H "Host: api.localhost" http://localhost/health
   - Test via HTTPS (Traefik): curl -vk -H "Host: admin.localhost" https://localhost/

How to test locally (end-to-end):
   1. (Optional/prod-like) Generate trusted certs with mkcert: `./scripts/generate_mkcert.sh` (see `traefik/README.md`).
   2. Restart Traefik to pick up certs: `docker compose up -d --force-recreate traefik`.
   3. Start the stack: `docker compose up -d traefik db admin-service api-service portfolio-ui`.
   4. Wait for the DB to become healthy, then verify:
      - `curl -H "Host: api.localhost" http://localhost/health` (should return {"status":"healthy"})
      - `curl -vk -H "Host: admin.localhost" https://localhost/` (Django admin UI)
      - `curl -vk -H "Host: ui.localhost" https://localhost/` (Frontend index)
   5. Use `docker compose logs -f <service>` to follow logs while testing.

Static files guidance:
   - Recommended: **do not commit** generated `staticfiles` to git. Instead run `collectstatic` during an image build or via CI, and serve them from the container (or a CDN/bucket) in production.
   - If you need a quick local workaround and want to persist `staticfiles` in the repo temporarily, you may commit them, but be aware this is not recommended for long-term workflows. If you prefer to keep `staticfiles` out of VCS, add `/admin-service/staticfiles/` to `.gitignore`.

4) Access services in browser:
   - Django: https://admin.localhost
   - API: https://api.localhost
   - Frontend: https://ui.localhost

Notes:
- Traefik routes hostnames to containers using `docker-compose.override.yml` labels. Add entries to `/etc/hosts` for `admin.localhost`, `api.localhost`, and `ui.localhost` if needed.
- The `entrypoint.sh` scripts wait for Postgres and perform migrations/collectstatic for admin-service and start the app for api-service.

---

## Production (local testing & deployment) 🚀

1) Build production images locally (for validation):
   - docker compose -f docker-compose.prod.yml build

2) Start the production stack locally:
   - docker compose -f docker-compose.prod.yml up -d

3) Helpful production commands:
   - View running containers: docker compose -f docker-compose.prod.yml ps
   - Tail logs: docker compose -f docker-compose.prod.yml logs -f admin-service
   - Stop & remove: docker compose -f docker-compose.prod.yml down --volumes

4) Pushing images to registry (manual flow):
   - Build and tag: ./scripts/build_and_push.sh <tag>
   - Ensure `GHCR_PAT` and `GHCR_OWNER` are set in CI or your environment for pushing to GHCR.

5) CI/CD notes:
- CircleCI is scaffolded at `.circleci/config.yml` to run tests, build and push images to GHCR, and run `scripts/deploy_to_railway.sh` (the Railway helper needs real service IDs and `RAILWAY_TOKEN` to complete deploys).

---

## Other useful utilities
- Clean up dangling Docker resources: docker system prune -a --volumes
- Rebuild a single service image: docker compose build admin-service
- Run DB shell: docker compose exec db psql -U postgres -d netflix_db

---

## Files & Purpose (service-level explanation) 📚

Below are the key files and what they do.

- `docker-compose.yml` — Primary development compose file providing `db`, `admin-service`, `api-service`, and `portfolio-ui` services.
- `docker-compose.override.yml` — Local overrides for Traefik labels and dev routing (used to get friendly hostnames like `admin.localhost`).
- `docker-compose.prod.yml` — Production-oriented compose file: builds images with production env values and runs them for local validation.
- `traefik/README.md` — How to configure Traefik and local TLS, CA/ACME notes and mkcert guidance.
- `scripts/README.md` — How to use `scripts/build_and_push.sh` and `scripts/deploy_to_railway.sh` (used by CI for GHCR+Railway flows).
- `admin-service/Readme.md` — Per-service README: commands to run, build, and test the Django control plane.
- `api-service/README.md` — Per-service README: API commands, endpoints, and environment variables for the FastAPI data plane.
- `portfolio-ui/README.md` — Per-service README: how to run Vite locally, build and serve the production image via nginx.

- `traefik/` — Configuration for Traefik (local reverse proxy and optional local TLS termination):
  - `traefik.yml` — static Traefik config (entrypoints, ACME resolver, providers)
  - `dynamic.yml` — dynamic rules (redirect-to-https middleware)
  - `acme.json` — ACME storage (keep out of VCS and protected)

- `admin-service/` — Django app, runs under Gunicorn in production; migrations and static files are handled at container start by `entrypoint.sh`.
- `api-service/` — FastAPI app; runs Uvicorn in production behind Traefik.
- `portfolio-ui/` — React + Vite frontend; production build served by nginx in the Docker image.

- `scripts/build_and_push.sh` — Build and push Docker images to GHCR (used by CI).
- `scripts/deploy_to_railway.sh` — Helper to trigger Railway deploys (replace placeholders with your Railway service IDs).

