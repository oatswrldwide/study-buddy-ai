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
import { School, MapPin, FileText, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const StudentsLanding = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>24/7 AI Tutor for Students | StudyBuddy Works - R99/Month CAPS-Aligned</title>
        <meta name="description" content="Get 24/7 AI tutoring for all subjects. CAPS-aligned homework help, exam prep, and personalized learning for R99/month. Try free for 7 days. Perfect for matric students across South Africa." />
        <meta name="keywords" content="AI tutor South Africa, CAPS tutoring, homework help, matric tutoring, exam preparation, online tutor, affordable tutoring, 24/7 study help" />
        <meta property="og:title" content="24/7 AI Tutor for Students | StudyBuddy Works" />
        <meta property="og:description" content="Get 24/7 AI tutoring for all subjects. CAPS-aligned, R99/month, 7-day free trial. Perfect for matric students." />
        <meta property="og:url" content="https://studybuddy.works/students" />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content="24/7 AI Tutor for Students | StudyBuddy Works" />
        <meta property="twitter:description" content="Get 24/7 AI tutoring for all subjects. CAPS-aligned, R99/month, 7-day free trial." />
        <meta property="twitter:url" content="https://studybuddy.works/students" />
        <link rel="canonical" href="https://studybuddy.works/students" />
      </Helmet>
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

      {/* Popular Resources Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Get Help Fast
              </h2>
              <p className="text-muted-foreground">
                Struggling with a specific subject? These guides can help you right now.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/pain-failing-mathematics-grade-12-need-help-fast"
                className="bg-background p-6 border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group"
              >
                <TrendingUp className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Failing Maths Grade 12?</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant help 24/7. Turn your grades around fast with step-by-step explanations.
                </p>
              </Link>
              <Link
                to="/pain-failing-physical-sciences-grade-12-need-help-fast"
                className="bg-background p-6 border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group"
              >
                <BookOpen className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Struggling with Physical Sciences?</h3>
                <p className="text-sm text-muted-foreground">
                  Master chemistry and physics with our CAPS-aligned AI tutor.
                </p>
              </Link>
              <Link
                to="/pain-failing-accounting-grade-10-need-help-fast"
                className="bg-background p-6 border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group"
              >
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Accounting Giving You Trouble?</h3>
                <p className="text-sm text-muted-foreground">
                  Get step-by-step help with financial statements, ledgers, and more.
                </p>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/resources">View All Study Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion 
        items={studentsConfig.faq}
        title="Frequently Asked Questions"
        description="Got questions? We've got answers!"
      />
      <Footer />
      </main>
    </>
  );
};

export default StudentsLanding;
