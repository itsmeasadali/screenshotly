import { PrismaClient } from '@prisma/client';

type GlobalWithPrisma = {
  prisma: PrismaClient | undefined;
};

const globalForPrisma = global as unknown as GlobalWithPrisma;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
} 