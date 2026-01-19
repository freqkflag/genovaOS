---
name: monitoring-observability
description: Guide for setting up monitoring, metrics, logging, and alerting for Overseer-managed infrastructure
---

# Overview

This skill helps you configure monitoring, metrics collection, log aggregation, and alerting for Overseer-managed infrastructure. Overseer integrates with Prometheus, Grafana, Loki, and Uptime Kuma for comprehensive observability.

## Key Concepts

### Monitoring Stack
Overseer's monitoring bundle includes:
- **Prometheus**: Metrics collection and storage
- **Grafana**: Dashboards and visualization
- **Loki**: Log aggregation and querying
- **Uptime Kuma**: Uptime monitoring and alerting
- **Node Exporter**: Node-level metrics
- **cAdvisor**: Container metrics

### Metrics Collection
Metrics collected include:
- **Node Metrics**: CPU, RAM, disk, network per node
- **Container Metrics**: CPU, memory, network per container
- **Application Metrics**: Custom app metrics via Prometheus exporters
- **Traefik Metrics**: Request rates, response times, errors
- **Overseer Metrics**: Core and agent performance metrics

### Log Aggregation
Logs are collected from:
- **Container Logs**: All container stdout/stderr
- **Agent Logs**: Node agent logs
- **Core Logs**: Overseer core application logs
- **System Logs**: Optional system journal logs
- **Traefik Logs**: Access logs and error logs

## When to Use This Skill

Use this skill when you need to:
1. **Set up monitoring** for nodes and applications
2. **Create Grafana dashboards** for visualization
3. **Configure alerting** for critical issues
4. **Aggregate logs** from all containers
5. **Monitor uptime** and availability
6. **Track resource usage** and capacity planning
7. **Debug issues** using metrics and logs

## Best Practices

1. **Baseline Metrics**: Establish baseline metrics before issues
2. **Meaningful Alerts**: Alert on actionable conditions only
3. **Log Retention**: Configure appropriate log retention
4. **Dashboard Organization**: Organize dashboards by service/team
5. **Resource Monitoring**: Monitor for capacity issues proactively
6. **Correlation**: Correlate metrics with logs for debugging
7. **Documentation**: Document alert runbooks and dashboards

## Monitoring Components

**Prometheus**
- Metrics collection and storage
- Time-series database
- PromQL query language
- Service discovery for dynamic targets

**Grafana**
- Visualization and dashboards
- Alert rule configuration
- Multi-datasource support
- Dashboard sharing and versioning

**Loki**
- Log aggregation
- LogQL query language
- Label-based indexing
- Integrates with Grafana

**Uptime Kuma**
- Uptime monitoring
- Public status pages
- Multiple notification channels
- Heartbeat monitoring

## Metrics to Monitor

**Infrastructure Metrics**
- CPU usage per node and container
- Memory usage and limits
- Disk I/O and space
- Network traffic
- Container count and status

**Application Metrics**
- Request rates and latency
- Error rates
- Database connection pools
- Queue depths
- Custom business metrics

**Overseer Metrics**
- Agent heartbeat frequency
- Deployment success rates
- Job queue depth
- API response times
- Database connection pool

## Log Collection Strategy

**Container Logs**
- Collected via Docker logging driver
- Labeled with container name, node, app
- Aggregated to Loki
- Searchable via LogQL

**Application Logs**
- Structured JSON logging preferred
- Contextual labels for filtering
- Log levels (DEBUG, INFO, WARN, ERROR)
- Correlation IDs for tracing

**System Logs**
- Optional journal log collection
- Node-level events
- Agent logs
- Core application logs

## Alerting Rules

Example alert rules:
- **High CPU**: CPU usage > 80% for 5 minutes
- **High Memory**: Memory usage > 90% for 5 minutes
- **Disk Full**: Disk usage > 85%
- **Container Down**: Container not running
- **Uptime Check Failed**: HTTP check returns error
- **Deployment Failed**: Deployment job failed
- **Backup Failed**: Backup job failed

## Dashboard Examples

**Infrastructure Overview**
- Node status and resource usage
- Container count and health
- Top resource consumers
- Network traffic overview

**Application Dashboard**
- Request rates and latency
- Error rates
- Database connections
- Custom application metrics

**Overseer Dashboard**
- Node agent status
- Deployment metrics
- Job queue status
- API performance

## Integration Points

- **Prometheus**: Scrapes metrics from nodes and containers
- **Grafana**: Queries Prometheus and Loki for visualization
- **Loki**: Collects logs from Docker logging driver
- **Node Exporter**: Exposes node-level metrics
- **cAdvisor**: Exposes container metrics
- **Uptime Kuma**: Monitors HTTP endpoints
- **Node Agents**: Send heartbeat and metrics to core

## Workflow

1. **Deploy Monitoring Stack**: Deploy Prometheus, Grafana, Loki
2. **Configure Service Discovery**: Set up Prometheus targets
3. **Set Up Log Collection**: Configure Loki data sources
4. **Create Dashboards**: Build Grafana dashboards
5. **Configure Alerts**: Define alert rules
6. **Set Up Notifications**: Configure notification channels
7. **Test Monitoring**: Verify metrics and logs collection
8. **Tune Alerts**: Adjust thresholds based on baselines

## Alerting Channels

Supported notification channels:
- **Email**: Send alerts via SMTP
- **Webhook**: HTTP webhooks for integrations
- **Slack**: Slack notifications
- **Discord**: Discord webhooks
- **Telegram**: Telegram bot messages
- **PagerDuty**: Incident management integration

## Troubleshooting

Common issues:
- **No metrics**: Check Prometheus targets, firewall rules
- **No logs**: Verify logging driver, Loki connection
- **Missing dashboards**: Import Grafana dashboards
- **False alerts**: Adjust thresholds, add filters
- **High cardinality**: Reduce label cardinality in metrics
