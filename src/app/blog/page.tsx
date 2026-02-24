import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema, getCollectionPageSchema } from "@/lib/seo/structured-data";
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/markdown";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Screenshot API Tutorials, Tips & Best Practices",
    description: "Learn how to automate screenshots, integrate APIs, and build powerful workflows. Expert tutorials and industry insights from the Screenshotly team.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Screenshot API Tutorials, Tips & Best Practices",
        description: "Learn how to automate screenshots, integrate APIs, and build powerful workflows. Expert tutorials and industry insights from the Screenshotly team.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Screenshot API Tutorials, Tips & Best Practices",
        description: "Learn how to automate screenshots, integrate APIs, and build powerful workflows. Expert tutorials and industry insights from the Screenshotly team.",
    },
};

const categoryLabels: Record<string, string> = {
    tutorial: 'Tutorial',
    guide: 'Guide',
    news: 'News',
    comparison: 'Comparison',
    tips: 'Tips & Tricks',
    'case-study': 'Case Study',
    reference: 'Reference',
};

export default async function BlogIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
    ];

    const featuredPosts = await getFeaturedBlogPosts();
    const allPosts = await getAllBlogPosts();
    const recentPosts = allPosts;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const faqs = [
        {
            question: "How do I get started with the Screenshotly API?",
            answer: "Sign up for a free account to get your API key. You get 100 free screenshots with no credit card required. Our tutorials walk you through your first API call in under 5 minutes with code examples in JavaScript, Python, PHP, and more.",
        },
        {
            question: "What topics does the Screenshotly blog cover?",
            answer: "Our blog covers screenshot API integration tutorials, visual testing best practices, automation workflows, performance optimization, device mockup guides, and comparisons with other tools. All articles include working code examples.",
        },
        {
            question: "How often is new content published?",
            answer: "We publish new tutorials, guides, and best practice articles weekly. Subscribe to our newsletter to get notified when new content is available.",
        },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />
            <JsonLd data={getCollectionPageSchema({ name: "Screenshot API Blog", description: "Tutorials, guides, and best practices for screenshot API automation.", url: `${BASE_URL}/blog` })} />

            <div className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            Blog
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Blog
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Tutorials, guides, and best practices for capturing perfect screenshots
                        </p>
                    </div>

                    {/* Intro Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto mb-12 text-center">
                        <p className="text-muted-foreground leading-relaxed">
                            Learn how to build powerful screenshot automation from developers who&apos;ve done it at scale.
                            Our blog covers everything from basic API integration to advanced workflows like visual testing, competitive monitoring, and real-time OG image generation.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Each article includes working code examples, performance benchmarks, and practical tips you can implement immediately.
                            Whether you&apos;re just getting started or optimizing an existing system, you&apos;ll find actionable insights here.
                            Browse by <Link href="/topics" className="text-primary hover:underline">topic</Link> to find guides organized by skill level and use case.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">{allPosts.length}+</div>
                            <div className="text-sm text-muted-foreground">In-depth articles</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">Weekly</div>
                            <div className="text-sm text-muted-foreground">New content published</div>
                        </div>
                        <div className="text-center p-6 bg-muted/50 rounded-xl">
                            <div className="text-3xl font-bold text-primary mb-2">5–15 min</div>
                            <div className="text-sm text-muted-foreground">Read time per article</div>
                        </div>
                    </div>

                    {/* Featured Posts */}
                    {featuredPosts.length > 0 && (
                        <section className="mb-16">
                            <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {featuredPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block p-6 border-2 border-primary/20 rounded-xl hover:border-primary transition-colors bg-primary/5"
                                    >
                                        <Badge className="mb-3">
                                            {categoryLabels[post.category]}
                                        </Badge>
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(post.publishedAt)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {post.readingTime} min read
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All Posts */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Recent Articles</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group block p-6 border rounded-xl hover:border-primary hover:shadow-md transition-all"
                                >
                                    <Badge variant="outline" className="mb-3">
                                        {categoryLabels[post.category]}
                                    </Badge>
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{formatDate(post.publishedAt)}</span>
                                        <span>{post.readingTime} min</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mt-16 max-w-3xl mx-auto">
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
                    <div className="mt-16 p-8 bg-muted/50 rounded-xl text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Try the Screenshot API Free
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            100 free screenshots — no credit card required. Capture any URL in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/sign-up"
                                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Get Free API Key
                            </Link>
                            <Link
                                href="/help"
                                className="px-6 py-2 border rounded-lg font-medium hover:bg-muted transition-colors"
                            >
                                Read the Docs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
