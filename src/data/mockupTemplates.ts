export interface MockupTemplate {
  id: string;
  name: string;
  description: string;
  imagePath: string;
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
}

export const mockupTemplates: MockupTemplate[] = [
  {
    id: 'browser-light',
    name: 'Browser Window (Light)',
    description: 'Modern browser window with light theme',
    imagePath: '/mockups/browser-light.png',
    dimensions: {
      width: 1920,
      height: 1080,
    },
    screenshotPlacement: {
      x: 0,
      y: 44,
      width: 1920,
      height: 1036,
    },
  },
  {
    id: 'browser-dark',
    name: 'Browser Window (Dark)',
    description: 'Modern browser window with dark theme',
    imagePath: '/mockups/browser-dark.png',
    dimensions: {
      width: 1920,
      height: 1080,
    },
    screenshotPlacement: {
      x: 0,
      y: 44,
      width: 1920,
      height: 1036,
    },
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone model with Dynamic Island',
    imagePath: '/mockups/iphone-14.png',
    dimensions: {
      width: 1080,
      height: 1920,
    },
    screenshotPlacement: {
      x: 40,
      y: 80,
      width: 1000,
      height: 1760,
    },
  },
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    description: 'Modern iPad Pro with thin bezels',
    imagePath: '/mockups/ipad-pro.png',
    dimensions: {
      width: 1366,
      height: 1024,
    },
    screenshotPlacement: {
      x: 40,
      y: 40,
      width: 1286,
      height: 944,
    },
  },
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    description: 'Latest MacBook Pro with notch display',
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
  },
  {
    id: 'multi-device',
    name: 'Multi-Device Setup',
    description: 'Showcase your app across multiple devices',
    imagePath: '/mockups/multi-device.png',
    dimensions: {
      width: 2560,
      height: 1440,
    },
    screenshotPlacement: {
      x: 290,
      y: 105,
      width: 1980,
      height: 1230,
    },
  },
]; 