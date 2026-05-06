---
title: "How to Choose the Right Screenshot Viewport Size"
description: "Stop guessing viewport sizes. This decision guide explains which viewport to use for documentation, marketing, social media, and responsive testing — with aspect ratio and DPR recommendations."
excerpt: "Not sure which viewport to use? This guide helps you pick the right size based on your screenshot's purpose — documentation, marketing, social media, or testing."
author: "asad-ali"
publishedAt: "2025-12-05"
category: "reference"
tags: ["viewport", "responsive", "devices", "technical"]
keywords: ["which viewport for screenshots", "screenshot size guide", "best viewport documentation", "screenshot aspect ratio", "DPR screenshot quality"]
featured: false
readingTime: 5
faqs:
  - question: "What's the default viewport for a new capture pipeline?"
    answer: "1440×900 at DPR 1 or 2 is the safest default for product marketing and documentation. It matches the most common desktop resolution, renders cleanly on retina displays, and produces images at the size most marketing tools expect without resizing."
  - question: "Should I capture at DPR 2 or DPR 3?"
    answer: "DPR 2 for web use (documentation, social previews, in-app). DPR 3 only for print or ultra-high-DPI marketing assets. DPR 3 doubles the byte size of every capture and is imperceptible on typical screens — wasted bandwidth unless your downstream consumer actually uses the extra density."
  - question: "Do I need separate captures for mobile, tablet, and desktop?"
    answer: "For responsive design testing, yes — at minimum 390 (mobile), 768 (tablet), 1440 (desktop). For documentation, pick one viewport per screen; mixing breaks visual consistency. For social previews, stick to 1200×630 regardless of viewport intent."
---

Every screenshot starts with a viewport choice. Pick the wrong size and your capture looks stretched, cropped, or blurry on the target device. This guide doesn't list every device dimension — for that, see our [2026 Device Viewport Reference](/blog/device-viewport-sizes-reference-2026). Instead, it helps you **decide which viewport to use** based on your screenshot's purpose.

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

## When to Capture Multiple Viewports

If your goal is responsive testing or cross-device QA, you need more than one viewport. The minimum set for most projects:

| Band | Recommended Width | Why |
|------|-------------------|-----|
| Small phone | 375px | iPhone SE baseline |
| Standard phone | 390–412px | Covers 80%+ of mobile traffic |
| Tablet | 768px | iPad portrait breakpoint |
| Desktop | 1920px | Full HD standard |

For a complete list of 50+ device dimensions with copy-paste code, see the [2026 Device Viewport Reference](/blog/device-viewport-sizes-reference-2026). For CI/CD integration and visual regression workflows, see [Mobile Screenshot Optimization](/blog/mobile-responsive-screenshots).

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

## Decision Cheat Sheet

| Your goal | Viewport | DPR | Format |
|-----------|----------|-----|--------|
| Docs / help center | 1280 × 800 | 1 | PNG |
| Marketing hero | 1920 × 1080 | 2 | PNG |
| Social / OG image | 1200 × 630 | 1 | JPEG 85% |
| Mobile app store | 430 × 932 | 3 | PNG |
| Full-page export | Width only + `fullPage: true` | 1 | PDF/PNG |

Use device presets for convenience, custom viewports for precision.

---

**Ready to capture at any viewport?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

- [2026 Device Viewport Reference →](/blog/device-viewport-sizes-reference-2026) — 50+ device dimensions
- [Mobile Screenshot Optimization →](/blog/mobile-responsive-screenshots) — CI/CD, visual regression, device emulation
- Try configurations in our [API Playground →](/playground)
