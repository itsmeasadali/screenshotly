'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ScanSearch, RefreshCw } from "lucide-react";
import { UrlInput } from "./UrlInput";
import { DeviceSelector } from "./DeviceSelector";
import { MockupSelector } from "./MockupSelector";
import { AdvancedOptions } from "./AdvancedOptions";
import { useMockupData } from "@/hooks/useMockupData";

interface ConfigurationPanelProps {
  url: string;
  device: 'desktop' | 'laptop' | 'tablet' | 'mobile';
  mockup: string;
  format: 'png' | 'jpeg' | 'pdf';
  quality: number;
  delay: number;
  fullPage: boolean;
  aiRemoval: {
    enabled: boolean;
    types: string[];
    confidence: number;
  };
  loading: boolean;
  isSignedIn: boolean;
  hasResult: boolean;
  hasError: boolean;
  onUrlChange: (url: string) => void;
  onDeviceChange: (device: 'desktop' | 'laptop' | 'tablet' | 'mobile') => void;
  onMockupChange: (mockup: string) => void;
  onFormatChange: (format: 'png' | 'jpeg' | 'pdf') => void;
  onQualityChange: (quality: number) => void;
  onDelayChange: (delay: number) => void;
  onFullPageChange: (fullPage: boolean) => void;
  onAiRemovalChange: (aiRemoval: { enabled: boolean; types: string[]; confidence: number }) => void;
  onCapture: () => void;
  onReset: () => void;
}

export const ConfigurationPanel = ({
  url,
  device,
  mockup,
  format,
  quality,
  delay,
  fullPage,
  aiRemoval,
  loading,
  isSignedIn,
  hasResult,
  hasError,
  onUrlChange,
  onDeviceChange,
  onMockupChange,
  onFormatChange,
  onQualityChange,
  onDelayChange,
  onFullPageChange,
  onAiRemovalChange,
  onCapture,
  onReset,
}: ConfigurationPanelProps) => {
  const { mockupOptions, getSuggestedDevice } = useMockupData();

  const handleMockupChange = (newMockup: string) => {
    onMockupChange(newMockup);
    if (newMockup !== 'none') {
      const suggestedDevice = getSuggestedDevice(newMockup);
      if (device !== suggestedDevice) {
        onDeviceChange(suggestedDevice);
      }
    }
  };

  return (
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
        <UrlInput url={url} onChange={onUrlChange} />
        
        <DeviceSelector device={device} onChange={onDeviceChange} />
        
        <MockupSelector
          mockup={mockup}
          mockupOptions={mockupOptions}
          suggestedDevice={getSuggestedDevice(mockup)}
          currentDevice={device}
          onMockupChange={handleMockupChange}
          onDeviceChange={onDeviceChange}
        />
        
        <AdvancedOptions
          format={format}
          quality={quality}
          delay={delay}
          fullPage={fullPage}
          aiRemoval={aiRemoval}
          isSignedIn={isSignedIn}
          onFormatChange={onFormatChange}
          onQualityChange={onQualityChange}
          onDelayChange={onDelayChange}
          onFullPageChange={onFullPageChange}
          onAiRemovalChange={onAiRemovalChange}
        />

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <Button
            onClick={onCapture}
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

          {(hasResult || hasError) && (
            <Button
              onClick={onReset}
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
  );
};
