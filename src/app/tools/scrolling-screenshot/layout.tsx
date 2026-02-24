import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Scrolling Screenshot Tool - Capture Below-Fold Content',
    description: 'Take a scrolling screenshot of any website for free. Choose PNG, JPEG, or WebP output and set a custom viewport. No signup required.',
    alternates: { canonical: '/tools/scrolling-screenshot' },
};

export default function ScrollingScreenshotLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
