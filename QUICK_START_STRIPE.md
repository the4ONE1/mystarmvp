# ⚡ Quick Start: Get Your Stripe Keys in 10 Minutes

## Your MyStarStories.com deployment is ready! Just need API keys.

---

## 🎯 Step 1: Get Stripe Test Keys (5 minutes)

### A. Create Account
1. Go to: **https://stripe.com**
2. Click "Start now" → Sign up
3. Enter:
   - Email
   - Full name
   - Password
4. Click "Create account"

### B. Skip Onboarding
- Click "Skip for now" or "I'll do this later"
- You can complete business details later

### C. Get Your API Keys
1. You'll land on the Dashboard
2. Click **"Developers"** in left sidebar
3. Click **"API keys"**
4. Make sure you're in **"Test mode"** (toggle in top right)
5. You'll see two keys:

```
Publishable key: pk_test_51XXXXXXXXXXXXX
Secret key: sk_test_XXXXXXXXXXXXXXX (click "Reveal test key")
```

**Copy both keys!**

---

## 🎯 Step 2: Create Product (3 minutes)

1. In Stripe Dashboard, click **"Products"** in left sidebar
2. Click **"Add product"**
3. Fill in:
   - **Name**: Personalized Storybook
   - **Description**: Digital personalized children's storybook PDF
4. Under "Pricing":
   - **Price**: 29.99
   - **Currency**: USD
   - **Billing**: One time
5. Click **"Save product"**

6. **Copy the Price ID**
   - You'll see it in the product page
   - Format: `price_1XXXXXXXXXXXXXXXXXX`

---

## 🎯 Step 3: Update Your Environment Variables (2 minutes)

Edit `/app/.env` file and replace the placeholder values:

```bash
# Replace these three lines:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_FROM_STEP_1B
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_FROM_STEP_1B
STRIPE_PRICE_ID=price_YOUR_ID_FROM_STEP_2
```

---

## 🎯 Step 4: Restart Application (30 seconds)

Run this command:
```bash
cd /app && sudo supervisorctl restart nextjs
```

---

## 🎯 Step 5: Test It! (3 minutes)

1. Go to: **https://mystarstories.com** (or your preview URL)
2. Click "Create Story"
3. Fill in the form
4. Click "Continue to Checkout"
5. Use Stripe test card:
   - **Card number**: 4242 4242 4242 4242
   - **Expiry**: 12/28 (any future date)
   - **CVC**: 123 (any 3 digits)
   - **ZIP**: 12345 (any ZIP)
6. Click "Complete Order"
7. You should see "Order Confirmed!" page ✅

---

## 🎯 Verify in Stripe Dashboard

1. Go back to Stripe Dashboard
2. Click "Payments" in sidebar
3. You should see your test payment! 💰

---

## ✅ You're Live in Test Mode!

Your app is now fully functional with Stripe integration!

### What You Can Do Now:
- ✅ Test the complete purchase flow
- ✅ Share with friends/family for feedback
- ✅ Process unlimited test payments
- ✅ Refine your product offering

### When Ready for Real Customers:

Follow **PRODUCTION_DEPLOYMENT_GUIDE.md** to:
1. Get AWS S3 credentials (for photo uploads)
2. Switch to Stripe Live mode
3. Configure your custom domain
4. Launch publicly! 🚀

---

## 🆘 Need Help?

**Stripe test cards not working?**
- Make sure you're in "Test mode" (toggle in Stripe Dashboard)
- Try a different test card: 4000056655665556 (Visa Debit)

**App not loading?**
- Check if services are running: `sudo supervisorctl status`
- View logs: `tail -f /var/log/supervisor/nextjs.out.log`

**Stripe keys not working?**
- Make sure there are no spaces before/after the keys in `.env`
- Keys should NOT be in quotes
- Restart app after changing `.env`: `sudo supervisorctl restart nextjs`

---

## 🎉 Congratulations!

You now have a fully functional personalized storybook platform with payment processing!

**Next steps:**
1. Set up AWS S3 for photo uploads (see PRODUCTION_DEPLOYMENT_GUIDE.md)
2. Test thoroughly in test mode
3. Switch to live mode when ready
4. Launch MyStarStories.com to the world! 🌟
