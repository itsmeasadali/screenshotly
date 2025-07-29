'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { Camera } from 'lucide-react';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Minimal footer for authenticated users */}
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Screenshotly</span>
            </Link>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
              <Link href="/status" className="text-muted-foreground hover:text-foreground transition-colors">
                Status
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
              <span className="text-muted-foreground">© 2024 Screenshotly</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 