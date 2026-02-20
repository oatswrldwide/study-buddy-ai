/**
 * Dynamic SEO Page Component with AEO optimization
 * 
 * Renders pSEO content with:
 * - Schema.org markup
 * - FAQ structured data
 * - Quick answer snippets
 * - Citation-worthy statistics
 */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { GeneratedPage } from '@/lib/pseo-generator';

export default function SEOPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<GeneratedPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    const db = getFirestore();
    const docRef = doc(db, 'seo_pages', slug.replace(/\//g, '_'));
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setPage(docSnap.data() as GeneratedPage);
      } else {
        // Page not found - could trigger on-demand generation
        console.log('Page not found, could generate on-demand');
      }
    }).catch((error) => {
      console.error('Error loading page:', error);
    }).finally(() => {
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">This page doesn't exist yet.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        
        {/* Open Graph */}
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={page.lastUpdated} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        
        {/* AEO Optimization */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="citation-title" content={page.title} />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(page.schema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.h1}</h1>
              
              {/* Quick Answer Box (AEO Feature) */}
              <Card className="p-6 bg-primary/5 border-primary/20 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Quick Answer</h2>
                    <p className="text-foreground/80 leading-relaxed">{page.quickAnswer}</p>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => window.location.href = '/students'}>
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.location.href = '/schools'}>
                  For Schools
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Statistics Highlight (AEO Feature) */}
              {page.statistics.length > 0 && (
                <Card className="p-6 mb-12 bg-accent/5">
                  <h2 className="text-2xl font-bold mb-4">Key Statistics</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {page.statistics.map((stat, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <div>
                          <p className="font-semibold">{stat.claim}</p>
                          <p className="text-sm text-muted-foreground">
                            Source: {stat.source} ({stat.year})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Main Article Content */}
              <article 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(page.content) }}
              />

              {/* FAQs (Critical for AEO!) */}
              {page.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {page.faqs.map((faq, index) => (
                      <Card key={index} className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                        <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <Card className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-foreground/80 mb-6">
                  Join South African students improving their grades with AI-powered tutoring.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" onClick={() => window.location.href = '/students'}>
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => window.location.href = '/schools'}>
                    Schedule Demo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No credit card required • 7-day free trial • Cancel anytime
                </p>
              </Card>

              {/* Last Updated (Freshness Signal for AEO) */}
              <p className="text-sm text-muted-foreground text-center mt-8">
                Last updated: {new Date(page.lastUpdated).toLocaleDateString('en-ZA', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/**
 * Simple markdown to HTML converter
 * In production, use a proper library like marked or remark
 */
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8">$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(.+)$/gim, '<p class="mb-4">$1</p>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-4">$1</ul>');
}
