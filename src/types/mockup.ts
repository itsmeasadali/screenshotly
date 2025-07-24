export interface MockupTemplate {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  category: 'browser' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'smartwatch' | 'tv' | 'multi-device';
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
  features?: string[];
  backgroundColor?: string;
} 