/**
 * pSEO Types for Content Generation and Management
 * Optimized for both traditional SEO and AEO (Answer Engine Optimization)
 */

export interface PSEOPage {
  id: string;
  slug: string;
  pageType: 'subject' | 'location' | 'comparison' | 'guide' | 'pain-point' | 'exam-prep' | 'pricing' | 'suburb-specific';
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  targetKeyword?: string; // Primary keyword for SEO
  searchIntent?: 'urgent-help' | 'struggling' | 'exam-prep' | 'comparison' | 'pricing' | 'local';
  
  // AEO-specific fields
  quickAnswer?: string; // For AI engine snippets
  faqs?: FAQ[]; // Structured Q&A for ChatGPT/Perplexity
  citations?: string[]; // Authoritative sources
  
  // E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
  author?: AuthorInfo;
  reviewedBy?: string;
  expertise?: ExpertiseSignal[];
  lastReviewed?: string;
  factChecked?: boolean;
  
  // Schema.org structured data
  schemaType: 'Course' | 'LocalBusiness' | 'FAQPage' | 'Article';
  schemaData?: Record<string, any>;
  
  // Metadata
  subject?: string;
  grade?: number;
  location?: string;
  province?: string;
  
  // Content management
  published: boolean;
  qualityScore?: number; // 0-10 AI-generated quality score
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  lastUpdated: string;
  createdAt?: string;
  
  // Generation tracking
  generationModel?: string;
  generationCost?: number;
  tokensUsed?: number;
}

export interface FAQ {
  question: string;
  answer: string;
  keywords?: string[]; // For internal linking
}

export interface AuthorInfo {
  name: string;
  role: string;
  credentials?: string[];
  bio?: string;
  linkedIn?: string;
}

export interface ExpertiseSignal {
  type: 'certification' | 'experience' | 'publication' | 'education';
  description: string;
  year?: number;
}

export interface ContentTemplate {
  type: 'subject' | 'location' | 'comparison';
  promptTemplate: string;
  outputFormat: 'markdown' | 'html';
  requiredFields: string[];
  optionalFields?: string[];
}

export interface GenerationConfig {
  models: {
    outline: string; // Fast model for structure
    content: string; // Quality model for main content
    metadata: string; // Fast model for SEO tags
    qa: string; // Q&A optimized model
  };
  batchSize: number;
  delayBetweenCalls: number; // Rate limiting (ms)
  qualityThreshold: number; // Auto-publish if score >= this
  includeAEO: boolean; // Enable AEO optimizations
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  hreflang?: { lang: string; url: string }[];
}

export const SUBJECTS = [
  'Mathematics',
  'Physical Sciences',
  'Life Sciences',
  'English',
  'Afrikaans',
  'Accounting',
  'Business Studies',
  'Economics',
  'History',
  'Geography',
] as const;

export const GRADES = [8, 9, 10, 11, 12] as const;

export const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
] as const;

export const MAJOR_CITIES: Record<string, string[]> = {
  Gauteng: ['Johannesburg', 'Pretoria', 'Midrand'],
  'Western Cape': ['Cape Town', 'Stellenbosch', 'Paarl'],
  'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Richards Bay'],
  'Eastern Cape': ['Port Elizabeth', 'East London', 'Mthatha'],
  'Free State': ['Bloemfontein', 'Welkom', 'Bethlehem'],
  Limpopo: ['Polokwane', 'Tzaneen', 'Mokopane'],
  Mpumalanga: ['Nelspruit', 'Witbank', 'Middelburg'],
  'North West': ['Rustenburg', 'Mahikeng', 'Klerksdorp'],
  'Northern Cape': ['Kimberley', 'Upington', 'Kuruman'],
};
