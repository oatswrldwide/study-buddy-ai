# 🎯 KEYWORD VALIDATION CHECKLIST

## Step 1: Manual Google Search Validation (5 minutes)

Test these HIGH-PRIORITY keywords by searching them on Google:

### Top 5 Keywords to Test NOW:
1. **"failing matric maths need help fast"**
   - [ ] Search on Google.co.za
   - [ ] Check autocomplete suggestions
   - [ ] Note what ranks #1-3
   - [ ] Are competitors running ads? (buying intent!)
   
2. **"maths tutor sandton grade 12"**
   - [ ] Local intent keyword
   - [ ] Check Google Maps results
   - [ ] See competitor pricing
   
3. **"how to pass matric maths in 3 months"**
   - [ ] Urgent timeline keyword
   - [ ] Check "People also ask"
   - [ ] Note related searches at bottom
   
4. **"AI tutor vs traditional tutor"**
   - [ ] Comparison keyword (25-35% conversion!)
   - [ ] See what comparison pages exist
   - [ ] Check if anyone mentions StudyBuddy
   
5. **"affordable matric tutoring under R100"**
   - [ ] Pricing keyword (22-30% conversion!)
   - [ ] Your R99 price fits perfectly!
   - [ ] Check competitor pricing

---

## Quick Validation Results:

| Keyword | Autocomplete? | Competitors? | Decision |
|---------|--------------|--------------|----------|
| failing matric maths need help fast | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ USE ☐ SKIP |
| maths tutor sandton grade 12 | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ USE ☐ SKIP |
| how to pass matric maths 3 months | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ USE ☐ SKIP |
| AI tutor vs traditional tutor | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ USE ☐ SKIP |
| affordable matric tutoring under R100 | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ USE ☐ SKIP |

**Validation Rule**: 
- ✅ USE if: Google autocompletes it OR competitors exist
- ❌ SKIP if: No autocomplete AND no search results

---

## Step 2: Google Keyword Planner (Optional but Recommended)

### Quick Setup (10 minutes):
1. Go to: https://ads.google.com/aw/keywordplanner
2. Sign in with Google account
3. Click "Discover new keywords"
4. Paste top 20 keywords from: `npm run validate:keywords top`
5. Set location: **South Africa**
6. Export results

### What to Look For:
- **Search Volume**: 50+ monthly = GOOD, 500+ = EXCELLENT
- **Competition**: Low or Medium = GOOD
- **CPC**: Higher CPC = more buying intent = BETTER for conversions

---

## Step 3: Pricing Verification ✅

**Current Settings in Code:**
- Price: R99/month ✅
- Free trial: 7 days ✅
- No credit card: Required ✅

**Verify These Are Accurate:**
- [ ] Is R99/month current price on your site?
- [ ] Does 7-day free trial exist?
- [ ] Is "no credit card" claim true?
- [ ] Is "unlimited help" accurate?

**If any are wrong, update prompts in:**
- `scripts/generate-high-conversion-content.ts`

---

## Step 4: Google Analytics 4 Setup (10 minutes)

### Quick GA4 Setup:
1. Go to: https://analytics.google.com/
2. Create new GA4 property: "StudyBuddy"
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to your site

### Add Tracking Code:
Add this to `index.html` in `<head>`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Set Up Conversion Events:
1. In GA4 → Events → Create Event
2. Create these events:
   - `cta_click` (button clicks)
   - `trial_start` (signup)
   - `page_view` (already auto-tracked)

**The PSEOPage component already sends these events!** ✅

---

## Step 5: Generate Test Pages (NOW!)

Run this to generate 5 test pages:

```bash
npm run pseo:high-conversion
```

**Review Checklist for Each Page:**
- [ ] Content is unique (not duplicate)
- [ ] Internal links work
- [ ] Testimonials are generic (no fake names)
- [ ] R99/month pricing is correct
- [ ] Free trial mention is accurate
- [ ] CTAs are compelling
- [ ] Keywords are natural (not stuffed)

---

## Step 6: Scale Strategy (After Testing)

### Week 1: Test Batch (20 pages)
```bash
npm run pseo:pain-points --limit=20
```
Monitor for 3-5 days:
- Google Search Console → Check indexing
- GA4 → Check traffic
- No duplicate content warnings

### Week 2: Small Scale (50 pages)
```bash
npm run pseo:pain-points
npm run pseo:comparisons
npm run pseo:pricing
```
Total: ~40 pages

### Week 3-4: Full Scale (350 pages)
Generate remaining pages in batches of 50-100 per week

---

## ✅ READY TO START?

**Right now, do this:**
1. [ ] Quick validate 5 keywords (search on Google)
2. [ ] Verify pricing is correct
3. [ ] Run: `npm run pseo:high-conversion`
4. [ ] Review the 5 generated pages
5. [ ] If quality is good → scale to 20 pages
6. [ ] Set up GA4 (can be done while pages generate)

**Let's generate the test batch now!**
