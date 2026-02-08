---
title: "Handling Dynamic Content in Screenshots: SPAs, Lazy Loading, and Animations"
description: "Learn techniques for capturing accurate screenshots of dynamic web content. Covers SPAs, lazy loading, infinite scroll, and animation handling."
excerpt: "Master the challenges of screenshotting dynamic web content. Wait strategies, scroll handling, and animation control for perfect captures."
author: "asad-ali"
publishedAt: "2025-12-10"
category: "tutorial"
tags: ["dynamic content", "spa", "javascript", "technical"]
keywords: ["dynamic content screenshot", "spa screenshot", "lazy loading screenshot", "javascript screenshot", "wait for content"]
featured: false
readingTime: 8
---

Modern websites are dynamic—content loads asynchronously, images lazy load, and animations run continuously. Capturing accurate screenshots of these pages requires understanding the timing and using the right techniques.

This guide covers strategies for handling every type of dynamic content.

## The Challenge

Traditional screenshots capture what's visible at a moment in time. But modern pages:

- **Load content asynchronously** (SPAs, AJAX)
- **Lazy load images** (scroll-triggered loading)
- **Animate elements** (transitions, motion)
- **Infinite scroll** (content loads as you scroll)
- **Interactive states** (hover effects, modals)

Capturing before content loads produces incomplete screenshots. Capturing during animations produces blurry or partially rendered content.

## Wait Strategies

### Basic Delay

The simplest approach—wait a fixed time:

```javascript
{
  url: 'https://example.com',
  delay: 2000,  // Wait 2 seconds
}
```

**Pros:** Simple, works for most pages
**Cons:** May under-wait (incomplete) or over-wait (slow)

### Wait for Selector

Wait for a specific element to appear:

```javascript
{
  url: 'https://example.com',
  waitFor: '.main-content',  // CSS selector
}
```

**Pros:** Precise, adapts to page speed
**Cons:** Need to know what to wait for

### Wait for Network Idle

Wait until no network requests for a period:

```javascript
{
  url: 'https://example.com',
  waitUntil: 'networkidle0',  // No requests for 500ms
}
```

Options:
- `networkidle0`: Zero requests for 500ms
- `networkidle2`: At most 2 requests for 500ms
- `domcontentloaded`: DOM is ready
- `load`: All resources loaded

### Combined Approach

Use multiple conditions for reliability:

```javascript
{
  url: 'https://example.com',
  waitUntil: 'networkidle2',
  waitFor: '[data-loaded="true"]',  // App-specific indicator
  delay: 500,  // Additional buffer
}
```

## Single Page Applications (SPAs)

SPAs render content client-side, often after initial page load.

### React/Vue/Angular Apps

**Problem:** Initial HTML is minimal; content renders via JavaScript.

**Solution:**

```javascript
{
  url: 'https://spa-example.com/dashboard',
  waitUntil: 'networkidle0',  // Wait for API calls
  waitFor: '.dashboard-loaded',  // Wait for render
  delay: 1000,  // Buffer for hydration
}
```

### React Query/SWR Loading States

Many apps show loading states before data:

```javascript
{
  url: 'https://app.example.com',
  waitFor: ':not(.loading-spinner)',  // Wait for spinner to disappear
  // Or wait for actual content
  waitFor: '[data-testid="content-loaded"]',
}
```

### Router Navigation

For SPAs with client-side routing:

```javascript
// The URL hash/path may not trigger navigation
// Use inject script to ensure route loads
{
  url: 'https://spa.example.com',
  injectScripts: [`
    // Wait for React Router or Vue Router
    await new Promise(r => setTimeout(r, 2000));
    // Or trigger navigation
    window.history.pushState({}, '', '/dashboard');
    await new Promise(r => setTimeout(r, 1000));
  `],
}
```

## Lazy Loading Images

Images that load only when scrolled into view.

### Full Page Capture

Full-page mode automatically scrolls, triggering lazy load:

```javascript
{
  url: 'https://example.com',
  fullPage: true,
  // Images load as page scrolls
}
```

### Viewport-Only Capture

For viewport captures, scroll then capture:

```javascript
{
  url: 'https://example.com',
  injectScripts: [`
    // Scroll to trigger lazy loads
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 500));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  `],
  delay: 1000,
}
```

### Disable Lazy Loading

Force immediate image loading:

```javascript
{
  url: 'https://example.com',
  injectScripts: [`
    // Remove lazy loading attributes
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'eager';
      img.src = img.dataset.src || img.src;
    });
    await new Promise(r => setTimeout(r, 2000));
  `],
}
```

## Handling Animations

Animations can result in blurry or mid-transition captures.

### Disable All Animations

```javascript
{
  url: 'https://example.com',
  injectStyles: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  `,
}
```

### Wait for Animation Completion

If animations should complete before capture:

```javascript
{
  url: 'https://example.com',
  delay: 3000,  // Wait for animations
  injectScripts: [`
    // Wait for specific animation
    document.querySelector('.hero-animation')
      .addEventListener('animationend', resolve);
  `],
}
```

### Pause Video/GIF Content

```javascript
{
  url: 'https://example.com',
  injectScripts: [`
    // Pause all videos
    document.querySelectorAll('video').forEach(v => v.pause());
    // Stop GIFs by replacing with static
    document.querySelectorAll('img[src*=".gif"]').forEach(img => {
      // Replace with first frame or placeholder
    });
  `],
}
```

## Infinite Scroll

Pages that load content as you scroll.

### Capture First N Items

```javascript
{
  url: 'https://feed.example.com',
  viewport: { height: 2000 },  // Taller viewport
  injectScripts: [`
    // Scroll to load more
    for (let i = 0; i < 3; i++) {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 1000));
    }
    window.scrollTo(0, 0);
  `],
}
```

### Full Page with Limit

```javascript
{
  url: 'https://feed.example.com',
  fullPage: true,
  maxHeight: 10000,  // Cap at 10000px to avoid infinite scroll
}
```

## Hover States

Capture elements in hover state:

```javascript
{
  url: 'https://example.com',
  injectScripts: [`
    // Trigger hover state
    const button = document.querySelector('.cta-button');
    button.classList.add('hover');
    // Or dispatch event
    button.dispatchEvent(new MouseEvent('mouseenter'));
    await new Promise(r => setTimeout(r, 500));
  `],
}
```

## Modal and Overlay Content

### Capture with Modal Open

```javascript
{
  url: 'https://example.com',
  injectScripts: [`
    // Click to open modal
    document.querySelector('.open-modal-btn').click();
    await new Promise(r => setTimeout(r, 500));
  `],
}
```

### Dismiss Overlays Before Capture

```javascript
{
  url: 'https://example.com',
  injectScripts: [`
    // Close cookie banner
    document.querySelector('.cookie-accept')?.click();
    // Close newsletter popup
    document.querySelector('.popup-close')?.click();
    await new Promise(r => setTimeout(r, 500));
  `],
  // Or use AI removal
  aiRemoval: {
    enabled: true,
    types: ['cookie-banner', 'popup', 'modal'],
  },
}
```

## Charts and Data Visualizations

Charts often render asynchronously.

### D3/Chart.js/Highcharts

```javascript
{
  url: 'https://dashboard.example.com',
  waitFor: 'svg.chart-rendered',  // Wait for chart SVG
  delay: 2000,  // Extra time for transitions
}
```

### Canvas-Based Charts

```javascript
{
  url: 'https://dashboard.example.com',
  injectScripts: [`
    // Wait for chart instance
    await new Promise(resolve => {
      const check = () => {
        if (window.myChart?.rendered) resolve();
        else setTimeout(check, 100);
      };
      check();
    });
  `],
}
```

## Maps

### Google Maps/Mapbox

```javascript
{
  url: 'https://map.example.com',
  delay: 3000,  // Wait for tiles to load
  injectScripts: [`
    // Wait for map ready
    await new Promise(resolve => {
      google.maps.event.addListenerOnce(map, 'idle', resolve);
    });
  `],
}
```

## Best Practices

### 1. Test Your Selectors

Before production, test wait conditions:

```javascript
// Test in browser console
document.querySelector('.your-selector') !== null
```

### 2. Use Data Attributes

Add data attributes specifically for screenshot detection:

```html
<div data-screenshot-ready="true">
  <!-- Content -->
</div>
```

```javascript
waitFor: '[data-screenshot-ready="true"]'
```

### 3. Combine Strategies

Layer multiple wait conditions:

```javascript
{
  waitUntil: 'networkidle2',
  waitFor: '.content-loaded',
  delay: 500,
}
```

### 4. Handle Failures

Content may not load; have fallbacks:

```javascript
{
  waitFor: '.optional-content',
  waitForTimeout: 5000,  // Max wait before proceeding
}
```

### 5. Environment Differences

Development may load faster than production:

```javascript
const delay = process.env.NODE_ENV === 'production' ? 3000 : 1000;
```

## Debugging Tips

### 1. Increase Delay Dramatically

Start with a very long delay to see if content ever loads:

```javascript
delay: 10000  // 10 seconds
```

### 2. Capture Intermediate States

Take multiple screenshots to identify when content appears:

```javascript
// Capture at different times
for (const delay of [0, 1000, 2000, 3000]) {
  await capture({ delay, filename: `debug-${delay}ms.png` });
}
```

### 3. Check Console Errors

Some content may fail to load due to errors:

```javascript
injectScripts: [`
  window.onerror = (msg) => console.log('Error:', msg);
`]
```

## Conclusion

Dynamic content requires thoughtful wait strategies:

1. **Know your content** - Understand how the page loads
2. **Wait appropriately** - Combine delay, selector, and network waits
3. **Handle edge cases** - Animations, lazy loading, infinite scroll
4. **Test thoroughly** - Verify captures match expectations

With proper configuration, you can capture any dynamic page accurately.

---

**Ready to capture dynamic content?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [Visual Regression Testing Guide →](/blog/visual-regression-testing-guide)
