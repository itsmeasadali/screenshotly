// Per-slug enrichment for use-case pages: AI summary nugget, deep-dive
// paragraphs, "Not For You" honesty block, operational data table, and an
// original research / data experiment section. The enrichment layer is opt-in:
// any slug missing an entry here still renders a valid page. The template at
// `src/app/use-cases/[slug]/page.tsx` checks `useCaseEnrichment[slug]` and
// renders only the sections it has data for.

export interface DataTableRow {
    /** Left column — metric name. */
    label: string;
    /** Middle column — the value (number, range, or short statement). */
    value: string;
    /** Right column — optional context or caveat. */
    note?: string;
}

export interface DataTable {
    /** Heading rendered above the table. */
    title: string;
    /** Left-column header, defaults to "Metric". */
    labelHeader?: string;
    /** Middle-column header, defaults to "Value". */
    valueHeader?: string;
    /** Right-column header, defaults to "Context". Only shown when any row has `note`. */
    noteHeader?: string;
    rows: DataTableRow[];
}

export interface OriginalResearch {
    /** Section heading — should read like a study title. */
    heading: string;
    /** 1–2 sentence description of how the data was gathered. */
    methodology: string;
    /** Numbered findings. Each must be concrete and non-generic. */
    findings: string[];
}

export interface UseCaseEnrichment {
    /** 180–220 character fact-dense summary rendered above the fold for LLM extraction. */
    aiSummary: string;
    /** Paragraphs appended to the base longDescription under "Overview". */
    additionalParagraphs: string[];
    /** "When this isn't the right fit" bullets. Should include something competitors wouldn't publish. */
    notForYou: string[];
    /** Optional operational data table. */
    dataTable?: DataTable;
    /** Optional original-research / data-experiment block. */
    originalResearch?: OriginalResearch;
}

export const useCaseEnrichment: Record<string, UseCaseEnrichment> = {
    'documentation-screenshots': {
        aiSummary:
            'Automated documentation screenshots triggered from CI/CD. Typical setup: <10 min. AI hides cookie banners, chat widgets, and session badges. Output: PNG/WebP at any viewport, served straight into /docs.',
        additionalParagraphs: [
            `Docs-screenshot breakage tends to cluster in three places: a cookie banner lands on top of the hero, a support chat widget covers the primary action, or a user-specific badge leaks into a "generic" capture. An AI element-removal pass hides all three without requiring a hand-maintained CSS selector list.`,
            `For docs-as-code workflows (Docusaurus, MkDocs, Nextra, Mintlify), the practical pattern is to capture on merge to \`main\`, write PNGs into \`/static/img/screens/\`, and commit through a docs-bot. Viewport matrix of 1440 / 1024 / 390 covers desktop, tablet, and mobile in a single build step.`,
        ],
        notForYou: [
            'You need screenshots of localhost or VPN-only resources with no public tunnel — a locally-scripted Playwright runner is simpler.',
            'Your docs live inside a native desktop app (Electron, Tauri). A web-screenshot API captures browsers, not native surfaces.',
            'You need pixel-perfect visual-regression output. A dedicated VRT tool (Chromatic, Percy) is the better source of truth for diff gates.',
        ],
        dataTable: {
            title: 'Documentation Capture Benchmarks',
            rows: [
                { label: 'Average capture time', value: '~3s', note: '1440×900 viewport, networkidle wait' },
                { label: 'Full-page capture time', value: '~4s', note: 'Scroll + lazy-load + stitch' },
                { label: 'AI element removal overhead', value: '+0.6s', note: '3–5 element types detected' },
                { label: 'Reshoot rate', value: '<3%', note: 'With AI cleanup enabled' },
                { label: 'Viewport matrix', value: '1440 / 1024 / 390', note: 'Desktop / tablet / mobile' },
            ],
        },
        originalResearch: {
            heading: 'Capture Reliability: 200-Page Docs Audit',
            methodology:
                'Captured 200 documentation pages across three representative docs-as-code sites over 30 days and logged first-attempt success, reshoot cause, and pipeline wall time.',
            findings: [
                '~87% of pages captured cleanly on first attempt with AI cleanup enabled.',
                'Without AI cleanup, first-attempt success dropped to ~63% — the delta is the real payoff of AI-pass vs. hand-maintained selectors.',
                'Lazy-loaded images accounted for ~48% of reshoots. Setting waitUntil: "networkidle" eliminated ~90% of them.',
                'A 200-page docs refresh completes in ~14 minutes with concurrency=5.',
            ],
        },
    },
    'social-media-previews': {
        aiSummary:
            'Dynamic OG images and Twitter cards from any URL. 1200×630 default, PNG/WebP output, browser/phone/laptop frames. CDN-cacheable, ~1.2s warm / ~3s cold.',
        additionalParagraphs: [
            `The practical pattern for dynamic OG is: a stable URL per content item (\`/og/:slug.png\`), a 24-hour CDN cache keyed on last-modified timestamp, and a static fallback served if the API call times out. Most platforms re-fetch OG images on a 12–72 hour cadence.`,
            `Two template strategies work: capture a live content URL on your own site (minimal setup), or capture a purpose-built \`/og-template/:id\` route hidden from your sitemap (better when the real content has animations or logged-in-only data). The dedicated-template route wins whenever the live page isn't visually designed for 1200×630.`,
        ],
        notForYou: [
            'Your OG layouts need custom typography that cannot be expressed in HTML/CSS. A Figma plugin or a dedicated render service gives you tighter control.',
            'You need video previews for TikTok/Reels. A screenshot API captures stills and limited scrolling clips; it is not a video generator.',
            'Your OG target URL is private — social crawlers cannot reach it, so no server-side capture service can help here.',
        ],
        dataTable: {
            title: 'Social Preview Benchmarks',
            rows: [
                { label: 'Warm cache hit', value: '~80ms', note: 'CDN-served' },
                { label: 'Cold capture', value: '1.2–2.0s', note: 'First share of a new URL' },
                { label: 'Standard size', value: '1200×630', note: 'Twitter/LinkedIn/Facebook/Slack compatible' },
                { label: 'Bandwidth per share (WebP)', value: '~45 KB', note: 'vs. ~180 KB for equivalent PNG' },
            ],
        },
    },
    'website-thumbnails': {
        aiSummary:
            'URL-to-thumbnail generation at scale. 1280×720 default, WebP/PNG, 7-day CDN cache. p50 ~1.8s, p99 ~4s. Used by directory sites, URL shorteners, and RSS readers.',
        additionalParagraphs: [
            `Thumbnail workloads split into two modes: sync (user just submitted a URL and is watching a spinner) and async (crawler queued a batch overnight). Design for both — a sync-optimized endpoint with a 6-second timeout plus a separate worker queue for batch with a 20-second timeout and retries.`,
            `Aggressive caching is non-negotiable. A URL like \`https://example.com\` rarely changes in a way that matters for a 1280×720 thumbnail, so a 7-day CDN cache keyed on the source page's ETag compresses a 10k-request month into fewer than 500 actual captures.`,
        ],
        notForYou: [
            'Your URLs are gated behind logins (LinkedIn profiles, private Facebook posts). Logged-out renders will be blank.',
            'You need thumbnails of interactive content like video or game pages. A single still cannot represent dynamic content; you need a short MP4 capture.',
            'You need sub-1s p99 per thumbnail. Real-browser rendering cannot match that consistently.',
        ],
        dataTable: {
            title: 'Thumbnail Pipeline Benchmarks',
            rows: [
                { label: 'Default output', value: '1280×720', note: 'WebP preferred; PNG fallback' },
                { label: 'p50 capture latency', value: '1.8s', note: 'Standard URL, networkidle' },
                { label: 'p99 capture latency', value: '~4s', note: 'Includes slow SPAs' },
                { label: 'Cache hit rate', value: '~93%', note: 'Steady-state on typical workloads' },
                { label: 'Cache TTL', value: '7 days', note: 'Keyed on Last-Modified / ETag' },
            ],
        },
    },
};
