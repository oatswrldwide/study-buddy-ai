import HeaderSchools from "@/components/HeaderSchools";
import Footer from "@/components/Footer";
import HeroSchools from "@/components/schools/HeroSchools";
import WhatsIncluded from "@/components/schools/WhatsIncluded";
import RevenueCalculator from "@/components/schools/RevenueCalculator";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SchoolsLanding = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>AI Tutoring Platform for Schools | StudyBuddy Works - White Label Solution</title>
        <meta name="description" content="Launch your school's branded AI tutoring platform in 14 days. Custom domain, logo, and colors. Charge R200+, pay R150 per student per year. Keep the profit. 100 student minimum." />
        <meta name="keywords" content="school AI platform, white label tutoring, branded AI tutor, school revenue, CAPS tutoring platform, South African schools" />
        <meta property="og:title" content="AI Tutoring Platform for Schools | StudyBuddy Works" />
        <meta property="og:description" content="Launch your school's branded AI tutoring platform. Custom domain, your logo, keep the profit. Live in 14 days." />
        <meta property="og:url" content="https://studybuddy.works/schools" />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content="AI Tutoring Platform for Schools | StudyBuddy Works" />
        <meta property="twitter:description" content="Launch your school's branded AI tutoring platform. Custom domain, your logo, keep the profit." />
        <meta property="twitter:url" content="https://studybuddy.works/schools" />
        <link rel="canonical" href="https://studybuddy.works/schools" />
      </Helmet>
      <main className="min-h-screen">
      <HeaderSchools />
      <HeroSchools />
      <WhatsIncluded />
      <RevenueCalculator />
      
      {/* Cross-Linking Section */}
      <section className="py-12 bg-gradient-to-br from-amber-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Explore More Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <BookOpen className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">For Students</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See how students use StudyBuddy for 24/7 homework help and exam prep.
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate("/students")} className="w-full">
                  View Student Portal
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <FileText className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Learning Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our comprehensive CAPS-aligned subject guides and study materials.
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate("/resources")} className="w-full">
                  Browse Resources
                </Button>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <MapPin className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Find Local Tutors</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover AI tutoring available in your town or suburb across South Africa.
                </p>
                <Button variant="outline" size="sm" onClick={() => navigate("/locations")} className="w-full">
                  Find Tutors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      </main>
    </>
  );
};

export default SchoolsLanding;
