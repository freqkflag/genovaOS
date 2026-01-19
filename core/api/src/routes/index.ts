import { Express } from 'express';
import { nodesRouter } from './nodes';
import { appsRouter } from './apps';
import { routesRouter } from './routes';
import { secretsRouter } from './secrets';
import { jobsRouter } from './jobs';
import { auditRouter } from './audit';
import { integrationsRouter } from './integrations';

export function setupRoutes(app: Express) {
  app.use('/api/nodes', nodesRouter);
  app.use('/api/apps', appsRouter);
  app.use('/api/routes', routesRouter);
  app.use('/api/secrets', secretsRouter);
  app.use('/api/jobs', jobsRouter);
  app.use('/api/audit', auditRouter);
  app.use('/api/integrations', integrationsRouter);
}
