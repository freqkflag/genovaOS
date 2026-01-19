# Overseer Project Structure

## Overview

Overseer is scaffolded with a complete project structure ready for development. This document outlines what has been created.

## Directory Structure

```
overseer/
├── .cursor/              # Cursor IDE skills and configuration
│   └── skills/           # Agent skills for Codex
├── core/                 # Core services
│   ├── api/              # Backend API server (Node.js/Express)
│   │   ├── src/          # Source code
│   │   │   ├── routes/   # API route handlers
│   │   │   ├── middleware/ # Express middleware
│   │   │   ├── db/       # Database connection
│   │   │   └── queue/    # Redis queue management
│   │   ├── prisma/       # Database schema and migrations
│   │   └── Dockerfile    # Production Docker image
│   └── web/              # Frontend React application
│       ├── src/          # Source code
│       │   ├── components/ # React components
│       │   └── pages/    # Page components
│       └── Dockerfile    # Production Docker image
├── agent/                # Node agent binary (Go)
│   ├── cmd/agent/        # Main entry point
│   └── internal/         # Internal packages
│       ├── config/       # Configuration management
│       ├── core/         # Core agent logic
│       ├── docker/       # Docker client
│       └── heartbeat/    # Heartbeat client
├── packages/             # Shared packages
│   └── types/            # TypeScript shared types
├── deploy/               # Deployment files
│   ├── docker-compose.yml # Core services (Postgres, Redis)
│   └── traefik/          # Traefik configuration
├── docs/                 # Documentation
├── PROJECT-DOCS/         # Project requirements and specs
└── README.md             # Project README
```

## Components

### Core API (`core/api/`)

**Technology Stack:**
- Node.js with Express
- TypeScript
- Prisma ORM
- Redis/BullMQ for job queues
- PostgreSQL database

**Key Features:**
- RESTful API endpoints for all resources
- Database schema defined in Prisma
- Job queue management with Redis
- Middleware for logging, error handling, audit
- Environment-based configuration

**API Endpoints:**
- `/api/nodes` - Node management
- `/api/apps` - Application management
- `/api/routes` - Route management
- `/api/secrets` - Secrets management
- `/api/jobs` - Job management
- `/api/audit` - Audit log
- `/api/integrations` - External integrations

### Core Web (`core/web/`)

**Technology Stack:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Zustand

**Key Features:**
- Modern React with hooks
- Responsive UI with Tailwind CSS
- Client-side routing
- API state management
- Dashboard and management pages

**Pages:**
- Dashboard - Overview of nodes, apps, jobs
- Nodes - Node management
- Apps - Application management
- Catalog - App catalog browsing
- Routes - Route management
- Secrets - Secrets management
- Jobs - Job monitoring
- Audit - Audit log viewing

### Agent (`agent/`)

**Technology Stack:**
- Go 1.21+
- Docker API client
- HTTP client for core communication

**Key Features:**
- Registration with core API
- Heartbeat mechanism
- Docker Compose deployment
- Container log streaming
- Traefik config generation
- Backup job execution

**Structure:**
- `cmd/agent/main.go` - Main entry point
- `internal/config/` - Configuration management
- `internal/core/` - Core agent logic
- `internal/docker/` - Docker client wrapper
- `internal/heartbeat/` - Heartbeat implementation

### Shared Types (`packages/types/`)

TypeScript types shared between core API and web:
- Node
- App
- Route
- Secret
- Job
- AuditEvent

## Database Schema

Prisma schema includes:
- **User** - User accounts and authentication
- **Node** - Managed nodes
- **App** - Application definitions
- **AppVersion** - App version history for rollback
- **Route** - Traefik routes
- **Secret** - Encrypted secrets
- **Job** - Background jobs
- **AuditEvent** - Audit log entries

## Development Setup

### Prerequisites

- Node.js 18+
- Go 1.21+
- Docker & Docker Compose
- PostgreSQL (via docker-compose)
- Redis (via docker-compose)

### Quick Start

1. **Start Infrastructure:**
   ```bash
   cd deploy
   docker-compose up -d postgres redis
   ```

2. **Setup Core API:**
   ```bash
   cd core/api
   npm install
   npx prisma migrate dev
   npx prisma generate
   npm run dev
   ```

3. **Setup Core Web:**
   ```bash
   cd core/web
   npm install
   npm run dev
   ```

4. **Build Agent:**
   ```bash
   cd agent
   go build -o overseer-agent ./cmd/agent
   ./overseer-agent --core-url http://localhost:3000 --token YOUR_TOKEN
   ```

## Next Steps

1. **Implement API Routes** - Complete all route handlers in `core/api/src/routes/`
2. **Implement Agent Features** - Complete Docker Compose deployment logic
3. **Build UI Components** - Complete all page components with API integration
4. **Add Authentication** - Implement OIDC authentication
5. **Integrate Cloudflare** - Add DNS and Tunnel management
6. **Integrate Traefik** - Generate dynamic route configs
7. **Add App Catalog** - Build catalog template system
8. **Implement Secrets** - Add encryption and secret injection
9. **Add Monitoring** - Integrate Prometheus, Grafana, Loki
10. **Proxmox Integration** - Add VM/LXC management

## Configuration

### Core API
- Environment variables in `.env.example`
- Prisma configuration in `prisma/schema.prisma`
- TypeScript config in `tsconfig.json`

### Agent
- Configuration file: `config.example.json`
- Command-line flags: `--core-url`, `--token`, `--config`

### Web
- Vite configuration in `vite.config.ts`
- Tailwind config in `tailwind.config.js`

## Documentation

- `README.md` - Project overview
- `docs/ARCHITECTURE.md` - System architecture
- `docs/DEVELOPMENT.md` - Development guide
- `PROJECT-DOCS/PRD.md` - Product requirements
- `PROJECT-DOCS/spec-sheet.md` - Detailed specification
