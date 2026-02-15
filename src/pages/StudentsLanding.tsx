import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroStudents from "@/components/students/HeroStudents";
import FeaturesStudents from "@/components/students/FeaturesStudents";
import PricingStudents from "@/components/students/PricingStudents";
import TestimonialsStudents from "@/components/students/TestimonialsStudents";
import CTAStudents from "@/components/students/CTAStudents";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { studentsConfig } from "@/config/students";
import { Button } from "@/components/ui/button";
import { School, MapPin, FileText, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentsLanding = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen">
      <Header />
      <HeroStudents />
      <FeaturesStudents />
      
      {/* Quick Links Section */}
      <section id="exam-papers" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground">
              Access comprehensive study resources, find local tutoring, and connect with your school
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20 hover:shadow-lg transition-shadow">
              <FileText className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Subject Guides</h3>
              <p className="text-sm text-muted-foreground mb-4">
                CAPS-aligned guides for all major subjects and grades.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/resources")} className="w-full">
                Browse Guides
              </Button>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 rounded-lg border border-accent/20 hover:shadow-lg transition-shadow">
              <BookOpen className="w-10 h-10 text-accent mb-3" />
              <h3 className="font-bold text-lg mb-2">Exam Papers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Past papers and memos for effective exam preparation.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/resources")} className="w-full">
                View Papers
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20 hover:shadow-lg transition-shadow">
              <MapPin className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Local Tutors</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Find AI tutoring in your town or suburb.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/locations")} className="w-full">
                Find Tutors
              </Button>
            </div>
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 rounded-lg border border-accent/20 hover:shadow-lg transition-shadow">
              <School className="w-10 h-10 text-accent mb-3" />
              <h3 className="font-bold text-lg mb-2">For Schools</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Does your school want a branded platform?
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/schools")} className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
