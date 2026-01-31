import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroStudents from "@/components/students/HeroStudents";
import FeaturesStudents from "@/components/students/FeaturesStudents";
import PricingStudents from "@/components/students/PricingStudents";
import TestimonialsStudents from "@/components/students/TestimonialsStudents";
import CTAStudents from "@/components/students/CTAStudents";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { studentsConfig } from "@/config/students";

const StudentsLanding = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroStudents />
      <FeaturesStudents />
      <PricingStudents />
      <TestimonialsStudents />
      <CTAStudents />
      <FAQAccordion 
        items={studentsConfig.faq}
        title="Frequently Asked Questions"
        description="Got questions? We've got answers!"
      />
      <Footer />
    </main>
  );
};

export default StudentsLanding;
