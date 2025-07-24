'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MockupTemplate } from '@/types/mockup';
import { Monitor, Smartphone, Laptop, Layout, Tablet, MonitorSpeaker, Watch, Tv, Sparkles, Filter, Copy, ExternalLink, Maximize2, X, Check } from 'lucide-react';
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{mockup.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{mockup.description}</p>
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
              <h4 className="font-medium text-gray-900">Template Preview</h4>
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
                  <h4 className="font-medium text-gray-900 mb-3">Features</h4>
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
                <h4 className="font-medium text-gray-900 mb-3">Specifications</h4>
                <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Template Size</span>
                    <span className="text-sm font-mono text-gray-900">
                      {mockup.dimensions.width}×{mockup.dimensions.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Screenshot Area</span>
                    <span className="text-sm font-mono text-gray-900">
                      {mockup.screenshotPlacement.width}×{mockup.screenshotPlacement.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category</span>
                    <Badge variant="secondary" className="text-xs">
                      {mockup.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* API Usage */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">API Usage</h4>
                <div className="bg-gray-900 rounded-xl p-4 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-mono">JSON</span>
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
      case 'browser': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'mobile': return 'text-green-500 bg-green-50 border-green-200';
      case 'tablet': return 'text-purple-500 bg-purple-50 border-purple-200';
      case 'laptop': return 'text-indigo-500 bg-indigo-50 border-indigo-200';
      case 'desktop': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'multi-device': return 'text-pink-500 bg-pink-50 border-pink-200';
      case 'smartwatch': return 'text-teal-500 bg-teal-50 border-teal-200';
      case 'tv': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
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
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Filter by Category</h3>
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
                    isActive ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-50'
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
            <Card key={mockup.id} className="group overflow-hidden rounded-2xl border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 border-none">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {mockup.features.length} features
                    </Badge>
                  </div>
                )}

                {/* Preview Button */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => openPreview(mockup)}
                    className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white shadow-lg"
                    size="sm"
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
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {mockup.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{mockup.description}</p>
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
                    <span className="font-mono text-gray-700 text-xs bg-gray-50 px-2 py-1 rounded">
                      {mockup.dimensions.width}×{mockup.dimensions.height}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Screenshot Area</span>
                    <span className="font-mono text-gray-700 text-xs bg-gray-50 px-2 py-1 rounded">
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
          <div className="col-span-full p-6 bg-red-50 text-red-600 rounded-xl text-sm border border-red-200">
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
              <h3 className="text-xl font-medium text-gray-900 mb-2">
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
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
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