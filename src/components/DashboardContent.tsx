'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { KeyRound, Image as ImageIcon, Zap, Crown, User, AlertCircle } from "lucide-react";
import { 
  formatSubscriptionStatus,
  getNextBillingDate,
  getPlanDisplayName,
  type UserData,
  type UserApiKeyStats
} from '@/lib/user';

export default function DashboardContent() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [apiStats, setApiStats] = useState<UserApiKeyStats | null>(null);
  const [monthlyUsage, setMonthlyUsage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const { userData: userDataResult, apiStats: apiStatsResult, monthlyUsage: monthlyUsageResult } = await response.json();

        setUserData(userDataResult);
        setApiStats(apiStatsResult);
        setMonthlyUsage(monthlyUsageResult);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user?.id]);

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'pro': return 'bg-primary';
      case 'enterprise': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your API tokens and capture screenshots.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Unable to load dashboard</h2>
          <p className="text-muted-foreground mb-4">
            {error || 'User data not found. Please try refreshing the page.'}
          </p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const planDisplayName = getPlanDisplayName(userData.plan);
  const statusDisplay = formatSubscriptionStatus(userData.subscriptionStatus);
  const nextBilling = getNextBillingDate(userData.plan, userData.billingCycleEnd, userData.stripeCurrentPeriodEnd);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your API tokens and capture screenshots.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Current Plan Badge */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <Badge variant="outline" className={`${getPlanColor(userData.plan)} text-white border-0`}>
              {planDisplayName} Plan
            </Badge>
            {userData.plan === 'FREE' && (
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
      {userData.plan !== 'FREE' && (
        <Card className="mb-6 border bg-muted/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-foreground" />
                <CardTitle className="text-foreground">{planDisplayName} Subscription</CardTitle>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  userData.subscriptionStatus === 'ACTIVE' 
                    ? 'bg-muted text-foreground border' 
                    : userData.subscriptionStatus === 'PAST_DUE'
                    ? 'bg-muted text-muted-foreground border'
                    : 'bg-destructive/10 text-destructive border-destructive/20'
                }`}
              >
                {statusDisplay}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Next Billing Date</p>
                <p className="font-medium text-foreground">
                  {nextBilling}
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
              Today&apos;s Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiStats?.todayUsage || 0}</div>
            <p className="text-xs text-muted-foreground">API requests today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiStats?.activeKeys || 0}</div>
            <p className="text-xs text-muted-foreground">
              {apiStats?.totalKeys || 0} total keys
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyUsage}</div>
            <p className="text-xs text-muted-foreground">
              {apiStats?.monthlyLimit || 500} monthly limit ({planDisplayName} plan)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Features */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="group h-full hover:border-primary/50 transition-colors cursor-pointer relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-muted">
                <KeyRound className="w-5 h-5 text-foreground" />
              </div>
              <a 
                href="https://docs.screenshotly.app/guides/managing-tokens" 
                className="text-sm text-muted-foreground hover:text-primary z-10 relative"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View Docs →
              </a>
            </div>
            <CardTitle className="mt-4">API Tokens</CardTitle>
            <CardDescription>
              View and manage your API tokens. You have {apiStats?.activeKeys || 0} active key{(apiStats?.activeKeys || 0) !== 1 ? 's' : ''}.
            </CardDescription>
          </CardHeader>
          <Link href="/dashboard/tokens" className="absolute inset-0 z-0">
            <span className="sr-only">Go to API Tokens</span>
          </Link>
        </Card>

        <Card className="group h-full hover:border-primary/50 transition-colors cursor-pointer relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <ImageIcon className="w-5 h-5 text-purple-500" />
              </div>
              <a 
                href="https://docs.screenshotly.app/guides/using-mockups" 
                className="text-sm text-muted-foreground hover:text-primary z-10 relative"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View Docs →
              </a>
            </div>
            <CardTitle className="mt-4">Mockup Templates</CardTitle>
            <CardDescription>
              Browse available mockup templates for your screenshots.
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