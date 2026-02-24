import { Metadata } from "next";
import Pricing from '@/components/Pricing';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from "@/components/seo";
import { getProductSchema, getFAQSchema } from "@/lib/seo/structured-data";
import { pricingFAQs } from "@/data/pricing-faqs";


export const metadata: Metadata = {
  title: "Screenshot API Pricing - Free Plan + Scale from $14/mo",
  description: "Screenshotly offers screenshot API plans from free (100 screenshots) to $199/mo (50,000 screenshots). AI element removal, device mockups, PDF output. No hidden fees.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Screenshot API Pricing | Start Free – Screenshotly",
    description: "100 free screenshots to start. Plans from $14/mo. Block ads, render PDFs, AI element removal. No hidden fees, cancel anytime.",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <GuestLayout>
      <JsonLd data={getProductSchema()} />
      <JsonLd data={getFAQSchema(pricingFAQs)} />

      <Pricing />
    </GuestLayout>
  );
}