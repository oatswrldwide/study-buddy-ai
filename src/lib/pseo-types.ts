/**
 * Type definitions for PSEO (Programmatic SEO) pages
 * Used for generating and managing SEO-optimized landing pages
 */

export interface PSEOAuthor {
  name: string;
  role?: string;
  credentials?: string[];
  bio: string;
  avatar?: string;
}

export interface PSEOExpertise {
  type: string;
  description: string;
}

export interface PSEOFAQ {
  question: string;
  answer: string;
}

export interface PSEOInternalLink {
  text: string;
  url: string;
  context: string;
}

export interface PSEOKeywordMetadata {
  primary: string;
  searchVolume?: number;
  competition?: string;
  priority?: number;
}

export interface PSEOStatistic {
  value: string;
  label: string;
  source?: string;
}

export interface PSEOPage {
  // Core identification
  id?: string;
  slug: string;
  pageType?: string;
  targetKeyword?: string;
  searchIntent?: string;
  
  // SEO metadata
  title: string;
  metaTitle?: string;
  metaDescription: string;
  h1?: string;
  keywords?: string[] | PSEOKeywordMetadata;
  
  // Content
  content: string;
  quickAnswer?: string;
  
  // Structured data
  faqs?: PSEOFAQ[];
  statistics?: PSEOStatistic[];
  internalLinks?: PSEOInternalLink[];
  citations?: string[];
  
  // Author and credibility
  author?: PSEOAuthor;
  reviewedBy?: string;
  expertise?: PSEOExpertise[];
  factChecked?: boolean;
  
  // Schema and SEO
  schema?: Record<string, any>;
  schemaType?: string;
  
  // Publishing metadata
  published?: boolean;
  lastUpdated?: string;
  lastReviewed?: string;
  createdAt?: string;
  readingTime?: number;
  
  // Quality metrics
  qualityScore?: number;
  reviewStatus?: string;
  generationModel?: string;
  
  // CTA
  cta?: string;
  
  // Flexible for additional properties
  [key: string]: any;
}

export interface PSEOPageIndex {
  slug: string;
  title: string;
  category?: string;
  lastUpdated?: string;
  keywords?: PSEOKeywordMetadata;
}
