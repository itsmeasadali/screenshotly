---
title: "How DesignStudio Pro Generates 10,000+ Social Media Previews Daily"
description: "DesignStudio Pro uses Screenshotly to power their social media preview feature, generating over 10,000 OG images daily for their design platform users."
excerpt: "DesignStudio Pro needed to generate thousands of dynamic social media previews. Here's how they scaled to 10,000+ daily with Screenshotly."
author: "asad-ali"
publishedAt: "2026-02-04"
category: "guide"
tags: ["customer story", "social media", "og images", "case study", "high volume"]
keywords: ["social media previews", "og image generation", "dynamic og images", "social sharing automation"]
featured: false
readingTime: 7
---

DesignStudio Pro is a collaborative design platform used by over 50,000 creative professionals. When users share their designs on social media, they expect beautiful, eye-catching preview images. But generating these previews at scale presented a significant engineering challenge.

"We were generating OG images with a custom Puppeteer setup," explains Marcus Rivera, DesignStudio Pro's Backend Lead. "It worked initially, but as we scaled, the infrastructure costs and complexity became unsustainable."

## The Challenge: Dynamic Previews at Scale

DesignStudio Pro's requirements were demanding:

- **10,000+ daily generations** - Each shared design needs a unique preview
- **Sub-3 second latency** - Users expect instant previews when sharing
- **Consistent quality** - Brand reputation depends on professional images
- **Cost efficiency** - Infrastructure costs were spiraling

Their self-hosted Puppeteer solution was hitting limits:

```
Previous Infrastructure:
- 8 dedicated servers running Puppeteer
- 4 DevOps engineers managing the cluster
- $12,000/month in cloud costs
- Average latency: 8-12 seconds
- Reliability: 94% (too many failures)
```

## The Solution: Screenshotly API

After evaluating several options, DesignStudio Pro migrated to Screenshotly for social preview generation. The transition took just two weeks.

### Integration Architecture

Their implementation is elegantly simple:

```javascript
// Social preview generation endpoint
app.get('/api/preview/:designId', async (req, res) => {
  const { designId } = req.params;
  const design = await Design.findById(designId);
  
  // Check cache first
  const cached = await redis.get(`preview:${designId}`);
  if (cached) {
    return res.redirect(cached);
  }
  
  // Generate preview via Screenshotly
  const previewResponse = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: `${process.env.APP_URL}/embed/${designId}`,
      device: 'desktop',
      format: 'jpeg',
      quality: 85,
      viewport: { width: 1200, height: 630 }, // OG image dimensions
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner'],
      },
    }),
  });
  
  // Store in CDN and cache
  const imageUrl = await uploadToCDN(previewResponse);
  await redis.setex(`preview:${designId}`, 86400, imageUrl);
  
  res.redirect(imageUrl);
});
```

### Embedding for Social Preview

They created a dedicated embed view optimized for screenshots:

```javascript
// Embed view for screenshot capture
app.get('/embed/:designId', async (req, res) => {
  const design = await Design.findById(req.params.designId);
  
  res.render('social-embed', {
    design,
    // Clean template optimized for screenshots
    layout: 'embed-layout',
    showBranding: true,
    showMetadata: false,
  });
});
```

The embed template displays the design with professional framing:

```html
<!-- views/social-embed.ejs -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .design-frame {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      padding: 24px;
      max-width: 800px;
    }
    .branding {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="design-frame">
    <img src="<%= design.thumbnailUrl %>" alt="<%= design.title %>">
    <div class="branding">
      <img src="/logo-small.png" height="24">
      <span>Made with DesignStudio Pro</span>
    </div>
  </div>
</body>
</html>
```

## Device Mockups for Premium Sharing

For premium users, DesignStudio Pro offers device mockups that make shared designs look even more professional:

```javascript
// Premium device mockup generation
const generatePremiumPreview = async (designId) => {
  const design = await Design.findById(designId);
  
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: `${process.env.APP_URL}/embed/${designId}`,
      device: 'desktop',
      format: 'png',
      mockup: {
        type: 'macbook-pro',
        shadow: true,
        background: design.brandColor || '#ffffff',
      },
    }),
  });
  
  return response;
};
```

"The device mockups are a differentiator for us," says Marcus. "Our premium users get Apple-quality presentation without needing design skills. It's a major selling point."

## The Results

After six months with Screenshotly:

### Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Average latency | 8-12 seconds | 1.8 seconds | **85% faster** |
| Reliability | 94% | 99.9% | **Near-perfect** |
| Daily generations | 10,000 | 15,000+ | **Scaled up** |

### Cost Savings

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| Infrastructure | $12,000/month | $0 | **100%** |
| API costs | $0 | $2,400/month | - |
| DevOps time | 4 engineers part-time | 0.5 engineer | **87%** |
| **Net monthly savings** | - | - | **$8,000+** |

### Business Impact

- **Higher social engagement**: Better previews drive more clicks
- **Premium feature adoption**: 23% increase in premium subscriptions
- **Engineering focus**: Team redirected to core product features

## Optimization Strategies

DesignStudio Pro shares their optimization learnings:

### 1. Aggressive Caching

They cache generated previews for 24 hours, regenerating only when designs change:

```javascript
// Invalidate cache on design update
design.on('update', async () => {
  await redis.del(`preview:${design.id}`);
  // Optionally pre-generate new preview
  await generatePreview(design.id);
});
```

### 2. Background Pre-generation

When a design is created, they pre-generate the social preview:

```javascript
// Pre-generate on design creation
design.on('create', async () => {
  // Don't block the user
  setImmediate(async () => {
    await generatePreview(design.id);
  });
});
```

### 3. Fallback Strategy

For edge cases where generation fails, they use a generic branded fallback:

```javascript
const getPreviewWithFallback = async (designId) => {
  try {
    return await generatePreview(designId);
  } catch (error) {
    console.error(`Preview generation failed: ${error}`);
    return GENERIC_FALLBACK_URL;
  }
};
```

## Team Perspective

"Migrating off our self-hosted Puppeteer was one of the best infrastructure decisions we made last year," reflects Marcus. "We went from managing servers to making API calls. The reliability improvement alone was worth it."

Product Manager Lisa Zhang adds: "Our users now share designs more often because the previews look professional. Social sharing is up 40% since we improved preview quality. It's a direct revenue driver."

## Architecture Evolution

Their journey shows a common pattern:

```
Phase 1: Manual screenshots (0-1,000 users)
Phase 2: Self-hosted Puppeteer (1,000-10,000 users)
Phase 3: Managed API service (10,000+ users) ← Current
```

"Every growing startup hits the Puppeteer complexity wall eventually," notes Marcus. "The question is whether you want to become experts in browser infrastructure or focus on your core product. For us, the choice was clear."

## Conclusion

DesignStudio Pro's migration to Screenshotly demonstrates that sometimes the best engineering decision is to not build something yourself. By leveraging a purpose-built API, they achieved better performance, higher reliability, and significant cost savings.

"We're generating more previews than ever, spending less, and our engineering team is building features instead of maintaining screenshot servers," summarizes Marcus. "That's the definition of a good technology choice."

---

**Need to generate social previews at scale?**

[Start with 100 free screenshots →](/sign-up)

Learn more about [social media preview automation →](/use-cases/social-media-previews)
