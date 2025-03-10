'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Screenshotly" width={24} height={24} className="text-primary" />
            <span className="text-xl font-bold">Screenshotly</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/playground" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Playground
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="https://docs.screenshotly.app" className="text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link 
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>
                  Get Started
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 