export const pricingFAQs = [
  {
    question: "How does the free tier work?",
    answer: "Sign up and get 100 free screenshots — no credit card required, no expiry. Use them to fully evaluate the API including AI element removal, device mockups, and all output formats. Once you've used all 100, upgrade to a paid plan to continue.",
  },
  {
    question: "What counts as a screenshot?",
    answer: "Each successful API call that returns a screenshot, PDF, or video counts as one screenshot toward your plan quota. Failed requests (4xx/5xx errors) and cached responses served within your TTL window are not counted. Retries on the same URL within the cache period are free.",
  },
  {
    question: "What happens if I go over my monthly limit?",
    answer: "On paid plans, extra screenshots are billed at the per-extra rate shown on your plan ($0.007 on Basic, $0.005 on Growth, $0.003 on Scale). You are never cut off mid-month — overage is calculated at the end of the billing cycle and charged to your card on file. On the free tier, once you've used your 100 lifetime screenshots, you will need to upgrade to continue.",
  },
  {
    question: "Can I change or cancel my plan anytime?",
    answer: "Yes. Upgrade, downgrade, or cancel at any time with no penalties or long-term contracts. When upgrading mid-cycle, you are charged a prorated amount for the remainder of the billing period. Downgrades take effect at the next billing cycle, so you keep your current plan's limits until then. Cancellation is instant — your plan stays active through the end of the paid period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) processed securely via Stripe. Annual plans receive a 20% discount compared to monthly billing. Enterprise customers on Scale plans can request invoicing with NET-30 payment terms — contact sales to set this up.",
  },
  {
    question: "How fast are screenshots rendered?",
    answer: "Most screenshots complete in 2-5 seconds depending on page complexity. Full-page captures and heavy JavaScript sites (SPAs, dashboards with charts) may take up to 15 seconds as the renderer waits for dynamic content to load. Growth and Scale plans get priority rendering queues with lower latency and higher concurrency limits, which matters for batch processing workflows.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you are not satisfied for any reason, contact support within 14 days of your initial purchase for a full refund — no questions asked. Beyond the 14-day window, unused portions of cancelled plans are not refunded, but you retain access through the end of your billing period.",
  },
  {
    question: "Is there an API rate limit?",
    answer: "Yes, each plan has a per-minute request limit to ensure consistent performance for all users: 5 requests/min on Free, 40/min on Basic, 80/min on Growth, and 200/min on Scale. If you exceed the limit, the API returns a 429 status code with a Retry-After header. Scale customers can request custom rate limits for high-throughput use cases like batch processing or real-time pipelines.",
  },
  {
    question: "Can I use screenshots commercially?",
    answer: "Absolutely. All screenshots captured through the API can be used for any commercial purpose — embedding in websites and apps, marketing materials, client reports, SaaS product features, and resale as part of your own product. There are no additional licensing fees or attribution requirements. You own the output generated from your content.",
  },
  {
    question: "How does caching work?",
    answer: "Paid plans include automatic server-side caching. When you request a screenshot of a URL that was recently captured, the cached result is returned instantly without counting toward your monthly quota. The cache TTL (time-to-live) is configurable per request — set it to 0 to force a fresh capture, or to 86400 for 24-hour caching. Caching is especially useful for pages that don't change often, like marketing sites or documentation.",
  },
];
