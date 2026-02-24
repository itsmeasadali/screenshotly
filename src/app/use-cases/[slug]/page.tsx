import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Code } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema, getHowToSchema } from "@/lib/seo/structured-data";
import { useCases } from "@/data/use-cases";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

const relatedBlogPosts: Record<string, { title: string; slug: string }> = {
    'documentation-screenshots': { title: "Documentation Screenshot Automation Guide", slug: "documentation-screenshot-automation-guide" },
    'social-media-previews': { title: "Dynamic OG Image Generation Guide", slug: "dynamic-og-image-generation-guide" },
    'e-commerce-product-images': { title: "E-Commerce Screenshot Testing Guide", slug: "ecommerce-screenshot-testing-guide" },
    'automated-testing': { title: "Visual Regression Testing Guide", slug: "visual-regression-testing-guide" },
    'website-thumbnails': { title: "Website Thumbnail Generation Guide", slug: "website-thumbnail-generation-guide" },
    'pdf-generation': { title: "PDF Generation Complete Guide", slug: "pdf-generation-complete-guide" },
    'web-archiving': { title: "Website Archival & Compliance Guide", slug: "website-archival-compliance-guide" },
    'competitive-analysis': { title: "Website Monitoring Screenshots Guide", slug: "website-monitoring-screenshots-guide" },
    'saas-reporting': { title: "SaaS Screenshot API Integration Guide", slug: "saas-screenshot-api-integration-guide" },
    'link-preview-services': { title: "Link Preview Generation Guide", slug: "link-preview-generation-guide" },
    'competitor-monitoring': { title: "Website Monitoring Screenshots Guide", slug: "website-monitoring-screenshots-guide" },
    'brand-monitoring': { title: "Website Monitoring Screenshots Guide", slug: "website-monitoring-screenshots-guide" },
    'invoice-pdf-generation': { title: "Invoice & Report Generation Guide", slug: "invoice-report-generation-guide" },
    'report-generation': { title: "Invoice & Report Generation Guide", slug: "invoice-report-generation-guide" },
    'bug-tracking': { title: "Visual Regression Testing Guide", slug: "visual-regression-testing-guide" },
    'api-documentation-images': { title: "Documentation Screenshot Automation Guide", slug: "documentation-screenshot-automation-guide" },
    'design-system-docs': { title: "Documentation Screenshot Automation Guide", slug: "documentation-screenshot-automation-guide" },
    'website-migration': { title: "Website Archival & Compliance Guide", slug: "website-archival-compliance-guide" },
};

const useCaseCategories: Record<string, string[]> = {
    documentation: ['documentation-screenshots', 'api-documentation-images', 'design-system-docs', 'customer-support-documentation'],
    media: ['social-media-previews', 'social-proof-widgets', 'email-marketing', 'email-campaign-previews'],
    commerce: ['e-commerce-product-images', 'real-estate-listings', 'travel-listings', 'marketplace-listings', 'directory-submissions'],
    testing: ['automated-testing', 'bug-tracking', 'accessibility-audit', 'website-migration'],
    generation: ['pdf-generation', 'invoice-pdf-generation', 'report-generation', 'certificate-generation', 'website-thumbnails', 'link-preview-services'],
    monitoring: ['competitive-analysis', 'competitor-monitoring', 'brand-monitoring', 'price-tracking', 'seo-audit-screenshots', 'ad-verification'],
    archiving: ['web-archiving', 'website-archival', 'news-archival', 'legal-compliance'],
    saas: ['saas-reporting', 'dashboard-snapshots', 'ai-vision-analysis', 'portfolio-showcase'],
    industry: ['healthcare-documentation', 'education-platforms', 'font-detection'],
};

function getRelatedUseCases(currentSlug: string) {
    const category = Object.entries(useCaseCategories).find(
        ([, slugs]) => slugs.includes(currentSlug)
    );
    const siblings = category
        ? category[1].filter((s) => s !== currentSlug)
        : [];
    const related = useCases.filter((uc) => siblings.includes(uc.slug));
    if (related.length >= 3) return related.slice(0, 3);
    const remaining = useCases.filter(
        (uc) => uc.slug !== currentSlug && !siblings.includes(uc.slug)
    );
    return [...related, ...remaining].slice(0, 3);
}

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return useCases.map((useCase) => ({
        slug: useCase.slug,
    }));
}

const NOINDEX_SLUGS = new Set([
    'font-detection',
    'certificate-generation',
    'travel-listings',
    'healthcare-documentation',
    'education-platforms',
    'price-tracking',
    'email-campaign-previews',
    'marketplace-listings',
    'dashboard-snapshots',
    'news-archival',
    'website-archival',
    'directory-submissions',
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const useCase = useCases.find((uc) => uc.slug === slug);

    if (!useCase) {
        return {
            title: "Use Case Not Found",
        };
    }

    const shouldNoindex = NOINDEX_SLUGS.has(slug);

    const metaDesc = useCase.metaDescription ?? (
        useCase.description.length > 155
            ? useCase.description.slice(0, 152) + '...'
            : useCase.description
    );

    return {
        title: `${useCase.title} - Screenshot API Use Case`,
        description: metaDesc,
        alternates: {
            canonical: `/use-cases/${slug}`,
        },
        openGraph: {
            title: useCase.title,
            description: metaDesc,
            url: `${BASE_URL}/use-cases/${slug}`,
            type: "article",
        },
        ...(shouldNoindex && {
            robots: { index: false, follow: true },
        }),
    };
}

export default async function UseCasePage({ params }: Props) {
    const { slug } = await params;
    const useCase = useCases.find((uc) => uc.slug === slug);

    if (!useCase) {
        notFound();
    }

    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Use Cases", url: `${BASE_URL}/use-cases` },
        { name: useCase.title, url: `${BASE_URL}/use-cases/${slug}` },
    ];

    // Use specific FAQs from use case data, or fall back to generic ones
    const faqs = 'faqs' in useCase && useCase.faqs ? useCase.faqs : [
        {
            question: `How can I use Screenshotly for ${useCase.shortTitle.toLowerCase()}?`,
            answer: useCase.description,
        },
        {
            question: "What formats are supported?",
            answer: "Screenshotly supports PNG (best for transparency), JPEG (adjustable quality), and PDF output formats.",
        },
        {
            question: "Can I remove cookie banners automatically?",
            answer: "Yes! Our AI-powered detection automatically identifies and removes cookie banners, popups, and other distracting elements.",
        },
    ];

    const howToSteps = [
        { name: "Get your API key", text: "Sign up for a free account and get your API key from the dashboard." },
        { name: "Configure your request", text: "Set up the URL, device type, and any AI removal options you need." },
        { name: "Make the API call", text: "Send a POST request to our API endpoint with your configuration." },
        { name: "Use your screenshot", text: "Download or process the returned image in your application." },
    ];

    const relatedUseCases = getRelatedUseCases(slug);

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />
            <JsonLd data={getHowToSchema({
                name: `How to capture ${useCase.shortTitle.toLowerCase()} with Screenshotly`,
                description: useCase.description,
                totalTime: "PT5M",
                steps: howToSteps,
            })} />

            <article className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-foreground transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/use-cases" className="hover:text-foreground transition-colors">
                                    Use Cases
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-foreground">{useCase.shortTitle}</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <header className="mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Use Case
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">{useCase.title}</h1>
                        <p className="text-xl text-muted-foreground">
                            {useCase.description}
                        </p>
                    </header>

                    {/* Long Description */}
                    {'longDescription' in useCase && useCase.longDescription && (
                        <section className="mb-12 prose prose-gray dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                            {useCase.longDescription.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    )}

                    {/* Benefits */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Key Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {useCase.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Metrics */}
                    {'metrics' in useCase && useCase.metrics && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">Results You Can Expect</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {useCase.metrics.map((metric, index) => (
                                    <div key={index} className="text-center p-6 bg-primary/5 rounded-xl border border-primary/10">
                                        <div className="text-3xl font-bold text-primary mb-2">{metric.stat}</div>
                                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* How It Works */}
                    {'steps' in useCase && useCase.steps && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
                            <div className="space-y-4">
                                {useCase.steps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <p className="text-foreground">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Code Example */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">
                            <Code className="inline w-6 h-6 mr-2" />
                            Code Example
                        </h2>
                        <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                            <pre className="text-sm">
                                <code>{useCase.codeExample}</code>
                            </pre>
                        </div>
                    </section>

                    {/* FAQs */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <h3 className="font-medium mb-2">{faq.question}</h3>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Deep Dive Blog Link */}
                    {relatedBlogPosts[slug] && (
                        <section className="mb-12 p-5 bg-muted/50 rounded-xl border">
                            <p className="text-sm text-muted-foreground mb-2">Want a step-by-step walkthrough?</p>
                            <Link
                                href={`/blog/${relatedBlogPosts[slug].slug}`}
                                className="text-primary hover:underline font-medium"
                            >
                                Read: {relatedBlogPosts[slug].title} →
                            </Link>
                        </section>
                    )}

                    {/* CTA */}
                    <section className="bg-primary/10 rounded-xl p-8 text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">
                            Ready to automate {useCase.shortTitle.toLowerCase()}?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Get started with 100 free screenshots. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/playground">
                                    Try Playground
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Related Use Cases */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Related Use Cases</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedUseCases.map((uc) => (
                                <Link
                                    key={uc.slug}
                                    href={`/use-cases/${uc.slug}`}
                                    className="block p-4 border rounded-lg hover:border-primary transition-colors"
                                >
                                    <h3 className="font-medium mb-2">{uc.shortTitle}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {uc.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t">
                        <Link
                            href="/use-cases"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            View all use cases
                        </Link>
                    </div>
                </div>
            </article>
        </GuestLayout>
    );
}
