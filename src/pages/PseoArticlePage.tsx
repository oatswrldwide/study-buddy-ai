import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock, Star, Users, ChevronRight } from "lucide-react";

interface PseoFAQ {
  question: string;
  answer: string;
}

interface PseoAuthor {
  name: string;
  role: string;
  credentials?: string[];
  bio?: string;
}

interface PseoPage {
  slug: string;
  pageType: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  quickAnswer?: string;
  faqs: PseoFAQ[];
  author?: PseoAuthor;
  reviewedBy?: string;
  factChecked?: boolean;
  lastUpdated?: string;
  lastReviewed?: string;
  citations?: string[];
  keywords?: string[];
  published: boolean;
  qualityScore?: number;
}

interface IndexEntry {
  slug: string;
  title: string;
  description: string;
  pageType: string;
  published: boolean;
  keywords?: string[];
}

const PAGE_TYPE_LABELS: Record<string, string> = {
  "pain-point": "Get Help Fast",
  "comparison": "Comparison",
  "guide": "Study Guide",
  "caps-breakdown": "CAPS Guide",
  "decision": "Decision Guide",
};

const PAGE_TYPE_COLORS: Record<string, string> = {
  "pain-point": "bg-red-100 text-red-700",
  "comparison": "bg-blue-100 text-blue-700",
  "guide": "bg-green-100 text-green-700",
  "caps-breakdown": "bg-purple-100 text-purple-700",
  "decision": "bg-amber-100 text-amber-700",
};

// Strip internal scaffolding headings from AI-generated content
function cleanContent(content: string): string {
  return content
    .replace(/^##\s*Landing Page for.*?\n/gm, "")
    .replace(/^###\s*\d+\.\s*/gm, "### ")
    .trim();
}

// Find related articles from the index, matching by keywords/pageType
function getRelatedArticles(
  allArticles: IndexEntry[],
  current: PseoPage,
  count = 4
): IndexEntry[] {
  const currentKeywords = new Set((current.keywords || []).map((k) => k.toLowerCase()));
  return allArticles
    .filter((a) => a.published && a.slug !== current.slug)
    .map((a) => {
      const sharedKeywords = (a.keywords || []).filter((k) =>
        currentKeywords.has(k.toLowerCase())
      ).length;
      const sameType = a.pageType === current.pageType ? 2 : 0;
      return { article: a, score: sharedKeywords + sameType };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.article);
}

const PseoArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PseoPage | null>(null);
  const [related, setRelated] = useState<IndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    // Load the article and index in parallel
    Promise.all([
      fetch(`/pseo-data/${slug}.json`).then((r) => (r.ok ? r.json() : null)),
      fetch("/pseo-data/index.json").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([data, index]) => {
        if (!data || !data.published) {
          setNotFound(true);
        } else {
          setPage(data as PseoPage);
          setRelated(getRelatedArticles(index as IndexEntry[], data as PseoPage));
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              This article doesn't exist or isn't available yet.
            </p>
            <Button asChild>
              <Link to="/resources">Browse All Resources</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const cleanedContent = cleanContent(page.content);
  const typeLabel = PAGE_TYPE_LABELS[page.pageType] || "Article";
  const typeBadgeClass = PAGE_TYPE_COLORS[page.pageType] || "bg-gray-100 text-gray-700";
  const publishedDate = page.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://studybuddy.works/resources" },
      { "@type": "ListItem", position: 3, name: page.metaTitle, item: `https://studybuddy.works/${slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.metaTitle,
    description: page.metaDescription,
    author: { "@type": "Organization", name: page.author?.name || "StudyBuddy Works" },
    dateModified: page.lastUpdated,
    dateReviewed: page.lastReviewed,
    publisher: { "@type": "Organization", name: "StudyBuddy Works", url: "https://studybuddy.works" },
  };

  const faqSchema = page.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <Helmet>
        <title>{page.metaTitle} | StudyBuddy Works</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="robots" content="index, follow, max-snippet:-1" />
        <link rel="canonical" href={`https://studybuddy.works/${slug}`} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://studybuddy.works/${slug}`} />
        <meta property="article:published_time" content={page.lastUpdated} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Breadcrumbs */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container max-w-4xl mx-auto px-4 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/resources">Resources</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-xs">
                    {page.metaTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14 border-b border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${typeBadgeClass}`}>
              {typeLabel}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {page.metaTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              {page.metaDescription}
            </p>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              {page.author && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {page.author.name}
                </span>
              )}
              {page.factChecked && (
                <span className="flex items-center gap-1.5 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Fact Checked
                </span>
              )}
              {publishedDate && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Updated {publishedDate}
                </span>
              )}
              {page.qualityScore && page.qualityScore >= 8 && (
                <span className="flex items-center gap-1.5 text-amber-600">
                  <Star className="w-4 h-4 fill-current" />
                  Editor's Pick
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/students">Get Free AI Tutoring</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/locations">Find Tutors Near You</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container max-w-4xl mx-auto px-4 py-10 md:py-14">
          {/* Quick Answer Box */}
          {page.quickAnswer && page.quickAnswer !== page.content && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10 flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-primary mb-1">Quick Answer</p>
                <p className="text-foreground/80 leading-relaxed text-sm">{page.quickAnswer}</p>
              </div>
            </div>
          )}

          {/* Main Article Content */}
          <article className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-li:text-foreground/80
            prose-table:border prose-table:border-border
            prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold
            prose-td:p-3 prose-td:border prose-td:border-border
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />

          {/* FAQs */}
          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-14 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {page.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Author Card */}
          {page.author && (
            <section className="mt-14 pt-10 border-t border-border">
              <div className="bg-muted/30 rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-bold">{page.author.name}</p>
                      <span className="text-sm text-muted-foreground">— {page.author.role}</span>
                    </div>
                    {page.author.credentials && page.author.credentials.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {page.author.credentials.map((c, i) => (
                          <span key={i} className="text-xs bg-background border border-border rounded px-2 py-0.5">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    {page.author.bio && (
                      <p className="text-sm text-muted-foreground">{page.author.bio}</p>
                    )}
                    {page.reviewedBy && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Reviewed by: <strong>{page.reviewedBy}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <section className="mt-14 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Need More Help?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Get unlimited 24/7 AI tutoring for all CAPS subjects — just R99/month.
              7-day free trial, no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/students">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/schools">For Schools</Link>
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-4">No credit card • Cancel anytime • CAPS-aligned</p>
          </section>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-14 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Related Resources
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/${article.slug}`}
                    className="group flex items-start gap-3 p-4 border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/resources" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  View all study resources
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </section>
          )}

          {/* Citations */}
          {page.citations && page.citations.length > 0 && (
            <section className="mt-10 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground font-semibold mb-2">Sources</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {page.citations.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PseoArticlePage;
