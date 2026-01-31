#!/usr/bin/env bash
set -euo pipefail

# Local smoke tests for the dev stack
# Usage: ./scripts/local_check.sh
# Exits non-zero on failures

RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

fail() { echo -e "${RED}✖ $*${RESET}"; exit 1; }
ok()   { echo -e "${GREEN}✔ $*${RESET}"; }
warn() { echo -e "${YELLOW}⚠ $*${RESET}"; }

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CD="cd $ROOT_DIR"

echo "Running local checks..."

# 1) Docker Compose up check
if ! command -v docker >/dev/null 2>&1; then
  fail "docker is not installed or not on PATH"
fi
if ! docker compose ps >/dev/null 2>&1; then
  fail "docker-compose appears unavailable or no docker context. Run: docker compose up -d traefik db admin-service api-service portfolio-ui"
fi
ok "docker compose is available"

# 2) Check services are running (POSIX-friendly)
REQUIRED="db admin-service api-service portfolio-ui traefik"
MISSING=""
for svc in $REQUIRED; do
  status=$(docker compose ps --services --filter "status=running" | grep -x "$svc" || true)
  if [ -z "$status" ]; then
    MISSING="$MISSING $svc"
  fi
done
if [ -n "$(echo "$MISSING" | sed -e 's/^ *//')" ]; then
  warn "Some services are not running: $(echo "$MISSING" | sed -e 's/^ *//')"
  echo "Start them: docker compose up -d $(echo "$MISSING" | sed -e 's/^ *//')"
else
  ok "All required containers are running"
fi

# 3) DB health
if docker compose ps db >/dev/null 2>&1; then
  db_health=$(docker inspect $(docker compose ps -q db) --format '{{json .State.Health}}' 2>/dev/null || true)
  case "$db_health" in
    *Healthy*) ok "Postgres DB is healthy" ;;
    *) warn "Postgres DB is not healthy or has no healthcheck (check logs)" ;;
  esac
fi

# 4) Traefik dashboard
if curl -sS http://localhost:8080/api/http/routers >/dev/null 2>&1; then
  ok "Traefik dashboard API reachable"
else
  warn "Traefik dashboard API not reachable at http://localhost:8080 — check traefik logs"
fi

# 5) API health (HTTP through Traefik)
set +e
api_code=$(curl -sS -o /dev/null -w "%{http_code}" -H "Host: api.localhost" http://localhost/health 2>/dev/null)
if [ "$api_code" = "200" ]; then
  ok "API health check (http) returned 200"
else
  warn "API health check (http) returned $api_code — try: curl -H 'Host: api.localhost' http://localhost/health"
fi

# 6) HTTPS checks (will use -k to allow self-signed while testing)
admin_code=$(curl -sk -o /dev/null -w "%{http_code}" -H "Host: admin.localhost" https://localhost/ 2>/dev/null)
ui_code=$(curl -sk -o /dev/null -w "%{http_code}" -H "Host: ui.localhost" https://localhost/ 2>/dev/null)
api_https_code=$(curl -sk -o /dev/null -w "%{http_code}" -H "Host: api.localhost" https://localhost/health 2>/dev/null)

if [ "$admin_code" = "200" ]; then ok "Admin (HTTPS) reachable"; else warn "Admin (HTTPS) returned $admin_code"; fi
if [ "$ui_code" = "200" ]; then ok "UI (HTTPS) reachable"; else warn "UI (HTTPS) returned $ui_code"; fi
if [ "$api_https_code" = "200" ]; then ok "API (HTTPS) reachable"; else warn "API (HTTPS) returned $api_https_code"; fi
set -e

# 7) Certificates check
if [ -f "$ROOT_DIR/traefik/certs/localhost.pem" ] && [ -f "$ROOT_DIR/traefik/certs/localhost-key.pem" ]; then
  ok "TLS cert and key files exist in traefik/certs/"
else
  warn "TLS certs not found in traefik/certs/. Run: ./scripts/generate_mkcert.sh or create certs and restart Traefik"
fi

# 8) Static files check (admin)
if [ -d "$ROOT_DIR/admin-service/staticfiles" ]; then
  warn "admin-service/staticfiles/ exists locally (committed). Recommended: do not commit; use collectstatic in build/CI"
else
  ok "No committed staticfiles directory detected (good)"
fi

# 9) Migration status (Django)
if docker compose ps admin-service >/dev/null 2>&1; then
  set +e
  docker compose exec admin-service python manage.py showmigrations --plan | sed -n '1,20p'
  if [ $? -eq 0 ]; then
    ok "Django migrations are viewable with showmigrations --plan"
  else
    warn "Unable to run showmigrations --plan; check admin-service logs"
  fi
  set -e
fi

echo
ok "Local checks completed (see warnings above if any)"

# Provide exit status 0 even if warnings occurred (user can inspect logs). Change behavior if you prefer hard-fail on warnings.
exit 0
