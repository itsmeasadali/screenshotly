import { createClient, RedisClientType } from 'redis';

// Initialize Redis with environment variables (only if available)
let redis: RedisClientType | null = null;

if (process.env.REDIS_URL) {
  try {
    // Clean the URL by removing any extra quotes
    const cleanUrl = process.env.REDIS_URL.replace(/^["']|["']$/g, '');
    
    redis = createClient({
      url: cleanUrl,
    });
    
    // Connect to Redis
    redis.connect().catch((error) => {
      console.warn('Failed to connect to Redis:', error);
      redis = null;
    });
  } catch (error) {
    console.warn('Failed to initialize Redis:', error);
    redis = null;
  }
}

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
  // If Redis is not available, allow all requests (for build time)
  if (!redis) {
    const limits = RATE_LIMITS[tier] || RATE_LIMITS.free;
    return {
      success: true,
      limit: limits.requestsPerWindow,
      remaining: limits.requestsPerWindow,
      reset: Date.now() + (limits.windowInHours * 3600000)
    };
  }

  const now = Date.now();
  const limits = RATE_LIMITS[tier] || RATE_LIMITS.free;
  const windowInMs = limits.windowInHours * 3600000;
  const key = `ratelimit:${identifier}`;

  // Get current count and reset time from Redis
  const entryString = await redis!.get(key);
  const entry: RateLimitEntry | null = entryString ? JSON.parse(entryString) : null;
  
  // If no entry exists or it's expired, create a new one
  if (!entry || entry.reset <= now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      reset: now + windowInMs,
    };
    await redis!.setEx(key, Math.ceil(windowInMs / 1000), JSON.stringify(newEntry));
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
    await redis!.setEx(key, Math.ceil((entry.reset - now) / 1000), JSON.stringify({
      ...entry,
      count: entry.count + 1,
    }));
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