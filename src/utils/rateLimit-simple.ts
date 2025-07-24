// Simple in-memory rate limiting (NOT recommended for production)
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
    windowInHours: 1,
  },
  free: {
    requestsPerWindow: 500,
    windowInHours: 24,
  },
  pro: {
    requestsPerWindow: 5000,
    windowInHours: 24,
  }
};

// Simple in-memory store (lost on restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.reset <= now) {
      rateLimitStore.delete(key);
    }
  }
}, 3600000); // 1 hour

export async function checkRateLimit(identifier: string, tier: string = 'free'): Promise<RateLimitResult> {
  const now = Date.now();
  const limits = RATE_LIMITS[tier] || RATE_LIMITS.free;
  const windowInMs = limits.windowInHours * 3600000;
  const key = `ratelimit:${identifier}`;

  const entry = rateLimitStore.get(key);
  
  // If no entry exists or it's expired, create a new one
  if (!entry || entry.reset <= now) {
    const newEntry: RateLimitEntry = {
      count: 1,
      reset: now + windowInMs,
    };
    rateLimitStore.set(key, newEntry);
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
    rateLimitStore.set(key, {
      ...entry,
      count: entry.count + 1,
    });
  }

  return {
    success,
    limit: limits.requestsPerWindow,
    remaining: remaining - (success ? 1 : 0),
    reset: entry.reset,
  };
}

export function getRateLimitIdentifier(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'anonymous';
  
  return `api:${ip}`;
} 