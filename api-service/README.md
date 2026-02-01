# API Service

FastAPI-based REST API providing JSON endpoints for the portfolio application.

## Quick Start

```bash
# Start service
docker compose up -d api-service

# Access API docs
https://api.localhost/docs

# Health check
curl -H "Host: api.localhost" http://localhost/health
```

## Common Commands

```bash
# Run tests
docker compose exec api-service pytest

# View logs
docker compose logs -f api-service
```

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /projects` - List/filter projects
- `GET /projects/featured` - Get featured project
- `GET /projects/search?q=query` - Search projects

## Configuration

Environment variables (configured in docker-compose.yml or Render):
- `DATABASE_URL` - PostgreSQL connection string
- `ENV` - Environment (development/production)
- `CORS_ALLOWED_ORIGINS` - Comma-separated allowed origins

