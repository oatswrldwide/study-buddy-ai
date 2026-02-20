#!/usr/bin/env tsx
/**
 * Demo: Keyword Research & Landing Page Generation
 * This demo simulates the workflow without requiring Google Ads API credentials
 */

import fs from 'fs/promises';
import path from 'path';

// Simulated keyword data (based on typical South African tutoring market)
const DEMO_KEYWORDS = [
  { keyword: 'matric tutoring affordable', avgMonthlySearches: 1200, competition: 'LOW', competitionIndex: 25, priority: 100 },
  { keyword: 'physics tutor online south africa', avgMonthlySearches: 850, competition: 'LOW', competitionIndex: 30, priority: 95 },
  { keyword: 'struggling with mathematics grade 12', avgMonthlySearches: 720, competition: 'MEDIUM', competitionIndex: 45, priority: 85 },
  { keyword: 'matric exam preparation help', avgMonthlySearches: 680, competition: 'LOW', competitionIndex: 35, priority: 90 },
  { keyword: 'accounting tutor for matric', avgMonthlySearches: 550, competition: 'MEDIUM', competitionIndex: 50, priority: 75 },
  { keyword: 'online tutoring south africa free trial', avgMonthlySearches: 490, competition: 'MEDIUM', competitionIndex: 48, priority: 70 },
  { keyword: 'grade 11 physical sciences help', avgMonthlySearches: 430, competition: 'LOW', competitionIndex: 28, priority: 80 },
  { keyword: 'matric maths tutor near me', avgMonthlySearches: 390, competition: 'HIGH', competitionIndex: 65, priority: 60 },
  { keyword: 'best online tutor for matric', avgMonthlySearches: 350, competition: 'MEDIUM', competitionIndex: 52, priority: 68 },
  { keyword: 'struggling with physical sciences grade 12', avgMonthlySearches: 310, competition: 'LOW', competitionIndex: 32, priority: 75 },
];

async function runDemo() {
  console.log('\n🎯 KEYWORD RESEARCH & LANDING PAGE GENERATION - DEMO\n');
  console.log('='.repeat(80));
  console.log('\nThis demo simulates the complete workflow:');
  console.log('  1. Keyword Research (Google Ads API)');
  console.log('  2. Keyword Filtering & Prioritization');
  console.log('  3. Landing Page Generation (AI-powered)\n');
  console.log('Note: Using demo data - no API credentials required!\n');
  console.log('='.repeat(80) + '\n');
  
  // Step 1: Simulate keyword research
  console.log('📊 Step 1: Keyword Research\n');
  console.log('Simulating Google Keyword Planner API call...\n');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('✅ Found 10 keyword ideas\n');
  console.log('🏆 TOP KEYWORDS BY PRIORITY:\n');
  console.log('Rank | Keyword                                    | Searches | Competition | Priority');
  console.log('-'.repeat(95));
  
  DEMO_KEYWORDS.forEach((kw, index) => {
    const rank = (index + 1).toString().padStart(2);
    const keyword = kw.keyword.padEnd(42).substring(0, 42);
    const searches = kw.avgMonthlySearches.toString().padStart(8);
    const competition = kw.competition.padEnd(11);
    const priority = kw.priority.toString().padStart(8);
    console.log(`${rank}   | ${keyword} | ${searches} | ${competition} | ${priority}`);
  });
  
  console.log('\n' + '='.repeat(80) + '\n');
  
  // Step 2: Save keyword research
  console.log('📊 Step 2: Saving Keyword Research\n');
  
  const outputDir = path.join(process.cwd(), 'pseo-output');
  await fs.mkdir(outputDir, { recursive: true });
  
  const researchResult = {
    seedKeywords: ['matric tutoring', 'online tutor', 'physics help', 'struggling with matric'],
    ideas: DEMO_KEYWORDS,
    totalIdeas: DEMO_KEYWORDS.length,
    timestamp: new Date().toISOString(),
    location: 'South Africa',
    language: 'en',
  };
  
  await fs.writeFile(
    path.join(outputDir, 'keyword-research-demo.json'),
    JSON.stringify(researchResult, null, 2),
    'utf-8'
  );
  
  // Create CSV
  const csvContent = [
    'Keyword,Avg Monthly Searches,Competition,Competition Index,Priority',
    ...DEMO_KEYWORDS.map(kw => 
      `"${kw.keyword}",${kw.avgMonthlySearches},${kw.competition},${kw.competitionIndex},${kw.priority}`
    )
  ].join('\n');
  
  await fs.writeFile(
    path.join(outputDir, 'keyword-research-demo.csv'),
    csvContent,
    'utf-8'
  );
  
  console.log(`💾 Saved to: pseo-output/keyword-research-demo.json`);
  console.log(`📊 CSV saved to: pseo-output/keyword-research-demo.csv\n`);
  
  console.log('='.repeat(80) + '\n');
  
  // Step 3: Summary
  console.log('📈 Research Summary:\n');
  console.log(`  • Total keywords: ${DEMO_KEYWORDS.length}`);
  console.log(`  • High-priority (score 80+): ${DEMO_KEYWORDS.filter(k => k.priority >= 80).length}`);
  console.log(`  • Low competition: ${DEMO_KEYWORDS.filter(k => k.competition === 'LOW').length}`);
  console.log(`  • Total monthly searches: ${DEMO_KEYWORDS.reduce((sum, k) => sum + k.avgMonthlySearches, 0).toLocaleString()}\n`);
  
  console.log('='.repeat(80) + '\n');
  
  // Step 4: Next steps
  console.log('💡 Next Steps:\n');
  console.log('  1. Review the keyword research in pseo-output/');
  console.log('  2. To use real data, set up Google Ads API (see KEYWORD_RESEARCH_GUIDE.md)');
  console.log('  3. Generate landing pages with:');
  console.log('     npm run generate:landing-pages -- --limit 5\n');
  console.log('  4. Or test the workflow with existing keywords:');
  console.log('     npm run validate:keywords top\n');
  
  console.log('='.repeat(80) + '\n');
  console.log('✅ Demo complete!\n');
  console.log('📖 Full documentation: KEYWORD_RESEARCH_GUIDE.md\n');
}

runDemo().catch(console.error);
