'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Globe, Image as ImageIcon, Download, ArrowRight } from 'lucide-react';

export default function ScreenshotCapture() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const captureScreenshot = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/screenshot/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url,
          width: 1920,
          height: 1080
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to capture screenshot');
      }

      setScreenshot(data.screenshot);

      if (data.screenshot) {
        await applyMockup(data.screenshot, 'browser-light');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const applyMockup = async (screenshotUrl: string, mockupId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/mockups/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          screenshotUrl,
          mockupId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to apply mockup');
      }

      setFinalImage(data.mockup);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="capture" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="capture">
            <Globe className="w-4 h-4 mr-2" />
            Capture Screenshot
          </TabsTrigger>
          <TabsTrigger value="result">
            <ImageIcon className="w-4 h-4 mr-2" />
            Result
          </TabsTrigger>
        </TabsList>

        <TabsContent value="capture">
          <Card>
            <CardHeader>
              <CardTitle>Capture Screenshot</CardTitle>
              <CardDescription>
                Enter a URL to capture a beautiful screenshot with our professional mockups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <div className="flex gap-3">
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="flex-1"
                    />
                    <Button
                      onClick={captureScreenshot}
                      disabled={loading || !url}
                      size="lg"
                      className="min-w-[140px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Capturing...
                        </>
                      ) : (
                        <>
                          Capture
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <h3 className="font-medium mb-2">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">1</div>
                      We capture a high-quality screenshot of your website
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">2</div>
                      Apply a professional browser mockup template
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">3</div>
                      Generate a beautiful final image ready to use
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result">
          <Card>
            <CardHeader>
              <CardTitle>Screenshot Result</CardTitle>
              <CardDescription>
                Your captured screenshot with professional mockup applied
              </CardDescription>
            </CardHeader>
            <CardContent>
              {finalImage ? (
                <div className="space-y-6">
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border shadow-sm">
                    <img
                      src={finalImage}
                      alt="Screenshot with mockup"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <a href={finalImage} download="screenshot-mockup.png">
                        <Download className="w-4 h-4 mr-2" />
                        Download Image
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No screenshot captured yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 