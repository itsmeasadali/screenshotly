'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Eye, Wand2, Target, ArrowRight } from 'lucide-react';

const useCases = [
  {
    icon: Database,
    title: "API Integration",
    description: "Embed screenshot capture into SaaS platforms, internal tools, and CI/CD pipelines via REST API",
    href: "/integrations",
  },
  {
    icon: Eye,
    title: "Automated Testing",
    description: "Visual regression testing and quality assurance automation across devices",
    href: "/use-cases/automated-testing",
  },
  {
    icon: Wand2,
    title: "Documentation",
    description: "Generate product screenshots and user guides programmatically with AI cleanup",
    href: "/use-cases/documentation-screenshots",
  },
  {
    icon: Target,
    title: "Content Creation",
    description: "Professional marketing assets and social media content with device mockups at scale",
    href: "/use-cases/social-media-previews",
  }
];

export const UseCasesSection = () => {
  return (
    <section className="px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Use Cases
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Automate Any Screenshot Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Integrate screenshot capture directly into your applications, testing pipelines, 
            and automation workflows with our developer-first API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {useCases.map((useCase, index) => (
            <Link key={index} href={useCase.href}>
              <Card className="text-center shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 group h-full">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors duration-300 w-fit">
                    <useCase.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {useCase.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link href="/use-cases" className="text-sm text-primary hover:underline flex items-center gap-1">
            Browse all 40+ use cases <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link href="/tools" className="text-sm text-primary hover:underline flex items-center gap-1">
            Try free screenshot tools <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link href="/compare" className="text-sm text-primary hover:underline flex items-center gap-1">
            Compare with alternatives <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Detailed Use Case Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">API-First Development</h3>
              <p className="text-muted-foreground mb-6">
                Integrate screenshot capture directly into your applications with our RESTful API. 
                Perfect for SaaS platforms, testing tools, and automation workflows.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2"></div>
                <div>
                  <div className="font-medium mb-1">SaaS Integration</div>
                  <div className="text-sm text-muted-foreground">
                    Embed screenshot capture into your SaaS platform — a single POST returns PNG, JPEG, or PDF with no Chrome infrastructure needed
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Webhook Automation</div>
                  <div className="text-sm text-muted-foreground">
                    Trigger captures from CI/CD pipelines, Zapier, or custom webhooks. Screenshotly handles rendering and returns the image URL
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Batch Processing</div>
                  <div className="text-sm text-muted-foreground">
                    Submit an array of URLs and receive screenshots in parallel. Built-in rate limiting ensures you stay within plan quotas
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Testing & Documentation</h3>
              <p className="text-muted-foreground mb-6">
                Automate visual testing, generate documentation screenshots, and create 
                professional marketing assets with consistent, clean results.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Automated Testing</div>
                  <div className="text-sm text-muted-foreground">
                    Capture baseline and current screenshots, then diff them. AI cleanup removes cookie banners so diffs only show real layout changes
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Product Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Generate annotated screenshots with AI element removal for clean help docs. Supports desktop, tablet, and mobile viewports
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Marketing Assets</div>
                  <div className="text-sm text-muted-foreground">
                    Wrap screenshots in iPhone, MacBook, or browser frames automatically. Export at 2x or 3x DPR for retina-quality assets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
