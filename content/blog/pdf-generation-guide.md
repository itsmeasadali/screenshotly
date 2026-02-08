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
  - "automated PDF creation"
  - "invoice PDF generator"
  - "report PDF API"
  - "HTML to PDF conversion"
  - "document automation"
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

Screenshotly's PDF output handles all these use cases with a simple API.

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

### Invoice Generation

For [e-commerce](/use-cases/ecommerce-screenshots) and billing systems:

```javascript
async function generateInvoice(invoiceId) {
  const invoiceUrl = `${process.env.APP_URL}/invoice/${invoiceId}?print=true`;

  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SCREENSHOTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: invoiceUrl,
      format: 'pdf',
      pdfOptions: {
        format: 'A4',
        printBackground: true,
        margin: {
          top: 60,
          right: 40,
          bottom: 60,
          left: 40,
        },
      },
      // Remove interactive elements
      hideSelectors: [
        '.download-button',
        '.print-button',
        '.navigation',
      ],
      // Wait for data to load
      waitForSelector: '.invoice-total',
      delay: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`PDF generation failed: ${response.status}`);
  }

  return response.arrayBuffer();
}
```

**Pro tip:** Create a dedicated print-friendly route (e.g., `/invoice/:id?print=true`) that hides navigation and optimizes layout for PDF.

### Report Generation

For analytics dashboards and [documentation](/use-cases/documentation-screenshots):

```javascript
async function generateReport(reportData) {
  // Render report to a page
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
        landscape: true, // Better for charts
        printBackground: true,
        margin: { top: 50, right: 50, bottom: 50, left: 50 },
      },
      // Wait for charts to render
      delay: 2000,
      waitForSelector: '.chart-rendered',
    }),
  });

  return response;
}
```

### Certificate Generation

For courses, achievements, and credentials:

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
        landscape: true, // Certificate format
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }, // Full bleed
      },
      // Ensure fonts are loaded
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

Control where pages break using CSS:

```css
/* Force page break before an element */
.chapter-start {
  page-break-before: always;
}

/* Prevent breaking inside an element */
.keep-together {
  page-break-inside: avoid;
}

/* Keep element with next element */
h2 {
  page-break-after: avoid;
}
```

### Print-Specific Styles

Create print-optimized styles:

```css
@media print {
  /* Hide non-essential elements */
  .navigation,
  .sidebar,
  .footer,
  .ads {
    display: none !important;
  }

  /* Optimize layout for print */
  .content {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  /* Ensure backgrounds print */
  .header {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Force page breaks */
  .section {
    page-break-inside: avoid;
  }
}
```

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

### Email Attachment Workflow

```javascript
async function sendInvoiceEmail(customerId, invoiceId) {
  // Generate PDF
  const pdfBuffer = await generateInvoice(invoiceId);

  // Send email with attachment
  await transporter.sendMail({
    from: 'billing@company.com',
    to: customer.email,
    subject: `Invoice #${invoiceId}`,
    text: 'Please find your invoice attached.',
    attachments: [
      {
        filename: `invoice-${invoiceId}.pdf`,
        content: Buffer.from(pdfBuffer),
        contentType: 'application/pdf',
      },
    ],
  });
}
```

### Download Endpoint

```javascript
// Next.js API route
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const invoiceId = searchParams.get('id');

  // Validate access
  const session = await getSession();
  if (!canAccessInvoice(session.userId, invoiceId)) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Generate PDF
  const pdfBuffer = await generateInvoice(invoiceId);

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="invoice-${invoiceId}.pdf"`,
    },
  });
}
```

### Batch PDF Generation

For bulk document creation:

```javascript
async function generateBulkReports(reportIds) {
  const batchSize = 5; // Parallel limit
  const results = [];

  for (let i = 0; i < reportIds.length; i += batchSize) {
    const batch = reportIds.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(async (id) => {
        try {
          const pdf = await generateReport(id);
          return { id, success: true, pdf };
        } catch (error) {
          return { id, success: false, error: error.message };
        }
      })
    );

    results.push(...batchResults);

    // Rate limiting pause between batches
    if (i + batchSize < reportIds.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return results;
}
```

## Performance Optimization

### Caching Generated PDFs

```javascript
const pdfCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function getCachedPdf(cacheKey, generateFn) {
  const cached = pdfCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.pdf;
  }

  const pdf = await generateFn();
  pdfCache.set(cacheKey, { pdf, timestamp: Date.now() });

  return pdf;
}

// Usage
const invoice = await getCachedPdf(
  `invoice-${invoiceId}`,
  () => generateInvoice(invoiceId)
);
```

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

Explore related features:

- **[Performance Optimization](/blog/optimize-screenshot-performance)**: Speed up PDF generation
- **[AI Element Removal](/blog/ai-element-removal-guide)**: Clean documents automatically
- **[Security Guide](/blog/screenshot-api-security-guide)**: Protect sensitive documents
- **[Documentation Screenshots](/use-cases/documentation-screenshots)**: Create docs alongside PDFs

Check our [JavaScript](/integrations/javascript) and [Python](/integrations/python) integration guides for language-specific examples.

Ready to generate PDFs? Try it in our [playground](/playground) or [get started free](/sign-up).
