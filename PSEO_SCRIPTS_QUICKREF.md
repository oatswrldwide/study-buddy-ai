# PSEO Scripts Quick Reference

## Available Commands

### 📊 Status & Analysis
```bash
npm run pseo:status          # Check what needs to be generated
```

### 🎯 Generate High-Conversion Pages
```bash
npm run pseo:comparisons     # Generate 6 comparison pages (25-35% conversion)
npm run pseo:pricing         # Generate 9 pricing pages (22-30% conversion)
npm run pseo:pain-points     # Generate pain-point pages, batch of 20 (15-20% conversion)
```

### 📝 Generate Other Page Types  
```bash
npm run pseo:subjects        # Generate subject pages
npm run pseo:locations       # Generate location pages
npm run pseo:test            # Test generation (5 pages)
```

### 🔄 Sync & Deploy
```bash
npm run pseo:sync            # Sync pages to public/pseo-data/
npm run generate:sitemap     # Generate sitemap.xml
```

### 🛠️ Advanced
```bash
# Generate specific type with custom limit
npx tsx scripts/generate-all-remaining-pseo.ts --generate --type=comparison --limit=10

# Generate highest priority pages
npx tsx scripts/generate-all-remaining-pseo.ts --generate --limit=20
```

## Recommended Workflow

1. **Check status**: `npm run pseo:status`
2. **Generate high-conversion pages first**: 
   - `npm run pseo:comparisons`
   - `npm run pseo:pricing`
3. **Sync to public**: `npm run pseo:sync`
4. **Generate sitemap**: `npm run generate:sitemap`
5. **Deploy**: `npm run build && firebase deploy`

## Prerequisites

- Groq API key in `.env`: `VITE_GROQ_API_KEY=your_key_here`
- Get free key: https://console.groq.com/keys

## Documentation

See `PSEO_COMPLETION_GUIDE.md` for full details.
