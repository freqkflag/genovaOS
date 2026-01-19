---
name: cloudflare-integration
description: Guide for integrating Cloudflare DNS, Tunnels, and Access with Overseer for domain management and secure remote access
---

# Overview

This skill helps you integrate Cloudflare services with Overseer for automated DNS management, secure tunnel configuration, and zero-trust access control. Cloudflare is a first-class integration in Overseer.

## Key Concepts

### Cloudflare Integration Components
Overseer integrates with three Cloudflare services:

1. **Cloudflare DNS**: Automated DNS record creation and management
2. **Cloudflare Tunnel (Cloudflared)**: Secure remote access without exposing ports
3. **Cloudflare Access**: Zero-trust authentication and authorization

### DNS Automation
- **Automatic Record Creation**: DNS records created when apps are deployed
- **A/AAAA Records**: Point domains to node IPs (for local access)
- **CNAME Records**: Alias domains or subdomains
- **TXT Records**: DNS verification for Let's Encrypt
- **Record Updates**: Automatic updates when node IPs change

### Cloudflare Tunnel
- **Cloudflared Daemon**: Runs on nodes or in containers
- **Private Network Access**: Access services without public IPs
- **Secure Routing**: Routes encrypted through Cloudflare network
- **Multiple Routes**: One tunnel can route multiple services
- **Automatic Configuration**: Overseer manages tunnel configs

### Cloudflare Access
- **Zero-Trust Model**: Every request requires authentication
- **SSO Integration**: Works with OIDC providers (Authelia/Keycloak)
- **Policy Rules**: Define who can access which applications
- **Audit Logging**: Track all access attempts and grants

## When to Use This Skill

Use this skill when you need to:
1. **Automate DNS record creation** for new app deployments
2. **Set up Cloudflare Tunnels** for secure remote access
3. **Configure Cloudflare Access** policies for apps
4. **Manage domain records** programmatically
5. **Troubleshoot DNS propagation** issues
6. **Update tunnel configurations** for new routes
7. **Integrate SSO** with Cloudflare Access

## Best Practices

1. **API Token Security**: Store Cloudflare API tokens securely in Overseer secrets
2. **DNS Propagation**: Account for DNS propagation delays (up to 5 minutes)
3. **Tunnel Health**: Monitor tunnel status and auto-restart on failure
4. **Access Policies**: Use least-privilege access policies
5. **Rate Limiting**: Be aware of Cloudflare API rate limits
6. **Backup Configs**: Keep backups of tunnel configurations
7. **Monitoring**: Track DNS record changes and tunnel health

## Cloudflare API Configuration

Overseer requires Cloudflare credentials:
- **API Token** (recommended): Scoped token with specific permissions
- **API Key + Email**: Alternative authentication method
- **Zone ID**: Required for DNS operations
- **Account ID**: Required for tunnel management

Required API token permissions:
- `Zone:Edit` - For DNS record management
- `Cloudflare Tunnel:Edit` - For tunnel configuration
- `Access: Edit` - For Access policy management

## DNS Automation Workflow

1. **App Deployed**: App configured with domain in Overseer
2. **Check DNS**: Overseer checks if DNS record exists
3. **Create Record**: Creates A/AAAA or CNAME record via API
4. **Wait for Propagation**: Monitor DNS propagation status
5. **Issue Certificate**: Traefik can now issue Let's Encrypt cert
6. **Route Active**: Service becomes accessible via domain

## Cloudflare Tunnel Setup

Overseer can manage tunnels in two ways:

**Option 1: Overseer-managed Tunnel**
- Cloudflared runs as container on node
- Overseer generates tunnel configuration
- Automatic route management
- Health monitoring and restart

**Option 2: Existing Tunnel**
- Connect to existing tunnel via Cloudflare API
- Add/remove routes via Overseer
- Manual tunnel management

## Tunnel Configuration Example

```yaml
# Overseer generates tunnel config
tunnel: <tunnel-id>
credentials-file: /etc/cloudflared/credentials.json

ingress:
  - hostname: app1.example.com
    service: http://localhost:8080
  - hostname: app2.example.com
    service: http://localhost:9090
  - service: http_status:404
```

## Cloudflare Access Integration

Access policies can be managed via:
- **Overseer UI**: Define policies per application
- **API**: Programmatic policy management
- **Policy Templates**: Reusable policy patterns

Example Access Policy:
- **Application**: app.example.com
- **Policy**: Allow users in specific groups
- **Auth Provider**: Authelia OIDC
- **Session Duration**: 24 hours

## API Endpoints

Overseer Cloudflare integration endpoints:
- `POST /api/integrations/cloudflare/test` - Test Cloudflare credentials
- `GET /api/integrations/cloudflare/zones` - List available zones
- `POST /api/integrations/cloudflare/dns` - Create DNS record
- `GET /api/integrations/cloudflare/tunnels` - List tunnels
- `POST /api/integrations/cloudflare/tunnels` - Create tunnel
- `POST /api/integrations/cloudflare/access/policies` - Create Access policy

## Workflow

1. **Configure Credentials**: Add Cloudflare API token to Overseer secrets
2. **Select Zone**: Choose Cloudflare zone for domain management
3. **Deploy App**: Deploy app with domain configured
4. **DNS Created**: Overseer creates DNS record automatically
5. **Tunnel Configured**: Route added to Cloudflare Tunnel (if enabled)
6. **Access Policy**: Cloudflare Access policy applied (if configured)
7. **Verify Access**: Test domain accessibility and authentication

## Integration Points

- **DNS API**: Create/update/delete DNS records
- **Tunnel API**: Manage tunnel configurations and routes
- **Access API**: Configure zero-trust access policies
- **Traefik**: Coordinate DNS with Let's Encrypt certificate issuance
- **Agent Nodes**: Deploy and manage cloudflared on nodes
- **OIDC Providers**: Integrate Access with Authelia/Keycloak

## Troubleshooting

Common issues:
- **DNS not updating**: Check API token permissions, verify zone ID
- **Tunnel offline**: Check cloudflared logs, verify credentials
- **Access denied**: Verify Access policy, check user groups
- **Certificate errors**: Ensure DNS propagated before cert issuance
