// Server-only blog linking utilities
// These functions use fs and can only be used in server components

import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/markdown';

export interface InternalLink {
    href: string;
    title: string;
    description?: string;
    type: 'use-case' | 'integration' | 'comparison' | 'blog' | 'page';
}

// Get recent blog posts
export async function getRecentBlogPosts(limit = 3): Promise<InternalLink[]> {
    const blogPosts = await getAllBlogPosts();
    return blogPosts
        .slice(0, limit)
        .map(post => ({
            href: `/blog/${post.slug}`,
            title: post.title,
            description: post.excerpt,
            type: 'blog' as const,
        }));
}

// Get featured blog posts
export async function getFeaturedBlogLinks(): Promise<InternalLink[]> {
    const blogPosts = await getFeaturedBlogPosts();
    return blogPosts.map(post => ({
        href: `/blog/${post.slug}`,
        title: post.title,
        description: post.excerpt,
        type: 'blog' as const,
    }));
}
