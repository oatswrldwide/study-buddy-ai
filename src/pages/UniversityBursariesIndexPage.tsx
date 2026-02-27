import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  Search,
  MapPin,
  ChevronRight,
  BookOpen,
  Calculator,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UNIVERSITY_BURSARY_DATA } from "@/data/universityBursaries";

const TYPE_COLORS: Record<string, string> = {
  "Traditional University": "bg-blue-100 text-blue-700 border-blue-200",
  "University of Technology": "bg-purple-100 text-purple-700 border-purple-200",
  "Comprehensive University": "bg-green-100 text-green-700 border-green-200",
  "Private Institution": "bg-orange-100 text-orange-700 border-orange-200",
};

const TYPES = [
  "All",
  "Traditional University",
  "University of Technology",
  "Comprehensive University",
  "Private Institution",
] as const;

const UniversityBursariesIndexPage = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  const filtered = UNIVERSITY_BURSARY_DATA.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.abbr.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q);
    const matchesType = activeType === "All" || u.type === activeType;
    return matchesSearch && matchesType;
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bursaries at South African Universities 2025 — Directory",
    description:
      "University-by-university bursary and financial aid directory for South African universities. Find institution-specific funding, NSFAS details and merit scholarships.",
    numberOfItems: UNIVERSITY_BURSARY_DATA.length,
    itemListElement: UNIVERSITY_BURSARY_DATA.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Bursaries at ${u.name} (${u.abbr})`,
      url: `https://studybuddy.works/bursaries/university/${u.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bursaries",
        item: "https://studybuddy.works/bursaries",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "University Bursaries",
        item: "https://studybuddy.works/bursaries/universities",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Bursaries at South African Universities 2025 — Full Directory | StudyBuddyWorks
        </title>
        <meta
          name="description"
          content={`Find bursaries and financial aid at every major South African university — ${UNIVERSITY_BURSARY_DATA.map((u) => u.abbr.split(" / ")[0]).slice(0, 7).join(", ")} and more. ${UNIVERSITY_BURSARY_DATA.length} universities covered with direct links to apply.`}
        />
        <meta
          name="keywords"
          content="bursaries at South African universities, UCT bursaries, Wits bursaries, UP bursaries, Stellenbosch bursaries, UKZN bursaries, UJ bursaries, UNISA bursaries, university financial aid South Africa 2025"
        />
        <meta
          property="og:title"
          content="Bursaries at South African Universities 2025 — Complete Directory"
        />
        <meta
          property="og:description"
          content={`University-specific bursary pages for every major SA university. ${UNIVERSITY_BURSARY_DATA.length} institutions covered — NSFAS, merit awards and institution-specific funding.`}
        />
        <meta property="og:url" content="https://studybuddy.works/bursaries/universities" />
        <link rel="canonical" href="https://studybuddy.works/bursaries/universities" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-4 pb-0">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/bursaries" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Bursaries
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">University Bursaries</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-10 md:py-14 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              {UNIVERSITY_BURSARY_DATA.length} Universities Covered
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Bursaries at South African Universities
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Find university-specific bursaries, merit scholarships and financial aid at every
              major South African institution — with direct links to apply.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>✅ University-specific bursaries</span>
              <span>✅ NSFAS details per university</span>
              <span>✅ Merit &amp; need-based awards</span>
              <span>✅ Direct apply links</span>
            </div>
          </div>
        </section>

        {/* Bursary Application Assistance */}
        <WhatsAppPricingOffers
          variant="bursary"
          heading="Get Help With Your University Bursary Applications"
        />

        {/* Search & Filter */}
        <section className="container mx-auto px-4 pb-4">
          <div className="max-w-5xl mx-auto">
            {/* Search bar */}
            <div className="flex items-center gap-3 mb-5 bg-white rounded-xl border p-2 shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground ml-2 shrink-0" />
              <Input
                placeholder="Search by university name, abbreviation or city…"
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

            {/* Type filter pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-5">
              Showing <strong>{filtered.length}</strong> of{" "}
              <strong>{UNIVERSITY_BURSARY_DATA.length}</strong> universities
              {activeType !== "All" && (
                <>
                  {" "}
                  — <strong>{activeType}</strong>
                </>
              )}
            </p>

            {/* University Cards Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg">No universities found</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveType("All");
                  }}
                  className="text-primary underline text-sm mt-2"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {filtered.map((uni) => (
                  <Link
                    key={uni.slug}
                    to={`/bursaries/university/${uni.slug}`}
                    className="group bg-white rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${TYPE_COLORS[uni.type] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {uni.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium">
                        {uni.bursaries.length} funding options
                      </span>
                    </div>

                    <div>
                      <h2 className="font-bold text-base group-hover:text-primary transition-colors leading-snug">
                        {uni.name}
                      </h2>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                        {uni.abbr}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {uni.location}
                    </div>

                    <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-primary">
                      View bursaries
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">
                Don't See Your University?
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              We're continuously adding university-specific bursary pages. In the meantime,
              browse our complete national bursaries hub which lists 50+ active bursaries
              available to students at any South African university.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/bursaries">
                  Browse All SA Bursaries
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://www.nsfas.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-1.5"
                >
                  Apply for NSFAS
                  <GraduationCap className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">Related Tools &amp; Resources</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              <Link
                to="/bursaries"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  All SA Bursaries
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse 50+ active national bursaries sorted by field — Engineering, Finance, IT
                  and more.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  View bursaries <ChevronRight className="w-4 h-4" />
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
                  Calculate your APS to check university eligibility and bursary requirements.
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
                  Improve your marks with 24/7 AI tutoring — from R99/month.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Start free trial <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* WhatsApp Assistance Banner */}
        <WhatsAppAssistanceBanner
          heading="Need Help Finding the Right Bursary?"
          description="Get free 1-on-1 guidance — I'll help you identify which university bursaries you qualify for and walk you through the application process step by step."
        />

        <Footer />
      </div>
    </>
  );
};

export default UniversityBursariesIndexPage;
