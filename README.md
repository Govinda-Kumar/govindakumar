# GovindaKumar Portfolio

> A modern, full-stack portfolio application built with Django, FastAPI, React, and deployed on Render.

[![CircleCI](https://img.shields.io/circleci/build/github/YOUR_USERNAME/govindakumar/main)](https://circleci.com/gh/YOUR_USERNAME/govindakumar)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🚀 Overview

GovindaKumar Portfolio is a three-tier web application featuring:
- **Admin Service**: Django-based CMS for managing portfolio content
- **API Service**: FastAPI backend providing RESTful APIs
- **Portfolio UI**: React + Vite frontend with modern UI/UX

## 📋 Tech Stack

- **Backend**: Django 5.x, FastAPI, PostgreSQL
- **Frontend**: React 18, Vite, TailwindCSS
- **Infrastructure**: Docker, Traefik, Nginx
- **CI/CD**: CircleCI, GitHub Container Registry
- **Deployment**: Render

## 🏗️ Project Structure

```
govindakumar/
├── admin-service/     # Django CMS (Control Plane)
├── api-service/       # FastAPI REST API (Data Plane)
├── portfolio-ui/      # React + Vite Frontend
├── scripts/           # Helper automation scripts
├── traefik/           # Local reverse proxy config
└── docker-compose.yml # Development orchestration
```

## 🚦 Quick Start

### Prerequisites

- Docker & Docker Compose v2+
- Node.js 18+ (for local frontend dev)
- Python 3.12+ (for local backend dev)
- mkcert (optional, for local HTTPS)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/govindakumar.git
   cd govindakumar
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

3. **Generate local TLS certificates** (optional)
   ```bash
   brew install mkcert nss  # macOS
   mkcert -install
   ./scripts/generate_mkcert.sh
   ```

4. **Start services**
   ```bash
   docker compose up -d
   ```

5. **Access services**
   - Frontend: https://ui.localhost
   - Admin Panel: https://admin.localhost/admin
   - API Docs: https://api.localhost/docs

6. **Create Django superuser**
   ```bash
   docker compose exec admin-service python manage.py createsuperuser
   ```

### Common Commands

```bash
# View logs
docker compose logs -f [service-name]

# Run Django migrations
docker compose exec admin-service python manage.py migrate

# Run tests
docker compose exec admin-service python manage.py test
docker compose exec api-service pytest

# Rebuild services
docker compose build [service-name]

# Stop services
docker compose down
```

## 🧪 Testing

### Backend Tests
```bash
# Django tests
docker compose exec admin-service python manage.py test

# FastAPI tests
docker compose exec api-service pytest -v
```

### Frontend Tests
```bash
cd portfolio-ui
npm test
```

## 🚢 Deployment

### Production Build (Local)

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Test locally
docker compose -f docker-compose.prod.yml up -d
```

### CI/CD Pipeline

The project uses CircleCI for continuous integration and deployment:

1. **Tests**: Run unit and integration tests
2. **Build**: Build Docker images
3. **Push**: Push images to GitHub Container Registry
4. **Deploy**: Automatic deployment to Render (main branch only)

## 🛠️ Development

### Adding a New Feature

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests
   ```bash
   docker compose exec admin-service python manage.py test
   docker compose exec api-service pytest
   ```

4. Commit and push
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request

### Code Style

- Python: Follow PEP 8
- JavaScript: ESLint configuration included
- Commit messages: Follow [Conventional Commits](https://www.conventionalcommits.org/)

## 📖 Documentation

Detailed documentation for each service:

- [Admin Service](admin-service/README.md) - Django CMS documentation
- [API Service](api-service/README.md) - FastAPI endpoints and models
- [Portfolio UI](portfolio-ui/README.md) - React frontend documentation
- [Scripts](scripts/README.md) - Automation scripts documentation
- [Traefik](traefik/README.md) - Local proxy configuration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by portfolio best practices
- Community-driven development

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a portfolio project. Sensitive configuration details and deployment specifics are documented separately for contributors.

