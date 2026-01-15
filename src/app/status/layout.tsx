import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Status - Screenshot API Uptime & Performance",
    description: "Real-time status of Screenshotly screenshot API services. Check uptime, response times, and scheduled maintenance.",
    keywords: [
        "API status",
        "screenshotly uptime",
        "API health",
        "service status",
    ],
    alternates: {
        canonical: "/status",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function StatusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
