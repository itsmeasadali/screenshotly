---
title: "Website Thumbnail Generation: A Complete Guide"
description: "Learn how to generate website thumbnails for link previews, directories, and portfolios. Covers sizes, caching strategies, and batch processing."
excerpt: "Generate professional website thumbnails for any use case. From link previews to full directories with optimized caching."
author: "asad-ali"
publishedAt: "2025-11-18"
category: "guide"
tags: ["thumbnails", "optimization", "caching", "directories"]
keywords: ["website thumbnail", "thumbnail generation", "link preview", "website preview image", "url thumbnail"]
featured: false
readingTime: 6
---

Website thumbnails are small preview images that represent a webpage. They're used in link previews, web directories, bookmarking apps, and portfolio displays. This guide covers how to generate them efficiently at scale.

## Common Thumbnail Sizes

| Use Case | Dimensions | Aspect Ratio |
|----------|------------|--------------|
| Link preview (small) | 320 × 200 | 16:10 |
| Card preview | 400 × 300 | 4:3 |
| Directory listing | 480 × 320 | 3:2 |
| Portfolio | 600 × 400 | 3:2 |
| Featured image | 800 × 450 | 16:9 |

## Basic Thumbnail Generation

### Simple Capture and Resize

```javascript
async function generateThumbnail(url, width = 320, height = 200) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'jpeg',
      quality: 80,
      viewport: {
        width: 1280,
        height: 800,
      },
      resize: {
        width,
        height,
        fit: 'cover',  // Crop to fill
      },
    }),
  });

  return response.arrayBuffer();
}
```

### Capture at Target Size

For simpler pages, capture at final resolution:

```javascript
async function captureSmallThumbnail(url) {
  return await captureScreenshot(url, {
    viewport: { width: 640, height: 400 },
    resize: { width: 320, height: 200 },
    format: 'jpeg',
    quality: 75,
  });
}
```

## Caching Strategy

Thumbnails change infrequently—proper caching is essential.

### Redis Cache

```javascript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
const CACHE_TTL = 60 * 60 * 24 * 7; // 7 days

async function getThumbnail(url, options = {}) {
  const cacheKey = `thumbnail:${hashUrl(url)}:${hashOptions(options)}`;
  
  // Check cache
  const cached = await redis.getBuffer(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Generate new thumbnail
  const thumbnail = await generateThumbnail(url, options);
  
  // Cache result
  await redis.setex(cacheKey, CACHE_TTL, thumbnail);
  
  return thumbnail;
}

function hashUrl(url) {
  return crypto.createHash('md5').update(url).digest('hex');
}

function hashOptions(options) {
  return crypto.createHash('md5').update(JSON.stringify(options)).digest('hex').slice(0, 8);
}
```

### CDN with Origin Fallback

Store thumbnails on CDN with automatic regeneration:

```javascript
// Express route that generates on-demand
app.get('/thumbnail/:encoded', async (req, res) => {
  const url = Buffer.from(req.params.encoded, 'base64').toString();
  const width = parseInt(req.query.w) || 320;
  const height = parseInt(req.query.h) || 200;
  
  try {
    const thumbnail = await generateThumbnail(url, width, height);
    
    res.set({
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800', // 7 days
      'CDN-Cache-Control': 'public, max-age=2592000', // 30 days on CDN
    });
    
    res.send(thumbnail);
  } catch (error) {
    // Return placeholder on error
    res.redirect('/images/placeholder-thumbnail.jpg');
  }
});
```

### URL-Based Caching

Generate predictable URLs for CDN caching:

```javascript
function getThumbnailUrl(url, width = 320, height = 200) {
  const encoded = Buffer.from(url).toString('base64url');
  return `https://thumbnails.example.com/${encoded}?w=${width}&h=${height}`;
}

// Usage
<img src={getThumbnailUrl('https://example.com')} alt="Example" />
```

## Batch Processing

For directories with many sites:

```javascript
const pLimit = require('p-limit');

async function generateDirectoryThumbnails(sites) {
  const limit = pLimit(5); // 5 concurrent
  
  const results = await Promise.allSettled(
    sites.map(site => 
      limit(async () => {
        const thumbnail = await generateThumbnail(site.url);
        return {
          siteId: site.id,
          thumbnail,
        };
      })
    )
  );
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  
  const failed = results
    .filter(r => r.status === 'rejected')
    .map((r, i) => ({ siteId: sites[i].id, error: r.reason }));
  
  console.log(`Generated: ${successful.length}, Failed: ${failed.length}`);
  
  return { successful, failed };
}
```

### Queue-Based Processing

For large directories, use a job queue:

```javascript
// Producer: Add jobs
async function queueThumbnailGeneration(sites) {
  for (const site of sites) {
    await thumbnailQueue.add('generate', {
      siteId: site.id,
      url: site.url,
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
    });
  }
}

// Consumer: Process jobs
thumbnailQueue.process('generate', 5, async (job) => {
  const { siteId, url } = job.data;
  
  const thumbnail = await generateThumbnail(url);
  
  await db.sites.update(siteId, {
    thumbnailData: thumbnail,
    thumbnailUpdatedAt: new Date(),
  });
  
  return { siteId, size: thumbnail.length };
});
```

## Refresh Strategy

Thumbnails need periodic updates:

```javascript
async function refreshStaleThumbnails() {
  const staleAfter = new Date();
  staleAfter.setDate(staleAfter.getDate() - 30); // 30 days old
  
  const staleSites = await db.sites
    .where('thumbnailUpdatedAt')
    .lt(staleAfter)
    .limit(100)
    .toArray();
  
  for (const site of staleSites) {
    await thumbnailQueue.add('generate', {
      siteId: site.id,
      url: site.url,
    });
  }
  
  console.log(`Queued ${staleSites.length} thumbnails for refresh`);
}

// Run daily
cron.schedule('0 3 * * *', refreshStaleThumbnails);
```

## Quality Optimization

### JPEG vs WebP

```javascript
async function generateOptimizedThumbnail(url, options = {}) {
  // WebP for modern browsers, JPEG fallback
  const format = options.supportsWebP ? 'webp' : 'jpeg';
  const quality = format === 'webp' ? 85 : 80;
  
  return await captureScreenshot(url, {
    viewport: { width: 1280, height: 800 },
    resize: { 
      width: options.width || 320, 
      height: options.height || 200 
    },
    format,
    quality,
  });
}
```

### Responsive Thumbnails

Generate multiple sizes:

```javascript
const THUMBNAIL_SIZES = [
  { name: 'small', width: 160, height: 100 },
  { name: 'medium', width: 320, height: 200 },
  { name: 'large', width: 640, height: 400 },
];

async function generateResponsiveThumbnails(url) {
  // Capture at highest resolution
  const fullCapture = await captureScreenshot(url, {
    viewport: { width: 1280, height: 800 },
    format: 'png',
  });
  
  // Resize to each target size
  const thumbnails = {};
  for (const size of THUMBNAIL_SIZES) {
    thumbnails[size.name] = await resize(fullCapture, size.width, size.height);
  }
  
  return thumbnails;
}
```

### srcset Support

```html
<img
  src="/thumbnails/example-medium.jpg"
  srcset="
    /thumbnails/example-small.jpg 160w,
    /thumbnails/example-medium.jpg 320w,
    /thumbnails/example-large.jpg 640w
  "
  sizes="(max-width: 480px) 160px, (max-width: 768px) 320px, 640px"
  alt="Example"
/>
```

## Handling Edge Cases

### Failed Captures

Use placeholder images:

```javascript
async function getThumbnailWithFallback(url) {
  try {
    return await generateThumbnail(url);
  } catch (error) {
    console.error(`Thumbnail failed for ${url}:`, error.message);
    
    // Return domain-based placeholder
    const domain = new URL(url).hostname;
    return await generatePlaceholder(domain);
  }
}

async function generatePlaceholder(domain) {
  // Generate simple placeholder with domain text
  // Or use a static placeholder image
  return fs.readFileSync('images/placeholder.jpg');
}
```

### Slow Loading Sites

Set appropriate timeouts:

```javascript
async function generateThumbnail(url) {
  return await captureScreenshot(url, {
    timeout: 30000,  // 30 second timeout
    waitUntil: 'networkidle2',  // Don't wait forever
    delay: 1000,  // Brief delay for content load
    viewport: { width: 1280, height: 800 },
    resize: { width: 320, height: 200 },
  });
}
```

### Broken Sites

Detect and handle 404s:

```javascript
async function generateThumbnail(url) {
  const response = await captureScreenshot(url, {
    // ... options
  });
  
  // Check if page appears broken
  // Some APIs include metadata about page status
  if (response.metadata?.httpStatus >= 400) {
    throw new Error(`Page returned ${response.metadata.httpStatus}`);
  }
  
  return response.image;
}
```

## Best Practices

### 1. Use JPEG for Thumbnails

PNG is overkill for small previews:

```javascript
{
  format: 'jpeg',
  quality: 75,  // Good balance of size/quality
}
```

### 2. Cache Aggressively

Thumbnails rarely need real-time updates:

```javascript
// 7-30 days is reasonable
'Cache-Control': 'public, max-age=604800'
```

### 3. Generate Lazily

Don't pre-generate everything:

```javascript
// Only generate when first requested
app.get('/thumbnail/:id', async (req, res) => {
  const cached = await cache.get(req.params.id);
  if (cached) return res.send(cached);
  
  const thumbnail = await generateThumbnail(site.url);
  await cache.set(req.params.id, thumbnail);
  res.send(thumbnail);
});
```

### 4. Refresh Strategically

Update important thumbnails more often:

```javascript
// Featured sites: weekly
// All others: monthly
const refreshInterval = site.featured ? 7 : 30;
```

## Conclusion

Effective thumbnail generation combines:

1. **Appropriate sizing** - Match your use case
2. **Smart caching** - 7-30 day TTL
3. **Batch processing** - Queue-based for scale
4. **Format optimization** - JPEG/WebP at 75-85% quality
5. **Graceful fallbacks** - Handle failures smoothly

With these patterns, you can generate and serve thumbnails for directories of any size.

---

**Ready to generate website thumbnails?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Batch Screenshot Processing →](/blog/batch-screenshot-processing)
