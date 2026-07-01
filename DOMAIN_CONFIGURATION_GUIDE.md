# 🌐 Custom Domain Configuration Guide for MyStarStories.shop

## Complete DNS Setup Instructions

---

## 📋 Overview

This guide will help you configure:
- **Primary Domain**: mystarstories.shop
- SSL certificates (automatically configured)
- DNS propagation verification

---

## STEP 1: Get Your App's Server Information

### Contact Emergent Agent Support

Before configuring DNS, you need to get your app's routing information:

**Contact Emergent Support:**
1. Email: support@emergentagent.com
2. Subject: "DNS Configuration for mestar-stories app"
3. Message: "Please provide the IP address or CNAME target for my app at mestar-stories.preview.emergentagent.com so I can configure mystarstories.shop"

4. They will provide you with EITHER:
   - **Server IP Address**: `XXX.XXX.XXX.XXX` (A record)
   - **CNAME Target**: `your-app.emergentagent.com` (CNAME record)

---

## STEP 2: Configure DNS Records for mystarstories.shop

### DNS Records to Add (Choose Option A OR B based on what Emergent provides)

#### **OPTION A: If Emergent Provides an IP Address**

Add these **A Records**:

```
Type: A
Name: @
Value: [IP_ADDRESS_FROM_EMERGENT]
TTL: 3600

Type: A
Name: www
Value: [IP_ADDRESS_FROM_EMERGENT]
TTL: 3600
```

**Example with actual IP (104.248.123.45):**
```
mystarstories.shop:
  @ → A → 104.248.123.45
  www → A → 104.248.123.45
```

---

#### **OPTION B: If Emergent Provides a CNAME Target**

```
Type: CNAME
Name: www
Value: [CNAME_FROM_EMERGENT]
TTL: 3600

Type: A or ALIAS
Name: @
Value: [IP_OR_ALIAS_FROM_EMERGENT]
TTL: 3600
```

**Example with CNAME (mestar-stories.emergentagent.com):**
```
mystarstories.shop:
  www → CNAME → mestar-stories.emergentagent.com
  @ → A → 104.248.123.45
```

---

## STEP 3: Where to Configure DNS

### Common Domain Registrars:

**Namecheap:**
1. Login → Domain List → Manage
2. Advanced DNS → Add New Record
3. Type: A Record, Host: @, Value: [IP]

**GoDaddy:**
1. Login → My Products → DNS
2. Add → Type: A, Name: @, Value: [IP]

**Cloudflare:**
1. Login → Select Domain → DNS
2. Add Record → Type: A, Name: @, Content: [IP]

---

## STEP 4: Verify DNS Configuration

### Wait for DNS Propagation (typically 1-48 hours)

Check DNS propagation status:
1. Visit: https://www.whatsmydns.net/
2. Enter: mystarstories.shop
3. Select: A (if using IP) or CNAME (if using CNAME)
4. Check if your records are showing globally

### Quick Verification Commands

```bash
# Check A records
dig mystarstories.shop
dig www.mystarstories.shop

# Check if site is accessible
curl -I https://mystarstories.shop
```

---

## STEP 5: SSL Certificate Configuration

### Automatic SSL (Recommended)

If using Emergent Agent hosting:
- SSL certificates will be **automatically provisioned**
- Uses Let's Encrypt
- Auto-renewal configured
- No action needed!

---

## STEP 6: Update Application Environment

Once DNS is configured and propagating:

```bash
# Copy production environment file
cd /app
cp .env.production .env

# Restart the application
sudo supervisorctl restart nextjs

# Verify it's running
curl https://mystarstories.shop/api/health
```

---

## STEP 7: Test Everything

### Domain Tests

✅ Test these URLs work:
```
https://mystarstories.shop
https://www.mystarstories.shop
```

✅ Test key pages:
- Homepage: https://mystarstories.shop
- Create: https://mystarstories.shop/create
- FAQ: https://mystarstories.shop/faq
- API: https://mystarstories.shop/api/health

---

## 📊 Complete DNS Configuration Summary

### Quick Reference Table

| Domain | Record Type | Name | Value | Purpose |
|--------|-------------|------|-------|----------|
| mystarstories.shop | A | @ | [IP] | Root domain |
| mystarstories.shop | A | www | [IP] | www subdomain |

---

## 🔧 Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solution:**
- DNS not propagated yet (wait 24-48 hours)
- Check DNS records are correct
- Clear your DNS cache

### Issue: "SSL Certificate Error"
**Solution:**
- Wait for SSL provisioning (can take up to 24 hours)
- Contact Emergent support if using their hosting

### Issue: "Site loads but looks broken"
**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

---

## 📞 Support Contacts

### Emergent Agent Support
- **Email**: support@emergentagent.com
- **Purpose**: Server IP, CNAME target, SSL issues

---

## ✅ Final Checklist

Before going live:

- [ ] Contacted Emergent for server IP or CNAME
- [ ] Added DNS records for mystarstories.shop
- [ ] Waited for DNS propagation
- [ ] SSL certificates provisioned
- [ ] Domain accessible via HTTPS
- [ ] All pages load correctly
- [ ] API endpoints working
- [ ] Stripe keys added (if ready)
- [ ] AWS S3 credentials added (if ready)
- [ ] Tested complete purchase flow

---

**Last Updated**: June 29, 2025  
**Domain**: mystarstories.shop
