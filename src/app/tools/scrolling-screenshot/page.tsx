import Link from 'next/link';
import { Camera } from 'lucide-react';
import GuestLayout from '@/components/layouts/GuestLayout';
import { JsonLd } from '@/components/seo';
import { getBreadcrumbSchema, getHowToSchema, getFAQSchema } from '@/lib/seo/structured-data';
import ScrollingScreenshotClient from './ScrollingScreenshotClient';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

const faqs = [
    {
        question: "How does a scrolling screenshot work?",
        answer: "The tool renders the target webpage in a real browser, automatically scrolls through all content from header to footer, and stitches the result into a single continuous image. You get the entire page — including content below the fold — in one file.",
    },
    {
        question: "Is this scrolling screenshot tool free?",
        answer: "Yes, completely free with no signup required. For automated or bulk captures, our API starts with 100 free screenshots and paid plans from $14/mo.",
    },
    {
        question: "What formats can I download?",
        answer: "You can download scrolling screenshots in PNG (lossless, best quality), JPEG (smaller file size), or WebP (modern, compact format). Select your preferred format before capturing.",
    },
    {
        question: "Can I set a custom viewport size?",
        answer: "Yes. Open the Advanced Options panel to set a custom viewport width (320–3840 px) and height (240–3840 px). This lets you capture the page as it appears on any screen size — desktop, tablet, or mobile.",
    },
    {
        question: "What is the difference between a scrolling screenshot and a regular screenshot?",
        answer: "A regular screenshot captures only the visible viewport. A scrolling screenshot captures the entire page including all scrollable content, producing a much taller image that shows the full layout from top to bottom.",
    },
];

export default function ScrollingScreenshotPage() {
    const breadcrumbs = [
        { name: "Home", url: BASE_URL },
        { name: "Tools", url: `${BASE_URL}/tools` },
        { name: "Scrolling Screenshot", url: `${BASE_URL}/tools/scrolling-screenshot` },
    ];

    const howToSteps = [
        { name: "Enter a URL", text: "Paste any public website URL into the input field." },
        { name: "Choose format and options", text: "Select PNG, JPEG, or WebP. Optionally set a custom viewport width and height." },
        { name: "Click Capture", text: "Press the capture button. The tool renders the full page and returns a single image." },
        { name: "Download your screenshot", text: "Preview the result and download it to your device." },
    ];

    return (
        <GuestLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
            <JsonLd data={getFAQSchema(faqs)} />
            <JsonLd data={getHowToSchema({
                name: "How to take a scrolling screenshot of a website",
                description: "Capture the entire scrollable content of any webpage as a single high-resolution image using a free online tool.",
                totalTime: "PT30S",
                steps: howToSteps,
            })} />

            {/* Hero Section */}
            <section className="pt-20 pb-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-6">
                        Free Scrolling Screenshot Tool
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Capture{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Scrolling Screenshots
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
                        Capture the entire scrollable content of any webpage as a single high-resolution image.
                        No signup required.
                    </p>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        This tool renders the full page — including all content below the fold — into one
                        continuous screenshot. Set a custom viewport width and height to match any device or screen size.
                    </p>
                </div>
            </section>

            {/* Tool Section */}
            <section className="pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <ScrollingScreenshotClient />
                </div>
            </section>

            {/* Features */}
            <section className="pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">
                        Why Use Scrolling Screenshots?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Product Demos',
                                description: 'Show your entire landing page or app interface in one continuous image.',
                                icon: '🎬',
                            },
                            {
                                title: 'Social Media',
                                description: 'Create tall images for Pinterest, Instagram Stories, and other platforms.',
                                icon: '📱',
                            },
                            {
                                title: 'Presentations',
                                description: 'Include full-page views in slides, docs, and client decks.',
                                icon: '📊',
                            },
                            {
                                title: 'Bug Reports',
                                description: 'Capture the full context of issues including below-fold content.',
                                icon: '🐛',
                            },
                            {
                                title: 'Portfolio',
                                description: 'Showcase complete website designs in a single image file.',
                                icon: '🎨',
                            },
                            {
                                title: 'Documentation',
                                description: 'Create visual guides that show the full page layout at once.',
                                icon: '📚',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors"
                            >
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                                <p className="text-slate-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scrolling vs Full Page vs Regular */}
            <section className="pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        Scrolling Screenshot vs Full Page Screenshot vs Regular Screenshot
                    </h2>
                    <div className="text-slate-400 space-y-4 leading-relaxed">
                        <p>
                            A <strong className="text-white">regular (viewport) screenshot</strong> captures only
                            what is visible on screen — typically the top 800–1080 pixels. Content below the fold
                            is cut off. Use the{' '}
                            <Link href="/tools/website-screenshot" className="text-purple-400 hover:underline">
                                standard screenshot tool
                            </Link>{' '}
                            when you only need the above-fold view.
                        </p>
                        <p>
                            A <strong className="text-white">full page screenshot</strong> renders the entire
                            document as a single image. It is optimized for archival and documentation — capturing
                            every pixel from header to footer without configuration. Use the{' '}
                            <Link href="/tools/full-page-screenshot" className="text-purple-400 hover:underline">
                                full page screenshot tool
                            </Link>{' '}
                            for one-click complete captures.
                        </p>
                        <p>
                            A <strong className="text-white">scrolling screenshot</strong> (this tool) gives you
                            fine-grained control: set a custom viewport width and height, choose your output
                            format, and preview the result before downloading. It is built for visual storytelling —
                            creating tall images for Pinterest, Instagram Stories, portfolio showcases, and client
                            presentations where layout and aspect ratio matter as much as content coverage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Creative Uses */}
            <section className="pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                        Creative Uses for Scrolling Screenshots
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
                            <h3 className="font-medium text-white mb-2">Pinterest Pins</h3>
                            <p className="text-slate-400 text-sm">Tall images perform best on Pinterest. Set a narrow viewport (600–800 px) to create elongated captures that dominate the feed.</p>
                        </div>
                        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
                            <h3 className="font-medium text-white mb-2">Client Presentations</h3>
                            <p className="text-slate-400 text-sm">Include full-page scrolling screenshots in slide decks and Notion docs to show stakeholders the complete layout without links.</p>
                        </div>
                        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
                            <h3 className="font-medium text-white mb-2">Design Portfolio</h3>
                            <p className="text-slate-400 text-sm">Showcase complete website designs in Behance or Dribbble projects as a single continuous image that highlights scroll-based interactions.</p>
                        </div>
                        <div className="p-5 bg-slate-800/30 rounded-xl border border-slate-700">
                            <h3 className="font-medium text-white mb-2">Before/After Comparisons</h3>
                            <p className="text-slate-400 text-sm">Capture a scrolling screenshot before and after a redesign to compare full layouts side by side in design reviews.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-links */}
            <section className="pb-12 px-4">
                <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center text-sm">
                    <Link href="/tools/website-screenshot" className="text-purple-400 hover:underline">Standard screenshot</Link>
                    <span className="text-slate-600">·</span>
                    <Link href="/tools/full-page-screenshot" className="text-purple-400 hover:underline">Full page screenshot</Link>
                    <span className="text-slate-600">·</span>
                    <Link href="/use-cases/bug-tracking" className="text-purple-400 hover:underline">Bug tracking use case</Link>
                    <span className="text-slate-600">·</span>
                    <Link href="/use-cases/portfolio-showcase" className="text-purple-400 hover:underline">Portfolio showcase</Link>
                    <span className="text-slate-600">·</span>
                    <Link href="/blog/getting-started-with-screenshot-api" className="text-purple-400 hover:underline">API getting started</Link>
                </div>
            </section>

            {/* API Section */}
            <section className="pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/30 p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Need Scrolling Screenshots at Scale?
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Our API supports full-page screenshot capture with custom viewports,
                            AI element removal, and device mockups. Automate captures in your CI/CD pipeline or app.
                        </p>

                        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm mb-6">
                            <code className="text-slate-300">{`const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    format: 'png',
    fullPage: true,
    width: 1280,
    height: 800,
  }),
});`}</code>
                        </pre>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/sign-up"
                                className="px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                Get Free API Key
                            </Link>
                            <Link
                                href="/integrations"
                                className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Integration Guides
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Tools */}
            <section className="pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xl font-bold text-white mb-6">More Free Tools</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/tools/website-screenshot"
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4" />
                            Website Screenshot
                        </Link>
                        <Link
                            href="/tools/full-page-screenshot"
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4" />
                            Full Page Screenshot
                        </Link>
                    </div>
                </div>
            </section>

            {/* WebApplication Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Screenshotly Scrolling Screenshot Tool',
                        applicationCategory: 'UtilityApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        description: 'Free tool to capture entire scrollable web pages as a single high-resolution image.',
                        featureList: [
                            'Full page scrolling capture',
                            'PNG, JPEG, and WebP output',
                            'Custom viewport width and height',
                            'No signup required',
                        ],
                    }),
                }}
            />
        </div>
        </GuestLayout>
    );
}
