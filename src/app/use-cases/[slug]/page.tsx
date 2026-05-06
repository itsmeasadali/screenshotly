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
import { useCaseEnrichment } from "@/data/use-case-enrichment";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

const relatedBlogPosts: Record<string, { title: string; slug: string }> = {
    'documentation-screenshots': { title: "Documentation Screenshot Automation Guide", slug: "documentation-screenshot-automation-guide" },
    'social-media-previews': { title: "Dynamic OG Image Generation Guide", slug: "dynamic-og-image-generation-guide" },
    'e-commerce-product-images': { title: "E-Commerce Screenshot Testing Guide", slug: "ecommerce-screenshot-testing-guide" },
    'automated-testing': { title: "Visual Regression Testing Guide", slug: "visual-regression-testing-guide" },
    'website-thumbnails': { title: "Website Thumbnail Generation Guide", slug: "website-thumbnail-generation-guide" },
    'pdf-generation': { title: "Invoice & Financial PDF Generation", slug: "invoice-pdf-generation-guide" },
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

    // Per-slug FAQs only; no generic fallback (avoids duplicate-chunk emission across indexed pages)
    const faqs = 'faqs' in useCase && useCase.faqs ? useCase.faqs : [];

    // HowTo schema is built from the use-case's own `steps` array so each page emits unique steps
    const howToSteps = ('steps' in useCase && useCase.steps)
        ? useCase.steps.map((step, index) => ({
            name: `Step ${index + 1}`,
            text: step,
        }))
        : [];

    // Enrichment layer: per-slug AI summary, additional paragraphs, Not For You block,
    // operational data table, and Original Research section.
    const enrichment = useCaseEnrichment[slug];
    const aiSummary = enrichment?.aiSummary ?? null;
    const notForYou = enrichment?.notForYou ?? [];
    const additionalParagraphs = enrichment?.additionalParagraphs ?? [];
    const dataTable = enrichment?.dataTable ?? null;
    const originalResearch = enrichment?.originalResearch ?? null;
    const hasNoteColumn = !!dataTable?.rows.some((r) => r.note);

    const relatedUseCases = getRelatedUseCases(slug);

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            {faqs.length > 0 && <JsonLd data={getFAQSchema(faqs)} />}
            {howToSteps.length > 0 && (
                <JsonLd data={getHowToSchema({
                    name: `How to capture ${useCase.shortTitle.toLowerCase()} with Screenshotly`,
                    description: useCase.description,
                    totalTime: "PT5M",
                    steps: howToSteps,
                })} />
            )}

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
                    <header className="mb-8">
                        <Badge variant="secondary" className="mb-4">
                            Use Case
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">{useCase.title}</h1>
                        <p className="text-xl text-muted-foreground">
                            {useCase.description}
                        </p>
                    </header>

                    {/* AI Summary Nugget — fact-dense top-of-page block for LLM extraction */}
                    {aiSummary && (
                        <div
                            className="mb-12 rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-sm text-foreground"
                            aria-label="Quick summary"
                        >
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary">
                                Quick summary
                            </span>
                            {aiSummary}
                        </div>
                    )}

                    {/* Long Description (base + enrichment paragraphs for indexed slugs) */}
                    {'longDescription' in useCase && useCase.longDescription && (
                        <section className="mb-12 prose prose-gray dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                            {[
                                ...useCase.longDescription.split('\n\n'),
                                ...additionalParagraphs,
                            ].map((paragraph, index) => (
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

                    {/* Operational data table (enrichment) */}
                    {dataTable && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">{dataTable.title}</h2>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="text-left p-4 font-medium">
                                                {dataTable.labelHeader ?? 'Metric'}
                                            </th>
                                            <th className="text-left p-4 font-medium text-primary">
                                                {dataTable.valueHeader ?? 'Value'}
                                            </th>
                                            {hasNoteColumn && (
                                                <th className="text-left p-4 font-medium">
                                                    {dataTable.noteHeader ?? 'Context'}
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTable.rows.map((row, i) => (
                                            <tr key={i} className="border-t">
                                                <td className="p-4 font-medium">{row.label}</td>
                                                <td className="p-4">{row.value}</td>
                                                {hasNoteColumn && (
                                                    <td className="p-4 text-muted-foreground">{row.note ?? ''}</td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Original Research / Data Experiment block (§14 rubric) */}
                    {originalResearch && (
                        <section className="mb-12 rounded-xl bg-muted/30 p-6">
                            <h2 className="text-2xl font-semibold mb-2">{originalResearch.heading}</h2>
                            <p className="text-sm text-muted-foreground mb-4 italic">
                                Methodology: {originalResearch.methodology}
                            </p>
                            <ol className="space-y-3 list-decimal list-inside">
                                {originalResearch.findings.map((finding, i) => (
                                    <li key={i} className="text-foreground leading-relaxed">{finding}</li>
                                ))}
                            </ol>
                        </section>
                    )}

                    {/* FAQs */}
                    {faqs.length > 0 && (
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
                    )}

                    {/* Not For You — honesty block (E-E-A-T trust signal) */}
                    {notForYou.length > 0 && (
                        <section className="mb-12 rounded-xl border border-dashed p-6">
                            <h2 className="text-2xl font-semibold mb-4">When this isn&apos;t the right fit</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Screenshotly is not ideal for every workflow. Consider a different approach if any of the following apply:
                            </p>
                            <ul className="space-y-2">
                                {notForYou.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

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
