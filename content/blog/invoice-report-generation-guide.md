---
title: "Automated Invoice and Report Generation with Screenshots"
description: "Generate professional PDF invoices, reports, and documents from HTML templates using screenshot and PDF APIs."
excerpt: "Transform HTML templates into polished invoices, reports, and business documents automatically."
author: "asad-ali"
publishedAt: "2025-10-05"
category: "guide"
tags: ["pdf", "invoices", "reports", "automation"]
keywords: ["invoice generator api", "pdf report generation", "html to pdf invoice", "automated reports"]
featured: false
readingTime: 6
---

Generating professional invoices and reports programmatically saves hours of manual work. This guide covers HTML-to-PDF conversion for business documents.

## Invoice Generation Architecture

```
Data (customer, items) → HTML Template → Screenshot/PDF API → PDF Invoice
```

## HTML Invoice Template

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; padding: 40px; }
    
    .invoice-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    
    .company-logo { height: 60px; }
    
    .invoice-info { text-align: right; }
    .invoice-number { font-size: 24px; font-weight: 700; }
    .invoice-date { color: #666; margin-top: 4px; }
    
    .addresses {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
    }
    
    .address-block h3 {
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 8px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    
    th, td { padding: 12px; text-align: left; }
    th { background: #f8f9fa; font-weight: 600; }
    td { border-bottom: 1px solid #eee; }
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
      font-size: 20px;
      font-weight: 700;
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
  <div class="invoice-header">
    <img src="{{company.logo}}" alt="{{company.name}}" class="company-logo" />
    <div class="invoice-info">
      <div class="invoice-number">Invoice #{{invoice.number}}</div>
      <div class="invoice-date">{{invoice.date}}</div>
    </div>
  </div>
  
  <div class="addresses">
    <div class="address-block">
      <h3>From</h3>
      <strong>{{company.name}}</strong><br>
      {{company.address}}<br>
      {{company.email}}
    </div>
    <div class="address-block">
      <h3>Bill To</h3>
      <strong>{{customer.name}}</strong><br>
      {{customer.address}}<br>
      {{customer.email}}
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Qty</th>
        <th>Rate</th>
        <th class="amount">Amount</th>
      </tr>
    </thead>
    <tbody>
      {{#each items}}
      <tr>
        <td>{{description}}</td>
        <td>{{quantity}}</td>
        <td>${{rate}}</td>
        <td class="amount">${{amount}}</td>
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
      <span>Tax ({{taxRate}}%)</span>
      <span>${{tax}}</span>
    </div>
    <div class="totals-row total-final">
      <span>Total</span>
      <span>${{total}}</span>
    </div>
  </div>
  
  <div class="footer">
    <p>Payment due within 30 days. Thank you for your business!</p>
  </div>
</body>
</html>
```

## Invoice Generator Service

```javascript
import Handlebars from 'handlebars';

class InvoiceGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.template = Handlebars.compile(invoiceTemplate);
  }

  async generate(invoiceData) {
    // Render HTML from template
    const html = this.template({
      company: invoiceData.company,
      customer: invoiceData.customer,
      invoice: {
        number: invoiceData.number,
        date: this.formatDate(invoiceData.date),
      },
      items: invoiceData.items,
      subtotal: this.formatCurrency(invoiceData.subtotal),
      taxRate: invoiceData.taxRate,
      tax: this.formatCurrency(invoiceData.tax),
      total: this.formatCurrency(invoiceData.total),
    });

    // Generate PDF via API
    const pdf = await this.htmlToPdf(html);
    
    return pdf;
  }

  async htmlToPdf(html) {
    const response = await fetch('https://api.screenshotly.app/pdf', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html,
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' },
        printBackground: true,
      }),
    });

    return response.arrayBuffer();
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }

  formatCurrency(amount) {
    return amount.toFixed(2);
  }
}
```

## Usage Example

```javascript
const generator = new InvoiceGenerator(process.env.API_KEY);

const invoiceData = {
  company: {
    name: 'Acme Corp',
    logo: 'https://example.com/logo.png',
    address: '123 Business Ave, Suite 100',
    email: 'billing@acme.com',
  },
  customer: {
    name: 'John Doe',
    address: '456 Customer St',
    email: 'john@customer.com',
  },
  number: 'INV-2025-001',
  date: new Date(),
  items: [
    { description: 'Professional Services', quantity: 10, rate: 150, amount: 1500 },
    { description: 'Software License', quantity: 1, rate: 299, amount: 299 },
  ],
  subtotal: 1799,
  taxRate: 8,
  tax: 143.92,
  total: 1942.92,
};

const pdfBuffer = await generator.generate(invoiceData);
fs.writeFileSync('invoice.pdf', Buffer.from(pdfBuffer));
```

## Report Generation

### Monthly Report Template

```javascript
const reportTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .report-header { background: #2563eb; color: white; padding: 40px; }
    .report-title { font-size: 32px; font-weight: 700; }
    .report-period { opacity: 0.8; }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding: 30px;
    }
    
    .metric-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
    }
    
    .metric-value { font-size: 36px; font-weight: 700; }
    .metric-label { color: #666; font-size: 14px; }
    .metric-change { font-size: 12px; margin-top: 4px; }
    .metric-change.positive { color: #22c55e; }
    .metric-change.negative { color: #ef4444; }
    
    .chart-section { padding: 30px; }
    .chart-title { font-size: 18px; font-weight: 600; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="report-header">
    <div class="report-title">{{title}}</div>
    <div class="report-period">{{period}}</div>
  </div>
  
  <div class="metrics-grid">
    {{#each metrics}}
    <div class="metric-card">
      <div class="metric-value">{{value}}</div>
      <div class="metric-label">{{label}}</div>
      <div class="metric-change {{changeClass}}">{{change}}</div>
    </div>
    {{/each}}
  </div>
  
  <div class="chart-section">
    <div class="chart-title">Revenue Trend</div>
    <img src="{{revenueChartUrl}}" alt="Revenue Chart" />
  </div>
</body>
</html>
`;
```

## Batch Invoice Generation

```javascript
async function generateBatchInvoices(invoices) {
  const generator = new InvoiceGenerator(process.env.API_KEY);
  const limit = pLimit(5); // 5 concurrent
  
  const results = await Promise.all(
    invoices.map(invoice => 
      limit(async () => {
        try {
          const pdf = await generator.generate(invoice);
          const filename = `invoice-${invoice.number}.pdf`;
          await uploadToStorage(filename, pdf);
          return { invoice: invoice.number, status: 'success', filename };
        } catch (error) {
          return { invoice: invoice.number, status: 'failed', error: error.message };
        }
      })
    )
  );
  
  return results;
}
```

## Email Integration

```javascript
async function sendInvoiceEmail(invoice, pdfBuffer) {
  const transporter = nodemailer.createTransport({ /* config */ });
  
  await transporter.sendMail({
    from: 'billing@company.com',
    to: invoice.customer.email,
    subject: `Invoice ${invoice.number} from ${invoice.company.name}`,
    html: `
      <p>Dear ${invoice.customer.name},</p>
      <p>Please find attached invoice ${invoice.number} for $${invoice.total}.</p>
      <p>Payment is due within 30 days.</p>
    `,
    attachments: [{
      filename: `${invoice.number}.pdf`,
      content: Buffer.from(pdfBuffer),
      contentType: 'application/pdf',
    }],
  });
}
```

## Best Practices for Document Generation

### 1. Use Web Fonts for Consistency

Browser default fonts vary between operating systems. To ensure your invoices look identical everywhere, embed web fonts directly in your HTML template:

```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  body { font-family: 'Inter', sans-serif; }
</style>
```

### 2. Handle Page Breaks for Multi-Page Documents

Long invoices with many line items will span multiple pages. Control where page breaks happen with CSS:

```css
.invoice-items tr {
  page-break-inside: avoid;
}
.page-break {
  page-break-after: always;
}
.totals {
  page-break-inside: avoid;
}
```

### 3. Validate Data Before Rendering

Missing required fields lead to broken templates. Always validate invoice data before rendering:

```javascript
function validateInvoiceData(data) {
  const required = ['company.name', 'customer.name', 'number', 'items'];
  for (const field of required) {
    const value = field.split('.').reduce((obj, key) => obj?.[key], data);
    if (!value) throw new Error(`Missing required field: ${field}`);
  }
  if (!data.items.length) throw new Error('Invoice must have at least one item');
}
```

### 4. Cache Compiled Templates

If you're generating hundreds of invoices per batch, compile your Handlebars template once and reuse it. The `InvoiceGenerator` class above already does this in the constructor — avoid recompiling the template for each invoice.

### 5. Archive Generated PDFs

Store every generated invoice in cloud storage (R2, S3) with a structured key format for easy retrieval:

```
invoices/{year}/{month}/{invoice-number}.pdf
```

This makes it easy to find old invoices and provides an audit trail for accounting purposes.

## Troubleshooting

**PDF appears blank or has no styles**: Make sure `printBackground: true` is set in your API call. Without it, background colors and images won't render.

**Fonts look different than expected**: Include the font files directly in your HTML via `@import` or embed them as base64. Don't rely on system fonts.

**Images not loading in PDF**: Use absolute URLs for all images (logos, chart images). Relative paths won't resolve correctly in the headless browser.

**Table rows split across pages**: Add `page-break-inside: avoid` to your table row styles to keep rows together.

## FAQ

**Can I generate invoices in multiple currencies?** Yes — handle currency formatting in your template data. Use `Intl.NumberFormat` for locale-aware currency formatting before passing data to the template.

**How do I add a digital signature to the PDF?** Generate the PDF first, then use a library like `pdf-lib` or `node-signpdf` to add a digital signature to the final document.

**What about RTL languages (Arabic, Hebrew)?** Add `dir="rtl"` to your HTML element and use `text-align: right` in your CSS. The PDF API renders RTL content correctly.

**What's the maximum PDF size?** The API handles documents up to 100 pages comfortably. For very large reports, consider splitting into multiple PDFs and merging them afterward.

---

**Ready to automate document generation?**

[Get your free API key →](/sign-up) — 100 free screenshots to get started.

See also:
- [HTML to PDF Generation Guide →](/blog/html-to-pdf-generation-guide)
- [PDF Generation Complete Guide →](/blog/pdf-generation-complete-guide)
- [Batch Screenshot Processing →](/blog/batch-screenshot-processing)

