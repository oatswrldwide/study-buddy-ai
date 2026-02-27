import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  ExternalLink,
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Calculator,
  Award,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BURSARIES,
  BURSARY_SLUG_TO_FIELD,
  BURSARY_FIELD_SLUGS,
  BURSARY_FIELDS,
  type Bursary,
} from "@/data/bursaries";

const WHATSAPP_NUMBER = "27680187300";

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

const CourseBursariesPage = () => {
  const { field: fieldSlug } = useParams<{ field: string }>();
  const field = BURSARY_SLUG_TO_FIELD[fieldSlug ?? ""];

  if (!field) return <Navigate to="/bursaries" replace />;

  const fieldBursaries = BURSARIES.filter((b) => b.field === field);
  // Also include General / Multiple Fields if we're on a specific field page
  const generalBursaries =
    field !== "General / Multiple Fields"
      ? BURSARIES.filter((b) => b.field === "General / Multiple Fields")
      : [];

  const colorClass = FIELD_COLORS[field] ?? "bg-gray-100 text-gray-700 border-gray-200";

  // Related fields (pick 4 others)
  const relatedFields = BURSARY_FIELDS.filter((f) => f !== field && f !== "General / Multiple Fields").slice(0, 4);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${field} Bursaries South Africa 2025`,
    description: `A complete list of active ${field} bursaries available in South Africa for 2025.`,
    numberOfItems: fieldBursaries.length,
    itemListElement: fieldBursaries.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: b.applicationUrl,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
      { "@type": "ListItem", position: 2, name: "Bursaries", item: "https://studybuddy.works/bursaries" },
      {
        "@type": "ListItem",
        position: 3,
        name: `${field} Bursaries`,
        item: `https://studybuddy.works/bursaries/${fieldSlug}`,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{field} Bursaries South Africa 2025 | StudyBuddyWorks</title>
        <meta
          name="description"
          content={`Browse ${fieldBursaries.length} active ${field} bursaries in South Africa for 2025. Compare eligibility, funding value and apply directly. Get expert help with your applications.`}
        />
        <meta
          name="keywords"
          content={`${field} bursary South Africa 2025, ${field.toLowerCase()} bursary, bursary application ${field.toLowerCase()}, SA bursary ${field.toLowerCase()}`}
        />
        <meta property="og:title" content={`${field} Bursaries South Africa 2025 | StudyBuddyWorks`} />
        <meta
          property="og:description"
          content={`${fieldBursaries.length} active ${field} bursaries with direct apply links. Free to browse.`}
        />
        <meta property="og:url" content={`https://studybuddy.works/bursaries/${fieldSlug}`} />
        <link rel="canonical" href={`https://studybuddy.works/bursaries/${fieldSlug}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/bursaries" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              All Bursaries
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{field}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-10 md:py-14 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border mb-4 ${colorClass}`}
            >
              <Award className="w-4 h-4" />
              {fieldBursaries.length} Active Bursaries
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {field} Bursaries in South Africa
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Browse every active bursary available for {field} students in South Africa — with
              direct links to apply and expert application assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-8">
              <span>✅ {fieldBursaries.length} field-specific bursaries</span>
              <span>✅ {generalBursaries.length} general bursaries also available</span>
              <span>✅ Direct apply links</span>
              <span>✅ Updated for 2025</span>
            </div>
            {/* Top CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I need help applying for ${field} bursaries in South Africa.`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="w-5 h-5" />
                Get Help With My Applications
              </Button>
            </a>
          </div>
        </section>

        {/* Bursary application assistance pricing — top */}
        <WhatsAppPricingOffers
          variant="bursary"
          heading={`Get Help With Your ${field} Bursary Applications`}
        />

        {/* Field-specific bursaries */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{field} Bursaries</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {fieldBursaries.length} active bursaries specifically for {field} students.
            </p>
            {fieldBursaries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No field-specific bursaries listed yet — check the general bursaries below.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {fieldBursaries.map((b) => (
                  <BursaryCard key={b.id} bursary={b} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Mid-page CTA banner */}
        <section className="container mx-auto px-4 pb-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Don't miss a {field} bursary deadline
              </h2>
              <p className="text-white/80 text-sm max-w-xl">
                Our team tracks every opening and deadline. We'll shortlist the right bursaries for
                your profile and help you submit complete, winning applications.
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I want help applying for ${field} bursaries.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="secondary" size="lg" className="gap-2 font-semibold whitespace-nowrap">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us — 068 018 7300
              </Button>
            </a>
          </div>
        </section>

        {/* General / multiple-field bursaries (when not on the General page) */}
        {generalBursaries.length > 0 && (
          <section className="container mx-auto px-4 pb-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">
                General &amp; Multi-Field Bursaries — also available to {field} students
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                These bursaries are open to students across multiple disciplines, including {field}.
                Check the eligibility criteria to confirm.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {generalBursaries.map((b) => (
                  <BursaryCard key={b.id} bursary={b} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related fields */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <h2 className="text-xl font-bold mb-2">Browse Bursaries by Other Fields</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Thinking about changing direction? Explore bursaries available in related fields.
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedFields.map((f) => (
                <Link
                  key={f}
                  to={`/bursaries/${BURSARY_FIELD_SLUGS[f]}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
                >
                  {f}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ))}
              <Link
                to="/bursaries"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                View all fields
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* WhatsApp assistance banner */}
        <WhatsAppAssistanceBanner
          heading={`Need Help Applying for a ${field} Bursary?`}
          description={`Get free 1-on-1 guidance — I'll personally walk you through the ${field} bursary application process, help you choose the right bursaries for your profile, and review your documents.`}
        />

        {/* Related tools */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">Related Tools &amp; Resources</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              <Link
                to="/bursaries"
                className="group bg-white p-6 rounded-xl border hover:border-primary hover:shadow-lg transition-all"
              >
                <Award className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  All Bursaries
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse the full list of South African bursaries across all fields.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  View all bursaries <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/aps-calculator"
                className="group bg-white p-6 rounded-xl border hover:border-primary hover:shadow-lg transition-all"
              >
                <Calculator className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  APS Calculator
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Calculate your APS score to check university and bursary eligibility.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Calculate APS <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/courses"
                className="group bg-white p-6 rounded-xl border hover:border-accent hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-9 h-9 text-accent mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">
                  Course Requirements
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Compare APS requirements and fees for popular SA university courses.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Browse courses <ChevronRight className="w-4 h-4" />
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

export default CourseBursariesPage;
