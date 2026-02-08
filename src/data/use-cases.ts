// Use case definitions for pSEO pages
export const useCases = [
  {
    slug: 'documentation-screenshots',
    title: 'Documentation Screenshots',
    shortTitle: 'Documentation',
    description: 'Automate screenshot capture for technical documentation. Keep your docs always up-to-date with fresh screenshots that reflect the latest UI changes.',
    longDescription: `Outdated screenshots are one of the biggest pain points in technical documentation. When your UI evolves but your docs don't, users get confused and support tickets pile up. Screenshotly solves this by integrating directly into your development workflow.

With our API, you can trigger screenshot captures automatically whenever your application deploys. This means your README files, API documentation, user guides, and help articles always show the current state of your interface. No more manual screenshot updates, no more "this doesn't match what I see" complaints.

Our AI-powered element removal ensures your documentation screenshots are clean and professional. Cookie consent banners, chat widgets, and promotional popups are automatically detected and removed, leaving you with crisp images that focus on what matters: your product.`,
    icon: 'FileText',
    keywords: [
      'documentation screenshots',
      'automated docs images',
      'technical documentation screenshots',
      'API documentation images',
      'readme screenshots',
    ],
    benefits: [
      'Automatically capture UI changes for documentation',
      'Keep screenshots synchronized with releases',
      'Generate consistent, professional images',
      'Integrate with CI/CD pipelines',
    ],
    steps: [
      'Set up a webhook trigger in your CI/CD pipeline (GitHub Actions, GitLab CI, etc.)',
      'Define the pages and UI states you need to capture',
      'Call the Screenshotly API with your target URLs and viewport settings',
      'Save the returned images to your documentation repository',
      'Commit and push the updated screenshots automatically',
    ],
    metrics: [
      { stat: '85%', label: 'reduction in doc maintenance time' },
      { stat: '< 3 min', label: 'average capture time per page' },
      { stat: '100%', label: 'screenshot accuracy with latest UI' },
    ],
    codeExample: `// Capture documentation screenshots
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-app.com/dashboard',
    device: 'desktop',
    format: 'png',
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'chat-widget'],
    },
  }),
});`,
    faqs: [
      {
        question: "How do I integrate screenshot capture into my CI/CD pipeline?",
        answer: "You can add Screenshotly to any CI/CD pipeline using our REST API. Popular integrations include GitHub Actions, GitLab CI, Jenkins, and CircleCI. Simply add an API call step after your deployment to capture updated screenshots."
      },
      {
        question: "Can I capture screenshots of authenticated pages for documentation?",
        answer: "Yes! You can pass authentication cookies or headers with your API request to capture screenshots of logged-in states. This is perfect for documenting admin panels, user dashboards, and private features."
      },
      {
        question: "What's the best image format for documentation screenshots?",
        answer: "PNG is recommended for documentation as it provides lossless compression and supports transparency. For web documentation, consider WebP for smaller file sizes with excellent quality."
      },
      {
        question: "How do I ensure consistent styling across documentation screenshots?",
        answer: "Use our AI-powered element removal to hide dynamic elements like timestamps, user-specific data, and promotional banners. Set consistent viewport sizes and use the same device settings for all captures."
      }
    ],
  },
  {
    slug: 'social-media-previews',
    title: 'Social Media Previews',
    shortTitle: 'Social Media',
    description: 'Generate beautiful link previews and social media cards. Create eye-catching thumbnails that drive clicks and engagement.',
    longDescription: `When someone shares your link on Twitter, LinkedIn, Slack, or Discord, the preview image is often the difference between a click and a scroll. Generic or broken previews kill engagement. Professional, eye-catching previews drive traffic.

Screenshotly lets you generate dynamic Open Graph images programmatically. Instead of manually creating static og:image files for every page, you can capture live screenshots of your content and serve them as social previews. This is especially powerful for blogs, product pages, and user-generated content where each page is unique.

Our device mockup feature takes this further. Wrap your screenshots in beautiful browser frames, iPhone mockups, or MacBook frames to create premium-looking social cards that stand out in busy feeds. Combined with our AI cleanup that removes distracting elements, your shares look polished and professional every time.`,
    icon: 'Share2',
    keywords: [
      'social media previews',
      'link preview generator',
      'og image generator',
      'twitter card generator',
      'social sharing images',
    ],
    benefits: [
      'Generate OG images automatically',
      'Create Twitter card previews',
      'Ensure consistent branding',
      'Boost social media engagement',
    ],
    steps: [
      'Identify pages that need dynamic social previews',
      'Set up an API endpoint that generates previews on demand',
      'Call Screenshotly with the page URL and mockup preferences',
      'Cache the generated images with appropriate TTL',
      'Serve the cached images via your og:image meta tags',
    ],
    metrics: [
      { stat: '2.3x', label: 'higher click-through rate' },
      { stat: '40%', label: 'more social shares' },
      { stat: '< 2s', label: 'generation time with caching' },
    ],
    codeExample: `// Generate social media preview
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-blog.com/article',
    device: 'desktop',
    format: 'png',
    fullPage: false,
    mockup: 'browser-light',
  }),
});`,
    faqs: [
      {
        question: "How do I generate dynamic Open Graph images for social media?",
        answer: "Use Screenshotly to capture live screenshots of your pages and serve them as og:image meta tags. This creates unique, up-to-date previews for each page that reflect your current content and branding."
      },
      {
        question: "What's the optimal image size for social media previews?",
        answer: "For maximum compatibility, use 1200x630 pixels (1.91:1 aspect ratio). This works perfectly for Facebook, Twitter, LinkedIn, and most other social platforms. Our API can automatically resize to this dimension."
      },
      {
        question: "Can I add device mockups to social media previews?",
        answer: "Yes! Our browser, iPhone, and MacBook mockups make your social previews stand out in feeds. Device mockups create a premium look that increases click-through rates by up to 2.3x compared to plain screenshots."
      },
      {
        question: "How do I handle caching for social media images?",
        answer: "Cache generated images for at least 24 hours to reduce API costs and improve performance. Use URL parameters or timestamps to bust cache when content changes. Most social platforms cache images for several days."
      }
    ],
  },
  {
    slug: 'e-commerce-product-images',
    title: 'E-commerce Product Images',
    shortTitle: 'E-commerce',
    description: 'Capture product pages and listings for catalogs, marketplaces, and comparison tools. Automate product image generation at scale.',
    longDescription: `E-commerce businesses deal with thousands—sometimes millions—of product pages. Whether you're building a price comparison site, monitoring competitor catalogs, or archiving your own listings, manual screenshot capture simply doesn't scale.

Screenshotly enables automated product page capture at any volume. Integrate our API into your data pipelines to capture product pages alongside pricing data, availability status, and other metadata. This creates a rich visual record of your market landscape that's invaluable for competitive intelligence.

Our AI-powered cleanup is especially useful for e-commerce. Product pages are notorious for cookie banners, newsletter popups, and chat widgets that clutter screenshots. We automatically remove these distractions, leaving you with clean product images focused on what buyers see. Combined with our image optimization, you get fast-loading, professional captures every time.`,
    icon: 'ShoppingCart',
    keywords: [
      'e-commerce screenshots',
      'product page capture',
      'marketplace images',
      'product catalog automation',
      'retail screenshots',
    ],
    benefits: [
      'Capture product pages automatically',
      'Monitor competitor pricing',
      'Build product catalogs',
      'Archive product listings',
    ],
    steps: [
      'Build a list of product URLs to capture (from sitemap, API, or crawling)',
      'Process URLs in batches to manage rate limits efficiently',
      'Use delays to ensure images and dynamic content fully load',
      'Enable AI removal to clean up popups and overlays',
      'Store captures with metadata (price, date, URL) for analysis',
    ],
    metrics: [
      { stat: '10,000+', label: 'products captured daily' },
      { stat: '99.5%', label: 'capture success rate' },
      { stat: '< 5s', label: 'average capture per product' },
    ],
    codeExample: `// Capture product page
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://store.com/product/item-123',
    device: 'desktop',
    format: 'png',
    fullPage: true,
    delay: 2000, // Wait for images to load
  }),
});`,
    faqs: [
      {
        question: "How do I capture thousands of product pages efficiently?",
        answer: "Process URLs in batches and use appropriate delays between requests to respect rate limits. Our API can handle high-volume requests, and you can parallelize captures across multiple API keys for maximum throughput."
      },
      {
        question: "Can I capture product pages from any e-commerce platform?",
        answer: "Yes! Screenshotly works with all major e-commerce platforms including Shopify, WooCommerce, Magento, Amazon, eBay, and custom-built stores. We handle different page structures and loading patterns automatically."
      },
      {
        question: "How do I ensure product images load before capturing?",
        answer: "Use the delay parameter (2-5 seconds) to wait for images and dynamic content to fully load. For heavy pages with many images, consider using our wait-for-selector option to ensure specific elements are visible."
      },
      {
        question: "What's the best approach for competitor price monitoring?",
        answer: "Capture product pages regularly (daily/weekly) and store screenshots with metadata like price, availability, and timestamp. This creates a visual history of competitor changes that's invaluable for pricing strategy."
      }
    ],
  },
  {
    slug: 'automated-testing',
    title: 'Automated Testing & QA',
    shortTitle: 'Testing',
    description: 'Integrate visual testing into your CI/CD pipeline. Capture screenshots for regression testing and visual diff comparisons.',
    longDescription: `Visual bugs are some of the hardest to catch with traditional unit and integration tests. A button might technically "work" but be invisible, misaligned, or styled incorrectly. Visual regression testing catches these issues before they reach production.

Screenshotly provides consistent, reliable screenshot capture that integrates seamlessly with visual testing workflows. Unlike self-hosted Puppeteer setups that drift over time due to browser updates and configuration differences, our cloud-based capture ensures identical rendering conditions every time.

Use our screenshots as baselines for visual diff tools like Percy, Chromatic, or your own comparison logic. Capture multiple viewport sizes to verify responsive designs. Test across different states (logged in, logged out, error states) to ensure UI consistency. With our API, visual testing becomes a first-class citizen in your CI/CD pipeline.`,
    icon: 'TestTube',
    keywords: [
      'visual testing',
      'screenshot testing',
      'regression testing screenshots',
      'CI/CD screenshots',
      'automated QA screenshots',
    ],
    benefits: [
      'Visual regression testing',
      'Cross-browser comparison',
      'Automated QA workflows',
      'CI/CD integration',
    ],
    steps: [
      'Define critical UI states and pages to test (login, dashboard, checkout, etc.)',
      'Capture baseline screenshots during a stable release',
      'Integrate screenshot capture into your CI pipeline (on PR or push)',
      'Compare new captures against baselines using diff tools',
      'Alert on significant visual changes and update baselines as needed',
    ],
    metrics: [
      { stat: '73%', label: 'more visual bugs caught pre-production' },
      { stat: '< 30s', label: 'to capture full page suite' },
      { stat: '0', label: 'infrastructure maintenance needed' },
    ],
    codeExample: `// Visual testing integration
const captureForTesting = async (urls: string[]) => {
  const screenshots = await Promise.all(
    urls.map(url => 
      fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: 'desktop',
          format: 'png',
        }),
      })
    )
  );
  return screenshots;
};`,
    faqs: [
      {
        question: "How do I integrate screenshot testing into my CI/CD pipeline?",
        answer: "Add screenshot capture as a step in your GitHub Actions, GitLab CI, or Jenkins pipeline. Capture screenshots after deployment and compare them against baseline images using visual diff tools like Percy or Chromatic."
      },
      {
        question: "What's the best way to handle visual test baselines?",
        answer: "Store baseline screenshots in version control or a dedicated storage service. Update baselines when intentional UI changes are made, and use automated diff tools to detect unintended changes."
      },
      {
        question: "Can I test responsive designs across multiple viewports?",
        answer: "Yes! Capture the same page at different viewport sizes (mobile, tablet, desktop) to ensure responsive designs work correctly. Our API supports custom viewport dimensions for comprehensive testing."
      },
      {
        question: "How do I handle dynamic content in visual tests?",
        answer: "Use our AI-powered element removal to hide timestamps, user-specific data, and dynamic elements. You can also use CSS selectors to hide specific elements that change between test runs."
      }
    ],
  },
  {
    slug: 'website-thumbnails',
    title: 'Website Thumbnails',
    shortTitle: 'Thumbnails',
    description: 'Generate thumbnail previews for link aggregators, directories, and bookmarking services. Create visual previews at any size.',
    longDescription: `Thumbnails transform plain text links into engaging visual content. Whether you're building a link directory, bookmarking service, or content aggregator, website thumbnails help users quickly scan and identify sites at a glance.

Screenshotly generates consistent, high-quality thumbnails at any resolution you need. Our API handles the complexity of rendering modern web pages—JavaScript-heavy SPAs, lazy-loaded images, and dynamic content—delivering reliable thumbnails every time.

The key to great thumbnails is consistency. Random viewport sizes, inconsistent loading states, and varying quality make your interface look unprofessional. With Screenshotly, you define the exact specifications once, and every thumbnail matches. Combine this with our caching recommendations, and you can serve thousands of thumbnails instantly.`,
    icon: 'Image',
    keywords: [
      'website thumbnails',
      'url thumbnails',
      'link previews',
      'website preview images',
      'thumbnail generator',
    ],
    benefits: [
      'Generate thumbnails at any size',
      'Build link directories',
      'Create bookmark previews',
      'Visual search results',
    ],
    steps: [
      'Define your thumbnail dimensions and quality requirements',
      'Set up an API endpoint to handle thumbnail requests',
      'Check your cache before calling the Screenshotly API',
      'Generate and cache new thumbnails with appropriate TTL',
      'Serve thumbnails with fallback placeholders for loading states',
    ],
    metrics: [
      { stat: '< 1s', label: 'cached thumbnail delivery' },
      { stat: '50KB', label: 'average thumbnail size' },
      { stat: '99.9%', label: 'render success rate' },
    ],
    codeExample: `// Generate thumbnail
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'desktop',
    format: 'jpeg',
    quality: 80,
  }),
});`,
    faqs: [
      {
        question: "What's the optimal thumbnail size for web directories?",
        answer: "For most directories, 400x300 pixels (4:3 aspect ratio) works well. This provides enough detail while keeping file sizes small. For mobile-first designs, consider 300x200 or 320x240 pixels."
      },
      {
        question: "How do I handle websites that take time to load?",
        answer: "Use the delay parameter (2-5 seconds) to wait for content to fully load. For sites with heavy JavaScript or slow APIs, you can increase the delay or use our wait-for-selector option to ensure specific elements are visible."
      },
      {
        question: "Should I use JPEG or PNG for thumbnails?",
        answer: "JPEG is recommended for thumbnails as it provides smaller file sizes with acceptable quality. Use quality settings between 70-85 for the best balance. PNG is only needed if you require transparency."
      },
      {
        question: "How long should I cache thumbnails?",
        answer: "Cache thumbnails for at least 24 hours, preferably 7 days or more. Most websites don't change their homepage frequently, so longer caching reduces API costs while maintaining freshness."
      }
    ],
  },
  {
    slug: 'pdf-generation',
    title: 'PDF Generation',
    shortTitle: 'PDF',
    description: 'Convert web pages to PDF documents. Perfect for invoices, reports, and archival purposes.',
    longDescription: `PDFs remain the universal format for documents that need to look identical everywhere. Invoices, contracts, reports, and certificates—when the layout matters, PDF is the answer. Screenshotly converts any web page to a perfectly formatted PDF.

Unlike basic HTML-to-PDF converters that struggle with modern CSS and JavaScript, our rendering engine handles complex layouts, web fonts, and dynamic content. The PDF you get matches exactly what you see in the browser. This is crucial for invoices where formatting errors can look unprofessional or even raise fraud concerns.

Full-page capture ensures you get the complete document, not just the visible viewport. Headers, footers, and all content render correctly. You can also control margins, page size, and orientation to match your exact requirements.`,
    icon: 'FileOutput',
    keywords: [
      'webpage to PDF',
      'URL to PDF',
      'HTML to PDF API',
      'PDF generation API',
      'web page PDF converter',
    ],
    benefits: [
      'Convert any URL to PDF',
      'Generate invoices and reports',
      'Archive web content',
      'Create printable documents',
    ],
    steps: [
      'Build your document as a web page (invoice, report, certificate)',
      'Apply print-friendly CSS for optimal PDF rendering',
      'Call the Screenshotly API with format: "pdf" and fullPage: true',
      'Receive the PDF binary and serve or store as needed',
      'Implement retry logic for large documents that may take longer',
    ],
    metrics: [
      { stat: '< 5s', label: 'average PDF generation time' },
      { stat: '100%', label: 'CSS fidelity' },
      { stat: 'Any size', label: 'document length supported' },
    ],
    codeExample: `// Generate PDF
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-app.com/invoice/123',
    format: 'pdf',
    fullPage: true,
  }),
});`,
  },
  {
    slug: 'email-marketing',
    title: 'Email Marketing',
    shortTitle: 'Email',
    description: 'Capture landing pages and email templates for previews. Generate visual content for email campaigns.',
    longDescription: `Email marketing lives and dies by visual appeal. A compelling preview image can double your click-through rate. But creating these images manually for every campaign, A/B test, and segment is exhausting and error-prone.

Screenshotly automates the creation of email marketing visuals. Capture your landing pages in beautiful device mockups to show subscribers exactly what they'll experience. Generate preview images of email templates to use in "View in browser" fallbacks. Create eye-catching hero images that showcase your offers.

Our device mockup feature is especially powerful for email marketing. Wrap landing page screenshots in iPhone or MacBook frames to add perceived value and professionalism. Mobile mockups work particularly well since most email opens happen on phones.`,
    icon: 'Mail',
    keywords: [
      'email marketing screenshots',
      'email template preview',
      'landing page capture',
      'newsletter images',
      'email campaign visuals',
    ],
    benefits: [
      'Preview email templates',
      'Capture landing pages',
      'Create email visuals',
      'A/B test previews',
    ],
    steps: [
      'Design your landing page or email template',
      'Deploy to a preview URL accessible by our API',
      'Capture with appropriate device (mobile for phone mockups)',
      'Apply device mockups for premium visuals',
      'Use the generated images in your email campaigns',
    ],
    metrics: [
      { stat: '45%', label: 'higher email engagement' },
      { stat: '< 3s', label: 'image generation time' },
      { stat: 'Unlimited', label: 'A/B test variants' },
    ],
    codeExample: `// Capture landing page for email
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-site.com/landing-page',
    device: 'mobile',
    format: 'png',
    mockup: 'iphone-14',
  }),
});`,
  },
  {
    slug: 'web-archiving',
    title: 'Web Archiving',
    shortTitle: 'Archiving',
    description: 'Create visual archives of web content. Capture and preserve website states for legal, compliance, or historical purposes.',
    longDescription: `The web is ephemeral. Pages change, sites go down, and content disappears. For legal proceedings, regulatory compliance, and historical preservation, you need immutable evidence of what a webpage showed at a specific moment in time.

Screenshotly provides forensic-grade web archiving. Full-page captures with high resolution preserve every detail. Timestamps and metadata document exactly when the capture occurred. Unlike the Wayback Machine, you control when and what gets archived, and the captures are yours to keep.

For legal use cases, disable AI element removal to preserve the exact user experience. For compliance monitoring, schedule regular captures to document changes over time. For historical preservation, capture important content before it vanishes.`,
    icon: 'Archive',
    keywords: [
      'web archiving',
      'website archival',
      'legal screenshot capture',
      'compliance screenshots',
      'historical web capture',
    ],
    benefits: [
      'Legal evidence capture',
      'Compliance documentation',
      'Historical preservation',
      'Content verification',
    ],
    steps: [
      'Identify URLs requiring archival (legal evidence, compliance pages, etc.)',
      'Configure capture settings: full page, high quality, AI removal disabled',
      'Store captures with complete metadata (URL, timestamp, hash)',
      'Use immutable storage (S3 Glacier, archive services) for retention',
      'Maintain chain of custody documentation for legal admissibility',
    ],
    metrics: [
      { stat: '100%', label: 'content fidelity' },
      { stat: 'Timestamped', label: 'legal-grade captures' },
      { stat: 'Immutable', label: 'archive storage ready' },
    ],
    codeExample: `// Archive webpage
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://news-site.com/article',
    device: 'desktop',
    format: 'png',
    fullPage: true,
    delay: 3000,
  }),
});`,
  },
  {
    slug: 'competitive-analysis',
    title: 'Competitive Analysis',
    shortTitle: 'Competitors',
    description: 'Monitor competitor websites automatically. Track pricing changes, feature updates, and design evolution with scheduled screenshots.',
    longDescription: `Staying ahead of competitors requires constant monitoring. But manually checking competitor websites daily is tedious and unsustainable. Screenshotly automates competitive intelligence gathering with scheduled, systematic captures.

Track competitor pricing pages to detect price changes the moment they happen. Monitor feature pages to spot new capabilities before they're announced. Archive landing pages to analyze messaging evolution. Compare homepage designs over time to understand brand strategy shifts.

Our AI-powered cleanup ensures clean captures even when competitors use popups and overlays. Full-page screenshots capture everything, not just what's above the fold. Schedule captures hourly, daily, or weekly based on how fast your market moves.`,
    icon: 'TrendingUp',
    keywords: [
      'competitor monitoring',
      'competitive analysis screenshots',
      'price monitoring',
      'competitor tracking',
      'market research screenshots',
    ],
    benefits: [
      'Track competitor pricing',
      'Monitor feature changes',
      'Analyze design evolution',
      'Build competitive intelligence',
    ],
    steps: [
      'List competitor URLs to monitor (pricing, features, homepage)',
      'Set up scheduled jobs (cron, cloud functions) to trigger captures',
      'Call Screenshotly API with AI removal enabled for clean results',
      'Store captures with timestamps in organized folders',
      'Implement diff detection to alert on significant changes',
    ],
    metrics: [
      { stat: '24/7', label: 'automated monitoring' },
      { stat: 'Minutes', label: 'to detect changes' },
      { stat: 'Unlimited', label: 'competitors tracked' },
    ],
    codeExample: `// Monitor competitor pricing
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://competitor.com/pricing',
    device: 'desktop',
    format: 'png',
    fullPage: true,
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'chat-widget'],
    },
  }),
});`,
  },
  {
    slug: 'saas-reporting',
    title: 'SaaS Metrics Reporting',
    shortTitle: 'Reporting',
    description: 'Capture dashboard screenshots for automated reporting. Generate visual metrics snapshots for stakeholders and investors.',
    longDescription: `Investor updates, board meetings, and stakeholder reports all need current metrics. But logging into every dashboard, grabbing screenshots, and compiling them into presentations is a weekly time sink. Screenshotly automates this entire workflow.

Capture your Stripe dashboard, Google Analytics, Mixpanel, or any other metrics platform automatically. Our API supports authenticated sessions, so you can capture behind-login dashboards securely. Schedule captures to run before your weekly meetings, and the latest metrics are always ready.

For SaaS founders especially, this is a game-changer. Instead of spending Friday afternoon on reporting, you get consistent, professional dashboard snapshots delivered automatically. Include them in your investor update emails, Notion pages, or presentation decks.`,
    icon: 'BarChart',
    keywords: [
      'dashboard screenshots',
      'SaaS metrics capture',
      'automated reporting',
      'analytics screenshots',
      'investor reports screenshots',
    ],
    benefits: [
      'Automate investor updates',
      'Capture metrics dashboards',
      'Build visual reports',
      'Track KPIs over time',
    ],
    steps: [
      'Identify dashboards to capture (Stripe, Analytics, internal metrics)',
      'Set up authentication (cookies or session tokens) for protected dashboards',
      'Schedule captures for your reporting cadence (weekly, monthly)',
      'Compile captured images into your report template automatically',
      'Distribute reports via email, Slack, or document updates',
    ],
    metrics: [
      { stat: '2 hours', label: 'saved per weekly report' },
      { stat: 'Real-time', label: 'metrics always current' },
      { stat: 'Consistent', label: 'formatting every time' },
    ],
    codeExample: `// Capture metrics dashboard
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://dashboard.yourapp.com/metrics',
    device: 'desktop',
    format: 'png',
    cookies: [
      { name: 'session', value: 'YOUR_SESSION', domain: 'dashboard.yourapp.com' }
    ],
  }),
});`,
  },
  {
    slug: 'link-preview-services',
    title: 'Link Preview Services',
    shortTitle: 'Link Previews',
    description: 'Build link preview services for messaging apps, social platforms, and content aggregators. Generate rich previews for any URL.',
    longDescription: `When users paste a link in Slack, Discord, or any modern chat app, they expect a rich preview. Building this unfurl functionality requires reliably rendering any URL and extracting a meaningful visual. Screenshotly handles the hard parts.

Our API captures any URL consistently, regardless of JavaScript complexity, authentication walls, or slow loading. You get a clean image that represents the page content. Combined with metadata extraction (which you'd handle separately), you have everything needed for a complete link preview.

The challenge with link previews is handling edge cases. What about single-page apps? Paywalled content? Sites that block rendering? Screenshotly handles millions of URLs daily, so we've encountered and solved these edge cases. Your preview service inherits that reliability.`,
    icon: 'Link',
    keywords: [
      'link preview API',
      'URL preview generator',
      'rich link previews',
      'unfurl links',
      'link metadata preview',
    ],
    benefits: [
      'Build link preview features',
      'Generate rich URL cards',
      'Support messaging apps',
      'Create content aggregators',
    ],
    steps: [
      'Receive URL from user input (paste, share, webhook)',
      'Check cache for existing preview of this URL',
      'Call Screenshotly API to generate fresh preview image',
      'Extract page metadata (title, description) via separate parsing',
      'Cache and serve the complete preview card',
    ],
    metrics: [
      { stat: '< 2s', label: 'preview generation' },
      { stat: '99.9%', label: 'URL compatibility' },
      { stat: 'Scalable', label: 'to millions of previews' },
    ],
    codeExample: `// Generate link preview
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/article',
    device: 'desktop',
    format: 'jpeg',
    quality: 80,
  }),
});`,
  },
  {
    slug: 'real-estate-listings',
    title: 'Real Estate Listings',
    shortTitle: 'Real Estate',
    description: 'Capture property listing pages for real estate portals. Archive listings and create visual property catalogs.',
    longDescription: `Real estate moves fast. Listings appear and disappear daily. Prices change. Photos get updated. For agents, investors, and proptech companies, having a visual record of listings is invaluable for market analysis, client presentations, and historical tracking.

Screenshotly captures property listing pages at scale. Monitor MLS feeds, Zillow, Realtor.com, or any listing portal. Archive the complete listing state—photos, price, description—as a single image. Track price reductions over time. Build visual comparables for client presentations.

Full-page capture is essential for real estate since listing pages are typically long with multiple photos, descriptions, and neighborhood information. Our AI cleanup removes chat widgets and cookie banners that clutter listing pages, leaving you with clean, professional archives.`,
    icon: 'Home',
    keywords: [
      'real estate screenshots',
      'property listing capture',
      'MLS screenshots',
      'real estate automation',
      'property catalog images',
    ],
    benefits: [
      'Archive property listings',
      'Monitor price changes',
      'Build property catalogs',
      'Track listing availability',
    ],
    steps: [
      'Collect listing URLs from MLS feeds, portals, or manual curation',
      'Schedule captures to run daily for active market monitoring',
      'Use full-page capture to get complete listing information',
      'Store captures with listing metadata (price, address, date)',
      'Build visual comparison reports for clients and analysis',
    ],
    metrics: [
      { stat: '1000s', label: 'of listings captured daily' },
      { stat: 'Full page', label: 'complete listing detail' },
      { stat: 'Historical', label: 'price tracking ready' },
    ],
    codeExample: `// Capture property listing
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://realestate-site.com/listing/123',
    device: 'desktop',
    format: 'png',
    fullPage: true,
    delay: 2000,
  }),
});`,
  },
  {
    slug: 'ai-vision-analysis',
    title: 'AI Vision Web Page Analysis',
    shortTitle: 'AI Vision',
    description: 'Capture screenshots for AI-powered visual analysis. Feed website screenshots to GPT-4 Vision, Claude, or other AI models for automated insights.',
    longDescription: `AI vision models like GPT-4 Vision and Claude can analyze images to extract insights, detect patterns, and automate decisions. By combining Screenshotly with AI vision APIs, you can build powerful automation workflows that "see" and understand web pages.

Use cases include automated landing page analysis, competitive intelligence gathering, accessibility audits, and design feedback generation. Capture clean screenshots with our AI element removal, then send them to your preferred vision model for analysis.

This approach is particularly valuable for agencies reviewing client sites, SEO tools analyzing competitor pages, and quality assurance teams automating visual checks. The combination of clean screenshots and AI analysis creates insights that would take humans hours to compile.`,
    icon: 'Brain',
    keywords: [
      'AI vision analysis',
      'GPT-4 vision screenshots',
      'automated page analysis',
      'AI website analysis',
      'visual AI insights',
    ],
    benefits: [
      'Feed clean screenshots to AI vision models',
      'Automate landing page roasting and analysis',
      'Build AI-powered design feedback tools',
      'Scale competitive intelligence gathering',
    ],
    steps: [
      'Capture a screenshot using the Screenshotly API',
      'Convert the image to base64 or use the URL',
      'Send to GPT-4 Vision, Claude, or other AI models',
      'Parse the AI response for actionable insights',
      'Store results for reporting and analysis',
    ],
    metrics: [
      { stat: '<5 sec', label: 'screenshot to insights' },
      { stat: '100s', label: 'of pages analyzed automatically' },
      { stat: 'Zero', label: 'manual review required' },
    ],
    codeExample: `// Capture for AI vision analysis
const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://competitor-landing-page.com',
    device: 'desktop',
    format: 'png',
    aiRemoval: { enabled: true, types: ['cookie-banner', 'chat-widget'] },
  }),
});

// Send to GPT-4 Vision for analysis
const analysis = await openai.chat.completions.create({
  model: 'gpt-4-vision-preview',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Analyze this landing page design...' },
      { type: 'image_url', image_url: { url: screenshotUrl } }
    ]
  }]
});`,
    faqs: [
      {
        question: "Which AI vision models work best with screenshots?",
        answer: "GPT-4 Vision and Claude 3 are excellent choices for web page analysis. Both can understand layout, design patterns, content structure, and even read text in images. For specialized tasks like accessibility checks, consider fine-tuned models."
      },
      {
        question: "How do I reduce AI API costs when analyzing many pages?",
        answer: "Use smaller image sizes (1280px width is usually sufficient), capture only the visible viewport instead of full page when possible, and batch your requests. Our AI element removal also reduces visual noise, helping AI models focus on relevant content."
      },
    ],
  },
  {
    slug: 'competitor-monitoring',
    title: 'Competitor Price & Design Monitoring',
    shortTitle: 'Competitor Monitoring',
    description: 'Track competitor websites for pricing changes, design updates, and content modifications. Build automated competitive intelligence systems.',
    longDescription: `Staying ahead of competitors requires constant vigilance. Manual checking is tedious and error-prone. Automated screenshot monitoring captures changes the moment they happen, giving you a competitive edge.

With Screenshotly, you can schedule daily or hourly captures of competitor pricing pages, product listings, and landing pages. Store these screenshots for historical comparison, or pipe them through image diff tools to detect changes automatically.

This is invaluable for e-commerce businesses tracking competitor pricing, SaaS companies monitoring feature page changes, and agencies keeping tabs on client competitors. Combined with AI vision analysis, you can even automate the interpretation of changes.`,
    icon: 'Eye',
    keywords: [
      'competitor monitoring',
      'price tracking screenshots',
      'competitive intelligence',
      'website change monitoring',
      'competitor analysis automation',
    ],
    benefits: [
      'Capture competitor sites automatically on schedule',
      'Detect pricing and content changes',
      'Build historical records for trend analysis',
      'React quickly to competitive moves',
    ],
    steps: [
      'Define the list of competitor URLs to monitor',
      'Set up scheduled API calls (cron, serverless functions)',
      'Capture screenshots at regular intervals',
      'Compare with previous captures to detect changes',
      'Alert your team when significant changes are found',
    ],
    metrics: [
      { stat: '24/7', label: 'automated monitoring' },
      { stat: 'Minutes', label: 'to detect changes' },
      { stat: '100+', label: 'competitor pages tracked' },
    ],
    codeExample: `// Scheduled competitor monitoring
const monitorCompetitor = async (competitorUrl) => {
  const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: competitorUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
    }),
  });
  
  // Save with timestamp for comparison
  const timestamp = new Date().toISOString();
  await saveToStorage(\`competitors/\${timestamp}.png\`, screenshot);
  
  // Run visual diff against yesterday's capture
  const changes = await detectChanges(screenshot, yesterdayCapture);
  if (changes.significant) {
    await sendAlert(changes);
  }
};`,
  },
  {
    slug: 'brand-monitoring',
    title: 'Brand & IP Monitoring',
    shortTitle: 'Brand Monitoring',
    description: 'Monitor the web for unauthorized use of your brand assets, logos, and intellectual property. Capture evidence for enforcement.',
    longDescription: `Protecting your brand online requires vigilance. Counterfeit products, unauthorized resellers, and trademark infringement can damage your reputation and revenue. Screenshots provide timestamped evidence for legal action.

Screenshotly enables automated capture of suspected infringing pages. When your monitoring tools detect potential brand misuse, trigger a screenshot capture to document the violation. Full-page captures with timestamps create evidence that holds up in legal proceedings.

Legal teams, brand protection agencies, and e-commerce brands use this approach to build cases against infringers, document patterns of abuse, and track enforcement success over time.`,
    icon: 'Shield',
    keywords: [
      'brand monitoring',
      'IP protection screenshots',
      'trademark monitoring',
      'counterfeit detection',
      'brand protection evidence',
    ],
    benefits: [
      'Document brand violations with timestamped screenshots',
      'Create evidence packages for legal teams',
      'Monitor marketplace listings for counterfeits',
      'Track unauthorized use of logos and assets',
    ],
    steps: [
      'Set up brand monitoring alerts (Google Alerts, brand protection tools)',
      'When an alert fires, capture the violating page',
      'Store screenshots with metadata (timestamp, URL, IP)',
      'Compile evidence packages for enforcement',
      'Track resolution and follow-up captures',
    ],
    metrics: [
      { stat: 'Timestamped', label: 'legal-grade evidence' },
      { stat: 'Full page', label: 'complete documentation' },
      { stat: 'Automated', label: 'evidence collection' },
    ],
    codeExample: `// Capture brand violation evidence
const documentViolation = async (violatingUrl) => {
  const evidence = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: violatingUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
      delay: 3000, // Ensure page fully loads
    }),
  });
  
  // Store with metadata for legal use
  await storeEvidence({
    screenshot: evidence,
    url: violatingUrl,
    capturedAt: new Date().toISOString(),
    caseId: generateCaseId(),
  });
};`,
  },
  {
    slug: 'website-archival',
    title: 'Website Archival & Historical Records',
    shortTitle: 'Archival',
    description: 'Create permanent records of web content for compliance, legal, or historical purposes. Build your own Wayback Machine.',
    longDescription: `Websites change constantly. Content disappears, designs evolve, and important information gets updated or removed. For compliance, legal, and historical purposes, you need permanent records of how websites looked at specific points in time.

Screenshotly enables programmatic archival of any web page. Capture news articles before corrections, product pages before price changes, or regulatory disclosures for compliance records. Our full-page capture ensures you document everything, not just the visible viewport.

Financial services, legal teams, journalists, and researchers rely on web archival for evidence preservation, regulatory compliance, and historical research. Automated capture ensures nothing falls through the cracks.`,
    icon: 'Archive',
    keywords: [
      'website archival',
      'web page preservation',
      'legal web capture',
      'compliance screenshots',
      'historical web records',
    ],
    benefits: [
      'Create permanent records of web content',
      'Meet compliance and regulatory requirements',
      'Preserve evidence before content changes',
      'Build searchable historical archives',
    ],
    steps: [
      'Identify content requiring archival',
      'Set up scheduled or triggered captures',
      'Capture full-page screenshots with timestamps',
      'Store in compliant, immutable storage',
      'Index metadata for later retrieval',
    ],
    metrics: [
      { stat: 'Permanent', label: 'timestamped records' },
      { stat: 'Full page', label: 'complete captures' },
      { stat: 'Compliant', label: 'evidence-grade storage' },
    ],
    codeExample: `// Archive web content for compliance
const archivePage = async (url, category) => {
  const archived = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: url,
      device: 'desktop',
      format: 'pdf', // PDF for compliance
      fullPage: true,
    }),
  });
  
  // Store with immutable hash
  const hash = await computeHash(archived);
  await storeArchive({
    content: archived,
    url: url,
    category: category,
    capturedAt: new Date().toISOString(),
    contentHash: hash,
  });
};`,
  },
  {
    slug: 'invoice-pdf-generation',
    title: 'Dynamic Invoice & Receipt PDF Generation',
    shortTitle: 'Invoices & PDFs',
    description: 'Generate beautiful PDF invoices, receipts, and documents from HTML templates. No complex PDF libraries required.',
    longDescription: `Generating PDFs programmatically is notoriously difficult. Complex libraries, inconsistent rendering, and font handling issues make it a developer headache. Screenshotly offers a simpler approach: render HTML, capture as PDF.

Design your invoices, receipts, and documents as HTML templates with full CSS support. When you need a PDF, render the template server-side and capture it with Screenshotly. The result is a pixel-perfect PDF that looks exactly like your HTML design.

This approach is particularly powerful for SaaS billing systems, e-commerce order confirmations, and any application that needs to generate professional documents dynamically. Use your existing HTML/CSS skills instead of learning complex PDF libraries.`,
    icon: 'Receipt',
    keywords: [
      'PDF invoice generator',
      'HTML to PDF',
      'dynamic receipt generation',
      'automated invoicing',
      'PDF from HTML',
    ],
    benefits: [
      'Generate PDFs from HTML templates',
      'Perfect rendering with CSS support',
      'No complex PDF libraries needed',
      'Dynamic data binding in templates',
    ],
    steps: [
      'Create HTML/CSS invoice templates',
      'Render templates with dynamic data',
      'Host rendered HTML temporarily or use data URLs',
      'Capture as PDF with Screenshotly',
      'Deliver PDF to customers',
    ],
    metrics: [
      { stat: 'Pixel-perfect', label: 'PDF rendering' },
      { stat: '<2 sec', label: 'generation time' },
      { stat: '100%', label: 'CSS support' },
    ],
    codeExample: `// Generate PDF invoice from HTML template
const generateInvoice = async (invoiceData) => {
  // Render HTML template with data
  const htmlContent = renderInvoiceTemplate(invoiceData);
  
  // Capture as PDF
  const pdfResponse = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html: htmlContent, // Direct HTML input
      format: 'pdf',
      pdfOptions: {
        pageSize: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm' },
      },
    }),
  });
  
  return pdfResponse;
};`,
  },
  {
    slug: 'seo-audit-screenshots',
    title: 'SEO Audit & Performance Tracking',
    shortTitle: 'SEO Audits',
    description: 'Capture screenshots for SEO audits and track visual changes over time. Document SERP rankings and competitor positions.',
    longDescription: `SEO is increasingly visual. Core Web Vitals, layout shifts, and above-the-fold content all impact rankings. Screenshots help SEO professionals document issues, track progress, and report to clients.

Use Screenshotly to capture SERP pages for ranking documentation, competitor sites for comparison, and client pages for before/after audits. Mobile screenshots are especially valuable for mobile-first indexing analysis.

Agency SEO teams use screenshot automation to scale their auditing process, create visual reports for clients, and maintain historical records of all SEO changes. Combined with performance metrics, screenshots provide the complete picture.`,
    icon: 'Search',
    keywords: [
      'SEO audit screenshots',
      'SERP tracking',
      'SEO documentation',
      'website audit automation',
      'SEO visual reports',
    ],
    benefits: [
      'Document SERP rankings visually',
      'Create before/after comparison reports',
      'Track competitor SEO changes',
      'Build client-ready audit reports',
    ],
    steps: [
      'Define audit targets (client site, competitors, SERPs)',
      'Capture mobile and desktop versions',
      'Annotate screenshots with issues found',
      'Compare with previous audits',
      'Generate visual reports for stakeholders',
    ],
    metrics: [
      { stat: 'Both', label: 'mobile and desktop captures' },
      { stat: 'Historical', label: 'change tracking' },
      { stat: 'Client-ready', label: 'visual reports' },
    ],
    codeExample: `// Capture for SEO audit
const captureForAudit = async (clientUrl) => {
  // Mobile capture (mobile-first indexing)
  const mobile = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: clientUrl,
      device: 'mobile',
      format: 'png',
      fullPage: true,
    }),
  });
  
  // Desktop capture
  const desktop = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_API_KEY', 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: clientUrl, device: 'desktop', format: 'png', fullPage: true }),
  });
  
  return { mobile, desktop };
};`,
  },
  {
    slug: 'email-campaign-previews',
    title: 'Email Marketing Campaign Previews',
    shortTitle: 'Email Marketing',
    description: 'Embed dynamic website previews in email campaigns. Show recipients what\'s new on your site with fresh screenshots.',
    longDescription: `Static images in emails get stale. When you're promoting blog posts, product updates, or landing pages, recipients want to see what's actually on the page. Dynamic screenshots keep your emails fresh and relevant.

With Screenshotly, you can generate preview images of your content right before sending. Newsletter featuring your latest blog post? Capture a screenshot of the post and embed it. Promoting a sale? Show the actual sale page with current pricing.

Marketing teams use this for weekly roundups, product launch announcements, and personalized recommendations. The visual preview increases click-through rates because recipients can see exactly what they're clicking into.`,
    icon: 'Mail',
    keywords: [
      'email marketing screenshots',
      'newsletter preview images',
      'email campaign visuals',
      'dynamic email content',
      'marketing automation screenshots',
    ],
    benefits: [
      'Generate fresh previews for each send',
      'Increase email click-through rates',
      'Show actual content, not static images',
      'Automate visual content creation',
    ],
    steps: [
      'Identify content to feature in email',
      'Capture screenshots just before send',
      'Resize and optimize for email',
      'Embed in email template',
      'Track engagement metrics',
    ],
    metrics: [
      { stat: '+35%', label: 'higher click-through rates' },
      { stat: 'Fresh', label: 'content every send' },
      { stat: 'Automated', label: 'visual generation' },
    ],
    codeExample: `// Generate email preview image
const generateEmailPreview = async (contentUrl) => {
  const preview = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: contentUrl,
      device: 'desktop',
      format: 'jpeg',
      quality: 80,
      viewport: { width: 600, height: 400 },
      aiRemoval: { enabled: true, types: ['cookie-banner', 'chat-widget'] },
    }),
  });
  
  return preview;
};`,
  },
  {
    slug: 'customer-support-documentation',
    title: 'Customer Support & Ticket Screenshots',
    shortTitle: 'Support Tickets',
    description: 'Capture screenshots to document customer issues and streamline support workflows. Reduce back-and-forth with visual evidence.',
    longDescription: `Customer support often involves asking "Can you send me a screenshot?" Automating this step speeds up resolution and reduces frustration. Capture what the customer sees automatically.

When a support ticket references a URL, automatically capture a screenshot for the support agent. This provides immediate context without waiting for the customer to respond. For reported bugs, scheduled captures can document intermittent issues.

Support teams using visual documentation resolve tickets faster, escalate with better context, and build knowledge bases with actual screenshots. The result is happier customers and more efficient support operations.`,
    icon: 'MessageCircle',
    keywords: [
      'support ticket screenshots',
      'customer support automation',
      'helpdesk screenshots',
      'bug documentation',
      'support workflow automation',
    ],
    benefits: [
      'Capture customer-reported issues automatically',
      'Reduce back-and-forth communication',
      'Document bugs with visual evidence',
      'Build visual knowledge base',
    ],
    steps: [
      'Integrate screenshot capture into support workflow',
      'Auto-capture URLs mentioned in tickets',
      'Attach screenshots to ticket for agent review',
      'Use for training and knowledge base creation',
      'Track resolution times with visual context',
    ],
    metrics: [
      { stat: '-40%', label: 'ticket response time' },
      { stat: 'Automatic', label: 'issue documentation' },
      { stat: 'Visual', label: 'knowledge base content' },
    ],
    codeExample: `// Capture screenshot for support ticket
const documentTicketIssue = async (ticketUrl, ticketId) => {
  const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: ticketUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
    }),
  });
  
  // Attach to support ticket
  await attachToTicket(ticketId, screenshot);
  
  return screenshot;
};`,
  },
  {
    slug: 'directory-submissions',
    title: 'Web Directory & Listing Submissions',
    shortTitle: 'Directory Listings',
    description: 'Generate professional thumbnails for directory submissions and product listings. Stand out with polished preview images.',
    longDescription: `Web directories, product hunt submissions, and startup listings all benefit from professional preview images. A polished thumbnail catches the eye and conveys quality before anyone clicks.

Use Screenshotly to capture your landing page and wrap it in a device mockup for submissions. The result looks more professional than manual screenshots and can be regenerated whenever your site updates.

Startups, SaaS companies, and indie hackers use this approach for Product Hunt launches, Indie Hackers directory entries, and curated list submissions. The professional presentation increases visibility and click-through from browsing users.`,
    icon: 'Layout',
    keywords: [
      'directory submission screenshots',
      'product hunt thumbnails',
      'startup listing images',
      'web directory screenshots',
      'professional thumbnails',
    ],
    benefits: [
      'Create polished directory thumbnails',
      'Stand out in product listings',
      'Auto-generate when site updates',
      'Professional device mockups included',
    ],
    steps: [
      'Identify directories and listings to submit',
      'Capture your landing page',
      'Apply device mockup frame',
      'Resize to directory requirements',
      'Submit with professional visuals',
    ],
    metrics: [
      { stat: 'Premium', label: 'presentation quality' },
      { stat: 'Automated', label: 'regeneration on update' },
      { stat: 'Higher', label: 'click-through rates' },
    ],
    codeExample: `// Generate directory listing thumbnail
const generateListingThumbnail = async (siteUrl) => {
  const thumbnail = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: siteUrl,
      device: 'desktop',
      format: 'png',
      mockup: {
        type: 'browser-light',
        shadow: true,
      },
      aiRemoval: { enabled: true, types: ['cookie-banner'] },
    }),
  });
  
  return thumbnail;
};`,
  },
  {
    slug: 'report-generation',
    title: 'Automated Report & Dashboard Capture',
    shortTitle: 'Report Generation',
    description: 'Capture dashboards and reports for automated distribution. Send stakeholders visual updates on schedule.',
    longDescription: `Executives and stakeholders want visual updates, not raw data. Capturing dashboards and reports as images enables automated distribution to people who don't have system access or time to log in.

Screenshotly can capture authenticated dashboards (pass session cookies), investor decks, analytics views, and operational reports. Schedule these captures and deliver them via email, Slack, or other channels on a regular cadence.

Finance teams, operations managers, and executives receive visual updates without needing dashboard access. The automation saves time for the teams who would otherwise manually export and distribute reports.`,
    icon: 'BarChart',
    keywords: [
      'dashboard screenshot automation',
      'automated report capture',
      'analytics distribution',
      'investor report screenshots',
      'scheduled report generation',
    ],
    benefits: [
      'Capture authenticated dashboards',
      'Schedule automated distribution',
      'Visual updates for stakeholders',
      'No dashboard access required for recipients',
    ],
    steps: [
      'Identify reports and dashboards to capture',
      'Set up authenticated capture with session cookies',
      'Schedule captures at reporting intervals',
      'Distribute via email, Slack, or other channels',
      'Archive for historical comparison',
    ],
    metrics: [
      { stat: 'Scheduled', label: 'automated delivery' },
      { stat: 'Authenticated', label: 'dashboard access' },
      { stat: 'Zero', label: 'manual export needed' },
    ],
    codeExample: `// Capture authenticated dashboard for reporting
const captureDashboard = async (dashboardUrl, sessionCookie) => {
  const report = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: dashboardUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
      cookies: [{ name: 'session', value: sessionCookie, domain: 'dashboard.company.com' }],
      delay: 3000, // Wait for charts to render
    }),
  });
  
  // Distribute to stakeholders
  await sendToSlack('#executive-updates', report);
  await sendEmail('exec-team@company.com', report);
  
  return report;
};`,
  },
  {
    slug: 'font-detection',
    title: 'Website Font Detection & Analysis',
    shortTitle: 'Font Detection',
    description: 'Identify and analyze fonts used on any website. Capture typography specimens for design reference and brand audits.',
    longDescription: `Typography defines brand identity. Whether you're a designer researching inspiration, a brand manager auditing consistency, or a developer matching fonts across platforms, capturing and analyzing website typography is essential.

Screenshotly captures pixel-perfect screenshots that preserve font rendering exactly as users see it. Combined with metadata extraction, you can document font stacks, sizes, weights, and line heights across any website. This is invaluable for design system documentation, competitive analysis, and brand audits.

Use targeted element capture to isolate headings, body text, and UI components for typography specimen sheets. Compare rendering across devices to ensure consistent brand presentation.`,
    icon: 'Type',
    keywords: [
      'font detection',
      'website typography',
      'font identification',
      'typography analysis',
      'brand font audit',
    ],
    benefits: [
      'Capture exact font rendering across browsers',
      'Create typography specimen sheets',
      'Audit brand consistency across pages',
      'Compare fonts on different devices',
    ],
    steps: [
      'Enter the target website URL',
      'Capture screenshots at multiple viewport sizes',
      'Isolate specific text elements with selector targeting',
      'Compare typography rendering across devices',
      'Export specimens for design documentation',
    ],
    metrics: [
      { stat: 'Pixel-perfect', label: 'font rendering capture' },
      { stat: 'Multi-device', label: 'typography comparison' },
      { stat: 'Automated', label: 'brand consistency audit' },
    ],
    codeExample: `// Capture typography specimens
const captureTypography = async (url) => {
  const specimens = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      device: 'desktop',
      format: 'png',
      selector: 'h1, h2, h3, p',
      fullPage: false,
    }),
  });

  return specimens;
};`,
    faqs: [
      {
        question: "Can I capture how fonts render differently across browsers?",
        answer: "Yes. Capture the same page across different browser engines to compare font rendering. This helps identify font smoothing differences and ensures your typography looks great everywhere."
      },
      {
        question: "How do I create a typography style guide from screenshots?",
        answer: "Capture isolated headings, body text, and UI labels using CSS selector targeting. Combine these captures into a comprehensive typography specimen sheet for your design system."
      },
    ],
  },
  {
    slug: 'news-archival',
    title: 'News Article & Media Archival',
    shortTitle: 'News Archival',
    description: 'Archive news articles, press coverage, and media mentions with timestamped screenshots. Preserve content before it changes or disappears.',
    longDescription: `News articles get updated, paywalled, or removed. For PR teams, legal departments, researchers, and compliance officers, having an archived snapshot of the original article is essential. A URL alone isn't enough—you need proof of what was published and when.

Screenshotly captures full-page screenshots of news articles with timestamps, preserving the exact content, layout, and context. This creates a visual record that's more reliable than cached HTML and easier to share than browser archives.

Set up automated monitoring to capture articles as they're published, or archive historical coverage on demand. Full-page capture ensures you get the complete article including images, embedded content, and comments.`,
    icon: 'Newspaper',
    keywords: [
      'news archival',
      'press clipping',
      'media monitoring',
      'article archival',
      'news screenshot',
    ],
    benefits: [
      'Preserve articles before edits or deletion',
      'Timestamped proof of publication',
      'Full-page capture with all media',
      'Automated monitoring and archival',
    ],
    steps: [
      'Set up news monitoring for your brand or topics',
      'Capture full-page screenshots when articles are detected',
      'Store with metadata (URL, date, publication)',
      'Organize in a searchable archive',
      'Export for reports or legal proceedings',
    ],
    metrics: [
      { stat: 'Timestamped', label: 'proof of publication' },
      { stat: 'Full-page', label: 'complete article capture' },
      { stat: 'Automated', label: 'monitoring and archival' },
    ],
    codeExample: `// Archive a news article
const archiveArticle = async (articleUrl) => {
  const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: articleUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
      aiRemoval: {
        enabled: true,
        types: ['cookie-banner', 'popup'],
      },
    }),
  });

  // Store with metadata
  await saveToArchive(screenshot, {
    url: articleUrl,
    capturedAt: new Date().toISOString(),
  });
};`,
    faqs: [
      {
        question: "Can I archive paywalled articles?",
        answer: "If you have a subscription, you can pass authentication cookies to capture content behind paywalls. This ensures your archive includes the full article content."
      },
      {
        question: "How long should I retain archived screenshots?",
        answer: "Retention depends on your use case. PR teams typically keep archives for 1-3 years, legal teams may need indefinite retention, and researchers often maintain topic-specific archives."
      },
    ],
  },
  {
    slug: 'price-tracking',
    title: 'Competitor Price & Product Tracking',
    shortTitle: 'Price Tracking',
    description: 'Monitor competitor pricing, product changes, and market positioning with automated screenshot comparison.',
    longDescription: `In competitive markets, pricing changes fast. Competitors launch promotions, adjust tiers, add features, and reposition products constantly. Manual monitoring doesn't scale—you need automated visual tracking.

Screenshotly captures competitor pricing pages, product listings, and feature comparisons on schedule. By comparing screenshots over time, you can detect changes in pricing structure, new features, removed offerings, and market positioning shifts.

E-commerce teams use this for price matching, SaaS companies track competitor feature launches, and market researchers monitor industry trends. Visual comparison catches changes that simple text scraping misses—including layout changes, promotional banners, and visual emphasis.`,
    icon: 'TrendingUp',
    keywords: [
      'price monitoring',
      'competitor tracking',
      'price comparison',
      'market intelligence',
      'competitive pricing',
    ],
    benefits: [
      'Automated competitor price monitoring',
      'Visual change detection over time',
      'Track feature and positioning changes',
      'Historical pricing archive',
    ],
    steps: [
      'List competitor pricing and product pages',
      'Schedule regular screenshot captures',
      'Compare new captures with baselines',
      'Alert team on significant changes',
      'Archive pricing history for analysis',
    ],
    metrics: [
      { stat: 'Automated', label: 'competitor monitoring' },
      { stat: 'Visual', label: 'change detection' },
      { stat: 'Historical', label: 'pricing archive' },
    ],
    codeExample: `// Monitor competitor pricing
const monitorPricing = async (competitorUrl) => {
  const current = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: competitorUrl,
      device: 'desktop',
      format: 'png',
    }),
  });

  const baseline = await getBaseline(competitorUrl);
  const changes = await compareImages(current, baseline);

  if (changes.detected) {
    await notifyTeam('Pricing change detected', changes);
  }

  await updateBaseline(competitorUrl, current);
};`,
    faqs: [
      {
        question: "How often should I capture competitor pricing pages?",
        answer: "Daily captures work well for most markets. High-competition markets like e-commerce or travel may benefit from more frequent monitoring. Set up alerts for significant changes."
      },
      {
        question: "Can I track changes across multiple competitors?",
        answer: "Yes. Set up batch captures for all competitor URLs and compare each against its own baseline. Our concurrent capture supports monitoring dozens of competitors simultaneously."
      },
    ],
  },
  {
    slug: 'certificate-generation',
    title: 'Certificate & Award Generation',
    shortTitle: 'Certificates',
    description: 'Generate professional certificates, awards, and diplomas from HTML templates. Perfect for online courses, events, and recognition programs.',
    longDescription: `Online courses, webinars, events, and employee recognition programs all need certificates. Designing each one manually doesn't scale. HTML-to-image conversion lets you templatize certificate generation and produce them on demand.

Screenshotly renders HTML certificate templates into high-resolution images or PDFs. Merge data—recipient name, course title, date, instructor—into your template and generate unique certificates for each recipient. The result is a professional, print-ready document.

This approach scales from tens to thousands of certificates. Online learning platforms generate completion certificates automatically, companies create employee recognition awards, and event organizers produce attendee certificates—all from a single template.`,
    icon: 'Award',
    keywords: [
      'certificate generator',
      'award generation',
      'diploma template',
      'course completion certificate',
      'online certificate',
    ],
    benefits: [
      'Generate certificates from HTML templates',
      'Merge recipient data dynamically',
      'High-resolution print-ready output',
      'Scale from tens to thousands',
    ],
    steps: [
      'Design your certificate template in HTML/CSS',
      'Add template variables for recipient data',
      'Call the API with merged HTML for each recipient',
      'Download PNG or PDF certificates',
      'Distribute via email or download portal',
    ],
    metrics: [
      { stat: 'Automated', label: 'certificate generation' },
      { stat: 'Print-ready', label: 'high resolution output' },
      { stat: 'Scalable', label: 'from 1 to 10,000+' },
    ],
    codeExample: `// Generate a course completion certificate
const generateCertificate = async (recipientData) => {
  const html = certificateTemplate
    .replace('{{name}}', recipientData.name)
    .replace('{{course}}', recipientData.course)
    .replace('{{date}}', recipientData.date);

  const certificate = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      format: 'png',
      viewport: { width: 1200, height: 850 },
    }),
  });

  return certificate;
};`,
    faqs: [
      {
        question: "What resolution should I use for printable certificates?",
        answer: "Use a 2x device scale factor with a 1200x850 viewport for A4 landscape certificates. This produces images suitable for both screen viewing and printing."
      },
      {
        question: "Can I add digital signatures to certificates?",
        answer: "Yes! Include signature images in your HTML template. For verifiable certificates, add a QR code linking to a verification page."
      },
    ],
  },
  {
    slug: 'portfolio-showcase',
    title: 'Portfolio & Agency Showcase',
    shortTitle: 'Portfolio',
    description: 'Showcase client websites and projects with professional screenshots. Build impressive agency portfolios automatically.',
    longDescription: `Design agencies and freelancers need to showcase their work. But clients change websites, domains expire, and redesigns happen. A portfolio built on live links breaks over time. Screenshot-based portfolios preserve your best work permanently.

Screenshotly captures desktop, tablet, and mobile views of each project, creating a comprehensive visual showcase. Device mockup frames turn screenshots into polished portfolio pieces that demonstrate responsive design skills.

Automate portfolio updates by capturing client sites on schedule. When a project launches, trigger captures for all device sizes and add them to your portfolio immediately. No manual screenshots, no browser cropping, no inconsistent captures.`,
    icon: 'Layout',
    keywords: [
      'portfolio screenshots',
      'agency showcase',
      'web design portfolio',
      'client work showcase',
      'freelancer portfolio',
    ],
    benefits: [
      'Preserve work even after client changes',
      'Multi-device captures for each project',
      'Consistent, professional presentation',
      'Automated portfolio updates on launch',
    ],
    steps: [
      'Add client project URLs to your portfolio system',
      'Capture desktop, tablet, and mobile screenshots',
      'Apply device mockup frames for presentation',
      'Organize by category, industry, or date',
      'Auto-update when projects are redesigned',
    ],
    metrics: [
      { stat: 'Multi-device', label: 'responsive showcase' },
      { stat: 'Permanent', label: 'portfolio preservation' },
      { stat: 'Professional', label: 'device mockup frames' },
    ],
    codeExample: `// Capture portfolio project across devices
const captureProject = async (projectUrl) => {
  const devices = ['desktop', 'tablet', 'mobile'];
  const captures = {};

  for (const device of devices) {
    captures[device] = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: projectUrl,
        device,
        format: 'png',
        aiRemoval: { enabled: true, types: ['cookie-banner'] },
      }),
    });
  }

  return captures;
};`,
    faqs: [
      {
        question: "How do I handle password-protected client sites?",
        answer: "Pass authentication cookies or credentials with your API request to capture behind logins. Alternatively, capture during the staging phase when the site is publicly accessible."
      },
      {
        question: "Can I add device frames to screenshots?",
        answer: "Yes! Our device mockup feature wraps screenshots in realistic browser, phone, or tablet frames for professional portfolio presentation."
      },
    ],
  },
  {
    slug: 'ad-verification',
    title: 'Ad Creative & Placement Verification',
    shortTitle: 'Ad Verification',
    description: 'Verify ad placements, creative rendering, and brand safety across publisher websites with automated screenshots.',
    longDescription: `Digital advertising requires verification. Are your ads displaying correctly? Are they appearing on brand-safe sites? Is the creative rendering as designed? Manual checking across hundreds of placements is impossible at scale.

Screenshotly automates ad verification by capturing publisher pages where your ads appear. This provides visual proof of ad placement, rendering quality, and surrounding content. Compliance teams can verify brand safety, and creative teams can confirm rendering.

Set up scheduled captures across your ad network to monitor placements continuously. Detect issues like broken creatives, incorrect sizing, competitor adjacency, and inappropriate content before they impact your brand.`,
    icon: 'Monitor',
    keywords: [
      'ad verification',
      'ad placement monitoring',
      'creative verification',
      'brand safety',
      'ad compliance',
    ],
    benefits: [
      'Visual proof of ad placements',
      'Brand safety monitoring',
      'Creative rendering verification',
      'Automated compliance checks',
    ],
    steps: [
      'List publisher URLs where ads are placed',
      'Schedule regular screenshot captures',
      'Verify ad rendering and positioning',
      'Check surrounding content for brand safety',
      'Archive for compliance documentation',
    ],
    metrics: [
      { stat: 'Visual', label: 'placement verification' },
      { stat: 'Automated', label: 'brand safety checks' },
      { stat: 'Archived', label: 'compliance documentation' },
    ],
    codeExample: `// Verify ad placement
const verifyAdPlacement = async (publisherUrl, adSelector) => {
  const page = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: publisherUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
    }),
  });

  // Check if ad is visible and correctly rendered
  await analyzeAdPlacement(page, adSelector);

  return page;
};`,
    faqs: [
      {
        question: "Can I verify ads across different geographic regions?",
        answer: "Yes. Use geo-targeting options to capture pages from different locations, verifying that geo-targeted ads are displaying correctly in each market."
      },
      {
        question: "How do I detect broken ad creatives?",
        answer: "Compare captured screenshots against expected creative mockups using visual comparison. Significant differences indicate rendering issues that need attention."
      },
    ],
  },
  {
    slug: 'travel-listings',
    title: 'Travel & Hospitality Listing Capture',
    shortTitle: 'Travel Listings',
    description: 'Capture hotel listings, travel deals, and booking pages for comparison, archival, and competitive analysis.',
    longDescription: `Travel and hospitality companies need to monitor listings across OTAs (Online Travel Agencies), compare pricing, and ensure accurate representation. Screenshots capture the exact listing as customers see it—including pricing, availability, photos, and reviews.

Screenshotly automates the capture of booking pages, hotel listings, and travel deals across platforms like Booking.com, Expedia, and Airbnb. This enables price comparison, competitive monitoring, and compliance verification for listed properties.

Revenue managers use these captures to verify rate parity across channels. Marketing teams ensure brand representation is consistent. Compliance teams verify that listings meet accuracy standards and regulations.`,
    icon: 'MapPin',
    keywords: [
      'travel screenshot',
      'hotel listing capture',
      'booking page screenshot',
      'OTA monitoring',
      'travel comparison',
    ],
    benefits: [
      'Monitor listings across OTA platforms',
      'Verify rate parity across channels',
      'Track competitor positioning',
      'Archive listings for compliance',
    ],
    steps: [
      'Identify listing pages across booking platforms',
      'Schedule regular screenshot captures',
      'Compare pricing and availability across channels',
      'Verify listing accuracy and representation',
      'Archive for compliance and dispute resolution',
    ],
    metrics: [
      { stat: 'Multi-platform', label: 'OTA monitoring' },
      { stat: 'Automated', label: 'rate parity checks' },
      { stat: 'Historical', label: 'listing archive' },
    ],
    codeExample: `// Capture hotel listing across platforms
const captureListings = async (hotelName) => {
  const platforms = [
    'https://booking.com/hotel/' + hotelName,
    'https://expedia.com/hotel/' + hotelName,
    'https://hotels.com/hotel/' + hotelName,
  ];

  const captures = await Promise.all(
    platforms.map(url =>
      fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: 'desktop',
          format: 'png',
          fullPage: true,
        }),
      })
    )
  );

  return captures;
};`,
    faqs: [
      {
        question: "Can I capture listings from multiple OTA platforms simultaneously?",
        answer: "Yes! Use batch capture to screenshot listings across Booking.com, Expedia, Hotels.com, and other platforms concurrently, enabling side-by-side rate comparison."
      },
      {
        question: "How do I handle dynamic pricing on booking pages?",
        answer: "Capture at consistent times and with consistent parameters (dates, guests). This ensures pricing comparisons are accurate and meaningful."
      },
    ],
  },
  {
    slug: 'education-platforms',
    title: 'Education & LMS Content Capture',
    shortTitle: 'Education',
    description: 'Capture course content, student work, and learning materials for education platforms. Document progress and generate certificates.',
    longDescription: `Educational platforms need screenshots for multiple purposes: course previews, student portfolio documentation, progress tracking, and certificate generation. Manual capture doesn't scale for platforms serving thousands of students.

Screenshotly integrates with Learning Management Systems (LMS) to automate content capture. Generate course thumbnails from lesson content, capture student project showcase pages, create completion certificates, and document assessment results.

Instructors use captures for course marketing materials. Students get professional screenshots of their work for portfolios. Administrators generate visual reports on platform usage and course engagement.`,
    icon: 'GraduationCap',
    keywords: [
      'education screenshots',
      'LMS capture',
      'course thumbnail',
      'student portfolio',
      'e-learning screenshots',
    ],
    benefits: [
      'Auto-generate course thumbnails',
      'Capture student project showcases',
      'Generate completion certificates',
      'Visual progress documentation',
    ],
    steps: [
      'Connect Screenshotly to your LMS platform',
      'Auto-generate thumbnails for new courses',
      'Capture student project pages for portfolios',
      'Generate certificates on course completion',
      'Create visual progress reports',
    ],
    metrics: [
      { stat: 'Automated', label: 'course thumbnails' },
      { stat: 'Scalable', label: 'certificate generation' },
      { stat: 'Professional', label: 'student portfolios' },
    ],
    codeExample: `// Generate course thumbnail from content
const generateCourseThumbnail = async (courseUrl) => {
  const thumbnail = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: courseUrl,
      device: 'desktop',
      format: 'png',
      viewport: { width: 1200, height: 630 },
      aiRemoval: { enabled: true, types: ['cookie-banner', 'chat-widget'] },
    }),
  });

  return thumbnail;
};`,
    faqs: [
      {
        question: "Can I generate certificates for thousands of students?",
        answer: "Yes! Use batch processing to generate certificates from HTML templates with merged student data. Our API handles thousands of generations per hour."
      },
      {
        question: "How do I capture authenticated student pages?",
        answer: "Pass session cookies with your API request to access authenticated content. This enables capturing student dashboards, grades, and private portfolios."
      },
    ],
  },
  {
    slug: 'legal-compliance',
    title: 'Legal & Regulatory Compliance Documentation',
    shortTitle: 'Legal Compliance',
    description: 'Document website compliance with timestamped screenshots. Capture consent flows, terms pages, and regulatory disclosures.',
    longDescription: `Regulatory compliance requires documented evidence. When regulators ask "what did your website say on this date?", you need a verifiable answer. Screenshots with timestamps provide legally useful documentation of website content at specific points in time.

Screenshotly captures terms of service, privacy policies, consent flows, cookie banners, and regulatory disclosures. Set up scheduled captures to maintain a continuous compliance record. Full-page captures ensure you document every disclaimer and disclosure.

GDPR, CCPA, HIPAA, and industry-specific regulations all require demonstrable compliance. Visual documentation supplements technical logs and provides clear evidence that required elements were present and properly displayed.`,
    icon: 'Scale',
    keywords: [
      'compliance screenshots',
      'legal documentation',
      'regulatory compliance',
      'GDPR documentation',
      'terms of service archival',
    ],
    benefits: [
      'Timestamped compliance evidence',
      'Automated regulatory documentation',
      'Full-page consent flow capture',
      'Historical compliance archive',
    ],
    steps: [
      'Identify pages requiring compliance documentation',
      'Set up scheduled capture for regulatory pages',
      'Capture full consent flows with step-by-step screenshots',
      'Store with timestamps and metadata',
      'Generate compliance reports for auditors',
    ],
    metrics: [
      { stat: 'Timestamped', label: 'legal evidence' },
      { stat: 'Automated', label: 'compliance monitoring' },
      { stat: 'Comprehensive', label: 'full-page archival' },
    ],
    codeExample: `// Capture compliance documentation
const captureCompliance = async (pages) => {
  const captures = [];

  for (const page of pages) {
    const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: page.url,
        device: 'desktop',
        format: 'png',
        fullPage: true,
      }),
    });

    captures.push({
      page: page.name,
      url: page.url,
      screenshot,
      capturedAt: new Date().toISOString(),
    });
  }

  return captures;
};`,
    faqs: [
      {
        question: "Are timestamped screenshots legally admissible?",
        answer: "Timestamped screenshots serve as supporting evidence in legal proceedings. For maximum legal weight, combine with server logs, digital signatures, and blockchain timestamping."
      },
      {
        question: "How often should compliance pages be captured?",
        answer: "Weekly captures work for most organizations. Capture immediately after any policy changes. High-regulation industries may benefit from daily captures."
      },
    ],
  },
  {
    slug: 'healthcare-documentation',
    title: 'Healthcare & Telehealth Documentation',
    shortTitle: 'Healthcare Docs',
    description: 'Capture patient portal interfaces, telehealth sessions, and medical documentation for records and compliance.',
    longDescription: `Healthcare organizations need visual documentation for compliance, training, and quality assurance. Telehealth platforms document session interfaces, patient portals capture consent forms, and training departments document system workflows.

Screenshotly captures healthcare interfaces with careful attention to privacy. Use element targeting to exclude PHI (Protected Health Information) while documenting system functionality. This enables compliance documentation, training material creation, and quality assurance without compromising patient privacy.

HIPAA compliance requires documented procedures. Screenshots of system workflows, consent flows, and security configurations provide visual evidence for compliance audits. Telehealth platforms use captures to verify that patient-facing interfaces meet accessibility and usability standards.`,
    icon: 'Heart',
    keywords: [
      'healthcare screenshots',
      'telehealth capture',
      'medical documentation',
      'HIPAA compliance',
      'patient portal documentation',
    ],
    benefits: [
      'Document system workflows for compliance',
      'Create training materials from live systems',
      'Verify telehealth interface quality',
      'Exclude PHI with targeted capture',
    ],
    steps: [
      'Identify interfaces requiring documentation',
      'Configure capture to exclude PHI elements',
      'Capture workflows step by step',
      'Create training documentation from captures',
      'Archive for compliance audits',
    ],
    metrics: [
      { stat: 'HIPAA-aware', label: 'PHI exclusion' },
      { stat: 'Documented', label: 'system workflows' },
      { stat: 'Compliant', label: 'audit-ready records' },
    ],
    codeExample: `// Capture healthcare workflow (excluding PHI)
const captureWorkflow = async (systemUrl, steps) => {
  const captures = [];

  for (const step of steps) {
    const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: systemUrl + step.path,
        device: 'desktop',
        format: 'png',
        // Exclude PHI elements
        hideSelectors: ['.patient-name', '.dob', '.mrn', '.ssn'],
      }),
    });

    captures.push({ step: step.name, screenshot });
  }

  return captures;
};`,
    faqs: [
      {
        question: "How do I ensure PHI is not captured in screenshots?",
        answer: "Use the hideSelectors option to exclude elements containing PHI like patient names, dates of birth, and medical record numbers. Always review captures before sharing."
      },
      {
        question: "Is Screenshotly HIPAA compliant?",
        answer: "We do not store PHI. Screenshots are generated on demand and delivered directly to you. For HIPAA compliance, ensure you handle and store captures according to your organization's policies."
      },
    ],
  },
  {
    slug: 'marketplace-listings',
    title: 'Marketplace & Directory Listing Screenshots',
    shortTitle: 'Marketplace',
    description: 'Capture and display website screenshots for marketplace listings, business directories, and app stores.',
    longDescription: `Marketplaces and directories need visual previews of listed websites, apps, and businesses. Whether you're building a web directory, a theme marketplace, or a business listing platform, screenshots provide the visual context users need to make decisions.

Screenshotly captures consistent, professional screenshots for every listing. Auto-generate thumbnails when sellers submit their websites, refresh screenshots on schedule, and display them in search results and listing cards.

This removes the burden from sellers (who would otherwise upload their own inconsistent screenshots) and ensures every listing looks professional. Marketplaces like ThemeForest, ProductHunt, and business directories all benefit from automated screenshot generation.`,
    icon: 'Store',
    keywords: [
      'marketplace screenshots',
      'directory listings',
      'app store screenshots',
      'business directory',
      'listing preview',
    ],
    benefits: [
      'Consistent previews for all listings',
      'Auto-generate on submission',
      'Scheduled refresh for current screenshots',
      'Multi-device previews for themes/apps',
    ],
    steps: [
      'Capture screenshots when listings are submitted',
      'Generate multiple device views for each listing',
      'Display in search results and listing cards',
      'Schedule periodic refreshes',
      'Handle errors with placeholder images',
    ],
    metrics: [
      { stat: 'Automated', label: 'listing previews' },
      { stat: 'Consistent', label: 'across all listings' },
      { stat: 'Multi-device', label: 'responsive previews' },
    ],
    codeExample: `// Generate listing screenshot on submission
const generateListingPreview = async (listingUrl) => {
  const views = ['desktop', 'tablet', 'mobile'];
  const previews = {};

  for (const device of views) {
    previews[device] = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: listingUrl,
        device,
        format: 'png',
        aiRemoval: { enabled: true, types: ['cookie-banner', 'popup'] },
      }),
    });
  }

  return previews;
};`,
    faqs: [
      {
        question: "How do I handle listings with invalid or offline URLs?",
        answer: "Check URL accessibility before capture. Display a default placeholder image for listings where the screenshot fails. Queue retries for temporary failures."
      },
      {
        question: "Should I refresh listing screenshots automatically?",
        answer: "Yes, schedule weekly or monthly refreshes to keep listings current. Prioritize active listings with recent traffic."
      },
    ],
  },
  {
    slug: 'bug-tracking',
    title: 'Visual Bug Tracking & Issue Reporting',
    shortTitle: 'Bug Tracking',
    description: 'Capture visual bugs with context-rich screenshots for developers. Attach screenshots to bug reports automatically.',
    longDescription: `"It doesn't look right" is the most common bug report. Without a screenshot, developers waste time reproducing issues. Automated visual bug tracking captures the exact state of the page with full context—viewport size, browser, URL, and visual state.

Screenshotly integrates with bug tracking tools like Jira, Linear, and GitHub Issues to attach screenshots automatically. When users report issues, capture the page state and attach it to the ticket. Developers see exactly what the user saw.

For QA teams, scheduled captures across browsers and devices catch visual regressions before users report them. Compare current screenshots against baselines and auto-create tickets when differences exceed thresholds.`,
    icon: 'Bug',
    keywords: [
      'bug tracking screenshots',
      'visual bug report',
      'issue reporting',
      'QA screenshots',
      'visual debugging',
    ],
    benefits: [
      'Screenshot context with every bug report',
      'Automated visual regression detection',
      'Integration with Jira, Linear, GitHub',
      'Cross-browser issue documentation',
    ],
    steps: [
      'Integrate screenshot capture into error handling',
      'Attach screenshots to bug tracking tickets',
      'Set up visual regression monitoring',
      'Compare across browsers and devices',
      'Auto-create tickets for visual changes',
    ],
    metrics: [
      { stat: 'Contextual', label: 'bug screenshots' },
      { stat: 'Automated', label: 'regression detection' },
      { stat: 'Integrated', label: 'with issue trackers' },
    ],
    codeExample: `// Capture bug context screenshot
const captureBugReport = async (pageUrl, errorDetails) => {
  const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: pageUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
    }),
  });

  // Create Jira ticket with screenshot
  await createJiraTicket({
    summary: 'Visual bug: ' + errorDetails.title,
    description: errorDetails.description,
    attachment: screenshot,
  });

  return screenshot;
};`,
    faqs: [
      {
        question: "Can I capture screenshots on user-triggered error reports?",
        answer: "Yes! Add a 'Report Bug' button that captures the current page state via API and creates a ticket with the screenshot attached."
      },
      {
        question: "How do I integrate with Jira or Linear?",
        answer: "Use their REST APIs to create tickets with screenshot attachments. Capture the screenshot, upload it, and reference it in the ticket creation payload."
      },
    ],
  },
  {
    slug: 'accessibility-audit',
    title: 'Accessibility & WCAG Compliance Auditing',
    shortTitle: 'Accessibility',
    description: 'Capture and document accessibility compliance across your website. Visual audit of WCAG conformance.',
    longDescription: `Web accessibility compliance requires visual documentation. WCAG audits need screenshots showing focus states, color contrast, text sizing, and keyboard navigation paths. Manual capture is tedious and inconsistent.

Screenshotly captures pages in specific states needed for accessibility audits: high-contrast mode, zoomed views, keyboard focus states, and screen reader outlines. These captures document current compliance and track improvements over time.

Accessibility consultants use automated captures to efficiently audit large sites. Development teams capture before-and-after states to document fixes. Legal teams maintain compliance records for ADA and similar regulations.`,
    icon: 'Eye',
    keywords: [
      'accessibility audit',
      'WCAG compliance',
      'a11y screenshots',
      'accessibility testing',
      'ADA compliance',
    ],
    benefits: [
      'Document WCAG compliance visually',
      'Capture at different zoom levels',
      'Track accessibility improvements',
      'Efficient large-site auditing',
    ],
    steps: [
      'Define pages and states to audit',
      'Capture at standard and zoomed viewports',
      'Document focus states and keyboard navigation',
      'Compare against WCAG criteria',
      'Archive for compliance records',
    ],
    metrics: [
      { stat: 'WCAG-ready', label: 'compliance documentation' },
      { stat: 'Multi-state', label: 'focus and zoom capture' },
      { stat: 'Historical', label: 'improvement tracking' },
    ],
    codeExample: `// Capture page at different zoom levels for a11y audit
const auditAccessibility = async (url) => {
  const viewports = [
    { width: 1280, height: 800, scale: 1 },   // Standard
    { width: 1280, height: 800, scale: 1.5 },  // 150% zoom
    { width: 1280, height: 800, scale: 2 },    // 200% zoom
  ];

  const captures = await Promise.all(
    viewports.map(vp =>
      fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          device: 'desktop',
          format: 'png',
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.scale,
        }),
      })
    )
  );

  return captures;
};`,
    faqs: [
      {
        question: "Can I test keyboard navigation with screenshots?",
        answer: "Capture screenshots with JavaScript injection to simulate tab focus states. This documents the visual focus indicator for WCAG 2.4.7 compliance."
      },
      {
        question: "How do I document color contrast compliance?",
        answer: "Capture at standard and high-contrast modes. Combine with automated contrast analysis tools for comprehensive WCAG 1.4.3 compliance documentation."
      },
    ],
  },
  {
    slug: 'social-proof-widgets',
    title: 'Social Proof & Testimonial Widgets',
    shortTitle: 'Social Proof',
    description: 'Capture customer reviews, social media mentions, and testimonials as visual social proof for your website.',
    longDescription: `Social proof drives conversions. Screenshots of real customer reviews, social media mentions, and case study results provide more credible proof than text testimonials alone. A screenshot of a genuine tweet, G2 review, or support ticket carries more weight.

Screenshotly captures social media posts, review platform entries, and customer communications as visual testimonials. Embed these screenshots in landing pages, email campaigns, and sales collateral. The visual format is more credible and engaging than copy-pasted text.

Automate the capture of mentions and reviews as they appear. Build a library of social proof assets that your marketing team can use across channels.`,
    icon: 'ThumbsUp',
    keywords: [
      'social proof screenshots',
      'testimonial capture',
      'review screenshots',
      'social media proof',
      'customer review widget',
    ],
    benefits: [
      'Visual credibility over text testimonials',
      'Automated capture of reviews and mentions',
      'Embeddable social proof assets',
      'Cross-channel marketing material',
    ],
    steps: [
      'Monitor review platforms and social media',
      'Capture positive mentions as screenshots',
      'Crop to focus on relevant content',
      'Add to testimonial library',
      'Embed in landing pages and emails',
    ],
    metrics: [
      { stat: 'Visual', label: 'social proof assets' },
      { stat: 'Automated', label: 'mention capture' },
      { stat: 'Credible', label: 'authentic screenshots' },
    ],
    codeExample: `// Capture a tweet as social proof
const captureTweet = async (tweetUrl) => {
  const screenshot = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: tweetUrl,
      device: 'desktop',
      format: 'png',
      selector: 'article', // Capture just the tweet
      aiRemoval: { enabled: true, types: ['cookie-banner'] },
    }),
  });

  return screenshot;
};`,
    faqs: [
      {
        question: "Can I capture reviews from G2, Capterra, or Trustpilot?",
        answer: "Yes! Capture individual reviews using CSS selector targeting to isolate the review content. This creates clean, focused social proof assets."
      },
      {
        question: "How do I keep social proof screenshots updated?",
        answer: "Schedule periodic recaptures. If the original content is deleted, you'll still have the screenshot as a record of the testimonial."
      },
    ],
  },
  {
    slug: 'api-documentation-images',
    title: 'API Documentation Visual Guides',
    shortTitle: 'API Docs',
    description: 'Generate visual guides for API documentation with endpoint screenshots, response previews, and interactive examples.',
    longDescription: `Good API documentation goes beyond text. Visual guides showing response previews, dashboard views, and playground interfaces help developers understand your API faster. Screenshots of API playgrounds, Postman collections, and response formats make documentation more accessible.

Screenshotly captures your API playground, admin dashboards, and integration examples for documentation. Keep images automatically updated as your API evolves. This ensures developers always see current interface states and response formats.

Technical writers use automated captures to maintain visual consistency across large documentation sets. Product teams ensure that screenshots reflect the latest API version without manual updates.`,
    icon: 'Code',
    keywords: [
      'API documentation screenshots',
      'developer docs images',
      'API playground capture',
      'technical documentation',
      'API visual guide',
    ],
    benefits: [
      'Auto-update documentation images',
      'Capture API playgrounds and dashboards',
      'Consistent visual style across docs',
      'Version-specific screenshot archives',
    ],
    steps: [
      'Identify pages to capture for documentation',
      'Set up capture triggers on deployment',
      'Generate screenshots for each API version',
      'Embed in documentation platform',
      'Archive previous versions for reference',
    ],
    metrics: [
      { stat: 'Automated', label: 'doc image updates' },
      { stat: 'Consistent', label: 'visual documentation' },
      { stat: 'Versioned', label: 'screenshot archive' },
    ],
    codeExample: `// Capture API playground for docs
const captureApiDocs = async (pages) => {
  const docImages = {};

  for (const page of pages) {
    docImages[page.name] = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: page.url,
        device: 'desktop',
        format: 'png',
        aiRemoval: { enabled: true, types: ['cookie-banner', 'chat-widget'] },
      }),
    });
  }

  return docImages;
};`,
    faqs: [
      {
        question: "Can I capture authenticated admin interfaces for docs?",
        answer: "Yes! Pass session cookies to capture logged-in views of dashboards, admin panels, and API management interfaces."
      },
      {
        question: "How do I handle API version-specific documentation images?",
        answer: "Tag captures with version numbers and maintain separate image sets for each API version. Serve the appropriate images based on the documentation version being viewed."
      },
    ],
  },
  {
    slug: 'dashboard-snapshots',
    title: 'Dashboard & Analytics Snapshot Delivery',
    shortTitle: 'Dashboard Snapshots',
    description: 'Capture BI dashboards and analytics views for automated delivery to stakeholders who lack system access.',
    longDescription: `Not everyone has access to your analytics dashboards. Executives, clients, board members, and external partners need regular visual updates without logging into complex BI tools. Screenshot-based delivery solves this elegantly.

Screenshotly captures authenticated dashboards—Grafana, Metabase, Looker, Google Analytics, custom dashboards—and delivers them on schedule. Recipients get polished, contextualized visual reports without needing credentials or training on BI tools.

This approach works for internal reporting (weekly metrics emails), client reporting (monthly performance reviews), and investor updates (quarterly business dashboards). The visual format is immediately understandable and shareable.`,
    icon: 'PieChart',
    keywords: [
      'dashboard screenshot',
      'analytics capture',
      'BI dashboard delivery',
      'automated reporting',
      'Grafana screenshot',
    ],
    benefits: [
      'Deliver dashboards to non-technical stakeholders',
      'Scheduled automated capture and delivery',
      'No tool access required for recipients',
      'Historical dashboard archive',
    ],
    steps: [
      'Configure authenticated dashboard access',
      'Set capture schedule (daily, weekly, monthly)',
      'Wait for charts and visualizations to render',
      'Distribute via email, Slack, or reports',
      'Archive for trend analysis',
    ],
    metrics: [
      { stat: 'Scheduled', label: 'automated delivery' },
      { stat: 'Authenticated', label: 'secure dashboard access' },
      { stat: 'Multi-channel', label: 'email, Slack, PDF' },
    ],
    codeExample: `// Capture and deliver dashboard snapshot
const deliverDashboard = async (config) => {
  const dashboard = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: config.dashboardUrl,
      device: 'desktop',
      format: 'png',
      fullPage: true,
      cookies: config.sessionCookies,
      delay: 5000, // Wait for charts to load
      viewport: { width: 1920, height: 1080 },
    }),
  });

  // Deliver to stakeholders
  await sendEmail(config.recipients, {
    subject: 'Weekly Dashboard Report',
    attachment: dashboard,
  });

  return dashboard;
};`,
    faqs: [
      {
        question: "How do I capture Grafana or Metabase dashboards?",
        answer: "Pass authentication cookies or API tokens with your request. Add a delay of 3-5 seconds to ensure all charts and visualizations have fully rendered before capture."
      },
      {
        question: "Can I combine multiple dashboard views into one report?",
        answer: "Yes! Capture multiple dashboard pages and combine them into a single PDF report. This gives stakeholders a comprehensive view from a single document."
      },
    ],
  },
  {
    slug: 'design-system-docs',
    title: 'Design System Documentation & Component Library',
    shortTitle: 'Design Systems',
    description: 'Document design system components with live screenshots. Keep visual documentation synchronized with your component library.',
    longDescription: `Design systems need visual documentation that stays current. When components update, documentation screenshots should update too. Manual screenshot maintenance creates documentation drift that confuses developers and designers.

Screenshotly captures individual components from Storybook, Figma embeds, or your component playground. Automated captures ensure documentation always shows the current component state, including variants, sizes, themes, and interactive states.

Design teams use this for style guides, component catalogs, and visual changelogs. When a component changes, new screenshots are captured automatically, and the visual diff highlights what changed.`,
    icon: 'Palette',
    keywords: [
      'design system documentation',
      'component library screenshots',
      'Storybook capture',
      'style guide automation',
      'visual design docs',
    ],
    benefits: [
      'Auto-sync docs with component changes',
      'Capture all component variants',
      'Visual changelog for design updates',
      'Consistent documentation images',
    ],
    steps: [
      'Connect to your Storybook or component playground',
      'Define components and variants to capture',
      'Trigger captures on component library updates',
      'Generate visual changelog with diffs',
      'Publish to documentation platform',
    ],
    metrics: [
      { stat: 'Synced', label: 'with component updates' },
      { stat: 'Complete', label: 'variant documentation' },
      { stat: 'Visual', label: 'changelog generation' },
    ],
    codeExample: `// Capture Storybook components for documentation
const captureComponents = async (storybookUrl, components) => {
  const docs = {};

  for (const component of components) {
    const storyUrl = storybookUrl + '/?path=/story/' + component.storyId;
    
    docs[component.name] = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: storyUrl,
        device: 'desktop',
        format: 'png',
        selector: '#storybook-root',
      }),
    });
  }

  return docs;
};`,
    faqs: [
      {
        question: "Can I capture individual Storybook stories?",
        answer: "Yes! Use the Storybook iframe URL with component story IDs. Target the story root element with CSS selector for isolated component captures."
      },
      {
        question: "How do I generate visual changelogs?",
        answer: "Compare current component screenshots against previous versions. Generate diff images highlighting visual changes and include them in release notes."
      },
    ],
  },
  {
    slug: 'website-migration',
    title: 'Website Migration Visual Validation',
    shortTitle: 'Migration',
    description: 'Validate website migrations visually. Compare old and new sites page-by-page to catch issues before going live.',
    longDescription: `Website migrations—platform changes, redesigns, CMS updates—are high-risk projects. Visual comparison between old and new sites catches layout issues, missing content, broken images, and styling problems that automated tests miss.

Screenshotly captures pages from both the old and new sites, enabling page-by-page visual comparison. This catches issues like missing sections, altered font rendering, broken responsive layouts, and shifted elements that functional tests overlook.

Project managers use visual comparisons to validate migration completeness. QA teams automate pre-launch checks across hundreds of pages. Stakeholders review side-by-side comparisons for sign-off before cutover.`,
    icon: 'ArrowRightLeft',
    keywords: [
      'website migration testing',
      'visual migration validation',
      'site redesign comparison',
      'CMS migration testing',
      'platform migration',
    ],
    benefits: [
      'Page-by-page visual comparison',
      'Catch layout and styling issues',
      'Validate content migration completeness',
      'Stakeholder sign-off documentation',
    ],
    steps: [
      'Map URLs between old and new sites',
      'Capture all pages from both sites',
      'Generate visual comparison reports',
      'Identify differences above threshold',
      'Review and approve before cutover',
    ],
    metrics: [
      { stat: 'Page-by-page', label: 'visual comparison' },
      { stat: 'Automated', label: 'migration validation' },
      { stat: 'Comprehensive', label: 'multi-device checks' },
    ],
    codeExample: `// Compare old and new site during migration
const validateMigration = async (urlMap) => {
  const results = [];

  for (const { oldUrl, newUrl, pageName } of urlMap) {
    const [oldScreenshot, newScreenshot] = await Promise.all([
      fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: oldUrl, device: 'desktop', format: 'png' }),
      }),
      fetch('https://api.screenshotly.app/screenshot', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: newUrl, device: 'desktop', format: 'png' }),
      }),
    ]);

    results.push({ pageName, oldScreenshot, newScreenshot });
  }

  return results;
};`,
    faqs: [
      {
        question: "How many pages should I compare during migration?",
        answer: "Capture all unique templates and high-traffic pages. For large sites, prioritize the homepage, key landing pages, product pages, and content pages. Aim for 100% template coverage."
      },
      {
        question: "Can I automate pre-launch migration checks?",
        answer: "Yes! Run migration comparison in your CI/CD pipeline. Block deployment if visual differences exceed your configured threshold, ensuring quality before going live."
      },
    ],
  },
];

export type UseCase = (typeof useCases)[number];

