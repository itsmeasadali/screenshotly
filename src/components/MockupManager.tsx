'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MockupTemplate } from '@/types/mockup';
import { Monitor, Smartphone, Laptop, Layout, Tablet, MonitorSpeaker, Watch, Tv, Sparkles, Filter, Copy, Maximize2, X, Check } from 'lucide-react';
import Image from 'next/image';

interface PreviewModalProps {
  mockup: MockupTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

function PreviewModal({ mockup, isOpen, onClose }: PreviewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !mockup) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const apiExample = `{
  "url": "https://example.com",
  "mockup": "${mockup.id}",
  "format": "png"
}`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{mockup.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{mockup.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Template Preview</h4>
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
                <Image
                  src={mockup.imagePath}
                  alt={mockup.name}
                  width={mockup.dimensions.width}
                  height={mockup.dimensions.height}
                  className="w-full h-auto rounded-xl shadow-sm"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Features */}
              {mockup.features && mockup.features.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockup.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Specifications</h4>
                <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Template Size</span>
                    <span className="text-sm font-mono text-foreground">
                      {mockup.dimensions.width}×{mockup.dimensions.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Screenshot Area</span>
                    <span className="text-sm font-mono text-foreground">
                      {mockup.screenshotPlacement.width}×{mockup.screenshotPlacement.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge variant="secondary" className="text-xs">
                      {mockup.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* API Usage */}
              <div>
                <h4 className="font-medium text-foreground mb-3">API Usage</h4>
                <div className="bg-gray-900 rounded-xl p-4 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-mono">JSON</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(apiExample)}
                      className="text-gray-400 hover:text-white"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="text-gray-300 overflow-x-auto">
                    <code>{apiExample}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MockupManager() {
  const [mockups, setMockups] = useState<MockupTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewMockup, setPreviewMockup] = useState<MockupTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    fetchMockups();
  }, []);

  const fetchMockups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/mockups');
      const data = await response.json();
      setMockups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch mockups');
    } finally {
      setLoading(false);
    }
  };

  const openPreview = (mockup: MockupTemplate) => {
    setPreviewMockup(mockup);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewMockup(null);
  };

  const getDeviceIcon = (category: string) => {
    switch (category) {
      case 'browser': return <Monitor className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      case 'laptop': return <Laptop className="w-5 h-5" />;
      case 'desktop': return <MonitorSpeaker className="w-5 h-5" />;
      case 'multi-device': return <Layout className="w-5 h-5" />;
      case 'smartwatch': return <Watch className="w-5 h-5" />;
      case 'tv': return <Tv className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'browser': return 'text-foreground bg-muted border';
      case 'mobile': return 'text-foreground bg-muted border';
      case 'tablet': return 'text-foreground bg-muted border';
      case 'laptop': return 'text-foreground bg-muted border';
      case 'desktop': return 'text-foreground bg-muted border';
      case 'multi-device': return 'text-foreground bg-muted border';
      case 'smartwatch': return 'text-foreground bg-muted border';
      case 'tv': return 'text-foreground bg-muted border';
      default: return 'text-muted-foreground bg-muted border';
    }
  };

  const categories = [
    { id: 'all', name: 'All Templates', icon: Filter, count: mockups.length },
    { id: 'browser', name: 'Browser', icon: Monitor, count: mockups.filter(m => m.category === 'browser').length },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, count: mockups.filter(m => m.category === 'mobile').length },
    { id: 'tablet', name: 'Tablet', icon: Tablet, count: mockups.filter(m => m.category === 'tablet').length },
    { id: 'laptop', name: 'Laptop', icon: Laptop, count: mockups.filter(m => m.category === 'laptop').length },
    { id: 'multi-device', name: 'Multi-Device', icon: Layout, count: mockups.filter(m => m.category === 'multi-device').length },
  ].filter(category => category.id === 'all' || category.count > 0); // Only show categories with templates

  const filteredMockups = selectedCategory === 'all' 
    ? mockups 
    : mockups.filter(mockup => mockup.category === selectedCategory);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Category Filter Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-10 w-24 flex-shrink-0 animate-pulse"></div>
          ))}
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Category Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Filter by Category</h3>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    isActive ? 'bg-primary hover:bg-primary/90' : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  {category.count > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-white/20 text-current border-none">
                      {category.count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Mockup Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMockups.map((mockup) => (
            <Card key={mockup.id} className="group overflow-hidden rounded-2xl border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent group-hover:from-black/10 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(mockup.category)}`}>
                  {getDeviceIcon(mockup.category)}
                  {mockup.category}
                </div>

                {/* Features Badge */}
                {mockup.features && mockup.features.length > 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground border-none">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {mockup.features.length} features
                    </Badge>
                  </div>
                )}

                {/* Preview Button */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => openPreview(mockup)}
                    size="sm"
                    className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background shadow-lg"
                  >
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
                
                <Image
                  src={mockup.imagePath}
                  alt={mockup.name}
                  width={mockup.dimensions.width}
                  height={mockup.dimensions.height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {mockup.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{mockup.description}</p>
                </div>

                {/* Features */}
                {mockup.features && mockup.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {mockup.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                        {feature}
                      </Badge>
                    ))}
                    {mockup.features.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{mockup.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Technical Details */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Template Size</span>
                    <span className="font-mono text-foreground text-xs bg-muted px-2 py-1 rounded">
                      {mockup.dimensions.width}×{mockup.dimensions.height}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Screenshot Area</span>
                    <span className="font-mono text-foreground text-xs bg-muted px-2 py-1 rounded">
                      {mockup.screenshotPlacement.width}×{mockup.screenshotPlacement.height}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="col-span-full p-6 bg-destructive/10 text-destructive rounded-xl text-sm border border-destructive/20">
            <div className="flex items-center gap-2">
              <span className="font-medium">Error:</span>
              {error}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredMockups.length === 0 && !loading && !error && (
          <div className="col-span-full text-center py-16">
            <div className="bg-gray-50 rounded-2xl p-12 border-2 border-dashed border-gray-200">
              <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-foreground mb-2">
                No templates found
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory === 'all' 
                  ? 'No mockup templates are available at the moment.'
                  : `No ${selectedCategory} templates found. Try selecting a different category.`
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory('all')}
                className="text-primary border-primary/20 hover:bg-primary/10"
              >
                View All Templates
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal 
        mockup={previewMockup}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
    </>
  );
} 