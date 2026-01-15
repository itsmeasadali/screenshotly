import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy - How We Use Cookies",
    description: "Understand how Screenshotly uses cookies and similar technologies. Your choices and how to manage your preferences.",
    keywords: [
        "cookie policy",
        "cookies",
        "tracking",
        "privacy",
    ],
    alternates: {
        canonical: "/cookies",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CookiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
