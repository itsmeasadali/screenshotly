'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, Zap, Smartphone, Globe, Shield, Code
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "RESTful Screenshot API",
    description: "Simple HTTP endpoints for capturing screenshots programmatically. Integrate with any language or framework",
    highlight: "REST API"
  },
  {
    icon: Smartphone,
    title: "Device Mockups",
    description: "Professional device frames for iPhone, iPad, MacBook, and browsers via simple API parameters",
    highlight: "15+ templates"
  },
  {
    icon: Brain,
    title: "AI Element Removal",
    description: "Optional AI-powered cleanup to remove ads, banners, and distracting elements from screenshots",
    highlight: "Optional feature"
  },
  {
    icon: Globe,
    title: "Reliable Hosting",
    description: "Hosted on modern cloud infrastructure with automatic scaling and monitoring",
    highlight: "Cloud hosted"
  },
  {
    icon: Shield,
    title: "Secure API",
    description: "API key authentication with HTTPS encryption and secure token-based access control",
    highlight: "HTTPS only"
  },
  {
    icon: Code,
    title: "Rate Limited",
    description: "Built-in rate limiting and usage tracking to prevent abuse and manage API consumption",
    highlight: "Usage tracking"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="px-4 py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Built for Developer Integration
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple REST API with powerful features. Add screenshot functionality to your applications 
            with just a few lines of code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Built for Scale</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Built with modern web technologies and designed to scale. Simple REST API 
                that integrates with any programming language or framework.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-lg bg-card border">
                <div className="text-2xl font-bold text-foreground mb-1">REST</div>
                <div className="text-sm text-muted-foreground">API Standard</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border">
                <div className="text-2xl font-bold text-foreground mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Device Templates</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-muted/20 blur-3xl"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border rounded-xl p-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Quick Start Example</h3>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <div className="text-primary mb-2">POST /api/screenshot</div>
                  <div className="text-muted-foreground mb-4">
                    Authorization: Bearer YOUR_API_KEY<br/>
                    Content-Type: application/json<br/>
                    <br/>
                    Body: {JSON.stringify({url: "https://example.com"})}
                  </div>
                  <div className="text-primary mb-2">Response:</div>
                  <div className="text-foreground">
                    PNG image data
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ready to integrate</span>
                  <span className="text-primary font-medium">View API Docs →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
