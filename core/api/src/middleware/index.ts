import { Express } from 'express';
import { errorHandler } from './errorHandler';
import { requestLogger } from './requestLogger';
import { auditLogger } from './auditLogger';

export function setupMiddleware(app: Express) {
  // Request logging
  app.use(requestLogger);

  // Audit logging for admin actions
  app.use(auditLogger);

  // Error handling (must be last)
  app.use(errorHandler);
}
