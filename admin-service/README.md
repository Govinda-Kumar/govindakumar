# Admin Service

Django-based CMS for managing portfolio content (projects, categories, admin UI).

## Quick Start

```bash
# Start service
docker compose up -d admin-service

# Create superuser
docker compose exec admin-service python manage.py createsuperuser

# Access admin panel
https://admin.localhost/admin
```

## Common Commands

```bash
# Migrations
docker compose exec admin-service python manage.py makemigrations
docker compose exec admin-service python manage.py migrate

# Static files
docker compose exec admin-service python manage.py collectstatic --noinput

# Tests
docker compose exec admin-service python manage.py test
```

## Configuration

Environment variables (configured in docker-compose.yml or Render):
- `DJANGO_SECRET_KEY` - Django secret key
- `DJANGO_DEBUG` - Debug mode (True/False)
- `DJANGO_ALLOWED_HOSTS` - Allowed hosts
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ALLOWED_ORIGINS` - CORS allowed origins
