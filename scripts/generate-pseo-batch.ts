#!/usr/bin/env bun
/**
 * Batch generate pSEO pages with AEO optimization
 * 
 * Usage:
 *   bun run scripts/generate-pseo-batch.ts --type=subject --limit=10
 *   bun run scripts/generate-pseo-batch.ts --type=location --limit=20
 *   bun run scripts/generate-pseo-batch.ts --type=all
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import {
  generatePageContent,
  batchGeneratePages,
  type PageTemplate,
} from '../src/lib/pseo-generator';
import { subjects, grades, locations } from '../src/config/pseo-targets';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'studybuddy-a045b',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Generate all subject pages
 */
async function generateSubjectPages(limit?: number): Promise<void> {
  console.log('🎓 Generating subject pages...\n');

  const templates: PageTemplate[] = [];

  for (const subject of subjects) {
    for (const grade of grades) {
      templates.push({
        type: 'subject',
        subject,
        grade,
      });

      if (limit && templates.length >= limit) break;
    }
    if (limit && templates.length >= limit) break;
  }

  console.log(`📝 Target: ${templates.length} pages\n`);

  const pages = await batchGeneratePages(templates, (current, total) => {
    console.log(`✅ Generated ${current}/${total} - ${Math.round((current / total) * 100)}%`);
  });

  // Save to Firestore
  console.log('\n💾 Saving to Firestore...');
  for (const page of pages) {
    try {
      await setDoc(doc(collection(db, 'seo_pages'), page.slug.replace(/\//g, '_')), {
        ...page,
        createdAt: new Date().toISOString(),
        status: page.qualityScore >= 8 ? 'published' : 'review',
      });
      console.log(`  ✅ ${page.slug} (score: ${page.qualityScore}/10)`);
    } catch (error) {
      console.error(`  ❌ Failed to save ${page.slug}:`, error);
    }
  }

  // Summary
  const published = pages.filter((p) => p.qualityScore >= 8).length;
  const needsReview = pages.filter((p) => p.qualityScore < 8).length;

  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Auto-published: ${published}`);
  console.log(`  ⏳ Needs review: ${needsReview}`);
  console.log(`  📈 Average quality: ${(pages.reduce((sum, p) => sum + p.qualityScore, 0) / pages.length).toFixed(1)}/10`);
}

/**
 * Generate all location pages
 */
async function generateLocationPages(limit?: number): Promise<void> {
  console.log('📍 Generating location pages...\n');

  const templates: PageTemplate[] = [];

  for (const [province, cities] of Object.entries(locations)) {
    for (const city of cities) {
      templates.push({
        type: 'location',
        location: city,
        province,
      });

      if (limit && templates.length >= limit) break;
    }
    if (limit && templates.length >= limit) break;
  }

  console.log(`📝 Target: ${templates.length} pages\n`);

  const pages = await batchGeneratePages(templates, (current, total) => {
    console.log(`✅ Generated ${current}/${total} - ${Math.round((current / total) * 100)}%`);
  });

  // Save to Firestore
  console.log('\n💾 Saving to Firestore...');
  for (const page of pages) {
    try {
      await setDoc(doc(collection(db, 'seo_pages'), page.slug.replace(/\//g, '_')), {
        ...page,
        createdAt: new Date().toISOString(),
        status: page.qualityScore >= 8 ? 'published' : 'review',
      });
      console.log(`  ✅ ${page.slug} (score: ${page.qualityScore}/10)`);
    } catch (error) {
      console.error(`  ❌ Failed to save ${page.slug}:`, error);
    }
  }

  const published = pages.filter((p) => p.qualityScore >= 8).length;
  const needsReview = pages.filter((p) => p.qualityScore < 8).length;

  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Auto-published: ${published}`);
  console.log(`  ⏳ Needs review: ${needsReview}`);
}

/**
 * Generate combined pages (subject + location)
 */
async function generateCombinedPages(limit: number = 50): Promise<void> {
  console.log('🎯 Generating combined pages (subject + location)...\n');

  const templates: PageTemplate[] = [];

  // Priority: Top subjects × Top cities
  const topSubjects = ['Mathematics', 'Physical Sciences', 'English'];
  const topCities = ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'];
  const topGrades = ['10', '11', '12']; // Matric focus

  for (const subject of topSubjects) {
    for (const grade of topGrades) {
      for (const city of topCities) {
        templates.push({
          type: 'combined',
          subject,
          grade,
          location: city,
        });

        if (templates.length >= limit) break;
      }
      if (templates.length >= limit) break;
    }
    if (templates.length >= limit) break;
  }

  console.log(`📝 Target: ${templates.length} pages\n`);

  const pages = await batchGeneratePages(templates, (current, total) => {
    console.log(`✅ Generated ${current}/${total} - ${Math.round((current / total) * 100)}%`);
  });

  console.log('\n💾 Saving to Firestore...');
  for (const page of pages) {
    try {
      await setDoc(doc(collection(db, 'seo_pages'), page.slug.replace(/\//g, '_')), {
        ...page,
        createdAt: new Date().toISOString(),
        status: page.qualityScore >= 8 ? 'published' : 'review',
      });
      console.log(`  ✅ ${page.slug} (score: ${page.qualityScore}/10)`);
    } catch (error) {
      console.error(`  ❌ Failed to save ${page.slug}:`, error);
    }
  }

  const published = pages.filter((p) => p.qualityScore >= 8).length;
  console.log(`\n📊 Published: ${published}/${pages.length} pages`);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const typeArg = args.find((arg) => arg.startsWith('--type='));
  const limitArg = args.find((arg) => arg.startsWith('--limit='));

  const type = typeArg?.split('=')[1] || 'subject';
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

  console.log('🚀 StudyBuddy pSEO Generator with AEO Optimization\n');
  console.log(`   Type: ${type}`);
  console.log(`   Limit: ${limit || 'all'}`);
  console.log(`   Date: ${new Date().toLocaleDateString()}\n`);
  console.log('─'.repeat(60) + '\n');

  try {
    switch (type) {
      case 'subject':
        await generateSubjectPages(limit);
        break;
      case 'location':
        await generateLocationPages(limit);
        break;
      case 'combined':
        await generateCombinedPages(limit || 50);
        break;
      case 'all':
        console.log('📦 Generating ALL pages (this will take a while)...\n');
        await generateSubjectPages(50);
        console.log('\n' + '─'.repeat(60) + '\n');
        await generateLocationPages(54);
        console.log('\n' + '─'.repeat(60) + '\n');
        await generateCombinedPages(50);
        break;
      default:
        console.error(`❌ Unknown type: ${type}`);
        console.log('\nUsage:');
        console.log('  bun run scripts/generate-pseo-batch.ts --type=subject --limit=10');
        console.log('  bun run scripts/generate-pseo-batch.ts --type=location');
        console.log('  bun run scripts/generate-pseo-batch.ts --type=combined --limit=50');
        console.log('  bun run scripts/generate-pseo-batch.ts --type=all');
        process.exit(1);
    }

    console.log('\n✅ Generation complete!\n');
    console.log('Next steps:');
    console.log('  1. Review pages needing approval in Firebase Console');
    console.log('  2. Build sitemap: bun run scripts/generate-sitemap.ts');
    console.log('  3. Deploy to production');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }

  process.exit(0);
}

main();
