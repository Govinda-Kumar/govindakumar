#!/usr/bin/env bash
set -euo pipefail
# Generate a single mkcert cert for admin.localhost, api.localhost, ui.localhost
CERT_DIR="$(cd "$(dirname "$0")/.." && pwd)/traefik/certs"
mkdir -p "$CERT_DIR"
if ! command -v mkcert >/dev/null 2>&1; then
  echo "mkcert not found. Install mkcert (macOS: brew install mkcert nss) and run 'mkcert -install' first."
  exit 1
fi
mkcert -cert-file "$CERT_DIR/localhost.pem" -key-file "$CERT_DIR/localhost-key.pem" admin.localhost api.localhost ui.localhost
chmod 600 "$CERT_DIR/localhost-key.pem"
chown $(id -u):$(id -g) "$CERT_DIR/localhost-key.pem" || true
echo "Certificates written to $CERT_DIR"

echo "Restart Traefik: docker compose up -d --force-recreate traefik"