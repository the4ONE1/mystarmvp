import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder, isSupabaseConfigured } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Resolves the base URL for Stripe's success/cancel redirect. NEXT_PUBLIC_BASE_URL is a
// build-time env var — if it's ever unset or left pointing at localhost in production, falling
// back to it silently sends real customers who just paid to a dead URL. Prefer the actual
// request origin (which is always correct for whatever domain served the request) instead.
function resolveDomainUrl(request) {
  const configured = process.env.NEXT_PUBLIC_BASE_URL;
  if (configured && !configured.includes('localhost')) return configured;
  try {
    return request.nextUrl.origin;
  } catch {
    return configured || 'http://localhost:3000';
  }
}

export async function POST(request) {
  try {
    const DOMAIN_URL = resolveDomainUrl(request);
    const body = await request.json();
    const {
      customerEmail,
      customerName,
      childName,
      age,
      childAge, // Accept both age and childAge
      gender,
      theme,
      dedication,
      selectedAddons: rawSelectedAddons = []
    } = body;

    const selectedAddons = Array.isArray(rawSelectedAddons) ? rawSelectedAddons : [];

    // Use childAge if age is not provided
    const childAgeValue = age || childAge;

    // Validate required fields
    if (!customerEmail || !childName || !theme) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, childName, theme' },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_MAIN_STORY) {
      console.error('Checkout session error: STRIPE_SECRET_KEY or STRIPE_PRICE_MAIN_STORY is not set');
      return NextResponse.json(
        { error: 'Checkout is not configured', details: 'Missing Stripe price configuration on the server' },
        { status: 500 }
      );
    }

    // Build line items array - Main story is always included
    const lineItems = [
      {
        price: process.env.STRIPE_PRICE_MAIN_STORY,
        quantity: 1,
      },
    ];

    // Add-on Price ID mapping
    const addonPriceMapping = {
      'audiobook': process.env.STRIPE_PRICE_AUDIOBOOK,
      'coloring-book': process.env.STRIPE_PRICE_COLORING_BOOK,
      'additional-character': process.env.STRIPE_PRICE_ADDITIONAL_CHARACTER,
    };

    // Add selected add-ons to line items
    selectedAddons.forEach(addon => {
      const addonId = typeof addon === 'string' ? addon : addon.id;
      const priceId = addonPriceMapping[addonId];

      if (priceId) {
        lineItems.push({
          price: priceId,
          quantity: 1,
        });
      }
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customerEmail,
      success_url: `${DOMAIN_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN_URL}/checkout?canceled=true`,
      metadata: {
        customer_name: customerName || '',
        child_name: childName,
        age: String(childAgeValue || ''),
        gender: gender || '',
        theme: theme,
        dedication: dedication || '',
        selected_addons: JSON.stringify(selectedAddons),
      },
    });

    // Create pending order in Supabase (if configured)
    if (isSupabaseConfigured()) {
      try {
        await createOrder({
          session_id: session.id,
          customer_email: customerEmail,
          customer_name: customerName || '',
          items: lineItems.map(item => ({
            price_id: item.price,
            quantity: item.quantity,
          })),
          amount_total: null, // Will be updated by webhook
          currency: 'usd',
          status: 'pending',
          child_name: childName,
          child_age: String(childAgeValue || ''),
          story_theme: theme,
          photo_urls: [],
          created_at: new Date().toISOString(),
        });
      } catch (dbError) {
        console.error('Failed to create order in Supabase:', dbError);
        // Continue anyway - webhook will handle it
      }
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
