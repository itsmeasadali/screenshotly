import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createBrowser, type Viewport, type Page } from '@/lib/puppeteer';
import sharp from 'sharp';
import { z } from 'zod';
import { checkRateLimit } from '@/utils/rateLimit';
import { detectElements } from '@/lib/ai/element-detection';
import { mockupTemplates } from '@/data/mockupTemplates';
import path from 'path';

// Predefined device viewports
const deviceViewports = {
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 },
} as const;

// Create mockup template map from the enhanced template data
const mockupMap = mockupTemplates.reduce((acc, template) => {
  acc[template.id] = {
    path: template.imagePath,
    screenshotPlacement: {
      x: template.screenshotPlacement.x,
      y: template.screenshotPlacement.y,
      width: template.screenshotPlacement.width,
      height: template.screenshotPlacement.height,
    }
  };
  return acc;
}, {} as Record<string, { path: string; screenshotPlacement: { x: number; y: number; width: number; height: number } }>);

// Get all available mockup IDs for the schema
const availableMockupIds = mockupTemplates.map(template => template.id);

const screenshotSchema = z.object({
  url: z.string().url(),
  device: z.enum(['desktop', 'laptop', 'tablet', 'mobile']).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  fullPage: z.boolean().optional().default(false),
  format: z.enum(['png', 'jpeg', 'pdf']).optional().default('png'),
  quality: z.number().min(0).max(100).optional().default(100),
  delay: z.number().min(0).max(10000).optional().default(0),
  selector: z.string().optional(),
  mockup: z.enum(availableMockupIds as [string, ...string[]]).optional(),
  aiRemoval: z.object({
    enabled: z.boolean().optional().default(false),
    types: z.array(
      z.enum(['cookie-banner', 'newsletter', 'chat-widget', 'social-overlay', 'ad'])
    ).optional().default([]),
    confidence: z.number().min(0).max(1).optional().default(0.8),
  }).optional().default({}),
});

// Helper function to safely perform sharp operations
async function safeSharpResize(screenshot: Buffer, width: number, height: number, options: object): Promise<Buffer> {
  if (!Buffer.isBuffer(screenshot)) {
    throw new Error(`Sharp resize input must be Buffer, got ${typeof screenshot}`);
  }
  
  try {
    // Create a fresh Sharp instance from the buffer
    const sharpInstance = sharp(Buffer.from(screenshot));
    
    // Apply resize with explicit options
    const resizedInstance = sharpInstance.resize(width, height, options);
    
    // Convert to buffer
    const result = await resizedInstance.toBuffer();
    
    return Buffer.from(result);
  } catch (error) {
    console.error('Sharp resize operation failed:', error);
    throw new Error(`Sharp resize failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function applyMockup(screenshot: Buffer, mockupType: string): Promise<Buffer> {
  // Validate screenshot is a proper Buffer
  if (!Buffer.isBuffer(screenshot)) {
    throw new Error('Screenshot must be a Buffer');
  }

  const template = mockupMap[mockupType];
  
  if (!template) {
    throw new Error(`Mockup template '${mockupType}' not found`);
  }
  
  // Handle path differences between local and production
  const isProduction = process.env.NODE_ENV === 'production';
  
  let mockupPath: string;
  
  if (isProduction) {
    // In production, try multiple possible paths
    const possiblePaths = [
      path.join(process.cwd(), 'public', template.path),
      path.join(process.cwd(), '.next', 'static', template.path),
      path.join(process.cwd(), 'build', 'public', template.path),
      path.join('.', 'public', template.path),
      path.join('.', template.path)
    ];
    
    const fs = await import('fs');
    mockupPath = possiblePaths.find(filePath => {
      try {
        return fs.existsSync(filePath);
      } catch {
        return false;
      }
    }) || possiblePaths[0];
    

  } else {
    mockupPath = path.join(process.cwd(), 'public', template.path);
  }
  


  try {
    // Get screenshot metadata
    const screenshotMeta = await sharp(screenshot).metadata();
    const { width: origWidth = 1920, height: origHeight = 1080 } = screenshotMeta;
    
    // Calculate target dimensions
    const targetWidth = template.screenshotPlacement.width;
    const targetHeight = template.screenshotPlacement.height;
    
    // Calculate aspect ratios
    const origAspectRatio = origWidth / origHeight;
    const targetAspectRatio = targetWidth / targetHeight;
    
    let resizedScreenshot: Buffer;
    
    // Choose the best fitting strategy based on mockup type and aspect ratios
    if (mockupType.includes('browser')) {
      // For browser mockups, we want to fill the entire viewport
      // Use 'cover' to ensure no gaps, allowing some cropping if needed
      resizedScreenshot = await sharp(screenshot)
        .resize(targetWidth, targetHeight, { 
          fit: 'cover',
          position: 'center'
        })
        .toBuffer();
    } else if (mockupType.includes('iphone') || mockupType.includes('mobile')) {
      // For mobile devices, be more careful with aspect ratios
      // If the screenshot is much wider than mobile, use contain with smart background
      if (origAspectRatio > 1.5 && targetAspectRatio < 1) {
        // Desktop screenshot on mobile - use contain with gradient background
        resizedScreenshot = await safeSharpResize(screenshot, targetWidth, targetHeight, { 
          fit: 'contain',
          background: { r: 240, g: 240, b: 240, alpha: 1 }
        });
      } else {
        // Mobile-appropriate content - use cover for best fit
        resizedScreenshot = await safeSharpResize(screenshot, targetWidth, targetHeight, { 
          fit: 'cover',
          position: 'center'
        });
      }
    } else if (mockupType.includes('macbook') || mockupType.includes('laptop')) {
      // For laptop mockups, maintain aspect ratio but allow some cropping
      if (Math.abs(origAspectRatio - targetAspectRatio) < 0.1) {
        // Similar aspect ratios - use cover for seamless fit
        resizedScreenshot = await safeSharpResize(screenshot, targetWidth, targetHeight, { 
          fit: 'cover',
          position: 'center'
        });
      } else {
        // Different aspect ratios - use contain with subtle background
        resizedScreenshot = await safeSharpResize(screenshot, targetWidth, targetHeight, { 
          fit: 'contain',
          background: { r: 32, g: 32, b: 32, alpha: 1 }
        });
      }
    } else if (mockupType.includes('ipad') || mockupType.includes('tablet')) {
      // For tablets, use a balanced approach
      resizedScreenshot = await safeSharpResize(screenshot, targetWidth, targetHeight, { 
        fit: 'cover',
        position: 'center'
      });
    } else {
      // Default strategy for other mockups
      // Use cover for best fill, with center positioning
      resizedScreenshot = await safeSharpResize(screenshot, targetWidth, targetHeight, { 
        fit: 'cover',
        position: 'center'
      });
    }

    // Load the mockup template
    console.log('Loading mockup from:', mockupPath);
    const mockupImage = sharp(mockupPath);
    
    // Validate mockup file exists
    try {
      const mockupMeta = await mockupImage.metadata();
      console.log('Mockup metadata:', mockupMeta.width, 'x', mockupMeta.height);
    } catch (error) {
      console.error('Mockup file not accessible:', error);
      console.log('Attempted path:', mockupPath);
      
      // In production, if mockup files aren't accessible, return original screenshot
      if (isProduction) {
        console.log('Returning original screenshot due to mockup file access issue');
        return screenshot;
      }
      
      throw new Error(`Invalid mockup file: ${mockupPath}`);
    }
    
    // Final validation before composite
    if (!Buffer.isBuffer(resizedScreenshot)) {
      console.error('Composite input validation failed:', typeof resizedScreenshot);
      throw new Error(`Composite input must be Buffer, got ${typeof resizedScreenshot}`);
    }
    
    console.log('About to composite - screenshot size:', resizedScreenshot.length, 'placement:', template.screenshotPlacement);
    
    // Ensure we have a clean Buffer for compositing
    const cleanBuffer = Buffer.from(resizedScreenshot);
    
    // Double-check the buffer is valid
    if (!Buffer.isBuffer(cleanBuffer) || cleanBuffer.length === 0) {
      throw new Error('Invalid buffer for composite operation');
    }
    
    try {
      // Load mockup image as buffer first
      const mockupBuffer = await sharp(mockupPath).png().toBuffer();
      
      // Create fresh Sharp instance from mockup buffer
      const mockupSharp = sharp(Buffer.from(mockupBuffer));
      
      // Create the composite input object with explicit types
      const compositeOptions = [{
        input: Buffer.from(cleanBuffer),
        top: Math.floor(template.screenshotPlacement.y),
        left: Math.floor(template.screenshotPlacement.x),
        blend: 'over' as const
      }];
      
      // Apply composite
      const result = await mockupSharp
        .composite(compositeOptions)
        .png({ quality: 100, compressionLevel: 6 })
        .toBuffer();
        
      return Buffer.from(result);
      
    } catch (compositeError) {
      console.error('Composite operation failed:', compositeError);
      throw new Error(`Composite failed: ${compositeError instanceof Error ? compositeError.message : 'Unknown error'}`);
    }
      
  } catch (error) {
    console.error('Error applying mockup:', error);
    // Fallback to original logic if there's an error
    const resizedScreenshot = await safeSharpResize(
      screenshot,
      template.screenshotPlacement.width,
      template.screenshotPlacement.height,
      { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }
    );

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

export async function POST(request: NextRequest) {
  try {
    // Get the client's IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'anonymous';
    
    // Check rate limit for playground (more generous limits for signed-in users)
    const { userId } = await auth();
    
    // Different rate limiting based on authentication status
    const rateLimitIdentifier = userId ? `playground-user:${userId}` : `playground-anon:${ip}`;
    const tier = userId ? 'free' : 'playground'; // Signed-in users get free tier limits, anonymous get playground limits
    
    const rateLimit = await checkRateLimit(rateLimitIdentifier, tier);
    
    if (!rateLimit.success) {
      return NextResponse.json({
        error: 'Rate limit exceeded for playground',
        limit: rateLimit.limit,
        reset: new Date(rateLimit.reset).toISOString(),
        message: userId ? 
          'You have reached the playground rate limit. Consider upgrading to Pro for higher limits.' :
          'Rate limit exceeded. Sign in for higher limits or try again later.'
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.reset.toString(),
        }
      });
    }

    // Parse request body
    const body = await request.json();
    const parsedBody = screenshotSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({
        error: 'Invalid request parameters',
        details: parsedBody.error.errors
      }, { status: 400 });
    }

    // Check if AI features are requested - only allow for signed-in users
    if (parsedBody.data.aiRemoval?.enabled) {
      if (!userId) {
        return NextResponse.json({
          error: 'AI features require authentication. Please sign in.',
          requiresAuth: true
        }, { status: 401 });
      }
      
      // For playground, we can allow AI features but with limitations
      console.log('AI features requested in playground by user:', userId);
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
    const browser = await createBrowser();
    const page = await browser.newPage();

    try {
      // Set viewport and user agent
      await page.setViewport(viewport);
      if (device === 'mobile') {
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');
      }

      // Navigate to URL and wait for network to be idle
      await page.goto(url, { waitUntil: 'networkidle0' });

      // Handle AI-powered element removal if enabled and user is authenticated
      if (aiRemoval.enabled && userId) {
        console.log('Starting AI element detection for playground...');
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
        const pdfBuffer = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
        });
        
        // Ensure we have a proper Buffer - always convert to Buffer
        screenshot = Buffer.from(pdfBuffer);
        
        // Validate the conversion worked
        if (!Buffer.isBuffer(screenshot) || screenshot.length === 0) {
          console.error('PDF Buffer conversion failed:', typeof pdfBuffer, 'length:', pdfBuffer?.length);
          throw new Error('Failed to convert PDF to Buffer');
        }
      } else {
        const element = selector ? await page.$(selector) : page;
        if (!element) {
          throw new Error('Element not found');
        }

        const screenshotBuffer = await element.screenshot({
          type: format,
          quality: format === 'jpeg' ? quality : undefined,
          fullPage,
        });
        
        // Ensure we have a proper Buffer - always convert to Buffer
        screenshot = Buffer.from(screenshotBuffer);
        
        // Validate the conversion worked
        if (!Buffer.isBuffer(screenshot) || screenshot.length === 0) {
          console.error('Buffer conversion failed:', typeof screenshotBuffer, 'length:', screenshotBuffer?.length);
          throw new Error('Failed to convert screenshot to Buffer');
        }
      }

      // Apply mockup if specified
      if (mockup && mockup !== 'none' && format !== 'pdf') {
        try {
          screenshot = await applyMockup(screenshot, mockup);
        } catch (mockupError) {
          console.error('Mockup application failed:', mockupError);
          // Return original screenshot without mockup if mockup fails
          console.log('Returning original screenshot due to mockup error');
        }
      }

      return new NextResponse(screenshot, {
        headers: {
          'Content-Type': format === 'pdf' ? 'application/pdf' : `image/${format}`,
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': (rateLimit.remaining - 1).toString(),
          'X-RateLimit-Reset': rateLimit.reset.toString(),
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error: unknown) {
    console.error('Playground screenshot error:', error);

    return NextResponse.json(
      { 
        error: 'Failed to capture screenshot',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
} 