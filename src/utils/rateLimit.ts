import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Redis configuration is missing. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.');
}

// Initialize Redis with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter that allows 5 requests per hour for unauthenticated users
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
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

// Simple in-memory store for rate limiting
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

  // Clean up expired entry if exists
  const existing = rateLimitStore.get(identifier);
  if (existing && existing.reset <= now) {
    rateLimitStore.delete(identifier);
  }

  // Get or create rate limit entry
  let entry = rateLimitStore.get(identifier);
  if (!entry) {
    entry = {
      count: 0,
      reset: now + windowInMs,
    };
    rateLimitStore.set(identifier, entry);
  }

  // Check if limit is exceeded
  const remaining = Math.max(0, limits.requestsPerWindow - entry.count);
  const success = entry.count < limits.requestsPerWindow;

  // Increment count if successful
  if (success) {
    entry.count++;
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