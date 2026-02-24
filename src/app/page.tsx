import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import HomeContent from "@/components/HomeContent";
import GuestLayout from "@/components/layouts/GuestLayout";
import { JsonLd } from "@/components/seo";
import { getHomepageSchemas, getFAQSchema } from "@/lib/seo/structured-data";
import { homepageFAQs } from "@/data/homepage-faqs";


export const metadata: Metadata = {
  title: "Screenshot API for Developers - AI-Powered Captures",
  description: "REST API for automated website screenshots. AI-powered element removal, device mockups, and PNG/JPEG/PDF output. 100 free screenshots — no credit card required.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <GuestLayout>
      <JsonLd data={getHomepageSchemas()} />
      <JsonLd data={getFAQSchema(homepageFAQs)} />

      <HomeContent userId={userId} />
    </GuestLayout>
  );
}
