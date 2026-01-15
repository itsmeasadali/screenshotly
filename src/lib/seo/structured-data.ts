const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

// Organization Schema
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Screenshotly',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.svg`,
        description: 'Screenshot API for developers - automated website captures with AI-powered element removal',
        foundingDate: '2024',
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@screenshotly.app',
            contactType: 'customer service',
            availableLanguage: ['English'],
        },
        sameAs: [
            'https://twitter.com/screenshotly',
            'https://github.com/screenshotly',
        ],
    };
}

// SoftwareApplication Schema
export function getSoftwareApplicationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Screenshotly',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: BASE_URL,
        description: 'RESTful API for capturing website screenshots programmatically with AI-powered cleaning and device mockups.',
        offers: {
            '@type': 'AggregateOffer',
            lowPrice: '0',
            highPrice: '49',
            priceCurrency: 'USD',
            offerCount: 2,
            offers: [
                {
                    '@type': 'Offer',
                    name: 'Free Plan',
                    price: '0',
                    priceCurrency: 'USD',
                    description: '500 screenshots per day',
                },
                {
                    '@type': 'Offer',
                    name: 'Pro Plan',
                    price: '49',
                    priceCurrency: 'USD',
                    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    description: '5000 screenshots per day with priority support',
                },
            ],
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '150',
            bestRating: '5',
            worstRating: '1',
        },
        featureList: [
            'AI-powered element removal',
            'Device mockups (iPhone, MacBook, Browser)',
            'Multiple viewport sizes',
            'Full-page screenshots',
            'Multiple output formats (PNG, JPEG, PDF)',
            'RESTful API',
            'Rate limiting protection',
        ],
    };
}

// WebSite Schema with SearchAction
export function getWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Screenshotly',
        url: BASE_URL,
        description: 'Screenshot API for developers',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// Product Schema for API
export function getProductSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Screenshotly API',
        description: 'RESTful API for capturing high-quality website screenshots with AI-powered element removal and device mockups.',
        url: BASE_URL,
        image: `${BASE_URL}/og-image.png`,
        brand: {
            '@type': 'Brand',
            name: 'Screenshotly',
        },
        offers: {
            '@type': 'AggregateOffer',
            lowPrice: '0',
            highPrice: '49',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '150',
        },
    };
}

// FAQ Schema
export interface FAQItem {
    question: string;
    answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// Breadcrumb Schema
export interface BreadcrumbItem {
    name: string;
    url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// Article Schema for blog posts
export interface ArticleData {
    title: string;
    description: string;
    url: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
}

export function getArticleSchema(article: ArticleData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
            '@type': 'Person',
            name: article.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Screenshotly',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.svg`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url,
        },
    };
}

// HowTo Schema for tutorials
export interface HowToStep {
    name: string;
    text: string;
    image?: string;
}

export function getHowToSchema(data: {
    name: string;
    description: string;
    totalTime?: string;
    steps: HowToStep[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: data.name,
        description: data.description,
        ...(data.totalTime && { totalTime: data.totalTime }),
        step: data.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && { image: step.image }),
        })),
    };
}

// Combined homepage schema
export function getHomepageSchemas() {
    return [
        getOrganizationSchema(),
        getWebSiteSchema(),
        getSoftwareApplicationSchema(),
    ];
}

// Helper component to inject JSON-LD
export function generateJsonLd(schema: object | object[]) {
    const schemas = Array.isArray(schema) ? schema : [schema];
    return schemas.map((s, i) => ({
        __html: JSON.stringify(s),
        key: i,
    }));
}
