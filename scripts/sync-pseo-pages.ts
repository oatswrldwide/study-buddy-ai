#!/usr/bin/env tsx
/**
 * Sync PSEO pages from pseo-output-conversion to public/pseo-data
 * Also update the index.json file
 */

import { promises as fs } from 'fs';
import path from 'path';

const SOURCE_DIR = path.join(process.cwd(), 'pseo-output-conversion');
const DEST_DIR = path.join(process.cwd(), 'public', 'pseo-data');

async function syncPages() {
  console.log('🔄 Syncing PSEO pages...\n');

  try {
    // Ensure destination directory exists
    await fs.mkdir(DEST_DIR, { recursive: true });

    // Read all JSON files from source
    const files = await fs.readdir(SOURCE_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'index.html');

    console.log(`Found ${jsonFiles.length} pages in pseo-output-conversion/`);

    const indexData: any[] = [];
    let copiedCount = 0;

    for (const file of jsonFiles) {
      const sourcePath = path.join(SOURCE_DIR, file);
      const destPath = path.join(DEST_DIR, file.replace(/^(pain|comp|price)-/, ''));

      // Read the source file
      const content = await fs.readFile(sourcePath, 'utf-8');
      const pageData = JSON.parse(content);

      // Extract key data for index
      indexData.push({
        slug: pageData.slug,
        title: pageData.metaTitle || pageData.title,
        description: pageData.metaDescription,
        pageType: pageData.pageType,
        published: pageData.published !== false,
        qualityScore: pageData.qualityScore || 8,
        lastUpdated: pageData.lastUpdated || new Date().toISOString(),
        keywords: pageData.keywords || [],
      });

      // Copy to public directory
      await fs.writeFile(destPath, content);
      copiedCount++;
      console.log(`  ✅ Copied: ${file} → ${path.basename(destPath)}`);
    }

    // Update index.json
    const indexPath = path.join(DEST_DIR, 'index.json');
    await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));
    console.log(`\n✅ Updated index.json with ${indexData.length} pages`);

    console.log(`\n📊 Summary:`);
    console.log(`  - Total pages synced: ${copiedCount}`);
    console.log(`  - Published pages: ${indexData.filter(p => p.published).length}`);
    console.log(`  - Pending review: ${indexData.filter(p => !p.published).length}`);

    // Show breakdown by type
    const byType: Record<string, number> = {};
    indexData.forEach(p => {
      byType[p.pageType] = (byType[p.pageType] || 0) + 1;
    });

    console.log(`\n📈 Pages by type:`);
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count}`);
    });

  } catch (error: any) {
    console.error('❌ Error syncing pages:', error.message);
    process.exit(1);
  }
}

syncPages();
