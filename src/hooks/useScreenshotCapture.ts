'use client';

import { useState } from 'react';

export interface ScreenshotConfig {
  url: string;
  device: 'desktop' | 'laptop' | 'tablet' | 'mobile';
  mockup: string;
  format: 'png' | 'jpeg' | 'pdf';
  quality: number;
  fullPage: boolean;
  delay: number;
  aiRemoval: {
    enabled: boolean;
    types: string[];
    confidence: number;
  };
}

export interface ScreenshotResult {
  result: string | null;
  error: string | null;
  loading: boolean;
  successMessage: string | null;
  hasAttempted: boolean;
}

export const useScreenshotCapture = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  const captureScreenshot = async (config: ScreenshotConfig) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setSuccessMessage(null);
      setHasAttempted(true);

      const payload = {
        url: config.url,
        device: config.device,
        mockup: config.mockup === 'none' ? undefined : config.mockup,
        format: config.format,
        quality: config.format === 'jpeg' ? config.quality : undefined,
        fullPage: config.fullPage,
        delay: config.delay,
        aiRemoval: config.aiRemoval,
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

  const resetCapture = () => {
    setResult(null);
    setError(null);
    setSuccessMessage(null);
    setHasAttempted(false);
  };

  return {
    result,
    error,
    loading,
    successMessage,
    hasAttempted,
    captureScreenshot,
    resetCapture,
  };
};
