'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Loader2, Star, Zap, Crown, Sparkles, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  excludedFeatures?: string[];
  limits: {
    requests: number;
    resolution: string;
  };
  badge?: string;
  popular?: boolean;
  icon: typeof Zap;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out our service',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      'High-quality screenshots',
      'Basic device mockups',
      'Multiple formats (PNG, JPEG)',
      'Full page screenshots',
      'Custom viewport sizes',
      'Basic API access',
      'Community support',
    ],
    excludedFeatures: [
      'AI-powered element removal',
      'Premium mockups',
      'Priority support',
      '4K resolution',
    ],
    limits: {
      requests: 500,
      resolution: '1920×1080',
    },
    icon: Zap,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and businesses',
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      'Everything in Free, plus:',
      'AI-powered element removal',
      'Smart element detection',
      'Adjustable confidence controls',
      'Premium device mockups',
      'Higher resolution (4K)',
      'Priority support',
      'Advanced API features',
      'Usage analytics',
      'Custom branding options',
    ],
    limits: {
      requests: 5000,
      resolution: '3840×2160',
    },
    badge: 'Most Popular',
    popular: true,
    icon: Crown,
  },
];

const faqs = [
  {
    question: "What happens if I exceed my API limit?",
    answer: "Requests beyond your plan's limit will receive a 429 status code. Consider upgrading your plan or implementing rate limiting in your application."
  },
  {
    question: "Can I change plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll prorate any charges."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards and PayPal. For annual plans, we also offer invoicing options."
  },
  {
    question: "Is there a free trial for Pro features?",
    answer: "Yes! All new users get a 7-day free trial of Pro features when they sign up. No credit card required."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact support if you're not satisfied."
  },
  {
    question: "Can I use screenshots commercially?",
    answer: "Yes, all screenshots captured through our API can be used for commercial purposes without any additional licensing fees."
  }
];

export default function Pricing() {
  const { user, isSignedIn } = useUser();
  const [yearly, setYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (plan: PricingPlan) => {
    try {
      if (!isSignedIn) {
        window.location.href = '/sign-in?redirect=/pricing';
        return;
      }

      if (plan.id === 'free') {
        toast.info('You&apos;re already on the free plan!');
        return;
      }

      setLoading(plan.id);

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          interval: yearly ? 'yearly' : 'monthly',
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Failed to start upgrade process');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Simple Pricing
        </Badge>
        <h1 className="text-4xl font-bold mb-6">
          Choose your perfect plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Start free and scale as you grow. All plans include core features with no hidden fees.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${yearly ? 'text-muted-foreground' : 'text-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
          />
          <span className={`text-sm font-medium ${!yearly ? 'text-muted-foreground' : 'text-foreground'}`}>
            Yearly
          </span>
          <Badge variant="secondary">
            Save 20%
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              plan.popular 
                ? 'border-primary shadow-lg' 
                : ''
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>
                  <Star className="w-3 h-3 mr-1" />
                  {plan.badge}
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold">
                    ${yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    /{yearly ? 'year' : 'month'}
                  </span>
                </div>
                {yearly && plan.price.monthly > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <span className="line-through">${plan.price.monthly * 12}/year</span>
                    <span className="text-green-600 font-medium ml-2">
                      Save ${(plan.price.monthly * 12) - plan.price.yearly}!
                    </span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Usage Limits */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Usage Limits
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">{plan.limits.requests.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">requests/month</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-lg font-bold text-primary">{plan.limits.resolution}</div>
                    <div className="text-xs text-muted-foreground">max resolution</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Features Included
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded Features */}
              {plan.excludedFeatures && plan.excludedFeatures.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      Not Included
                    </h4>
                    <ul className="space-y-2">
                      {plan.excludedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleUpgrade(plan)}
                disabled={loading === plan.id}
                className={`w-full h-12 text-base font-medium ${
                  plan.popular ? 'bg-primary text-primary-foreground' : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : plan.id === 'free' ? (
                  isSignedIn ? 'Current Plan' : 'Get Started Free'
                ) : (
                  <>
                    Upgrade to {plan.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Got questions? We&apos;ve got answers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-20 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Need a custom plan?</h3>
            <p className="text-muted-foreground mb-6">
              Looking for higher limits, custom features, or enterprise solutions? We&apos;d love to help you build something amazing.
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:hello@screenshotly.com">
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 