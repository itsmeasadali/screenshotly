---
title: "How to Remove Cookie Banners from Screenshots Automatically"
description: "Learn how to automatically remove cookie consent banners, chat widgets, and popups from your screenshots using AI-powered element detection."
excerpt: "A practical guide to capturing clean screenshots without cookie banners and other distracting UI elements using AI removal technology."
author: "asad-ali"
publishedAt: "2026-01-20"
category: "tutorial"
tags: ["ai removal", "cookie banners", "gdpr", "screenshots", "automation"]
keywords: ["remove cookie banner screenshot", "clean screenshots", "hide popup screenshot", "ai element removal"]
featured: false
readingTime: 6
---

Modern websites are cluttered with consent banners, chat widgets, and promotional popups. When capturing screenshots for documentation, marketing, or testing, these elements distract from the actual content you want to show.

Traditionally, removing these elements required manual CSS injection or post-processing in image editors. AI-powered element removal changes this by automatically detecting and hiding common UI patterns before capture.

## The Problem with Manual Approaches

### CSS Injection Limitations

The traditional approach involves injecting CSS to hide specific elements:

```javascript
// Traditional approach - fragile and high-maintenance
await page.addStyleTag({
  content: `
    .cookie-consent { display: none !important; }
    #cookie-banner { display: none !important; }
    .gdpr-modal { display: none !important; }
    [class*="cookie"] { display: none !important; }
    [id*="consent"] { display: none !important; }
  `
});
```

**Problems with this approach:**

1. **Site-specific selectors**: Every website uses different class names
2. **Constant maintenance**: Websites update their banners frequently
3. **Incomplete coverage**: New banner types require new selectors
4. **False positives**: Aggressive selectors may hide wanted content

### Manual Post-Processing

Some teams remove banners after capture using image editing:

```
Capture → Download → Open in Photoshop → Crop/Clone → Export
```

This works for occasional screenshots but doesn't scale for automation.

## AI-Powered Element Removal

AI element removal uses computer vision to detect common UI patterns regardless of their CSS implementation. The AI recognizes:

- **Cookie consent banners** (GDPR, CCPA compliance popups)
- **Chat widgets** (Intercom, Drift, Crisp)
- **Notification bars** (Promotional banners, sale announcements)
- **Modal popups** (Newsletter signups, exit intent)
- **Sticky headers/footers** that obstruct content

### How It Works

```
Website loads → AI analyzes DOM and visual layout 
              → Identifies common UI patterns
              → Hides detected elements with CSS
              → Captures clean screenshot
```

The detection happens before screenshot capture, so the removed elements don't appear in the output at all.

## Implementation with Screenshotly

### Basic AI Removal

Enable AI removal with a simple flag:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'desktop',
    format: 'png',
    aiRemoval: {
      enabled: true,
    },
  }),
});
```

This enables detection and removal of all supported element types.

### Selective Removal

Remove only specific element types:

```javascript
aiRemoval: {
  enabled: true,
  types: ['cookie-banner', 'chat-widget'],
}
```

**Supported types:**

| Type | Description |
|------|-------------|
| `cookie-banner` | GDPR/CCPA consent popups |
| `chat-widget` | Support chat bubbles and windows |
| `popup` | Modal dialogs and overlays |
| `notification` | Toast messages and alert bars |
| `sticky-header` | Fixed headers that follow scroll |
| `sticky-footer` | Fixed footers and bottom bars |

### Full Example

Here's a complete implementation for documentation screenshots:

```javascript
async function captureDocScreenshot(url, filename) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
      viewport: { width: 1280, height: 800 },
      aiRemoval: {
        enabled: true,
        types: [
          'cookie-banner',
          'chat-widget',
          'popup',
          'notification',
        ],
      },
      // Wait for page to fully load
      delay: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`Screenshot failed: ${response.status}`);
  }

  const imageBuffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(filename, imageBuffer);
  
  console.log(`Saved clean screenshot: ${filename}`);
  return filename;
}

// Usage
await captureDocScreenshot(
  'https://complex-site-with-banners.com',
  'clean-screenshot.png'
);
```

## Use Cases

### Documentation Screenshots

Technical documentation requires clean, focused screenshots that highlight the relevant UI without distractions.

```javascript
// Capture all documentation pages
const pages = [
  { path: '/dashboard', output: 'docs/images/dashboard.png' },
  { path: '/settings', output: 'docs/images/settings.png' },
  { path: '/reports', output: 'docs/images/reports.png' },
];

for (const page of pages) {
  await captureDocScreenshot(
    `https://app.example.com${page.path}`,
    page.output
  );
}
```

**Before AI removal:**
- Cookie banners covering content
- Chat widget in corner
- Promotional popups

**After AI removal:**
- Clean, professional screenshots
- Content is the focus
- Consistent across all pages

### Marketing Materials

Product screenshots for websites, presentations, and social media need to look professional.

```javascript
const marketingScreenshot = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://yourapp.com/features',
    device: 'desktop',
    format: 'png',
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'chat-widget', 'popup'],
    },
    // Add device mockup for extra polish
    mockup: {
      type: 'macbook',
      shadow: true,
    },
  }),
});
```

### Visual Regression Testing

Consistent screenshots are essential for reliable visual tests. Dynamic elements like banners cause false positives.

```javascript
async function captureForVisualTest(pageUrl) {
  return await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: pageUrl,
      device: 'desktop',
      format: 'png',
      aiRemoval: {
        enabled: true,
        // Remove all dynamic elements that cause test flakiness
        types: [
          'cookie-banner',
          'chat-widget',
          'popup',
          'notification',
        ],
      },
    }),
  });
}
```

### Competitor Analysis

Capture competitor websites without their cookie banners cluttering the view:

```javascript
const competitors = [
  'https://competitor1.com',
  'https://competitor2.com',
  'https://competitor3.com',
];

for (const url of competitors) {
  const domain = new URL(url).hostname;
  await captureDocScreenshot(url, `competitors/${domain}.png`);
}
```

## Combining with Other Features

### AI Removal + Full Page

Capture entire pages without banners:

```javascript
{
  url: 'https://example.com/long-page',
  fullPage: true,
  aiRemoval: {
    enabled: true,
    types: ['cookie-banner', 'sticky-footer'],
  },
}
```

### AI Removal + Device Mockups

Generate marketing-ready images:

```javascript
{
  url: 'https://yourapp.com',
  aiRemoval: {
    enabled: true,
  },
  mockup: {
    type: 'browser-dark',
    shadow: true,
  },
}
```

### AI Removal + PDF Generation

Create clean PDFs from web content:

```javascript
{
  url: 'https://example.com/report',
  format: 'pdf',
  aiRemoval: {
    enabled: true,
    types: ['cookie-banner', 'popup'],
  },
  pdfOptions: {
    pageSize: 'A4',
    printBackground: true,
  },
}
```

## Best Practices

### 1. Be Selective

Don't remove everything by default. Only hide elements that actually distract from your use case.

```javascript
// Good: Specific to your needs
aiRemoval: {
  types: ['cookie-banner', 'chat-widget'],
}

// Less good: Might hide useful elements
aiRemoval: {
  types: ['cookie-banner', 'chat-widget', 'popup', 'notification', 'sticky-header', 'sticky-footer'],
}
```

### 2. Test Before Automating

Verify removal works correctly before running at scale:

```javascript
// Test with debug output
const testUrl = 'https://example.com';
const screenshot = await captureDocScreenshot(testUrl, 'test.png');
console.log('Review test.png to verify removal worked correctly');
```

### 3. Handle Edge Cases

Some sites may have unusual implementations. Have a fallback:

```javascript
async function captureWithFallback(url, outputPath) {
  try {
    // Try with AI removal
    return await captureDocScreenshot(url, outputPath);
  } catch (error) {
    console.warn('AI removal failed, falling back to standard capture');
    // Fallback without AI removal
    return await captureStandard(url, outputPath);
  }
}
```

### 4. Combine with Delays

Ensure banners have loaded before attempting removal:

```javascript
{
  url: pageUrl,
  delay: 1000, // Wait for dynamic elements to load
  aiRemoval: {
    enabled: true,
  },
}
```

## Conclusion

AI-powered element removal transforms screenshot automation by handling the messy reality of modern websites. Instead of maintaining brittle CSS selectors or manually editing images, you get clean screenshots automatically.

Key takeaways:

1. **Enable selectively**: Choose element types relevant to your use case
2. **Combine with other features**: Works with mockups, full-page, PDFs
3. **Test before scaling**: Verify results on representative pages
4. **Use appropriate delays**: Let dynamic content load first

The result: professional, clean screenshots without the maintenance burden.

---

**Ready to capture clean screenshots?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

Learn more about [AI element removal →](/blog/ai-element-removal-guide)
