---
title: "PDF Generation from HTML: Complete API Guide"
description: "Generate PDFs from HTML, URLs, and templates using screenshot APIs. Covers formatting, options, and production patterns for invoice, report, and document generation."
excerpt: "Convert HTML to PDF with complete control over formatting. From simple pages to complex invoices and reports."
author: "asad-ali"
publishedAt: "2025-11-08"
category: "tutorial"
tags: ["pdf", "html", "documents", "invoices", "reports"]
keywords: ["html to pdf", "url to pdf", "pdf generation api", "invoice pdf", "report pdf", "document generation"]
featured: false
readingTime: 8
---

PDF generation is a common requirement—invoices, reports, certificates, and documentation all need PDF output. Using a screenshot API for PDF generation provides pixel-perfect rendering with full CSS support.

This guide covers everything from basic URL-to-PDF to complex templated document generation.

## Basic PDF Generation

### URL to PDF

```javascript
async function urlToPdf(url) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      format: 'pdf',
      pdf: {
        format: 'A4',
        printBackground: true,
      },
    }),
  });

  return response.arrayBuffer();
}

// Usage
const pdf = await urlToPdf('https://example.com/invoice/123');
fs.writeFileSync('invoice.pdf', Buffer.from(pdf));
```

### HTML to PDF

Render HTML directly:

```javascript
async function htmlToPdf(html) {
  const response = await fetch('https://api.screenshotly.app/screenshot', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      format: 'pdf',
      pdf: {
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          bottom: '20mm',
          left: '15mm',
          right: '15mm',
        },
      },
    }),
  });

  return response.arrayBuffer();
}
```

## PDF Options

### Page Size

Standard paper sizes:

```javascript
pdf: {
  format: 'A4',  // 210 × 297 mm
  // format: 'Letter',  // 8.5 × 11 in
  // format: 'Legal',  // 8.5 × 14 in
}

// Or custom dimensions
pdf: {
  width: '210mm',
  height: '297mm',
}
```

### Orientation

```javascript
pdf: {
  format: 'A4',
  landscape: true,  // Default: false (portrait)
}
```

### Margins

```javascript
pdf: {
  margin: {
    top: '25mm',
    bottom: '25mm',
    left: '20mm',
    right: '20mm',
  },
}
```

### Headers and Footers

```javascript
pdf: {
  displayHeaderFooter: true,
  headerTemplate: `
    <div style="font-size: 10px; text-align: center; width: 100%;">
      <span>Company Name</span>
    </div>
  `,
  footerTemplate: `
    <div style="font-size: 10px; text-align: center; width: 100%;">
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
    </div>
  `,
  margin: {
    top: '40mm',  // Space for header
    bottom: '30mm',  // Space for footer
  },
}
```

Available template classes:
- `.date` - Formatted date
- `.title` - Document title
- `.url` - Document URL
- `.pageNumber` - Current page
- `.totalPages` - Total pages

## Invoice Generation

### Invoice Template

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #333;
      line-height: 1.4;
    }
    .invoice {
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .logo { font-size: 24px; font-weight: bold; }
    .invoice-details {
      text-align: right;
    }
    .invoice-number {
      font-size: 20px;
      color: #666;
    }
    .addresses {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .address { width: 45%; }
    .address-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background: #f8f9fa;
      font-weight: 600;
    }
    .amount { text-align: right; }
    .totals {
      width: 300px;
      margin-left: auto;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
    .total-final {
      font-size: 18px;
      font-weight: bold;
      border-top: 2px solid #333;
      padding-top: 12px;
    }
    .footer {
      margin-top: 60px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div class="logo">{{company_name}}</div>
      <div class="invoice-details">
        <div class="invoice-number">Invoice #{{invoice_number}}</div>
        <div>Date: {{date}}</div>
        <div>Due: {{due_date}}</div>
      </div>
    </div>
    
    <div class="addresses">
      <div class="address">
        <div class="address-label">From</div>
        <div>{{company_name}}</div>
        <div>{{company_address}}</div>
        <div>{{company_email}}</div>
      </div>
      <div class="address">
        <div class="address-label">Bill To</div>
        <div>{{client_name}}</div>
        <div>{{client_address}}</div>
        <div>{{client_email}}</div>
      </div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th class="amount">Price</th>
          <th class="amount">Total</th>
        </tr>
      </thead>
      <tbody>
        {{#each items}}
        <tr>
          <td>{{description}}</td>
          <td>{{quantity}}</td>
          <td class="amount">${{price}}</td>
          <td class="amount">${{total}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
    
    <div class="totals">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>${{subtotal}}</span>
      </div>
      <div class="totals-row">
        <span>Tax ({{tax_rate}}%)</span>
        <span>${{tax}}</span>
      </div>
      <div class="totals-row total-final">
        <span>Total</span>
        <span>${{total}}</span>
      </div>
    </div>
    
    <div class="footer">
      Thank you for your business!
    </div>
  </div>
</body>
</html>
```

### Generating Invoice PDF

```javascript
import Handlebars from 'handlebars';

const invoiceTemplate = Handlebars.compile(templateHtml);

async function generateInvoicePdf(invoiceData) {
  // Render template with data
  const html = invoiceTemplate({
    company_name: 'Acme Inc',
    company_address: '123 Business St, City',
    company_email: 'billing@acme.com',
    invoice_number: invoiceData.number,
    date: formatDate(invoiceData.date),
    due_date: formatDate(invoiceData.dueDate),
    client_name: invoiceData.client.name,
    client_address: invoiceData.client.address,
    client_email: invoiceData.client.email,
    items: invoiceData.items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      price: formatCurrency(item.price),
      total: formatCurrency(item.quantity * item.price),
    })),
    subtotal: formatCurrency(invoiceData.subtotal),
    tax_rate: invoiceData.taxRate,
    tax: formatCurrency(invoiceData.tax),
    total: formatCurrency(invoiceData.total),
  });
  
  // Generate PDF
  return await htmlToPdf(html);
}
```

## Report Generation

### Multi-Page Reports

```javascript
async function generateReport(data) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { margin: 20mm; }
        .page-break { page-break-after: always; }
        .chart { width: 100%; height: 300px; }
        table { width: 100%; margin: 20px 0; }
        th, td { padding: 8px; border: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <!-- Cover Page -->
      <div class="cover">
        <h1>${data.title}</h1>
        <p>Generated: ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="page-break"></div>
      
      <!-- Executive Summary -->
      <h2>Executive Summary</h2>
      <p>${data.summary}</p>
      
      <div class="page-break"></div>
      
      <!-- Data Tables -->
      ${data.sections.map(section => `
        <h2>${section.title}</h2>
        <table>
          <thead>
            <tr>${section.columns.map(c => `<th>${c}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${section.rows.map(row => `
              <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      `).join('<div class="page-break"></div>')}
    </body>
    </html>
  `;
  
  return await htmlToPdf(html);
}
```

### Including Charts

Use base64 images for charts:

```javascript
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

async function generateChartImage(config) {
  const canvas = new ChartJSNodeCanvas({ width: 800, height: 400 });
  const buffer = await canvas.renderToBuffer(config);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function generateReportWithCharts(data) {
  const chartImage = await generateChartImage({
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{ data: data.values }],
    },
  });
  
  const html = `
    <h1>Sales Report</h1>
    <img src="${chartImage}" width="800" height="400" />
    <!-- rest of report -->
  `;
  
  return await htmlToPdf(html);
}
```

## Certificate Generation

```javascript
async function generateCertificate(recipientName, courseName, date) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .certificate {
          background: white;
          padding: 60px;
          border: 8px double #2c3e50;
          text-align: center;
          width: 800px;
        }
        h1 {
          font-size: 48px;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        .recipient {
          font-size: 36px;
          font-family: 'Georgia', serif;
          margin: 30px 0;
          color: #1a5f7a;
        }
        .course {
          font-size: 24px;
          margin: 20px 0;
        }
        .date {
          color: #666;
          margin-top: 40px;
        }
        .signature {
          margin-top: 60px;
          border-top: 2px solid #333;
          padding-top: 10px;
          width: 200px;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <h1>Certificate of Completion</h1>
        <p>This is to certify that</p>
        <div class="recipient">${recipientName}</div>
        <p>has successfully completed</p>
        <div class="course">${courseName}</div>
        <div class="date">${date}</div>
        <div class="signature">Authorized Signature</div>
      </div>
    </body>
    </html>
  `;
  
  return await htmlToPdf(html);
}
```

## Print-Optimized CSS

### CSS for PDF

```css
/* PDF-specific styles */
@media print {
  /* Hide non-printable elements */
  .no-print, nav, .sidebar {
    display: none !important;
  }
  
  /* Prevent page breaks inside elements */
  .keep-together {
    page-break-inside: avoid;
  }
  
  /* Force page break before element */
  .page-break-before {
    page-break-before: always;
  }
  
  /* Force page break after element */
  .page-break-after {
    page-break-after: always;
  }
  
  /* Ensure links are readable */
  a[href]:after {
    content: " (" attr(href) ")";
  }
  
  /* Black and white friendly */
  body {
    color: black !important;
    background: white !important;
  }
}

/* Page margins */
@page {
  margin: 20mm;
}

@page :first {
  margin-top: 40mm;
}
```

## Batch PDF Generation

```javascript
async function generateBulkPdfs(items, template) {
  const results = [];
  const limit = pLimit(5);
  
  await Promise.all(
    items.map(item => limit(async () => {
      const html = template(item);
      const pdf = await htmlToPdf(html);
      
      results.push({
        id: item.id,
        filename: `${item.id}.pdf`,
        pdf,
      });
    }))
  );
  
  return results;
}

// Generate invoices for all orders
const invoices = await generateBulkPdfs(orders, invoiceTemplate);

// Save all PDFs
for (const invoice of invoices) {
  fs.writeFileSync(`invoices/${invoice.filename}`, Buffer.from(invoice.pdf));
}
```

## Best Practices

### 1. Use System Fonts

Avoid loading external fonts for reliability:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               'Helvetica Neue', Arial, sans-serif;
}
```

### 2. Embed Images as Base64

External images may not load:

```javascript
const imageBase64 = fs.readFileSync('logo.png').toString('base64');
const html = `<img src="data:image/png;base64,${imageBase64}" />`;
```

### 3. Test Page Breaks

Long content needs careful break management:

```css
tr, .item {
  page-break-inside: avoid;
}

h2 {
  page-break-after: avoid;
}
```

### 4. Set Explicit Dimensions

Avoid layout issues:

```css
body {
  width: 210mm;  /* A4 width */
  min-height: 297mm;  /* A4 height */
}
```

## Conclusion

PDF generation via screenshot API provides:

1. **Perfect rendering** - Full CSS support
2. **Flexibility** - Any HTML to PDF
3. **Consistency** - Same output every time
4. **Simplicity** - No server-side libraries needed

From simple invoices to complex reports, HTML-to-PDF covers all document generation needs.

---

**Ready to generate PDFs?**

[Get your free API key →](/sign-up) - 100 free screenshots to get started.

See also: [HTML to PDF Generation →](/blog/html-to-pdf-generation-guide)
