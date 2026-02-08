'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Camera, Download, ArrowRight, Loader2, AlertCircle, CheckCircle, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const devicePresets = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: 1920, height: 1080 },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: 768, height: 1024 },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: 375, height: 812 },
];

export default function ScreenshotToolClient() {
    const [url, setUrl] = useState('');
    const [device, setDevice] = useState('desktop');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
    const [captureCount, setCaptureCount] = useState(0);

    const handleCapture = useCallback(async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        // Basic URL validation
        let validUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            validUrl = 'https://' + url;
        }

        try {
            new URL(validUrl);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        setError(null);
        setScreenshotUrl(null);

        try {
            const response = await fetch('/api/screenshot-playground', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: validUrl,
                    device,
                    format: 'png',
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to capture screenshot');
            }

            // Create blob URL from response
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setScreenshotUrl(objectUrl);
            setCaptureCount((prev) => prev + 1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [url, device]);

    const handleDownload = useCallback(() => {
        if (!screenshotUrl) return;

        const link = document.createElement('a');
        link.href = screenshotUrl;
        link.download = `screenshot-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [screenshotUrl]);

    return (
        <div className="space-y-8">
            {/* Tool Interface */}
            <div className="bg-card border rounded-xl p-6 md:p-8">
                <div className="space-y-6">
                    {/* URL Input */}
                    <div className="space-y-2">
                        <Label htmlFor="url">Website URL</Label>
                        <div className="flex gap-2">
                            <Input
                                id="url"
                                type="text"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCapture()}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleCapture}
                                disabled={loading || !url}
                                className="min-w-[140px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Capturing...
                                    </>
                                ) : (
                                    <>
                                        <Camera className="w-4 h-4 mr-2" />
                                        Capture
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Device Selection */}
                    <div className="space-y-2">
                        <Label>Device</Label>
                        <div className="flex gap-2">
                            {devicePresets.map((preset) => {
                                const IconComponent = preset.icon;
                                return (
                                    <Button
                                        key={preset.id}
                                        variant={device === preset.id ? 'default' : 'outline'}
                                        onClick={() => setDevice(preset.id)}
                                        className="flex-1"
                                    >
                                        <IconComponent className="w-4 h-4 mr-2" />
                                        {preset.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Result Display */}
            {screenshotUrl && (
                <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="font-medium">Screenshot captured successfully</span>
                        </div>
                        <Button onClick={handleDownload} variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download PNG
                        </Button>
                    </div>
                    <div className="p-4 bg-muted/30">
                        <div className="overflow-hidden rounded-lg border bg-background">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={screenshotUrl}
                                alt="Captured screenshot"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!screenshotUrl && !loading && (
                <div className="bg-muted/30 border-2 border-dashed rounded-xl p-12 text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No screenshot yet</h3>
                    <p className="text-muted-foreground">
                        Enter a URL above and click Capture to take a screenshot
                    </p>
                </div>
            )}

            {/* Usage Counter */}
            {captureCount > 0 && (
                <div className="text-center text-sm text-muted-foreground">
                    You&apos;ve captured {captureCount} screenshot{captureCount !== 1 ? 's' : ''} in this session.{' '}
                    <Link href="/sign-up" className="text-primary hover:underline">
                        Sign up free
                    </Link>{' '}
                    to unlock API access.
                </div>
            )}

            {/* API Promo */}
            <div className="bg-primary/10 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Need API Access?</h3>
                        <p className="text-muted-foreground">
                            Automate screenshots programmatically with our REST API.
                            Get 100 free screenshots to start.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button asChild>
                            <Link href="/sign-up">
                                Get API Key Free
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/help">
                                View Docs
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
