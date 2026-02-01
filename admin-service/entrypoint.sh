#!/usr/bin/env sh
set -e

# Parse DATABASE_URL if set, otherwise use defaults
if [ -n "${DATABASE_URL}" ]; then
  echo "DATABASE_URL is set, extracting connection details..."
  # Extract host from DATABASE_URL
  # Format: postgresql://user:pass@host:port/db or postgresql://user:pass@host/db
  POSTGRES_HOST=$(echo "$DATABASE_URL" | sed -E 's|.*@([^:/]+).*|\1|')
  # Extract port if present, otherwise use 5432
  POSTGRES_PORT=$(echo "$DATABASE_URL" | grep -oE ':[0-9]+/' | tr -d ':/' || echo "5432")
  [ -z "$POSTGRES_PORT" ] && POSTGRES_PORT=5432
  echo "Extracted host: $POSTGRES_HOST, port: $POSTGRES_PORT"
else
  POSTGRES_HOST=${POSTGRES_HOST:-db}
  POSTGRES_PORT=${POSTGRES_PORT:-5432}
  echo "Using default host: $POSTGRES_HOST, port: $POSTGRES_PORT"
fi

echo "Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" >/dev/null 2>&1; do
  echo "Waiting for postgres..."
  sleep 2
done
echo "Postgres is ready!"

# Run migrations and collectstatic
echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Execute the container CMD
exec "$@"
