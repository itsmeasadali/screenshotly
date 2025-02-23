import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createApiKey, getUserApiKeys, revokeApiKey } from '@/lib/api-keys';

const apiKeySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  expiresIn: z.number().min(1).max(365).optional(), // days
});

export async function GET() {
  try {
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const keys = await getUserApiKeys(userId);

    return NextResponse.json({ keys });
  } catch (error) {
    console.error('API key list error:', error);
    return NextResponse.json(
      { error: 'Failed to list API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name = 'Default API Key', expiresIn = 30 } = apiKeySchema.parse(body);

    // Create new API key in database
    const apiKeyData = await createApiKey(userId, name, expiresIn);

    return NextResponse.json({
      apiKey: apiKeyData.key, // The unhashed key
      name: apiKeyData.name,
      expiresAt: apiKeyData.expiresAt,
      usageLimit: apiKeyData.usageLimit
    });
  } catch (error) {
    console.error('API key generation error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to generate API key' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const keyId = searchParams.get('id');

    if (!keyId) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    await revokeApiKey(keyId, userId);

    return NextResponse.json({
      message: 'API key revoked successfully'
    });
  } catch (error) {
    console.error('API key revocation error:', error);
    return NextResponse.json(
      { error: 'Failed to revoke API key' },
      { status: 500 }
    );
  }
} 