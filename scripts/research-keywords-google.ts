#!/usr/bin/env tsx
/**
 * Google Keyword Planner Integration
 * Research keywords using Google Ads API to generate landing page ideas
 */

import 'dotenv/config';
import { GoogleAdsApi, enums } from 'google-ads-api';
import fs from 'fs/promises';
import path from 'path';

// Google Ads API Configuration
const GOOGLE_ADS_CONFIG = {
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
  client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
};

const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID || '';

// Validate configuration
function validateConfig(): boolean {
  const missing: string[] = [];
  
  if (!GOOGLE_ADS_CONFIG.developer_token) missing.push('GOOGLE_ADS_DEVELOPER_TOKEN');
  if (!GOOGLE_ADS_CONFIG.client_id) missing.push('GOOGLE_ADS_CLIENT_ID');
  if (!GOOGLE_ADS_CONFIG.client_secret) missing.push('GOOGLE_ADS_CLIENT_SECRET');
  if (!GOOGLE_ADS_CONFIG.refresh_token) missing.push('GOOGLE_ADS_REFRESH_TOKEN');
  if (!CUSTOMER_ID) missing.push('GOOGLE_ADS_CUSTOMER_ID');
  
  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\n💡 Setup Instructions:');
    console.error('   1. Create a Google Ads account at: https://ads.google.com');
    console.error('   2. Get API access at: https://developers.google.com/google-ads/api');
    console.error('   3. Update .env file with your credentials');
    console.error('   4. See .env.example for required variables\n');
    return false;
  }
  
  return true;
}

// Keyword Research Types
interface KeywordIdea {
  keyword: string;
  avgMonthlySearches: number;
  competition: 'LOW' | 'MEDIUM' | 'HIGH' | 'UNSPECIFIED';
  competitionIndex: number;
  lowTopPageBid: number;
  highTopPageBid: number;
}

interface KeywordResearchResult {
  seedKeywords: string[];
  ideas: KeywordIdea[];
  totalIdeas: number;
  timestamp: string;
  location: string;
  language: string;
}

/**
 * Initialize Google Ads API Client
 */
function initializeClient() {
  if (!validateConfig()) {
    throw new Error('Invalid Google Ads API configuration');
  }
  
  const client = new GoogleAdsApi({
    client_id: GOOGLE_ADS_CONFIG.client_id,
    client_secret: GOOGLE_ADS_CONFIG.client_secret,
    developer_token: GOOGLE_ADS_CONFIG.developer_token,
  });
  
  const customer = client.Customer({
    customer_id: CUSTOMER_ID,
    refresh_token: GOOGLE_ADS_CONFIG.refresh_token,
  });
  
  return customer;
}

/**
 * Generate keyword ideas using Google Keyword Planner
 */
async function generateKeywordIdeas(
  seedKeywords: string[],
  location: string = 'South Africa',
  language: string = 'en'
): Promise<KeywordResearchResult> {
  console.log('\n🔍 Researching keywords with Google Keyword Planner...\n');
  console.log(`📍 Location: ${location}`);
  console.log(`🌐 Language: ${language}`);
  console.log(`🌱 Seed keywords: ${seedKeywords.length}\n`);
  
  const customer = initializeClient();
  
  // South Africa geo target constant (2710 is South Africa)
  const geoTargetConstants = ['geoTargetConstants/2710'];
  
  // English language constant
  const languageConstants = ['languageConstants/1000']; // 1000 is English
  
  try {
    // Generate keyword ideas using Keyword Plan Idea Service
    const keywordIdeas = await customer.keywordPlanIdeas.generateKeywordIdeas({
      customer_id: CUSTOMER_ID,
      keyword_seed: {
        keywords: seedKeywords,
      },
      geo_target_constants: geoTargetConstants,
      language: languageConstants[0],
      include_adult_keywords: false,
    });
    
    console.log(`✅ Found ${keywordIdeas.results.length} keyword ideas\n`);
    
    // Process and format results
    const ideas: KeywordIdea[] = keywordIdeas.results.map((result: any) => ({
      keyword: result.text,
      avgMonthlySearches: result.keyword_idea_metrics?.avg_monthly_searches || 0,
      competition: result.keyword_idea_metrics?.competition || 'UNSPECIFIED',
      competitionIndex: result.keyword_idea_metrics?.competition_index || 0,
      lowTopPageBid: result.keyword_idea_metrics?.low_top_of_page_bid_micros 
        ? result.keyword_idea_metrics.low_top_of_page_bid_micros / 1000000 
        : 0,
      highTopPageBid: result.keyword_idea_metrics?.high_top_of_page_bid_micros
        ? result.keyword_idea_metrics.high_top_of_page_bid_micros / 1000000
        : 0,
    }));
    
    // Sort by search volume (highest first)
    ideas.sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches);
    
    return {
      seedKeywords,
      ideas,
      totalIdeas: ideas.length,
      timestamp: new Date().toISOString(),
      location,
      language,
    };
    
  } catch (error: any) {
    console.error('\n❌ Error generating keyword ideas:');
    console.error(error.message);
    
    if (error.message?.includes('UNAUTHENTICATED')) {
      console.error('\n💡 Authentication error. Please check:');
      console.error('   1. Your refresh_token is valid');
      console.error('   2. Your client_id and client_secret are correct');
      console.error('   3. Your developer_token is approved\n');
    }
    
    throw error;
  }
}

/**
 * Filter keywords by criteria
 */
function filterKeywords(
  ideas: KeywordIdea[],
  minSearchVolume: number = 50,
  maxCompetition: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM'
): KeywordIdea[] {
  const competitionLevels = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'UNSPECIFIED': 0 };
  const maxCompLevel = competitionLevels[maxCompetition];
  
  return ideas.filter(idea => {
    const meetsSearchVolume = idea.avgMonthlySearches >= minSearchVolume;
    const meetsCompetition = competitionLevels[idea.competition] <= maxCompLevel;
    return meetsSearchVolume && meetsCompetition;
  });
}

/**
 * Prioritize keywords based on conversion potential
 */
function prioritizeKeywords(ideas: KeywordIdea[]): KeywordIdea[] {
  return ideas.map(idea => {
    // Assign priority score based on multiple factors
    let score = 0;
    
    // Search volume score (higher is better, but diminishing returns)
    if (idea.avgMonthlySearches >= 1000) score += 40;
    else if (idea.avgMonthlySearches >= 500) score += 35;
    else if (idea.avgMonthlySearches >= 100) score += 30;
    else if (idea.avgMonthlySearches >= 50) score += 20;
    
    // Competition score (lower is better)
    if (idea.competition === 'LOW') score += 30;
    else if (idea.competition === 'MEDIUM') score += 20;
    else if (idea.competition === 'HIGH') score += 5;
    
    // Commercial intent indicators (check keyword text)
    const keyword = idea.keyword.toLowerCase();
    const highIntentWords = ['buy', 'price', 'cost', 'affordable', 'cheap', 'best', 'review', 'vs', 'comparison', 'tutor', 'help', 'struggling', 'failing'];
    const hasHighIntent = highIntentWords.some(word => keyword.includes(word));
    if (hasHighIntent) score += 30;
    
    return { ...idea, priority: score };
  }).sort((a: any, b: any) => b.priority - a.priority);
}

/**
 * Save keyword research results
 */
async function saveResults(result: KeywordResearchResult, filename: string = 'keyword-research.json') {
  const outputDir = path.join(process.cwd(), 'pseo-output');
  const outputPath = path.join(outputDir, filename);
  
  // Ensure directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Save full results
  await fs.writeFile(
    outputPath,
    JSON.stringify(result, null, 2),
    'utf-8'
  );
  
  console.log(`\n💾 Results saved to: ${outputPath}`);
  
  // Also save a CSV for easy analysis
  const csvPath = path.join(outputDir, filename.replace('.json', '.csv'));
  const csvContent = [
    'Keyword,Avg Monthly Searches,Competition,Competition Index,Low Bid (ZAR),High Bid (ZAR)',
    ...result.ideas.map(idea => 
      `"${idea.keyword}",${idea.avgMonthlySearches},${idea.competition},${idea.competitionIndex},${idea.lowTopPageBid.toFixed(2)},${idea.highTopPageBid.toFixed(2)}`
    )
  ].join('\n');
  
  await fs.writeFile(csvPath, csvContent, 'utf-8');
  console.log(`📊 CSV saved to: ${csvPath}\n`);
}

/**
 * Print keyword analysis summary
 */
function printSummary(result: KeywordResearchResult, filtered: KeywordIdea[], prioritized: KeywordIdea[]) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 KEYWORD RESEARCH SUMMARY');
  console.log('='.repeat(80) + '\n');
  
  console.log(`📅 Timestamp: ${result.timestamp}`);
  console.log(`📍 Location: ${result.location}`);
  console.log(`🌱 Seed keywords: ${result.seedKeywords.length}`);
  console.log(`💡 Total ideas: ${result.totalIdeas}`);
  console.log(`✅ Qualified keywords (50+ searches, low-medium comp): ${filtered.length}`);
  console.log(`⭐ High-priority keywords: ${prioritized.slice(0, 50).length}\n`);
  
  console.log('🏆 TOP 20 KEYWORDS BY PRIORITY:\n');
  console.log('Rank | Keyword                                    | Searches | Competition | Priority');
  console.log('-'.repeat(95));
  
  prioritized.slice(0, 20).forEach((idea: any, index) => {
    const rank = (index + 1).toString().padStart(2);
    const keyword = idea.keyword.padEnd(42).substring(0, 42);
    const searches = idea.avgMonthlySearches.toString().padStart(8);
    const competition = idea.competition.padEnd(11);
    const priority = idea.priority.toString().padStart(8);
    console.log(`${rank}   | ${keyword} | ${searches} | ${competition} | ${priority}`);
  });
  
  console.log('\n' + '='.repeat(80) + '\n');
  
  console.log('💡 NEXT STEPS:\n');
  console.log('   1. Review top keywords in pseo-output/keyword-research.csv');
  console.log('   2. Select keywords that match your content strategy');
  console.log('   3. Run: npm run generate:landing-pages to create pages');
  console.log('   4. Build and deploy: npm run build && npm run deploy\n');
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  let seedKeywords: string[] = [];
  let customSeeds = false;
  
  if (args.length > 0 && args[0] !== '--default') {
    seedKeywords = args;
    customSeeds = true;
  } else {
    // Default seed keywords for South African tutoring market
    seedKeywords = [
      'matric tutoring',
      'online tutor south africa',
      'grade 12 help',
      'mathematics tutor',
      'physical sciences help',
      'struggling with matric',
      'exam preparation',
      'ai tutor',
      'affordable tutoring',
      'pass matric',
    ];
  }
  
  console.log('\n🎯 Google Keyword Planner - Keyword Research Tool\n');
  console.log('='.repeat(80));
  
  if (!customSeeds) {
    console.log('\n💡 Using default seed keywords for South African tutoring market');
    console.log('   To use custom keywords: npm run research:keywords -- "keyword 1" "keyword 2"\n');
  } else {
    console.log(`\n✅ Using ${seedKeywords.length} custom seed keywords\n`);
  }
  
  try {
    // Generate keyword ideas
    const result = await generateKeywordIdeas(seedKeywords, 'South Africa', 'en');
    
    // Filter qualified keywords
    const filtered = filterKeywords(result.ideas, 50, 'MEDIUM');
    
    // Prioritize keywords
    const prioritized = prioritizeKeywords(filtered);
    
    // Save results
    await saveResults({
      ...result,
      ideas: prioritized,
    });
    
    // Print summary
    printSummary(result, filtered, prioritized);
    
    console.log('✅ Keyword research complete!\n');
    
  } catch (error: any) {
    console.error('\n❌ Keyword research failed:', error.message);
    
    if (!validateConfig()) {
      console.error('\n📖 Setup Guide:');
      console.error('   https://developers.google.com/google-ads/api/docs/first-call/overview\n');
    }
    
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateKeywordIdeas, filterKeywords, prioritizeKeywords };
