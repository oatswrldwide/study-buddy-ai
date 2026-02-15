# OG Image Guide for StudyBuddy Works

## Current Status
✅ **Temporary SVG placeholder created** at `/public/og-image.svg`

This SVG is functional but should be replaced with a professional PNG image for best social media appearance.

## What You Need

### Image Specifications
- **Dimensions:** 1200 x 630 pixels (exactly)
- **Format:** PNG or JPG (PNG preferred)
- **File size:** Under 1MB (ideally 300-500KB)
- **File name:** `og-image.png`
- **Location:** `/public/og-image.png`

### Design Requirements

**Must Include:**
1. **StudyBuddy Works logo** - prominently displayed
2. **Tagline** - "AI-Powered CAPS Tutoring for South Africa" or similar
3. **Key value proposition** - e.g., "R99/Month • 24/7 Help • All Subjects"
4. **Brand colors** - Amber/Orange (#f59e0b) and complementary colors
5. **Readable text** - Visible at small sizes (Facebook feeds)

**Design Tips:**
- Use high contrast for text readability
- Keep important content in the center (safe zone)
- Avoid edges - some platforms crop
- Test on dark and light backgrounds
- Include visual elements (icons, illustrations)

## Design Tools

### Option 1: Use Canva (Easiest)
1. Go to canva.com
2. Search for "Facebook Post" template (1200x630)
3. Customize with your brand elements
4. Download as PNG
5. Save to `/public/og-image.png`

### Option 2: Use Figma (Professional)
1. Create 1200x630 artboard
2. Design using brand guidelines
3. Export as PNG @1x
4. Optimize with TinyPNG.com
5. Save to `/public/og-image.png`

### Option 3: Hire Designer
- Budget: R500-R2000 for professional design
- Platforms: Fiverr, Upwork, local designers
- Provide brand guidelines and examples

## Current Placeholder Content

The SVG placeholder includes:
- StudyBuddy Works branding
- "AI-Powered CAPS Tutoring for South Africa" tagline
- Three key features with checkmarks
- "Try Free for 7 Days" CTA
- Brand colors (amber/orange theme)

## After Creating Your PNG

1. **Save the file:**
   ```bash
   /public/og-image.png
   ```

2. **Update index.html:**
   Replace `.svg` with `.png` in these lines:
   ```html
   <meta property="og:image" content="https://studybuddy.works/og-image.png" />
   <meta property="twitter:image" content="https://studybuddy.works/og-image.png" />
   ```

3. **Test the image:**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

4. **Commit and deploy:**
   ```bash
   git add public/og-image.png
   git commit -m "Add professional OG image"
   git push
   ```

## Testing Your OG Image

### Facebook
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: https://studybuddy.works
3. Click "Scrape Again" to refresh cache
4. Check preview

### Twitter
1. Go to: https://cards-dev.twitter.com/validator
2. Enter: https://studybuddy.works
3. Check preview

### LinkedIn
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter: https://studybuddy.works
3. Check preview

## Examples for Inspiration

Search for "EdTech OG images" or look at:
- Duolingo's social preview
- Khan Academy's social preview
- Coursera's social preview
- Local SA EdTech companies

## Common Mistakes to Avoid

❌ Text too small  
❌ Important content near edges  
❌ Low contrast colors  
❌ Too much text/clutter  
❌ Wrong dimensions  
❌ File too large (over 1MB)  
❌ File not optimized

## Optimization Tools

After creating your PNG, optimize it:
- **TinyPNG:** https://tinypng.com (easy, free)
- **Squoosh:** https://squoosh.app (advanced)
- **ImageOptim:** https://imageoptim.com (Mac app)

## Need Help?

The current SVG will work fine for now and provides basic branding. You can replace it later when you have resources for professional design.

---

**Priority:** Medium (works with SVG, better with PNG)  
**Time to complete:** 1-2 hours with Canva, or 1-2 days with designer
