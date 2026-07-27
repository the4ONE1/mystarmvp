'use client';

import Script from 'next/script';

// Loads Google Ads (gtag) when NEXT_PUBLIC_GOOGLE_ADS_ID is set. Mirrors the
// React app's src/components/Analytics.tsx Google Ads block.
export function GoogleAdsConversion() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (!adsId || adsId === 'AW-XXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
      />
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${adsId}');
          `,
        }}
      />
    </>
  );
}

// Fires a Google Ads conversion event. No-ops if NEXT_PUBLIC_GOOGLE_ADS_ID or a
// conversion label isn't available, or gtag hasn't loaded yet. `conversionLabel`
// is the label portion of a Google Ads conversion action (everything after
// "AW-XXXXXXXXX/"); defaults to NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL.
export function trackGoogleAdsConversion(conversionLabel, opts = {}) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = conversionLabel || process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (!adsId || !label || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: `${adsId}/${label}`,
    currency: opts.currency || 'USD',
    ...(opts.value !== undefined && { value: opts.value }),
    ...(opts.transactionId && { transaction_id: opts.transactionId }),
  });
}
