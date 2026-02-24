---
title: "Invoice & Financial PDF Generation with Screenshot APIs"
description: "Generate invoice PDFs, receipts, and financial documents programmatically. API guide for billing systems, tax document automation, and receipt PDF generation."
excerpt: "API-driven invoice and financial document PDF generation. Billing systems, receipts, tax compliance formatting, batch exports, and currency handling."
author: "asad-ali"
publishedAt: "2025-11-08"
category: "tutorial"
tags: ["pdf", "invoices", "billing", "financial", "receipts", "automation"]
keywords: ["invoice PDF API", "receipt PDF generation", "financial document API", "invoice generation API", "tax document PDF", "currency formatting PDF", "invoice HTML template"]
featured: false
readingTime: 12
---

Billing systems, e-commerce platforms, and financial software need reliable PDF generation for invoices, receipts, and tax documents. Screenshot APIs deliver pixel-perfect, production-ready PDFs from your existing HTML templates—without heavyweight PDF libraries or server-side rendering complexity. This guide focuses exclusively on **invoice and financial document design**: HTML templates, currency/number formatting, tax compliance layouts, and receipt generation.

For the core PDF API mechanics (page sizes, margins, headers/footers), see our [PDF Generation API Guide](/blog/pdf-generation-guide). For batch invoice generation, email delivery, and scheduled automation pipelines, see our [Batch PDF Generation & Email Delivery](/blog/invoice-report-generation-guide) guide. For CSS print styling (`@media print`, page breaks), see our [CSS Print Styling for PDFs](/blog/html-to-pdf-generation-guide) guide.

## Financial Document PDF Generation

### Invoice PDF from URL

Generate PDFs from your existing invoice pages:

```javascript
async function generateInvoicePdf(invoiceId) {
  const invoiceUrl = `${process.env.APP_URL}/invoice/${invoiceId}?print=true`;

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
        format: 'A4',
        printBackground: true,
        margin: {
          top: 60,
          right: 40,
          bottom: 60,
          left: 40,
        },
      },
      hideSelectors: ['.download-button', '.print-button', '.navigation'],
      waitForSelector: '.invoice-total',
      delay: 500,
    }),
  });

  return response.arrayBuffer();
}

// Usage
const pdf = await generateInvoicePdf('INV-2025-001');
fs.writeFileSync('invoice-INV-2025-001.pdf', Buffer.from(pdf));
```

### HTML to PDF for Invoice Templates

Render Handlebars or server-side templates directly to PDF:

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
      pdfOptions: {
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

## Invoice Template Structure

### Professional Invoice HTML Template

A print-ready invoice template with proper structure for financial documents:

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
          <td class="amount">{{price}}</td>
          <td class="amount">{{total}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
    
    <div class="totals">
      <div class="totals-row">
        <span>Subtotal</span>
        <span>{{subtotal}}</span>
      </div>
      <div class="totals-row">
        <span>Tax ({{tax_rate}}%)</span>
        <span>{{tax}}</span>
      </div>
      <div class="totals-row total-final">
        <span>Total</span>
        <span>{{total}}</span>
      </div>
    </div>
    
    <div class="footer">
      Thank you for your business!
    </div>
  </div>
</body>
</html>
```

## Number and Currency Formatting

Financial documents require consistent, locale-aware formatting. Incorrect decimal places or currency symbols create compliance and clarity issues.

### Currency Formatting Helper

```javascript
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// $1,234.56 (USD)
formatCurrency(1234.56, 'USD');

// €1.234,56 (EUR, European style)
formatCurrency(1234.56, 'EUR', 'de-DE');
```

### Number Formatting for Quantities and Totals

```javascript
function formatNumber(num, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// For quantity (no decimals)
formatNumber(5, 0);  // "5"

// For unit prices
formatNumber(19.99, 2);  // "19.99"

// For large totals
formatNumber(125430.50, 2);  // "125,430.50"
```

### Generating Invoice PDF with Proper Formatting

```javascript
import Handlebars from 'handlebars';

const invoiceTemplate = Handlebars.compile(templateHtml);

async function generateInvoicePdf(invoiceData) {
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
      quantity: formatNumber(item.quantity, 0),
      price: formatCurrency(item.price),
      total: formatCurrency(item.quantity * item.price),
    })),
    subtotal: formatCurrency(invoiceData.subtotal),
    tax_rate: invoiceData.taxRate,
    tax: formatCurrency(invoiceData.tax),
    total: formatCurrency(invoiceData.total),
  });

  return await htmlToPdf(html);
}
```

## Tax Compliance and Receipt Formatting

### Tax Document Requirements

Many jurisdictions require invoices and receipts to show:
- **Tax ID / VAT number** – Company and sometimes client
- **Tax breakdown** – Line-item or summary tax rates
- **Tax-inclusive vs tax-exclusive** – Clear labeling
- **Legal disclaimers** – Terms, payment instructions, retention policies

Add a tax compliance section to your template:

```html
<div class="tax-compliance">
  <div class="vat-number">VAT ID: {{company_vat}}</div>
  <div class="tax-summary">Tax applied at {{tax_rate}}% ({{tax_description}})</div>
  <div class="legal-note">{{legal_disclaimer}}</div>
</div>
```

### Receipt PDF Generation

Receipts differ from invoices: shorter, often thermal-style, with emphasis on transaction ID and payment method:

```javascript
async function generateReceiptPdf(transaction) {
  const html = `
    <div class="receipt">
      <div class="receipt-header">{{store_name}}</div>
      <div class="receipt-id">Receipt #${transaction.id}</div>
      <div class="receipt-date">${new Date(transaction.date).toLocaleString()}</div>
      <table class="receipt-items">
        ${transaction.items.map(i => `
          <tr>
            <td>${i.name}</td>
            <td class="amount">${formatCurrency(i.total)}</td>
          </tr>
        `).join('')}
      </table>
      <div class="receipt-total">Total: ${formatCurrency(transaction.total)}</div>
      <div class="payment-method">Paid via ${transaction.paymentMethod}</div>
    </div>
  `;

  return await htmlToPdf(html);
}
```

## PDF Options for Financial Documents

### Page Size

Use A4 for international invoicing, Letter for North American clients:

```javascript
pdfOptions: {
  format: 'A4',  // 210 × 297 mm – international standard
  // format: 'Letter',  // 8.5 × 11 in – US/Canada
}
```

### Headers, Footers, and Margins

Multi-page invoices benefit from repeating headers (company name) and footers (page numbers, generation date). The PDF API supports `headerTemplate` and `footerTemplate` with special classes like `.pageNumber` and `.totalPages`. For complete header/footer implementation details and margin configuration, see our [PDF Generation API Guide](/blog/pdf-generation-guide#headers-and-footers).

## Batch Billing, Email Delivery, and Download Endpoints

Once your invoice templates and formatting are in place, you'll typically need to generate invoices in bulk (end-of-month billing), email them as attachments, and expose authenticated download endpoints. For complete implementations of these automation workflows — including concurrency-controlled batch generation, Nodemailer email attachment delivery, and secure Next.js download routes — see our [Batch PDF Generation & Email Delivery](/blog/invoice-report-generation-guide) guide.

## Best Practices for Financial PDFs

### 1. Use System Fonts

Avoid external font loading for reliability and speed:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               'Helvetica Neue', Arial, sans-serif;
}
```

### 2. Embed Images as Base64

Ensure logos and watermarks always render:

```javascript
const logoBase64 = fs.readFileSync('logo.png').toString('base64');
const html = `<img src="data:image/png;base64,${logoBase64}" alt="Logo" />`;
```

### 3. Keep Line Items Together

Prevent awkward page breaks inside invoice rows:

```css
@media print {
  tr, .invoice-row {
    page-break-inside: avoid;
  }
}
```

### 4. Test Across Currencies and Locales

Validate formatting for each target market (USD, EUR, GBP, etc.) and ensure decimal separators and thousands separators render correctly.

## Conclusion

Screenshot APIs streamline invoice and financial document PDF generation: invoices, receipts, and tax-compliant exports from your existing HTML templates. With proper currency formatting, batch billing support, and secure download flows, you can automate financial document workflows without heavyweight PDF libraries.

Key takeaways:
- Generate PDFs from invoice URLs or HTML templates
- Use `Intl.NumberFormat` for currency and number formatting
- Add tax compliance sections and receipt-specific layouts
- Use system fonts and base64 images for reliability
- Test across currencies and locales

---

**Ready to automate invoice PDF generation?**

[Get your free API key →](/sign-up) – 100 free screenshots to get started.

See also: [PDF Generation API Guide →](/blog/pdf-generation-guide) | [CSS Print Styling for PDFs →](/blog/html-to-pdf-generation-guide) | [Batch Generation & Email Delivery →](/blog/invoice-report-generation-guide)
