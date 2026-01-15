import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserData, getUserApiKeyStats, getUserMonthlyUsage, createUserIfNotExists } from '@/lib/user';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate userId format to prevent injection attempts
    if (typeof userId !== 'string' || userId.length > 255 || !/^[a-zA-Z0-9_-]+$/.test(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      );
    }

    // Try to get user data, create user if doesn't exist
    let userData = await getUserData(userId);
    
    if (!userData) {
      console.log(`Creating new user in database for Clerk ID: ${userId}`);
      // User doesn't exist in database, create them
      userData = await createUserIfNotExists(userId);
    }

    // Optimize by running queries in parallel and with timeout
    const [apiStats, monthlyUsage] = await Promise.allSettled([
      Promise.race([
        getUserApiKeyStats(userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
      ]),
      Promise.race([
        getUserMonthlyUsage(userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
      ])
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : { totalKeys: 0, activeKeys: 0, monthlyLimit: 100 },
      results[1].status === 'fulfilled' ? results[1].value : 0
    ]);

    return NextResponse.json({
      userData,
      apiStats,
      monthlyUsage,
    });
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    
    // More specific error handling
    if (error instanceof Error && error.message.includes('Failed to create user')) {
      return NextResponse.json(
        { error: 'Failed to initialize user account' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 