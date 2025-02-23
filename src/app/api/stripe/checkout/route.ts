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
  pro: PlanInterval;
}

const PLANS: Plans = {
  pro: {
    monthly: {
      priceId: 'price_1QNM4QJWak4JrUEkndXqS2Ho',
      amount: 29,
    },
    yearly: {
      priceId: 'price_1QNM4QJWak4JrUEkndXqS2Ho',
      amount: 290,
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
    const { planId, interval } = body as { planId: keyof Plans; interval: keyof PlanInterval };

    if (!planId || !interval || !PLANS[planId]?.[interval]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
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
      success_url: `${request.headers.get('origin')}/dashboard?success=true`,
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