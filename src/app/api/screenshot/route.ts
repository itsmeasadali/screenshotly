import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { PuppeteerLaunchOptions, Viewport, Page } from 'puppeteer';
import sharp from 'sharp';
import { z } from 'zod';
import { validateApiKey, trackApiRequest, getRateLimitInfo } from '@/lib/api-keys';
import { detectElements } from '@/lib/ai/element-detection';

// Predefined device viewports
const deviceViewports = {
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
} as const;

// Mockup templates configuration
const mockupTemplates = {
  'browser-light': {
    path: '/mockups/browser-light.png',
    screenshotPlacement: { x: 0, y: 44, width: 1920, height: 1036 }
  },
  'browser-dark': {
    path: '/mockups/browser-dark.png',
    screenshotPlacement: { x: 0, y: 44, width: 1920, height: 1036 }
  },
  'iphone-14': {
    path: '/mockups/iphone-14.png',
    screenshotPlacement: { x: 40, y: 80, width: 1000, height: 1760 }
  },
  'macbook-pro': {
    path: '/mockups/macbook-pro.png',
    screenshotPlacement: { x: 290, y: 185, width: 1980, height: 1230 }
  }
} as const;

// Common selectors for elements to hide
const COMMON_SELECTORS = {
  cookieBanners: [
    '#cookie-banner',
    '#cookie-consent',
    '.cookie-notice',
    '[class*="cookie-banner"]',
    '[class*="cookie-consent"]',
    '[id*="cookie-banner"]',
    '[id*="cookie-consent"]',
    '.cc-window',
    '.cc-banner',
  ],
  ads: [
    '[id*="google_ads"]',
    '[class*="ad-container"]',
    '[class*="ad-wrapper"]',
    '[id*="ad-container"]',
    '.advertisement',
    '[class*="adsbygoogle"]',
    'ins.adsbygoogle',
  ],
  popups: [
    '[class*="popup"]',
    '[id*="popup"]',
    '[class*="modal"]',
    '[id*="modal"]',
    '[class*="overlay"]',
    '[id*="overlay"]',
    '[aria-modal="true"]',
  ],
  chatWidgets: [
    '[class*="chat-widget"]',
    '[id*="chat-widget"]',
    '[class*="messenger"]',
    '[id*="messenger"]',
    '[class*="intercom"]',
    '[id*="intercom"]',
    '#drift-widget',
    '.drift-frame-controller',
  ],
  newsletterPrompts: [
    '[class*="newsletter"]',
    '[id*="newsletter"]',
    '[class*="subscribe"]',
    '[id*="subscribe"]',
  ],
} as const;

const screenshotSchema = z.object({
  url: z.string().url(),
  device: z.enum(['desktop', 'laptop', 'tablet', 'mobile']).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  fullPage: z.boolean().optional().default(false),
  format: z.enum(['png', 'jpeg', 'pdf']).optional().default('png'),
  quality: z.number().min(0).max(100).optional().default(100),
  delay: z.number().min(0).max(10000).optional().default(0), // Delay in milliseconds
  selector: z.string().optional(), // CSS selector to capture specific element
  mockup: z.enum(['browser-light', 'browser-dark', 'iphone-14', 'macbook-pro'] as const).optional(),
  aiRemoval: z.object({
    enabled: z.boolean().optional().default(false),
    types: z.array(
      z.enum(['cookie-banner', 'newsletter', 'chat-widget', 'social-overlay', 'ad'])
    ).optional().default([]),
    confidence: z.number().min(0).max(1).optional().default(0.8),
  }).optional().default({}),
});

async function hideElements(page: Page, selectors: string[]) {
  await page.evaluate((selectorList) => {
    selectorList.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none';
        }
      });
    });
  }, selectors);
}

async function applyMockup(screenshot: Buffer, mockupType: keyof typeof mockupTemplates): Promise<Buffer> {
  const template = mockupTemplates[mockupType];
  const mockupPath = process.cwd() + '/public' + template.path;

  // Resize screenshot to fit the template
  const resizedScreenshot = await sharp(screenshot)
    .resize(
      template.screenshotPlacement.width,
      template.screenshotPlacement.height,
      { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }
    )
    .toBuffer();

  // Composite the screenshot onto the mockup
  return await sharp(mockupPath)
    .composite([
      {
        input: resizedScreenshot,
        top: template.screenshotPlacement.y,
        left: template.screenshotPlacement.x,
      },
    ])
    .png()
    .toBuffer();
}

async function logApiRequest(
  apiKeyId: string,
  status: number,
  startTime: number,
  request: NextRequest
) {
  try {
    const duration = Date.now() - startTime;
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await trackApiRequest(
      apiKeyId,
      '/api/screenshot',
      status,
      duration,
      ip,
      userAgent
    );
  } catch (error) {
    console.error('Failed to log API request:', error);
  }
}

async function removeElementsWithAI(page: Page, types: string[], confidenceThreshold: number) {
  try {
    // Get page HTML
    const html = await page.content();
    
    // Detect elements using AI
    const detectedElements = await detectElements(html);
    
    // Filter elements by type and confidence
    const elementsToRemove = detectedElements.filter(
      el => types.includes(el.type) && el.confidence >= confidenceThreshold
    );

    // Remove elements
    if (elementsToRemove.length > 0) {
      const selectors = elementsToRemove.map(el => el.selector);
      await page.evaluate((selectorList) => {
        selectorList.forEach(selector => {
          document.querySelectorAll(selector).forEach(element => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
            }
          });
        });
      }, selectors);
    }

    return elementsToRemove;
  } catch (error) {
    console.error('AI element removal error:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let apiKeyId: string | null = null;

  try {
    // Validate API key
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 401 });
    }

    const apiKey = authHeader.split(' ')[1];
    console.log('Validating API key:', { apiKey: apiKey.substring(0, 10) + '...' });
    
    const { isValid, key } = await validateApiKey(apiKey);
    console.log('API key validation result:', { isValid, keyId: key?.id });

    if (!isValid || !key) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    apiKeyId = key.id;

    // Check rate limit
    console.log('Checking rate limit for:', { apiKeyId });
    const rateLimit = await getRateLimitInfo(key.id);
    console.log('Rate limit info:', rateLimit);

    if (!rateLimit) {
      await logApiRequest(key.id, 500, startTime, request);
      return NextResponse.json({ error: 'Rate limit info not found' }, { status: 500 });
    }

    if (rateLimit.remaining <= 0) {
      await logApiRequest(key.id, 429, startTime, request);
      return NextResponse.json({
        error: 'Rate limit exceeded',
        reset: rateLimit.reset,
      }, { status: 429 });
    }

    // Parse request body
    const body = await request.json();
    console.log('Request body:', body);
    const parsedBody = screenshotSchema.safeParse(body);

    if (!parsedBody.success) {
      await logApiRequest(key.id, 400, startTime, request);
      return NextResponse.json({
        error: 'Invalid request parameters',
        details: parsedBody.error.errors
      }, { status: 400 });
    }

    const {
      url,
      device,
      width,
      height,
      fullPage,
      format,
      quality,
      delay,
      selector,
      mockup,
      aiRemoval,
    } = parsedBody.data;

    // Configure viewport
    let viewport: Viewport;
    if (device) {
      viewport = deviceViewports[device];
    } else if (width && height) {
      viewport = { width, height };
    } else {
      viewport = deviceViewports.desktop;
    }

    // Launch browser with appropriate settings
    const options: PuppeteerLaunchOptions = {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    try {
      // Set viewport and user agent
      await page.setViewport(viewport);
      if (device === 'mobile') {
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');
      }

      // Navigate to URL and wait for network to be idle
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Handle AI-powered element removal if enabled
      if (aiRemoval.enabled) {
        console.log('Starting AI element detection...');
        const removedElements = await removeElementsWithAI(
          page,
          aiRemoval.types,
          aiRemoval.confidence
        );
        console.log('AI removed elements:', removedElements);
      }

      // Wait for specified delay if provided
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Handle scrolling for full page screenshots
      if (fullPage && format !== 'pdf') {
        await autoScroll(page);
      }

      let screenshot: Buffer;
      if (format === 'pdf') {
        screenshot = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
        });
      } else {
        const element = selector ? await page.$(selector) : page;
        if (!element) {
          throw new Error('Element not found');
        }

        screenshot = await element.screenshot({
          type: format,
          quality: format === 'jpeg' ? quality : undefined,
          fullPage,
        }) as Buffer;
      }

      // Apply mockup if specified
      if (mockup && format !== 'pdf') {
        screenshot = await applyMockup(screenshot, mockup);
      }

      // Log successful request
      await logApiRequest(key.id, 200, startTime, request);

      return new NextResponse(screenshot, {
        headers: {
          'Content-Type': format === 'pdf' ? 'application/pdf' : `image/${format}`,
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': (rateLimit.remaining - 1).toString(),
          'X-RateLimit-Reset': rateLimit.reset.getTime().toString(),
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('Screenshot error:', error);

    // Log failed request
    if (apiKeyId) {
      await logApiRequest(
        apiKeyId,
        error instanceof z.ZodError ? 400 : 500,
        startTime,
        request
      );
    }

    return NextResponse.json(
      { error: 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
}

// Helper function to handle smooth scrolling
async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
} 