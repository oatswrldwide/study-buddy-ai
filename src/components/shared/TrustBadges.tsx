import { Shield, Lock, Award, CheckCircle2 } from "lucide-react";

interface TrustBadgesProps {
  variant?: "schools" | "students";
}

const TrustBadges = ({ variant = "schools" }: TrustBadgesProps) => {
  const schoolsBadges = [
    {
      icon: Shield,
      text: "POPIA Compliant",
      color: "text-primary",
    },
    {
      icon: Lock,
      text: "Secure & Encrypted",
      color: "text-secondary",
    },
    {
      icon: Award,
      text: "ISO 27001 Certified",
      color: "text-accent",
    },
    {
      icon: CheckCircle2,
      text: "CAPS & IEB Aligned",
      color: "text-primary",
    },
  ];

  const studentsBadges = [
    {
      icon: Shield,
      text: "Safe & Secure",
      color: "text-primary",
    },
    {
      icon: Lock,
      text: "Privacy Protected",
      color: "text-secondary",
    },
    {
      icon: Award,
      text: "Trusted by 12K+ Students",
      color: "text-accent",
    },
    {
      icon: CheckCircle2,
      text: "Money-Back Guarantee",
      color: "text-secondary",
    },
  ];

  const badges = variant === "schools" ? schoolsBadges : studentsBadges;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
        >
          <badge.icon className={`w-5 h-5 ${badge.color}`} />
          <span className="text-sm font-medium text-foreground">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
