import { NextRequest, NextResponse } from 'next/server';
import { screenshotSchema } from '@/lib/api/screenshot-schema';
import { processScreenshot } from '@/lib/api/screenshot-processor';
import { getContentType, getFileExtension } from '@/lib/api/screenshot-utils';
import { authenticateApiRequest, checkApiRateLimit, trackApiUsage } from '@/lib/api/api-auth';
import { sendWebhookAsync } from '@/lib/api/webhook';

// Increase timeout for screenshot processing
export const maxDuration = 30; // seconds (for Vercel)

export async function POST(request: NextRequest) {
  let userId: string | undefined;
  let apiKey: string | undefined;
  const startTime = Date.now();

  try {
    // Authenticate API request
    const authResult = await authenticateApiRequest(request);

    if (!authResult.success) {
      return NextResponse.json(
        {
          error: 'Authentication failed',
          message: authResult.error
        },
        { status: authResult.status || 401 }
      );
    }

    userId = authResult.userId;
    apiKey = authResult.apiKey;

    // Parse and validate request body
    const body = await request.json();
    const validatedData = screenshotSchema.parse(body);

    // Check rate limits
    const rateLimitResult = await checkApiRateLimit(userId!);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: rateLimitResult.message,
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '3600',
            'X-RateLimit-Limit': rateLimitResult.limit?.toString() || '0',
            'X-RateLimit-Remaining': '0',
          }
        }
      );
    }

    // Process screenshot
    const screenshotBuffer = await processScreenshot(validatedData);
    const duration = Date.now() - startTime;

    // Track API usage
    await trackApiUsage(userId!, apiKey!, {
      url: validatedData.url,
      format: validatedData.format,
      device: validatedData.device,
      mockup: validatedData.mockup,
      aiRemoval: validatedData.aiRemoval?.enabled,
      blockAds: validatedData.blockAds,
      stealth: validatedData.stealth,
      cache: validatedData.cache,
      darkMode: validatedData.darkMode,
      timestamp: new Date().toISOString(),
      duration,
      size: screenshotBuffer.length,
    });

    // --- S3 Storage delivery ---
    let storageUrl: string | undefined;
    if (validatedData.storage?.enabled) {
      try {
        const { uploadToStorage } = await import('@/lib/api/s3-storage');
        const contentType = getContentType(validatedData.format || 'png');
        const result = await uploadToStorage(screenshotBuffer, {
          bucket: validatedData.storage.bucket,
          path: validatedData.storage.path,
          acl: validatedData.storage.acl,
          contentType,
        });
        storageUrl = result.url;
      } catch (storageError) {
        console.error('S3 upload failed:', storageError);
        // Continue — still return the screenshot directly
      }
    }

    // --- Webhook delivery ---
    if (validatedData.webhook?.url) {
      sendWebhookAsync(
        {
          url: validatedData.webhook.url,
          method: validatedData.webhook.method,
          headers: validatedData.webhook.headers,
          secret: validatedData.webhook.secret,
        },
        {
          event: 'screenshot.completed',
          timestamp: new Date().toISOString(),
          data: {
            url: validatedData.url,
            format: validatedData.format || 'png',
            size: screenshotBuffer.length,
            storageUrl,
            duration,
          },
        }
      );
    }

    // --- Prepare response ---
    const contentType = getContentType(validatedData.format || 'png');
    const fileExtension = getFileExtension(validatedData.format || 'png');
    const filename = `screenshot-${Date.now()}.${fileExtension}`;

    // If S3 storage was used, return JSON with the URL
    if (storageUrl) {
      return NextResponse.json({
        success: true,
        url: storageUrl,
        format: validatedData.format || 'png',
        size: screenshotBuffer.length,
        duration,
      }, {
        headers: {
          'X-Screenshot-Duration': duration.toString(),
          'X-Screenshot-Size': screenshotBuffer.length.toString(),
        },
      });
    }

    // Return screenshot as binary
    return new NextResponse(new Uint8Array(screenshotBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': validatedData.cache
          ? `public, max-age=${validatedData.cacheTtl || 3600}`
          : 'no-cache, no-store, must-revalidate',
        'X-Screenshot-Duration': duration.toString(),
        'X-Screenshot-Size': screenshotBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Screenshot API error:', error);
    const duration = Date.now() - startTime;

    // Track failed request if we have user info
    if (userId && apiKey) {
      try {
        await trackApiUsage(userId, apiKey, {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
          success: false,
          duration,
        });
      } catch (trackingError) {
        console.error('Failed to track error:', trackingError);
      }
    }

    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          message: 'Please check your request parameters and try again',
          details: error.message
        },
        { status: 400 }
      );
    }

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Screenshot generation failed',
        message: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      service: 'Screenshotly Screenshot API',
      version: '2.0',
      status: 'operational',
      documentation: 'https://screenshotly.app/docs',
      endpoints: {
        screenshot: {
          method: 'POST',
          path: '/api/screenshot',
          description: 'Capture a website screenshot',
          authentication: 'x-api-key header',
        },
      },
      features: [
        'PNG, JPEG, WebP, PDF output',
        'Device mockups (iPhone, MacBook, Browser)',
        'AI element removal',
        'Ad blocking',
        'Stealth mode (anti-bot bypass)',
        'Dark mode capture',
        'Full page screenshots',
        'Custom viewports & device presets',
        'CSS selector targeting',
        'Geolocation emulation',
        'Timezone override',
        'Custom cookies & headers',
        'JavaScript injection',
        'Response caching',
        'S3 storage delivery',
        'Webhook notifications',
        'Scrolling/lazy-load capture',
        'Device scale factor (Retina)',
      ],
    },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 