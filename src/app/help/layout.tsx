import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Help Center - Screenshot API Documentation & Support",
    description: "Get help with Screenshotly screenshot API. Find answers in our documentation, FAQs, and contact support for personalized assistance.",
    keywords: [
        "screenshot API help",
        "screenshot API documentation",
        "screenshotly support",
        "API troubleshooting",
        "screenshot API FAQ",
    ],
    alternates: {
        canonical: "/help",
    },
};

export default function HelpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
