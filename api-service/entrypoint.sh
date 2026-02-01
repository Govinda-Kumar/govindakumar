#!/usr/bin/env sh
set -e

# Parse DATABASE_URL if set, otherwise use defaults
if [ -n "${DATABASE_URL}" ]; then
  # Extract host and port from DATABASE_URL
  # Format: postgresql://user:pass@host:port/db
  POSTGRES_HOST=$(echo $DATABASE_URL | sed -n 's|.*@\([^:]*\):.*|\1|p')
  POSTGRES_PORT=$(echo $DATABASE_URL | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
fi

# Use extracted values or defaults
POSTGRES_HOST=${POSTGRES_HOST:-db}
POSTGRES_PORT=${POSTGRES_PORT:-5432}

echo "Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."
until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" >/dev/null 2>&1; do
  echo "Waiting for postgres..."
  sleep 2
done
echo "Postgres is ready!"

# Execute the container CMD
exec "$@"
