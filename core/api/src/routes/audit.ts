import { Router } from 'express';

export const auditRouter = Router();

// GET /api/audit - List audit events
auditRouter.get('/', async (req, res) => {
  // TODO: Implement audit event listing
  res.json({ events: [] });
});

// GET /api/audit/:id - Get audit event details
auditRouter.get('/:id', async (req, res) => {
  // TODO: Implement audit event details
  res.json({ event: {} });
});
