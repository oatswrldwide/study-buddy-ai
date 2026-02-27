import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, TrendingUp, Calendar } from "lucide-react";

const copywritingExamples = [
  {
    title: "Student Landing Page",
    description: "Conversion-focused copy for South African matric students: value proposition, pricing, and CTA hierarchy.",
    href: "/students",
    type: "Landing Page",
    published: "1 January 2026",
  },
  {
    title: "Schools Partnership Page",
    description: "B2B copy targeting school principals and governing bodies; outcome-driven messaging for white-label AI tutoring.",
    href: "/schools",
    type: "Landing Page",
    published: "1 January 2026",
  },
  {
    title: "Bursaries Guide 2026",
    description: "Comprehensive long-form guide covering 50+ South African bursaries with eligibility criteria and application links.",
    href: "/bursaries",
    type: "Long-form Guide",
    published: "1 January 2026",
  },
  {
    title: "High School Scholarships",
    description: "Targeted resource page for Grade 8–12 learners seeking merit and need-based scholarships across South Africa.",
    href: "/high-school-scholarships",
    type: "Resource Page",
    published: "1 January 2026",
  },
  {
    title: "University Application Hub",
    description: "Step-by-step application content for 32 South African universities with HowTo schema for voice-search optimisation.",
    href: "/apply",
    type: "Resource Page",
    published: "1 February 2026",
  },
  {
    title: "About StudyBuddy Works",
    description: "Brand storytelling copy articulating mission, values, and social impact for the South African ed-tech audience.",
    href: "/about",
    type: "Brand Page",
    published: "1 January 2026",
  },
  {
    title: "24/7 Mathematics Help for Matric Students",
    description: "PSEO article targeting high-intent long-tail keyword; structured with FAQs and schema markup for rich results.",
    href: "/resources/24-7-mathematics-help-for-matric-students",
    type: "SEO Article",
    published: "1 February 2026",
  },
  {
    title: "24/7 Physical Sciences Help for Matric Students",
    description: "PSEO article covering exam preparation strategies, tutor comparisons, and internal links to location pages.",
    href: "/resources/24-7-physical-sciences-help-for-matric-students",
    type: "SEO Article",
    published: "1 February 2026",
  },
];

const seoProjects = [
  {
    domain: "studybuddy.works",
    url: "https://studybuddy.works",
    period: "1 June 2024 – present",
    objective:
      "Grow organic search visibility for South African matric tutoring queries; improve Domain Rating; build topical authority across all 9 provinces.",
    highlights: [
      "759 location pages (one per SA city/town) for local SEO",
      "9 province-level hub pages with internal linking",
      "4 796-URL sitemap submitted to Google Search Console",
      "PSEO article cluster targeting 200+ long-tail keywords",
      "FAQPage, HowTo, BreadcrumbList, and AggregateRating schema across all key pages",
      "robots.txt configured to block AI crawlers while allowing Googlebot",
    ],
  },
  {
    domain: "studybuddy.works/bursaries",
    url: "https://studybuddy.works/bursaries",
    period: "1 September 2024 – present",
    objective:
      "Rank for high-volume bursary and financial-aid keywords (NSFAS, Funza Lushaka, mining bursaries); improve click-through rate from SERPs.",
    highlights: [
      "50+ bursaries catalogued with structured data",
      "Separate applicationUrl vs websiteUrl fields for NSFAS, Funza Lushaka, NRF",
      "Category filtering (STEM, arts, teaching, mining) for improved UX and crawl depth",
    ],
  },
  {
    domain: "studybuddy.works/apply",
    url: "https://studybuddy.works/apply",
    period: "1 October 2024 – present",
    objective:
      "Capture 'how to apply to [university]' search traffic; target featured snippets with HowTo schema for 32 SA universities.",
    highlights: [
      "HowTo JSON-LD schema on all 32 university apply pages",
      "Step-by-step numbered instructions for voice-search eligibility",
      "BreadcrumbList schema on every detail page",
    ],
  },
  {
    domain: "studybuddy.works/resources",
    url: "https://studybuddy.works/resources",
    period: "1 November 2024 – present",
    objective:
      "Build topical authority for CAPS-aligned educational content; improve time-on-site and reduce bounce rate through related-article interlinking.",
    highlights: [
      "Article schema with datePublished, dateModified, and speakable property",
      "Related-articles component on every PSEO page",
      "FAQPage schema embedded via FAQAccordion component",
    ],
  },
];

const PortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>SEO & Copywriting Portfolio | StudyBuddy Works</title>
        <meta
          name="description"
          content="Examples of copywriting and SEO work completed for StudyBuddy Works: landing pages, long-form guides, PSEO article clusters, schema markup, and local SEO for 759 South African locations."
        />
        <meta property="og:title" content="SEO & Copywriting Portfolio | StudyBuddy Works" />
        <meta
          property="og:description"
          content="Copywriting examples and SEO case studies for studybuddy.works — covering local SEO, PSEO, schema markup, and content strategy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://studybuddy.works/portfolio" />
        <link rel="canonical" href="https://studybuddy.works/portfolio" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "url": "https://studybuddy.works/portfolio",
          "name": "SEO & Copywriting Portfolio",
          "description": "Copywriting examples and SEO case studies produced for StudyBuddy Works.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://studybuddy.works/" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://studybuddy.works/portfolio" },
            ],
          },
        })}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <TrendingUp className="h-4 w-4" />
              SEO &amp; Copywriting Work
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Copywriting examples and SEO case studies produced for StudyBuddy Works—covering landing pages,
              long-form guides, PSEO article clusters, schema markup, and local SEO across South Africa.
            </p>
          </div>
        </section>

        {/* Copywriting Examples */}
        <section className="py-16 md:py-20">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Copywriting Examples</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {copywritingExamples.map((example) => (
                <div
                  key={example.href}
                  className="bg-background border border-border rounded-xl p-6 flex flex-col gap-3 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">{example.title}</h3>
                    <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1">
                      {example.type}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm flex-1">{example.description}</p>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Link
                      to={example.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      View page <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      Published {example.published}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Work History */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">SEO Work History</h2>
            </div>
            <div className="flex flex-col gap-8">
              {seoProjects.map((project) => (
                <div
                  key={project.domain}
                  className="bg-background border border-border rounded-xl p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-start gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-lg font-semibold text-primary hover:underline break-all"
                      >
                        {project.domain} <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted rounded-full px-3 py-1 shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">Objective: </span>
                    {project.objective}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Work Together?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Interested in SEO strategy, content writing, or PSEO campaigns for your education brand?
              Get in touch via our schools contact form.
            </p>
            <Button asChild size="lg">
              <Link to="/schools#contact">Contact Us</Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
