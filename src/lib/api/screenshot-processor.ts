import { createBrowser, type Viewport, type Page } from '@/lib/puppeteer';
import { detectElements } from '@/lib/ai/element-detection';
import { applyMockup, getViewportDimensions } from './screenshot-utils';
import { deviceViewports, type ScreenshotRequest } from './screenshot-schema';
import { isAdRequest, isBlockedResourceType, AD_HIDE_CSS } from './ad-blocker';
import { generateCacheKey, getCachedScreenshot, setCachedScreenshot } from './screenshot-cache';
import sharp from 'sharp';

export async function processScreenshot(params: ScreenshotRequest): Promise<Buffer> {
  // --- Caching layer ---
  if (params.cache) {
    const cacheKey = generateCacheKey({
      url: params.url,
      device: params.device,
      width: params.width,
      height: params.height,
      fullPage: params.fullPage,
      format: params.format,
      quality: params.quality,
      selector: params.selector,
      mockup: params.mockup,
      blockAds: params.blockAds,
      darkMode: params.darkMode,
      deviceScaleFactor: params.deviceScaleFactor,
    });

    const cached = await getCachedScreenshot(cacheKey);
    if (cached) {
      return cached;
    }

    // Proceed with capture and cache the result
    const result = await captureScreenshot(params);
    await setCachedScreenshot(cacheKey, result, params.cacheTtl || 3600);
    return result;
  }

  return captureScreenshot(params);
}

async function captureScreenshot(params: ScreenshotRequest): Promise<Buffer> {
  let browser;
  let page: Page | undefined;

  try {
    // Create browser instance
    browser = await createBrowser();
    page = await browser.newPage();

    // --- Request interception (ad blocking + resource filtering) ---
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      const url = request.url();

      // Block ads if enabled
      if (params.blockAds && isAdRequest(url)) {
        request.abort();
        return;
      }

      // Block unnecessary resources
      if (isBlockedResourceType(resourceType)) {
        request.abort();
        return;
      }

      // Block fonts for faster loading (unless fullPage where layout matters less)
      if (!params.fullPage && resourceType === 'font') {
        request.abort();
        return;
      }

      request.continue();
    });

    // --- User agent override ---
    if (params.userAgent) {
      await page.setUserAgent(params.userAgent);
    } else if (params.stealth) {
      // Use a realistic user agent in stealth mode
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      );
    }

    // --- Stealth mode setup ---
    if (params.stealth) {
      await applyStealthMode(page);
    }

    // --- Viewport configuration ---
    let viewport: Viewport;
    if (params.device && deviceViewports[params.device]) {
      viewport = { ...deviceViewports[params.device] };
    } else if (params.width && params.height) {
      viewport = { width: params.width, height: params.height };
    } else {
      const dimensions = getViewportDimensions(params.device, params.width, params.height);
      viewport = dimensions;
    }

    // Apply device scale factor
    if (params.deviceScaleFactor && params.deviceScaleFactor > 1) {
      (viewport as Viewport & { deviceScaleFactor?: number }).deviceScaleFactor = params.deviceScaleFactor;
    }

    await page.setViewport(viewport);

    // --- Timezone override ---
    if (params.timezone) {
      try {
        // CDPSession for timezone emulation
        const client = await page.createCDPSession();
        await client.send('Emulation.setTimezoneOverride', {
          timezoneId: params.timezone,
        });
      } catch (e) {
        console.warn('Failed to set timezone:', e);
      }
    }

    // --- Geolocation override ---
    if (params.geolocation) {
      try {
        const client = await page.createCDPSession();
        if (params.geolocation.latitude !== undefined && params.geolocation.longitude !== undefined) {
          await client.send('Emulation.setGeolocationOverride', {
            latitude: params.geolocation.latitude,
            longitude: params.geolocation.longitude,
            accuracy: 100,
          });
        }
      } catch (e) {
        console.warn('Failed to set geolocation:', e);
      }
    }

    // --- Dark mode ---
    if (params.darkMode) {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
      ]);
    }

    // --- Custom cookies ---
    if (params.cookies && params.cookies.length > 0) {
      const targetUrl = new URL(params.url);
      const cookiesForPuppeteer = params.cookies.map(cookie => ({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain || targetUrl.hostname,
        path: cookie.path || '/',
        httpOnly: cookie.httpOnly ?? false,
        secure: cookie.secure ?? targetUrl.protocol === 'https:',
      }));
      await page.setCookie(...cookiesForPuppeteer);
    }

    // --- Custom headers ---
    if (params.headers) {
      await page.setExtraHTTPHeaders(params.headers);
    }

    // --- Navigate to URL ---
    const waitUntil = params.waitForNetworkIdle ? 'networkidle0' : 'domcontentloaded';
    await page.goto(params.url, {
      waitUntil,
      timeout: 30000,
    });

    // --- Inject ad-blocking CSS ---
    if (params.blockAds) {
      await page.addStyleTag({ content: AD_HIDE_CSS });
    }

    // --- Wait for specific selector ---
    if (params.waitForSelector) {
      try {
        await page.waitForSelector(params.waitForSelector, { timeout: 10000 });
      } catch {
        console.warn(`Selector "${params.waitForSelector}" not found within timeout`);
      }
    }

    // --- Execute custom JavaScript ---
    if (params.javascript) {
      try {
        await page.evaluate(params.javascript);
        // Brief pause for JS to take effect
        await page.waitForFunction(() => new Promise(resolve => setTimeout(resolve, 300)));
      } catch (e) {
        console.warn('Custom JavaScript execution failed:', e);
      }
    }

    // --- Apply delay ---
    if (params.delay && params.delay > 0) {
      const delayTime = Math.min(params.delay, 10000);
      await page.waitForFunction(
        (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
        {},
        delayTime
      );
    }

    // --- Hide specific selectors ---
    if (params.hideSelectors && params.hideSelectors.length > 0) {
      const selectorsCSS = params.hideSelectors
        .map(sel => `${sel} { display: none !important; visibility: hidden !important; }`)
        .join('\n');
      await page.addStyleTag({ content: selectorsCSS });
      // Brief pause for CSS to apply
      await page.waitForFunction(() => new Promise(resolve => setTimeout(resolve, 100)));
    }

    // --- AI Element Removal ---
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

          await page.waitForFunction(() => new Promise(resolve => setTimeout(resolve, 200)));
        }
      } catch (aiError) {
        console.warn('AI element removal failed:', aiError);
      }
    }

    // --- Scrolling screenshot ---
    if (params.scroll?.enabled) {
      await performScrollCapture(page, params);
    }

    // --- Take screenshot ---
    const screenshotOptions: Record<string, unknown> = {
      type: params.format === 'jpeg' ? 'jpeg' : params.format === 'webp' ? 'webp' : 'png',
      fullPage: params.fullPage,
    };

    if ((params.format === 'jpeg' || params.format === 'webp') && params.quality) {
      screenshotOptions.quality = params.quality;
    }

    // --- Clip region ---
    if (params.clip) {
      screenshotOptions.clip = params.clip;
    } else if (params.selector) {
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

    // --- Apply mockup if specified ---
    if (params.mockup) {
      screenshot = await applyMockup(screenshot, params.mockup);
    }

    // --- Handle PDF conversion ---
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

    // --- Format conversion ---
    if (params.format === 'webp') {
      const converted = await sharp(screenshot)
        .webp({ quality: params.quality || 90 })
        .toBuffer();
      return Buffer.from(converted);
    }

    if (params.format === 'jpeg') {
      const converted = await sharp(screenshot)
        .jpeg({ quality: params.quality || 90 })
        .toBuffer();
      return Buffer.from(converted);
    }

    return Buffer.from(screenshot);

  } finally {
    // Cleanup
    if (page) {
      try { await page.close(); } catch { /* ignore */ }
    }
    if (browser) {
      try { await browser.close(); } catch { /* ignore */ }
    }
  }
}

/**
 * Apply stealth mode patches to avoid bot detection
 */
async function applyStealthMode(page: Page): Promise<void> {
  // Override webdriver property
  await page.evaluateOnNewDocument(() => {
    // Remove webdriver flag
    Object.defineProperty(navigator, 'webdriver', { get: () => false });

    // Override plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer' },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai' },
        { name: 'Native Client', filename: 'internal-nacl-plugin' },
      ],
    });

    // Override languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en', 'es'],
    });

    // Override permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters: PermissionDescriptor) =>
      parameters.name === 'notifications'
        ? Promise.resolve({ state: 'denied', onchange: null } as PermissionStatus)
        : originalQuery(parameters);

    // Override chrome runtime
    (window as unknown as Record<string, unknown>).chrome = {
      runtime: {},
      loadTimes: function () { return {}; },
      csi: function () { return {}; },
      app: { isInstalled: false },
    };

    // Override iframe contentWindow
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.head.appendChild(iframe);
      const iframeWindow = iframe.contentWindow;
      if (iframeWindow) {
        Object.defineProperty(iframeWindow.navigator, 'webdriver', { get: () => false });
      }
      document.head.removeChild(iframe);
    } catch { /* ignore */ }
  });
}

/**
 * Perform a scrolling capture (scroll the page to load lazy content)
 */
async function performScrollCapture(page: Page, params: ScreenshotRequest): Promise<void> {
  const scrollConfig = params.scroll!;
  const distance = scrollConfig.distance || 5000;
  const speed = scrollConfig.speed || 500;
  const stepSize = 100; // pixels per step
  const stepDelay = Math.max(20, (stepSize / speed) * 1000); // ms per step

  if (scrollConfig.direction === 'horizontal') {
    // Horizontal scroll
    let scrolled = 0;
    while (scrolled < distance) {
      await page.evaluate((step) => {
        window.scrollBy(step, 0);
      }, stepSize);
      scrolled += stepSize;
      await page.waitForFunction(
        (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
        {},
        stepDelay
      );
    }
    // Scroll back to start
    await page.evaluate(() => window.scrollTo(0, 0));
  } else {
    // Vertical scroll (default)
    let scrolled = 0;
    while (scrolled < distance) {
      await page.evaluate((step) => {
        window.scrollBy(0, step);
      }, stepSize);
      scrolled += stepSize;
      await page.waitForFunction(
        (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
        {},
        stepDelay
      );
    }
    // Scroll back to top for the capture
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  // Wait a moment for any lazy-loaded content to render
  await page.waitForFunction(() => new Promise(resolve => setTimeout(resolve, 500)));
}
