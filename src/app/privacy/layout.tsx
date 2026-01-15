import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - How We Protect Your Data",
    description: "Learn how Screenshotly collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
    keywords: [
        "privacy policy",
        "data protection",
        "screenshotly privacy",
        "API privacy",
    ],
    alternates: {
        canonical: "/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
