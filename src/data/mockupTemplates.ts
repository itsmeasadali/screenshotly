export interface MockupTemplate {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  category: 'browser' | 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'smartwatch' | 'tv';
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

export const mockupTemplates: MockupTemplate[] = [
  // Browser Templates (we have these images)
  {
    id: 'browser-light',
    name: 'Browser Window (Light)',
    description: 'Modern browser window with light theme and clean interface',
    category: 'browser',
    imagePath: '/mockups/browser-light.png',
    dimensions: {
      width: 1920,
      height: 1080,
    },
    screenshotPlacement: {
      x: 0,
      y: 74, // Adjusted for better browser chrome fit
      width: 1920,
      height: 1006, // Adjusted height
    },
    features: ['Clean design', 'Light theme', 'Professional'],
    backgroundColor: '#ffffff',
  },
  {
    id: 'browser-dark',
    name: 'Browser Window (Dark)',
    description: 'Modern browser window with dark theme for better contrast',
    category: 'browser',
    imagePath: '/mockups/browser-dark.png',
    dimensions: {
      width: 1920,
      height: 1080,
    },
    screenshotPlacement: {
      x: 0,
      y: 74, // Adjusted for better browser chrome fit
      width: 1920,
      height: 1006, // Adjusted height
    },
    features: ['Dark theme', 'Eye-friendly', 'Modern'],
    backgroundColor: '#1a1a1a',
  },
  {
    id: 'browser-minimal',
    name: 'Minimal Browser',
    description: 'Ultra-clean browser with minimal UI elements',
    category: 'browser',
    imagePath: '/mockups/browser.png',
    dimensions: {
      width: 1920,
      height: 1080,
    },
    screenshotPlacement: {
      x: 0,
      y: 35, // Minimal browser has smaller chrome
      width: 1920,
      height: 1045, // Larger content area
    },
    features: ['Minimal UI', 'Maximum content', 'Clean'],
    backgroundColor: '#f8f9fa',
  },

  // Mobile Templates (we have these images)
  {
    id: 'iphone-14',
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone model with Dynamic Island and premium design',
    category: 'mobile',
    imagePath: '/mockups/iphone-14.png',
    dimensions: {
      width: 1080,
      height: 1920,
    },
    screenshotPlacement: {
      x: 90, // Better centering
      y: 140, // Account for Dynamic Island and status bar
      width: 900, // Adjusted width for better fit
      height: 1640, // Adjusted height
    },
    features: ['Dynamic Island', 'Premium design', 'Latest iOS'],
    backgroundColor: '#000000',
  },

  // Tablet Templates (we have these images)
  {
    id: 'ipad-pro',
    name: 'iPad Pro 12.9"',
    description: 'Large iPad Pro with M2 chip and advanced display',
    category: 'tablet',
    imagePath: '/mockups/ipad-pro.png',
    dimensions: {
      width: 1366,
      height: 1024,
    },
    screenshotPlacement: {
      x: 83, // Better centering
      y: 83, // Better positioning
      width: 1200, // Adjusted for better fit
      height: 858, // Adjusted height
    },
    features: ['M2 chip', 'Large display', 'Professional'],
    backgroundColor: '#f2f2f7',
  },

  // Laptop Templates (we have these images)
  {
    id: 'macbook-pro',
    name: 'MacBook Pro 16"',
    description: 'Professional MacBook Pro with M3 Max chip and Liquid Retina display',
    category: 'laptop',
    imagePath: '/mockups/macbook-pro.png',
    dimensions: {
      width: 2560,
      height: 1600,
    },
    screenshotPlacement: {
      x: 290,
      y: 185,
      width: 1980,
      height: 1230,
    },
    features: ['M3 Max chip', 'Liquid Retina', 'Professional'],
    backgroundColor: '#000000',
  },
]; 