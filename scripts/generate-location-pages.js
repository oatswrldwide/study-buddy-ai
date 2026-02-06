import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Read sitemap to get ALL location URLs
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Extract all /tutor/* URLs from sitemap
const locationUrlRegex = /<loc>https:\/\/studybuddy\.works\/tutor\/([^<]+)<\/loc>/g;
const locationSlugs = [];
let match;

while ((match = locationUrlRegex.exec(sitemapContent)) !== null) {
  // Remove trailing slash if present
  locationSlugs.push(match[1].replace(/\/$/, ''));
}

// Extract all /province/* URLs from sitemap
const provinceUrlRegex = /<loc>https:\/\/studybuddy\.works\/province\/([^<]+)<\/loc>/g;
const provinceSlugs = [];
let provinceMatch;

while ((provinceMatch = provinceUrlRegex.exec(sitemapContent)) !== null) {
  // Remove trailing slash if present
  provinceSlugs.push(provinceMatch[1].replace(/\/$/, ''));
}

// Extract all other page URLs (students, resources, locations, schools, etc.)
const pageUrlRegex = /<loc>https:\/\/studybuddy\.works\/([^<]+)<\/loc>/g;
const pageSlugs = [];
let pageMatch;

while ((pageMatch = pageUrlRegex.exec(sitemapContent)) !== null) {
  const slug = pageMatch[1].replace(/\/$/, '');
  // Skip tutor and province pages (already handled above)
  if (!slug.startsWith('tutor/') && !slug.startsWith('province/') && slug !== '') {
    pageSlugs.push(slug);
  }
}

console.log(`Generating ${locationSlugs.length} location pages, ${provinceSlugs.length} province pages, and ${pageSlugs.length} other pages from sitemap...`);

// Create tutor directory in dist
const tutorDir = path.join(__dirname, '../dist/tutor');
if (!fs.existsSync(tutorDir)) {
  fs.mkdirSync(tutorDir, {recursive: true });
}

// Generate an index.html for each location
let generated = 0;
let failed = 0;

for (const location of locationSlugs) {
  const locationDir = path.join(tutorDir, location);
  
  try {
    if (!fs.existsSync(locationDir)) {
      fs.mkdirSync(locationDir, { recursive: true });
    }
    
    // Write index.html (copy of main index.html)
    fs.writeFileSync(path.join(locationDir, 'index.html'), indexHtml);
    generated++;
  } catch (error) {
    console.error(`Failed to generate ${location}:`, error.message);
    failed++;
  }
}

console.log(`✓ Successfully generated ${generated} location pages`);
if (failed > 0) {
  console.log(`✗ Failed to generate ${failed} location pages`);
}
console.log(`  Located in: dist/tutor/[location]/index.html`);

// Generate province pages
const provinceDir = path.join(__dirname, '../dist/province');
if (!fs.existsSync(provinceDir)) {
  fs.mkdirSync(provinceDir, { recursive: true });
}

let provinceGenerated = 0;
let provinceFailed = 0;

for (const province of provinceSlugs) {
  const provDir = path.join(provinceDir, province);
  
  try {
    if (!fs.existsSync(provDir)) {
      fs.mkdirSync(provDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(provDir, 'index.html'), indexHtml);
    provinceGenerated++;
  } catch (error) {
    console.error(`Failed to generate province ${province}:`, error.message);
    provinceFailed++;
  }
}

console.log(`✓ Successfully generated ${provinceGenerated} province pages`);
if (provinceFailed > 0) {
  console.log(`✗ Failed to generate ${provinceFailed} province pages`);
}
console.log(`  Located in: dist/province/[province]/index.html`);

// Generate other pages (students, resources, locations, schools, etc.)
const distDir = path.join(__dirname, '../dist');
let pagesGenerated = 0;
let pagesFailed = 0;

for (const slug of pageSlugs) {
  const pageDir = path.join(distDir, slug);
  
  try {
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(pageDir, 'index.html'), indexHtml);
    pagesGenerated++;
  } catch (error) {
    console.error(`Failed to generate page ${slug}:`, error.message);
    pagesFailed++;
  }
}

console.log(`✓ Successfully generated ${pagesGenerated} other pages`);
if (pagesFailed > 0) {
  console.log(`✗ Failed to generate ${pagesFailed} other pages`);
}
console.log(`  Located in: dist/[page]/index.html`);
console.log(`\n🎉 Total: ${generated + provinceGenerated + pagesGenerated} pages generated`);
