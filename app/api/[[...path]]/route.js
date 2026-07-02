import { NextResponse } from 'next/server';
import { stripe, STRIPE_PRICE_ID } from '@/lib/stripe';
import { s3Client, bucketName, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const DOMAIN_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Helper function to handle CORS
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

// POST handler for various endpoints
export async function POST(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Create Checkout Session
    if (pathname.includes('/api/create-checkout-session')) {
      const body = await request.json();
      const { childName, age, gender, theme, dedication } = body;

      try {
        // Check if Stripe is configured
        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
          return NextResponse.json(
            {
              error: 'Stripe not configured',
              message: 'Please add your Stripe API keys to the .env file to enable checkout',
              mockSuccess: true,
              url: `${DOMAIN_URL}/checkout/success`,
            },
            { status: 200, headers: corsHeaders() }
          );
        }

        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: [
            {
              price: STRIPE_PRICE_ID,
              quantity: 1,
            },
          ],
          success_url: `${DOMAIN_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${DOMAIN_URL}/checkout/cancel`,
          metadata: {
            childName: childName || '',
            age: String(age || ''),
            gender: gender || '',
            theme: theme || '',
            dedication: dedication || '',
          },
        });

        return NextResponse.json(
          { sessionId: session.id, url: session.url },
          { headers: corsHeaders() }
        );
      } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json(
          {
            error: 'Checkout session creation failed',
            details: error.message,
            mockSuccess: true,
            url: `${DOMAIN_URL}/checkout/success`,
          },
          { status: 200, headers: corsHeaders() }
        );
      }
    }

    // Generate Presigned URL for S3 Upload
    if (pathname.includes('/api/upload/presign')) {
      const body = await request.json();
      const { childId, storybookId, filename, mimeType, sizeBytes } = body;

      // Validation
      if (!childId || !storybookId || !filename || !mimeType || !sizeBytes) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400, headers: corsHeaders() }
        );
      }

      if (!ALLOWED_FILE_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only JPEG, PNG, and WEBP are allowed.' },
          { status: 400, headers: corsHeaders() }
        );
      }

      if (sizeBytes > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'File size exceeds 5MB limit' },
          { status: 400, headers: corsHeaders() }
        );
      }

      // Check if AWS is configured
      if (!process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID.includes('PLACEHOLDER')) {
        return NextResponse.json(
          {
            error: 'S3 not configured',
            message: 'Please add your AWS S3 credentials to the .env file to enable photo uploads',
            mockUploadUrl: `${DOMAIN_URL}/api/upload/mock`,
            objectKey: `children/${childId}/storybooks/${storybookId}/${Date.now()}_${filename}`,
          },
          { status: 200, headers: corsHeaders() }
        );
      }

      try {
        const extension = filename.split('.').pop();
        const uniqueId = crypto.randomUUID();
        const objectKey = `children/${childId}/storybooks/${storybookId}/${uniqueId}.${extension}`;

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
          ContentType: mimeType,
        });

        const expiresInSeconds = 180; // 3 minutes
        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });

        return NextResponse.json(
          {
            uploadUrl,
            objectKey,
            expiresIn: expiresInSeconds,
          },
          { headers: corsHeaders() }
        );
      } catch (error) {
        console.error('S3 presigned URL error:', error);
        return NextResponse.json(
          { error: 'Failed to generate upload URL', details: error.message },
          { status: 500, headers: corsHeaders() }
        );
      }
    }

    // Confirm Photo Upload
    if (pathname.includes('/api/upload/confirm')) {
      const body = await request.json();
      const { childId, storybookId, objectKey, mimeType, sizeBytes, uploadedBy } = body;

      if (!childId || !storybookId || !objectKey || !mimeType || !sizeBytes) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400, headers: corsHeaders() }
        );
      }

      // Photo metadata storage has been moved to Supabase
      // Return success for now
      const photoUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
      
      return NextResponse.json(
        {
          success: true,
          photoUrl,
          message: 'Photo uploaded successfully',
        },
        { headers: corsHeaders() }
      );
    }

    // Create Order endpoint is now handled by /api/create-checkout-session
    if (pathname.includes('/api/orders')) {
      return NextResponse.json(
        { error: 'This endpoint has been deprecated. Use /api/create-checkout-session instead.' },
        { status: 410, headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// GET handler
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Health check
    if (pathname.includes('/api/health')) {
      return NextResponse.json(
        {
          status: 'ok',
          timestamp: new Date().toISOString(),
          services: {
            supabase: process.env.SUPABASE_URL ? 'configured' : 'not configured',
            stripe: process.env.STRIPE_SECRET_KEY?.includes('placeholder') ? 'not configured' : 'configured',
            s3: process.env.AWS_ACCESS_KEY_ID?.includes('PLACEHOLDER') ? 'not configured' : 'configured',
          },
        },
        { headers: corsHeaders() }
      );
    }

    // Get photos for a storybook
    if (pathname.includes('/api/photos')) {
      // Photo storage has been moved to Supabase
      return NextResponse.json(
        { photos: [], message: 'Photo API has been migrated to Supabase' },
        { headers: corsHeaders() }
      );
    }

    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}
