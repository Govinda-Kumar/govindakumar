# admin-service — Django (Control Plane)

This directory contains the Django project used to manage the portfolio content (projects, categories, admin UI).

## Useful commands (local / development)

- Start local dev (using docker-compose):
  - docker compose up -d admin-service
- Start a Django dev server (container):
  - docker compose exec admin-service python manage.py runserver 0.0.0.0:8000
- Make migrations (after changing models):
  - docker compose exec admin-service python manage.py makemigrations
- Apply migrations:
  - docker compose exec admin-service python manage.py migrate
- Collect static files (if needed):
  - docker compose exec admin-service python manage.py collectstatic --noinput
- Create superuser (interactive):
  - docker compose exec admin-service python manage.py createsuperuser
- Run tests:
  - docker compose exec admin-service python manage.py test

Notes on static files:
- Best practice: do not commit `staticfiles/` to version control. Use `collectstatic` as part of the build process (CI or Dockerfile) and serve the generated files from the container or an external storage (CDN or object storage) in production.
- If you must commit them for quick local testing, add them deliberately and remember to remove them or switch to a build-step later.

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
- Secrets should be stored in CI or Render environment variables for production; do not commit `.env` files.