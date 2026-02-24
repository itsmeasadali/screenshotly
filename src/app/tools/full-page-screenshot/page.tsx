import { Metadata } from 'next';
import { Maximize2, Zap, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from '@/components/seo';
import { getBreadcrumbSchema, getHowToSchema, getFAQSchema } from '@/lib/seo/structured-data';
import FullPageScreenshotClient from './FullPageScreenshotClient';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
    title: 'Free Full Page Screenshot Tool - Header to Footer Capture',
    description: 'Capture a full page screenshot of any website for free. Renders the complete page from header to footer as a single PNG image. No signup required.',
    alternates: {
        canonical: '/tools/full-page-screenshot',
    },
    openGraph: {
        title: 'Free Full Page Screenshot Tool',
        description: 'Capture a full page screenshot of any website from header to footer. Free, no signup required.',
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
        description: 'Capture complete page designs from header to footer so stakeholders review the full layout without scrolling through a live URL. Includes lazy-loaded sections that viewport-only captures miss.',
    },
    {
        title: 'Documentation',
        description: 'Screenshot entire tutorials and guides as single images for offline reference or PDF embedding. Full-page capture ensures code blocks, diagrams, and footnotes at the bottom are included.',
    },
    {
        title: 'Legal Archival',
        description: 'Preserve complete web pages as timestamped evidence for compliance and legal records. Full-page captures are more defensible than viewport-only screenshots because they include all page content.',
    },
    {
        title: 'Competitive Analysis',
        description: 'Capture competitor landing pages from hero section through footer CTAs in a single image. Full-page view reveals pricing tiers, feature lists, and social proof placement that viewport captures cut off.',
    },
];

const faqs = [
    {
        question: "How do I take a full page screenshot of a website?",
        answer: "Paste any public URL into the tool above and click capture. The tool automatically scrolls the entire page and stitches the result into one seamless image you can download as PNG.",
    },
    {
        question: "Is this full page screenshot tool free?",
        answer: "Yes, completely free with no signup required. For automated or bulk captures, our API starts with 100 free screenshots and paid plans from $14/mo.",
    },
    {
        question: "What's the maximum page length I can capture?",
        answer: "There is no hard limit on page length. The tool scrolls the entire page from header to footer regardless of length. Very long pages may take a few extra seconds to process.",
    },
];

export default function FullPageScreenshotToolPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Full Page Screenshot", url: `${BASE_URL}/tools/full-page-screenshot` },
    ];

    const howToSteps = [
        { name: "Enter the URL", text: "Paste any public website URL into the input field." },
        { name: "Click Capture", text: "Press the capture button to start the full-page screenshot process." },
        { name: "Download your screenshot", text: "Once complete, download the full-length screenshot as a PNG image." },
    ];

    return (
        <GuestLayout>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />
            <JsonLd data={getHowToSchema({
                name: "How to take a full page screenshot",
                description: "Capture an entire web page from header to footer in one seamless screenshot image.",
                totalTime: "PT30S",
                steps: howToSteps,
            })} />
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
                            Free{' '}
                            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Full Page Screenshot
                            </span>
                            {' '}Tool
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            A full page screenshot captures the complete content of any web page — from
                            header to footer — as a single image. Paste a URL below and download your screenshot in seconds.
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

            {/* FAQ Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How Full Page Capture Works */}
            <section className="py-16 px-4 border-t border-gray-800">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        How Full Page Capture Works
                    </h2>
                    <div className="text-gray-400 space-y-4 leading-relaxed">
                        <p>
                            A standard viewport screenshot only captures what is visible on screen — typically
                            the top 900–1080 pixels. A full page screenshot, by contrast, renders the entire
                            document height, scrolling from the first pixel of the header to the last pixel
                            of the footer, and stitches the result into one seamless image.
                        </p>
                        <p>
                            Screenshotly uses a headless Chromium browser to render the page exactly as a real
                            visitor would see it, including lazy-loaded images, web fonts, and CSS animations.
                            Once the page is fully loaded, the viewport expands to match the document height
                            and a single rasterized PNG is returned.
                        </p>
                    </div>
                </div>
            </section>

            {/* Full Page vs Scrolling vs Standard */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        Full Page vs Scrolling vs Standard Screenshot
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-orange-300 mb-3">Full Page (this tool)</h3>
                            <p className="text-gray-400 text-sm">
                                One-click capture of the entire document from header to footer. Optimized for
                                archival, compliance, and documentation where you need every pixel without configuration.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                            <Link href="/tools/scrolling-screenshot" className="text-lg font-semibold text-purple-300 mb-3 block hover:underline">Scrolling Screenshot</Link>
                            <p className="text-gray-400 text-sm">
                                Full-page capture with custom viewport width, height, and format selection. Built
                                for visual storytelling — Pinterest pins, portfolio showcases, and client presentations.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                            <Link href="/tools/website-screenshot" className="text-lg font-semibold text-blue-300 mb-3 block hover:underline">Standard Screenshot</Link>
                            <p className="text-gray-400 text-sm">
                                Captures only the visible viewport (above-fold content). Best for link previews,
                                thumbnail galleries, and quick visual checks where file size and speed matter.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        Tips for Better Full Page Screenshots
                    </h2>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Wait for lazy content.</strong> Pages with infinite scroll or lazy-loaded sections may need extra load time. The API&apos;s <code className="text-orange-300">delay</code> parameter lets you wait before capture.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Remove popups automatically.</strong> Enable AI element removal to strip cookie banners, chat widgets, and modals that obscure the screenshot.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Choose the right width.</strong> Set the viewport width to match your target audience — 1440 px for desktop design reviews, 375 px for mobile documentation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Use PNG for archival, JPEG for sharing.</strong> PNG preserves every pixel and supports transparency; JPEG produces smaller files for email and chat.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Internal Links */}
            <section className="py-8 px-4">
                <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center text-sm">
                    <Link href="/tools/website-screenshot" className="text-orange-400 hover:underline">Standard screenshot tool</Link>
                    <span className="text-gray-600">·</span>
                    <Link href="/tools/scrolling-screenshot" className="text-orange-400 hover:underline">Scrolling screenshot tool</Link>
                    <span className="text-gray-600">·</span>
                    <Link href="/use-cases/documentation-screenshots" className="text-orange-400 hover:underline">Documentation use case</Link>
                    <span className="text-gray-600">·</span>
                    <Link href="/use-cases/web-archiving" className="text-orange-400 hover:underline">Web archiving use case</Link>
                    <span className="text-gray-600">·</span>
                    <Link href="/blog/getting-started-with-screenshot-api" className="text-orange-400 hover:underline">Getting started guide</Link>
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
        </GuestLayout>
    );
}
