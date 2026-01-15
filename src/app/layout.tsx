import { GeistMono } from "geist/font/mono";
import { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Screenshotly - Screenshot API for Developers | Automated Website Captures",
    template: "%s | Screenshotly",
  },
  description: "Powerful REST API for capturing website screenshots programmatically. Clean screenshots with AI-powered element removal, device mockups, and multiple formats. Perfect for testing automation, documentation, and content creation.",
  keywords: [
    "screenshot API",
    "website screenshot",
    "automated screenshots",
    "screenshot service",
    "URL to image",
    "webpage capture",
    "screenshot tool",
    "developer API",
    "screenshot automation",
    "headless browser",
    "puppeteer alternative",
  ],
  authors: [{ name: "Screenshotly" }],
  creator: "Screenshotly",
  publisher: "Screenshotly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Screenshotly",
    title: "Screenshotly - Screenshot API for Developers",
    description: "Powerful REST API for capturing website screenshots with AI-powered element removal and device mockups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Screenshotly - Screenshot API for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Screenshotly - Screenshot API for Developers",
    description: "Powerful REST API for capturing website screenshots with AI-powered element removal and device mockups.",
    images: ["/og-image.png"],
    creator: "@screenshotly",
    site: "@screenshotly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "Technology",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/logo.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        </head>
        <body className={GeistMono.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
