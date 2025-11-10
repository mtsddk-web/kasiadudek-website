# 🚀 Quick Start - Web3Forms Configuration

## Status: ⚠️ 1 Action Required to Make Forms Work

All improvements are deployed, but **forms need Web3Forms API key** to send emails.

---

## 5-Minute Setup:

### Step 1: Get Web3Forms Key
1. Go to: **https://web3forms.com**
2. Click "Get Started Free"
3. Sign up with: **kontakt@kasiadudek.pl**
4. Confirm email
5. Create form: "kasiadudek.pl Forms"
6. **Copy Access Key** (starts with letters/numbers)

### Step 2: Add to Vercel
1. Go to: **https://vercel.com/dashboard**
2. Select project: **strona-kasi**
3. Settings → Environment Variables
4. Click "Add New"
5. **Key:** `WEB3FORMS_KEY`
6. **Value:** (paste your access key)
7. **Environment:** Production, Preview, Development (select all)
8. Save

### Step 3: Redeploy
```bash
vercel --prod
```

Or: Vercel Dashboard → Deployments → Redeploy

---

## ✅ Test Everything:

### E-book Form:
1. Open: https://kasiadudek.pl
2. Scroll to e-book section
3. Fill form with test data
4. Submit
5. **Check:** kontakt@kasiadudek.pl inbox
   - You should receive 2 emails:
     - One to the user (with e-book link)
     - One notification for you (new lead)

### Contact Form:
1. Scroll to contact section
2. Fill form
3. Submit
4. **Check:** kontakt@kasiadudek.pl inbox
   - You should receive:
     - Contact form submission
     - Auto-reply confirmation

---

## 📊 What's Already Working:

✅ **SSL:** https://kasiadudek.pl
✅ **Chatbot:** 21 topics + Claude AI fallback
✅ **Analytics:** Google Sheets logging
✅ **SEO:** Open Graph, Twitter Cards, Schema.org
✅ **RODO:** Privacy Policy + Terms of Service
✅ **Layout:** 2+2 grid, no placeholder content
✅ **Performance:** Lazy loading images

---

## ⏳ What's Pending:

1. **WEB3FORMS_KEY** ← You need to add this now
2. **SMSAPI verification** (for callback widget)
   - Go to: https://ssl.smsapi.pl
   - Complete company data
   - Wait 24h for verification

---

## 🆘 Problems?

### Forms not working after setup:
```bash
# Check Vercel logs
vercel logs

# Verify environment variable is set
vercel env ls
```

### Still not working?
1. Check spam folder
2. Try different email address
3. Contact me with error message from browser console (F12)

---

## 💰 Costs:

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Vercel | Hobby (free) | 0 zł |
| Web3Forms | Free (250/mo) | 0 zł |
| Claude AI | Pay-as-you-go | 10-20 zł |
| SMSAPI | Pay-as-you-go | 5-10 zł |
| **Total** | | **15-30 zł/mc** |

---

## 📖 Full Documentation:

See: **IMPROVEMENTS-2025-11-10.md** for complete details on all changes.

---

**Next:** Add WEB3FORMS_KEY to Vercel → Test forms → You're done! 🎉
