---
title: "How to Generate PDF from HTML with a Screenshot API"
description: "Learn how to convert HTML pages to PDF documents using a screenshot API. Covers styling, pagination, headers/footers, and production implementation."
excerpt: "A practical guide to HTML-to-PDF conversion using screenshot APIs. From basic exports to print-ready documents with headers and footers."
author: "asad-ali"
publishedAt: "2026-01-12"
category: "tutorial"
tags: ["pdf generation", "html to pdf", "automation", "api"]
keywords: ["html to pdf", "screenshot to pdf", "generate pdf api", "convert webpage pdf", "pdf generation api"]
featured: false
readingTime: 9
---

Converting web pages to PDF is a common requirement for invoices, reports, documentation, and data exports. While browser-based solutions exist, they're inconsistent across environments and difficult to automate.

A screenshot API with PDF support provides reliable, server-side HTML-to-PDF conversion that works consistently anywhere.

## Why Use an API for PDF Generation?

### Browser Limitations

Client-side PDF generation (using window.print() or libraries like html2pdf) has problems:

- **Inconsistent rendering** across browsers
- **No server-side processing** for automation
- **User interaction required** in many cases
- **Limited styling control** for print media
- **Memory constraints** for large documents

### API Advantages

Server-side PDF generation offers:

- **Consistent output** regardless of client
- **Full automation** via REST API
- **Print-optimized rendering** with Chromium
- **Headers, footers, and page numbers** automatically
- **Large document support** without memory issues

## Basic PDF Generation

The simplest PDF generation is a single API call:

```javascript
async function generatePDF(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      format: 'pdf',
    }),
  });

  return response.arrayBuffer();
}

// Usage
const pdfBuffer = await generatePDF('https://example.com/invoice/123');
fs.writeFileSync('invoice.pdf', Buffer.from(pdfBuffer));
```

## PDF Options

### Page Size and Orientation

```javascript
{
  url: 'https://example.com/report',
  format: 'pdf',
  pdfOptions: {
    pageSize: 'A4',          // A4, Letter, Legal, Tabloid, etc.
    landscape: false,         // true for landscape orientation
  }
}
```

**Available page sizes:**
- `A3`, `A4`, `A5`, `A6`
- `Letter`, `Legal`, `Tabloid`
- Custom: `{ width: '8.5in', height: '11in' }`

### Margins

```javascript
{
  url: 'https://example.com/document',
  format: 'pdf',
  pdfOptions: {
    pageSize: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm',
    }
  }
}
```

### Background Graphics

Include background colors and images:

```javascript
{
  url: 'https://example.com/colorful-report',
  format: 'pdf',
  pdfOptions: {
    printBackground: true,  // Include background colors/images
  }
}
```

### Headers and Footers

Add dynamic headers and footers:

```javascript
{
  url: 'https://example.com/document',
  format: 'pdf',
  pdfOptions: {
    pageSize: 'A4',
    margin: {
      top: '50mm',    // Extra space for header
      bottom: '30mm', // Extra space for footer
    },
    headerTemplate: `
      <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
        <span>Your Company Name</span>
        <span style="float: right;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #888;">
        Generated on <span class="date"></span>
      </div>
    `,
    displayHeaderFooter: true,
  }
}
```

**Available template variables:**
- `pageNumber` - Current page number
- `totalPages` - Total page count
- `date` - Current date
- `title` - Document title
- `url` - Document URL

## Use Case Implementations

### Invoice Generation

```javascript
async function generateInvoice(invoiceId) {
  // Your app renders the invoice at this URL
  const invoiceUrl = `https://app.yoursite.com/invoices/${invoiceId}/render`;
  
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: invoiceUrl,
      format: 'pdf',
      pdfOptions: {
        pageSize: 'A4',
        margin: {
          top: '15mm',
          bottom: '15mm',
          left: '15mm',
          right: '15mm',
        },
        printBackground: true,
      },
      // Wait for invoice to fully render
      delay: 500,
    }),
  });

  return response.arrayBuffer();
}

// Express endpoint
app.get('/api/invoices/:id/pdf', async (req, res) => {
  const pdf = await generateInvoice(req.params.id);
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="invoice-${req.params.id}.pdf"`);
  res.send(Buffer.from(pdf));
});
```

### Report Export

```javascript
async function generateReport(reportId, options = {}) {
  const reportUrl = `https://app.yoursite.com/reports/${reportId}/export`;
  
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: reportUrl,
      format: 'pdf',
      pdfOptions: {
        pageSize: options.landscape ? 'A4' : 'A4',
        landscape: options.landscape || false,
        margin: {
          top: '20mm',
          bottom: '25mm',
          left: '15mm',
          right: '15mm',
        },
        printBackground: true,
        headerTemplate: `
          <div style="font-size: 10px; margin-left: 15mm;">
            <strong>${options.title || 'Report'}</strong>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 9px; width: 100%; text-align: center;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>
        `,
        displayHeaderFooter: true,
      },
      // Reports may have charts that need time to render
      delay: 2000,
    }),
  });

  return response.arrayBuffer();
}
```

### Documentation Export

```javascript
async function exportDocumentation(pages) {
  const pdfs = [];
  
  for (const page of pages) {
    const response = await fetch('https://api.screenshotly.app/screenshot', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: page.url,
        format: 'pdf',
        pdfOptions: {
          pageSize: 'A4',
          margin: {
            top: '25mm',
            bottom: '25mm',
            left: '20mm',
            right: '20mm',
          },
          printBackground: true,
          headerTemplate: `
            <div style="font-size: 10px; margin-left: 20mm;">
              ${page.title}
            </div>
          `,
          footerTemplate: `
            <div style="font-size: 9px; width: 100%; text-align: center;">
              <span class="pageNumber"></span>
            </div>
          `,
          displayHeaderFooter: true,
        },
        aiRemoval: {
          enabled: true,
          types: ['cookie-banner', 'chat-widget'],
        },
      }),
    });

    pdfs.push({
      title: page.title,
      buffer: await response.arrayBuffer(),
    });
  }

  // Use pdf-lib or similar to merge PDFs
  return mergePDFs(pdfs);
}
```

## Styling for PDF

### Print-Specific CSS

Create CSS rules specifically for PDF export:

```css
/* styles.css */
@media print {
  /* Hide navigation and interactive elements */
  nav, .sidebar, .chat-widget, footer {
    display: none !important;
  }
  
  /* Avoid page breaks inside elements */
  .card, .table-row, .section {
    page-break-inside: avoid;
  }
  
  /* Force page breaks before sections */
  .page-break, h1 {
    page-break-before: always;
  }
  
  /* Ensure backgrounds print */
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* Adjust font sizes for print */
  body {
    font-size: 12pt;
    line-height: 1.4;
  }
  
  /* Full width on print */
  .container {
    max-width: 100%;
    padding: 0;
  }
}
```

### PDF-Specific Render Route

Create a dedicated route for PDF rendering:

```jsx
// pages/invoices/[id]/render.jsx
export default function InvoiceRender({ invoice }) {
  return (
    <html>
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Helvetica', sans-serif;
            font-size: 12pt;
            color: #333;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
          }
          .logo { height: 50px; }
          .invoice-number { font-size: 24pt; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f5f5f5; }
          .total-row { font-weight: bold; font-size: 14pt; }
        `}</style>
      </head>
      <body>
        <div className="invoice-header">
          <img src="/logo.png" className="logo" alt="Company" />
          <div>
            <div className="invoice-number">Invoice #{invoice.number}</div>
            <div>Date: {invoice.date}</div>
          </div>
        </div>
        
        {/* Invoice content... */}
      </body>
    </html>
  );
}
```

## Production Implementation

### Express/Node.js API

```javascript
const express = require('express');
const app = express();

const PDF_API_KEY = process.env.SCREENSHOTLY_API_KEY;

async function generatePDF(config) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PDF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error(`PDF generation failed: ${response.status}`);
  }

  return response.arrayBuffer();
}

// Invoice PDF endpoint
app.get('/api/invoices/:id/pdf', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Check authorization
    if (invoice.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const pdf = await generatePDF({
      url: `${process.env.APP_URL}/invoices/${invoice.id}/render`,
      format: 'pdf',
      pdfOptions: {
        pageSize: 'A4',
        margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
        printBackground: true,
      },
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="invoice-${invoice.number}.pdf"`
    );
    res.send(Buffer.from(pdf));
    
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.listen(3000);
```

### Caching Generated PDFs

For frequently accessed PDFs, implement caching:

```javascript
const Redis = require('ioredis');
const redis = new Redis();

async function getOrGeneratePDF(invoiceId) {
  const cacheKey = `pdf:invoice:${invoiceId}`;
  
  // Check cache
  const cached = await redis.getBuffer(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Generate new PDF
  const pdf = await generatePDF({
    url: `${process.env.APP_URL}/invoices/${invoiceId}/render`,
    format: 'pdf',
    pdfOptions: { /* ... */ },
  });
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, Buffer.from(pdf));
  
  return pdf;
}

// Invalidate cache on invoice update
invoiceService.on('update', async (invoiceId) => {
  await redis.del(`pdf:invoice:${invoiceId}`);
});
```

## Best Practices

### 1. Use Print-Optimized Layouts

Design specifically for PDF output:
- Fixed widths work better than responsive
- Avoid flexbox for complex layouts
- Test page breaks explicitly

### 2. Wait for Content

Ensure dynamic content is loaded:

```javascript
{
  delay: 1000,  // Wait for JavaScript to execute
  waitFor: '#content-loaded',  // Wait for specific element
}
```

### 3. Handle Large Documents

For multi-page documents:
- Increase timeout settings
- Consider chunking very large documents
- Use pagination in your templates

### 4. Secure Render Routes

Protect PDF render endpoints:

```javascript
// Only allow requests from your own API
app.get('/invoices/:id/render', (req, res, next) => {
  const token = req.query.token;
  if (!verifyRenderToken(token)) {
    return res.status(403).send('Forbidden');
  }
  next();
});
```

## Conclusion

HTML-to-PDF conversion via screenshot API provides consistent, reliable document generation that works in any environment. Whether for invoices, reports, or documentation, server-side rendering ensures your PDFs look exactly as intended.

Key takeaways:

1. **Use format: 'pdf'** for PDF output instead of image formats
2. **Configure pdfOptions** for page size, margins, and headers/footers
3. **Create print-specific CSS** for optimal PDF styling
4. **Build dedicated render routes** optimized for PDF output
5. **Cache generated PDFs** to reduce API calls

---

**Ready to generate PDFs from HTML?**

[Get your free API key →](/sign-up) - 100 free requests to start.

Learn more about [PDF generation use cases →](/use-cases/pdf-generation)
