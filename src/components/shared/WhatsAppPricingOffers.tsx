import { MessageCircle, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "27680187300";

const makeWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const BURSARY_10_URL = makeWhatsAppUrl(
  "Hi! I'd like to get the R600 package — assistance with 10 bursary applications."
);
const BURSARY_30_URL = makeWhatsAppUrl(
  "Hi! I'd like to get the R1500 package — assistance with 30 bursary applications."
);
const SCHOOL_APP_URL = makeWhatsAppUrl(
  "Hi! I'd like to get the R600 package — assistance with unlimited school applications."
);

type Variant = "bursary" | "school";

interface WhatsAppPricingOffersProps {
  variant?: Variant;
  heading?: string;
}

const BURSARY_TIERS = [
  {
    name: "Starter",
    price: "R600",
    applications: "10 Bursary Applications",
    features: [
      "Assistance with up to 10 bursary applications",
      "Document checklist & review",
      "Personal 1-on-1 WhatsApp guidance",
      "Application deadline reminders",
    ],
    url: BURSARY_10_URL,
    highlighted: false,
    badge: null,
  },
  {
    name: "Full Package",
    price: "R1 500",
    applications: "30 Bursary Applications",
    features: [
      "Assistance with up to 30 bursary applications",
      "Document checklist & review",
      "Personal 1-on-1 WhatsApp guidance",
      "Application deadline reminders",
      "Bursary shortlisting for your field",
    ],
    url: BURSARY_30_URL,
    highlighted: true,
    badge: "Best Value",
  },
];

const SCHOOL_TIER = {
  name: "School Application Assistance",
  price: "R600",
  applications: "Unlimited Schools",
  note: "Assistance only — application fees paid separately to each school",
  features: [
    "Unlimited school application assistance",
    "Guidance on all required documents",
    "Personal 1-on-1 WhatsApp support",
    "Application deadline tracking",
    "Application fee NOT included (paid directly to schools)",
  ],
  url: SCHOOL_APP_URL,
};

const WhatsAppPricingOffers = ({
  variant = "bursary",
  heading,
}: WhatsAppPricingOffersProps) => {
  if (variant === "school") {
    const tier = SCHOOL_TIER;
    const title = heading ?? "School Application Assistance — R600";
    return (
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Assistance
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground mt-2">
              Get personal assistance with your school applications via WhatsApp
            </p>
          </div>

          <div className="max-w-md mx-auto rounded-2xl border-2 border-green-500 bg-white shadow-lg overflow-hidden">
            <div className="bg-green-600 px-6 py-4 text-white text-center">
              <p className="text-sm font-medium opacity-90">{tier.applications}</p>
              <p className="text-4xl font-extrabold mt-1">{tier.price}</p>
              <p className="text-xs opacity-75 mt-1">{tier.note}</p>
            </div>
            <div className="p-6">
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold gap-2"
              >
                <a href={tier.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp to Get Started
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                068 018 7300
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Bursary variant
  const title = heading ?? "Bursary Application Assistance Packages";
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Assistance
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-2">
            Get personal 1-on-1 help with your bursary applications via WhatsApp
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {BURSARY_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border-2 bg-white shadow-md overflow-hidden ${
                tier.highlighted ? "border-green-500" : "border-gray-200"
              }`}
            >
              {tier.badge && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                    {tier.badge}
                  </span>
                </div>
              )}
              <div
                className={`px-6 py-4 text-center ${
                  tier.highlighted
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-foreground"
                }`}
              >
                <p className="text-sm font-semibold">{tier.name}</p>
                <p className="text-4xl font-extrabold mt-1">{tier.price}</p>
                <p
                  className={`text-xs mt-1 ${
                    tier.highlighted ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {tier.applications}
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className={`w-full font-bold gap-2 ${
                    tier.highlighted
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-2 border-green-600 text-green-700 bg-white hover:bg-green-50"
                  }`}
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  <a href={tier.url} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp to Get Started
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Contact us on WhatsApp: <span className="font-semibold text-foreground">068 018 7300</span>
        </p>
      </div>
    </section>
  );
};

export default WhatsAppPricingOffers;
