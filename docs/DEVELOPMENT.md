# Development Guide

## Prerequisites

- Node.js 18+
- Go 1.21+
- Docker & Docker Compose
- PostgreSQL (or use docker-compose)
- Redis (or use docker-compose)

## Setup

### 1. Start Infrastructure

```bash
cd deploy
docker-compose up -d postgres redis
```

### 2. Setup Core API

```bash
cd core/api

# Install dependencies
npm install

# Setup database
npx prisma migrate dev
npx prisma generate

# Start development server
npm run dev
```

### 3. Setup Core Web

```bash
cd core/web

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Build Agent

```bash
cd agent

# Build agent binary
go build -o overseer-agent ./cmd/agent

# Run agent
./overseer-agent --core-url http://localhost:3000 --token YOUR_TOKEN
```

## Project Structure

```
overseer/
├── core/
│   ├── api/          # Backend API server
│   └── web/          # React frontend
├── agent/            # Go agent binary
├── packages/         # Shared packages
│   ├── types/        # TypeScript types
│   └── sdk/          # SDK (future)
├── deploy/           # Deployment files
│   ├── docker-compose.yml
│   └── traefik/
├── docs/             # Documentation
└── PROJECT-DOCS/     # Project requirements
```

## Database Migrations

```bash
# Create new migration
cd core/api
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

## Testing

```bash
# Test API
cd core/api
npm test

# Test Agent
cd agent
go test ./...
```
