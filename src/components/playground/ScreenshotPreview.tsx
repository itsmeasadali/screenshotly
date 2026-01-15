'use client';

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Download, ExternalLink } from "lucide-react";
import Image from 'next/image';

interface ScreenshotPreviewProps {
  result: string | null;
  error: string | null;
  successMessage: string | null;
  format: string;
}

export const ScreenshotPreview = ({ result, error, successMessage, format }: ScreenshotPreviewProps) => {
  if (error) {
    return (
      <div className="py-8">
        <Alert variant="destructive">
          <AlertTitle>Screenshot Failed</AlertTitle>
          <AlertDescription className="mt-2">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-4">
        {successMessage && (
          <Alert className="bg-muted border">
            <CheckCircle2 className="h-4 w-4 text-foreground" />
            <AlertTitle className="text-foreground">Success!</AlertTitle>
            <AlertDescription className="text-muted-foreground">{successMessage}</AlertDescription>
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
    );
  }

  return null;
};
