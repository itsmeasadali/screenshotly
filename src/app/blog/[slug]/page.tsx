import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getArticleSchema } from "@/lib/seo/structured-data";
import { getBlogPost, getRelatedBlogPosts, getAllBlogSlugs, getAuthor } from "@/lib/markdown";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt,
            url: `${BASE_URL}/blog/${slug}`,
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt || post.publishedAt,
            authors: [post.author],
            tags: post.tags,
        },
    };
}

const categoryLabels = {
    tutorial: 'Tutorial',
    guide: 'Guide',
    news: 'News',
    comparison: 'Comparison',
    tips: 'Tips & Tricks',
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedBlogPosts(slug);
    const author = await getAuthor(post.author);

    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: post.title, url: `${BASE_URL}/blog/${slug}` },
    ];

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
            <JsonLd data={getArticleSchema({
                title: post.title,
                description: post.excerpt,
                url: `${BASE_URL}/blog/${slug}`,
                image: post.image || `${BASE_URL}/og-blog-default.png`,
                datePublished: post.publishedAt,
                dateModified: post.updatedAt,
                author: author ? {
                    name: author.name,
                    bio: author.bio,
                    credentials: author.credentials,
                    social: author.social
                } : { name: post.author },
                faqs: post.faqs,
            })} />

            <article className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
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
                                <Link href="/blog" className="hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-foreground truncate max-w-[200px]">{post.title}</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <header className="mb-12">
                        <Badge className="mb-4">
                            {categoryLabels[post.category]}
                        </Badge>
                        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                        <p className="text-xl text-muted-foreground mb-6">
                            {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b py-4">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {author?.name || post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readingTime} min read
                            </span>
                        </div>
                    </header>

                    {/* Content */}
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                    />

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-12 flex-wrap">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Author Bio */}
                    {author && (
                        <section className="mb-12 p-6 bg-muted/50 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                            <div className="flex items-start gap-4">
                                {author.avatar && (
                                    <Image 
                                        src={author.avatar} 
                                        alt={author.name}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-full"
                                    />
                                )}
                                <div className="flex-1">
                                    <h4 className="font-medium text-lg mb-2">{author.name}</h4>
                                    <p className="text-muted-foreground mb-2">{author.bio}</p>
                                    {author.credentials && (
                                        <p className="text-sm text-muted-foreground mb-3">
                                            <strong>Credentials:</strong> {author.credentials}
                                        </p>
                                    )}
                                    {author.social && (
                                        <div className="flex gap-3">
                                            {author.social.twitter && (
                                                <a 
                                                    href={author.social.twitter}
                                                    className="text-blue-500 hover:text-blue-600 text-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Twitter
                                                </a>
                                            )}
                                            {author.social.linkedin && (
                                                <a 
                                                    href={author.social.linkedin}
                                                    className="text-blue-700 hover:text-blue-800 text-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    LinkedIn
                                                </a>
                                            )}
                                            {author.social.github && (
                                                <a 
                                                    href={author.social.github}
                                                    className="text-gray-700 hover:text-gray-800 text-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* FAQ Section */}
                    {post.faqs && post.faqs.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {post.faqs.map((faq, index) => (
                                    <div key={index} className="border-l-4 border-primary/20 pl-4">
                                        <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA */}
                    <section className="bg-primary/10 rounded-xl p-8 text-center mb-12">
                        <h2 className="text-2xl font-bold mb-4">
                            Ready to capture your first screenshot?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Get started with 500 free screenshots per day. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Start Free Trial
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/playground">
                                    Try Playground
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="block p-4 border rounded-lg hover:border-primary transition-colors"
                                    >
                                        <Badge variant="outline" className="mb-2 text-xs">
                                            {categoryLabels[relatedPost.category]}
                                        </Badge>
                                        <h3 className="font-medium mb-2 line-clamp-2">{relatedPost.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {relatedPost.readingTime} min read
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back Link */}
                    <div className="mt-12 pt-8 border-t">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </article>
        </GuestLayout>
    );
}
