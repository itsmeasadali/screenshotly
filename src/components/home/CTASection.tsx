'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Rocket, CheckCircle, FileText, 
  Settings
} from 'lucide-react';

interface CTASectionProps {
  userId?: string | null;
}

export const CTASection = ({ userId }: CTASectionProps) => {
  return (
    <section className="px-4 py-24 bg-gradient-to-br from-primary/5 via-muted/10 to-accent/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Ready to Start?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Start building with our screenshot API
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of developers using our API to automate screenshot capture, 
            testing workflows, and documentation generation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={userId ? "/dashboard" : "/sign-up"}>
                {userId ? "Go to Dashboard" : "Start Free Trial"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/playground">
                Try Playground
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <CheckCircle className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Free to Start</h3>
              <p className="text-sm text-muted-foreground">
                500 free screenshots monthly. No credit card required.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <FileText className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Full Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Complete API docs, SDKs, and integration guides.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Settings className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Easy Integration</h3>
              <p className="text-sm text-muted-foreground">
                RESTful API with SDKs for all popular languages.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Simple, Transparent Pricing</h3>
            <p className="text-muted-foreground">
              Start free, scale as you grow. No hidden fees or surprise charges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <Card className="border-2 border-muted">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h4 className="font-semibold text-lg mb-2">Free</h4>
                  <div className="text-3xl font-bold mb-1">$0</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    500 screenshots/month
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Basic device mockups
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Community support
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={userId ? "/dashboard" : "/sign-up"}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground border-0 px-3 py-1">Most Popular</Badge>
              </div>
              <Card className="border-2 border-primary shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h4 className="font-semibold text-lg mb-2">Pro</h4>
                  <div className="text-3xl font-bold mb-1">$29</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    10,000 screenshots/month
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    AI element removal
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Premium mockups
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href={userId ? "/dashboard" : "/sign-up"}>
                    Start Pro Trial
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </div>

            {/* Enterprise Tier */}
            <Card className="border-2 border-muted">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h4 className="font-semibold text-lg mb-2">Enterprise</h4>
                  <div className="text-3xl font-bold mb-1">Custom</div>
                  <div className="text-sm text-muted-foreground">contact us</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Unlimited screenshots
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    Dedicated support
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-foreground" />
                    SLA guarantee
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
