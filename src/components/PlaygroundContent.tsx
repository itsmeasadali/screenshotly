'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ConfigurationPanel } from '@/components/playground/ConfigurationPanel';
import { ResultsPanel } from '@/components/playground/ResultsPanel';
import { StatusCard } from '@/components/playground/StatusCard';
import { useScreenshotCapture } from '@/hooks/useScreenshotCapture';

type DeviceType = 'desktop' | 'laptop' | 'tablet' | 'mobile';
type FormatType = 'png' | 'jpeg' | 'pdf';

export default function PlaygroundContent() {
  const { isSignedIn, user } = useUser();
  const [url, setUrl] = useState('https://example.com');
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [mockup, setMockup] = useState<string>('browser-light');
  const [format, setFormat] = useState<FormatType>('png');
  const [quality, setQuality] = useState(90);
  const [fullPage, setFullPage] = useState(false);
  const [delay, setDelay] = useState(0);
  const [aiRemoval, setAiRemoval] = useState({
    enabled: false,
    types: ['cookie-banner', 'newsletter', 'chat-widget', 'social-overlay', 'ad'],
    confidence: 0.8,
  });

  const {
    result,
    error,
    loading,
    successMessage,
    hasAttempted,
    captureScreenshot,
    resetCapture,
  } = useScreenshotCapture();

  const handleCapture = () => {
    captureScreenshot({
        url,
        device,
      mockup,
        format,
      quality,
        fullPage,
        delay,
        aiRemoval,
    });
  };

  const handleExampleSelect = (example: {
    url: string;
    mockup: string;
    device: DeviceType;
    quality: number;
  }) => {
    setUrl(example.url);
    setMockup(example.mockup);
    setDevice(example.device);
    setQuality(example.quality);
  };

  return (
    <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Free Screenshot Playground</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              The Screenshotly Screenshot Playground is a free, interactive tool that lets you test our
              screenshot API without writing code. Configure device viewports, mockup frames, output
              formats, and AI element removal — then preview the result instantly.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              No signup required for basic captures. <Link href="/sign-up" className="text-primary hover:underline">Create a free account</Link> to
              unlock AI features and get an API key for programmatic access.
            </p>
          </div>

            <StatusCard isSignedIn={!!isSignedIn} userName={user?.firstName || undefined} />

          <div className="grid lg:grid-cols-2 gap-8">
              <ConfigurationPanel
                url={url}
                device={device}
                mockup={mockup}
                format={format}
                quality={quality}
                delay={delay}
                fullPage={fullPage}
                aiRemoval={aiRemoval}
                loading={loading}
                isSignedIn={!!isSignedIn}
                hasResult={!!result}
                hasError={!!error}
                onUrlChange={setUrl}
                onDeviceChange={setDevice}
                onMockupChange={setMockup}
                onFormatChange={setFormat}
                onQualityChange={setQuality}
                onDelayChange={setDelay}
                onFullPageChange={setFullPage}
                onAiRemovalChange={setAiRemoval}
                onCapture={handleCapture}
                onReset={resetCapture}
              />

              <ResultsPanel
                result={result}
                error={error}
                loading={loading}
                successMessage={successMessage}
                hasAttempted={hasAttempted}
                format={format}
                onExampleSelect={handleExampleSelect}
              />
          </div>

          {/* How to Use */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">How to Use the Playground</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-1">Enter a URL</h3>
                <p className="text-sm text-muted-foreground">
                  Paste any public website URL. Choose a device viewport and optional mockup frame.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-1">Configure Options</h3>
                <p className="text-sm text-muted-foreground">
                  Set the output format (PNG, JPEG, PDF), quality, delay, and AI element removal preferences.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-1">Capture &amp; Download</h3>
                <p className="text-sm text-muted-foreground">
                  Click Capture to render the page. Preview the result and download it, or copy the equivalent API call.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">What You Can Capture</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>High-resolution output</strong> — PNG (lossless), JPEG (compressed), WebP, or PDF in crisp quality</li>
                <li><strong>Custom viewports</strong> — desktop (1920px), laptop (1366px), tablet (768px), and mobile (375px) presets</li>
                <li><strong>Device mockup frames</strong> — wrap screenshots in realistic iPhone, MacBook, or browser window overlays</li>
                <li><strong>AI element removal</strong> — automatically strip cookie banners, newsletter popups, chat widgets, and ads</li>
                <li><strong>Full-page or viewport capture</strong> — capture the entire scrollable page or just the visible viewport</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Who Is This For?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              The playground is built for developers who want to preview API output before integrating,
              marketers who need quick screenshots for campaigns or reports, and anyone who needs to
              capture a webpage without installing software. No code required — just enter a URL and go.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-center">Ready to Automate?</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              The playground uses the same screenshot API that developers integrate into their apps.
              When you&apos;re ready to automate captures at scale, check out our{' '}
              <Link href="/pricing" className="text-primary hover:underline">pricing plans</Link>
              {' '}and{' '}
              <Link href="/help" className="text-primary hover:underline">API documentation</Link>.
            </p>

            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/tools" className="text-primary hover:underline">Free screenshot tools</Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/integrations" className="text-primary hover:underline">Integration guides</Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/help" className="text-primary hover:underline">API documentation</Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/pricing" className="text-primary hover:underline">Pricing plans</Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/use-cases" className="text-primary hover:underline">Use cases</Link>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}
