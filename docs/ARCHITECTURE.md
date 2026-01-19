# Overseer Architecture

## Overview

Overseer is a homelab control plane consisting of three main components:

1. **Core** - API server and web UI
2. **Agent** - Node agent that executes tasks
3. **Integrations** - Third-party service integrations

## Components

### Core API

- **Technology**: Node.js with Express or Go
- **Database**: PostgreSQL (via Prisma)
- **Queue**: Redis with BullMQ
- **Responsibilities**:
  - API endpoints for management
  - State management and persistence
  - Job queuing and orchestration
  - Integration with external services

### Core Web

- **Technology**: React + Vite + TypeScript
- **UI Framework**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Responsibilities**:
  - User interface for all operations
  - Real-time status updates
  - Dashboard and monitoring views

### Agent

- **Technology**: Go
- **Responsibilities**:
  - Register with core and send heartbeats
  - Execute Docker Compose deployments
  - Stream container logs
  - Generate Traefik configurations
  - Run backup jobs
  - Collect metrics

## Data Flow

1. User creates app via UI → Core API
2. Core API stores app definition in PostgreSQL
3. Core API creates deployment job in Redis queue
4. Agent pulls job from queue
5. Agent deploys app via Docker Compose
6. Agent updates app status in Core API
7. Core API generates Traefik route configuration
8. Core API creates Cloudflare DNS record
9. App becomes accessible at configured domain

## Integration Points

- **Docker**: Direct API access for container management
- **Traefik**: File provider for dynamic route configuration
- **Cloudflare**: API for DNS and Tunnel management
- **Proxmox**: REST API for VM/LXC management
- **Prometheus**: Metrics collection
- **Loki**: Log aggregation
