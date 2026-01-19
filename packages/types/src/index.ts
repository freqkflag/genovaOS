// Shared types for Overseer

export interface Node {
  id: string;
  name: string;
  hostname: string;
  ipAddress?: string;
  version?: string;
  status: 'online' | 'offline';
  lastHeartbeat?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface App {
  id: string;
  name: string;
  description?: string;
  domain?: string;
  compose: string;
  version: number;
  status: 'running' | 'stopped' | 'deploying' | 'error';
  nodeId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  appId: string;
  hostname: string;
  path: string;
  target: string;
  tls: boolean;
  middleware?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Secret {
  id: string;
  name: string;
  scope: 'global' | 'app' | 'node';
  scopeId?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  nodeId?: string;
  appId?: string;
  payload?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: string;
  logs: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface AuditEvent {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}
