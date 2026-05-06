---
title: "Device Mockup API Reference: Parameters & CI/CD"
description: "Complete API reference for device mockups. Parameters for every mockup type, batch generation, CI/CD pipelines, and automated app store screenshot workflows."
excerpt: "Technical reference for the Screenshotly device mockup API. Parameter documentation, batch automation, GitHub Actions integration, and programmatic mockup selection."
author: "asad-ali"
publishedAt: "2025-12-12"
category: "reference"
tags: ["mockups", "api", "automation", "ci-cd", "reference"]
keywords: ["device mockup API", "screenshot mockup parameters", "automate device mockups", "CI/CD screenshot mockups", "mockup API reference"]
featured: false
readingTime: 13
faqs:
  - question: "Which mockup frame should I use for app store screenshots?"
    answer: "Match the target: iPhone 15 Pro frame for iOS App Store listings, Pixel 8 for Play Store, MacBook for desktop web apps. App stores require exact pixel dimensions per device — wrap captures at the correct viewport before frame composition rather than scaling after."
  - question: "Can I batch-generate all app store assets in a single pipeline run?"
    answer: "Yes. Loop over (device × locale × screen) tuples, call the API with the correct viewport and mockup parameter per tuple, write to a structured output directory. A 5-device × 3-locale × 10-screen matrix (150 assets) completes in under 2 minutes at concurrency=10."
  - question: "Should I use device mockups on every screenshot?"
    answer: "No — reserve them for hero images and marketing. Plain crops work better for inline documentation screenshots, internal reports, and support articles. Device frames add visual weight that competes with UI detail at small sizes."
---

Developers who need to generate device mockups at scale—app store screenshots, documentation assets, or visual regression suites—often struggle to find a consolidated API reference. This guide covers the Screenshotly device mockup API from a technical perspective: every parameter, automation patterns, and CI/CD integration.

If you want to automate mockup generation in pipelines, batch thousands of captures, or programmatically select mockup frames, this is the reference.

## API Overview

The Screenshotly screenshot endpoint accepts a `mockup` parameter (device frame identifier) and optional `mockupOptions` for styling. Mockups are applied as post-processing overlays; the underlying screenshot resolution is preserved.

**Base request structure:**

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.SCREENSHOTLY_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    mockup: 'browser-light',      // Frame identifier
    mockupOptions: {               // Optional styling
      shadow: true,
      background: 'white',
    },
    format: 'png',
  }),
});
```

## Complete Parameter Reference

### `mockup` (required for mockup output)

The frame identifier. Case-sensitive. Valid values by category:

| Category | Identifiers |
|----------|-------------|
| **Browsers** | `browser-light`, `browser-dark`, `browser-minimal`, `safari-light`, `safari-dark`, `chrome-light`, `chrome-dark` |
| **Phones** | `iphone-15-pro`, `iphone-15-pro-max`, `iphone-15`, `iphone-14-pro`, `iphone-14`, `iphone-13`, `android-generic` |
| **Tablets** | `ipad-pro-12.9`, `ipad-pro-11`, `ipad-air`, `ipad-mini` |
| **Laptops** | `macbook-pro`, `macbook-air`, `laptop-generic` |
| **Other** | `desktop-monitor`, `minimal-frame-light`, `minimal-frame-dark` |

### `mockupOptions` (optional object)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | device default | Device color variant. Apple: `space-black`, `natural-titanium`, `blue`, `white`, `silver`, `space-gray`, `starlight`, `midnight`, `gold`. Laptops: `space-gray`, `silver`, `gold`. |
| `orientation` | string | `portrait` | `portrait` or `landscape`. Applies to phones and tablets. |
| `shadow` | boolean | `true` | Enable drop shadow under the device/frame. |
| `background` | string | `transparent` | Background behind mockup: `transparent`, `white`, `black`, or hex (e.g. `#f5f5f5`). PNG required for transparency. |
| `showUrl` | boolean | `true` | For browser frames: show URL in the address bar. |
| `showControls` | boolean | `true` | For browser frames: show traffic-light / minimize/maximize buttons. |
| `padding` | object | auto | `{ top, bottom, left, right }` in pixels. Controls spacing around the mockup. |

### Device ↔ Viewport Mapping

| Device Type | Recommended `device` | Typical Viewport |
|-------------|---------------------|------------------|
| Phone mockup | `mobile` or `iphone-14-pro` | 390×844 or 430×932 |
| Tablet mockup | `tablet` or `ipad-pro-12.9` | 1024×1366 (portrait) or 1366×1024 (landscape) |
| Laptop/Browser | `desktop` | 1440×900, 1920×1080, or custom |

Use `viewport: { width, height }` for pixel-perfect control when the default device presets don't match your target frame.

## Batch Mockup Generation

Generate multiple mockups in parallel with controlled concurrency to avoid rate limits.

```javascript
async function batchMockups(urls, baseOptions = {}) {
  const BATCH_SIZE = 5;  // Concurrent requests
  const results = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(url => captureWithMockup(url, baseOptions))
    );
    results.push(...batchResults);
  }

  return results;
}

async function captureWithMockup(url, options) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.SCREENSHOTLY_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: options.device || 'desktop',
      format: 'png',
      mockup: options.mockup || 'browser-light',
      mockupOptions: options.mockupOptions || { shadow: true },
      ...options,
    }),
  });

  if (!response.ok) throw new Error(`Failed: ${url} (${response.status})`);
  return { url, buffer: await response.arrayBuffer() };
}

// Example: 10 URLs, MacBook mockup
const urls = ['https://app.com/page1', 'https://app.com/page2', /* ... */];
const images = await batchMockups(urls, {
  mockup: 'macbook-pro',
  mockupOptions: { color: 'space-gray', shadow: true },
});
```

### Batch with Multiple Mockup Variants

Capture the same URL with different mockup frames for A/B testing or asset variants:

```javascript
async function generateMockupVariants(url, mockupIds) {
  return Promise.all(
    mockupIds.map(async (mockupId) => {
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.SCREENSHOTLY_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: mockupId.startsWith('iphone') ? 'mobile' : 'desktop',
          format: 'png',
          mockup: mockupId,
          mockupOptions: { shadow: true, background: 'transparent' },
        }),
      });
      return { mockupId, buffer: await response.arrayBuffer() };
    })
  );
}

// Output: browser-light, browser-dark, iphone-15-pro, macbook-pro
const variants = await generateMockupVariants('https://app.com', [
  'browser-light',
  'browser-dark',
  'iphone-15-pro',
  'macbook-pro',
]);
```

## CI/CD Integration: GitHub Actions

Automate mockup generation on every deploy or release. Example: generate app store screenshots when the app’s marketing pages change.

```yaml
# .github/workflows/screenshots.yml
name: Generate Screenshots

on:
  push:
    paths:
      - 'app/marketing/**'
      - 'landing/**'
  workflow_dispatch:

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate mockup screenshots
        env:
          SCREENSHOTLY_API_KEY: ${{ secrets.SCREENSHOTLY_API_KEY }}
        run: |
          npm run generate:screenshots

      - name: Upload screenshots artifact
        uses: actions/upload-artifact@v4
        with:
          name: mockup-screenshots
          path: output/screenshots/
```

**`generate:screenshots` script** (Node.js):

```javascript
// scripts/generate-screenshots.js
const fs = require('fs');
const path = require('path');

const PAGES = [
  { url: 'https://staging.myapp.com/features', mockup: 'macbook-pro' },
  { url: 'https://staging.myapp.com/mobile', mockup: 'iphone-15-pro' },
  { url: 'https://staging.myapp.com/dashboard', mockup: 'browser-dark' },
];

async function main() {
  const outputDir = path.join(process.cwd(), 'output', 'screenshots');
  fs.mkdirSync(outputDir, { recursive: true });

  for (const { url, mockup } of PAGES) {
    const res = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.SCREENSHOTLY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        device: mockup.includes('iphone') ? 'mobile' : 'desktop',
        format: 'png',
        mockup,
        mockupOptions: { shadow: true, background: 'transparent' },
      }),
    });

    const slug = url.split('/').slice(-1)[0] || 'home';
    const filename = `${slug}-${mockup}.png`;
    fs.writeFileSync(
      path.join(outputDir, filename),
      Buffer.from(await res.arrayBuffer())
    );
    console.log(`Saved ${filename}`);
  }
}

main().catch(console.error);
```

Run with `node scripts/generate-screenshots.js`. Add `"generate:screenshots": "node scripts/generate-screenshots.js"` to `package.json` scripts.

## Automated App Store Screenshot Generation

App stores require specific resolutions per device. Map device slots to mockup + viewport, then batch-generate.

```javascript
const APP_STORE_SPECS = {
  'iphone-6.7': {
    mockup: 'iphone-15-pro-max',
    viewport: { width: 430, height: 932 },
  },
  'iphone-6.5': {
    mockup: 'iphone-14-pro-max',
    viewport: { width: 428, height: 926 },
  },
  'iphone-5.5': {
    mockup: 'iphone-14',
    viewport: { width: 414, height: 736 },
  },
  'ipad-12.9': {
    mockup: 'ipad-pro-12.9',
    viewport: { width: 1024, height: 1366 },
  },
};

async function generateAppStoreScreenshots(screenUrls, options = {}) {
  const results = {};

  for (const [deviceSlot, spec] of Object.entries(APP_STORE_SPECS)) {
    results[deviceSlot] = [];

    for (let i = 0; i < screenUrls.length; i++) {
      const url = screenUrls[i];
      const response = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.SCREENSHOTLY_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          viewport: spec.viewport,
          format: 'png',
          mockup: spec.mockup,
          mockupOptions: {
            shadow: false,
            background: 'transparent',
            ...options.mockupOptions,
          },
          ...options,
        }),
      });

      results[deviceSlot].push({
        index: i,
        buffer: await response.arrayBuffer(),
      });
    }
  }

  return results;
}

// Usage
const screens = [
  'https://app.com/screen1',
  'https://app.com/screen2',
  'https://app.com/screen3',
];
const assets = await generateAppStoreScreenshots(screens);
// assets['iphone-6.7'] = [buffer0, buffer1, buffer2], etc.
```

## Dynamic Mockup Selection

Choose mockup and options based on device detection, page type, or feature flags.

```javascript
function selectMockup(userAgent, pageType) {
  // Detect mobile from User-Agent
  const isMobile = /iPhone|Android|Mobile/i.test(userAgent || '');

  if (pageType === 'dashboard') {
    return { mockup: 'browser-dark', device: 'desktop' };
  }
  if (pageType === 'landing') {
    return isMobile
      ? { mockup: 'iphone-15-pro', device: 'mobile' }
      : { mockup: 'macbook-pro', device: 'desktop' };
  }

  return { mockup: 'browser-light', device: 'desktop' };
}

// In your OG image or screenshot route
export async function GET(request) {
  const url = new URL(request.url).searchParams.get('url');
  const pageType = request.headers.get('x-page-type') || 'general';
  const userAgent = request.headers.get('user-agent');

  const { mockup, device } = selectMockup(userAgent, pageType);

  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.SCREENSHOTLY_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device,
      mockup,
      viewport: { width: 1200, height: 630 },
      format: 'png',
      mockupOptions: { shadow: true, background: '#f8f9fa' },
    }),
  });

  return new Response(await response.arrayBuffer(), {
    headers: { 'Content-Type': 'image/png' },
  });
}
```

## Testing Mockup Frames Programmatically

Use a test suite to ensure each mockup type renders without errors and meets minimum size expectations.

```javascript
// test/mockup-frames.test.js
const MOCKUP_IDS = [
  'browser-light',
  'browser-dark',
  'iphone-15-pro',
  'macbook-pro',
  'ipad-pro-12.9',
];

describe('Mockup API', () => {
  for (const mockupId of MOCKUP_IDS) {
    it(`renders ${mockupId} without error`, async () => {
      const res = await fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.SCREENSHOTLY_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://example.com',
          device: mockupId.includes('iphone') ? 'mobile' : 'desktop',
          format: 'png',
          mockup: mockupId,
          mockupOptions: { shadow: false, background: 'white' },
        }),
      });

      expect(res.ok).toBe(true);
      const buffer = await res.arrayBuffer();
      expect(buffer.byteLength).toBeGreaterThan(10000);
      // Optionally validate PNG header
      expect(new Uint8Array(buffer)[0]).toBe(0x89);
      expect(new Uint8Array(buffer)[1]).toBe(0x50);
    });
  }
});
```

Run with Jest or similar. Add `SCREENSHOTLY_API_KEY` to your test environment.

## Rate Limits and Retries

For batch and CI workflows, implement retries with exponential backoff:

```javascript
async function captureWithRetry(params, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.SCREENSHOTLY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (res.ok) return res.arrayBuffer();
    if (res.status === 429) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(r => setTimeout(r, delay));
      continue;
    }

    throw new Error(`Screenshot failed: ${res.status}`);
  }

  throw new Error('Max retries exceeded');
}
```

## Summary: Parameter Quick Reference

| Parameter | Location | Purpose |
|-----------|----------|---------|
| `mockup` | top-level | Frame ID (`browser-light`, `iphone-15-pro`, etc.) |
| `mockupOptions.color` | object | Device color variant |
| `mockupOptions.orientation` | object | `portrait` / `landscape` |
| `mockupOptions.shadow` | object | Drop shadow on/off |
| `mockupOptions.background` | object | `transparent`, `white`, hex |
| `mockupOptions.showUrl` | object | Browser address bar |
| `mockupOptions.showControls` | object | Browser window controls |
| `viewport` | top-level | Screenshot dimensions before mockup |
| `device` | top-level | Preset viewport (desktop, mobile, tablet) |

Combine these with the batch and CI patterns above to automate mockup generation across your pipeline.

---

**Need mockups in your pipeline?**

[Get your API key →](/sign-up) — 100 free screenshots. Try parameters live in the [API Playground →](/playground) or see the [full API docs →](/help).
