import { PuppeteerLaunchOptions, Browser } from 'puppeteer-core';

// Dynamic import to handle different environments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let puppeteerInstance: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chromiumInstance: any = null;

async function initializePuppeteer() {
  if (!puppeteerInstance) {
    const puppeteerModule = await import('puppeteer-core');
    puppeteerInstance = puppeteerModule.default;
  }
  
  // Only import chromium in production/serverless environments
  if (process.env.NODE_ENV === 'production' && !chromiumInstance) {
    try {
      const chromiumModule = await import('@sparticuz/chromium');
      chromiumInstance = chromiumModule.default;
    } catch (error) {
      console.warn('Chromium package not available:', error);
    }
  }
}

export async function createBrowser(): Promise<Browser> {
  await initializePuppeteer();
  
  const isDev = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  let options: PuppeteerLaunchOptions;
  
  if (isDev) {
    // Development: Use system Chrome
    options = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    };
  } else if (isProduction && chromiumInstance) {
    // Production with Chromium package
    options = {
      args: [
        ...chromiumInstance.args,
        '--hide-scrollbars',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      defaultViewport: chromiumInstance.defaultViewport,
      executablePath: await chromiumInstance.executablePath(),
      headless: chromiumInstance.headless,
    };
  } else {
    // Fallback configuration
    options = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--single-process',
      ],
    };
  }
  
  try {
    console.log('Launching browser with options:', JSON.stringify(options, null, 2));
    const browser = await puppeteerInstance.launch(options);
    console.log('Browser launched successfully');
    return browser;
  } catch (error) {
    console.error('Failed to launch browser:', error);
    throw new Error(`Failed to launch browser: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Export types for compatibility
export type { PuppeteerLaunchOptions, Browser, Page, Viewport } from 'puppeteer-core'; 