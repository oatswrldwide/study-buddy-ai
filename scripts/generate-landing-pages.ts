#!/usr/bin/env tsx
/**
 * Generate Landing Pages from Keyword Research
 * Creates optimized landing pages based on Google Keyword Planner research
 */

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import type { PSEOPage } from '../src/lib/pseo-types';

// OpenRouter config (using existing integration)
const OPENROUTER_API_KEY = process.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('❌ Missing OpenRouter API key');
  console.error('💡 Add VITE_OPENROUTER_API_KEY to your .env file\n');
  process.exit(1);
}

interface KeywordIdea {
  keyword: string;
  avgMonthlySearches: number;
  competition: string;
  competitionIndex: number;
  priority?: number;
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
 * Load keyword research results
 */
async function loadKeywordResearch(filename: string = 'keyword-research.json'): Promise<KeywordResearchResult> {
  const filePath = path.join(process.cwd(), 'pseo-output', filename);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`\n❌ Could not load keyword research from: ${filePath}`);
    console.error('💡 Run: npm run research:keywords first\n');
    throw error;
  }
}

/**
 * Create slug from keyword
 */
function createSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate landing page content using AI
 */
async function generateLandingPageContent(keyword: KeywordIdea): Promise<PSEOPage> {
  console.log(`\n📝 Generating content for: "${keyword.keyword}"`);
  
  const prompt = `You are an expert SEO content writer for StudyBuddy, an AI-powered tutoring platform in South Africa.

Create a comprehensive, high-converting landing page for the keyword: "${keyword.keyword}"

The page should target students and parents searching for tutoring help in South Africa.

Context:
- StudyBuddy offers AI tutoring for R99/month (unlimited access)
- Focus on matric students (grades 10-12)
- Core subjects: Mathematics, Physical Sciences, Accounting, English, Life Sciences
- Available 24/7, personalized learning, exam preparation
- Search volume: ${keyword.avgMonthlySearches} monthly searches
- Competition: ${keyword.competition}

Return ONLY a valid JSON object with this structure:
{
  "title": "SEO-optimized title (60 chars max, include keyword)",
  "metaDescription": "Compelling meta description (155 chars max, include keyword & CTA)",
  "h1": "Main heading (include keyword naturally)",
  "quickAnswer": "Direct answer to searcher's intent (2-3 sentences, AEO-optimized)",
  "content": "Main content in clean HTML (800-1200 words, use <h2>, <h3>, <p>, <ul>, <li> tags, include keyword naturally 3-5 times, focus on benefits and social proof)",
  "faqs": [
    {
      "question": "FAQ question",
      "answer": "Detailed answer"
    }
  ],
  "internalLinks": [
    {
      "text": "Anchor text",
      "url": "/relevant-page",
      "context": "Why this link is relevant"
    }
  ],
  "cta": "Primary call-to-action text"
}

Requirements:
- Write for South African students/parents (use rand/ZAR, matric terminology)
- Focus on conversion (address pain points, urgency, affordability)
- Include trust signals (AI-powered, instant help, proven results)
- Natural keyword usage (avoid keyword stuffing)
- Actionable, benefit-focused content
- Professional yet accessible tone

Generate the JSON now:`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://studybuddy.works',
          'X-Title': 'StudyBuddy Landing Page Generator',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonContent = content;
    if (content.includes('```json')) {
      jsonContent = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonContent = content.split('```')[1].split('```')[0].trim();
    }
    
    const pageData = JSON.parse(jsonContent);
    
    // Build complete PSEO page
    const slug = createSlug(keyword.keyword);
    
    const page: PSEOPage = {
      slug,
      title: pageData.title,
      metaDescription: pageData.metaDescription,
      h1: pageData.h1,
      quickAnswer: pageData.quickAnswer,
      content: pageData.content,
      faqs: pageData.faqs || [],
      internalLinks: pageData.internalLinks || [],
      author: {
        name: 'StudyBuddy Team',
        bio: 'Expert educators and AI specialists dedicated to helping South African students succeed.',
        avatar: '/assets/studybuddy-logo.png',
      },
      lastUpdated: new Date().toISOString().split('T')[0],
      readingTime: Math.ceil(pageData.content.split(' ').length / 200),
      schema: generateSchema(pageData, slug),
      keywords: {
        primary: keyword.keyword,
        searchVolume: keyword.avgMonthlySearches,
        competition: keyword.competition,
        priority: keyword.priority || 0,
      },
    };
    
    console.log(`✅ Generated ${page.content.split(' ').length} words`);
    
    return page;
    
  } catch (error: any) {
    console.error(`❌ Failed to generate content: ${error.message}`);
    throw error;
  }
}

/**
 * Generate schema markup for SEO
 */
function generateSchema(pageData: any, slug: string): any {
  const schema: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://studybuddy.works/${slug}`,
        url: `https://studybuddy.works/${slug}`,
        name: pageData.title,
        description: pageData.metaDescription,
        inLanguage: 'en-ZA',
        isPartOf: {
          '@id': 'https://studybuddy.works/#website',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://studybuddy.works/#organization',
        name: 'StudyBuddy',
        url: 'https://studybuddy.works',
        logo: {
          '@type': 'ImageObject',
          url: 'https://studybuddy.works/assets/studybuddy-logo.png',
        },
      },
    ],
  };
  
  // Add FAQ schema if FAQs exist
  if (pageData.faqs && pageData.faqs.length > 0) {
    schema['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: pageData.faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }
  
  return schema;
}

/**
 * Save landing page to JSON file
 */
async function saveLandingPage(page: PSEOPage): Promise<void> {
  const outputDir = path.join(process.cwd(), 'public', 'pseo-data');
  const outputPath = path.join(outputDir, `${page.slug}.json`);
  
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(page, null, 2), 'utf-8');
  
  console.log(`💾 Saved to: ${outputPath}`);
}

/**
 * Update PSEO index
 */
async function updateIndex(pages: PSEOPage[]): Promise<void> {
  const indexPath = path.join(process.cwd(), 'public', 'pseo-data', 'index.json');
  
  // Load existing index
  let existingIndex: any[] = [];
  try {
    const content = await fs.readFile(indexPath, 'utf-8');
    existingIndex = JSON.parse(content);
  } catch (error) {
    console.log('📝 Creating new index.json');
  }
  
  // Add new pages to index
  pages.forEach(page => {
    const exists = existingIndex.find((p: any) => p.slug === page.slug);
    if (!exists) {
      existingIndex.push({
        slug: page.slug,
        title: page.title,
        category: 'keyword-research',
        lastUpdated: page.lastUpdated,
        keywords: page.keywords,
      });
    }
  });
  
  // Save updated index
  await fs.writeFile(indexPath, JSON.stringify(existingIndex, null, 2), 'utf-8');
  console.log(`\n📋 Updated index.json (${existingIndex.length} total pages)\n`);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes('--limit') 
    ? parseInt(args[args.indexOf('--limit') + 1] || '10')
    : 10;
  
  console.log('\n🚀 Landing Page Generator (from Keyword Research)\n');
  console.log('='.repeat(80) + '\n');
  
  try {
    // Load keyword research
    console.log('📂 Loading keyword research...');
    const research = await loadKeywordResearch();
    
    console.log(`✅ Loaded ${research.ideas.length} keywords`);
    console.log(`🎯 Generating pages for top ${limit} keywords\n`);
    
    // Generate pages
    const pages: PSEOPage[] = [];
    const delay = 15000; // 15s between API calls to avoid rate limits
    
    for (let i = 0; i < Math.min(limit, research.ideas.length); i++) {
      const keyword = research.ideas[i];
      
      console.log(`\n[#${i + 1}/${limit}] Processing: "${keyword.keyword}"`);
      console.log(`   Search Volume: ${keyword.avgMonthlySearches}/month`);
      console.log(`   Competition: ${keyword.competition}`);
      
      try {
        const page = await generateLandingPageContent(keyword);
        await saveLandingPage(page);
        pages.push(page);
        
        console.log(`   ✅ Page created: /${page.slug}`);
        
        // Rate limiting
        if (i < limit - 1) {
          console.log(`   ⏳ Waiting ${delay/1000}s before next page...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
      } catch (error: any) {
        console.error(`   ❌ Failed: ${error.message}`);
        console.log(`   ⏭️  Skipping to next keyword...`);
      }
    }
    
    // Update index
    if (pages.length > 0) {
      await updateIndex(pages);
      
      console.log('\n' + '='.repeat(80));
      console.log('✅ LANDING PAGE GENERATION COMPLETE\n');
      console.log(`📊 Summary:`);
      console.log(`   - Keywords processed: ${limit}`);
      console.log(`   - Pages created: ${pages.length}`);
      console.log(`   - Failed: ${limit - pages.length}`);
      console.log(`   - Output: public/pseo-data/\n`);
      
      console.log('📝 Generated pages:');
      pages.forEach(page => {
        console.log(`   - /${page.slug} (${page.content.split(' ').length} words)`);
      });
      
      console.log('\n💡 Next steps:');
      console.log('   1. Review generated pages in public/pseo-data/');
      console.log('   2. Update sitemap: npm run generate:sitemap');
      console.log('   3. Build: npm run build');
      console.log('   4. Deploy: npm run deploy\n');
      
    } else {
      console.log('\n⚠️  No pages were created\n');
    }
    
  } catch (error: any) {
    console.error('\n❌ Generation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateLandingPageContent, saveLandingPage, updateIndex };
