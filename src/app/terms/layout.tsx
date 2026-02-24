import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - Screenshot API Usage Agreement",
    description: "Terms and conditions for using Screenshotly screenshot API. Understand your rights, responsibilities, and our service guarantees.",
    alternates: {
        canonical: "/terms",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
