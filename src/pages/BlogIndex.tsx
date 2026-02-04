import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp, Calculator, Beaker, Globe, Briefcase, Palette, ChevronRight } from 'lucide-react';

interface PageMeta {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  icon: any;
}

const BlogIndex = () => {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPages = async () => {
      // List of all known pages
      const pageFiles = [
        // CAPS Subject Guides
        'grade-12-caps-mathematics-paper-breakdown',
        'grade-12-caps-accounting-financial-statements',
        'grade-12-caps-agricultural-sciences-paper-breakdown',
        'grade-12-caps-business-studies-paper-breakdown',
        'grade-12-caps-cat-paper-breakdown',
        'grade-12-caps-consumer-studies-paper-breakdown',
        'grade-12-caps-design-paper-breakdown',
        'grade-12-caps-dramatic-arts-paper-breakdown',
        'grade-12-caps-economics-paper-breakdown',
        'grade-12-caps-egd-paper-breakdown',
        'grade-12-caps-geography-paper-breakdown',
        'grade-12-caps-history-paper-breakdown',
        'grade-12-caps-it-paper-breakdown',
        'grade-12-caps-music-paper-breakdown',
        'grade-12-caps-religion-studies-paper-breakdown',
        'grade-12-caps-tourism-paper-breakdown',
        'grade-12-caps-visual-arts-paper-breakdown',
        'grade-12-english-fal-paper-breakdown',
        'grade-12-life-sciences-paper-breakdown',
        'grade-12-maths-literacy-paper-breakdown',
        'grade-12-physical-sciences-paper-breakdown',
        'graad-12-afrikaans-eat-paper-breakdown',
        
        // Decision Guides
        'grade-12-maths-vs-maths-literacy-choice',
        'grade-12-nsc-results-guide-bachelor-diploma-pass',
        'grade-9-subject-choice-guide',
        
        // Comparisons
        'comp-ai-tutor-vs-traditional-tutor-which-is-better',
        
        // Pain Points
        'pain-24-7-economics-help-for-matric-students',
        'pain-failing-accounting-grade-10-need-help-fast',
        'pain-failing-mathematics-grade-12-need-help-fast',
        'pain-grade-10-physical-sciences-tutor-for-struggling-students',
        'pain-grade-11-accounting-tutor-for-struggling-students',
        'pain-grade-12-economics-tutor-for-struggling-students',
        'pain-grade-12-english-tutor-for-struggling-students',
        'pain-how-to-pass-matric-physical-sciences-in-3-months',
        'pain-last-minute-accounting-help-matric-finals',
        'pain-last-minute-physical-sciences-help-matric-finals',
        'pain-urgent-english-tutoring-matric-exams-2026',
        'pain-weekend-accounting-tutor-grade-10',
        'pain-weekend-life-sciences-tutor-grade-11',
        'pain-weekend-mathematics-tutor-grade-12',
      ];

      const loadedPages: PageMeta[] = [];

      for (const slug of pageFiles) {
        try {
          const response = await fetch(`/pseo-data/${slug}.json`);
          if (response.ok) {
            const data = await response.json();
            
            let category = 'Other';
            let icon = BookOpen;
            
            if (slug.includes('pain-')) {
              category = 'Get Help Fast';
              icon = TrendingUp;
            } else if (slug.includes('comp-')) {
              category = 'Comparisons';
              icon = TrendingUp;
            } else if (slug.includes('mathematics') || slug.includes('maths')) {
              category = 'Mathematics';
              icon = Calculator;
            } else if (slug.includes('sciences') || slug.includes('physics') || slug.includes('chemistry')) {
              category = 'Sciences';
              icon = Beaker;
            } else if (slug.includes('geography') || slug.includes('history')) {
              category = 'Humanities';
              icon = Globe;
            } else if (slug.includes('business') || slug.includes('economics') || slug.includes('accounting')) {
              category = 'Commerce';
              icon = Briefcase;
            } else if (slug.includes('arts') || slug.includes('design') || slug.includes('music')) {
              category = 'Arts & Design';
              icon = Palette;
            } else if (slug.includes('choice') || slug.includes('results') || slug.includes('vs')) {
              category = 'Decision Guides';
              icon = BookOpen;
            } else if (slug.includes('caps-')) {
              category = 'CAPS Exam Guides';
              icon = BookOpen;
            }

            loadedPages.push({
              slug,
              title: data.title || data.metaTitle,
              metaDescription: data.metaDescription,
              category,
              icon,
            });
          }
        } catch (err) {
          console.error(`Failed to load ${slug}:`, err);
        }
      }

      setPages(loadedPages);
      setLoading(false);
    };

    loadPages();
  }, []);

  // Group pages by category
  const categorizedPages = pages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, PageMeta[]>);

  // Sort categories by priority
  const categoryOrder = [
    'Get Help Fast',
    'Mathematics',
    'Sciences',
    'Commerce',
    'Humanities',
    'Arts & Design',
    'Decision Guides',
    'CAPS Exam Guides',
    'Comparisons',
    'Other',
  ];

  const sortedCategories = Object.keys(categorizedPages).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <>
      <Helmet>
        <title>Study Guides & Resources | StudyBuddy Works</title>
        <meta name="description" content="Browse our comprehensive collection of matric study guides, exam breakdowns, and tutoring resources for South African students. Free CAPS-aligned content." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://studybuddy.works/resources" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Study Resources & Guides
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive CAPS-aligned study guides, exam breakdowns, and expert advice 
                for South African matric students. All resources are free and regularly updated.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{pages.length}</div>
                <div className="text-gray-700">Study Guides</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{Object.keys(categorizedPages).length}</div>
                <div className="text-gray-700">Categories</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-700">CAPS Aligned</div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading resources...</p>
              </div>
            ) : (
              <>
                {/* Categorized Pages */}
                {sortedCategories.map((category) => {
                  const categoryPages = categorizedPages[category];
                  const Icon = categoryPages[0]?.icon || BookOpen;

                  return (
                    <div key={category} className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categoryPages.map((page) => (
                          <Link
                            key={page.slug}
                            to={`/${page.slug}`}
                            className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                  {page.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {page.metaDescription}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-center text-white mt-12">
                  <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Get unlimited access to our AI tutor for just R99/month
                  </p>
                  <Link to="/students">
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                      Start Your Free Trial
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
