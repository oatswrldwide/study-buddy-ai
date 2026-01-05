import { schoolsConfig } from "@/config/schools";
import * as LucideIcons from "lucide-react";

const FeaturesSchools = () => {
  const { features, additionalFeatures } = schoolsConfig;

  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Complete Control,{" "}
            <span className="text-gradient">Complete Visibility</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything your school needs to embrace AI responsibly while improving learning outcomes.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = LucideIcons[feature.icon as keyof typeof LucideIcons] as any;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    feature.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : feature.color === "secondary"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {Icon && <Icon className="w-7 h-7" />}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = LucideIcons[feature.icon as keyof typeof LucideIcons] as any;
            return (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSchools;
