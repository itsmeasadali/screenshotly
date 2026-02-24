import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

const PRIVATE_PATHS = [
    '/api/',
    '/dashboard/',
    '/sign-in/',
    '/sign-up/',
    '/_next/',
    '/private/',
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: 'CCBot',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
