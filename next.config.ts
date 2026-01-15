import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Enable compression for better performance
  compress: true,

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize size changes for LCP
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Enable strict mode for better React performance
  reactStrictMode: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    // More permissive CSP for development, stricter for production
    const cspDirectives = [
      "default-src 'self'",
      isDev
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: blob:"
        : "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://*.clerk.com https://*.clerk.accounts.dev https://*.clerk.dev https://clerk.screenshotly.app https://challenges.cloudflare.com https://static.cloudflareinsights.com https://*.hcaptcha.com https://hcaptcha.com https://js.hcaptcha.com https://www.gstatic.com https://www.google.com https://www.googletagmanager.com",
      "worker-src 'self' blob:",
      "style-src 'self' 'unsafe-inline' https://*.clerk.com https://clerk.screenshotly.app https://*.hcaptcha.com https://hcaptcha.com https://www.gstatic.com",
      "img-src 'self' blob: data: https:",
      "font-src 'self' https://*.clerk.com https://fonts.gstatic.com",
      "connect-src 'self' https://*.clerk.com https://clerk.screenshotly.app https://*.stripe.com https://*.hcaptcha.com https://hcaptcha.com https://challenges.cloudflare.com https://www.google.com https://www.gstatic.com https://www.google-analytics.com https://*.analytics.google.com https://region1.google-analytics.com",
      "frame-src 'self' https://*.clerk.com https://*.hcaptcha.com https://hcaptcha.com https://newassets.hcaptcha.com https://www.google.com https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      !isDev && "upgrade-insecure-requests",
    ].filter(Boolean);

    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          ...(isDev ? [] : [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }]),
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; ')
          }
        ],
      },
      {
        // Cache static assets for performance
        source: '/(.*).(js|css|woff|woff2|png|jpg|jpeg|gif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images with long TTL
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
