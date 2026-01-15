import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { comparisons } from "@/data/comparisons";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Compare Screenshot APIs - Screenshotly Alternatives & Comparisons",
    description: "Compare Screenshotly with other screenshot APIs and tools. See feature comparisons, pricing, and why developers choose Screenshotly.",
    keywords: [
        "screenshot API comparison",
        "best screenshot API",
        "screenshot API alternatives",
        "screenshotly vs",
        "puppeteer alternative",
    ],
    alternates: {
        canonical: "/compare",
    },
};

export default function CompareIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Comparisons", url: `${BASE_URL}/compare` },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

            <div className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Comparisons
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Comparisons
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            See how Screenshotly compares to other screenshot tools and why developers are making the switch
                        </p>
                    </div>

                    {/* Comparisons Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {comparisons.map((comparison) => (
                            <Link
                                key={comparison.slug}
                                href={`/compare/${comparison.slug}`}
                                className="group block p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="font-bold text-primary">Screenshotly</span>
                                    <span className="text-muted-foreground">vs</span>
                                    <span className="font-bold">{comparison.name}</span>
                                </div>
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {comparison.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {comparison.keywords.slice(0, 2).map((keyword) => (
                                        <Badge key={keyword} variant="outline" className="text-xs">
                                            {keyword}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center text-primary text-sm font-medium">
                                    View comparison
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Why Screenshotly */}
                    <div className="mt-16 p-8 bg-muted/50 rounded-xl text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Why developers choose Screenshotly
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
                            <div>
                                <h3 className="font-semibold mb-2">🤖 AI-Powered Cleanup</h3>
                                <p className="text-sm text-muted-foreground">
                                    Automatic removal of cookie banners, popups, and distracting elements
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">📱 Device Mockups</h3>
                                <p className="text-sm text-muted-foreground">
                                    Beautiful iPhone, MacBook, and browser frames included at no extra cost
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">💰 Generous Free Tier</h3>
                                <p className="text-sm text-muted-foreground">
                                    500 screenshots per day free, no credit card required
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
