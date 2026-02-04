import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Search, GraduationCap, AlertCircle, FileText } from 'lucide-react';

interface Resource {
  slug: string;
  title: string;
  category: string;
}

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Load all PSEO page metadata
        const pseoFiles = [
          // Pain Point Pages - Urgent Help
          { slug: 'failing-mathematics-grade-12-need-help-fast', title: 'Failing Maths Grade 12? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-mathematics-grade-11-need-help-fast', title: 'Failing Maths Grade 11? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-mathematics-grade-10-need-help-fast', title: 'Failing Maths Grade 10? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-physical-sciences-grade-10-need-help-fast', title: 'Failing Physical Sciences Grade 10? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-life-sciences-grade-11-need-help-fast', title: 'Failing Life Sciences Grade 11? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-life-sciences-grade-10-need-help-fast', title: 'Failing Life Sciences Grade 10? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-accounting-grade-11-need-help-fast', title: 'Failing Accounting Grade 11? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-accounting-grade-10-need-help-fast', title: 'Failing Accounting Grade 10? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-economics-grade-12-need-help-fast', title: 'Failing Economics Grade 12? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-economics-grade-11-need-help-fast', title: 'Failing Economics Grade 11? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-english-grade-11-need-help-fast', title: 'Failing English Grade 11? Get Help Fast', category: 'Urgent Help' },
          { slug: 'failing-english-grade-10-need-help-fast', title: 'Failing English Grade 10? Get Help Fast', category: 'Urgent Help' },
          
          // Pain Point Pages - Last Minute Help
          { slug: 'last-minute-mathematics-help-matric-finals', title: 'Last Minute Maths Help for Matric Finals', category: 'Exam Preparation' },
          { slug: 'last-minute-physical-sciences-help-matric-finals', title: 'Last Minute Physical Sciences Help for Matric Finals', category: 'Exam Preparation' },
          { slug: 'last-minute-accounting-help-matric-finals', title: 'Last Minute Accounting Help for Matric Finals', category: 'Exam Preparation' },
          { slug: 'last-minute-economics-help-matric-finals', title: 'Last Minute Economics Help for Matric Finals', category: 'Exam Preparation' },
          { slug: 'urgent-english-tutoring-matric-exams-2026', title: 'Urgent English Tutoring for Matric Exams 2026', category: 'Exam Preparation' },
          { slug: 'urgent-physical-sciences-tutoring-matric-exams-2026', title: 'Urgent Physical Sciences Tutoring for Matric Exams 2026', category: 'Exam Preparation' },
          
          // Pain Point Pages - Struggling Students
          { slug: 'grade-12-economics-tutor-for-struggling-students', title: 'Grade 12 Economics Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-12-english-tutor-for-struggling-students', title: 'Grade 12 English Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-11-accounting-tutor-for-struggling-students', title: 'Grade 11 Accounting Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-11-life-sciences-tutor-for-struggling-students', title: 'Grade 11 Life Sciences Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-11-physical-sciences-tutor-for-struggling-students', title: 'Grade 11 Physical Sciences Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-10-economics-tutor-for-struggling-students', title: 'Grade 10 Economics Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-10-life-sciences-tutor-for-struggling-students', title: 'Grade 10 Life Sciences Tutor for Struggling Students', category: 'Tutoring Services' },
          { slug: 'grade-10-physical-sciences-tutor-for-struggling-students', title: 'Grade 10 Physical Sciences Tutor for Struggling Students', category: 'Tutoring Services' },
          
          // Pain Point Pages - How To Guides
          { slug: 'how-to-pass-matric-accounting-in-3-months', title: 'How to Pass Matric Accounting in 3 Months', category: 'Study Guides' },
          { slug: 'how-to-pass-matric-physical-sciences-in-3-months', title: 'How to Pass Matric Physical Sciences in 3 Months', category: 'Study Guides' },
          { slug: 'how-to-ace-accounting-matric-exams', title: 'How to Ace Accounting Matric Exams', category: 'Study Guides' },
          { slug: 'struggling-with-mathematics-how-to-improve-quickly', title: 'Struggling with Maths? How to Improve Quickly', category: 'Study Guides' },
          { slug: 'struggling-with-economics-how-to-improve-quickly', title: 'Struggling with Economics? How to Improve Quickly', category: 'Study Guides' },
          { slug: 'struggling-with-english-how-to-improve-quickly', title: 'Struggling with English? How to Improve Quickly', category: 'Study Guides' },
          
          // Pain Point Pages - Weekend Tutoring
          { slug: 'weekend-mathematics-tutor-grade-12', title: 'Weekend Maths Tutor for Grade 12', category: 'Tutoring Services' },
          { slug: 'weekend-physical-sciences-tutor-grade-12', title: 'Weekend Physical Sciences Tutor for Grade 12', category: 'Tutoring Services' },
          { slug: 'weekend-physical-sciences-tutor-grade-11', title: 'Weekend Physical Sciences Tutor for Grade 11', category: 'Tutoring Services' },
          { slug: 'weekend-life-sciences-tutor-grade-11', title: 'Weekend Life Sciences Tutor for Grade 11', category: 'Tutoring Services' },
          { slug: 'weekend-accounting-tutor-grade-10', title: 'Weekend Accounting Tutor for Grade 10', category: 'Tutoring Services' },
          { slug: 'weekend-economics-tutor-grade-10', title: 'Weekend Economics Tutor for Grade 10', category: 'Tutoring Services' },
          
          // Pain Point Pages - Parent Concerns
          { slug: 'best-tutor-for-my-child-grade-12-economics', title: 'Best Tutor for My Child - Grade 12 Economics', category: 'Parent Resources' },
          { slug: 'best-tutor-for-my-child-grade-12-physical-sciences', title: 'Best Tutor for My Child - Grade 12 Physical Sciences', category: 'Parent Resources' },
          { slug: '24-7-economics-help-for-matric-students', title: '24/7 Economics Help for Matric Students', category: 'Parent Resources' },
          
          // Comparison Pages
          { slug: 'ai-tutor-vs-traditional-tutor-which-is-better', title: 'AI Tutor vs Traditional Tutor: Which Is Better?', category: 'Comparisons' },
          
          // Subject & Exam Breakdown Pages
          { slug: 'grade-12-caps-mathematics-paper-breakdown', title: 'Grade 12 CAPS Mathematics Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-physical-sciences-paper-breakdown', title: 'Grade 12 Physical Sciences Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-life-sciences-paper-breakdown', title: 'Grade 12 Life Sciences Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-accounting-financial-statements', title: 'Grade 12 CAPS Accounting & Financial Statements', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-economics-paper-breakdown', title: 'Grade 12 CAPS Economics Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-english-fal-paper-breakdown', title: 'Grade 12 English FAL Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-maths-literacy-paper-breakdown', title: 'Grade 12 Maths Literacy Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-business-studies-paper-breakdown', title: 'Grade 12 CAPS Business Studies Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-geography-paper-breakdown', title: 'Grade 12 CAPS Geography Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-history-paper-breakdown', title: 'Grade 12 CAPS History Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-cat-paper-breakdown', title: 'Grade 12 CAPS CAT Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-it-paper-breakdown', title: 'Grade 12 CAPS IT Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-tourism-paper-breakdown', title: 'Grade 12 CAPS Tourism Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-agricultural-sciences-paper-breakdown', title: 'Grade 12 CAPS Agricultural Sciences Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-consumer-studies-paper-breakdown', title: 'Grade 12 CAPS Consumer Studies Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-design-paper-breakdown', title: 'Grade 12 CAPS Design Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-dramatic-arts-paper-breakdown', title: 'Grade 12 CAPS Dramatic Arts Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-egd-paper-breakdown', title: 'Grade 12 CAPS EGD Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-music-paper-breakdown', title: 'Grade 12 CAPS Music Paper Breakdown', category: 'Exam Breakdowns' },
          { slug: 'grade-12-caps-religion-studies-paper-breakdown', title: 'Grade 12 CAPS Religion Studies Paper Breakdown', category: 'Exam Breakdowns' },
          
          // Subject Choice Guides
          { slug: 'grade-12-maths-vs-maths-literacy-choice', title: 'Grade 12: Maths vs Maths Literacy - Which to Choose?', category: 'Study Guides' },
          { slug: 'grade-9-subject-choice-guide', title: 'Grade 9 Subject Choice Guide', category: 'Study Guides' },
          { slug: 'grade-12-nsc-results-guide-bachelor-diploma-pass', title: 'Grade 12 NSC Results Guide: Bachelor, Diploma & Pass', category: 'Study Guides' },
        ];

        setResources(pseoFiles);
        setLoading(false);
      } catch (error) {
        console.error('Error loading resources:', error);
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))].sort();

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedResources = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <>
      <Helmet>
        <title>StudyBuddy Resources: Free Study Guides & Exam Help | South Africa</title>
        <meta name="description" content="Access 65+ free study guides, exam breakdowns, tutoring resources, and educational content for Grade 9-12 South African students. CAPS curriculum aligned." />
        <meta name="keywords" content="study resources, matric help, CAPS curriculum, exam guides, tutoring, grade 12 resources, south africa education" />
        <link rel="canonical" href="https://studybuddy.works/resources" />
        
        {/* Open Graph */}
        <meta property="og:title" content="StudyBuddy Resources: Free Study Guides & Exam Help" />
        <meta property="og:description" content="Access 65+ free study guides, exam breakdowns, and tutoring resources for Grade 9-12 South African students." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://studybuddy.works/resources" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="StudyBuddy Resources: Free Study Guides & Exam Help" />
        <meta name="twitter:description" content="Access 65+ free study guides, exam breakdowns, and tutoring resources for Grade 9-12 South African students." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "StudyBuddy Educational Resources",
            "description": "Comprehensive collection of study guides, exam breakdowns, and tutoring resources for South African students",
            "url": "https://studybuddy.works/resources",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": resources.length,
              "itemListElement": resources.slice(0, 10).map((resource, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://studybuddy.works/${resource.slug}`
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Header with Grid Pattern */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary text-white py-16 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-6 justify-center flex-wrap">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                <BookOpen className="w-4 h-4" />
                <span>📚 {resources.length} Resources</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                <span>✓ CAPS Aligned</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                <span>🎯 Updated 2026</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Study Resources</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto text-center">
              Everything you need to succeed in your matric exams
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          {/* Search and Filter with Enhanced Styling */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-base font-medium transition-all min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Showing <span className="font-semibold text-primary">{filteredResources.length}</span> of {resources.length} resources
              </span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="min-h-[400px]">
            {loading ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading resources...</p>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No resources found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedResources).sort().map(([category, items]) => (
                  <div key={category} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br ${
                        category === 'Urgent Help' ? 'from-red-500 to-red-600' :
                        category === 'Exam Preparation' ? 'from-orange-500 to-orange-600' :
                        category === 'Tutoring Services' ? 'from-blue-500 to-blue-600' :
                        category === 'Study Guides' ? 'from-green-500 to-green-600' :
                        category === 'Exam Breakdowns' ? 'from-purple-500 to-purple-600' :
                        category === 'Parent Resources' ? 'from-indigo-500 to-indigo-600' :
                        'from-teal-500 to-teal-600'
                      }`}>
                        {category === 'Urgent Help' && <AlertCircle className="w-5 h-5 text-white" />}
                        {category === 'Exam Preparation' && <FileText className="w-5 h-5 text-white" />}
                        {category === 'Tutoring Services' && <GraduationCap className="w-5 h-5 text-white" />}
                        {category === 'Study Guides' && <BookOpen className="w-5 h-5 text-white" />}
                        {category === 'Exam Breakdowns' && <FileText className="w-5 h-5 text-white" />}
                        {category === 'Parent Resources' && <GraduationCap className="w-5 h-5 text-white" />}
                        {category === 'Comparisons' && <BookOpen className="w-5 h-5 text-white" />}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                      <span className="ml-auto text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{items.length}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {items.map(resource => (
                        <Link
                          key={resource.slug}
                          to={`/${resource.slug}`}
                          className="block p-5 border border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all group bg-gradient-to-br from-white to-gray-50/50"
                        >
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 leading-snug">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            /{resource.slug}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need More Help?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Get 24/7 AI tutoring support for all your subjects
              </p>
              <Link
                to="/students"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl text-lg"
              >
                Start Free Trial
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="mt-6 text-sm text-blue-100">
                ✓ FREE to start • ✓ No credit card required • ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
