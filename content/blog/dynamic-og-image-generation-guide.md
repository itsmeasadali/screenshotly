---
title: "How to Generate OG Images Dynamically at Scale"
description: "Learn how to generate Open Graph images dynamically for social media sharing. Covers architecture, caching strategies, and scaling to millions of previews."
excerpt: "A practical guide to dynamic OG image generation. From architecture design to production deployment with caching and CDN integration."
author: "asad-ali"
publishedAt: "2026-01-22"
category: "guide"
tags: ["og images", "social media", "automation", "performance"]
keywords: ["og image generation", "dynamic og images", "social media preview", "open graph images", "twitter cards"]
featured: false
readingTime: 10
---

Open Graph (OG) images are the preview images that appear when your links are shared on social media platforms like Twitter, Facebook, and LinkedIn. A compelling OG image dramatically increases click-through rates, but creating unique images for every page at scale is challenging.

In this guide, we'll explore how to generate OG images dynamically, covering architecture decisions, implementation patterns, and scaling strategies.

## Why Dynamic OG Images Matter

### The Problem with Static Images

Many sites use a single default OG image site-wide. This approach has limitations:

- **No differentiation**: All shared links look identical
- **Lower engagement**: Generic images don't capture attention
- **Missed branding**: Can't showcase specific content

### The Power of Dynamic Images

Dynamic OG images include:

- **Content-specific information**: Title, author, date
- **Relevant visuals**: Images related to the content
- **Consistent branding**: Logo, colors, typography
- **Meta information**: Read time, category, tags

Studies show dynamic OG images can increase click-through rates by 40%+.

## Architecture Options

### Option 1: Build-Time Generation

Generate images during your build process for static content.

**Pros:**
- No runtime latency
- Images are cached at CDN by default
- No server infrastructure needed

**Cons:**
- Doesn't work for dynamic content
- Build times increase linearly with pages
- Changes require full rebuild

**Best for:** Static sites, blogs with infrequent updates

### Option 2: Runtime Generation with Caching

Generate images on-demand when first requested, then cache.

**Pros:**
- Works for dynamic content
- Scales well with caching
- Only generates what's actually requested

**Cons:**
- First request has latency
- Requires caching infrastructure
- Need to invalidate on content changes

**Best for:** Dynamic applications, user-generated content

### Option 3: Hybrid Approach

Pre-generate for popular content, generate on-demand for long-tail.

**Pros:**
- Fast for popular content
- Handles long-tail efficiently
- Balances resources

**Cons:**
- More complex to implement
- Need to identify popular content

**Best for:** Large sites with mixed content types

## Implementation: Runtime Generation

Let's build a runtime OG image generation system using a screenshot API.

### Basic Architecture

```
User shares link
       ↓
Social platform requests OG image
       ↓
CDN cache check
       ↓ (miss)
Origin server
       ↓
Screenshot API captures template
       ↓
Image returned & cached
```

### OG Image Template

First, create an HTML template for your OG images:

```jsx
// pages/og/[slug].js (Next.js example)
export default function OGTemplate({ title, description, author, category }) {
  return (
    <html>
      <head>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 60px;
            color: white;
          }
          
          .category {
            font-size: 24px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.9;
          }
          
          .title {
            font-size: 64px;
            font-weight: 800;
            line-height: 1.2;
            max-width: 900px;
          }
          
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .author {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          
          .author-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: white;
          }
          
          .author-name {
            font-size: 24px;
            font-weight: 500;
          }
          
          .logo {
            font-size: 32px;
            font-weight: 700;
          }
        `}</style>
      </head>
      <body>
        <div className="category">{category}</div>
        <h1 className="title">{title}</h1>
        <div className="footer">
          <div className="author">
            <div className="author-avatar"></div>
            <span className="author-name">{author}</span>
          </div>
          <div className="logo">YourSite</div>
        </div>
      </body>
    </html>
  );
}

export async function getServerSideProps({ params }) {
  const post = await getPost(params.slug);
  return { props: post };
}
```

### Screenshot API Integration

Create an endpoint that generates OG images via screenshot:

```javascript
// pages/api/og/[slug].js
import { getPost } from '@/lib/posts';

const API_KEY = process.env.SCREENSHOTLY_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function handler(req, res) {
  const { slug } = req.query;
  
  // Check cache header
  const cacheKey = `og-image-${slug}`;
  const cachedUrl = await cache.get(cacheKey);
  
  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }
  
  // Generate via screenshot API
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: `${BASE_URL}/og/${slug}`,
      viewport: { width: 1200, height: 630 },
      format: 'png',
      // Remove any dynamic elements
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner'],
      },
    }),
  });
  
  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to generate image' });
  }
  
  const image = await response.arrayBuffer();
  
  // Upload to CDN/S3 for caching
  const imageUrl = await uploadToCDN(Buffer.from(image), `og/${slug}.png`);
  
  // Cache the URL
  await cache.set(cacheKey, imageUrl, 86400); // 24 hours
  
  // Redirect to CDN URL
  res.redirect(imageUrl);
}
```

### Meta Tags Integration

Add the OG image to your page meta tags:

```jsx
// pages/blog/[slug].js
import Head from 'next/head';

export default function BlogPost({ post }) {
  const ogImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/${post.slug}`;
  
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      {/* Page content */}
    </>
  );
}
```

## Scaling Strategies

### 1. CDN Caching

Use long cache TTLs at the CDN level:

```javascript
// Cloudflare Cache-Control headers
res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
```

### 2. Pre-generation for Popular Content

Identify high-traffic pages and pre-generate their images:

```javascript
// scripts/pre-generate-og.js
const popularPosts = await getPopularPosts(100);

for (const post of popularPosts) {
  await generateOGImage(post.slug);
  console.log(`Generated: ${post.slug}`);
  
  // Rate limiting
  await sleep(100);
}
```

### 3. Background Processing

Don't block page renders for OG generation:

```javascript
// Generate asynchronously after content publish
contentService.on('publish', async (content) => {
  // Fire and forget
  setImmediate(async () => {
    await generateOGImage(content.slug);
  });
});
```

### 4. Fallback Images

Always have a fallback for generation failures:

```javascript
const ogImage = await generateOGImage(slug).catch(() => {
  return getDefaultOGImage(category);
});
```

## Advanced Patterns

### Content-Aware Images

Include relevant visuals from your content:

```javascript
const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: templateUrl,
    viewport: { width: 1200, height: 630 },
    format: 'png',
    // Wait for images to load
    delay: 1000,
  }),
});
```

### A/B Testing OG Images

Test different templates to optimize engagement:

```javascript
function getOGTemplate(slug, variant) {
  const templates = {
    a: '/og/template-gradient',
    b: '/og/template-minimal',
    c: '/og/template-photo',
  };
  
  return `${templates[variant]}/${slug}`;
}

// Random assignment with persistence
function getVariant(slug) {
  const hash = hashCode(slug);
  const variants = ['a', 'b', 'c'];
  return variants[Math.abs(hash) % variants.length];
}
```

### Device Mockups for Products

For SaaS products, show your UI in a device frame:

```javascript
const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: productDemoUrl,
    viewport: { width: 1200, height: 630 },
    format: 'png',
    mockup: {
      type: 'browser-dark',
      shadow: true,
    },
  }),
});
```

## Cache Invalidation

When content changes, invalidate the cached OG image:

```javascript
// Clear cache on content update
contentService.on('update', async (content) => {
  await cache.delete(`og-image-${content.slug}`);
  await cdn.purge(`/api/og/${content.slug}`);
  
  // Optional: Pre-generate new version
  await generateOGImage(content.slug);
});
```

## Monitoring and Debugging

### Debug Mode

Add a debug parameter for testing:

```javascript
if (req.query.debug) {
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
} else {
  res.redirect(cdnUrl);
}
```

### Social Media Validators

Test your OG images with platform tools:

- **Facebook**: facebook.com/developers/tools/debug
- **Twitter**: cards-dev.twitter.com/validator
- **LinkedIn**: linkedin.com/post-inspector

### Metrics

Track generation performance:

```javascript
const startTime = Date.now();
const image = await generateOGImage(slug);
const duration = Date.now() - startTime;

metrics.histogram('og_generation_time', duration);
metrics.increment('og_generations_total');
```

## Conclusion

Dynamic OG image generation transforms how your content appears on social media. The key principles:

1. **Design compelling templates** that showcase your content
2. **Use a screenshot API** to render templates as images
3. **Cache aggressively** at CDN level for performance
4. **Pre-generate popular content** to eliminate latency
5. **Monitor and iterate** on designs that drive engagement

Start with a simple implementation and scale as your needs grow.

---

**Ready to generate dynamic OG images?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Learn more about [social media preview automation →](/use-cases/social-media-previews)
