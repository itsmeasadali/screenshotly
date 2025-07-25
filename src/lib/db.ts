import { PrismaClient } from '@prisma/client';

type GlobalWithPrisma = {
  prisma: PrismaClient | undefined;
};

const globalForPrisma = global as unknown as GlobalWithPrisma;

// Create Prisma client with security configurations
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
} 