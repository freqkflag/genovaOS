import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { setupRoutes } from './routes';
import { setupMiddleware } from './middleware';
import { initDatabase } from './db';
import { initRedis } from './queue/redis';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup middleware
setupMiddleware(app);

// Initialize services
async function start() {
  try {
    // Initialize database
    await initDatabase();
    console.log('✓ Database connected');

    // Initialize Redis
    await initRedis();
    console.log('✓ Redis connected');

    // Setup routes
    setupRoutes(app);

    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Overseer API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
