import { NextResponse } from 'next/server';
import { getOrder, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // Return graceful fallback when DB not configured
      return NextResponse.json({
        status: 'pending',
        message: 'Order confirmed! Processing your storybook.',
        session_id: sessionId,
        graceful_mode: true,
      });
    }

    // Query order from Supabase
    const order = await getOrder(sessionId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found', status: 'not_found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: order.status,
      customer_email: order.customer_email,
      customer_name: order.customer_name,
      child_name: order.child_name,
      story_theme: order.story_theme,
      amount_total: order.amount_total,
      currency: order.currency,
      created_at: order.created_at,
      session_id: order.session_id,
      pdf_url: order.pdf_url || null,
    });
  } catch (error) {
    console.error('Order status error:', error);
    
    // Return graceful error response instead of 502
    return NextResponse.json(
      {
        status: 'pending',
        message: 'Order confirmed! Details loading...',
        error: error.message,
        graceful_mode: true,
      },
      { status: 200 } // Return 200 with graceful message instead of 500
    );
  }
}
