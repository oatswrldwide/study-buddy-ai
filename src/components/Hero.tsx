import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, BarChart3, MessageSquare } from "lucide-react";

const Hero = () => {
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
            <span>Trusted by 500+ Schools Worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            AI That Empowers Learning,{" "}
            <span className="text-gradient">Not Replaces It</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Give schools complete visibility over AI usage, teachers actionable insights on learning outcomes, and students an AI tutor that guides—not cheats.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">Teacher Insights</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <MessageSquare className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">Student AI Tutor</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-16 max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: "0.5s" }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            <div className="aspect-[16/9] bg-gradient-subtle flex items-center justify-center">
              <div className="w-full h-full p-6 lg:p-10">
                {/* Mock Dashboard */}
                <div className="w-full h-full rounded-xl bg-card border border-border shadow-lg overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="h-12 bg-muted border-b border-border flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-secondary/60" />
                    <div className="ml-4 h-6 w-48 bg-border rounded" />
                  </div>
                  {/* Dashboard Content */}
                  <div className="p-6 grid grid-cols-3 gap-4 h-[calc(100%-3rem)]">
                    <div className="col-span-2 space-y-4">
                      <div className="h-8 w-48 bg-muted rounded" />
                      <div className="h-32 bg-muted rounded-lg" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-primary/10 rounded-lg" />
                        <div className="h-24 bg-secondary/10 rounded-lg" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 w-32 bg-muted rounded" />
                      <div className="h-48 bg-accent/10 rounded-lg" />
                      <div className="h-20 bg-muted rounded-lg" />
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

export default Hero;
