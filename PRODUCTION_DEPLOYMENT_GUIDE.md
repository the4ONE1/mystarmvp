# 🚀 Production Deployment Guide - MyStarStories.com

## Complete Guide to Deploy Mestar to MyStarStories.com with Stripe Integration

---

## 📋 Pre-Deployment Checklist

### ✅ What's Already Done
- [x] Application fully built and tested
- [x] Lovable design ported successfully
- [x] MongoDB configured and working
- [x] Environment variables properly structured
- [x] Database queries optimized
- [x] No hardcoded URLs or secrets
- [x] CORS configured
- [x] SEO optimization complete

### 🔑 What You Need to Get
1. **Stripe Account** (for payments)
2. **AWS S3 Bucket** (for photo storage)
3. **Domain DNS Access** (for MyStarStories.com)

---

## PART 1: Get Your API Keys

### 1️⃣ Stripe Setup (Required for Payments)

**A. Create Stripe Account**
1. Go to https://stripe.com/
2. Sign up for a free account
3. Complete business verification (takes 1-2 business days)

**B. Get API Keys**
1. Login to Stripe Dashboard: https://dashboard.stripe.com/
2. Click on "Developers" in the sidebar
3. Click "API keys"
4. You'll see two types of keys:
   - **Test keys** (for testing): Start with `pk_test_` and `sk_test_`
   - **Live keys** (for production): Start with `pk_live_` and `sk_live_`

**Start with TEST keys first!**

Copy these values:
```
Publishable key: pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
Secret key: sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

**C. Create a Product and Price**
1. In Stripe Dashboard → "Products" → "Add Product"
2. Product name: "Personalized Storybook"
3. Description: "Digital personalized children's storybook"
4. Price: $19.99
5. Select "One-time"
6. Click "Save product"
7. **Copy the Price ID** - It starts with `price_` (example: `price_1234567890abcdef`)

**D. Set up Webhook (for order notifications)**
1. Go to "Developers" → "Webhooks" → "Add endpoint"
2. Endpoint URL: `https://mystarstories.com/api/webhooks/stripe`
3. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Click "Add endpoint"
5. **Copy the Webhook Secret** - It starts with `whsec_`

---

### 2️⃣ AWS S3 Setup (Required for Photo Storage)

**A. Create AWS Account**
1. Go to https://aws.amazon.com/
2. Sign up for a free tier account (includes 5GB free storage)

**B. Create S3 Bucket**
1. Login to AWS Console: https://console.aws.amazon.com/s3/
2. Click "Create bucket"
3. Bucket name: `mystarstories-photos` (must be globally unique)
4. Region: `us-east-1` (or your preferred region)
5. **Block all public access** ✓ (we use presigned URLs for security)
6. Enable "Bucket Versioning" (recommended)
7. Enable "Server-side encryption" with "Amazon S3 managed keys (SSE-S3)"
8. Click "Create bucket"

**C. Create IAM User with S3 Access**
1. Go to IAM Console: https://console.aws.amazon.com/iam/
2. Click "Users" → "Add users"
3. User name: `mystarstories-app`
4. Select "Access key - Programmatic access"
5. Click "Next: Permissions"
6. Click "Attach existing policies directly"
7. Search for and select "AmazonS3FullAccess" (or create custom policy below)
8. Click "Next" through to "Create user"
9. **IMPORTANT:** Copy the credentials NOW (you can't see them again):
   ```
   Access Key ID: AKIAXXXXXXXXXXXXXXXX
   Secret Access Key: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

**D. Custom S3 Policy (More Secure - Recommended)**
Instead of full access, create a policy for just your bucket:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::mystarstories-photos",
        "arn:aws:s3:::mystarstories-photos/*"
      ]
    }
  ]
}
```

---

## PART 2: Configure Production Environment Variables

### Update `/app/.env` File

SSH into your server or access the file editor and update `/app/.env`:

```bash
# MongoDB (Already configured - don't change)
MONGO_URL=mongodb://localhost:27017
DB_NAME=mestar_storybooks

# Domain Configuration
NEXT_PUBLIC_BASE_URL=https://mystarstories.com
CORS_ORIGINS=https://mystarstories.com

# Stripe Configuration (PRODUCTION - Use Test Keys First!)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_PRICE_ID=price_YOUR_ACTUAL_PRICE_ID_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# AWS S3 Configuration (PRODUCTION)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AWS_REGION=us-east-1
S3_BUCKET_NAME=mystarstories-photos
```

**⚠️ IMPORTANT SECURITY NOTES:**
- Never commit `.env` to Git
- Keep backup of these credentials in a secure password manager
- Use test keys initially, then switch to live keys after testing

---

## PART 3: Domain Configuration

### Option A: If using Emergent Agent Hosting

1. Contact Emergent support to map `MyStarStories.com` to your app
2. Provide them:
   - Domain name: `MyStarStories.com`
   - Your app URL: `mestar-stories.preview.emergentagent.com`

They will:
- Set up SSL certificate
- Configure DNS
- Map the domain

### Option B: If Self-Hosting / Custom Server

**1. Update DNS Records**

Go to your domain registrar (GoDaddy, Namecheap, etc.) and add:

```
Type: A
Name: @
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600

Type: A  
Name: www
Value: YOUR_SERVER_IP_ADDRESS
TTL: 3600
```

**2. Set up SSL Certificate (HTTPS)**

Install Certbot for free SSL:
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d mystarstories.com -d www.mystarstories.com
```

**3. Configure Nginx**

Create `/etc/nginx/sites-available/mystarstories.com`:
```nginx
server {
    listen 80;
    server_name mystarstories.com www.mystarstories.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mystarstories.com www.mystarstories.com;

    ssl_certificate /etc/letsencrypt/live/mystarstories.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mystarstories.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/mystarstories.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## PART 4: Deploy Application

### 1. Restart Services with New Configuration

```bash
cd /app

# Restart Next.js to load new environment variables
sudo supervisorctl restart nextjs

# Check status
sudo supervisorctl status

# Verify services are running
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "services": {
    "mongodb": "connected",
    "stripe": "configured",
    "s3": "configured"
  }
}
```

### 2. Test Stripe Integration

Use Stripe test card numbers:
- **Success**: 4242 4242 4242 4242
- **Requires Auth**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

Use any:
- Future expiry date (e.g., 12/25)
- Any 3-digit CVC (e.g., 123)
- Any ZIP code (e.g., 12345)

### 3. Test Photo Upload

1. Go to https://mystarstories.com/create
2. Upload a test photo (JPEG/PNG under 5MB)
3. Check AWS S3 console to verify file appears in bucket

---

## PART 5: Switch to Production (After Testing)

### When Ready for Real Customers:

**1. Switch Stripe to Live Mode**

In Stripe Dashboard:
1. Toggle from "Test mode" to "Live mode" (top right)
2. Get your **Live API keys**:
   - Publishable: `pk_live_...`
   - Secret: `sk_live_...`
3. Copy the **same Price ID** (works in both modes)

**2. Update .env with Live Keys**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
```

**3. Restart Application**
```bash
sudo supervisorctl restart nextjs
```

**4. Test with a Small Real Payment** (You can refund it)
- Use a real card
- Complete a purchase
- Verify order appears in Stripe Dashboard
- Verify webhook fires
- Issue refund from Stripe Dashboard

---

## PART 6: Monitoring & Maintenance

### Check Application Health

```bash
# View logs
tail -f /var/log/supervisor/nextjs.out.log

# Check errors
tail -f /var/log/supervisor/nextjs.err.log

# Monitor MongoDB
mongosh
use mestar_storybooks
db.orders.find().count()  // See order count
```

### Stripe Dashboard Monitoring

https://dashboard.stripe.com/

Monitor:
- Payments (successful/failed)
- Customers
- Webhooks (check for failures)
- Disputes/chargebacks

### AWS S3 Monitoring

https://console.aws.amazon.com/s3/

Monitor:
- Storage usage
- Upload activity
- Costs (should be minimal with free tier)

---

## 🎯 Testing Checklist Before Going Public

- [ ] Domain resolves correctly (https://mystarstories.com)
- [ ] SSL certificate is valid (padlock in browser)
- [ ] Landing page loads with correct branding
- [ ] Photo upload works (check S3 bucket)
- [ ] Personalization form validates correctly
- [ ] Stripe test checkout completes successfully
- [ ] Order confirmation page displays
- [ ] Webhook fires and order saved to MongoDB
- [ ] Email confirmation sent (if configured)
- [ ] Mobile responsive (test on phone)
- [ ] Page load speed is fast (<3 seconds)
- [ ] All images load correctly
- [ ] No console errors in browser
- [ ] Health endpoint returns success

---

## 🆘 Troubleshooting Common Issues

### Issue: "Stripe checkout not working"
**Solution:**
1. Check `.env` has correct Stripe keys (no spaces, no quotes)
2. Verify NEXT_PUBLIC_BASE_URL is correct
3. Check webhook endpoint is accessible: `curl https://mystarstories.com/api/webhooks/stripe`
4. Check Stripe Dashboard for error logs

### Issue: "Photo upload fails"
**Solution:**
1. Verify AWS credentials in `.env`
2. Check S3 bucket exists and name matches
3. Verify IAM user has PutObject permission
4. Check file size <5MB and type is JPG/PNG/WEBP

### Issue: "Domain not loading"
**Solution:**
1. Check DNS propagation: https://www.whatsmydns.net/ (enter mystarstories.com)
2. Wait 24-48 hours for DNS to propagate globally
3. Clear browser cache
4. Try incognito/private browsing mode

### Issue: "SSL certificate error"
**Solution:**
```bash
sudo certbot renew --dry-run
sudo systemctl reload nginx
```

---

## 📞 Support Resources

- **Stripe Support**: https://support.stripe.com/
- **AWS Support**: https://console.aws.amazon.com/support/
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com/

---

## 🎉 Launch Checklist

Final steps before going public:

1. [ ] Switch Stripe to live mode with live keys
2. [ ] Update privacy policy with your company details
3. [ ] Set up customer support email
4. [ ] Configure email notifications (SendGrid/Mailgun)
5. [ ] Set up Google Analytics (optional)
6. [ ] Create social media accounts
7. [ ] Prepare marketing materials
8. [ ] Test complete purchase flow 3x
9. [ ] Have customer support process ready
10. [ ] Announce launch! 🚀

---

## 💡 Pro Tips

1. **Start with Test Mode**: Run in Stripe test mode for 1-2 weeks
2. **Monitor Daily**: Check Stripe dashboard daily first week
3. **Backup**: Set up automated MongoDB backups
4. **Scale**: Monitor server resources, upgrade if needed
5. **Security**: Keep dependencies updated (`yarn upgrade`)

---

**You're ready to launch MyStarStories.com!** 🌟

Questions? Issues? Check the troubleshooting section or review application logs.
