'use client';

import { useState, useEffect } from 'react';
import { Monitor, Smartphone, Laptop } from 'lucide-react';

export interface MockupTemplate {
  id: string;
  name: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
  };
  screenshotPlacement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imagePath: string;
}

export interface MockupOption {
  id: string;
  name: string;
  icon: typeof Monitor | typeof Smartphone | typeof Laptop;
  dimensions: string;
  description?: string;
}

export const useMockupData = () => {
  const [mockupTemplates, setMockupTemplates] = useState<MockupTemplate[]>([]);

  useEffect(() => {
    const fetchMockups = async () => {
      try {
        const response = await fetch('/api/mockups');
        if (!response.ok) throw new Error('Failed to fetch mockups');
        const data = await response.json();
        setMockupTemplates(data);
      } catch (err) {
        console.error('Failed to fetch mockups:', err);
      }
    };

    fetchMockups();
  }, []);

  const getDeviceIcon = (id: string) => {
    if (id.includes('browser')) return Monitor;
    if (id.includes('iphone')) return Smartphone;
    if (id.includes('macbook')) return Laptop;
    return Monitor;
  };

  const mockupOptions: MockupOption[] = [
    { id: 'none', name: 'No Mockup', icon: Monitor, dimensions: 'Original size' },
    ...mockupTemplates.map(template => ({
      id: template.id,
      name: template.name,
      icon: getDeviceIcon(template.id),
      dimensions: `${template.dimensions.width}×${template.dimensions.height}`,
      description: template.description,
    })),
  ];

  // Smart viewport suggestion based on mockup selection
  const getSuggestedDevice = (mockupId: string): 'desktop' | 'laptop' | 'tablet' | 'mobile' => {
    if (mockupId.includes('browser')) return 'desktop';
    if (mockupId.includes('iphone') || mockupId.includes('mobile')) return 'mobile';
    if (mockupId.includes('ipad')) return 'tablet';
    if (mockupId.includes('macbook') || mockupId.includes('laptop')) return 'laptop';
    return 'desktop';
  };

  return {
    mockupTemplates,
    mockupOptions,
    getSuggestedDevice,
  };
};
