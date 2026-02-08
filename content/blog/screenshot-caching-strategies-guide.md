---
title: "Screenshot Caching Strategies: Redis, CDN, and Local Storage"
description: "Optimize screenshot performance with effective caching. Learn Redis, CDN, and local caching patterns for different use cases."
excerpt: "Speed up screenshot delivery and reduce API costs with smart caching. From Redis to CDN edge caching for global performance."
author: "asad-ali"
publishedAt: "2025-11-12"
category: "guide"
tags: ["caching", "performance", "redis", "cdn", "optimization"]
keywords: ["screenshot caching", "redis cache", "cdn caching", "screenshot performance", "api caching"]
featured: false
readingTime: 7
---

Screenshots are expensive to generate but often reusable. Effective caching reduces API costs, improves response times, and provides offline resilience. This guide covers caching strategies for different scales and requirements.

## Why Cache Screenshots?

### Cost Reduction

Without caching:
```
1000 views × $0.01/capture = $10/day
```

With caching (90% hit rate):
```
100 captures × $0.01 = $1/day
```

**90% cost reduction.**

### Performance Improvement

| Approach | Latency |
|----------|---------|
| Fresh capture | 5-30 seconds |
| CDN cache hit | 50-100ms |
| Redis cache hit | 5-20ms |
| Local cache hit | <1ms |

## Cache Key Design

### Basic Key Structure

```javascript
function getCacheKey(url, options = {}) {
  const normalizedUrl = normalizeUrl(url);
  const optionsHash = hashOptions(options);
  return `screenshot:${normalizedUrl}:${optionsHash}`;
}

function normalizeUrl(url) {
  const parsed = new URL(url);
  // Remove tracking params
  parsed.searchParams.delete('utm_source');
  parsed.searchParams.delete('utm_medium');
  parsed.searchParams.delete('ref');
  // Sort remaining params
  parsed.searchParams.sort();
  return parsed.href;
}

function hashOptions(options) {
  const normalized = {
    device: options.device || 'desktop',
    format: options.format || 'png',
    width: options.viewport?.width || 1280,
    height: options.viewport?.height || 800,
    fullPage: options.fullPage || false,
  };
  return crypto.createHash('md5')
    .update(JSON.stringify(normalized))
    .digest('hex')
    .slice(0, 12);
}
```

### Version Keys

Invalidate cache when capture logic changes:

```javascript
const CACHE_VERSION = 'v2';

function getCacheKey(url, options) {
  return `screenshot:${CACHE_VERSION}:${hash(url)}:${hash(options)}`;
}
```

## Redis Caching

### Basic Implementation

```javascript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
const DEFAULT_TTL = 60 * 60 * 24; // 24 hours

async function getScreenshot(url, options = {}) {
  const cacheKey = getCacheKey(url, options);
  
  // Check cache
  const cached = await redis.getBuffer(cacheKey);
  if (cached) {
    console.log(`Cache HIT: ${cacheKey}`);
    return cached;
  }
  
  console.log(`Cache MISS: ${cacheKey}`);
  
  // Generate new screenshot
  const screenshot = await captureScreenshot(url, options);
  
  // Store in cache
  await redis.setex(cacheKey, DEFAULT_TTL, screenshot);
  
  return screenshot;
}
```

### With Metadata

Store additional info alongside images:

```javascript
async function getScreenshotWithMeta(url, options = {}) {
  const cacheKey = getCacheKey(url, options);
  const metaKey = `${cacheKey}:meta`;
  
  // Check cache
  const [cached, meta] = await Promise.all([
    redis.getBuffer(cacheKey),
    redis.get(metaKey),
  ]);
  
  if (cached && meta) {
    return {
      image: cached,
      metadata: JSON.parse(meta),
      fromCache: true,
    };
  }
  
  // Generate new
  const result = await captureScreenshot(url, options);
  
  // Cache both
  await Promise.all([
    redis.setex(cacheKey, DEFAULT_TTL, result.image),
    redis.setex(metaKey, DEFAULT_TTL, JSON.stringify({
      capturedAt: new Date().toISOString(),
      width: result.width,
      height: result.height,
      size: result.image.length,
    })),
  ]);
  
  return {
    image: result.image,
    metadata: result.metadata,
    fromCache: false,
  };
}
```

### Cache Warming

Pre-populate cache for known URLs:

```javascript
async function warmCache(urls) {
  const missing = [];
  
  // Check which URLs need caching
  for (const url of urls) {
    const cacheKey = getCacheKey(url);
    const exists = await redis.exists(cacheKey);
    if (!exists) {
      missing.push(url);
    }
  }
  
  console.log(`Warming ${missing.length} URLs`);
  
  // Capture missing URLs
  const limit = pLimit(5);
  await Promise.all(
    missing.map(url => limit(() => getScreenshot(url)))
  );
}

// Warm cache for homepage features
await warmCache([
  'https://example.com/feature-1',
  'https://example.com/feature-2',
  // ...
]);
```

## CDN Edge Caching

### Origin Server Setup

```javascript
// Express route that returns cached screenshots
app.get('/screenshot/:encodedUrl', async (req, res) => {
  const url = Buffer.from(req.params.encodedUrl, 'base64url').toString();
  
  try {
    const screenshot = await getScreenshot(url, {
      device: req.query.device,
      format: req.query.format || 'png',
    });
    
    res.set({
      'Content-Type': `image/${req.query.format || 'png'}`,
      'Cache-Control': 'public, max-age=86400',  // 1 day
      'CDN-Cache-Control': 'public, max-age=604800',  // 7 days on CDN
      'Surrogate-Control': 'max-age=604800',  // For Fastly
    });
    
    res.send(screenshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Cloudflare Configuration

```javascript
// Page rule or worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/screenshot/')) {
    // Check cache first
    const cache = caches.default;
    let response = await cache.match(request);
    
    if (response) {
      return response;
    }
    
    // Fetch from origin
    response = await fetch(request);
    
    // Clone and cache if successful
    if (response.ok) {
      const responseClone = response.clone();
      event.waitUntil(cache.put(request, responseClone));
    }
    
    return response;
  }
  
  return fetch(request);
}
```

### S3 + CloudFront

Store screenshots in S3 with CloudFront distribution:

```javascript
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3();
const BUCKET = 'screenshots-cache';
const CLOUDFRONT_URL = 'https://d123.cloudfront.net';

async function getScreenshotUrl(url, options = {}) {
  const key = getCacheKey(url, options) + '.png';
  
  // Check if exists in S3
  try {
    await s3.headObject({ Bucket: BUCKET, Key: key });
    // Return CloudFront URL
    return `${CLOUDFRONT_URL}/${key}`;
  } catch (err) {
    if (err.name !== 'NotFound') throw err;
  }
  
  // Generate and upload
  const screenshot = await captureScreenshot(url, options);
  
  await s3.putObject({
    Bucket: BUCKET,
    Key: key,
    Body: screenshot,
    ContentType: 'image/png',
    CacheControl: 'max-age=604800',
  });
  
  return `${CLOUDFRONT_URL}/${key}`;
}
```

## Local File Caching

For simpler deployments:

```javascript
import fs from 'fs/promises';
import path from 'path';

const CACHE_DIR = '/tmp/screenshots';
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

async function getScreenshotLocal(url, options = {}) {
  const filename = getCacheKey(url, options) + '.png';
  const filepath = path.join(CACHE_DIR, filename);
  
  // Check cache
  try {
    const stats = await fs.stat(filepath);
    const age = Date.now() - stats.mtimeMs;
    
    if (age < MAX_AGE_MS) {
      return await fs.readFile(filepath);
    }
  } catch (err) {
    // File doesn't exist
  }
  
  // Generate new
  const screenshot = await captureScreenshot(url, options);
  
  // Ensure directory exists
  await fs.mkdir(CACHE_DIR, { recursive: true });
  
  // Save to cache
  await fs.writeFile(filepath, screenshot);
  
  return screenshot;
}
```

### Cleanup Old Files

```javascript
async function cleanupCache() {
  const files = await fs.readdir(CACHE_DIR);
  const now = Date.now();
  
  for (const file of files) {
    const filepath = path.join(CACHE_DIR, file);
    const stats = await fs.stat(filepath);
    
    if (now - stats.mtimeMs > MAX_AGE_MS) {
      await fs.unlink(filepath);
    }
  }
}

// Run daily
setInterval(cleanupCache, 24 * 60 * 60 * 1000);
```

## Multi-Layer Caching

Combine approaches for best performance:

```javascript
async function getScreenshotMultiLayer(url, options = {}) {
  const cacheKey = getCacheKey(url, options);
  
  // Layer 1: In-memory LRU
  const inMemory = memoryCache.get(cacheKey);
  if (inMemory) {
    return { image: inMemory, layer: 'memory' };
  }
  
  // Layer 2: Redis
  const redisResult = await redis.getBuffer(cacheKey);
  if (redisResult) {
    memoryCache.set(cacheKey, redisResult); // Promote to L1
    return { image: redisResult, layer: 'redis' };
  }
  
  // Layer 3: S3/CDN
  try {
    const s3Result = await getFromS3(cacheKey);
    if (s3Result) {
      await redis.setex(cacheKey, 3600, s3Result); // Promote to L2
      memoryCache.set(cacheKey, s3Result); // Promote to L1
      return { image: s3Result, layer: 's3' };
    }
  } catch (err) {
    // Not in S3
  }
  
  // Generate fresh
  const screenshot = await captureScreenshot(url, options);
  
  // Store in all layers
  memoryCache.set(cacheKey, screenshot);
  await redis.setex(cacheKey, 3600, screenshot);
  await uploadToS3(cacheKey, screenshot);
  
  return { image: screenshot, layer: 'origin' };
}
```

## Cache Invalidation

### Manual Invalidation

```javascript
async function invalidateScreenshot(url, options = {}) {
  const cacheKey = getCacheKey(url, options);
  
  // Clear all layers
  memoryCache.delete(cacheKey);
  await redis.del(cacheKey);
  await s3.deleteObject({ Bucket: BUCKET, Key: cacheKey + '.png' });
  
  // Optionally regenerate immediately
  await getScreenshot(url, options);
}
```

### Time-Based Expiry

Set appropriate TTL per use case:

| Use Case | Recommended TTL |
|----------|-----------------|
| Static marketing pages | 7 days |
| Documentation | 24 hours |
| Dynamic dashboards | 1 hour |
| Live data | 5-15 minutes |
| News/social | 15-30 minutes |

### Content-Based Invalidation

Refresh only when content changes:

```javascript
async function getWithContentCheck(url, options = {}) {
  const cacheKey = getCacheKey(url, options);
  const hashKey = `${cacheKey}:hash`;
  
  // Get current content hash
  const currentHash = await getPageHash(url);
  const cachedHash = await redis.get(hashKey);
  
  if (currentHash === cachedHash) {
    // Content unchanged, use cache
    const cached = await redis.getBuffer(cacheKey);
    if (cached) return cached;
  }
  
  // Content changed or no cache, regenerate
  const screenshot = await captureScreenshot(url, options);
  
  await Promise.all([
    redis.setex(cacheKey, DEFAULT_TTL, screenshot),
    redis.setex(hashKey, DEFAULT_TTL, currentHash),
  ]);
  
  return screenshot;
}
```

## Best Practices

### 1. Start Simple

Begin with Redis or local files, add CDN as you scale.

### 2. Monitor Hit Rates

```javascript
const metrics = {
  hits: 0,
  misses: 0,
};

async function getScreenshotWithMetrics(url) {
  const cached = await redis.getBuffer(cacheKey);
  if (cached) {
    metrics.hits++;
    return cached;
  }
  metrics.misses++;
  // ...
}

// Report hit rate
const hitRate = metrics.hits / (metrics.hits + metrics.misses);
console.log(`Cache hit rate: ${(hitRate * 100).toFixed(1)}%`);
```

### 3. Handle Stale-While-Revalidate

Return cached data while refreshing in background:

```javascript
async function getWithSWR(url) {
  const cached = await redis.getBuffer(cacheKey);
  const age = await redis.ttl(cacheKey);
  
  if (cached) {
    // Refresh in background if nearing expiry
    if (age < 3600) { // Less than 1 hour left
      captureScreenshot(url).then(fresh => {
        redis.setex(cacheKey, DEFAULT_TTL, fresh);
      });
    }
    return cached;
  }
  
  return captureScreenshot(url);
}
```

### 4. Set Memory Limits

Prevent memory issues:

```javascript
import LRU from 'lru-cache';

const memoryCache = new LRU({
  max: 100,  // Max 100 items
  maxSize: 500 * 1024 * 1024,  // Max 500MB
  sizeCalculation: (value) => value.length,
  ttl: 1000 * 60 * 60,  // 1 hour
});
```

## Conclusion

Effective screenshot caching:

1. **Reduces costs** - 50-90% API call reduction
2. **Improves speed** - Milliseconds vs seconds
3. **Scales globally** - CDN edge delivery
4. **Provides resilience** - Serve cached even if API down

Start with Redis for simplicity, add CDN layers as traffic grows.

---

**Ready to optimize screenshot performance?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Batch Screenshot Processing →](/blog/batch-screenshot-processing)
