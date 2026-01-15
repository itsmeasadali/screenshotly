'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Play } from 'lucide-react';

interface PlaygroundTesterProps {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  defaultPayload: Record<string, unknown>;
}

export default function PlaygroundTester({
  endpoint,
  method,
  defaultPayload
}: PlaygroundTesterProps) {
  const [payload, setPayload] = useState(JSON.stringify(defaultPayload, null, 2));
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' ? payload : undefined,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Request Payload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Request Payload
          </label>
          <div className="relative">
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-[300px] font-mono text-sm p-4 bg-muted rounded-lg border focus:border-ring focus:ring-1 focus:ring-ring"
              placeholder="Enter JSON payload..."
            />
          </div>
        </div>

        {/* Response */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Response
          </label>
          <div className="relative h-[300px] bg-muted rounded-lg border overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
              </div>
            ) : error ? (
              <div className="p-4 text-destructive font-mono text-sm whitespace-pre-wrap">
                Error: {error}
              </div>
            ) : response ? (
              <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
                {response}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Response will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          Test API
        </Button>
      </div>
    </div>
  );
} 