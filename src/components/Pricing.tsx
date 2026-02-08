'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, Loader2, Star, Zap, Crown, Sparkles, ArrowRight, X, Rocket, Building2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  screenshotsPerMonth: number;
  requestsPerMinute: number;
  extraCost: string;
  features: string[];
  growthFeatures?: string[];
  badge?: string;
  popular?: boolean;
  lifetime?: boolean;
  icon: typeof Zap;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Try all features, no credit card required.',
    price: {
      monthly: 0,
      yearly: 0,
    },
    screenshotsPerMonth: 100,
    requestsPerMinute: 5,
    extraCost: '',
    lifetime: true,
    features: [
      'PNG, WebP, JPEG formats',
      'Full page screenshots',
      'Custom viewport sizes',
      'Block ads & cookie banners',
      'API access',
    ],
    icon: Zap,
    cta: 'Start for Free',
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'The essentials to start rendering screenshots.',
    price: {
      monthly: 14,
      yearly: 134,
    },
    screenshotsPerMonth: 2500,
    requestsPerMinute: 40,
    extraCost: '$0.007',
    features: [
      'Everything in Free, plus:',
      'Render PDFs',
      'HTML rendering',
      'Caching',
      'Upload to S3',
      'Zapier, Make & n8n',
      'Webhooks',
      'Signed links',
      'Stealth mode',
    ],
    icon: Rocket,
    cta: 'Start with Basic',
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'A plan that scales with your rapidly growing business.',
    price: {
      monthly: 59,
      yearly: 566,
    },
    screenshotsPerMonth: 12000,
    requestsPerMinute: 80,
    extraCost: '$0.005',
    features: [
      'Everything in Basic, plus:',
      'AI-powered element removal',
      'Choose IP geolocation',
      'Scrolling screenshots',
      'Generate videos',
      'Device mockup frames',
      'Custom CSS/JS injection',
      'Priority rendering queue',
    ],
    badge: 'Most Popular',
    popular: true,
    icon: Crown,
    cta: 'Start with Growth',
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'Prioritized support and infrastructure for your company.',
    price: {
      monthly: 199,
      yearly: 1910,
    },
    screenshotsPerMonth: 50000,
    requestsPerMinute: 200,
    extraCost: '$0.003',
    features: [
      'Everything in Growth, plus:',
      'GPU rendering for heavy pages',
      'Dedicated infrastructure',
      'Priority support (< 4hr)',
      'Custom rate limits',
      'Uptime SLA (99.9%)',
      'Volume discounts',
      'Account manager',
    ],
    icon: Building2,
    cta: 'Start with Scale',
  },
];

const faqs = [
  {
    question: "How does the free tier work?",
    answer: "Sign up and get 100 free screenshots — no credit card required, no expiry. Use them to fully evaluate the API. Once you've used all 100, upgrade to a paid plan to continue."
  },
  {
    question: "What counts as a screenshot?",
    answer: "Each successful API call that returns a screenshot, PDF, or video counts as one screenshot. Failed requests and cached responses are not counted."
  },
  {
    question: "What happens if I go over my monthly limit?",
    answer: "On paid plans, extra screenshots are billed at the per-extra rate shown on your plan. On the free tier, once you've used your 100 lifetime screenshots, you'll need to upgrade to continue."
  },
  {
    question: "Can I change or cancel my plan anytime?",
    answer: "Yes! Upgrade, downgrade, or cancel at any time with no penalties. When upgrading, you're charged a prorated amount. Downgrades take effect at the next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex) via Stripe. Annual plans get a 20% discount. Enterprise invoicing is available on Scale plans."
  },
  {
    question: "How fast are screenshots rendered?",
    answer: "Most screenshots complete in 2-5 seconds. Full-page captures and heavy JavaScript sites may take up to 15 seconds. Growth and Scale plans get priority rendering queues."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund."
  },
  {
    question: "Is there an API rate limit?",
    answer: "Yes, each plan has a requests-per-minute limit to ensure fair usage and consistent performance. Scale plans offer custom rate limits for high-throughput needs."
  },
  {
    question: "Can I use screenshots commercially?",
    answer: "Absolutely. All screenshots captured through our API can be used for any commercial purpose — websites, apps, marketing, reports — with no additional licensing."
  },
  {
    question: "How does caching work?",
    answer: "Paid plans include automatic caching. Repeated requests for the same URL return cached results instantly without counting toward your quota (within the cache TTL you configure)."
  },
];

const comparisonFeatures = [
  { name: 'Screenshots', free: '100 total', basic: '2,500/mo', growth: '12,000/mo', scale: '50,000/mo' },
  { name: 'Requests per minute', free: '5', basic: '40', growth: '80', scale: '200' },
  { name: 'Extra screenshot cost', free: '—', basic: '$0.007', growth: '$0.005', scale: '$0.003' },
  { name: 'PNG, WebP, JPEG', free: true, basic: true, growth: true, scale: true },
  { name: 'Full page screenshots', free: true, basic: true, growth: true, scale: true },
  { name: 'Custom viewport sizes', free: true, basic: true, growth: true, scale: true },
  { name: 'Block ads & cookies', free: true, basic: true, growth: true, scale: true },
  { name: 'PDF rendering', free: false, basic: true, growth: true, scale: true },
  { name: 'HTML rendering', free: false, basic: true, growth: true, scale: true },
  { name: 'Caching', free: false, basic: true, growth: true, scale: true },
  { name: 'Upload to S3', free: false, basic: true, growth: true, scale: true },
  { name: 'Zapier, Make & n8n', free: false, basic: true, growth: true, scale: true },
  { name: 'Webhooks', free: false, basic: true, growth: true, scale: true },
  { name: 'Signed links', free: false, basic: true, growth: true, scale: true },
  { name: 'Stealth mode', free: false, basic: true, growth: true, scale: true },
  { name: 'AI element removal', free: false, basic: false, growth: true, scale: true },
  { name: 'IP geolocation', free: false, basic: false, growth: true, scale: true },
  { name: 'Scrolling screenshots', free: false, basic: false, growth: true, scale: true },
  { name: 'Video generation', free: false, basic: false, growth: true, scale: true },
  { name: 'Device mockup frames', free: false, basic: false, growth: true, scale: true },
  { name: 'CSS/JS injection', free: false, basic: false, growth: true, scale: true },
  { name: 'GPU rendering', free: false, basic: false, growth: false, scale: true },
  { name: 'Priority support', free: false, basic: false, growth: false, scale: true },
  { name: 'Uptime SLA', free: false, basic: false, growth: false, scale: true },
  { name: 'Account manager', free: false, basic: false, growth: false, scale: true },
];

export default function Pricing() {
  const { user, isSignedIn } = useUser();
  const [yearly, setYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleUpgrade = async (plan: PricingPlan) => {
    try {
      if (!isSignedIn) {
        window.location.href = '/sign-up?redirect=/pricing';
        return;
      }

      if (plan.id === 'free') {
        toast.info('You\'re already on the free plan!');
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

      window.location.href = data.url;
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Failed to start upgrade process');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="px-4 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Simple, Transparent Pricing
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
          Start rendering for free
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          100 free screenshots to get started. No credit card required.
          <br className="hidden sm:block" />
          Upgrade when you need more volume, features, or priority support.
        </p>

        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium transition-colors ${yearly ? 'text-muted-foreground' : 'text-foreground'}`}>
            Monthly
          </span>
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
          />
          <span className={`text-sm font-medium transition-colors ${!yearly ? 'text-muted-foreground' : 'text-foreground'}`}>
            Yearly
          </span>
          {yearly && (
            <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
              Save 20%
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        {plans.map((plan) => (
          <div key={plan.id} className="relative flex">
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-primary text-primary-foreground border-0 px-4 py-1 shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  {plan.badge}
                </Badge>
              </div>
            )}
            <Card
              className={`flex flex-col w-full ${plan.popular
                ? 'border-primary shadow-xl ring-1 ring-primary/20'
                : 'hover:border-primary/30 transition-colors'
                }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                    }`}>
                    <plan.icon className={`w-5 h-5 ${plan.popular ? '' : 'text-primary'}`} />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    {plan.price.monthly === 0 ? (
                      <span className="text-4xl font-bold">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">
                          ${yearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /month
                        </span>
                      </>
                    )}
                  </div>
                  {yearly && plan.price.monthly > 0 && (
                    <p className="text-xs text-muted-foreground">
                      <span className="line-through">${plan.price.monthly * 12}/yr</span>
                      <span className="text-green-600 font-medium ml-1">
                        ${plan.price.yearly}/yr — save ${(plan.price.monthly * 12) - plan.price.yearly}
                      </span>
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground pt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Key metrics */}
                <div className="space-y-2 pb-3">
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/50">
                    <span className="text-sm text-muted-foreground">Screenshots</span>
                    <span className="font-semibold text-sm">
                      {plan.screenshotsPerMonth.toLocaleString()}{plan.lifetime ? ' total' : '/mo'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/50">
                    <span className="text-sm text-muted-foreground">Rate limit</span>
                    <span className="font-semibold text-sm">{plan.requestsPerMinute} req/min</span>
                  </div>
                  {plan.extraCost && (
                    <div className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/50">
                      <span className="text-sm text-muted-foreground">Extra cost</span>
                      <span className="font-semibold text-sm">{plan.extraCost}/screenshot</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((feature, index) => {
                    const isHeader = feature.includes('Everything in');
                    return (
                      <li key={index} className="flex items-start space-x-2.5">
                        {isHeader ? (
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-1">{feature}</span>
                        ) : (
                          <>
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  onClick={() => handleUpgrade(plan)}
                  disabled={loading === plan.id}
                  className={`w-full h-11 text-sm font-medium ${plan.popular ? 'bg-primary text-primary-foreground shadow-lg' : ''
                    }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {loading === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Pay only for successful requests */}
      <div className="text-center mb-16">
        <p className="text-sm text-muted-foreground">
          ✓ Pay only for successful screenshots &nbsp;&bull;&nbsp; ✓ No hidden fees &nbsp;&bull;&nbsp; ✓ Cancel anytime &nbsp;&bull;&nbsp; ✓ 14-day money-back guarantee
        </p>
      </div>

      {/* Feature Comparison Toggle */}
      <div className="max-w-6xl mx-auto mb-16">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border rounded-lg hover:bg-muted/30"
        >
          <HelpCircle className="w-4 h-4" />
          {showComparison ? 'Hide' : 'Show'} detailed feature comparison
        </button>

        {showComparison && (
          <div className="mt-6 border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Free</th>
                    <th className="text-center py-3 px-4 font-semibold">Basic</th>
                    <th className="text-center py-3 px-4 font-semibold bg-primary/5 border-x border-primary/10">Growth</th>
                    <th className="text-center py-3 px-4 font-semibold">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-t hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 px-4 text-muted-foreground">{feature.name}</td>
                      {(['free', 'basic', 'growth', 'scale'] as const).map((plan) => (
                        <td
                          key={plan}
                          className={`py-2.5 px-4 text-center ${plan === 'growth' ? 'bg-primary/5 border-x border-primary/10' : ''}`}
                        >
                          {typeof feature[plan] === 'boolean' ? (
                            feature[plan] ? (
                              <Check className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className="font-medium">{feature[plan]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about our pricing and features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:border-primary/20 transition-colors">
              <CardContent className="p-5">
                <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enterprise / Contact */}
      <div className="max-w-3xl mx-auto text-center">
        <Card className="border-dashed">
          <CardContent className="p-8">
            <Building2 className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Need more than 50,000 screenshots?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We offer custom enterprise plans with dedicated infrastructure, volume discounts, SLA guarantees, and a dedicated account manager.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:hello@screenshotly.com">
                  Contact Sales
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/docs">
                  Read the Docs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}