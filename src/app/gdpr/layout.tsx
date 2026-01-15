import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GDPR Compliance - Your Data Protection Rights",
    description: "Learn about your GDPR rights with Screenshotly. How we comply with EU data protection regulations and your privacy choices.",
    keywords: [
        "GDPR",
        "data protection",
        "EU privacy",
        "data rights",
    ],
    alternates: {
        canonical: "/gdpr",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function GDPRLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
