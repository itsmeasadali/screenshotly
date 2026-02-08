---
title: "Viewport Sizes for Screenshots: Complete Reference Guide"
description: "The definitive guide to viewport dimensions for website screenshots. Covers desktop, tablet, mobile, and custom sizes for every use case."
excerpt: "Choose the right viewport size for your screenshots. Covers standard devices, responsive breakpoints, and when to use each."
author: "asad-ali"
publishedAt: "2025-12-05"
category: "reference"
tags: ["viewport", "responsive", "devices", "technical"]
keywords: ["screenshot viewport size", "responsive screenshot", "device viewport", "screen resolution", "screenshot dimensions"]
featured: false
readingTime: 5
---

Choosing the right viewport size determines how your screenshot looks and whether it captures the content correctly. This guide covers standard dimensions and when to use each.

## Quick Reference

### Desktop Viewports

| Name | Width × Height | Use Case |
|------|----------------|----------|
| HD (720p) | 1280 × 720 | Compact displays |
| Standard | 1366 × 768 | Most common laptop |
| Full HD | 1920 × 1080 | Standard desktop |
| QHD | 2560 × 1440 | High-res displays |
| 4K | 3840 × 2160 | Maximum detail |

### Tablet Viewports

| Device | Width × Height | Orientation |
|--------|----------------|-------------|
| iPad Mini | 768 × 1024 | Portrait |
| iPad Mini | 1024 × 768 | Landscape |
| iPad Air/Pro 11" | 820 × 1180 | Portrait |
| iPad Pro 12.9" | 1024 × 1366 | Portrait |
| Android Tablet | 800 × 1280 | Portrait |

### Mobile Viewports

| Device | Width × Height | Notes |
|--------|----------------|-------|
| iPhone SE | 375 × 667 | Smaller iOS |
| iPhone 12/13/14 | 390 × 844 | Standard iOS |
| iPhone 14/15 Pro Max | 430 × 932 | Large iOS |
| Pixel 7 | 412 × 915 | Standard Android |
| Samsung Galaxy S23 | 360 × 780 | Popular Android |

## Choosing the Right Size

### By Purpose

| Purpose | Recommended | Why |
|---------|-------------|-----|
| Documentation | 1280 × 800 | Fits most screens |
| Marketing | 1920 × 1080 | High quality |
| Social media | 1200 × 630 | OG image standard |
| Mobile screenshots | 375 × 667 | Common mobile size |
| Responsive testing | Multiple | Cover breakpoints |

### By Responsive Breakpoint

Common CSS breakpoints:

```javascript
const breakpoints = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1024, height: 768 },
  desktop: { width: 1280, height: 800 },
  largeDesktop: { width: 1920, height: 1080 },
};
```

## Implementation

### Basic Usage

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: {
      width: 1920,
      height: 1080,
    },
  }),
});
```

### Device Presets

Use device presets for convenience:

```javascript
{
  url: 'https://example.com',
  device: 'desktop',  // Uses standard desktop viewport
}

{
  url: 'https://example.com',
  device: 'mobile',  // Uses iPhone 12 viewport
}

{
  url: 'https://example.com',
  device: 'tablet',  // Uses iPad viewport
}
```

### Custom Devices

Define specific device characteristics:

```javascript
{
  url: 'https://example.com',
  viewport: {
    width: 390,
    height: 844,
  },
  deviceScaleFactor: 3,  // Retina display
  isMobile: true,
  hasTouch: true,
}
```

## Aspect Ratios

### Common Ratios

| Ratio | Description | Example Sizes |
|-------|-------------|---------------|
| 16:9 | Widescreen | 1920×1080, 1280×720 |
| 16:10 | MacBook | 1440×900, 1280×800 |
| 4:3 | Traditional | 1024×768, 800×600 |
| 1.91:1 | OG Image | 1200×630 |
| 1:1 | Square | 1080×1080 |
| 9:16 | Portrait video | 1080×1920 |

### Maintaining Aspect Ratio

When resizing, maintain ratio:

```javascript
function calculateHeight(width, aspectRatio) {
  const [w, h] = aspectRatio.split(':').map(Number);
  return Math.round(width * (h / w));
}

// 16:9 at 1280 width
const height = calculateHeight(1280, '16:9'); // 720
```

## Device Scale Factor

Device scale factor (DPR) affects image quality:

| DPR | Device Type | Effective Resolution |
|-----|-------------|---------------------|
| 1x | Standard displays | 1:1 pixel ratio |
| 2x | Retina, most phones | 2× pixel density |
| 3x | iPhone Plus/Max | 3× pixel density |

### High-DPI Screenshots

```javascript
{
  viewport: {
    width: 375,
    height: 667,
  },
  deviceScaleFactor: 2,  // 750×1334 actual pixels
}
```

**Result**: 375×667 CSS pixels, but 750×1334 actual image pixels.

## Full Page Captures

For full-page screenshots, height becomes less relevant:

```javascript
{
  url: 'https://example.com',
  viewport: { width: 1280 },  // Only width matters
  fullPage: true,  // Height auto-determined by content
}
```

### Maximum Height

Some pages are very long. Set a cap:

```javascript
{
  url: 'https://example.com',
  fullPage: true,
  maxHeight: 10000,  // Cap at 10,000 pixels
}
```

## Responsive Testing

Capture at multiple viewports:

```javascript
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'large', width: 1920, height: 1080 },
];

async function captureResponsive(url) {
  const results = {};
  
  for (const vp of viewports) {
    results[vp.name] = await captureScreenshot(url, {
      viewport: { width: vp.width, height: vp.height },
    });
  }
  
  return results;
}
```

## Common Mistakes

### 1. Using Arbitrary Heights

Heights too short cut off content. Too tall wastes resources.

**Fix**: Use standard aspect ratios or `fullPage: true`

### 2. Ignoring Responsive Design

Desktop-only screenshots miss mobile issues.

**Fix**: Capture at multiple breakpoints

### 3. Wrong DPR for Platform

Low DPR looks blurry on retina devices.

**Fix**: Use `deviceScaleFactor: 2` for marketing images

### 4. Landscape vs Portrait

Mobile sites may look different in each.

**Fix**: Consider both orientations:

```javascript
// Portrait
{ width: 375, height: 667 }

// Landscape  
{ width: 667, height: 375 }
```

## Best Practices

### 1. Match Your Audience

Check analytics for actual visitor devices:

- Google Analytics → Audience → Technology → Browser & OS
- Hotjar → Device type breakdown

### 2. Use Standard Sizes

Stick to common breakpoints:
- 375px (mobile)
- 768px (tablet)
- 1280px (laptop)
- 1920px (desktop)

### 3. Document Your Standards

Create a config for consistency:

```javascript
// screenshot-config.js
export const viewportStandards = {
  documentation: { width: 1280, height: 800 },
  marketing: { width: 1920, height: 1080, deviceScaleFactor: 2 },
  social: { width: 1200, height: 630 },
  mobile: { width: 375, height: 667, isMobile: true },
};
```

### 4. Test Before Production

New viewports may reveal unexpected layouts. Always review screenshots before publishing.

## Conclusion

Viewport selection directly impacts screenshot quality and usefulness:

- **Desktop**: 1280×800 for docs, 1920×1080 for marketing
- **Mobile**: 375×667 to 430×932 range
- **Tablet**: 768×1024 portrait standard
- **Full page**: Width matters, height auto-calculated

Use device presets for convenience, custom viewports for precision.

---

**Ready to capture at any viewport?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Try different viewports in our [API Playground →](/playground)
