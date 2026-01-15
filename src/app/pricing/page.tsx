import { Metadata } from "next";
import Pricing from '@/components/Pricing';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from "@/components/seo";
import { getProductSchema, getFAQSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Pricing - Affordable Screenshot API Plans",
  description: "Simple, transparent pricing for Screenshotly. Start free with 500 screenshots/day. Scale to Pro for 5000+ screenshots with AI features. No hidden fees, cancel anytime.",
  keywords: [
    "screenshot API pricing",
    "screenshot service cost",
    "cheap screenshot API",
    "free screenshot API",
    "API pricing plans",
    "screenshot API free tier",
    "website screenshot pricing",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Screenshot API Pricing | Screenshotly",
    description: "Start free with 500 screenshots/day. Upgrade to Pro for AI features and higher limits.",
    type: "website",
  },
};

// Pricing FAQs for structured data
const pricingFAQs = [
  {
    question: "What happens if I exceed my API limit?",
    answer: "Requests beyond your plan's limit will receive a 429 status code. Consider upgrading your plan or implementing rate limiting in your application.",
  },
  {
    question: "Can I change plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and PayPal. For annual plans, we also offer invoicing options.",
  },
  {
    question: "Is there a free trial for Pro features?",
    answer: "Yes! All new users get a 7-day free trial of Pro features when they sign up. No credit card required.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact support if you're not satisfied.",
  },
  {
    question: "Can I use screenshots commercially?",
    answer: "Yes, all screenshots captured through our API can be used for commercial purposes without any additional licensing fees.",
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