import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Setup in under 10 minutes",
  "Cancel anytime",
];

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform{" "}
            <span className="text-gradient">Your School's AI Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join schools using StudyBuddy Works to embrace AI responsibly while improving learning outcomes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <GoogleSignInButton 
              variant="default" 
              size="xl" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            />
            <Button variant="outline" size="xl" onClick={() => navigate("/schools")}>
              Talk to Sales
            </Button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
