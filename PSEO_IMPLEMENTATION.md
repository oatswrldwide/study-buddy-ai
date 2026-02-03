# pSEO Implementation Guide - OpenRouter Multi-Model Pipeline

## Overview

Programmatic SEO + AEO (Answer Engine Optimization) system for StudyBuddy using OpenRouter's multi-model approach to generate 500+ SEO-optimized education pages targeting South African market.

**Goal**: Rank #1-3 for "AI tutor [location]" and subject-specific keywords across South Africa, optimized for both Google and AI search engines (ChatGPT, Perplexity, Claude).

---

## Architecture

### Multi-Model Pipeline (OpenRouter)

Different models for different tasks = optimal cost/quality balance:

| Task | Model | Why | Cost/1M tokens |
|------|-------|-----|----------------|
| **Outline Generation** | `openai/gpt-4o-mini` | Fast structure creation | $0.15 input / $0.60 output |
| **Main Content** | `anthropic/claude-3.5-sonnet` | Best educational content | $3 input / $15 output |
| **SEO Metadata** | `openai/gpt-4o-mini` | Quick, optimized for constraints | $0.15 input / $0.60 output |
| **FAQ Generation** | `anthropic/claude-3-5-haiku` | Great Q&A format | $0.80 input / $4 output |

**Estimated cost per page**: ~$0.08-0.12

---

## Files Created

### Core Types
- `src/lib/pseo-types.ts` - TypeScript interfaces for pSEO pages, FAQs, metadata

### Content Generation
- `scripts/generate-pseo-content.ts` - Main content generator using OpenRouter
  - Generates subject pages (Mathematics Grade 10, etc.)
  - Generates location pages (AI Tutor in Johannesburg, etc.)
  - Quality scoring and auto-approval (8+/10 = auto-publish)
  - Firestore storage

### Frontend
- `src/pages/PSEOPage.tsx` - Dynamic page template
  - Loads content from Firestore by slug
  - AEO-optimized with FAQ schema, quick answers
  - react-helmet-async for dynamic SEO metadata
  - Schema.org structured data

### Admin Interface
- `src/pages/admin/ContentReview.tsx` - Content management UI
  - Review pending pages
  - Approve/reject/delete
  - Quality score display
  - Preview pages

### Build Tools
- `scripts/generate-sitemap.ts` - Sitemap generator (reads from Firestore)
- `public/robots.txt` - Updated with AI bot permissions

---

## Setup & Configuration

### 1. Environment Variables

Add to `.env`:
```bash
# OpenRouter API (for content generation)
VITE_OPENROUTER_API_KEY=sk-or-v1-...

# Firebase (already configured)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 2. Firestore Collection

Collection: `pseo_pages`

**Indexes needed** (create in Firebase Console → Firestore → Indexes):
```
Collection: pseo_pages
- reviewStatus (Ascending) + createdAt (Descending)
- published (Ascending) + lastUpdated (Descending)
- pageType (Ascending) + qualityScore (Descending)
```

### 3. Install Dependencies

Already installed:
```bash
npm install react-helmet-async react-markdown
```

---

## Usage

### Generate Content

**Test run (5 pages):**
```bash
npm run pseo:test
```

**Generate all subject pages** (10 subjects × 5 grades = 50 pages):
```bash
npm run pseo:subjects
```

**Generate all location pages** (27 cities across 9 provinces):
```bash
npm run pseo:locations
```

**Custom generation:**
```bash
npm run generate:pseo -- --type=subject --limit=10
npm run generate:pseo -- --type=location --limit=5
```

### Review Content

1. Navigate to `/admin/content-review` (requires admin role)
2. Review pending pages (quality score < 8)
3. Approve good content (publishes to site)
4. Reject or regenerate poor content

### Generate Sitemap

After approving content:
```bash
npm run generate:sitemap
```

Generates:
- `public/sitemap.xml` - All published pages + static routes
- Updates `public/robots.txt` with AI bot permissions

### Deploy

```bash
npm run build
firebase deploy
```

---

## Content Structure

### Subject Pages

URL: `/mathematics-grade-10`

Structure:
1. **Quick Answer** (2-3 sentences) - Perfect for AI engines
2. **Detailed Topic Breakdown** - CAPS curriculum aligned
3. **Common Student Questions** (5 FAQs)
4. **Statistics** (pass rates, improvement data)
5. **Pricing Comparison** (traditional vs AI)
6. **How StudyBuddy Helps**
7. **Sources** (DBE, CAPS documents)

Schema.org: `Course`

### Location Pages

URL: `/ai-tutor-johannesburg`

Structure:
1. **Quick Answer** - Service overview
2. **About AI Tutoring in [City]** - Local context
3. **Subjects Available**
4. **Why [City] Students Choose StudyBuddy**
5. **FAQs** (local questions)
6. **Pricing**
7. **Getting Started**

Schema.org: `EducationalOrganization`

---

## AEO Optimization Features

### For ChatGPT/Perplexity/Claude

1. **Quick Answer Sections** - Direct responses extractable by AI
2. **FAQ Schema Markup** - Machine-readable Q&A format
3. **Citations** - Authoritative source links
4. **Structured Data** - JSON-LD for all pages
5. **Fresh Content** - Last updated dates
6. **Clear Headings** - H2/H3 structure for parsing

### robots.txt Permissions

Allows:
- `GPTBot` (ChatGPT)
- `PerplexityBot` (Perplexity AI)
- `ClaudeBot` (Anthropic)
- `ChatGPT-User` (ChatGPT browsing)

---

## Quality Control

### Auto-Approval Workflow

```typescript
Quality Score >= 8/10 → Auto-publish ✅
Quality Score 6-7/10 → Manual review ⚠️
Quality Score < 6/10 → Regenerate ❌
```

### Quality Scoring Criteria

AI evaluates content on:
- Accuracy and educational value (0-3)
- SEO optimization (0-2)
- AEO optimization (FAQ, citations) (0-2)
- Engagement and readability (0-2)
- South African context (0-1)

---

## Monitoring & Analytics

### Track Performance

1. **Google Search Console**
   - Submit sitemap: `https://studybuddyworks.com/sitemap.xml`
   - Monitor indexing status
   - Track keyword rankings

2. **AI Search Engine Citations**
   - Use `site:studybuddyworks.com` in ChatGPT
   - Check Perplexity citations
   - Monitor referral traffic from AI engines

3. **Firebase Analytics**
   - Page views by slug
   - Conversion rates (page → signup)
   - Bounce rates

### Key Metrics

**Month 1-2:**
- 350 pages indexed
- 50-100 organic visitors/day
- Rankings: positions 30-50

**Month 6:**
- 100+ keywords in top 10
- 800-1,200 visitors/day
- ~R5,000 MRR from SEO

**Month 12:**
- 500+ keywords in top 10
- 2,000-3,000 visitors/day
- ~R250,000 MRR from SEO

---

## Scaling Strategy

### Phase 1: Foundation (Week 1-2)
- ✅ Generate 50 subject pages
- ✅ Generate 27 location pages
- ✅ Submit sitemap to Google
- ✅ Review and approve high-quality content

### Phase 2: Expansion (Month 2-3)
- Generate comparison pages ("AI tutor vs traditional")
- Add IEB-specific pages
- Create grade-specific study guides
- Expand to 200+ pages

### Phase 3: Long-tail (Month 4-6)
- Topic-specific pages ("Linear equations help")
- School-specific pages
- Exam prep guides
- Reach 500+ pages

### Phase 4: Automation (Month 6+)
- Weekly trend-based content
- Automatic content refresh
- Competitor content gap analysis
- Scale to 2,000+ pages

---

## Cost Breakdown

### Content Generation (One-time)
- 350 pages × $0.10/page = $35
- Quality review time: 5 hours @ $50/hr = $250
- **Total**: ~$285

### Ongoing Costs (Monthly)
- OpenRouter API: $10-20 (new content, updates)
- Hosting (Vercel/Firebase): $0-20
- SEO tools (optional): $40-100
- **Total**: $50-140/month

### Expected ROI
- Month 12 revenue from SEO: R250,000 (~$13,500)
- Investment: $285 + ($100 × 12) = $1,485
- **ROI**: 9x in year 1

---

## Troubleshooting

### Pages not indexing

1. Check sitemap: `https://studybuddyworks.com/sitemap.xml`
2. Submit to Google Search Console
3. Verify robots.txt allows crawling
4. Check Firebase hosting rules

### Low quality scores

1. Review prompt templates in `generate-pseo-content.ts`
2. Adjust temperature (lower = more focused)
3. Add more specific CAPS curriculum context
4. Include more South African examples

### Content review backlog

1. Batch approve high-scoring pages:
   ```bash
   # In Firebase Console
   pseo_pages
   where qualityScore >= 8
   set reviewStatus = 'approved'
   set published = true
   ```

2. Prioritize by page type (subjects > locations)

---

## Next Steps

1. **Test generation** (5 pages):
   ```bash
   npm run pseo:test
   ```

2. **Review output** in Firebase Console → Firestore → `pseo_pages`

3. **Preview pages** at `http://localhost:5173/[slug]`

4. **Generate full batch**:
   ```bash
   npm run pseo:subjects
   npm run pseo:locations
   ```

5. **Review in admin panel**: `/admin/content-review`

6. **Generate sitemap**: `npm run generate:sitemap`

7. **Deploy**: `npm run build && firebase deploy`

8. **Submit to Google Search Console**

---

## Support & Maintenance

### Weekly Tasks
- Review new pending pages (if regenerating)
- Check Google Search Console for indexing issues
- Monitor keyword rankings

### Monthly Tasks
- Refresh top 20 pages (update statistics, dates)
- Generate new trending topic pages
- Analyze which pages drive most conversions

### Quarterly Tasks
- Full content audit (check for outdated info)
- Competitor analysis
- CAPS curriculum updates

---

**Questions?** Check the code comments in:
- `scripts/generate-pseo-content.ts` - Generation logic
- `src/pages/PSEOPage.tsx` - Template structure
- `src/lib/pseo-types.ts` - Data models

**Ready to rank #1 in South Africa! 🇿🇦🚀**
