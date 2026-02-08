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
    title: "Screenshot API Topics & Guides | Screenshotly",
    description: "Explore comprehensive guides on screenshot automation, visual testing, performance optimization, and more. Master every aspect of screenshot APIs.",
    keywords: [
        "screenshot API guides",
        "screenshot automation tutorials",
        "visual testing guides",
        "screenshot API documentation"
    ],
    alternates: {
        canonical: "/topics",
    },
};

const topicClusters = [
    {
        slug: "automation",
        title: "Automation & Integration",
        description: "Learn how to automate screenshot capture and integrate with your existing workflows, CI/CD pipelines, and development tools.",
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
        description: "Master techniques to speed up screenshot capture, reduce costs, and handle high-volume workloads efficiently.",
        icon: Layers,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        articles: [
            { title: "Optimize Screenshot Performance", slug: "/blog/optimize-screenshot-performance" },
            { title: "Batch Screenshot Processing", slug: "/blog/batch-screenshot-processing" },
            { title: "Mobile Screenshot Optimization", slug: "/blog/mobile-responsive-screenshots" },
        ],
        useCases: [
            { title: "E-commerce Screenshots", slug: "/use-cases/ecommerce-screenshots" },
            { title: "Social Media Previews", slug: "/use-cases/social-media-previews" },
        ],
    },
    {
        slug: "testing",
        title: "Visual Testing & QA",
        description: "Implement visual regression testing, catch UI bugs before production, and ensure consistent user experiences across devices.",
        icon: Code,
        color: "bg-green-500/10 text-green-600 dark:text-green-400",
        articles: [
            { title: "Visual Regression Testing Guide", slug: "/blog/visual-regression-testing-guide" },
            { title: "Mobile Responsive Screenshots", slug: "/blog/mobile-responsive-screenshots" },
        ],
        useCases: [
            { title: "Automated Testing", slug: "/use-cases/automated-testing" },
            { title: "Visual Regression Testing", slug: "/use-cases/visual-regression-testing" },
        ],
        comparisons: [
            { title: "Screenshotly vs Puppeteer", slug: "/compare/puppeteer" },
            { title: "Screenshotly vs Playwright", slug: "/compare/playwright" },
        ],
    },
    {
        slug: "content",
        title: "Content & Marketing",
        description: "Create stunning visuals for marketing, social media, documentation, and product showcases with device mockups and clean screenshots.",
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
        description: "Protect your API keys, secure your screenshot workflows, and implement production-ready integrations.",
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
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Master every aspect of screenshot automation. From getting started to advanced optimization,
                            find comprehensive guides organized by topic.
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
