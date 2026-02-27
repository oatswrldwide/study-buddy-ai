import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  MapPin,
  Download,
  ExternalLink,
  FileText,
  BookOpen,
  Calculator,
  ArrowRight,
  Info,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type UniversityType =
  | "Traditional University"
  | "University of Technology"
  | "Comprehensive University";

interface ProspectusEntry {
  name: string;
  abbr: string;
  type: UniversityType;
  province: string;
  prospectusUrl: string;
  websiteUrl: string;
  applySlug: string;
}

const UNIVERSITIES_BY_PROVINCE: { province: string; universities: ProspectusEntry[] }[] = [
  {
    province: "Gauteng",
    universities: [
      {
        name: "University of Pretoria",
        abbr: "UP",
        type: "Traditional University",
        province: "Gauteng",
        prospectusUrl: "https://www.up.ac.za/prospectus",
        websiteUrl: "https://www.up.ac.za",
        applySlug: "how-to-apply-to-university-of-pretoria",
      },
      {
        name: "University of the Witwatersrand",
        abbr: "Wits",
        type: "Traditional University",
        province: "Gauteng",
        prospectusUrl: "https://www.wits.ac.za/prospectus",
        websiteUrl: "https://www.wits.ac.za",
        applySlug: "how-to-apply-to-wits",
      },
      {
        name: "University of Johannesburg",
        abbr: "UJ",
        type: "Comprehensive University",
        province: "Gauteng",
        prospectusUrl: "https://www.uj.ac.za/prospectus",
        websiteUrl: "https://www.uj.ac.za",
        applySlug: "how-to-apply-to-uj",
      },
      {
        name: "University of South Africa",
        abbr: "UNISA",
        type: "Comprehensive University",
        province: "Gauteng",
        prospectusUrl: "https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Undergraduate-students/Brochures-&-prospectus",
        websiteUrl: "https://www.unisa.ac.za",
        applySlug: "how-to-apply-to-unisa",
      },
      {
        name: "Tshwane University of Technology",
        abbr: "TUT",
        type: "University of Technology",
        province: "Gauteng",
        prospectusUrl: "https://www.tut.ac.za/prospectus",
        websiteUrl: "https://www.tut.ac.za",
        applySlug: "how-to-apply-to-tut",
      },
      {
        name: "Vaal University of Technology",
        abbr: "VUT",
        type: "University of Technology",
        province: "Gauteng",
        prospectusUrl: "https://www.vut.ac.za/index.php/prospectus",
        websiteUrl: "https://www.vut.ac.za",
        applySlug: "how-to-apply-to-vut",
      },
      {
        name: "Sefako Makgatho Health Sciences University",
        abbr: "SMU",
        type: "Traditional University",
        province: "Gauteng",
        prospectusUrl: "https://www.smu.ac.za/prospectus",
        websiteUrl: "https://www.smu.ac.za",
        applySlug: "how-to-apply-to-smu",
      },
    ],
  },
  {
    province: "Western Cape",
    universities: [
      {
        name: "University of Cape Town",
        abbr: "UCT",
        type: "Traditional University",
        province: "Western Cape",
        prospectusUrl: "https://www.uct.ac.za/study/application/prospectus",
        websiteUrl: "https://www.uct.ac.za",
        applySlug: "how-to-apply-to-uct",
      },
      {
        name: "Stellenbosch University",
        abbr: "SU",
        type: "Traditional University",
        province: "Western Cape",
        prospectusUrl: "https://www.sun.ac.za/english/applying/Pages/prospectus.aspx",
        websiteUrl: "https://www.sun.ac.za",
        applySlug: "how-to-apply-to-stellenbosch-university",
      },
      {
        name: "University of the Western Cape",
        abbr: "UWC",
        type: "Comprehensive University",
        province: "Western Cape",
        prospectusUrl: "https://www.uwc.ac.za/prospectus",
        websiteUrl: "https://www.uwc.ac.za",
        applySlug: "how-to-apply-to-uwc",
      },
      {
        name: "Cape Peninsula University of Technology",
        abbr: "CPUT",
        type: "University of Technology",
        province: "Western Cape",
        prospectusUrl: "https://www.cput.ac.za/study/programmes/prospectus",
        websiteUrl: "https://www.cput.ac.za",
        applySlug: "how-to-apply-to-cput",
      },
    ],
  },
  {
    province: "KwaZulu-Natal",
    universities: [
      {
        name: "University of KwaZulu-Natal",
        abbr: "UKZN",
        type: "Traditional University",
        province: "KwaZulu-Natal",
        prospectusUrl: "https://www.ukzn.ac.za/prospectus",
        websiteUrl: "https://www.ukzn.ac.za",
        applySlug: "how-to-apply-to-ukzn",
      },
      {
        name: "University of Zululand",
        abbr: "UniZulu",
        type: "Comprehensive University",
        province: "KwaZulu-Natal",
        prospectusUrl: "https://www.unizulu.ac.za/prospectus",
        websiteUrl: "https://www.unizulu.ac.za",
        applySlug: "how-to-apply-to-university-of-zululand",
      },
      {
        name: "Durban University of Technology",
        abbr: "DUT",
        type: "University of Technology",
        province: "KwaZulu-Natal",
        prospectusUrl: "https://www.dut.ac.za/prospectus",
        websiteUrl: "https://www.dut.ac.za",
        applySlug: "how-to-apply-to-dut",
      },
      {
        name: "Mangosuthu University of Technology",
        abbr: "MUT",
        type: "University of Technology",
        province: "KwaZulu-Natal",
        prospectusUrl: "https://www.mut.ac.za/prospectus",
        websiteUrl: "https://www.mut.ac.za",
        applySlug: "how-to-apply-to-mangosuthu-university-of-technology",
      },
    ],
  },
  {
    province: "Eastern Cape",
    universities: [
      {
        name: "Rhodes University",
        abbr: "Rhodes / RU",
        type: "Traditional University",
        province: "Eastern Cape",
        prospectusUrl: "https://www.ru.ac.za/prospectus",
        websiteUrl: "https://www.ru.ac.za",
        applySlug: "how-to-apply-to-rhodes-university",
      },
      {
        name: "Nelson Mandela University",
        abbr: "NMU",
        type: "Comprehensive University",
        province: "Eastern Cape",
        prospectusUrl: "https://www.mandela.ac.za/prospectus",
        websiteUrl: "https://www.mandela.ac.za",
        applySlug: "how-to-apply-to-nelson-mandela-university",
      },
      {
        name: "University of Fort Hare",
        abbr: "UFH",
        type: "Traditional University",
        province: "Eastern Cape",
        prospectusUrl: "https://www.ufh.ac.za/prospectus",
        websiteUrl: "https://www.ufh.ac.za",
        applySlug: "how-to-apply-to-university-of-fort-hare",
      },
      {
        name: "Walter Sisulu University",
        abbr: "WSU",
        type: "Comprehensive University",
        province: "Eastern Cape",
        prospectusUrl: "https://www.wsu.ac.za/prospectus",
        websiteUrl: "https://www.wsu.ac.za",
        applySlug: "how-to-apply-to-walter-sisulu-university",
      },
    ],
  },
  {
    province: "Free State",
    universities: [
      {
        name: "University of the Free State",
        abbr: "UFS",
        type: "Traditional University",
        province: "Free State",
        prospectusUrl: "https://www.ufs.ac.za/prospectus",
        websiteUrl: "https://www.ufs.ac.za",
        applySlug: "how-to-apply-to-ufs",
      },
      {
        name: "Central University of Technology",
        abbr: "CUT",
        type: "University of Technology",
        province: "Free State",
        prospectusUrl: "https://www.cut.ac.za/prospectus",
        websiteUrl: "https://www.cut.ac.za",
        applySlug: "how-to-apply-to-cut",
      },
    ],
  },
  {
    province: "Limpopo",
    universities: [
      {
        name: "University of Limpopo",
        abbr: "UL",
        type: "Comprehensive University",
        province: "Limpopo",
        prospectusUrl: "https://www.ul.ac.za/prospectus",
        websiteUrl: "https://www.ul.ac.za",
        applySlug: "how-to-apply-to-university-of-limpopo",
      },
      {
        name: "University of Venda",
        abbr: "UNIVEN",
        type: "Comprehensive University",
        province: "Limpopo",
        prospectusUrl: "https://www.univen.ac.za/prospectus",
        websiteUrl: "https://www.univen.ac.za",
        applySlug: "how-to-apply-to-university-of-venda",
      },
    ],
  },
  {
    province: "North West",
    universities: [
      {
        name: "North-West University",
        abbr: "NWU",
        type: "Traditional University",
        province: "North West",
        prospectusUrl: "https://www.nwu.ac.za/content/prospectus",
        websiteUrl: "https://www.nwu.ac.za",
        applySlug: "how-to-apply-to-north-west-university",
      },
    ],
  },
  {
    province: "Mpumalanga",
    universities: [
      {
        name: "University of Mpumalanga",
        abbr: "UMP",
        type: "Traditional University",
        province: "Mpumalanga",
        prospectusUrl: "https://www.ump.ac.za/prospectus",
        websiteUrl: "https://www.ump.ac.za",
        applySlug: "how-to-apply-to-university-of-mpumalanga",
      },
    ],
  },
  {
    province: "Northern Cape",
    universities: [
      {
        name: "Sol Plaatje University",
        abbr: "SPU",
        type: "Traditional University",
        province: "Northern Cape",
        prospectusUrl: "https://www.spu.ac.za/prospectus",
        websiteUrl: "https://www.spu.ac.za",
        applySlug: "how-to-apply-to-sol-plaatje-university",
      },
    ],
  },
];

const TYPE_COLORS: Record<UniversityType, string> = {
  "Traditional University": "bg-blue-100 text-blue-700 border-blue-200",
  "University of Technology": "bg-purple-100 text-purple-700 border-purple-200",
  "Comprehensive University": "bg-green-100 text-green-700 border-green-200",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Download 2026 Prospectus for All SA Universities",
  description:
    "Download the 2026 prospectus for all 26 South African public universities. Find prospectus PDFs for UCT, Wits, UP, UNISA, UJ, Stellenbosch, UKZN and more — organised by province.",
  url: "https://studybuddy.works/university-prospectus-2026",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
      { "@type": "ListItem", position: 2, name: "Apply", item: "https://studybuddy.works/apply" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Download 2026 Prospectus",
        item: "https://studybuddy.works/university-prospectus-2026",
      },
    ],
  },
};

const ProspectusPage = () => {
  return (
    <>
      <Helmet>
        <title>Download 2026 Prospectus for All SA Universities | StudyBuddy Works</title>
        <meta
          name="description"
          content="Download the 2026 prospectus for all 26 South African public universities. Find prospectus PDFs for UCT, Wits, UP, UNISA, UJ, Stellenbosch, UKZN and more — organised by province and university type."
        />
        <meta
          name="keywords"
          content="download 2026 prospectus South Africa, SA university prospectus 2026, UCT prospectus, Wits prospectus, UNISA prospectus, university prospectus PDF South Africa"
        />
        <meta property="og:title" content="Download 2026 Prospectus for All SA Universities" />
        <meta
          property="og:description"
          content="Download the 2026 prospectus for all 26 South African public universities — UCT, Wits, UNISA, UP, Stellenbosch, UJ, UKZN and more."
        />
        <meta property="og:url" content="https://studybuddy.works/university-prospectus-2026" />
        <link rel="canonical" href="https://studybuddy.works/university-prospectus-2026" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        {/* Hero */}
        <section className="pt-24 pb-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <FileText className="w-4 h-4" />
              2026 Prospectus Downloads
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Download 2026 Prospectus for All SA Universities
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Find and download the official 2026 prospectus for all 26 South African public
              universities — organised by province and university type. Each prospectus contains
              available programmes, entry requirements, tuition fees and application information.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/apply">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Apply Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/aps-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate My APS
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <section className="container mx-auto px-4 pb-6">
          <div className="max-w-5xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Tip:</strong> Prospectus PDFs are hosted on each university's official website.
              If a link opens the prospectus page rather than a direct PDF download, look for a
              "Download Prospectus" or "View as PDF" button on that page.
            </p>
          </div>
        </section>

        {/* Type Legend */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">26 South African Public Universities by Type:</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-blue-100 text-blue-700 border-blue-200 text-xs font-medium">
                  Traditional Universities (11) — academic degree programmes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-purple-100 text-purple-700 border-purple-200 text-xs font-medium">
                  Universities of Technology (9) — vocational &amp; skills-based
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-green-100 text-green-700 border-green-200 text-xs font-medium">
                  Comprehensive Universities (6) — both academic &amp; vocational
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Universities by Province */}
        <section className="container mx-auto px-4 pb-16 flex-1">
          <div className="max-w-5xl mx-auto space-y-10">
            {UNIVERSITIES_BY_PROVINCE.map(({ province, universities }) => (
              <div key={province}>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">{province}</h2>
                  <span className="text-sm text-muted-foreground">
                    ({universities.length} {universities.length === 1 ? "university" : "universities"})
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {universities.map((uni) => (
                    <div
                      key={uni.abbr}
                      className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="font-semibold text-foreground text-sm leading-snug">
                            {uni.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{uni.abbr}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${TYPE_COLORS[uni.type]}`}
                        >
                          {uni.type
                            .replace("University of Technology", "UoT")
                            .replace("Traditional University", "Traditional")
                            .replace("Comprehensive University", "Comprehensive")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={uni.prospectusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download Prospectus
                        </a>
                        <a
                          href={uni.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium border border-border px-3 py-1.5 rounded-lg hover:border-primary hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Official Website
                        </a>
                        <Link
                          to={`/${uni.applySlug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline py-1.5"
                        >
                          <BookOpen className="w-3 h-3" />
                          Apply Guide
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">What to Do After Downloading Your Prospectus</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>1. Check programme entry requirements.</strong> Each prospectus lists the
                minimum APS and subject requirements for every programme. Use our{" "}
                <Link to="/aps-calculator" className="text-primary underline">
                  APS Calculator
                </Link>{" "}
                to see which programmes you qualify for.
              </p>
              <p>
                <strong>2. Compare multiple universities.</strong> Download prospectuses from 3–5
                universities and compare the programmes, tuition fees, and campus life to find the
                best fit for your goals.
              </p>
              <p>
                <strong>3. Apply early for 2027.</strong> Applications for the 2027 academic year
                typically open in <strong>April 2026</strong>. Prepare your documents now so you're
                ready to apply as soon as applications open.
              </p>
              <p>
                <strong>4. Apply for funding.</strong> Most prospectuses include NSFAS eligibility
                information. Browse our{" "}
                <Link to="/bursaries" className="text-primary underline">
                  bursary finder
                </Link>{" "}
                to find additional funding opportunities.
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
                <Link to="/apply">
                  Application Guides
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/bursaries">
                  Find Bursaries
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/university-status-2026">
                  <FileText className="w-4 h-4 mr-2" />
                  2026 Status Tracker
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <WhatsAppAssistanceBanner
          heading="Need Help Finding the Right University?"
          description="Get free 1-on-1 guidance on choosing the right university, understanding your prospectus, and completing your application correctly."
        />

        <Footer />
      </div>
    </>
  );
};

export default ProspectusPage;
