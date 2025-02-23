'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, Image as ImageIcon, Zap } from "lucide-react";

export default function DashboardContent() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your API tokens and capture screenshots{" "}
            <Link href="https://docs.screenshotly.app/introduction/quickstart" className="text-blue-600 hover:underline" target="_blank">
              View Documentation →
            </Link>
          </p>
        </div>
        <Button asChild>
          <Link href="/playground">
            <Zap className="w-4 h-4 mr-2" />
            Try Screenshot Tool
          </Link>
        </Button>
      </div>

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
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">Free tier limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Features */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="group">
          <Card className="h-full hover:border-gray-400 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-blue-50">
                  <KeyRound className="w-5 h-5 text-blue-500" />
                </div>
                <a 
                  href="https://docs.screenshotly.app/guides/managing-tokens" 
                  className="text-sm text-gray-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Docs →
                </a>
              </div>
              <CardTitle className="mt-4">API Tokens</CardTitle>
              <CardDescription>
                View and manage your API tokens
              </CardDescription>
            </CardHeader>
            <Link href="/dashboard/tokens" className="absolute inset-0">
              <span className="sr-only">Go to API Tokens</span>
            </Link>
          </Card>
        </div>

        <div className="group">
          <Card className="h-full hover:border-gray-400 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-50">
                  <ImageIcon className="w-5 h-5 text-purple-500" />
                </div>
                <a 
                  href="https://docs.screenshotly.app/guides/using-mockups" 
                  className="text-sm text-gray-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Docs →
                </a>
              </div>
              <CardTitle className="mt-4">Mockup Templates</CardTitle>
              <CardDescription>
                Browse available mockup templates
              </CardDescription>
            </CardHeader>
            <Link href="/dashboard/mockups" className="absolute inset-0">
              <span className="sr-only">Go to Mockup Templates</span>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
} 