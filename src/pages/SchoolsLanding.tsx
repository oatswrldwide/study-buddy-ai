import HeaderSchools from "@/components/HeaderSchools";
import Footer from "@/components/Footer";
import HeroSchools from "@/components/schools/HeroSchools";
import WhatsIncluded from "@/components/schools/WhatsIncluded";
import RevenueCalculator from "@/components/schools/RevenueCalculator";

const SchoolsLanding = () => {
  return (
    <main className="min-h-screen">
      <HeaderSchools />
      <HeroSchools />
      <WhatsIncluded />
      <RevenueCalculator />
      <Footer />
    </main>
  );
};

export default SchoolsLanding;
