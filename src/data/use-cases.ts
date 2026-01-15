// Use case definitions for pSEO pages
export const useCases = [
    {
        slug: 'documentation-screenshots',
        title: 'Documentation Screenshots',
        shortTitle: 'Documentation',
        description: 'Automate screenshot capture for technical documentation. Keep your docs always up-to-date with fresh screenshots that reflect the latest UI changes.',
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
    },
    {
        slug: 'social-media-previews',
        title: 'Social Media Previews',
        shortTitle: 'Social Media',
        description: 'Generate beautiful link previews and social media cards. Create eye-catching thumbnails that drive clicks and engagement.',
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
    },
    {
        slug: 'e-commerce-product-images',
        title: 'E-commerce Product Images',
        shortTitle: 'E-commerce',
        description: 'Capture product pages and listings for catalogs, marketplaces, and comparison tools. Automate product image generation at scale.',
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
    },
    {
        slug: 'automated-testing',
        title: 'Automated Testing & QA',
        shortTitle: 'Testing',
        description: 'Integrate visual testing into your CI/CD pipeline. Capture screenshots for regression testing and visual diff comparisons.',
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
    },
    {
        slug: 'website-thumbnails',
        title: 'Website Thumbnails',
        shortTitle: 'Thumbnails',
        description: 'Generate thumbnail previews for link aggregators, directories, and bookmarking services. Create visual previews at any size.',
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
    },
    {
        slug: 'pdf-generation',
        title: 'PDF Generation',
        shortTitle: 'PDF',
        description: 'Convert web pages to PDF documents. Perfect for invoices, reports, and archival purposes.',
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
];

export type UseCase = (typeof useCases)[number];
