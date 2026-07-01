# DNS Records Quick Reference for MyStarStories.app

## Copy-Paste Template for Porkbun

### For mystarstories.app

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
Answer:   mystarstories.app
TTL:      600
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📋 Visual Summary

```
Domain: mystarstories.app
  @ → A → 104.18.10.243
  @ → A → 104.18.11.243
  www → CNAME → mystarstories.app
```

---

## ⚡ Expected Result After Configuration

```
https://mystarstories.app           → Your app (PRIMARY)
https://www.mystarstories.app       → Redirects to mystarstories.app (301)
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
2. [ ] Check: https://www.whatsmydns.net/ (enter mystarstories.app)
3. [ ] Verify records showing both IPs globally
4. [ ] Try accessing: https://mystarstories.app
5. [ ] Verify SSL certificate is valid (padlock icon)
6. [ ] Test: https://www.mystarstories.app redirects to mystarstories.app
7. [ ] Test all pages load correctly

---

## 🔗 Where to Configure

**Porkbun DNS Management:**
1. Login: https://porkbun.com/
2. Go to: Domain Management
3. Select: mystarstories.app
4. Click: DNS Records
5. Add the 3 records above

---

**Need Help?** See DOMAIN_CONFIGURATION_GUIDE.md for detailed instructions!