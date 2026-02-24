import { Metadata } from "next";
import Link from "next/link";
import { Camera, FileImage, Scroll, ArrowRight, Sparkles } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getCollectionPageSchema, getFAQSchema } from "@/lib/seo/structured-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Free Screenshot Tools - Capture Websites Online",
    description: "Free online tools to capture website screenshots. Take desktop, mobile, and full-page screenshots without signup. Perfect for quick captures.",
    alternates: {
        canonical: "/tools",
    },
    openGraph: {
        title: "Free Screenshot Tools - Capture Websites Online",
        description: "Free online tools to capture website screenshots. Take desktop, mobile, and full-page screenshots without signup. Perfect for quick captures.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Screenshot Tools - Capture Websites Online",
        description: "Free online tools to capture website screenshots. Take desktop, mobile, and full-page screenshots without signup. Perfect for quick captures.",
    },
};

const tools = [
    {
        slug: "website-screenshot",
        title: "Website Screenshot",
        description: "Capture high-quality screenshots of any website instantly. Choose desktop, tablet, or mobile views.",
        icon: Camera,
        status: "available",
        features: ["Multiple devices", "Instant capture", "PNG download"],
    },
    {
        slug: "full-page-screenshot",
        title: "Full Page Screenshot",
        description: "Capture entire web pages including below-fold content. Perfect for long pages and landing pages.",
        icon: FileImage,
        status: "available",
        features: ["Full page capture", "Automatic scrolling", "High resolution"],
    },
    {
        slug: "scrolling-screenshot",
        title: "Scrolling Screenshot",
        description: "Capture entire scrollable pages with custom viewport dimensions. Choose PNG, JPEG, or WebP output.",
        icon: Scroll,
        status: "available",
        features: ["Custom viewport", "Multi-format output", "Below-fold content"],
    },
];

const faqs = [
    {
        question: "Are these screenshot tools really free?",
        answer: "Yes, all three tools are completely free with no signup required. They run on the same rendering engine as our paid API. For automated or bulk captures, sign up for a free API key that includes 100 screenshots.",
    },
    {
        question: "What is the difference between full page and scrolling screenshots?",
        answer: "Both capture the entire page including below-fold content. The full page tool outputs a single PNG with one click. The scrolling tool lets you set a custom viewport width and height and choose between PNG, JPEG, or WebP formats — ideal when you need specific dimensions.",
    },
    {
        question: "Can I use these tools for commercial purposes?",
        answer: "Yes. Screenshots you capture are yours to use for any purpose — documentation, marketing, reports, presentations, or client work. No attribution required.",
    },
    {
        question: "Do I need to install anything?",
        answer: "No. All tools run in your browser. Just paste a URL, click capture, and download the result. No extensions, no desktop apps, no signup.",
    },
    {
        question: "How are these different from the Screenshotly API?",
        answer: "These free tools are for manual, one-at-a-time captures. The API supports automation, batch processing, AI element removal, device mockups, PDF output, and programmatic integration via REST endpoints.",
    },
];

export default function ToolsPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getCollectionPageSchema({
                name: "Free Screenshot Tools",
                description: "Free online tools to capture website screenshots",
                url: `${BASE_URL}/tools`,
            })} />
            <JsonLd data={getFAQSchema(faqs)} />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge className="mb-4">Free Tools</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Free Screenshot Tools
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                            Capture website screenshots instantly — no signup, no API key, no install. Paste a URL and download your screenshot in seconds.
                        </p>
                        <p className="text-muted-foreground max-w-3xl mx-auto">
                            Each tool below runs on Screenshotly&apos;s rendering engine, the same infrastructure
                            that powers our REST API. Use these free tools for quick one-off captures, or{' '}
                            <Link href="/sign-up" className="text-primary hover:underline">sign up for a free API key</Link>{' '}
                            to automate captures programmatically.
                        </p>
                    </div>

                    {/* How It Works */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-primary font-bold">1</span>
                                </div>
                                <h3 className="font-semibold mb-1">Paste a URL</h3>
                                <p className="text-sm text-muted-foreground">Enter any public website URL into the tool.</p>
                            </div>
                            <div>
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-primary font-bold">2</span>
                                </div>
                                <h3 className="font-semibold mb-1">Capture</h3>
                                <p className="text-sm text-muted-foreground">Our engine renders the page in a real browser and captures a high-resolution screenshot.</p>
                            </div>
                            <div>
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-primary font-bold">3</span>
                                </div>
                                <h3 className="font-semibold mb-1">Download</h3>
                                <p className="text-sm text-muted-foreground">Download your screenshot as a PNG file. No watermark, no limits on file size.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {tools.map((tool) => {
                            const IconComponent = tool.icon;
                            const isAvailable = tool.status === "available";

                            return (
                                <div
                                    key={tool.slug}
                                    className={`bg-card border rounded-xl p-6 relative ${isAvailable ? "hover:shadow-lg transition-shadow" : "opacity-75"
                                        }`}
                                >
                                    {!isAvailable && (
                                        <Badge variant="secondary" className="absolute top-4 right-4">
                                            Coming Soon
                                        </Badge>
                                    )}

                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <IconComponent className="w-6 h-6 text-primary" />
                                    </div>

                                    <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
                                    <p className="text-muted-foreground mb-4">{tool.description}</p>

                                    <ul className="space-y-2 mb-6">
                                        {tool.features.map((feature, i) => (
                                            <li key={i} className="text-sm flex items-center gap-2">
                                                <Sparkles className="w-3 h-3 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {isAvailable ? (
                                        <Button className="w-full" asChild>
                                            <Link href={`/tools/${tool.slug}`}>
                                                Use Tool
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button className="w-full" disabled variant="outline">
                                            Coming Soon
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Tool Comparison */}
                    <div className="max-w-4xl mx-auto mt-16 mb-16">
                        <h2 className="text-2xl font-bold text-center mb-8">Compare Our Screenshot Tools</h2>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="text-left p-4 font-medium">Feature</th>
                                        <th className="text-center p-4 font-medium">Website Screenshot</th>
                                        <th className="text-center p-4 font-medium">Full Page</th>
                                        <th className="text-center p-4 font-medium">Scrolling</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t"><td className="p-4">Viewport capture</td><td className="p-4 text-center">✅</td><td className="p-4 text-center">✅</td><td className="p-4 text-center">✅</td></tr>
                                    <tr className="border-t"><td className="p-4">Below-fold content</td><td className="p-4 text-center">❌</td><td className="p-4 text-center">✅</td><td className="p-4 text-center">✅</td></tr>
                                    <tr className="border-t"><td className="p-4">Device presets</td><td className="p-4 text-center">✅ Desktop, Tablet, Mobile</td><td className="p-4 text-center">❌</td><td className="p-4 text-center">❌</td></tr>
                                    <tr className="border-t"><td className="p-4">Custom viewport size</td><td className="p-4 text-center">❌</td><td className="p-4 text-center">❌</td><td className="p-4 text-center">✅</td></tr>
                                    <tr className="border-t"><td className="p-4">Output formats</td><td className="p-4 text-center">PNG</td><td className="p-4 text-center">PNG</td><td className="p-4 text-center">PNG, JPEG, WebP</td></tr>
                                    <tr className="border-t"><td className="p-4">Best for</td><td className="p-4 text-center">Quick captures</td><td className="p-4 text-center">Long pages, archival</td><td className="p-4 text-center">Custom sizes, portfolios</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <h3 className="font-medium mb-2">{faq.question}</h3>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* API Promo */}
                    <div className="mt-20 text-center bg-primary/10 rounded-2xl p-12 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                            Need Programmatic Access?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Our REST API offers advanced features like AI element removal,
                            device mockups, batch processing, and PDF generation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Get Free API Key
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/playground">
                                    Try Full Playground
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
