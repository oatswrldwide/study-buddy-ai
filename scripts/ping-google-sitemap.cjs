/**
 * Ping Google Search Console to notify about sitemap updates
 * This helps Google re-crawl your sitemaps faster
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'studybuddy.works';
const GOOGLE_PING_URL = 'www.google.com';

// All sitemaps to ping
const sitemaps = [
  'sitemap.xml',  // Main index
  'sitemap-main.xml',
  'sitemap-locations.xml',
  'sitemap-tutoring.xml',
  'sitemap-study_guides.xml',
  'sitemap-universities.xml',
  'sitemap-exam_help.xml',
  'sitemap-provinces.xml',
  'sitemap-bursaries.xml',
  'sitemap-courses.xml',
  'sitemap-tools.xml',
  'sitemap-other.xml'
];

// Ping Google for a sitemap
function pingGoogleSitemap(sitemapUrl) {
  return new Promise((resolve, reject) => {
    const encodedUrl = encodeURIComponent(sitemapUrl);
    const path = `/ping?sitemap=${encodedUrl}`;
    
    const options = {
      hostname: GOOGLE_PING_URL,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SitemapPing/1.0)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, statusCode: res.statusCode });
        } else {
          resolve({ success: false, statusCode: res.statusCode, data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Verify sitemap files exist
function verifySitemaps() {
  const publicDir = path.join(__dirname, '../public');
  const missing = [];
  
  for (const sitemap of sitemaps) {
    const filePath = path.join(publicDir, sitemap);
    if (!fs.existsSync(filePath)) {
      missing.push(sitemap);
    }
  }
  
  return missing;
}

// Main execution
async function main() {
  console.log('📍 Google Search Console Sitemap Ping\n');
  console.log('═'.repeat(50));
  
  // Verify sitemaps exist
  console.log('✓ Verifying sitemap files...');
  const missing = verifySitemaps();
  
  if (missing.length > 0) {
    console.log(`\n⚠️  Warning: ${missing.length} sitemap(s) not found:`);
    missing.forEach(s => console.log(`   - ${s}`));
    console.log('');
  }
  
  const validSitemaps = sitemaps.filter(s => !missing.includes(s));
  console.log(`✓ Found ${validSitemaps.length} sitemap file(s)`);
  console.log('');

  // Ping each sitemap
  const results = [];
  let successCount = 0;

  for (const sitemap of validSitemaps) {
    const sitemapUrl = `https://${SITE_URL}/${sitemap}`;
    process.stdout.write(`📤 Pinging: ${sitemap}... `);
    
    try {
      const result = await pingGoogleSitemap(sitemapUrl);
      
      if (result.success) {
        console.log('✅');
        successCount++;
        results.push({ sitemap, status: 'success' });
      } else {
        console.log(`❌ Status: ${result.statusCode}`);
        results.push({ sitemap, status: 'failed', code: result.statusCode });
      }
      
      // Wait 1 second between pings
      if (sitemap !== validSitemaps[validSitemaps.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.log(`❌ ${error.message}`);
      results.push({ sitemap, status: 'error', error: error.message });
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 Ping Summary\n');
  console.log(`✅ Successful: ${successCount}/${validSitemaps.length}`);
  console.log(`❌ Failed: ${validSitemaps.length - successCount}/${validSitemaps.length}`);
  console.log('');
  
  console.log('═'.repeat(50));
  console.log('📝 What happens next:\n');
  console.log('• Google receives notification about sitemap updates');
  console.log('• Crawlers will re-crawl your sitemaps soon');
  console.log('• Check "Sitemaps" section in Google Search Console');
  console.log('• Monitor "Coverage" report for indexing status');
  console.log('');
  console.log('💡 Tip: You can also manually submit in GSC:');
  console.log('   1. Go to search.google.com/search-console');
  console.log('   2. Click "Sitemaps" in left menu');
  console.log('   3. Enter sitemap URL and click "Submit"');
  console.log('');
  console.log('⏱️  Google typically re-crawls within 24-48 hours');
  console.log('');
}

// Run
main().catch(console.error);
