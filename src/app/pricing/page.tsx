import { Metadata } from "next";
import Pricing from '@/components/Pricing';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from "@/components/seo";
import { getProductSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Pricing - Affordable Screenshot API Plans",
  description: "Simple, transparent pricing for Screenshotly. Start free with 500 screenshots/day. Scale to Pro for 5000+ screenshots. No hidden fees, cancel anytime.",
  keywords: [
    "screenshot API pricing",
    "screenshot service cost",
    "cheap screenshot API",
    "free screenshot API",
    "API pricing plans",
  ],
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <GuestLayout>
      <JsonLd data={getProductSchema()} />
      <Pricing />
    </GuestLayout>
  );
} 