import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, School, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-white to-white" />

      <div className="container mx-auto px-4 relative py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Welcome to <span className="text-primary">StudyBuddy</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered learning for South African education. Choose your path:
            </p>
          </div>

          {/* Market Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Schools Card */}
            <div
              className="group relative p-6 rounded-lg bg-white border border-border/50 hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => navigate("/schools")}
            >
              <div className="flex flex-col">
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <School className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  For Schools & Institutions
                </h2>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Monitor AI usage, empower teachers with insights, and ensure academic integrity.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Admin Dashboard & Analytics</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Teacher Insights & Reports</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>POPIA Compliant & Secure</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/schools");
                  }}
                >
                  Explore for Schools
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  From R2,499/month • 14-day trial
                </p>
              </div>
            </div>

            {/* Students Card */}
            <div
              className="group relative p-6 rounded-lg bg-white border border-border/50 hover:border-accent hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => navigate("/students")}
            >
              <div className="flex flex-col">
                <div className="w-14 h-14 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  For Students & Parents
                </h2>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Get 24/7 homework help, exam prep, and personalized tutoring. Perfect for matric!
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>24/7 AI Tutor for All Subjects</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Homework Help & Exam Prep</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/90">
                    <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Personalized Learning Path</span>
                  </li>
                </ul>
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/students");
                  }}
                >
                  Start Learning Today
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  From R99/month • 7-day trial
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by 50+ schools and 12,000+ learners across South Africa
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-xs text-foreground/90">🔒 POPIA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-xs text-foreground/90">✓ CAPS & IEB Aligned</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-xs text-foreground/90">⚡ 99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSelector;
