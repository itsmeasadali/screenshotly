import { Metadata } from 'next';
import GuestLayout from '@/components/layouts/GuestLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, Globe, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: "API Status",
  description: "Real-time operational status of the Screenshotly screenshot API, AI processing, authentication, and dashboard services.",
  alternates: {
    canonical: "/status",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function StatusPage() {
  // Stub data. Replace with real values from a monitoring API (Better Uptime,
  // StatusPage.io, Atlassian Statuspage, a custom Prometheus endpoint, etc.)
  // before wiring this page into production. The page is noindexed so stub
  // content is not indexed by search engines, but it is still visible to any
  // user who lands here — keep it honest.
  const services = [
    {
      name: "Screenshot API",
      status: "operational",
      description: "Core screenshot capture service",
      uptime: "—",
    },
    {
      name: "AI Processing",
      status: "operational",
      description: "Element removal and image processing",
      uptime: "—",
    },
    {
      name: "Authentication",
      status: "operational",
      description: "User authentication and API keys",
      uptime: "—",
    },
    {
      name: "Dashboard",
      status: "operational",
      description: "Web dashboard and user interface",
      uptime: "—",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-foreground';
      case 'degraded': return 'text-muted-foreground';
      case 'outage': return 'text-destructive';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'degraded': return AlertCircle;
      case 'outage': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-muted text-foreground';
      case 'degraded': return 'bg-muted text-muted-foreground';
      case 'outage': return 'bg-destructive/10 text-destructive';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <GuestLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">API Status</h1>
          <p className="text-xl text-muted-foreground">
            Real-time status of Screenshotly services and infrastructure
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8 border bg-muted/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-foreground" />
              <div>
                <CardTitle className="text-foreground">All Systems Operational</CardTitle>
                <CardDescription className="text-muted-foreground">
                  All services are running normally
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Service Status */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Service Status</h2>
          {services.map((service, index) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <StatusIcon className={`w-6 h-6 ${getStatusColor(service.status)}`} />
                      <div>
                        <h3 className="font-semibold text-foreground">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{service.uptime}</p>
                        <p className="text-xs text-muted-foreground">30-day uptime</p>
                      </div>
                      <Badge className={getStatusBadge(service.status)}>
                        {service.status === 'operational' ? 'Operational' :
                          service.status === 'degraded' ? 'Degraded' : 'Outage'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Availability Target</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">99.9%</div>
              <p className="text-sm text-muted-foreground">Operational SLO</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Capture Latency</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">2–5s</div>
              <p className="text-sm text-muted-foreground">Typical end-to-end capture</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Transport</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">TLS 1.3</div>
              <p className="text-sm text-muted-foreground">All API traffic encrypted in transit</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            For live incident updates, subscribe to the{' '}
            <a href="/changelog" className="text-primary hover:underline">changelog</a>.
            Report issues or reach support at{' '}
            <a href="mailto:support@screenshotly.app" className="text-primary hover:underline">
              support@screenshotly.app
            </a>.
          </p>
        </div>
      </div>
    </GuestLayout>
  );
} 