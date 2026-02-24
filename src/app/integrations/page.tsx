import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Workflow } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/structured-data";
import { integrations } from "@/data/integrations";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Integrations - Screenshot API for Every Language & Platform",
    description: "Integrate Screenshotly with JavaScript, Python, PHP, Go, and more. Connect with Zapier, Make, and n8n for no-code automation.",
    alternates: {
        canonical: "/integrations",
    },
    openGraph: {
        title: "Integrations - Screenshot API for Every Language & Platform",
        description: "Integrate Screenshotly with JavaScript, Python, PHP, Go, and more. Connect with Zapier, Make, and n8n for no-code automation.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Integrations - Screenshot API for Every Language & Platform",
        description: "Integrate Screenshotly with JavaScript, Python, PHP, Go, and more. Connect with Zapier, Make, and n8n for no-code automation.",
    },
};

export default function IntegrationsIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Integrations", url: `${BASE_URL}/integrations` },
    ];

    const faqs = [
        {
            question: "Which programming languages does Screenshotly support?",
            answer: "Screenshotly's REST API works with any language that can make HTTP requests. We provide detailed integration guides with copy-paste code examples for JavaScript, Node.js, Python, PHP, Ruby, Go, and cURL.",
        },
        {
            question: "Can I use Screenshotly without writing code?",
            answer: "Yes. Screenshotly integrates with no-code platforms including Zapier, Make (Integromat), and n8n. You can build automated screenshot workflows using drag-and-drop interfaces without writing a single line of code.",
        },
        {
            question: "How do I authenticate API requests?",
            answer: "All API requests are authenticated using a Bearer token in the Authorization header. Sign up for a free account to get your API key, then include it as 'Authorization: Bearer YOUR_API_KEY' in every request.",
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
                            Integrations
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Integrations
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Native code examples for every major language and no-code platform integrations
                        </p>
                    </div>

                    {/* Intro Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto mb-12 text-center">
                        <p className="text-muted-foreground leading-relaxed">
                            Screenshotly&apos;s REST API works with any HTTP client, but we know developers prefer copy-paste code examples in their language of choice.
                            That&apos;s why we&apos;ve created detailed integration guides for JavaScript, Python, PHP, Ruby, Go, and more—each with production-ready code you can use immediately.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Not a coder? No problem. Our no-code platform integrations let you connect Screenshotly with Zapier, Make, and n8n to build automated screenshot workflows without writing a single line of code.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">7+</div>
                            <div className="text-sm text-muted-foreground">Programming languages</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">3</div>
                            <div className="text-sm text-muted-foreground">No-code platforms</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">100%</div>
                            <div className="text-sm text-muted-foreground">Copy-paste ready code</div>
                        </div>
                    </div>

                    {/* Languages Section */}
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Code2 className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-semibold">Programming Languages</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {integrations.languages.map((lang) => (
                                <Link
                                    key={lang.slug}
                                    href={`/integrations/${lang.slug}`}
                                    className="group flex items-center gap-4 p-4 border rounded-xl hover:border-primary hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                                        {lang.slug === 'javascript' && '🟨'}
                                        {lang.slug === 'nodejs' && '💚'}
                                        {lang.slug === 'python' && '🐍'}
                                        {lang.slug === 'php' && '🐘'}
                                        {lang.slug === 'ruby' && '💎'}
                                        {lang.slug === 'go' && '🔵'}
                                        {lang.slug === 'curl' && '⌨️'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium group-hover:text-primary transition-colors">
                                            {lang.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground truncate">
                                            Code examples & integration
                                        </p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Platforms Section */}
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Workflow className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-semibold">No-Code Platforms</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {integrations.platforms.map((platform) => (
                                <Link
                                    key={platform.slug}
                                    href={`/integrations/${platform.slug}`}
                                    className="group p-6 border rounded-xl hover:border-primary hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl mb-4">
                                        {platform.slug === 'zapier' && '⚡'}
                                        {platform.slug === 'make' && '🔄'}
                                        {platform.slug === 'n8n' && '🔗'}
                                    </div>
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {platform.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {platform.description}
                                    </p>
                                    <div className="flex items-center text-primary text-sm font-medium">
                                        View guide
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mb-16 max-w-3xl mx-auto">
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
                    <div className="bg-muted/50 rounded-xl p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Don&apos;t see your language or platform?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Our REST API works with any HTTP client. Check out the playground to test it live.
                        </p>
                        <Link
                            href="/playground"
                            className="inline-flex items-center text-primary font-medium hover:underline"
                        >
                            Try the playground
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
