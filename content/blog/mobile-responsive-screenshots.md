---
title: "Mobile Screenshot Optimization: Capturing Responsive Designs Perfectly"
slug: "mobile-responsive-screenshots"
excerpt: "Master mobile screenshot capture with proper viewport settings, device emulation, and responsive design testing techniques."
publishedAt: "2024-08-10T10:00:00Z"
updatedAt: "2025-01-25T10:00:00Z"
author: "asad-ali"
category: "tutorial"
tags: ["mobile", "responsive", "viewport", "testing"]
keywords: 
  - "mobile screenshot API"
  - "responsive screenshot capture"
  - "mobile viewport screenshot"
  - "device emulation screenshot"
  - "responsive design testing"
  - "mobile app screenshot automation"
  - "viewport screenshot API"
  - "cross-device screenshot testing"
readingTime: 11
featured: false
image: "/images/blog/mobile-screenshots/hero.jpg"
faqs:
  - question: "What mobile viewports does Screenshotly support?"
    answer: "Screenshotly supports any custom viewport size you specify. We also provide preset device emulations for iPhone (all generations), Android phones (Pixel, Samsung), and tablets (iPad, Android tablets) with accurate viewport and device pixel ratio settings."
  - question: "How do I capture retina-quality mobile screenshots?"
    answer: "Set the deviceScaleFactor to 2 or 3 in your viewport configuration. This captures at 2x or 3x resolution, matching the pixel density of modern mobile displays."
  - question: "Can I test responsive breakpoints automatically?"
    answer: "Yes! Capture the same URL at multiple viewport widths to test your responsive breakpoints. Common widths are 375px (mobile), 768px (tablet), 1024px (small desktop), and 1440px (large desktop)."
  - question: "How do I handle mobile-specific content like app install banners?"
    answer: "Use our AI removal feature with the 'app-install' type to automatically hide app install prompts that only appear on mobile."
---

## Why Mobile Screenshots Matter

Mobile traffic accounts for over 60% of global web visits. Yet most screenshot automation focuses on desktop captures, leaving mobile experience validation as an afterthought.

The reality is that mobile rendering differs significantly from desktop:
- Different viewport dimensions and aspect ratios
- Touch-optimized layouts with larger tap targets
- Responsive images served at different resolutions
- Mobile-specific navigation patterns (hamburger menus, bottom bars)
- Font size adjustments for readability
- Completely different content prioritization

Testing and documenting your mobile experience requires purpose-built screenshot capture that understands these differences.

## Understanding Mobile Viewports

### Device Pixel Ratio Explained

Modern mobile devices have high-density displays. An iPhone 15 Pro has a 3x device pixel ratio (DPR), meaning each CSS pixel is rendered with 3 physical pixels in each dimension.

When capturing screenshots:
- **DPR 1**: Standard resolution, 1:1 CSS to physical pixels
- **DPR 2**: Retina/2x resolution, common on tablets and older phones
- **DPR 3**: Super retina/3x resolution, current flagship phones

```javascript
// Standard mobile capture
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3, // iPhone 15 Pro DPR
    },
    format: 'png',
  }),
});
```

### Common Mobile Viewport Sizes

| Device | Viewport | DPR | Physical Resolution |
|--------|----------|-----|---------------------|
| iPhone 15 Pro | 393×852 | 3 | 1179×2556 |
| iPhone 15 | 390×844 | 3 | 1170×2532 |
| iPhone SE | 375×667 | 2 | 750×1334 |
| Pixel 8 | 412×915 | 2.625 | 1080×2400 |
| Samsung S24 | 360×780 | 3 | 1080×2340 |
| iPad Pro 12.9" | 1024×1366 | 2 | 2048×2732 |
| iPad Air | 820×1180 | 2 | 1640×2360 |

## Basic Mobile Screenshot Capture

### Using Device Presets

The simplest approach uses our built-in device presets:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'mobile', // Uses sensible mobile defaults
    format: 'png',
  }),
});
```

For specific devices:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'iphone-15-pro', // Exact device emulation
    format: 'png',
  }),
});
```

### Custom Viewport Configuration

For precise control:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,          // Enables touch emulation
      hasTouch: true,          // Touch event support
      isLandscape: false,      // Portrait orientation
    },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    format: 'png',
  }),
});
```

## Responsive Design Testing

### Testing Multiple Breakpoints

Capture your site at all responsive breakpoints:

```javascript
async function captureResponsiveBreakpoints(url) {
  const breakpoints = [
    { name: 'mobile-sm', width: 320, height: 568, dpr: 2 },
    { name: 'mobile-md', width: 375, height: 812, dpr: 3 },
    { name: 'mobile-lg', width: 428, height: 926, dpr: 3 },
    { name: 'tablet', width: 768, height: 1024, dpr: 2 },
    { name: 'tablet-lg', width: 1024, height: 1366, dpr: 2 },
    { name: 'desktop', width: 1440, height: 900, dpr: 1 },
    { name: 'desktop-lg', width: 1920, height: 1080, dpr: 1 },
  ];

  const screenshots = await Promise.all(
    breakpoints.map(async (bp) => {
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          viewport: {
            width: bp.width,
            height: bp.height,
            deviceScaleFactor: bp.dpr,
            isMobile: bp.width < 1024,
          },
          format: 'png',
        }),
      });

      return {
        breakpoint: bp.name,
        width: bp.width,
        image: await response.arrayBuffer(),
      };
    })
  );

  return screenshots;
}
```

### Visual Regression for Responsive

Integrate with visual testing workflows for [automated testing](/use-cases/automated-testing):

```javascript
// responsive-visual-test.js
const { captureResponsiveBreakpoints } = require('./screenshot-utils');

describe('Responsive Design Tests', () => {
  const pages = [
    { name: 'homepage', url: 'https://mysite.com/' },
    { name: 'pricing', url: 'https://mysite.com/pricing' },
    { name: 'blog', url: 'https://mysite.com/blog' },
  ];

  pages.forEach((page) => {
    it(`${page.name} should match responsive baselines`, async () => {
      const screenshots = await captureResponsiveBreakpoints(page.url);

      screenshots.forEach((screenshot) => {
        expect(screenshot.image).toMatchImageSnapshot({
          customSnapshotIdentifier: `${page.name}-${screenshot.breakpoint}`,
        });
      });
    });
  });
});
```

## Handling Mobile-Specific Challenges

### Mobile Navigation States

Mobile sites often have hidden menus. Capture both states:

```javascript
async function captureMobileNavigation(url) {
  // Closed menu state
  const closedNav = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'mobile',
      format: 'png',
    }),
  });

  // Open menu state
  const openNav = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'mobile',
      format: 'png',
      beforeCapture: {
        click: '.hamburger-menu', // Click to open menu
      },
      delay: 500, // Wait for animation
    }),
  });

  return { closedNav, openNav };
}
```

### Handling Mobile Popups

Mobile-specific popups require AI removal:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'mobile',
    format: 'png',
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'app-install', 'newsletter'],
    },
  }),
});
```

The `app-install` type specifically targets mobile-only app download banners that appear at the top or bottom of mobile sites.

### Scroll Position and Fold Content

Capture content below the fold:

```javascript
// Capture specific scroll positions
async function captureScrollSequence(url) {
  const positions = [0, 500, 1000, 1500, 2000];

  const captures = await Promise.all(
    positions.map(async (scrollY) => {
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: 'mobile',
          format: 'png',
          scrollTo: scrollY,
          delay: 300, // Allow lazy-loaded content
        }),
      });

      return {
        position: scrollY,
        image: await response.arrayBuffer(),
      };
    })
  );

  return captures;
}
```

### Full-Page Mobile Capture

For complete page documentation:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'mobile',
    fullPage: true,
    format: 'png',
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'chat-widget', 'app-install'],
    },
  }),
});
```

## Portrait vs Landscape

### Orientation Capture

```javascript
// Portrait capture
const portrait = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: {
      width: 375,
      height: 812,
      isLandscape: false,
    },
    format: 'png',
  }),
});

// Landscape capture (swap width/height)
const landscape = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: {
      width: 812,
      height: 375,
      isLandscape: true,
    },
    format: 'png',
  }),
});
```

### When to Use Landscape

- Video player pages
- Data-heavy dashboards
- Image galleries
- Games and interactive content
- Comparison tables

## Device Mockups for Mobile

Combine mobile captures with [device mockups](/blog/device-mockups-for-marketing):

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
    mockupOptions: {
      color: 'natural-titanium',
      shadow: true,
      background: 'transparent',
    },
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'chat-widget'],
    },
  }),
});
```

## Documentation Workflow

### Creating Mobile Documentation

For [documentation screenshots](/use-cases/documentation-screenshots) of mobile features:

```javascript
async function documentMobileFeature(feature) {
  const steps = [
    { url: feature.enterUrl, name: 'entry' },
    { url: feature.actionUrl, name: 'action' },
    { url: feature.resultUrl, name: 'result' },
  ];

  const docs = await Promise.all(
    steps.map(async (step) => {
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: step.url,
          device: 'iphone-15',
          format: 'png',
          mockup: 'iphone-15',
          aiRemoval: {
            enabled: true,
            types: ['cookie-banner', 'chat-widget'],
          },
        }),
      });

      return {
        step: step.name,
        image: await response.arrayBuffer(),
      };
    })
  );

  return docs;
}
```

## Performance Considerations

### Optimizing Mobile Captures

Mobile captures can be faster due to smaller viewports:

```javascript
// Optimized mobile capture configuration
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 1, // Lower DPR for speed
    },
    format: 'jpeg',
    quality: 80, // Good balance
    blockResources: ['font'], // Optional: skip web fonts
    timeout: 15000,
  }),
});
```

For more optimization techniques, see our [performance guide](/blog/optimize-screenshot-performance).

### Batch Mobile Testing

Efficiently test multiple devices:

```javascript
async function batchMobileTest(url) {
  const devices = [
    { name: 'iphone-se', preset: 'iphone-se' },
    { name: 'iphone-15', preset: 'iphone-15' },
    { name: 'iphone-15-pro-max', preset: 'iphone-15-pro-max' },
    { name: 'pixel-8', preset: 'pixel-8' },
    { name: 'samsung-s24', preset: 'samsung-s24' },
  ];

  // Parallel capture with rate limiting
  const batchSize = 3;
  const results = [];

  for (let i = 0; i < devices.length; i += batchSize) {
    const batch = devices.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((device) =>
        captureDevice(url, device.preset).then((r) => ({
          device: device.name,
          image: r,
        }))
      )
    );
    results.push(...batchResults);
  }

  return results;
}
```

## Best Practices Summary

1. **Match real device specs** - Use accurate viewport and DPR values
2. **Test all breakpoints** - Don't assume mobile means one size
3. **Handle mobile-specific popups** - Use `app-install` AI removal
4. **Consider orientation** - Some content requires landscape
5. **Use device mockups** - For professional marketing materials
6. **Optimize for speed** - Mobile viewports render faster

## Next Steps

- **[AI Element Removal](/blog/ai-element-removal-guide)**: Clean up mobile popups automatically
- **[Device Mockups](/blog/device-mockups-for-marketing)**: Frame your mobile screenshots beautifully
- **[Performance Optimization](/blog/optimize-screenshot-performance)**: Faster captures at scale
- **[Visual Testing](/use-cases/automated-testing)**: Automated responsive testing

Explore our [JavaScript](/integrations/javascript) or [Python](/integrations/python) integration guides for language-specific implementations.

Ready to perfect your mobile screenshots? Try configurations in our [playground](/playground) or [get started free](/sign-up).
