'use client';

import Header from '@/components/Header';
import { SEOFooter } from '@/components/seo';

interface GuestLayoutProps {
  children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <SEOFooter />
    </div>
  );
} 