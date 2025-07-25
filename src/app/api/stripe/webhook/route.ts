import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature found' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planId, interval } = session.metadata || {};

        if (userId && planId && session.customer && session.subscription) {
          try {
            // Update user with subscription details
            await prisma.user.update({
              where: { id: userId },
              data: {
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                plan: planId.toUpperCase() as 'FREE' | 'PRO',
                subscriptionStatus: 'ACTIVE',
                billingCycleStart: new Date(),
                // Set billing cycle end based on interval
                billingCycleEnd: new Date(
                  Date.now() + (interval === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000
                ),
              },
            });

            console.log('User subscription activated:', { userId, planId, interval });
          } catch (error) {
            console.error('Failed to update user subscription:', error);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          
          if ('email' in customer && customer.email) {
            await prisma.user.updateMany({
              where: { 
                stripeCustomerId: subscription.customer as string 
              },
              data: {
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0]?.price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                subscriptionStatus: subscription.status === 'active' ? 'ACTIVE' : 
                                  subscription.status === 'past_due' ? 'PAST_DUE' :
                                  subscription.status === 'canceled' ? 'CANCELED' :
                                  subscription.status === 'unpaid' ? 'UNPAID' : 'INACTIVE',
              },
            });
          }
          
          console.log('Subscription updated:', subscription.id);
        } catch (error) {
          console.error('Failed to update subscription:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        try {
          await prisma.user.updateMany({
            where: { 
              stripeSubscriptionId: subscription.id 
            },
            data: {
              plan: 'FREE',
              subscriptionStatus: 'CANCELED',
              stripePriceId: null,
              stripeCurrentPeriodEnd: null,
            },
          });
          
          console.log('Subscription cancelled:', subscription.id);
        } catch (error) {
          console.error('Failed to cancel subscription:', error);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.customer && invoice.subscription) {
          try {
            await prisma.user.updateMany({
              where: { 
                stripeCustomerId: invoice.customer as string 
              },
              data: {
                subscriptionStatus: 'PAST_DUE',
              },
            });
            
            console.log('Payment failed for subscription:', invoice.subscription);
          } catch (error) {
            console.error('Failed to update payment failure status:', error);
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.customer && invoice.subscription) {
          try {
            await prisma.user.updateMany({
              where: { 
                stripeCustomerId: invoice.customer as string 
              },
              data: {
                subscriptionStatus: 'ACTIVE',
              },
            });
            
            console.log('Payment succeeded for subscription:', invoice.subscription);
          } catch (error) {
            console.error('Failed to update payment success status:', error);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 