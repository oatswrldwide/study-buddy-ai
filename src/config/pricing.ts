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
    name: "Free",
    price: "R0",
    period: "forever",
    description: "Get started with basic AI tutoring",
    features: [
      "20 AI questions per month",
      "Basic subjects (Maths, Science)",
      "Community support",
      "Study tips & resources",
    ],
    ctaText: "Start Free",
    highlighted: false,
  },
  {
    id: "student-plus",
    name: "Student Plus",
    price: "R99",
    period: "month",
    priceAnnual: "R79",
    description: "Everything you need to succeed in school",
    features: [
      "Unlimited AI questions",
      "All subjects available",
      "Homework help",
      "Exam preparation",
      "Study guides & resources",
      "Progress tracking",
      "Priority support",
      "No ads",
    ],
    ctaText: "Start Free Week",
    highlighted: true,
    badge: "Best Value",
    popular: true,
  },
  {
    id: "family",
    name: "Family Plan",
    price: "R199",
    period: "month",
    priceAnnual: "R159",
    description: "Perfect for families with multiple students",
    features: [
      "Everything in Student Plus",
      "Up to 3 students",
      "Parent dashboard",
      "Progress reports",
      "Family account management",
      "Priority support",
      "Share resources",
    ],
    ctaText: "Start Free Week",
    highlighted: false,
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
