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
        founder: {
            '@type': 'Person',
            name: 'Asad Ali',
            sameAs: 'https://www.linkedin.com/in/itsmeasadali/'
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: '10685-B Hazelhurst Dr. # 21148',
            addressLocality: 'Houston',
            addressRegion: 'TX',
            postalCode: '77043',
            addressCountry: 'US'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@screenshotly.app',
            telephone: '+1-281-506-0216',
            contactType: 'customer service',
            availableLanguage: ['English'],
        },
        sameAs: [
            'https://twitter.com/screenshotly',
            'https://github.com/screenshotly',
            'https://www.linkedin.com/in/itsmeasadali/'
        ],
        softwareRequirements: 'HTTP client library',
        softwareVersion: '2.0',
        releaseNotes: 'Enhanced AI element detection and improved performance',
        downloadUrl: BASE_URL,
        installUrl: `${BASE_URL}/sign-up`,
        screenshot: `${BASE_URL}/og-image.png`,
        softwareHelp: `${BASE_URL}/help`,
        supportingData: `${BASE_URL}/help`,
        applicationSuite: 'Developer Tools',
        permissions: 'Internet access required',
        memoryRequirements: 'Minimal - API-based service',
        processorRequirements: 'Any modern device with internet connection',
        storageRequirements: 'No local storage required',
        interactionType: 'REST API',
        availableOnDevice: ['Desktop', 'Mobile', 'Tablet', 'Server'],
        countriesSupported: ['US', 'EU', 'CA', 'AU', 'JP', 'Global'],
        inLanguage: ['en'],
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        creator: {
            '@type': 'Person',
            name: 'Asad Ali',
            url: `${BASE_URL}/author/asad-ali`,
        },
        maintainer: {
            '@type': 'Organization',
            name: 'Screenshotly',
            url: BASE_URL,
        },
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
        softwareRequirements: 'HTTP client library',
        softwareVersion: '2.0',
        releaseNotes: 'Enhanced AI element detection and improved performance',
        downloadUrl: BASE_URL,
        installUrl: `${BASE_URL}/sign-up`,
        screenshot: `${BASE_URL}/og-image.png`,
        softwareHelp: `${BASE_URL}/help`,
        supportingData: `${BASE_URL}/help`,
        applicationSuite: 'Developer Tools',
        permissions: 'Network access for API calls',
        storageRequirements: 'Minimal - cloud-based service',
        memoryRequirements: 'Minimal - API service',
        processorRequirements: 'Any device with internet connection',
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
    author: {
        name: string;
        bio?: string;
        credentials?: string;
        social?: {
            twitter?: string;
            linkedin?: string;
            github?: string;
        };
    };
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
}

export function getArticleSchema(article: ArticleData) {
    const schema: Record<string, unknown> = {
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
            name: article.author.name,
            ...(article.author.bio && { description: article.author.bio }),
            ...(article.author.social && {
                sameAs: Object.values(article.author.social).filter(Boolean)
            }),
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

    // Add FAQ schema if FAQs exist
    if (article.faqs && article.faqs.length > 0) {
        schema.mainEntity = article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        }));
    }

    return schema;
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

// API Documentation Schema
export function getAPIDocumentationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        name: 'Screenshotly API Documentation',
        description: 'Complete API reference for the Screenshotly screenshot capture service',
        url: `${BASE_URL}/help`,
        author: {
            '@type': 'Organization',
            name: 'Screenshotly',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Screenshotly',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.svg`,
            },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        proficiencyLevel: 'Beginner',
        dependencies: 'HTTP client library',
        codeRepository: 'https://github.com/screenshotly/examples',
        programmingLanguage: ['JavaScript', 'Python', 'PHP', 'Ruby', 'Go', 'Java'],
        runtimePlatform: ['Web Browser', 'Node.js', 'Server'],
        targetProduct: {
            '@type': 'SoftwareApplication',
            name: 'Screenshotly API',
            url: BASE_URL,
        },
        about: {
            '@type': 'Thing',
            name: 'Screenshot API',
            description: 'RESTful API for programmatic website screenshot capture',
        },
    };
}

// Service Schema for API
export function getServiceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Screenshot API Service',
        description: 'Professional screenshot capture API for developers and businesses',
        provider: {
            '@type': 'Organization',
            name: 'Screenshotly',
            url: BASE_URL,
        },
        serviceType: 'API Service',
        audience: {
            '@type': 'Audience',
            audienceType: 'Developers',
        },
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: 'https://api.screenshotly.app',
            serviceSmsNumber: '+1-281-506-0216',
            servicePhone: '+1-281-506-0216',
        },
        areaServed: 'Worldwide',
        hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        offers: {
            '@type': 'Offer',
            name: 'Screenshot API Plans',
            url: `${BASE_URL}/pricing`,
            priceCurrency: 'USD',
            price: '0',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '0',
                priceCurrency: 'USD',
                unitText: 'per screenshot',
            },
        },
    };
}

// Combined homepage schema
export function getHomepageSchemas() {
    return [
        getOrganizationSchema(),
        getWebSiteSchema(),
        getSoftwareApplicationSchema(),
        getServiceSchema(),
        getWebAPISchema(),
    ];
}

// Person Schema for author pages
export interface AuthorData {
    name: string;
    slug: string;
    bio: string;
    credentials?: string;
    avatar?: string;
    social?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
    };
    expertise?: string[];
    company?: {
        name: string;
        url: string;
        role: string;
    };
}

export function getPersonSchema(author: AuthorData) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        description: author.bio,
        url: `${BASE_URL}/author/${author.slug}`,
        ...(author.avatar && { image: author.avatar }),
        ...(author.credentials && { jobTitle: author.credentials }),
    };

    // Add social media profiles
    if (author.social) {
        const socialProfiles = Object.values(author.social).filter(Boolean);
        if (socialProfiles.length > 0) {
            schema.sameAs = socialProfiles;
        }
    }

    // Add company/organization
    if (author.company) {
        schema.worksFor = {
            '@type': 'Organization',
            name: author.company.name,
            url: author.company.url,
        };
        schema.jobTitle = author.company.role;
    }

    // Add expertise as knowsAbout
    if (author.expertise && author.expertise.length > 0) {
        schema.knowsAbout = author.expertise;
    }

    return schema;
}

// Course Schema for educational content
export interface CourseData {
    name: string;
    description: string;
    provider: string;
    url: string;
    courseCode?: string;
    hasCourseInstance?: {
        courseMode: string;
        courseWorkload: string;
        instructor: string;
    };
}

export function getCourseSchema(course: CourseData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: {
            '@type': 'Organization',
            name: course.provider,
            sameAs: BASE_URL,
        },
        url: course.url,
        ...(course.courseCode && { courseCode: course.courseCode }),
        ...(course.hasCourseInstance && {
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: course.hasCourseInstance.courseMode,
                courseWorkload: course.hasCourseInstance.courseWorkload,
                instructor: {
                    '@type': 'Person',
                    name: course.hasCourseInstance.instructor,
                },
            },
        }),
    };
}

// VideoObject Schema for future video content
export interface VideoData {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    contentUrl: string;
    embedUrl?: string;
}

export function getVideoSchema(video: VideoData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.name,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadDate: video.uploadDate,
        duration: video.duration,
        contentUrl: video.contentUrl,
        ...(video.embedUrl && { embedUrl: video.embedUrl }),
        publisher: {
            '@type': 'Organization',
            name: 'Screenshotly',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.svg`,
            },
        },
    };
}

// Dataset Schema for API responses and examples
export function getDatasetSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Screenshot API Examples',
        description: 'Collection of code examples and API responses for Screenshotly',
        url: `${BASE_URL}/help`,
        creator: {
            '@type': 'Organization',
            name: 'Screenshotly',
            url: BASE_URL,
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        license: 'https://creativecommons.org/licenses/by/4.0/',
        keywords: [
            'screenshot API',
            'code examples',
            'REST API',
            'developer tools',
            'automation',
        ],
        distribution: {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: `${BASE_URL}/api/examples`,
        },
        includedInDataCatalog: {
            '@type': 'DataCatalog',
            name: 'Developer Resources',
            url: `${BASE_URL}/help`,
        },
    };
}

// Comparison Schema for competitor pages
export interface ComparisonData {
    name: string;
    description: string;
    url: string;
    mainProduct: string;
    competitorProduct: string;
    features: Array<{
        feature: string;
        mainProduct: string;
        competitor: string;
    }>;
}

export function getComparisonSchema(comparison: ComparisonData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ComparisonTable',
        name: comparison.name,
        description: comparison.description,
        url: comparison.url,
        mainEntity: {
            '@type': 'Product',
            name: comparison.mainProduct,
            url: BASE_URL,
        },
        about: [
            {
                '@type': 'Product',
                name: comparison.mainProduct,
            },
            {
                '@type': 'Product',
                name: comparison.competitorProduct,
            },
        ],
        datePublished: new Date().toISOString().split('T')[0],
        author: {
            '@type': 'Organization',
            name: 'Screenshotly',
            url: BASE_URL,
        },
    };
}

// WebAPI Schema for API documentation
export function getWebAPISchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebAPI',
        name: 'Screenshotly API',
        description: 'RESTful API for capturing website screenshots with AI-powered element removal',
        url: 'https://api.screenshotly.app',
        documentation: `${BASE_URL}/help`,
        provider: {
            '@type': 'Organization',
            name: 'Screenshotly',
            url: BASE_URL,
        },
        termsOfService: `${BASE_URL}/terms`,
        potentialAction: {
            '@type': 'ConsumeAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://api.screenshotly.app/screenshot',
                httpMethod: 'POST',
                contentType: 'application/json',
            },
        },
        offers: {
            '@type': 'Offer',
            name: 'API Access',
            url: `${BASE_URL}/pricing`,
            priceCurrency: 'USD',
            price: '0',
            description: 'Free tier with 500 screenshots per day',
        },
    };
}

// Helper component to inject JSON-LD
export function generateJsonLd(schema: object | object[]) {
    const schemas = Array.isArray(schema) ? schema : [schema];
    return schemas.map((s, i) => ({
        __html: JSON.stringify(s),
        key: i,
    }));
}
