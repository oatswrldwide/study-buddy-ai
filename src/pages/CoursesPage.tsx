import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  Calculator,
  BookOpen,
  ArrowRight,
  Search,
  Stethoscope,
  Wrench,
  Scale,
  TrendingUp,
  Monitor,
  Users,
  FlaskConical,
  Building2,
  Brain,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COURSES, COURSE_CATEGORIES } from "@/data/courseRequirements";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Health Sciences": <Stethoscope className="w-5 h-5" />,
  "Engineering": <Wrench className="w-5 h-5" />,
  "Law": <Scale className="w-5 h-5" />,
  "Commerce & Business": <TrendingUp className="w-5 h-5" />,
  "Information Technology": <Monitor className="w-5 h-5" />,
  "Education": <Users className="w-5 h-5" />,
  "Natural Sciences": <FlaskConical className="w-5 h-5" />,
  "Humanities & Social Sciences": <Brain className="w-5 h-5" />,
  "Built Environment": <Building2 className="w-5 h-5" />,
};

const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = COURSES.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.careers.some(career => career.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesWithAll = ["All", ...COURSE_CATEGORIES.filter(cat =>
    COURSES.some(c => c.category === cat)
  )];

  return (
    <>
      <Helmet>
        <title>University Course Requirements South Africa 2025 | APS Scores & Fees Compared</title>
        <meta
          name="description"
          content="Compare APS score requirements and university fees for the most popular courses in South Africa — Medicine, Engineering, Law, Accounting, IT, Education and more. Free APS calculator included."
        />
        <meta
          name="keywords"
          content="SA university course requirements, APS score requirements, university fees South Africa, UCT APS, Wits APS, Stellenbosch APS, medicine requirements, engineering requirements, law requirements, BCom requirements"
        />
        <meta property="og:title" content="SA University Course Requirements & APS Scores 2025" />
        <meta
          property="og:description"
          content="Compare APS requirements and fees for popular SA university courses. Perfect for matric students planning their future."
        />
        <meta property="og:url" content="https://studybuddy.works/courses" />
        <link rel="canonical" href="https://studybuddy.works/courses" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Popular SA University Courses 2025",
          description: "Compare APS requirements and fees for popular courses at South African universities",
          numberOfItems: COURSES.length,
          itemListElement: COURSES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: `https://studybuddy.works/courses/${c.id}`,
          })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Hero */}
        <section className="py-12 md:py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              2025 Entry Requirements
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              SA University Course Requirements
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Compare APS scores, university fees and entry requirements for the most popular courses at South African universities — all in one place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">📊 Side-by-side university comparison</span>
              <span className="flex items-center gap-1">💰 Approximate annual fees</span>
              <span className="flex items-center gap-1">🎓 APS requirements</span>
              <span className="flex items-center gap-1">📋 Subject requirements</span>
            </div>
            <Link to="/aps-calculator">
              <Button size="lg" className="gap-2">
                <Calculator className="w-5 h-5" />
                Calculate My APS Score First
              </Button>
            </Link>
          </div>
        </section>

        {/* Search + Filter */}
        <section className="container mx-auto px-4 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6 bg-white rounded-xl border p-2 shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground ml-2 shrink-0" />
              <Input
                placeholder="Search courses, careers (e.g. Medicine, Software Developer)…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0 text-base"
              />
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categoriesWithAll.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat !== "All" && CATEGORY_ICONS[cat]}
                  {cat}
                </button>
              ))}
            </div>

            {/* Courses grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg">No courses found for "{search}"</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="text-primary underline text-sm mt-2"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => {
                  const lowestAPS = Math.min(...course.universities.map(u => u.aps));
                  const highestAPS = Math.max(...course.universities.map(u => u.aps));
                  return (
                    <Link key={course.id} to={`/courses/${course.id}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/30 group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                              {CATEGORY_ICONS[course.category] ?? <GraduationCap className="w-5 h-5" />}
                            </div>
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {course.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-base mt-2 group-hover:text-primary transition-colors">
                            {course.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">APS range:</span>
                            <span className="font-semibold text-primary">
                              {lowestAPS} – {highestAPS}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Universities:</span>
                            <span className="font-medium">{course.universities.length}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{course.duration}</span>
                          </div>

                          <div className="pt-2 flex flex-wrap gap-1">
                            {course.universities.slice(0, 4).map(u => (
                              <span
                                key={u.shortName}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                              >
                                {u.shortName}
                              </span>
                            ))}
                            {course.universities.length > 4 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                +{course.universities.length - 4} more
                              </span>
                            )}
                          </div>

                          <div className="pt-1 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                            Compare universities <ArrowRight className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* APS Calculator CTA Banner */}
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white text-center">
            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Don't know your APS score?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Use our free APS calculator to instantly see your score and which universities you qualify for — across all 15 South African universities.
            </p>
            <Link to="/aps-calculator">
              <Button variant="secondary" size="lg" className="gap-2 font-semibold">
                <Calculator className="w-5 h-5" />
                Calculate My APS for Free
              </Button>
            </Link>
          </div>
        </section>

        {/* School Application Assistance */}
        <WhatsAppPricingOffers
          variant="school"
          heading="School Application Assistance — R600"
        />

        {/* Info Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Understanding APS Scores in South Africa</h2>
            <div className="prose prose-sm text-muted-foreground space-y-3">
              <p>
                The <strong>Admission Point Score (APS)</strong> is calculated from your NSC (matric) subject marks using
                a 7-point scale. Universities use APS scores — together with specific subject requirements — to determine
                admission to their courses.
              </p>
              <p>
                Note that <strong>APS is just one part</strong> of the admission criteria. Many courses also require
                minimum marks in specific subjects (e.g. Maths 70% for Engineering), NBT tests, portfolios, or
                selection interviews.
              </p>
              <p>
                <strong>Fees shown are approximate</strong> and cover tuition only for 2024/2025. Additional costs
                include residence, meals, textbooks and transport. Check the NSFAS eligibility criteria if you need
                financial assistance — most public universities are eligible.
              </p>
              <p>
                Always verify the latest requirements directly with each university's admissions office, as these
                change from year to year.
              </p>
            </div>
          </div>
        </section>

        {/* Application Assistance */}
        <WhatsAppAssistanceBanner
          heading="Need Help Choosing or Applying to University?"
          description="Get free 1-on-1 assistance — I'll personally guide you through your university application, help you pick the right courses and institutions, and make sure your documents are in order."
        />

        <Footer />
      </div>
    </>
  );
};

export default CoursesPage;
