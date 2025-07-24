'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Image as ImageIcon, Zap, Crown, User } from "lucide-react";

export default function DashboardContent() {
  // TODO: Replace with actual subscription data from your payment provider
  const subscription = {
    plan: 'Pro', // 'Free', 'Pro', 'Enterprise' - Changed to Pro to demonstrate
    status: 'active',
    nextBilling: 'August 24, 2025', // Demo next billing date
    requestsRemaining: 850,
    requestsLimit: 1000,
    requestsUsed: 150
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'pro': return 'bg-blue-500';
      case 'enterprise': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your API tokens and capture screenshots.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Current Plan Badge */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <Badge variant="outline" className={`${getPlanColor(subscription.plan)} text-white border-0`}>
              {subscription.plan} Plan
            </Badge>
            {subscription.plan === 'Free' && (
              <Button asChild size="sm" variant="outline">
                <Link href="/pricing">
                  <Crown className="w-4 h-4 mr-1" />
                  Upgrade
                </Link>
              </Button>
            )}
          </div>
          <Button asChild>
            <Link href="/playground">
              <Zap className="w-4 h-4 mr-2" />
              Try Screenshot Tool
            </Link>
          </Button>
        </div>
      </div>

      {/* Subscription Status Card */}
      {subscription.plan !== 'Free' && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-blue-900">{subscription.plan} Subscription</CardTitle>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {subscription.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700">Next Billing Date</p>
                <p className="font-medium text-blue-900">
                  {subscription.nextBilling || 'N/A'}
                </p>
              </div>
              <div className="flex justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/pricing">Manage Subscription</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              API Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Default key</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscription.requestsRemaining}</div>
            <p className="text-xs text-muted-foreground">
              {subscription.plan === 'Free' ? 'Free tier limit' : `${subscription.plan} plan limit`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Features */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="group h-full hover:border-gray-400 transition-colors cursor-pointer relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50">
                <KeyRound className="w-5 h-5 text-blue-500" />
              </div>
              <a 
                href="https://docs.screenshotly.app/guides/managing-tokens" 
                className="text-sm text-gray-500 hover:text-blue-600 z-10 relative"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View Docs →
              </a>
            </div>
            <CardTitle className="mt-4">API Tokens</CardTitle>
            <CardDescription>
              View and manage your API tokens
            </CardDescription>
          </CardHeader>
          <Link href="/dashboard/tokens" className="absolute inset-0 z-0">
            <span className="sr-only">Go to API Tokens</span>
          </Link>
        </Card>

        <Card className="group h-full hover:border-gray-400 transition-colors cursor-pointer relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-50">
                <ImageIcon className="w-5 h-5 text-purple-500" />
              </div>
              <a 
                href="https://docs.screenshotly.app/guides/using-mockups" 
                className="text-sm text-gray-500 hover:text-blue-600 z-10 relative"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View Docs →
              </a>
            </div>
            <CardTitle className="mt-4">Mockup Templates</CardTitle>
            <CardDescription>
              Browse available mockup templates
            </CardDescription>
          </CardHeader>
          <Link href="/dashboard/mockups" className="absolute inset-0 z-0">
            <span className="sr-only">Go to Mockup Templates</span>
          </Link>
        </Card>
      </div>
    </div>
  );
} 