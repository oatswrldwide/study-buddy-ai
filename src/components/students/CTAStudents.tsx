import { CheckCircle } from "lucide-react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
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

          {/* CTA Buttons - Differentiated */}
          <div className="flex flex-col items-center justify-center gap-6 mb-10">
            {/* Sign Up - New Users */}
            <div className="text-center">
              <GoogleSignInButton 
                variant="default" 
                size="xl" 
                className="shadow-glow bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                createStudentProfile={true}
              />
              <p className="text-sm text-muted-foreground mt-2">
                New student? Sign up and get 5 free questions daily
              </p>
            </div>
            
            {/* Sign In - Existing Users */}
            <div className="text-center">
              <button
                onClick={() => window.location.href = '/login'}
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-all"
              >
                Already a Student? Sign In
              </button>
              <p className="text-sm text-muted-foreground mt-2">
                Continue your learning journey
              </p>
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
