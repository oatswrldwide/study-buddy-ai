import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getLocationBySlug, getNearbyLocations } from "@/data/southAfricaLocations";
import { getLocationContent, getDefaultLocationContent, hasEnhancedContent } from "@/data/locationContent";
import { getPopularSubjectExams, type ExamSubjectGroup } from "@/data/examPapers";
import { BookOpen, CheckCircle, GraduationCap, MapPin, Sparkles, TrendingUp, Users, School, FileText, Download } from "lucide-react";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = getLocationBySlug(slug || "");
  const nearbyLocations = getNearbyLocations(slug || "", 6);
  const [examPapers, setExamPapers] = useState<ExamSubjectGroup[]>([]);

  // Load exam papers on mount
  useEffect(() => {
    getPopularSubjectExams(6).then(papers => {
      setExamPapers(papers);
    }).catch(err => {
      console.error('Failed to load exam papers:', err);
    });
  }, []);

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Location not found</h1>
            <Button asChild><Link to="/locations">Browse All Locations</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get enhanced content if available, otherwise use defaults
  const enhancedContent = getLocationContent(slug || "");
  const content = enhancedContent || getDefaultLocationContent(location.name, location.province);
  const hasRichContent = hasEnhancedContent(slug || "");

  const defaultSubjects = ["Mathematics", "Physical Science", "Life Sciences", "English", "Afrikaans", "Accounting", "History", "Geography"];

  return (
    <>
      <Helmet>
        <title>AI Tutor in {location.name} | StudyBuddy Works - CAPS Curriculum Support</title>
        <meta name="description" content={`Get personalized, CAPS-aligned AI tutoring in ${location.name}, ${location.province}. 24/7 homework help, exam preparation, and subject support for R99/month. Try free!`} />
        <meta name="keywords" content={`tutor ${location.name}, AI tutor ${location.province}, CAPS tutoring ${location.name}, homework help ${location.name}, matric tutoring ${location.province}`} />
        <link rel="canonical" href={`https://studybuddy.works/tutor/${slug}`} />
        <meta property="og:title" content={`AI Tutor in ${location.name} | StudyBuddy Works`} />
        <meta property="og:description" content={`24/7 CAPS-aligned tutoring for students in ${location.name}. Affordable, personalized learning support.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://studybuddy.works/tutor/${slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://studybuddy.works/" },
            { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://studybuddy.works/locations" },
            { "@type": "ListItem", "position": 3, "name": location.province, "item": `https://studybuddy.works/province/${location.provinceSlug}` },
            { "@type": "ListItem", "position": 4, "name": location.name, "item": `https://studybuddy.works/tutor/${slug}` }
          ]
        })}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Breadcrumb Navigation */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container max-w-6xl mx-auto px-4 py-3">
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
                    <Link to="/locations">Locations</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/province/${location.provinceSlug}`}>{location.province}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{location.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <MapPin className="h-4 w-4" />
                {location.province}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                AI Tutor in {location.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Get personalized, CAPS-aligned tutoring for students in {location.name}, {location.province}. Our AI tutor helps with homework, exam prep, and understanding difficult concepts—available 24/7 for just R99/month.
              </p>
              
              {hasRichContent && enhancedContent?.stats && (
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg border">
                  <div className="text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-bold text-lg">{enhancedContent.stats.students}</div>
                    <div className="text-xs text-gray-600">Active Students</div>
                  </div>
                  <div className="text-center">
                    <School className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-bold text-lg">{enhancedContent.stats.schools}</div>
                    <div className="text-xs text-gray-600">Schools</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-bold text-lg">{enhancedContent.stats.successRate}</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>
              )}
              
              <Button variant="default" size="lg" onClick={() => navigate("/students")}>
                Start Learning in {location.name}
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-8 bg-gradient-to-br from-amber-50/50 to-white border-y border-gray-200">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/resources")}
              >
                📚 Study Guides & Resources
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/locations")}
              >
                📍 Browse All Locations
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/province/${location.province.toLowerCase().replace(/\\s+/g, '-')}`)}
              >
                🗺️ All {location.province} Tutors
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/schools")}
              >
                🏫 For Schools
              </Button>
            </div>
          </div>
        </section>

        {/* Local Context Section */}
        {content.localContext && (
          <section className="py-12 md:py-16">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {content.localContext.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {content.localContext.content}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {content.education && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {content.education.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {content.education.content}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Popular Subjects Section */}
        {content.popularSubjects && content.popularSubjects.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Popular Subjects in {location.name}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.popularSubjects.map((subject, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">{subject.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Exam Papers Section */}
        {examPapers.length > 0 && (
          <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-4">
                  <FileText className="h-4 w-4" />
                  Free Past Papers & Memos
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  NSC Exam Papers for {location.name} Students
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Access past NSC exam papers and memorandums for practice. Perfect preparation for students in {location.name}.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examPapers.map((subjectGroup, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <BookOpen className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{subjectGroup.subject}</h3>
                          <p className="text-sm text-gray-600">
                            Grade 12 • {subjectGroup.latestYear}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Available Papers:</span>
                        <span className="font-semibold">{subjectGroup.paperCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Latest Year:</span>
                        <span className="font-semibold">{subjectGroup.latestYear}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group"
                        onClick={() => navigate('/students')}
                      >
                        <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                        Access Papers
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600 mb-4">
                  Over 500+ exam papers and memorandums available across all subjects
                </p>
                <Button variant="default" onClick={() => navigate('/students')}>
                  Sign Up to Access All Papers
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Why Students in {location.name} Love StudyBuddy Works
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Sparkles, title: "24/7 Availability", desc: "Study whenever you need - early morning, late night, or weekends" },
                { icon: CheckCircle, title: "CAPS-Aligned", desc: "Fully aligned with South African curriculum for all grades" },
                { icon: BookOpen, title: "All Subjects", desc: "Mathematics, Sciences, Languages, and more - all included" },
                { icon: TrendingUp, title: "Instant Help", desc: "Get detailed explanations immediately, no waiting for appointments" },
                { icon: Users, title: "Affordable", desc: "Just R99/month - less than a single tutoring session" },
                { icon: FileText, title: "Free Past Papers", desc: "Access 500+ NSC exam papers and memos for practice" }
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-lg border border-gray-200">
                  <benefit.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        {content.faqs && content.faqs.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-4xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Frequently Asked Questions - {location.name}
              </h2>
              
              <div className="space-y-6">
                {content.faqs.map((faq, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Nearby Locations */}
        {nearbyLocations.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Also Available Near {location.name}
              </h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {nearbyLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/tutor/${loc.slug}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-primary transition-all group"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      AI Tutor in {loc.name}
                    </h3>
                    <p className="text-sm text-gray-600">{loc.province}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Province Link Section */}
        <section className="py-10 md:py-12 border-t border-border">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for AI tutoring in other areas of {location.province}?
            </p>
            <Button variant="outline" asChild>
              <Link to={`/province/${location.provinceSlug}`}>
                View All {location.province} Tutoring Locations
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-white">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Learning in {location.name}?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join hundreds of students across {location.province} who are improving their grades with AI tutoring. Try it free—no credit card required.
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate("/students")} className="bg-white text-primary hover:bg-gray-100">
              Get Started Free
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LocationPage;
