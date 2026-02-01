import { CheckCircle, ArrowRight, Shield } from "lucide-react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { studentsConfig } from "@/config/students";

const CTAStudents = () => {
  const { cta } = studentsConfig;

  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {cta.headline}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {cta.subheadline}
          </p>

          {/* CTA Buttons - Clear Sign Up vs Sign In */}
          <div className="mb-10">
            {/* Sign Up Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 mb-6 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
                    🎉 Special Launch Offer
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    R200<span className="text-lg">/year</span>
                  </div>
                  <div className="text-sm opacity-90">
                    Unlimited questions • All subjects • Full year access
                  </div>
                </div>
                <GoogleSignInButton 
                  variant="default" 
                  size="xl" 
                  className="bg-white hover:bg-white/90 text-purple-600 shadow-lg"
                  createStudentProfile={true}
                />
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-muted-foreground mb-3">
                Already have an account?
              </p>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/login'}
              >
                <Shield className="w-4 h-4 mr-2" />
                Sign In to Your Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {cta.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStudents;
