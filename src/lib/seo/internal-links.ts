// Internal Linking utilities for SEO
// Helps with creating relevant internal links throughout the site

import { useCases } from '@/data/use-cases';
import { integrations } from '@/data/integrations';
import { comparisons } from '@/data/comparisons';

export interface InternalLink {
    href: string;
    title: string;
    description?: string;
    type: 'use-case' | 'integration' | 'comparison' | 'blog' | 'page';
}

// Get related use cases for a given context
export function getRelatedUseCases(limit = 3): InternalLink[] {
    return useCases.slice(0, limit).map(uc => ({
        href: `/use-cases/${uc.slug}`,
        title: uc.title,
        description: uc.description,
        type: 'use-case',
    }));
}

// Get related integrations for a given language/platform
export function getRelatedIntegrations(currentSlug?: string, limit = 3): InternalLink[] {
    const allIntegrations = [...integrations.languages, ...integrations.platforms];
    return allIntegrations
        .filter(i => i.slug !== currentSlug)
        .slice(0, limit)
        .map(i => ({
            href: `/integrations/${i.slug}`,
            title: i.name,
            description: i.description,
            type: 'integration',
        }));
}

// Get comparison links
export function getComparisonLinks(limit = 3): InternalLink[] {
    return comparisons.slice(0, limit).map(c => ({
        href: `/compare/${c.slug}`,
        title: `vs ${c.name}`,
        description: c.description,
        type: 'comparison',
    }));
}

// Note: Blog-related functions have been moved to blog-links.ts
// to avoid fs module conflicts in client components

// Get main navigation links
export function getNavigationLinks(): InternalLink[] {
    return [
        { href: '/', title: 'Home', type: 'page' },
        { href: '/pricing', title: 'Pricing', type: 'page' },
        { href: '/playground', title: 'Playground', type: 'page' },
        { href: '/blog', title: 'Blog', type: 'page' },
        { href: '/use-cases', title: 'Use Cases', type: 'page' },
        { href: '/integrations', title: 'Integrations', type: 'page' },
        { href: '/compare', title: 'Compare', type: 'page' },
        { href: '/help', title: 'Help', type: 'page' },
    ];
}

// Get footer links organized by category
export function getFooterLinks() {
    return {
        product: [
            { href: '/pricing', title: 'Pricing' },
            { href: '/playground', title: 'Playground' },
            { href: '/status', title: 'Status' },
        ],
        resources: [
            { href: '/blog', title: 'Blog' },
            { href: '/help', title: 'Help Center' },
            { href: '/use-cases', title: 'Use Cases' },
            { href: '/integrations', title: 'Integrations' },
        ],
        compare: comparisons.slice(0, 4).map(c => ({
            href: `/compare/${c.slug}`,
            title: `vs ${c.name}`,
        })),
        legal: [
            { href: '/privacy', title: 'Privacy Policy' },
            { href: '/terms', title: 'Terms of Service' },
            { href: '/cookies', title: 'Cookie Policy' },
            { href: '/gdpr', title: 'GDPR' },
        ],
    };
}

// Suggest related content based on current page type (non-blog content only)
// For blog-related suggestions, use blog-links.ts functions directly in server components
export function getSuggestedContent(
    pageType: 'use-case' | 'integration' | 'comparison' | 'blog' | 'home'
): InternalLink[] {
    switch (pageType) {
        case 'use-case':
            return [
                ...getRelatedIntegrations(undefined, 2),
                // Blog links should be added separately using blog-links.ts
            ];
        case 'integration':
            return [
                ...getRelatedUseCases(2),
                ...getComparisonLinks(1),
            ];
        case 'comparison':
            return [
                ...getRelatedUseCases(2),
                // Blog links should be added separately using blog-links.ts
            ];
        case 'blog':
            return [
                ...getRelatedUseCases(2),
                ...getRelatedIntegrations(undefined, 1),
            ];
        case 'home':
        default:
            return [
                ...getRelatedUseCases(2),
                // Blog links should be added separately using blog-links.ts
            ];
    }
}
