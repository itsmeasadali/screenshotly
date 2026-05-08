---
title: "Social Media Image Sizes 2026: Complete Reference"
description: "Complete reference for social media image dimensions in 2026. Plus how to automate perfect-sized previews for every platform."
excerpt: "The definitive guide to social media image sizes. Learn optimal dimensions for every platform and automate preview generation."
author: "asad-ali"
publishedAt: "2025-12-22"
category: "guide"
tags: ["social media", "image sizes", "automation", "marketing"]
keywords: ["social media image sizes", "og image dimensions", "twitter card size", "facebook image size", "linkedin image dimensions"]
featured: false
readingTime: 6
faqs:
  - question: "What's the single most important OG image size to get right?"
    answer: "1200×630 pixels. It works across Facebook, LinkedIn, Twitter/X, Slack, Discord, iMessage, and every other platform that implements the Open Graph spec. If you only optimize one size, pick this one and move on. Platform-specific overrides (like Twitter cards) are nice-to-have, not required."
  - question: "Do I need separate images for Twitter/X cards?"
    answer: "Only if you want to use Twitter's summary_large_image card format, which crops differently than standard OG. In practice most teams use the same 1200×630 OG image and accept the slight Twitter crop — the ROI of maintaining separate assets rarely justifies the pipeline complexity."
  - question: "How do I know if my OG images are actually rendering correctly?"
    answer: "Paste the URL into each platform's official debugger: Facebook Sharing Debugger, LinkedIn Post Inspector, Twitter Card Validator. These show exactly what each platform will render and cache. Run this check after every OG template change before marketing shares the link."
---

Social media platforms have specific image dimension requirements. Using the wrong size means cropped previews, blurry images, or wasted screen real estate. This guide covers optimal dimensions for every major platform, plus how to automate perfect images every time.

Canonical sources to bookmark for these specs: the [Open Graph protocol at ogp.me](https://ogp.me/), [Twitter/X Cards documentation](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/abouts-cards), [LinkedIn share API](https://www.linkedin.com/help/linkedin/answer/a521928), and the [Pinterest Rich Pins guide](https://help.pinterest.com/en/business/article/rich-pins). For verifying renders before launch: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), and [Twitter Card Validator](https://cards-dev.twitter.com/validator).

## Quick Reference: All Platforms

### Open Graph (Universal)

Used by Facebook, LinkedIn, and many other platforms.

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Standard OG** | 1200 × 630 px | 1.91:1 |
| **Square OG** | 1200 × 1200 px | 1:1 |
| **Minimum** | 600 × 315 px | 1.91:1 |

**Best practice**: Always use 1200 × 630 for maximum compatibility.

### Twitter/X

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Summary Card** | 800 × 418 px | 1.91:1 |
| **Large Summary** | 1200 × 628 px | 1.91:1 |
| **In-feed Image** | 1200 × 675 px | 16:9 |
| **Profile Header** | 1500 × 500 px | 3:1 |

**Best practice**: Use 1200 × 628 for automatic large previews.

### Facebook

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Link Preview** | 1200 × 630 px | 1.91:1 |
| **Feed Image** | 1200 × 630 px | 1.91:1 |
| **Story** | 1080 × 1920 px | 9:16 |
| **Cover Photo** | 1640 × 624 px | 2.63:1 |

### LinkedIn

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Link Preview** | 1200 × 627 px | 1.91:1 |
| **Company Post** | 1200 × 627 px | 1.91:1 |
| **Company Cover** | 1128 × 191 px | 5.9:1 |
| **Personal Banner** | 1584 × 396 px | 4:1 |

### Instagram

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Square Post** | 1080 × 1080 px | 1:1 |
| **Portrait** | 1080 × 1350 px | 4:5 |
| **Landscape** | 1080 × 566 px | 1.91:1 |
| **Story/Reel** | 1080 × 1920 px | 9:16 |

### Pinterest

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Standard Pin** | 1000 × 1500 px | 2:3 |
| **Square Pin** | 1000 × 1000 px | 1:1 |
| **Long Pin** | 1000 × 2100 px | 1:2.1 |

### YouTube

| Image Type | Dimensions | Aspect Ratio |
|------------|------------|--------------|
| **Thumbnail** | 1280 × 720 px | 16:9 |
| **Channel Banner** | 2560 × 1440 px | 16:9 |

## The Universal Size: 1200 × 630

If you can only create one image, use **1200 × 630 pixels**.

This works well on:
- ✅ Facebook link previews
- ✅ Twitter/X large cards
- ✅ LinkedIn shares
- ✅ Slack unfurls
- ✅ Discord embeds
- ✅ Most messaging apps

## Automating Social Images

### Dynamic OG Image Generation

Generate perfect social previews automatically:

```javascript
async function generateSocialPreview(pageUrl, title) {
  // Capture at OG dimensions
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: `${BASE_URL}/og-template?title=${encodeURIComponent(title)}`,
      device: 'desktop',
      format: 'png',
      viewport: {
        width: 1200,
        height: 630,
      },
    }),
  });

  return response.arrayBuffer();
}
```

### OG Image Template

Create an HTML template at `/og-template`:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px;
    }
    h1 {
      color: white;
      font-size: 56px;
      font-weight: 800;
      line-height: 1.2;
      max-width: 900px;
    }
    .logo {
      position: absolute;
      bottom: 40px;
      left: 60px;
      color: white;
      font-size: 24px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h1>{{title}}</h1>
  <div class="logo">YourBrand</div>
</body>
</html>
```

### Multi-Platform Generation

Generate images for all platforms at once:

```javascript
const platforms = [
  { name: 'og', width: 1200, height: 630 },
  { name: 'twitter', width: 1200, height: 628 },
  { name: 'instagram-square', width: 1080, height: 1080 },
  { name: 'instagram-story', width: 1080, height: 1920 },
  { name: 'pinterest', width: 1000, height: 1500 },
];

async function generateAllSocialImages(title) {
  const images = {};
  
  for (const platform of platforms) {
    images[platform.name] = await captureAtSize(
      `/social-template/${platform.name}?title=${title}`,
      platform.width,
      platform.height
    );
  }
  
  return images;
}
```

## Platform-Specific Considerations

### Twitter/X Cards

Enable large cards with meta tags:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://example.com/og-image.png">
```

### Facebook Debugger

Clear Facebook's cache after updating images:

```
https://developers.facebook.com/tools/debug/?q=YOUR_URL
```

### LinkedIn Post Inspector

Verify LinkedIn previews:

```
https://www.linkedin.com/post-inspector/
```

### Discord Embeds

Discord uses OG tags but caches aggressively. Add cache-busting:

```html
<meta property="og:image" content="https://example.com/og.png?v=2">
```

## Automation Workflow

### On Content Publish

```javascript
// When blog post is published
contentService.on('publish', async (post) => {
  // Generate OG image
  const ogImage = await generateSocialPreview(post.url, post.title);
  
  // Upload to CDN
  const imageUrl = await uploadToCDN(ogImage, `og/${post.slug}.png`);
  
  // Update post meta
  await updatePostMeta(post.id, { ogImage: imageUrl });
});
```

### Bulk Generation

Generate images for existing content:

```javascript
async function generateMissingSocialImages() {
  const posts = await Post.find({ ogImage: null });
  
  for (const post of posts) {
    const image = await generateSocialPreview(post.url, post.title);
    const url = await uploadToCDN(image, `og/${post.slug}.png`);
    await post.updateOne({ ogImage: url });
    
    console.log(`Generated: ${post.slug}`);
  }
}
```

## Testing Social Images

### Validators

- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

### Common Issues

**Image not appearing:**
- Check image dimensions meet minimums
- Verify image URL is publicly accessible
- Clear platform cache using debuggers

**Image cropped incorrectly:**
- Keep important content centered
- Account for safe zones on each platform
- Test with actual shares

**Blurry preview:**
- Use minimum 1200px width
- Export as PNG for graphics, JPEG for photos
- Avoid compression artifacts

## Best Practices

### 1. Design for Mobile First

Most social browsing happens on mobile, so your images need to look sharp on small screens. Ensure headline text is at least 40px in your OG template—anything smaller becomes illegible in a phone feed. Before: a 24px subtitle crammed with detail that turns into a blur on an iPhone. After: a bold 56px title with a clean background that pops even at thumbnail scale. Screenshotly's viewport option lets you preview captures at mobile widths so you can catch readability issues before publishing.

### 2. Keep Text Minimal

Users scroll past hundreds of posts a day, so your image has roughly one second to land its message. Stick to a single headline of six words or fewer—no paragraphs, no bullet lists. For example, instead of "Top 10 Reasons Our Platform Saves You Time and Money," try "Ship Faster, Spend Less." When you generate OG images with Screenshotly, a minimal HTML template keeps the text layer clean and lets the visual do the talking.

### 3. Include Brand Elements

Consistent logos, brand colors, and typography turn random shares into recognizable content in a crowded feed. Place your logo in a fixed corner of the OG template so it appears on every generated image without manual effort. For instance, a SaaS company that adds its icon at bottom-left and uses its brand gradient as the background saw a 20% lift in click-through recognition. With Screenshotly, you can bake these elements into an HTML template once and every captured social image inherits them automatically.

### 4. Use High Contrast

Social feeds are viewed everywhere—bright sunlight, dark mode, low-brightness commute scrolling—so contrast is non-negotiable. Aim for a WCAG AA contrast ratio (at least 4.5:1) between text and background in your OG images. Before: light-gray text on a pastel background that vanishes in direct sunlight. After: white bold text on a deep-purple gradient that stays legible in any lighting. You can verify this quickly by capturing the template with Screenshotly and checking the result on your phone in both light and dark mode.

### 5. Test on Multiple Platforms

An image that looks perfect on Twitter may get cropped awkwardly on LinkedIn or appear tiny on Facebook. Always run your URL through each platform's debugger—Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector—before a launch. A common pitfall is centering a key headline that gets sliced in half by Instagram's square crop. Screenshotly's multi-platform generation feature lets you render the same template at every required dimension in a single API call, so you can visually compare results across platforms before anything goes live.

### 6. Automate Everything

Manually creating social images for every blog post, landing page, and changelog entry quickly becomes a bottleneck. Instead, build an HTML template once and let automation handle the rest on every publish event. For example, the workflow shown earlier in this guide triggers Screenshotly's API on content publish, generates the OG image, uploads it to a CDN, and updates the post meta—all with zero designer involvement. Teams that automate this step report saving 15–30 minutes per piece of content and eliminating forgotten or mismatched preview images entirely.

## Conclusion

Getting social media images right maximizes engagement when your content is shared. Key takeaways:

- **1200 × 630** works universally for link previews
- **Platform-specific** sizes optimize for each network
- **Automation** ensures consistency and saves time
- **Testing** with platform tools catches issues before sharing

With proper templates and automation, perfect social images require zero manual effort.

---

**Ready to automate social images?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Dynamic OG Image Generation →](/blog/dynamic-og-image-generation-guide)
