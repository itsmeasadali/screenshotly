import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/structured-data";
import { useCases } from "@/data/use-cases";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Use Cases - Screenshot API Applications",
    description: "Discover how developers use Screenshotly for documentation, testing, social media, e-commerce, and more. Real-world screenshot API applications.",
    alternates: {
        canonical: "/use-cases",
    },
    openGraph: {
        title: "Use Cases - Screenshot API Applications",
        description: "Discover how developers use Screenshotly for documentation, testing, social media, e-commerce, and more. Real-world screenshot API applications.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Use Cases - Screenshot API Applications",
        description: "Discover how developers use Screenshotly for documentation, testing, social media, e-commerce, and more. Real-world screenshot API applications.",
    },
};

export default function UseCasesIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Use Cases", url: `${BASE_URL}/use-cases` },
    ];

    const faqs = [
        {
            question: "What are the most common use cases for a screenshot API?",
            answer: "The most common use cases include automated documentation generation, visual regression testing, social media preview images, e-commerce product screenshots, competitive monitoring, and content archival. Screenshotly supports all of these with a single REST API.",
        },
        {
            question: "How quickly can I implement a screenshot API use case?",
            answer: "Most use cases can be implemented in under 5 minutes. Screenshotly's REST API requires a single POST request with your target URL and desired options. We provide copy-paste code examples for every major programming language.",
        },
        {
            question: "Can I use Screenshotly for automated visual testing?",
            answer: "Yes. Screenshotly is ideal for visual regression testing. Capture baseline screenshots, then compare against new builds to detect unintended UI changes. AI-powered element removal ensures consistent results by stripping out dynamic elements like ads and cookie banners.",
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
                            Use Cases
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Use Cases
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            See how developers and teams use Screenshotly to automate their screenshot workflows
                        </p>
                    </div>

                    {/* Intro Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto mb-12 text-center">
                        <p className="text-muted-foreground leading-relaxed">
                            From automated documentation to competitive intelligence, a screenshot API unlocks possibilities that manual capture simply can&apos;t match.
                            Screenshotly powers thousands of workflows across industries—helping teams save time, maintain consistency, and scale their visual content operations.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Explore the use cases below to find step-by-step implementation guides, code examples, and real-world metrics.
                            Each page shows you exactly how to integrate screenshots into your specific workflow, whether you&apos;re a solo developer or an enterprise team.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">{useCases.length}+</div>
                            <div className="text-sm text-muted-foreground">Detailed use case guides</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">100</div>
                            <div className="text-sm text-muted-foreground">Free screenshots to start</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">&lt; 5 min</div>
                            <div className="text-sm text-muted-foreground">To implement any use case</div>
                        </div>
                    </div>

                    {/* Use Cases Grid */}
                    <h2 className="text-2xl font-bold mb-6">All Use Cases</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((useCase) => (
                            <Link
                                key={useCase.slug}
                                href={`/use-cases/${useCase.slug}`}
                                className="group block p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all"
                            >
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {useCase.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {useCase.description}
                                </p>
                                <div className="flex items-center text-primary text-sm font-medium">
                                    Learn more
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

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <p className="text-muted-foreground mb-4">
                            Don&apos;t see your use case? Our API is flexible enough for any screenshot need.
                        </p>
                        <Link
                            href="/playground"
                            className="text-primary font-medium hover:underline"
                        >
                            Try it in the playground →
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
