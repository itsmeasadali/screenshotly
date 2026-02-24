import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@/components/analytics";
import { WebVitalsReporter } from "@/components/performance";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Screenshot API for Developers - AI-Powered Captures | Screenshotly",
    template: "%s | Screenshotly",
  },
  description: "REST API for automated website screenshots. AI-powered element removal, device mockups, and PNG/JPEG/PDF output. 100 free screenshots — no credit card required.",
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
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Screenshotly",
    title: "Screenshot API for Developers | Screenshotly",
    description: "REST API for automated website screenshots with AI-powered element removal and device mockups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Screenshot API for Developers | Screenshotly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Screenshot API for Developers | Screenshotly",
    description: "REST API for automated website screenshots with AI-powered element removal and device mockups.",
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
    languages: {
      'en': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  category: "Technology",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'contact:phone_number': '+1-281-506-0216',
    'contact:postal_address': '10685-B Hazelhurst Dr. # 21148, Houston, TX 77043, USA',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Screenshotly',
    'application-name': 'Screenshotly',
    'msapplication-TileColor': '#8b5cf6',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#8b5cf6',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.screenshotly.app" />
      </head>
      <body className={`${GeistSans.className} ${GeistMono.variable}`}>
        <ClerkProvider>
          <GoogleAnalytics />
          <WebVitalsReporter />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
