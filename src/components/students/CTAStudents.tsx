import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button variant="hero" size="xl" className="shadow-glow">
              {cta.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              {cta.ctaSecondary}
            </Button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {cta.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Trust Message */}
          <p className="text-sm text-muted-foreground">
            12,000+ students already improving their grades. Join them today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAStudents;
