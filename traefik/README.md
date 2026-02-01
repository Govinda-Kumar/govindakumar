# Traefik

Local reverse proxy for host-based routing and TLS termination during development.

## Configuration Files

- `traefik.yml` - Static configuration (entrypoints, providers)
- `dynamic.yml` - Dynamic routing rules and TLS options
- `acme.json` - Certificate storage (chmod 600, gitignored)

## Local HTTPS Setup

```bash
# Install mkcert (one-time)
brew install mkcert nss
mkcert -install

# Generate certificates
./scripts/generate_mkcert.sh

# Restart Traefik
docker compose up -d --force-recreate traefik
```

## Accessing Services

- Admin: https://admin.localhost/admin
- API: https://api.localhost/docs
- UI: https://ui.localhost
- Dashboard: http://localhost:8080
