import { studentsConfig } from "@/config/students";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

const FeaturesStudents = () => {
  const { features, additionalFeatures, subjects } = studentsConfig;
  const navigate = useNavigate();

  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Ace Your Exams</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            24/7 AI tutor for all your subjects.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = LucideIcons[feature.icon as keyof typeof LucideIcons] as LucideIcon;
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
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Subjects Section */}
        <div className="mb-16 p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-2xl font-bold text-foreground text-center mb-6">
            All Your Subjects Covered
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {subjects.map((subject, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {subject}
              </Badge>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            Full CAPS & IEB curriculum coverage.
          </p>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = LucideIcons[feature.icon as keyof typeof LucideIcons] as LucideIcon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  {Icon && <Icon className="w-6 h-6 text-accent" />}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cross-promotion Links */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Explore more resources to help you succeed
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/resources")}>
              📖 Free Study Guides
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/locations")}>
              📍 Find Tutors Near You
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesStudents;
