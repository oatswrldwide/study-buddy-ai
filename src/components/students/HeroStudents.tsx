import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Smartphone, Clock, BookOpen, MessageSquare, Send, Sparkles, Shield } from "lucide-react";
import { studentsConfig } from "@/config/students";

const HeroStudents = () => {
  const { hero } = studentsConfig;

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Elements - Warmer colors for students */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 animate-fade-in-up">
            <Star className="w-4 h-4 fill-accent" />
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
              {hero.ctaSecondary}
            </Button>
          </div>

          {/* Feature Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">All Subjects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">24/7 Help</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-md border border-border">
              <Smartphone className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">R99/month</span>
            </div>
          </div>
        </div>

        {/* Hero Image - Student focused */}
        <div
          className="mt-16 max-w-5xl mx-auto animate-scale-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
            {/* AI Tutor Chat Interface Mockup */}
            <div className="bg-gradient-to-br from-orange-50 to-purple-50 p-8">
              {/* Chat Header */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">StudyBuddy AI</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Online • Ready to help</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Mathematics</div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">Grade 11</div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                {/* Student Message */}
                <div className="flex justify-end">
                  <div className="max-w-md bg-blue-500 text-white rounded-2xl rounded-tr-sm p-4 shadow-md">
                    <p className="text-sm">Hi! Can you help me solve this quadratic equation: x² + 5x + 6 = 0?</p>
                    <p className="text-xs text-blue-100 mt-2">10:23 AM</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="max-w-md bg-white rounded-2xl rounded-tl-sm p-4 shadow-md">
                    <p className="text-sm text-slate-800 mb-3">Great question! Let's solve this step by step using factoring. First, let's identify what we need:</p>
                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-mono text-slate-700">x² + 5x + 6 = 0</p>
                      <p className="text-xs text-slate-600 mt-2">We need two numbers that multiply to 6 and add to 5</p>
                    </div>
                    <p className="text-sm text-slate-800">Can you think of two numbers that meet these conditions? 🤔</p>
                    <p className="text-xs text-slate-500 mt-2">10:24 AM</p>
                  </div>
                </div>

                {/* Student Response */}
                <div className="flex justify-end">
                  <div className="max-w-md bg-blue-500 text-white rounded-2xl rounded-tr-sm p-4 shadow-md">
                    <p className="text-sm">Is it 2 and 3? They multiply to 6 and add to 5!</p>
                    <p className="text-xs text-blue-100 mt-2">10:25 AM</p>
                  </div>
                </div>

                {/* AI Confirmation */}
                <div className="flex justify-start">
                  <div className="max-w-md bg-white rounded-2xl rounded-tl-sm p-4 shadow-md">
                    <p className="text-sm text-slate-800 mb-2">Excellent! 🎉 You got it! Now we can factor:</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                      <p className="text-sm font-mono text-slate-700">(x + 2)(x + 3) = 0</p>
                    </div>
                    <p className="text-sm text-slate-800">This means x = -2 or x = -3. Want to verify by substituting these values?</p>
                    <p className="text-xs text-slate-500 mt-2">10:25 AM</p>
                  </div>
                </div>
              </div>

              {/* Input Box */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Ask anything about your homework..."
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400"
                    disabled
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-purple-500 text-white rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow">
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Your conversations are private and secure
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Below Image */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span>4.9/5 rating</span>
            </div>
            <div>•</div>
            <div>12,000+ students</div>
            <div>•</div>
            <div>Free for 7 days</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStudents;
