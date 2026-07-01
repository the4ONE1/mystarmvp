# 📊 Tracking & Analytics Setup Guide

## Overview

Your MyStarStories.shop site is now equipped with professional tracking infrastructure for:
- ✅ **Meta Pixel** (Facebook Ads tracking)
- ✅ **Google Analytics** (GA4)
- ✅ **Google Tag Manager** (GTM)

All tracking scripts use environment variables and gracefully degrade if IDs are not provided.

---

## 🔧 How It Works

The tracking components check for environment variables:
- If the ID is present → Script loads and tracking is active
- If the ID is missing or placeholder → Script doesn't load (no errors)

This means your site works perfectly NOW and will automatically activate tracking when you add the IDs later.

---

## 📋 Step 1: Get Your Tracking IDs

### Meta Pixel (Facebook)

1. Go to: https://business.facebook.com/events_manager
2. Click "Add Events" → "From a New Website"
3. Name your pixel: "MyStarStories"
4. Copy your **Pixel ID** (looks like: `123456789012345`)

### Google Analytics 4

1. Go to: https://analytics.google.com/
2. Create account/property for "MyStarStories"
3. Get your **Measurement ID** (looks like: `G-XXXXXXXXXX`)

### Google Tag Manager (Optional but Recommended)

1. Go to: https://tagmanager.google.com/
2. Create account for "MyStarStories"
3. Get your **Container ID** (looks like: `GTM-XXXXXXX`)

---

## 📝 Step 2: Add IDs to Environment Variables

Edit `/app/.env` or `/app/.env.production`:

```bash
# Tracking & Analytics
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Then restart the app:**
```bash
cd /app
sudo supervisorctl restart nextjs
```

---

## 🎯 What Gets Tracked

### Automatic Tracking (Page Views)
- ✅ Every page load
- ✅ All navigation events
- ✅ User sessions

### Custom Events Ready (Just Add IDs)
- **Meta Pixel Events:**
  - PageView
  - ViewContent
  - AddToCart (when checkout starts)
  - InitiateCheckout
  - Purchase (when order completes)

- **Google Analytics Events:**
  - page_view
  - button_click
  - form_submit
  - checkout_started
  - purchase

---

## 📍 Google Search Console Setup

1. Go to: https://search.google.com/search-console
2. Add property: `https://mystarstories.shop`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://mystarstories.shop/sitemap.xml`

---

## ✅ Current Status

- [x] **Tracking infrastructure installed**
- [x] **Graceful degradation working**
- [x] **Site loads without errors**
- [ ] **Add Meta Pixel ID** (when ready)
- [ ] **Add Google Analytics ID** (when ready)
- [ ] **Add GTM ID** (optional)
- [ ] **Verify in Search Console**

---

## 🧪 How to Verify Tracking Works

### After Adding IDs:

**1. Meta Pixel:**
- Install "Meta Pixel Helper" Chrome extension
- Visit your site
- Extension icon shows green checkmark

**2. Google Analytics:**
- Go to GA4 Real-time report
- Visit your site
- See yourself in real-time visitors

**3. Google Tag Manager:**
- Use GTM Preview mode
- See tags firing

---

## 🎨 Data-Tracking Attributes

Key conversion points have tracking attributes:
```html
data-track-event="checkout-submit"
data-track-value="19.99"
```

These help you track:
- Button clicks
- Form submissions
- Conversions
- Revenue

---

## 📊 Recommended Events to Track

### Priority 1 (Revenue):
1. **InitiateCheckout** - User starts checkout
2. **Purchase** - Order completed
3. **AddToCart** - Story customization saved

### Priority 2 (Engagement):
4. **ViewContent** - View story themes
5. **Lead** - Email signup
6. **Search** - FAQ searches

### Priority 3 (Funnel):
7. Page views per session
8. Time on site
9. Bounce rate
10. Exit pages

---

## 🚀 Quick Start After Adding IDs

```bash
# 1. Add your tracking IDs to .env
nano /app/.env

# 2. Add these lines:
NEXT_PUBLIC_META_PIXEL_ID=YOUR_ACTUAL_PIXEL_ID
NEXT_PUBLIC_GA_ID=YOUR_ACTUAL_GA_ID

# 3. Save and restart
sudo supervisorctl restart nextjs

# 4. Test
# Visit your site and check browser console (F12)
# Should see: "Meta Pixel: Loaded" and "GA: Loaded"
```

---

## 🔍 Troubleshooting

### "Meta Pixel not firing"
- Check ID in .env is correct
- Verify no ad blockers
- Check browser console for errors
- Use Meta Pixel Helper extension

### "Google Analytics not working"
- Verify GA4 property (not Universal Analytics)
- Check measurement ID format: G-XXXXXXXXXX
- Wait 24-48 hours for data processing
- Check Real-time reports

### "No data in reports"
- Ensure IDs are NEXT_PUBLIC_ prefixed
- Restart app after adding IDs
- Clear browser cache
- Try incognito mode

---

## 📞 Support

**Meta Pixel Help:**
https://www.facebook.com/business/help/952192354843755

**Google Analytics Help:**
https://support.google.com/analytics/

**Google Search Console:**
https://support.google.com/webmasters/

---

## 🎉 You're All Set!

Your site is tracking-ready! Just add your IDs when you're ready to start collecting data.

**Benefits of tracking:**
- 📈 Understand user behavior
- 💰 Optimize conversion rates
- 🎯 Target ads effectively
- 📊 Make data-driven decisions
- 🔄 Retarget visitors

---

**Last Updated**: July 1, 2025
**Status**: Tracking infrastructure deployed and ready
