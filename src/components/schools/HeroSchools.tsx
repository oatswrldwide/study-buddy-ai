import { Shield, BookOpen, TrendingUp, Award, Clock, Lock } from "lucide-react";
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
              <span>Purpose-Built for South African Schools</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Equip Every Student with a Personal AI Tutor — Under Your School's Brand
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              A fully managed, CAPS-aligned AI tutoring platform, white-labelled for your school. Deployed in 14 days. POPIA compliant. Proven to improve student outcomes.
            </p>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Improved Student Outcomes</h3>
                  <p className="text-sm text-muted-foreground">Average 35% improvement in pass rates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fully White-Labelled</h3>
                  <p className="text-sm text-muted-foreground">Your domain, logo & brand identity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Live in 14 Days</h3>
                  <p className="text-sm text-muted-foreground">Fully managed deployment & onboarding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">POPIA Compliant</h3>
                  <p className="text-sm text-muted-foreground">Student data fully protected & secure</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>CAPS & IEB aligned</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Academic integrity built-in</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>R150/student/year</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl border border-border p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Request a Demo
                </h2>
                <p className="text-muted-foreground mb-4">
                  See the platform in action. We'll respond within 24 hours to schedule a personalised walkthrough for your leadership team.
                </p>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-4">
                  <p className="text-sm text-foreground font-medium mb-2">What to expect:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>✓ Live platform demo tailored to your school</li>
                    <li>✓ Curriculum alignment & compliance overview</li>
                    <li>✓ Custom branding & deployment timeline</li>
                  </ul>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• No commitment required</p>
                  <p>• Available for principals, HODs & governing bodies</p>
                  <p>• Minimum 100 students to launch</p>
                </div>
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

