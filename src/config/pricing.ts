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

// White-Label Reseller Model for Schools
export interface ResellerPricing {
  id: string;
  name: string;
  wholesaleCost: number;
  recommendedPrice: {
    min: number;
    suggested: number;
    max: number;
  };
  minimumStudents: number;
  description: string;
  features: string[];
  billingTerms: string[];
}

export const schoolsResellerPricing: ResellerPricing = {
  id: "white-label-reseller",
  name: "White-Label Reseller Program",
  wholesaleCost: 150, // R150 per student per year
  recommendedPrice: {
    min: 200,
    suggested: 250,
    max: 300,
  },
  minimumStudents: 100,
  description: "Your school's own branded AI tutoring platform - charge students R200+ and keep the profit",
  features: [
    "Custom domain (yourschool.co.za)",
    "Complete platform branding (logo, colors)",
    "Branded student login page",
    "Personalized AI tutor per student",
    "School admin dashboard",
    "Student tech support (handled by us)",
    "Usage analytics & reporting",
    "Live within 14 days",
    "CAPS/IEB curriculum aligned",
    "POPIA compliant & secure",
  ],
  billingTerms: [
    "Billed annually based on student count at enrollment",
    "Schools collect payments directly from students",
    "Platform cost: R150 per enrolled student per year",
    "No upfront costs or setup fees",
    "Annual commitment per student enrolled",
    "Can add students mid-year (prorated billing)",
  ],
};

// Legacy pricing tiers (kept for backwards compatibility)
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
    description: "Try StudyBuddy with daily free questions",
    features: [
      "5 questions per day",
      "All subjects available",
      "AI-powered tutoring",
      "Resets daily at midnight",
      "No credit card required",
    ],
    ctaText: "Start Free",
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium Annual",
    price: "R200",
    period: "year",
    description: "Unlimited learning for an entire year - Special Launch Offer!",
    features: [
      "Unlimited AI questions",
      "All subjects (Grades 8-12)",
      "24/7 homework help",
      "Exam preparation",
      "Study guides & resources",
      "Progress tracking",
      "No daily limits",
      "Valid for 365 days",
    ],
    ctaText: "Upgrade Now",
    highlighted: true,
    badge: "🎉 Special Offer",
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
