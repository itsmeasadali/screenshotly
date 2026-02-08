---
title: "Device Mockups for Screenshots: Browser Frames, Phone Mockups, and More"
description: "Learn how to add professional device mockups to your screenshots. Covers browser frames, MacBook mockups, iPhone mockups, and custom frames."
excerpt: "Transform plain screenshots into professional marketing assets with device mockups. Browser frames, laptops, phones, and more."
author: "asad-ali"
publishedAt: "2025-12-12"
category: "guide"
tags: ["mockups", "design", "marketing", "screenshots"]
keywords: ["screenshot mockup", "browser frame", "device mockup", "macbook mockup", "iphone mockup", "screenshot frame"]
featured: false
readingTime: 6
---

Plain screenshots work for documentation, but marketing and presentations demand more polish. Device mockups transform flat screenshots into professional visuals that showcase your product in context.

This guide covers how to add mockups to your screenshots, from simple browser frames to full device compositions.

## Why Use Device Mockups?

### Marketing Impact

| Presentation | Perceived Quality | Use Case |
|--------------|-------------------|----------|
| Raw screenshot | Basic/technical | Bug reports, docs |
| Browser frame | Professional | Blog posts, features |
| Device mockup | Premium | Landing pages, ads |
| Multi-device | Enterprise | Sales decks |

### When to Use Each

**Raw screenshots:**
- Documentation
- Support tickets
- Internal communication

**Browser frames:**
- Blog posts
- Feature announcements
- Social media

**Device mockups:**
- Landing pages
- App store listings
- Marketing campaigns

## Browser Frame Mockups

### API Implementation

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'desktop',
    format: 'png',
    mockup: {
      type: 'browser',
      theme: 'light',  // or 'dark'
      shadow: true,
      rounded: true,
    },
  }),
});
```

### Available Browser Styles

| Style | Description | Best For |
|-------|-------------|----------|
| `browser` | Standard browser chrome | General use |
| `browser-minimal` | Minimal URL bar only | Clean look |
| `browser-dark` | Dark theme browser | Dark mode apps |
| `safari` | macOS Safari style | Apple ecosystem |
| `chrome` | Chrome browser style | Familiar look |

### Browser Frame Examples

**Light browser with shadow:**
```javascript
mockup: {
  type: 'browser',
  theme: 'light',
  shadow: true,
  rounded: true,
}
```

**Minimal dark browser:**
```javascript
mockup: {
  type: 'browser-minimal',
  theme: 'dark',
  shadow: false,
}
```

## Laptop Mockups

### MacBook Style

```javascript
mockup: {
  type: 'macbook',
  color: 'silver',  // 'silver', 'space-gray', 'gold'
  shadow: true,
  perspective: 'front',  // 'front', 'angled'
}
```

### Windows Laptop

```javascript
mockup: {
  type: 'laptop',
  style: 'modern',
  shadow: true,
}
```

## Phone Mockups

### iPhone Mockups

```javascript
// First capture at mobile viewport
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'mobile',  // Sets appropriate viewport
    format: 'png',
    mockup: {
      type: 'iphone',
      model: '15-pro',  // '15', '15-pro', '14', '13'
      color: 'natural',  // 'natural', 'blue', 'white', 'black'
      shadow: true,
    },
  }),
});
```

### Android Mockups

```javascript
mockup: {
  type: 'android',
  model: 'pixel',  // 'pixel', 'samsung'
  shadow: true,
}
```

## Tablet Mockups

### iPad Mockups

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'tablet',
    format: 'png',
    mockup: {
      type: 'ipad',
      model: 'pro',  // 'pro', 'air', 'mini'
      orientation: 'landscape',  // 'portrait', 'landscape'
      shadow: true,
    },
  }),
});
```

## Customization Options

### Shadows

```javascript
mockup: {
  type: 'browser',
  shadow: true,
  shadowIntensity: 0.3,  // 0-1, default 0.2
  shadowBlur: 40,  // pixels
  shadowOffset: { x: 0, y: 10 },
}
```

### Backgrounds

```javascript
mockup: {
  type: 'macbook',
  background: {
    type: 'gradient',
    from: '#667eea',
    to: '#764ba2',
    angle: 135,
  },
}
```

Or solid color:
```javascript
mockup: {
  background: {
    type: 'solid',
    color: '#f5f5f5',
  },
}
```

Or transparent:
```javascript
mockup: {
  background: {
    type: 'transparent',
  },
}
format: 'png',  // PNG required for transparency
```

### Padding

```javascript
mockup: {
  type: 'browser',
  padding: {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  },
}
```

## Use Case Examples

### Blog Post Header

```javascript
// Capture for blog featured image
async function captureBlogImage(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      viewport: { width: 1200, height: 800 },
      format: 'png',
      mockup: {
        type: 'browser',
        theme: 'dark',
        shadow: true,
        rounded: true,
        background: {
          type: 'gradient',
          from: '#1a1a2e',
          to: '#16213e',
          angle: 135,
        },
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
      },
    }),
  });

  return response.arrayBuffer();
}
```

### Landing Page Hero

```javascript
// Premium MacBook mockup for hero section
async function captureHeroImage(url) {
  return await captureScreenshot(url, {
    device: 'desktop',
    viewport: { width: 1440, height: 900 },
    mockup: {
      type: 'macbook',
      color: 'space-gray',
      perspective: 'angled',
      shadow: true,
      shadowIntensity: 0.4,
      background: { type: 'transparent' },
    },
  });
}
```

### App Store Screenshots

```javascript
// iPhone mockup for App Store
async function captureAppStoreImage(url) {
  return await captureScreenshot(url, {
    device: 'mobile',
    viewport: { width: 390, height: 844 },  // iPhone 14 Pro
    mockup: {
      type: 'iphone',
      model: '15-pro',
      color: 'natural',
      shadow: false,  // App Store provides own context
      background: { type: 'transparent' },
    },
  });
}
```

### Social Media Preview

```javascript
// 1200x630 OG image with browser mockup
async function captureOGImage(url) {
  return await captureScreenshot(url, {
    device: 'desktop',
    viewport: { width: 1000, height: 600 },  // Smaller to fit in frame
    mockup: {
      type: 'browser-minimal',
      theme: 'dark',
      shadow: true,
      background: {
        type: 'gradient',
        from: '#667eea',
        to: '#764ba2',
      },
      padding: { top: 80, bottom: 80, left: 100, right: 100 },
    },
    outputSize: { width: 1200, height: 630 },  // Final OG dimensions
  });
}
```

### Multi-Device Composition

For landing pages showing multiple devices:

```javascript
async function captureMultiDevice(url) {
  // Capture each device separately
  const [desktop, tablet, mobile] = await Promise.all([
    captureScreenshot(url, {
      device: 'desktop',
      mockup: { type: 'macbook', background: { type: 'transparent' } },
    }),
    captureScreenshot(url, {
      device: 'tablet',
      mockup: { type: 'ipad', background: { type: 'transparent' } },
    }),
    captureScreenshot(url, {
      device: 'mobile',
      mockup: { type: 'iphone', background: { type: 'transparent' } },
    }),
  ]);
  
  // Compose using image processing library
  return await composeDevices([desktop, tablet, mobile]);
}
```

## Best Practices

### 1. Match Context

- **Dark apps** → Dark browser frames
- **Light apps** → Light or minimal frames
- **Apple ecosystem** → Safari/MacBook/iPhone
- **General audience** → Chrome/generic laptop

### 2. Consider Final Dimensions

Account for mockup frame sizes in final output:

| Mockup Type | Approximate Added Size |
|-------------|------------------------|
| Browser frame | +60px height |
| MacBook | +200px height, +100px width |
| iPhone | +80px height, +30px width |

### 3. Quality Settings

Use high resolution for marketing materials:

```javascript
viewport: { width: 1920, height: 1080 },
format: 'png',  // Lossless for mockups
```

### 4. Consistent Styling

Create presets for brand consistency:

```javascript
const mockupPresets = {
  blogPost: {
    type: 'browser',
    theme: 'dark',
    shadow: true,
    background: { type: 'gradient', from: '#1a1a2e', to: '#16213e' },
  },
  landingPage: {
    type: 'macbook',
    color: 'space-gray',
    shadow: true,
    background: { type: 'transparent' },
  },
  socialMedia: {
    type: 'browser-minimal',
    theme: 'light',
    shadow: true,
    padding: { top: 60, bottom: 60, left: 60, right: 60 },
  },
};
```

## Conclusion

Device mockups transform basic screenshots into professional marketing assets:

- **Browser frames** add polish with minimal effort
- **Laptop mockups** create premium visuals
- **Phone mockups** showcase mobile experiences
- **Custom backgrounds** reinforce brand identity

Automate mockup generation to maintain consistency across all your marketing materials.

---

**Ready to create professional mockups?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Explore mockup options in our [API Playground →](/playground)
