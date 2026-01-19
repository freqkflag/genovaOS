---
name: docker-compose-deployment
description: Guide for deploying Docker Compose stacks to nodes through Overseer's agent-based system
---

# Overview

This skill helps you deploy and manage Docker Compose stacks across Overseer-managed nodes. Overseer uses agents on each node to execute Compose deployments, providing centralized control with distributed execution.

## Key Concepts

### Compose Stack Deployment
Overseer manages Docker Compose deployments by:
- **Storing stack definitions** in the core database
- **Sending deployment commands** to target node agents
- **Tracking deployment status** and version history
- **Supporting rollback** to previous stack definitions
- **Injecting secrets** as environment variables
- **Managing volumes** and network configurations

### Stack Lifecycle
1. **Define**: Create or import Compose YAML
2. **Configure**: Set target nodes, secrets, environment
3. **Deploy**: Agent executes `docker-compose up`
4. **Monitor**: Track container status and health
5. **Update**: Deploy new stack definition (versioned)
6. **Rollback**: Revert to previous known-good version

### Version Control
- Each deployment creates a new **stack version**
- Previous versions are **retained for rollback**
- **Last-known-good** state tracked automatically
- Changes are **audit logged** with user attribution

## When to Use This Skill

Use this skill when you need to:
1. **Deploy new applications** from catalog or custom Compose
2. **Update existing stacks** with new configurations
3. **Rollback failed deployments** to previous versions
4. **Manage multi-node deployments** (same stack on multiple nodes)
5. **Configure environment variables** and secrets injection
6. **Handle volume mounts** and persistent storage
7. **Set up container networks** and service discovery

## Best Practices

1. **Version Everything**: Always version stack definitions for rollback capability
2. **Test Locally First**: Validate Compose files before deploying to production nodes
3. **Use Health Checks**: Include container health checks in Compose definitions
4. **Secret Management**: Never hardcode secrets; use Overseer secrets management
5. **Resource Limits**: Set appropriate CPU/memory limits in Compose
6. **Graceful Shutdown**: Use proper stop signals and wait times
7. **Log Aggregation**: Configure logging drivers for centralized log collection

## API Endpoints

Core API endpoints for Compose deployment:
- `POST /api/apps` - Create new app definition
- `POST /api/apps/{id}/deploy` - Deploy app to target node(s)
- `GET /api/apps/{id}` - Get app details and current state
- `GET /api/apps/{id}/versions` - List deployment versions
- `POST /api/apps/{id}/rollback` - Rollback to previous version
- `DELETE /api/apps/{id}` - Stop and remove app

## Compose Template Structure

Example Compose structure for Overseer:
```yaml
version: '3.8'
services:
  app:
    image: ${IMAGE_TAG}
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - API_KEY=${API_KEY}
    volumes:
      - app-data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
volumes:
  app-data:
```

## Environment Variable Injection

Overseer automatically injects:
- **Secrets** from Overseer secret store
- **Node-specific variables** (hostname, IP, node ID)
- **Service discovery** endpoints
- **Traefik labels** for automatic routing

## Workflow

1. **Define Stack**: Create or select Compose YAML
2. **Configure Secrets**: Reference Overseer secrets by name
3. **Select Nodes**: Choose target nodes for deployment
4. **Review Configuration**: Validate environment and volumes
5. **Deploy**: Execute deployment via agent
6. **Monitor**: Watch deployment logs and container health
7. **Verify**: Confirm app is running and accessible
8. **Document**: Record any manual configuration needed

## Rollback Strategy

Overseer supports automatic rollback:
- **Failed health checks**: Auto-rollback if containers don't become healthy
- **Manual rollback**: Trigger rollback via API or UI
- **Version selection**: Choose specific version to rollback to
- **Preserved state**: Volumes and data remain intact during rollback

## Integration Points

- **Node Agents**: Execute Compose commands via Docker Engine API
- **Secret Store**: Inject encrypted secrets as environment variables
- **Traefik Integration**: Auto-configure routes based on Compose labels
- **Volume Management**: Track and manage persistent volumes
- **Log Streaming**: Stream container logs back to core for aggregation
- **Monitoring**: Health checks feed into monitoring system
