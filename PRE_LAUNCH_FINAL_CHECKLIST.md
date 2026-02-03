# 🚦 PRE-LAUNCH CHECKLIST - Before Generating 350 Pages

**Date:** February 3, 2026  
**Status:** Review before full-scale generation

---

## ✅ DONE - Ready to Go

### 1. Content Generation System
- [x] Groq API configured (Llama 3.3 70B)
- [x] Generator script working (`generate-high-conversion-content.ts`)
- [x] 256 high-conversion keywords ready
- [x] Uniqueness scoring (40%+ threshold)
- [x] JSON sanitization (prevents control char errors)
- [x] Rate limiting (4 calls, 2s pause)
- [x] Test generation successful (5/5 pages)

### 2. Content Quality
- [x] Landing page structure (12 conversion elements)
- [x] Internal linking (2-4 per page)
- [x] E-E-A-T signals (author, credentials, fact-checking)
- [x] Real testimonial format (no fake names)
- [x] Urgency language (finals approaching)
- [x] Comparison tables
- [x] 5 FAQs per page
- [x] Conversion-optimized CTAs

### 3. SEO Foundation
- [x] Optimized meta titles (55-60 chars)
- [x] Optimized meta descriptions (150-155 chars)
- [x] Keyword validation tool working
- [x] Schema.org markup ready (Article, FAQ)
- [x] robots.txt configured (allows all bots + AI engines)
- [x] Dynamic routing (/:slug)

### 4. Technical Setup
- [x] PSEOPage component exists
- [x] Build script ready (`npm run build`)
- [x] Deploy script ready (`npm run deploy`)
- [x] Firebase configured (fallback to JSON)

---

## ⚠️ CRITICAL - Must Complete Before Full Generation

### 1. **Load JSON from Public Folder** ❌
**Issue:** PSEOPage.tsx tries to load from Firestore, but we're saving to JSON files.

**Fix needed:**
```tsx
// Current (tries Firestore):
const pageDoc = await getDoc(doc(db, 'pseo_pages', `subject-${slug}`));

// Should be:
const response = await fetch(`/pseo-data/${slug}.json`);
const pageData = await response.json();
```

**Action:** Update PSEOPage.tsx to load from `/public/pseo-data/` folder

---

### 2. **Move JSON Files to Public** ❌
**Issue:** Generated files are in `pseo-output-conversion/`, not accessible by website.

**Action:**
```bash
mkdir -p public/pseo-data
cp pseo-output-conversion/*.json public/pseo-data/
```

Or update generator to save directly to `public/pseo-data/`

---

### 3. **Generate Sitemap** ❌
**Issue:** robots.txt references `sitemap.xml` but it doesn't exist.

**Action:** Create script to generate sitemap from all JSON files
```bash
npm run generate:sitemap
```

---

### 4. **Google Analytics 4 Setup** ❌
**Issue:** GA4 tracking code exists but no Measurement ID configured.

**Action:**
1. Go to https://analytics.google.com
2. Create GA4 property for studybuddy.works
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

### 5. **Verify Pricing** ❌
**Issue:** All pages say "R99/month, 7-day free trial, no credit card required"

**Action:** Confirm with stakeholders:
- Is R99/month accurate?
- Is 7-day free trial active?
- Is "no credit card required" true?
- Update generator prompts if prices changed

---

### 6. **Test Build & Deploy** ❌
**Action:**
```bash
npm run build          # Should complete without errors
npm run preview        # Test built site locally
npm run deploy         # Deploy to GitHub Pages
```

Check for:
- Build errors
- Missing routes
- 404 errors
- Broken links

---

## 🔧 RECOMMENDED - Should Do Before Scaling

### 7. **Create Sitemap Generator Script**
```typescript
// scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://studybuddy.works';
const jsonDir = './public/pseo-data';

const files = fs.readdirSync(jsonDir);
const urls = files
  .filter(f => f.endsWith('.json'))
  .map(f => {
    const slug = f.replace('.json', '');
    const filePath = path.join(jsonDir, f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return `
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${data.lastUpdated.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${data.pageType === 'pain-point' ? '0.9' : '0.8'}</priority>
  </url>`;
  });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls.join('')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log(`✅ Sitemap generated with ${urls.length} pages`);
```

**Add to package.json:**
```json
"scripts": {
  "generate:sitemap": "tsx scripts/generate-sitemap.ts"
}
```

---

### 8. **Update PSEOPage to Load from JSON**

**File:** `src/pages/PSEOPage.tsx`

**Replace Firestore loading with:**
```tsx
useEffect(() => {
  if (!slug) return;

  const loadPage = async () => {
    try {
      // Load from public folder JSON files
      const response = await fetch(`/pseo-data/pain-${slug}.json`);
      
      if (!response.ok) {
        // Try other prefixes
        const compResponse = await fetch(`/pseo-data/comp-${slug}.json`);
        if (compResponse.ok) {
          const data = await compResponse.json();
          setPage(data);
          return;
        }
        
        const priceResponse = await fetch(`/pseo-data/price-${slug}.json`);
        if (priceResponse.ok) {
          const data = await priceResponse.json();
          setPage(data);
          return;
        }
      } else {
        const data = await response.json();
        setPage(data);
      }
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  };

  loadPage();
}, [slug]);
```

---

### 9. **Update Generator to Save to Public**

**Option 1:** Move files after generation
```bash
npm run pseo:high-conversion
cp pseo-output-conversion/*.json public/pseo-data/
```

**Option 2:** Update generator output path
```typescript
// In generate-high-conversion-content.ts
const OUTPUT_DIR = './public/pseo-data';
```

---

### 10. **Mobile Optimization Check**
- [ ] Test on mobile devices
- [ ] Check table responsiveness (comparison tables)
- [ ] Verify CTA buttons are tappable
- [ ] Test form inputs work on mobile
- [ ] Check font sizes are readable

---

### 11. **Page Speed Check**
```bash
# Test a sample page
npm run build
npm run preview
# Visit http://localhost:4173/failing-mathematics-grade-10-need-help-fast
# Check PageSpeed Insights
```

**Target metrics:**
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

---

### 12. **Manual Keyword Validation**
```bash
npm run validate:keywords top
```

**Test top 5 on Google.co.za:**
1. "failing mathematics grade 10 need help fast"
2. "struggling with mathematics how to improve quickly"
3. "ai tutor sandton"
4. "matric exam preparation help"
5. "affordable online tutoring south africa"

**Check for:**
- Autocomplete suggestions (shows demand)
- "People also ask" box (shows related queries)
- 1-3 competitors (shows opportunity)

---

## 📋 Quick Start Commands

### After Fixing Critical Issues:

```bash
# 1. Fix PSEOPage.tsx to load from JSON
# 2. Generate sitemap
npm run generate:sitemap

# 3. Generate 5 test pages
npm run pseo:high-conversion

# 4. Move to public
mkdir -p public/pseo-data
cp pseo-output-conversion/*.json public/pseo-data/

# 5. Test locally
npm run build
npm run preview

# 6. Deploy
npm run deploy

# 7. Verify on production
# Visit: studybuddy.works/failing-mathematics-grade-10-need-help-fast
```

---

## 🎯 Scaling Strategy (After Critical Fixes)

### Week 1: Test Batch (5-10 pages)
```bash
npm run pseo:high-conversion --limit=5
cp pseo-output-conversion/*.json public/pseo-data/
npm run generate:sitemap
npm run deploy
```

**Monitor for 3-5 days:**
- Google Search Console indexing
- GA4 page views
- Conversion tracking
- Any errors in console

### Week 2: Small Scale (20 pages)
```bash
npm run pseo:pain-points --limit=20
cp pseo-output-conversion/*.json public/pseo-data/
npm run generate:sitemap
npm run deploy
```

**Monitor:** Ranking positions, traffic growth, conversions

### Week 3: Medium Scale (50 pages)
```bash
npm run pseo:high-conversion --limit=50
cp pseo-output-conversion/*.json public/pseo-data/
npm run generate:sitemap
npm run deploy
```

### Week 4: Full Scale (350 pages)
```bash
npm run pseo:high-conversion --limit=350
cp pseo-output-conversion/*.json public/pseo-data/
npm run generate:sitemap
npm run deploy
```

---

## ⚡ Critical Path (Must Do Today)

1. **Fix PSEOPage.tsx** (30 mins)
   - Update to load from `/pseo-data/*.json`
   - Test locally

2. **Create Sitemap Generator** (15 mins)
   - Create `scripts/generate-sitemap.ts`
   - Add to package.json scripts

3. **Verify Pricing** (5 mins)
   - Confirm R99/month is accurate
   - Confirm 7-day free trial details

4. **Test Build** (10 mins)
   ```bash
   npm run build
   npm run preview
   ```

5. **Set up GA4** (15 mins)
   - Create property
   - Add Measurement ID to index.html

**Total time: ~75 minutes**

---

## 🚀 Ready to Launch When:

- [x] Generator working
- [x] Content quality excellent
- [x] E-E-A-T signals present
- [ ] PSEOPage loads from JSON ⚠️ **CRITICAL**
- [ ] Sitemap generated ⚠️ **CRITICAL**
- [ ] Pricing verified ⚠️ **CRITICAL**
- [ ] GA4 configured (recommended)
- [ ] Test build successful (recommended)
- [ ] Mobile tested (recommended)

---

## 📞 Final Checks Before "GO"

### Quick Test Checklist:
```bash
# 1. Generate 1 test page
npm run pseo:high-conversion --limit=1

# 2. Copy to public
cp pseo-output-conversion/*.json public/pseo-data/

# 3. Generate sitemap
npm run generate:sitemap

# 4. Build
npm run build

# 5. Test locally
npm run preview
# Visit: http://localhost:4173/[your-test-page-slug]

# 6. Check for:
# - Page loads correctly
# - Content displays properly
# - CTAs work
# - Internal links work
# - Mobile responsive
# - No console errors

# 7. Deploy
npm run deploy

# 8. Verify on production
# Visit: studybuddy.works/[your-test-page-slug]
```

---

## Summary: 3 Critical Blockers

1. **PSEOPage.tsx** - Must load from JSON not Firestore
2. **Sitemap** - Must generate sitemap.xml for 350 pages
3. **Pricing** - Must verify R99/month is accurate

**Fix these 3 = Ready to generate 350 pages!**

**Estimated fix time: 1 hour**
