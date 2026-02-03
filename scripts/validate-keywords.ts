#!/usr/bin/env tsx
/**
 * Keyword Validation Script
 * Helps validate keywords before generating content
 */

import { generateAllKeywords } from '../src/config/high-conversion-keywords';

interface KeywordValidation {
  keyword: string;
  type: string;
  priority: number;
  expectedConversion: string;
  validationStatus: 'pending' | 'valid' | 'invalid';
  searchVolume?: number;
  competition?: 'low' | 'medium' | 'high';
  notes?: string;
}

/**
 * Export keywords for manual validation
 */
function exportForValidation() {
  const keywords = generateAllKeywords();
  
  // Group by type for easier validation
  const grouped: Record<string, KeywordValidation[]> = {};
  
  keywords.forEach(kw => {
    if (!grouped[kw.type]) {
      grouped[kw.type] = [];
    }
    
    grouped[kw.type].push({
      keyword: kw.keyword,
      type: kw.type,
      priority: kw.priority,
      expectedConversion: kw.expectedConversion,
      validationStatus: 'pending',
    });
  });
  
  return grouped;
}

/**
 * Generate Google Keyword Planner instructions
 */
function printValidationInstructions() {
  console.log('\n📋 KEYWORD VALIDATION INSTRUCTIONS\n');
  console.log('═'.repeat(60));
  
  console.log('\n🎯 Step 1: Export Keywords for Validation');
  console.log('   Copy keywords to: keyword-validation.csv\n');
  
  console.log('📊 Step 2: Use Google Keyword Planner (FREE)');
  console.log('   1. Go to: ads.google.com/aw/keywordplanner');
  console.log('   2. Click "Discover new keywords"');
  console.log('   3. Paste top 20 keywords');
  console.log('   4. Filter: Location = South Africa');
  console.log('   5. Download results\n');
  
  console.log('✅ Step 3: Validation Criteria');
  console.log('   VALID keyword if:');
  console.log('   - Monthly searches: 50+');
  console.log('   - Competition: Low to Medium');
  console.log('   - Relevant to South African students\n');
  
  console.log('   INVALID keyword if:');
  console.log('   - Monthly searches: <10');
  console.log('   - Competition: Too high (big brands)');
  console.log('   - Too generic or off-topic\n');
  
  console.log('🔍 Step 4: Quick Manual Check');
  console.log('   For top 10 keywords:');
  console.log('   1. Google the keyword');
  console.log('   2. Look at autocomplete suggestions');
  console.log('   3. Check "People also ask"');
  console.log('   4. Note what ranks #1-3\n');
  
  console.log('💡 Step 5: Prioritize');
  console.log('   Focus on keywords with:');
  console.log('   - 100-1000 monthly searches (sweet spot)');
  console.log('   - Low competition');
  console.log('   - Clear buying intent\n');
  
  console.log('═'.repeat(60));
}

/**
 * Print top priority keywords for validation
 */
function printTopKeywords() {
  const keywords = generateAllKeywords();
  
  // Get priority 1 keywords
  const priority1 = keywords.filter(k => k.priority === 1);
  
  console.log('\n🎯 TOP 20 KEYWORDS TO VALIDATE FIRST\n');
  console.log('Type,Keyword,Expected Conversion');
  console.log('-'.repeat(80));
  
  priority1.slice(0, 20).forEach(kw => {
    console.log(`${kw.type.padEnd(15)} | ${kw.keyword.padEnd(45)} | ${kw.expectedConversion}`);
  });
  
  console.log('\n💾 Export to CSV:');
  console.log('   Copy the output above and paste into Excel/Google Sheets');
  console.log('   Add columns: Search Volume, Competition, Status\n');
}

/**
 * Simulate keyword check (placeholder for real API)
 */
function simulateKeywordCheck(keyword: string) {
  // In real implementation, would call Google Keyword Planner API
  // For now, provide manual check template
  
  console.log(`\n🔍 Manual Check Template for: "${keyword}"`);
  console.log('─'.repeat(60));
  console.log(`1. Google Search: https://www.google.com/search?q=${encodeURIComponent(keyword)}`);
  console.log(`2. Autocomplete check - Type in Google and note suggestions`);
  console.log(`3. "People also ask" - List related questions`);
  console.log(`4. Top 3 results:`);
  console.log(`   #1: [URL] - [Title]`);
  console.log(`   #2: [URL] - [Title]`);
  console.log(`   #3: [URL] - [Title]`);
  console.log(`5. Competition level: [ ] Low [ ] Medium [ ] High`);
  console.log(`6. Estimated search volume: _____ per month`);
  console.log(`7. Decision: [ ] USE [ ] SKIP [ ] MODIFY\n`);
}

/**
 * Export keywords to CSV format
 */
function exportToCSV() {
  const keywords = generateAllKeywords();
  const priority1 = keywords.filter(k => k.priority === 1).slice(0, 50);
  
  console.log('\n📄 CSV Export (Top 50 Keywords)\n');
  console.log('Keyword,Type,Expected Conversion,Search Volume,Competition,Status,Notes');
  
  priority1.forEach(kw => {
    console.log(`"${kw.keyword}",${kw.type},${kw.expectedConversion},,,pending,`);
  });
  
  console.log('\n💡 Save this to: keyword-validation.csv');
  console.log('   Then validate using Google Keyword Planner\n');
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'instructions') {
    printValidationInstructions();
  } else if (command === 'top') {
    printTopKeywords();
  } else if (command === 'csv') {
    exportToCSV();
  } else if (command === 'check' && args[1]) {
    simulateKeywordCheck(args.slice(1).join(' '));
  } else {
    console.log('\n🔍 Keyword Validation Tool\n');
    console.log('Usage:');
    console.log('  npm run validate:keywords instructions  - Show validation steps');
    console.log('  npm run validate:keywords top           - Show top 20 keywords');
    console.log('  npm run validate:keywords csv           - Export to CSV format');
    console.log('  npm run validate:keywords check "keyword" - Manual check template\n');
    
    console.log('Quick Stats:');
    const stats = generateAllKeywords();
    console.log(`  Total keywords: ${stats.length}`);
    console.log(`  Priority 1: ${stats.filter(k => k.priority === 1).length}`);
    console.log(`  Priority 2: ${stats.filter(k => k.priority === 2).length}\n`);
    
    console.log('💡 Start with: npm run validate:keywords instructions\n');
  }
}

main();
