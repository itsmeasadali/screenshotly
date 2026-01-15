'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import Link from 'next/link';

interface StatusCardProps {
  isSignedIn: boolean;
  userName?: string;
}

export const StatusCard = ({ isSignedIn, userName }: StatusCardProps) => {
  return (
    <Card className="mb-8 bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="font-semibold text-foreground">
                {isSignedIn ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                    Signed in as {userName || 'User'}
                  </span>
                ) : (
                  'Anonymous User'
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isSignedIn 
                  ? 'You have access to 500 requests per day and AI features'
                  : 'Anonymous users: 50 requests per hour. Sign in for higher limits and AI features'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant={isSignedIn ? "default" : "secondary"}>
                {isSignedIn ? "Pro Features" : "Basic Access"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {!isSignedIn && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/sign-in">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ExternalLink className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
