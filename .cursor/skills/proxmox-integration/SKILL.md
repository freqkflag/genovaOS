---
name: proxmox-integration
description: Guide for integrating Proxmox VE with Overseer for VM and LXC container management
---

# Overview

This skill helps you integrate Proxmox VE with Overseer for managing virtual machines, LXC containers, and Proxmox infrastructure. Proxmox integration allows Overseer to provision and manage infrastructure resources alongside application deployments.

## Key Concepts

### Proxmox Integration
Overseer integrates with Proxmox VE to:
- **Manage VMs**: Create, start, stop, delete virtual machines
- **Manage LXCs**: Create and manage LXC containers
- **Snapshots**: Create and restore VM/LXC snapshots
- **Resource Monitoring**: Track Proxmox cluster resources
- **Node Management**: Discover and manage Proxmox nodes
- **Template Management**: Use Proxmox templates for provisioning

### Proxmox API
Overseer uses the Proxmox REST API to:
- **Authenticate**: API tokens or username/password
- **Query Resources**: List VMs, LXCs, nodes, storage
- **Execute Operations**: Start/stop, create/delete, snapshot
- **Monitor Status**: Get VM/LXC status and resource usage
- **Manage Storage**: Query storage pools and volumes

### Integration Modes
Overseer can operate in two modes:
- **Read-Only**: Query and monitor Proxmox resources
- **Full Control**: Create, modify, and delete VMs/LXCs

## When to Use This Skill

Use this skill when you need to:
1. **Discover Proxmox resources** (VMs, LXCs, nodes) in Overseer
2. **Provision new VMs or LXCs** from Overseer UI
3. **Manage VM/LXC lifecycle** (start, stop, restart, delete)
4. **Create snapshots** for backup and rollback
5. **Monitor Proxmox resources** (CPU, RAM, disk per VM)
6. **Deploy apps to Proxmox VMs** as part of deployment workflow
7. **Integrate Proxmox** with overall infrastructure management

## Best Practices

1. **API Token Security**: Use API tokens with minimal required permissions
2. **Resource Planning**: Monitor Proxmox cluster capacity
3. **Snapshot Strategy**: Regular snapshots before major changes
4. **Template Management**: Maintain base templates for quick provisioning
5. **Access Control**: Limit Proxmox API access to necessary operations
6. **Monitoring**: Track Proxmox resource usage alongside Docker nodes
7. **Documentation**: Document VM/LXC templates and configurations

## Proxmox API Configuration

Overseer requires Proxmox credentials:
- **API Token** (recommended): Token ID and secret
- **Username/Password**: Alternative authentication
- **API Endpoint**: Proxmox cluster API URL (e.g., https://pve.example.com:8006/api2/json)
- **Verify SSL**: Enable SSL certificate verification

Required API permissions:
- `VM.Config.Options` - Configure VM options
- `VM.Audit` - View VM information
- `VM.PowerMgmt` - Start/stop VMs
- `VM.Snapshot` - Create/delete snapshots
- `Datastore.AllocateSpace` - Create disk images

## Proxmox Resource Discovery

Overseer can discover:
- **Nodes**: Proxmox cluster nodes
- **VMs**: All virtual machines across nodes
- **LXCs**: All LXC containers across nodes
- **Storage**: Storage pools and volumes
- **Networks**: Virtual networks and bridges
- **Templates**: VM and LXC templates

## VM/LXC Management Operations

**Virtual Machines**
- **Create VM**: Provision new VM from template
- **Start/Stop/Restart**: Control VM power state
- **Delete VM**: Remove VM and associated resources
- **Clone VM**: Create VM from existing VM
- **Snapshot**: Create and restore VM snapshots
- **Monitor**: Track VM resource usage

**LXC Containers**
- **Create LXC**: Provision new LXC container
- **Start/Stop/Restart**: Control container state
- **Delete LXC**: Remove LXC container
- **Clone LXC**: Create LXC from existing container
- **Snapshot**: Create and restore LXC snapshots
- **Monitor**: Track LXC resource usage

## API Endpoints

Proxmox integration endpoints:
- `POST /api/integrations/proxmox/connect` - Test Proxmox connection
- `GET /api/integrations/proxmox/nodes` - List Proxmox nodes
- `GET /api/integrations/proxmox/vms` - List VMs
- `GET /api/integrations/proxmox/lxcs` - List LXCs
- `POST /api/integrations/proxmox/vms` - Create VM
- `POST /api/integrations/proxmox/vms/{id}/start` - Start VM
- `POST /api/integrations/proxmox/vms/{id}/snapshot` - Create snapshot
- `GET /api/integrations/proxmox/vms/{id}/status` - Get VM status

## Proxmox Templates

Templates are pre-configured VM/LXC images:
- **Base Templates**: Ubuntu, Debian, Alpine, etc.
- **App Templates**: Pre-configured with specific apps
- **Custom Templates**: User-created templates
- **Template Versioning**: Track template versions

## Workflow

1. **Configure Credentials**: Add Proxmox API credentials to Overseer
2. **Discover Resources**: Overseer discovers Proxmox cluster resources
3. **View Resources**: Browse VMs, LXCs, and nodes in Overseer UI
4. **Provision Resources**: Create new VMs/LXCs from Overseer
5. **Manage Lifecycle**: Start, stop, snapshot from Overseer
6. **Deploy Apps**: Optionally deploy apps to Proxmox VMs
7. **Monitor Resources**: Track Proxmox resource usage

## Integration with Overseer Workflows

Proxmox integration enhances:
- **Node Discovery**: Proxmox VMs can be Overseer nodes
- **Resource Planning**: Monitor Proxmox capacity for deployments
- **Backup Coordination**: Coordinate snapshots with app backups
- **Infrastructure as Code**: Define VM/LXC requirements in app definitions
- **Multi-Cloud**: Manage both Proxmox and bare-metal nodes

## Snapshot Management

Proxmox snapshots provide:
- **Point-in-Time Recovery**: Restore VM/LXC to previous state
- **Backup Strategy**: Alternative to Restic backups for VMs
- **Testing Environment**: Create snapshots before changes
- **Rollback**: Quick rollback for failed deployments

## Security Considerations

- **API Token Permissions**: Use least-privilege API tokens
- **Network Security**: Use VPN or secure network for API access
- **SSL Verification**: Always verify SSL certificates
- **Access Control**: Limit who can provision/manage VMs
- **Audit Logging**: Log all Proxmox API operations
- **Credential Storage**: Store Proxmox credentials securely in Overseer

## Troubleshooting

Common issues:
- **Connection failed**: Check API endpoint, credentials, network
- **Permission denied**: Verify API token permissions
- **Resource unavailable**: Check Proxmox cluster capacity
- **Snapshot failed**: Verify storage space, VM/LXC state
- **VM won't start**: Check Proxmox logs, resource allocation
