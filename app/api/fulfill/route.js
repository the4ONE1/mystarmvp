import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' });
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    
    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }
    
    const meta = session.metadata || {};
    const customerEmail = session.customer_details?.email || session.customer_email;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceKey || !meta.childName) {
      return NextResponse.json({ error: 'Missing config or metadata' }, { status: 500 });
    }
    
    // Generate story
    const storyRes = await fetch(supabaseUrl + '/functions/v1/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + serviceKey },
      body: JSON.stringify({
        childName: meta.childName, childAge: meta.childAge, childGender: meta.childGender || 'neutral',
        theme: meta.theme, strength: meta.strength,
        hasSupportingCharacter: meta.hasSupportingCharacter === 'true',
        supportingCharacterName: meta.supportingCharacterName, selectedAddons: {}
      })
    });
    
    if (!storyRes.ok) {
      const err = await storyRes.text();
      console.error('generate-story failed:', err);
      return NextResponse.json({ error: 'Story generation failed', details: err }, { status: 500 });
    }
    
    const story = await storyRes.json();
    console.log('Story generated:', story.title);
    
    // Kick off PDF creation and email (non-blocking)
    fetch(supabaseUrl + '/functions/v1/create-storybook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + serviceKey },
      body: JSON.stringify({
        orderId: sessionId, title: story.title, story: story.story,
        coloringPrompts: story.coloringPrompts, bonusColoringPrompts: [],
        illustrationPrompts: story.illustrationPrompts, selectedAddons: story.addons,
        customerEmail, childName: meta.childName, childAge: meta.childAge,
        theme: meta.theme, strength: meta.strength
      })
    }).then(r => r.json()).then(r => console.log('create-storybook:', r.success ? 'OK' : r.error)).catch(e => console.error('create-storybook error:', e));
    
    return NextResponse.json({ success: true, title: story.title, customerEmail });
  } catch (e) {
    console.error('fulfill error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
