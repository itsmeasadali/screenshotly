---
title: "2026 Device Viewport Sizes Reference: Complete Screenshot Testing Matrix"
description: "The definitive reference for device viewport sizes in 2026. Includes dimensions for iPhone 16, Samsung Galaxy S25, iPad Pro, and 50+ devices with screenshot testing code."
excerpt: "Bookmark this: every device viewport dimension you need for screenshot testing in 2026, with ready-to-use code for automated cross-device captures."
author: "asad-ali"
publishedAt: "2025-09-28"
updatedAt: "2026-02-24"
category: "guide"
tags: ["mobile", "responsive", "viewport", "reference", "devices"]
keywords: ["device viewport sizes 2026", "iPhone viewport dimensions", "responsive breakpoints reference", "screenshot viewport sizes", "device screen resolution list", "cross-device testing matrix"]
featured: false
readingTime: 12
---

Stop googling viewport dimensions. This is the reference page you bookmark — the complete matrix of device viewport sizes for screenshot testing in 2026, with copy-paste code for batch captures across 50+ devices.

Whether you're validating responsive designs, generating device-specific marketing assets, or automating cross-device QA, you need accurate CSS pixel dimensions. The tables below cover flagship 2026 devices, current best-sellers, tablets, laptops, and desktop resolutions. Use the Quick Copy snippet to capture any URL across all common viewports in one call.

## iPhone Viewport Sizes (2026 & Current)

### 2026 iPhone Lineup

| Device | Width × Height | DPR | Notes |
|--------|----------------|-----|------|
| iPhone 16 | 390 × 844 | 3 | Standard model |
| iPhone 16 Plus | 430 × 932 | 3 | Large display |
| iPhone 16 Pro | 402 × 874 | 3 | Dynamic Island |
| iPhone 16 Pro Max | 430 × 932 | 3 | Largest iPhone |
| iPhone 16e | 375 × 667 | 2 | Budget / SE successor |

### Current Popular iPhones

| Device | Width × Height | DPR |
|--------|----------------|-----|
| iPhone 15 | 393 × 852 | 3 |
| iPhone 15 Plus | 430 × 932 | 3 |
| iPhone 15 Pro | 402 × 874 | 3 |
| iPhone 15 Pro Max | 430 × 932 | 3 |
| iPhone 14 / 13 | 390 × 844 | 3 |
| iPhone 14 Pro Max | 430 × 932 | 3 |
| iPhone SE (3rd gen) | 375 × 667 | 2 |
| iPhone 12 mini | 375 × 812 | 3 |

## Android Viewport Sizes (2026 & Current)

### 2026 Samsung Galaxy

| Device | Width × Height | DPR |
|--------|----------------|-----|
| Galaxy S25 | 360 × 800 | 3 |
| Galaxy S25+ | 384 × 854 | 3 |
| Galaxy S25 Ultra | 412 × 891 | 3.5 |
| Galaxy Z Fold 6 | 512 × 892 | 3 (inner) |
| Galaxy Z Flip 6 | 412 × 915 | 2.6 |

### 2026 Google Pixel

| Device | Width × Height | DPR |
|--------|----------------|-----|
| Pixel 9 | 412 × 915 | 2.6 |
| Pixel 9 Pro | 410 × 914 | 3.125 |
| Pixel 9 Pro XL | 430 × 932 | 3 |

### Current Popular Android

| Device | Width × Height | DPR |
|--------|----------------|-----|
| Galaxy S24 | 360 × 780 | 3 |
| Galaxy S24 Ultra | 412 × 915 | 3 |
| Galaxy S23 | 360 × 780 | 3 |
| Pixel 8 | 412 × 915 | 2.6 |
| Pixel 8 Pro | 430 × 932 | 3 |
| Pixel 7 | 412 × 915 | 2.6 |
| OnePlus 12 | 412 × 918 | 3 |
| Xiaomi 14 | 412 × 915 | 3 |

## Tablet Viewport Sizes

| Device | Portrait | Landscape | DPR |
|--------|----------|-----------|-----|
| iPad Pro 12.9" (M4) | 1024 × 1366 | 1366 × 1024 | 2 |
| iPad Pro 11" | 834 × 1194 | 1194 × 834 | 2 |
| iPad Air (M2) | 820 × 1180 | 1180 × 820 | 2 |
| iPad (10th gen) | 820 × 1180 | 1180 × 820 | 2 |
| iPad mini | 768 × 1024 | 1024 × 768 | 2 |
| Samsung Galaxy Tab S9 | 1024 × 1366 | 1366 × 1024 | 2 |
| Samsung Galaxy Tab S9+ | 1024 × 1366 | 1366 × 1024 | 2 |
| Google Pixel Tablet | 1280 × 800 | 800 × 1280 | 2 |
| Amazon Fire HD 10 | 800 × 1280 | 1280 × 800 | 1.5 |

## Laptop Viewport Sizes

| Device | Width × Height | Notes |
|--------|----------------|-------|
| MacBook Air 13" (M3) | 1440 × 900 | Default scaled |
| MacBook Air 13" (Retina) | 2560 × 1664 | Native |
| MacBook Air 15" | 2880 × 1864 | Retina |
| MacBook Pro 14" | 1512 × 982 | Default scaled |
| MacBook Pro 16" | 1728 × 1117 | Default scaled |
| Surface Laptop 5 | 1536 × 864 | 13.5" |
| Dell XPS 15 | 1920 × 1080 | Common config |
| HP Spectre | 1920 × 1080 | FHD |
| Chromebook (common) | 1366 × 768 | Budget |
| Chromebook (premium) | 1920 × 1080 | FHD |

## Desktop Viewport Sizes

| Name | Width × Height | Use Case |
|------|----------------|----------|
| HD (720p) | 1280 × 720 | Legacy / compact |
| Common laptop | 1366 × 768 | Most widespread |
| Full HD | 1920 × 1080 | Standard desktop |
| WXGA+ | 1440 × 900 | Mac default |
| QHD / 2K | 2560 × 1440 | High-res monitors |
| 4K UHD | 3840 × 2160 | Maximum detail |
| Ultrawide | 3440 × 1440 | 21:9 displays |
| 5K | 5120 × 2880 | Pro display |

## Complete Device Matrix (JavaScript)

Copy this object for use in your screenshot automation. All dimensions are CSS pixels; include `deviceScaleFactor` when you need retina-quality captures.

```javascript
const deviceViewports = {
  // 2026 iPhones
  'iPhone 16': { width: 390, height: 844, deviceScaleFactor: 3 },
  'iPhone 16 Plus': { width: 430, height: 932, deviceScaleFactor: 3 },
  'iPhone 16 Pro': { width: 402, height: 874, deviceScaleFactor: 3 },
  'iPhone 16 Pro Max': { width: 430, height: 932, deviceScaleFactor: 3 },
  'iPhone 16e': { width: 375, height: 667, deviceScaleFactor: 2 },
  
  // Current iPhones
  'iPhone 15': { width: 393, height: 852, deviceScaleFactor: 3 },
  'iPhone 15 Pro': { width: 402, height: 874, deviceScaleFactor: 3 },
  'iPhone 15 Pro Max': { width: 430, height: 932, deviceScaleFactor: 3 },
  'iPhone 14': { width: 390, height: 844, deviceScaleFactor: 3 },
  'iPhone SE': { width: 375, height: 667, deviceScaleFactor: 2 },
  
  // 2026 Samsung
  'Galaxy S25': { width: 360, height: 800, deviceScaleFactor: 3 },
  'Galaxy S25 Ultra': { width: 412, height: 891, deviceScaleFactor: 3.5 },
  
  // Current Android
  'Galaxy S24': { width: 360, height: 780, deviceScaleFactor: 3 },
  'Galaxy S24 Ultra': { width: 412, height: 915, deviceScaleFactor: 3 },
  'Pixel 9': { width: 412, height: 915, deviceScaleFactor: 2.6 },
  'Pixel 9 Pro': { width: 410, height: 914, deviceScaleFactor: 3.125 },
  'Pixel 8': { width: 412, height: 915, deviceScaleFactor: 2.6 },
  
  // Tablets
  'iPad Pro 12.9"': { width: 1024, height: 1366, deviceScaleFactor: 2 },
  'iPad Pro 11"': { width: 834, height: 1194, deviceScaleFactor: 2 },
  'iPad Air': { width: 820, height: 1180, deviceScaleFactor: 2 },
  'iPad mini': { width: 768, height: 1024, deviceScaleFactor: 2 },
  'Galaxy Tab S9': { width: 1024, height: 1366, deviceScaleFactor: 2 },
  
  // Laptops
  'MacBook Air 13"': { width: 1440, height: 900, deviceScaleFactor: 1 },
  'MacBook Pro 14"': { width: 1512, height: 982, deviceScaleFactor: 1 },
  'MacBook Pro 16"': { width: 1728, height: 1117, deviceScaleFactor: 1 },
  'Laptop (1366)': { width: 1366, height: 768, deviceScaleFactor: 1 },
  
  // Desktop
  'Full HD': { width: 1920, height: 1080, deviceScaleFactor: 1 },
  'QHD': { width: 2560, height: 1440, deviceScaleFactor: 1 },
  '4K': { width: 3840, height: 2160, deviceScaleFactor: 1 },
};
```

## Common Responsive Breakpoints

When testing CSS breakpoints rather than device simulations, use these standard widths. They align with popular frameworks.

### Tailwind CSS Defaults

| Breakpoint | Width | Use |
|------------|-------|-----|
| Default | &lt; 640px | Mobile-first base |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Bootstrap 5 Defaults

| Breakpoint | Min Width | Class infix |
|------------|-----------|-------------|
| xs | &lt; 576px | (none) |
| sm | 576px | `sm` |
| md | 768px | `md` |
| lg | 992px | `lg` |
| xl | 1200px | `xl` |
| xxl | 1400px | `xxl` |

### Common Custom Breakpoints

```javascript
const customBreakpoints = [
  { name: 'mobile-s', width: 320 },   // Smallest phones
  { name: 'mobile-m', width: 375 },   // iPhone SE / small
  { name: 'mobile-l', width: 425 },   // Large phones
  { name: 'tablet', width: 768 },      // iPad portrait
  { name: 'tablet-l', width: 1024 },  // iPad landscape
  { name: 'laptop', width: 1280 },     // Small desktop
  { name: 'desktop', width: 1440 },   // Standard desktop
  { name: 'wide', width: 1920 },      // Full HD
];
```

## Quick Copy: Batch Capture All Viewports

Use this snippet to capture a URL across every common viewport size. Replace `YOUR_API_KEY` with your key. The API returns image data directly; this stores each as a buffer keyed by viewport name.

```javascript
async function captureAllViewports(url) {
  const apiKey = 'YOUR_API_KEY';
  const baseUrl = 'https://api.screenshotly.app/screenshot';
  
  const viewports = [
    ...Object.entries(deviceViewports),
    ...customBreakpoints.map(bp => [bp.name, { width: bp.width, height: 800 }]),
  ];
  
  const results = await Promise.all(
    viewports.map(async ([name, viewport]) => {
      const vp = typeof viewport.height === 'number' 
        ? viewport 
        : { ...viewport, height: Math.round(viewport.width * (9/16)) };
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, viewport: vp, format: 'png' }),
      });
      const buffer = await res.arrayBuffer();
      return [name, buffer];
    })
  );
  
  return Object.fromEntries(results);
}

// Usage: returns { 'iPhone 16': ArrayBuffer, 'Galaxy S25': ArrayBuffer, ... }
const screenshots = await captureAllViewports('https://yoursite.com');
```

## Cross-Browser Testing Matrix

Different browsers can render the same viewport slightly differently. For pixel-perfect validation, capture critical viewports across browsers:

| Viewport | Chrome | Firefox | Safari | Edge |
|----------|--------|---------|--------|------|
| 375×667 | ✓ | ✓ | ✓ | ✓ |
| 390×844 | ✓ | ✓ | ✓ | ✓ |
| 412×915 | ✓ | ✓ | — | ✓ |
| 768×1024 | ✓ | ✓ | ✓ | ✓ |
| 1920×1080 | ✓ | ✓ | ✓ | ✓ |

Safari is most important for iOS viewports; Chrome/Firefox/Edge cover Android and desktop. When using Screenshotly, specify `browser: 'chrome' | 'firefox' | 'safari' | 'edge'` to match your target.

## Orientation Testing

Mobile layouts often differ between portrait and landscape. Swap width and height for orientation variants:

```javascript
const portrait = { width: 390, height: 844 };
const landscape = { width: 844, height: 390 };

// Capture both
const [portraitShot, landscapeShot] = await Promise.all([
  capture(url, { viewport: portrait }),
  capture(url, { viewport: landscape }),
]);
```

## Best Practices for Viewport Reference Testing

### Test Your Actual CSS Breakpoints

Don't test arbitrary viewport widths. Look at your CSS media queries and test the exact widths where layout changes occur. Use the Tailwind or Bootstrap tables above to align with framework defaults, or the custom breakpoints for project-specific widths.

### Cover Small, Standard, and Large

For thorough validation, include at least one viewport from each size band: small phone (375px), standard phone (390–412px), large phone (430px), tablet (768–1024px), and desktop (1920px). The device matrix above gives you 50+ options — pick the subset that matches your users.

### Use DPR for Retina Output

When generating marketing assets or high-fidelity exports, set `deviceScaleFactor: 2` or `3` to match device DPR. For layout QA, `deviceScaleFactor: 1` is faster and sufficient since layout is identical.

## FAQ

**Why CSS pixels, not physical resolution?**  
Browsers use CSS pixels for layout. A 390×844 viewport renders the same logical layout on an iPhone 15 and iPhone 16 — physical pixels differ, but your responsive design targets CSS dimensions.

**How many devices should I test?**  
For most projects: one small phone (375px), one standard phone (390–412px), one large phone (430px), one tablet (768–1024px), and one desktop (1920px). Add more for comprehensive QA.

**Do I need deviceScaleFactor for screenshots?**  
Use DPR 2–3 when you need retina-quality images for marketing or high-DPI displays. For layout testing, DPR 1 is faster and sufficient.

**Where's CI/CD and visual regression content?**  
For CI/CD integration, visual regression workflows, and batch testing pipelines, see [Mobile Screenshot Optimization: Capturing Responsive Designs Perfectly](/blog/mobile-responsive-screenshots).

**What about dark mode?**  
If your site supports dark mode, test both light and dark variants. Use the `colorScheme` parameter to capture both modes without manually toggling.

---

**Ready to capture across all viewports?**

[Get your free API key →](/sign-up) — 100 free screenshots to get started.

See also:
- [Mobile Screenshot Optimization: CI/CD & Visual Regression →](/blog/mobile-responsive-screenshots)
- [Viewport Sizes Reference Guide →](/blog/viewport-sizes-reference-guide)
