// Competitor comparison data for `/compare/[slug]` pages. Each entry generates
// a static page at `/compare/<slug>` with its own breadcrumb + FAQPage JSON-LD.

export interface ComparisonFeatureRow {
    feature: string;
    /** String can include emoji indicators: ✅ / ❌ / ⚠️. */
    screenshotly: string;
    competitor: string;
}

export interface Comparison {
    /** URL segment. Lowercase kebab-case. */
    slug: string;
    /** Competitor product/tool name — rendered as "Screenshotly vs {name}". */
    name: string;
    /** Long-form description (H1 subtitle). */
    description: string;
    /** <=155 char meta description. */
    metaDescription?: string;
    /** Callout-styled summary near the top of the page. */
    quickSummary?: string;
    keywords?: string[];
    competitor: {
        name: string;
        website: string;
        pricing: string;
        pros: string[];
        cons: string[];
    };
    screenshotly: {
        advantages: string[];
    };
    comparisonTable: ComparisonFeatureRow[];
    /** "Choose Screenshotly if..." bullets. */
    screenshotlyAdvantagesVs?: string[];
    /** "Choose {competitor} if..." paragraph. */
    whenToChoose?: string;
    /** Wrap-up paragraph rendered at the bottom. */
    verdict?: string;
    faqs?: { question: string; answer: string }[];
}

export const comparisons: Comparison[] = [
    {
        slug: 'self-hosted-puppeteer',
        name: 'Self-Hosted Puppeteer',
        description:
            'Compare using a managed screenshot API against running Puppeteer yourself. The trade-off: upfront simplicity vs. long-term operational cost.',
        metaDescription:
            'Managed screenshot API vs. self-hosted Puppeteer: TCO, memory management, Chrome version drift, operational burden. Break-even math + migration steps.',
        quickSummary:
            'Puppeteer is free to download but not free to operate. A managed screenshot API is almost always cheaper than self-hosting at >5,000 captures per month once you price in engineering time.',
        keywords: ['puppeteer alternative', 'screenshot api vs puppeteer', 'managed screenshot api'],
        competitor: {
            name: 'Puppeteer',
            website: 'pptr.dev',
            pricing: 'Open source (infra + engineering cost)',
            pros: [
                'Full browser control — click, type, navigate',
                'Zero vendor dependency',
                'No per-capture pricing',
            ],
            cons: [
                'You own the Chrome container infrastructure',
                'Memory management and OOM recovery is your problem',
                'Chrome version drift requires ongoing maintenance',
            ],
        },
        screenshotly: {
            advantages: [
                'Hosted infrastructure — no Chrome containers to operate',
                'AI element removal included (cookie banners, chat widgets)',
                'Device mockup frames available as a first-class feature',
                'Predictable pricing that scales with usage, not engineering time',
            ],
        },
        comparisonTable: [
            { feature: 'Setup time', screenshotly: '<5 min', competitor: 'Hours to days' },
            { feature: 'Chrome updates', screenshotly: 'Managed', competitor: 'Your responsibility' },
            { feature: 'AI element removal', screenshotly: '✅ Built-in', competitor: '❌ DIY' },
            { feature: 'Device mockups', screenshotly: '✅ Built-in', competitor: '❌ DIY' },
            { feature: 'Horizontal scaling', screenshotly: 'Automatic', competitor: 'Queue + worker pool' },
            { feature: 'Browser interactions', screenshotly: '⚠️ Limited', competitor: '✅ Full control' },
        ],
        screenshotlyAdvantagesVs: [
            'You want to skip the operational burden of running headless Chrome',
            'You care about screenshot output, not browser automation',
            'Your capture volume is at a point where infra + maintenance exceeds a hosted plan',
        ],
        whenToChoose:
            'Puppeteer is the right call when you need browser interactions that go beyond capture — clicking through forms, solving CAPTCHAs via a third-party API, or authenticating through OAuth flows that a hosted API cannot replicate. It is also the right call when compliance requires every byte of rendering infrastructure to live inside your VPC.',
        verdict:
            'Choose a managed API when your need is "URL in, image out" and you want to stop operating Chrome. Choose Puppeteer when you need full browser-automation capability or strict on-prem requirements.',
        faqs: [
            {
                question: 'At what volume does self-hosted Puppeteer become more expensive than a managed API?',
                answer:
                    'Roughly 5,000 captures per month is the common break-even once you include a modest amount of engineering maintenance time. Below that, self-hosting can be cheaper; above, a hosted plan wins on TCO.',
            },
            {
                question: 'Can I migrate incrementally?',
                answer:
                    'Yes. Most teams keep Puppeteer for workflows that need browser interactions and route pure-capture jobs to a hosted API. The two can coexist indefinitely.',
            },
            {
                question: 'What about security — is running Chrome in our VPC safer than calling a managed API?',
                answer:
                    'For captures of first-party URLs you fully control, in-VPC rendering is straightforwardly safer. For captures of third-party URLs (competitor sites, customer-submitted links, open web), a managed API is actually the safer posture because the browser — and any SSRF or DNS-exfiltration risk it carries — lives outside your perimeter.',
            },
            {
                question: 'How much RAM does a Puppeteer worker actually need in production?',
                answer:
                    'Plan for 2–4 GB RAM per concurrent capture. A 10-concurrent worker realistically needs 20–40 GB in steady state plus headroom for OOM recovery. On AWS Fargate or ECS this typically lands at $150–400/month for a cluster that can sustain 10–15,000 captures/month.',
            },
            {
                question: 'Does Screenshotly support every Puppeteer feature?',
                answer:
                    'The capture-shaped subset yes — viewport, full-page, networkidle wait, cookie injection, selector-based waits, PDF output. The browser-automation subset no — you cannot drive Screenshotly through a multi-step form, solve a CAPTCHA, or scrape behind a login flow. If your workflow needs those, Puppeteer is genuinely the right tool.',
            },
        ],
    },
    {
        slug: 'browser-extension',
        name: 'Browser Extensions',
        description:
            'Browser extensions are fine for one-off captures. A screenshot API is what you reach for once you need scheduling, CI integration, or programmatic access.',
        metaDescription:
            'Screenshot API vs. browser extensions: when automation, CI integration, and scheduled captures justify an API. Feature gaps and migration path.',
        quickSummary:
            'Extensions are a human-triggered tool. APIs are how your code captures screenshots. They solve different problems.',
        keywords: ['screenshot api vs extension', 'programmatic screenshot'],
        competitor: {
            name: 'Browser Extensions',
            website: 'chrome.google.com/webstore',
            pricing: 'Free / one-time purchase',
            pros: [
                'Zero setup — install and click',
                'Free for personal use',
                'Useful for ad-hoc captures',
            ],
            cons: [
                'Manual trigger — no automation',
                'Cannot run in CI/CD',
                'Limited programmatic control over viewport, wait strategies, or output format',
            ],
        },
        screenshotly: {
            advantages: [
                'REST API — call from any language or CI system',
                'Programmatic viewport control and wait strategies',
                'Output to PNG, JPEG, WebP, or PDF from one endpoint',
                'Works in scheduled jobs, serverless functions, and queue workers',
            ],
        },
        comparisonTable: [
            { feature: 'Automation', screenshotly: '✅ Full API', competitor: '❌ Manual only' },
            { feature: 'CI/CD usable', screenshotly: '✅ Yes', competitor: '❌ No' },
            { feature: 'Programmatic viewport', screenshotly: '✅ Yes', competitor: '⚠️ Preset sizes only' },
            { feature: 'PDF output', screenshotly: '✅ Yes', competitor: '⚠️ Varies by extension' },
            { feature: 'Zero setup for a one-off', screenshotly: '⚠️ Requires an account', competitor: '✅ Install-and-go' },
        ],
        verdict:
            'Use a browser extension when you need one screenshot right now. Use a screenshot API when you need screenshots on a schedule, from code, or integrated into a pipeline.',
        faqs: [
            {
                question: 'Can I use both?',
                answer:
                    'Yes, the two are not mutually exclusive. Many developers keep an extension installed for ad-hoc captures and use an API for automated workflows that run from code, CI pipelines, or scheduled cron jobs.',
            },
            {
                question: 'When is a browser extension clearly the right choice?',
                answer:
                    'When every capture will be initiated by a human clicking a button in their own browser. If nobody needs to automate, schedule, or trigger captures from a server or CI job, an extension is simpler and usually free.',
            },
            {
                question: 'What does an API give me that an extension cannot?',
                answer:
                    'Programmatic access, scheduled captures, CI/CD integration, webhook-triggered workflows, consistent output across browsers and viewports, and bulk operations. Extensions run inside one user\'s browser, so they cannot serve any of those needs.',
            },
            {
                question: 'Do API captures and extension captures produce identical images?',
                answer:
                    'Not quite. Extensions use the installed browser\'s exact rendering (including user-specific extensions, fonts, and logged-in state). An API uses a clean headless browser with a consistent environment. For marketing and documentation captures, the API\'s deterministic output is usually preferable; for capturing the user\'s actual personalized view, an extension is the right call.',
            },
            {
                question: 'Is there a cost threshold where an API becomes worth it?',
                answer:
                    'Most teams find the break-even is not about volume but about whether captures need to fire from code. The moment a capture needs to be triggered by a deploy, a webhook, a user action in your product, or a scheduled job, an extension cannot serve that and the cost of the API is justified — often at under $14/month.',
            },
        ],
    },
];
