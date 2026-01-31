# admin-service — Django (Control Plane)

This directory contains the Django project used to manage the portfolio content (projects, categories, admin UI).

## Useful commands (local / development)

- Start local dev (using docker-compose):
  - docker compose up -d admin-service
- Run Django shell:
  - docker compose exec admin-service python manage.py shell
- Run migrations (container):
  - docker compose exec admin-service python manage.py migrate
- Create superuser (interactive):
  - docker compose exec admin-service python manage.py createsuperuser
- Run tests:
  - docker compose exec admin-service python manage.py test

## Building & running the production image

- Build image locally: docker compose -f docker-compose.prod.yml build admin-service
- Start in production test mode: docker compose -f docker-compose.prod.yml up -d admin-service
- Logs: docker compose logs -f admin-service

## Files & their jobs

- `Dockerfile` — Builds the image and uses `entrypoint.sh` then runs Gunicorn to serve Django.
- `entrypoint.sh` — Waits for Postgres to be available, runs migrations and `collectstatic`, then execs the CMD (Gunicorn).
- `core/settings.py` — Reads configuration from environment variables including `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`, and `DATABASE_URL`.
- `requirements.txt` — Python dependencies, includes `gunicorn` and `whitenoise` for production.
- `.env.example` — Example environment variables.

## Notes
- Use `admin.localhost` when running with Traefik locally to access the admin over HTTPS. Ensure `/etc/hosts` includes mapping to `127.0.0.1` for `admin.localhost` if necessary.
- Secrets should be stored in CI or Railway environment variables for production; do not commit `.env` files.