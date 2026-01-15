import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema } from "@/lib/seo/structured-data";
import { blogPosts, getFeaturedPosts } from "@/data/blog-posts";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Blog - Screenshot API Tutorials, Tips & Best Practices",
    description: "Learn how to automate screenshots, integrate APIs, and build powerful workflows. Expert tutorials and industry insights from the Screenshotly team.",
    keywords: [
        "screenshot API blog",
        "screenshot tutorials",
        "web automation tips",
        "screenshot best practices",
        "developer tutorials",
    ],
    alternates: {
        canonical: "/blog",
    },
};

const categoryLabels = {
    tutorial: 'Tutorial',
    guide: 'Guide',
    news: 'News',
    comparison: 'Comparison',
    tips: 'Tips & Tricks',
};

export default function BlogIndexPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
    ];

    const featuredPosts = getFeaturedPosts();
    const recentPosts = blogPosts.slice(0, 6);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

            <div className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-4">
                            Blog
                        </Badge>
                        <h1 className="text-4xl font-bold mb-4">
                            Screenshot API Blog
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Tutorials, guides, and best practices for capturing perfect screenshots
                        </p>
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

                    {/* Newsletter CTA */}
                    <div className="mt-16 p-8 bg-muted/50 rounded-xl text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Get the latest tutorials and best practices delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 border rounded-lg bg-background"
                            />
                            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
