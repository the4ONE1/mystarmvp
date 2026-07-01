import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

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

    // Look up order in database
    const ordersCollection = await getCollection('orders');
    const order = await ordersCollection.findOne({ stripe_session_id: sessionId });

    if (!order) {
      // Check if it's a mock session
      if (sessionId.startsWith('mock_')) {
        // Auto-complete mock orders after 2 seconds
        return NextResponse.json({
          status: 'paid',
          mockMode: true,
          order: {
            customer_email: 'test@example.com',
            metadata: {
              child_name: 'Test Child',
              theme: 'Space Adventure',
            },
            created_at: new Date().toISOString(),
            paid_at: new Date().toISOString(),
          },
        });
      }

      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Return order status
    return NextResponse.json({
      status: order.status,
      order: {
        id: order._id,
        customer_email: order.customer_email,
        metadata: order.metadata,
        line_items: order.line_items,
        created_at: order.created_at,
        paid_at: order.paid_at || null,
        amount_total: order.amount_total || null,
      },
    });
  } catch (error) {
    console.error('Order status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order status', details: error.message },
      { status: 500 }
    );
  }
}