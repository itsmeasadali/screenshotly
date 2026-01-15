import { NextRequest } from 'next/server';
import { validateApiKey, trackApiRequest, getRateLimitInfo } from '@/lib/api-keys';

export interface AuthResult {
  success: boolean;
  userId?: string;
  apiKey?: string;
  error?: string;
  status?: number;
}

export interface RateLimitResult {
  success: boolean;
  message?: string;
  retryAfter?: number;
}

export async function authenticateApiRequest(request: NextRequest): Promise<AuthResult> {
  try {
    // Get API key from header
    const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!apiKey) {
      return {
        success: false,
        error: 'API key is required. Please provide your API key in the x-api-key header.',
        status: 401
      };
    }

    // Validate API key
    const validation = await validateApiKey(apiKey);
    
    if (!validation.isValid) {
      return {
        success: false,
        error: 'Invalid API key',
        status: 401
      };
    }

    // Extract userId from the key object
    const userId = validation.key && 'user' in validation.key ? validation.key.user.id : validation.key?.id;

    return {
      success: true,
      userId: userId!,
      apiKey: apiKey
    };

  } catch (error) {
    console.error('API authentication error:', error);
    return {
      success: false,
      error: 'Authentication failed',
      status: 500
    };
  }
}

export async function checkApiRateLimit(userId: string): Promise<RateLimitResult> {
  try {
    const rateLimitInfo = await getRateLimitInfo(userId);
    
    if (rateLimitInfo && rateLimitInfo.remaining <= 0) {
      const resetTime = rateLimitInfo.reset;
      const now = new Date();
      const retryAfter = Math.ceil((resetTime.getTime() - now.getTime()) / 1000);
      
      return {
        success: false,
        message: `Rate limit exceeded. Limit resets at ${resetTime.toISOString()}`,
        retryAfter: retryAfter > 0 ? retryAfter : 3600
      };
    }

    return { success: true };

  } catch (error) {
    console.error('Rate limit check error:', error);
    return {
      success: false,
      message: 'Rate limit check failed'
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function trackApiUsage(userId: string, _apiKey: string, _metadata?: Record<string, unknown>): Promise<void> {
  try {
    await trackApiRequest(userId, '/api/screenshot', 200, 0);
  } catch (error) {
    console.error('Failed to track API usage:', error);
    // Don't throw error as this shouldn't block the request
  }
}
