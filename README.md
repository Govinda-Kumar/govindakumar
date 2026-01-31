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


# Development (local) 🔧

Requirements: Docker & Docker Compose, mkcert (recommended for local TLS)

1. Copy environment examples and fill values:
   - cp .env.example .env
   - cp admin-service/.env.example admin-service/.env
   - cp api-service/.env.example api-service/.env
   - cp portfolio-ui/.env.example portfolio-ui/.env

2. Start services with Traefik (dev TLS+routing):
   - docker compose up -d traefik db admin-service api-service portfolio-ui

3. Access services in browser:
   - Django Admin: https://admin.localhost (uses Traefik routing)
   - API: https://api.localhost
   - Frontend: https://ui.localhost

Notes:
- For local TLS use mkcert and place certificates where Traefik can mount them, or adjust `traefik/traefik.yml` to use your resolver.
- Entrypoints in `admin-service` and `api-service` wait for Postgres and run migrations/collectstatic automatically.

---

# Production (Docker Compose / Railway) 🚀

Production uses `docker-compose.prod.yml` which builds images ready for deployment.

1. Build images locally (for testing):
   - docker compose -f docker-compose.prod.yml build

2. Start production stack locally:
   - docker compose -f docker-compose.prod.yml up -d

3. Frontend should be served on port 80 (or via Traefik in your cloud provider).

---

# CI/CD and Registry

- We recommend using GitHub Container Registry (GHCR) to host Docker images and CircleCI to build/push images and trigger Railway deploys.

- CircleCI setup (high level):
  1. Create a GitHub Personal Access Token (PAT) with `write:packages` and `delete:packages` and store it as `GHCR_PAT` in CircleCI Project Settings.
  2. Add `GHCR_OWNER` (your GH org or username) and `GHCR_REPO` (defaults to `govindakumar`), and `GITHUB_USER` if needed.
  3. Add `RAILWAY_TOKEN` and `RAILWAY_PROJECT_ID` to CircleCI when you set up Railway.
  4. The CircleCI pipeline (`.circleci/config.yml`) will run tests, build images via `scripts/build_and_push.sh`, push to GHCR, and call `scripts/deploy_to_railway.sh` (you must customize Railway service ids inside that script to finish deployment automation).

- Quick manual GHCR test:
  - docker build -t ghcr.io/<owner>/govindakumar-admin-service:tag admin-service
  - echo "$GHCR_PAT" | docker login ghcr.io -u "$GITHUB_USER" --password-stdin
  - docker push ghcr.io/<owner>/govindakumar-admin-service:tag

- Railway deploy notes:
  - Our `scripts/deploy_to_railway.sh` helper prints example `railway service update` commands and expects you to install the Railway CLI and provide service ids. We can help wire this to Railway API/CLI once you create your Railway project and services.

---

# Cleanup & Notes

- SQLite (`admin-service/db.sqlite3`) and Python virtual envs were removed; the project uses Postgres now.
- Keep secrets out of the repo; use `.env` files locally and CI/Railway secret stores in production.

