'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import GuestLayout from '@/components/layouts/GuestLayout';
import { ConfigurationPanel } from '@/components/playground/ConfigurationPanel';
import { ResultsPanel } from '@/components/playground/ResultsPanel';
import { StatusCard } from '@/components/playground/StatusCard';
import { useScreenshotCapture } from '@/hooks/useScreenshotCapture';

type DeviceType = 'desktop' | 'laptop' | 'tablet' | 'mobile';
type FormatType = 'png' | 'jpeg' | 'pdf';

export default function PlaygroundPage() {
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
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
