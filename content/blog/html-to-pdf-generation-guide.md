---
title: "CSS Print Styling for PDF Generation: Page Breaks, Headers & Layouts"
description: "Master @media print CSS for PDF generation: page breaks, orphan/widow control, headers, footers, A4 vs Letter sizing, and print-specific layouts."
excerpt: "Deep dive into CSS print stylesheets for PDF output. Page breaks, margins, headers/footers, and layout control so your PDFs look professional on paper."
author: "asad-ali"
publishedAt: "2026-01-12"
category: "tutorial"
tags: ["pdf", "css", "print", "styling", "page-breaks", "layout"]
keywords: ["CSS print styles PDF", "PDF page breaks CSS", "print stylesheet", "@media print guide", "orphans widows CSS", "page-break CSS", "CSS @page size"]
featured: false
readingTime: 12
faqs:
  - question: "How do I force a page break before a specific element?"
    answer: "`page-break-before: always` on the element (CSS 2.1) or `break-before: page` (CSS 3). Both work in print renderers. Use on invoice line-item separators, chapter headings, and certificate boundaries — anywhere the content logically starts a new page."
  - question: "Why do my tables split across page breaks mid-row?"
    answer: "Apply `page-break-inside: avoid` (or `break-inside: avoid`) to `<tr>` elements. This tells the print renderer to keep each row whole — if it doesn't fit on the current page, push the entire row to the next. Critical for invoices and financial tables where row integrity matters."
  - question: "Can I show page numbers in the footer?"
    answer: "Yes, via the `@page` rule with a `@bottom-center` margin box: `@page { @bottom-center { content: 'Page ' counter(page) ' of ' counter(pages); } }`. This produces 'Page 1 of 5' automatically. Combine with a header rule for document title + date."
---

Web pages are designed for screens—fluid layouts, hover states, fixed headers. When you generate a PDF, the output often looks wrong: elements cut across pages, navigation appears in the document, backgrounds vanish, and text breaks awkwardly. The fix is **CSS print styling**: `@media print` rules that control how your content renders on paper. This guide focuses exclusively on the **CSS design and formatting** side of PDF generation—page breaks, orphan/widow control, `@page` margins, paper sizes, and print-specific layouts.

The authoritative references for everything below: the [W3C CSS Paged Media specification](https://www.w3.org/TR/css-page-3/) (the canonical spec for `@page`, page breaks, and margin boxes), MDN's pages on [`@media print`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), [`@page`](https://developer.mozilla.org/en-US/docs/Web/CSS/@page), and the [`break-before` / `break-inside` properties](https://developer.mozilla.org/en-US/docs/Web/CSS/break-before). For more advanced print layouts (running headers/footers, cross-references, page numbering via JavaScript), [Paged.js](https://pagedjs.org/) is the open-source polyfill that implements much of CSS Paged Media in browsers.

For the PDF API itself (endpoints, options, headers/footers via JavaScript), see our [PDF Generation API Guide](/blog/pdf-generation-guide). For invoice-specific templates and currency formatting, see our [Invoice & Financial PDF Generation](/blog/invoice-pdf-generation-guide) guide.

## The PDF Formatting Challenge

Why do PDFs often look different from the screen version?

1. **Pagination** – Continuous scroll becomes discrete pages; content can split mid-paragraph or mid-table.
2. **Print media** – Browsers and PDF engines apply different CSS (or none) when "printing" vs displaying.
3. **Backgrounds** – Colors and images may be suppressed by default to save ink.
4. **Screen-only elements** – Navigation, sidebars, and ads clutter the document.

`@media print` lets you override screen styles and define rules that apply only when generating PDFs or printing.

## @media print Basics

Wrap all print-specific rules in a media query:

```css
@media print {
  /* These styles apply only when generating PDF or printing */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: black;
    background: white;
  }
}
```

### Hiding Screen-Only Elements

Remove navigation, sidebars, ads, and interactive widgets from PDF output:

```css
@media print {
  .navigation,
  .sidebar,
  .chat-widget,
  .cookie-banner,
  .ads,
  .footer-nav,
  .no-print {
    display: none !important;
  }
}
```

### Forcing Backgrounds to Print

By default, browsers may omit backgrounds. Ensure logos, colored headers, and watermarks appear:

```css
@media print {
  body,
  .header,
  .invoice-logo,
  .watermark {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

## Page Break Control

The most common formatting issue is content splitting across pages. CSS provides properties to control where breaks occur.

### page-break-before

Force a new page before an element (e.g., each chapter):

```css
@media print {
  .chapter,
  .section-start,
  h1 {
    page-break-before: always;
  }
}
```

### page-break-after

Force a page break after an element:

```css
@media print {
  .cover-page,
  .executive-summary {
    page-break-after: always;
  }
}
```

### page-break-inside: avoid

Prevent an element from being split across pages. Critical for tables, cards, and invoice rows:

```css
@media print {
  table,
  tr,
  .card,
  .invoice-row,
  .totals-block {
    page-break-inside: avoid;
  }
}
```

### page-break-after: avoid (Headings)

Keep headings with the content that follows them—don't let a heading appear alone at the bottom of a page:

```css
@media print {
  h1, h2, h3 {
    page-break-after: avoid;
  }

  p, li {
    page-break-inside: avoid;
  }
}
```

### Modern Equivalents

The newer `break-before`, `break-after`, and `break-inside` properties are supported in many PDF engines:

```css
@media print {
  .chapter {
    break-before: page;
  }

  table {
    break-inside: avoid;
  }
}
```

## Orphan and Widow Control

*Orphans* are lines of a paragraph left at the bottom of a page when the rest continues on the next page. *Widows* are lines left alone at the top of a page. Both look unprofessional.

```css
@media print {
  p {
    orphans: 3;  /* Minimum 3 lines at bottom of page */
    widows: 3;   /* Minimum 3 lines at top of page */
  }
}
```

Adjust values (typically 2–3) based on font size and line height. Some engines also support `orphans` and `widows` on block-level elements.

## Print Margins and @page

Use `@page` to set margins for the entire document:

```css
@page {
  margin: 20mm;
}

/* First page can have different margins (e.g., no top margin for cover) */
@page :first {
  margin-top: 40mm;
}

/* Left/right pages for duplex printing */
@page :left {
  margin-left: 25mm;
  margin-right: 15mm;
}

@page :right {
  margin-left: 15mm;
  margin-right: 25mm;
}
```

Margin units: `mm`, `cm`, `in`, `pt`, `px`. Use `mm` or `in` for consistency with physical paper.

## A4 vs Letter Sizing

Different regions use different paper sizes. Set explicit dimensions so layouts don't stretch or shrink unexpectedly.

### A4 (International)

- **Size:** 210mm × 297mm
- Common in Europe, Asia, Africa, most of the world

```css
@page {
  size: A4;
  margin: 20mm;
}

body {
  width: 210mm;
  min-height: 297mm;
}
```

### Letter (North America)

- **Size:** 8.5in × 11in (216mm × 279mm)
- US and Canada standard

```css
@page {
  size: letter;
  margin: 0.75in;
}
```

### Landscape vs Portrait

```css
@page {
  size: A4 landscape;  /* 297mm × 210mm */
}

/* Or portrait (default) */
@page {
  size: A4 portrait;
}
```

### Custom Size

```css
@page {
  size: 200mm 280mm;
}
```

## Headers and Footers

PDF headers and footers (company branding, page numbers, dates) are configured via the API's `headerTemplate` and `footerTemplate` options — not through CSS. When using them, ensure your `@page` or API margins reserve enough space at the top and bottom so content doesn't overlap the header/footer. For the full API implementation with template classes (`.pageNumber`, `.totalPages`, `.date`), see our [PDF Generation API Guide](/blog/pdf-generation-guide#headers-and-footers).

## Connecting Print CSS to Your PDF API Call

Once your print stylesheet is in place, include it in the page you pass to the PDF API. Either link it as a separate file or inline it:

```html
<link rel="stylesheet" href="print.css" media="print" />
<!-- Or inline -->
<style>
  @media print {
    nav, .sidebar { display: none !important; }
    .section { page-break-inside: avoid; }
    h2 { page-break-after: avoid; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
```

The API call itself is straightforward — pass the URL with `format: 'pdf'` and `printBackground: true`. For the complete API implementation with all options, see our [PDF Generation API Guide](/blog/pdf-generation-guide#basic-pdf-generation).

## Print-Specific Layout Adjustments

### Full-Width Content

Remove max-widths and padding that constrain screen layouts:

```css
@media print {
  .container {
    max-width: 100%;
    padding: 0;
  }

  .content {
    width: 100%;
    margin: 0;
  }
}
```

### Fixing Links

Append URLs after links for printed readability:

```css
@media print {
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.9em;
    color: #666;
  }
}
```

### Black-and-White Optimization

If printing in grayscale, ensure sufficient contrast:

```css
@media print {
  body {
    color: black !important;
    background: white !important;
  }

  /* Avoid light gray text that may disappear */
  .muted {
    color: #333 !important;
  }
}
```

## Complete Print Stylesheet Example

```css
@media print {
  /* Hide non-printable */
  .no-print, nav, .sidebar, .ads {
    display: none !important;
  }

  /* Page setup */
  @page {
    size: A4;
    margin: 25mm;
  }

  /* Typography */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: black;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Page breaks */
  .chapter { page-break-before: always; }
  table, tr, .card { page-break-inside: avoid; }
  h1, h2, h3 { page-break-after: avoid; }

  /* Orphans and widows */
  p { orphans: 3; widows: 3; }

  /* Layout */
  .container { max-width: 100%; padding: 0; }
}
```

## Best Practices

1. **Test with real content** – Long documents expose break issues that short samples miss.
2. **Use `page-break-inside: avoid` on tables** – Split tables look broken.
3. **Reserve margin for headers/footers** – Match API margin values to your template.
4. **Choose A4 or Letter up front** – Switching later can break layouts.
5. **Keep print CSS in a separate file or `@media print` block** – Easier to maintain.

## Conclusion

PDF output quality depends on **print-specific CSS**: `@media print` rules, page break properties, orphan/widow control, `@page` margins, and paper size. Combine these with a screenshot API's header/footer support for professional, paginated documents that look correct on screen and on paper.

Key takeaways:
- Use `@media print` to override screen styles
- Control breaks with `page-break-before`, `page-break-after`, `page-break-inside`
- Set `orphans` and `widows` for better paragraph flow
- Use `@page` for margins and paper size (A4 vs Letter, portrait vs landscape)
- Enable `print-color-adjust: exact` for backgrounds
- Use API header/footer templates for repeating branding and page numbers

---

**Ready to style your PDFs?**

[Get your free API key →](/sign-up) – 100 free requests to start.

Learn more: [PDF Generation API Guide →](/blog/pdf-generation-guide) | [Invoice & Financial PDFs →](/blog/invoice-pdf-generation-guide) | [Batch Generation & Email Delivery →](/blog/invoice-report-generation-guide)
