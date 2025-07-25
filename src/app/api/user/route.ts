import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserData, getUserApiKeyStats, getUserMonthlyUsage } from '@/lib/user';

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

    const [userData, apiStats, monthlyUsage] = await Promise.all([
      getUserData(userId),
      getUserApiKeyStats(userId),
      getUserMonthlyUsage(userId),
    ]);

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      userData,
      apiStats,
      monthlyUsage,
    });
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 