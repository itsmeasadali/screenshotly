import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scrolling Screenshot Tool - Capture Full Page Animations | Screenshotly',
    description: 'Create scrolling screenshots and animated GIFs of full web pages. Capture smooth scroll animations for demos, documentation, and presentations.',
    alternates: { canonical: '/tools/scrolling-screenshot' },
    keywords: [
        'scrolling screenshot',
        'animated screenshot',
        'full page gif',
        'website scroll capture',
        'scroll animation tool',
    ],
};

export default function ScrollingScreenshotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
