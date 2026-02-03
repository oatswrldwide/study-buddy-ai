import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PSEOPage } from '@/lib/pseo-types';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        <meta property="og:url" content={`https://studybuddy.works/${page.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://studybuddy.works/${page.slug}`} />
        
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

      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-secondary to-primary py-16 md:py-24">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          <div className="container max-w-5xl relative">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {page.title}
            </h1>
            {page.quickAnswer && (
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200 p-6 md:p-8 rounded-2xl shadow-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                    {page.quickAnswer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <article className="container max-w-5xl py-12 md:py-16">
          <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 max-w-none">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>

          {/* FAQ Section (AEO-optimized) */}
          {page.faqs && page.faqs.length > 0 && (
            <div className="mt-16 bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {page.faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-start gap-3 text-gray-900">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 ml-8 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-primary via-secondary to-primary text-white p-8 md:p-12 rounded-2xl text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Improve Your Grades?
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Join thousands of South African students getting better results with StudyBuddy's 24/7 AI tutor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-lg"
              >
                <Link to="/students-landing">
                  Start Learning FREE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Link to="/students-landing#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-base opacity-90">
              ✓ FREE to start • ✓ No credit card required • ✓ Cancel anytime
            </p>
          </div>

          {/* E-E-A-T Footer */}
          {page.author && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">Written by {page.author.name}</p>
                  <p>{page.author.role}</p>
                  {page.reviewedBy && (
                    <p className="mt-1">Reviewed by {page.reviewedBy}</p>
                  )}
                </div>
                <div className="text-right">
                  <p>Last updated: {new Date(page.lastUpdated).toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</p>
                  {page.factChecked && (
                    <p className="mt-1 text-primary font-semibold">✓ Fact-checked</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Citations */}
          {page.citations && page.citations.length > 0 && (
            <div className="mt-8 text-sm text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Sources & References:</h3>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                {page.citations.map((citation, index) => (
                  <li key={index}>{citation}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
        
        <Footer />
      </div>
    </>
  );
}
