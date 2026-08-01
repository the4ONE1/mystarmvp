// Email delivery via Resend API (https://resend.com)
// Required env: RESEND_API_KEY
// Optional env: RESEND_FROM_EMAIL (defaults to noreply@mystarstories.app)

const RESEND_API_URL = 'https://api.resend.com/emails';
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'MyStar Stories <noreply@mystarstories.app>';

export function isEmailConfigured() {
  return !!process.env.RESEND_API_KEY;
}

async function sendEmail({ to, subject, html }) {
  if (!isEmailConfigured()) {
    console.warn('RESEND_API_KEY not set — skipping email send');
    return { skipped: true };
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error (${response.status}): ${error}`);
  }

  return response.json();
}

/**
 * Send an order confirmation email immediately after payment.
 */
export async function sendOrderConfirmation({
  customerEmail,
  customerName,
  childName,
  theme,
  sessionId,
  amountTotal,
}) {
  const displayName = customerName || customerEmail;
  const themeLabel = (theme || '').replace(/-/g, ' ');
  const amountDisplay = amountTotal ? `$${(amountTotal / 100).toFixed(2)}` : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; background: #fafafa; color: #222; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #c9973a 0%, #e8b96a 100%); padding: 40px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; }
    .header p { color: rgba(255,255,255,.85); margin: 8px 0 0; font-size: 16px; }
    .body { padding: 32px; }
    .detail-box { background: #f9f5ee; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
    .detail-row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 15px; }
    .label { color: #666; }
    .value { font-weight: 600; }
    .steps { margin: 24px 0; }
    .step { display: flex; gap: 16px; margin: 12px 0; font-size: 15px; }
    .step-num { background: #c9973a; color: #fff; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
    .footer { background: #f2f2f2; padding: 20px 32px; text-align: center; font-size: 13px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⭐ Order Confirmed!</h1>
      <p>Your personalized storybook is on its way</p>
    </div>
    <div class="body">
      <p>Hi ${displayName},</p>
      <p>Thank you for your purchase! We've received your order and are now crafting a one-of-a-kind story featuring <strong>${childName || 'your child'}</strong>.</p>

      <div class="detail-box">
        <div class="detail-row"><span class="label">Order ID</span><span class="value" style="font-size:12px;font-family:monospace">${sessionId || ''}</span></div>
        ${childName ? `<div class="detail-row"><span class="label">Child's Name</span><span class="value">${childName}</span></div>` : ''}
        ${themeLabel ? `<div class="detail-row"><span class="label">Story Theme</span><span class="value" style="text-transform:capitalize">${themeLabel}</span></div>` : ''}
        ${amountDisplay ? `<div class="detail-row"><span class="label">Amount Paid</span><span class="value">${amountDisplay}</span></div>` : ''}
      </div>

      <div class="steps">
        <p><strong>What happens next:</strong></p>
        <div class="step"><div class="step-num">1</div><div>Your personalized story is being generated — this usually takes a few minutes.</div></div>
        <div class="step"><div class="step-num">2</div><div>We'll create a beautiful PDF storybook featuring ${childName || 'your child'}.</div></div>
        <div class="step"><div class="step-num">3</div><div>You'll receive a second email with a download link for your storybook PDF.</div></div>
      </div>

      <p>Questions? Reply to this email or contact us at <a href="mailto:support@mystarstories.app">support@mystarstories.app</a>.</p>
    </div>
    <div class="footer">
      © MyStar Stories · <a href="https://mystarstories.app">mystarstories.app</a>
    </div>
  </div>
</body>
</html>`;

  return sendEmail({
    to: customerEmail,
    subject: '⭐ Your MyStar Story Order is Confirmed!',
    html,
  });
}

/**
 * Send the PDF delivery email with a download link.
 */
export async function sendPDFDelivery({
  customerEmail,
  customerName,
  childName,
  pdfUrl,
  sessionId,
}) {
  const displayName = customerName || customerEmail;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; background: #fafafa; color: #222; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #c9973a 0%, #e8b96a 100%); padding: 40px 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; }
    .header p { color: rgba(255,255,255,.85); margin: 8px 0 0; font-size: 16px; }
    .body { padding: 32px; }
    .download-btn { display: block; text-align: center; background: #c9973a; color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 18px; font-weight: 700; margin: 32px auto; width: fit-content; }
    .footer { background: #f2f2f2; padding: 20px 32px; text-align: center; font-size: 13px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📖 Your Storybook is Ready!</h1>
      <p>Download ${childName ? `${childName}'s` : 'your'} personalized story</p>
    </div>
    <div class="body">
      <p>Hi ${displayName},</p>
      <p>Great news! The personalized storybook for <strong>${childName || 'your child'}</strong> is ready to download.</p>

      <a class="download-btn" href="${pdfUrl}">📥 Download Your Storybook PDF</a>

      <p style="font-size:13px;color:#888;text-align:center">The download link is valid for 7 days.<br>Order reference: <code>${sessionId || ''}</code></p>

      <p>We hope ${childName || 'your child'} loves the story! If you have any questions, contact us at <a href="mailto:support@mystarstories.app">support@mystarstories.app</a>.</p>
    </div>
    <div class="footer">
      © MyStar Stories · <a href="https://mystarstories.app">mystarstories.app</a>
    </div>
  </div>
</body>
</html>`;

  return sendEmail({
    to: customerEmail,
    subject: `📖 ${childName ? `${childName}'s` : 'Your'} Personalized Storybook is Ready!`,
    html,
  });
}
