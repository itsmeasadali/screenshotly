/**
 * Screenshot caching layer using Redis.
 * Caches screenshot results by URL + parameters hash.
 */

import crypto from 'crypto';

// In-memory cache fallback when Redis is not available
const memoryCache = new Map<string, { data: string; expiry: number }>();
const MAX_MEMORY_CACHE_SIZE = 100;

/**
 * Generate a cache key from screenshot parameters
 */
export function generateCacheKey(params: Record<string, unknown>): string {
    // Create deterministic hash of the parameters
    const normalized = JSON.stringify(params, Object.keys(params).sort());
    const hash = crypto.createHash('sha256').update(normalized).digest('hex').slice(0, 16);
    return `screenshot:cache:${hash}`;
}

/**
 * Get cached screenshot data
 */
export async function getCachedScreenshot(key: string): Promise<Buffer | null> {
    try {
        // Try Redis first
        if (process.env.REDIS_URL) {
            const { createClient } = await import('redis');
            const cleanUrl = process.env.REDIS_URL.replace(/^["']|["']$/g, '');
            const redis = createClient({ url: cleanUrl });
            await redis.connect();

            const cached = await redis.get(key);
            await redis.disconnect();

            if (cached) {
                return Buffer.from(cached, 'base64');
            }
            return null;
        }

        // Fallback to in-memory cache
        const entry = memoryCache.get(key);
        if (entry && entry.expiry > Date.now()) {
            return Buffer.from(entry.data, 'base64');
        }

        // Clean up expired entry
        if (entry) {
            memoryCache.delete(key);
        }

        return null;
    } catch (error) {
        console.warn('Cache read failed:', error);
        return null;
    }
}

/**
 * Store screenshot in cache
 */
export async function setCachedScreenshot(
    key: string,
    data: Buffer,
    ttlSeconds: number = 3600
): Promise<void> {
    try {
        const base64Data = data.toString('base64');

        // Try Redis first
        if (process.env.REDIS_URL) {
            const { createClient } = await import('redis');
            const cleanUrl = process.env.REDIS_URL.replace(/^["']|["']$/g, '');
            const redis = createClient({ url: cleanUrl });
            await redis.connect();

            // Only cache if data is under 5MB (Redis limits)
            if (base64Data.length < 5 * 1024 * 1024) {
                await redis.setEx(key, ttlSeconds, base64Data);
            }

            await redis.disconnect();
            return;
        }

        // Fallback to in-memory cache (with size limit)
        if (memoryCache.size >= MAX_MEMORY_CACHE_SIZE) {
            // Remove oldest entry
            const firstKey = memoryCache.keys().next().value;
            if (firstKey) {
                memoryCache.delete(firstKey);
            }
        }

        memoryCache.set(key, {
            data: base64Data,
            expiry: Date.now() + (ttlSeconds * 1000),
        });
    } catch (error) {
        console.warn('Cache write failed:', error);
    }
}
