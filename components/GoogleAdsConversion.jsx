'use client';

import Script from 'next/script';

// Loads the Google Ads gtag.js tag so conversion events can fire. Set
// NEXT_PUBLIC_GOOGLE_ADS_ID to the "AW-XXXXXXXXX" ID from Google Ads
// (Tools & Settings > Conversions > your conversion action > Tag setup).
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

// Fires a Google Ads purchase conversion. Needs NEXT_PUBLIC_GOOGLE_ADS_ID
// (for the tag above to have loaded) and NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
// (the part after the "/" in the conversion action's "AW-XXXXXXXXX/AbC-D_efG" ID).
export function trackGoogleAdsConversion({ value, currency = 'USD', transactionId } = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (!adsId || adsId === 'AW-XXXXXXXXX' || !label) return;

  window.gtag('event', 'conversion', {
    send_to: `${adsId}/${label}`,
    value,
    currency,
    transaction_id: transactionId,
  });
}
