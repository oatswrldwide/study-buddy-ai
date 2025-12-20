import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Quick Setup",
    description: "Connect your school's SSO or upload a roster. Students and teachers are provisioned automatically.",
    color: "primary",
  },
  {
    number: "02",
    title: "Set AI Policies",
    description: "Define how AI should behave for different subjects, grade levels, and assignment types.",
    color: "secondary",
  },
  {
    number: "03",
    title: "Students Learn with AI",
    description: "Students access a guided AI tutor that helps them understand concepts without giving away answers.",
    color: "accent",
  },
  {
    number: "04",
    title: "Gain Insights",
    description: "Teachers and admins see exactly how AI is being used and its impact on learning outcomes.",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From Setup to Insights in{" "}
            <span className="text-gradient">Minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complex integrations. No lengthy training. Just powerful AI tools designed for education.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex gap-6 group"
              >
                {/* Number */}
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-300 group-hover:scale-110 ${
                    step.color === "primary"
                      ? "bg-primary text-primary-foreground"
                      : step.color === "secondary"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (except last item) */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-6 top-6 w-5 h-5 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to transform how your school uses AI?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            Schedule a Demo
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
