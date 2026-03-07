/**
 * Static HTML generator for key landing pages
 * Generates SEO-friendly static HTML without requiring Puppeteer
 */

const fs = require('fs');
const path = require('path');

// Read the base HTML template
const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

// Define pages with their SEO content
const pages = [
  {
    path: '',
    title: 'StudyBuddy Works - AI-Powered Learning Platform for Schools',
    description: 'Monitor and guide AI usage in education. Schools get dashboards, teachers get insights, students get an AI tutor.',
    h1: 'AI-Powered Learning Platform',
    content: `
      <div class="min-h-screen bg-white">
        <main class="container mx-auto px-4 py-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">AI-Powered Learning Platform</h1>
          <p class="text-xl text-gray-600 mb-8">Transform education with responsible AI. Monitor usage, gain insights, and provide 24/7 tutoring support.</p>
          <div class="grid md:grid-cols-3 gap-8 mt-12">
            <div><h2 class="text-xl font-semibold mb-3">For Schools</h2><p>Comprehensive AI monitoring and control</p></div>
            <div><h2 class="text-xl font-semibold mb-3">For Teachers</h2><p>Student progress tracking and insights</p></div>
            <div><h2 class="text-xl font-semibold mb-3">For Students</h2><p>24/7 CAPS-aligned AI tutoring</p></div>
          </div>
        </main>
      </div>
    `
  },
  {
    path: 'schools',
    title: 'AI Learning Platform for Schools | StudyBuddy Works',
    description: 'Monitor and guide AI usage in your school. Comprehensive dashboards, teacher insights, and responsible AI tutoring for students. Trusted by South African schools.',
    h1: 'AI-Powered Learning Platform for Schools',
    content: `
      <div class="min-h-screen bg-white">
        <main class="container mx-auto px-4 py-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">AI-Powered Learning Platform for Schools</h1>
          <p class="text-xl text-gray-600 mb-8">Monitor and guide AI usage in education. Schools get dashboards, teachers get insights, students get an AI tutor.</p>
          <div class="grid md:grid-cols-3 gap-8 mt-12">
            <div><h3 class="text-xl font-semibold mb-3">School Dashboard</h3><p>Monitor AI usage across your institution</p></div>
            <div><h3 class="text-xl font-semibold mb-3">Teacher Insights</h3><p>Track student progress and engagement</p></div>
            <div><h3 class="text-xl font-semibold mb-3">AI Tutoring</h3><p>24/7 CAPS-aligned homework help</p></div>
          </div>
        </main>
      </div>
    `
  },
  {
    path: 'students',
    title: 'AI Tutor for South African Students | StudyBuddy Works',
    description: '24/7 CAPS-aligned AI tutoring for Grades 10-12. Get instant homework help, exam preparation, and personalized learning support. R99/month with 7-day free trial.',
    h1: 'Your AI Study Buddy - 24/7 Homework Help',
    content: `
      <div class="min-h-screen bg-white">
        <main class="container mx-auto px-4 py-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Your AI Study Buddy - 24/7 Homework Help</h1>
          <p class="text-xl text-gray-600 mb-8">CAPS-aligned AI tutoring for all subjects. Get step-by-step explanations, exam preparation, and personalized support.</p>
          <div class="bg-amber-50 p-8 rounded-lg mt-12">
            <h2 class="text-2xl font-bold mb-4">Try Free for 7 Days</h2>
            <p class="text-lg mb-4">R99/month after trial. Cancel anytime.</p>
            <ul class="space-y-2">
              <li>✓ All CAPS subjects - Grades 10, 11, 12</li>
              <li>✓ Step-by-step explanations</li>
              <li>✓ 500+ past exam papers</li>
              <li>✓ 24/7 instant help</li>
            </ul>
          </div>
        </main>
      </div>
    `
  },
  {
    path: 'bursaries',
    title: 'South African Bursaries & Scholarships 2026 | StudyBuddy Works',
    description: 'Find bursaries and scholarships for South African students. University funding, NSFAS, corporate bursaries, and application deadlines for 2026.',
    h1: 'South African Bursaries & Scholarships 2026',
    content: `
      <div class="min-h-screen bg-white">
        <main class="container mx-auto px-4 py-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">South African Bursaries & Scholarships 2026</h1>
          <p class="text-xl text-gray-600 mb-8">Comprehensive guide to funding your tertiary education in South Africa.</p>
          <div class="grid md:grid-cols-2 gap-6 mt-12">
            <div class="border rounded-lg p-6">
              <h3 class="text-xl font-semibold mb-3">University Bursaries</h3>
              <p>Direct funding from South African universities</p>
            </div>
            <div class="border rounded-lg p-6">
              <h3 class="text-xl font-semibold mb-3">Corporate Bursaries</h3>
              <p>Private sector funding opportunities</p>
            </div>
            <div class="border rounded-lg p-6">
              <h3 class="text-xl font-semibold mb-3">NSFAS Information</h3>
              <p>Government student financial aid</p>
            </div>
            <div class="border rounded-lg p-6">
              <h3 class="text-xl font-semibold mb-3">Application Tips</h3>
              <p>How to successfully apply for funding</p>
            </div>
          </div>
        </main>
      </div>
    `
  },
  {
    path: 'apply',
    title: 'Apply to South African Universities 2026 | Application Guide',
    description: 'Complete guide to applying to South African universities. Application deadlines, requirements, and step-by-step process for 2026 admissions.',
    h1: 'Apply to South African Universities 2026',
    content: `
      <div class="min-h-screen bg-white">
        <main class="container mx-auto px-4 py-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Apply to South African Universities 2026</h1>
          <p class="text-xl text-gray-600 mb-8">Everything you need to know about university applications in South Africa.</p>
          <div class="space-y-8 mt-12">
            <section>
              <h2 class="text-2xl font-bold mb-4">Application Timeline</h2>
              <p>Most universities accept applications from April to September for the following year.</p>
            </section>
            <section>
              <h2 class="text-2xl font-bold mb-4">Requirements</h2>
              <ul class="list-disc pl-6 space-y-2">
                <li>Matric certificate or equivalent</li>
                <li>APS score meeting university requirements</li>
                <li>Subject-specific requirements</li>
                <li>Application fee payment</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    `
  }
];

console.log('🚀 Starting static page generation...\n');

let generated = 0;
let failed = 0;

pages.forEach(page => {
  try {
    // Inject the static content and SEO meta tags
    let pageHtml = baseHtml
      // Update title tags
      .replace(
        /<title>.*?<\/title>/,
        `<title>${page.title}</title>`
      )
      // Update meta title
      .replace(
        /<meta name="title" content=".*?">/,
        `<meta name="title" content="${page.title}">`
      )
      // Update meta description
      .replace(
        /<meta name="description" content=".*?"(\s?\/)?\>/,
        `<meta name="description" content="${page.description}">`
      )
      // Update OG tags
      .replace(
        /<meta property="og:title" content=".*?"(\s?\/)?\>/,
        `<meta property="og:title" content="${page.title}">`
      )
      .replace(
        /<meta property="og:description" content=".*?"(\s?\/)?\>/,
        `<meta property="og:description" content="${page.description}">`
      )
      .replace(
        /<meta property="og:url" content=".*?"(\s?\/)?\>/,
        `<meta property="og:url" content="https://studybuddy.works/${page.path}">`
      )
      // Update Twitter tags
      .replace(
        /<meta property="twitter:title" content=".*?"(\s?\/)?\>/,
        `<meta property="twitter:title" content="${page.title}">`
      )
      .replace(
        /<meta property="twitter:description" content=".*?"(\s?\/)?\>/,
        `<meta property="twitter:description" content="${page.description}">`
      )
      .replace(
        /<meta property="twitter:url" content=".*?"(\s?\/)?\>/,
        `<meta property="twitter:url" content="https://studybuddy.works/${page.path}">`
      )
      // Update canonical
      .replace(
        /<link rel="canonical" href=".*?"(\s?\/)?\>/,
        `<link rel="canonical" href="https://studybuddy.works/${page.path}">`
      )
      // Inject content into root div
      .replace(
        '<div id="root"></div>',
        `<div id="root">${page.content}</div>`
      );

    // Write as a .html file so GitHub Pages serves /path with a 200 OK
    // instead of a 301 redirect from /path to /path/ (directory-index redirect).
    // The root page (path='') writes directly to dist/index.html.
    if (page.path === '') {
      fs.writeFileSync(path.join(distPath, 'index.html'), pageHtml);
    } else {
      fs.writeFileSync(path.join(distPath, page.path + '.html'), pageHtml);
    }
    console.log(`✓ Generated /${page.path}`);
    generated++;
  } catch (error) {
    console.error(`✗ Failed to generate /${page.path}:`, error.message);
    failed++;
  }
});

console.log(`\n🎉 Prerendering complete!`);
console.log(`   Generated: ${generated} pages`);
if (failed > 0) {
  console.log(`   Failed: ${failed} pages`);
}
