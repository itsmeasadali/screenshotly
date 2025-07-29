import GuestLayout from '@/components/layouts/GuestLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Quick setup guides and tutorials",
      articles: [
        "Creating your first API key",
        "Making your first screenshot request",
        "Understanding response formats",
        "Setting up authentication"
      ]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation",
      articles: [
        "Endpoint documentation",
        "Request parameters",
        "Response schemas",
        "Error codes and handling"
      ]
    },
    {
      icon: Shield,
      title: "Security & Auth",
      description: "Authentication and security best practices",
      articles: [
        "API key management",
        "Rate limiting guidelines",
        "Security best practices",
        "CORS configuration"
      ]
    },
    {
      icon: FileText,
      title: "Troubleshooting",
      description: "Common issues and solutions",
      articles: [
        "Screenshot failed errors",
        "Timeout issues",
        "Quality optimization",
        "Debugging API responses"
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Full Documentation",
      description: "Complete guides and API reference",
      href: "https://help.screenshotly.app",
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
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
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
                      <li key={articleIndex} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        • {article}
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
            {[
              {
                question: "How do I get started with the Screenshotly API?",
                answer: "Sign up for a free account, generate your API key from the dashboard, and make your first request to our screenshot endpoint. Check our Getting Started guide for detailed instructions."
              },
              {
                question: "What are the rate limits for different plans?",
                answer: "Free plans include 100 requests per hour, Pro plans get 1,000 requests per hour, and Enterprise plans have custom limits. View your current usage in the dashboard."
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
              }
            ].map((faq, index) => (
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