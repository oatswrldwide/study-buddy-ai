/**
 * PSEO Content Quality Audit
 * Analyzes PSEO pages to identify thin content, duplicates, and quality issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting PSEO Content Quality Audit...\n');

const publicPath = path.join(__dirname, '../public/pseo-data');
const issues = {
  missing_files: [],
  low_priority: [],
  thin_content_risk: [],
  duplicate_keywords: new Map(),
  over_optimized: []
};

// Read sitemap categories that are likely PSEO
const sitemapFiles = [
  'sitemap-tutoring.xml',
  'sitemap-exam_help.xml',
  'sitemap-study_guides.xml',
  'sitemap-universities.xml',
  'sitemap-other.xml'
];

const pseoUrls = [];

sitemapFiles.forEach(filename => {
  const filepath = path.join(__dirname, '../public', filename);
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const urlMatches = content.matchAll(/<loc>(.*?)<\/loc>/g);
    for (const match of urlMatches) {
      const url = match[1];
      const slug = url.replace('https://studybuddy.works/', '');
      if (slug && slug !== url) {
        pseoUrls.push({ url, slug, source: filename });
      }
    }
  }
});

console.log(`📊 Analyzing ${pseoUrls.length} PSEO URLs...\n`);

// Analyze URL patterns
const patterns = {
  'university-blackboard': 0,
  'university-application': 0,
  'subject-tutor-location': 0,
  'weekend-tutor': 0,
  'urgent-help': 0,
  'struggling-with': 0,
  'how-to-pass': 0,
  'exam-tips': 0,
  'past-papers': 0,
  'ai-tools': 0,
  'comparison': 0,
  'other': 0
};

const keywordFrequency = {};

pseoUrls.forEach(({ slug }) => {
  // Pattern detection
  if (slug.includes('blackboard-login')) patterns['university-blackboard']++;
  else if (slug.includes('application') || slug.includes('registration')) patterns['university-application']++;
  else if (slug.match(/.*-tutor-.*-grade-\d+/)) patterns['subject-tutor-location']++;
  else if (slug.startsWith('weekend-')) patterns['weekend-tutor']++;
  else if (slug.includes('urgent-') || slug.includes('help-tonight')) patterns['urgent-help']++;
  else if (slug.includes('struggling-with')) patterns['struggling-with']++;
  else if (slug.includes('how-to-pass') || slug.includes('how-to-ace')) patterns['how-to-pass']++;
  else if (slug.includes('exam-tips') || slug.includes('exam-revision')) patterns['exam-tips']++;
  else if (slug.includes('past-papers')) patterns['past-papers']++;
  else if (slug.includes('turnitin') || slug.includes('ai-detector') || slug.includes('chatgpt')) patterns['ai-tools']++;
  else if (slug.includes('vs-') || slug.includes('comparison')) patterns['comparison']++;
  else patterns['other']++;
  
  // Keyword extraction
  const keywords = slug.split('-').filter(w => w.length > 3);
  keywords.forEach(keyword => {
    keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
  });
  
  // Detect potential issues
  
  // Very long URLs (may indicate over-optimization)
  if (slug.length > 80) {
    issues.over_optimized.push({ slug, issue: 'URL too long', length: slug.length });
  }
  
  // Duplicate keyword stuffing
  const wordCount = {};
  slug.split('-').forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  Object.entries(wordCount).forEach(([word, count]) => {
    if (count > 2 && word.length > 3) {
      issues.over_optimized.push({ slug, issue: `Keyword "${word}" repeated ${count} times` });
    }
  });
});

// Identify most repeated patterns (potential thin content)
const sortedKeywords = Object.entries(keywordFrequency)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 20);

// Generate report
console.log('📈 PSEO Content Patterns:\n');
console.log('Pattern'.padEnd(30) + 'Count');
console.log('━'.repeat(40));
Object.entries(patterns)
  .sort(([,a], [,b]) => b - a)
  .forEach(([pattern, count]) => {
    console.log(`${pattern.padEnd(30)}${count}`);
  });

console.log('\n🔑 Most Common Keywords (Top 20):\n');
console.log('Keyword'.padEnd(20) + 'Frequency');
console.log('━'.repeat(40));
sortedKeywords.forEach(([keyword, freq]) => {
  const indicator = freq > 50 ? '⚠️ ' : freq > 30 ? '⚡ ' : '  ';
  console.log(`${indicator}${keyword.padEnd(20)}${freq}`);
});

console.log('\n⚠️  Potential Quality Issues:\n');

// Over-optimized URLs
if (issues.over_optimized.length > 0) {
  console.log(`🚨 Over-Optimized URLs: ${issues.over_optimized.length}`);
  issues.over_optimized.slice(0, 10).forEach(({ slug, issue }) => {
    console.log(`   • ${slug.substring(0, 60)}... - ${issue}`);
  });
  if (issues.over_optimized.length > 10) {
    console.log(`   ... and ${issues.over_optimized.length - 10} more`);
  }
  console.log('');
}

// Categorize by risk level
const highRiskPatterns = [
  'university-blackboard',
  'university-application',
  'subject-tutor-location'
];

let highRiskCount = 0;
highRiskPatterns.forEach(pattern => {
  highRiskCount += patterns[pattern];
});

console.log('📊 Risk Assessment:\n');
console.log(`  High Risk (thin/duplicate content): ${highRiskCount} pages`);
console.log(`  • University blackboard logins: ${patterns['university-blackboard']}`);
console.log(`  • University applications: ${patterns['university-application']}`);
console.log(`  • Subject-location combos: ${patterns['subject-tutor-location']}`);
console.log('');
console.log(`  Medium Risk (repetitive patterns): ${patterns['weekend-tutor'] + patterns['urgent-help'] + patterns['exam-tips']} pages`);
console.log(`  • Weekend tutoring: ${patterns['weekend-tutor']}`);
console.log(`  • Urgent help pages: ${patterns['urgent-help']}`);
console.log(`  • Exam tips: ${patterns['exam-tips']}`);
console.log('');
console.log(`  Low Risk (valuable content): ${patterns['past-papers'] + patterns['ai-tools'] + patterns['how-to-pass']} pages`);
console.log(`  • Past papers: ${patterns['past-papers']}`);
console.log(`  • AI tools: ${patterns['ai-tools']}`);
console.log(`  • How-to guides: ${patterns['how-to-pass']}`);

console.log('\n📋 Recommendations:\n');
console.log('1. 🔴 HIGH PRIORITY - Audit blackboard login pages (likely thin content)');
console.log('   → These pages added Feb 20-25 correlate with traffic drop');
console.log('   → Consider consolidating into a single hub page');
console.log('');
console.log('2. 🟡 MEDIUM PRIORITY - Review subject-tutor-location combinations');
console.log('   → Ensure each has 500+ unique words');
console.log('   → Add local context, testimonials, specific details');
console.log('');
console.log('3. 🟢 LOW PRIORITY - Enhance how-to and tool pages');
console.log('   → These provide real value but could be expanded');
console.log('   → Add more detailed guides, examples, screenshots');
console.log('');
console.log('4. 🔄 CONSOLIDATION - Merge similar pages');
console.log(`   → ${issues.over_optimized.length} pages with over-optimization issues`);
console.log('   → Combine duplicate/similar content into comprehensive guides');
console.log('');

// Generate action list
const actionFile = path.join(__dirname, '../PSEO_AUDIT_ACTIONS.md');
let actionContent = '# PSEO Content Quality Audit - Action Items\n\n';
actionContent += `**Audit Date:** ${new Date().toISOString().split('T')[0]}\n`;
actionContent += `**Total PSEO Pages:** ${pseoUrls.length}\n\n`;
actionContent += '## 🚨 CRITICAL ACTIONS (Do First)\n\n';
actionContent += '### 1. Remove or Consolidate Blackboard Login Pages\n\n';
actionContent += `**Issue:** ${patterns['university-blackboard']} near-duplicate pages\n\n`;
actionContent += '**Pages to review:**\n';
pseoUrls.filter(({ slug }) => slug.includes('blackboard-login')).forEach(({ slug }) => {
  actionContent += `- https://studybuddy.works/${slug}\n`;
});
actionContent += '\n**Recommendation:** Create single comprehensive guide: `/university-blackboard-login-help`\n\n';

actionContent += '### 2. Review University Application Pages\n\n';
actionContent += `**Issue:** ${patterns['university-application']} potentially thin pages\n\n`;
actionContent += '**Action:** Ensure each has unique, detailed content (500+ words)\n\n';

actionContent += '## 🟡 MEDIUM PRIORITY ACTIONS\n\n';
actionContent += '### 3. Audit Subject-Location Tutor Pages\n\n';
actionContent += `**Count:** ${patterns['subject-tutor-location']} pages\n\n`;
actionContent += '**Action:** \n';
actionContent += '- Verify each has local context\n';
actionContent += '- Add testimonials or specific details\n';
actionContent += '- Ensure content is not just template-filled\n\n';

actionContent += '## 🟢 ENHANCEMENT OPPORTUNITIES\n\n';
actionContent += '### 4. Expand High-Value Content\n\n';
actionContent += `- Past papers pages (${patterns['past-papers']}): Add more examples, tips\n`;
actionContent += `- AI tool pages (${patterns['ai-tools']}): Add comparisons, screenshots\n`;
actionContent += `- How-to guides (${patterns['how-to-pass']}): Add depth, examples\n\n`;

actionContent += '## 📊 Statistics\n\n';
actionContent += '```\n';
Object.entries(patterns).forEach(([pattern, count]) => {
  actionContent += `${pattern.padEnd(30)}: ${count} pages\n`;
});
actionContent += '```\n\n';

actionContent += '## ⚠️ Over-Optimized URLs (First 20)\n\n';
issues.over_optimized.slice(0, 20).forEach(({ slug, issue }) => {
  actionContent += `- **${slug}**\n  Issue: ${issue}\n\n`;
});

fs.writeFileSync(actionFile, actionContent);
console.log(`✅ Detailed action plan written to: PSEO_AUDIT_ACTIONS.md\n`);

console.log('🎯 Next Steps:\n');
console.log('1. Review PSEO_AUDIT_ACTIONS.md for detailed recommendations');
console.log('2. Start with HIGH PRIORITY items (blackboard pages)');
console.log('3. Use noindex or consolidate thin content pages');
console.log('4. Request re-indexing in Google Search Console after changes\n');
