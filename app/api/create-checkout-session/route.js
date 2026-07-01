import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCollection } from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

const DOMAIN_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      customerEmail, 
      childName, 
      age,
      gender,
      theme, 
      dedication,
      selectedAddons = [] 
    } = body;

    // Validate required fields
    if (!customerEmail || !childName || !theme) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, childName, theme' },
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    const isStripeConfigured = 
      process.env.STRIPE_SECRET_KEY && 
      !process.env.STRIPE_SECRET_KEY.includes('placeholder') &&
      process.env.STRIPE_PRICE_MAIN_STORY &&
      !process.env.STRIPE_PRICE_MAIN_STORY.includes('placeholder');

    if (!isStripeConfigured) {
      // Mock mode - create order directly as 'pending'
      const ordersCollection = await getCollection('orders');
      const order = await ordersCollection.insertOne({
        stripe_session_id: `mock_${Date.now()}`,
        customer_email: customerEmail,
        status: 'pending',
        line_items: [
          { price_id: 'price_placeholder_main', description: 'Personalized Storybook', quantity: 1, amount: 1999 },
          ...selectedAddons.map(addon => ({
            price_id: addon.priceId,
            description: addon.name,
            quantity: 1,
            amount: addon.price
          }))
        ],
        metadata: {
          child_name: childName,
          age: String(age || ''),
          gender: gender || '',
          theme: theme,
          dedication: dedication || '',
        },
        created_at: new Date(),
      });

      return NextResponse.json({
        sessionId: `mock_${Date.now()}`,
        url: `${DOMAIN_URL}/order-confirmation?session_id=mock_${Date.now()}`,
        mockMode: true,
      });
    }

    // Build line items array
    const lineItems = [
      {
        price: process.env.STRIPE_PRICE_MAIN_STORY,
        quantity: 1,
      },
    ];

    // Add optional add-ons
    const addonMapping = {
      'extra-character': process.env.STRIPE_PRICE_ADDON_EXTRA_CHARACTER,
      'gift-wrap': process.env.STRIPE_PRICE_ADDON_GIFT_WRAP,
      'express-delivery': process.env.STRIPE_PRICE_ADDON_EXPRESS,
    };

    selectedAddons.forEach(addonId => {
      const priceId = addonMapping[addonId];
      if (priceId && !priceId.includes('placeholder')) {
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
        child_name: childName,
        age: String(age || ''),
        gender: gender || '',
        theme: theme,
        dedication: dedication || '',
        story_options: JSON.stringify({ selectedAddons }),
      },
    });

    // Create pending order in database
    const ordersCollection = await getCollection('orders');
    await ordersCollection.insertOne({
      stripe_session_id: session.id,
      customer_email: customerEmail,
      status: 'pending',
      line_items: lineItems.map(item => ({
        price_id: item.price,
        quantity: item.quantity,
      })),
      metadata: {
        child_name: childName,
        age: String(age || ''),
        gender: gender || '',
        theme: theme,
        dedication: dedication || '',
      },
      created_at: new Date(),
    });

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