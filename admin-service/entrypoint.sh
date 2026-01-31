#!/usr/bin/env sh
set -e

echo "Waiting for Postgres..."
until pg_isready -h "${POSTGRES_HOST:-db}" -p "${POSTGRES_PORT:-5432}" >/dev/null 2>&1; do
  echo "Waiting for postgres..."
  sleep 1
done

# Run migrations and collectstatic
echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Execute the container CMD
exec "$@"
