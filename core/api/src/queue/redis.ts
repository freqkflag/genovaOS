import Redis from 'ioredis';
import { Queue, Worker } from 'bullmq';

let redisClient: Redis;
let queues: Map<string, Queue> = new Map();

export async function initRedis() {
  redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  });

  redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });

  return redisClient;
}

export function getRedisClient(): Redis {
  if (!redisClient) {
    throw new Error('Redis not initialized');
  }
  return redisClient;
}

export function getQueue(name: string): Queue {
  if (!queues.has(name)) {
    queues.set(name, new Queue(name, {
      connection: getRedisClient(),
    }));
  }
  return queues.get(name)!;
}

export function createWorker(name: string, processor: (job: any) => Promise<void>) {
  return new Worker(name, processor, {
    connection: getRedisClient(),
  });
}
