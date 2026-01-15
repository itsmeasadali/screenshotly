import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { checkRateLimit } from '@/utils/rateLimit';
import { screenshotSchema } from '@/lib/api/screenshot-schema';
import { processScreenshot } from '@/lib/api/screenshot-processor';
import { getContentType, getFileExtension } from '@/lib/api/screenshot-utils';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request data
    const validatedData = screenshotSchema.parse(body);
    
    // Check authentication for AI features
    const { userId } = await auth();
    
    if (validatedData.aiRemoval?.enabled && !userId) {
      return NextResponse.json(
        { 
          error: 'AI features require authentication',
          message: 'Please sign in to use AI element removal features',
          requiresAuth: true
        },
        { status: 401 }
      );
    }

    // Rate limiting
    const rateLimitKey = userId || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';
    const rateLimitResult = await checkRateLimit(rateLimitKey, userId ? 'pro' : 'free');
    
    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: `Too many requests. Try again later.`,
          retryAfter: retryAfter
        },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString()
          }
        }
      );
    }

    // Process screenshot
    const screenshotBuffer = await processScreenshot(validatedData);

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
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          message: 'Please check your request parameters',
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
      message: 'This endpoint only accepts POST requests'
    },
    { status: 405 }
  );
} 