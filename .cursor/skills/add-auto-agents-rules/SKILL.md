---
name: add-auto-agents-rules
description: Guide for adding and configuring rules for autonomous agent workers in the MCP Supervisor system
---

# Overview

This skill helps you add and configure rules for autonomous agent workers managed by the MCP Supervisor system. The MCP Supervisor runs at http://localhost:3001 and manages multiple autonomous agent workers that can perform various automation tasks.

## Key Concepts

### Autonomous Agents
Autonomous agents are specialized workers that execute automation tasks independently. Available agents include:
- **example-task**: General purpose task executor
- **health-checker**: Monitors system health and services
- **log-analyzer**: Analyzes logs for patterns and issues
- **api-caller**: Makes API calls and handles responses
- **file-processor**: Processes and manipulates files
- **data-transformer**: Transforms data between formats
- **backup-manager**: Manages backup operations
- **image-optimize**: Optimizes images
- **rebrand-agent**: Handles rebranding tasks

### Rules Configuration
Rules define:
- When agents should be triggered
- What tasks agents should perform
- How agents should behave
- Constraints and limits on agent actions

## When to Use This Skill

Use this skill when you need to:
1. **Add new automation rules** for existing agents
2. **Configure agent behavior** for specific workflows
3. **Set up trigger conditions** for autonomous agent execution
4. **Integrate agents** into new parts of the system
5. **Define constraints** for agent autonomy levels

## Best Practices

1. **Rule Clarity**: Write clear, unambiguous rules that specify exact conditions
2. **Safety First**: Include safeguards and validation steps in rules
3. **Modularity**: Break complex workflows into smaller, testable rules
4. **Documentation**: Document rule purpose and expected behavior
5. **Testing**: Test rules in isolated environments before production use

## Integration Points

- **MCP Supervisor API**: Access agent workers via HTTP API at http://localhost:3001
- **Helper Scripts**: Use `/root/Zpanel/agents/mcp-supervisor/mcp-helper.sh` and `mcp-functions.sh`
- **Agent Catalog**: Reference `/root/Zpanel/agents.md` for complete agent documentation
- **Autonomy Configuration**: Respect `ALLOW_AUTONOMY` settings when configuring rules

## Workflow

1. **Identify the Agent**: Determine which agent is best suited for the task
2. **Define the Rule**: Specify trigger conditions and actions
3. **Configure Parameters**: Set any required parameters or constraints
4. **Test the Rule**: Validate the rule in a safe environment
5. **Deploy**: Apply the rule to the appropriate system component
6. **Monitor**: Track agent execution and adjust rules as needed
