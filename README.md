# Overseer (genovaOS)

An OS-agnostic homelab control plane that unifies Docker/Compose, Traefik ingress, Cloudflare DNS/Tunnels/Access, and Proxmox into a single secure UI + API with GitOps and automation.

[![CI](https://github.com/freqkflag/genovaOS/actions/workflows/ci.yml/badge.svg)](https://github.com/freqkflag/genovaOS/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Primary Goal

Deploy an app to `app.yourdomain.tld` in minutes with:
- DNS record
- TLS certificate
- Reverse proxy route
- Optional auth gate
- Monitoring + backup policy attached

## 🏗️ Architecture

- **Overseer Core**: API + UI (Node.js/NestJS or Go)
- **Overseer Agent**: Runs on managed nodes (Go)
- **Provider Integrations**: Docker, Traefik, Cloudflare, Proxmox

## 📦 Components

- `core/api/` - Backend API server
- `core/web/` - React + Vite frontend
- `agent/` - Node agent binary
- `packages/` - Shared SDK and types
- `deploy/` - Docker Compose deployment files

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- PostgreSQL (or use included docker-compose)
- Redis (or use included docker-compose)
- Node.js 18+ (for development)
- Go 1.21+ (for agent development)

### Development Setup

```bash
# Start core services
cd deploy
docker-compose up -d postgres redis

# Start core API (from core/api)
npm install
npm run dev

# Start web UI (from core/web)
npm install
npm run dev

# Build agent (from agent/)
go build -o overseer-agent ./cmd/agent
```

## 📚 Documentation

- [Product Requirements](./PROJECT-DOCS/PRD.md)
- [Specification Sheet](./PROJECT-DOCS/spec-sheet.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Contributing](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md)

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/freqkflag/genovaOS)
- [Issues](https://github.com/freqkflag/genovaOS/issues)
- [Discussions](https://github.com/freqkflag/genovaOS/discussions)

## 🛣️ Roadmap

### Phase 1 (MVP)
- Node agent registration
- Docker Compose deployment
- App catalog templates
- Traefik route automation
- Cloudflare DNS automation
- Logs and rollback
- Secrets management
- Basic audit logging

### Phase 2
- Authentication (OIDC)
- Cloudflare Tunnels
- Monitoring/metrics
- Backup automation

### Phase 3
- GitOps sync
- Proxmox API integration
- Plugin SDK

## 📄 License

MIT
