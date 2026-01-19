---
name: secrets-management
description: Guide for managing secrets in Overseer including encryption, injection, and secure storage
---

# Overview

This skill helps you manage secrets in Overseer, including storing encrypted secrets, injecting them into deployments, and integrating with external secret management systems. Overseer uses encrypted-at-rest storage for all secrets.

## Key Concepts

### Secrets Management
Overseer provides a secure secrets management system that:
- **Encrypts secrets** at rest in the database
- **Decrypts on-demand** when needed for deployments
- **Scopes secrets** to specific apps or nodes
- **Audits access** to sensitive secrets
- **Supports multiple backends** (Infisical, Vault, Docker secrets)

### Secret Storage
Secrets can be stored at different scopes:
- **Global Secrets**: Available to all apps
- **App-scoped Secrets**: Specific to one application
- **Node-scoped Secrets**: Available only on specific nodes
- **Environment Secrets**: Per-environment variables

### Secret Injection
Secrets are injected into deployments:
- **Environment Variables**: Injected as env vars in Compose
- **Docker Secrets**: Mounted as Docker secrets
- **File Injection**: Written to files in containers
- **Runtime Decryption**: Decrypted only when needed

## When to Use This Skill

Use this skill when you need to:
1. **Store application secrets** like API keys, passwords, tokens
2. **Inject secrets into deployments** as environment variables
3. **Manage secrets across apps** with shared or scoped access
4. **Integrate with Vault** or other secret management systems
5. **Rotate secrets** securely without redeploying apps
6. **Audit secret access** for compliance and security
7. **Export/import secrets** for backup or migration

## Best Practices

1. **Never Hardcode**: Never hardcode secrets in Compose files or code
2. **Least Privilege**: Scope secrets to minimum required access
3. **Encryption**: Ensure all secrets are encrypted at rest
4. **Rotation**: Regularly rotate secrets, especially API keys
5. **Audit Logging**: Track all secret access and modifications
6. **Backup Strategy**: Backup encrypted secrets for disaster recovery
7. **Access Control**: Limit who can view/modify secrets

## Secret Management Operations

- **Create Secret**: Add new secret with name and value
- **Update Secret**: Modify secret value (creates new version)
- **Delete Secret**: Remove secret (also from history)
- **View Secret**: Display secret value (audited)
- **List Secrets**: Show all secrets (filtered by scope)
- **Rotate Secret**: Create new version of secret

## Secret Scopes

**Global Scope**
- Available to all apps and nodes
- Use for shared infrastructure secrets
- Example: Cloudflare API token

**App Scope**
- Available only to specific application
- Default scope for app-specific secrets
- Example: Database password for one app

**Node Scope**
- Available only on specific node
- Use for node-specific credentials
- Example: Node authentication token

## Secret Injection Methods

**Environment Variables** (most common)
```yaml
# Compose file
services:
  app:
    environment:
      - DATABASE_PASSWORD=${SECRET:db-password}
      - API_KEY=${SECRET:api-key}
```

**Docker Secrets**
```yaml
# Compose file
services:
  app:
    secrets:
      - db_password
secrets:
  db_password:
    external: true
```

**File Injection**
```yaml
# Overseer writes secret to file
volumes:
  - /etc/secrets/api-key:/run/secrets/api-key:ro
```

## API Endpoints

Secrets management endpoints:
- `POST /api/secrets` - Create new secret
- `GET /api/secrets` - List secrets (filtered)
- `GET /api/secrets/{id}` - Get secret metadata
- `POST /api/secrets/{id}/value` - Retrieve secret value (audited)
- `PUT /api/secrets/{id}` - Update secret value
- `DELETE /api/secrets/{id}` - Delete secret
- `POST /api/secrets/{id}/rotate` - Rotate secret

## Integration Points

- **Database**: Encrypted storage in PostgreSQL
- **Node Agents**: Decrypted on-demand for deployments
- **Compose Files**: Variables substituted during deployment
- **External Vaults**: Integrate with HashiCorp Vault, Infisical
- **Docker Secrets**: Support Docker native secrets
- **Audit Log**: Track all secret operations

## External Secret Backends

Overseer can integrate with:
- **HashiCorp Vault**: Pull secrets from Vault
- **Infisical**: Use Infisical as secret source
- **Docker Secrets**: Native Docker secrets support
- **Cloud Secrets**: AWS Secrets Manager, Azure Key Vault (future)

## Workflow

1. **Identify Secret**: Determine what secrets are needed
2. **Create Secret**: Add secret to Overseer with appropriate scope
3. **Reference in Compose**: Use `${SECRET:name}` in Compose files
4. **Deploy App**: Overseer injects secrets during deployment
5. **Verify Injection**: Confirm secrets are available in container
6. **Monitor Access**: Review audit logs for secret access
7. **Rotate Regularly**: Update secrets periodically

## Security Considerations

- **Encryption**: All secrets encrypted using AES-256
- **Key Management**: Encryption keys stored securely, rotated regularly
- **Access Control**: RBAC controls who can view/modify secrets
- **Audit Logging**: All secret access is logged with user attribution
- **No Plaintext**: Secrets never stored or transmitted in plaintext
- **Agent Security**: Agents only receive decrypted secrets during deployment
- **Runtime Security**: Secrets decrypted only when needed

## Troubleshooting

Common issues:
- **Secret not found**: Check secret name and scope
- **Injection failed**: Verify Compose variable syntax
- **Access denied**: Check RBAC permissions
- **Decryption error**: Verify encryption key availability
