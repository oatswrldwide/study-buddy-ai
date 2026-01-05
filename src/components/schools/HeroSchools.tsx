import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, BarChart3, TrendingUp, Users, Activity, AlertCircle } from "lucide-react";
import { schoolsConfig } from "@/config/schools";

const HeroSchools = () => {
  const { hero } = schoolsConfig;

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in-up">
            <Shield className="w-4 h-4" />
            <span>{hero.badge}</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {hero.headline}
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl">
              {hero.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">Teacher Insights</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">POPIA Compliant</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div
          className="mt-16 max-w-5xl mx-auto animate-scale-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
            {/* Admin Dashboard Mockup */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8">
              {/* Dashboard Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-800">School Overview Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Live</div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Real-time</div>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">Active Students</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">847</div>
                    <div className="text-xs text-blue-600 mt-1">↑ 12% this week</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">AI Usage</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900">2.4K</div>
                    <div className="text-xs text-green-600 mt-1">Questions today</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-600 font-medium">Performance</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">+23%</div>
                    <div className="text-xs text-purple-600 mt-1">Avg. improvement</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-orange-600 font-medium">Compliance</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-900">100%</div>
                    <div className="text-xs text-orange-600 mt-1">All policies met</div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-800">AI Usage by Subject</h4>
                    <BarChart3 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Mathematics</span>
                        <span className="font-medium text-slate-800">834 questions</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Science</span>
                        <span className="font-medium text-slate-800">612 questions</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">English</span>
                        <span className="font-medium text-slate-800">428 questions</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-800">Recent Alerts</h4>
                    <AlertCircle className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">All students engaged</p>
                        <p className="text-xs text-slate-600">Grade 11B showing excellent progress</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">Policy update complete</p>
                        <p className="text-xs text-slate-600">POPIA compliance verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSchools;
