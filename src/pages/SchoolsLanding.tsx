import HeaderSchools from "@/components/HeaderSchools";
import Footer from "@/components/Footer";
import HeroSchools from "@/components/schools/HeroSchools";
import WhatsIncluded from "@/components/schools/WhatsIncluded";
import RevenueCalculator from "@/components/schools/RevenueCalculator";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { schoolsConfig } from "@/config/schools";

const SchoolsLanding = () => {
  return (
    <>
      <Helmet>
        <title>AI Tutoring Platform for Schools | StudyBuddy Works — CAPS-Aligned, White-Label Solution</title>
        <meta name="description" content="Give every student a personal AI tutor under your school's brand. CAPS-aligned, POPIA compliant, fully managed. Deployed in 14 days. R150 per student per year. 100 student minimum." />
        <meta name="keywords" content="school AI platform, white label tutoring, branded AI tutor, CAPS aligned AI, POPIA compliant, South African schools, student outcomes" />
        <meta property="og:title" content="AI Tutoring Platform for Schools | StudyBuddy Works" />
        <meta property="og:description" content="CAPS-aligned AI tutoring platform, white-labelled for your school. Deployed in 14 days. Proven to improve student outcomes." />
        <meta property="og:url" content="https://studybuddy.works/schools" />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content="AI Tutoring Platform for Schools | StudyBuddy Works" />
        <meta property="twitter:description" content="CAPS-aligned AI tutoring platform, white-labelled for your school. Deployed in 14 days." />
        <meta property="twitter:url" content="https://studybuddy.works/schools" />
        <link rel="canonical" href="https://studybuddy.works/schools" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
            { "@type": "ListItem", position: 2, name: "Schools", item: "https://studybuddy.works/schools" },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: schoolsConfig.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        })}</script>
      </Helmet>
      <main className="min-h-screen">
      <HeaderSchools />
      <HeroSchools />
      <WhatsIncluded />
      <RevenueCalculator />

      {/* Further Resources */}
      <section className="py-12 bg-gradient-to-br from-amber-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Supporting Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <BookOpen className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Student Experience</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See exactly what students experience when using the AI tutoring platform.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/students">View Student Portal</Link>
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <FileText className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Learning Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our CAPS-aligned subject guides, past papers, and study materials.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/resources">Browse Resources</Link>
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <MapPin className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Locations Served</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See the towns and provinces where StudyBuddy is already supporting students.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/locations">View Locations</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        items={schoolsConfig.faq}
        title="Frequently Asked Questions"
        description="Everything school leaders need to know about bringing StudyBuddy to your school."
        schema={false}
      />

      <Footer />
      </main>
    </>
  );
};

export default SchoolsLanding;
