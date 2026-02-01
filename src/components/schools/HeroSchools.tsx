import { Shield, Users, BookOpen, TrendingUp } from "lucide-react";
import SchoolContactForm from "@/components/schools/SchoolContactForm";

const HeroSchools = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-white">
      {/* Table Mountain Silhouette Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 L0,40 L200,35 L400,45 L500,25 L600,25 L700,25 L800,45 L1000,35 L1200,40 L1200,100 Z" 
                fill="currentColor" className="text-primary"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-medium mb-6 border border-primary/10">
              <Shield className="w-4 h-4" />
              <span>For South African Schools</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Empower Your Learners with AI
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Give your school access to StudyBuddy AI - an intelligent tutoring platform that helps learners excel in their studies with 24/7 AI-powered support.
            </p>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Unlimited Students</h3>
                  <p className="text-sm text-muted-foreground">School-wide access for all learners</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">All Subjects</h3>
                  <p className="text-sm text-muted-foreground">Maths, Science, Languages & more</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">Admin dashboard with insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">POPIA Compliant</h3>
                  <p className="text-sm text-muted-foreground">Secure & privacy-focused</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl border border-border p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Get StudyBuddy for Your School
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours with pricing and implementation details.
                </p>
              </div>
              
              <SchoolContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSchools;

