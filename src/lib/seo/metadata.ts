import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    noIndex?: boolean;
    ogImage?: string;
    ogType?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
}

export function generateMetadata({
    title,
    description,
    keywords = [],
    canonical,
    noIndex = false,
    ogImage = '/og-image.png',
    ogType = 'website',
    publishedTime,
    modifiedTime,
    authors,
}: SEOConfig): Metadata {
    const fullTitle = title.includes('Screenshotly')
        ? title
        : `${title} | Screenshotly`;

    const defaultKeywords = [
        'screenshot API',
        'website screenshot',
        'automated screenshots',
        'screenshot service',
        'URL to image',
        'webpage capture',
        'screenshot tool',
        'developer API',
    ];

    const allKeywords = [...new Set([...keywords, ...defaultKeywords])];

    return {
        title: fullTitle,
        description,
        keywords: allKeywords,
        authors: authors?.map(name => ({ name })) || [{ name: 'Screenshotly' }],
        creator: 'Screenshotly',
        publisher: 'Screenshotly',
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: canonical || undefined,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true, googleBot: { index: true, follow: true } },
        openGraph: {
            title: fullTitle,
            description,
            url: canonical || BASE_URL,
            siteName: 'Screenshotly',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: ogType,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [ogImage],
            creator: '@screenshotly',
            site: '@screenshotly',
        },
        verification: {
            google: process.env.GOOGLE_SITE_VERIFICATION,
            // Add other verification codes as needed
        },
        category: 'Technology',
    };
}

// Pre-defined metadata for common pages
export const pageMetadata = {
    home: generateMetadata({
        title: 'Screenshotly - Screenshot API for Developers | Automated Website Captures',
        description: 'Powerful REST API for capturing website screenshots programmatically. Clean screenshots with AI-powered element removal, device mockups, and multiple formats. Perfect for testing automation, documentation, and content creation.',
        keywords: [
            'screenshot API',
            'website screenshot API',
            'automated screenshots',
            'puppeteer alternative',
            'URL to image API',
            'webpage capture API',
            'screenshot as a service',
            'programmatic screenshots',
        ],
        canonical: BASE_URL,
        ogType: 'website',
    }),

    pricing: generateMetadata({
        title: 'Pricing - Screenshot API Plans | 100 Free Screenshots',
        description: 'Start free with 100 screenshots. Plans from $14/mo for 2,500 screenshots to $199/mo for 50,000. AI element removal, PDF rendering, no hidden fees.',
        keywords: [
            'screenshot API pricing',
            'screenshot service cost',
            'cheap screenshot API',
            'free screenshot API',
            'API pricing plans',
            'buy screenshot API',
            'screenshot API comparison',
        ],
        canonical: `${BASE_URL}/pricing`,
    }),

    playground: generateMetadata({
        title: 'Screenshot Playground - Test Our API Live',
        description: 'Try Screenshotly\'s screenshot API instantly. Configure device mockups, AI element removal, and output formats. No signup required for testing.',
        keywords: [
            'screenshot API demo',
            'try screenshot API',
            'screenshot API playground',
            'test website screenshot',
            'live screenshot demo',
        ],
        canonical: `${BASE_URL}/playground`,
    }),

    help: generateMetadata({
        title: 'Help Center - Screenshot API Documentation & Support',
        description: 'Get help with Screenshotly. Find answers in our documentation, FAQs, and contact support for personalized assistance.',
        keywords: [
            'screenshot API help',
            'screenshot API documentation',
            'screenshotly support',
            'API troubleshooting',
        ],
        canonical: `${BASE_URL}/help`,
    }),

    blog: generateMetadata({
        title: 'Blog - Screenshot API Tutorials, Tips & Best Practices',
        description: 'Learn how to automate screenshots, integrate APIs, and build powerful workflows. Expert tutorials and industry insights from the Screenshotly team.',
        keywords: [
            'screenshot API blog',
            'screenshot tutorials',
            'web automation tips',
            'screenshot best practices',
        ],
        canonical: `${BASE_URL}/blog`,
        ogType: 'website',
    }),
};

// Helper to generate use case page metadata
export function generateUseCaseMetadata(useCase: {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
}): Metadata {
    return generateMetadata({
        title: `${useCase.title} - Screenshot API Use Case`,
        description: useCase.description,
        keywords: useCase.keywords,
        canonical: `${BASE_URL}/use-cases/${useCase.slug}`,
    });
}

// Helper to generate comparison page metadata
export function generateComparisonMetadata(competitor: {
    slug: string;
    name: string;
}): Metadata {
    return generateMetadata({
        title: `Screenshotly vs ${competitor.name} - Screenshot API Comparison`,
        description: `Compare Screenshotly with ${competitor.name}. See features, pricing, and performance differences. Find the best screenshot API for your needs.`,
        keywords: [
            `screenshotly vs ${competitor.slug}`,
            `${competitor.slug} alternative`,
            `${competitor.name} comparison`,
            'screenshot API comparison',
            'best screenshot API',
        ],
        canonical: `${BASE_URL}/compare/${competitor.slug}`,
    });
}

// Helper to generate integration page metadata
export function generateIntegrationMetadata(integration: {
    slug: string;
    name: string;
    type: 'language' | 'platform';
}): Metadata {
    const isLanguage = integration.type === 'language';

    return generateMetadata({
        title: isLanguage
            ? `${integration.name} Screenshot API - Code Examples & SDK`
            : `${integration.name} + Screenshotly Integration Guide`,
        description: isLanguage
            ? `Capture website screenshots with ${integration.name}. Complete code examples, SDK documentation, and best practices for ${integration.name} developers.`
            : `Connect Screenshotly with ${integration.name}. Step-by-step integration guide to automate screenshots in your ${integration.name} workflows.`,
        keywords: [
            `${integration.slug} screenshot API`,
            `screenshot API ${integration.slug}`,
            isLanguage ? `${integration.slug} URL to image` : `${integration.slug} automation`,
            isLanguage ? `${integration.slug} webpage capture` : `${integration.slug} screenshot workflow`,
        ],
        canonical: `${BASE_URL}/integrations/${integration.slug}`,
    });
}

// Helper for blog post metadata
export function generateBlogMetadata(post: {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    publishedTime: string;
    modifiedTime?: string;
    author?: string;
    image?: string;
}): Metadata {
    return generateMetadata({
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        canonical: `${BASE_URL}/blog/${post.slug}`,
        ogType: 'article',
        publishedTime: post.publishedTime,
        modifiedTime: post.modifiedTime,
        authors: post.author ? [post.author] : undefined,
        ogImage: post.image || '/og-blog-default.png',
    });
}
