# Keyword Research - Quick Reference

## 🚀 Quick Start (No API Needed)

```bash
# Run the demo to see how it works
npm run demo:keyword-research
```

This will:
- ✅ Show sample keyword research output
- ✅ Generate demo files in pseo-output/
- ✅ Display top keywords ranked by priority
- ✅ No Google Ads API credentials required!

---

## 📊 Complete Workflow

### Step 1: Research Keywords
```bash
npm run research:keywords
```
Output: `pseo-output/keyword-research.json` and `keyword-research.csv`

### Step 2: Generate Landing Pages
```bash
npm run generate:landing-pages -- --limit 10
```
Output: Pages in `public/pseo-data/[slug].json`

### Step 3: Update Sitemap
```bash
npm run generate:sitemap
```

### Step 4: Build & Deploy
```bash
npm run build
npm run deploy
```

---

## 🔑 Required Setup (For Real Data)

Add to `.env` file:

```bash
# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=your_token
GOOGLE_ADS_CLIENT_ID=your_id.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=your_secret
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token
GOOGLE_ADS_CUSTOMER_ID=1234567890

# OpenRouter (for content generation)
VITE_OPENROUTER_API_KEY=your_openrouter_key
```

**Setup Guide**: See [KEYWORD_RESEARCH_GUIDE.md](./KEYWORD_RESEARCH_GUIDE.md)

---

## 💡 Common Use Cases

### Research New Subject Keywords
```bash
npm run research:keywords -- "chemistry tutor" "chemistry help"
```

### Generate Location-Specific Pages
```bash
npm run research:keywords -- "tutor johannesburg" "tutor sandton"
npm run generate:landing-pages -- --limit 20
```

### Target High-Intent Keywords
```bash
npm run research:keywords -- "struggling matric" "failing grade 12"
npm run generate:landing-pages -- --limit 15
```

---

## 📁 Output Files

| File | Description |
|------|-------------|
| `pseo-output/keyword-research.json` | Full keyword data with metrics |
| `pseo-output/keyword-research.csv` | Spreadsheet-friendly format |
| `public/pseo-data/[slug].json` | Generated landing pages |
| `public/pseo-data/index.json` | Page index (auto-updated) |

---

## 🎯 Understanding the Output

### Keyword Priority Scoring

**100**: Perfect keyword
- High search volume (1000+)
- Low competition
- Strong commercial intent

**80-99**: Excellent keyword
- Good search volume (500-1000)
- Low-medium competition
- Clear buying signals

**60-79**: Good keyword
- Moderate search volume (100-500)
- Medium competition
- Some commercial intent

**<60**: Consider skipping
- Low search volume (<100) OR
- High competition OR
- Weak commercial intent

### Competition Levels

- **LOW**: Easy to rank, few competitors
- **MEDIUM**: Moderate difficulty, some established sites
- **HIGH**: Very competitive, dominated by big brands

---

## 🔍 Validation Commands

```bash
# Show top keywords from existing research
npm run validate:keywords top

# Export keywords to CSV format
npm run validate:keywords csv

# Show setup instructions
npm run validate:keywords instructions
```

---

## 📚 Full Documentation

- **Complete Guide**: [KEYWORD_RESEARCH_GUIDE.md](./KEYWORD_RESEARCH_GUIDE.md)
- **Implementation Details**: [KEYWORD_IMPLEMENTATION_SUMMARY.md](./KEYWORD_IMPLEMENTATION_SUMMARY.md)
- **PSEO Patterns**: [PSEO_IMPLEMENTATION.md](./PSEO_IMPLEMENTATION.md)

---

## 🆘 Troubleshooting

### "Missing Google Ads API credentials"
→ Run the demo: `npm run demo:keyword-research`  
→ See setup guide: [KEYWORD_RESEARCH_GUIDE.md](./KEYWORD_RESEARCH_GUIDE.md)

### "Rate limit exceeded"
→ Increase delay in `scripts/generate-landing-pages.ts`  
→ Generate fewer pages: `--limit 5`

### "Build errors"
→ Check that JSON files are in `public/pseo-data/`  
→ Verify `index.json` is updated  
→ Run: `npm run build:dev`

---

## ✅ Quick Checklist

Before deploying:
- [ ] Research keywords (or use demo)
- [ ] Review top keywords in CSV
- [ ] Generate landing pages (start with --limit 5)
- [ ] Check generated content quality
- [ ] Update sitemap
- [ ] Test build locally
- [ ] Deploy to production

---

**Last Updated**: 2026-02-20  
**Version**: 1.0.0
