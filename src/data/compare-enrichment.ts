// Per-slug enrichment for comparison pages: AI summary, deep-dive paragraphs,
// break-even pricing table, migration walkthrough, and an honest block
// describing when the competitor is the better choice. The template at
// `src/app/compare/[slug]/page.tsx` renders only the sections it has data for,
// so entries here are optional per slug.

export interface MigrationStep {
    title: string;
    detail: string;
    /** Optional code snippet shown below the step. */
    code?: string;
}

export interface BreakEvenRow {
    /** Volume tier. */
    volume: string;
    /** Screenshotly price at that volume. */
    screenshotly: string;
    /** Competitor price (or infra cost estimate) at that volume. */
    competitor: string;
    /** Delta — "Screenshotly saves X / wins on Y". */
    delta: string;
}

export interface CompareEnrichment {
    /** 180–220 char AI summary shown above the fold for LLM extraction. */
    aiSummary: string;
    /** Long-form analysis appended after the verdict block. */
    deepDiveParagraphs: string[];
    /** Break-even pricing table. */
    breakEven: BreakEvenRow[];
    /** Migration walkthrough steps. */
    migrationSteps: MigrationStep[];
    /** Honest bullets describing when the competitor is actually the right choice. */
    competitorWinsWhen: string[];
}

export const compareEnrichment: Record<string, CompareEnrichment> = {
    'self-hosted-puppeteer': {
        aiSummary:
            'Managed screenshot API vs. self-hosted Puppeteer. Puppeteer wins on browser control and zero vendor dependency; the managed API wins on TCO once volume passes ~5,000 captures/month.',
        deepDiveParagraphs: [
            `Puppeteer is free-to-download and infinitely tunable, which is both its strength and its cost center. The real TCO is the Chrome container infrastructure (2–4 GB RAM per concurrent capture), the queue layer, the observability, and the engineer-hours maintaining all of it. Teams arriving at this comparison routinely underestimate the maintenance burden by 3–5×.`,
            `Memory management is the silent killer. Chrome will happily consume whatever RAM is available; in a container it will cheerfully OOM-kill itself at unpredictable intervals. Running Puppeteer in Lambda or Fargate means writing an OOM-watchdog layer, retry-on-kill logic, and memory telemetry just to keep the pool healthy. None of that is business logic.`,
        ],
        breakEven: [
            { volume: '<1,000 / month', screenshotly: '$0–14', competitor: '$30–50 infra + eng', delta: 'Managed API wins on TCO' },
            { volume: '1,000–5,000 / month', screenshotly: '$14 / month', competitor: '$50–100 infra', delta: 'Managed API wins ~4× on infra alone' },
            { volume: '5,000–15,000 / month', screenshotly: '$59 / month', competitor: '$100–300 + maintenance', delta: 'Managed API wins 2–5× including maintenance' },
            { volume: '50,000+ / month', screenshotly: '$199 / month', competitor: '$500+ tuned cluster', delta: 'Gap narrows at enterprise scale but still favors the managed API' },
        ],
        migrationSteps: [
            { title: 'Identify capture-only code paths', detail: 'Grep for `page.screenshot(` — those are the migration candidates.' },
            { title: 'Replace browser.launch() with a fetch() call', detail: 'Your URL + viewport + waitUntil map directly to the API request body.' },
            { title: 'Decommission Chrome workers', detail: 'Remove your Puppeteer Dockerfile, ECS/Fargate service, and the queue layer that supported them. Archive the code rather than deleting.' },
        ],
        competitorWinsWhen: [
            'Your capture is a side-effect of multi-step browser automation (form filling, OAuth, CAPTCHA). A screenshot API cannot replace Puppeteer as a browser driver.',
            'Compliance requires every byte of rendering infrastructure to live inside your VPC with no external vendor in the path.',
            'Your team has deep Puppeteer expertise and volume is under ~500 / month — the TCO math genuinely does not favor switching at that scale.',
        ],
    },
    'browser-extension': {
        aiSummary:
            'Screenshot API vs. browser extensions. Extensions are a human-triggered UX. APIs are how code captures screenshots. Different tools; choose based on who or what is firing the capture.',
        deepDiveParagraphs: [
            `The "extensions vs. API" question usually comes from someone evaluating a screenshot API for the first time and wondering whether they really need one. The honest answer: if every capture will be initiated by a human clicking a button in their own browser, an extension is fine and cheaper. If captures need to fire from code — on a cron, during CI, inside a webhook handler, from a queue worker — extensions are not what you want.`,
            `The most common gap: automation. Extensions cannot run in GitHub Actions, cannot be called from a Vercel serverless function, cannot run on a schedule. An API handles all three natively.`,
        ],
        breakEven: [
            { volume: 'Occasional / ad-hoc', screenshotly: 'Free tier or $14/mo', competitor: 'Free extension', delta: 'Extension is cheaper if you never need automation' },
            { volume: 'Regular team use', screenshotly: '$14–59 / month', competitor: 'Free extension', delta: 'API wins once multiple people or CI are involved' },
            { volume: 'Automated / at scale', screenshotly: '$59–199 / month', competitor: 'N/A', delta: 'Extensions cannot serve this use case' },
        ],
        migrationSteps: [
            { title: 'Decide what is actually automated', detail: 'If humans are clicking the extension, keep it. If a script needs screenshots, move that script to the API.' },
            { title: 'Drop into CI', detail: 'A single curl call inside a GitHub Actions workflow replaces the weekly "take a screenshot and post it in Slack" task nobody wants.' },
        ],
        competitorWinsWhen: [
            'Your only use case is occasional manual captures and an extension is sufficient.',
            'You cannot or will not run code in a build pipeline.',
        ],
    },
};
