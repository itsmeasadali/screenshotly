import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Bug, Zap, Shield, Package, Clock } from "lucide-react";
import GuestLayout from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema } from "@/lib/seo/structured-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: "Changelog - Product Updates & New Features | Screenshotly",
    description: "Stay up to date with Screenshotly's latest features, improvements, and bug fixes. View our product changelog and release notes.",
    keywords: [
        "Screenshotly changelog",
        "screenshot API updates",
        "Screenshotly releases",
        "new features",
        "product updates"
    ],
    alternates: {
        canonical: "/changelog",
    },
};

interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    description: string;
    type: "feature" | "improvement" | "fix" | "security";
    changes: string[];
}

const changelog: ChangelogEntry[] = [
    {
        version: "2.5.0",
        date: "February 8, 2026",
        title: "Enhanced AI Element Detection",
        description: "Major improvements to our AI-powered element removal with better detection of modern popup patterns.",
        type: "feature",
        changes: [
            "Added AI detection for GDPR consent banners in 15+ languages",
            "Improved chat widget detection (Intercom, Drift, Crisp, and more)",
            "New option to detect and remove newsletter signup modals",
            "Added support for social proof popup detection (Fomo, ProveSource)",
            "Performance improvements: 30% faster AI processing",
        ],
    },
    {
        version: "2.4.0",
        date: "January 25, 2026",
        title: "PDF Generation Enhancements",
        description: "New PDF options including custom headers/footers, page breaks, and improved print styling.",
        type: "feature",
        changes: [
            "Added custom header and footer template support",
            "New pageNumber and totalPages variables for footers",
            "Improved CSS @media print handling",
            "Added page break control options",
            "Better web font rendering in PDFs",
        ],
    },
    {
        version: "2.3.2",
        date: "January 15, 2026",
        title: "Mobile Screenshot Improvements",
        description: "Enhanced mobile device emulation and viewport handling for more accurate mobile screenshots.",
        type: "improvement",
        changes: [
            "Updated iPhone device presets to iPhone 15 Pro dimensions",
            "Added iPad Pro preset",
            "Improved touch-scroll behavior emulation",
            "Better handling of mobile-specific CSS media queries",
            "Fixed viewport meta tag parsing issues",
        ],
    },
    {
        version: "2.3.1",
        date: "January 8, 2026",
        title: "Bug Fixes & Stability",
        description: "Various bug fixes and stability improvements based on customer feedback.",
        type: "fix",
        changes: [
            "Fixed timeout handling for slow-loading pages",
            "Resolved issue with custom CSS injection timing",
            "Fixed edge case in full-page screenshot height calculation",
            "Improved error messages for invalid URL formats",
            "Better handling of redirects during capture",
        ],
    },
    {
        version: "2.3.0",
        date: "December 20, 2025",
        title: "New Device Mockup Frames",
        description: "Added new premium device mockup options including MacBook Pro and browser themes.",
        type: "feature",
        changes: [
            "New MacBook Pro (M3) mockup frame",
            "Added dark theme browser mockup",
            "New Safari browser frame option",
            "Improved shadow rendering on all mockups",
            "Added custom background color option for mockups",
        ],
    },
    {
        version: "2.2.0",
        date: "December 5, 2025",
        title: "Batch Processing API",
        description: "New endpoint for efficient batch screenshot processing with improved rate limits.",
        type: "feature",
        changes: [
            "New /batch endpoint for multiple URL processing",
            "Parallel processing with configurable concurrency",
            "Progress tracking via webhook callbacks",
            "Improved rate limiting for batch operations",
            "Better error handling and partial failure recovery",
        ],
    },
    {
        version: "2.1.1",
        date: "November 28, 2025",
        title: "Security Update",
        description: "Important security improvements and vulnerability patches.",
        type: "security",
        changes: [
            "Updated dependency packages with security patches",
            "Improved input validation for URL parameters",
            "Enhanced API key hashing algorithm",
            "Added rate limiting for authentication endpoints",
            "Improved logging for security events",
        ],
    },
    {
        version: "2.1.0",
        date: "November 15, 2025",
        title: "Scrolling Screenshot Support",
        description: "Capture scrolling/animated screenshots with our new viewport scroll option.",
        type: "feature",
        changes: [
            "New scrollTo option for capturing below-fold content",
            "Smooth scroll animation before capture",
            "Fixed-position header handling",
            "Lazy-load image triggering",
            "Improved full-page capture accuracy",
        ],
    },
];

const typeConfig = {
    feature: {
        icon: Sparkles,
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        label: "New Feature",
    },
    improvement: {
        icon: Zap,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        label: "Improvement",
    },
    fix: {
        icon: Bug,
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        label: "Bug Fix",
    },
    security: {
        icon: Shield,
        color: "bg-red-500/10 text-red-600 dark:text-red-400",
        badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        label: "Security",
    },
};

export default function ChangelogPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Changelog", url: `${BASE_URL}/changelog` },
    ];

    return (
        <GuestLayout>
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Badge className="mb-4">Product Updates</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Changelog
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Stay up to date with the latest features, improvements, and bug fixes
                            in Screenshotly.
                        </p>
                    </div>

                    {/* Changelog Timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

                        {/* Entries */}
                        <div className="space-y-12">
                            {changelog.map((entry, index) => {
                                const config = typeConfig[entry.type];
                                const IconComponent = config.icon;

                                return (
                                    <div key={entry.version} className="relative">
                                        {/* Timeline dot */}
                                        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary" />

                                        <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right md:mr-8' : 'md:pl-1/2 md:ml-8'}`}>
                                            <div className={`bg-card border rounded-xl p-6 ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}>
                                                {/* Version & Date */}
                                                <div className={`flex items-center gap-3 mb-3 flex-wrap ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                                                    <Badge variant="outline">{entry.version}</Badge>
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.badge}`}>
                                                        <IconComponent className="w-3 h-3" />
                                                        {config.label}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {entry.date}
                                                    </span>
                                                </div>

                                                {/* Title & Description */}
                                                <h2 className="text-xl font-bold mb-2">{entry.title}</h2>
                                                <p className="text-muted-foreground mb-4">{entry.description}</p>

                                                {/* Changes */}
                                                <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                                                    {entry.changes.map((change, i) => (
                                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                            <span className="text-primary mt-1">•</span>
                                                            <span>{change}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center bg-primary/10 rounded-2xl p-12">
                        <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-4">
                            Try the Latest Features
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Get started with 100 free screenshots. Experience all our latest
                            improvements firsthand.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link href="/sign-up">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link href="/help">
                                    View Documentation
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
