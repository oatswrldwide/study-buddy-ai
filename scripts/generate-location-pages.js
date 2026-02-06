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
  locationSlugs.push(match[1]);
}

console.log(`Generating ${locationSlugs.length} location pages from sitemap...`);

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
