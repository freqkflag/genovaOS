import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function initDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export async function closeDatabase() {
  await prisma.$disconnect();
}
