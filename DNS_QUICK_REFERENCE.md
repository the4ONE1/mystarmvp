# DNS Records Quick Reference for Shopify

## Step-by-Step: What to Add in Shopify DNS

### For mystarstories.com (Primary Domain)

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

### For mystarstories.org (Redirect Domain)

```
Record 3:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     @ (or leave blank for root)
Points to: [SAME IP AS MYSTARSTORIES.COM]
TTL:      3600 (or Auto)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Record 4:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:     A
Host:     www
Points to: [SAME IP AS MYSTARSTORIES.COM]
TTL:      3600 (or Auto)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📋 Copy-Paste Template for Shopify

After Emergent provides your IP address (example: 104.248.123.45):

```
Domain: mystarstories.com
  @ → A → 104.248.123.45
  www → A → 104.248.123.45

Domain: mystarstories.org
  @ → A → 104.248.123.45
  www → A → 104.248.123.45
```

---

## 🔍 How to Find These Settings in Shopify

1. Login: https://www.shopify.com/admin
2. Click: Settings (bottom left)
3. Click: Domains
4. Find: mystarstories.com → Click "Manage"
5. Click: "DNS Settings" or "Edit DNS"
6. Click: "Add record" or "Add new record"
7. Fill in the information from above
8. Repeat for mystarstories.org

---

## ⚡ Expected Result After Configuration

```
https://mystarstories.com           → Your app (PRIMARY)
https://www.mystarstories.com       → Redirects to mystarstories.com
https://mystarstories.org           → Redirects to mystarstories.com
https://www.mystarstories.org       → Redirects to mystarstories.com
```

---

## 📞 First Action Required

**YOU MUST DO THIS FIRST:**

Contact Emergent Agent Support:
- Email: support@emergentagent.com
- Subject: "DNS Configuration for mestar-stories app"
- Message: "Please provide the IP address or CNAME target for my app at mestar-stories.preview.emergentagent.com so I can configure mystarstories.com and mystarstories.org"

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
2. [ ] Check: https://www.whatsmydns.net/ (enter mystarstories.com)
3. [ ] Verify records showing your IP globally
4. [ ] Try accessing: https://mystarstories.com
5. [ ] Verify SSL certificate is valid (padlock icon)
6. [ ] Test: https://mystarstories.org redirects to .com
7. [ ] Test all pages load correctly

---

**Need Help?** See DOMAIN_CONFIGURATION_GUIDE.md for detailed troubleshooting!
