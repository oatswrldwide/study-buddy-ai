import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Calculator,
  ArrowRight,
  FileText,
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

type ApplicationStatus =
  | "Registration Open"
  | "Late Applications Open"
  | "Closed for 2026";

interface UniversityStatus {
  name: string;
  abbr: string;
  type: UniversityType;
  province: string;
  status: ApplicationStatus;
  statusNote: string;
  applySlug: string;
}

const UNIVERSITIES_BY_PROVINCE: { province: string; universities: UniversityStatus[] }[] = [
  {
    province: "Gauteng",
    universities: [
      {
        name: "University of Pretoria",
        abbr: "UP",
        type: "Traditional University",
        province: "Gauteng",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Late applications may be considered.",
        applySlug: "how-to-apply-to-university-of-pretoria",
      },
      {
        name: "University of the Witwatersrand",
        abbr: "Wits",
        type: "Traditional University",
        province: "Gauteng",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Check website for late application availability.",
        applySlug: "how-to-apply-to-wits",
      },
      {
        name: "University of Johannesburg",
        abbr: "UJ",
        type: "Comprehensive University",
        province: "Gauteng",
        status: "Late Applications Open",
        statusNote: "Late applications may be open for selected programmes. Check UJ website.",
        applySlug: "how-to-apply-to-uj",
      },
      {
        name: "University of South Africa",
        abbr: "UNISA",
        type: "Comprehensive University",
        province: "Gauteng",
        status: "Late Applications Open",
        statusNote: "Semester 1 registration open. UNISA accepts applications year-round.",
        applySlug: "how-to-apply-to-unisa",
      },
      {
        name: "Tshwane University of Technology",
        abbr: "TUT",
        type: "University of Technology",
        province: "Gauteng",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Late applications for remaining spaces.",
        applySlug: "how-to-apply-to-tut",
      },
      {
        name: "Vaal University of Technology",
        abbr: "VUT",
        type: "University of Technology",
        province: "Gauteng",
        status: "Registration Open",
        statusNote: "2026 registration open. Contact admissions for late applications.",
        applySlug: "how-to-apply-to-vut",
      },
      {
        name: "Sefako Makgatho Health Sciences University",
        abbr: "SMU",
        type: "Traditional University",
        province: "Gauteng",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Health sciences programmes highly competitive.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Most programmes are full for 2026.",
        applySlug: "how-to-apply-to-uct",
      },
      {
        name: "Stellenbosch University",
        abbr: "SU",
        type: "Traditional University",
        province: "Western Cape",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Limited late application spaces available.",
        applySlug: "how-to-apply-to-stellenbosch-university",
      },
      {
        name: "University of the Western Cape",
        abbr: "UWC",
        type: "Comprehensive University",
        province: "Western Cape",
        status: "Late Applications Open",
        statusNote: "Late applications open for selected programmes. Check UWC portal.",
        applySlug: "how-to-apply-to-uwc",
      },
      {
        name: "Cape Peninsula University of Technology",
        abbr: "CPUT",
        type: "University of Technology",
        province: "Western Cape",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Some programmes may accept late applications.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing across all campuses.",
        applySlug: "how-to-apply-to-ukzn",
      },
      {
        name: "University of Zululand",
        abbr: "UniZulu",
        type: "Comprehensive University",
        province: "KwaZulu-Natal",
        status: "Late Applications Open",
        statusNote: "Late applications open. Contact admissions at KwaDlangezwa campus.",
        applySlug: "how-to-apply-to-university-of-zululand",
      },
      {
        name: "Durban University of Technology",
        abbr: "DUT",
        type: "University of Technology",
        province: "KwaZulu-Natal",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Late applications considered for available spaces.",
        applySlug: "how-to-apply-to-dut",
      },
      {
        name: "Mangosuthu University of Technology",
        abbr: "MUT",
        type: "University of Technology",
        province: "KwaZulu-Natal",
        status: "Late Applications Open",
        statusNote: "Late applications may be accepted for certain programmes. Contact MUT directly.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing in Makhanda.",
        applySlug: "how-to-apply-to-rhodes-university",
      },
      {
        name: "Nelson Mandela University",
        abbr: "NMU",
        type: "Comprehensive University",
        province: "Eastern Cape",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Some late application spaces may be available.",
        applySlug: "how-to-apply-to-nelson-mandela-university",
      },
      {
        name: "University of Fort Hare",
        abbr: "UFH",
        type: "Traditional University",
        province: "Eastern Cape",
        status: "Late Applications Open",
        statusNote: "Late applications considered for eligible programmes. Contact UFH admissions.",
        applySlug: "how-to-apply-to-university-of-fort-hare",
      },
      {
        name: "Walter Sisulu University",
        abbr: "WSU",
        type: "Comprehensive University",
        province: "Eastern Cape",
        status: "Late Applications Open",
        statusNote: "Late applications open for selected programmes at Mthatha and East London.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing at Bloemfontein, QwaQwa and South campuses.",
        applySlug: "how-to-apply-to-ufs",
      },
      {
        name: "Central University of Technology",
        abbr: "CUT",
        type: "University of Technology",
        province: "Free State",
        status: "Registration Open",
        statusNote: "2026 registration ongoing. Check CUT website for late application spaces.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing at Turfloop campus.",
        applySlug: "how-to-apply-to-university-of-limpopo",
      },
      {
        name: "University of Venda",
        abbr: "UNIVEN",
        type: "Comprehensive University",
        province: "Limpopo",
        status: "Late Applications Open",
        statusNote: "Late applications considered for eligible programmes. Contact UNIVEN admissions.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing at Potchefstroom, Mahikeng and Vanderbijlpark campuses.",
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
        status: "Registration Open",
        statusNote: "2026 registration ongoing at Mbombela campus.",
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
        status: "Late Applications Open",
        statusNote: "Late applications may be considered for available spaces in Kimberley.",
        applySlug: "how-to-apply-to-sol-plaatje-university",
      },
    ],
  },
];

const STATUS_STYLES: Record<ApplicationStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  "Registration Open": {
    bg: "bg-green-50 border-green-200",
    text: "text-green-700",
    icon: <CheckCircle className="w-4 h-4 text-green-600" />,
  },
  "Late Applications Open": {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
  },
  "Closed for 2026": {
    bg: "bg-red-50 border-red-200",
    text: "text-red-700",
    icon: <Clock className="w-4 h-4 text-red-600" />,
  },
};

const TYPE_COLORS: Record<UniversityType, string> = {
  "Traditional University": "bg-blue-100 text-blue-700 border-blue-200",
  "University of Technology": "bg-purple-100 text-purple-700 border-purple-200",
  "Comprehensive University": "bg-green-100 text-green-700 border-green-200",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "2026 South African University Application Status Tracker",
  description:
    "Track the current 2026 application and registration status for all 26 South African public universities, organised by province and university type.",
  url: "https://studybuddy.works/university-status-2026",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
      { "@type": "ListItem", position: 2, name: "Apply", item: "https://studybuddy.works/apply" },
      {
        "@type": "ListItem",
        position: 3,
        name: "2026 Status Tracker",
        item: "https://studybuddy.works/university-status-2026",
      },
    ],
  },
};

const UniversityStatusPage = () => {
  return (
    <>
      <Helmet>
        <title>2026 SA University Application Status Tracker | Late Applications & Registration</title>
        <meta
          name="description"
          content="Check the 2026 application and registration status for all 26 South African public universities. See which universities still have late applications open or registration ongoing — organised by province."
        />
        <meta
          name="keywords"
          content="SA university status 2026, late applications 2026, university registration 2026, South Africa university application status, open applications South Africa"
        />
        <meta property="og:title" content="2026 SA University Application Status Tracker" />
        <meta
          property="og:description"
          content="See which SA universities still have late applications open or registration ongoing for 2026 — all 26 public universities by province."
        />
        <meta property="og:url" content="https://studybuddy.works/university-status-2026" />
        <link rel="canonical" href="https://studybuddy.works/university-status-2026" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        {/* Hero */}
        <section className="pt-24 pb-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Clock className="w-4 h-4" />
              February 2026 — Live Status
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              2026 SA University Application Status Tracker
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              It's February 2026 — most universities are in their{" "}
              <strong>registration phase</strong>. Some still have{" "}
              <strong>late applications open</strong>. Check the status of all 26 public SA
              universities below, organised by province.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/apply">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Apply to a University
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/university-prospectus-2026">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Prospectus
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Status Legend */}
        <section className="container mx-auto px-4 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {(Object.entries(STATUS_STYLES) as [ApplicationStatus, typeof STATUS_STYLES[ApplicationStatus]][]).map(
                ([status, style]) => (
                  <div
                    key={status}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${style.bg} ${style.text}`}
                  >
                    {style.icon}
                    {status}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Type Legend */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">University Types (26 Public Universities):</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-blue-100 text-blue-700 border-blue-200 text-xs font-medium">
                  Traditional University (11)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-purple-100 text-purple-700 border-purple-200 text-xs font-medium">
                  University of Technology (9)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-green-100 text-green-700 border-green-200 text-xs font-medium">
                  Comprehensive University (6)
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
                  {universities.map((uni) => {
                    const s = STATUS_STYLES[uni.status];
                    return (
                      <div
                        key={uni.abbr}
                        className={`rounded-xl border p-4 ${s.bg}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
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
                            {uni.type.replace("University of Technology", "UoT").replace("Traditional University", "Traditional").replace("Comprehensive University", "Comprehensive")}
                          </Badge>
                        </div>
                        <div className={`flex items-center gap-1.5 text-sm font-semibold mb-1 ${s.text}`}>
                          {s.icon}
                          {uni.status}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{uni.statusNote}</p>
                        <Link
                          to={`/${uni.applySlug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          View application guide <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">What happens next?</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Since it is February 2026, most students are in the <strong>registration</strong> phase
                  for the first semester. New applications for the <strong>2027 academic year</strong> typically
                  open in <strong>April 2026</strong>. In the meantime, focus on:
                </p>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Registering for your 2026 courses if you have been accepted</li>
                  <li>Applying for NSFAS or bursaries if you haven't yet</li>
                  <li>Checking late application availability at universities with spaces</li>
                  <li>Preparing your documents for 2027 applications opening in April</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/bursaries">
                      Find Bursaries
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/aps-calculator">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate My APS
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/university-prospectus-2026">
                      <FileText className="w-4 h-4 mr-2" />
                      Download 2026 Prospectus
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppAssistanceBanner
          heading="Need Help with Late Applications or Registration?"
          description="Get free 1-on-1 guidance on late applications, registration requirements and what to do if you missed the deadline for your first choice university."
        />

        <Footer />
      </div>
    </>
  );
};

export default UniversityStatusPage;
