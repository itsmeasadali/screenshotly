import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Redis configuration is missing. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.');
}

// Initialize Redis with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

interface RateLimitEntry {
  count: number;
  reset: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

interface RateLimitTier {
  requestsPerWindow: number;
  windowInHours: number;
}

export const RATE_LIMITS: Record<string, RateLimitTier> = {
  playground: {
    requestsPerWindow: 50,
    windowInHours: 1, // 50 per hour for playground
  },
  free: {
    requestsPerWindow: 500,
    windowInHours: 24, // 500 per day
  },
  pro: {
    requestsPerWindow: 5000,
    windowInHours: 24, // 5000 per day
  }
};

export async function checkRateLimit(identifier: string, tier: string = 'free'): Promise<RateLimitResult> {
  const now = Date.now();
  const limits = RATE_LIMITS[tier] || RATE_LIMITS.free;
  const windowInMs = limits.windowInHours * 3600000;
  const key = `ratelimit:${identifier}`;

  // Get current count and reset time from Redis
  const entry = await redis.get<RateLimitEntry>(key);
  
  // If no entry exists or it's expired, create a new one
  if (!entry || entry.reset <= now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      reset: now + windowInMs,
    };
    await redis.set(key, newEntry, { ex: Math.ceil(windowInMs / 1000) });
    return {
      success: true,
      limit: limits.requestsPerWindow,
      remaining: limits.requestsPerWindow - 1,
      reset: newEntry.reset,
    };
  }

  // Check if limit is exceeded
  const remaining = Math.max(0, limits.requestsPerWindow - entry.count);
  const success = entry.count < limits.requestsPerWindow;

  // Increment count if successful
  if (success) {
    await redis.set(key, {
      ...entry,
      count: entry.count + 1,
    }, { ex: Math.ceil((entry.reset - now) / 1000) });
  }

  return {
    success,
    limit: limits.requestsPerWindow,
    remaining: remaining - (success ? 1 : 0),
    reset: entry.reset,
  };
}

// Helper to get a unique identifier for rate limiting
export function getRateLimitIdentifier(req: Request): string {
  // Get IP from various headers, fallback to a random string if none found
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'anonymous';
  
  return `api:${ip}`;
} 