import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Star, Smartphone, Clock, BookOpen, MessageSquare, Send, Sparkles, Shield } from "lucide-react";
import { studentsConfig } from "@/config/students";
import StudentSignupForm from "@/components/forms/StudentSignupForm";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

const HeroStudents = () => {
  const { hero } = studentsConfig;
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Protea pattern background - SA National Flower */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] opacity-15">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx="100"
              cy="100"
              rx="80"
              ry="30"
              fill="currentColor"
              className="text-accent"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="20" fill="currentColor" className="text-accent"/>
        </svg>
      </div>
      
      {/* Warm gradient - less intense */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/40 via-white to-white" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Chat Interface */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-border/50 bg-white">
              {/* AI Tutor Chat Interface - Simplified */}
              <div className="bg-slate-50 p-5">
                {/* Chat Header */}
                <div className="bg-white rounded-lg border border-border/50 p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">StudyBuddy AI</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium border border-accent/20">Maths</div>
                      <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium border border-primary/20">Gr 11</div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages - SA student names */}
                <div className="space-y-3 mb-4">
                  {/* Student Message - Thabo */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-primary text-white rounded-lg rounded-tr-sm p-3 shadow-sm">
                      <p className="text-sm leading-relaxed">Can you help me solve x² + 5x + 6 = 0?</p>
                      <p className="text-xs text-primary-foreground/70 mt-1.5">14:23</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white border border-border/50 rounded-lg rounded-tl-sm p-3 shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed mb-2">Let's factor this! We need two numbers that multiply to 6 and add to 5.</p>
                      <div className="bg-slate-50 border border-border/50 rounded p-2 my-2">
                        <p className="text-xs font-mono text-slate-700">x² + 5x + 6 = 0</p>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">Can you find those numbers? 🤔</p>
                      <p className="text-xs text-slate-500 mt-1.5">14:24</p>
                    </div>
                  </div>

                  {/* Student Response */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-primary text-white rounded-lg rounded-tr-sm p-3 shadow-sm">
                      <p className="text-sm leading-relaxed">2 and 3!</p>
                      <p className="text-xs text-primary-foreground/70 mt-1.5">14:25</p>
                    </div>
                  </div>

                  {/* AI Confirmation */}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white border border-border/50 rounded-lg rounded-tl-sm p-3 shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed mb-2">Perfect! 🎉</p>
                      <div className="bg-green-50 border border-green-200 rounded p-2 mb-2">
                        <p className="text-xs font-mono text-green-800">(x + 2)(x + 3) = 0</p>
                        <p className="text-xs text-green-700 mt-1">x = -2 or x = -3</p>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">Well done, Thabo!</p>
                      <p className="text-xs text-slate-500 mt-1.5">14:25</p>
                    </div>
                  </div>
                </div>

                {/* Input Box */}
                <div className="bg-white border border-border/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      className="flex-1 px-3 py-2 bg-slate-50 border border-border/50 rounded text-sm text-slate-800 placeholder-slate-400"
                      disabled
                    />
                    <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded font-medium flex items-center gap-1.5 text-sm">
                      <Send className="w-3.5 h-3.5" />
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" />
                    Private & secure
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Content */}
          <div className="text-left order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/5 text-accent text-sm font-medium mb-6 border border-accent/10">
              <Star className="w-4 h-4 fill-accent" />
              <span>{hero.badge}</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
              {hero.headline}
            </h1>

            {/* Subheading - Simplified */}
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              {hero.subheadline}
            </p>

            {/* CTA Buttons - Separate Sign Up and Sign In */}
            <div className="space-y-4 mb-8">
              {/* Sign Up - Primary CTA with pricing */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GoogleSignInButton 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                    createStudentProfile={true}
                  />
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg px-4 py-2">
                    <div className="text-sm font-bold text-green-700">R200/year</div>
                    <div className="text-xs text-green-600">Special Offer</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pl-1">
                  New user? Sign up above • 5 free questions daily or upgrade to unlimited
                </p>
              </div>

              {/* Sign In - Secondary for existing users */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  Already have an account?
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/login'}
                  className="w-full sm:w-auto"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>

            {/* Quick Stats - Updated pricing */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span>12,000+ students</span>
              </div>
              <span>•</span>
              <div className="text-purple-600 font-bold">R200/year</div>
              <span>•</span>
              <div>All subjects</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Signup Form Dialog */}
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Your Account</DialogTitle>
        </DialogHeader>
        <StudentSignupForm 
          onSuccess={() => setShowForm(false)} 
          onClose={() => setShowForm(false)}
        />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default HeroStudents;
