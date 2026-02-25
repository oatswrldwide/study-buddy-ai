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

  return (
    <>
      <Helmet>
        <title>How to Apply to South African Universities 2026 | Complete Guides</title>
        <meta
          name="description"
          content="Step-by-step application guides for every South African university — UCT, Wits, Stellenbosch, UJ, UNISA, TUT, CPUT and more. APS requirements, deadlines, documents needed and bursary info."
        />
        <meta
          name="keywords"
          content="how to apply to university South Africa, SA university applications 2026, university application guides, UCT application, Wits application, UNISA application, APS requirements"
        />
        <meta property="og:title" content="How to Apply to South African Universities 2026" />
        <meta
          property="og:description"
          content="Application guides for all 32 SA universities. APS requirements, deadlines, bursaries and step-by-step instructions."
        />
        <meta property="og:url" content="https://studybuddy.works/apply" />
        <link rel="canonical" href="https://studybuddy.works/apply" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
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
