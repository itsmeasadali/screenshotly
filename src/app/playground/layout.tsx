import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Screenshot Playground - Test Our API Live",
    description: "Try Screenshotly's screenshot API instantly. Configure device mockups, AI element removal, and output formats. No signup required for testing.",
    keywords: [
        "screenshot API demo",
        "try screenshot API",
        "screenshot API playground",
        "test website screenshot",
        "live screenshot demo",
        "API testing tool",
    ],
    alternates: {
        canonical: "/playground",
    },
    openGraph: {
        title: "Screenshot Playground | Screenshotly",
        description: "Test our screenshot API live with device mockups and AI element removal.",
        type: "website",
    },
};

export default function PlaygroundLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
