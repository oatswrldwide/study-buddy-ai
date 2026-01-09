import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StudentSignupForm from "@/components/forms/StudentSignupForm";
import { studentsConfig } from "@/config/students";

const CTAStudents = () => {
  const { cta } = studentsConfig;
  const [showForm, setShowForm] = useState(false);

  return (
    <>
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
            <Button variant="default" size="xl" className="shadow-glow bg-accent hover:bg-accent/90 text-white" onClick={() => setShowForm(true)}>
              {cta.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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

    {/* Student Signup Form Dialog */}
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start Learning Today</DialogTitle>
        </DialogHeader>
        <StudentSignupForm onSuccess={() => setShowForm(false)} />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default CTAStudents;
