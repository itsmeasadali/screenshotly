import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Code, Copy, ExternalLink, Lightbulb, CheckCircle } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getHowToSchema, getFAQSchema } from "@/lib/seo/structured-data";
import { integrations } from "@/data/integrations";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

const deepDiveBlogPosts: Record<string, { title: string; slug: string }> = {
    javascript: { title: "JavaScript Screenshot API Tutorial", slug: "javascript-screenshot-api-tutorial" },
    nodejs: { title: "Node.js Screenshot API Tutorial", slug: "nodejs-screenshot-api-tutorial" },
    python: { title: "Python Screenshot API Tutorial", slug: "python-screenshot-api-tutorial" },
    php: { title: "PHP Screenshot API Tutorial", slug: "php-screenshot-api-tutorial" },
    ruby: { title: "Ruby Screenshot API Tutorial", slug: "ruby-screenshot-api-tutorial" },
    go: { title: "Go Screenshot API Tutorial", slug: "go-screenshot-api-tutorial" },
    zapier: { title: "Zapier Screenshot Integration Guide", slug: "zapier-screenshot-integration" },
    make: { title: "Make.com Screenshot Integration Guide", slug: "make-com-screenshot-integration" },
    n8n: { title: "n8n Screenshot Integration Guide", slug: "n8n-screenshot-integration" },
};

interface Props {
    params: Promise<{ slug: string }>;
}

// Combine languages and platforms for static params
const allIntegrations = [
    ...integrations.languages,
    ...integrations.platforms,
];

export async function generateStaticParams() {
    return allIntegrations.map((integration) => ({
        slug: integration.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const integration = allIntegrations.find((i) => i.slug === slug);

    if (!integration) {
        return {
            title: "Integration Not Found",
        };
    }

    const isLanguage = integration.type === 'language';
    const title = isLanguage
        ? `${integration.name} Screenshot API - Quick Start & Code Examples`
        : `${integration.name} Screenshot API - No-Code Integration Guide`;

    const metaDesc = 'metaDescription' in integration && integration.metaDescription
        ? integration.metaDescription
        : integration.description.length > 155
            ? integration.description.slice(0, 152) + '...'
            : integration.description;

    return {
        title,
        description: metaDesc,
        alternates: {
            canonical: `/integrations/${slug}`,
        },
        openGraph: {
            title: integration.name,
            description: integration.description,
            url: `${BASE_URL}/integrations/${slug}`,
            type: "article",
        },
    };
}

export default async function IntegrationPage({ params }: Props) {
    const { slug } = await params;
    const integration = allIntegrations.find((i) => i.slug === slug);

    if (!integration) {
        notFound();
    }

    const isLanguage = integration.type === 'language';

    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Integrations", url: `${BASE_URL}/integrations` },
        { name: integration.name, url: `${BASE_URL}/integrations/${slug}` },
    ];

    const installStepText = (integration as { installStep?: string }).installStep
        ?? (isLanguage ? `Set up your ${integration.name} environment with HTTP client support.` : `Log into your ${integration.name} account and create a new workflow.`);

    const howToSteps = isLanguage
        ? [
            { name: "Install dependencies", text: installStepText },
            { name: "Get your API key", text: "Sign up for Screenshotly and get your API key from the dashboard." },
            { name: "Copy the code example", text: `Use our ${integration.name} code example as a starting point.` },
            { name: "Customize and integrate", text: "Modify the code to fit your specific use case and requirements." },
        ]
        : [
            { name: "Set up your account", text: installStepText },
            { name: "Add HTTP module", text: "Add an HTTP request module to make API calls." },
            { name: "Configure the request", text: "Set up the POST request with Screenshotly API endpoint and authentication." },
            { name: "Connect your apps", text: "Link the screenshot output to your destination apps." },
        ];

    // Get related integrations
    const relatedIntegrations = allIntegrations
        .filter((i) => i.slug !== slug && i.type === integration.type)
        .slice(0, 4);

    // Use integration-specific FAQs if available, otherwise use generic ones
    const faqs = 'faqs' in integration && integration.faqs ? integration.faqs : [
        {
            question: `How do I get started with ${integration.name} and Screenshotly?`,
            answer: integration.description,
        },
        {
            question: "What authentication method should I use?",
            answer: "Use Bearer token authentication by including your API key in the Authorization header: 'Bearer YOUR_API_KEY'.",
        },
        {
            question: "How do I handle API errors?",
            answer: "Always check the response status code. Common errors include 401 (invalid API key), 429 (rate limit exceeded), and 400 (invalid parameters).",
        },
        {
            question: "Can I customize the screenshot format and quality?",
            answer: "Yes! You can specify format (PNG, JPEG, PDF), quality settings, viewport size, and device type in your API request.",
        },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getHowToSchema({
                name: `How to use Screenshotly with ${integration.name}`,
                description: integration.description,
                totalTime: "PT10M",
                steps: howToSteps,
            })} />
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
                                <Link href="/integrations" className="hover:text-foreground transition-colors">
                                    Integrations
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-foreground">{integration.name}</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <header className="mb-12">
                        <Badge variant="secondary" className="mb-4">
                            {isLanguage ? 'Language' : 'Platform'}
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            {isLanguage
                                ? `${integration.name} Screenshot API`
                                : `${integration.name} Integration`}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {integration.description}
                        </p>
                    </header>

                    {/* Quick Start */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
                        <div className="space-y-4">
                            {howToSteps.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{step.name}</h3>
                                        <p className="text-muted-foreground">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Code Example (for languages) */}
                    {isLanguage && 'codeExample' in integration && (
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold flex items-center gap-2">
                                    <Code className="w-6 h-6" />
                                    Code Example
                                </h2>
                                <Button variant="outline" size="sm">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy
                                </Button>
                            </div>
                            <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                                <pre className="text-sm">
                                    <code>{integration.codeExample}</code>
                                </pre>
                            </div>
                        </section>
                    )}

                    {/* Steps (for platforms) */}
                    {'steps' in integration && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">Setup Steps</h2>
                            <div className="space-y-4">
                                {integration.steps.map((step, index) => (
                                    <div key={index} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                                        <div className="flex-shrink-0 w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center font-medium text-sm">
                                            {index + 1}
                                        </div>
                                        <p>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* When to Use */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">When to Use {integration.name} with Screenshotly</h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            {'whenToUse' in integration && integration.whenToUse ? (
                                <p className="text-muted-foreground leading-relaxed">{integration.whenToUse}</p>
                            ) : isLanguage ? (
                                <p className="text-muted-foreground leading-relaxed">
                                    Use the {integration.name} integration when you need to capture screenshots
                                    programmatically from a {integration.name} application or backend service.
                                    Common scenarios include generating thumbnails in a web app, automating visual
                                    regression tests in a CI/CD pipeline, producing PDF reports from HTML templates,
                                    and building link preview services. The code example above provides a minimal
                                    working implementation — adapt it to your framework and error handling patterns.
                                </p>
                            ) : (
                                <p className="text-muted-foreground leading-relaxed">
                                    Use the {integration.name} integration when you need to automate screenshot
                                    capture without writing code. Common workflows include capturing pages on a
                                    schedule, saving screenshots to cloud storage when a form is submitted, sending
                                    visual reports via email or Slack, and archiving web content triggered by external
                                    events. {integration.name} handles the orchestration while Screenshotly handles
                                    the rendering.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Best Practices */}
                    {'tips' in integration && integration.tips && integration.tips.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <Lightbulb className="w-6 h-6 text-yellow-500" />
                                {integration.name} Best Practices
                            </h2>
                            <div className="space-y-3">
                                {integration.tips.map((tip: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <p className="text-muted-foreground text-sm leading-relaxed">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Deep Dive Blog Link */}
                    {deepDiveBlogPosts[slug] && (
                        <section className="mb-12 p-5 bg-muted/50 rounded-xl border">
                            <p className="text-sm text-muted-foreground mb-2">Want a step-by-step walkthrough?</p>
                            <Link
                                href={`/blog/${deepDiveBlogPosts[slug].slug}`}
                                className="text-primary hover:underline font-medium flex items-center gap-2"
                            >
                                Read the full {integration.name} tutorial →
                            </Link>
                        </section>
                    )}

                    {/* API Reference */}
                    <section className="mb-12 p-6 border rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Endpoint</span>
                                <code className="bg-muted px-2 py-1 rounded">POST /api/screenshot</code>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Authentication</span>
                                <code className="bg-muted px-2 py-1 rounded">Bearer token</code>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Content-Type</span>
                                <code className="bg-muted px-2 py-1 rounded">application/json</code>
                            </div>
                        </div>
                        <Link
                            href="/help"
                            className="inline-flex items-center mt-4 text-primary text-sm hover:underline"
                        >
                            View full API docs
                            <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
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
                            Start building with {integration.name}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Get your API key and start capturing screenshots in minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Get API Key
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

                    {/* Related Integrations */}
                    {relatedIntegrations.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-6">
                                Other {isLanguage ? 'Languages' : 'Platforms'}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {relatedIntegrations.map((i) => (
                                    <Link
                                        key={i.slug}
                                        href={`/integrations/${i.slug}`}
                                        className="block p-4 border rounded-lg hover:border-primary transition-colors"
                                    >
                                        <h3 className="font-medium mb-1">{i.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {i.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t">
                        <Link
                            href="/integrations"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            View all integrations
                        </Link>
                    </div>
                </div>
            </article>
        </GuestLayout>
    );
}
