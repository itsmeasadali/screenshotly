import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import HomeContent from "@/components/HomeContent";
import GuestLayout from "@/components/layouts/GuestLayout";
import { JsonLd } from "@/components/seo";
import { getHomepageSchemas, getFAQSchema } from "@/lib/seo/structured-data";
import { getReviewSchema } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Screenshotly - Screenshot API for Developers | Automated Website Captures",
  description: "Powerful REST API for capturing website screenshots programmatically. Clean screenshots with AI-powered element removal, device mockups, and multiple formats. Perfect for testing automation, documentation, and content creation.",
  alternates: {
    canonical: "/",
  },
};

const homepageFAQs = [
  {
    question: "What is Screenshotly?",
    answer: "Screenshotly is a RESTful API service that allows developers to capture high-quality website screenshots programmatically. It features AI-powered element removal, device mockups, and multiple output formats.",
  },
  {
    question: "How do I get started with the Screenshot API?",
    answer: "Sign up for a free account to get your API key. You can make up to 500 screenshots per day on the free plan. Simply make a POST request to our API endpoint with the URL you want to capture.",
  },
  {
    question: "What formats does the Screenshot API support?",
    answer: "Screenshotly supports PNG (best for transparency), JPEG (adjustable quality), and PDF output formats. You can specify the format in your API request.",
  },
  {
    question: "Can I remove cookie banners and popups automatically?",
    answer: "Yes! Screenshotly uses AI-powered detection to automatically identify and remove cookie banners, newsletter popups, chat widgets, and other distracting elements from your screenshots.",
  },
  {
    question: "What device mockups are available?",
    answer: "We offer professional device frames including browser windows (light and dark themes), iPhone 14 Pro, and MacBook Pro mockups. These are perfect for marketing materials and app store screenshots.",
  },
];

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <GuestLayout>
      <JsonLd data={getHomepageSchemas()} />
      <JsonLd data={getFAQSchema(homepageFAQs)} />
      <JsonLd data={getReviewSchema()} />
      <HomeContent userId={userId} />
    </GuestLayout>
  );
}
