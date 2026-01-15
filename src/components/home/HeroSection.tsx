'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

interface HeroSectionProps {
  userId?: string | null;
}

export const HeroSection = ({ userId }: HeroSectionProps) => {
  return (
    <section className="px-4 py-32 text-center">
      <div className="container mx-auto max-w-5xl">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Screenshot API
        </Badge>

        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          API Screenshots for{" "}
          <span className="relative inline-block">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
              Developers
            </span>
          </span>
        </h1>

        <p className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto">
          RESTful API for capturing website screenshots programmatically. Integrate screenshot functionality 
          directly into your applications, testing pipelines, and automation workflows.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild>
            <Link href={userId ? "/dashboard" : "/sign-up"}>
              {userId ? "Go to Dashboard" : "Start Free Trial"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/playground">
              <PlayCircle className="w-4 h-4 mr-2" />
              Try Playground
            </Link>
          </Button>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-muted/20 blur-3xl"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border rounded-xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-left">Simple API Integration</h3>
                <p className="text-muted-foreground text-left">
                  Add screenshot functionality to your application with a single API call. 
                  Perfect for testing automation, documentation generation, and content creation workflows.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4 border font-mono text-sm">
                <div className="text-primary mb-2">POST /api/screenshot</div>
                <div className="text-muted-foreground">
                  {`{`}<br/>
                  &nbsp;&nbsp;&quot;url&quot;: &quot;https://example.com&quot;,<br/>
                  &nbsp;&nbsp;&quot;device&quot;: &quot;desktop&quot;,<br/>
                  &nbsp;&nbsp;&quot;mockup&quot;: &quot;browser-light&quot;<br/>
                  {`}`}
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-foreground">→ Returns high-quality screenshot</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
