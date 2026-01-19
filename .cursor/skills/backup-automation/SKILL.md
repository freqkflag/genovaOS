---
name: backup-automation
description: Guide for setting up automated backups using Restic, Rclone, and volume snapshots
---

# Overview

This skill helps you configure automated backup policies for Overseer-managed applications using Restic for volume backups and Rclone for offsite sync. Overseer agents execute backup jobs on nodes according to configured policies.

## Key Concepts

### Backup Strategy
Overseer supports multiple backup approaches:
- **Volume Backups**: Use Restic to backup Docker volumes
- **Offsite Sync**: Use Rclone to sync backups to cloud storage
- **Configuration Backups**: Backup app definitions and configurations
- **Snapshot Support**: Integration with Proxmox/ZFS snapshots

### Backup Policies
Backup policies define:
- **What to backup**: Which volumes/apps to include
- **When to backup**: Schedule (daily, weekly, etc.)
- **Where to store**: Backup destination (local, S3, etc.)
- **Retention**: How long to keep backups
- **Encryption**: Backup encryption settings

### Backup Execution
Backups are executed by:
- **Node Agents**: Run backup jobs on nodes
- **Scheduled Jobs**: Triggered by cron-like scheduler
- **On-Demand**: Manual backup triggers
- **Post-Deployment**: Optional backups after deployments

## When to Use This Skill

Use this skill when you need to:
1. **Set up automated backups** for applications
2. **Configure backup policies** with schedules and retention
3. **Integrate Restic** for volume backups
4. **Set up Rclone** for offsite backup sync
5. **Restore from backups** when needed
6. **Monitor backup health** and verify backups
7. **Configure backup encryption** and security

## Best Practices

1. **3-2-1 Rule**: 3 copies, 2 different media, 1 offsite
2. **Regular Testing**: Regularly test restore procedures
3. **Encryption**: Encrypt backups, especially for offsite storage
4. **Monitoring**: Monitor backup job success/failure
5. **Retention Policy**: Define clear retention policies
6. **Incremental Backups**: Use incremental backups for efficiency
7. **Documentation**: Document restore procedures

## Backup Tools

**Restic**
- Fast, secure, incremental backups
- Deduplication and compression
- Supports multiple backends (S3, local, SFTP, etc.)
- Encryption built-in
- Pruning for retention management

**Rclone**
- Sync files and directories
- Support for 60+ cloud storage providers
- Encryption support
- Bandwidth limiting
- Resume interrupted transfers

## Backup Policy Configuration

Example backup policy:
```yaml
policy:
  name: daily-app-backups
  schedule: "0 2 * * *"  # Daily at 2 AM
  apps:
    - nextcloud
    - gitea
  volumes:
    - nextcloud-data
    - gitea-data
  destination:
    type: restic
    repository: s3:s3.amazonaws.com/bucket/backups
  retention:
    keep-daily: 7
    keep-weekly: 4
    keep-monthly: 12
  encryption:
    enabled: true
    key-id: backup-key-1
```

## Volume Backup Workflow

1. **Identify Volumes**: Determine which volumes need backup
2. **Create Policy**: Define backup policy with schedule
3. **Configure Restic**: Set up Restic repository
4. **Test Backup**: Run initial test backup
5. **Schedule Jobs**: Enable scheduled backup execution
6. **Monitor**: Track backup job success
7. **Verify**: Periodically verify backup integrity

## Rclone Offsite Sync

Rclone is used for:
- **Syncing Restic backups** to cloud storage
- **Direct volume sync** for large datasets
- **Backup verification** and integrity checks
- **Bandwidth management** for large transfers

Common destinations:
- **S3 Compatible**: MinIO, AWS S3, Backblaze B2
- **Google Drive**: Personal or Workspace
- **Nextcloud**: Self-hosted file storage
- **SFTP**: Remote server storage

## Backup Job Execution

Backup jobs are executed by node agents:
- **Scheduled Execution**: Cron-based scheduling
- **Agent Execution**: Jobs run on target nodes
- **Job Queue**: Managed by Redis queue system
- **Status Reporting**: Jobs report status to core
- **Error Handling**: Failed jobs can be retried

## Restore Procedures

Restore operations include:
- **List Backups**: View available backup snapshots
- **Select Snapshot**: Choose backup to restore from
- **Restore Volume**: Restore volume to original or new location
- **Verify Restore**: Confirm data integrity after restore
- **App Recovery**: Restore entire app from backup

## API Endpoints

Backup management endpoints:
- `POST /api/backups/policies` - Create backup policy
- `GET /api/backups/policies` - List backup policies
- `POST /api/backups/execute` - Trigger manual backup
- `GET /api/backups/jobs` - List backup jobs
- `GET /api/backups/snapshots` - List backup snapshots
- `POST /api/backups/restore` - Restore from backup

## Integration Points

- **Node Agents**: Execute backup jobs on nodes
- **Restic**: Volume backup tool
- **Rclone**: Offsite sync tool
- **Job Queue**: Redis-based job scheduling
- **Storage Backends**: S3, local, SFTP, etc.
- **Monitoring**: Track backup job metrics
- **Alerting**: Notify on backup failures

## Workflow

1. **Plan Strategy**: Determine backup requirements
2. **Set Up Storage**: Configure backup destination
3. **Install Tools**: Ensure Restic/Rclone on nodes
4. **Create Policy**: Define backup policy
5. **Test Backup**: Run initial backup
6. **Enable Schedule**: Activate scheduled backups
7. **Monitor Health**: Track backup success rates
8. **Test Restore**: Periodically test restore procedures

## Security Considerations

- **Encryption**: Encrypt all backups, especially offsite
- **Credentials**: Store backup credentials securely
- **Access Control**: Limit who can trigger restores
- **Audit Logging**: Log all backup and restore operations
- **Key Management**: Secure backup encryption keys
- **Network Security**: Use secure connections for offsite sync

## Troubleshooting

Common issues:
- **Backup failed**: Check disk space, permissions, network
- **Slow backups**: Consider incremental backups, compression
- **Restore errors**: Verify snapshot integrity, check permissions
- **Storage full**: Implement retention policies, clean old backups
