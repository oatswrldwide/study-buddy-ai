import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  ExternalLink,
  BookOpen,
  ChevronRight,
  MapPin,
  ArrowLeft,
  Calculator,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";
import WhatsAppPricingOffers from "@/components/shared/WhatsAppPricingOffers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UNIVERSITY_BURSARY_MAP, type UniversityOwnBursary } from "@/data/universityBursaries";
import NotFound from "./NotFound";

const TYPE_COLORS: Record<string, string> = {
  "Traditional University": "bg-blue-100 text-blue-700 border-blue-200",
  "University of Technology": "bg-purple-100 text-purple-700 border-purple-200",
  "Comprehensive University": "bg-green-100 text-green-700 border-green-200",
  "Private Institution": "bg-orange-100 text-orange-700 border-orange-200",
};

const BursaryCard = ({
  bursary,
  universityName,
}: {
  bursary: UniversityOwnBursary;
  universityName: string;
}) => (
  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
    <CardHeader className="pb-3">
      <CardTitle className="text-base leading-snug">{bursary.name}</CardTitle>
      <p className="text-xs text-muted-foreground font-medium">{universityName}</p>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">{bursary.description}</p>

      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Eligibility</p>
        <p className="text-xs text-muted-foreground">{bursary.eligibility}</p>
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
          href={`https://www.google.com/search?q=${encodeURIComponent(
            bursary.name + " " + universityName + " application 2025"
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

const UniversityBursaryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const uni = slug ? UNIVERSITY_BURSARY_MAP[slug] : undefined;

  if (!uni) return <NotFound />;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Bursaries at ${uni.name} (${uni.abbr}) 2025`,
    description: `A complete list of bursaries, scholarships and financial aid available at ${uni.name} for 2025.`,
    numberOfItems: uni.bursaries.length,
    itemListElement: uni.bursaries.map((b, i) => ({
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
      {
        "@type": "ListItem",
        position: 4,
        name: `${uni.abbr} Bursaries`,
        item: `https://studybuddy.works/bursaries/university/${uni.slug}`,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          {uni.name} Bursaries & Financial Aid 2025 | {uni.abbr} | StudyBuddyWorks
        </title>
        <meta
          name="description"
          content={`Find ${uni.bursaries.length}+ bursaries, scholarships and financial aid options available at ${uni.name} (${uni.abbr}) for 2025. Includes NSFAS, merit awards and university-specific funding.`}
        />
        <meta
          name="keywords"
          content={`${uni.name} bursaries, ${uni.abbr} bursaries, ${uni.abbr} financial aid, ${uni.abbr} scholarships, bursaries at ${uni.name}, NSFAS ${uni.abbr}, ${uni.abbr} merit bursary`}
        />
        <meta
          property="og:title"
          content={`${uni.name} Bursaries & Financial Aid 2025`}
        />
        <meta
          property="og:description"
          content={`Explore all bursaries, scholarships and financial aid available at ${uni.name} (${uni.abbr}) — including NSFAS, merit awards and university-specific funding.`}
        />
        <meta
          property="og:url"
          content={`https://studybuddy.works/bursaries/university/${uni.slug}`}
        />
        <link
          rel="canonical"
          href={`https://studybuddy.works/bursaries/university/${uni.slug}`}
        />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-4 pb-0">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/bursaries" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Bursaries
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/bursaries/universities" className="hover:text-primary">
              University Bursaries
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{uni.abbr}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-10 md:py-14 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-3">
              <Badge
                className={`text-sm px-3 py-1 ${TYPE_COLORS[uni.type] ?? "bg-gray-100 text-gray-700"}`}
                variant="outline"
              >
                {uni.type}
              </Badge>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              {uni.bursaries.length} Funding Options Available
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {uni.name} Bursaries &amp; Financial Aid
            </h1>
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mb-4">
              <MapPin className="w-4 h-4 shrink-0" />
              {uni.location}
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              A complete list of bursaries, scholarships and financial aid available at{" "}
              <strong>{uni.name} ({uni.abbr})</strong> — including university-specific funding,
              NSFAS, and merit awards for 2025.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>✅ University-specific bursaries</span>
              <span>✅ NSFAS &amp; government funding</span>
              <span>✅ Merit scholarships</span>
              <span>✅ Direct application links</span>
            </div>
          </div>
        </section>

        {/* Bursary Application Assistance */}
        <WhatsAppPricingOffers
          variant="bursary"
          heading={`Get Help With Your ${uni.abbr} Bursary Applications`}
        />

        {/* Bursary Cards */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">
              Bursaries &amp; Financial Aid at {uni.abbr}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              The following bursaries are available to students at {uni.name}. Always visit the
              official {uni.abbr} financial aid page and each bursary provider directly to confirm
              current eligibility requirements and closing dates.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {uni.bursaries.map((b) => (
                <BursaryCard key={b.id} bursary={b} universityName={uni.name} />
              ))}
            </div>

            {/* Official financial aid link */}
            <div className="bg-white rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-foreground mb-1">
                  Official {uni.abbr} Financial Aid Page
                </p>
                <p className="text-sm text-muted-foreground">
                  Visit {uni.name}'s official financial aid office for the most up-to-date bursary
                  listings, application forms and closing dates.
                </p>
              </div>
              <Button asChild variant="outline" className="shrink-0 gap-2 border-primary text-primary hover:bg-primary/5">
                <a href={uni.bursaryPageUrl} target="_blank" rel="noopener noreferrer">
                  Visit {uni.abbr} Financial Aid
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* How to Apply Tips */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">How to Apply for Bursaries at {uni.abbr}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "1. Check eligibility first",
                  body: `Review the eligibility requirements for each bursary carefully before applying. Most ${uni.abbr} bursaries require South African citizenship and a minimum academic average.`,
                },
                {
                  title: "2. Gather your documents",
                  body: "You'll typically need: certified ID copy, latest academic results (Grade 11 or university transcripts), proof of household income, proof of registration at " + uni.abbr + ", and sometimes a motivation letter.",
                },
                {
                  title: "3. Apply for NSFAS early",
                  body: "NSFAS applications open in September–October each year. If your household income is below R350 000 p.a., apply immediately — NSFAS is the largest source of student funding in South Africa.",
                },
                {
                  title: "4. Apply to multiple bursaries",
                  body: "You can apply to more than one bursary at the same time. Maximise your chances by applying for every bursary you're eligible for — both university-specific and national bursaries.",
                },
                {
                  title: "5. Meet the deadlines",
                  body: "Most university bursaries open in August–November for the following academic year. Set calendar reminders and submit before the closing date — late applications are usually not accepted.",
                },
                {
                  title: "6. Follow up",
                  body: "After submitting, keep copies of your application and track your application status through the " + uni.abbr + " student portal or by contacting the Financial Aid office directly.",
                },
              ].map((tip) => (
                <div key={tip.title} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tip.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services section */}
        <WhatsAppPricingOffers variant="bursary" />

        {/* Our Services — AI Tutor CTA */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6 text-center">
              StudyBuddy Services for {uni.abbr} Students
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Link
                to="/students"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <BookOpen className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  AI Tutor
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  24/7 AI-powered tutoring for university subjects — Mathematics, Sciences, Law,
                  Accounting and more.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Start free trial <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/bursaries"
                className="group bg-white p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-9 h-9 text-accent mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">
                  All SA Bursaries
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse 50+ active national bursaries sorted by field — Engineering, Finance, IT,
                  Medicine and more.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  View bursaries <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/aps-calculator"
                className="group bg-white p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <Calculator className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  APS Calculator
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Calculate your Admission Point Score to check bursary and university eligibility.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Calculate APS <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to={`/${uni.applySlug}`}
                className="group bg-white p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-9 h-9 text-accent mb-3" />
                <h3 className="font-bold text-base mb-1 group-hover:text-accent transition-colors">
                  How to Apply to {uni.abbr}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Step-by-step guide to applying to {uni.name} — APS requirements, deadlines and
                  documents.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  View apply guide <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Browse Other Universities */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border p-8">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Browse Bursaries at Other Universities</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Looking for bursaries at another South African university? We've compiled
              university-specific bursary pages for all major institutions.
            </p>
            <Button asChild>
              <Link to="/bursaries/universities">
                View All University Bursary Pages
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* WhatsApp Assistance Banner */}
        <WhatsAppAssistanceBanner
          heading={`Need Help With Your ${uni.abbr} Bursary Application?`}
          description={`Get free 1-on-1 guidance — I'll personally walk you through the bursary application process at ${uni.name}, help you choose the right funding options, and review your documents before submission.`}
        />

        <Footer />
      </div>
    </>
  );
};

export default UniversityBursaryPage;
