import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PSEOPage } from '@/lib/pseo-types';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function PSEOPageTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PSEOPage | null>(null);
  const [loading, setLoading] = useState(true);

  // Track page view for analytics
  useEffect(() => {
    if (page) {
      // Google Analytics 4 tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: page.title,
          page_location: window.location.href,
          page_path: `/${page.slug}`,
          page_type: page.pageType,
          target_keyword: page.targetKeyword || page.title,
          search_intent: page.searchIntent || 'informational',
        });
      }
    }
  }, [page]);

  // Track CTA clicks
  const trackCTAClick = (ctaLocation: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        page_type: page?.pageType,
        cta_location: ctaLocation,
        target_keyword: page?.targetKeyword,
        page_slug: page?.slug,
      });
    }
  };

  useEffect(() => {
    if (!slug) return;

    const loadPage = async () => {
      try {
        // Try different page type prefixes (pain, comp, price, subject, location)
        const prefixes = ['pain', 'comp', 'price', 'subject', 'location', 'exam', 'suburb'];
        
        for (const prefix of prefixes) {
          try {
            const response = await fetch(`/pseo-data/${prefix}-${slug}.json`);
            if (response.ok) {
              const data = await response.json();
              setPage(data as PSEOPage);
              return;
            }
          } catch (err) {
            // Try next prefix
            continue;
          }
        }
        
        // If no prefix worked, try without prefix
        const response = await fetch(`/pseo-data/${slug}.json`);
        if (response.ok) {
          const data = await response.json();
          setPage(data as PSEOPage);
        }
      } catch (error) {
        console.error('Error loading page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!page || !page.published) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This page doesn't exist or hasn't been published yet.
          </p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  // Generate Schema.org markup for AEO
  const generateSchemaMarkup = () => {
    if (page.pageType === 'subject' && page.schemaType === 'Course') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `${page.subject} - Grade ${page.grade}`,
        description: page.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'StudyBuddy Works',
          url: 'https://studybuddyworks.com',
        },
        educationalLevel: `Grade ${page.grade}`,
        inLanguage: ['en-ZA', 'en'],
        teaches: page.subject,
        offers: {
          '@type': 'Offer',
          price: '99',
          priceCurrency: 'ZAR',
          category: 'Education',
        },
      };
    }

    if (page.pageType === 'location' && page.schemaType === 'LocalBusiness') {
      return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'StudyBuddy Works',
        description: page.metaDescription,
        address: {
          '@type': 'PostalAddress',
          addressLocality: page.location,
          addressRegion: page.province,
          addressCountry: 'ZA',
        },
        areaServed: {
          '@type': 'City',
          name: page.location,
        },
        priceRange: 'R99',
      };
    }

    return null;
  };

  // Generate FAQ Schema for AI engines
  const generateFAQSchema = () => {
    if (!page.faqs || page.faqs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  };

  const schemaMarkup = generateSchemaMarkup();
  const faqSchema = generateFAQSchema();

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords?.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://studybuddyworks.com/${page.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://studybuddyworks.com/${page.slug}`} />
        
        {/* Schema.org markup for AEO */}
        {schemaMarkup && (
          <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
          </script>
        )}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
        
        {/* Last updated (freshness signal for AI engines) */}
        <meta property="article:modified_time" content={page.lastUpdated} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {page.title}
            </h1>
            {page.quickAnswer && (
              <div className="bg-card border-l-4 border-primary p-6 rounded-lg shadow-sm">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {page.quickAnswer}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <article className="container max-w-4xl py-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>

          {/* FAQ Section (AEO-optimized) */}
          {page.faqs && page.faqs.length > 0 && (
            <div className="mt-12 bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {page.faqs.map((faq, index) => (
                  <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-semibold mb-2 flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground ml-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Citations (for AI engine credibility) */}
          {page.citations && page.citations.length > 0 && (
            <div className="mt-8 text-sm text-muted-foreground">
              <h3 className="font-semibold mb-2">Sources:</h3>
              <ul className="list-disc list-inside space-y-1">
                {page.citations.map((citation, index) => (
                  <li key={index}>{citation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Learning with AI?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of South African students improving their grades with StudyBuddy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg"
                onClick={() => {
                  trackCTAClick('bottom-cta-primary');
                  window.location.href = '/students-landing';
                }}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg bg-white/10 hover:bg-white/20 text-white border-white"
                onClick={() => {
                  trackCTAClick('bottom-cta-secondary');
                  window.location.href = '/students-landing#pricing';
                }}
              >
                View Pricing
              </Button>
            </div>
            <p className="mt-4 text-sm opacity-75">
              No credit card required • Cancel anytime • R99/month unlimited
            </p>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-sm text-muted-foreground text-center">
            Last updated: {new Date(page.lastUpdated).toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </article>
      </div>
    </>
  );
}
