'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Brain, Sparkles, Zap, 
  ShieldCheck, Target, Eye, 
  Code, Wand2, Camera, Database,
  Users, TrendingUp,
  Smartphone, Monitor, Globe, Clock,
  CheckCircle, PlayCircle, FileText, Layers, 
  Settings, BarChart3, Rocket, Shield
} from 'lucide-react';

interface HomeContentProps {
  userId?: string | null;
}

const features = [
  {
    icon: Brain,
    title: "AI Element Removal",
    description: "Automatically removes cookie banners, ads, popups, and distracting elements using advanced computer vision",
    highlight: "99.5% accuracy"
  },
  {
    icon: Smartphone,
    title: "Device Mockups",
    description: "Beautiful frames for iPhone, iPad, MacBook, browsers, and custom devices with pixel-perfect positioning",
    highlight: "15+ templates"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-second response times with global CDN, smart caching, and optimized rendering pipeline",
    highlight: "<800ms avg"
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Multi-region deployment with automatic failover and 99.9% uptime SLA guarantee",
    highlight: "5 continents"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II compliant with end-to-end encryption, secure token authentication, and GDPR compliance",
    highlight: "SOC 2 certified"
  },
  {
    icon: Code,
    title: "Developer Experience",
    description: "RESTful API with OpenAPI specs, SDKs for popular languages, webhooks, and comprehensive documentation",
    highlight: "8 languages"
  }
];

const useCases = [
  {
    icon: Database,
    title: "Training Data",
    description: "Clean screenshots for ML model training and computer vision projects"
  },
  {
    icon: Eye,
    title: "Vision Models",
    description: "Perfect input for GPT-4 Vision and similar AI applications"
  },
  {
    icon: Wand2,
    title: "Automation",
    description: "Automated documentation, testing, and workflow screenshots"
  },
  {
    icon: Target,
    title: "Marketing",
    description: "Professional assets for app stores and marketing materials"
  }
];

const stats = [
  { icon: Users, value: "5K+", label: "Developers" },
  { icon: Camera, value: "1M+", label: "Screenshots" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime" }
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
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
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
              <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <Badge variant="secondary" className="text-xs font-medium">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Hub Section */}
      <section className="px-4 py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <FileText className="w-4 h-4 mr-2" />
              Knowledge Hub
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Everything you need to know about screenshot APIs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From basic implementation to advanced AI features, explore comprehensive guides, tutorials, and best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: PlayCircle,
                title: "Quick Start Guide",
                description: "Get your first screenshot in under 5 minutes with our step-by-step tutorial",
                badge: "5 min read",
                color: "text-green-500"
              },
              {
                icon: Brain,
                title: "AI Element Detection",
                description: "Deep dive into how our computer vision models identify and remove unwanted elements",
                badge: "Technical",
                color: "text-purple-500"
              },
              {
                icon: Layers,
                title: "Mockup Templates",
                description: "Complete guide to device frames, custom positioning, and creating professional presentations",
                badge: "Design Guide",
                color: "text-blue-500"
              },
              {
                icon: Settings,
                title: "API Configuration",
                description: "Advanced options for quality, formats, timeouts, and custom rendering settings",
                badge: "Advanced",
                color: "text-orange-500"
              },
              {
                icon: BarChart3,
                title: "Performance Optimization",
                description: "Best practices for caching, rate limiting, and scaling your screenshot workflows",
                badge: "Performance",
                color: "text-red-500"
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                description: "Understanding data protection, GDPR compliance, and enterprise security features",
                badge: "Enterprise",
                color: "text-indigo-500"
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                    <Badge variant="outline" className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                <FileText className="w-4 h-4 mr-2" />
                Explore Full Documentation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Clean, distraction-free screenshots perfect for training models, building intelligent applications, and powering the next generation of AI tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <useCase.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Three simple steps to perfect screenshots
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced AI pipeline handles the complexity so you don&apos;t have to. From URL to beautiful mockup in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                icon: Globe,
                title: "Smart Capture",
                description: "Our headless browsers navigate to your URL, handle dynamic content, wait for full page load, and capture pixel-perfect screenshots at any resolution.",
                features: ["Dynamic content detection", "Custom viewport sizes", "Mobile & desktop rendering", "JavaScript execution"]
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Processing",
                description: "Advanced computer vision models analyze the screenshot, identify unwanted elements like ads, cookies, and popups, then intelligently remove them.",
                features: ["Element detection AI", "Content-aware removal", "Quality preservation", "Context understanding"]
              },
              {
                step: "03", 
                icon: Smartphone,
                title: "Professional Output",
                description: "Apply beautiful device mockups, optimize for your format, and deliver production-ready images perfect for presentations and marketing.",
                features: ["15+ device templates", "Custom positioning", "Format optimization", "Quality enhancement"]
              }
            ].map((step, index) => (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                      {step.step}
                    </div>
                    <step.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    {step.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                {index < 2 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/playground">
                <PlayCircle className="w-4 h-4 mr-2" />
                Try It Live
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
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
            
            <Card className="bg-background/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground ml-2">API Example</span>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto bg-muted/50 rounded-lg p-4">
                  <code className="language-javascript">{`const response = await fetch('/api/screenshot', {
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



      {/* Enhanced CTA Section */}
      <section className="px-4 py-24 bg-muted/30 border-t relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground/5 rounded-full mb-6">
            <Rocket className="w-8 h-8 text-foreground" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to capture perfect screenshots?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Join developers building amazing applications with our AI-powered screenshot API. Start free, scale as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {userId ? (
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/sign-up">
                  Start Building Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild className="shadow-sm hover:shadow-md transition-shadow">
              <Link href="/playground">
                <PlayCircle className="w-4 h-4 mr-2" />
                Try Demo
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">Free</div>
              <div className="text-sm text-muted-foreground">to start</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">5 min</div>
              <div className="text-sm text-muted-foreground">setup time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 