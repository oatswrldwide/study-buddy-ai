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
      className={`relative p-6 rounded-lg transition-all duration-300 ${
        highlighted
          ? "border-2 border-primary shadow-md bg-primary/[0.02]"
          : "border border-border/50 shadow-sm hover:shadow-md hover:border-border"
      }`}
    >
      {/* Badge for popular/highlighted tiers */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold border border-accent/20">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold text-foreground">{name}</CardTitle>
        <CardDescription className="text-muted-foreground mt-2 leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{displayPrice}</span>
            {showPeriod && <span className="text-muted-foreground text-sm">/{period}</span>}
          </div>
          {billingPeriod === "annual" && priceAnnual && period && (
            <p className="text-sm text-secondary font-medium">Save 20% annually</p>
          )}
        </div>

        {/* Features list */}
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/90 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          variant={highlighted ? "default" : "outline"}
          size="lg"
          className={`w-full ${
            highlighted 
              ? "bg-primary hover:bg-primary-dark text-white shadow-sm" 
              : "border-2 border-border hover:bg-muted/50"
          }`}
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
