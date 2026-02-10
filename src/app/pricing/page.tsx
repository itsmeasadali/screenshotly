import { Metadata } from "next";
import Pricing from '@/components/Pricing';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from "@/components/seo";
import { getProductSchema, getFAQSchema } from "@/lib/seo/structured-data";


export const metadata: Metadata = {
  title: "Pricing - Screenshot API Plans | 100 Free Screenshots",
  description: "Start free with 100 screenshots. No credit card required. Scale from $14/mo for 2,500 screenshots to enterprise. Block ads, render PDFs, AI element removal.",
  keywords: [
    "screenshot API pricing",
    "website screenshot API cost",
    "screenshot as a service pricing",
    "screenshot API free tier",
    "cheap screenshot API",
    "best screenshot API pricing",
    "free screenshot API",
    "screenshot API plans",
    "buy screenshot API",
    "screenshot API comparison",
    "URL to image API pricing",
    "webpage capture API cost",
    "automated screenshot pricing",
    "bulk screenshot API",
    "screenshot rendering API",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Screenshot API Pricing | Start Free – Screenshotly",
    description: "100 free screenshots to start. Plans from $14/mo. Block ads, render PDFs, AI element removal. No hidden fees, cancel anytime.",
    type: "website",
  },
};

// Pricing FAQs for structured data
const pricingFAQs = [
  {
    question: "How much does a screenshot API cost?",
    answer: "Screenshotly offers 100 free screenshots to get started — no credit card required. Paid plans start at $14/month for 2,500 screenshots/mo, $59/month for 12,000 screenshots/mo, and $199/month for 50,000 screenshots/mo. Extra screenshots are charged at $0.003 to $0.007 each.",
  },
  {
    question: "Is there a free screenshot API?",
    answer: "Yes! Screenshotly offers 100 free screenshots with no credit card required. The free tier includes PNG, WebP, JPEG formats, full page captures, custom viewports, and ad blocking. Once you've used your 100 free screenshots, upgrade to a paid plan to continue.",
  },
  {
    question: "What happens if I exceed my screenshot limit?",
    answer: "On paid plans, extra screenshots are billed at your plan's per-extra rate ($0.007 on Basic, $0.005 on Growth, $0.003 on Scale). On the free tier, once your 100 lifetime screenshots are used, you'll need to upgrade to continue.",
  },
  {
    question: "Can I change or cancel my plan at any time?",
    answer: "Yes, you can upgrade, downgrade, or cancel at any time with no penalties. When upgrading, you're charged a prorated amount. Downgrades take effect at the next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) via Stripe. Annual plans receive a 20% discount. Enterprise invoicing is available on Scale plans.",
  },
  {
    question: "How fast are screenshots rendered?",
    answer: "Most screenshots complete in 2-5 seconds. Full-page captures and JavaScript-heavy sites may take up to 15 seconds. Growth and Scale plans get priority rendering for faster results.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund.",
  },
  {
    question: "How does Screenshotly compare to other screenshot APIs?",
    answer: "Screenshotly offers competitive pricing with unique features like AI-powered element removal, device mockup frames, and scrolling screenshots. Our Growth plan at $59/mo includes features that competitors charge $79+ for.",
  },
  {
    question: "Can I use screenshots commercially?",
    answer: "Yes, all screenshots captured through our API can be used for any commercial purpose — websites, apps, marketing materials, reports — with no additional licensing fees.",
  },
  {
    question: "Do you charge for failed requests?",
    answer: "No. You only pay for successful screenshots. Failed requests, timeouts, and cached responses do not count toward your monthly quota.",
  },
];

export default function PricingPage() {
  return (
    <GuestLayout>
      <JsonLd data={getProductSchema()} />
      <JsonLd data={getFAQSchema(pricingFAQs)} />

      <Pricing />
    </GuestLayout>
  );
}