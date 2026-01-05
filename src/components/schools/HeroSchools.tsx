import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Play, Shield, BarChart3, TrendingUp, Users, Activity, AlertCircle } from "lucide-react";
import { schoolsConfig } from "@/config/schools";
import SchoolLeadForm from "@/components/forms/SchoolLeadForm";

const HeroSchools = () => {
  const { hero } = schoolsConfig;
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Table Mountain Silhouette Background - Subtle SA Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-[0.03]">
        <svg viewBox="0 0 1200 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 L0,40 L200,35 L400,45 L500,25 L600,25 L700,25 L800,45 L1000,35 L1200,40 L1200,100 Z" 
                fill="currentColor" className="text-primary"/>
        </svg>
      </div>
      
      {/* Subtle warm sand gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-white to-white" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-medium mb-6 border border-primary/10">
              <Shield className="w-4 h-4" />
              <span>{hero.badge}</span>
            </div>

            {/* Main Heading - Reduced size and weight */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
              {hero.headline}
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-8">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-dark text-white shadow-sm"
                onClick={() => setShowForm(true)}
              >
                {hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-border hover:bg-muted/50">
                <Play className="w-4 h-4 mr-1" />
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills - More subtle */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Admin Dashboard</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-sm text-foreground">Teacher Insights</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground">POPIA Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-border/50 bg-white">
              {/* Admin Dashboard Mockup - Simplified flat design */}
              <div className="bg-slate-50 p-6">
                {/* Dashboard Header */}
                <div className="bg-white rounded-lg border border-border/50 p-5 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Hoërskool Stellenbosch</h3>
                    <div className="flex gap-2">
                      <div className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium border border-green-200">Live</div>
                    </div>
                  </div>
                  
                  {/* Stats Grid - Flat design */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary/80 font-medium">Active Learners</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">847</div>
                      <div className="text-xs text-primary/70 mt-0.5">↑ 12% this week</div>
                    </div>
                    
                    <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/10">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Activity className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-secondary/80 font-medium">AI Usage</span>
                      </div>
                      <div className="text-2xl font-bold text-secondary">2.4K</div>
                      <div className="text-xs text-secondary/70 mt-0.5">Questions today</div>
                    </div>
                    
                    <div className="bg-accent/5 p-3 rounded-lg border border-accent/10">
                      <div className="flex items-center gap-1.5 mb-1">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-xs text-accent/80 font-medium">Performance</span>
                      </div>
                      <div className="text-2xl font-bold text-accent">+23%</div>
                      <div className="text-xs text-accent/70 mt-0.5">Avg improvement</div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Shield className="w-4 h-4 text-green-700" />
                        <span className="text-xs text-green-700 font-medium">Compliance</span>
                      </div>
                      <div className="text-2xl font-bold text-green-800">100%</div>
                      <div className="text-xs text-green-700 mt-0.5">POPIA compliant</div>
                    </div>
                  </div>
                </div>

                {/* Charts Section - Simplified */}
                <div className="bg-white rounded-lg border border-border/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-slate-800">Subject Usage Today</h4>
                    <BarChart3 className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-600">Mathematics</span>
                        <span className="font-medium text-slate-800">834</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-600">Physical Sciences</span>
                        <span className="font-medium text-slate-800">612</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-600">English FAL</span>
                        <span className="font-medium text-slate-800">428</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Protea pattern decoration - Subtle SA element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.05]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent"/>
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent"/>
                <circle cx="50" cy="50" r="10" fill="currentColor" className="text-accent"/>
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <line
                    key={angle}
                    x1="50"
                    y1="50"
                    x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                    y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Lead Form Dialog */}
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Request a Demo</DialogTitle>
        </DialogHeader>
        <SchoolLeadForm 
          onSuccess={() => setShowForm(false)} 
          onClose={() => setShowForm(false)}
        />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default HeroSchools;
