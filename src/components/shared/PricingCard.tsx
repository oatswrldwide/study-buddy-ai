import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { PricingTier } from "@/config/pricing";

interface PricingCardProps extends PricingTier {
  onCtaClick?: () => void;
  billingPeriod?: "monthly" | "annual";
}

const PricingCard = ({
  name,
  price,
  period,
  priceAnnual,
  description,
  features,
  ctaText,
  highlighted = false,
  badge,
  popular = false,
  onCtaClick,
  billingPeriod = "monthly",
}: PricingCardProps) => {
  const displayPrice = billingPeriod === "annual" && priceAnnual ? priceAnnual : price;
  const showPeriod = period && price !== "Contact Sales";

  return (
    <Card
      className={`relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
        highlighted
          ? "border-2 border-primary shadow-xl scale-105"
          : "border border-border shadow-md hover:shadow-xl"
      }`}
    >
      {/* Badge for popular/highlighted tiers */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold shadow-md">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">{name}</CardTitle>
        <CardDescription className="text-muted-foreground mt-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-foreground">{displayPrice}</span>
            {showPeriod && <span className="text-muted-foreground">/{period}</span>}
          </div>
          {billingPeriod === "annual" && priceAnnual && period && (
            <p className="text-sm text-secondary font-medium">Save 20% with annual billing</p>
          )}
        </div>

        {/* Features list */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          variant={highlighted ? "hero" : "outline"}
          size="lg"
          className="w-full"
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
