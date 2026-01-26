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
];

export type UseCase = (typeof useCases)[number];

