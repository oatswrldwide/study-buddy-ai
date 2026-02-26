import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  ExternalLink,
  GraduationCap,
  Wrench,
  TrendingUp,
  Monitor,
  Stethoscope,
  Users,
  HardHat,
  Leaf,
  Heart,
  Globe,
  BookOpen,
  Scale,
  Building2,
  Palette,
  MapPin,
  Calculator,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BURSARIES, BURSARY_FIELDS, type Bursary } from "@/data/bursaries";

const FIELD_ICONS: Record<string, React.ReactNode> = {
  "Engineering & Technology": <Wrench className="w-4 h-4" />,
  "Finance & Accounting": <TrendingUp className="w-4 h-4" />,
  "Information Technology": <Monitor className="w-4 h-4" />,
  "Health Sciences": <Stethoscope className="w-4 h-4" />,
  "Education": <Users className="w-4 h-4" />,
  "Law & Justice": <Scale className="w-4 h-4" />,
  "Mining & Resources": <HardHat className="w-4 h-4" />,
  "Agriculture & Environment": <Leaf className="w-4 h-4" />,
  "Built Environment & Construction": <Building2 className="w-4 h-4" />,
  "Arts & Creative Industries": <Palette className="w-4 h-4" />,
  "Social Sciences": <Heart className="w-4 h-4" />,
  "General / Multiple Fields": <Globe className="w-4 h-4" />,
};

const FIELD_COLORS: Record<string, string> = {
  "Engineering & Technology": "bg-blue-100 text-blue-700 border-blue-200",
  "Finance & Accounting": "bg-green-100 text-green-700 border-green-200",
  "Information Technology": "bg-purple-100 text-purple-700 border-purple-200",
  "Health Sciences": "bg-red-100 text-red-700 border-red-200",
  "Education": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Law & Justice": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Mining & Resources": "bg-orange-100 text-orange-700 border-orange-200",
  "Agriculture & Environment": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Built Environment & Construction": "bg-stone-100 text-stone-700 border-stone-200",
  "Arts & Creative Industries": "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  "Social Sciences": "bg-pink-100 text-pink-700 border-pink-200",
  "General / Multiple Fields": "bg-gray-100 text-gray-700 border-gray-200",
};

const BursaryCard = ({ bursary }: { bursary: Bursary }) => (
  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
            FIELD_COLORS[bursary.field] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {FIELD_ICONS[bursary.field]}
          {bursary.field}
        </span>
      </div>
      <CardTitle className="text-base leading-snug">{bursary.name}</CardTitle>
      <p className="text-xs text-muted-foreground font-medium">{bursary.provider}</p>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col gap-3">
      <p className="text-sm text-muted-foreground line-clamp-3">{bursary.description}</p>

      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Eligibility</p>
        <p className="text-xs text-muted-foreground line-clamp-3">{bursary.eligibility}</p>
      </div>

      <div className="flex items-start gap-2">
        <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">{bursary.value}</p>
      </div>

      <div className="mt-auto pt-2 flex flex-col gap-1">
        <a
          href={bursary.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Apply / Learn More
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(bursary.name + " " + bursary.provider + " application 2025")}`}
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

const BursariesPage = () => {
  const [search, setSearch] = useState("");
  const [activeField, setActiveField] = useState("All");

  const filteredBursaries = BURSARIES.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(q) ||
      b.provider.toLowerCase().includes(q) ||
      b.field.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q);
    const matchesField = activeField === "All" || b.field === activeField;
    return matchesSearch && matchesField;
  });

  // Grouped by field for the hub view (only when no search/filter active)
  const grouped = BURSARY_FIELDS.reduce<Record<string, Bursary[]>>((acc, field) => {
    const items = filteredBursaries.filter((b) => b.field === field);
    if (items.length) acc[field] = items;
    return acc;
  }, {});

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "South African Bursaries 2025 — Complete List",
    description:
      "A comprehensive, regularly updated list of active bursaries available in South Africa, organised by field of study.",
    numberOfItems: BURSARIES.length,
    itemListElement: BURSARIES.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: b.applicationUrl,
    })),
  };

  return (
    <>
      <Helmet>
        <title>South African Bursaries 2025 — Complete List by Field | StudyBuddyWorks</title>
        <meta
          name="description"
          content={`Explore ${BURSARIES.length}+ active South African bursaries sorted by field — Engineering, Finance, IT, Medicine, Education, Law, Mining and more. All links verified and updated for 2025.`}
        />
        <meta
          name="keywords"
          content="South Africa bursaries 2025, SA bursary list, engineering bursary, NSFAS, Funza Lushaka, SAICA Thuthuka, Eskom bursary, government bursary South Africa, bursary application"
        />
        <meta property="og:title" content="South African Bursaries 2025 — Complete Hub" />
        <meta
          property="og:description"
          content="Find every active bursary in South Africa, sorted by field of study. Free search and filter tool with direct links to apply."
        />
        <meta property="og:url" content="https://studybuddy.works/bursaries" />
        <link rel="canonical" href="https://studybuddy.works/bursaries" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Hero */}
        <section className="py-12 md:py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              {BURSARIES.length} Active Bursaries
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              South African Bursaries Hub
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              A complete, up-to-date list of every verifiably active bursary available in South
              Africa — sorted by field of study, with direct links to apply.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>✅ Government bursaries</span>
              <span>✅ Corporate bursaries</span>
              <span>✅ Sorted by field</span>
              <span>✅ Direct apply links</span>
            </div>
          </div>
        </section>

        {/* Bursary Assistance Pricing */}
        <WhatsAppPricingOffers
          variant="bursary"
          heading="Get Help With Your Bursary Applications"
        />

        {/* Search + Filter */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            {/* Search bar */}
            <div className="flex items-center gap-3 mb-6 bg-white rounded-xl border p-2 shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground ml-2 shrink-0" />
              <Input
                placeholder="Search bursaries by name, provider or field…"
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

            {/* Field filter pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", ...BURSARY_FIELDS].map((field) => (
                <button
                  key={field}
                  onClick={() => setActiveField(field)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeField === field
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {field !== "All" && FIELD_ICONS[field]}
                  {field}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing <strong>{filteredBursaries.length}</strong> of{" "}
              <strong>{BURSARIES.length}</strong> bursaries
              {activeField !== "All" && (
                <> in <strong>{activeField}</strong></>
              )}
              {search && (
                <> matching &ldquo;<strong>{search}</strong>&rdquo;</>
              )}
            </p>

            {/* No results */}
            {filteredBursaries.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg">No bursaries found</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveField("All");
                  }}
                  className="text-primary underline text-sm mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Grouped layout (when no active field filter or search) */}
            {filteredBursaries.length > 0 &&
              Object.entries(grouped).map(([field, bursaries]) => (
                <div key={field} className="mb-12">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border ${
                        FIELD_COLORS[field] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {FIELD_ICONS[field]}
                      {field}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {bursaries.length} bursari{bursaries.length === 1 ? "y" : "es"}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {bursaries.map((b) => (
                      <BursaryCard key={b.id} bursary={b} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Bursary Databases & Resources */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Bursary Databases &amp; Search Portals</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Can't find what you're looking for above? These free South African bursary databases
              list hundreds of additional opportunities updated throughout the year.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "AllBursaries.co.za",
                  url: "https://allbursaries.co.za",
                  desc: "Comprehensive bursary database",
                },
                {
                  name: "Bursaries.co.za",
                  url: "https://bursaries.co.za",
                  desc: "Updated bursary listings",
                },
                {
                  name: "ZABursaries.co.za",
                  url: "https://www.zabursaries.co.za",
                  desc: "SA bursary portal",
                },
                {
                  name: "GoStudy.co.za",
                  url: "https://www.gostudy.co.za",
                  desc: "Bursary search engine",
                },
                {
                  name: "CareersPortal Bursaries",
                  url: "https://www.careersportal.co.za",
                  desc: "Career & bursary info",
                },
                {
                  name: "EduUpstairs Bursaries",
                  url: "https://www.edupstairs.org",
                  desc: "Bursary listings & guides",
                },
                {
                  name: "SA Bursaries",
                  url: "https://www.sabursaries.co.za",
                  desc: "Bursary database",
                },
                {
                  name: "Feenix Crowdfunding",
                  url: "https://www.feenix.org",
                  desc: "Student fundraising platform",
                },
                {
                  name: "ISFAP",
                  url: "https://www.isfap.org.za",
                  desc: "Missing-middle student funding",
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

        {/* Bursary Assistance Pricing (mid-page) */}
        <WhatsAppPricingOffers variant="bursary" />

        {/* Province interlink section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Browse Bursaries &amp; Tutoring by Province</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Bursary availability can vary by province — especially for government and municipal
              bursaries. Select your province below to see bursaries relevant to your area and find
              AI-powered tutoring support while you prepare your applications.
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

        {/* Info section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border p-8">
            <h2 className="text-xl font-bold mb-4">How to Apply for a Bursary in South Africa</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>1. Check eligibility early.</strong> Most bursaries require you to be a South
                African citizen, to be studying a specific field, and sometimes to come from a
                household below a certain income threshold. Read the eligibility criteria carefully
                before applying.
              </p>
              <p>
                <strong>2. Gather your documents.</strong> Typical documents include a certified copy
                of your ID, matric certificate (or latest results if still at school), proof of
                registration or acceptance at a university, proof of income (parents' payslips or
                SASSA grant letters), and academic transcripts.
              </p>
              <p>
                <strong>3. Apply before deadlines.</strong> Most bursaries open applications in
                August–October for the following academic year. Set reminders and apply as early as
                possible — popular bursaries like NSFAS and Funza Lushaka can close quickly.
              </p>
              <p>
                <strong>4. Apply to multiple bursaries.</strong> You can apply to more than one
                bursary at a time. If you receive multiple offers, choose the one that covers the
                most costs or best suits your situation.
              </p>
              <p>
                <strong>5. Follow up.</strong> After submitting, keep a copy of your application and
                follow up with the bursary provider if you have not heard back within 4–6 weeks.
              </p>
            </div>
          </div>
        </section>

        {/* Application Assistance */}
        <WhatsAppAssistanceBanner
          heading="Need Help Applying for a Bursary?"
          description="Get free 1-on-1 guidance — I'll personally walk you through the bursary application process, help you choose the right bursaries, and review your documents."
        />

        {/* Related Tools */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">Related Tools &amp; Resources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Link
                to="/high-school-scholarships"
                className="group bg-white p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-9 h-9 text-accent mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">High School Scholarships</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse 150+ high school scholarships and bursaries available in South Africa.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  View scholarships <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/aps-calculator"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <Calculator className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">APS Calculator</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Calculate your Admission Point Score to check bursary and university eligibility.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Calculate APS <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/courses"
                className="group bg-white p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-9 h-9 text-accent mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">University Courses</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse APS requirements and entry criteria for popular SA university courses.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Browse courses <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/students"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <BookOpen className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">AI Tutor</h3>
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

export default BursariesPage;
