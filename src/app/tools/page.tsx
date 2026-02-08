import { Metadata } from "next";
import Link from "next/link";
import { Camera, FileImage, Scroll, ArrowRight, Sparkles } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getCollectionPageSchema } from "@/lib/seo/structured-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Free Screenshot Tools - Capture Websites Online | Screenshotly",
    description: "Free online tools to capture website screenshots. Take desktop, mobile, and full-page screenshots without signup. Perfect for quick captures.",
    keywords: [
        "free screenshot tools",
        "website screenshot",
        "online screenshot tool",
        "capture website",
        "screenshot generator"
    ],
    alternates: {
        canonical: "/tools",
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
        description: "Create animated scrolling screenshots to showcase entire pages in motion.",
        icon: Scroll,
        status: "available",
        features: ["Animated output", "Custom scroll speed", "GIF/MP4 export"],
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

            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge className="mb-4">Free Tools</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Free Screenshot Tools
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Quick and easy website screenshot tools. No signup required -
                            just paste a URL and capture.
                        </p>
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
