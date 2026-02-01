// South African Rand (ZAR) pricing configuration

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  priceAnnual?: string;
  description: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
  badge?: string;
  popular?: boolean;
}

export const schoolsPricing: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R2,499",
    period: "month",
    priceAnnual: "R1,999",
    description: "Perfect for small schools starting their AI journey",
    features: [
      "Up to 250 students",
      "Basic admin dashboard",
      "Teacher insights (limited)",
      "Student AI tutor access",
      "Email support",
      "Usage analytics",
      "Policy controls",
    ],
    ctaText: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "R6,999",
    period: "month",
    priceAnnual: "R5,599",
    description: "Most popular choice for growing schools",
    features: [
      "Up to 1,000 students",
      "Full admin dashboard",
      "Advanced teacher insights",
      "Unlimited AI tutor access",
      "Custom AI policies",
      "SSO integration",
      "Priority support",
      "Curriculum alignment",
      "Parent dashboards",
    ],
    ctaText: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact Sales",
    period: "",
    description: "Unlimited scale for districts and large institutions",
    features: [
      "Unlimited students",
      "Everything in Professional",
      "Multi-school management",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee (99.9%)",
      "White-label options",
      "Custom training",
      "24/7 support",
    ],
    ctaText: "Contact Sales",
    highlighted: false,
  },
];

export const studentsPricing: PricingTier[] = [
  {
    id: "free",
    name: "Free Trial",
    price: "R0",
    period: "forever",
    description: "Try it out with limited daily questions",
    features: [
      "5 AI questions per day",
      "All subjects available",
      "Daily question reset",
      "Community support",
      "Study tips & resources",
    ],
    ctaText: "Try Free",
    highlighted: false,
  },
  {
    id: "annual-special",
    name: "Annual Premium",
    price: "R200",
    period: "year",
    description: "🎉 Special Launch Offer - Limited Time!",
    features: [
      "Unlimited AI questions",
      "All subjects (Maths, Science, etc.)",
      "24/7 access",
      "Homework help",
      "Exam preparation",
      "Progress tracking",
      "No ads",
      "Valid for full year",
    ],
    ctaText: "Get Started - R200/Year",
    highlighted: true,
    badge: "Special Offer",
    popular: true,
  },
];

// Currency formatting helper
export const formatZAR = (amount: number): string => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Annual savings calculator
export const calculateAnnualSavings = (monthlyPrice: number, annualPrice: number): string => {
  const monthlyCost = monthlyPrice * 12;
  const savings = monthlyCost - annualPrice * 12;
  const percentage = Math.round((savings / monthlyCost) * 100);
  return `Save ${percentage}%`;
};
