// Use-case definitions for programmatic SEO pages rendered at `/use-cases/[slug]`.
// Every entry becomes a static page with breadcrumb, FAQPage, and HowTo JSON-LD.
// Add new use-cases by appending to the `useCases` array — keep slugs kebab-case
// and register a NOINDEX flag in the page route if the content is too thin to
// merit indexing.

export interface UseCase {
    /** URL segment. Lowercase kebab-case. Used for route generation and canonicals. */
    slug: string;
    /** Meta description (<=155 chars). Rendered in <head> and SERPs. */
    metaDescription?: string;
    /** H1 and page title. */
    title: string;
    /** Short form used in breadcrumbs and CTAs. */
    shortTitle: string;
    /** One-sentence summary. Rendered as the page subtitle. */
    description: string;
    /** Prose explanation rendered as paragraphs under the "Overview" H2. */
    longDescription?: string;
    /** Lucide icon name used in index cards (optional — falls back to a default). */
    icon?: string;
    /** SEO keywords — not rendered, but kept for internal reference. */
    keywords?: string[];
    /** 3-5 concrete benefits, one sentence each. Rendered as a check-mark grid. */
    benefits: string[];
    /** Step-by-step workflow. Used for on-page rendering and HowTo JSON-LD. */
    steps?: string[];
    /** Metric stat cards. Each pair renders as a large stat + label. */
    metrics?: { stat: string; label: string }[];
    /** Inline code sample shown in a syntax-highlighted block. */
    codeExample: string;
    /** Q&A pairs rendered at the bottom + emitted as FAQPage JSON-LD. */
    faqs?: { question: string; answer: string }[];
}

export const useCases: UseCase[] = [
    {
        slug: 'documentation-screenshots',
        metaDescription:
            'Automate documentation screenshots from your CI/CD pipeline. AI removes cookie banners and chat widgets; PNG/WebP output lands in /docs on every deploy.',
        title: 'Documentation Screenshots',
        shortTitle: 'Documentation',
        description:
            'Automate screenshot capture for technical documentation so your screens stay in sync with the shipping UI.',
        longDescription: `Outdated screenshots are one of the biggest pain points in technical documentation. When your UI evolves but your docs don't, users get confused and support tickets pile up.

Running a screenshot API as part of your CI/CD pipeline lets you trigger captures automatically whenever your application deploys. README files, API docs, user guides, and help articles stay visually accurate without manual work.

AI-powered element removal keeps the output clean and professional by hiding cookie banners, chat widgets, and promotional overlays that would otherwise leak into screenshots.`,
        icon: 'FileText',
        keywords: [
            'documentation screenshots',
            'automated docs images',
            'readme screenshots',
        ],
        benefits: [
            'Capture UI changes automatically on every deploy',
            'Keep screenshots synchronized with releases',
            'Generate consistent, professional images',
            'Integrate with GitHub Actions, GitLab CI, and similar pipelines',
        ],
        steps: [
            'Add a screenshot-capture step to your CI/CD workflow',
            'Define the pages and viewport sizes you want to capture',
            'Call the screenshot API with your target URLs',
            'Save the returned images into your docs repository',
            'Commit and push the updated screenshots automatically',
        ],
        metrics: [
            { stat: '~3s', label: 'average capture time per page' },
            { stat: '<3%', label: 'reshoot rate with AI cleanup' },
            { stat: 'CI/CD', label: 'runs on every deploy' },
        ],
        codeExample: `// Capture a documentation screenshot
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-app.example.com/dashboard',
    device: 'desktop',
    format: 'png',
    aiRemoval: { enabled: true, types: ['cookie-banner', 'chat-widget'] },
  }),
});`,
        faqs: [
            {
                question: 'How do I integrate screenshot capture into my CI/CD pipeline?',
                answer:
                    'Add a capture step after your deploy step. The API is a single POST request — any CI system that can make HTTP calls (GitHub Actions, GitLab CI, CircleCI, Jenkins) can run it.',
            },
            {
                question: 'Can I capture authenticated pages?',
                answer:
                    'Yes. Pass session cookies or custom headers in the API request. A short-lived read-only token is the recommended pattern for CI captures.',
            },
            {
                question: 'What image format should I use?',
                answer:
                    'PNG for lossless fidelity; WebP for a smaller file with comparable quality; PDF for archival docs where selectable text matters.',
            },
        ],
    },
    {
        slug: 'social-media-previews',
        metaDescription:
            'Generate dynamic Open Graph images and Twitter cards from any URL. CDN-cacheable PNGs with browser mockups, 1200x630 default, sub-2-second cold captures.',
        title: 'Social Media Previews',
        shortTitle: 'Social Media',
        description:
            'Generate link previews and social cards programmatically so every shared URL looks polished in Slack, iMessage, Twitter, and LinkedIn.',
        longDescription: `When someone shares your link on Twitter, LinkedIn, Slack, or Discord, the preview image is often the difference between a click and a scroll. Generic or broken previews kill engagement.

A screenshot API lets you generate dynamic Open Graph images programmatically — instead of hand-crafting static \`og:image\` files for every page, you capture a live screenshot of the content and serve it as the preview. This works especially well for blogs, product pages, and user-generated content.

Add a browser or device frame to the capture and the shared card looks premium without any per-post design work.`,
        icon: 'Share2',
        keywords: ['og image generator', 'link preview generator', 'twitter card generator'],
        benefits: [
            'Generate OG images dynamically per page',
            'Produce Twitter and LinkedIn cards automatically',
            'Keep branding consistent across shared links',
            'Boost click-through on social media',
        ],
        steps: [
            'Decide which pages need dynamic previews',
            'Create an endpoint on your site that generates the OG image URL',
            'Call the screenshot API with the page URL and any frame preset',
            'Cache the returned image with a 24-hour TTL',
            'Reference the cached image in your og:image meta tag',
        ],
        metrics: [
            { stat: '1200×630', label: 'standard OG image size' },
            { stat: '~1.2s', label: 'warm-cache capture time' },
            { stat: '24h', label: 'recommended cache TTL' },
        ],
        codeExample: `// Generate a dynamic OG image
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-blog.example.com/post/hello-world',
    device: 'desktop',
    format: 'png',
    viewport: { width: 1200, height: 630 },
    mockup: 'browser-light',
  }),
});`,
        faqs: [
            {
                question: 'What image size should I use for social previews?',
                answer:
                    '1200×630 (1.91:1 aspect ratio) works well across Facebook, Twitter/X, LinkedIn, Slack, Discord, and iMessage.',
            },
            {
                question: 'How aggressively should I cache the generated images?',
                answer:
                    'A 24-hour CDN TTL is usually safe. Most social platforms re-fetch the image on a 12–72 hour cadence, so the cache rarely has to match theirs.',
            },
            {
                question: 'Can I add device mockups to shared previews?',
                answer:
                    'Yes. Wrapping a capture in a browser frame, phone, or laptop mockup often lifts click-through materially for product-focused shares.',
            },
        ],
    },
    {
        slug: 'website-thumbnails',
        metaDescription:
            'URL-to-thumbnail generation at scale. 1280x720 WebP/PNG output, aggressive caching, sub-4s p99 latency. Used by directories, URL shorteners, RSS readers.',
        title: 'Website Thumbnails',
        shortTitle: 'Thumbnails',
        description:
            'Generate high-quality website thumbnails programmatically. A common building block for directory sites, URL shorteners, and link-preview services.',
        longDescription: `Any product that displays user-submitted or curated URLs benefits from a thumbnail preview — directory sites, URL shorteners, RSS readers, bookmarking apps. Without one, a list of URLs is just text.

A screenshot API is the canonical way to produce these at scale. Request a capture on first display, cache aggressively, and fall back to the page's \`og:image\` meta tag for URLs that fail to render cleanly.`,
        icon: 'Image',
        keywords: ['website thumbnail generator', 'url thumbnail api'],
        benefits: [
            'Generate thumbnails on first display, cache thereafter',
            'Works across any public URL',
            'Graceful fallback for hostile sites (paywalls, anti-bot blocks)',
            'WebP output is ~75% smaller than PNG',
        ],
        steps: [
            'On URL submission, fire a capture request',
            'Show a skeleton preview while capture is in flight',
            'Cache the final image on a CDN with a 7-day TTL',
            'Regenerate when the source page Last-Modified changes',
        ],
        metrics: [
            { stat: '1280×720', label: 'default output size' },
            { stat: '~1.8s', label: 'p50 capture latency' },
            { stat: '~93%', label: 'cache hit rate at steady state' },
        ],
        codeExample: `// Generate a website thumbnail
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    format: 'webp',
    viewport: { width: 1280, height: 720 },
    fullPage: false,
  }),
});`,
        faqs: [
            {
                question: 'How fast can the thumbnail pipeline run?',
                answer:
                    'p50 ~1.8 seconds, p99 ~3–4 seconds for live captures. Cached hits return in under 100ms from your CDN.',
            },
            {
                question: 'What happens when a URL blocks headless browsers?',
                answer:
                    'Fall back to the page\'s og:image meta tag if one is set; otherwise serve a branded placeholder. This pattern covers roughly 99% of the long tail.',
            },
            {
                question: 'Should I use PNG or WebP?',
                answer:
                    'WebP for in-page previews — smaller file, equivalent quality. PNG when you need wider client compatibility or lossless output.',
            },
        ],
    },
];
