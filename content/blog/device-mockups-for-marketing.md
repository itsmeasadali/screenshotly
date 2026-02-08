---
title: "Device Mockups for Marketing: Transform Screenshots into Premium Visuals"
slug: "device-mockups-for-marketing"
excerpt: "Learn how to wrap screenshots in beautiful iPhone, MacBook, and browser frames to create stunning marketing materials and social media content."
publishedAt: "2024-07-20T10:00:00Z"
updatedAt: "2025-01-22T10:00:00Z"
author: "asad-ali"
category: "guide"
tags: ["mockups", "marketing", "design", "social-media"]
keywords: 
  - "device mockup generator"
  - "screenshot mockup API"
  - "iPhone mockup screenshot"
  - "MacBook mockup generator"
  - "browser frame screenshot"
  - "marketing screenshot tool"
  - "social media mockups"
  - "product screenshot frames"
readingTime: 12
featured: true
image: "/images/blog/device-mockups/hero.jpg"
faqs:
  - question: "What device mockups are available?"
    answer: "Screenshotly offers iPhone (multiple generations), MacBook Pro, MacBook Air, iPad, browser frames (Chrome, Safari, Firefox), and generic device frames. All mockups are high-resolution and commercially licensed."
  - question: "Can I use mockups for commercial projects?"
    answer: "Absolutely! All device mockups included with Screenshotly are fully licensed for commercial use, including client work, marketing materials, and resale."
  - question: "Do mockups affect screenshot quality?"
    answer: "No. Mockups are applied as post-processing overlays on your original high-resolution capture. The screenshot quality remains unchanged, and the mockup frames are optimized for crisp rendering at any size."
  - question: "Can I customize mockup colors or styles?"
    answer: "Yes! Most mockups support color variants (space gray, silver, gold for Apple devices) and orientation options (portrait, landscape). Browser frames support light and dark themes."
---

## The Power of Visual Context

A screenshot is data. A screenshot in a device mockup is a story.

When you share a plain screenshot of your app, viewers see pixels on a screen. When you wrap that same screenshot in an iPhone frame, they see your app in someone's hand. They picture themselves using it. The psychological difference is profound.

This isn't just theory. A/B tests consistently show that device mockups increase engagement:
- **2.3x higher click-through rates** on social media posts
- **40% more shares** compared to plain screenshots
- **67% better recall** in user testing studies

For [social media previews](/use-cases/social-media-previews), [marketing materials](/use-cases/email-marketing), and product launches, device mockups transform functional screenshots into compelling visuals.

## Available Device Mockups

Screenshotly provides a comprehensive library of device frames:

### Apple Devices

| Device | Variants | Best For |
|--------|----------|----------|
| iPhone 15 Pro | Space Black, Natural Titanium, Blue, White | Mobile app screenshots |
| iPhone 15 | Black, Blue, Green, Yellow, Pink | Consumer app marketing |
| iPhone 14 | All standard colors | Broad compatibility |
| iPad Pro | Space Gray, Silver | Tablet app showcase |
| MacBook Pro | Space Gray, Silver | Desktop app, SaaS |
| MacBook Air | Midnight, Starlight, Silver | Lightweight app vibes |

### Browser Frames

| Frame Style | Theme Options | Best For |
|-------------|---------------|----------|
| Chrome | Light, Dark | Web apps, SaaS |
| Safari | Light, Dark | Mac-focused audiences |
| Firefox | Light, Dark | Developer tools |
| Generic Browser | Light, Dark | Platform-neutral content |
| Minimal Frame | White, Black | Clean, modern look |

### Other Devices

| Device | Options | Best For |
|--------|---------|----------|
| Android Generic | Black, White | Cross-platform apps |
| Desktop Monitor | Slim, Ultrawide | Desktop software |
| Laptop Generic | Silver, Dark | Non-Apple audiences |

## Implementing Device Mockups

### Basic Usage

Adding a mockup is as simple as including the `mockup` parameter:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-app.com',
    device: 'mobile',
    format: 'png',
    mockup: 'iphone-15-pro',
  }),
});
```

The API automatically:
1. Captures your screenshot at the appropriate resolution
2. Fits it perfectly within the device frame
3. Applies realistic shadows and reflections
4. Returns a production-ready image

### Mockup Options

```javascript
{
  mockup: 'iphone-15-pro',
  mockupOptions: {
    color: 'space-black',      // Device color variant
    orientation: 'portrait',    // portrait or landscape
    shadow: true,              // Add drop shadow
    background: 'transparent', // transparent, white, or hex color
  },
}
```

### Browser Frame Examples

For web applications and SaaS products, browser frames provide context without implying a specific device:

```javascript
// Light theme browser frame
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-saas.com/dashboard',
    device: 'desktop',
    format: 'png',
    mockup: 'browser-light',
    mockupOptions: {
      showUrl: true,           // Display URL in address bar
      showControls: true,      // Show traffic light buttons
      shadow: true,
      background: '#f5f5f5',   // Subtle gray background
    },
  }),
});
```

## Marketing Use Cases

### Social Media Content

Different platforms have different visual expectations. Here's how to optimize:

**Twitter/X Cards:**
```javascript
async function createTwitterCard(pageUrl) {
  return fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: pageUrl,
      viewport: { width: 1200, height: 675 }, // Twitter card ratio
      format: 'png',
      mockup: 'browser-dark',
      mockupOptions: {
        shadow: true,
        background: '#1a1a2e', // Dark, premium feel
      },
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget'],
      },
    }),
  });
}
```

**LinkedIn Posts:**
```javascript
async function createLinkedInVisual(appUrl) {
  return fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: appUrl,
      device: 'desktop',
      viewport: { width: 1200, height: 627 }, // LinkedIn optimal
      format: 'png',
      mockup: 'macbook-pro',
      mockupOptions: {
        color: 'space-gray',
        shadow: true,
        background: 'white',
      },
    }),
  });
}
```

**Instagram/Product Hunt:**
```javascript
async function createShowcaseImage(appUrl) {
  return fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: appUrl,
      device: 'mobile',
      format: 'png',
      mockup: 'iphone-15-pro',
      mockupOptions: {
        color: 'natural-titanium',
        orientation: 'portrait',
        shadow: true,
        background: 'transparent',
      },
    }),
  });
}
```

### App Store Assets

For app store listings, device mockups are essential:

```javascript
async function generateAppStoreScreenshot(screenUrl, device) {
  const deviceConfigs = {
    'iphone-6.7': {
      mockup: 'iphone-15-pro-max',
      viewport: { width: 430, height: 932 },
    },
    'iphone-6.5': {
      mockup: 'iphone-14-pro-max',
      viewport: { width: 428, height: 926 },
    },
    'ipad-12.9': {
      mockup: 'ipad-pro-12.9',
      viewport: { width: 1024, height: 1366 },
    },
  };

  const config = deviceConfigs[device];

  return fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: screenUrl,
      viewport: config.viewport,
      format: 'png',
      mockup: config.mockup,
      mockupOptions: {
        shadow: false, // App stores prefer clean edges
        background: 'transparent',
      },
    }),
  });
}
```

### Email Marketing Campaigns

For [email marketing](/use-cases/email-marketing), mockups dramatically increase click-through rates:

```javascript
async function createEmailHeroImage(landingPageUrl) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: landingPageUrl,
      device: 'mobile',
      format: 'png',
      mockup: 'iphone-15',
      mockupOptions: {
        color: 'blue',
        shadow: true,
        background: 'white',
      },
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget', 'newsletter'],
      },
    }),
  });

  return response;
}
```

## Advanced Techniques

### Multi-Device Compositions

Create impressive multi-device layouts by capturing multiple mockups:

```javascript
async function createMultiDeviceShowcase(urls) {
  const captures = await Promise.all([
    // Desktop view
    captureWithMockup(urls.desktop, {
      device: 'desktop',
      mockup: 'macbook-pro',
      mockupOptions: { color: 'silver' },
    }),
    // Tablet view
    captureWithMockup(urls.tablet, {
      device: 'tablet',
      mockup: 'ipad-pro',
      mockupOptions: { orientation: 'landscape' },
    }),
    // Mobile view
    captureWithMockup(urls.mobile, {
      device: 'mobile',
      mockup: 'iphone-15-pro',
      mockupOptions: { color: 'space-black' },
    }),
  ]);

  return captures;
}

async function captureWithMockup(url, options) {
  return fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: options.device,
      format: 'png',
      mockup: options.mockup,
      mockupOptions: options.mockupOptions,
    }),
  });
}
```

### Dynamic OG Images

Generate [social previews](/use-cases/social-media-previews) dynamically with mockups:

```javascript
// Next.js API route example
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageUrl = searchParams.get('url');

  const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: pageUrl,
      viewport: { width: 1200, height: 630 },
      format: 'png',
      mockup: 'browser-light',
      aiRemoval: { enabled: true },
    }),
  });

  const imageBuffer = await screenshot.arrayBuffer();

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400', // Cache 24 hours
    },
  });
}
```

### A/B Testing Mockup Styles

Test different mockup styles to find what resonates with your audience:

```javascript
async function generateMockupVariants(pageUrl) {
  const variants = [
    { name: 'minimal', mockup: 'browser-minimal', background: 'white' },
    { name: 'dark', mockup: 'browser-dark', background: '#1a1a2e' },
    { name: 'iphone', mockup: 'iphone-15-pro', background: 'transparent' },
    { name: 'macbook', mockup: 'macbook-pro', background: '#f5f5f5' },
  ];

  const results = await Promise.all(
    variants.map(async (variant) => {
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: pageUrl,
          format: 'png',
          mockup: variant.mockup,
          mockupOptions: {
            background: variant.background,
            shadow: true,
          },
        }),
      });

      return {
        name: variant.name,
        image: await response.arrayBuffer(),
      };
    })
  );

  return results;
}
```

## Mockup Best Practices

### Choosing the Right Device

| Content Type | Recommended Mockup | Why |
|-------------|-------------------|-----|
| Mobile app | iPhone 15 Pro | Premium, current, recognizable |
| Web app (B2B) | MacBook Pro | Professional, desktop-focused |
| Web app (B2C) | Browser frame | Platform-neutral, accessible |
| Responsive demo | Multi-device | Shows adaptability |
| Landing page | Browser light | Clean, focuses on content |

### Background Considerations

- **White**: Clean, minimalist, works everywhere
- **Transparent**: For layering in design tools
- **Dark (#1a1a2e)**: Premium, modern feel
- **Gradient**: Eye-catching, social media friendly
- **Brand color**: Reinforces brand identity

### Shadow and Depth

Shadows add realism but consider context:
- **With shadow**: Social posts, presentations, marketing
- **Without shadow**: App store assets, documentation, overlays

## Integration Examples

### Automated Social Media Pipeline

```javascript
// Generates social images for new blog posts
async function processBlogPost(post) {
  const socialImage = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: post.url,
      viewport: { width: 1200, height: 630 },
      format: 'png',
      mockup: 'browser-light',
      mockupOptions: {
        shadow: true,
        background: '#f8f9fa',
      },
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'chat-widget'],
      },
    }),
  });

  // Upload to CDN
  const imageUrl = await uploadToStorage(await socialImage.arrayBuffer());

  // Update post metadata
  await updatePostOgImage(post.id, imageUrl);

  return imageUrl;
}
```

### Product Launch Kit Generator

```javascript
async function generateLaunchKit(productUrl) {
  const assets = {
    hero: await captureWithMockup(productUrl, 'macbook-pro', {
      viewport: { width: 1920, height: 1080 },
      background: 'transparent',
    }),
    twitter: await captureWithMockup(productUrl, 'browser-dark', {
      viewport: { width: 1200, height: 675 },
      background: '#1a1a2e',
    }),
    producthunt: await captureWithMockup(productUrl, 'browser-light', {
      viewport: { width: 1270, height: 760 },
      background: 'white',
    }),
    mobile: await captureWithMockup(productUrl, 'iphone-15-pro', {
      device: 'mobile',
      background: 'transparent',
    }),
  };

  return assets;
}
```

## Performance Tips

1. **Cache mockup results** - Same screenshot with same mockup can be cached
2. **Use appropriate resolution** - Don't capture 4K for a Twitter card
3. **Batch similar requests** - Process multiple URLs in parallel
4. **Consider CDN delivery** - Store generated images on a CDN

## Next Steps

Device mockups pair perfectly with other Screenshotly features:

- **[AI Element Removal](/blog/ai-element-removal-guide)**: Get clean screenshots before adding frames
- **[Performance Optimization](/blog/optimize-screenshot-performance)**: Speed up mockup generation
- **[Mobile Screenshots](/blog/mobile-responsive-screenshots)**: Perfect mobile captures for device frames
- **[Social Media Previews](/use-cases/social-media-previews)**: Complete social marketing workflow

Try different mockups in our [interactive playground](/playground), or dive into the [API documentation](/help) for all available options.

Ready to transform your screenshots? [Get started free](/sign-up) with 100 free screenshots.
