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

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return useCases.map((useCase) => ({
        slug: useCase.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const useCase = useCases.find((uc) => uc.slug === slug);

    if (!useCase) {
        return {
            title: "Use Case Not Found",
        };
    }

    return {
        title: `${useCase.title} - Screenshot API Use Case`,
        description: useCase.description,
        keywords: useCase.keywords,
        alternates: {
            canonical: `/use-cases/${slug}`,
        },
        openGraph: {
            title: `${useCase.title} | Screenshotly`,
            description: useCase.description,
            url: `${BASE_URL}/use-cases/${slug}`,
            type: "article",
        },
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

    const faqs = [
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

    // Get related use cases (excluding current)
    const relatedUseCases = useCases
        .filter((uc) => uc.slug !== slug)
        .slice(0, 3);

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

                    {/* CTA */}
                    <section className="bg-primary/10 rounded-xl p-8 text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">
                            Ready to automate {useCase.shortTitle.toLowerCase()}?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Get started with 500 free screenshots per day. No credit card required.
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
