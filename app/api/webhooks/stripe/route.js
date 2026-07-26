import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder, updateOrder, isSupabaseConfigured } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    // Check if webhook is configured
    if (!signature || WEBHOOK_SECRET.includes('placeholder')) {
      console.log('Webhook: No signature or placeholder secret, skipping verification');
      return NextResponse.json({ received: true, mock: true });
    }

    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      console.log('Checkout session completed:', session.id);

      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, skipping database update');
        return NextResponse.json({ received: true, graceful_mode: true });
      }

      try {
        // Extract line items from session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        // Prepare order data for Supabase
        const orderData = {
          session_id: session.id,
          customer_email: session.customer_email || session.customer_details?.email || '',
          customer_name: session.metadata?.customer_name || '',
          items: lineItems.data.map(item => ({
            description: item.description,
            quantity: item.quantity,
            amount: item.amount_total,
          })),
          amount_total: session.amount_total,
          currency: session.currency,
          status: 'paid',
          child_name: session.metadata?.child_name || '',
          child_age: session.metadata?.age || '',
          story_theme: session.metadata?.theme || '',
          photo_urls: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Try to update existing order, if not found create new
        try {
          await updateOrder(session.id, {
            ...orderData,
            updated_at: new Date().toISOString(),
          });
          console.log('Order updated:', session.id);
        } catch (updateError) {
          // If order doesn't exist, create it
          if (updateError.message.includes('not found') || updateError.code === 'PGRST116') {
            await createOrder(orderData);
            console.log('Order created:', session.id);
          } else {
            throw updateError;
          }
        }

        console.log('Order fulfillment completed for session:', session.id);
          // Trigger story generation via Supabase edge functions
          try {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
            const meta = session.metadata || {};
            if (supabaseUrl && serviceKey && meta.childName) {
              // Generate story
              const storyRes = await fetch(supabaseUrl + '/functions/v1/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + serviceKey },
                body: JSON.stringify({
                  childName: meta.childName, childAge: meta.childAge, childGender: meta.childGender || 'neutral',
                  theme: meta.theme, strength: meta.strength, hasSupportingCharacter: meta.hasSupportingCharacter === 'true',
                  supportingCharacterName: meta.supportingCharacterName, selectedAddons: {}
                })
              });
              if (storyRes.ok) {
                const story = await storyRes.json();
                // Create storybook PDF and send email
                fetch(supabaseUrl + '/functions/v1/create-storybook', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + serviceKey },
                  body: JSON.stringify({
                    orderId: session.id, title: story.title, story: story.story,
                    coloringPrompts: story.coloringPrompts, bonusColoringPrompts: [],
                    illustrationPrompts: story.illustrationPrompts, selectedAddons: story.addons,
                    customerEmail: session.customer_details?.email || session.customer_email,
                    childName: meta.childName, childAge: meta.childAge, theme: meta.theme, strength: meta.strength
                  })
                }).catch(e => console.error('create-storybook error:', e));
              }
            }
          } catch (genErr) {
            console.error('Story generation trigger failed:', genErr);
          }

      } catch (dbError) {
        console.error('Database error during order fulfillment:', dbError);
        // Return success to Stripe even if DB fails (to prevent webhook retries)
        return NextResponse.json({ 
          received: true, 
          warning: 'Order received but database update failed',
          error: dbError.message 
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}
