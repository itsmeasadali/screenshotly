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
