---
name: gitops-workflows
description: Guide for implementing GitOps workflows with Overseer including repo sync, PR-based deployments, and infrastructure as code
---

# Overview

This skill helps you implement GitOps workflows with Overseer, where infrastructure and application configurations are defined in Git repositories and automatically synced to Overseer. GitOps enables version control, collaboration, and automated deployments.

## Key Concepts

### GitOps Principles
GitOps is a methodology that:
- **Uses Git as source of truth** for infrastructure and app configs
- **Automatically syncs** Git state to Overseer
- **Enables PR-based workflows** for changes
- **Provides audit trail** through Git history
- **Supports rollback** via Git revert

### Repository Structure
GitOps repositories contain:
- **App Definitions**: YAML files defining applications
- **Infrastructure Config**: Node, network, storage configs
- **Secrets Templates**: Secret definitions (encrypted or in sealed secrets)
- **Environments**: Separate directories per environment
- **CI/CD Pipelines**: GitHub Actions, GitLab CI, etc.

### Sync Mechanism
Overseer can sync from Git via:
- **Webhook Triggers**: Sync on push/PR events
- **Polling**: Periodic checks for changes
- **Manual Sync**: On-demand synchronization
- **Approval Gates**: Require approval before applying changes

## When to Use This Skill

Use this skill when you need to:
1. **Version control** infrastructure and application configs
2. **Collaborate on changes** via PR workflows
3. **Automate deployments** from Git repositories
4. **Implement approval workflows** for production changes
5. **Rollback changes** using Git history
6. **Manage environments** (dev, staging, prod) via Git
7. **Track changes** with full audit trail in Git

## Best Practices

1. **Declarative Config**: Use declarative YAML for all configs
2. **Separate Environments**: Use branches or directories per environment
3. **PR Reviews**: Require PR reviews for production changes
4. **Automated Testing**: Test changes in dev/staging before prod
5. **Secret Management**: Use sealed secrets or external secret management
6. **Documentation**: Document schema and examples in repo
7. **Tag Releases**: Tag Git commits for releases

## Repository Structure Example

```
overseer-gitops/
├── apps/
│   ├── nextcloud.yaml
│   ├── gitea.yaml
│   └── postgres.yaml
├── infrastructure/
│   ├── nodes.yaml
│   ├── routes.yaml
│   └── policies.yaml
├── secrets/
│   └── sealed-secrets/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
└── .github/
    └── workflows/
        └── sync.yaml
```

## App Definition Format

Example app definition in Git:
```yaml
# apps/nextcloud.yaml
apiVersion: overseer.io/v1
kind: App
metadata:
  name: nextcloud
  namespace: production
spec:
  domain: cloud.example.com
  targetNode: node-1
  compose:
    version: '3.8'
    services:
      nextcloud:
        image: nextcloud:28
        environment:
          - DATABASE_HOST=${SECRET:db-host}
        volumes:
          - nextcloud-data:/var/www/html
  routes:
    - host: cloud.example.com
      tls: true
      auth: oidc
  backup:
    enabled: true
    schedule: "0 2 * * *"
    retention:
      days: 7
```

## GitOps Workflow

**Development Workflow**
1. **Create Branch**: Create feature branch for changes
2. **Edit Configs**: Modify app definitions in Git
3. **Commit Changes**: Commit with descriptive message
4. **Open PR**: Create pull request
5. **Review**: Team reviews changes
6. **Merge**: Merge PR to main branch
7. **Auto-Sync**: Overseer syncs changes automatically
8. **Deploy**: Overseer deploys changes

**Approval Workflow** (Production)
1. **Change in Git**: Changes committed to repo
2. **Sync Detection**: Overseer detects changes
3. **Require Approval**: Hold deployment pending approval
4. **Review in UI**: Review changes in Overseer UI
5. **Approve/Reject**: Approve or reject deployment
6. **Apply Changes**: Overseer applies approved changes
7. **Track Status**: Monitor deployment status

## Git Integration Providers

Overseer supports:
- **GitHub**: GitHub.com and GitHub Enterprise
- **GitLab**: GitLab.com and self-hosted GitLab
- **Gitea**: Self-hosted Gitea instances
- **Bitbucket**: Bitbucket Cloud and Server
- **Generic Git**: Any Git repository via HTTPS/SSH

## Webhook Configuration

Webhooks trigger Overseer sync on:
- **Push Events**: Sync on push to main/master branch
- **PR Events**: Sync on PR merge
- **Tag Events**: Sync on tag creation (releases)
- **Manual Triggers**: Manual sync via API

## Approval Gates

Approval gates can require:
- **Manual Approval**: Human approval before applying
- **PR Review**: Require PR reviews before merge
- **Automated Tests**: Pass automated tests
- **Environment Promotion**: Promote through dev → staging → prod
- **Multi-Approver**: Require multiple approvals for production

## Secrets in GitOps

Options for secrets:
- **Sealed Secrets**: Encrypted secrets that can be committed
- **External Secrets**: Reference external secret management
- **Secret Templates**: Templates that get values from Overseer
- **GitHub Secrets**: Use provider secrets (GitHub Secrets, etc.)
- **Exclude from Git**: Keep secrets outside Git, sync separately

## API Endpoints

GitOps management endpoints:
- `POST /api/gitops/repositories` - Add Git repository
- `GET /api/gitops/repositories` - List repositories
- `POST /api/gitops/repositories/{id}/sync` - Trigger sync
- `GET /api/gitops/sync-status` - Get sync status
- `POST /api/gitops/approvals` - Approve pending changes
- `GET /api/gitops/changes` - View pending changes

## Integration Points

- **Git Providers**: GitHub, GitLab, Gitea, Bitbucket
- **Webhooks**: Receive push/PR events
- **Overseer Core**: Apply changes via Overseer API
- **Sealed Secrets**: Decrypt secrets during sync
- **CI/CD**: GitHub Actions, GitLab CI integrations
- **Notification**: Notify on sync success/failure

## Workflow

1. **Set Up Repository**: Create GitOps repository structure
2. **Configure Overseer**: Connect Overseer to Git repository
3. **Define Apps**: Create app definitions in Git
4. **Initial Sync**: Perform initial sync to Overseer
5. **Set Up Webhooks**: Configure webhooks for auto-sync
6. **Define Approval Gates**: Configure approval requirements
7. **Test Workflow**: Test PR-based workflow
8. **Monitor Syncs**: Track sync status and errors

## Rollback Strategy

Rollback via GitOps:
- **Git Revert**: Revert commit in Git
- **Tag Rollback**: Deploy previous Git tag
- **Branch Rollback**: Switch to previous branch
- **Automatic Sync**: Overseer syncs rollback automatically
- **Approval**: May require approval for production rollback

## Security Considerations

- **Repository Access**: Use deploy keys or tokens with minimal permissions
- **Secret Management**: Never commit plaintext secrets
- **Branch Protection**: Protect main/master branch
- **Approval Requirements**: Require approvals for production
- **Audit Logging**: Log all sync operations
- **RBAC**: Control who can approve changes

## Troubleshooting

Common issues:
- **Sync failed**: Check repository access, credentials
- **Changes not applied**: Verify approval gates, conflicts
- **Secret errors**: Check sealed secrets or external secret config
- **Webhook not working**: Verify webhook URL, payload format
