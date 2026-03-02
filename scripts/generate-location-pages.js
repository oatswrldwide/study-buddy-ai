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
  const safeTitle = escapeHtmlAttr(title);
  const safeDesc = escapeHtmlAttr(description);
  return html
    .replace(/<title>.*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/(<meta name="title" content=").*?(")/, `$1${safeTitle}$2`)
    .replace(/(<meta name="description" content=").*?(")/, `$1${safeDesc}$2`)
    .replace(/(<meta property="og:title" content=").*?(")/, `$1${safeTitle}$2`)
    .replace(/(<meta property="og:description" content=").*?(")/, `$1${safeDesc}$2`)
    .replace(/(<meta property="twitter:title" content=").*?(")/, `$1${safeTitle}$2`)
    .replace(/(<meta property="twitter:description" content=").*?(")/, `$1${safeDesc}$2`)
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
  'resources': {
    title: 'Study Resources & Guides | StudyBuddy Works',
    description: 'Free study guides, exam tips and resources for South African matric students. CAPS-aligned content for Grades 10, 11 and 12.',
  },
  'about': {
    title: 'About StudyBuddy Works | AI Tutoring for South African Students',
    description: 'StudyBuddy Works is a CAPS-aligned AI tutoring platform helping South African students in Grades 10–12 get 24/7 homework help and exam preparation.',
  },
  'how-it-works': {
    title: 'How StudyBuddy Works | AI Tutoring Explained',
    description: 'See how StudyBuddy\'s AI tutoring platform works for South African students. Get step-by-step homework help, exam prep, and 24/7 support for all CAPS subjects.',
  },
  'aps-calculator': {
    title: 'APS Calculator 2026 | Calculate Your Admission Point Score',
    description: 'Free APS calculator for South African students. Enter your matric marks and instantly calculate your Admission Point Score for university applications.',
  },
  'university-status-2026': {
    title: 'University Application Status 2026 | Track Your SA University Application',
    description: 'Track your 2026 university application status at UCT, Wits, UP, Stellenbosch, UKZN and all major South African universities. Know where you stand.',
  },
  'university-prospectus-2026': {
    title: 'University Prospectus 2026 | SA University Guides & Course Info',
    description: 'Browse the 2026 prospectus for all major South African universities. Compare courses, APS requirements, fees and application deadlines.',
  },
  'high-school-scholarships': {
    title: 'High School Scholarships South Africa 2026 | Bursaries for Grade 8–12',
    description: 'Find high school scholarships and bursaries available to South African students in Grades 8–12. Private school funding, merit awards and needs-based support.',
  },
  'tvet-colleges': {
    title: 'TVET Colleges South Africa 2026 | Courses, Requirements & Applications',
    description: 'Explore TVET colleges in South Africa. Find N-courses, NCV programmes, application requirements and career paths at technical and vocational colleges.',
  },
  'bursaries/universities': {
    title: 'University Bursaries South Africa 2026 | Funding by University',
    description: 'Find bursary and financial aid opportunities at South African universities. UCT, Wits, UP, Stellenbosch, UKZN and more. Applications, eligibility and deadlines.',
  },
  'bursaries/university/uct': {
    title: 'UCT Bursaries & Financial Aid 2026 | University of Cape Town Funding',
    description: 'Find bursaries, scholarships and financial aid at the University of Cape Town (UCT). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/wits': {
    title: 'Wits Bursaries & Financial Aid 2026 | University of the Witwatersrand Funding',
    description: 'Find bursaries, scholarships and financial aid at Wits University. Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/stellenbosch': {
    title: 'Stellenbosch University Bursaries 2026 | SU Financial Aid & Scholarships',
    description: 'Find bursaries, scholarships and financial aid at Stellenbosch University (SU). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/up': {
    title: 'University of Pretoria Bursaries 2026 | UP Financial Aid & Scholarships',
    description: 'Find bursaries, scholarships and financial aid at the University of Pretoria (UP). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/ukzn': {
    title: 'UKZN Bursaries & Financial Aid 2026 | University of KwaZulu-Natal Funding',
    description: 'Find bursaries, scholarships and financial aid at UKZN. Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/uj': {
    title: 'UJ Bursaries & Financial Aid 2026 | University of Johannesburg Funding',
    description: 'Find bursaries, scholarships and financial aid at the University of Johannesburg (UJ). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/unisa': {
    title: 'UNISA Bursaries & Financial Aid 2026 | University of South Africa Funding',
    description: 'Find bursaries, scholarships and financial aid at UNISA. Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/nwu': {
    title: 'NWU Bursaries & Financial Aid 2026 | North-West University Funding',
    description: 'Find bursaries, scholarships and financial aid at North-West University (NWU). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/rhodes': {
    title: 'Rhodes University Bursaries 2026 | Financial Aid & Scholarships',
    description: 'Find bursaries, scholarships and financial aid at Rhodes University. Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/ufs': {
    title: 'UFS Bursaries & Financial Aid 2026 | University of the Free State Funding',
    description: 'Find bursaries, scholarships and financial aid at the University of the Free State (UFS). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/uwc': {
    title: 'UWC Bursaries & Financial Aid 2026 | University of the Western Cape Funding',
    description: 'Find bursaries, scholarships and financial aid at the University of the Western Cape (UWC). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/nmu': {
    title: 'NMU Bursaries & Financial Aid 2026 | Nelson Mandela University Funding',
    description: 'Find bursaries, scholarships and financial aid at Nelson Mandela University (NMU). Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/cput': {
    title: 'CPUT Bursaries & Financial Aid 2026 | Cape Peninsula University of Technology Funding',
    description: 'Find bursaries, scholarships and financial aid at CPUT. Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/tut': {
    title: 'TUT Bursaries & Financial Aid 2026 | Tshwane University of Technology Funding',
    description: 'Find bursaries, scholarships and financial aid at TUT. Eligibility criteria, application deadlines and funding amounts.',
  },
  'bursaries/university/dut': {
    title: 'DUT Bursaries & Financial Aid 2026 | Durban University of Technology Funding',
    description: 'Find bursaries, scholarships and financial aid at DUT. Eligibility criteria, application deadlines and funding amounts.',
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
  try {
    // Write customized HTML for this location as a .html file so GitHub Pages
    // serves it at /tutor/{location} (200 OK) instead of causing a 301
    // redirect from /tutor/{location} to /tutor/{location}/.
    const locationFile = path.join(tutorDir, location + '.html');
    const locationParentDir = path.dirname(locationFile);
    if (!fs.existsSync(locationParentDir)) {
      fs.mkdirSync(locationParentDir, { recursive: true });
    }
    const customHtml = customizeHtmlForLocation(indexHtml, location, 'tutor');
    fs.writeFileSync(locationFile, customHtml);
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
console.log(`  Located in: dist/tutor/[location].html`);

// Generate province pages
const provinceDir = path.join(__dirname, '../dist/province');
if (!fs.existsSync(provinceDir)) {
  fs.mkdirSync(provinceDir, { recursive: true });
}

let provinceGenerated = 0;
let provinceFailed = 0;

for (const province of provinceSlugs) {
  try {
    // Write as a .html file so GitHub Pages serves it at /province/{province}
    // (200 OK) without a 301 trailing-slash redirect.
    const provFile = path.join(provinceDir, province + '.html');
    const provParentDir = path.dirname(provFile);
    if (!fs.existsSync(provParentDir)) {
      fs.mkdirSync(provParentDir, { recursive: true });
    }
    const customHtml = customizeHtmlForLocation(indexHtml, province, 'province');
    fs.writeFileSync(provFile, customHtml);
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
console.log(`  Located in: dist/province/[province].html`);

// Generate other pages (students, resources, locations, schools, etc.)
const distDir = path.join(__dirname, '../dist');
let pagesGenerated = 0;
let pagesFailed = 0;

for (const slug of pageSlugs) {
  // Write as a .html file so GitHub Pages serves /slug with a 200 OK instead
  // of a 301 redirect from /slug to /slug/ (directory-index redirect).
  const pageFile = path.join(distDir, slug + '.html');

  try {
    const parentDir = path.dirname(pageFile);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    // Try to load PSEO JSON metadata for article pages
    const pseoJsonPath = path.join(pseoDataDir, `${slug}.json`);
    let customHtml;

    if (fs.existsSync(pseoJsonPath)) {
      try {
        const pseoData = JSON.parse(fs.readFileSync(pseoJsonPath, 'utf-8'));
        // Skip unpublished pages to prevent serving pre-rendered content for pages
        // that return 404 in the React app (cloaking).
        if (!pseoData.published) {
          console.warn(`Skipping unpublished page: ${slug}`);
          continue;
        }
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

    fs.writeFileSync(pageFile, customHtml);
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
console.log(`  Located in: dist/[page].html`);
console.log(`\n🎉 Total: ${generated + provinceGenerated + pagesGenerated} pages generated`);
