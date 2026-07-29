import Stripe from 'stripe';
import { validateCheckoutEnv } from './stripe-config';

const configErrors = validateCheckoutEnv();
if (configErrors.length > 0) {
  console.warn('Stripe is not fully configured for live payments:', configErrors);
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-08-16',
});

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_placeholder';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';