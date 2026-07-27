'use client';

import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { supabase, getStripeEnvironment } from '@/lib/mestarClient';

let stripePromise;
function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}

// Mirrors mestar's src/components/StripeEmbeddedCheckout.tsx: the client
// secret comes from mestar's create-checkout Edge Function (which resolves
// Stripe Price lookup keys and creates the session server-side), not from
// any Stripe SDK call made in this app.
export function StripeEmbeddedCheckout({ priceIds, orderId, customerEmail, returnUrl }) {
  const fetchClientSecret = async () => {
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceIds, orderId, customerEmail, returnUrl, environment: getStripeEnvironment() },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || 'Failed to create checkout session');
    }
    return data.clientSecret;
  };

  return (
    <div id="checkout" className="min-h-[600px]">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
