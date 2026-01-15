// Blog post data structure and sample posts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: 'tutorial' | 'guide' | 'news' | 'comparison' | 'tips';
  tags: string[];
  keywords: string[];
  readingTime: number; // in minutes
  featured?: boolean;
  image?: string;
}

// Sample blog posts for SEO
export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-screenshot-api',
    title: 'Getting Started with Screenshotly: Your First API Call',
    excerpt: 'Learn how to capture your first website screenshot with Screenshotly\'s REST API. Step-by-step guide for developers.',
    content: `
# Getting Started with Screenshotly

Welcome to Screenshotly! This guide will walk you through making your first API call to capture a website screenshot.

## Prerequisites

Before you begin, you'll need:
- A Screenshotly account (sign up for free)
- Your API key from the dashboard
- Basic knowledge of REST APIs

## Step 1: Get Your API Key

After signing up, navigate to your dashboard and copy your API key. Keep this secure - it's your authentication for all API calls.

## Step 2: Make Your First Request

Here's a simple example using cURL:

\`\`\`bash
curl -X POST "https://api.screenshotly.app/screenshot" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "device": "desktop",
    "format": "png"
  }' \\
  --output screenshot.png
\`\`\`

## Step 3: Customize Your Screenshots

You can customize your screenshots with various options:
- **device**: desktop, laptop, tablet, or mobile
- **format**: png, jpeg, or pdf
- **fullPage**: capture the entire page or just the viewport
- **mockup**: add device frames like iPhone or MacBook

## Next Steps

Now that you've captured your first screenshot, explore our advanced features like AI-powered element removal and device mockups!
    `,
    publishedAt: '2024-01-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['getting-started', 'api', 'tutorial'],
    keywords: [
      'screenshot API tutorial',
      'getting started screenshot API',
      'first API call',
      'screenshot automation guide',
    ],
    readingTime: 5,
    featured: true,
  },
  {
    slug: 'ai-element-removal-guide',
    title: 'How AI Element Removal Cleans Up Your Screenshots',
    excerpt: 'Discover how Screenshotly\'s AI automatically removes cookie banners, popups, and ads from your screenshots.',
    content: `
# AI Element Removal: Clean Screenshots Automatically

Cookie banners, newsletter popups, and chat widgets can ruin otherwise perfect screenshots. Screenshotly's AI-powered element removal solves this problem automatically.

## How It Works

Our AI uses computer vision to identify and remove common distracting elements:

1. **Cookie Banners**: GDPR and CCPA consent dialogs
2. **Newsletter Popups**: Email signup modals
3. **Chat Widgets**: Customer support chat bubbles
4. **Social Overlays**: Sharing buttons and follow prompts
5. **Advertisements**: Banner and inline ads

## Using AI Removal

Enable AI removal in your API request:

\`\`\`json
{
  "url": "https://example.com",
  "aiRemoval": {
    "enabled": true,
    "types": ["cookie-banner", "newsletter", "chat-widget"],
    "confidence": 0.8
  }
}
\`\`\`

## Confidence Threshold

The \`confidence\` parameter (0.0 to 1.0) controls how aggressive the removal is:
- **0.6-0.7**: Remove obvious elements only
- **0.8** (default): Balanced detection
- **0.9+**: Only remove highly confident matches

## Best Practices

For the cleanest screenshots:
1. Use a slight delay (1-2 seconds) to let elements fully load
2. Start with default confidence and adjust if needed
3. Test with your specific sites to tune settings
    `,
    publishedAt: '2024-01-20T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['ai', 'element-removal', 'features'],
    keywords: [
      'AI screenshot cleanup',
      'remove cookie banners',
      'clean screenshots',
      'popup removal API',
    ],
    readingTime: 4,
  },
  {
    slug: 'device-mockups-for-marketing',
    title: 'Using Device Mockups for Marketing: A Complete Guide',
    excerpt: 'Learn how to create stunning marketing visuals with Screenshotly\'s device mockups. Perfect for app stores and landing pages.',
    content: `
# Device Mockups for Marketing

Professional device mockups can make your marketing materials stand out. Screenshotly includes beautiful mockups for iPhone, MacBook, and browser windows.

## Available Mockups

### Browser Frames
- **browser-light**: Clean white browser chrome
- **browser-dark**: Sleek dark mode browser

### Mobile Devices
- **iphone-14**: Latest iPhone mockup

### Laptops
- **macbook-pro**: Premium MacBook frame

## Creating Marketing Visuals

Use mockups in your API request:

\`\`\`json
{
  "url": "https://your-app.com",
  "device": "mobile",
  "mockup": "iphone-14",
  "format": "png"
}
\`\`\`

## Use Cases

### App Store Screenshots
Create consistent, professional app store listings with iPhone mockups.

### Landing Pages
Showcase your web app in beautiful browser frames.

### Social Media
Generate eye-catching social media posts with device context.

### Pitch Decks
Impress investors with polished product visuals.

## Tips for Best Results

1. Use high-contrast pages for better visibility in mockups
2. Choose mockup color (light/dark) based on your brand
3. Ensure important content is visible in the viewport
    `,
    publishedAt: '2024-02-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tips',
    tags: ['mockups', 'marketing', 'design'],
    keywords: [
      'device mockups',
      'marketing screenshots',
      'app store images',
      'product screenshots',
    ],
    readingTime: 6,
  },
  {
    slug: 'puppeteer-vs-screenshot-api',
    title: 'Puppeteer vs Screenshot API: When to Use Each',
    excerpt: 'Comparing self-hosted Puppeteer with managed screenshot APIs. Learn which option is right for your project.',
    content: `
# Puppeteer vs Screenshot API

Should you self-host Puppeteer or use a managed screenshot service? Let's compare both approaches.

## Self-Hosted Puppeteer

### Pros
- Full control over the browser
- No per-screenshot costs
- Customizable to any requirement

### Cons
- Infrastructure maintenance
- Chromium updates and security patches
- Scaling complexity
- Memory management challenges

## Managed Screenshot API

### Pros
- Zero infrastructure to manage
- Instant scaling
- Built-in features (AI removal, mockups)
- Predictable costs
- Faster time-to-market

### Cons
- Per-screenshot pricing
- Less customization for edge cases
- External dependency

## When to Choose Puppeteer

Self-host Puppeteer when you:
- Need deep browser customization
- Have very high volume (millions of screenshots)
- Already have DevOps resources
- Require specific browser versions

## When to Choose Screenshot API

Use a managed API when you:
- Want to ship quickly
- Don't want infrastructure overhead
- Need built-in features
- Have variable or moderate volume
- Value predictable costs

## The Verdict

For most teams, a managed screenshot API is the pragmatic choice. The time saved on infrastructure can be spent building your actual product.
    `,
    publishedAt: '2024-02-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'comparison',
    tags: ['puppeteer', 'comparison', 'infrastructure'],
    keywords: [
      'puppeteer vs API',
      'screenshot API comparison',
      'puppeteer alternative',
      'managed screenshot service',
    ],
    readingTime: 7,
    featured: true,
  },
  {
    slug: 'automate-documentation-screenshots',
    title: 'Automating Documentation Screenshots in CI/CD',
    excerpt: 'Keep your documentation screenshots always up-to-date with automated capture in your CI/CD pipeline.',
    content: `
# Automating Documentation Screenshots

Outdated screenshots in documentation frustrate users. Here's how to automate screenshot capture in your CI/CD pipeline.

## The Problem

Documentation screenshots become stale when:
- UI changes aren't reflected
- Manual updates are forgotten
- Screenshots are low priority

## The Solution: CI/CD Integration

Capture screenshots automatically whenever your UI changes.

### GitHub Actions Example

\`\`\`yaml
name: Update Documentation Screenshots

on:
  push:
    branches: [main]
    paths:
      - 'src/components/**'

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy preview
        run: npm run deploy:preview
        
      - name: Capture screenshots
        run: |
          curl -X POST "https://api.screenshotly.app/screenshot" \\
            -H "Authorization: Bearer \${{ secrets.SCREENSHOTLY_API_KEY }}" \\
            -H "Content-Type: application/json" \\
            -d '{"url": "\${{ env.PREVIEW_URL }}/dashboard"}' \\
            -o docs/images/dashboard.png
            
      - name: Commit screenshots
        run: |
          git add docs/images/
          git commit -m "Update documentation screenshots"
          git push
\`\`\`

## Best Practices

1. **Consistent viewport sizes**: Use the same device settings
2. **Wait for content**: Add delays for dynamic content
3. **Clean pages**: Enable AI removal for consistent results
4. **Version control**: Commit screenshots to track changes
5. **Preview deploys**: Capture from preview environments

## Benefits

- Always up-to-date documentation
- Consistent screenshot quality
- Zero manual effort after setup
- Visual change tracking in git
    `,
    publishedAt: '2024-03-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['ci-cd', 'documentation', 'automation'],
    keywords: [
      'automated documentation screenshots',
      'CI/CD screenshots',
      'GitHub Actions screenshot',
      'documentation automation',
    ],
    readingTime: 8,
  },
  {
    slug: 'screenshot-api-best-practices',
    title: '10 Best Practices for Using Screenshot APIs in Production',
    excerpt: 'Lessons learned from capturing millions of screenshots. Optimize your API usage for reliability and performance.',
    content: `
# 10 Best Practices for Screenshot APIs in Production

After helping thousands of developers capture millions of screenshots, here are our top recommendations for production use.

## 1. Always Set Timeouts

Never leave your application hanging. Set reasonable timeouts for screenshot requests:

\`\`\`javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);

try {
  const response = await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timeout);
}
\`\`\`

## 2. Implement Retry Logic

Network issues happen. Use exponential backoff for retries:

- First retry: 1 second delay
- Second retry: 2 seconds
- Third retry: 4 seconds
- Maximum 3 retries

## 3. Cache Screenshots When Possible

Many URLs don't change frequently. Implement caching:
- Use URL + viewport as cache key
- Set appropriate TTL (1 hour to 1 day)
- Invalidate on known content changes

## 4. Use Webhooks for Long Operations

For full-page screenshots or slow sites, use async with webhooks instead of blocking requests.

## 5. Handle Rate Limits Gracefully

Implement a queue system to respect rate limits and avoid 429 errors.

## 6. Optimize Image Formats

- Use PNG for transparency and UI screenshots
- Use JPEG for photos and complex images
- Adjust quality settings based on use case

## 7. Monitor Your Usage

Track your API usage to:
- Predict costs
- Identify anomalies
- Plan capacity

## 8. Secure Your API Keys

- Never expose keys in client-side code
- Use environment variables
- Rotate keys periodically

## 9. Test with Representative URLs

Before production, test with:
- Slow-loading pages
- Dynamic content
- Various viewport sizes

## 10. Have a Fallback Plan

Consider what happens if the API is unavailable:
- Show cached content
- Display placeholder image
- Queue for retry
        `,
    publishedAt: '2024-03-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['best-practices', 'production', 'performance'],
    keywords: [
      'screenshot API best practices',
      'production API tips',
      'screenshot reliability',
      'API optimization',
    ],
    readingTime: 10,
  },
  {
    slug: 'capture-full-page-screenshots',
    title: 'Capturing Full Page Screenshots: Complete Guide',
    excerpt: 'Master full-page screenshot capture for long web pages (infinite scroll pages, articles, and more).',
    content: `
# Capturing Full Page Screenshots

Full-page screenshots capture everything on a page, not just the visible viewport. Here's how to do it right.

## When to Use Full Page Capture

- Long-form content (articles, blogs)
- E-commerce product pages
- Documentation pages
- Legal/compliance archiving
- Competitor analysis

## Basic Full Page Capture

Enable full page mode in your request:

\`\`\`json
{
  "url": "https://example.com/long-article",
  "fullPage": true,
  "format": "png"
}
\`\`\`

## Handling Infinite Scroll

For pages with infinite scroll:
1. Set a scroll limit or max height
2. Use delays to allow content loading
3. Consider capturing in sections

## Image Size Considerations

Full-page screenshots can be large:
- Use JPEG for smaller files
- Consider splitting very long pages
- Compress output if needed

## Performance Tips

For optimal results:
- Add delay for lazy-loaded content
- Disable animations
- Remove fixed headers/footers
- Use AI removal for popups

## Common Challenges

### Fixed Elements
Fixed headers and footers repeat in full-page screenshots. Enable AI removal or style injection to handle them.

### Lazy Loading
Ensure all content loads by:
- Adding sufficient delay
- Scrolling to trigger lazy load
- Waiting for network idle
        `,
    publishedAt: '2024-04-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['full-page', 'tutorial', 'features'],
    keywords: [
      'full page screenshot',
      'capture entire webpage',
      'long screenshot',
      'scrolling screenshot API',
    ],
    readingTime: 6,
  },
  {
    slug: 'web-archiving-with-screenshots',
    title: 'Web Archiving with Screenshots: Legal and Compliance Use Cases',
    excerpt: 'How organizations use screenshot APIs for legal evidence, compliance documentation, and historical preservation.',
    content: `
# Web Archiving with Screenshots

Screenshots serve as valuable evidence and documentation in legal and compliance contexts. Learn how to capture and preserve web content properly.

## Why Archive Web Content?

- **Legal Evidence**: Capture state of websites for disputes
- **Compliance**: Document regulatory compliance
- **IP Protection**: Prove copyright or trademark infringement
- **Historical Record**: Preserve content that may change

## Legal Considerations

When using screenshots as evidence:

1. **Timestamp Everything**: Include capture date and time
2. **Capture Metadata**: URL, capture parameters, API response headers
3. **Maintain Chain of Custody**: Document who captured what and when
4. **Use Full Page**: Capture complete context, not just portions

## Compliance Documentation

For regulatory compliance:
- Capture advertising claims regularly
- Document privacy policy changes
- Archive terms of service updates
- Record product pricing and offers

## Best Practices for Archiving

### Capture Strategy

\`\`\`json
{
  "url": "https://target-site.com",
  "fullPage": true,
  "format": "png",
  "delay": 3000,
  "aiRemoval": { "enabled": false }
}
\`\`\`

Note: Disable AI removal for archiving to preserve original content.

### Storage and Organization

- Use consistent naming: \`{domain}_{date}_{time}_{hash}.png\`
- Store with metadata JSON file
- Use immutable storage (S3 Glacier, etc.)
- Implement retention policies

## Automation Ideas

- Daily captures of competitor pricing
- Weekly captures of SERP positions
- Triggered captures on content detection
- Scheduled regulatory compliance checks
        `,
    publishedAt: '2024-04-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['archiving', 'legal', 'compliance'],
    keywords: [
      'web archiving screenshots',
      'legal screenshot evidence',
      'compliance documentation',
      'website archival',
    ],
    readingTime: 7,
  },
  {
    slug: 'optimize-screenshot-performance',
    title: 'Optimizing Screenshot API Performance: Speed and Efficiency',
    excerpt: 'Reduce screenshot capture times and costs with these performance optimization techniques.',
    content: `
# Optimizing Screenshot API Performance

Every millisecond counts in production. Here's how to get faster screenshots while reducing costs.

## Reduce Page Load Time

The biggest factor in screenshot time is page load speed.

### Block Unnecessary Resources

\`\`\`json
{
  "url": "https://example.com",
  "blockResources": ["font", "media", "stylesheet"],
  "device": "desktop"
}
\`\`\`

### Use Minimal Viewports

Smaller viewports = faster captures:
- Mobile viewport for thumbnails
- Desktop only when necessary
- Avoid 4K unless required

## Optimize Output

### Choose the Right Format

| Format | Speed | Size | Use Case |
|--------|-------|------|----------|
| JPEG 70% | Fastest | Smallest | Thumbnails |
| JPEG 90% | Fast | Medium | Gallery |
| PNG | Slower | Largest | Transparency |

### Resize at Source

Capture at the final display size rather than scaling later.

## Parallel Processing

Capture multiple screenshots concurrently:

\`\`\`javascript
const urls = ['url1', 'url2', 'url3'];
const screenshots = await Promise.all(
  urls.map(url => captureScreenshot(url))
);
\`\`\`

## Caching Strategies

### URL-based Caching

Cache key: \`hash(url + viewport + options)\`
TTL: Based on content update frequency

### Conditional Capture

Check page freshness before capturing:
1. Fetch Last-Modified header
2. Compare with cached version
3. Only capture if changed

## Monitoring and Profiling

Track key metrics:
- Capture duration P50, P95, P99
- Success rate
- Size distribution
- Cost per screenshot

Identify and optimize outliers for the biggest gains.
        `,
    publishedAt: '2024-05-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tips',
    tags: ['performance', 'optimization', 'speed'],
    keywords: [
      'screenshot API performance',
      'faster screenshots',
      'optimize screenshot capture',
      'reduce screenshot costs',
    ],
    readingTime: 8,
  },
  {
    slug: 'ecommerce-screenshot-automation',
    title: 'E-commerce Screenshot Automation: Product Pages at Scale',
    excerpt: 'Automate product page captures for catalogs, price monitoring, and competitive analysis.',
    content: `
# E-commerce Screenshot Automation

E-commerce businesses capture thousands of product page screenshots daily. Here's how to do it efficiently.

## Use Cases

### Product Catalogs
Automatically generate visual catalogs from product pages.

### Price Monitoring
Capture competitor pricing for analysis and alerts.

### Quality Assurance
Verify product pages display correctly across devices.

### Content Archiving
Document product state for compliance and disputes.

## Implementation Strategy

### 1. Product URL Discovery

Get product URLs from:
- Sitemap parsing
- API integration
- Crawling category pages

### 2. Batch Processing

Process products in batches to manage resources:

\`\`\`javascript
const BATCH_SIZE = 10;
const DELAY_BETWEEN_BATCHES = 2000;

for (let i = 0; i < products.length; i += BATCH_SIZE) {
  const batch = products.slice(i, i + BATCH_SIZE);
  await Promise.all(batch.map(captureProduct));
  await delay(DELAY_BETWEEN_BATCHES);
}
\`\`\`

### 3. Handle Product Variants

Capture different states:
- Default product view
- Selected variants (color, size)
- Image gallery views

## Optimal Settings for E-commerce

\`\`\`json
{
  "url": "https://store.com/product/123",
  "device": "desktop",
  "fullPage": true,
  "delay": 2000,
  "aiRemoval": {
    "enabled": true,
    "types": ["cookie-banner", "chat-widget", "newsletter"]
  }
}
\`\`\`

## Data Integration

Combine screenshots with:
- Price extracted from page
- Product metadata
- Availability status
- Timestamp of capture

Store in a structured database for analysis.

## Comparison and Analytics

Use captured images for:
- Price trend analysis
- Layout change detection
- Competitive positioning
- A/B test documentation
        `,
    publishedAt: '2024-05-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['ecommerce', 'automation', 'products'],
    keywords: [
      'ecommerce screenshot automation',
      'product page screenshots',
      'price monitoring screenshots',
      'competitor screenshot tracking',
    ],
    readingTime: 9,
    featured: true,
  },
  {
    slug: 'mobile-responsive-screenshots',
    title: 'Capturing Mobile-Responsive Screenshots: iOS & Android Views',
    excerpt: 'Learn how to capture accurate mobile screenshots for iOS and Android devices with proper viewport and device emulation.',
    content: `
# Mobile-Responsive Screenshots

Capturing accurate mobile screenshots requires more than just shrinking the viewport. Here's how to get perfect mobile captures every time.

## Device Emulation vs Viewport Resize

Simple viewport resizing doesn't capture true mobile experience:
- Touch-specific styles
- Mobile-only JavaScript
- Device pixel ratio differences
- Hover states that don't exist on mobile

## Screenshotly Mobile Configuration

Capture true mobile screenshots:

\`\`\`json
{
  "url": "https://example.com",
  "device": "mobile",
  "deviceScaleFactor": 3,
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)...",
  "viewport": {
    "width": 390,
    "height": 844
  }
}
\`\`\`

## Common Mobile Devices

### iPhone Viewports
- iPhone 14 Pro: 393 × 852
- iPhone 14: 390 × 844
- iPhone SE: 375 × 667

### Android Viewports
- Pixel 7: 412 × 915
- Samsung Galaxy S23: 360 × 780

## Testing Responsive Design

Capture multiple breakpoints:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## Best Practices

1. Use realistic user agents
2. Set proper device scale factor (2x or 3x)
3. Wait for responsive images to load
4. Test both orientations
5. Enable touch mode for accurate styling
        `,
    publishedAt: '2024-06-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['mobile', 'responsive', 'devices'],
    keywords: [
      'mobile screenshot API',
      'iOS screenshot capture',
      'Android screenshot',
      'responsive testing screenshots',
    ],
    readingTime: 6,
  },
  {
    slug: 'social-media-preview-images',
    title: 'Generating Social Media Preview Images with API',
    excerpt: 'Automatically create Open Graph images and social media previews for your content using screenshot automation.',
    content: `
# Social Media Preview Images

Social media preview images (OG images) dramatically affect click-through rates. Here's how to automate their creation.

## Why OG Images Matter

- Posts with images get 2.3x more engagement
- Custom previews increase CTR by 40%
- Brand consistency builds recognition

## Automated OG Image Generation

Create dynamic OG images from templates:

\`\`\`json
{
  "url": "https://yoursite.com/og-template?title=My+Article&author=John",
  "device": "desktop",
  "viewport": {
    "width": 1200,
    "height": 630
  },
  "format": "png"
}
\`\`\`

## Template Approach

Build an OG template page that accepts query parameters:
- Title
- Description
- Author
- Category
- Background image

## Benefits of Automation

1. **Consistency**: Every post gets a professional image
2. **Speed**: Generate images on-demand
3. **Personalization**: Dynamic content in images
4. **A/B Testing**: Test different designs

## Platform Requirements

| Platform | Dimensions | Notes |
|----------|------------|-------|
| Twitter | 1200×628 | 16:9 aspect ratio |
| Facebook | 1200×630 | Same as Twitter |
| LinkedIn | 1200×627 | Similar specs |

## Implementation Tips

- Use high-contrast text
- Include your logo
- Keep text large and readable
- Test on multiple platforms
        `,
    publishedAt: '2024-06-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tips',
    tags: ['social-media', 'og-images', 'marketing'],
    keywords: [
      'social media preview images',
      'open graph image generator',
      'automated OG images',
      'social sharing screenshots',
    ],
    readingTime: 5,
  },
  {
    slug: 'saas-metrics-dashboard-screenshots',
    title: 'Automated SaaS Metrics Dashboard Screenshots for Reports',
    excerpt: 'Capture periodic screenshots of your analytics dashboards for reports, stakeholders, and historical tracking.',
    content: `
# SaaS Metrics Dashboard Screenshots

Automatically capture and share your SaaS metrics dashboards for reporting and analysis.

## Use Cases

### Investor Updates
Capture monthly metrics dashboards for investor reports.

### Team Standups
Daily snapshots of key metrics for team visibility.

### Historical Records
Archive dashboard states for trend analysis.

### Client Reports
White-labeled dashboards captured for client deliverables.

## Authentication Strategies

For dashboards requiring login:

### Method 1: Session Cookies
\`\`\`json
{
  "url": "https://dashboard.example.com",
  "cookies": [
    {
      "name": "session_id",
      "value": "your_session_token",
      "domain": "dashboard.example.com"
    }
  ]
}
\`\`\`

### Method 2: Read-Only Dashboard Links
Create read-only sharing links that don't require auth.

## Scheduling Captures

Set up automated captures:

\`\`\`javascript
// Daily at 9 AM
cron.schedule('0 9 * * *', async () => {
  await captureMetrics('daily');
});

// Monthly on the 1st
cron.schedule('0 9 1 * *', async () => {
  await captureMetrics('monthly');
});
\`\`\`

## Storage and Organization

Organize captures by:
- Date: \`metrics/2024/01/15/dashboard.png\`
- Type: \`metrics/mrr/2024-01-15.png\`
- Client: \`clients/acme/metrics/2024-01.png\`

## Reporting Integration

Combine captures into reports:
- Embed in Notion pages
- Attach to Slack messages
- Include in email summaries
- Add to PDF reports
        `,
    publishedAt: '2024-07-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['saas', 'dashboards', 'reporting'],
    keywords: [
      'dashboard screenshot automation',
      'SaaS metrics capture',
      'automated reporting screenshots',
      'analytics dashboard screenshots',
    ],
    readingTime: 7,
  },
  {
    slug: 'visual-regression-testing-guide',
    title: 'Visual Regression Testing with Screenshot APIs',
    excerpt: 'Implement visual regression testing in your CI/CD pipeline to catch UI bugs before they reach production.',
    content: `
# Visual Regression Testing with Screenshot APIs

Visual regression testing catches UI changes that unit tests miss. Here's how to implement it with screenshot APIs.

## What is Visual Regression Testing?

Compare screenshots before and after code changes to detect:
- Unintended styling changes
- Layout shifts
- Missing elements
- Color/font changes
- Responsive breakage

## Implementation Approach

### 1. Capture Baseline

\`\`\`javascript
async function captureBaseline(urls) {
  for (const url of urls) {
    const screenshot = await screenshotly.capture({
      url,
      device: 'desktop'
    });
    await saveAsBaseline(url, screenshot);
  }
}
\`\`\`

### 2. Capture Current State

\`\`\`javascript
async function captureCurrent(urls) {
  for (const url of urls) {
    const screenshot = await screenshotly.capture({
      url: \`\${PREVIEW_URL}\${new URL(url).pathname}\`,
      device: 'desktop'
    });
    await saveAsCurrent(url, screenshot);
  }
}
\`\`\`

### 3. Compare Images

Use image diff libraries like pixelmatch or resemblejs.

## CI/CD Integration

\`\`\`yaml
name: Visual Regression

on: [pull_request]

jobs:
  visual-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Preview
        run: npm run deploy:preview
      - name: Capture & Compare
        run: npm run visual-test
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          path: visual-report/
\`\`\`

## What to Test

Focus on:
- Critical user flows
- Marketing pages
- Checkout/payment pages
- Mobile breakpoints
- Dark mode variants

## Threshold Settings

Set appropriate diff thresholds:
- 0.1%: Strict, catches small changes
- 1%: Moderate, ignores anti-aliasing
- 5%: Loose, only major changes
        `,
    publishedAt: '2024-07-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['testing', 'ci-cd', 'visual-regression'],
    keywords: [
      'visual regression testing',
      'screenshot testing',
      'UI testing automation',
      'visual diff testing',
    ],
    readingTime: 8,
    featured: true,
  },
  {
    slug: 'pdf-generation-from-urls',
    title: 'Converting Web Pages to PDF: Complete Guide',
    excerpt: 'Generate professional PDFs from any web page using screenshot API. Perfect for invoices, reports, and documentation.',
    content: `
# Converting Web Pages to PDF

Generate PDFs from any URL for invoices, reports, contracts, and documentation.

## PDF vs Screenshot

When to use PDF:
- Multi-page documents
- Printable formats
- Text-selectable output
- Standard document sizes (A4, Letter)

## Basic PDF Generation

\`\`\`json
{
  "url": "https://example.com/invoice/123",
  "format": "pdf",
  "pdfOptions": {
    "format": "A4",
    "printBackground": true,
    "margin": {
      "top": "20mm",
      "bottom": "20mm",
      "left": "15mm",
      "right": "15mm"
    }
  }
}
\`\`\`

## Use Cases

### Invoices & Receipts
Generate PDF invoices from your billing system.

### Reports
Convert dashboard pages to shareable PDF reports.

### Contracts
Create PDF versions of online agreements.

### Documentation
Export help pages as PDF manuals.

## Page Size Options

| Format | Dimensions | Use Case |
|--------|------------|----------|
| A4 | 210×297mm | International standard |
| Letter | 8.5×11in | US standard |
| Legal | 8.5×14in | Legal documents |

## Multi-Page PDFs

For long content:
- Set appropriate page breaks in CSS
- Use @media print styles
- Test header/footer continuation

## CSS Print Optimization

\`\`\`css
@media print {
  .no-print { display: none; }
  .page-break { page-break-after: always; }
  body { font-size: 12pt; }
}
\`\`\`

## Tips for Clean PDFs

1. Hide navigation and footer for single-page capture
2. Use print stylesheets
3. Set explicit page breaks
4. Test margin settings
5. Include all fonts
        `,
    publishedAt: '2024-08-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['pdf', 'documents', 'conversion'],
    keywords: [
      'URL to PDF',
      'web page to PDF API',
      'PDF generation API',
      'convert webpage to PDF',
    ],
    readingTime: 6,
  },
  {
    slug: 'screenshot-api-security-best-practices',
    title: 'Screenshot API Security: Protecting Your API Keys and Data',
    excerpt: 'Essential security practices for using screenshot APIs in production. Protect your API keys and user data.',
    content: `
# Screenshot API Security Best Practices

Security is critical when integrating external APIs. Here's how to protect your API keys and data when using screenshot services.

## Never Expose API Keys

### ❌ Wrong: Client-Side Calls
\`\`\`javascript
// NEVER do this in browser code
fetch('https://api.screenshotly.app/screenshot', {
  headers: { 'Authorization': 'Bearer sk_live_xxx' }
});
\`\`\`

### ✅ Right: Server-Side Proxy
\`\`\`javascript
// Your backend API route
app.post('/api/screenshot', async (req, res) => {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    headers: { 
      'Authorization': \`Bearer \${process.env.SCREENSHOT_API_KEY}\` 
    }
  });
  res.json(await response.json());
});
\`\`\`

## Environment Variables

Store keys properly:
- Use .env files locally
- Use secrets managers in production (AWS Secrets, Vercel, etc.)
- Never commit keys to git

## Request Validation

Validate incoming requests:
\`\`\`javascript
app.post('/api/screenshot', async (req, res) => {
  const { url } = req.body;
  
  // Validate URL
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
  // Check against allowlist
  if (!isAllowedDomain(url)) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }
  
  // Proceed with screenshot...
});
\`\`\`

## Rate Limiting

Implement your own rate limits:
- Per user limits
- IP-based limits
- API key rotation

## SSRF Prevention

Prevent Server-Side Request Forgery:
- Block internal IPs (127.0.0.1, 10.x.x.x, etc.)
- Use domain allowlists for internal tools
- Validate URLs before passing to API

## Key Rotation

Rotate API keys periodically:
1. Generate new key
2. Update production config
3. Verify new key works
4. Delete old key
        `,
    publishedAt: '2024-08-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['security', 'api-keys', 'best-practices'],
    keywords: [
      'screenshot API security',
      'API key protection',
      'secure API integration',
      'SSRF prevention screenshots',
    ],
    readingTime: 7,
  },
  {
    slug: 'webhook-screenshot-notifications',
    title: 'Using Webhooks for Async Screenshot Notifications',
    excerpt: 'Implement webhook callbacks for long-running screenshot operations. Perfect for full-page captures and batch processing.',
    content: `
# Webhook Notifications for Screenshots

For long-running screenshot operations, webhooks let you receive results asynchronously without blocking your application.

## When to Use Webhooks

- Full-page screenshots of complex sites
- Batch processing multiple URLs
- PDF generation
- Large viewports

## Basic Webhook Flow

1. Submit screenshot request with callback URL
2. Receive immediate job ID response
3. Continue with other operations
4. Receive webhook when screenshot is ready

## Implementation

### 1. Submit Request

\`\`\`json
{
  "url": "https://example.com",
  "fullPage": true,
  "webhook": {
    "url": "https://yourapp.com/api/webhooks/screenshot",
    "headers": {
      "X-Webhook-Secret": "your_secret"
    }
  }
}
\`\`\`

### 2. Handle Webhook

\`\`\`javascript
app.post('/api/webhooks/screenshot', async (req, res) => {
  // Verify signature
  if (!verifyWebhookSignature(req)) {
    return res.status(401).send('Invalid signature');
  }

  const { jobId, status, imageUrl, error } = req.body;

  if (status === 'completed') {
    // Download and process image
    await processScreenshot(jobId, imageUrl);
  } else if (status === 'failed') {
    // Handle error
    await handleError(jobId, error);
  }

  res.status(200).send('OK');
});
\`\`\`

## Webhook Security

1. **Verify signatures**: Check HMAC signature
2. **Use HTTPS**: Always use secure endpoints
3. **Timeout handling**: Set appropriate timeouts
4. **Retry logic**: Handle temporary failures

## Error Handling

Webhooks can fail. Implement:
- Retry logic (exponential backoff)
- Dead letter queues
- Manual retry UI
- Status polling fallback
        `,
    publishedAt: '2024-09-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['webhooks', 'async', 'integration'],
    keywords: [
      'screenshot webhook',
      'async screenshot API',
      'webhook notifications',
      'long-running screenshots',
    ],
    readingTime: 6,
  },
  {
    slug: 'image-optimization-screenshots',
    title: 'Optimizing Screenshot File Sizes for Web Performance',
    excerpt: 'Reduce screenshot file sizes without sacrificing quality. Essential techniques for web performance.',
    content: `
# Optimizing Screenshot File Sizes

Large screenshots can slow down your application. Here's how to optimize file sizes while maintaining quality.

## Format Selection

Choose the right format:

| Format | Best For | Typical Size |
|--------|----------|--------------|
| JPEG 80% | Photos, complex images | Small |
| PNG | Text, UI, transparency | Medium |
| WebP | Modern browsers | Smallest |

## JPEG Quality Settings

Find the right balance:

\`\`\`json
{
  "url": "https://example.com",
  "format": "jpeg",
  "quality": 80
}
\`\`\`

Quality recommendations:
- 60-70%: Thumbnails
- 80%: Standard web use
- 90%: High quality
- 100%: Archival

## Viewport Optimization

Capture only what you need:

\`\`\`json
{
  "url": "https://example.com",
  "viewport": {
    "width": 800,
    "height": 600
  }
}
\`\`\`

Smaller viewports = smaller files.

## Post-Processing

After capture:
1. Use image CDN (Cloudinary, imgix)
2. Serve responsive sizes
3. Enable lazy loading
4. Use next-gen formats (WebP, AVIF)

## Example: Responsive Delivery

\`\`\`html
<picture>
  <source 
    srcset="screenshot-400.webp 400w, screenshot-800.webp 800w"
    type="image/webp"
  >
  <img 
    src="screenshot-800.jpg" 
    loading="lazy"
    alt="Screenshot"
  >
</picture>
\`\`\`

## Compression Tools

Post-capture optimization:
- Sharp (Node.js)
- ImageMagick
- Squoosh
- TinyPNG API

## Caching Strategy

Reduce repeated captures:
- Cache by URL + options hash
- Set appropriate TTL
- Implement cache invalidation
        `,
    publishedAt: '2024-09-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tips',
    tags: ['performance', 'optimization', 'images'],
    keywords: [
      'screenshot optimization',
      'reduce screenshot size',
      'image compression API',
      'web performance screenshots',
    ],
    readingTime: 5,
  },
  {
    slug: 'multi-tenant-screenshot-architecture',
    title: 'Building Multi-Tenant Screenshot Services',
    excerpt: 'Architecture patterns for offering screenshot capabilities to multiple customers with proper isolation and billing.',
    content: `
# Multi-Tenant Screenshot Architecture

Building a SaaS that offers screenshots to customers? Here's how to architect multi-tenant screenshot services.

## Tenant Isolation

Each tenant needs:
- Separate API quotas
- Usage tracking
- Billing isolation
- Optional custom domains

## Request Attribution

Track which tenant made each request:

\`\`\`javascript
async function captureForTenant(tenantId, options) {
  // Check tenant quota
  const quota = await getQuota(tenantId);
  if (quota.remaining <= 0) {
    throw new Error('Quota exceeded');
  }

  // Capture screenshot
  const result = await screenshotly.capture(options);

  // Track usage
  await incrementUsage(tenantId, 1);

  return result;
}
\`\`\`

## Quota Management

Implement tiered quotas:

\`\`\`javascript
const PLANS = {
  starter: { monthly: 1000 },
  pro: { monthly: 10000 },
  enterprise: { monthly: 100000 }
};

async function checkQuota(tenantId) {
  const tenant = await getTenant(tenantId);
  const usage = await getMonthlyUsage(tenantId);
  const limit = PLANS[tenant.plan].monthly;
  
  return {
    used: usage,
    limit,
    remaining: limit - usage
  };
}
\`\`\`

## Billing Integration

Track for billing:
- Successful captures
- Failed attempts (optional)
- Storage used
- Bandwidth consumed

## White-Labeling

For enterprise customers:
- Custom domains
- Branded error pages
- Custom default settings
- Tenant-specific mockups

## Rate Limiting Per Tenant

Prevent one tenant from impacting others:
\`\`\`javascript
const rateLimit = new RateLimit({
  windowMs: 60000,
  max: (req) => getTenantRateLimit(req.tenantId),
  keyGenerator: (req) => req.tenantId
});
\`\`\`

## Monitoring & Alerts

Per-tenant monitoring:
- Usage dashboards
- Quota warnings
- Error rate alerts
- Performance metrics
        `,
    publishedAt: '2024-10-01T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'guide',
    tags: ['architecture', 'saas', 'multi-tenant'],
    keywords: [
      'multi-tenant screenshots',
      'SaaS screenshot architecture',
      'screenshot service design',
      'white-label screenshot API',
    ],
    readingTime: 8,
  },
  {
    slug: 'scheduled-screenshot-automation',
    title: 'Scheduled Screenshot Automation: Cron Jobs and Task Queues',
    excerpt: 'Set up automated scheduled screenshots using cron jobs, task queues, and serverless functions.',
    content: `
# Scheduled Screenshot Automation

Automate recurring screenshot captures with scheduled jobs. Perfect for monitoring, archiving, and reporting.

## Use Cases

- Daily website monitoring
- Weekly competitor checks
- Hourly price tracking
- Monthly compliance captures

## Implementation Options

### Option 1: Cron Jobs

Traditional server-based scheduling:

\`\`\`javascript
const cron = require('node-cron');

// Daily at midnight
cron.schedule('0 0 * * *', async () => {
  await captureDailyScreenshots();
});

// Every hour
cron.schedule('0 * * * *', async () => {
  await captureHourlyMonitoring();
});
\`\`\`

### Option 2: Serverless Functions

Use cloud triggers:

\`\`\`javascript
// Vercel Cron (vercel.json)
{
  "crons": [{
    "path": "/api/cron/screenshots",
    "schedule": "0 9 * * *"
  }]
}

// AWS EventBridge + Lambda
// CloudWatch Events trigger
\`\`\`

### Option 3: Task Queues

For complex scheduling:

\`\`\`javascript
// Bull Queue with repeatable jobs
const screenshotQueue = new Bull('screenshots');

screenshotQueue.add(
  'daily-capture',
  { urls: MONITOR_URLS },
  { 
    repeat: { cron: '0 9 * * *' },
    removeOnComplete: 100
  }
);
\`\`\`

## Managing Multiple Schedules

\`\`\`javascript
const schedules = [
  { name: 'competitors', cron: '0 */6 * * *', urls: COMPETITOR_URLS },
  { name: 'own-sites', cron: '*/15 * * * *', urls: OWN_URLS },
  { name: 'compliance', cron: '0 0 1 * *', urls: COMPLIANCE_URLS }
];

schedules.forEach(schedule => {
  cron.schedule(schedule.cron, () => captureUrls(schedule));
});
\`\`\`

## Error Handling

Handle failures gracefully:
- Retry failed captures
- Alert on repeated failures
- Store partial results
- Log for debugging

## Storage Strategy

Organize scheduled captures:
\`\`\`
/screenshots
  /daily
    /2024-01-15
      /competitor-1.png
      /competitor-2.png
  /monitoring
    /2024-01-15-09-00
      /site-1.png
\`\`\`

## Monitoring Your Schedules

Track job health:
- Success/failure rates
- Average capture time
- Queue length
- Missed schedules
        `,
    publishedAt: '2024-10-15T10:00:00Z',
    author: {
      name: 'Screenshotly Team',
    },
    category: 'tutorial',
    tags: ['automation', 'cron', 'scheduling'],
    keywords: [
      'scheduled screenshots',
      'cron screenshot automation',
      'automated website monitoring',
      'recurring screenshot capture',
    ],
    readingTime: 7,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) =>
      post.category === currentPost.category ||
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}
