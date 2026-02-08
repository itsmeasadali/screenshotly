---
title: "Screenshot API for Link Preview Generation: Complete Implementation"
description: "Build rich link previews like Twitter, Slack, and Discord. Capture OG images, extract metadata, and generate previews automatically."
excerpt: "Create beautiful link previews with automatic screenshot capture and metadata extraction."
author: "asad-ali"
publishedAt: "2025-10-08"
category: "tutorial"
tags: ["link-preview", "og-image", "social-media", "integration"]
keywords: ["link preview generator", "og image screenshot", "url preview api", "rich link preview"]
featured: false
readingTime: 6
---

Link previews make shared content more engaging. This guide covers building Twitter/Slack-style previews using screenshots and metadata.

## How Link Previews Work

```
User shares: https://example.com/article

→ Fetch page metadata (title, description, OG image)
→ If no OG image: capture screenshot
→ Display rich preview card
```

## Basic Implementation

```javascript
async function generateLinkPreview(url) {
  // 1. Fetch page metadata
  const metadata = await fetchMetadata(url);
  
  // 2. Get or generate preview image
  const image = metadata.ogImage || await captureScreenshot(url);
  
  // 3. Return preview data
  return {
    url,
    title: metadata.title,
    description: metadata.description,
    image,
    favicon: metadata.favicon,
    siteName: metadata.siteName,
  };
}
```

### Metadata Extraction

```javascript
import cheerio from 'cheerio';

async function fetchMetadata(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'LinkPreviewBot/1.0' },
  });
  const html = await response.text();
  const $ = cheerio.load(html);
  
  return {
    title: $('meta[property="og:title"]').attr('content') 
           || $('title').text(),
    description: $('meta[property="og:description"]').attr('content')
                 || $('meta[name="description"]').attr('content'),
    ogImage: $('meta[property="og:image"]').attr('content'),
    siteName: $('meta[property="og:site_name"]').attr('content'),
    favicon: $('link[rel="icon"]').attr('href')
             || $('link[rel="shortcut icon"]').attr('href'),
  };
}
```

### Screenshot Fallback

```javascript
async function captureScreenshot(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      viewport: { width: 1200, height: 630 }, // OG image dimensions
      format: 'png',
    }),
  });
  
  // Upload to storage and return URL
  const imageBuffer = await response.arrayBuffer();
  return uploadToStorage(imageBuffer);
}
```

## Complete Link Preview Service

```javascript
class LinkPreviewService {
  constructor(apiKey, storage) {
    this.apiKey = apiKey;
    this.storage = storage;
    this.cache = new Map();
  }

  async getPreview(url) {
    // Check cache
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < 86400000) {
      return cached.data;
    }

    // Generate preview
    const preview = await this.generatePreview(url);
    
    // Cache result
    this.cache.set(url, {
      data: preview,
      timestamp: Date.now(),
    });

    return preview;
  }

  async generatePreview(url) {
    const metadata = await this.fetchMetadata(url);
    
    // Use OG image if available and valid
    let image = null;
    if (metadata.ogImage) {
      const valid = await this.validateImage(metadata.ogImage);
      if (valid) {
        image = metadata.ogImage;
      }
    }
    
    // Capture screenshot as fallback
    if (!image) {
      image = await this.captureAndStore(url);
    }

    return {
      url,
      title: metadata.title || this.extractDomain(url),
      description: metadata.description || '',
      image,
      favicon: this.resolveFavicon(url, metadata.favicon),
      siteName: metadata.siteName || this.extractDomain(url),
    };
  }

  async validateImage(imageUrl) {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      return contentType?.startsWith('image/');
    } catch {
      return false;
    }
  }

  extractDomain(url) {
    return new URL(url).hostname.replace('www.', '');
  }

  resolveFavicon(baseUrl, faviconPath) {
    if (!faviconPath) {
      return `https://www.google.com/s2/favicons?domain=${baseUrl}`;
    }
    if (faviconPath.startsWith('http')) {
      return faviconPath;
    }
    const base = new URL(baseUrl);
    return `${base.origin}${faviconPath}`;
  }
}
```

## React Preview Component

```jsx
function LinkPreview({ url }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
      setPreview(await data.json());
      setLoading(false);
    }
    load();
  }, [url]);

  if (loading) {
    return <div className="preview-skeleton" />;
  }

  return (
    <a href={url} className="link-preview" target="_blank" rel="noopener">
      <div className="preview-image">
        <img src={preview.image} alt="" loading="lazy" />
      </div>
      <div className="preview-content">
        <div className="preview-site">
          <img src={preview.favicon} alt="" className="favicon" />
          <span>{preview.siteName}</span>
        </div>
        <h3 className="preview-title">{preview.title}</h3>
        <p className="preview-description">{preview.description}</p>
      </div>
    </a>
  );
}
```

### CSS Styling

```css
.link-preview {
  display: block;
  border: 1px solid #e1e4e8;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s;
}

.link-preview:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.preview-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.preview-content {
  padding: 16px;
}

.preview-site {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.favicon {
  width: 16px;
  height: 16px;
}

.preview-title {
  margin: 8px 0 4px;
  font-size: 16px;
  font-weight: 600;
}

.preview-description {
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## API Endpoint

```javascript
// pages/api/preview.js
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const preview = await linkPreviewService.getPreview(url);
  
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.json(preview);
}
```

## Best Practices for Production Link Previews

### 1. Cache Aggressively

Link previews rarely change — a page's title, description, and OG image don't update more than once a day at most. Cache previews for at least 24 hours to avoid unnecessary API calls and metadata fetches.

For high-traffic applications, use a multi-layer cache strategy:

```javascript
class CachedPreviewService {
  constructor(redis, screenshotService) {
    this.redis = redis;
    this.memCache = new Map(); // L1: in-memory
    this.service = screenshotService;
  }

  async getPreview(url) {
    // L1: Check memory cache (fastest)
    const memCached = this.memCache.get(url);
    if (memCached && Date.now() - memCached.ts < 3600000) {
      return memCached.data;
    }

    // L2: Check Redis (shared across instances)
    const redisCached = await this.redis.get(`preview:${url}`);
    if (redisCached) {
      const data = JSON.parse(redisCached);
      this.memCache.set(url, { data, ts: Date.now() });
      return data;
    }

    // L3: Generate fresh preview
    const preview = await this.service.generatePreview(url);
    await this.redis.setex(`preview:${url}`, 86400, JSON.stringify(preview));
    this.memCache.set(url, { data: preview, ts: Date.now() });
    return preview;
  }
}
```

### 2. Validate OG Images Before Using Them

Not all OG images are usable. Some are broken links, some are tiny tracking pixels, and some are placeholder images. Always validate before displaying:

```javascript
async function validateOgImage(imageUrl) {
  try {
    const response = await fetch(imageUrl, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return false;

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) return false;

    // Reject tiny images (likely tracking pixels)
    const contentLength = parseInt(response.headers.get('content-length') || '0');
    if (contentLength > 0 && contentLength < 1000) return false;

    return true;
  } catch {
    return false;
  }
}
```

### 3. Set Strict Timeouts

Some websites take 10+ seconds to respond during metadata extraction. Never let a slow third-party site block your application. Set aggressive timeouts at every layer:

- **Metadata fetch**: 5 seconds max
- **Screenshot capture**: 15 seconds max (handled by the API)
- **OG image validation**: 3 seconds max
- **Total preview generation**: 20 seconds max

```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, {
    signal: controller.signal,
    headers: { 'User-Agent': 'LinkPreviewBot/1.0' },
  });
  // ... process response
} finally {
  clearTimeout(timeout);
}
```

### 4. Handle Errors Gracefully

When preview generation fails (site down, blocked, timeout), show a minimal fallback instead of nothing:

```javascript
function fallbackPreview(url) {
  const domain = new URL(url).hostname.replace('www.', '');
  return {
    url,
    title: domain,
    description: url,
    image: null, // Show domain icon or placeholder
    favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
    siteName: domain,
  };
}
```

### 5. Lazy Load Preview Cards

Don't fetch previews until they're close to being visible. This is especially important for chat applications where users might have dozens of links in a conversation:

```javascript
function LinkPreviewLazy({ url }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: '200px' } // Start loading 200px before visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? <LinkPreview url={url} /> : <PreviewSkeleton />}
    </div>
  );
}
```

## Security Considerations

Link preview generation introduces security risks that must be addressed:

**SSRF (Server-Side Request Forgery)**: Your preview endpoint fetches arbitrary URLs. An attacker could use it to scan your internal network. Always validate URLs before processing:

```javascript
function isAllowedUrl(url) {
  try {
    const parsed = new URL(url);
    // Only allow HTTP/HTTPS
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    // Block private IP ranges
    const hostname = parsed.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return false;
    if (hostname.startsWith('10.') || hostname.startsWith('192.168.')) return false;
    if (hostname.match(/^172\.(1[6-9]|2\d|3[01])\./)) return false;
    return true;
  } catch {
    return false;
  }
}
```

**Rate Limiting**: Without rate limits, an attacker can use your preview endpoint to launch DDoS attacks against other sites via your server. Limit preview requests to 10–20 per minute per user.

**Content Filtering**: Some URLs may return inappropriate or malicious content. Consider scanning preview images before displaying them, and always sanitize metadata text to prevent XSS attacks.

## Performance Optimization

For high-traffic applications generating thousands of previews per day, consider these optimizations:

1. **Queue preview generation** — Don't generate previews synchronously in the request path. Accept the URL, return immediately, and process in a background queue. Push results via WebSocket or Server-Sent Events.

2. **Batch similar domains** — If you're generating previews for 50 URLs from the same domain, batch the metadata fetches to avoid overwhelming the target server.

3. **Use WebP format** — When capturing screenshots as fallback images, use WebP format for 30–50% smaller files without visible quality loss. This significantly improves loading times for preview cards.

4. **Serve from CDN** — Store preview images on a CDN (Cloudflare R2, CloudFront) so they load instantly from edge locations worldwide.

## FAQ

**Why not just use the OG image?** Many sites don't have OG images, or their OG images are low-quality logos rather than page previews. A screenshot fallback ensures every link gets a visual preview, even when the site doesn't provide one.

**How do I handle sites that block bots?** Enable `stealth` mode in the screenshot API call. This bypasses most bot detection by mimicking real browser fingerprints. For particularly aggressive anti-bot systems, adding a short `delay` (2–3 seconds) also helps.

**What viewport size should I use for previews?** The standard is 1200×630 pixels, which is the recommended OG image size. This works well for Twitter cards, Slack unfurls, Discord embeds, and most messaging applications.

**Should I generate previews on the client or server?** Always on the server. Client-side fetching of third-party URLs fails due to CORS restrictions, and it exposes your API keys. Use a server endpoint that handles metadata extraction and caching.

**How do I handle dynamic/SPA sites?** Single-page applications often need JavaScript to render content. The screenshot API handles this automatically since it uses a real browser engine. For metadata extraction, consider using a headless browser instead of simple HTTP fetches.

---

**Ready to build rich link previews?**

[Get your free API key →](/sign-up) — 100 free screenshots to get started.

See also:
- [Social Media Image Sizes Guide →](/blog/social-media-image-sizes-guide)
- [Screenshot Caching Strategies →](/blog/screenshot-caching-strategies-guide)
- [Node.js Screenshot API Tutorial →](/blog/nodejs-screenshot-api-tutorial)

