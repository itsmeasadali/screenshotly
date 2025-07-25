'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Brain, Sparkles, Zap, 
  ShieldCheck, Target, Eye, 
  Code, Wand2, Camera, Database,
  Star, Users, TrendingUp,
  Smartphone, Monitor, Globe, Lock, Clock
} from 'lucide-react';

interface HomeContentProps {
  userId?: string | null;
}

const features = [
  {
    icon: Brain,
    title: "AI Element Removal",
    description: "Automatically removes cookie banners, ads, and distracting elements",
  },
  {
    icon: Smartphone,
    title: "Device Mockups",
    description: "Beautiful frames for phones, tablets, laptops, and browsers",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with global CDN and smart caching",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "99.9% uptime with servers across multiple regions",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption",
  },
  {
    icon: Code,
    title: "Developer First",
    description: "RESTful API with comprehensive documentation and SDKs",
  }
];

const useCases = [
  {
    icon: Database,
    title: "Training Data",
    description: "Clean screenshots for ML model training",
    metric: "10M+",
    metricLabel: "screenshots processed"
  },
  {
    icon: Eye,
    title: "Vision Models",
    description: "Perfect input for GPT-4 Vision and similar AIs",
    metric: "99.5%",
    metricLabel: "accuracy improvement"
  },
  {
    icon: Wand2,
    title: "Automation",
    description: "Automated documentation and testing",
    metric: "75%",
    metricLabel: "time saved"
  },
  {
    icon: Target,
    title: "Marketing",
    description: "Professional assets for app stores",
    metric: "3x",
    metricLabel: "conversion boost"
  }
];

const stats = [
  { icon: Users, value: "50K+", label: "Developers" },
  { icon: Camera, value: "100M+", label: "Screenshots" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime" },
  { icon: Star, value: "4.9/5", label: "Rating" }
];

export default function HomeContent({ userId }: HomeContentProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-4 py-32 text-center">
        <div className="container mx-auto max-w-5xl">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Screenshots
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Screenshot API for{" "}
            <span className="text-primary">Modern Applications</span>
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto">
            Capture clean, professional screenshots with AI that automatically removes distracting elements. 
            Perfect for AI training, documentation, and marketing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {userId ? (
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Start Building Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild>
              <Link href="/playground">
                <Camera className="w-4 h-4 mr-2" />
                Try Demo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Everything you need for perfect screenshots
            </h2>
            <p className="text-xl text-muted-foreground">
              Built for developers, designers, and AI engineers who demand quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Brain className="w-4 h-4 mr-2" />
              AI & Machine Learning
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Built for the AI-first world
            </h2>
            <p className="text-xl text-muted-foreground">
              Clean, distraction-free screenshots perfect for training models and building intelligent applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{useCase.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary">{useCase.metric}</div>
                  <div className="text-xs text-muted-foreground">{useCase.metricLabel}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="px-4 py-24 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Code className="w-4 h-4 mr-2" />
                Developer Experience
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Simple integration, powerful results
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get started in minutes with our RESTful API. Clean documentation, comprehensive SDKs, and responsive support.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: ShieldCheck, text: "Secure API with token authentication" },
                  { icon: Clock, text: "Sub-second response times globally" },
                  { icon: Brain, text: "AI-powered element removal" },
                  { icon: Monitor, text: "Multiple device mockups included" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <Button asChild>
                <Link href="/docs">
                  View Documentation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground ml-2">API Example</span>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto">
                  <code>{`const response = await fetch('/api/screenshot', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
    device: 'iphone-14',
    aiRemoval: {
      enabled: true,
      confidence: 0.8
    },
    format: 'png',
    quality: 95
  })
});

const screenshot = await response.blob();`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to capture perfect screenshots?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers building amazing applications with our AI-powered screenshot API.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {userId ? (
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sign-up">
                  Start Building Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 