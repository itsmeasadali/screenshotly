import { NextRequest, NextResponse } from 'next/server';
import { screenshotSchema } from '@/lib/api/screenshot-schema';
import { processScreenshot } from '@/lib/api/screenshot-processor';
import { getContentType, getFileExtension } from '@/lib/api/screenshot-utils';
import { authenticateApiRequest, checkApiRateLimit, trackApiUsage } from '@/lib/api/api-auth';

export async function POST(request: NextRequest) {
  let userId: string | undefined;
  let apiKey: string | undefined;

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
            'Retry-After': rateLimitResult.retryAfter?.toString() || '3600'
          }
        }
      );
    }

    // Process screenshot
    const screenshotBuffer = await processScreenshot(validatedData);

    // Track API usage
    await trackApiUsage(userId!, apiKey!, {
      url: validatedData.url,
      format: validatedData.format,
      device: validatedData.device,
      mockup: validatedData.mockup,
      aiRemoval: validatedData.aiRemoval?.enabled,
      timestamp: new Date().toISOString()
    });

    // Prepare response
    const contentType = getContentType(validatedData.format || 'png');
    const fileExtension = getFileExtension(validatedData.format || 'png');
    const filename = `screenshot-${Date.now()}.${fileExtension}`;

    return new NextResponse(screenshotBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('Screenshot API error:', error);
    
    // Track failed request if we have user info
    if (userId && apiKey) {
      try {
        await trackApiUsage(userId, apiKey, {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
          success: false
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
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests. Please check the API documentation for usage examples.',
      documentation: 'https://docs.screenshotly.com/api/screenshot'
    },
    { status: 405 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key, Authorization',
    },
  });
} 