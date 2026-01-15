// Competitor comparison data for pSEO pages
export const comparisons = [
    {
        slug: 'screenshotapi',
        name: 'ScreenshotAPI',
        description: 'Compare Screenshotly with ScreenshotAPI. See how our AI-powered features, pricing, and developer experience stack up.',
        keywords: [
            'screenshotly vs screenshotapi',
            'screenshotapi alternative',
            'best screenshot API',
            'screenshot api comparison',
        ],
        competitor: {
            name: 'ScreenshotAPI',
            website: 'screenshotapi.net',
            pros: [
                'Established service',
                'Good uptime track record',
            ],
            cons: [
                'No AI-powered element removal',
                'Limited device mockups',
                'Higher pricing for volume',
            ],
        },
        screenshotly: {
            advantages: [
                'AI-powered cookie/popup removal',
                'Beautiful device mockups included',
                'More affordable pricing',
                'Modern developer experience',
                'Faster response times',
            ],
        },
        comparisonTable: [
            { feature: 'AI Element Removal', screenshotly: '✅ Built-in', competitor: '❌ Not available' },
            { feature: 'Device Mockups', screenshotly: '✅ iPhone, MacBook, Browser', competitor: '⚠️ Limited' },
            { feature: 'Free Tier', screenshotly: '✅ 500/day', competitor: '✅ 100/month' },
            { feature: 'Full Page Screenshots', screenshotly: '✅ Yes', competitor: '✅ Yes' },
            { feature: 'PDF Generation', screenshotly: '✅ Yes', competitor: '✅ Yes' },
            { feature: 'Custom Viewport', screenshotly: '✅ Yes', competitor: '✅ Yes' },
        ],
    },
    {
        slug: 'urlbox',
        name: 'Urlbox',
        description: 'Screenshotly vs Urlbox comparison. Discover why developers are switching to Screenshotly for their screenshot API needs.',
        keywords: [
            'screenshotly vs urlbox',
            'urlbox alternative',
            'urlbox comparison',
            'best screenshot api 2024',
        ],
        competitor: {
            name: 'Urlbox',
            website: 'urlbox.io',
            pros: [
                'Enterprise-grade service',
                'Good customization options',
            ],
            cons: [
                'Expensive for small projects',
                'No AI cleanup features',
                'Complex pricing structure',
            ],
        },
        screenshotly: {
            advantages: [
                'AI-powered automatic cleanup',
                'Simpler, transparent pricing',
                'Built-in device mockups',
                'Faster time-to-value',
                'Better free tier',
            ],
        },
        comparisonTable: [
            { feature: 'AI Element Removal', screenshotly: '✅ Built-in', competitor: '❌ Not available' },
            { feature: 'Starting Price', screenshotly: '✅ Free - $49/mo', competitor: '⚠️ $19+/mo' },
            { feature: 'Device Mockups', screenshotly: '✅ Included', competitor: '❌ Not included' },
            { feature: 'Retina Screenshots', screenshotly: '✅ Yes', competitor: '✅ Yes' },
            { feature: 'Blocking Resources', screenshotly: '✅ Yes', competitor: '✅ Yes' },
            { feature: 'Webhook Callbacks', screenshotly: '🔜 Coming soon', competitor: '✅ Yes' },
        ],
    },
    {
        slug: 'puppeteer',
        name: 'Puppeteer (Self-hosted)',
        description: 'Should you self-host Puppeteer or use Screenshotly? Compare maintenance costs, features, and time-to-value.',
        keywords: [
            'puppeteer alternative',
            'puppeteer vs api',
            'self hosted vs saas screenshot',
            'puppeteer screenshot service',
        ],
        competitor: {
            name: 'Puppeteer (Self-hosted)',
            website: 'pptr.dev',
            pros: [
                'Full control over infrastructure',
                'No per-screenshot costs',
                'Customizable to any need',
            ],
            cons: [
                'Significant DevOps overhead',
                'Chrome/Chromium maintenance',
                'Scaling is complex',
                'Memory management challenges',
                'No built-in AI features',
            ],
        },
        screenshotly: {
            advantages: [
                'Zero infrastructure to manage',
                'Built-in AI element removal',
                'Professional device mockups',
                'Instant scaling',
                'Better time-to-market',
            ],
        },
        comparisonTable: [
            { feature: 'Setup Time', screenshotly: '✅ 5 minutes', competitor: '⚠️ Hours/Days' },
            { feature: 'Maintenance', screenshotly: '✅ Zero', competitor: '❌ Ongoing' },
            { feature: 'AI Features', screenshotly: '✅ Built-in', competitor: '❌ DIY' },
            { feature: 'Scaling', screenshotly: '✅ Automatic', competitor: '⚠️ Manual' },
            { feature: 'Device Mockups', screenshotly: '✅ Included', competitor: '❌ DIY' },
            { feature: 'Cost at Scale', screenshotly: '⚠️ Per-screenshot', competitor: '✅ Fixed infra cost' },
        ],
    },
    {
        slug: 'playwright',
        name: 'Playwright (Self-hosted)',
        description: 'Playwright vs Screenshotly API. Compare the effort of self-hosting with the convenience of a managed screenshot service.',
        keywords: [
            'playwright alternative',
            'playwright screenshot api',
            'playwright vs api service',
            'playwright screenshot service',
        ],
        competitor: {
            name: 'Playwright (Self-hosted)',
            website: 'playwright.dev',
            pros: [
                'Cross-browser testing',
                'Great for E2E testing',
                'Active development',
            ],
            cons: [
                'Infrastructure overhead',
                'Browser management',
                'No mockup features',
                'Requires coding knowledge',
            ],
        },
        screenshotly: {
            advantages: [
                'API-first approach',
                'No infrastructure needed',
                'AI-powered cleanup',
                'Beautiful device mockups',
                'Faster integration',
            ],
        },
        comparisonTable: [
            { feature: 'Primary Use', screenshotly: '✅ Screenshots API', competitor: '✅ E2E Testing' },
            { feature: 'Infrastructure', screenshotly: '✅ Managed', competitor: '❌ Self-managed' },
            { feature: 'AI Features', screenshotly: '✅ Yes', competitor: '❌ No' },
            { feature: 'Device Mockups', screenshotly: '✅ Yes', competitor: '❌ No' },
            { feature: 'Learning Curve', screenshotly: '✅ Low', competitor: '⚠️ Medium' },
            { feature: 'Best For', screenshotly: '✅ Screenshot generation', competitor: '✅ Browser automation' },
        ],
    },
    {
        slug: 'selenium',
        name: 'Selenium (Self-hosted)',
        description: 'Moving from Selenium for screenshots? See how Screenshotly simplifies your workflow with a dedicated screenshot API.',
        keywords: [
            'selenium alternative',
            'selenium screenshot api',
            'selenium vs screenshot service',
            'selenium headless screenshot',
        ],
        competitor: {
            name: 'Selenium (Self-hosted)',
            website: 'selenium.dev',
            pros: [
                'Industry standard for testing',
                'Multi-language support',
                'Large community',
            ],
            cons: [
                'Heavy and slow',
                'Complex setup',
                'Maintenance burden',
                'Not optimized for screenshots',
            ],
        },
        screenshotly: {
            advantages: [
                'Purpose-built for screenshots',
                'Fast and lightweight',
                'No setup required',
                'AI cleaning features',
                'Professional mockups',
            ],
        },
        comparisonTable: [
            { feature: 'Purpose', screenshotly: '✅ Screenshot API', competitor: '⚠️ General automation' },
            { feature: 'Speed', screenshotly: '✅ Fast', competitor: '⚠️ Slower' },
            { feature: 'Setup', screenshotly: '✅ API key only', competitor: '❌ Complex' },
            { feature: 'AI Features', screenshotly: '✅ Yes', competitor: '❌ No' },
            { feature: 'Maintenance', screenshotly: '✅ Zero', competitor: '❌ High' },
            { feature: 'Resource Usage', screenshotly: '✅ Cloud-based', competitor: '❌ Resource heavy' },
        ],
    },
];

export type Comparison = (typeof comparisons)[number];
