// Per-integration enrichment: AI summary, production-notes deep-dive, error
// handling recipes, a hardening checklist, and a rate-limit strategy. The
// template at `src/app/integrations/[slug]/page.tsx` renders enrichment only
// when a matching entry exists for the current slug.

export interface ErrorHandlingCase {
    /** Error condition name (e.g. "HTTP 429"). */
    condition: string;
    /** Concrete strategy, not a platitude. */
    strategy: string;
    /** Optional code snippet. */
    code?: string;
}

export interface IntegrationEnrichment {
    /** 180–220 char AI summary. */
    aiSummary: string;
    /** Deep-dive paragraphs appended after "When to use". */
    deepDiveParagraphs: string[];
    /** Error handling recipes. */
    errorHandling: ErrorHandlingCase[];
    /** Production hardening checklist — the difference between dev code and prod code. */
    productionChecklist: string[];
    /** Rate-limit strategy for this runtime/platform. */
    rateLimitStrategy: string;
    /** "When this runtime isn't the right fit" honesty block (E-E-A-T trust signal). */
    notForYou?: string[];
}

export const integrationEnrichment: Record<string, IntegrationEnrichment> = {
    nodejs: {
        aiSummary:
            'Server-side Node.js screenshot capture for batch jobs, queue workers, and API endpoints. Use native fetch (Node 18+) or undici. Concurrency-bound via p-limit; stream large bodies to storage.',
        deepDiveParagraphs: [
            `Node.js is the most common runtime for screenshot integration because most backend pipelines that generate screenshots already live in the same process as the app that triggered them. The core primitive is a single fetch() call with the image returned as a buffer. What elevates production code from dev code is everything around that call: connection reuse, concurrency control, retry semantics, and stream handling for large outputs.`,
            `For batch jobs, cap parallel captures with p-limit at 5–10. Without a limiter, a naive \`Promise.all()\` over 1,000 URLs will open 1,000 concurrent requests, breach rate limits, and likely crash with memory pressure.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 401 / 403',
                strategy:
                    'Log the masked API key prefix; do not retry. Alert on-call if seen in production — usually indicates a rotated or misconfigured secret.',
            },
            {
                condition: 'HTTP 429',
                strategy:
                    'Exponential backoff respecting the Retry-After header. For queue workers, requeue the job rather than blocking the worker thread.',
                code: `if (res.status === 429) {
  const retryAfter = parseInt(res.headers.get('retry-after') || '1', 10);
  await new Promise(r => setTimeout(r, retryAfter * 1000));
  return capture(url, attempt + 1);
}`,
            },
            {
                condition: 'Response body too large for memory',
                strategy:
                    'Stream response.body directly to S3/GCS upload instead of buffering. Saves ~100 MB peak memory on the largest captures.',
            },
        ],
        productionChecklist: [
            'Use native fetch (Node 18+) or undici directly. node-fetch is deprecated for new projects.',
            'Bound concurrency with p-limit or similar (default 5–10).',
            'Stream large response bodies to storage rather than buffering.',
            'Retry 5xx with jittered exponential backoff; never retry 4xx other than 429.',
            'Ack queue messages after persist, not after capture.',
            'Handle SIGTERM gracefully — drain in-flight captures before exit.',
        ],
        rateLimitStrategy:
            'Respect the rate-limit headers on every response (X-RateLimit-Remaining, X-RateLimit-Reset). For multi-worker deployments, coordinate via Redis — otherwise each worker will hammer the API independently.',
        notForYou: [
            'Your runtime is Deno or Bun and you need exact Node compatibility — the fetch API is similar but not identical; audit before porting production code.',
            'You run exclusively in AWS Lambda with sub-512MB memory and need full-page captures of large SPAs — memory pressure can OOM-kill short-lived containers.',
            'You need to drive a multi-step browser automation flow (form fills, OAuth) — that is Playwright territory, not screenshot API territory.',
        ],
    },
    python: {
        aiSummary:
            'Python capture via requests or httpx. Use requests for sync cron scripts and Django views. Use httpx + asyncio for anything concurrent. Always capture inside a background job, never inline in a request handler.',
        deepDiveParagraphs: [
            `Python has two legitimate paths: \`requests\` for sync scripts and classic Flask/Django views, and \`httpx\` for FastAPI and anything async. \`requests\` remains fine for cron and batch scripts. \`httpx\` is the right call anywhere concurrency matters.`,
            `For Django, never call the API inline in a \`save()\` method — offload to Celery or django-q. An inline capture blocks the request thread for several seconds and destroys p99 response time.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy:
                    'For Celery tasks, raise self.retry(countdown=retry_after) instead of blocking. For sync scripts, parse Retry-After and sleep.',
                code: `if response.status_code == 429:
    retry_after = int(response.headers.get('Retry-After', 1))
    raise self.retry(countdown=retry_after, max_retries=3)`,
            },
            {
                condition: 'HTTP 5xx',
                strategy: 'Tenacity-backed retry with exponential backoff, 3 attempts max. Do not retry 4xx other than 429.',
            },
        ],
        productionChecklist: [
            'Reuse httpx.AsyncClient or requests.Session across calls — never per-request instances.',
            'All captures run in a Celery/RQ task or asyncio worker — never inline in a web request.',
            'Tenacity handles 5xx with jittered exponential backoff.',
            'Bound concurrency with asyncio.Semaphore(5) for batch work.',
            'Stream response bodies for captures >5 MB.',
        ],
        rateLimitStrategy:
            'Use aiolimiter or limits to cap requests-per-second at ~half the published rate limit, leaving headroom for retry traffic. For multi-worker deployments, coordinate via Redis.',
        notForYou: [
            'You need GIL-free parallelism beyond what asyncio provides — consider Go or Rust for heavy concurrent capture workloads.',
            'Your Django app has no background job infrastructure and you are not willing to add Celery or django-q. Inline capture in views is a reliability footgun; skip this stack until the queue layer exists.',
            'You need browser-automation flows like login, form submission, or element interaction. Use Playwright for Python instead.',
        ],
    },
    curl: {
        aiSummary:
            'cURL for shell scripts, cron jobs, CI/CD smoke tests, and one-off testing. Use --retry for resilience and --output for direct-to-file. Not recommended inside application servers.',
        deepDiveParagraphs: [
            `cURL is the right tool for quick validation, cron-driven batch captures, and CI/CD smoke tests. It is the wrong tool inside an application server — you lose structured error handling, proper retry semantics, and any ability to integrate with your app's logging.`,
            `In CI/CD, cURL is ideal for post-deploy smoke tests: capture the homepage after deploy, diff against a known-good baseline using ImageMagick's \`compare\`, fail the pipeline on significant pixel diff.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy: 'Use --retry combined with --retry-delay. cURL respects Retry-After headers automatically with --retry.',
                code: `curl -X POST https://api.screenshotly.app/screenshot \\
  -H "Authorization: Bearer $API_KEY" \\
  --retry 3 --retry-delay 2 --retry-max-time 60 \\
  --fail --output screenshot.png`,
            },
            {
                condition: 'Timeout (exit code 28)',
                strategy: 'Combine --max-time 30 with --connect-timeout 5. In scripts, log and continue; let cron retry on the next run.',
            },
        ],
        productionChecklist: [
            'Always pass --fail so non-2xx statuses exit non-zero.',
            '--retry 3 --retry-delay 2 --retry-max-time 60 provides resilience.',
            '--max-time 30 (or higher for PDF/full-page) bounds the total call.',
            'API key from env var ($API_KEY), never hardcoded.',
            'For batches, GNU Parallel or xargs -P caps concurrency.',
        ],
        rateLimitStrategy:
            'Use GNU Parallel -j 4 or xargs -P 4 to cap concurrency at 4–5 parallel cURL invocations. For large batches, sleep 1 between iterations as a cheap throttle.',
        notForYou: [
            'Your capture logic belongs inside an application server — use the native HTTP client for that language instead. cURL inside system() calls loses structured error handling and observability.',
            'Your batch exceeds ~100 URLs per run — bash loops become a maintenance burden that a real scripting language (Python, Node) handles more cleanly.',
            'You need retry logic more sophisticated than cURL\'s --retry flag — custom backoff with jitter, circuit breakers, observability integration — all belong in a real HTTP client.',
        ],
    },
    javascript: {
        aiSummary:
            'Browser JavaScript capture via Fetch API. Key risks: exposing API keys in client code and CORS. Production pattern: proxy through a thin backend endpoint that holds the secret.',
        deepDiveParagraphs: [
            `The single biggest mistake on client-side JavaScript integration is embedding the API key in a public bundle. Every \`fetch()\` call from the browser sends the Authorization header over the wire where any user can open DevTools and copy it. The production pattern is always a thin backend proxy: your React/Vue/Next.js app calls your own \`/api/screenshot\` route, which adds the Bearer token server-side and forwards the request.`,
            `For SPAs that capture on user action, use \`AbortController\` to cancel the request when the user navigates away or triggers a new capture. Without cancellation, stale captures from an abandoned navigation can race-condition into the UI after the user has moved on.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 401 / 403',
                strategy:
                    'Surface as a developer-facing error, not user-facing. In production, this usually means the backend proxy failed to inject the token — log the env var name, not the value.',
            },
            {
                condition: 'HTTP 429',
                strategy:
                    'Read Retry-After header and retry with exponential backoff (1s, 2s, 4s, 8s max). If user-initiated, show a "high demand, retrying..." state.',
                code: `if (response.status === 429) {
  const retryAfter = parseInt(response.headers.get('Retry-After') || '1', 10);
  await new Promise(r => setTimeout(r, retryAfter * 1000));
  return captureScreenshot(url);
}`,
            },
            {
                condition: 'Network timeout',
                strategy:
                    'Native fetch has no timeout. Use AbortController with a 30-second timeout for full-page captures, 10-second for viewport captures.',
            },
        ],
        productionChecklist: [
            'API key lives in a server-side env var only — never in the client bundle or localStorage.',
            'Backend proxy endpoint validates the caller (auth, per-user rate limit) before forwarding.',
            'AbortController cancels in-flight captures on navigation or new capture trigger.',
            'Blob URLs are revoked with URL.revokeObjectURL() when no longer needed.',
            'Captures are debounced when bound to user input (URL field typing).',
            'A loading state handles captures >5s so users do not think the app froze.',
        ],
        rateLimitStrategy:
            'Enforce per-user rate limits in your proxy endpoint (e.g. 10 captures/minute/user) before the request reaches Screenshotly. This protects your paid quota from abusive users and keeps API usage predictable. Use a sliding-window counter in Redis.',
        notForYou: [
            'You are building a static site with no backend — you cannot hide the API key safely and need to either add a serverless proxy route (Vercel/Netlify functions) or skip client-initiated capture entirely.',
            'Your app is a pure mobile React Native or Ionic app — the browser Fetch patterns need adaptation for the native environment; use a backend-issued presigned capture URL instead.',
            'You need synchronous in-page capture without any backend. That is the one workflow a browser extension serves better than a JS-calls-API pattern.',
        ],
    },
    php: {
        aiSummary:
            'PHP capture via Guzzle or cURL. Common in Laravel, Symfony, and WordPress. Always run captures in a queued job (Laravel Queue, Symfony Messenger, Action Scheduler) — never inline in a controller.',
        deepDiveParagraphs: [
            `In modern PHP (Laravel 10+, Symfony 6+), the clean pattern is Guzzle as the HTTP client and a queued job for the capture itself. Inline controller capture blocks the PHP-FPM worker for 2–5 seconds, which saturates worker pools under even modest traffic and produces 502s.`,
            `For WordPress, the appropriate hook is typically \`save_post\` or \`publish_post\`. Trigger the capture asynchronously via Action Scheduler (Woo bundles it) or defer via \`wp_schedule_single_event()\`. WP-Cron alone is unreliable on low-traffic sites because it only fires on page load.`,
            `Guzzle's \`sink\` option streams the response body directly to a file path — critical for large captures. Avoid \`getBody()->getContents()\` on multi-MB PDFs or full-page PNGs; PHP-FPM memory limits will starve the worker.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy: 'For Laravel queues, use $this->release($retryAfter) to requeue with delay rather than blocking.',
                code: `if ($response->getStatusCode() === 429) {
    $retryAfter = (int) $response->getHeaderLine('Retry-After');
    $this->release($retryAfter);
    return;
}`,
            },
            {
                condition: 'GuzzleHttp\\Exception\\ServerException (5xx)',
                strategy: 'Use Guzzle retry middleware with exponential backoff — avoid hand-rolling retry logic in each call site.',
            },
            {
                condition: 'Response too large for memory_limit',
                strategy: "Use Guzzle's sink option: `new Client(['sink' => $path])`. Never `getBody()->getContents()` on large captures.",
            },
        ],
        productionChecklist: [
            'Capture runs in a queued job (Laravel Queue, Symfony Messenger, Action Scheduler) — never inline.',
            'Guzzle client instantiated once in the service container and reused.',
            'Response streamed to S3/filesystem via sink, not buffered.',
            'Queue job has tries=3 and backoff configured.',
            'API key stored in config/services (never .env in repo, never hardcoded).',
            'Laravel Horizon or equivalent monitors queue throughput and failed jobs.',
        ],
        rateLimitStrategy:
            "Cap captures per authenticated user at ~20/hour using Laravel's RateLimiter facade or Symfony's rate-limiter component (Redis-backed). At the worker level, configure Horizon/Messenger so parallel workers × requests/sec stays below your plan's QPS.",
        notForYou: [
            'Your WordPress install has no queue infrastructure (no Action Scheduler, no external cron). On low-traffic sites, WP-Cron fires unreliably — scheduled captures will be late or skipped.',
            'You run a Laravel app on shared hosting without Supervisor or similar process manager. Queue workers need to stay alive, and that is not feasible without proper process supervision.',
            'You need async HTTP with fiber-level concurrency. PHP is moving toward this with Swoole/OpenSwoole, but mainstream hosting is still request-per-process — scale concurrency via more workers, not per-worker fibers.',
        ],
    },
    ruby: {
        aiSummary:
            'Ruby capture via Faraday (preferred) or Net::HTTP. The Rails pattern: Sidekiq/GoodJob performs the capture, ActiveStorage persists the result. Never capture inline in a controller.',
        deepDiveParagraphs: [
            `In Rails, the non-negotiable rule is: captures happen in a background job, never in a controller action. Inline capture ties up a Puma/Unicorn worker for 2–5 seconds and destroys throughput under load. The typical shape: controller enqueues \`ScreenshotJob.perform_later(post)\`; the job runs Faraday against the API; ActiveStorage attaches the returned image to the model.`,
            `Faraday is the preferred HTTP client because its middleware stack handles retries, error normalization, and response parsing cleanly. Build a dedicated \`ScreenshotlyClient\` service object owning a single Faraday instance (retry middleware, timeout, error handling) and inject it into any job that needs captures.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy: 'For Sidekiq, raise a rate-limit error to trigger job retry with backoff. Configure sidekiq_retry_in to respect Retry-After.',
                code: `class ScreenshotJob
  include Sidekiq::Job
  sidekiq_retry_in do |count, exception|
    exception.is_a?(RateLimitError) ? exception.retry_after : (count ** 2) + 5
  end
end`,
            },
            {
                condition: 'Faraday::ServerError (5xx)',
                strategy: 'Faraday::Retry middleware handles this cleanly. Configure 3 retries with exponential backoff — do not hand-roll retry loops.',
            },
            {
                condition: 'Large response body',
                strategy: "Use Faraday's streaming response support or Net::HTTP#request with a block that writes chunks to a Tempfile. Avoid loading into a String.",
            },
        ],
        productionChecklist: [
            'Capture runs in a background job (Sidekiq/GoodJob/Delayed) — controllers never call the API directly.',
            'Faraday client instantiated once per process and reused.',
            'Faraday retry middleware configured with exponential backoff.',
            'ActiveStorage (or Shrine) handles image persistence; avoid raw filesystem writes.',
            'Sidekiq Web UI or GoodJob Dashboard monitors queue health.',
            'API key stored in Rails.credentials, not .env.',
        ],
        rateLimitStrategy:
            "Sidekiq concurrency × plan QPS is the math to get right. A 10-thread Sidekiq × 3 replicas = 30 concurrent captures. Use the sidekiq-throttled gem to cap concurrency on ScreenshotJob specifically, independent of overall throughput.",
        notForYou: [
            'You run Rails on Heroku and hit the 30-second request timeout on ActiveStorage uploads. Enable direct_upload: true on large images to bypass the Rails process entirely, or move to a longer-timeout host.',
            'Your app has no background job infrastructure and you are not willing to add Sidekiq or GoodJob. Inline capture in controllers is a reliability footgun at any meaningful scale.',
            'You need GIL-free parallel execution for CPU-bound processing of captures. Ruby MRI\'s GIL limits parallelism; evaluate JRuby or a different runtime if that is your bottleneck.',
        ],
    },
    go: {
        aiSummary:
            'Go capture via net/http. Excellent fit for high-concurrency batch workers. Key patterns: context.Context for cancellation, a semaphore for concurrency control, and io.Copy for streaming.',
        deepDiveParagraphs: [
            `Go is the highest-throughput runtime for screenshot workloads because goroutines plus a tuned HTTP transport gives thousands of concurrent requests with predictable memory. The foot-guns are forgetting to reuse \`http.Client\` (each new client creates its own connection pool) and not bounding concurrency with a semaphore.`,
            `For batch workloads: a worker pool sized to your rate-limit budget, \`sync.WaitGroup\` for orderly shutdown, and a \`chan struct{}\` semaphore capping parallel captures at 5–10. Bind captures to \`context.WithCancel()\` tied to the consumer's lifecycle so in-flight captures abort cleanly on shutdown.`,
            `For the response body, use \`io.Copy(dst, resp.Body)\` to stream directly to S3 or disk. \`io.ReadAll(resp.Body)\` buffers the entire image in memory — at 8 MB per capture × 50 concurrent = 400 MB of avoidable RAM.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy: 'Read Retry-After header, sleep, retry up to 3 times. Centralize in a helper function.',
                code: `if resp.StatusCode == 429 {
    retryAfter, _ := strconv.Atoi(resp.Header.Get("Retry-After"))
    time.Sleep(time.Duration(retryAfter) * time.Second)
    return capture(ctx, url, attempt+1)
}`,
            },
            {
                condition: 'context.DeadlineExceeded',
                strategy: 'Happens when the parent ctx timeout fires. Propagate up; do not retry with a fresh context — the caller set the deadline intentionally.',
            },
            {
                condition: 'net.OpError (connection reset)',
                strategy: 'Retry once with a fresh connection. Usually indicates a transient blip.',
            },
        ],
        productionChecklist: [
            'Single http.Client reused across all captures, tuned with Transport.MaxIdleConnsPerHost.',
            'context.Context propagated through every capture call.',
            'Worker pool with semaphore bounds parallel captures (5–10 typical).',
            'io.Copy streams response body — never io.ReadAll into memory for large captures.',
            'Retry logic uses cenkalti/backoff or similar; not hand-rolled per call site.',
            'Graceful shutdown drains in-flight captures before exit.',
        ],
        rateLimitStrategy:
            "Use golang.org/x/time/rate.Limiter sized to ~80% of your plan's published rate, shared across goroutines. At rate.Every(time.Second), 10 you get 10 QPS steady-state with a burst of 10. For multi-process deployments, use Redis-backed distributed rate limiting.",
        notForYou: [
            'Your team has limited Go experience and the codebase is primarily Node or Python. The performance win rarely justifies introducing a second language just for capture workloads.',
            'You need browser automation beyond pure capture — form filling, OAuth flows, multi-page scraping. chromedp is an option, but a dedicated screenshot API is not.',
            'Your organization mandates Windows Server for deployment. Go works but the Chrome/Puppeteer side of any fallback is harder to run on Windows than on Linux.',
        ],
    },
    zapier: {
        aiSummary:
            'Zapier integration via Webhooks by Zapier (POST action). Right for human-triggered, one-at-a-time flows. Not ideal for high volume — Zapier tasks are expensive per capture.',
        deepDiveParagraphs: [
            `Zapier is the right automation layer when the trigger and destination are both Zapier-native apps (Typeform, Airtable, Slack, Google Sheets). The Screenshotly piece is a Webhooks by Zapier action in the middle: take the URL from the trigger, POST to the API, pass the resulting image to the destination.`,
            `Zapier falls apart at volume. Professional plan is $74/month for 2,000 tasks, vs. Screenshotly's $14/month for 2,500 direct captures. At 1,000+ captures/month, the Zapier overhead dominates costs — move orchestration to Make, n8n, or raw code.`,
            `The practical pattern: use Zapier for human-triggered, one-at-a-time workflows (support agent submits a URL, Zap captures and posts to Slack). Avoid it for batch or scheduled automation.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429 from Screenshotly',
                strategy: "Zapier won't retry automatically on 429 without config. Add a Filter step that checks response status and routes rate-limited cases to a delay + retry path.",
            },
            {
                condition: 'Zapier task timeout (30s default)',
                strategy: 'Full-page captures approaching 30s will fail. Enable "Use webhook response" for async delivery, or pre-warm with a shorter capture.',
            },
            {
                condition: 'Binary response handling',
                strategy: 'Set "Pass binary file" in the webhook action — Zapier then pipes the bytes correctly into Drive/Dropbox actions.',
            },
        ],
        productionChecklist: [
            'API key stored in a Zapier secure field, never pasted into action body.',
            'Webhook action returns binary response type for image handling.',
            'Paths/Filters handle rate-limited responses gracefully.',
            'Volume estimate matches your Zapier plan (check task dashboard monthly).',
            'Failure branches route to an alert channel (Slack, email) for manual review.',
            'Zap is documented in a shared doc — which trigger, what it does, who owns it.',
        ],
        rateLimitStrategy:
            "Zapier concurrency is unpredictable — a trigger firing 100 times in a minute queues 100 webhook calls. Add a Delay by Zapier step (random 1–5s) between trigger and the Screenshotly webhook to smooth bursts. For list-processing Zaps, use the Looping utility with a 2–5s delay per iteration.",
        notForYou: [
            'Your workflow runs >1,000 captures/month. Zapier task pricing makes this 5–10× more expensive than Make or n8n. Migrate the orchestration before the cost difference compounds.',
            'Your trigger is a high-volume webhook (form submissions at scale, e-commerce events). Zapier\'s queuing can lag minutes behind the source — use a direct server-to-server integration instead.',
            'Your workflow needs custom error handling with retries, circuit breakers, or sophisticated branching. Zapier\'s Paths are fine for 2–3 branches; past that, code-based orchestration is cleaner.',
        ],
    },
    make: {
        aiSummary:
            'Make.com via HTTP module. Cheaper per operation than Zapier. Visual scenario builder plus native iterators and aggregators suit batch capture flows better than Zapier does.',
        deepDiveParagraphs: [
            `Make's pricing (operations per month, not tasks) is fundamentally more favorable for screenshot workflows. A typical capture scenario runs 3–5 operations, and Make's $9/month plan includes 10,000 operations — 2–3k captures for $9 vs. Zapier's $74 for equivalent volume.`,
            `Make's HTTP module supports request streaming and binary data natively, which Zapier struggles with. For capture-and-upload flows (S3, Drive, Dropbox with custom metadata), Make handles the binary pipe cleanly. For multi-MB PDFs, watch Make's 10 MB per-operation ceiling.`,
            `The best-fit Make pattern: Iterator fed a URL list, Router branching on capture success/failure, Aggregator collecting results into a summary notification. Replaces 20 lines of code with a visual scenario a non-developer can maintain.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy: 'Use a Sleep module with duration from Retry-After, then route back to the HTTP module. Make supports this loop natively.',
            },
            {
                condition: 'Scenario timeout',
                strategy: 'Default scenario timeout is 40 minutes. For batch runs over 1,000 URLs, split into multiple scheduled runs with an offset filter.',
            },
            {
                condition: 'Binary response on HTTP module',
                strategy: 'Set "Parse response" to No and pass binary directly to the destination module (Drive, Dropbox, HTTP upload). Trying to parse as JSON breaks.',
            },
        ],
        productionChecklist: [
            'API key stored as a Make Connection, not in plaintext module config.',
            'HTTP module parse-response set to No for binary image data.',
            'Error handler routes auth errors away from retry loops.',
            'Scenario scheduling respects Make operation quota.',
            'Failure notifications route to email or Slack via dedicated error-handler branch.',
            'Scenarios documented with description field: trigger, destination, owner.',
        ],
        rateLimitStrategy:
            "Make's HTTP module supports explicit rate limiting in the module settings — set max requests per second to 1–2 to stay well below Screenshotly's QPS. For iterated scenarios, pair the Iterator with a Sleep module to throttle.",
        notForYou: [
            'Your workflow requires custom code logic beyond what Make\'s Tools and Code modules handle. At that complexity, a real codebase with proper version control is easier to maintain.',
            'You need data residency or air-gapped deployment. Make is cloud-only — n8n self-hosted is the right answer when data cannot leave your infrastructure.',
            'Your team is deeply Zapier-skilled and retooling costs exceed the per-operation savings. Staying on Zapier is fine if volume is low.',
        ],
    },
    n8n: {
        aiSummary:
            'n8n self-hosted or n8n Cloud. Preferred for high-volume, privacy-sensitive, or air-gapped capture workflows. Self-hosted = unlimited executions; Cloud = the feature set without the ops burden.',
        deepDiveParagraphs: [
            `n8n's core advantage over Zapier and Make is self-hosting. Your URL list, captured images, and credentials never leave your infrastructure. For industries with data residency or compliance requirements (financial services, healthcare, EU with strict GDPR posture on US-hosted automation), n8n is often the only viable option.`,
            `The second advantage is cost. n8n Community Edition is free for self-hosted single-user deployments. Make and Zapier price per operation; n8n prices per execution on Cloud or not at all on self-hosted. For workflows with >20k captures/month, the cost delta is thousands of dollars per year.`,
            `The trade-off is operational burden. You own the Docker container, Postgres database, backup strategy, and upgrades. n8n Cloud removes this but re-introduces per-execution pricing. The pragmatic choice: self-host when volume justifies the DevOps time; n8n Cloud for teams who need n8n's feature set without the hosting overhead.`,
        ],
        errorHandling: [
            {
                condition: 'HTTP 429',
                strategy: 'Configure "Retry On Fail" in the HTTP Request node with exponential backoff. n8n respects the response status and retries automatically.',
                code: `// In the HTTP Request node settings:
// Retry On Fail: true
// Max Tries: 3
// Wait Between Tries: 2000ms (exponential)`,
            },
            {
                condition: 'Binary data handling',
                strategy: 'Set "Response Format" to "File" in the HTTP Request node. n8n passes the binary natively to downstream nodes (Write Binary File, S3 Upload, Google Drive Upload).',
            },
            {
                condition: 'Queue workflow failure',
                strategy: "n8n's Queue mode (Redis-backed) survives restarts. Enable it for critical production workflows — default memory mode loses in-flight work on restart.",
            },
        ],
        productionChecklist: [
            'n8n credentials store holds the API key — never committed to workflow JSON.',
            'HTTP Request node configured with Retry On Fail and Response Format: File for binary.',
            'Queue mode enabled for production workflows.',
            'Postgres database backed up daily (automated cron or built-in).',
            'n8n Docker image pinned to a specific version, not :latest.',
            'Error Trigger workflow routes failures to Slack/PagerDuty.',
            'Self-hosted deployment behind auth (basic auth minimum, SSO on Enterprise).',
        ],
        rateLimitStrategy:
            "Self-hosted n8n has no artificial rate limit — you can overwhelm Screenshotly if careless. Use Split In Batches (batch size 5–10) plus a Wait node of 1–2s between batches. For high volume, run multiple worker instances with Redis-backed Queue mode and configure executions.concurrency.",
        notForYou: [
            'Your team has no DevOps capacity to maintain a self-hosted Docker container, Postgres database, and backup strategy. n8n Cloud removes that burden but brings per-execution pricing similar to Make.',
            'You need instant setup with zero infrastructure. Zapier or Make\'s hosted offerings are simpler; n8n requires more upfront configuration even on Cloud.',
            'Your workflow integrates with dozens of proprietary SaaS apps that have Zapier-native triggers but no n8n nodes. n8n\'s integration library is strong but not as broad as Zapier\'s.',
        ],
    },
};
