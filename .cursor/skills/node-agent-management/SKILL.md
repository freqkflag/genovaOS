---
name: node-agent-management
description: Guide for managing Overseer node agents including registration, heartbeat monitoring, and agent configuration
---

# Overview

This skill helps you manage Overseer node agents that run on remote nodes to execute deployment and management tasks. Agents communicate with the Overseer Core API and operate autonomously, even during brief outages.

## Key Concepts

### Overseer Agent
The Overseer Agent is a lightweight service that runs on each managed node. Agents:
- **Register** with the Overseer Core API
- **Send heartbeats** to indicate health and status
- **Execute tasks** like Docker Compose deployments
- **Stream logs** from containers back to core
- **Generate Traefik configs** for routing
- **Run backup jobs** using restic/rclone
- **Collect metrics** and report node status

### Agent Deployment Options
- **Systemd service** (preferred): Single static Go binary with systemd unit
- **Docker container**: Containerized agent with Docker socket mount

### Agent Architecture
- **Stateless operation**: Agents can operate with cached desired state during core outages
- **Token-based auth**: Signed tokens for secure communication
- **Node-scoped permissions**: Each agent only manages its assigned node
- **Encrypted secrets**: Secrets decrypted on-demand, never stored plaintext

## When to Use This Skill

Use this skill when you need to:
1. **Register new nodes** with Overseer
2. **Configure agent installation** on remote nodes
3. **Troubleshoot agent connectivity** issues
4. **Monitor agent health** and heartbeat status
5. **Update agent configurations** or versions
6. **Handle agent authentication** and token management
7. **Set up agent deployment** via systemd or Docker

## Best Practices

1. **Token Security**: Use signed tokens with expiration for agent authentication
2. **Mutual TLS**: Consider mutual TLS for additional security layer
3. **Heartbeat Monitoring**: Monitor heartbeat frequency (default: every 10 seconds)
4. **Offline Resilience**: Design agents to cache desired state for offline operation
5. **Resource Limits**: Set appropriate resource limits for agent containers
6. **Audit Logging**: Log all agent registration and authentication events
7. **Version Management**: Track agent versions for compatibility checks

## API Endpoints

Core API endpoints for node management:
- `POST /api/nodes/register` - Register a new node agent
- `GET /api/nodes` - List all registered nodes
- `GET /api/nodes/{id}` - Get node details
- `GET /api/nodes/{id}/status` - Get node health status
- `PUT /api/nodes/{id}/config` - Update node configuration
- `DELETE /api/nodes/{id}` - Deregister a node

## Agent Capabilities

Minimum agent capabilities include:
- **Docker Compose**: Deploy, stop, update Compose stacks
- **Log Streaming**: Stream container logs to core
- **Traefik Config**: Write dynamic config snippets or apply labels
- **Backup Execution**: Run restic/rclone backup jobs
- **Metrics Collection**: Collect and send node/container metrics
- **Heartbeat**: Send periodic heartbeat with node status

## Workflow

1. **Prepare Node**: Ensure Docker and required tools are installed
2. **Download Agent**: Download agent binary or container image
3. **Configure Agent**: Set core API endpoint, authentication token
4. **Register Node**: Agent registers with core on first startup
5. **Verify Connection**: Check heartbeat appears in core UI within 10 seconds
6. **Monitor Health**: Track agent status and respond to alerts
7. **Update When Needed**: Roll out agent updates using deployment method

## Security Considerations

- Agents use **least-privilege** access patterns
- **Node-scoped permissions** prevent cross-node access
- **Secrets decrypted on-demand** only when needed for deployments
- **Audit logging** tracks all agent-initiated actions
- **Token rotation** recommended for long-running agents

## Integration Points

- **Overseer Core API**: Agents communicate via REST API
- **Docker Engine API**: Direct access for container management
- **Traefik File Provider**: Write dynamic configs to shared volume
- **Restic/Rclone**: Execute backup jobs with proper credentials
- **Prometheus**: Export metrics for monitoring integration
