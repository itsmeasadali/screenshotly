import { Metadata } from 'next';
import GuestLayout from '@/components/layouts/GuestLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/structured-data";
import Link from 'next/link';
import {
  MessageCircle,
  FileText,
  Code,
  Zap,
  Shield,
  HelpCircle,
  ExternalLink,
  Mail,
  BookOpen
} from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://screenshotly.app';

export const metadata: Metadata = {
  title: "Help Center - Screenshot API Documentation & Support",
  description: "Get help with Screenshotly's screenshot API. Find answers to common questions, explore documentation, API reference, and contact our support team.",
  alternates: {
    canonical: "/help",
  },
};

const faqs = [
  {
    question: "How do I get started with the Screenshotly API?",
    answer: "Sign up for a free account, generate your API key from the dashboard, and make your first request to our screenshot endpoint. Check our Getting Started guide for detailed instructions."
  },
  {
    question: "What are the rate limits for different plans?",
    answer: "Free tier: 5 requests/minute. Basic ($14/mo): 40 req/min. Growth ($59/mo): 80 req/min. Scale ($199/mo): 200 req/min with custom limits available. View your current usage in the dashboard."
  },
  {
    question: "Can I capture screenshots of password-protected sites?",
    answer: "Yes, you can include authentication headers or use our login flow parameters to capture screenshots of protected content. See our authentication documentation for details."
  },
  {
    question: "What image formats are supported?",
    answer: "We support PNG, JPEG, and PDF formats. PNG is recommended for screenshots with transparency, JPEG for smaller file sizes, and PDF for document captures."
  },
  {
    question: "How do I apply device mockups to my screenshots?",
    answer: "Use the mockup parameter in your API request. We offer various device frames including phones, tablets, laptops, and browsers. Check our mockup gallery for available options."
  },
  {
    question: "What happens if a screenshot capture fails?",
    answer: "Failed captures return an error response with a detailed message. Common causes include JavaScript errors, network timeouts, or blocked resources. We recommend implementing retry logic with exponential backoff."
  },
  {
    question: "How do I remove cookie banners and popups?",
    answer: "Enable our AI-powered removal feature by setting aiRemoval.enabled to true in your request. You can specify which element types to remove including cookie banners, chat widgets, and newsletter popups."
  }
];

export default function HelpPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Help Center", url: `${BASE_URL}/help` },
  ];
  const helpCategories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Quick setup guides and tutorials",
      articles: [
        { label: "Getting Started with the Screenshot API", href: "/blog/getting-started-with-screenshot-api" },
        { label: "SaaS Integration Guide", href: "/blog/saas-screenshot-api-integration-guide" },
        { label: "Authenticated Screenshot Capture", href: "/blog/authenticated-screenshot-capture-guide" },
        { label: "Node.js Screenshot Tutorial", href: "/blog/nodejs-screenshot-api-tutorial" },
      ]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation",
      articles: [
        { label: "Full API Documentation", href: "https://docs.screenshotly.app", external: true },
        { label: "Error Handling Guide", href: "/blog/screenshot-api-error-handling-guide" },
        { label: "Rate Limits Guide", href: "/blog/screenshot-api-rate-limits-guide" },
        { label: "Webhook Integration", href: "/blog/screenshot-webhooks-guide" },
      ]
    },
    {
      icon: Shield,
      title: "Security & Auth",
      description: "Authentication and security best practices",
      articles: [
        { label: "API Security Best Practices", href: "/blog/screenshot-api-security-guide" },
        { label: "Authenticated Page Capture", href: "/blog/authenticated-screenshot-capture-guide" },
        { label: "Rate Limiting Guidelines", href: "/blog/screenshot-api-rate-limits-guide" },
        { label: "CI/CD Screenshot Automation", href: "/blog/cicd-screenshot-automation-guide" },
      ]
    },
    {
      icon: FileText,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: [
        { label: "Error Handling & Debugging", href: "/blog/screenshot-api-error-handling-guide" },
        { label: "Cost & Budget Optimization", href: "/blog/reduce-screenshot-api-costs" },
        { label: "Dynamic Content Captures", href: "/blog/dynamic-content-screenshot-guide" },
        { label: "Mobile Responsive Screenshots", href: "/blog/mobile-responsive-screenshots" },
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Full Documentation",
      description: "Complete guides and API reference",
      href: "https://docs.screenshotly.app",
      icon: BookOpen,
      external: true
    },
    {
      title: "API Playground",
      description: "Test our API with live examples",
      href: "/playground",
      icon: Zap,
      external: false
    },
    {
      title: "Status Page",
      description: "Check API uptime and incidents",
      href: "/status",
      icon: Shield,
      external: false
    }
  ];

  return (
    <GuestLayout>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={getFAQSchema(faqs)} />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Screenshot API Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, explore our documentation, and get the support you need.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {quickLinks.map((link, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <link.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  {link.external && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
                </div>
                <CardTitle className="text-lg">{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      Visit Documentation
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <Link href={link.href}>
                      Go to {link.title}
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Guide */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Quick Start</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Screenshotly is a REST API that captures website screenshots programmatically. To get started:
            </p>
            <ol className="space-y-3 text-muted-foreground mb-6">
              <li><strong>Sign up</strong> for a free account at <Link href="/sign-up" className="text-primary hover:underline">screenshotly.app/sign-up</Link> to get your API key. You get 100 free screenshots with no credit card required.</li>
              <li><strong>Make your first request</strong> by sending a POST to <code className="text-sm bg-muted px-1.5 py-0.5 rounded">https://api.screenshotly.app/screenshot</code> with your target URL and API key in the Authorization header.</li>
              <li><strong>Receive your screenshot</strong> as a PNG, JPEG, or PDF. The API returns the image data directly in the response body.</li>
            </ol>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6">
              <div className="text-primary mb-1">curl -X POST https://api.screenshotly.app/screenshot \</div>
              <div className="text-muted-foreground">
                &nbsp;&nbsp;-H &quot;Authorization: Bearer YOUR_API_KEY&quot; \<br/>
                &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \<br/>
                &nbsp;&nbsp;-d &apos;{`{"url":"https://example.com","format":"png"}`}&apos; \<br/>
                &nbsp;&nbsp;--output screenshot.png
              </div>
            </div>
            <p className="text-muted-foreground">
              For detailed setup instructions in your language, see our{' '}
              <Link href="/integrations" className="text-primary hover:underline">integration guides</Link> or try the{' '}
              <Link href="/playground" className="text-primary hover:underline">API playground</Link> to experiment without writing code.
            </p>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <category.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300 mb-2" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        {'external' in article && article.external ? (
                          <a
                            href={article.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                          >
                            • {article.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            href={article.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                          >
                            • {article.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="group hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help you get the most out of Screenshotly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="mailto:support@screenshotly.app">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/playground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Try API Playground
              </Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">24/7 Support</Badge>
            <Badge variant="outline">&lt; 2 Hour Response</Badge>
            <Badge variant="outline">Expert Team</Badge>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
} 