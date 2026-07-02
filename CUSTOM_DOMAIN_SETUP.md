# Custom Domain Configuration - mystarstories.app

## Domain: mystarstories.app

### Configuration Status: ✅ COMPLETE

**Application Configuration:**
- ✅ NEXT_PUBLIC_BASE_URL set to https://mystarstories.app
- ✅ Environment variables updated (.env and .env.production)
- ✅ Middleware configured for www redirect
- ✅ CORS settings updated
- ✅ Server restarted with new domain

---

## DNS Configuration Required

To point mystarstories.app to your Emergent deployment, configure these DNS records in your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare):

### Required DNS Records:

**For Emergent Deployments:**

1. **A Record (Root Domain)**
   ```
   Type: A
   Name: @ (or leave blank for root)
   Value: [Emergent provides this IP]
   TTL: 300 (or Auto)
   ```

2. **A Record (www subdomain)**
   ```
   Type: A
   Name: www
   Value: [Same Emergent IP as above]
   TTL: 300
   ```

**OR use CNAME (if Emergent provides a hostname):**

```
Type: CNAME
Name: @
Value: [hostname].emergentagent.com
TTL: 300
```

```
Type: CNAME
Name: www
Value: [hostname].emergentagent.com
TTL: 300
```

---

## SSL Certificate

**Status:** SSL certificate will be automatically provisioned by Emergent once DNS is configured.

**Verification:**
- After DNS propagation (5-30 minutes), visit https://mystarstories.app
- You should see a valid SSL certificate
- The site will be accessible over HTTPS

---

## Application URLs

**After DNS setup, these URLs will work:**

- https://mystarstories.app (main site)
- https://www.mystarstories.app (redirects to non-www)
- https://mystarstories.app/create
- https://mystarstories.app/checkout
- https://mystarstories.app/privacy
- https://mystarstories.app/terms
- https://mystarstories.app/refund-policy
- https://mystarstories.app/about
- https://mystarstories.app/contact
- https://mystarstories.app/faq

**API Endpoints:**
- https://mystarstories.app/api/create-checkout-session
- https://mystarstories.app/api/webhooks/stripe
- https://mystarstories.app/api/order-status
- https://mystarstories.app/api/upload/presign

---

## Stripe Webhook Configuration

**After domain is live, update Stripe webhook endpoint:**

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://mystarstories.app/api/webhooks/stripe`
4. Events to send: `checkout.session.completed`
5. Copy webhook signing secret
6. Update environment variable: `STRIPE_WEBHOOK_SECRET=whsec_...`
7. Restart server

---

## Environment Variable Summary

```bash
# Domain Configuration
NEXT_PUBLIC_BASE_URL=https://mystarstories.app

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
STRIPE_WEBHOOK_SECRET=whsec_... (set after webhook created)
STRIPE_PRICE_MAIN_STORY=price_1ToVKtFABTce6JHk4WECX6JK
STRIPE_PRICE_AUDIOBOOK=price_1ToarQFABTce6JHknM5PrJ4c
STRIPE_PRICE_COLORING_BOOK=price_1ToarUFABTce6JHk4gzcClnG
STRIPE_PRICE_ADDITIONAL_CHARACTER=price_1ToarfFABTce6JHk6JWz2bdq

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIAVJXQYNG37MRHTR47
AWS_SECRET_ACCESS_KEY=[configured]
AWS_REGION=us-east-1
AWS_S3_BUCKET=msspb-59dydkaoi46jnjp5cr11s9pzygexguse2a-s3alias

# Supabase Configuration
SUPABASE_URL=https://ktkebsvoqbxsirgluxeo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[configured]
SUPABASE_ANON_KEY=[configured]
```

---

## Verification Steps

After DNS propagation:

1. **Test Domain Resolution:**
   ```bash
   nslookup mystarstories.app
   # Should return the Emergent IP
   ```

2. **Test SSL Certificate:**
   ```bash
   curl -I https://mystarstories.app
   # Should return 200 OK with SSL
   ```

3. **Test Application:**
   - Visit https://mystarstories.app
   - Should load homepage
   - Check all navigation links work
   - Test checkout flow

4. **Test Webhook:**
   - Complete a test checkout
   - Check Stripe Dashboard for webhook events
   - Verify order appears in Supabase

---

## Troubleshooting

**Domain not resolving:**
- Check DNS propagation: https://dnschecker.org
- Wait 5-30 minutes after DNS changes
- Verify DNS records are correct

**SSL certificate error:**
- Contact Emergent support to provision SSL
- May take up to 1 hour after DNS propagation

**www redirect not working:**
- Application middleware handles www → non-www redirect
- Ensure both @ and www DNS records are configured

---

## Current Status

✅ Application configured for mystarstories.app
✅ Environment variables updated
✅ Server restarted
✅ Middleware ready for www redirect
✅ CORS configured
⚠️ DNS records need to be configured (manual step)
⚠️ SSL certificate will auto-provision after DNS

**Next Action:** Configure DNS records in your domain registrar pointing to Emergent's provided IP address or hostname.
