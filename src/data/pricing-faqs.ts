// Pricing-page FAQs rendered on `/pricing` and emitted as FAQPage JSON-LD.

export const pricingFAQs = [
    {
        question: 'How is a screenshot counted?',
        answer:
            'Each successful API call that returns an image, PDF, or video counts as one screenshot against your plan quota. Failed requests (4xx/5xx errors) are not counted. Cached responses served within the configured TTL do not consume quota.',
    },
    {
        question: 'Can I change plans mid-cycle?',
        answer:
            'Yes. Upgrades are prorated for the remainder of the billing period. Downgrades take effect at the next renewal, so you keep your current limits until then.',
    },
    {
        question: 'What happens if I exceed my monthly limit?',
        answer:
            'Paid plans bill overage at a per-unit rate documented on the pricing page. You are not cut off mid-month; overage is charged at cycle end.',
    },
    {
        question: 'Is there a free tier?',
        answer:
            'Yes. Every account includes 100 lifetime free screenshots so you can evaluate the API end-to-end without a credit card.',
    },
];
