import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSchools from "@/components/schools/HeroSchools";
import FeaturesSchools from "@/components/schools/FeaturesSchools";
import PricingSchools from "@/components/schools/PricingSchools";
import StatsSchools from "@/components/schools/StatsSchools";
import TestimonialsSchools from "@/components/schools/TestimonialsSchools";
import CTASchools from "@/components/schools/CTASchools";
import TrustBadges from "@/components/shared/TrustBadges";

const SchoolsLanding = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSchools />
      <FeaturesSchools />
      <PricingSchools />
      <StatsSchools />
      <TestimonialsSchools />
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <TrustBadges variant="schools" />
        </div>
      </div>
      <CTASchools />
      <Footer />
    </main>
  );
};

export default SchoolsLanding;
