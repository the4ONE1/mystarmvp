# 🌐 Domain Configuration Guide for MyStarStories.app

## Complete DNS Setup Instructions for Porkbun

---

## 📋 Overview

This guide will help you configure:
- **Primary Domain**: mystarstories.app
- **WWW Redirect**: www.mystarstories.app → mystarstories.app (301)
- SSL certificates (automatically configured via Cloudflare)
- DNS configuration through Porkbun

---

## STEP 1: Configure DNS Records in Porkbun

### Login to Porkbun

1. Go to: https://porkbun.com/
2. Login to your account
3. Navigate to: **Domain Management**
4. Find: **mystarstories.app**
5. Click: **DNS Records**

---

## STEP 2: Add DNS Records

### Required DNS Records (Cloudflare IPs)

Add these **3 records** exactly as shown:

```
Record 1:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     @ (or leave blank for root)
Answer:   104.18.10.243
TTL:      600
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Record 2:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     @ (or leave blank for root)
Answer:   104.18.11.243
TTL:      600
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Record 3:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     CNAME
Host:     www
Answer:   mystarstories.app
TTL:      600
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Visual Summary:

```
mystarstories.app:
  @ → A → 104.18.10.243
  @ → A → 104.18.11.243
  www → CNAME → mystarstories.app
```

**Note**: Two A records provide redundancy and load balancing through Cloudflare.

---

## STEP 3: How to Add in Porkbun Interface

### Adding A Records:

1. Click **"Add"** or **"Add Record"**
2. Select **Type**: A
3. **Host**: @ (leave as @ or blank)
4. **Answer**: 104.18.10.243
5. **TTL**: 600
6. Click **"Add"** or **"Submit"**
7. **Repeat** for second A record with IP: 104.18.11.243

### Adding CNAME Record:

1. Click **"Add"** or **"Add Record"**
2. Select **Type**: CNAME
3. **Host**: www
4. **Answer**: mystarstories.app
5. **TTL**: 600
6. Click **"Add"** or **"Submit"**

---

## STEP 4: Verify DNS Configuration

### Wait for DNS Propagation (5-30 minutes with TTL 600)

Check DNS propagation status:
1. Visit: https://www.whatsmydns.net/
2. Enter: mystarstories.app
3. Select: A
4. Should show both IPs globally: 104.18.10.243 and 104.18.11.243

### Quick Verification Commands

Run these in your terminal:

```bash
# Check A records
dig mystarstories.app

# Should show both IPs
# mystarstories.app. 600 IN A 104.18.10.243
# mystarstories.app. 600 IN A 104.18.11.243

# Check CNAME
dig www.mystarstories.app

# Should show: www.mystarstories.app. 600 IN CNAME mystarstories.app.

# Check if site is accessible
curl -I https://mystarstories.app
```

---

## STEP 5: SSL Certificate

### Automatic SSL via Cloudflare

- SSL certificates are **automatically provisioned** via Cloudflare
- HTTPS will work immediately once DNS propagates
- Auto-renewal configured
- No action needed!

**Verify SSL:**
```bash
openssl s_client -connect mystarstories.app:443 -servername mystarstories.app
```

---

## STEP 6: Test Everything

### Domain Tests

✅ Test these URLs work:
```
https://mystarstories.app
https://www.mystarstories.app (should redirect to mystarstories.app)
```

✅ Test key pages:
- Homepage: https://mystarstories.app
- Create: https://mystarstories.app/create
- FAQ: https://mystarstories.app/faq
- Checkout: https://mystarstories.app/checkout
- API: https://mystarstories.app/api/health

---

## 📊 DNS Configuration Summary

### Quick Reference Table

| Type | Host | Answer | TTL | Purpose |
|------|------|--------|-----|----------|
| A | @ | 104.18.10.243 | 600 | Primary Cloudflare IP |
| A | @ | 104.18.11.243 | 600 | Secondary Cloudflare IP |
| CNAME | www | mystarstories.app | 600 | WWW subdomain (redirects) |

---

## 🔧 Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solution:**
- DNS not propagated yet (wait 30 minutes)
- Check DNS records are correct in Porkbun
- Clear your DNS cache

### Issue: "SSL Certificate Error"
**Solution:**
- Wait for SSL provisioning (usually instant with Cloudflare)
- Try accessing without www: https://mystarstories.app
- Clear browser cache

### Issue: "www not redirecting"
**Solution:**
- Verify CNAME record is correct (www → mystarstories.app)
- Check middleware.js is deployed
- Clear browser cache
- Try incognito mode

---

## ⚡ Expected Behavior

After configuration:

```
https://mystarstories.app              → Your app (PRIMARY)
https://www.mystarstories.app          → 301 redirect to mystarstories.app
```

**All traffic ends up at**: https://mystarstories.app (SEO-friendly)

---

## ✅ Final Checklist

Before going live:

- [ ] Added 2 A records in Porkbun (104.18.10.243 and 104.18.11.243)
- [ ] Added CNAME record for www
- [ ] Waited for DNS propagation
- [ ] SSL certificate working (https loads with padlock)
- [ ] www redirects to non-www
- [ ] All pages load correctly
- [ ] API endpoints working
- [ ] Mobile responsive
- [ ] No console errors

---

## 🚀 Post-Deployment

Once DNS is live:

1. **Update Stripe Webhook URL**:
   - Go to: https://dashboard.stripe.com/webhooks
   - Update endpoint to: https://mystarstories.app/api/webhooks/stripe

2. **Submit to Google Search Console**:
   - Add property: https://mystarstories.app
   - Submit sitemap: https://mystarstories.app/sitemap.xml

3. **Update Marketing Materials**:
   - Update all URLs to mystarstories.app
   - Update social media profiles
   - Update email signatures

---

## 📞 Support

**Porkbun Support:**
- Website: https://porkbun.com/support
- For: DNS configuration issues

**Cloudflare:**
- Dashboard: https://dash.cloudflare.com/
- For: SSL issues, CDN configuration

---

## 🎉 You're All Set!

Your mystarstories.app domain is configured and ready to go live!

**Timeline:**
- DNS Records Added: Immediate
- DNS Propagation: 5-30 minutes
- SSL Active: Immediate (via Cloudflare)
- Fully Live: Within 30 minutes

---

**Last Updated**: July 1, 2025  
**Domain**: mystarstories.app  
**DNS Provider**: Porkbun  
**CDN**: Cloudflare