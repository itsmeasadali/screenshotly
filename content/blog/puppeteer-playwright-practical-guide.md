---
title: "Migrating from Puppeteer to a Screenshot API"
description: "Switch from Puppeteer or Playwright to a screenshot API. Code conversion, gradual migration, and the gotchas that trip up teams mid-transition."
excerpt: "A practical guide for developers migrating from Puppeteer or Playwright to a screenshot API. Includes side-by-side code conversion, parallel deployment strategy, and edge case handling."
author: "asad-ali"
publishedAt: "2025-10-15"
updatedAt: "2026-02-08"
category: "guide"
tags: ["puppeteer", "playwright", "migration", "api", "screenshots"]
keywords: ["migrate from puppeteer", "puppeteer to API migration", "replace puppeteer with API", "puppeteer migration guide", "switch from playwright to API"]
featured: false
readingTime: 12
faqs:
  - question: "Can I run Puppeteer and a managed API side-by-side during migration?"
    answer: "Yes, and you should. Route pure-capture jobs (thumbnails, OG images, docs) to the managed API first. Keep Puppeteer in place for browser-automation workflows (form filling, OAuth, CAPTCHA flows). The two can coexist indefinitely — split by workload, not by timeline."
  - question: "What's the most common migration gotcha?"
    answer: "Wait conditions. Puppeteer's page.waitForSelector and page.waitForFunction have rich semantics that don't always map 1:1 to API wait parameters. Test the 10–20 highest-traffic captures specifically for rendering correctness before switching the whole pipeline."
  - question: "How long does a typical Puppeteer-to-API migration take?"
    answer: "Two to four hours for the capture refactor itself, plus one to two days decommissioning the Chrome container infrastructure (Dockerfile, ECS service, queue layer, monitoring, retry logic). The decommission is usually the bigger win — each of those components was engineering debt you no longer maintain."
---

You've been capturing screenshots with Puppeteer or Playwright for months or years. It works—but you're tired of managing Chrome instances, debugging memory leaks, and scaling infrastructure. A screenshot API promises to offload that burden, but how do you actually switch? Rewriting everything from scratch isn't appealing.

This guide walks through migrating from Puppeteer or Playwright to a screenshot API: code conversion patterns, a gradual migration strategy, and the gotchas that trip up developers mid-switch.

## Before You Start: What Changes, What Stays the Same

### What Stays the Same

- **Your application logic** — URL handling, queuing, storage, and delivery remain unchanged
- **Input/output flow** — You still pass URLs and options, you still receive image buffers
- **Most use cases** — Basic screenshots, viewport sizing, full-page capture, format selection all map directly
- **Your existing abstraction** — If you have a `captureScreenshot()` wrapper, you can swap the implementation

### What Changes

- **No browser process** — You're calling an HTTP API instead of launching Chrome
- **No local Chrome binary** — No `puppeteer-core` or Chromium in your deployment
- **Different option shape** — API parameters map to but differ from Puppeteer options
- **Async only** — No need for page lifecycle management; each request is independent
- **Additional features** — Ad blocking, device mockups, AI removal are built-in if you want them

## Step 1: Create an Abstraction Layer

Start with a thin abstraction that supports both backends. This lets you migrate incrementally and compare results.

```javascript
// screenshot-service.js
async function captureScreenshot(url, options = {}) {
  const useApi = process.env.SCREENSHOT_BACKEND === 'api';

  if (useApi) {
    return captureViaApi(url, options);
  }

  return captureViaPuppeteer(url, options);
}

async function captureViaPuppeteer(url, options) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: options.width || 1920,
      height: options.height || 1080,
      deviceScaleFactor: options.deviceScaleFactor || 1,
    });
    await page.goto(url, {
      waitUntil: options.waitUntil || 'networkidle0',
      timeout: options.timeout || 30000,
    });
    if (options.delay) await page.waitForTimeout(options.delay);
    return await page.screenshot({
      type: options.format || 'png',
      fullPage: options.fullPage || false,
    });
  } finally {
    await browser.close();
  }
}

async function captureViaApi(url, options) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.SCREENSHOTLY_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapOptionsToApi(url, options)),
  });

  if (!response.ok) throw new Error(`Screenshot failed: ${response.status}`);
  return response.arrayBuffer();
}

function mapOptionsToApi(url, options) {
  return {
    url,
    viewport: {
      width: options.width || 1920,
      height: options.height || 1080,
    },
    format: options.format || 'png',
    fullPage: options.fullPage || false,
    delay: options.delay ? Math.round(options.delay / 1000) : undefined,
    blockAds: true,
  };
}
```

Set `SCREENSHOT_BACKEND=api` when you're ready to switch.

## Step 2: Code Conversion Reference

Use this side-by-side mapping when converting existing Puppeteer scripts.

### Basic Screenshot

**Puppeteer:**

```javascript
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
await page.goto('https://example.com', { waitUntil: 'networkidle0' });
const buffer = await page.screenshot({ type: 'png' });
```

**API equivalent:**

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.SCREENSHOTLY_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    viewport: { width: 1280, height: 800 },
    format: 'png',
    device: 'desktop',
  }),
});
const buffer = await response.arrayBuffer();
```

### Full-Page Screenshot

**Puppeteer:**

```javascript
const buffer = await page.screenshot({ type: 'png', fullPage: true });
```

**API equivalent:**

```javascript
body: JSON.stringify({
  url: 'https://example.com',
  fullPage: true,
  format: 'png',
})
```

### Mobile Viewport Emulation

**Puppeteer:**

```javascript
await page.emulate(puppeteer.devices['iPhone 14 Pro']);
const buffer = await page.screenshot({ type: 'png' });
```

**API equivalent:**

```javascript
body: JSON.stringify({
  url: 'https://example.com',
  device: 'iphone-14-pro',  // or 'mobile' for generic
  format: 'png',
})
```

### Delayed Capture (Wait for Content)

**Puppeteer:**

```javascript
await page.goto(url);
await page.waitForTimeout(2000);  // 2 seconds
const buffer = await page.screenshot({ type: 'png' });
```

**API equivalent:**

```javascript
body: JSON.stringify({
  url: 'https://example.com',
  delay: 2,  // seconds, not milliseconds
  format: 'png',
})
```

### PDF Generation

**Puppeteer:**

```javascript
const pdfBuffer = await page.pdf({
  format: 'A4',
  printBackground: true,
});
```

**API equivalent:**

```javascript
// Use the PDF endpoint instead
const response = await fetch('https://api.screenshotly.app/pdf', {
  method: 'POST',
  headers: { 'x-api-key': process.env.SCREENSHOTLY_API_KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com',
    format: 'A4',
    printBackground: true,
  }),
});
```

### Element/Selector Screenshot

**Puppeteer:**

```javascript
const element = await page.$('.hero-section');
const buffer = await element.screenshot({ type: 'png' });
```

**API equivalent:**

```javascript
body: JSON.stringify({
  url: 'https://example.com',
  selector: '.hero-section',
  format: 'png',
})
```

If your Puppeteer code does heavy custom interaction before capturing (clicks, form fills, multi-step flows), those flows don't map directly to a single API call. For those, you have two paths: keep Puppeteer for that subset, or redesign the flow (e.g. pre-render to a URL the API can capture).

## Step 3: Gradual Migration Strategy

Run both backends in parallel and shift traffic gradually.

### Phase 1: Shadow Mode

Route 100% of traffic to Puppeteer, but also call the API and compare results without affecting users.

```javascript
async function captureScreenshot(url, options) {
  const puppeteerResult = await captureViaPuppeteer(url, options);

  // Shadow call: compare with API output
  if (process.env.SHADOW_API_ENABLED === 'true') {
    captureViaApi(url, options)
      .then(apiResult => compareOutputs(puppeteerResult, apiResult, url))
      .catch(err => logShadowError(url, err));
  }

  return puppeteerResult;
}
```

Use `compareOutputs` to diff dimensions, file sizes, or pixel similarity. Flag any large discrepancies before switching.

### Phase 2: Percentage Rollout

Route a fraction of traffic to the API using a consistent hash (e.g. by URL or user ID).

```javascript
async function captureScreenshot(url, options) {
  const useApi = hashToPercent(url) < parseFloat(process.env.API_TRAFFIC_PERCENT || '0');

  if (useApi) {
    return captureViaApi(url, options);
  }

  return captureViaPuppeteer(url, options);
}

function hashToPercent(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 100) / 100;
}
```

Start at 10% (`API_TRAFFIC_PERCENT=0.1`), monitor error rates and latency, then increase to 25%, 50%, and 100%.

### Phase 3: Feature Parity Check

Before fully decommissioning Puppeteer, verify every option you use has an API equivalent:

| Puppeteer / Playwright | API Parameter |
|------------------------|---------------|
| `page.setViewport()` | `viewport: { width, height }` |
| `page.waitForTimeout(ms)` | `delay` (seconds) |
| `fullPage: true` | `fullPage: true` |
| `page.emulate(device)` | `device: 'iphone-14-pro'` etc. |
| `page.pdf()` | PDF endpoint |
| `element.screenshot()` | `selector` |
| Custom headers | `headers` in request body |
| `page.setCookie()` | `cookies` in request body |
| Auth / basic auth | `authentication` |

If you rely on something not listed, check the API docs or keep that path on Puppeteer.

## Step 4: Handling Edge Cases During Migration

### Timeout Handling

Puppeteer uses milliseconds; many APIs use seconds. Double-check:

```javascript
// Puppeteer
timeout: 30000  // 30 seconds

// API
timeout: 30     // 30 seconds
```

### Cookie and Session Handling

**Puppeteer:** You set cookies on the page before navigation.

**API:** Pass cookies in the request:

```javascript
body: JSON.stringify({
  url: 'https://example.com/dashboard',
  cookies: [
    { name: 'session_id', value: 'abc123', domain: '.example.com' },
  ],
})
```

### Authentication

**Puppeteer:** You might log in via a form or set headers.

**API:** Use `authentication` for HTTP Basic or header-based auth:

```javascript
body: JSON.stringify({
  url: 'https://example.com/protected',
  authentication: {
    username: 'user',
    password: 'pass',
  },
  // or custom headers:
  headers: { 'Authorization': 'Bearer token123' },
})
```

### Blocking Ads and Trackers

In Puppeteer you'd install an ad-blocker extension or intercept requests. With an API, use built-in blocking:

```javascript
body: JSON.stringify({
  url: 'https://example.com',
  blockAds: true,
  blockTrackers: true,
})
```

## Step 5: Testing the Migration

1. **Unit tests**: Mock the API response and assert your mapping layer produces the correct request body.
2. **Integration tests**: Run a small set of known URLs through both backends and compare outputs (dimensions, format, approximate size).
3. **Regression tests**: Capture screenshots of critical pages before migration, then re-capture after and diff for visual regressions.
4. **Load tests**: Ensure your client handles rate limits, retries, and timeouts correctly under load.

## Common Gotchas

### 1. `waitUntil` Semantics

Puppeteer's `networkidle0` waits until there are no network connections for 500ms. APIs may use different strategies (e.g. `load` or `domcontentloaded` plus a fixed delay). If pages render differently, experiment with `delay` or `waitUntil`-equivalent options.

### 2. JavaScript-Heavy Pages

Pages that render entirely client-side can be tricky. Ensure the API waits long enough (increase `delay`) or uses a wait condition that fits your app (e.g. waiting for a selector).

### 3. Localhost and Internal URLs

APIs run in the cloud and cannot reach `localhost` or private IPs. Keep Puppeteer for internal tools or staging URLs behind a VPN; use the API only for public URLs.

### 4. Binary Response Handling

Puppeteer returns a `Buffer`; `fetch` returns an `ArrayBuffer`. Normalize early:

```javascript
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
```

### 5. Cost and Rate Limits

APIs bill per capture. During migration, shadow mode can double your capture volume. Either disable shadow for high-volume paths or run it only on a sample.

### 6. Existing Scripts and Cron Jobs

Batch scripts that loop over URLs need minimal changes—replace the capture call with your abstraction. Ensure they respect rate limits and use retries for transient failures.

## Decommission Checklist

Before shutting down Puppeteer:

- [ ] 100% of production traffic on API for at least one week
- [ ] Error rate and latency meet or exceed Puppeteer baselines
- [ ] No remaining code paths that require local Chrome
- [ ] All Puppeteer-specific dependencies removed from `package.json`
- [ ] Documentation updated to reflect API usage
- [ ] Team trained on API dashboard, logging, and support

## Summary

Migrating from Puppeteer or Playwright to a screenshot API is mostly an implementation swap behind an abstraction. Use a dual-backend setup to migrate gradually, convert options with the mapping above, and watch for timeout units, auth, and localhost limitations. With the right abstraction and rollout strategy, you can switch without a disruptive rewrite.

---

**Ready to migrate?**

[Try Screenshotly free →](/sign-up) — 100 free screenshots, no credit card required. [See our Node.js integration →](/integrations/nodejs) for a drop-in migration path.
