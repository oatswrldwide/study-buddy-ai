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

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                StudyBuddy Resources
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Free study guides, exam breakdowns, and tutoring resources for South African students
              </p>
              <p className="text-lg text-blue-100">
                {resources.length} resources available • CAPS curriculum aligned • Updated for 2026
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredResources.length} of {resources.length} resources
              </div>
            </div>

            {/* Resources Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading resources...</p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedResources).sort().map(([category, items]) => (
                  <div key={category} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                      {category === 'Urgent Help' && <AlertCircle className="w-6 h-6 text-red-600" />}
                      {category === 'Exam Preparation' && <FileText className="w-6 h-6 text-orange-600" />}
                      {category === 'Tutoring Services' && <GraduationCap className="w-6 h-6 text-blue-600" />}
                      {category === 'Study Guides' && <BookOpen className="w-6 h-6 text-green-600" />}
                      {category === 'Exam Breakdowns' && <FileText className="w-6 h-6 text-purple-600" />}
                      {category === 'Parent Resources' && <GraduationCap className="w-6 h-6 text-indigo-600" />}
                      {category === 'Comparisons' && <BookOpen className="w-6 h-6 text-teal-600" />}
                      
                      <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                      <span className="text-sm text-gray-500">({items.length})</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {items.map(resource => (
                        <Link
                          key={resource.slug}
                          to={`/${resource.slug}`}
                          className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                        >
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            /{resource.slug}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredResources.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Get 24/7 AI tutoring support for all your subjects
            </p>
            <Link
              to="/students"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
