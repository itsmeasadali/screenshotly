'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";
import { ScreenshotPreview } from "./ScreenshotPreview";
import { LoadingState } from "./LoadingState";
import { QuickExamples } from "./QuickExamples";

interface ResultsPanelProps {
  result: string | null;
  error: string | null;
  loading: boolean;
  successMessage: string | null;
  hasAttempted: boolean;
  format: string;
  onExampleSelect: (example: {
    url: string;
    mockup: string;
    device: 'desktop' | 'laptop' | 'tablet' | 'mobile';
    quality: number;
  }) => void;
}

export const ResultsPanel = ({
  result,
  error,
  loading,
  successMessage,
  hasAttempted,
  format,
  onExampleSelect,
}: ResultsPanelProps) => {
  const getDescription = () => {
    if (loading) return 'Capturing your screenshot...';
    if (result) return 'Your screenshot is ready!';
    if (hasAttempted) return 'Something went wrong';
    return 'Configure settings and click "Capture Screenshot" to see results';
  };

  return (
    <div className="space-y-6">
      <Card className="min-h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Live Preview
          </CardTitle>
          <CardDescription>
            {getDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingState loading={loading} hasAttempted={hasAttempted} />
          
          <ScreenshotPreview
            result={result}
            error={error}
            successMessage={successMessage}
            format={format}
          />
        </CardContent>
      </Card>

      <QuickExamples onExampleSelect={onExampleSelect} />
    </div>
  );
};
