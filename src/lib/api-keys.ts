import { prisma } from '@/lib/db';
import { createHash, randomBytes } from 'crypto';
import { Prisma } from '@prisma/client';
import { RATE_LIMITS, checkRateLimit } from '@/utils/rateLimit';

const KeyStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
} as const;

type KeyStatus = typeof KeyStatus[keyof typeof KeyStatus];

export function generateApiKey(): string {
  return `scr_${randomBytes(32).toString('hex')}`;
}

export function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex');
}

export async function createApiKey(userId: string, name: string, expiresInDays: number = 30, email?: string) {
  const apiKey = generateApiKey();
  const hashedKey = hashApiKey(apiKey);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  // First, ensure the user exists
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: email || `user_${userId}@example.com`,
    },
  });

  // Then create the API key
  const key = await prisma.apiKey.create({
    data: {
      name,
      key: hashedKey,
      userId,
      expiresAt,
    },
  });

  return {
    ...key,
    key: apiKey, // Return the unhashed key (only time it's exposed)
  };
}

export async function validateApiKey(apiKey: string) {
  // Special handling for playground API key
  if (apiKey === process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY) {
    return {
      isValid: true,
      key: {
        id: 'playground',
        tier: 'playground',
        status: 'ACTIVE',
        usageLimit: RATE_LIMITS.playground.requestsPerWindow,
      },
    };
  }

  const hashedKey = hashApiKey(apiKey);
  const key = await prisma.apiKey.findUnique({
    where: { key: hashedKey },
    include: { user: true },
  });

  if (!key) {
    return { isValid: false };
  }

  const now = new Date();
  const isExpired = key.expiresAt < now;
  const isRevoked = key.status === KeyStatus.REVOKED;

  if (isExpired) {
    await prisma.apiKey.update({
      where: { id: key.id },
      data: { status: KeyStatus.EXPIRED },
    });
  }

  return {
    isValid: !isExpired && !isRevoked,
    key,
  };
}

export async function trackApiRequest(
  apiKeyId: string,
  endpoint: string,
  status: number,
  duration: number,
  ip?: string,
  userAgent?: string
) {
  try {
    // Special handling for playground key
    if (apiKeyId === 'playground') {
      // For playground key, we only track in Redis
      const identifier = `playground:${ip || 'anonymous'}`;
      const rateLimitResult = await checkRateLimit(identifier, 'playground');
      return {
        success: rateLimitResult.success,
        limit: rateLimitResult.limit,
        remaining: rateLimitResult.remaining,
      };
    }

    // For regular API keys, track in database
    const [request, key] = await prisma.$transaction([
      prisma.apiRequest.create({
        data: {
          apiKeyId,
          endpoint,
          status,
          duration,
          ip,
          userAgent,
        },
      }),
      prisma.apiKey.update({
        where: { id: apiKeyId },
        data: {
          usageCount: { increment: 1 },
          lastUsedAt: new Date(),
        },
      }),
    ]);

    return request;
  } catch (error) {
    console.error('Failed to track API request:', error);
    // Don't throw error for playground key
    if (apiKeyId === 'playground') {
      return null;
    }
    throw error;
  }
}

export async function getRateLimitInfo(apiKeyId: string) {
  try {
    // Special handling for playground key
    if (apiKeyId === 'playground') {
      return {
        limit: RATE_LIMITS.playground.requestsPerWindow,
        remaining: RATE_LIMITS.playground.requestsPerWindow, // This will be handled by Redis
        reset: new Date(Date.now() + 3600000), // 1 hour from now
      };
    }

    const key = await prisma.apiKey.findUnique({
      where: { id: apiKeyId },
    });

    if (!key) {
      return null;
    }

    const hourAgo = new Date();
    hourAgo.setHours(hourAgo.getHours() - 1);

    const hourlyRequests = await prisma.apiRequest.count({
      where: {
        apiKeyId,
        createdAt: { gte: hourAgo },
      },
    });

    return {
      limit: key.usageLimit,
      remaining: Math.max(0, key.usageLimit - hourlyRequests),
      reset: new Date(hourAgo.getTime() + 3600000), // 1 hour from the start of the current window
    };
  } catch (error) {
    console.error('Failed to get rate limit info:', error);
    throw error;
  }
}

export async function revokeApiKey(id: string, userId: string) {
  try {
    return await prisma.apiKey.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        status: KeyStatus.REVOKED,
        revokedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Failed to revoke API key:', error);
    throw error;
  }
}

export async function getUserApiKeys(userId: string) {
  try {
    return await prisma.apiKey.findMany({
      where: {
        userId,
        status: {
          not: KeyStatus.REVOKED,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Failed to get user API keys:', error);
    throw error;
  }
} 