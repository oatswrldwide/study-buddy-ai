import { BarChart3, Shield, MessageSquare, Users, TrendingUp, Lock, Zap, BookOpen } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "School Admin Dashboard",
    description: "Complete visibility over AI usage across your institution. Monitor, analyze, and set policies for responsible AI adoption.",
    color: "primary",
    highlights: ["Usage analytics", "Policy controls", "Institution-wide reports"],
  },
  {
    icon: TrendingUp,
    title: "Teacher Insights",
    description: "Understand how students learn with AI. Get actionable data on learning patterns, common struggles, and classroom performance.",
    color: "secondary",
    highlights: ["Learning analytics", "Progress tracking", "Performance insights"],
  },
  {
    icon: MessageSquare,
    title: "Student AI Tutor",
    description: "A ChatGPT-like experience designed for learning. Guides students to answers through explanation, not by doing homework for them.",
    color: "accent",
    highlights: ["Guided learning", "Socratic method", "Subject support"],
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Safe & Compliant",
    description: "FERPA, COPPA, and GDPR compliant. Built with student privacy as the foundation.",
  },
  {
    icon: Lock,
    title: "Academic Integrity",
    description: "AI that teaches, not cheats. Designed to maintain academic honesty while supporting learning.",
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Tailored experiences for administrators, teachers, students, and parents.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Get started in minutes with easy SSO integration and user provisioning.",
  },
  {
    icon: BookOpen,
    title: "Curriculum Aligned",
    description: "AI responses aligned with your curriculum standards and learning objectives.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            One Platform,{" "}
            <span className="text-gradient">Three Perspectives</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for the entire school ecosystem. Every stakeholder gets the tools they need to succeed with AI in education.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
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
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {feature.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {feature.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        feature.color === "primary"
                          ? "bg-primary"
                          : feature.color === "secondary"
                          ? "bg-secondary"
                          : "bg-accent"
                      }`}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Hover Gradient */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  feature.color === "primary"
                    ? "bg-gradient-to-br from-primary/5 to-transparent"
                    : feature.color === "secondary"
                    ? "bg-gradient-to-br from-secondary/5 to-transparent"
                    : "bg-gradient-to-br from-accent/5 to-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors duration-300"
            >
              <feature.icon className="w-6 h-6 text-primary mb-4" />
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
