import { Metadata } from 'next';
import { Maximize2, Zap, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FullPageScreenshotClient from './FullPageScreenshotClient';

export const metadata: Metadata = {
    title: 'Free Full Page Screenshot Tool - Capture Entire Webpages | Screenshotly',
    description: 'Capture full-length screenshots of entire web pages for free. Our scrolling screenshot tool captures everything from header to footer, no signup required.',
    keywords: ['full page screenshot', 'entire page screenshot', 'scrolling screenshot', 'long screenshot', 'webpage capture', 'full length screenshot'],
    openGraph: {
        title: 'Free Full Page Screenshot Tool | Screenshotly',
        description: 'Capture complete, scrolling screenshots of entire web pages instantly. Free, no signup required.',
        type: 'website',
    },
};

const features = [
    {
        icon: Maximize2,
        title: 'Capture Everything',
        description: 'Automatically scrolls and captures the entire page from top to bottom.',
    },
    {
        icon: Globe,
        title: 'Any Website',
        description: 'Works with any public website - blogs, landing pages, documentation, and more.',
    },
    {
        icon: Zap,
        title: 'Instant Results',
        description: 'Get your full-page screenshot in seconds, ready to download.',
    },
];

const useCases = [
    {
        title: 'Design Reviews',
        description: 'Capture complete page designs for stakeholder review and feedback.',
    },
    {
        title: 'Documentation',
        description: 'Screenshot entire tutorials and guides for offline reference.',
    },
    {
        title: 'Legal Archival',
        description: 'Preserve complete web pages for compliance and legal records.',
    },
    {
        title: 'Competitive Analysis',
        description: 'Capture competitor landing pages and marketing materials in full.',
    },
];

export default function FullPageScreenshotToolPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                            <Maximize2 className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-300 text-sm font-medium">Full Page Capture</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Capture{' '}
                            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Entire Web Pages
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            Take full-length, scrolling screenshots of any website. Capture everything from header to footer in one seamless image.
                        </p>
                    </div>

                    {/* Screenshot Tool */}
                    <FullPageScreenshotClient />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
                            >
                                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-16 px-4 bg-gray-800/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Perfect For
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Full-page screenshots are essential for many professional workflows
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <h3 className="font-semibold text-white">{useCase.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API CTA Section */}
            <section className="py-16 px-4 border-t border-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Need Full-Page Screenshots at Scale?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Our API captures complete pages programmatically with AI element removal,
                        device mockups, and more. Get 100 free screenshots to start.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/sign-up"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Get Free API Key
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/help"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
                        >
                            View Documentation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Screenshotly Full Page Screenshot Tool',
                        applicationCategory: 'UtilityApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        description: 'Free tool to capture full-length, scrolling screenshots of entire web pages.',
                        featureList: [
                            'Full page capture',
                            'Automatic scrolling',
                            'PNG export',
                            'No signup required',
                        ],
                    }),
                }}
            />
        </div>
    );
}
