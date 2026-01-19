---
name: app-catalog-management
description: Guide for managing Overseer's app catalog including creating templates, deploying apps, and maintaining the catalog
---

# Overview

This skill helps you manage Overseer's app catalog, which provides pre-configured application templates for one-click deployment. The catalog is a core feature that enables rapid service deployment with best-practice configurations.

## Key Concepts

### App Catalog
The app catalog is a curated collection of application templates that include:
- **Docker Compose** definitions
- **Default configurations** optimized for homelab use
- **Environment variable** templates
- **Volume configurations** for persistent data
- **Health check** definitions
- **Recommended resource limits**
- **Traefik labels** for automatic routing

### Catalog Categories
Apps are organized into categories:
- **Media**: Plex, Jellyfin, Sonarr, Radarr, etc.
- **Productivity**: Nextcloud, Gitea, Wiki.js, etc.
- **Security**: Vaultwarden, Authelia, etc.
- **DevOps**: Portainer, Uptime Kuma, Prometheus, etc.
- **AI Tools**: Ollama, Stable Diffusion, etc.
- **Personal Cloud**: Seafile, ownCloud, etc.

### App Template Structure
Each catalog app includes:
- **Metadata**: Name, description, category, version
- **Compose File**: Docker Compose YAML with services
- **Variables**: Template variables for customization
- **Icon/Logo**: Visual representation in UI
- **Documentation**: Setup instructions and notes
- **Default Values**: Sensible defaults for quick deployment

## When to Use This Skill

Use this skill when you need to:
1. **Deploy apps from catalog** using the one-click wizard
2. **Create new catalog templates** for custom applications
3. **Update existing templates** with new versions or fixes
4. **Customize app configurations** during deployment
5. **Share app templates** across different deployments
6. **Maintain catalog quality** and documentation
7. **Version app templates** for compatibility tracking

## Best Practices

1. **Template Variables**: Use variables for all customizable values
2. **Health Checks**: Always include health check endpoints
3. **Resource Limits**: Set appropriate CPU/memory limits
4. **Volume Management**: Use named volumes for persistent data
5. **Security Defaults**: Enable security best practices by default
6. **Documentation**: Provide clear setup and configuration notes
7. **Version Tracking**: Version templates for compatibility

## App Template Format

Example catalog app structure:
```yaml
# app-template.yaml
metadata:
  name: nextcloud
  displayName: Nextcloud
  description: Self-hosted file sync and share server
  category: productivity
  version: "28.0.0"
  icon: https://example.com/nextcloud-icon.png
  tags:
    - files
    - sync
    - productivity

compose:
  version: '3.8'
  services:
    nextcloud:
      image: ${IMAGE_TAG:-nextcloud:28}
      environment:
        - MYSQL_HOST=${DATABASE_HOST}
        - MYSQL_DATABASE=${DATABASE_NAME}
        - MYSQL_USER=${DATABASE_USER}
        - MYSQL_PASSWORD=${DATABASE_PASSWORD}
      volumes:
        - nextcloud-data:/var/www/html
      healthcheck:
        test: ["CMD", "curl", "-f", "http://localhost"]
        interval: 30s

variables:
  - name: IMAGE_TAG
    description: Nextcloud image tag
    default: "nextcloud:28"
    required: false
  - name: DATABASE_HOST
    description: Database hostname
    default: "db"
    required: true
```

## Deployment Wizard Flow

The deployment wizard guides users through:
1. **Select App**: Choose from catalog
2. **Configure Domain**: Set subdomain or custom domain
3. **Select Node**: Choose target deployment node
4. **Set Variables**: Configure app-specific variables
5. **Review**: Confirm configuration
6. **Deploy**: Execute deployment

## Catalog Management Operations

- **Add Template**: Create new app template from Compose file
- **Update Template**: Modify existing template (versioned)
- **Delete Template**: Remove deprecated templates
- **Import Template**: Import from external source (GitHub, etc.)
- **Export Template**: Export template for sharing
- **Template Validation**: Validate Compose syntax before adding

## Minimum Catalog Apps (MVP)

The MVP catalog should include at least 10 apps:
1. **Uptime Kuma**: Uptime monitoring
2. **Dashy**: Dashboard homepage
3. **Wiki.js**: Documentation wiki
4. **Gitea**: Git hosting
5. **Postgres**: PostgreSQL database
6. **Redis**: Redis cache
7. **MinIO**: S3-compatible object storage
8. **Paperless**: Document management
9. **Vaultwarden**: Password manager
10. **Nextcloud**: File sharing

## Workflow

1. **Identify Need**: Determine app to add to catalog
2. **Create Compose**: Write optimized Docker Compose file
3. **Define Variables**: Extract configurable values
4. **Add Metadata**: Provide name, description, category
5. **Test Template**: Validate template in test environment
6. **Add to Catalog**: Submit template to catalog
7. **Document**: Write setup and configuration notes
8. **Version**: Tag template with version number

## Integration Points

- **Compose Engine**: Templates become real Compose deployments
- **Secret Store**: Variables can reference Overseer secrets
- **Traefik**: Auto-configure routes from template labels
- **Cloudflare DNS**: Auto-create DNS records from domain config
- **Node Agents**: Templates deployed via agents
- **Version Control**: Templates can be Git-tracked

## Template Best Practices

- **Use Latest Tags Carefully**: Prefer specific version tags for stability
- **Health Checks**: Always define health check endpoints
- **Resource Awareness**: Set realistic resource limits
- **Security Hardening**: Use non-root users, read-only filesystems where possible
- **Backup Hints**: Document what volumes need backing up
- **Update Path**: Provide upgrade instructions in documentation
