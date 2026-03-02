/**
 * Split large sitemap into organized, category-based sitemaps
 * Creates a sitemap index file for better SEO and crawl efficiency
 */

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../public');
const sitemapPath = path.join(distPath, 'sitemap.xml');

console.log('🗂️  Starting sitemap optimization...\n');

// Read the main sitemap
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ sitemap.xml not found');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Extract all URLs with their metadata
const urlRegex = /<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>\s*<changefreq>(.*?)<\/changefreq>\s*<priority>(.*?)<\/priority>\s*<\/url>/gs;
const urls = [];
let match;

while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push({
    loc: match[1],
    lastmod: match[2],
    changefreq: match[3],
    priority: match[4]
  });
}

console.log(`📊 Found ${urls.length} URLs in main sitemap\n`);

// Categorize URLs
const categories = {
  main: [],
  locations: [],
  provinces: [],
  bursaries: [],
  courses: [],
  universities: [],
  tutoring: [],
  exam_help: [],
  study_guides: [],
  tools: [],
  other: []
};

urls.forEach(url => {
  const path = url.loc.replace('https://studybuddy.works/', '');
  
  if (!path || path === 'https://studybuddy.works/') {
    categories.main.push(url);
  } else if (path.startsWith('tutor/')) {
    categories.locations.push(url);
  } else if (path.startsWith('province/')) {
    categories.provinces.push(url);
  } else if (path.startsWith('bursaries/')) {
    categories.bursaries.push(url);
  } else if (path.startsWith('courses/')) {
    categories.courses.push(url);
  } else if (
    path.includes('university') || 
    path.includes('blackboard') ||
    path.includes('application') ||
    path.includes('registration') ||
    path.includes('-aps-') ||
    path.includes('wits') ||
    path.includes('uct') ||
    path.includes('ukzn') ||
    path.includes('unisa')
  ) {
    categories.universities.push(url);
  } else if (
    path.includes('tutor') ||
    path.includes('tutoring') ||
    path.includes('weekend-') ||
    path.includes('-tutor-')
  ) {
    categories.tutoring.push(url);
  } else if (
    path.includes('urgent-') ||
    path.includes('help-tonight') ||
    path.includes('help-now') ||
    path.includes('last-minute') ||
    path.includes('struggling-with')
  ) {
    categories.exam_help.push(url);
  } else if (
    path.includes('exam-tips') ||
    path.includes('study-guide') ||
    path.includes('past-papers') ||
    path.includes('how-to-') ||
    path.includes('exam-revision')
  ) {
    categories.study_guides.push(url);
  } else if (
    path.includes('turnitin') ||
    path.includes('ai-detector') ||
    path.includes('ai-humanizer') ||
    path.includes('chatgpt') ||
    path.includes('gemini') ||
    path.includes('deepseek') ||
    path.includes('aps-calculator')
  ) {
    categories.tools.push(url);
  } else {
    categories.other.push(url);
  }
});

// Generate individual sitemap files
function generateSitemap(name, urls) {
  if (urls.length === 0) return null;
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  
  const filename = `sitemap-${name}.xml`;
  const filepath = path.join(distPath, filename);
  fs.writeFileSync(filepath, xml);
  
  console.log(`✓ Generated ${filename} (${urls.length} URLs)`);
  return filename;
}

const generatedSitemaps = [];

// Generate all category sitemaps
Object.entries(categories).forEach(([name, urls]) => {
  if (urls.length > 0) {
    const filename = generateSitemap(name, urls);
    if (filename) {
      generatedSitemaps.push({
        name: filename,
        count: urls.length
      });
    }
  }
});

// Generate sitemap index
let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

generatedSitemaps.forEach(sitemap => {
  indexXml += '  <sitemap>\n';
  indexXml += `    <loc>https://studybuddy.works/${sitemap.name}</loc>\n`;
  indexXml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  indexXml += '  </sitemap>\n';
});

indexXml += '</sitemapindex>\n';

// Backup original sitemap
fs.copyFileSync(sitemapPath, path.join(distPath, 'sitemap-backup.xml'));
console.log('\n💾 Backed up original sitemap to sitemap-backup.xml');

// Write new sitemap index
fs.writeFileSync(path.join(distPath, 'sitemap.xml'), indexXml);
console.log('✓ Generated sitemap.xml (index file)');

console.log('\n📊 Summary:');
console.log('━'.repeat(50));
generatedSitemaps.forEach(sitemap => {
  console.log(`  ${sitemap.name.padEnd(35)} ${sitemap.count.toString().padStart(4)} URLs`);
});
console.log('━'.repeat(50));
console.log(`  Total: ${urls.length} URLs across ${generatedSitemaps.length} sitemaps\n`);

console.log('✅ Sitemap optimization complete!');
console.log('📝 Update robots.txt to reference the new sitemap structure\n');
