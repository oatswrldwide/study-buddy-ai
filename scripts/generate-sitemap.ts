#!/usr/bin/env tsx
/**
 * Generate sitemap.xml for all pSEO pages and location pages
 * 
 * Reads from JSON files in public/pseo-data or pseo-output-conversion
 * AND from all location/province pages
 * 
 * Usage:
 *   npm run generate:sitemap
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://studybuddy.works';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Static pages with manual configuration
 */
const staticPages: SitemapEntry[] = [
  {
    url: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: '/schools',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    url: '/students',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    url: '/locations',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
  },
];

/**
 * Generate sitemap XML
 */
function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries.map((entry) => `  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Determine priority based on page type
 */
function calculatePriority(slug: string): number {
  // Homepage and main landing pages = 1.0 (already in static)
  
  // High-value pages
  if (slug.includes('grade-12') || slug.includes('grade-11')) return 0.8; // Matric focus
  if (slug.includes('johannesburg') || slug.includes('cape-town') || slug.includes('durban')) return 0.7; // Major cities
  if (slug.includes('mathematics') || slug.includes('physical-sciences')) return 0.7; // Popular subjects
  
  // Medium-value pages
  if (slug.includes('grade-10')) return 0.6;
  if (slug.includes('grade-8') || slug.includes('grade-9')) return 0.5;
  
  // Standard pages
  return 0.5;
}

/**
 * Determine update frequency
 */
function calculateChangeFreq(slug: string): SitemapEntry['changefreq'] {
  if (slug.includes('comparison') || slug.includes('vs')) return 'monthly'; // Comparison pages
  if (slug.includes('tutoring') && slug.includes('grade')) return 'weekly'; // Subject pages
  return 'monthly';
}

/**
 * Main execution
 */
async function main() {
  console.log('🗺️  StudyBuddy Sitemap Generator\n');
  console.log('─'.repeat(60) + '\n');

  try {
    const entries: SitemapEntry[] = [...staticPages];
    const lastmod = new Date().toISOString().split('T')[0];

    // Add location-based pages
    console.log('📍 Adding location-based pages...\n');
    
    // Import location data
    const locationsPath = path.join(process.cwd(), 'src/data/southAfricaLocations.ts');
    if (fs.existsSync(locationsPath)) {
      // Read and parse the TypeScript file to extract location data
      const locationFileContent = fs.readFileSync(locationsPath, 'utf-8');
      
      // Extract all location slugs
      const locationMatches = locationFileContent.matchAll(/slug: "([^"]+)"/g);
      const locationSlugs = Array.from(locationMatches).map(match => match[1]);
      
      // Extract province slugs
      const provinceMatches = locationFileContent.matchAll(/slug: "([a-z-]+)",\s*capital:/g);
      const provinceSlugs = Array.from(provinceMatches).map(match => match[1]);
      
      // Major cities get higher priority
      const majorCities = ['johannesburg', 'cape-town', 'durban', 'pretoria', 'port-elizabeth', 'bloemfontein'];
      
      // Add all location pages
      locationSlugs.forEach(slug => {
        const isMajorCity = majorCities.includes(slug);
        entries.push({
          url: `/tutor/${slug}`,
          lastmod,
          changefreq: 'monthly',
          priority: isMajorCity ? 0.8 : 0.6,
        });
      });
      
      // Add all province pages
      provinceSlugs.forEach(slug => {
        entries.push({
          url: `/province/${slug}`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.7,
        });
      });
      
      console.log(`   ✅ Added ${locationSlugs.length} location pages`);
      console.log(`   ✅ Added ${provinceSlugs.length} province pages\n`);
    } else {
      console.log('   ⚠️  Location data not found, skipping location pages\n');
    }

    // Check for JSON files in possible directories
    const possibleDirs = ['./public/pseo-data', './pseo-output-conversion'];
    let jsonDir = '';
    
    for (const dir of possibleDirs) {
      if (fs.existsSync(dir)) {
        jsonDir = dir;
        break;
      }
    }
    
    if (!jsonDir) {
      console.log('⚠️  No pSEO content directory found');
      console.log('   Creating sitemap with static and location pages only\n');
      const sitemap = generateSitemapXML(entries);
      fs.writeFileSync('./public/sitemap.xml', sitemap);
      console.log('✅ Sitemap generated: public/sitemap.xml');
      console.log(`📊 Total URLs: ${entries.length}\n`);
      return;
    }
    
    console.log(`📂 Reading from: ${jsonDir}\n`);
    
    const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
    console.log(`📄 Found ${files.length} pSEO pages\n`);
    
    // Process each JSON file
    files.forEach(file => {
      try {
        const filePath = path.join(jsonDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        if (!data.published) return; // Skip unpublished pages
        
        // Extract slug (remove prefix)
        const slug = data.slug || file.replace('.json', '').replace(/^(pain|comp|price|subject|location|exam|suburb)-/, '');
        
        // Determine priority based on page type
        let priority = 0.7;
        if (data.pageType === 'pain-point') priority = 0.9;
        if (data.pageType === 'pricing') priority = 0.95;
        if (data.pageType === 'comparison') priority = 0.85;
        if (data.pageType === 'exam-prep') priority = 0.8;
        
        const lastmod = data.lastUpdated ? data.lastUpdated.split('T')[0] : new Date().toISOString().split('T')[0];
        
        entries.push({
          url: `/${slug}`,
          lastmod,
          changefreq: 'weekly',
          priority,
        });
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
      }
    });
    
    console.log(`📊 Priority breakdown:`);
    const priorityCounts = entries.reduce((acc, e) => {
      const p = e.priority.toFixed(1);
      acc[p] = (acc[p] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(priorityCounts)
      .sort(([a], [b]) => parseFloat(b) - parseFloat(a))
      .forEach(([priority, count]) => {
        console.log(`   Priority ${priority}: ${count} pages`);
      });
    
    console.log();
    
    // Generate and save sitemap
    const sitemap = generateSitemapXML(entries);
    fs.writeFileSync('./public/sitemap.xml', sitemap);
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: public/sitemap.xml`);
    console.log(`🌐 Base URL: ${BASE_URL}`);
    console.log(`📊 Total URLs: ${entries.length}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Location pages: ~${entries.filter(e => e.url.startsWith('/tutor/')).length}`);
    console.log(`   - Province pages: ~${entries.filter(e => e.url.startsWith('/province/')).length}`);
    console.log(`   - pSEO pages: ${entries.length - staticPages.length - entries.filter(e => e.url.startsWith('/tutor/') || e.url.startsWith('/province/')).length}`);
    console.log();
    console.log('📤 Next step: Submit to Google Search Console');
    console.log('   https://search.google.com/search-console');
    console.log();
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
