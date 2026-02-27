import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  Search,
  ArrowRight,
  Calculator,
  BookOpen,
  Clock,
  MapPin,
  ChevronRight,
  FileText,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UniversityEntry {
  slug: string;
  name: string;
  abbr: string;
  type: "Traditional University" | "University of Technology" | "Comprehensive University" | "Private Institution";
  aps: string;
  deadline: string;
  location: string;
}

const UNIVERSITIES: UniversityEntry[] = [
  {
    slug: "how-to-apply-to-uct",
    name: "University of Cape Town",
    abbr: "UCT",
    type: "Traditional University",
    aps: "37+",
    deadline: "30 Sep",
    location: "Cape Town",
  },
  {
    slug: "how-to-apply-to-wits",
    name: "University of the Witwatersrand",
    abbr: "Wits",
    type: "Traditional University",
    aps: "35+",
    deadline: "30 Sep",
    location: "Johannesburg",
  },
  {
    slug: "how-to-apply-to-stellenbosch-university",
    name: "Stellenbosch University",
    abbr: "SU / Maties",
    type: "Traditional University",
    aps: "30+",
    deadline: "30 Jun",
    location: "Stellenbosch",
  },
  {
    slug: "how-to-apply-to-university-of-pretoria",
    name: "University of Pretoria",
    abbr: "UP / Tuks",
    type: "Traditional University",
    aps: "28+",
    deadline: "30 Jun",
    location: "Pretoria",
  },
  {
    slug: "how-to-apply-to-ukzn",
    name: "University of KwaZulu-Natal",
    abbr: "UKZN",
    type: "Traditional University",
    aps: "30+",
    deadline: "30 Sep",
    location: "Durban / Pietermaritzburg",
  },
  {
    slug: "how-to-apply-to-uj",
    name: "University of Johannesburg",
    abbr: "UJ",
    type: "Comprehensive University",
    aps: "28+",
    deadline: "30 Sep",
    location: "Johannesburg",
  },
  {
    slug: "how-to-apply-to-unisa",
    name: "University of South Africa",
    abbr: "UNISA",
    type: "Comprehensive University",
    aps: "23+",
    deadline: "30 Nov (S1)",
    location: "Distance Learning (Nationwide)",
  },
  {
    slug: "how-to-apply-to-north-west-university",
    name: "North-West University",
    abbr: "NWU",
    type: "Traditional University",
    aps: "28+",
    deadline: "30 Sep",
    location: "Potchefstroom / Mahikeng",
  },
  {
    slug: "how-to-apply-to-rhodes-university",
    name: "Rhodes University",
    abbr: "Rhodes / RU",
    type: "Traditional University",
    aps: "32+",
    deadline: "30 Sep",
    location: "Makhanda (Grahamstown)",
  },
  {
    slug: "how-to-apply-to-ufs",
    name: "University of the Free State",
    abbr: "UFS / Kovsies",
    type: "Traditional University",
    aps: "28+",
    deadline: "30 Sep",
    location: "Bloemfontein",
  },
  {
    slug: "how-to-apply-to-uwc",
    name: "University of the Western Cape",
    abbr: "UWC",
    type: "Comprehensive University",
    aps: "28+",
    deadline: "30 Sep",
    location: "Bellville, Cape Town",
  },
  {
    slug: "how-to-apply-to-nelson-mandela-university",
    name: "Nelson Mandela University",
    abbr: "NMU",
    type: "Comprehensive University",
    aps: "28+",
    deadline: "30 Sep",
    location: "Gqeberha (Port Elizabeth)",
  },
  {
    slug: "how-to-apply-to-cput",
    name: "Cape Peninsula University of Technology",
    abbr: "CPUT",
    type: "University of Technology",
    aps: "20+",
    deadline: "30 Sep",
    location: "Cape Town",
  },
  {
    slug: "how-to-apply-to-tut",
    name: "Tshwane University of Technology",
    abbr: "TUT",
    type: "University of Technology",
    aps: "20+",
    deadline: "30 Sep",
    location: "Pretoria",
  },
  {
    slug: "how-to-apply-to-dut",
    name: "Durban University of Technology",
    abbr: "DUT",
    type: "University of Technology",
    aps: "20+",
    deadline: "30 Sep",
    location: "Durban",
  },
  {
    slug: "how-to-apply-to-cut",
    name: "Central University of Technology",
    abbr: "CUT",
    type: "University of Technology",
    aps: "20+",
    deadline: "31 Oct",
    location: "Bloemfontein",
  },
  {
    slug: "how-to-apply-to-vut",
    name: "Vaal University of Technology",
    abbr: "VUT",
    type: "University of Technology",
    aps: "20+",
    deadline: "31 Oct",
    location: "Vanderbijlpark",
  },
  {
    slug: "how-to-apply-to-mangosuthu-university-of-technology",
    name: "Mangosuthu University of Technology",
    abbr: "MUT",
    type: "University of Technology",
    aps: "18+",
    deadline: "30 Sep",
    location: "Umlazi, Durban",
  },
  {
    slug: "how-to-apply-to-smu",
    name: "Sefako Makgatho Health Sciences University",
    abbr: "SMU",
    type: "Traditional University",
    aps: "30+",
    deadline: "30 Jun",
    location: "Ga-Rankuwa, Pretoria",
  },
  {
    slug: "how-to-apply-to-university-of-limpopo",
    name: "University of Limpopo",
    abbr: "UL",
    type: "Comprehensive University",
    aps: "28+",
    deadline: "30 Sep",
    location: "Polokwane",
  },
  {
    slug: "how-to-apply-to-university-of-fort-hare",
    name: "University of Fort Hare",
    abbr: "UFH",
    type: "Traditional University",
    aps: "26+",
    deadline: "30 Sep",
    location: "Alice, Eastern Cape",
  },
  {
    slug: "how-to-apply-to-university-of-zululand",
    name: "University of Zululand",
    abbr: "UniZulu",
    type: "Comprehensive University",
    aps: "26+",
    deadline: "30 Sep",
    location: "KwaDlangezwa",
  },
  {
    slug: "how-to-apply-to-walter-sisulu-university",
    name: "Walter Sisulu University",
    abbr: "WSU",
    type: "Comprehensive University",
    aps: "25+",
    deadline: "30 Sep",
    location: "Mthatha / East London",
  },
  {
    slug: "how-to-apply-to-university-of-venda",
    name: "University of Venda",
    abbr: "UNIVEN",
    type: "Comprehensive University",
    aps: "26+",
    deadline: "30 Sep",
    location: "Thohoyandou",
  },
  {
    slug: "how-to-apply-to-sol-plaatje-university",
    name: "Sol Plaatje University",
    abbr: "SPU",
    type: "Traditional University",
    aps: "26+",
    deadline: "31 Oct",
    location: "Kimberley",
  },
  {
    slug: "how-to-apply-to-university-of-mpumalanga",
    name: "University of Mpumalanga",
    abbr: "UMP",
    type: "Traditional University",
    aps: "24+",
    deadline: "31 Oct",
    location: "Mbombela",
  },
  {
    slug: "how-to-apply-to-iie-varsity-college",
    name: "The IIE's Varsity College",
    abbr: "Varsity College",
    type: "Private Institution",
    aps: "24+",
    deadline: "Rolling admissions",
    location: "Johannesburg / Cape Town / Durban",
  },
  {
    slug: "how-to-apply-to-rosebank-college",
    name: "The IIE's Rosebank College",
    abbr: "Rosebank College",
    type: "Private Institution",
    aps: "18+",
    deadline: "Rolling admissions",
    location: "Johannesburg / Cape Town",
  },
  {
    slug: "how-to-apply-to-boston-city-campus",
    name: "Boston City Campus & Business College",
    abbr: "Boston City Campus",
    type: "Private Institution",
    aps: "16+",
    deadline: "Rolling admissions",
    location: "Nationwide",
  },
  {
    slug: "how-to-apply-to-damelin",
    name: "Damelin",
    abbr: "Damelin",
    type: "Private Institution",
    aps: "15+",
    deadline: "Rolling admissions",
    location: "Nationwide",
  },
  {
    slug: "how-to-apply-to-regenesys-business-school",
    name: "Regenesys Business School",
    abbr: "Regenesys",
    type: "Private Institution",
    aps: "26+",
    deadline: "Rolling admissions",
    location: "Sandton, Johannesburg",
  },
  {
    slug: "how-to-apply-to-afda",
    name: "AFDA",
    abbr: "AFDA",
    type: "Private Institution",
    aps: "24+",
    deadline: "30 Sep",
    location: "Johannesburg / Cape Town / Durban",
  },
];

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

const UniversitiesApplyPage = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string>("All");

  const filtered = UNIVERSITIES.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.abbr.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType === "All" || u.type === activeType;
    return matchesSearch && matchesType;
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "How to Apply to South African Universities 2026",
    description:
      "Complete application guides for all 32 South African universities — APS requirements, deadlines, bursaries and step-by-step instructions.",
    numberOfItems: UNIVERSITIES.length,
    itemListElement: UNIVERSITIES.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `How to Apply to ${u.name} (${u.abbr})`,
      url: `https://studybuddy.works/${u.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
      { "@type": "ListItem", position: 2, name: "Apply to University", item: "https://studybuddy.works/apply" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When do South African university applications open in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most South African universities open applications for 2027 in April–May 2026. Some universities like UCT, UP, Stellenbosch and SMU have early deadlines in June 2026, so applying as soon as applications open is strongly recommended.",
        },
      },
      {
        "@type": "Question",
        name: "Can I still apply to a South African university in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As of February 2026, most universities are in their registration phase for the 2026 academic year. Late applications may still be available at some institutions. New applications for the 2027 academic year typically open in April 2026.",
        },
      },
      {
        "@type": "Question",
        name: "Which South African university has the lowest APS requirement?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Damelin and Boston City Campus accept applicants from APS 15–16. Among public universities, Mangosuthu University of Technology (MUT) requires APS 18+, while UNISA, TUT, DUT, CPUT, VUT and CUT start from APS 20+.",
        },
      },
      {
        "@type": "Question",
        name: "What documents do I need to apply to a South African university?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most SA universities require: certified copy of your ID document, Grade 11 results (for matric students) or matric certificate, proof of residence, and completion of the online application form. Some faculties require additional documents such as a portfolio or motivation letter.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to apply to a South African university?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Application fees vary by institution. UCT charges R100 (waived for eligible students), Wits charges R100, and UP charges R300. Some universities like UNISA offer free online applications. Private institutions typically have no application fee.",
        },
      },
      {
        "@type": "Question",
        name: "Which SA university applications close first in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The earliest closing dates are at UCT (30 Sep for most, some faculties earlier), Stellenbosch University (30 Jun), University of Pretoria (30 Jun, some faculties earlier), and Sefako Makgatho Health Sciences University (30 Jun). Apply early — popular programmes fill up fast.",
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>How to Apply to South African Universities 2026 — APS, Deadlines & Guides</title>
        <meta
          name="description"
          content="Apply to SA universities in 2026 — UCT, Wits, UP, UNISA, UJ, Stellenbosch & more. APS requirements, closing dates & free step-by-step guides for all 32 universities."
        />
        <meta
          name="keywords"
          content="how to apply to university South Africa, SA university applications 2026, university application guides, UCT application, Wits application, UNISA application, APS requirements"
        />
        <meta property="og:title" content="How to Apply to SA Universities 2026 — APS, Deadlines & Guides" />
        <meta
          property="og:description"
          content="Free application guides for all 32 SA universities. APS requirements, closing dates & step-by-step instructions for UCT, Wits, UNISA, UP, UJ and more."
        />
        <meta property="og:url" content="https://studybuddy.works/apply" />
        <link rel="canonical" href="https://studybuddy.works/apply" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        {/* Hero */}
        <section className="pt-24 pb-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <GraduationCap className="w-4 h-4" />
              2026 Application Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              How to Apply to South African Universities
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Free step-by-step application guides for every South African university. Find APS
              requirements, deadlines, required documents, bursary options and the exact application
              portal — all in one place.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/aps-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate My APS
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/bursaries">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Find Bursaries
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick-tip banner */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Apply early.</strong> Most SA universities open applications in{" "}
              <strong>April–May</strong> and close in <strong>June–October</strong>. Popular
              programmes (Medicine, Law, Engineering) fill up fast — don't wait until the deadline.
            </p>
          </div>
        </section>

        {/* 2026 Status & Prospectus Quick Links */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
            <Link
              to="/university-status-2026"
              className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow group"
            >
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 text-sm group-hover:underline">
                  2026 Application Status Tracker
                </p>
                <p className="text-xs text-blue-600 mt-0.5">
                  See which universities still have late applications or registration open right now.
                </p>
              </div>
            </Link>
            <Link
              to="/university-prospectus-2026"
              className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow group"
            >
              <FileText className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 text-sm group-hover:underline">
                  Download 2026 Prospectus
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  Download the 2026 prospectus for all 26 SA public universities in one place.
                </p>
              </div>
            </Link>
            <Link
              to="/tvet-colleges"
              className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow group"
            >
              <BookOpen className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-purple-800 text-sm group-hover:underline">
                  TVET Colleges Directory
                </p>
                <p className="text-xs text-purple-600 mt-0.5">
                  Explore all 50 public TVET colleges — NCV programmes, N-courses &amp; application info.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* School Application Pricing */}
        <WhatsAppPricingOffers
          variant="school"
          heading="School Application Assistance — R600"
        />

        {/* Search & Filter */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by university name, abbreviation or city…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-colors ${
                    activeType === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white border-gray-200 text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* University grid */}
        <section className="container mx-auto px-4 pb-16 flex-1">
          <div className="max-w-5xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((uni) => (
                  <Link key={uni.slug} to={`/${uni.slug}`} className="group block">
                    <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${TYPE_COLORS[uni.type]}`}
                          >
                            {uni.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                          {uni.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground font-medium">{uni.abbr}</p>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{uni.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Min APS:</span>
                          <span className="font-semibold text-foreground">{uni.aps}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Deadline:</span>
                          <span className="font-semibold text-foreground">{uni.deadline}</span>
                        </div>
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                            View application guide <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6">
              Showing {filtered.length} of {UNIVERSITIES.length} universities
            </p>
          </div>
        </section>

        {/* General tips */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">General Tips for Applying to University in South Africa</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>1. Calculate your APS first.</strong> Your{" "}
                <Link to="/aps-calculator" className="text-primary underline">
                  Admission Point Score (APS)
                </Link>{" "}
                determines which programmes you qualify for. Calculate yours before you start applying.
              </p>
              <p>
                <strong>2. Apply to multiple universities.</strong> It costs very little extra to
                apply to 3–5 universities. This gives you a safety net if your first choice rejects
                your application.
              </p>
              <p>
                <strong>3. Apply early.</strong> Many programmes are filled on a first-come,
                first-served basis. Submit your application as soon as applications open — not on the
                last day.
              </p>
              <p>
                <strong>4. Apply for NSFAS at the same time.</strong> NSFAS applications open in
                October each year. Apply simultaneously with your university applications so that
                funding is in place before registration.
              </p>
              <p>
                <strong>5. Keep certified copies of everything.</strong> You will need certified
                copies of your ID, Grade 11 results, matric certificate, and proof of residence for
                almost every university application.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/aps-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  APS Calculator
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/bursaries">
                  Find Bursaries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/courses">
                  Course Requirements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* School Application Pricing (mid-page) */}
        <WhatsAppPricingOffers variant="school" />

        {/* Application Assistance */}
        <WhatsAppAssistanceBanner
          heading="Need Help Applying to University?"
          description="Get free 1-on-1 assistance — I'll personally guide you through your university application, help you pick the right institutions, and make sure your documents are in order."
        />

        <Footer />
      </div>
    </>
  );
};

export default UniversitiesApplyPage;
