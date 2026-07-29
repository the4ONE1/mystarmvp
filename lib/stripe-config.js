// Shared helpers for validating that Stripe environment variables are set to
// real, live values rather than being missing or left as test/placeholder
// values. Used by the checkout session and webhook API routes so
// misconfiguration fails loudly (clear logs/errors) instead of silently
// falling back to a non-functional placeholder.

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function isPlaceholder(value) {
  return !value || value.includes('placeholder');
}

function isLiveKey(value, livePrefix, testPrefix) {
  if (isPlaceholder(value)) return false;
  if (value.startsWith(testPrefix)) return false;
  return value.startsWith(livePrefix);
}

/**
 * Validates the Stripe environment variables required to create a live
 * Checkout Session. Returns an array of human-readable error strings.
 * The array is empty when everything looks correctly configured.
 */
function validateCheckoutEnv() {
  const errors = [];

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (isPlaceholder(secretKey)) {
    errors.push('STRIPE_SECRET_KEY is missing or set to a placeholder value.');
  } else if (IS_PRODUCTION && secretKey.startsWith('sk_test_')) {
    errors.push('STRIPE_SECRET_KEY is a test-mode key ("sk_test_...") but the app is running in production. A live key ("sk_live_...") is required to accept real payments.');
  } else if (!secretKey.startsWith('sk_')) {
    errors.push('STRIPE_SECRET_KEY does not look like a valid Stripe secret key (expected to start with "sk_").');
  }

  const priceEnvVars = [
    'STRIPE_PRICE_MAIN_STORY',
    'STRIPE_PRICE_AUDIOBOOK',
    'STRIPE_PRICE_COLORING_BOOK',
    'STRIPE_PRICE_ADDITIONAL_CHARACTER',
  ];

  priceEnvVars.forEach((name) => {
    const value = process.env[name];
    if (isPlaceholder(value)) {
      errors.push(`${name} is missing or set to a placeholder value.`);
    } else if (!value.startsWith('price_')) {
      errors.push(`${name} does not look like a valid Stripe Price ID (expected to start with "price_").`);
    }
  });

  return errors;
}

/**
 * Validates the Stripe webhook secret used to verify incoming webhook
 * events. Returns an array of human-readable error strings.
 */
function validateWebhookEnv() {
  const errors = [];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (isPlaceholder(webhookSecret)) {
    errors.push('STRIPE_WEBHOOK_SECRET is missing or set to a placeholder value. Webhook signature verification cannot run, so order fulfillment will not happen.');
  } else if (!webhookSecret.startsWith('whsec_')) {
    errors.push('STRIPE_WEBHOOK_SECRET does not look like a valid Stripe webhook signing secret (expected to start with "whsec_").');
  }

  return errors;
}

export { isPlaceholder, isLiveKey, validateCheckoutEnv, validateWebhookEnv };
