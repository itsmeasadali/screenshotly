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
  
  // Try to import chromium package (useful for both dev and production)
  if (!chromiumInstance) {
    try {
      const chromiumModule = await import('@sparticuz/chromium');
      chromiumInstance = chromiumModule.default;
      console.log('Chromium package loaded successfully');
    } catch (error) {
      console.warn('Chromium package not available:', error);
    }
  }
}

export async function createBrowser(): Promise<Browser> {
  await initializePuppeteer();
  
  const isDev = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercel = process.env.VERCEL === '1';
  
  let options: PuppeteerLaunchOptions;
  
  if (isDev) {
    // Development: Use system Chrome or fallback to bundled Chromium
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
        '--disable-plugins',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
      ],
    };
    
    // Try to find system Chrome/Chromium executable
    const possiblePaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS Chrome
      '/Applications/Chromium.app/Contents/MacOS/Chromium', // macOS Chromium
      '/usr/bin/google-chrome-stable', // Linux Chrome
      '/usr/bin/google-chrome', // Linux Chrome
      '/usr/bin/chromium-browser', // Linux Chromium
      '/usr/bin/chromium', // Linux Chromium
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows Chrome
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows Chrome 32-bit
    ];
    
    // Try to find an executable
    let executablePath = null;
    const fs = await import('fs');
    for (const path of possiblePaths) {
      try {
        if (fs.existsSync(path)) {
          executablePath = path;
          break;
        }
      } catch {
        // Continue to next path
      }
    }
    
    if (executablePath) {
      options.executablePath = executablePath;
      console.log('Using system browser:', executablePath);
    } else if (chromiumInstance) {
      // Fallback to Chromium package if available
      try {
        options.executablePath = await chromiumInstance.executablePath();
        console.log('Using @sparticuz/chromium in development');
      } catch (error) {
        console.warn('Failed to get Chromium executable path:', error);
      }
    } else {
      throw new Error(
        'No Chrome/Chromium executable found. Please install Google Chrome or run: npm install puppeteer'
      );
    }
  } else if (isProduction && chromiumInstance && isVercel) {
    // Production on Vercel with Chromium package
    console.log('Using @sparticuz/chromium for serverless environment');
    
    // Get the executable path (no arguments for default serverless environment)
    const executablePath = await chromiumInstance.executablePath();
    
    options = {
      args: [
        ...chromiumInstance.args,
        '--hide-scrollbars',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-font-subpixel-positioning',
        '--disable-ipc-flooding-protection',
        '--disable-extensions',
        '--disable-default-apps',
        '--disable-component-extensions-with-background-pages',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-gpu-sandbox',
        '--single-process',
      ],
      defaultViewport: chromiumInstance.defaultViewport,
      executablePath,
      headless: chromiumInstance.headless,
    };
  } else {
    // Fallback configuration for other production environments
    console.log('Using fallback Puppeteer configuration');
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
        '--disable-font-subpixel-positioning',
        '--disable-ipc-flooding-protection',
        '--disable-default-apps',
        '--disable-component-extensions-with-background-pages',
        '--no-default-browser-check',
        '--disable-gpu-sandbox',
      ],
    };
  }
  
  try {
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      chromiumAvailable: !!chromiumInstance,
      isDev,
      isProduction,
      isVercel
    });
    
    console.log('Launching browser with options:', JSON.stringify({
      ...options,
      executablePath: options.executablePath ? '[REDACTED]' : undefined
    }, null, 2));
    
    const browser = await puppeteerInstance.launch(options);
    console.log('Browser launched successfully');
    return browser;
  } catch (error) {
    console.error('Failed to launch browser:', error);
    
    // Enhanced error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('Browser launch error details:', {
      message: errorMessage,
      stack: errorStack,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        chromiumAvailable: !!chromiumInstance,
      },
      options: {
        ...options,
        executablePath: options.executablePath ? '[REDACTED]' : undefined
      }
    });
    
    throw new Error(`Failed to launch browser: ${errorMessage}`);
  }
}

// Export types for compatibility
export type { PuppeteerLaunchOptions, Browser, Page, Viewport } from 'puppeteer-core'; 