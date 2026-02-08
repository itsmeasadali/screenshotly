import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X, AlertCircle } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/structured-data";
import { comparisons } from "@/data/comparisons";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return comparisons.map((comparison) => ({
        slug: comparison.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const comparison = comparisons.find((c) => c.slug === slug);

    if (!comparison) {
        return {
            title: "Comparison Not Found",
        };
    }

    return {
        title: `Screenshotly vs ${comparison.name} - Screenshot API Comparison`,
        description: comparison.description,
        keywords: comparison.keywords,
        alternates: {
            canonical: `/compare/${slug}`,
        },
        openGraph: {
            title: `Screenshotly vs ${comparison.name}`,
            description: comparison.description,
            url: `${BASE_URL}/compare/${slug}`,
            type: "article",
        },
    };
}

export default async function ComparisonPage({ params }: Props) {
    const { slug } = await params;
    const comparison = comparisons.find((c) => c.slug === slug);

    if (!comparison) {
        notFound();
    }

    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Comparisons", url: `${BASE_URL}/compare` },
        { name: `vs ${comparison.name}`, url: `${BASE_URL}/compare/${slug}` },
    ];

    // Use specific FAQs from comparison data, or fall back to generic ones
    const faqs = 'faqs' in comparison && comparison.faqs ? comparison.faqs : [
        {
            question: `What's the difference between Screenshotly and ${comparison.name}?`,
            answer: `Screenshotly offers AI-powered element removal, built-in device mockups, and a simpler developer experience. ${comparison.name} ${comparison.competitor.cons[0].toLowerCase()}.`,
        },
        {
            question: `Is Screenshotly a good alternative to ${comparison.name}?`,
            answer: `Yes! Many developers switch to Screenshotly for its AI features that automatically remove cookie banners and popups, professional device mockups, and competitive pricing.`,
        },
        {
            question: "How do I migrate from " + comparison.name + "?",
            answer: "Screenshotly's API is designed to be simple to integrate. Sign up, get your API key, and update your API calls. Most migrations take less than an hour.",
        },
    ];

    // Get other comparisons (excluding current)
    const otherComparisons = comparisons
        .filter((c) => c.slug !== slug)
        .slice(0, 3);

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />

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
                                <Link href="/compare" className="hover:text-foreground transition-colors">
                                    Comparisons
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-foreground">vs {comparison.name}</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <Badge variant="secondary" className="mb-4">
                            Comparison
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshotly vs {comparison.name}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {comparison.description}
                        </p>
                    </header>

                    {/* Quick Summary */}
                    <section className="mb-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            Quick Summary
                        </h2>
                        <p className="text-muted-foreground">
                            While {comparison.name} is a {comparison.competitor.pros[0].toLowerCase()},
                            Screenshotly stands out with its {comparison.screenshotly.advantages[0].toLowerCase()} and {comparison.screenshotly.advantages[1].toLowerCase()}.
                            If you need a modern, feature-rich screenshot API, Screenshotly is the better choice.
                        </p>
                    </section>

                    {/* Comparison Table */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Feature Comparison</h2>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="text-left p-4 font-medium">Feature</th>
                                        <th className="text-center p-4 font-medium text-primary">Screenshotly</th>
                                        <th className="text-center p-4 font-medium">{comparison.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.comparisonTable.map((row, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="p-4">{row.feature}</td>
                                            <td className="p-4 text-center">{row.screenshotly}</td>
                                            <td className="p-4 text-center">{row.competitor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Why Choose Screenshotly */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Why Choose Screenshotly?</h2>
                        <div className="space-y-3">
                            {comparison.screenshotly.advantages.map((advantage, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{advantage}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Competitor Limitations */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">{comparison.name} Limitations</h2>
                        <div className="space-y-3">
                            {comparison.competitor.cons.map((con, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span>{con}</span>
                                </div>
                            ))}
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
                            Ready to switch to Screenshotly?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Get started with 100 free screenshots. Migrate in minutes.
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

                    {/* Other Comparisons */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Other Comparisons</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {otherComparisons.map((c) => (
                                <Link
                                    key={c.slug}
                                    href={`/compare/${c.slug}`}
                                    className="block p-4 border rounded-lg hover:border-primary transition-colors"
                                >
                                    <h3 className="font-medium mb-2">vs {c.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {c.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t">
                        <Link
                            href="/compare"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            View all comparisons
                        </Link>
                    </div>
                </div>
            </article>
        </GuestLayout>
    );
}
