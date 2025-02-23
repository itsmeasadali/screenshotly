import { NextResponse } from 'next/server';

const mockupTemplates = [
  {
    id: 'browser-light',
    name: 'Browser Window (Light)',
    description: 'Clean browser window mockup with light theme',
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
    imagePath: '/mockups/browser-light.png',
  },
  {
    id: 'browser-dark',
    name: 'Browser Window (Dark)',
    description: 'Sleek browser window mockup with dark theme',
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
    imagePath: '/mockups/browser-dark.png',
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone mockup with dynamic island',
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
    imagePath: '/mockups/iphone-14.png',
  },
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    description: 'Modern MacBook Pro mockup',
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
    imagePath: '/mockups/macbook-pro.png',
  },
];

export async function GET() {
  return NextResponse.json(mockupTemplates);
} 