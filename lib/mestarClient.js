import { createClient } from '@supabase/supabase-js';

// Client-side Supabase connection to mestar's Supabase project (anon key only —
// never the service role key here). Checkout, order creation, photo storage,
// and order-status polling all go through mestar's existing Edge Functions,
// which hold the real secrets (Stripe, service role) server-side. See
// .env.example for where these values come from.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export function isMestarBackendConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

// Mirrors mestar's src/lib/stripe.ts getStripeEnvironment().
export function getStripeEnvironment() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (key?.startsWith('pk_test_')) return 'sandbox';
  if (key?.startsWith('pk_live_')) return 'live';
  throw new Error('Stripe payments are not configured (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY missing).');
}

// mystarmvp's short theme ids -> mestar's descriptive theme titles (the two
// apps don't share a theme taxonomy; this is a best-effort content mapping
// so the AI generation pipeline gets a real theme description, not a bare id).
export const THEME_LABELS = {
  space: 'Space Adventure',
  princess: 'Fairy Tale Kingdom',
  superhero: 'Superhero Origin',
  fairy: 'Magical Forest',
  animal: 'Farm Animals',
  castle: 'Fairy Tale Kingdom',
};

// mestar's create-pending-order expects a child_age *range* (default "4-7"),
// not an exact age. mystarmvp's form collects an exact age (1-12); bucket it.
export function toChildAgeBucket(age) {
  const n = Number(age);
  if (!Number.isFinite(n)) return '4-7';
  if (n <= 3) return '1-3';
  if (n <= 7) return '4-7';
  return '8-12';
}

// Stripe Price lookup keys mestar's create-checkout resolves server-side.
// These are lookup keys, not secrets — mestar's own frontend ships the same
// identifiers. "additional-character" isn't offered here because mystarmvp's
// form doesn't collect a supporting-character name/photo yet, and mestar's
// pipeline needs both to fulfill that add-on.
export const PRICE_LOOKUP_KEYS = {
  mainStory: 'personalized_storybook_onetime',
  audiobook: 'audiobook_classic_onetime',
  coloringBook: 'coloring_pages_addon_onetime',
};

// Creates the order row in mestar's storybook_orders table and (if a photo is
// provided) uploads it into mestar's private customer-photos bucket, all in
// one call — the Edge Function does the Storage write server-side using the
// service role key, so the browser never needs direct Storage access.
export async function createPendingOrder({ childName, age, theme, photoDataUrl, customerEmail }) {
  if (!supabase) throw new Error('Backend is not configured.');

  const { data, error } = await supabase.functions.invoke('create-pending-order', {
    body: {
      childName,
      childAge: toChildAgeBucket(age),
      theme: THEME_LABELS[theme] || theme,
      customerEmail: customerEmail || '',
      selectedAddons: {},
      ...(photoDataUrl && { childPhotoDataUrl: photoDataUrl }),
    },
  });

  if (error || !data?.orderId) {
    throw new Error(error?.message || 'Could not start your order. Please try again.');
  }

  return data; // { orderId, recoveryToken }
}

// Polls mestar's get-order-status Edge Function. Unauthenticated calls (no
// token) only get back status/title/child_name; the recovery token (from
// createPendingOrder) is required to also receive customer_email and pdf_url.
export async function getOrderStatus(orderId, token) {
  if (!SUPABASE_URL) throw new Error('Backend is not configured.');

  const qs = new URLSearchParams({ orderId });
  if (token) qs.set('token', token);

  const res = await fetch(`${SUPABASE_URL}/functions/v1/get-order-status?${qs.toString()}`);
  return res.json();
}
