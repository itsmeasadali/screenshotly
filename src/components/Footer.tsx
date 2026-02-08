'use client';

import Link from 'next/link';
import { Camera, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Screenshotly</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered screenshot API for modern applications. Clean, professional screenshots with smart element removal.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <nav className="space-y-2">
              <Link href="/playground" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Try Demo
              </Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Docs
              </Link>
              <Link href="/status" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                System Status
              </Link>
              <Link href="https://docs.screenshotly.app" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                Full Docs
                <ExternalLink className="w-3 h-3" />
              </Link>
            </nav>
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Use Cases</h3>
            <nav className="space-y-2">
              <Link href="/use-cases/documentation-screenshots" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/use-cases/social-media-previews" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Social Previews
              </Link>
              <Link href="/use-cases/automated-testing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Visual Testing
              </Link>
              <Link href="/use-cases" className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                View All →
              </Link>
            </nav>
          </div>

          {/* Integrations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Integrations</h3>
            <nav className="space-y-2">
              <Link href="/integrations/javascript" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                JavaScript
              </Link>
              <Link href="/integrations/python" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Python
              </Link>
              <Link href="/integrations/nodejs" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Node.js
              </Link>
              <Link href="/integrations" className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                View All →
              </Link>
            </nav>
          </div>

          {/* Compare */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Compare</h3>
            <nav className="space-y-2">
              <Link href="/compare/puppeteer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                vs Puppeteer
              </Link>
              <Link href="/compare/playwright" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                vs Playwright
              </Link>
              <Link href="/compare/screenshotapi" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                vs ScreenshotAPI
              </Link>
              <Link href="/compare" className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                View All →
              </Link>
            </nav>
          </div>

          {/* Free Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Free Tools</h3>
            <nav className="space-y-2">
              <Link href="/tools/website-screenshot" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Website Screenshot
              </Link>
              <Link href="/tools/full-page-screenshot" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Full Page Screenshot
              </Link>
              <Link href="/tools/scrolling-screenshot" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Scrolling Screenshot
              </Link>
              <Link href="/playground" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Playground
              </Link>
              <Link href="/tools" className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                All Tools →
              </Link>
            </nav>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <nav className="space-y-2">
              <Link href="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/topics" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Topics & Guides
              </Link>
              <Link href="/customers" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Customers
              </Link>
              <Link href="/changelog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Changelog
              </Link>
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
              <Link href="/gdpr" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                GDPR
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2026 Screenshotly. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-foreground fill-current" />
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 