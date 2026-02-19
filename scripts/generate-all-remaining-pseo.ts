#!/usr/bin/env tsx
/**
 * Generate ALL remaining PSEO pages to reach 256 total
 * This script intelligently generates only what's missing
 */

import { promises as fs } from 'fs';
import path from 'path';
import { generateAllKeywords } from '../src/config/high-conversion-keywords';

async function main() {
  console.log('🔍 Analyzing PSEO content generation status...\n');

  // Get all target keywords
  const allKeywords = generateAllKeywords();
  console.log(`📊 Target: ${allKeywords.length} total PSEO pages`);

  // Read existing pages
  const outputDir = path.join(process.cwd(), 'pseo-output-conversion');
  const publicDir = path.join(process.cwd(), 'public', 'pseo-data');

  let existingPages: Set<string> = new Set();

  // Check pseo-output-conversion
  try {
    const files = await fs.readdir(outputDir);
    files.filter(f => f.endsWith('.json') && f !== 'index.html').forEach(f => {
      const slug = f.replace(/^(pain|comp|price)-/, '').replace('.json', '');
      existingPages.add(slug);
    });
  } catch (e) {
    console.log('⚠️  pseo-output-conversion directory not found');
  }

  // Check public/pseo-data
  try {
    const files = await fs.readdir(publicDir);
    files.filter(f => f.endsWith('.json') && f !== 'index.json').forEach(f => {
      const slug = f.replace('.json', '');
      existingPages.add(slug);
    });
  } catch (e) {
    console.log('⚠️  public/pseo-data directory not found');
  }

  console.log(`✅ Found ${existingPages.size} existing pages\n`);

  // Determine what needs to be generated
  const toGenerate = allKeywords.filter(kw => {
    const slug = kw.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60);
    return !existingPages.has(slug);
  });

  console.log(`📝 Need to generate: ${toGenerate.length} pages\n`);

  // Group by type
  const byType: Record<string, typeof toGenerate> = {};
  toGenerate.forEach(kw => {
    if (!byType[kw.type]) byType[kw.type] = [];
    byType[kw.type].push(kw);
  });

  console.log('📈 Missing pages by type:');
  Object.entries(byType).forEach(([type, keywords]) => {
    console.log(`  - ${type}: ${keywords.length} pages`);
  });

  console.log('\n🎯 Generation Priority:');
  console.log('  1. Comparison pages (7 total) - Highest conversion 25-35%');
  console.log('  2. Pricing pages (9 total) - High conversion 22-30%');
  console.log('  3. Pain-point pages (108 total) - High conversion 15-20%');
  console.log('  4. Exam-prep pages (60 total) - High conversion 18-24%');
  console.log('  5. Suburb-specific (72 total) - Medium conversion 12-18%\n');

  // Show sample commands
  console.log('📝 To generate these pages, run:\n');

  if (byType['comparison']?.length > 0) {
    console.log(`# Generate ${byType['comparison'].length} comparison pages:`);
    console.log(`npm run pseo:comparisons\n`);
  }

  if (byType['pricing']?.length > 0) {
    console.log(`# Generate ${byType['pricing'].length} pricing pages:`);
    console.log(`npm run pseo:pricing\n`);
  }

  if (byType['pain-point']?.length > 0) {
    console.log(`# Generate ${byType['pain-point'].length} pain-point pages:`);
    console.log(`npm run pseo:pain-points\n`);
  }

  if (byType['exam-prep']?.length > 0) {
    console.log(`# Generate ${byType['exam-prep'].length} exam-prep pages:`);
    console.log(`npm run pseo:high-conversion -- --type=exam-prep --limit=${Math.min(20, byType['exam-prep'].length)}\n`);
  }

  if (byType['suburb-specific']?.length > 0) {
    console.log(`# Generate ${byType['suburb-specific'].length} suburb-specific pages:`);
    console.log(`npm run pseo:high-conversion -- --type=suburb-specific --limit=${Math.min(20, byType['suburb-specific'].length)}\n`);
  }

  console.log('💡 TIP: Generate in batches to avoid API rate limits');
  console.log('   Start with high-conversion pages (comparisons + pricing) first\n');

  // Show what would be generated
  const args = process.argv.slice(2);
  const generateArg = args.find(arg => arg === '--generate');
  const typeArg = args.find(arg => arg.startsWith('--type='))?.split('=')[1];
  const limitArg = args.find(arg => arg.startsWith('--limit='))?.split('=')[1];
  const limit = limitArg ? parseInt(limitArg) : 10;

  if (generateArg) {
    console.log('🚀 Starting generation...\n');
    
    let pagesToGenerate = toGenerate;
    if (typeArg) {
      pagesToGenerate = toGenerate.filter(k => k.type === typeArg);
    }
    
    // Sort by priority (comparison > pricing > pain-point > exam-prep > suburb)
    const priorityOrder = ['comparison', 'pricing', 'pain-point', 'exam-prep', 'suburb-specific'];
    pagesToGenerate.sort((a, b) => {
      return priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type);
    });

    pagesToGenerate = pagesToGenerate.slice(0, limit);

    console.log(`📝 Generating ${pagesToGenerate.length} pages...\n`);
    
    // Import and run the high-conversion generator
    const { execSync } = await import('child_process');
    const typeFilter = typeArg ? `--type=${typeArg}` : '';
    const limitFilter = `--limit=${limit}`;
    
    execSync(
      `npx tsx scripts/generate-high-conversion-content.ts ${typeFilter} ${limitFilter}`,
      { stdio: 'inherit', cwd: process.cwd() }
    );
  } else {
    console.log('\n⚠️  Run with --generate flag to actually generate pages:');
    console.log(`   npx tsx scripts/generate-all-remaining-pseo.ts --generate --limit=10\n`);
  }
}

main();
