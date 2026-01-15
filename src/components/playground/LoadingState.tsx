'use client';

import { Loader2, Monitor } from "lucide-react";

interface LoadingStateProps {
  loading: boolean;
  hasAttempted: boolean;
}

export const LoadingState = ({ loading, hasAttempted }: LoadingStateProps) => {
  if (loading) {
    return (
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
    );
  }

  if (!hasAttempted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
        <Monitor className="w-16 h-16 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Ready to capture</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your screenshot will appear here once captured
          </p>
        </div>
      </div>
    );
  }

  return null;
};
