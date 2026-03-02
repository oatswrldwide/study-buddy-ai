/**
 * SEO Health Check - Verify all technical SEO implementations
 * Run this regularly to ensure all SEO elements are in place
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'studybuddy.works';
const FULL_URL = `https://${SITE_URL}`;

// Checks to perform
const checks = {
  files: [],
  headers: [],
  content: [],
  external: []
};

let allPassed = true;

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(symbol, message, color = 'reset') {
  console.log(`${colors[color]}${symbol} ${message}${colors.reset}`);
}

// Check if local file exists
function checkFile(filename, description) {
  const filePath = path.join(__dirname, '..', 'public', filename);
  const exists = fs.existsSync(filePath);
  
  if (exists) {
    log('✅', `${description}: Found`, 'green');
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ${colors.blue}Size: ${sizeKB} KB${colors.reset}`);
  } else {
    log('❌', `${description}: Missing`, 'red');
    allPassed = false;
  }
  
  return exists;
}

// Fetch URL and check response
function fetchUrl(url, checkFn, description) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = checkFn(res, data);
        if (result.passed) {
          log('✅', `${description}: ${result.message}`, 'green');
        } else {
          log('❌', `${description}: ${result.message}`, 'red');
          allPassed = false;
        }
        resolve(result);
      });
    }).on('error', (err) => {
      log('❌', `${description}: ${err.message}`, 'red');
      allPassed = false;
      resolve({ passed: false, message: err.message });
    });
  });
}

// Main health check
async function runHealthCheck() {
  console.log('\n' + '═'.repeat(60));
  console.log(`${colors.magenta}🏥 SEO HEALTH CHECK - ${SITE_URL}${colors.reset}`);
  console.log('═'.repeat(60) + '\n');

  // Section 1: Local Files
  console.log(`${colors.blue}📁 LOCAL FILES${colors.reset}`);
  console.log('─'.repeat(60));
  checkFile('sitemap.xml', 'Main Sitemap (Index)');
  checkFile('sitemap-main.xml', 'Main Pages Sitemap');
  checkFile('sitemap-locations.xml', 'Locations Sitemap');
  checkFile('sitemap-tutoring.xml', 'Tutoring Pages Sitemap');
  checkFile('robots.txt', 'Robots.txt');
  checkFile('indexnow-key.txt', 'IndexNow API Key');
  checkFile('google254d3e6fb7da0940.html', 'Google Verification File');
  checkFile('404.html', 'Custom 404 Page');
  checkFile('og-image.svg', 'Open Graph Image');
  console.log('');

  // Section 2: Homepage Content
  console.log(`${colors.blue}🏠 HOMEPAGE CONTENT${colors.reset}`);
  console.log('─'.repeat(60));
  
  await fetchUrl(FULL_URL, (res, data) => {
    const hasH1 = /<h1[^>]*>.*?<\/h1>/i.test(data);
    return {
      passed: hasH1,
      message: hasH1 ? 'H1 tag present' : 'No H1 tag found'
    };
  }, 'H1 Tag Check');

  await fetchUrl(FULL_URL, (res, data) => {
    const metaDescMatch = data.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    if (metaDescMatch) {
      const length = metaDescMatch[1].length;
      const optimal = length >= 120 && length <= 160;
      return {
        passed: optimal,
        message: optimal ? `${length} chars (optimal)` : `${length} chars (recommend 120-160)`
      };
    }
    return { passed: false, message: 'No meta description' };
  }, 'Meta Description');

  await fetchUrl(FULL_URL, (res, data) => {
    const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      const length = titleMatch[1].length;
      const optimal = length >= 50 && length <= 60;
      return {
        passed: optimal,
        message: optimal ? `${length} chars (optimal)` : `${length} chars (recommend 50-60)`
      };
    }
    return { passed: false, message: 'No title tag' };
  }, 'Title Tag');

  await fetchUrl(FULL_URL, (res, data) => {
    const hasCanonical = /<link\s+rel=["']canonical["']/i.test(data);
    return {
      passed: hasCanonical,
      message: hasCanonical ? 'Canonical URL present' : 'Missing canonical tag'
    };
  }, 'Canonical Tag');

  await fetchUrl(FULL_URL, (res, data) => {
    const hasOG = /<meta\s+property=["']og:title["']/i.test(data);
    return {
      passed: hasOG,
      message: hasOG ? 'Open Graph tags present' : 'Missing OG tags'
    };
  }, 'Open Graph Tags');

  await fetchUrl(FULL_URL, (res, data) => {
    const hasStructured = /<script\s+type=["']application\/ld\+json["']/i.test(data);
    const count = (data.match(/<script\s+type=["']application\/ld\+json["']/gi) || []).length;
    return {
      passed: hasStructured,
      message: hasStructured ? `${count} schemas found` : 'No structured data'
    };
  }, 'Structured Data');

  console.log('');

  // Section 3: Verification Tags
  console.log(`${colors.blue}🔐 VERIFICATION & TRACKING${colors.reset}`);
  console.log('─'.repeat(60));

  await fetchUrl(FULL_URL, (res, data) => {
    const hasBing = /msvalidate\.01/.test(data);
    const hasKey = /7B13389552F5F284369E84BD1A7BDF2E/.test(data);
    return {
      passed: hasBing && hasKey,
      message: hasBing && hasKey ? 'Bing verification present' : 'Bing verification missing'
    };
  }, 'Bing Webmaster Tools');

  await fetchUrl(`${FULL_URL}/google254d3e6fb7da0940.html`, (res, data) => {
    return {
      passed: res.statusCode === 200,
      message: res.statusCode === 200 ? 'Google verification file accessible' : `Status: ${res.statusCode}`
    };
  }, 'Google Search Console');

  await fetchUrl(`${FULL_URL}/indexnow-key.txt`, (res, data) => {
    const hasKey = data.length === 128;
    return {
      passed: hasKey,
      message: hasKey ? '128-char API key present' : `Invalid key length: ${data.length}`
    };
  }, 'IndexNow API Key');

  await fetchUrl(FULL_URL, (res, data) => {
    const hasGA4 = /G-FJMTH74WZW/.test(data);
    return {
      passed: hasGA4,
      message: hasGA4 ? 'GA4 tracking code found' : 'GA4 tracking missing'
    };
  }, 'Google Analytics');

  console.log('');

  // Section 4: Sitemap & Robots
  console.log(`${colors.blue}🗺️  SITEMAPS & ROBOTS${colors.reset}`);
  console.log('─'.repeat(60));

  await fetchUrl(`${FULL_URL}/sitemap.xml`, (res, data) => {
    const isSitemapIndex = /<sitemapindex/i.test(data);
    const count = (data.match(/<sitemap>/gi) || []).length;
    return {
      passed: res.statusCode === 200 && isSitemapIndex,
      message: isSitemapIndex ? `Sitemap index with ${count} sitemaps` : 'Not a sitemap index'
    };
  }, 'Sitemap Index');

  await fetchUrl(`${FULL_URL}/robots.txt`, (res, data) => {
    const hasSitemap = /Sitemap:/i.test(data);
    const allowAll = /User-agent: \*\s+Allow:/i.test(data);
    return {
      passed: res.statusCode === 200 && hasSitemap,
      message: hasSitemap && allowAll ? 'Properly configured' : 'Missing sitemap reference'
    };
  }, 'Robots.txt');

  console.log('');

  // Section 5: Performance
  console.log(`${colors.blue}⚡ PERFORMANCE${colors.reset}`);
  console.log('─'.repeat(60));

  await fetchUrl(FULL_URL, (res, data) => {
    const hasHTTPS = res.statusCode === 200;
    return {
      passed: hasHTTPS,
      message: hasHTTPS ? 'HTTPS enabled' : 'HTTPS not working'
    };
  }, 'HTTPS');

  await fetchUrl(FULL_URL, (res, data) => {
    const sizeKB = (Buffer.byteLength(data, 'utf8') / 1024).toFixed(2);
    const optimal = sizeKB < 500;
    return {
      passed: optimal,
      message: optimal ? `${sizeKB} KB (good)` : `${sizeKB} KB (optimize)`
    };
  }, 'HTML Size');

  await fetchUrl(FULL_URL, (res, data) => {
    const isMobileFriendly = /<meta\s+name=["']viewport["']/i.test(data);
    return {
      passed: isMobileFriendly,
      message: isMobileFriendly ? 'Viewport meta tag present' : 'Not mobile-optimized'
    };
  }, 'Mobile Friendly');

  console.log('');

  // Summary
  console.log('═'.repeat(60));
  if (allPassed) {
    log('🎉', 'ALL CHECKS PASSED!', 'green');
    console.log(`${colors.green}Your site is SEO-optimized and ready to rank!${colors.reset}`);
  } else {
    log('⚠️', 'SOME CHECKS FAILED', 'yellow');
    console.log(`${colors.yellow}Review the items above and fix any issues.${colors.reset}`);
  }
  console.log('═'.repeat(60) + '\n');

  // Next steps
  console.log(`${colors.blue}📋 RECOMMENDED ACTIONS:${colors.reset}\n`);
  console.log('1. Check Google Search Console for manual actions');
  console.log('2. Submit sitemaps manually in GSC and Bing Webmaster');
  console.log('3. Monitor Core Web Vitals in PageSpeed Insights');
  console.log('4. Run: node scripts/submit-indexnow.cjs (monthly)');
  console.log('5. Review PSEO content quality (see PSEO_AUDIT_ACTIONS.md)');
  console.log('');
}

// Run the health check
runHealthCheck().catch(console.error);
