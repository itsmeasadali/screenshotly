'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Brain, Sparkles, Zap, 
  ShieldCheck, Laptop, Target 
} from 'lucide-react';

interface HomeContentProps {
  userId?: string | null;
}

export default function HomeContent({ userId }: HomeContentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-black">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/80">Powered by AI</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white">
              AI-Powered Screenshots
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-gray-300">
              Capture clean, professional screenshots with AI that automatically removes distracting elements like cookie banners, ads, and popups.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {userId ? (
                <Button size="lg" asChild className="min-w-[160px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="min-w-[160px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Link href="/sign-up">
                    Start Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
              <Button 
                size="lg" 
                variant="secondary" 
                asChild 
                className="min-w-[160px] bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 backdrop-blur-sm"
              >
                <Link href="/playground">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">AI-Powered Features</h2>
            <p className="text-gray-600">
              Our intelligent screenshot API uses advanced AI to deliver clean, professional results every time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl border bg-gradient-to-br from-blue-50 to-white shadow-sm">
              <Brain className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Element Detection</h3>
              <p className="text-gray-600">
                AI automatically identifies and removes cookie banners, ads, chat widgets, and other distracting elements.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-gradient-to-br from-purple-50 to-white shadow-sm">
              <Target className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Confidence Controls</h3>
              <p className="text-gray-600">
                Fine-tune element removal with adjustable confidence thresholds for precise control over your screenshots.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-gradient-to-br from-indigo-50 to-white shadow-sm">
              <Laptop className="w-10 h-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Device Mockups</h3>
              <p className="text-gray-600">
                Present your screenshots in beautiful device frames - browsers, phones, and laptops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Simple to Integrate</h2>
                <p className="text-gray-600 mb-8">
                  Clean up any webpage with just a few lines of code. Our AI handles the rest.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span>Secure API with token authentication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span>Fast response times</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <span>AI-powered element removal</span>
                  </div>
                </div>
              </div>
              <div className="bg-black rounded-xl p-6 shadow-xl">
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`const response = await fetch('https://api.screenshotly.app/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    aiRemoval: {
      enabled: true,
      types: ['cookie-banner', 'ad', 'chat-widget'],
      confidence: 0.8
    }
  })
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-white/80 mb-8">
              Start capturing clean, professional screenshots in minutes.
            </p>
            {userId ? (
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-white/90">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-white/90">
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 