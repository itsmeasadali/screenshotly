import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code, Zap, Shield, FileText, Layers } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getCollectionPageSchema } from "@/lib/seo/structured-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Screenshot API Topics & Guides",
    description: "Explore comprehensive guides on screenshot automation, visual testing, performance optimization, and more. Master every aspect of screenshot APIs.",
    alternates: {
        canonical: "/topics",
    },
    openGraph: {
        title: "Screenshot API Topics & Guides",
        description: "Explore comprehensive guides on screenshot automation, visual testing, performance optimization, and more. Master every aspect of screenshot APIs.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Screenshot API Topics & Guides",
        description: "Explore comprehensive guides on screenshot automation, visual testing, performance optimization, and more. Master every aspect of screenshot APIs.",
    },
};

const topicClusters = [
    {
        slug: "automation",
        title: "Automation & Integration",
        description: "Screenshot automation replaces manual screen captures with API calls that run on schedule, on deploy, or on demand. The guides below cover everything from your first API request to building production pipelines that capture thousands of pages per hour. Start with the Getting Started tutorial if you're new, then move to batch processing and CI/CD integration as your workload grows.",
        icon: Zap,
        color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        articles: [
            { title: "Getting Started with Screenshot API", slug: "/blog/getting-started-with-screenshot-api" },
            { title: "Batch Screenshot Processing", slug: "/blog/batch-screenshot-processing" },
            { title: "Visual Regression Testing", slug: "/blog/visual-regression-testing-guide" },
        ],
        useCases: [
            { title: "Documentation Screenshots", slug: "/use-cases/documentation-screenshots" },
            { title: "Automated Testing", slug: "/use-cases/automated-testing" },
        ],
        integrations: [
            { title: "JavaScript Integration", slug: "/integrations/javascript" },
            { title: "Python Integration", slug: "/integrations/python" },
            { title: "Node.js Integration", slug: "/integrations/nodejs" },
        ],
    },
    {
        slug: "performance",
        title: "Performance & Optimization",
        description: "Capturing screenshots at scale requires careful attention to caching, viewport configuration, and request parallelism. These guides cover how to reduce average capture time below 2 seconds, implement smart caching strategies to avoid redundant captures, and optimize image output size for web delivery. If you're processing more than a few hundred screenshots per day, start here.",
        icon: Layers,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        articles: [
            { title: "Optimize Screenshot Performance", slug: "/blog/optimize-screenshot-performance" },
            { title: "Batch Screenshot Processing", slug: "/blog/batch-screenshot-processing" },
            { title: "Mobile Screenshot Optimization", slug: "/blog/mobile-responsive-screenshots" },
        ],
        useCases: [
            { title: "E-commerce Product Images", slug: "/use-cases/e-commerce-product-images" },
            { title: "Social Media Previews", slug: "/use-cases/social-media-previews" },
        ],
    },
    {
        slug: "testing",
        title: "Visual Testing & QA",
        description: "Visual regression testing catches UI bugs that unit tests miss — broken layouts, overlapping elements, and styling regressions. These guides walk you through setting up baseline captures, running pixel-diff comparisons on every pull request, and integrating screenshot assertions into your existing test suite. Screenshotly's AI element removal ensures your baselines stay consistent by stripping dynamic ads, banners, and popups.",
        icon: Code,
        color: "bg-green-500/10 text-green-600 dark:text-green-400",
        articles: [
            { title: "Visual Regression Testing Guide", slug: "/blog/visual-regression-testing-guide" },
            { title: "Mobile Responsive Screenshots", slug: "/blog/mobile-responsive-screenshots" },
        ],
        useCases: [
            { title: "Automated Testing", slug: "/use-cases/automated-testing" },
            { title: "Bug Tracking", slug: "/use-cases/bug-tracking" },
        ],
        comparisons: [
            { title: "Screenshotly vs Puppeteer", slug: "/compare/puppeteer" },
            { title: "Screenshotly vs Playwright", slug: "/compare/playwright" },
        ],
    },
    {
        slug: "content",
        title: "Content & Marketing",
        description: "Professional screenshots drive engagement in marketing materials, social media posts, and product documentation. These guides cover using device mockups to present your product in iPhone, MacBook, and browser frames, generating dynamic OG images for social sharing, and using AI cleanup to remove distracting page elements. Learn how teams use Screenshotly to produce marketing assets at scale without a design team.",
        icon: FileText,
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        articles: [
            { title: "Device Mockups for Marketing", slug: "/blog/device-mockups-for-marketing" },
            { title: "AI Element Removal Guide", slug: "/blog/ai-element-removal-guide" },
            { title: "PDF Generation Guide", slug: "/blog/pdf-generation-guide" },
        ],
        useCases: [
            { title: "Social Media Previews", slug: "/use-cases/social-media-previews" },
            { title: "Documentation Screenshots", slug: "/use-cases/documentation-screenshots" },
            { title: "Email Marketing", slug: "/use-cases/email-marketing" },
        ],
    },
    {
        slug: "security",
        title: "Security & Best Practices",
        description: "API key management, HTTPS-only communication, and proper error handling are critical for production screenshot workflows. These guides cover how to rotate API keys safely, implement rate limiting on your end to avoid overage charges, handle authentication for capturing protected pages, and follow security best practices that keep your integration safe and reliable.",
        icon: Shield,
        color: "bg-red-500/10 text-red-600 dark:text-red-400",
        articles: [
            { title: "Screenshot API Security Guide", slug: "/blog/screenshot-api-security-guide" },
            { title: "API Pricing Comparison", slug: "/blog/screenshot-api-pricing-comparison" },
        ],
    },
];

export default function TopicsPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Topics", url: `${BASE_URL}/topics` },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getCollectionPageSchema({
                name: "Screenshot API Topics & Guides",
                description: "Comprehensive guides on screenshot automation, visual testing, and API integration",
                url: `${BASE_URL}/topics`,
            })} />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge className="mb-4">Learning Center</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Screenshot API Topics & Guides
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                            Master every aspect of screenshot automation. From getting started to advanced optimization,
                            find comprehensive guides organized by topic.
                        </p>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            Each topic below groups related tutorials, use cases, and integration guides so you can
                            learn end-to-end. Whether you&apos;re building automated visual tests, generating marketing assets,
                            or integrating screenshots into your SaaS product, start with the topic that matches your goal.
                        </p>
                    </div>

                    {/* Topic Clusters */}
                    <div className="space-y-16">
                        {topicClusters.map((cluster) => {
                            const IconComponent = cluster.icon;
                            return (
                                <div key={cluster.slug} id={cluster.slug} className="scroll-mt-20">
                                    <div className="flex items-start gap-4 mb-8">
                                        <div className={`p-3 rounded-lg ${cluster.color}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">{cluster.title}</h2>
                                            <p className="text-muted-foreground max-w-2xl">
                                                {cluster.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Articles */}
                                        {cluster.articles && (
                                            <div className="bg-muted/30 rounded-lg p-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                                                    <h3 className="font-semibold">Guides & Tutorials</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {cluster.articles.map((article) => (
                                                        <li key={article.slug}>
                                                            <Link
                                                                href={article.slug}
                                                                className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                                                            >
                                                                <ArrowRight className="w-3 h-3" />
                                                                {article.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Use Cases */}
                                        {cluster.useCases && (
                                            <div className="bg-muted/30 rounded-lg p-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Zap className="w-4 h-4 text-muted-foreground" />
                                                    <h3 className="font-semibold">Use Cases</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {cluster.useCases.map((useCase) => (
                                                        <li key={useCase.slug}>
                                                            <Link
                                                                href={useCase.slug}
                                                                className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                                                            >
                                                                <ArrowRight className="w-3 h-3" />
                                                                {useCase.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Integrations */}
                                        {cluster.integrations && (
                                            <div className="bg-muted/30 rounded-lg p-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Code className="w-4 h-4 text-muted-foreground" />
                                                    <h3 className="font-semibold">Integrations</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {cluster.integrations.map((integration) => (
                                                        <li key={integration.slug}>
                                                            <Link
                                                                href={integration.slug}
                                                                className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                                                            >
                                                                <ArrowRight className="w-3 h-3" />
                                                                {integration.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Comparisons */}
                                        {cluster.comparisons && (
                                            <div className="bg-muted/30 rounded-lg p-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Layers className="w-4 h-4 text-muted-foreground" />
                                                    <h3 className="font-semibold">Comparisons</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {cluster.comparisons.map((comparison) => (
                                                        <li key={comparison.slug}>
                                                            <Link
                                                                href={comparison.slug}
                                                                className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                                                            >
                                                                <ArrowRight className="w-3 h-3" />
                                                                {comparison.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center bg-primary/10 rounded-2xl p-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Start Capturing?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Get 100 free screenshots to start. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/playground">
                                    Try Playground
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
