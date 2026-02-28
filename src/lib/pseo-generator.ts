/**
 * Programmatic SEO Content Generator with AEO Optimization
 * 
 * Generates SEO-optimized pages for:
 * - Subject pages (e.g., Grade 10 Mathematics)
 * - Location pages (e.g., AI Tutor Johannesburg)
 * - Combined pages (e.g., Grade 10 Math Tutor Cape Town)
 * 
 * AEO Features:
 * - FAQ schema for AI engines
 * - Citation-worthy statistics
 * - Structured data markup
 * - Quick answer snippets for ChatGPT/Perplexity
 */

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export interface PageTemplate {
  type: 'subject' | 'location' | 'combined' | 'comparison';
  subject?: string;
  grade?: string;
  location?: string;
  province?: string;
}

export interface GeneratedPage {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string; // For AEO - direct answer snippet
  content: string;
  faqs: FAQ[];
  statistics: Statistic[];
  lastUpdated: string;
  schema: Record<string, unknown>;
  internalLinks: InternalLink[];
  qualityScore: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Statistic {
  claim: string;
  value: string;
  source: string;
  year: number;
}

export interface InternalLink {
  anchor: string;
  url: string;
  relevance: number;
}

/**
 * Generate SEO/AEO optimized content using Claude Sonnet for quality
 */
export async function generatePageContent(
  template: PageTemplate
): Promise<GeneratedPage> {
  const prompt = buildAEOPrompt(template);
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://studybuddyworks.com',
      'X-Title': 'StudyBuddy pSEO Generator',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet', // High quality for SEO content
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const rawContent = data.choices[0].message.content;

  // Parse structured response
  return parseGeneratedContent(rawContent, template);
}

/**
 * Build AEO-optimized prompt
 */
function buildAEOPrompt(template: PageTemplate): string {
  const { type, subject, grade, location, province } = template;

  let context = '';
  if (type === 'subject' && subject && grade) {
    context = `Grade ${grade} ${subject} tutoring in South Africa`;
  } else if (type === 'location' && location) {
    context = `AI tutoring services in ${location}, South Africa`;
  } else if (type === 'combined' && subject && grade && location) {
    context = `Grade ${grade} ${subject} tutoring in ${location}, South Africa`;
  }

  return `You are an expert SEO content writer creating a comprehensive guide for StudyBuddy, South Africa's leading AI tutoring platform.

CONTEXT: ${context}

Create a detailed, citation-worthy article optimized for BOTH traditional search engines AND AI answer engines (ChatGPT, Perplexity, Google AI Overviews).

CRITICAL AEO REQUIREMENTS:
1. Start with a "QUICK ANSWER" section (2-3 sentences) that directly answers the main query
2. Include specific, citation-worthy STATISTICS with sources
3. Create 5-7 FAQs in clear Q&A format
4. Use structured formatting (tables, bullet points, clear headings)
5. Reference official sources (DBE, CAPS curriculum)
6. Include current pricing and dates (February 2026)
7. Write comprehensively (1500-2000 words) - AI engines prefer depth

STRUCTURE YOUR RESPONSE AS JSON:
{
  "title": "SEO title (60 chars max)",
  "metaDescription": "Meta description (155 chars max)",
  "h1": "Page H1 heading",
  "quickAnswer": "Direct 2-3 sentence answer for AI engines",
  "content": "Full article content in markdown",
  "faqs": [
    {"question": "...", "answer": "..."}
  ],
  "statistics": [
    {"claim": "...", "value": "...", "source": "Department of Basic Education", "year": 2025}
  ]
}

SOUTH AFRICAN CONTEXT:
- Use Rand (R) for pricing
- Reference CAPS and IEB curricula
- Mention matric exams, NSC
- Include local context (${location || 'South African cities'})
- DBE statistics from 2024/2025
- StudyBuddy pricing: R99/month for students, custom pricing for schools

TONE: Professional, helpful, educational. Write for students, parents, and educators.

Generate the content now in valid JSON format:`;
}

/**
 * Parse AI-generated content into structured format
 */
function parseGeneratedContent(
  rawContent: string,
  template: PageTemplate
): GeneratedPage {
  try {
    // Extract JSON from response (AI might wrap it in markdown code blocks)
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Generate slug from template
    const slug = generateSlug(template);

    // Create schema markup
    const schema = generateSchemaMarkup(parsed, template);

    // Calculate quality score
    const qualityScore = calculateQualityScore(parsed);

    return {
      slug,
      title: parsed.title,
      metaDescription: parsed.metaDescription,
      h1: parsed.h1,
      quickAnswer: parsed.quickAnswer,
      content: parsed.content,
      faqs: parsed.faqs || [],
      statistics: parsed.statistics || [],
      lastUpdated: new Date().toISOString().split('T')[0],
      schema,
      internalLinks: [], // Will be added in post-processing
      qualityScore,
    };
  } catch (error) {
    console.error('Error parsing generated content:', error);
    throw new Error('Failed to parse AI response');
  }
}

/**
 * Generate URL-friendly slug
 */
function generateSlug(template: PageTemplate): string {
  const { type, subject, grade, location } = template;

  if (type === 'subject' && subject && grade) {
    return `subjects/${subject.toLowerCase().replace(/\s+/g, '-')}/grade-${grade}`;
  } else if (type === 'location' && location) {
    return `tutoring/${location.toLowerCase().replace(/\s+/g, '-')}`;
  } else if (type === 'combined' && subject && grade && location) {
    return `tutoring/${location.toLowerCase().replace(/\s+/g, '-')}/${subject.toLowerCase().replace(/\s+/g, '-')}-grade-${grade}`;
  }

  return 'page';
}

interface ParsedAIContent {
  title: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  content: string;
  faqs?: FAQ[];
  statistics?: Statistic[];
}

/**
 * Generate Schema.org markup for AEO
 */
function generateSchemaMarkup(
  content: ParsedAIContent,
  template: PageTemplate
): Record<string, unknown> {
  const baseSchema: { '@context': string; '@graph': Record<string, unknown>[] } = {
    '@context': 'https://schema.org',
    '@graph': [],
  };

  // Educational content schema
  if (template.subject && template.grade) {
    baseSchema['@graph'].push({
      '@type': 'EducationalOccupationalProgram',
      name: `Grade ${template.grade} ${template.subject} Tutoring`,
      description: content.metaDescription,
      provider: {
        '@type': 'Organization',
        name: 'StudyBuddy Works',
        url: 'https://studybuddyworks.com',
      },
      teaches: [template.subject],
      educationalLevel: `Grade ${template.grade}`,
      inLanguage: ['en-ZA', 'af-ZA'],
      offers: {
        '@type': 'Offer',
        price: '99',
        priceCurrency: 'ZAR',
        availability: 'https://schema.org/InStock',
      },
    });
  }

  // Local business schema for location pages
  if (template.location) {
    baseSchema['@graph'].push({
      '@type': 'ProfessionalService',
      name: `StudyBuddy AI Tutoring - ${template.location}`,
      description: content.metaDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: template.location,
        addressCountry: 'ZA',
      },
      areaServed: {
        '@type': 'City',
        name: template.location,
      },
      serviceType: 'Educational Technology',
    });
  }

  // FAQ schema (critical for AEO!)
  if (content.faqs && content.faqs.length > 0) {
    baseSchema['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((faq: FAQ) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return baseSchema;
}

/**
 * Calculate content quality score (0-10)
 */
function calculateQualityScore(content: ParsedAIContent): number {
  let score = 0;

  // Word count (target: 1500-2000 words)
  const wordCount = content.content.split(/\s+/).length;
  if (wordCount >= 1500 && wordCount <= 2500) score += 2;
  else if (wordCount >= 1000) score += 1;

  // Has quick answer (AEO requirement)
  if (content.quickAnswer && content.quickAnswer.length > 50) score += 2;

  // FAQ quality (5-7 is ideal)
  if (content.faqs && content.faqs.length >= 5) score += 2;
  else if (content.faqs && content.faqs.length >= 3) score += 1;

  // Has statistics
  if (content.statistics && content.statistics.length >= 3) score += 2;
  else if (content.statistics && content.statistics.length >= 1) score += 1;

  // Title and meta quality
  if (content.title.length <= 60 && content.title.length >= 40) score += 1;
  if (content.metaDescription.length <= 160 && content.metaDescription.length >= 120) score += 1;

  return Math.min(score, 10);
}

/**
 * Generate metadata for AI engines
 */
export function generateMetaTags(page: GeneratedPage): Record<string, string> {
  return {
    title: page.title,
    description: page.metaDescription,
    'og:title': page.title,
    'og:description': page.metaDescription,
    'og:type': 'article',
    'article:published_time': page.lastUpdated,
    'article:modified_time': page.lastUpdated,
    'twitter:card': 'summary_large_image',
    'twitter:title': page.title,
    'twitter:description': page.metaDescription,
    // AEO-specific
    robots: 'index, follow, max-snippet:-1, max-image-preview:large',
    'citation-title': page.title,
  };
}

/**
 * Batch generate multiple pages
 */
export async function batchGeneratePages(
  templates: PageTemplate[],
  onProgress?: (current: number, total: number) => void
): Promise<GeneratedPage[]> {
  const pages: GeneratedPage[] = [];

  for (let i = 0; i < templates.length; i++) {
    try {
      const page = await generatePageContent(templates[i]);
      pages.push(page);

      if (onProgress) {
        onProgress(i + 1, templates.length);
      }

      // Rate limiting - wait 2 seconds between requests
      if (i < templates.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Error generating page ${i + 1}:`, error);
    }
  }

  return pages;
}
