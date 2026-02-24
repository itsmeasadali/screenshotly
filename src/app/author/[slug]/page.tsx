import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAuthors, getAuthorBySlug, getAllBlogPosts } from "@/lib/markdown";
import GuestLayout from "@/components/layouts/GuestLayout";
import { JsonLd } from "@/components/seo";
import { getPersonSchema, getBreadcrumbSchema } from "@/lib/seo/structured-data";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `Articles by ${author.name} - Screenshot API Author`,
    description: author.bio,
    alternates: {
      canonical: `/author/${slug}`,
    },
    openGraph: {
      title: `Articles by ${author.name} - Screenshot API Author`,
      description: author.bio,
      type: "profile",
      images: author.avatar ? [author.avatar] : [],
    },
    twitter: {
      card: "summary",
      title: `Articles by ${author.name} - Screenshot API Author`,
      description: author.bio,
      images: author.avatar ? [author.avatar] : [],
    },
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();
  const authorPosts = allPosts.filter(
    (post) => post.author.toLowerCase() === author.name.toLowerCase()
  );

  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: author.name, url: `${BASE_URL}/author/${slug}` },
  ];

  return (
    <GuestLayout>
      <JsonLd data={getPersonSchema(author)} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          {/* Author Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {author.avatar && (
              <div className="flex-shrink-0">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto md:mx-0"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {author.name}
              </h1>
              
              {author.company && (
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  {author.company.role} at{" "}
                  <Link 
                    href={author.company.url} 
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author.company.name}
                  </Link>
                </p>
              )}
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {author.bio}
              </p>

              {/* Social Links */}
              {author.social && (
                <div className="flex gap-4 mb-6">
                  {author.social.linkedin && (
                    <Link
                      href={author.social.linkedin}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {author.social.github && (
                    <Link
                      href={author.social.github}
                      className="text-gray-700 hover:text-gray-900 dark:text-gray-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Link>
                  )}
                  {author.social.twitter && (
                    <Link
                      href={`https://twitter.com/${author.social.twitter.replace('@', '')}`}
                      className="text-blue-400 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Expertise Section */}
          {author.expertise && author.expertise.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: author.content }} />
          </div>

          {/* Published Articles */}
          {authorPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Published Articles ({authorPosts.length})
              </h2>
              <div className="grid gap-4">
                {authorPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Interested in learning more about screenshot automation or have questions about our API?
            </p>
            <div className="flex gap-4">
              <Link
                href="/playground"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Our API
              </Link>
              <Link
                href="/help"
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
