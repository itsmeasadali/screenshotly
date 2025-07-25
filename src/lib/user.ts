import { prisma } from '@/lib/db';

export interface UserData {
  id: string;
  email: string;
  plan: string;
  subscriptionStatus: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCurrentPeriodEnd?: Date | null;
  billingCycleStart?: Date | null;
  billingCycleEnd?: Date | null;
  monthlyUsage: number;
  lastUsageReset: Date;
  createdAt: Date;
}

export interface UserApiKeyStats {
  totalKeys: number;
  activeKeys: number;
  todayUsage: number;
  monthlyLimit: number;
}

export async function getUserData(userId: string): Promise<UserData | null> {
  try {
    // Use type-safe Prisma query instead of raw SQL to prevent injection
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        plan: true,
        subscriptionStatus: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        billingCycleStart: true,
        billingCycleEnd: true,
        monthlyUsage: true,
        lastUsageReset: true,
        createdAt: true,
      },
    });

    return user as UserData | null;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

export async function createUserIfNotExists(userId: string): Promise<UserData> {
  try {
    // Generate a default email for the user (will be updated when we get real email)
    const defaultEmail = `user_${userId}@example.com`;
    
    console.log(`Creating user with ID: ${userId}`);
    
    // Use upsert to handle race conditions where user might be created concurrently
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        // Update updatedAt timestamp if user already exists
        updatedAt: new Date(),
      },
      create: {
        id: userId,
        email: defaultEmail,
        plan: 'FREE',
        subscriptionStatus: 'INACTIVE',
        monthlyUsage: 0,
        lastUsageReset: new Date(),
      },
      select: {
        id: true,
        email: true,
        plan: true,
        subscriptionStatus: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        billingCycleStart: true,
        billingCycleEnd: true,
        monthlyUsage: true,
        lastUsageReset: true,
        createdAt: true,
      },
    });

    console.log(`User created/found successfully: ${userId}`);
    return user as UserData;
  } catch (error) {
    console.error('Failed to create user:', error);
    
    // Try to fetch the user again in case of a race condition
    try {
      const existingUser = await getUserData(userId);
      if (existingUser) {
        console.log(`User found on retry: ${userId}`);
        return existingUser;
      }
    } catch (retryError) {
      console.error('Retry fetch also failed:', retryError);
    }
    
    throw new Error('Failed to create user account');
  }
}

export async function getUserApiKeyStats(userId: string): Promise<UserApiKeyStats> {
  try {
    // Get all user's API keys with today's requests
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      include: {
        apiRequests: {
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)), // Today
            },
          },
        },
      },
    });

    const totalKeys = apiKeys.length;
    const activeKeys = apiKeys.filter(key => key.status === 'ACTIVE').length;
    const todayUsage = apiKeys.reduce((sum, key) => sum + key.apiRequests.length, 0);

    // Get user's plan for limit calculation
    const userData = await getUserData(userId);
    const monthlyLimit = userData?.plan === 'PRO' ? 5000 : 500;

    return {
      totalKeys,
      activeKeys,
      todayUsage,
      monthlyLimit,
    };
  } catch (error) {
    console.error('Failed to fetch user API key stats:', error);
    return {
      totalKeys: 0,
      activeKeys: 0,
      todayUsage: 0,
      monthlyLimit: 500,
    };
  }
}

export async function getUserMonthlyUsage(userId: string): Promise<number> {
  try {
    const userData = await getUserData(userId);
    
    if (!userData) return 0;

    // Check if we need to reset monthly usage
    const now = new Date();
    const lastReset = new Date(userData.lastUsageReset);
    const monthsSinceReset = (now.getFullYear() - lastReset.getFullYear()) * 12 + 
                           (now.getMonth() - lastReset.getMonth());

    if (monthsSinceReset >= 1) {
      // Reset monthly usage using type-safe update
      await prisma.user.update({
        where: { id: userId },
        data: {
          monthlyUsage: 0,
          lastUsageReset: now,
        },
      });
      return 0;
    }

    return userData.monthlyUsage;
  } catch (error) {
    console.error('Failed to fetch user monthly usage:', error);
    return 0;
  }
}

export function formatSubscriptionStatus(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'Active';
    case 'PAST_DUE':
      return 'Past Due';
    case 'CANCELED':
      return 'Canceled';
    case 'UNPAID':
      return 'Unpaid';
    case 'INACTIVE':
    default:
      return 'Inactive';
  }
}

export function getNextBillingDate(
  plan: string,
  billingCycleEnd?: Date | null,
  stripeCurrentPeriodEnd?: Date | null
): string {
  if (plan === 'FREE') {
    return 'N/A';
  }

  const nextBilling = stripeCurrentPeriodEnd || billingCycleEnd;
  if (nextBilling) {
    return new Date(nextBilling).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return 'N/A';
}

export function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case 'PRO':
      return 'Pro';
    case 'FREE':
    default:
      return 'Free';
  }
} 