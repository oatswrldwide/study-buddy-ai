import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built index.html
const indexPath = path.join(__dirname, '../dist/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Remove the SPA redirect handler from the template
// This prevents redirect errors in Google Search Console
indexHtml = indexHtml.replace(
  /<!-- GitHub Pages SPA redirect handler -->[\s\S]*?<\/script>/,
  '<!-- Static page - no redirect needed -->'
);

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

// Helper function to create location-specific HTML
function customizeHtmlForLocation(html, slug, type = 'tutor') {
  // Format the location name from slug (e.g., "cape-town" -> "Cape Town")
  const locationName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const title = type === 'tutor' 
    ? `AI Tutor in ${locationName} | StudyBuddy Works - CAPS Curriculum Support`
    : `AI Tutoring in ${locationName} | StudyBuddy Works`;
    
  const description = type === 'tutor'
    ? `Get personalized, CAPS-aligned AI tutoring in ${locationName}. 24/7 homework help, exam preparation, and subject support for R99/month. Try free!`
    : `Find AI tutoring services across ${locationName}. CAPS-aligned learning support for all students.`;
    
  const canonicalUrl = `https://studybuddy.works/${type}/${slug}`;
  
  // Replace generic meta tags with location-specific ones
  let customHtml = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="title" content=").*?(")/, `$1${title}$2`)
    .replace(/(<meta name="description" content=").*?(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=").*?(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=").*?(")/, `$1${description}$2`)
    .replace(/(<meta property="twitter:title" content=").*?(")/, `$1${title}$2`)
    .replace(/(<meta property="twitter:description" content=").*?(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=").*?(")/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="og:url" content=").*?(")/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="twitter:url" content=").*?(")/, `$1${canonicalUrl}$2`);
  
  return customHtml;
}

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
    
    // Write customized index.html for this location
    const customHtml = customizeHtmlForLocation(indexHtml, location, 'tutor');
    fs.writeFileSync(path.join(locationDir, 'index.html'), customHtml);
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
    
    // Write customized index.html for this province
    const customHtml = customizeHtmlForLocation(indexHtml, province, 'province');
    fs.writeFileSync(path.join(provDir, 'index.html'), customHtml);
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
    
    // For regular pages, just use the base HTML without redirect handler
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
