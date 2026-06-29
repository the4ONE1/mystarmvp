# 🌐 Custom Domain Configuration Guide for MyStarStories.com

## Complete DNS Setup Instructions for Shopify DNS

---

## 📋 Overview

This guide will help you configure:
- **Primary Domain**: mystarstories.com (main site)
- **Redirect Domain**: mystarstories.org → mystarstories.com
- SSL certificates (automatically configured)
- DNS propagation verification

---

## STEP 1: Get Your App's Server Information

### Contact Emergent Agent Support

Before configuring DNS, you need to get your app's routing information:

**Option A: If using Emergent Agent hosting**
1. Contact Emergent support at: support@emergentagent.com
2. Provide them with:
   - Your app name: "mestar-stories"
   - Your preview URL: https://mestar-stories.preview.emergentagent.com
   - Your desired domains: mystarstories.com and mystarstories.org

3. They will provide you with EITHER:
   - **Server IP Address**: `XXX.XXX.XXX.XXX` (A record)
   - **CNAME Target**: `your-app.emergentagent.com` (CNAME record)

**Option B: If self-hosting**
- Use your server's public IP address
- Example: `104.248.123.45`

---

## STEP 2: Configure DNS Records in Shopify

### Login to Shopify DNS Management

1. Go to: https://www.shopify.com/admin
2. Navigate to: **Settings** → **Domains**
3. Find your domains: mystarstories.com and mystarstories.org
4. Click **Manage** → **DNS Settings**

---

### DNS Records to Add (Choose Option A OR B based on what Emergent provides)

#### **OPTION A: If Emergent Provides an IP Address**

Add these **A Records** for **mystarstories.com**:

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

Add these **A Records** for **mystarstories.org**:

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
mystarstories.com:
  @ → A → 104.248.123.45
  www → A → 104.248.123.45

mystarstories.org:
  @ → A → 104.248.123.45
  www → A → 104.248.123.45
```

---

#### **OPTION B: If Emergent Provides a CNAME Target**

For **mystarstories.com**:

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

For **mystarstories.org**:

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
mystarstories.com:
  www → CNAME → mestar-stories.emergentagent.com
  @ → A → 104.248.123.45

mystarstories.org:
  www → CNAME → mestar-stories.emergentagent.com
  @ → A → 104.248.123.45
```

---

## STEP 3: Configure Domain Redirect (mystarstories.org → mystarstories.com)

This redirect will be handled by the application automatically. The app is configured to:
- Accept traffic from both domains
- Redirect mystarstories.org to mystarstories.com

**No additional DNS configuration needed for the redirect!**

---

## STEP 4: Verify DNS Configuration

### Wait for DNS Propagation (typically 1-48 hours)

Check DNS propagation status:
1. Visit: https://www.whatsmydns.net/
2. Enter: mystarstories.com
3. Select: A or CNAME (depending on what you configured)
4. Check if your records are showing globally

### Quick Verification Commands

Run these in your terminal:

```bash
# Check A records
dig mystarstories.com
dig www.mystarstories.com
dig mystarstories.org
dig www.mystarstories.org

# Check CNAME records (if using CNAME)
nslookup www.mystarstories.com

# Check if site is accessible
curl -I https://mystarstories.com
```

---

## STEP 5: SSL Certificate Configuration

### Automatic SSL (Recommended)

If using Emergent Agent hosting:
- SSL certificates will be **automatically provisioned**
- Uses Let's Encrypt
- Auto-renewal configured
- No action needed!

### Manual SSL (If self-hosting)

If you're self-hosting, install SSL certificates:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificates for all domains
sudo certbot --nginx -d mystarstories.com -d www.mystarstories.com -d mystarstories.org -d www.mystarstories.org

# Verify auto-renewal
sudo certbot renew --dry-run
```

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
curl https://mystarstories.com/api/health
```

---

## STEP 7: Test Everything

### Domain Tests

✅ Test these URLs work:
```
https://mystarstories.com
https://www.mystarstories.com
https://mystarstories.org (should redirect to .com)
https://www.mystarstories.org (should redirect to .com)
```

✅ Verify SSL:
```bash
# Should show valid SSL certificate
openssl s_client -connect mystarstories.com:443 -servername mystarstories.com
```

✅ Test key pages:
- Homepage: https://mystarstories.com
- Create: https://mystarstories.com/create
- FAQ: https://mystarstories.com/faq
- API: https://mystarstories.com/api/health

---

## 📊 Complete DNS Configuration Summary

### Quick Reference Table

| Domain | Record Type | Name | Value | Purpose |
|--------|-------------|------|-------|----------|
| mystarstories.com | A | @ | [IP] | Root domain |
| mystarstories.com | A | www | [IP] | www subdomain |
| mystarstories.org | A | @ | [IP] | Org root (redirects) |
| mystarstories.org | A | www | [IP] | Org www (redirects) |

### Alternative CNAME Configuration

| Domain | Record Type | Name | Value | Purpose |
|--------|-------------|------|-------|----------|
| mystarstories.com | A | @ | [IP] | Root domain |
| mystarstories.com | CNAME | www | [CNAME] | www subdomain |
| mystarstories.org | A | @ | [IP] | Org root (redirects) |
| mystarstories.org | CNAME | www | [CNAME] | Org www (redirects) |

---

## 🔧 Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"
**Solution:**
- DNS not propagated yet (wait 24-48 hours)
- Check DNS records are correct in Shopify
- Clear your DNS cache: `sudo systemd-resolve --flush-caches` (Linux) or `ipconfig /flushdns` (Windows)

### Issue: "SSL Certificate Error"
**Solution:**
- Wait for SSL provisioning (can take up to 24 hours)
- Contact Emergent support if using their hosting
- If self-hosting, run: `sudo certbot renew`

### Issue: "mystarstories.org not redirecting"
**Solution:**
- The redirect is handled by the application
- Ensure both domains point to the same server
- Check application logs: `tail -f /var/log/supervisor/nextjs.out.log`

### Issue: "Site loads but looks broken"
**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check if all assets are loading: Open browser DevTools (F12) → Network tab

---

## 📞 Support Contacts

### Emergent Agent Support
- **Email**: support@emergentagent.com
- **Purpose**: Server IP, CNAME target, SSL issues

### Shopify Support
- **Login**: https://www.shopify.com/admin
- **Purpose**: DNS record management

### Domain Registrar
- Check where you originally purchased mystarstories.com and mystarstories.org
- May need to update nameservers to point to Shopify

---

## ✅ Final Checklist

Before going live, verify:

- [ ] Contacted Emergent/hosting provider for server IP or CNAME
- [ ] Added DNS records in Shopify for mystarstories.com
- [ ] Added DNS records in Shopify for mystarstories.org
- [ ] Waited for DNS propagation (check whatsmydns.net)
- [ ] SSL certificates provisioned (check https://mystarstories.com)
- [ ] Both domains accessible via HTTPS
- [ ] mystarstories.org redirects to mystarstories.com
- [ ] All pages load correctly (home, create, faq, checkout)
- [ ] API endpoints working (/api/health)
- [ ] Stripe keys added (if ready for production)
- [ ] AWS S3 credentials added (if ready for production)
- [ ] Tested complete purchase flow
- [ ] Mobile responsive testing done
- [ ] All images loading
- [ ] Forms working correctly

---

## 🚀 Ready to Launch!

Once all checklist items are complete:
1. Update any marketing materials with new domain
2. Submit sitemap to Google Search Console: https://mystarstories.com/sitemap.xml
3. Set up Google Analytics (optional)
4. Monitor application logs for any issues
5. Celebrate your launch! 🎉

---

## 📝 Important Notes

⚠️ **Before DNS Configuration:**
- Ensure you have access to Shopify DNS settings
- Backup any existing DNS records
- Note current DNS records before making changes

⚠️ **During DNS Propagation:**
- Some users may see old site, some new site (this is normal)
- Don't panic if site isn't immediately accessible
- DNS propagation can take up to 48 hours globally

⚠️ **After Launch:**
- Monitor error logs for first 24-48 hours
- Test checkout flow with real card (then refund)
- Keep preview URL active as backup for 7 days

---

**Last Updated**: June 29, 2025
**Application Version**: Production Ready
**Domains**: mystarstories.com (primary), mystarstories.org (redirect)