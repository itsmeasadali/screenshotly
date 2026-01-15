'use client';

import Link from 'next/link';
import { Camera, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
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
              <Link href="https://docs.screenshotly.app" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                Documentation
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 Screenshotly. All rights reserved.
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