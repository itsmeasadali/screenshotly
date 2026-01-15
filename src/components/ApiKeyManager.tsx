'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyIcon, KeyRound, RefreshCwIcon, TrashIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
  expiresAt: string;
  lastUsedAt: string | null;
  status: string;
  usageCount: number;
  usageLimit: number;
}

export default function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      setError(null);
      const response = await fetch('/api/keys');
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to access your API keys');
        }
        if (response.status === 500) {
          throw new Error('Database connection error. Please ensure your database is set up correctly.');
        }
        throw new Error(`Failed to fetch API keys (${response.status})`);
      }
      const data = await response.json();
      setKeys(data.keys || []);
    } catch (err) {
      console.error('API keys fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName || 'Default API Key' }),
      });

      if (!response.ok) throw new Error('Failed to generate API key');

      const data = await response.json();
      setShowNewKey(data.apiKey);
      setNewKeyName('');
      fetchKeys();
      toast.success('API key generated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to generate API key');
    } finally {
      setLoading(false);
    }
  };

  const revokeApiKey = async (keyId: string) => {
    try {
      const response = await fetch(`/api/keys?id=${keyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to revoke API key');
      
      fetchKeys();
      toast.success('API key revoked successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke API key');
      toast.error('Failed to revoke API key');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-foreground';
      case 'expired':
        return 'bg-muted-foreground';
      case 'revoked':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Loading your API keys...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCwIcon className="w-6 h-6 animate-spin text-foreground" />
            <span className="ml-2 text-muted-foreground">Loading API keys...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Loading API Keys</AlertTitle>
        <AlertDescription className="mt-2">
          {error}
          {error.includes('Database connection') && (
            <div className="mt-4 p-4 bg-muted border rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Database Setup Required</h4>
              <p className="text-muted-foreground text-sm mb-3">
                To use API keys, you need to set up your database. Please follow these steps:
              </p>
              <ol className="text-muted-foreground text-sm space-y-1 list-decimal list-inside">
                <li>Set up your DATABASE_URL environment variable</li>
                <li>Run <code className="bg-muted px-1 rounded">npx prisma generate</code></li>
                <li>Run <code className="bg-muted px-1 rounded">npx prisma db push</code></li>
                <li>Refresh this page</li>
              </ol>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                size="sm" 
                className="mt-3"
              >
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="keys">
            <KeyRound className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="usage">
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Usage & Limits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for accessing the Screenshot API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <Input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="API Key Name (optional)"
                  className="flex-1"
                />
                <Button
                  onClick={generateApiKey}
                  disabled={loading}
                  variant="outline"
                  className="min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate New Key'
                  )}
                </Button>
              </div>

              {showNewKey && (
                <Alert className="bg-muted border">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  <AlertTitle className="text-foreground">New API Key Generated</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2 flex items-center gap-2">
                      <code className="flex-1 bg-background p-2 rounded font-mono text-sm border">
                        {showNewKey}
                      </code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(showNewKey)}
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Make sure to copy your API key now. You won&apos;t be able to see it again!
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {keys.map((key) => (
                  <div
                    key={key.id}
                    className="border rounded-lg p-4 space-y-3 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {key.name}
                          <Badge className={getStatusColor(key.status)}>
                            {key.status}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(key.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => revokeApiKey(key.id)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Usage</div>
                        <div className="font-medium">{key.usageCount} requests</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Rate Limit</div>
                        <div className="font-medium">
                          {key.usageLimit}/hour
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Expires</div>
                        <div className="font-medium">
                          {new Date(key.expiresAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {keys.length === 0 && !loading && (
                  <div className="text-center py-12 text-muted-foreground">
                    <KeyRound className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No API keys found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage & Limits</CardTitle>
              <CardDescription>
                Monitor your API usage and rate limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {keys.reduce((sum, key) => sum + key.usageCount, 0)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Active Keys
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {keys.filter(key => key.status.toLowerCase() === 'active').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Rate Limit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {keys[0]?.usageLimit || 0}/hr
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <h4 className="font-medium mb-4">Rate Limit Information</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Rate limits are applied per API key</p>
                    <p>• Unused requests do not roll over</p>
                    <p>• Rate limits reset at the top of each hour</p>
                    <p>• Consider using multiple keys for higher limits</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="text-sm text-gray-500">
        Don&apos;t share your API keys in publicly accessible places like GitHub repositories.
      </div>
    </div>
  );
} 