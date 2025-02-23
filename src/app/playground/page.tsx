'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Smartphone, Laptop, Monitor, Tablet } from "lucide-react";

const deviceOptions = [
  { id: 'desktop', name: 'Desktop', icon: Monitor, dimensions: '1920×1080' },
  { id: 'laptop', name: 'Laptop', icon: Laptop, dimensions: '1366×768' },
  { id: 'tablet', name: 'Tablet', icon: Tablet, dimensions: '768×1024' },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, dimensions: '375×812' },
] as const;

const formatOptions = [
  { id: 'png', name: 'PNG', description: 'Best for screenshots with transparency' },
  { id: 'jpeg', name: 'JPEG', description: 'Smaller file size, adjustable quality' },
  { id: 'pdf', name: 'PDF', description: 'Document format (mockups not available)' },
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

export default function PlaygroundPage() {
  const [url, setUrl] = useState('');
  const [device, setDevice] = useState<typeof deviceOptions[number]['id']>('desktop');
  const [mockup, setMockup] = useState<string>('none');
  const [mockupTemplates, setMockupTemplates] = useState<MockupTemplate[]>([]);
  const [format, setFormat] = useState<typeof formatOptions[number]['id']>('png');
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

  const captureScreenshot = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

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
      
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PLAYGROUND_API_KEY}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to capture screenshot');
      }

      // Convert the response to a blob and create an object URL
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setResult(objectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Screenshot Tool</h1>
            <p className="mt-2 text-gray-600">
              Try out the screenshot API with various options and mockups
            </p>
          </div>

          <Tabs defaultValue="capture" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="capture">Capture Screenshot</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>

            <TabsContent value="capture">
              <Card>
                <CardHeader>
                  <CardTitle>Screenshot Options</CardTitle>
                  <CardDescription>
                    Configure your screenshot settings
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
                    />
                  </div>

                  {/* Device Selection */}
                  <div className="space-y-2">
                    <Label>Device</Label>
                    <Select value={device} onValueChange={(value) => setDevice(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex items-center gap-2">
                              <option.icon className="w-4 h-4" />
                              <span>{option.name}</span>
                              <span className="text-gray-500 text-sm">({option.dimensions})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Mockup Selection */}
                  <div className="space-y-2">
                    <Label>Device Mockup</Label>
                    <Select value={mockup} onValueChange={setMockup}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockupOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <option.icon className="w-4 h-4" />
                                <span>{option.name}</span>
                                <span className="text-gray-500 text-sm">({option.dimensions})</span>
                              </div>
                              {option.description && (
                                <span className="text-gray-500 text-sm mt-1">{option.description}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select value={format} onValueChange={(value) => setFormat(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formatOptions.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <div className="flex flex-col">
                              <span>{option.name}</span>
                              <span className="text-gray-500 text-sm">{option.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* JPEG Quality */}
                  {format === 'jpeg' && (
                    <div className="space-y-2">
                      <Label>JPEG Quality ({quality}%)</Label>
                      <Input
                        type="range"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                      />
                    </div>
                  )}

                  {/* Delay */}
                  <div className="space-y-2">
                    <Label>Capture Delay ({delay}ms)</Label>
                    <Input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={delay}
                      onChange={(e) => setDelay(Number(e.target.value))}
                    />
                    <p className="text-sm text-gray-500">
                      Useful for pages with dynamic content or animations
                    </p>
                  </div>

                  {/* Full Page Option */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="full-page"
                      checked={fullPage}
                      onCheckedChange={setFullPage}
                    />
                    <Label htmlFor="full-page">Capture full page</Label>
                  </div>

                  {/* AI Element Removal */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>AI Element Removal</Label>
                      <Switch
                        checked={aiRemoval.enabled}
                        onCheckedChange={(checked) => 
                          setAiRemoval(prev => ({ ...prev, enabled: checked }))
                        }
                      />
                    </div>
                    
                    {aiRemoval.enabled && (
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Element Types to Remove</Label>
                          <div className="grid gap-2">
                            {[
                              { id: 'cookie-banner', label: 'Cookie Banners' },
                              { id: 'newsletter', label: 'Newsletter Popups' },
                              { id: 'chat-widget', label: 'Chat Widgets' },
                              { id: 'social-overlay', label: 'Social Media Overlays' },
                              { id: 'ad', label: 'Advertisements' },
                            ].map(({ id, label }) => (
                              <div key={id} className="flex items-center space-x-2">
                                <Switch
                                  id={id}
                                  checked={aiRemoval.types.includes(id)}
                                  onCheckedChange={(checked) => 
                                    setAiRemoval(prev => ({
                                      ...prev,
                                      types: checked 
                                        ? [...prev.types, id]
                                        : prev.types.filter(t => t !== id)
                                    }))
                                  }
                                />
                                <Label htmlFor={id}>{label}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Confidence Threshold ({Math.round(aiRemoval.confidence * 100)}%)</Label>
                          <Input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={aiRemoval.confidence}
                            onChange={(e) => setAiRemoval(prev => ({
                              ...prev,
                              confidence: parseFloat(e.target.value)
                            }))}
                          />
                          <p className="text-sm text-gray-500">
                            Higher values mean more accurate but potentially fewer detections
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={captureScreenshot}
                    disabled={loading || !url}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Capturing...
                      </>
                    ) : (
                      'Capture Screenshot'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="result">
              <Card>
                <CardHeader>
                  <CardTitle>Screenshot Result</CardTitle>
                  <CardDescription>
                    {result ? 'Your captured screenshot' : 'No screenshot captured yet'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-4">
                      <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border">
                        <img
                          src={result}
                          alt="Screenshot"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button asChild variant="outline">
                          <a href={result} download={`screenshot.${format}`}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Capture a screenshot to see the result</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 