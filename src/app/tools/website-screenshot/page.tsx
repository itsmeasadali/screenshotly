import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Zap, Globe, ArrowRight } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/structured-data";
import ScreenshotToolClient from "./ScreenshotToolClient";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Free Website Screenshot Tool - Capture Any URL Online | Screenshotly",
    description: "Take screenshots of any website for free. No signup required. Capture desktop, tablet, and mobile views instantly with our free online screenshot tool.",
    keywords: [
        "free website screenshot",
        "online screenshot tool",
        "capture website screenshot",
        "website screenshot generator",
        "free screenshot tool",
        "take screenshot of website",
        "webpage screenshot",
        "url to image"
    ],
    alternates: {
        canonical: "/tools/website-screenshot",
    },
    openGraph: {
        title: "Free Website Screenshot Tool - Capture Any URL | Screenshotly",
        description: "Take screenshots of any website for free. No signup required. Desktop, tablet, and mobile views.",
        type: "website",
    },
};

const faqs = [
    {
        question: "Is this website screenshot tool really free?",
        answer: "Yes! You can capture screenshots of any public website for free without signing up. For high-volume or programmatic access, you can use our API with 100 free screenshots to start."
    },
    {
        question: "What devices can I simulate?",
        answer: "You can capture screenshots in desktop (1920×1080), tablet (768×1024), and mobile (375×812) views. Our API offers even more device options including custom viewports."
    },
    {
        question: "How do I get API access for automation?",
        answer: "Sign up for a free account to get your API key. You'll get 100 free screenshots to start, which is perfect for testing and evaluation. Paid plans offer higher monthly limits."
    },
    {
        question: "Can I download the screenshots?",
        answer: "Yes! After capturing a screenshot, you can download it as a PNG file. The API also supports JPEG and PDF formats."
    },
    {
        question: "Do you store the screenshots I capture?",
        answer: "No. Screenshots are generated on-demand and delivered directly to your browser. We don't store, analyze, or share your captured images."
    },
];

const features = [
    {
        icon: Globe,
        title: "Any Website",
        description: "Capture screenshots of any publicly accessible URL",
    },
    {
        icon: Zap,
        title: "Instant Results",
        description: "Screenshots generated in seconds, no waiting",
    },
    {
        icon: CheckCircle,
        title: "No Signup Required",
        description: "Start capturing immediately, completely free",
    },
];

export default function WebsiteScreenshotToolPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Website Screenshot", url: `${BASE_URL}/tools/website-screenshot` },
    ];

    // WebApplication schema for the tool
    const toolSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Free Website Screenshot Tool",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        url: `${BASE_URL}/tools/website-screenshot`,
        description: "Free online tool to capture screenshots of any website. No signup required.",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        creator: {
            "@type": "Organization",
            name: "Screenshotly",
            url: BASE_URL,
        },
    };

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />
            <JsonLd data={toolSchema} />

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Badge className="mb-4">Free Tool</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Free Website Screenshot Tool
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Capture high-quality screenshots of any website instantly.
                            No signup required - just paste a URL and click capture.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {features.map((feature) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={feature.title} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{feature.title}</div>
                                        <div className="text-sm text-muted-foreground">{feature.description}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tool Interface (Client Component) */}
                    <ScreenshotToolClient />

                    {/* FAQs */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-card border rounded-lg p-6">
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* More Tools */}
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold mb-4">Need More Power?</h2>
                        <p className="text-muted-foreground mb-6">
                            Our API offers advanced features like AI element removal, device mockups,
                            PDF generation, and batch processing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/playground"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Try Full Playground
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                            <Link
                                href="/blog/getting-started-with-screenshot-api"
                                className="inline-flex items-center justify-center px-6 py-3 border rounded-lg font-medium hover:bg-muted transition-colors"
                            >
                                View API Tutorial
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
