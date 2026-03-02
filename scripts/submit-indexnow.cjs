/**
 * Submit URLs to Bing IndexNow API for rapid indexing
 * IndexNow notifies search engines about URL changes instantly
 * Supported by: Bing, Yandex, Seznam, Naver
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const HOST = 'studybuddy.works';
const API_ENDPOINT = 'api.indexnow.org';

// Generate or load API key
function getOrCreateApiKey() {
  const keyPath = path.join(__dirname, '../public/indexnow-key.txt');
  
  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, 'utf-8').trim();
  }
  
  // Generate 128-character hex key (as recommended by IndexNow)
  const apiKey = crypto.randomBytes(64).toString('hex');
  fs.writeFileSync(keyPath, apiKey);
  console.log(`✓ Generated new API key: ${keyPath}`);
  
  return apiKey;
}

// URLs to submit - prioritized by importance
const priorityUrls = {
  tier1: [
    // Core pages - highest priority
    'https://studybuddy.works/',
    'https://studybuddy.works/schools',
    'https://studybuddy.works/students',
    'https://studybuddy.works/bursaries',
    'https://studybuddy.works/apply',
    'https://studybuddy.works/courses',
    'https://studybuddy.works/locations',
    'https://studybuddy.works/resources',
    'https://studybuddy.works/about',
    'https://studybuddy.works/how-it-works',
    'https://studybuddy.works/aps-calculator',
    'https://studybuddy.works/high-school-scholarships'
  ],
  tier2: [
    // Course pages
    'https://studybuddy.works/courses/medicine',
    'https://studybuddy.works/courses/engineering',
    'https://studybuddy.works/courses/law',
    'https://studybuddy.works/courses/bcom-accounting',
    'https://studybuddy.works/courses/computer-science',
    // Province hubs
    'https://studybuddy.works/province/gauteng',
    'https://studybuddy.works/province/western-cape',
    'https://studybuddy.works/province/kwazulu-natal',
    // Major cities
    'https://studybuddy.works/tutor/johannesburg',
    'https://studybuddy.works/tutor/cape-town',
    'https://studybuddy.works/tutor/durban',
    'https://studybuddy.works/tutor/pretoria'
  ],
  tier3: [
    // High-value content
    'https://studybuddy.works/university-of-pretoria-registration-process-2026',
    'https://studybuddy.works/wits-university-aps-requirements',
    'https://studybuddy.works/study-tips-for-matric-2026',
    'https://studybuddy.works/turnitin-ai-detector-free',
    'https://studybuddy.works/how-to-improve-matric-marks-quickly'
  ]
};

// Submit URLs to IndexNow
function submitToIndexNow(urls, apiKey) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: apiKey,
      keyLocation: `https://${HOST}/indexnow-key.txt`,
      urlList: urls
    });

    const options = {
      hostname: API_ENDPOINT,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, statusCode: res.statusCode, urls: urls.length });
        } else if (res.statusCode === 202) {
          resolve({ success: true, statusCode: res.statusCode, urls: urls.length, message: 'Accepted for processing' });
        } else {
          resolve({ success: false, statusCode: res.statusCode, data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Main execution
async function main() {
  console.log('🚀 IndexNow API Submission\n');
  console.log('═'.repeat(50));
  
  // Get or create API key
  const apiKey = getOrCreateApiKey();
  console.log(`📝 Using API key: ${apiKey.substring(0, 16)}...`);
  console.log('');

  // Submit by tiers
  const results = [];
  let totalSubmitted = 0;

  for (const [tier, urls] of Object.entries(priorityUrls)) {
    console.log(`\n📤 Submitting ${tier.toUpperCase()} (${urls.length} URLs)...`);
    
    try {
      const result = await submitToIndexNow(urls, apiKey);
      
      if (result.success) {
        console.log(`✅ Success! Status: ${result.statusCode}`);
        if (result.message) {
          console.log(`   ${result.message}`);
        }
        totalSubmitted += urls.length;
        results.push({ tier, status: 'success', count: urls.length });
      } else {
        console.log(`❌ Failed. Status: ${result.statusCode}`);
        console.log(`   ${result.data}`);
        results.push({ tier, status: 'failed', count: 0 });
      }
      
      // Wait 2 seconds between batches to be polite
      if (tier !== 'tier3') {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      results.push({ tier, status: 'error', count: 0 });
    }
  }

  // Summary
  console.log('\n');
  console.log('═'.repeat(50));
  console.log('📊 Submission Summary\n');
  
  results.forEach(({ tier, status, count }) => {
    const icon = status === 'success' ? '✅' : '❌';
    console.log(`${icon} ${tier.toUpperCase()}: ${count} URLs ${status}`);
  });
  
  console.log('\n' + '═'.repeat(50));
  console.log(`🎉 Total URLs submitted: ${totalSubmitted}`);
  console.log('');
  
  console.log('📝 Next Steps:\n');
  console.log('1. ✓ API key saved to: public/indexnow-key.txt');
  console.log('2. Deploy the key file to your site');
  console.log('3. Verify at: https://studybuddy.works/indexnow-key.txt');
  console.log('4. Monitor indexing in Bing Webmaster Tools');
  console.log('');
  console.log('💡 IndexNow submission notifies:');
  console.log('   • Bing (Microsoft)');
  console.log('   • Yandex');
  console.log('   • Seznam.cz');
  console.log('   • Naver');
  console.log('');
  console.log('⏱️  URLs typically indexed within minutes to hours');
  console.log('');
}

// Run
main().catch(console.error);
