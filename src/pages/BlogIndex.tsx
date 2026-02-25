import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  BookOpen,
  TrendingUp,
  Calculator,
  Beaker,
  Briefcase,
  Globe,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface IndexEntry {
  slug: string;
  title: string;
  description: string;
  pageType: string;
  published: boolean;
  qualityScore?: number;
  lastUpdated?: string;
  keywords?: string[];
}

interface CategoryConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

function getCategoryConfig(entry: IndexEntry): CategoryConfig {
  const { pageType, slug, keywords = [] } = entry;
  const all = [slug, ...keywords].join(' ').toLowerCase();

  if (pageType === 'guide' && all.match(/study.guide|matric.finals/)) return { label: 'Matric Study Guides', icon: BookOpen };
  if (pageType === 'comparison') return { label: 'Comparisons', icon: TrendingUp };
  if (all.match(/mathematic|maths/)) return { label: 'Mathematics', icon: Calculator };
  if (all.match(/physical.science|chemistry|physics/)) return { label: 'Sciences', icon: Beaker };
  if (all.match(/life.science|biology/)) return { label: 'Life Sciences', icon: Beaker };
  if (all.match(/accounting|economics|business|commerce/)) return { label: 'Commerce', icon: Briefcase };
  if (all.match(/english|afrikaans|language/)) return { label: 'Languages', icon: BookOpen };
  if (all.match(/history|geography|tourism/)) return { label: 'Humanities', icon: Globe };
  return { label: 'Get Help Fast', icon: TrendingUp };
}

const CATEGORY_ORDER = [
  'Matric Study Guides',
  'Get Help Fast',
  'Mathematics',
  'Sciences',
  'Life Sciences',
  'Commerce',
  'Languages',
  'Humanities',
  'Comparisons',
  'Other',
];

const BlogIndex = () => {
  const [articles, setArticles] = useState<IndexEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/pseo-data/index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: IndexEntry[]) => {
        setArticles(data.filter((a) => a.published));
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  // Group by category
  const categorized = articles.reduce(
    (acc, entry) => {
      const { label } = getCategoryConfig(entry);
      if (!acc[label]) acc[label] = [];
      acc[label].push(entry);
      return acc;
    },
    {} as Record<string, IndexEntry[]>
  );

  const sortedCategories = Object.keys(categorized).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  return (
    <>
      <Helmet>
        <title>Study Guides & Resources | StudyBuddy Works</title>
        <meta
          name="description"
          content="Browse our comprehensive collection of matric study guides, exam breakdowns, and tutoring resources for South African students. Free CAPS-aligned content."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://studybuddy.works/resources" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://studybuddy.works/' },
              { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://studybuddy.works/resources' },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Resources</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">

            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Study Resources & Guides
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Comprehensive CAPS-aligned study guides and expert advice for South African
                matric students. All resources are free and regularly updated.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/students">
                  <Button variant="outline" size="sm">🎓 Get AI Tutoring</Button>
                </Link>
                <Link to="/locations">
                  <Button variant="outline" size="sm">📍 Find Local Tutors</Button>
                </Link>
                <Link to="/schools">
                  <Button variant="outline" size="sm">🏫 For Schools</Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" size="sm">🎮 Try Demo</Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {loading ? '…' : articles.length}
                </div>
                <div className="text-gray-700">Study Guides</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {loading ? '…' : sortedCategories.length}
                </div>
                <div className="text-gray-700">Categories</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-700">CAPS Aligned</div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="mt-4 text-gray-600">Loading resources…</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources available yet. Check back soon.</p>
              </div>
            ) : (
              <>
                {sortedCategories.map((category) => {
                  const entries = categorized[category];
                  const { icon: Icon } = getCategoryConfig(entries[0]);
                  const isFeatured = category === 'Matric Study Guides';

                  return (
                    <div key={category} className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className={`w-6 h-6 ${isFeatured ? 'text-green-600' : 'text-primary'}`} />
                        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                        <span className="text-sm text-muted-foreground">
                          ({entries.length})
                        </span>
                        {isFeatured && (
                          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Comprehensive
                          </span>
                        )}
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>

                      <div className={`grid grid-cols-1 ${isFeatured ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                        {entries.map((entry) => (
                          <Link
                            key={entry.slug}
                            to={`/${entry.slug}`}
                            className={`group rounded-xl p-5 hover:shadow-md transition-all duration-200 ${
                              isFeatured
                                ? 'bg-gradient-to-br from-green-50 to-white border border-green-200 hover:border-green-400'
                                : 'bg-white border border-gray-200 hover:border-primary'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h3 className={`text-base font-semibold transition-colors mb-1.5 line-clamp-2 ${
                                  isFeatured
                                    ? 'text-gray-900 group-hover:text-green-700'
                                    : 'text-gray-900 group-hover:text-primary'
                                }`}>
                                  {entry.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                  {entry.description}
                                </p>
                              </div>
                              <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5 ${
                                isFeatured ? 'text-green-400 group-hover:text-green-600' : 'text-gray-400 group-hover:text-primary'
                              }`} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* CTA */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-center text-white mt-12">
                  <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Get unlimited access to our AI tutor for just R99/month
                  </p>
                  <Link to="/students">
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
