---
name: traefik-routing
description: Guide for configuring Traefik reverse proxy routes for Overseer-managed applications
---

# Overview

This skill helps you configure Traefik routing for applications deployed through Overseer. Traefik serves as the standard ingress controller, with Overseer automatically generating dynamic configurations for each deployed app.

## Key Concepts

### Traefik Integration
Overseer integrates with Traefik using:
- **File Provider** (recommended): Overseer writes dynamic config files to a shared volume
- **Label-based** (optional): Docker Compose labels for advanced users
- **Automatic TLS**: Traefik manages Let's Encrypt certificates
- **Route Discovery**: Automatic route generation from app definitions

### Routing Strategy
1. **Automatic Route Creation**: Routes generated when apps are deployed
2. **Domain Configuration**: Each app gets a configured domain/subdomain
3. **TLS Termination**: Traefik handles SSL/TLS automatically
4. **Load Balancing**: Support for multiple backend instances
5. **Middleware Chains**: Apply auth, headers, redirects per route

### Route Components
- **Routers**: Define how requests are matched and routed
- **Services**: Backend services (containers) that handle requests
- **Middlewares**: Processing steps (auth, headers, rate limiting)
- **Certificates**: TLS certificate management (Let's Encrypt)

## When to Use This Skill

Use this skill when you need to:
1. **Configure routes** for newly deployed applications
2. **Set up custom domains** and subdomains
3. **Enable TLS/SSL** certificates for services
4. **Configure authentication** middleware (Basic Auth, OIDC)
5. **Set up redirects** and URL rewrites
6. **Configure rate limiting** and security headers
7. **Troubleshoot routing** issues and misconfigurations

## Best Practices

1. **Use File Provider**: Prefer file-based config for explicit control
2. **Centralized TLS**: Let Traefik manage all certificates via Let's Encrypt
3. **Health Checks**: Configure health check endpoints for services
4. **Secure Defaults**: Enable security headers by default
5. **Route Naming**: Use consistent naming conventions for routes
6. **Middleware Reuse**: Create reusable middleware components
7. **Monitoring**: Track route metrics and errors

## Traefik Configuration Structure

Overseer generates Traefik dynamic configs in this format:
```yaml
# Dynamic configuration snippet
http:
  routers:
    app-example:
      rule: "Host(`app.example.com`)"
      service: app-example-service
      tls:
        certResolver: letsencrypt
  services:
    app-example-service:
      loadBalancer:
        servers:
          - url: "http://container-name:8080"
  middlewares:
    app-example-auth:
      forwardAuth:
        address: "http://authelia:9091/api/verify?rd=https://authelia.example.com"
```

## Automatic Route Generation

Overseer automatically creates routes based on:
- **App domain** configured in app definition
- **Container ports** exposed in Compose
- **Health check endpoints** for service discovery
- **Traefik labels** in Compose (if using label provider)

## TLS/SSL Configuration

Traefik handles TLS automatically:
- **Let's Encrypt**: Automatic certificate issuance and renewal
- **Certificate Resolvers**: Configured per domain or globally
- **HTTP to HTTPS**: Automatic redirect for secure connections
- **Wildcard Certificates**: Support for wildcard domains

## Authentication Middleware

Common authentication patterns:
- **Forward Auth**: Integrate with Authelia/Keycloak
- **Basic Auth**: Simple username/password protection
- **OIDC**: OpenID Connect for SSO
- **IP Whitelist**: Restrict access by IP address

## Workflow

1. **Deploy App**: App deployed via Overseer with domain configured
2. **Generate Route**: Overseer creates Traefik route configuration
3. **Apply Config**: Dynamic config written to Traefik file provider
4. **Reload Traefik**: Traefik picks up new configuration
5. **Issue Certificate**: Traefik requests Let's Encrypt certificate
6. **Verify Route**: Test route accessibility and TLS
7. **Monitor Traffic**: Track route metrics and errors

## Route Management

Overseer provides these route operations:
- **Create Route**: Automatically on app deployment
- **Update Route**: Modify domain, backend, or middleware
- **Delete Route**: Remove route when app is stopped
- **View Routes**: List all active routes in Overseer UI
- **Route Health**: Check backend service health per route

## Integration Points

- **Docker Labels**: Read service labels from Compose deployments
- **File Provider**: Write dynamic configs to shared volume
- **Overseer API**: Manage routes via `/api/routes` endpoints
- **Let's Encrypt**: Automatic certificate management
- **Cloudflare DNS**: Coordinate DNS records with route creation
- **Authentication Providers**: Integrate with Authelia/Keycloak

## Troubleshooting

Common issues and solutions:
- **Route not working**: Check Traefik logs, verify backend service is running
- **Certificate errors**: Verify DNS propagation, check Let's Encrypt rate limits
- **502 Bad Gateway**: Check container health, verify service URL
- **Auth not working**: Verify middleware configuration, check auth provider
