# 🌐 Domain Configuration Guide for Mestar.pro

## Complete DNS Setup Instructions for Porkbun

---

## 📋 Overview

This guide will help you configure:
- **Primary Domain**: mestar.pro
- **WWW Redirect**: www.mestar.pro → mestar.pro (301)
- SSL certificates (automatically configured via Cloudflare)
- DNS configuration through Porkbun

---

## STEP 1: Configure DNS Records in Porkbun

### Login to Porkbun

1. Go to: https://porkbun.com/
2. Login to your account
3. Navigate to: **Domain Management**
4. Find: **mestar.pro**
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
Answer:   mestar.pro
TTL:      600
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Visual Summary:

```
mestar.pro:
  @ → A → 104.18.10.243
  @ → A → 104.18.11.243
  www → CNAME → mestar.pro
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
4. **Answer**: mestar.pro (or mestar.pro.)
5. **TTL**: 600
6. Click **"Add"** or **"Submit"**

---

## STEP 4: Verify DNS Configuration

### Wait for DNS Propagation (5-30 minutes with TTL 600)

Check DNS propagation status:
1. Visit: https://www.whatsmydns.net/
2. Enter: mestar.pro
3. Select: A
4. Should show both IPs globally: 104.18.10.243 and 104.18.11.243

### Quick Verification Commands

Run these in your terminal:

```bash
# Check A records
dig mestar.pro

# Should show both IPs
# mestar.pro. 600 IN A 104.18.10.243
# mestar.pro. 600 IN A 104.18.11.243

# Check CNAME
dig www.mestar.pro

# Should show: www.mestar.pro. 600 IN CNAME mestar.pro.

# Check if site is accessible
curl -I https://mestar.pro
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
openssl s_client -connect mestar.pro:443 -servername mestar.pro
```

---

## STEP 6: Test Everything

### Domain Tests

✅ Test these URLs work:
```
https://mestar.pro
https://www.mestar.pro (should redirect to mestar.pro)
```

✅ Test key pages:
- Homepage: https://mestar.pro
- Create: https://mestar.pro/create
- FAQ: https://mestar.pro/faq
- Checkout: https://mestar.pro/checkout
- API: https://mestar.pro/api/health

---

## 📊 DNS Configuration Summary

### Quick Reference Table

| Type | Host | Answer | TTL | Purpose |
|------|------|--------|-----|----------|
| A | @ | 104.18.10.243 | 600 | Primary Cloudflare IP |
| A | @ | 104.18.11.243 | 600 | Secondary Cloudflare IP |
| CNAME | www | mestar.pro | 600 | WWW subdomain (redirects) |

---

## 🔧 Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solution:**
- DNS not propagated yet (wait 30 minutes)
- Check DNS records are correct in Porkbun
- Clear your DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### Issue: "SSL Certificate Error"
**Solution:**
- Wait for SSL provisioning (usually instant with Cloudflare)
- Try accessing without www: https://mestar.pro
- Clear browser cache

### Issue: "www not redirecting"
**Solution:**
- Verify CNAME record is correct (www → mestar.pro)
- Check middleware.js is deployed
- Clear browser cache
- Try incognito mode

### Issue: "Site loads but looks broken"
**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache completely
- Check if all assets are loading in DevTools (F12) → Network tab

---

## ⚡ Expected Behavior

After configuration:

```
https://mestar.pro              → Your app (PRIMARY)
https://www.mestar.pro          → 301 redirect to mestar.pro
```

**All traffic ends up at**: https://mestar.pro (SEO-friendly)

---

## ✅ Final Checklist

Before going live, verify:

- [ ] Added 2 A records in Porkbun (104.18.10.243 and 104.18.11.243)
- [ ] Added CNAME record for www
- [ ] Waited for DNS propagation (check whatsmydns.net)
- [ ] SSL certificate working (https://mestar.pro loads with padlock)
- [ ] www redirects to non-www
- [ ] All pages load correctly (home, create, faq, checkout)
- [ ] API endpoints working (/api/health)
- [ ] Mobile responsive
- [ ] No console errors

---

## 🚀 Post-Deployment

Once DNS is live:

1. **Update Stripe Webhook URL**:
   - Go to: https://dashboard.stripe.com/webhooks
   - Update endpoint to: https://mestar.pro/api/webhooks/stripe

2. **Submit to Google Search Console**:
   - Add property: https://mestar.pro
   - Submit sitemap: https://mestar.pro/sitemap.xml

3. **Update Marketing Materials**:
   - Update all URLs to mestar.pro
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

Your mestar.pro domain is configured and ready to go live!

**Timeline:**
- DNS Records Added: Immediate
- DNS Propagation: 5-30 minutes
- SSL Active: Immediate (via Cloudflare)
- Fully Live: Within 30 minutes

---

**Last Updated**: July 1, 2025  
**Domain**: mestar.pro  
**DNS Provider**: Porkbun  
**CDN**: Cloudflare