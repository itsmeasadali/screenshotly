// Use case definitions for pSEO pages
export const useCases = [
  {
    slug: 'documentation-screenshots',
    metaDescription: 'Automate documentation screenshots with the Screenshotly API. Keep technical docs, README files, and API guides in sync. Try it free.',
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
    metaDescription: 'Generate dynamic OG images and social media previews with Screenshotly. Drive clicks with eye-catching link previews. Try free.',
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
    metaDescription: 'Automate e-commerce product screenshots for catalogs and marketplaces. Scale product image generation. Get 100 free captures.',
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
    metaDescription: 'Visual regression testing with Screenshotly. Integrate screenshots into CI/CD for automated QA. Start testing free.',
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
    metaDescription: 'Generate website thumbnails for directories, bookmarking, and link previews. Consistent quality at any size. Try free.',
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
    metaDescription: 'Convert any URL to PDF with Screenshotly. Pixel-perfect PDFs from web pages. Full CSS & JavaScript support. Try free.',
    title: 'PDF Generation',
    shortTitle: 'PDF',
    description: 'Convert any web page or URL to a pixel-perfect PDF via API. Handles modern CSS, JavaScript rendering, and full-page capture.',
    longDescription: `Need to turn a URL into a PDF? Screenshotly converts any web page to a perfectly formatted PDF document using a real browser engine — no stripped styles, no broken layouts.

Unlike lightweight HTML-to-PDF converters that choke on flexbox, grid, web fonts, or client-side JavaScript, our API renders pages in a full Chromium instance. The PDF output matches exactly what you see in the browser. Pass any public or authenticated URL and receive a production-ready PDF.

Full-page capture ensures the complete document is included, not just the visible viewport. Control margins, page size (A4, Letter, custom), and orientation through API parameters or CSS @page rules. Use this for archiving web content, generating printable versions of articles, or building document pipelines that convert any URL to PDF on demand.`,
    icon: 'FileOutput',
    keywords: [
      'HTML to PDF API',
      'web page to PDF',
      'PDF generation API',
      'convert URL to PDF',
      'webpage PDF converter',
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
    faqs: [
      {
        question: "What CSS properties work best for PDF output?",
        answer: "Use @media print styles for PDF-specific formatting. Avoid CSS columns and complex flexbox nesting. Fixed-width layouts (e.g. 800px) produce the most predictable results. Set page-break-inside: avoid on important sections."
      },
      {
        question: "Can I control PDF page size and orientation?",
        answer: "Yes. The API renders the full page into a single continuous PDF by default. Use CSS @page rules in your source HTML to control page size and orientation. Landscape is useful for wide dashboards."
      },
      {
        question: "How does PDF generation differ from a regular screenshot?",
        answer: "PDF output uses the same rendering engine but produces a vector-friendly document instead of a raster image. Text remains selectable and searchable. File sizes are typically smaller than equivalent PNG screenshots for text-heavy pages."
      },
      {
        question: "What's the maximum page length for PDF generation?",
        answer: "There is no hard page-length limit. The API captures the full scrollable content and converts it into a multi-page PDF. Very long pages (50,000+ pixels) may take a few extra seconds to process."
      }
    ],
  },
  {
    slug: 'email-marketing',
    metaDescription: 'Capture landing pages and email templates for campaigns. Create compelling email visuals with Screenshotly. Start free.',
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
    faqs: [
      {
        question: "What device mockups work best for email marketing screenshots?",
        answer: "iPhone mockups work best since over 60% of emails are opened on mobile. Use the iphone-14 or iphone-15 template for modern appeal. For B2B campaigns targeting desktop users, a browser frame mockup is more appropriate."
      },
      {
        question: "How do I capture responsive email templates at different sizes?",
        answer: "Make separate API calls with different device presets — mobile (375px), tablet (768px), and desktop (1920px). This lets you preview how your email landing page renders across all breakpoints before sending."
      },
      {
        question: "Can I use Screenshotly to preview emails in different clients?",
        answer: "Screenshotly captures web pages, not email inboxes. However, you can render your email HTML as a standalone web page and capture that. For multi-client testing, deploy different rendered versions and capture each."
      },
      {
        question: "How do I automate email preview generation for campaigns?",
        answer: "Set up a webhook or cron job that calls the API whenever a new campaign is published. Pass the campaign preview URL, capture in mobile and desktop sizes, and store the results in your asset library for email insertion."
      }
    ],
  },
  {
    slug: 'web-archiving',
    metaDescription: 'API for general-purpose web page archiving—research, reference, and historical preservation. Programmatic, timestamped captures. Try free.',
    title: 'Web Archiving',
    shortTitle: 'Archiving',
    description: 'General-purpose web page archiving for research, reference, and historical preservation. Capture and preserve any webpage with API-driven automation.',
    longDescription: `The web is ephemeral. Pages change, sites go down, and content disappears. Researchers, librarians, and archivists need programmatic tools to preserve web content for future reference and historical study.

Screenshotly provides a web archive API for capturing any webpage on demand or schedule. Full-page captures with high resolution preserve every detail. Timestamps and metadata document exactly when the capture occurred. Unlike the Wayback Machine, you control when and what gets archived, and the captures are yours to keep.

Use it to build reference collections, document research sources, preserve project snapshots, or create your own historical archive. Schedule recurring captures or trigger on-demand via API—ideal for website archiving automation at any scale.`,
    icon: 'Archive',
    keywords: [
      'web archive API',
      'website archiving automation',
      'web page preservation',
      'programmatic web capture',
      'historical web archiving',
    ],
    benefits: [
      'Preserve web pages for research and reference',
      'Schedule recurring captures on any cadence',
      'Full-page capture with pixel-perfect fidelity',
      'Build searchable historical archives',
    ],
    steps: [
      'Identify URLs you want to preserve (research sources, project pages, reference material)',
      'Configure capture settings: full page, high quality, AI removal disabled',
      'Store captures with complete metadata (URL, timestamp, hash)',
      'Organize into collections using tags, folders, or a database index',
      'Schedule recurring captures to track how pages change over time',
    ],
    metrics: [
      { stat: '100%', label: 'content fidelity' },
      { stat: 'Timestamped', label: 'every capture dated' },
      { stat: 'Any cadence', label: 'hourly to monthly schedules' },
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
    faqs: [
      {
        question: "How long are web archive screenshots legally valid?",
        answer: "Legal validity depends on jurisdiction, but timestamped screenshots with metadata (URL, date, HTTP headers) are widely accepted as evidence. Pair captures with hash checksums and store in tamper-proof storage for maximum legal weight."
      },
      {
        question: "Can I archive dynamic or JavaScript-heavy pages?",
        answer: "Yes. Screenshotly uses a real Chromium browser engine that fully renders JavaScript, AJAX content, and dynamic elements before capturing. Use the delay or waitForNetworkIdle option to ensure all content is loaded."
      },
      {
        question: "How do I schedule recurring web archive captures?",
        answer: "Use a cron job, GitHub Actions schedule, or workflow tools like Zapier and n8n to trigger daily or weekly API calls. Store each capture with its timestamp and URL for a complete historical record."
      },
      {
        question: "What format is best for archival screenshots?",
        answer: "PNG provides lossless quality and is the safest choice for archival. For large-scale archiving where storage costs matter, WebP offers 30-50% smaller files with near-lossless quality. PDF is best when you need selectable text."
      }
    ],
  },
  {
    slug: 'competitive-analysis',
    metaDescription: 'Build competitive intelligence decks with side-by-side website screenshots. Analyze pricing, positioning, and feature gaps. Try free.',
    title: 'Competitive Analysis',
    shortTitle: 'Competitors',
    description: 'Analyze competitor positioning, feature sets, and pricing strategy with side-by-side website screenshots. Build strategic market intelligence decks.',
    longDescription: `Winning market share starts with understanding how competitors position themselves. Screenshotly captures competitor websites so you can build structured analysis decks — pricing tiers, feature matrices, messaging angles, and visual positioning side by side.

Capture competitor pricing pages to build comparison matrices for leadership reviews. Screenshot feature pages to map capability gaps and discover unmet market needs. Archive landing pages to reverse-engineer messaging strategy and value proposition framing. Compare homepage hero sections across competitors to understand how each targets different buyer personas.

This is strategic, point-in-time analysis — not ongoing monitoring. Capture a set of competitor sites before a quarterly strategy meeting, product planning sprint, or investor pitch. Our AI-powered cleanup strips popups and overlays so your captures show the real content, not cookie banners. Use the output in Notion, Google Slides, or Figma to build polished competitive intelligence deliverables.`,
    icon: 'TrendingUp',
    keywords: [
      'competitive analysis screenshots',
      'competitor website comparison',
      'market research screenshots',
      'competitive intelligence deck',
      'pricing intelligence screenshots',
    ],
    benefits: [
      'Side-by-side competitor pricing comparison',
      'Feature gap analysis from captured pages',
      'Messaging and positioning teardowns',
      'Board-ready competitive intelligence decks',
    ],
    steps: [
      'List competitor URLs to analyze (pricing, features, homepage, about)',
      'Capture each URL with AI cleanup enabled for clean screenshots',
      'Organize captures into categories (pricing, features, messaging)',
      'Build side-by-side comparison layouts in Slides, Figma, or Notion',
      'Present findings in strategy meetings or investor updates',
    ],
    metrics: [
      { stat: '< 5 min', label: 'full competitor capture set' },
      { stat: 'Side-by-side', label: 'visual comparison' },
      { stat: 'Board-ready', label: 'intelligence decks' },
    ],
    codeExample: `// Capture competitor page for strategic analysis
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
    faqs: [
      {
        question: "How often should I capture competitor screenshots?",
        answer: "Weekly is sufficient for design and content tracking. For pricing pages, daily captures catch flash sales and A/B tests. Store screenshots with timestamps and run automated diff tools to highlight changes between captures."
      },
      {
        question: "Can I track competitor pricing changes with screenshots?",
        answer: "Yes. Capture competitor pricing pages on a schedule and use image comparison or OCR to detect changes. Combine with AI vision analysis to extract structured pricing data from the screenshots automatically."
      },
      {
        question: "How do I compare competitor screenshots over time?",
        answer: "Store each capture with a consistent naming scheme (competitor-slug-date.png). Use image diff libraries like pixelmatch or visual regression tools to highlight pixel-level changes between captures."
      },
      {
        question: "Does Screenshotly work with competitor sites that block bots?",
        answer: "Our stealth mode parameter uses realistic browser fingerprinting to avoid detection. Combined with rotating user agents and appropriate delays between requests, it handles most anti-bot measures on public pages."
      }
    ],
  },
  {
    slug: 'saas-reporting',
    metaDescription: 'Automate investor update screenshots from Stripe, Analytics, and Mixpanel dashboards. Weekly visual reports on autopilot. Try free.',
    title: 'SaaS Investor & Stakeholder Reporting',
    shortTitle: 'Reporting',
    description: 'Automate weekly investor updates and stakeholder reports by capturing Stripe, Analytics, and Mixpanel dashboard screenshots.',
    longDescription: `Investor updates, board meetings, and stakeholder reports all need current metrics. But logging into every dashboard, grabbing screenshots, and compiling them into presentations is a weekly time sink. Screenshotly automates the capture-and-deliver workflow for SaaS founders and ops teams.

This use case is specifically about SaaS business reporting — Stripe MRR, Google Analytics traffic, Mixpanel funnels, and internal KPI dashboards. Our API supports authenticated sessions so you can capture behind-login dashboards securely. Schedule captures to run before your Monday stand-up or Friday investor email, and the latest metrics snapshots are always ready.

The output goes into investor update emails, Notion pages, or Google Slides decks. Instead of spending Friday afternoon screenshotting dashboards, you get consistent, professional snapshots delivered automatically. Founders running monthly investor updates use this to include visual proof of metrics growth without manual effort.`,
    icon: 'BarChart',
    keywords: [
      'SaaS dashboard screenshots',
      'investor update automation',
      'Stripe dashboard capture',
      'automated investor reports',
      'SaaS metrics screenshots',
    ],
    benefits: [
      'Automate investor update visuals',
      'Capture Stripe, Analytics, and Mixpanel dashboards',
      'Consistent weekly/monthly report format',
      'Track MRR and KPI trends visually over time',
    ],
    steps: [
      'List SaaS dashboards to capture (Stripe, Analytics, Mixpanel, internal)',
      'Pass session cookies to authenticate into each dashboard',
      'Schedule weekly or monthly captures before your reporting cadence',
      'Embed screenshot URLs into your investor email or Notion template',
      'Distribute reports via email, Slack, or Notion automations',
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
    faqs: [
      {
        question: "How do I capture authenticated dashboards without exposing credentials?",
        answer: "Pass session cookies via the cookies parameter instead of embedding credentials in URLs. Generate short-lived session tokens specifically for screenshot capture, and rotate them regularly for security."
      },
      {
        question: "What viewport size works best for dashboard screenshots?",
        answer: "Use 1920x1080 for standard dashboards. For dashboards with many panels, consider 2560x1440 or use fullPage: true to capture all panels in a single image regardless of viewport height."
      },
      {
        question: "Can I automate weekly investor report screenshots?",
        answer: "Yes. Use a cron job or GitHub Actions to call the API every Monday morning, capture each dashboard panel, and attach the images to an email template or Slack message sent to stakeholders."
      },
      {
        question: "How do I handle dashboards that require login?",
        answer: "Generate an authenticated session token server-side and pass it as a cookie in the API request. Alternatively, use a service account with read-only access and inject its session cookie at capture time."
      }
    ],
  },
  {
    slug: 'link-preview-services',
    metaDescription: 'Build link preview services for Slack, Discord, and messaging apps. Generate rich URL previews via API. Start free.',
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
    faqs: [
      {
        question: "How do I build a link preview service like Slack's unfurl?",
        answer: "Intercept pasted URLs in your app, call the Screenshotly API with the URL and a small viewport (e.g. 1200x630), then display the resulting thumbnail alongside the page title and description extracted via Open Graph tags."
      },
      {
        question: "What image size is best for link previews?",
        answer: "1200x630 pixels (1.91:1 ratio) is the universal standard used by Facebook, Twitter, Slack, and Discord. Use JPEG at 80% quality for fast loading. For higher-density displays, capture at 2x and resize."
      },
      {
        question: "How do I cache link preview images efficiently?",
        answer: "Cache by URL hash with a TTL of 24-72 hours. Serve cached images from a CDN. Implement stale-while-revalidate to refresh previews in the background without blocking user requests."
      },
      {
        question: "Can I generate link previews in real time?",
        answer: "For user-facing inline previews, pre-generate and cache rather than calling the API in real time. Average capture takes 2-5 seconds, which is too slow for inline display. Queue captures asynchronously and show a placeholder until ready."
      }
    ],
  },
  {
    slug: 'real-estate-listings',
    metaDescription: 'Capture property listings for real estate portals. Archive MLS pages and monitor price changes. Try Screenshotly free.',
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
    faqs: [
      {
        question: "Can I capture MLS listing pages automatically?",
        answer: "Yes. Feed MLS listing URLs into the API via a script or workflow tool. Capture each listing with fullPage: true to get all photos, details, and maps. Store results by listing ID for easy retrieval."
      },
      {
        question: "How do I capture property listings with all images loaded?",
        answer: "Use the delay parameter (3-5 seconds) or waitForNetworkIdle: true to ensure all high-resolution property photos finish loading before the screenshot is taken. Lazy-loaded images are handled by the full-page scroll."
      },
      {
        question: "What format is best for real estate listing screenshots?",
        answer: "PNG for archival quality, JPEG at 85% quality for sharing with clients. Full-page captures in PNG can be large for image-heavy listings, so JPEG or WebP is more practical for email attachments."
      },
      {
        question: "Can I use screenshots for virtual property tours?",
        answer: "Screenshots capture a static snapshot of the listing page. For virtual tours, capture multiple sections of the page or combine full-page screenshots with annotations to create visual walkthroughs."
      }
    ],
  },
  {
    slug: 'ai-vision-analysis',
    metaDescription: 'Feed website screenshots to GPT-4 Vision and Claude for AI analysis. Automate page insights at scale. Start free.',
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
      {
        question: "Can I feed screenshot output directly to GPT-4 Vision?",
        answer: "Yes. Screenshotly returns images as URLs or base64-encoded data, both of which GPT-4 Vision accepts natively in the image_url content block. You can pipe the API response directly into your OpenAI call without any intermediate conversion step."
      },
      {
        question: "What resolution should I use for AI image analysis?",
        answer: "A viewport width of 1280px at 2x device scale factor gives the best balance between detail and token cost. Higher resolutions provide marginal gains for layout analysis but significantly increase vision API costs. For text-heavy pages where OCR accuracy matters, use 2x scale; for layout-only analysis, 1x is sufficient."
      },
    ],
  },
  {
    slug: 'competitor-monitoring',
    metaDescription: 'Automated pipeline to detect competitor website changes. Visual diffs, threshold alerts, and Slack notifications. Try free.',
    title: 'Automated Competitor Change Detection',
    shortTitle: 'Competitor Monitoring',
    description: 'Build an automated change-detection pipeline with scheduled screenshots and visual diffs. Get Slack or email alerts when competitor sites change.',
    longDescription: `This is not a one-time analysis — it is a continuous, automated pipeline. Screenshotly captures competitor pages on a schedule, and your pipeline diffs each new capture against the previous one to detect meaningful changes in real time.

The technical workflow: a cron job or serverless function calls the Screenshotly API on a cadence (hourly, daily, weekly). Each capture is stored with a timestamp. An image-diff library like pixelmatch or resemble.js compares the new capture against the baseline, producing a diff score (0-100%). When the score exceeds your threshold — say 5% to ignore ad rotations and minor layout shifts — the pipeline fires an alert via Slack webhook, email, or PagerDuty.

E-commerce teams use this to detect competitor price drops within hours. SaaS product managers catch new feature launches before the press release. Agencies run monitoring across dozens of competitor domains for their clients — all hands-free. The key difference from competitive analysis is that this runs autonomously and continuously, while analysis is a deliberate, point-in-time exercise.`,
    icon: 'Eye',
    keywords: [
      'competitor website monitoring',
      'website change detection',
      'visual diff alerts',
      'automated competitor tracking',
      'price change detection',
    ],
    benefits: [
      'Continuous automated monitoring on any cadence',
      'Pixel-level visual diff with configurable thresholds',
      'Instant Slack or email alerts on meaningful changes',
      'Historical timeline of competitor page evolution',
    ],
    steps: [
      'Register competitor URLs and set a capture cadence (hourly/daily)',
      'Deploy a cron job or serverless function to call the Screenshotly API',
      'Store each capture with a timestamp in S3, R2, or a database',
      'Run pixelmatch or resemble.js to diff new vs previous capture',
      'Fire Slack webhook or email when diff score exceeds your threshold',
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
    faqs: [
      {
        question: "How do I detect changes between competitor screenshots?",
        answer: "Use image comparison libraries like pixelmatch or resemble.js to compute a pixel-level diff. Set a threshold (e.g. 5% change) to filter out noise like ad rotations and focus on meaningful updates like pricing or layout changes."
      },
      {
        question: "Can I monitor competitor pages behind login walls?",
        answer: "If you have legitimate access to competitor portals (e.g. public pricing after signup), you can pass session cookies via the API. Never use this to access content you are not authorized to view."
      },
      {
        question: "What's the best schedule for competitor monitoring?",
        answer: "Monitor pricing pages daily, feature and landing pages weekly, and blog/content pages monthly. Adjust frequency based on how often competitors update — fast-moving SaaS companies may warrant more frequent checks."
      },
      {
        question: "How many competitor pages can I monitor at scale?",
        answer: "The API handles thousands of captures per day depending on your plan. Batch URLs and process them sequentially with small delays to stay within rate limits. The Growth plan supports up to 10,000 captures per month."
      }
    ],
  },
  {
    slug: 'brand-monitoring',
    metaDescription: 'Capture timestamped evidence of trademark infringement and counterfeit listings. Protect your brand with Screenshotly. Try free.',
    title: 'Brand & IP Monitoring',
    shortTitle: 'Brand Monitoring',
    description: 'Protect your brand by capturing timestamped evidence of unauthorized logo use, trademark infringement, and counterfeit listings for legal enforcement.',
    longDescription: `Counterfeit products, unauthorized resellers, and trademark infringement erode revenue and reputation. Screenshotly turns brand-protection alerts into legally defensible evidence packages — timestamped, full-page screenshots with URL metadata that hold up in enforcement proceedings.

Connect Google Alerts, brand-protection services, or marketplace scrapers to trigger automatic captures whenever a suspected violation surfaces. Each screenshot records the exact page state along with the URL, timestamp, and HTTP metadata you need for takedown requests or litigation.

Legal teams compile evidence portfolios across dozens of infringing sites. Brand protection agencies document patterns of repeat offenders. E-commerce brands scan Amazon, eBay, and Etsy listings for counterfeits and capture the proof before listings disappear. Track enforcement outcomes over time to demonstrate ROI on brand protection efforts.`,
    icon: 'Shield',
    keywords: [
      'brand protection screenshots',
      'trademark monitoring',
      'brand reputation tracking',
      'unauthorized brand use detection',
      'counterfeit evidence capture',
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
    faqs: [
      {
        question: "Are screenshots legally admissible as evidence of brand infringement?",
        answer: "Timestamped full-page screenshots with URL metadata are widely accepted as evidence. Strengthen your case by capturing HTTP response headers, storing screenshots in tamper-proof storage, and using consistent naming conventions."
      },
      {
        question: "How do I automate brand monitoring with screenshots?",
        answer: "Connect Google Alerts or a brand monitoring service to a webhook that triggers Screenshotly API calls. When a new mention is detected, automatically capture the page and store the evidence with metadata."
      },
      {
        question: "Can I monitor marketplace listings for counterfeit products?",
        answer: "Yes. Feed marketplace search result URLs (Amazon, eBay, Etsy) into the API to capture listings. Use AI vision analysis on the screenshots to identify unauthorized use of your brand name, logo, or product images."
      },
      {
        question: "What metadata should I store alongside brand monitoring screenshots?",
        answer: "Store the full URL, capture timestamp (ISO 8601), HTTP status code, page title, IP address of the server, and a SHA-256 hash of the screenshot file. This creates a complete evidence chain for legal proceedings."
      }
    ],
  },
  {
    slug: 'website-archival',
    metaDescription: 'Create permanent web records for compliance and legal. Build your own Wayback Machine with Screenshotly. Try free.',
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
    metaDescription: 'Generate pixel-perfect PDF invoices from HTML templates. Automate billing documents with Screenshotly. Start free.',
    title: 'Dynamic Invoice & Receipt PDF Generation',
    shortTitle: 'Invoices & PDFs',
    description: 'Generate pixel-perfect PDF invoices, receipts, and billing documents from HTML templates. Automate your financial document pipeline.',
    longDescription: `Billing documents need to be flawless. A misaligned column or broken currency symbol on an invoice erodes customer trust. Screenshotly lets you design invoices and receipts as HTML/CSS templates and convert them to pixel-perfect PDFs — no complex PDF libraries required.

Render your invoice template server-side with dynamic data (line items, taxes, totals, customer details), then pass the HTML to the Screenshotly API. The result is a production-ready PDF that matches your design exactly, complete with correct fonts, currency formatting, and page breaks.

SaaS billing systems use this to generate monthly subscription invoices at scale. E-commerce platforms produce order confirmations and packing slips. Freelancers and agencies automate recurring invoice generation. Support multi-currency, RTL text, and locale-specific number formatting using standard HTML and CSS.`,
    icon: 'Receipt',
    keywords: [
      'invoice PDF API',
      'receipt generator API',
      'billing document automation',
      'HTML invoice to PDF',
      'automated invoicing API',
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
    faqs: [
      {
        question: "How does HTML-to-PDF generation compare to using wkhtmltopdf or Puppeteer?",
        answer: "Screenshotly handles browser rendering, fonts, and CSS support in the cloud — no need to install or maintain Puppeteer/Chromium on your server. The output matches what you see in a modern browser, unlike wkhtmltopdf which uses an older engine."
      },
      {
        question: "Can I customize PDF page margins and paper size?",
        answer: "Yes. Use CSS @page rules in your HTML template to set margins, paper size (A4, Letter), and orientation. The API's fullPage option captures the complete document, and the output respects your print-specific CSS."
      },
      {
        question: "How do I add page numbers and headers to PDF invoices?",
        answer: "Use CSS @page margin areas and position: fixed elements for headers/footers. The rendering engine supports CSS paged media features including page counters, running headers, and forced page breaks."
      },
      {
        question: "What's the best approach for generating invoices in multiple currencies?",
        answer: "Render each invoice as an HTML template with the correct currency symbol and formatting, then capture as PDF. Since you're using HTML, you have full control over locale-specific number formatting, RTL text, and font support."
      }
    ],
  },
  {
    slug: 'seo-audit-screenshots',
    metaDescription: 'Capture screenshots for SEO audits and SERP tracking. Document rankings and competitor positions. Try Screenshotly free.',
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
    faqs: [
      {
        question: "How do I document SERP rankings with screenshots?",
        answer: "Capture Google search results pages for your target keywords using the geolocation parameter to specify the country. Store screenshots with the keyword, date, and location for a historical ranking record."
      },
      {
        question: "Can I capture mobile vs desktop versions for mobile-first indexing audits?",
        answer: "Yes. Make two API calls per URL — one with device: 'mobile' (375px) and one with device: 'desktop' (1920px). Compare the outputs to identify content, layout, or CTA differences that may affect mobile-first indexing."
      },
      {
        question: "How do I create before/after comparisons for client reports?",
        answer: "Capture the client's pages before making changes, implement fixes, then capture again. Use image diff tools or place screenshots side-by-side in your report to visually demonstrate the improvements."
      },
      {
        question: "What's the best way to scale SEO audits across many client sites?",
        answer: "Build a queue of URLs per client, process them in batches via the API, and store results organized by client, URL, and date. Automate weekly captures for ongoing monitoring and generate visual reports from the stored screenshots."
      }
    ],
  },
  {
    slug: 'email-campaign-previews',
    metaDescription: 'Embed dynamic website previews in email campaigns. Show recipients fresh content with automated screenshots. Try free.',
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
    metaDescription: 'Capture support ticket screenshots automatically. Document customer issues with visual evidence. Start free today.',
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
    faqs: [
      {
        question: "How do I automatically capture what a customer sees on their screen?",
        answer: "Embed a 'Report Issue' button in your app that sends the current page URL to your backend. Your backend calls the Screenshotly API with that URL, the user's viewport size, and any relevant cookies to capture exactly what they see."
      },
      {
        question: "Can I capture authenticated customer views for support tickets?",
        answer: "Yes. Pass the customer's session cookie via the API to capture their authenticated view. Use a short-lived, read-only session token generated specifically for the capture to maintain security."
      },
      {
        question: "How do I integrate screenshot capture with Zendesk or Intercom?",
        answer: "Use webhooks to trigger screenshot captures when new tickets are created. Call the API with the reported URL, then attach the resulting image to the ticket via the Zendesk/Intercom API."
      },
      {
        question: "What's the best way to annotate support screenshots?",
        answer: "Capture the screenshot via the API, then overlay annotations (arrows, highlights, text) using a canvas library like Fabric.js or a service like Cloudinary. Attach the annotated version to the support ticket for clarity."
      }
    ],
  },
  {
    slug: 'directory-submissions',
    metaDescription: 'Generate professional thumbnails for Product Hunt, directories, and startup listings. Stand out with polished previews. Try free.',
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
    metaDescription: 'Export Grafana, Metabase, and Looker dashboards as pixel-perfect PDF reports. Capture chart panels with CSS selectors. Try free.',
    title: 'BI Dashboard to PDF Report Export',
    shortTitle: 'Report Generation',
    description: 'Export Grafana, Metabase, Looker, and custom BI dashboards as pixel-perfect PDF or PNG reports with CSS selector targeting.',
    longDescription: `This use case focuses on the technical challenge of turning BI tool dashboards into polished, distributable report documents. Unlike SaaS metrics reporting (which is about capturing simple dashboards for investor updates), BI report export involves rendering complex chart libraries, targeting individual panels, and composing multi-panel PDF documents.

Grafana, Metabase, Looker, and custom dashboards built with Chart.js, D3, or Highcharts require a delay parameter so the renderer waits for async data fetching and chart animation to complete before capture. Use CSS selectors to target individual panels — capture just the revenue chart or the user funnel, not the entire dashboard. Compose multiple panel captures into a single PDF document for formal distribution.

Export as PNG for Slack and presentations, or PDF for compliance and finance teams. The key technical differentiator is the delay and selector parameters: without them, you get half-rendered charts and loading spinners. Screenshotly waits for the page to reach visual stability before capture, producing pixel-perfect output even from the most complex data visualizations.`,
    icon: 'BarChart',
    keywords: [
      'Grafana dashboard PDF export',
      'Metabase report screenshot',
      'BI dashboard to PDF',
      'chart panel capture API',
      'Looker dashboard export',
    ],
    benefits: [
      'Pixel-perfect chart rendering with delay parameter',
      'Target individual panels via CSS selectors',
      'Compose multi-panel PDF reports',
      'No BI tool access needed for report recipients',
    ],
    steps: [
      'Authenticate into the BI tool (Grafana, Metabase, Looker) with session cookies',
      'Use the delay parameter (3-10s) to wait for chart libraries to render',
      'Target individual panels with CSS selectors for focused captures',
      'Export as PNG for chat/presentations or PDF for formal distribution',
      'Schedule recurring captures and auto-distribute via email or Slack',
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
    faqs: [
      {
        question: "How do I automate daily or weekly report screenshot distribution?",
        answer: "Use a cron job or serverless function (AWS Lambda, Vercel Cron) to trigger API calls on a schedule. Capture each dashboard URL, then distribute via email, Slack, or Teams using their respective APIs."
      },
      {
        question: "How do I handle dashboards with charts that take time to render?",
        answer: "Use the delay parameter (3-5 seconds) to wait for chart libraries like Chart.js, D3, or Highcharts to finish rendering. For complex dashboards, use waitForSelector targeting a specific chart element."
      },
      {
        question: "Can I capture multiple dashboard panels into a single report?",
        answer: "Use fullPage: true to capture the entire dashboard in one image. Alternatively, capture individual panels using the selector or clip parameter and combine them into a composite report image or PDF."
      },
      {
        question: "What's the best format for stakeholder reports — PNG or PDF?",
        answer: "PDF is best for formal reports distributed via email since it includes metadata and prints well. PNG works better for Slack/Teams messages and embedding in presentations. Capture both formats for maximum flexibility."
      }
    ],
  },
  {
    slug: 'font-detection',
    metaDescription: 'Identify fonts used on any website. Capture typography specimens for design reference and brand audits. Try Screenshotly free.',
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
    metaDescription: 'Archive news articles and press coverage with timestamped screenshots. Preserve content before it changes. Try free.',
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
    metaDescription: 'Extract competitor pricing data from screenshots using OCR and AI vision. Build price history databases and trend reports. Start free.',
    title: 'Price Data Extraction & Tracking',
    shortTitle: 'Price Tracking',
    description: 'Extract structured pricing data from competitor screenshots using AI vision and OCR. Build price history databases and integrate with spreadsheets.',
    longDescription: `Competitor pricing pages are designed for humans, not APIs—dynamic layouts, JavaScript rendering, and anti-scraping measures make traditional HTML scraping unreliable. Screenshot-based extraction sidesteps all of that by capturing the fully rendered page and pulling structured data from the visual output.

Screenshotly captures competitor pricing pages as high-fidelity images, which you then feed into OCR or AI vision models (GPT-4 Vision, Claude Vision) to extract plan names, price points, feature lists, and promotional banners into structured JSON. Store the parsed data in a spreadsheet, Airtable base, or database to build a living price-history timeline.

E-commerce teams use this to build competitor price databases, SaaS companies track tier changes over time, and market researchers compile cross-industry pricing benchmarks. For the visual-diff and alerting pipeline itself, see the competitor-monitoring use case.`,
    icon: 'TrendingUp',
    keywords: [
      'price extraction from screenshots',
      'pricing data scraping API',
      'competitor price tracking',
      'price history database',
      'screenshot OCR pricing',
    ],
    benefits: [
      'Structured pricing data from visual captures',
      'Price history tracking over time',
      'Alerts on price changes via parsed data',
      'Integration with spreadsheets and databases',
    ],
    steps: [
      'Capture competitor pricing pages with Screenshotly',
      'Extract price data using AI vision or OCR',
      'Store results in a structured database or spreadsheet',
      'Set threshold alerts on price changes',
      'Generate pricing reports and trend analyses',
    ],
    metrics: [
      { stat: 'Structured', label: 'pricing data extraction' },
      { stat: 'AI-powered', label: 'OCR & vision parsing' },
      { stat: 'Historical', label: 'price history database' },
    ],
    codeExample: `// Extract pricing data from competitor screenshots
const extractPricing = async (competitorUrl) => {
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
    }),
  });

  const imageBuffer = await screenshot.arrayBuffer();
  const pricingData = await parseWithVision(imageBuffer);

  await saveToPriceHistory(competitorUrl, pricingData);

  if (await exceedsThreshold(competitorUrl, pricingData)) {
    await notifyTeam('Price change detected', pricingData);
  }
};`,
    faqs: [
      {
        question: "How do I extract pricing data from a screenshot?",
        answer: "Capture the pricing page with Screenshotly, then pass the image to an AI vision model (GPT-4 Vision, Claude Vision) or an OCR service. Prompt the model to return plan names, prices, and feature lists as structured JSON. Store the result in your database or spreadsheet."
      },
      {
        question: "Can I build a price history database with this approach?",
        answer: "Yes. Schedule daily or weekly captures, extract the pricing data each time, and append it to a database table or Airtable base with a timestamp. Over time this gives you a complete price-history timeline for each competitor."
      },
    ],
  },
  {
    slug: 'certificate-generation',
    metaDescription: 'Generate certificates and diplomas from HTML templates. Perfect for courses, events, and recognition. Try Screenshotly free.',
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
    metaDescription: 'Showcase client work with professional screenshots. Build agency portfolios automatically. Start free today.',
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
        question: "Can I add device mockup frames to portfolio screenshots?",
        answer: "Absolutely. Pass the mockup parameter (e.g., iphone, macbook, or browser) in your API request and Screenshotly returns the screenshot wrapped in a photorealistic device frame. This is ideal for hero images on portfolio pages and case study decks."
      },
      {
        question: "How do I capture responsive designs at multiple breakpoints?",
        answer: "Loop through an array of device presets — desktop (1440px), laptop (1280px), tablet (768px), and mobile (375px) — in a single script. Screenshotly captures each viewport independently, so you get a complete responsive showcase for every project in one batch."
      },
    ],
  },
  {
    slug: 'ad-verification',
    metaDescription: 'Verify ad placements and brand safety with automated screenshots. Monitor creative rendering across publishers. Try free.',
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
        question: "How do I detect non-rendering or blank ad creatives?",
        answer: "Capture the page and compare the ad slot dimensions against your expected creative size. If the screenshot shows a blank rectangle or a fallback image where your ad should be, the creative failed to render. Automate this by diffing the ad region against a reference image of the expected creative."
      },
      {
        question: "How do I detect broken ad creatives?",
        answer: "Compare captured screenshots against expected creative mockups using visual comparison. Significant differences indicate rendering issues that need attention."
      },
      {
        question: "How often should I capture ads for compliance?",
        answer: "For regulatory compliance, capture at least daily during active campaigns. High-spend campaigns or those in regulated industries (pharma, finance) benefit from multiple captures per day to document that ad content remained compliant throughout the flight."
      },
      {
        question: "Can I capture ads from specific geographic locations?",
        answer: "Yes. Use Screenshotly's geo-targeting proxy options to capture pages as they appear in different regions. This is critical for verifying geo-targeted ad placements and ensuring region-specific creatives render correctly in each market."
      },
    ],
  },
  {
    slug: 'travel-listings',
    metaDescription: 'Capture hotel listings and booking pages for OTA comparison and compliance. Monitor rate parity across channels. Try free.',
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
    metaDescription: 'Capture course content and student work for LMS platforms. Generate certificates and document progress. Try Screenshotly free.',
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
    metaDescription: 'Legal screenshot evidence for court-admissible web capture. Compliance screenshot automation for regulatory proof. Try Screenshotly free.',
    title: 'Legal & Regulatory Compliance Documentation',
    shortTitle: 'Legal Compliance',
    description: 'Legal evidence capture, regulatory compliance, and court-admissible web screenshots. Document consent flows and regulatory disclosures.',
    longDescription: `Legal proceedings and regulatory audits demand verifiable evidence. When asked "what did this webpage show on this date?", you need court-admissible web capture—screenshots with timestamps, metadata, and chain-of-custody documentation.

Screenshotly provides legal screenshot evidence suitable for litigation and compliance. Capture terms of service, privacy policies, consent flows, cookie banners, and regulatory disclosures. Full-page captures with AI removal disabled preserve the exact user experience. Compliance screenshot automation ensures continuous documentation without manual effort.

GDPR, CCPA, and industry regulations require demonstrable proof. Timestamped, metadata-rich captures supplement technical logs and provide clear evidence for auditors and courts. Store with hashes and immutable storage for maximum legal weight.`,
    icon: 'Scale',
    keywords: [
      'legal screenshot evidence',
      'compliance screenshot automation',
      'court-admissible web capture',
      'regulatory proof documentation',
      'legal web evidence API',
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
      {
        question: "What metadata should I store alongside compliance screenshots?",
        answer: "At minimum, store the URL, capture timestamp (ISO 8601), HTTP response headers, and a SHA-256 hash of the image file. For court-admissible evidence, also record the requesting IP, DNS resolution, and TLS certificate details to establish authenticity."
      },
      {
        question: "How do I maintain chain of custody for screenshot evidence?",
        answer: "Write each capture to immutable storage (e.g., AWS S3 Object Lock or Azure immutable blobs) immediately after generation. Log the SHA-256 hash to a tamper-evident audit trail. This creates a verifiable chain of custody that auditors and legal teams can trust."
      },
    ],
  },
  {
    slug: 'healthcare-documentation',
    metaDescription: 'Capture patient portals and telehealth interfaces for compliance. Document workflows with PHI-safe screenshots. Try free.',
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
    metaDescription: 'Generate consistent screenshots for marketplace and directory listings. Auto-capture when sellers submit. Try Screenshotly free.',
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
    metaDescription: 'Attach context-rich screenshots to bug reports automatically. Integrate with Jira, Linear, and GitHub. Start free today.',
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
      {
        question: "How do I attach screenshots to Jira tickets automatically?",
        answer: "After capturing the screenshot via the Screenshotly API, upload it as an attachment using Jira's REST API (/rest/api/3/issue/{key}/attachments) with the screenshot binary. You can wire this into your error handler so every unhandled exception automatically creates a Jira ticket with a full-page screenshot attached."
      },
      {
        question: "Can I annotate screenshots before filing a bug?",
        answer: "Screenshotly provides clean capture; for annotations, pipe the returned image through a lightweight canvas library (like Sharp or Jimp in Node.js) to add arrows, highlights, or bounding boxes before attaching to the ticket. This keeps bug reports clear without requiring a separate annotation tool."
      },
    ],
  },
  {
    slug: 'accessibility-audit',
    metaDescription: 'Document WCAG compliance with visual evidence screenshots. Capture focus states, contrast, and zoom levels. Try Screenshotly free.',
    title: 'Accessibility Documentation & Visual Evidence',
    shortTitle: 'Accessibility',
    description: 'Capture and document accessibility states across your website. Build visual evidence for WCAG compliance reviews.',
    longDescription: `Web accessibility compliance requires visual documentation. WCAG audits need screenshots showing focus states, color contrast, text sizing, and keyboard navigation paths. Manual capture is tedious and inconsistent.

Screenshotly captures pages in specific states needed for accessibility audits: high-contrast mode, zoomed views, keyboard focus states, and screen reader outlines. These captures document current compliance and track improvements over time.

Accessibility consultants use automated captures to efficiently audit large sites. Development teams capture before-and-after states to document fixes. Legal teams maintain compliance records for ADA and similar regulations.`,
    icon: 'Eye',
    keywords: [
      'accessibility documentation screenshots',
      'WCAG visual evidence',
      'a11y screenshots',
      'accessibility compliance capture',
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
      {
        question: "What zoom levels should I capture for WCAG documentation?",
        answer: "WCAG 1.4.4 requires content to be usable at 200% zoom. Capture at 100%, 150%, and 200% (deviceScaleFactor 1, 1.5, and 2) to document that layout does not break and text remains readable. Some auditors also request 400% evidence for WCAG 1.4.10 reflow compliance."
      },
      {
        question: "How do I capture keyboard focus state screenshots?",
        answer: "Use Screenshotly's JavaScript injection to programmatically move focus to each interactive element before capture. This documents the visual focus indicator required by WCAG 2.4.7 and lets you verify that focus rings are visible against all background colors."
      },
    ],
  },
  {
    slug: 'social-proof-widgets',
    metaDescription: 'Capture reviews, tweets, and testimonials as screenshot-based social proof for landing pages and campaigns. Try free.',
    title: 'Social Proof Screenshot Capture',
    shortTitle: 'Social Proof',
    description: 'Capture customer reviews, social media mentions, and testimonials as visual social proof screenshots for marketing.',
    longDescription: `Social proof drives conversions. Screenshots of real customer reviews, social media mentions, and case study results provide more credible proof than text testimonials alone. A screenshot of a genuine tweet, G2 review, or support ticket carries more weight.

Screenshotly captures social media posts, review platform entries, and customer communications as visual testimonials. Embed these screenshots in landing pages, email campaigns, and sales collateral. The visual format is more credible and engaging than copy-pasted text.

Automate the capture of mentions and reviews as they appear. Build a library of social proof assets that your marketing team can use across channels.`,
    icon: 'ThumbsUp',
    keywords: [
      'social proof screenshots',
      'testimonial screenshot capture',
      'review screenshots',
      'social media proof capture',
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
      {
        question: "Can I capture tweets and G2 reviews without login?",
        answer: "Public tweets and G2 reviews are accessible without authentication. Use the CSS selector parameter to isolate the review card or tweet article element, and Screenshotly's AI removal strips surrounding navigation and cookie banners for a clean social proof asset."
      },
      {
        question: "What dimensions work best for testimonial screenshots on landing pages?",
        answer: "For landing page testimonial carousels, capture at a viewport width of 600-800px to get a compact, card-friendly aspect ratio. Use the selector parameter to crop to just the review content, producing images that fit neatly into testimonial grids without excessive whitespace."
      },
    ],
  },
  {
    slug: 'api-documentation-images',
    metaDescription: 'Automate screenshots for Swagger UI and OpenAPI docs. Keep API documentation visually current. Start free today.',
    title: 'API Documentation Visual Guides',
    shortTitle: 'API Docs',
    description: 'Automate screenshots for API reference docs — Swagger UI, OpenAPI explorers, and endpoint response previews. Keep API docs visually current.',
    longDescription: `API reference documentation is easier to follow with visuals. Screenshotly captures Swagger UI pages, OpenAPI explorer interfaces, and endpoint response previews so developers see exactly what your API looks like in action.

Point the API at your Swagger or Redoc URL to capture the full endpoint reference. Screenshot individual endpoint sections using CSS selectors. Capture Postman collection screenshots showing request/response pairs. Keep all images version-tagged so your v1 and v2 docs each show the correct interface.

Trigger automated captures in your CI/CD pipeline whenever the OpenAPI spec changes. Technical writers no longer need to manually screenshot every endpoint after each release. Product teams maintain accurate, version-specific API documentation images without lifting a finger.`,
    icon: 'Code',
    keywords: [
      'API documentation screenshots',
      'Swagger UI screenshots',
      'OpenAPI documentation images',
      'REST API docs automation',
      'endpoint documentation capture',
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
      {
        question: "How do I keep documentation screenshots up to date automatically?",
        answer: "Add a Screenshotly capture step to your CI/CD pipeline that triggers whenever your OpenAPI spec or docs site is deployed. The script compares new screenshots against the previous set and commits only the changed images, so documentation stays current without manual effort."
      },
      {
        question: "What viewport size is best for API documentation screenshots?",
        answer: "Use 1280×800px for Swagger UI and Redoc captures — it mirrors most developer laptop screens and avoids horizontal scrolling. For Postman-style request/response screenshots, 1440×900px provides extra width for side-by-side panels without making the image too large to embed."
      },
    ],
  },
  {
    slug: 'dashboard-snapshots',
    metaDescription: 'Deliver BI dashboards to stakeholders without system access. Schedule automated screenshot distribution. Try Screenshotly free.',
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
      {
        question: "How do I schedule automatic dashboard snapshots?",
        answer: "Use a cron job, GitHub Actions schedule, or workflow tools like Zapier/n8n to trigger captures at set intervals — daily, weekly, or after data refresh. Attach the captured images to email reports or Slack notifications."
      },
      {
        question: "What viewport size works best for dashboard captures?",
        answer: "Use 1920x1080 for standard dashboards. For dashboards with many panels, consider 2560x1440 or capture with fullPage enabled to get all panels in a single image."
      },
    ],
  },
  {
    slug: 'design-system-docs',
    metaDescription: 'Capture Storybook stories and component variants for docs. Keep design system documentation in sync. Try free.',
    title: 'Design System Documentation & Component Library',
    shortTitle: 'Design Systems',
    description: 'Capture Storybook stories, component variants, and design token previews automatically. Keep your component library docs always in sync.',
    longDescription: `Component libraries evolve fast — and their documentation falls behind just as quickly. Screenshotly captures individual Storybook stories, component variants, and design token previews so your design system docs stay current without manual screenshots.

Point the API at your Storybook iframe URLs to capture isolated components. Use CSS selectors to target the story root element for clean, cropped images. Capture every variant — sizes, states, themes (light/dark) — in a single automated pass. Generate visual changelogs by diffing current captures against previous versions.

Design system teams integrate captures into their CI pipeline: on every component library release, fresh screenshots are generated and published to the documentation site. Designers and developers always see the real, rendered component — not an outdated static image.`,
    icon: 'Palette',
    keywords: [
      'design system documentation',
      'Storybook screenshots',
      'component library docs',
      'UI component documentation',
      'design token previews',
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
      {
        question: "Does this work with Figma or other design tools?",
        answer: "You can capture Figma embed URLs or any browser-accessible design tool. For private Figma files, use Figma's API to export frames directly, then compare against your live component screenshots."
      },
      {
        question: "How do I capture components in different themes (light/dark)?",
        answer: "Append theme parameters to your Storybook URL or use custom CSS injection to toggle themes before capture. Run two capture passes — one for light mode, one for dark — to document both variants."
      },
    ],
  },
  {
    slug: 'website-migration',
    metaDescription: 'Validate migrations with page-by-page visual comparison. Catch layout issues before go-live. Try Screenshotly free.',
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
      {
        question: "What level of visual difference should trigger a flag?",
        answer: "A 1-2% pixel difference threshold catches real layout issues while ignoring minor rendering variations. Adjust based on your tolerance — tighter for brand-critical pages, looser for content-heavy pages with dynamic elements."
      },
      {
        question: "Should I compare on multiple devices?",
        answer: "Yes. Capture desktop (1920x1080), tablet (768x1024), and mobile (375x812) viewports for each page. Responsive layout bugs often appear only at specific breakpoints and would be missed with a single viewport."
      },
    ],
  },
];

export type UseCase = (typeof useCases)[number];

