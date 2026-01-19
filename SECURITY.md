# Security Policy

## Supported Versions

We actively support the following versions of Overseer with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** report it via public GitHub issues.

Instead, please report it via one of the following methods:

1. **Email**: Send a detailed report to [security@overseer.dev] (if available)
2. **Private Security Advisory**: Create a private security advisory on GitHub (recommended)

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact and severity assessment
- Suggested fix (if any)
- Your contact information (optional)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Resolution**: Depends on severity

We aim to acknowledge all security reports and keep you informed of the progress.

## Security Best Practices

When using Overseer:

1. **Keep dependencies updated**: Regularly update all dependencies
2. **Use strong secrets**: Generate strong tokens and passwords
3. **Enable HTTPS**: Always use TLS/SSL for API communications
4. **Restrict access**: Use least-privilege access patterns
5. **Monitor logs**: Regularly review audit logs for suspicious activity
6. **Secure agents**: Use signed tokens for agent authentication
7. **Encrypt secrets**: Ensure secrets are encrypted at rest

## Security Features

Overseer includes the following security features:

- **Encrypted Secrets**: All secrets encrypted at rest
- **Token-based Auth**: Secure authentication for agents
- **Audit Logging**: Comprehensive audit trail
- **TLS Everywhere**: Mandatory TLS for all communications
- **Least Privilege**: Node-scoped permissions
- **Rate Limiting**: Protection against abuse (planned)

## Known Security Considerations

- **Docker Socket Access**: Agents require Docker socket access - secure your nodes
- **API Tokens**: Keep API tokens secure and rotate regularly
- **Database Access**: Secure PostgreSQL with strong passwords
- **Redis Access**: Secure Redis if exposed to network
- **Cloudflare Tokens**: Store Cloudflare API tokens securely

## Disclosure Policy

- Vulnerabilities will be disclosed after patches are available
- Credit will be given to reporters (if desired)
- Security updates will be released as patch versions

## Security Updates

Security updates will be:

- Released as patch versions (0.1.x)
- Documented in CHANGELOG.md
- Tagged as security releases on GitHub
- Announced via GitHub Releases

Thank you for helping keep Overseer secure! 🔒
