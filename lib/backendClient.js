import { createClient } from '@supabase/supabase-js';

// Client-side Supabase connection (anon key only — never the service role
// key here) to this app's own Supabase project (ktkebsvoqbxsirgluxeo) —
// NOT mestar's project (gqgloucjqvhbbjyxfgqw), which this account cannot
// access. Checkout, order creation, photo storage, and order-status polling
// all go through this project's Edge Functions, which hold the real secrets
// (Stripe, service role, Gemini, Resend) server-side. See .env.example.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export function isBackendConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}

// Mirrors mestar's src/lib/stripe.ts getStripeEnvironment() — same Stripe
// account (acct_1T45wEEFjF8b7r2p / "mE-STAR"), same key format.
export function getStripeEnvironment() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (key?.startsWith('pk_test_')) return 'sandbox';
  if (key?.startsWith('pk_live_')) return 'live';
  throw new Error('Stripe payments are not configured (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY missing).');
}

// mystarmvp's short theme ids -> descriptive theme titles the AI generation
// pipeline (generate-story) uses as free text in its prompt.
export const THEME_LABELS = {
  space: 'Space Adventure',
  princess: 'Fairy Tale Kingdom',
  superhero: 'Superhero Origin',
  fairy: 'Magical Forest',
  animal: 'Farm Animals',
  castle: 'Fairy Tale Kingdom',
};

// generate-story expects a child_age *range* (default "4-7"), not an exact
// age. mystarmvp's form collects an exact age (1-12); bucket it.
export function toChildAgeBucket(age) {
  const n = Number(age);
  if (!Number.isFinite(n)) return '4-7';
  if (n <= 3) return '1-3';
  if (n <= 7) return '4-7';
  return '8-12';
}

// Stripe Price lookup keys create-checkout resolves server-side. Same
// lookup keys as mestar's catalog — same Stripe account. "additional-
// character" isn't offered here because mystarmvp's form doesn't collect a
// supporting-character name/photo yet, and the generation pipeline needs
// both to fulfill that add-on.
export const PRICE_LOOKUP_KEYS = {
  mainStory: 'personalized_storybook_onetime',
  audiobook: 'audiobook_classic_onetime',
  coloringBook: 'coloring_pages_addon_onetime',
};

// Creates the order row (orders table, status: pending_payment) and, if a
// photo is provided, uploads it into the private customer-photos bucket —
// all in one call. The Edge Function does the Storage write server-side
// using the service role key, so the browser never needs direct Storage
// access.
export async function createPendingOrder({ childName, age, theme, photoDataUrl, customerEmail }) {
  if (!supabase) throw new Error('Backend is not configured.');

  const { data, error } = await supabase.functions.invoke('create-pending-order', {
    body: {
      childName,
      childAge: toChildAgeBucket(age),
      theme: THEME_LABELS[theme] || theme,
      customerEmail: customerEmail || '',
      ...(photoDataUrl && { childPhotoDataUrl: photoDataUrl }),
    },
  });

  if (error || !data?.orderId) {
    throw new Error(error?.message || 'Could not start your order. Please try again.');
  }

  return data; // { orderId }
}

// Polls the get-order-status Edge Function for progress (pending_payment ->
// paid -> generating_story -> generating_images -> assembling_pdf ->
// complete/failed) and, once complete, the story title + PDF download URL.
export async function getOrderStatus(orderId) {
  if (!SUPABASE_URL) throw new Error('Backend is not configured.');

  const qs = new URLSearchParams({ orderId });
  const res = await fetch(`${SUPABASE_URL}/functions/v1/get-order-status?${qs.toString()}`);
  return res.json();
}
