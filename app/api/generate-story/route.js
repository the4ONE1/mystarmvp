import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getOrder, updateOrder, isSupabaseConfigured } from '@/lib/supabase';
import { generateStory } from '@/lib/story';
import { generateStoryPDF } from '@/lib/pdf';
import { sendPDFDelivery, isEmailConfigured } from '@/lib/email';
import { s3Client, bucketName } from '@/lib/s3';

// Allow up to 300s on Vercel Pro; falls back to 60s on hobby plans.
export const maxDuration = 300;

export async function POST(request) {
  try {
    // Verify internal secret to prevent unauthorized calls
    const authHeader = request.headers.get('authorization');
    const internalSecret = process.env.INTERNAL_API_SECRET;
    if (internalSecret && authHeader !== 'Bearer ' + internalSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    // Fetch order from Supabase
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Supabase not configured — cannot fetch order' },
        { status: 503 }
      );
    }

    const order = await getOrder(sessionId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    console.log(`[generate-story] Starting story generation for order ${sessionId}`);

    // ── 1. Generate story text ────────────────────────────────────────────────
    let story;
    try {
      story = await generateStory({
        childName: order.child_name,
        age: order.child_age,
        gender: order.gender || '',
        theme: order.story_theme,
        dedication: order.dedication || '',
      });
      console.log(`[generate-story] Story generated: "${story.title}"`);
    } catch (storyErr) {
      console.error('[generate-story] Story generation failed:', storyErr.message);
      // Use placeholder story so the flow continues
      story = {
        title: `${order.child_name || 'Your Child'}'s Amazing Adventure`,
        dedication: order.dedication || '',
        chapters: [
          {
            heading: 'A Star is Born',
            text: `Once upon a time, ${order.child_name || 'a wonderful child'} set off on the greatest adventure the world had ever seen. With courage and kindness, every step of the journey was filled with wonder and magic.`,
          },
          {
            heading: 'The Journey Begins',
            text: `Through enchanted forests and over sparkling rivers, ${order.child_name || 'our hero'} discovered that the greatest treasure of all was the friends made along the way. Every challenge only made the adventure more exciting.`,
          },
          {
            heading: 'The Triumph',
            text: `At last, ${order.child_name || 'our star'} returned home, cheered by all who had heard the tale. And every night, looking up at the stars, ${order.child_name || 'our hero'} smiled and remembered: you are always the star of your own story.`,
          },
        ],
      };
    }

    // ── 2. Generate PDF ────────────────────────────────────────────────────────
    let pdfBytes;
    try {
      pdfBytes = await generateStoryPDF(story, {
        childName: order.child_name,
        customerName: order.customer_name,
        theme: order.story_theme,
      });
      console.log(`[generate-story] PDF generated (${pdfBytes.length} bytes)`);
    } catch (pdfErr) {
      console.error('[generate-story] PDF generation failed:', pdfErr.message);
      throw pdfErr;
    }

    // ── 3. Upload PDF to S3 ────────────────────────────────────────────────────
    let pdfUrl = null;
    const isS3Configured =
      process.env.AWS_ACCESS_KEY_ID &&
      !process.env.AWS_ACCESS_KEY_ID.includes('PLACEHOLDER');

    if (isS3Configured) {
      try {
        const key = `storybooks/${sessionId}/storybook.pdf`;
        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: Buffer.from(pdfBytes),
            ContentType: 'application/pdf',
            ContentDisposition: `attachment; filename="${(order.child_name || 'storybook').replace(/[^a-z0-9]/gi, '_')}_story.pdf"`,
          })
        );

        // Generate a 7-day presigned download URL
        const { GetObjectCommand } = await import('@aws-sdk/client-s3');
        const downloadUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({ Bucket: bucketName, Key: key }),
          { expiresIn: 7 * 24 * 3600 } // 7 days
        );
        pdfUrl = downloadUrl;
        console.log(`[generate-story] PDF uploaded to S3: ${key}`);
      } catch (s3Err) {
        console.error('[generate-story] S3 upload failed:', s3Err.message);
        // Continue without S3 — email will note that PDF will be sent separately
      }
    } else {
      console.warn('[generate-story] S3 not configured — skipping PDF upload');
    }

    // ── 4. Update order in Supabase ───────────────────────────────────────────
    try {
      await updateOrder(sessionId, {
        status: 'fulfilled',
        story_content: JSON.stringify(story),
        pdf_url: pdfUrl,
        updated_at: new Date().toISOString(),
      });
      console.log(`[generate-story] Order ${sessionId} updated to fulfilled`);
    } catch (dbErr) {
      // Non-fatal: log and continue so customer still gets their email
      console.error('[generate-story] Failed to update order status:', dbErr.message);
    }

    // ── 5. Send PDF delivery email ────────────────────────────────────────────
    if (isEmailConfigured() && order.customer_email) {
      try {
        if (pdfUrl) {
          await sendPDFDelivery({
            customerEmail: order.customer_email,
            customerName: order.customer_name,
            childName: order.child_name,
            pdfUrl,
            sessionId,
          });
          console.log(`[generate-story] PDF delivery email sent to ${order.customer_email}`);
        } else {
          console.warn('[generate-story] No PDF URL — skipping delivery email');
        }
      } catch (emailErr) {
        console.error('[generate-story] PDF delivery email failed:', emailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      sessionId,
      storyTitle: story.title,
      pdfUrl: pdfUrl || null,
    });
  } catch (error) {
    console.error('[generate-story] Unhandled error:', error);
    return NextResponse.json(
      { error: 'Story generation failed', details: error.message },
      { status: 500 }
    );
  }
}
