---
title: "Batch PDF Generation and Email Delivery Workflows"
description: "Automate PDF generation at scale: batch processing, email attachment delivery, scheduled generation, report pipelines, and cloud storage archival."
excerpt: "Build production-ready PDF automation pipelines: batch generation with concurrency control, email delivery, scheduled reports, and cloud archival."
author: "asad-ali"
publishedAt: "2025-10-05"
category: "guide"
tags: ["pdf", "batch-processing", "email-delivery", "automation"]
keywords: ["batch PDF generation", "email PDF attachment", "scheduled PDF reports", "PDF automation pipeline", "bulk invoice generation"]
featured: false
readingTime: 8
---

Once you have your PDF templates and API integration working, the next challenge is **automation at scale**: generating hundreds of invoices at month-end, emailing them to customers, running scheduled report generation, and archiving everything to cloud storage. This guide focuses on the **automation pipeline** — not the templates or API mechanics themselves.

For invoice HTML templates, currency formatting, and tax compliance, see our [Invoice & Financial PDF Generation](/blog/pdf-generation-complete-guide) guide. For the core PDF API options (page sizes, margins, headers/footers), see our [PDF Generation API Guide](/blog/pdf-generation-guide). For CSS print styling, see our [CSS Print Styling for PDFs](/blog/html-to-pdf-generation-guide) guide.

## Automation Architecture

```
Schedule/Trigger → Fetch Data → Generate PDFs (batch) → Deliver (email/storage) → Log Results
```

The pipeline has distinct stages, each with its own failure modes and optimization strategies.

## Scheduled Report Generation

Automate recurring reports with cron jobs or task schedulers:

```javascript
import cron from 'node-cron';

cron.schedule('0 8 1 * *', async () => {
  const lastMonth = getLastMonthRange();
  const reportData = await fetchMonthlyMetrics(lastMonth);

  const pdf = await generateReportPdf(reportData);

  await uploadToStorage(
    `reports/${lastMonth.year}/${lastMonth.month}/monthly-report.pdf`,
    pdf
  );

  await sendReportEmail({
    to: ['cfo@company.com', 'ops@company.com'],
    subject: `Monthly Report – ${lastMonth.label}`,
    pdfBuffer: pdf,
    filename: `monthly-report-${lastMonth.label}.pdf`,
  });

  console.log(`Monthly report generated and delivered for ${lastMonth.label}`);
});
```

For the report HTML template itself (metric cards, charts, styling), use the same template-rendering approach described in the [PDF Generation API Guide](/blog/pdf-generation-guide).

## Batch Invoice Generation

When generating hundreds of invoices (end-of-month billing, quarterly statements), concurrency control and error handling are critical.

### Concurrency-Controlled Batch Processing

```javascript
import pLimit from 'p-limit';

async function generateBatchInvoices(invoices) {
  const limit = pLimit(5);
  const results = [];

  await Promise.all(
    invoices.map(invoice =>
      limit(async () => {
        try {
          const pdf = await generateInvoicePdf(invoice.id);
          const key = `invoices/${invoice.year}/${invoice.month}/${invoice.number}.pdf`;
          await uploadToStorage(key, pdf);
          results.push({ invoice: invoice.number, status: 'success', key });
        } catch (error) {
          results.push({ invoice: invoice.number, status: 'failed', error: error.message });
        }
      })
    )
  );

  return results;
}
```

For the `generateInvoicePdf` function itself (templates, currency formatting, tax sections), see our [Invoice & Financial PDF Generation](/blog/pdf-generation-complete-guide) guide.

### End-of-Month Billing Pipeline

```javascript
async function runMonthEndBilling() {
  const unpaidInvoices = await db.getUnpaidInvoicesForMonth();
  console.log(`Processing ${unpaidInvoices.length} invoices`);

  const results = await generateBatchInvoices(unpaidInvoices);

  const succeeded = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');

  if (failed.length > 0) {
    await alertOps(`${failed.length} invoices failed generation`, failed);
  }

  for (const result of succeeded) {
    const invoice = unpaidInvoices.find(i => i.number === result.invoice);
    await sendInvoiceEmail(invoice, result.key);
  }

  return { total: results.length, succeeded: succeeded.length, failed: failed.length };
}
```

### Retry Logic for Failed Generations

```javascript
async function generateWithRetry(invoiceId, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await generateInvoicePdf(invoiceId);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

## Email Delivery with PDF Attachments

### Sending Individual Invoices

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

async function sendInvoiceEmail(invoice, storageKey) {
  const pdfBuffer = await downloadFromStorage(storageKey);

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
      content: pdfBuffer,
      contentType: 'application/pdf',
    }],
  });
}
```

### Bulk Email Delivery with Rate Limiting

When sending hundreds of invoice emails, respect SMTP rate limits:

```javascript
async function sendBulkInvoiceEmails(invoiceResults) {
  const emailLimit = pLimit(3);
  const emailDelay = 500;

  for (const result of invoiceResults.filter(r => r.status === 'success')) {
    await emailLimit(async () => {
      await sendInvoiceEmail(result.invoice, result.key);
      await new Promise(r => setTimeout(r, emailDelay));
    });
  }
}
```

### Sending Reports to Distribution Lists

```javascript
async function sendReportEmail({ to, subject, pdfBuffer, filename }) {
  await transporter.sendMail({
    from: 'reports@company.com',
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html: '<p>Please find the attached report.</p>',
    attachments: [{
      filename,
      content: Buffer.from(pdfBuffer),
      contentType: 'application/pdf',
    }],
  });
}
```

## Cloud Storage Archival

Store every generated PDF with a structured key for easy retrieval and audit trails:

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

async function uploadToStorage(key, pdfBuffer) {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.PDF_BUCKET,
    Key: key,
    Body: Buffer.from(pdfBuffer),
    ContentType: 'application/pdf',
  }));
}
```

Use a consistent key structure like `invoices/{year}/{month}/{invoice-number}.pdf` for organized retrieval and accounting audits.

## Best Practices for PDF Automation Pipelines

### 1. Validate Data Before Batch Processing

Catch missing fields before wasting API calls on broken templates:

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

### 2. Cache Compiled Templates

When generating hundreds of PDFs per batch, compile your Handlebars template once and reuse it across all invocations. Recompiling per-document adds unnecessary overhead.

### 3. Monitor Pipeline Health

Track success rates, generation times, and delivery failures. Alert on anomalies so failed batches don't go unnoticed until customers complain.

### 4. Use Idempotent Keys

If a batch run is interrupted and restarted, idempotent storage keys (based on invoice number, not timestamp) prevent duplicates.

### 5. Separate Generation from Delivery

Generate all PDFs first, then deliver. This lets you retry failed emails without re-generating PDFs, and avoids partial delivery if the generation step fails midway.

## Troubleshooting Batch Pipelines

**Some invoices fail while others succeed**: Check for missing data fields in the failed invoices. Use the `validateInvoiceData` function above to pre-screen before the batch run.

**SMTP rate limiting**: Most SMTP providers limit sends per minute. Use `pLimit` with a delay between emails. Consider SES or SendGrid for high-volume delivery.

**Batch runs take too long**: Increase the concurrency limit (default 5) if your API plan supports higher parallelism. Monitor for rate-limit (429) responses.

**Duplicate PDFs in storage**: Use invoice-number-based keys rather than timestamps, so re-running a batch overwrites rather than duplicates.

## FAQ

**How many invoices can I batch-generate at once?** The API handles large batches well. Use a concurrency limit of 5–10 and process in parallel. For 1,000+ invoices, add progress logging and chunk the work.

**Can I schedule generation with serverless functions?** Yes — use AWS Lambda with EventBridge, Vercel Cron, or Cloud Functions with Cloud Scheduler. Keep the function timeout above your expected batch duration.

**How do I handle partial failures?** Separate generation from delivery. Track results per-invoice, retry only the failed ones, and alert on persistent failures.

**What's the best storage for generated PDFs?** S3, R2, or GCS with a structured key format. Add CloudFront or a CDN if customers download PDFs directly.

---

**Ready to automate document generation?**

[Get your free API key →](/sign-up) — 100 free screenshots to get started.

See also:
- [Invoice & Financial PDF Generation →](/blog/pdf-generation-complete-guide)
- [PDF Generation API Guide →](/blog/pdf-generation-guide)
- [CSS Print Styling for PDFs →](/blog/html-to-pdf-generation-guide)

