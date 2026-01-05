import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, School, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Welcome to{" "}
              <span className="text-gradient">StudyBuddy Works</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered learning platform designed for South African education. Choose your path:
            </p>
          </div>

          {/* Market Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Schools Card */}
            <div
              className="group relative p-8 rounded-2xl bg-card border-2 border-border hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => navigate("/schools")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <School className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  For Schools & Institutions
                </h2>
                <p className="text-muted-foreground mb-6">
                  Monitor AI usage, empower teachers with insights, and ensure academic integrity across your institution.
                </p>
                <ul className="space-y-2 mb-8 text-left w-full">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Admin Dashboard & Analytics</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Teacher Insights & Reports</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>POPIA Compliant & Secure</span>
                  </li>
                </ul>
                <Button variant="hero" size="lg" className="w-full group-hover:shadow-glow">
                  Explore for Schools
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  From R2,499/month • 14-day free trial
                </p>
              </div>
            </div>

            {/* Students Card */}
            <div
              className="group relative p-8 rounded-2xl bg-card border-2 border-border hover:border-accent shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => navigate("/students")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  For Students & Parents
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get 24/7 homework help, exam prep, and personalized tutoring for all subjects. Perfect for matric success!
                </p>
                <ul className="space-y-2 mb-8 text-left w-full">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>24/7 AI Tutor for All Subjects</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Homework Help & Exam Prep</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>CAPS & IEB Curriculum Aligned</span>
                  </li>
                </ul>
                <Button variant="hero" size="lg" className="w-full group-hover:shadow-glow-accent">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  From R99/month • 7-day free trial
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 50+ schools and 12,000+ students across South Africa
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <span className="text-sm text-muted-foreground">🔒 POPIA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <span className="text-sm text-muted-foreground">✓ CAPS & IEB Aligned</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                <span className="text-sm text-muted-foreground">⚡ 99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSelector;
