# Keyword Research & Landing Page Generation

This guide explains how to use Google Keyword Planner API to research keywords and automatically generate high-converting landing pages for StudyBuddy.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup Google Ads API](#setup-google-ads-api)
3. [Research Keywords](#research-keywords)
4. [Generate Landing Pages](#generate-landing-pages)
5. [Deploy Changes](#deploy-changes)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

### Workflow

```
1. Research Keywords (Google Ads API)
   ↓
2. Filter & Prioritize (automated)
   ↓
3. Generate Landing Pages (AI-powered)
   ↓
4. Review & Deploy (manual)
```

### Benefits

- **Data-driven**: Use real search volume and competition data
- **Automated**: Generate dozens of pages with minimal effort
- **High-converting**: Target bottom-of-funnel keywords
- **SEO-optimized**: Schema markup, internal linking, FAQs

---

## 🔧 Setup Google Ads API

### Step 1: Create Google Ads Account

1. Go to [Google Ads](https://ads.google.com)
2. Create an account (skip campaign creation)
3. Note your **Customer ID** (format: 123-456-7890)

### Step 2: Get API Access

1. Visit [Google Ads API Center](https://developers.google.com/google-ads/api/docs/first-call/overview)
2. Enable Google Ads API in your Google Cloud Console
3. Create OAuth 2.0 credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project (or use existing)
   - Enable **Google Ads API**
   - Create **OAuth 2.0 Client ID** (Desktop application)
   - Download the credentials JSON

### Step 3: Get Developer Token

1. Go to [Google Ads API Center](https://ads.google.com/aw/apicenter)
2. Request a **Developer Token**
3. Wait for approval (usually instant for test access)

### Step 4: Generate Refresh Token

Use the OAuth Playground or this script:

```bash
# Install Google Ads API library
npm install google-ads-api

# Create a script to generate refresh token
# (See: https://developers.google.com/google-ads/api/docs/first-call/oauth-cloud-project)
```

### Step 5: Configure Environment Variables

Add these to your `.env` file:

```bash
# Google Ads API (Keyword Planner)
GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token
GOOGLE_ADS_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=your_client_secret
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token
GOOGLE_ADS_CUSTOMER_ID=1234567890  # Without hyphens
```

---

## 🔍 Research Keywords

### Basic Usage

```bash
# Use default seed keywords (tutoring-focused)
npm run research:keywords

# Use custom seed keywords
npm run research:keywords -- "matric help" "physics tutor" "exam preparation"
```

### What It Does

1. **Queries Google Keyword Planner** with seed keywords
2. **Filters results** by:
   - Minimum search volume (50+/month)
   - Maximum competition (Low-Medium)
   - Location (South Africa)
3. **Prioritizes keywords** by:
   - Search volume
   - Competition level
   - Commercial intent (buying signals)
4. **Exports results** to:
   - `pseo-output/keyword-research.json` (full data)
   - `pseo-output/keyword-research.csv` (for analysis)

### Output Example

```
🏆 TOP 20 KEYWORDS BY PRIORITY:

Rank | Keyword                                    | Searches | Competition | Priority
------------------------------------------------------------------------------------------------
 1   | matric tutoring affordable                 |     1200 | LOW         |      100
 2   | physics tutor online south africa          |      850 | LOW         |       95
 3   | struggling with mathematics grade 12       |      720 | MEDIUM      |       85
...
```

### Understanding Results

- **Searches**: Average monthly searches in South Africa
- **Competition**: How competitive the keyword is (LOW, MEDIUM, HIGH)
- **Priority**: Our calculated score (higher = better)

**High-priority keywords have:**
- ✅ 100-1000 searches/month (sweet spot)
- ✅ Low competition
- ✅ Commercial intent ("buy", "tutor", "help", "struggling")

---

## 📝 Generate Landing Pages

### Basic Usage

```bash
# Generate pages for top 10 keywords
npm run generate:landing-pages -- --limit 10

# Generate pages for top 50 keywords
npm run generate:landing-pages -- --limit 50
```

### What It Does

1. **Loads keyword research** from `pseo-output/keyword-research.json`
2. **Generates content** for each keyword using AI:
   - SEO-optimized title & meta description
   - 800-1200 word article
   - 5-8 FAQs
   - Internal links to related pages
   - Schema markup for rich snippets
3. **Saves pages** to `public/pseo-data/[slug].json`
4. **Updates index** in `public/pseo-data/index.json`

### Content Quality

Each generated page includes:

- ✅ **Keyword-optimized** title, headings, and content
- ✅ **South African context** (CAPS, matric, rand pricing)
- ✅ **Trust signals** (student success stories, credentials)
- ✅ **Conversion focus** (CTAs, urgency, affordability)
- ✅ **Internal linking** (7-10 contextual links)
- ✅ **Schema markup** (FAQPage, Organization)

### Rate Limiting

- **API calls**: 15 seconds between each page
- **Reason**: Avoid hitting OpenRouter rate limits
- **Time estimate**: ~5 minutes for 10 pages

---

## 🚀 Deploy Changes

### Step 1: Review Generated Pages

```bash
# Check generated pages
ls public/pseo-data/*.json | wc -l

# Review a sample page
cat public/pseo-data/matric-tutoring-affordable.json | jq .
```

### Step 2: Update Sitemap

```bash
npm run generate:sitemap
```

This adds new pages to `public/sitemap.xml` for search engines.

### Step 3: Build & Test Locally

```bash
# Build the site
npm run build

# Preview locally
npm run preview
```

Visit the generated pages:
- http://localhost:4173/matric-tutoring-affordable
- http://localhost:4173/physics-tutor-online-south-africa

### Step 4: Deploy to Production

```bash
# Deploy to GitHub Pages
npm run deploy
```

Pages go live at `https://studybuddy.works/[slug]`

---

## 🔧 Troubleshooting

### Google Ads API Errors

**Problem**: "UNAUTHENTICATED" error

**Solution**:
1. Check refresh token is still valid
2. Regenerate refresh token if expired
3. Verify client_id and client_secret are correct

**Problem**: "PERMISSION_DENIED" error

**Solution**:
1. Ensure developer token is approved
2. Check customer ID is correct (no hyphens)
3. Verify API is enabled in Google Cloud Console

### Content Generation Errors

**Problem**: "Rate limit exceeded"

**Solution**:
1. Increase delay between pages (edit `generate-landing-pages.ts`)
2. Use a different OpenRouter model
3. Run in smaller batches (--limit 5)

**Problem**: "Invalid JSON response"

**Solution**:
1. Check OpenRouter API key is valid
2. Increase max_tokens in the script
3. Review AI response format

### Build Errors

**Problem**: Pages not appearing in build

**Solution**:
1. Verify JSON files are in `public/pseo-data/`
2. Check `index.json` includes new pages
3. Clear dist folder and rebuild

---

## 📊 Best Practices

### Keyword Selection

1. **Start small**: Generate 10-20 pages first
2. **Monitor performance**: Track which keywords convert
3. **Iterate**: Focus on high-performing keyword types
4. **Diversify**: Mix pain-point, comparison, and pricing keywords

### Content Quality

1. **Review AI output**: Always check generated content
2. **Edit for accuracy**: Verify facts and claims
3. **Maintain brand voice**: Ensure consistency
4. **Update regularly**: Refresh content quarterly

### SEO Optimization

1. **Unique content**: Avoid duplicate pages
2. **Internal linking**: Connect related pages
3. **Fast loading**: Optimize images, minimize JS
4. **Mobile-friendly**: Test on mobile devices

---

## 🎓 Example Workflow

Here's a complete example workflow:

```bash
# 1. Research keywords (South African tutoring market)
npm run research:keywords

# 2. Review results
cat pseo-output/keyword-research.csv

# 3. Generate pages for top 20 keywords
npm run generate:landing-pages -- --limit 20

# 4. Review generated pages
ls public/pseo-data/*.json | tail -20

# 5. Update sitemap
npm run generate:sitemap

# 6. Build and test
npm run build
npm run preview

# 7. Deploy to production
npm run deploy
```

---

## 📚 Additional Resources

- [Google Ads API Documentation](https://developers.google.com/google-ads/api)
- [Keyword Planner Guide](https://support.google.com/google-ads/answer/7337243)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [PSEO Best Practices](./PSEO_IMPLEMENTATION.md)

---

## 💡 Tips & Tricks

### Finding Good Seed Keywords

1. **Use competitor keywords**: Analyze what ranks for tutoring
2. **Check Google Suggest**: Type "matric help" and see suggestions
3. **Use question keywords**: "how to pass matric", "what is..."
4. **Location modifiers**: Add cities/provinces to keywords

### Improving Content Quality

1. **Add statistics**: Include real data about student success
2. **Use testimonials**: Feature real student stories
3. **Answer common questions**: Address objections in FAQs
4. **Show urgency**: Time-sensitive offers, exam deadlines

### Scaling Content Production

1. **Batch processing**: Generate 50-100 pages in one session
2. **Template variations**: Use different content angles
3. **A/B testing**: Create multiple versions, track performance
4. **Automation**: Schedule weekly keyword research

---

## 🤝 Support

Need help? Check these resources:

1. **Issues**: Report bugs on GitHub
2. **Docs**: See `PSEO_IMPLEMENTATION.md` for details
3. **Community**: Join our Discord for support

---

**Last Updated**: 2026-02-20
**Maintained by**: StudyBuddy Development Team
