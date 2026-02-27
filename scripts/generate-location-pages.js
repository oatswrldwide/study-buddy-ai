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

// Path to PSEO data directory (relative to repo root)
const pseoDataDir = path.join(__dirname, '../public/pseo-data');

// Maximum length for auto-generated meta descriptions
const MAX_DESCRIPTION_LENGTH = 160;

// Helper function to escape special characters in HTML attributes
function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Helper function to escape special characters in HTML text nodes
function escapeHtmlText(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Build pre-rendered article HTML from PSEO JSON data
function buildPrerenderedContent(pseoData) {
  const title = pseoData.metaTitle || pseoData.title || '';
  const description = pseoData.metaDescription || '';
  const quickAnswer = pseoData.quickAnswer || '';
  const content = pseoData.content || '';
  const faqs = pseoData.faqs || [];

  let html = `<article>`;
  html += `<h1>${escapeHtmlText(title)}</h1>`;
  if (description) {
    html += `<p>${escapeHtmlText(description)}</p>`;
  }
  if (quickAnswer && quickAnswer !== content) {
    html += `<div><strong>Quick Answer:</strong> ${escapeHtmlText(quickAnswer)}</div>`;
  }
  if (content) {
    // content is already HTML from trusted static JSON files — injected as-is
    // so that heading/table/list markup renders correctly for crawlers.
    html += `<div>${content}</div>`;
  }
  if (faqs.length > 0) {
    html += `<section><h2>Frequently Asked Questions</h2>`;
    for (const faq of faqs) {
      html += `<div><h3>${escapeHtmlText(faq.question)}</h3><p>${escapeHtmlText(faq.answer)}</p></div>`;
    }
    html += `</section>`;
  }
  html += `</article>`;
  return html;
}

// Helper function to create page-specific HTML with correct canonical and meta tags
function customizeHtmlForPage(html, slug, title, description) {
  const canonicalUrl = `https://studybuddy.works/${slug}`;
  return html
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
}

console.log(`Generating ${locationSlugs.length} location pages, ${provinceSlugs.length} province pages, and ${pageSlugs.length} other pages from sitemap...`);

// Static metadata for known app pages that don't have PSEO JSON files
const STATIC_PAGE_META = {
  'courses': {
    title: 'University Course Requirements South Africa 2025 | APS Scores & Fees Compared',
    description: 'Compare APS score requirements and university fees for the most popular courses in South Africa — Medicine, Engineering, Law, Accounting, IT, Education and more. Free APS calculator included.',
  },
  'courses/medicine': {
    title: 'MBChB Medicine Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare Medicine (MBChB) APS requirements and university fees at UCT, Wits, UP, Stellenbosch, UKZN and more. APS range: 36–40. Includes career info and bursaries.',
  },
  'courses/engineering': {
    title: 'Engineering Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BEng / BSc Engineering APS requirements and fees at South African universities. APS range: 30–40. Includes civil, mechanical, electrical and more.',
  },
  'courses/law': {
    title: 'LLB Law Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare LLB Law APS requirements and fees at UCT, Wits, UP, UFS, NMU and more South African universities. APS range: 28–38.',
  },
  'courses/bcom-accounting': {
    title: 'BCom Accounting Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BCom Accounting APS requirements and fees at South African universities. APS range: 26–38. Pathway to CA(SA) and other accounting careers.',
  },
  'courses/computer-science': {
    title: 'Computer Science Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BSc Computer Science APS requirements and fees at UCT, Wits, UP, Stellenbosch and more. APS range: 28–38. Includes IT and software engineering.',
  },
  'courses/education': {
    title: 'BEd Education Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BEd Education APS requirements and fees at South African universities. APS range: 24–34. Includes Foundation Phase, Intermediate Phase and FET.',
  },
  'courses/nursing': {
    title: 'BNurs Nursing Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BNurs Nursing APS requirements and fees at South African universities. APS range: 25–32. Includes midwifery and community nursing.',
  },
  'courses/architecture': {
    title: 'Architecture Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BArch / BSc Architecture APS requirements and fees at UCT, Wits, UP, TUT and more South African universities. APS range: 30–38.',
  },
  'courses/psychology': {
    title: 'Psychology Requirements 2025 | APS Scores & Fees at SA Universities',
    description: 'Compare BA / BSc Psychology APS requirements and fees at South African universities. APS range: 26–36. Includes clinical, counselling and educational psychology.',
  },
  'apply': {
    title: 'How to Apply to South African Universities 2026 | Complete Guide',
    description: 'Find application guides, APS requirements and deadlines for all major South African universities. UCT, Wits, UP, Stellenbosch, UKZN and more.',
  },
};

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

    // Try to load PSEO JSON metadata for article pages
    const pseoJsonPath = path.join(pseoDataDir, `${slug}.json`);
    let customHtml;

    if (fs.existsSync(pseoJsonPath)) {
      try {
        const pseoData = JSON.parse(fs.readFileSync(pseoJsonPath, 'utf-8'));
        const title = pseoData.metaTitle || pseoData.title || slug;
        const description = pseoData.metaDescription || pseoData.content?.slice(0, MAX_DESCRIPTION_LENGTH) || '';
        // Set meta tags and inject pre-rendered article content so Google can
        // index the page content even before JavaScript executes.
        const prerendered = buildPrerenderedContent(pseoData);
        customHtml = customizeHtmlForPage(indexHtml, slug, title, description)
          .replace('<div id="root"></div>', `<div id="root">${prerendered}</div>`);
      } catch (error) {
        console.warn(`Failed to parse PSEO data for ${slug}:`, error.message);
        customHtml = customizeHtmlForPage(indexHtml, slug,
          slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' | StudyBuddy Works',
          'CAPS-aligned AI tutoring for South African students.');
      }
    } else {
      // For known static pages, use page-specific meta if available, else canonical URL only
      const staticMeta = STATIC_PAGE_META[slug];
      customHtml = customizeHtmlForPage(indexHtml, slug,
        staticMeta ? staticMeta.title : 'StudyBuddy Works - AI-Powered Learning Platform for Schools',
        staticMeta ? staticMeta.description : 'Monitor and guide AI usage in education. Schools get dashboards, teachers get insights, students get an AI tutor. Transform learning outcomes with responsible AI.');
    }

    fs.writeFileSync(path.join(pageDir, 'index.html'), customHtml);
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
