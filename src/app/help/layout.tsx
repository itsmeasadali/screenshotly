import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Help Center - Screenshot API Documentation & Support",
    description: "Get help with Screenshotly screenshot API. Find answers in our documentation, FAQs, and contact support for personalized assistance.",
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
