---
title: "PDF Generation with Screenshot APIs: Complete Implementation Guide"
slug: "pdf-generation-guide"
excerpt: "Learn how to generate professional PDFs from web pages using Screenshotly's API. Perfect for invoices, reports, certificates, and documentation."
publishedAt: "2024-11-05T10:00:00Z"
updatedAt: "2025-02-01T10:00:00Z"
author: "asad-ali"
category: "tutorial"
tags: ["pdf", "generation", "automation", "documents"]
keywords: 
  - "PDF generation API"
  - "web page to PDF"
  - "screenshot to PDF"
  - "PDF API tutorial"
  - "generate PDF from URL"
  - "PDF page size options"
  - "PDF headers footers API"
  - "PDF margin settings"
readingTime: 12
featured: false
image: "/images/blog/pdf-generation/hero.jpg"
faqs:
  - question: "What's the difference between screenshot and PDF output?"
    answer: "Screenshots capture a visual image of the page (PNG/JPEG), while PDF output creates a paginated document with selectable text, clickable links, and proper print formatting. PDFs are better for documents that need to be printed or shared as files."
  - question: "Can I control PDF page size and orientation?"
    answer: "Yes! Screenshotly supports standard page sizes (A4, Letter, Legal) and custom dimensions. You can also set portrait or landscape orientation, margins, and headers/footers."
  - question: "How do I handle multi-page content?"
    answer: "Set fullPage: true to capture all content. The API automatically paginates long pages. You can also set specific page breaks using CSS @media print rules."
  - question: "Can PDFs include images and styles?"
    answer: "Absolutely. PDFs render the full page including images, CSS styles, web fonts, and even some CSS animations (as static frames). The output matches what you see in the browser."
---

## Why PDF Generation Matters

While screenshots capture visual snapshots, PDFs serve a different purpose. They're paginated documents with:
- **Selectable, searchable text**
- **Clickable hyperlinks**
- **Proper print formatting**
- **Universal compatibility**
- **Smaller file sizes for text-heavy content**

PDF generation is essential for:
- **Invoices and receipts** that customers need to download
- **Reports and analytics** dashboards
- **Certificates and credentials**
- **Legal documents** requiring signatures
- **Documentation exports**
- **Archival and compliance**

Screenshotly's PDF output handles all these use cases with a simple API. This guide covers the **core API mechanics**: page sizes, margins, headers/footers, multi-page handling, and output settings. For invoice-specific workflows, see our [Invoice & Financial PDF Generation](/blog/pdf-generation-complete-guide) guide. For CSS print styling (`@media print`, page breaks, font embedding), see our [CSS Print Styling for PDFs](/blog/html-to-pdf-generation-guide) guide. For batch generation and email delivery pipelines, see our [Automated Invoice & Report Generation](/blog/invoice-report-generation-guide) guide.

## Basic PDF Generation

### Simple Implementation

Converting a web page to PDF is straightforward:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/invoice/12345',
    format: 'pdf',
  }),
});

// Save the PDF
const pdfBuffer = await response.arrayBuffer();
await fs.writeFile('invoice.pdf', Buffer.from(pdfBuffer));
```

### PDF-Specific Options

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/report',
    format: 'pdf',
    pdfOptions: {
      // Page size
      format: 'A4', // or 'Letter', 'Legal', 'Tabloid'

      // Or custom dimensions (in pixels)
      // width: 794,
      // height: 1123,

      // Orientation
      landscape: false,

      // Margins (in pixels)
      margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      },

      // Print background graphics
      printBackground: true,

      // Scale (0.1 to 2.0)
      scale: 1,
    },
  }),
});
```

## Common PDF Use Cases

The PDF API works for invoices, reports, certificates, documentation exports, and more. Here's a quick overview of each pattern — with links to deeper guides for specific workflows.

### Invoice and Financial Documents

Invoices, receipts, and tax documents require precise formatting, currency handling, and tax compliance sections. For a complete walkthrough including HTML templates, currency formatting helpers, and tax compliance layouts, see our [Invoice & Financial PDF Generation](/blog/pdf-generation-complete-guide) guide.

### Report and Dashboard PDFs

For analytics dashboards and [documentation](/use-cases/documentation-screenshots), use landscape orientation and wait for charts to render:

```javascript
async function generateReport(reportData) {
  const reportUrl = `${process.env.APP_URL}/reports/render?data=${encodeURIComponent(
    JSON.stringify(reportData)
  )}`;

  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: reportUrl,
      format: 'pdf',
      pdfOptions: {
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: { top: 50, right: 50, bottom: 50, left: 50 },
      },
      delay: 2000,
      waitForSelector: '.chart-rendered',
    }),
  });

  return response;
}
```

### Certificate Generation

For courses, achievements, and credentials, use full-bleed landscape layout:

```javascript
async function generateCertificate(userId, courseId) {
  const certUrl = `${process.env.APP_URL}/certificate/${userId}/${courseId}`;

  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: certUrl,
      format: 'pdf',
      pdfOptions: {
        format: 'Letter',
        landscape: true,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
      delay: 1000,
    }),
  });

  return response;
}
```

## Handling Multi-Page Content

### Automatic Pagination

For long content, the API automatically paginates:

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/long-article',
    format: 'pdf',
    fullPage: true, // Capture entire content
    pdfOptions: {
      format: 'A4',
      printBackground: true,
    },
  }),
});
```

### CSS Page Break Control

You can control where pages break using CSS properties like `page-break-before`, `page-break-inside`, and `@media print` rules to hide navigation and optimize layouts. For a deep dive into print stylesheets — including orphan/widow control, `@page` margins, A4 vs Letter sizing, and complete print stylesheet examples — see our [CSS Print Styling for PDFs](/blog/html-to-pdf-generation-guide) guide.

## Headers and Footers

### Adding Page Headers

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/document',
    format: 'pdf',
    pdfOptions: {
      format: 'A4',
      margin: { top: 100, bottom: 80, left: 40, right: 40 },
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          <span>Company Name - Confidential</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; display: flex; justify-content: space-between; padding: 0 40px; color: #666;">
          <span>Generated on <span class="date"></span></span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      displayHeaderFooter: true,
    },
  }),
});
```

### Available Footer/Header Classes

Use these special classes in templates:
- `date` - Current date
- `title` - Document title
- `url` - Page URL
- `pageNumber` - Current page
- `totalPages` - Total pages

## Integration Patterns

Once you're generating PDFs, you'll typically need to deliver them via email, expose download endpoints, or produce them in bulk. For complete implementations of these workflows — including email attachment delivery, authenticated download routes, and batch generation with concurrency control — see our [Automated Invoice & Report Generation](/blog/invoice-report-generation-guide) guide.

## Performance Optimization

### Caching Generated PDFs

For documents that don't change frequently (e.g., finalized invoices, monthly reports), cache the generated PDF to avoid redundant API calls. Use a cache key based on the document ID and a TTL matched to your update frequency. For a complete guide to Redis, CDN, and multi-layer caching strategies, see our [Screenshot Caching Strategies](/blog/screenshot-caching-strategies-guide) guide.

### Optimizing Generation Speed

```javascript
const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: pdfUrl,
    format: 'pdf',
    // Speed optimizations
    blockResources: ['font'], // Skip web fonts if not critical
    timeout: 15000,
    // Minimal delay
    delay: 500,
    pdfOptions: {
      format: 'A4',
      printBackground: true,
    },
  }),
});
```

See our [performance optimization guide](/blog/optimize-screenshot-performance) for more techniques.

## Security Considerations

### Protecting Sensitive PDFs

```javascript
async function generateSecurePdf(documentId, userId) {
  // Validate access
  const document = await getDocument(documentId);
  if (document.ownerId !== userId) {
    throw new Error('Access denied');
  }

  // Generate with watermark for sensitive docs
  const pdfUrl = `${process.env.APP_URL}/secure-view/${documentId}?watermark=${userId}`;

  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: pdfUrl,
      format: 'pdf',
      pdfOptions: {
        format: 'A4',
        printBackground: true,
      },
      // Remove any edit controls
      hideSelectors: ['.edit-button', '.delete-button'],
    }),
  });

  return response;
}
```

For more security practices, see our [security guide](/blog/screenshot-api-security-guide).

## Troubleshooting

### Common Issues

**Blank or incomplete PDF:**
- Increase `delay` to ensure content loads
- Add `waitForSelector` for dynamic content
- Check if JavaScript is required for rendering

**Fonts not rendering:**
- Ensure web fonts are loaded before capture
- Use `delay: 1000` minimum for font loading
- Consider system font fallbacks for faster rendering

**Layout issues:**
- Add print-specific CSS (`@media print`)
- Set appropriate page margins
- Use `page-break-inside: avoid` for important sections

**Large file sizes:**
- Reduce image quality in source HTML
- Compress images before rendering
- Use `scale: 0.9` for slightly smaller output

## Best Practices

1. **Create print-specific routes** - Dedicated URLs with optimized layouts
2. **Use CSS print styles** - Hide navigation, optimize for paper
3. **Test across page sizes** - A4 for international, Letter for US
4. **Cache when possible** - Static documents can be cached
5. **Validate before generation** - Ensure data is complete

## Next Steps

Explore related PDF guides:

- **[Invoice & Financial PDFs](/blog/pdf-generation-complete-guide)**: Templates, currency formatting, tax compliance
- **[CSS Print Styling for PDFs](/blog/html-to-pdf-generation-guide)**: `@media print`, page breaks, orphan/widow control
- **[Batch Generation & Email Delivery](/blog/invoice-report-generation-guide)**: Automation pipelines, scheduled generation, email attachments

Explore related features:

- **[Performance Optimization](/blog/optimize-screenshot-performance)**: Speed up PDF generation
- **[Security Guide](/blog/screenshot-api-security-guide)**: Protect sensitive documents
- **[Documentation Screenshots](/use-cases/documentation-screenshots)**: Create docs alongside PDFs

Check our [JavaScript](/integrations/javascript) and [Python](/integrations/python) integration guides for language-specific examples.

Ready to generate PDFs? Try it in our [playground](/playground) or [get started free](/sign-up).
