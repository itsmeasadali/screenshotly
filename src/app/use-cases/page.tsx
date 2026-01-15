import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { useCases } from "@/data/use-cases";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Use Cases - Screenshot API Applications",
    description: "Discover how developers use Screenshotly for documentation, testing, social media, e-commerce, and more. Real-world screenshot API applications.",
    keywords: [
        "screenshot API use cases",
        "screenshot automation examples",
        "website screenshot applications",
        "screenshot API examples",
    ],
    alternates: {
        canonical: "/use-cases",
    },
};

export default function UseCasesIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Use Cases", url: `${BASE_URL}/use-cases` },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

            <div className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Use Cases
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Use Cases
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            See how developers and teams use Screenshotly to automate their screenshot workflows
                        </p>
                    </div>

                    {/* Use Cases Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((useCase) => (
                            <Link
                                key={useCase.slug}
                                href={`/use-cases/${useCase.slug}`}
                                className="group block p-6 border rounded-xl hover:border-primary hover:shadow-lg transition-all"
                            >
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {useCase.title}
                                </h2>
                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {useCase.description}
                                </p>
                                <div className="flex items-center text-primary text-sm font-medium">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <p className="text-muted-foreground mb-4">
                            Don&apos;t see your use case? Our API is flexible enough for any screenshot need.
                        </p>
                        <Link
                            href="/playground"
                            className="text-primary font-medium hover:underline"
                        >
                            Try it in the playground →
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
