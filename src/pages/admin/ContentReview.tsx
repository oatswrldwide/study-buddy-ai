/**
 * Admin interface for reviewing AI-generated content
 * 
 * Features:
 * - View all pages pending review
 * - See quality scores
 * - Approve/reject/regenerate content
 * - Edit metadata
 */

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getFirestore } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GeneratedPage } from '@/lib/pseo-generator';

interface PageWithId extends GeneratedPage {
  id: string;
  status: 'published' | 'review' | 'rejected';
}

export default function ContentReview() {
  const [pages, setPages] = useState<PageWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'review' | 'published' | 'rejected'>('review');

  useEffect(() => {
    loadPages();
  }, [filter]);

  async function loadPages() {
    try {
      const db = getFirestore();
      const pagesSnapshot = await getDocs(collection(db, 'seo_pages'));
      
      const loadedPages: PageWithId[] = [];
      pagesSnapshot.forEach((doc) => {
        const data = doc.data();
        if (filter === 'all' || data.status === filter) {
          loadedPages.push({
            id: doc.id,
            ...data,
          } as PageWithId);
        }
      });

      // Sort by quality score (lowest first for review)
      loadedPages.sort((a, b) => a.qualityScore - b.qualityScore);
      
      setPages(loadedPages);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(pageId: string, status: 'published' | 'rejected') {
    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'seo_pages', pageId), {
        status,
        reviewedAt: new Date().toISOString(),
      });

      // Remove from list
      setPages(pages.filter(p => p.id !== pageId));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content Review</h1>
          <p className="text-muted-foreground">
            Review AI-generated content before publishing
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'review' ? 'default' : 'outline'}
            onClick={() => setFilter('review')}
          >
            Needs Review
          </Button>
          <Button
            variant={filter === 'published' ? 'default' : 'outline'}
            onClick={() => setFilter('published')}
          >
            Published
          </Button>
          <Button
            variant={filter === 'rejected' ? 'default' : 'outline'}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </Button>
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-2xl font-bold">{pages.length}</div>
            <div className="text-sm text-muted-foreground">Total Pages</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {pages.filter(p => p.qualityScore >= 8).length}
            </div>
            <div className="text-sm text-muted-foreground">High Quality (≥8)</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {pages.filter(p => p.qualityScore >= 6 && p.qualityScore < 8).length}
            </div>
            <div className="text-sm text-muted-foreground">Medium (6-7)</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold">
              {pages.filter(p => p.qualityScore < 6).length}
            </div>
            <div className="text-sm text-muted-foreground">Low Quality (&lt;6)</div>
          </Card>
        </div>

        {/* Pages List */}
        <div className="space-y-4">
          {pages.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No pages to review</p>
            </Card>
          ) : (
            pages.map((page) => (
              <Card key={page.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{page.title}</h3>
                      <Badge variant={getQualityBadgeVariant(page.qualityScore)}>
                        Score: {page.qualityScore}/10
                      </Badge>
                      <Badge variant="outline">{page.status}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      /{page.slug}
                    </p>
                    
                    <p className="text-sm mb-3">{page.metaDescription}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Word Count:</span>{' '}
                        {page.content.split(/\s+/).length}
                      </div>
                      <div>
                        <span className="font-medium">FAQs:</span> {page.faqs.length}
                      </div>
                      <div>
                        <span className="font-medium">Statistics:</span>{' '}
                        {page.statistics.length}
                      </div>
                    </div>

                    {/* Quick Answer Preview */}
                    {page.quickAnswer && (
                      <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                        <div className="text-xs font-medium text-primary mb-1">
                          Quick Answer (AEO)
                        </div>
                        <div className="text-sm">{page.quickAnswer}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(`/preview/${page.slug}`, '_blank')}
                    >
                      Preview
                    </Button>
                    {page.status === 'review' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(page.id, 'published')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(page.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function getQualityBadgeVariant(score: number): 'default' | 'secondary' | 'destructive' {
  if (score >= 8) return 'default';
  if (score >= 6) return 'secondary';
  return 'destructive';
}
