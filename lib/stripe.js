import Stripe from 'stripe';

let stripeClient;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  return stripeClient;
}

export const STRIPE_PRICE_ID =
  process.env.STRIPE_PRICE_ID || process.env.STRIPE_PRICE_MAIN_STORY || 'price_placeholder';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';