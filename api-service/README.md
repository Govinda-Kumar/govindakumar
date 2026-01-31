# api-service — FastAPI (Data Plane)

This directory contains the FastAPI service that provides JSON APIs consumed by the frontend and other services.

## Useful commands (development)

- Start dev server locally (with reload):
  - uvicorn main:app --reload --host 0.0.0.0 --port 8001
- Start with Docker Compose (dev):
  - docker compose up -d api-service
- Run tests (pytest):
  - pytest
- Simple curl health check (via Traefik):
  - curl -H "Host: api.localhost" http://localhost/health

Database / migrations:
- Currently the repo uses plain SQLAlchemy models. If you add DB migrations, consider integrating Alembic for schema migrations and add migration commands to CI.

Environment variables reminder:
- `DATABASE_URL` — e.g. `postgres://postgres:postgres@db:5432/netflix_db`
- `ENV` — `development` or `production` (controls CORS and logging)

## Build & run (production-like)

- Build Docker image locally: docker build -t govindakumar-api-service:local -f api-service/Dockerfile api-service
- Run container: docker run -p 8001:8001 --env DATABASE_URL=postgres://... govindakumar-api-service:local
- When running under Compose we use `api-service/entrypoint.sh` to wait for Postgres and then start the server.

## Endpoints (examples)
- GET /                — Basic health/root endpoint
- GET /health          — Health check
- GET /projects        — List/filter projects
- GET /projects/featured — Featured project
- GET /projects/search?q=<query> — Search projects

## Environment variables
- `DATABASE_URL` — Postgres connection string, e.g., postgresql://user:pass@db:5432/netflix_db
- `ENV` — Set to `production` in prod to tighten CORS
- `CORS_ALLOWED_ORIGINS` — Comma-separated list of allowed origins in production

## Files & their jobs
- `main.py` — FastAPI app and route definitions (CORS, logging, health checks)
- `database.py` — SQLAlchemy engine and session helper (`get_db` used as dependency)
- `models.py` / `schemas.py` — DB models and pydantic schemas
- `Dockerfile` — Builds the image and uses `entrypoint.sh` to wait for Postgres before starting Uvicorn
- `entrypoint.sh` — Waits for the DB to be available before launching the app

Notes:
- Currently we use plain SQLAlchemy models; if you add migrations consider integrating Alembic.
- Keep sensitive info out of the repo and provide production credentials via CI/Railway secrets.
