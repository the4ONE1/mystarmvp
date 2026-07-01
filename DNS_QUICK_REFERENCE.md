# DNS Records Quick Reference for MyStarStories.shop

## Step-by-Step: What to Add in Your DNS Settings

### For mystarstories.shop

```
Record 1:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     @ (or leave blank for root)
Points to: [CONTACT EMERGENT FOR IP ADDRESS]
TTL:      3600 (or Auto)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Record 2:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     www
Points to: [SAME IP AS ABOVE]
TTL:      3600 (or Auto)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📋 Copy-Paste Template

After Emergent provides your IP address (example: 104.248.123.45):

```
Domain: mystarstories.shop
  @ → A → 104.248.123.45
  www → A → 104.248.123.45
```

---

## ⚡ Expected Result After Configuration

```
https://mystarstories.shop           → Your app (PRIMARY)
https://www.mystarstories.shop       → Your app (works)
```

---

## 📞 First Action Required

**YOU MUST DO THIS FIRST:**

Contact Emergent Agent Support:
- Email: support@emergentagent.com
- Subject: "DNS Configuration for mestar-stories app"
- Message: "Please provide the IP address or CNAME target for my app at mestar-stories.preview.emergentagent.com so I can configure mystarstories.shop"

They will reply with something like:
- IP Address: 104.248.123.45
- OR CNAME: mestar-stories.emergentagent.com

Then use that information in the DNS records above!

---

## ⏱️ Timeline

- DNS Record Addition: 5 minutes
- DNS Propagation: 1-48 hours (usually 1-4 hours)
- SSL Certificate: Auto-provisioned within 24 hours
- Full Site Live: Within 48 hours

---

## ✅ Verification Checklist

After adding DNS records:

1. [ ] Wait 1 hour
2. [ ] Check: https://www.whatsmydns.net/ (enter mystarstories.shop)
3. [ ] Verify records showing your IP globally
4. [ ] Try accessing: https://mystarstories.shop
5. [ ] Verify SSL certificate is valid (padlock icon)
6. [ ] Test all pages load correctly

---

**Need Help?** See DOMAIN_CONFIGURATION_GUIDE.md for detailed troubleshooting!
