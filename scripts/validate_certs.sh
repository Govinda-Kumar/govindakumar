#!/usr/bin/env bash
set -euo pipefail
CERT_DIR="$(cd "$(dirname "$0")/.." && pwd)/traefik/certs"
if [ ! -f "$CERT_DIR/localhost.pem" ] || [ ! -f "$CERT_DIR/localhost-key.pem" ]; then
  echo "Certs not found in $CERT_DIR. Run scripts/generate_mkcert.sh or create your certs there."
  exit 2
fi
echo "Certificate details:"
openssl x509 -noout -text -in "$CERT_DIR/localhost.pem" | sed -n '1,40p'

echo "Key details:"
openssl rsa -noout -text -in "$CERT_DIR/localhost-key.pem" | sed -n '1,20p' || true

echo "OpenSSL exit status: $?"