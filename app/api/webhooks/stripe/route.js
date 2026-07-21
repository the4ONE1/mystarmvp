import { NextResponse } from 'next/server';
import { createOrder, updateOrder, isSupabaseConfigured } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    const stripe = getStripe();

    // Check if webhook is configured
    if (!signature || WEBHOOK_SECRET.includes('placeholder') || !stripe) {
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
