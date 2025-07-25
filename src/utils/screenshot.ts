import { createBrowser } from '@/lib/puppeteer';

interface CaptureScreenshotOptions {
  url: string;
  width?: number;
  height?: number;
  fullPage?: boolean;
}

export async function captureScreenshot({
  url,
  width = 1920,
  height = 1080,
  fullPage = false,
}: CaptureScreenshotOptions): Promise<string> {
  const browser = await createBrowser();

  try {
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({
      width,
      height,
      deviceScaleFactor: 2, // Retina quality
    });

    // Navigate to URL
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      fullPage,
      type: 'jpeg',
      quality: 90,
    });

    // Convert to base64
    return `data:image/jpeg;base64,${screenshot.toString('base64')}`;
  } finally {
    await browser.close();
  }
} 