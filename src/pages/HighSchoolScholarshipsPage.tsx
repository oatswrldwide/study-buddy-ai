import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  ExternalLink,
  GraduationCap,
  Award,
  HardHat,
  Building2,
  Heart,
  Globe,
  BookOpen,
  MapPin,
  ChevronRight,
  Calculator,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HIGH_SCHOOL_SCHOLARSHIPS,
  SCHOLARSHIP_CATEGORIES,
  type HighSchoolScholarship,
} from "@/data/highSchoolScholarships";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "National & Corporate": <Award className="w-4 h-4" />,
  "Mining & Resources": <HardHat className="w-4 h-4" />,
  "Private & Independent Schools": <Building2 className="w-4 h-4" />,
  "Specialized & Foundation": <Heart className="w-4 h-4" />,
  "Provincial & Government": <Globe className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "National & Corporate": "bg-blue-100 text-blue-700 border-blue-200",
  "Mining & Resources": "bg-orange-100 text-orange-700 border-orange-200",
  "Private & Independent Schools": "bg-purple-100 text-purple-700 border-purple-200",
  "Specialized & Foundation": "bg-pink-100 text-pink-700 border-pink-200",
  "Provincial & Government": "bg-green-100 text-green-700 border-green-200",
};

const ScholarshipCard = ({ scholarship }: { scholarship: HighSchoolScholarship }) => (
  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
            CATEGORY_COLORS[scholarship.category] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {CATEGORY_ICONS[scholarship.category]}
          {scholarship.category}
        </span>
      </div>
      <CardTitle className="text-base leading-snug">{scholarship.name}</CardTitle>
      <p className="text-xs text-muted-foreground font-medium">{scholarship.provider}</p>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col gap-3">
      <p className="text-sm text-muted-foreground line-clamp-3">{scholarship.description}</p>

      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Eligibility</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{scholarship.eligibility}</p>
      </div>

      <div className="flex items-start gap-2">
        <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">{scholarship.coverage}</p>
      </div>

      {scholarship.closingDate && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">
          📅 Closes: {scholarship.closingDate}
        </div>
      )}

      {scholarship.provinces && scholarship.provinces.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {scholarship.provinces.map((prov) => (
            <span
              key={prov}
              className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5"
            >
              <MapPin className="w-3 h-3" />
              {prov}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-2 flex flex-col gap-1">
        <a
          href={scholarship.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Apply / Learn More
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(
            scholarship.name + " " + scholarship.provider + " application " + new Date().getFullYear()
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary hover:underline"
        >
          Search if link is broken
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </CardContent>
  </Card>
);

const HighSchoolScholarshipsPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredScholarships = HIGH_SCHOOL_SCHOLARSHIPS.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.provinces ?? []).some((p) => p.toLowerCase().includes(q));
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const grouped = SCHOLARSHIP_CATEGORIES.reduce<Record<string, HighSchoolScholarship[]>>(
    (acc, cat) => {
      const items = filteredScholarships.filter((s) => s.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {}
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "High School Scholarships in South Africa 2025 — Complete Directory",
    description:
      "A comprehensive directory of 150+ high school scholarships available in South Africa, organised by category.",
    numberOfItems: HIGH_SCHOOL_SCHOLARSHIPS.length,
    itemListElement: HIGH_SCHOOL_SCHOLARSHIPS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: s.applicationUrl,
    })),
  };

  return (
    <>
      <Helmet>
        <title>
          High School Scholarships South Africa 2025 — 150+ Listed | StudyBuddyWorks
        </title>
        <meta
          name="description"
          content={`Explore ${HIGH_SCHOOL_SCHOLARSHIPS.length}+ high school scholarships in South Africa for 2025–2026. National, corporate, mining, private school and provincial scholarships — all with direct application links.`}
        />
        <meta
          name="keywords"
          content="high school scholarships South Africa 2025, SA high school bursary, Grade 8 scholarship, private school bursary South Africa, Investec high school bursary, SANRAL scholarship, Allan Gray Orbis scholarship, SSP scholarship, KMF scholarship"
        />
        <meta
          property="og:title"
          content="High School Scholarships South Africa 2025 — Complete Directory"
        />
        <meta
          property="og:description"
          content={`Find ${HIGH_SCHOOL_SCHOLARSHIPS.length}+ high school scholarships and bursaries in South Africa for 2025–2026, with direct application links.`}
        />
        <meta
          property="og:url"
          content="https://studybuddy.works/high-school-scholarships"
        />
        <link rel="canonical" href="https://studybuddy.works/high-school-scholarships" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Hero */}
        <section className="py-12 md:py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              {HIGH_SCHOOL_SCHOLARSHIPS.length}+ High School Scholarships
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              High School Scholarships in South Africa
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              A complete, searchable directory of high school scholarships and bursaries
              available in South Africa for 2025–2026 — organised by category with direct
              links to apply.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>✅ National &amp; corporate scholarships</span>
              <span>✅ Mining sector scholarships</span>
              <span>✅ Private school bursaries</span>
              <span>✅ Provincial government support</span>
            </div>
          </div>
        </section>

        {/* Scholarship Assistance Pricing */}
        <WhatsAppPricingOffers
          variant="bursary"
          heading="Get Help With Your Scholarship Applications"
        />

        {/* Search + Filter */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            {/* Search bar */}
            <div className="flex items-center gap-3 mb-6 bg-white rounded-xl border p-2 shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground ml-2 shrink-0" />
              <Input
                placeholder="Search by name, provider, province or category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0 text-base"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearch("")}
                  className="shrink-0 text-muted-foreground"
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", ...SCHOLARSHIP_CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
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

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing <strong>{filteredScholarships.length}</strong> of{" "}
              <strong>{HIGH_SCHOOL_SCHOLARSHIPS.length}</strong> scholarships
              {activeCategory !== "All" && (
                <>
                  {" "}in <strong>{activeCategory}</strong>
                </>
              )}
              {search && (
                <>
                  {" "}matching &ldquo;<strong>{search}</strong>&rdquo;
                </>
              )}
            </p>

            {/* No results */}
            {filteredScholarships.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg">No scholarships found</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="text-primary underline text-sm mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Grouped layout */}
            {filteredScholarships.length > 0 &&
              Object.entries(grouped).map(([cat, scholarships], groupIndex) => (
                <div key={cat}>
                  <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border ${
                          CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {CATEGORY_ICONS[cat]}
                        {cat}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {scholarships.length} scholarship{scholarships.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {scholarships.map((s) => (
                        <ScholarshipCard key={s.id} scholarship={s} />
                      ))}
                    </div>
                  </div>

                  {/* Inline WhatsApp assistance nudge — shown after the first category when browsing all */}
                  {groupIndex === 0 && activeCategory === "All" && !search && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-12">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <p className="font-bold text-foreground">Not sure which scholarship to apply for?</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get free 1-on-1 WhatsApp guidance — I'll help you shortlist the right scholarships for your situation and prepare a strong application.
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-green-600 hover:bg-green-700 text-white font-bold gap-2 shrink-0"
                      >
                        <a
                          href="https://wa.me/27680187300?text=Hi!%20I%20need%20free%20help%20finding%20a%20high%20school%20scholarship%20to%20apply%20for."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Get Free Help
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Key aggregator websites */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Scholarship Databases &amp; Aggregator Sites</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Check these South African scholarship portals regularly for new opportunities and
              updated closing dates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "ZABursaries.co.za",
                  url: "https://www.zabursaries.co.za",
                  desc: "Comprehensive SA scholarship & bursary portal",
                },
                {
                  name: "StudyTrust.org.za",
                  url: "https://www.studytrust.org.za",
                  desc: "High school & tertiary funding database",
                },
                {
                  name: "Bursaries.co.za",
                  url: "https://www.bursaries.co.za",
                  desc: "Updated scholarship listings",
                },
                {
                  name: "SA Bursaries",
                  url: "https://www.sabursaries.co.za",
                  desc: "SA bursary search engine",
                },
                {
                  name: "Bursary Plug",
                  url: "https://www.bursaryplug.co.za",
                  desc: "High school & varsity bursary listings",
                },
                {
                  name: "UCT Online HS — Corporate List",
                  url: "https://www.uctonlinehighschool.com/blog/corporate-social-responsibility-companies-offering-high-school-scholarships-in-south-africa",
                  desc: "Corporate high school scholarship guide",
                },
              ].map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <ExternalLink className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                      {resource.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{resource.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Application Assistance Pricing (mid-page) */}
        <WhatsAppPricingOffers variant="bursary" />

        {/* Province interlink section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Find Scholarships &amp; Tutoring by Province</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Many scholarships are province-specific. Select your province to see relevant
              opportunities and find AI-powered tutoring support.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { name: "Gauteng", slug: "gauteng" },
                { name: "Western Cape", slug: "western-cape" },
                { name: "KwaZulu-Natal", slug: "kwazulu-natal" },
                { name: "Eastern Cape", slug: "eastern-cape" },
                { name: "Free State", slug: "free-state" },
                { name: "Mpumalanga", slug: "mpumalanga" },
                { name: "Limpopo", slug: "limpopo" },
                { name: "North West", slug: "north-west" },
                { name: "Northern Cape", slug: "northern-cape" },
              ].map((prov) => (
                <Link
                  key={prov.slug}
                  to={`/province/${prov.slug}`}
                  className="flex items-center gap-2 text-sm font-medium px-3 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {prov.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Application tips */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border p-8">
            <h2 className="text-xl font-bold mb-4">
              Tips for Applying for a High School Scholarship
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>1. Start early.</strong> Most Grade 8 scholarships require applications in
                Grade 6 or 7 — sometimes two years before the scholarship year. Check closing dates
                carefully and apply well in advance.
              </p>
              <p>
                <strong>2. Maintain strong academics.</strong> Most scholarships require 70%+ averages,
                especially in Mathematics and Physical Science. Focus on your schoolwork first.
              </p>
              <p>
                <strong>3. Prepare your documents.</strong> Typical requirements include certified
                copies of your ID, latest school report, parent/guardian income documents, and a
                motivation letter.
              </p>
              <p>
                <strong>4. Highlight leadership and extracurriculars.</strong> Scholarship committees
                value community involvement, sports, cultural activities and leadership roles — not
                just academic results.
              </p>
              <p>
                <strong>5. Apply to multiple scholarships.</strong> There is no limit on how many
                scholarship applications you can submit. Cast a wide net to improve your chances.
              </p>
              <p>
                <strong>6. Follow up.</strong> After submitting, keep copies of your application and
                follow up with the provider if you have not heard back within the expected timeframe.
              </p>
            </div>
          </div>
        </section>

        {/* Application Assistance Banner */}
        <WhatsAppAssistanceBanner
          heading="Need Help With Your Scholarship Application?"
          description="Get free 1-on-1 guidance — I'll help you find the right scholarship, prepare your documents and review your application before you submit."
        />

        {/* Related Tools */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">Related Tools &amp; Resources</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              <Link
                to="/bursaries"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <Award className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  University Bursaries
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Planning for university? Find 50+ active bursaries for tertiary study in South Africa.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Find bursaries <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/aps-calculator"
                className="group bg-white p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <Calculator className="w-9 h-9 text-accent mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">
                  APS Calculator
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Calculate your Admission Point Score to check university and bursary eligibility.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Calculate APS <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/students"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <BookOpen className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  AI Tutor
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Improve your marks with 24/7 CAPS-aligned AI tutoring — from R99/month.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Start free trial <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HighSchoolScholarshipsPage;
