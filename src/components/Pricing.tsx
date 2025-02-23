'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
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
  limits: {
    requests: number;
    resolution: string;
  };
  badge?: string;
  popular?: boolean;
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
      'Device mockups included',
      'Multiple formats (PNG, JPEG, PDF)',
      'Full page screenshots',
      'Custom viewport sizes',
      'Basic API access',
    ],
    limits: {
      requests: 500,
      resolution: '1920×1080',
    },
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
      'Higher resolution (4K)',
      'Priority support',
    ],
    limits: {
      requests: 5000,
      resolution: '3840×2160',
    },
    badge: 'Most Popular',
    popular: true,
  },
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
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include core features.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className={yearly ? 'text-muted-foreground' : ''}>Monthly</span>
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
          />
          <span className={!yearly ? 'text-muted-foreground' : ''}>
            Yearly
            <Badge variant="secondary" className="ml-2">Save 20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${plan.popular ? 'border-blue-500 shadow-blue-100' : ''}`}
          >
            {plan.badge && (
              <Badge
                className="absolute -top-2 -right-2 bg-blue-500"
              >
                {plan.badge}
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${yearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-muted-foreground">
                  /{yearly ? 'year' : 'month'}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Includes:</div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="font-medium">Limits:</div>
                <div className="grid gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Requests</span>
                    <span>{plan.limits.requests}/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Resolution</span>
                    <span>{plan.limits.resolution}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleUpgrade(plan)}
                disabled={loading === plan.id || (plan.id === 'free' && isSignedIn)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                    : ''
                }`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : plan.id === 'free' ? (
                  isSignedIn ? 'Current Plan' : 'Get Started'
                ) : (
                  'Upgrade Now'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">What happens if I exceed my API limit?</h4>
            <p className="text-gray-600">
              Requests beyond your plan&apos;s limit will receive a 429 status code. Consider upgrading your plan or implementing rate limiting in your application.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Can I change plans at any time?</h4>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we&apos;ll prorate any charges.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600">
              We accept all major credit cards and PayPal. For annual plans, we also offer invoicing options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 