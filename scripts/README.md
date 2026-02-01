# Scripts

Helper automation scripts for CI/CD and local development.

## Available Scripts

### CI/CD
- `build_and_push.sh` - Build and push Docker images to GHCR
- `deploy_to_render.sh` - Trigger Render deployment via webhook

### Local Development
- `generate_mkcert.sh` - Generate local TLS certificates with mkcert
- `validate_certs.sh` - Validate TLS certificate configuration
- `local_check.sh` - Run local environment health checks

## Usage

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Generate local HTTPS certificates
./scripts/generate_mkcert.sh

# Validate certificates
./scripts/validate_certs.sh
```

## Documentation

See the [main README](../README.md) for complete setup and deployment instructions.
