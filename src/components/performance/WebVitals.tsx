'use client';

import { useEffect } from 'react';

/**
 * Reports Core Web Vitals metrics for performance monitoring
 * These can be sent to analytics for tracking
 */
export function WebVitalsReporter() {
    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        // Report Web Vitals when available
        const reportWebVitals = async () => {
            try {
                const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');

                const sendToAnalytics = (metric: {
                    name: string;
                    value: number;
                    id: string;
                }) => {
                    // Log in development
                    if (process.env.NODE_ENV === 'development') {
                        console.log(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(2));
                    }

                    // Send to Google Analytics if available
                    if (
                        typeof window !== 'undefined' &&
                        'gtag' in window &&
                        typeof (window as unknown as { gtag: (...args: unknown[]) => void }).gtag === 'function'
                    ) {
                        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', metric.name, {
                            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                            event_label: metric.id,
                            non_interaction: true,
                        });
                    }
                };

                // Core Web Vitals
                onCLS(sendToAnalytics);
                onINP(sendToAnalytics); // Replaced FID with INP
                onLCP(sendToAnalytics);

                // Other metrics
                onFCP(sendToAnalytics);
                onTTFB(sendToAnalytics);
            } catch {
                // web-vitals not available, skip
            }
        };

        reportWebVitals();
    }, []);

    return null;
}

/**
 * Preload critical resources for better LCP
 */
export function CriticalPreloads() {
    return (
        <>
            {/* Preconnect to critical domains */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* DNS prefetch for API domains */}
            <link rel="dns-prefetch" href="https://api.screenshotly.app" />
            <link rel="dns-prefetch" href="https://clerk.screenshotly.app" />
        </>
    );
}

/**
 * Performance thresholds for Core Web Vitals
 */
export const PERFORMANCE_THRESHOLDS = {
    LCP: {
        good: 2500,
        needsImprovement: 4000,
    },
    INP: {
        good: 200,
        needsImprovement: 500,
    },
    CLS: {
        good: 0.1,
        needsImprovement: 0.25,
    },
    FCP: {
        good: 1800,
        needsImprovement: 3000,
    },
    TTFB: {
        good: 800,
        needsImprovement: 1800,
    },
};
