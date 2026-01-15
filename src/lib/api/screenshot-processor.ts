import { createBrowser, type Viewport, type Page } from '@/lib/puppeteer';
import { detectElements } from '@/lib/ai/element-detection';
import { applyMockup, getViewportDimensions } from './screenshot-utils';
import { deviceViewports, type ScreenshotRequest } from './screenshot-schema';
import sharp from 'sharp';

export async function processScreenshot(params: ScreenshotRequest): Promise<Buffer> {
  let browser;
  let page: Page | undefined;

  try {
    // Create browser instance
    browser = await createBrowser();
    page = await browser.newPage();

    // Optimize page for faster loading
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      // Block unnecessary resources for faster loading
      const resourceType = request.resourceType();
      if (['font', 'media', 'websocket'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Set viewport based on device or custom dimensions
    let viewport: Viewport;
    if (params.device && deviceViewports[params.device]) {
      viewport = deviceViewports[params.device];
    } else {
      const dimensions = getViewportDimensions(params.device, params.width, params.height);
      viewport = dimensions;
    }

    await page.setViewport(viewport);

    // Navigate to the URL with optimized settings
    await page.goto(params.url, { 
      waitUntil: 'domcontentloaded', // Faster than networkidle0
      timeout: 15000 // Reduced timeout
    });

    // Apply delay if specified (max 5 seconds for performance)
    if (params.delay && params.delay > 0) {
      const delayTime = Math.min(params.delay, 5000);
      await page.waitForFunction(() => new Promise(resolve => setTimeout(resolve, delayTime)));
    }

    // AI Element Removal
    if (params.aiRemoval?.enabled) {
      try {
        const html = await page.content();
        const elementsToRemove = await detectElements(html);

        if (elementsToRemove.length > 0) {
          await page.evaluate((elements) => {
            elements.forEach(element => {
              const el = document.querySelector(element.selector);
              if (el) {
                (el as HTMLElement).style.display = 'none';
              }
            });
          }, elementsToRemove);

          // Wait a bit for the page to re-render (reduced time)
          await page.waitForFunction(() => new Promise(resolve => setTimeout(resolve, 200)));
        }
      } catch (aiError) {
        console.warn('AI element removal failed:', aiError);
        // Continue with screenshot even if AI removal fails
      }
    }

    // Take screenshot
    const screenshotOptions: Record<string, unknown> = {
      type: params.format === 'jpeg' ? 'jpeg' : 'png',
      fullPage: params.fullPage,
    };

    if (params.format === 'jpeg' && params.quality) {
      screenshotOptions.quality = params.quality;
    }

    if (params.selector) {
      const element = await page.$(params.selector);
      if (!element) {
        throw new Error(`Element with selector "${params.selector}" not found`);
      }
      screenshotOptions.clip = await element.boundingBox();
    }

    const screenshotResult = await page.screenshot(screenshotOptions);

    // Ensure screenshot is a Buffer
    let screenshot: Buffer;
    if (Buffer.isBuffer(screenshotResult)) {
      screenshot = screenshotResult;
    } else {
      screenshot = Buffer.from(screenshotResult);
    }

    // Apply mockup if specified
    if (params.mockup) {
      screenshot = await applyMockup(screenshot, params.mockup);
    }

    // Handle PDF conversion
    if (params.format === 'pdf') {
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm',
        },
      });
      return Buffer.from(pdfBuffer);
    }

    // Final format conversion if needed
    if (params.format === 'jpeg' && screenshot) {
      const sharpInstance = sharp(screenshot);
      const convertedBuffer = await sharpInstance
        .jpeg({ quality: params.quality || 90 })
        .toBuffer();
      return Buffer.from(convertedBuffer);
    }

    return Buffer.from(screenshot);

  } finally {
    // Cleanup
    if (page) {
      try {
        await page.close();
      } catch (error) {
        console.warn('Failed to close page:', error);
      }
    }
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        console.warn('Failed to close browser:', error);
      }
    }
  }
}
