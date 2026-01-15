'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Eye, Wand2, Target } from 'lucide-react';

const useCases = [
  {
    icon: Database,
    title: "API Integration",
    description: "Seamless screenshot capture directly in your applications and workflows"
  },
  {
    icon: Eye,
    title: "Automated Testing",
    description: "Visual regression testing and quality assurance automation"
  },
  {
    icon: Wand2,
    title: "Documentation",
    description: "Generate product screenshots and user guides programmatically"
  },
  {
    icon: Target,
    title: "Content Creation",
    description: "Professional marketing assets and social media content at scale"
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
            Built for Developer Workflows
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Integrate screenshot capture directly into your applications, testing pipelines, 
            and automation workflows with our developer-first API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
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
          ))}
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
                    Add screenshot functionality to your platform with simple API calls
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Webhook Automation</div>
                  <div className="text-sm text-muted-foreground">
                    Trigger screenshot capture from your existing workflows and tools
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Batch Processing</div>
                  <div className="text-sm text-muted-foreground">
                    Process multiple URLs efficiently with rate limiting and queuing
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
                    Visual regression testing with clean, consistent screenshots
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Product Documentation</div>
                  <div className="text-sm text-muted-foreground">
                    Professional screenshots for user guides and help documentation
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
                <div>
                  <div className="font-medium mb-1">Marketing Assets</div>
                  <div className="text-sm text-muted-foreground">
                    App store screenshots and promotional materials with device mockups
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
