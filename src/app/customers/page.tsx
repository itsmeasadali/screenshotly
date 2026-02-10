import { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, ArrowRight, Building2, Users, Zap, CheckCircle } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema } from "@/lib/seo/structured-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Customer Testimonials & Success Stories | Screenshotly",
    description: "See how developers and companies use Screenshotly to automate screenshot capture. Read real testimonials and success stories from our customers.",
    keywords: [
        "Screenshotly reviews",
        "screenshot API testimonials",
        "Screenshotly customers",
        "screenshot API success stories"
    ],
    alternates: {
        canonical: "/customers",
    },
};

import { testimonials } from "@/data/testimonials";

const stats = [
    { value: "10M+", label: "Screenshots captured" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "1,000+", label: "Active developers" },
];

export default function CustomersPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Customers", url: `${BASE_URL}/customers` },
    ];


    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge className="mb-4">Customer Stories</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Trusted by Developers Worldwide
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            See how teams use Screenshotly to automate screenshot workflows,
                            speed up development, and create stunning visuals.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Featured Testimonials */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <div className="relative mb-6">
                                    <Quote className="w-8 h-8 text-muted-foreground/20 absolute -top-2 -left-2" />
                                    <p className="text-muted-foreground relative z-10 pl-4">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>

                                {/* Results Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        {testimonial.results}
                                    </span>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-primary">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.title} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>

                                {/* Use Case Tag */}
                                <div className="mt-4 pt-4 border-t">
                                    <span className="text-xs bg-muted px-2 py-1 rounded">
                                        {testimonial.useCase}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Use Cases Summary */}
                    <div className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                            How Teams Use Screenshotly
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold mb-2">Documentation Teams</h3>
                                <p className="text-sm text-muted-foreground">
                                    Automate screenshot updates for technical docs, keeping visuals
                                    in sync with product changes.
                                </p>
                                <Link href="/use-cases/documentation-screenshots" className="text-sm text-primary hover:underline mt-2 inline-block">
                                    Learn more →
                                </Link>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold mb-2">Marketing Teams</h3>
                                <p className="text-sm text-muted-foreground">
                                    Create stunning social media previews, app store screenshots,
                                    and marketing materials at scale.
                                </p>
                                <Link href="/use-cases/social-media-previews" className="text-sm text-primary hover:underline mt-2 inline-block">
                                    Learn more →
                                </Link>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold mb-2">QA & Testing Teams</h3>
                                <p className="text-sm text-muted-foreground">
                                    Run visual regression tests across devices and catch UI bugs
                                    before they reach production.
                                </p>
                                <Link href="/use-cases/automated-testing" className="text-sm text-primary hover:underline mt-2 inline-block">
                                    Learn more →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-primary/10 rounded-2xl p-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Join 1,000+ Developers Using Screenshotly
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Start with 100 free screenshots. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/playground">
                                    Try Playground
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
