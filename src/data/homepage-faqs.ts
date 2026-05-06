// Homepage FAQs rendered on `/` and emitted as FAQPage JSON-LD.

export const homepageFAQs = [
    {
        question: 'What is Screenshotly?',
        answer:
            'Screenshotly is a REST API for capturing website screenshots programmatically. Send a URL, get back a PNG, JPEG, WebP, or PDF in seconds. AI-assisted cleanup removes cookie banners and chat widgets automatically, and built-in device mockups wrap captures in browser, phone, or laptop frames — without a second rendering pipeline.',
    },
    {
        question: 'Do I need a credit card to start?',
        answer:
            'No. Every account starts with 100 free screenshots so you can integrate and evaluate the API end-to-end. You only add a card when you upgrade to a paid plan.',
    },
    {
        question: 'What formats are supported?',
        answer:
            'PNG, JPEG, WebP, and PDF. Pick PNG for lossless UI captures, WebP for smaller bandwidth on thumbnails and social previews, and PDF for paginated or printable output with selectable text and clickable links.',
    },
    {
        question: 'How is authentication handled?',
        answer:
            'API access uses Bearer tokens — generate a key in your dashboard and pass it in the Authorization header. Keys are hashed server-side, scoped per account, and can be rotated or revoked at any time. The dashboard itself is protected by Clerk-backed session auth.',
    },
    {
        question: 'Can I capture authenticated pages?',
        answer:
            'Yes. Pass cookies or custom headers with your request to capture logged-in dashboards, gated docs, or internal tooling. Service accounts with read-only scopes are the recommended pattern so you never rotate real user credentials into a capture pipeline.',
    },
    {
        question: 'How fast is a typical capture?',
        answer:
            'Most captures complete in 2–5 seconds end-to-end, depending on the target page. Full-page captures of long marketing sites and PDF renders of multi-page reports sit toward the upper end. Uptime target is 99.9%.',
    },
];
