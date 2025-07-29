'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Smartphone, Laptop, Monitor, Tablet, Lock, CheckCircle2, ScanSearch, ArrowRight, RefreshCw, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import GuestLayout from '@/components/layouts/GuestLayout';
import Image from 'next/image';
import Link from 'next/link';

const deviceOptions = [
  { id: 'desktop', name: 'Desktop', icon: Monitor, dimensions: '1920×1080' },
  { id: 'laptop', name: 'Laptop', icon: Laptop, dimensions: '1366×768' },
  { id: 'tablet', name: 'Tablet', icon: Tablet, dimensions: '768×1024' },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, dimensions: '375×812' },
] as const;

const formatOptions = [
  { id: 'png', name: 'PNG', icon: ScanSearch, description: 'Best for screenshots with transparency' },
  { id: 'jpeg', name: 'JPEG', icon: ScanSearch, description: 'Smaller file size, adjustable quality' },
  { id: 'pdf', name: 'PDF', icon: ScanSearch, description: 'Document format (mockups not available)' },
] as const;

interface MockupTemplate {
  id: string;
  name: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
  };
  screenshotPlacement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imagePath: string;
}

interface MockupOption {
  id: string;
  name: string;
  icon: typeof Monitor | typeof Smartphone | typeof Laptop;
  dimensions: string;
  description?: string;
}

// Add proper types for device and format
type DeviceType = typeof deviceOptions[number]['id'];
type FormatType = typeof formatOptions[number]['id'];

export default function PlaygroundPage() {
  const { isSignedIn, user } = useUser();
  const [url, setUrl] = useState('https://example.com');
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [mockup, setMockup] = useState<string>('browser-light');
  const [mockupTemplates, setMockupTemplates] = useState<MockupTemplate[]>([]);
  const [format, setFormat] = useState<FormatType>('png');
  const [quality, setQuality] = useState(90);
  const [fullPage, setFullPage] = useState(false);
  const [delay, setDelay] = useState(0);
  const [aiRemoval, setAiRemoval] = useState({
    enabled: false,
    types: ['cookie-banner', 'newsletter', 'chat-widget', 'social-overlay', 'ad'],
    confidence: 0.8,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    const fetchMockups = async () => {
      try {
        const response = await fetch('/api/mockups');
        if (!response.ok) throw new Error('Failed to fetch mockups');
        const data = await response.json();
        setMockupTemplates(data);
      } catch (err) {
        console.error('Failed to fetch mockups:', err);
      }
    };

    fetchMockups();
  }, []);

  const getDeviceIcon = (id: string) => {
    if (id.includes('browser')) return Monitor;
    if (id.includes('iphone')) return Smartphone;
    if (id.includes('macbook')) return Laptop;
    return Monitor;
  };

  const mockupOptions: MockupOption[] = [
    { id: 'none', name: 'No Mockup', icon: Monitor, dimensions: 'Original size' },
    ...mockupTemplates.map(template => ({
      id: template.id,
      name: template.name,
      icon: getDeviceIcon(template.id),
      dimensions: `${template.dimensions.width}×${template.dimensions.height}`,
      description: template.description,
    })),
  ];

  // Smart viewport suggestion based on mockup selection
  const getSuggestedDevice = (mockupId: string): DeviceType => {
    if (mockupId.includes('browser')) return 'desktop';
    if (mockupId.includes('iphone') || mockupId.includes('mobile')) return 'mobile';
    if (mockupId.includes('ipad')) return 'tablet';
    if (mockupId.includes('macbook') || mockupId.includes('laptop')) return 'laptop';
    return 'desktop';
  };

  // Auto-adjust device when mockup changes
  const handleMockupChange = (newMockup: string) => {
    setMockup(newMockup);
    if (newMockup !== 'none') {
      const suggestedDevice = getSuggestedDevice(newMockup);
      if (device !== suggestedDevice) {
        setDevice(suggestedDevice);
      }
    }
  };

  const captureScreenshot = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setSuccessMessage(null);
      setHasAttempted(true);

      const payload = {
        url,
        device,
        mockup: mockup === 'none' ? undefined : mockup,
        format,
        quality: format === 'jpeg' ? quality : undefined,
        fullPage,
        delay,
        aiRemoval,
      };
      
      const response = await fetch('/api/screenshot-playground', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        
        // Handle specific error cases
        if (response.status === 429) {
          throw new Error(`Rate limit exceeded. ${error.message}`);
        } else if (response.status === 401 && error.requiresAuth) {
          throw new Error('AI features require sign-in. Please sign in to use AI features.');
        } else {
          throw new Error(error.message || 'Failed to capture screenshot');
        }
      }

      // Convert the response to a blob and create an object URL
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setResult(objectUrl);
      setSuccessMessage('Screenshot captured successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
    setSuccessMessage(null);
    setHasAttempted(false);
  };

  const renderProFeatureTooltip = (children: React.ReactNode, feature: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="opacity-50 cursor-not-allowed">
            {children}
            <Lock className="w-4 h-4 inline-block ml-2" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{feature} is only available with authentication</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <GuestLayout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Screenshot Playground</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try out our AI-powered screenshot API with various options and device mockups. 
              Perfect for testing before integrating into your workflow.
            </p>
          </div>

          {/* Status Card */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {isSignedIn ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          Signed in as {user?.firstName || 'User'}
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ScanSearch className="w-5 h-5" />
                    Screenshot Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your screenshot settings and options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* URL Input */}
                  <div className="space-y-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="text-sm"
                    />
                  </div>

                  {/* Device Selection */}
                  <div className="space-y-2">
                    <Label>Device Viewport</Label>
                    <Select value={device} onValueChange={(value: DeviceType) => setDevice(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex items-center gap-2">
                              <option.icon className="w-4 h-4" />
                              <span>{option.name}</span>
                              <span className="text-muted-foreground text-sm">({option.dimensions})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Mockup Selection */}
                  <div className="space-y-2">
                    <Label>Device Mockup</Label>
                    <Select value={mockup} onValueChange={handleMockupChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockupOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex items-center gap-2">
                              <option.icon className="w-4 h-4" />
                              <span>{option.name}</span>
                              <span className="text-muted-foreground text-sm">({option.dimensions})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Smart suggestions */}
                    {mockup !== 'none' && device !== getSuggestedDevice(mockup) && (
                      <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5">💡</div>
                        <div className="text-sm">
                          <p className="text-yellow-800 dark:text-yellow-200 font-medium">Viewport Suggestion</p>
                          <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                            For best results with {mockupOptions.find(m => m.id === mockup)?.name}, 
                            consider using <strong>{getSuggestedDevice(mockup)}</strong> viewport.
                          </p>
                          <button
                            onClick={() => setDevice(getSuggestedDevice(mockup))}
                            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 underline text-sm mt-1"
                          >
                            Apply suggestion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select value={format} onValueChange={(value: FormatType) => setFormat(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formatOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{option.name}</span>
                              <span className="text-xs text-muted-foreground">{option.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                                      {/* Advanced Options */}
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-medium text-sm text-foreground">Advanced Options</h4>
                    
                    {/* JPEG Quality */}
                    {format === 'jpeg' && (
                      <div className="space-y-2">
                        <Label>JPEG Quality: {quality}%</Label>
                        <Input
                          type="range"
                          min="1"
                          max="100"
                          value={quality}
                          onChange={(e) => setQuality(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Delay */}
                    <div className="space-y-2">
                      <Label>Capture Delay: {delay}ms</Label>
                      <Input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Wait for dynamic content and animations to load
                      </p>
                    </div>

                    {/* Full Page Option */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="full-page">Capture full page</Label>
                        <p className="text-xs text-muted-foreground">Capture entire scrollable content</p>
                      </div>
                      <Switch
                        id="full-page"
                        checked={fullPage}
                        onCheckedChange={setFullPage}
                      />
                    </div>

                    {/* AI Element Removal */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>AI Element Removal</Label>
                          <p className="text-xs text-muted-foreground">
                            {isSignedIn ? 'Remove ads, banners, and popups' : 'Requires authentication'}
                          </p>
                        </div>
                        {isSignedIn ? (
                          <Switch
                            checked={aiRemoval.enabled}
                            onCheckedChange={(enabled) => setAiRemoval(prev => ({ ...prev, enabled }))}
                          />
                        ) : (
                          renderProFeatureTooltip(
                            <Switch checked={false} disabled={true} />,
                            "AI Element Removal requires authentication"
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4 border-t">
                    <Button
                      onClick={captureScreenshot}
                      disabled={loading || !url}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Capturing Screenshot...
                        </>
                      ) : (
                        <>
                          <ScanSearch className="w-4 h-4 mr-2" />
                          Capture Screenshot
                        </>
                      )}
                    </Button>

                    {(result || error) && (
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset & Try Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card className="min-h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    {loading 
                      ? 'Capturing your screenshot...' 
                      : result 
                        ? 'Your screenshot is ready!'
                        : hasAttempted 
                          ? 'Something went wrong'
                          : 'Configure settings and click "Capture Screenshot" to see results'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading && (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                      <div className="relative">
                        <Monitor className="w-16 h-16 text-muted-foreground" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">Processing your screenshot...</p>
                        <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds</p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="py-8">
                      <Alert variant="destructive">
                        <AlertTitle>Screenshot Failed</AlertTitle>
                        <AlertDescription className="mt-2">{error}</AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-4">
                      {successMessage && (
                        <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <AlertTitle className="text-green-800 dark:text-green-200">Success!</AlertTitle>
                          <AlertDescription className="text-green-700 dark:text-green-300">{successMessage}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="bg-muted/50 rounded-lg overflow-hidden border-2 border-dashed border-border">
                        <Image
                          src={result}
                          alt="Screenshot"
                          width={1920}
                          height={1080}
                          className="w-full h-auto max-h-96 object-contain"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button asChild className="flex-1">
                          <a href={result} download={`screenshot-${Date.now()}.${format}`}>
                            <Download className="w-4 h-4 mr-2" />
                            Download {format.toUpperCase()}
                          </a>
                        </Button>
                        <Button variant="outline" onClick={() => window.open(result, '_blank')}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  )}

                  {!result && !loading && !hasAttempted && (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                      <Monitor className="w-16 h-16 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Ready to capture</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your screenshot will appear here once captured
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Examples */}
              <Card className="p-4">
                <h3 className="font-medium text-foreground mb-3">Quick Start Examples</h3>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => {
                      setUrl('https://github.com');
                      setMockup('browser-light');
                      setDevice('desktop');
                      setQuality(90);
                    }}
                    className="text-left p-2 rounded bg-muted hover:bg-muted/80 text-sm"
                  >
                    <div className="font-medium">GitHub Homepage</div>
                    <div className="text-muted-foreground">Desktop • Browser Light</div>
                  </button>
                  <button
                    onClick={() => {
                      setUrl('https://tailwindcss.com');
                      setMockup('macbook-pro');
                      setDevice('laptop');
                      setQuality(95);
                    }}
                    className="text-left p-2 rounded bg-muted hover:bg-muted/80 text-sm"
                  >
                    <div className="font-medium">Tailwind CSS</div>
                    <div className="text-muted-foreground">Laptop • MacBook Pro</div>
                  </button>
                  <button
                    onClick={() => {
                      setUrl('https://stripe.com');
                      setMockup('iphone-14');
                      setDevice('mobile');
                      setQuality(90);
                    }}
                    className="text-left p-2 rounded bg-muted hover:bg-muted/80 text-sm"
                  >
                    <div className="font-medium">Stripe Mobile</div>
                    <div className="text-muted-foreground">Mobile • iPhone 14 Pro</div>
                  </button>
                  <button
                    onClick={() => {
                      setUrl('https://apple.com/ipad-pro');
                      setMockup('ipad-pro');
                      setDevice('tablet');
                      setQuality(95);
                    }}
                    className="text-left p-2 rounded bg-muted hover:bg-muted/80 text-sm"
                  >
                    <div className="font-medium">iPad Pro Showcase</div>
                    <div className="text-muted-foreground">Tablet • iPad Pro 12.9&quot;</div>
                  </button>
                </div>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
