'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { MockupTemplate } from '@/types/mockup';
import { Monitor, Smartphone, Laptop, Layout } from 'lucide-react';
import Image from 'next/image';

export default function MockupManager() {
  const [mockups, setMockups] = useState<MockupTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-80"></div>
        ))}
      </div>
    );
  }

  const getDeviceIcon = (id: string) => {
    if (id.includes('browser')) return <Monitor className="w-5 h-5" />;
    if (id.includes('iphone')) return <Smartphone className="w-5 h-5" />;
    if (id.includes('macbook')) return <Laptop className="w-5 h-5" />;
    if (id.includes('multi')) return <Layout className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  const getDeviceColor = (id: string) => {
    if (id.includes('browser')) return 'text-blue-500 bg-blue-50';
    if (id.includes('iphone')) return 'text-green-500 bg-green-50';
    if (id.includes('macbook')) return 'text-purple-500 bg-purple-50';
    if (id.includes('multi')) return 'text-indigo-500 bg-indigo-50';
    return 'text-gray-500 bg-gray-50';
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockups.map((mockup) => (
        <Card key={mockup.id} className="group overflow-hidden rounded-2xl border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-video">
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
            <Image
              src={mockup.imagePath}
              alt={mockup.name}
              width={mockup.dimensions.width}
              height={mockup.dimensions.height}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{mockup.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{mockup.description}</p>
              </div>
              <span className={`flex items-center justify-center p-2 rounded-lg ${getDeviceColor(mockup.id)}`}>
                {getDeviceIcon(mockup.id)}
              </span>
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Template Size</span>
                <span className="font-mono text-gray-700">{mockup.dimensions.width}×{mockup.dimensions.height}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Screenshot Area</span>
                <span className="font-mono text-gray-700">
                  {mockup.screenshotPlacement.width}×{mockup.screenshotPlacement.height}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {error && (
        <div className="col-span-full p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {mockups.length === 0 && !loading && (
        <div className="col-span-full text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No templates available</h3>
            <p className="mt-2 text-sm text-gray-500">
              Check back later for new mockup templates
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 