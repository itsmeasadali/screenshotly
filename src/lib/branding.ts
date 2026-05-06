// Central branding configuration. Single source of truth for site name,
// tagline, support contacts, social handles, and canonical URLs. Values can
// be overridden at runtime via environment variables where it makes sense
// (canonical URL, support email, Twitter handle).

/** The product name used in <title>, OG title, structured data, and default copy. */
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Screenshotly';

/** One-line positioning statement. Rendered in the hero area and meta descriptions. */
export const TAGLINE =
    process.env.NEXT_PUBLIC_TAGLINE ||
    'Screenshot API for developers — AI-powered element removal, device mockups, and PDF output in one REST call.';

/**
 * Canonical production URL (no trailing slash). Used by `metadataBase`,
 * sitemap, and JSON-LD. Override with NEXT_PUBLIC_APP_URL for staging or
 * local dev on a non-default port.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

/** Path to the default Open Graph image served from /public. */
export const OG_IMAGE_PATH = '/og-image.png';

/** Contact email surfaced in SECURITY.md, support pages, and structured data. */
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@screenshotly.app';

/** Twitter/X handle used in twitter:creator meta and footer social links. */
export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@screenshotly';

/** Organization name used in JSON-LD (usually equal to SITE_NAME). */
export const ORG_NAME = process.env.NEXT_PUBLIC_ORG_NAME || SITE_NAME;

/**
 * Default page-title template. Used by Next.js Metadata API.
 * Example: `Pricing` → `Pricing | Screenshotly`.
 */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

/** Hero headline on the homepage. */
export const HERO_HEADLINE = process.env.NEXT_PUBLIC_HERO_HEADLINE || 'Screenshot API for Developers';

/** Hero subheadline on the homepage. */
export const HERO_SUBHEADLINE =
    process.env.NEXT_PUBLIC_HERO_SUBHEADLINE ||
    'A REST API that captures website screenshots programmatically, with AI-powered element removal and device mockups built in.';
