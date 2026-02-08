import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

interface PlanDetails {
  priceId: string;
  amount: number;
}

interface PlanInterval {
  monthly: PlanDetails;
  yearly: PlanDetails;
}

interface Plans {
  [key: string]: PlanInterval;
}

// TODO: Replace these placeholder price IDs with actual Stripe Price IDs
// You need to create these products/prices in your Stripe Dashboard:
// - Basic: $14/mo or $134/yr (2,500 screenshots/mo)
// - Growth: $59/mo or $566/yr (12,000 screenshots/mo)
// - Scale: $199/mo or $1,910/yr (50,000 screenshots/mo)
const PLANS: Plans = {
  basic: {
    monthly: {
      priceId: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID || 'price_basic_monthly',
      amount: 14,
    },
    yearly: {
      priceId: process.env.STRIPE_BASIC_YEARLY_PRICE_ID || 'price_basic_yearly',
      amount: 134, // ~$11.17/mo — 20% discount
    },
  },
  growth: {
    monthly: {
      priceId: process.env.STRIPE_GROWTH_MONTHLY_PRICE_ID || 'price_growth_monthly',
      amount: 59,
    },
    yearly: {
      priceId: process.env.STRIPE_GROWTH_YEARLY_PRICE_ID || 'price_growth_yearly',
      amount: 566, // ~$47.17/mo — 20% discount
    },
  },
  scale: {
    monthly: {
      priceId: process.env.STRIPE_SCALE_MONTHLY_PRICE_ID || 'price_scale_monthly',
      amount: 199,
    },
    yearly: {
      priceId: process.env.STRIPE_SCALE_YEARLY_PRICE_ID || 'price_scale_yearly',
      amount: 1910, // ~$159.17/mo — 20% discount
    },
  },
  // Legacy alias for backward compatibility
  pro: {
    monthly: {
      priceId: process.env.STRIPE_GROWTH_MONTHLY_PRICE_ID || 'price_growth_monthly',
      amount: 59,
    },
    yearly: {
      priceId: process.env.STRIPE_GROWTH_YEARLY_PRICE_ID || 'price_growth_yearly',
      amount: 566,
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { planId, interval } = body as { planId: string; interval: keyof PlanInterval };

    if (!planId || !interval || !PLANS[planId]?.[interval]) {
      return NextResponse.json(
        { error: 'Invalid plan. Available plans: basic, growth, scale' },
        { status: 400 }
      );
    }

    const plan = PLANS[planId][interval];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: body.email,
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/dashboard?success=true&plan=${planId}`,
      cancel_url: `${request.headers.get('origin')}/pricing?canceled=true`,
      metadata: {
        userId,
        planId,
        interval,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}