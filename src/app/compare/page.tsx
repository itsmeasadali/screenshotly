import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/structured-data";
import { comparisons } from "@/data/comparisons";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Compare Screenshot APIs - Alternatives & Feature Comparison (2026)",
    description: "Compare Screenshotly with other screenshot APIs and tools. See detailed feature comparisons and why developers choose Screenshotly.",
    alternates: {
        canonical: "/compare",
    },
    openGraph: {
        title: "Compare Screenshot APIs - Alternatives & Feature Comparison (2026)",
        description: "Compare Screenshotly with other screenshot APIs and tools. See detailed feature comparisons and why developers choose Screenshotly.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Compare Screenshot APIs - Alternatives & Pricing (2026)",
        description: "Compare Screenshotly with other screenshot APIs and tools. See feature comparisons, pricing, and why developers choose Screenshotly.",
    },
};

export default function CompareIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Comparisons", url: `${BASE_URL}/compare` },
    ];

    const faqs = [
        {
            question: "What is the best screenshot API in 2026?",
            answer: "The best screenshot API depends on your needs. Screenshotly stands out for its AI-powered element removal, built-in device mockups, and competitive pricing starting at $14/mo. It's ideal for developers who need clean, professional screenshots without managing headless browser infrastructure.",
        },
        {
            question: "How does Screenshotly compare to self-hosted Puppeteer?",
            answer: "Screenshotly eliminates the DevOps overhead of self-hosted Puppeteer. You don't need to manage servers, browser updates, or scaling infrastructure. Screenshotly also adds AI element removal and device mockups that Puppeteer doesn't offer out of the box.",
        },
        {
            question: "Can I switch to Screenshotly from another screenshot API?",
            answer: "Yes. Migration typically takes under an hour. Screenshotly uses a standard REST API with similar parameters to most screenshot services. Our comparison guides include migration steps for each competitor.",
        },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />

            <div className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Comparisons
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Comparisons
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            See how Screenshotly compares to other screenshot tools and why developers are making the switch
                        </p>
                    </div>

                    {/* Intro Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto mb-12 text-center">
                        <p className="text-muted-foreground leading-relaxed">
                            Choosing the right screenshot API matters. The wrong choice means battling with unreliable captures, missing features, or unexpected costs.
                            We&apos;ve created detailed, honest comparisons between Screenshotly and every major alternative—from self-hosted solutions like Puppeteer to commercial APIs like ScreenshotAPI and Urlbox.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Each comparison breaks down features, pricing, ease of use, and real-world performance.
                            Whether you&apos;re evaluating options for the first time or considering a switch, these guides help you make an informed decision.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">8</div>
                            <div className="text-sm text-muted-foreground">Competitor comparisons</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">50%+</div>
                            <div className="text-sm text-muted-foreground">Typical cost savings</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">&lt; 1 hr</div>
                            <div className="text-sm text-muted-foreground">Average migration time</div>
                        </div>
                    </div>

                    {/* Comparisons Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {comparisons.map((comparison) => (
                            <Link
                                key={comparison.slug}
                                href={`/compare/${comparison.slug}`}
                                className="group block p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="font-bold text-primary">Screenshotly</span>
                                    <span className="text-muted-foreground">vs</span>
                                    <span className="font-bold">{comparison.name}</span>
                                </div>
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {comparison.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {comparison.keywords.slice(0, 2).map((keyword) => (
                                        <Badge key={keyword} variant="outline" className="text-xs">
                                            {keyword}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center text-primary text-sm font-medium">
                                    View comparison
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-16 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border rounded-xl p-6">
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Why Screenshotly */}
                    <div className="mt-16 p-8 bg-muted/50 rounded-xl text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Why developers choose Screenshotly
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
                            <div>
                                <h3 className="font-semibold mb-2">🤖 AI-Powered Cleanup</h3>
                                <p className="text-sm text-muted-foreground">
                                    Automatic removal of cookie banners, popups, and distracting elements
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">📱 Device Mockups</h3>
                                <p className="text-sm text-muted-foreground">
                                    Beautiful iPhone, MacBook, and browser frames included at no extra cost
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">💰 Free Tier Included</h3>
                                <p className="text-sm text-muted-foreground">
                                    100 free screenshots to start, no credit card required
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
