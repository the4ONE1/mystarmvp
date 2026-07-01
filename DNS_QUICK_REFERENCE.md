# DNS Records Quick Reference for Mestar.pro

## Copy-Paste Template for Porkbun

### For mestar.pro

```
Record 1:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     @
Answer:   104.18.10.243
TTL:      600
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Record 2:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     @
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

---

## 📋 Visual Summary

```
Domain: mestar.pro
  @ → A → 104.18.10.243
  @ → A → 104.18.11.243
  www → CNAME → mestar.pro
```

---

## ⚡ Expected Result After Configuration

```
https://mestar.pro           → Your app (PRIMARY)
https://www.mestar.pro       → Redirects to mestar.pro (301)
```

---

## ⏱️ Timeline

- DNS Record Addition: 5 minutes
- DNS Propagation: 5-30 minutes (TTL 600)
- SSL Certificate: Active immediately (Cloudflare)
- Full Site Live: Within 30 minutes

---

## ✅ Verification Checklist

After adding DNS records:

1. [ ] Wait 10 minutes
2. [ ] Check: https://www.whatsmydns.net/ (enter mestar.pro)
3. [ ] Verify records showing both IPs globally
4. [ ] Try accessing: https://mestar.pro
5. [ ] Verify SSL certificate is valid (padlock icon)
6. [ ] Test: https://www.mestar.pro redirects to mestar.pro
7. [ ] Test all pages load correctly

---

## 🔗 Where to Configure

**Porkbun DNS Management:**
1. Login: https://porkbun.com/
2. Go to: Domain Management
3. Select: mestar.pro
4. Click: DNS Records
5. Add the 3 records above

---

**Need Help?** See DOMAIN_CONFIGURATION_GUIDE.md for detailed instructions!