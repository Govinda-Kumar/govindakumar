#!/usr/bin/env sh
set -e

echo "Waiting for Postgres..."
until pg_isready -h "${POSTGRES_HOST:-db}" -p "${POSTGRES_PORT:-5432}" >/dev/null 2>&1; do
  echo "Waiting for postgres..."
  sleep 1
done

# Execute the container CMD
exec "$@"
