import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingCard from "@/components/shared/PricingCard";
import SchoolLeadForm from "@/components/forms/SchoolLeadForm";
import { schoolsPricing } from "@/config/pricing";

const PricingSchools = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [showForm, setShowForm] = useState(false);

  const handleCtaClick = (tierId: string) => {
    console.log(`CTA clicked for tier: ${tierId}`);
    setShowForm(true);
  };

  return (
    <>
    <section id="pricing" className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing for Schools</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your school's size and needs. All plans include 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center">
            <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as "monthly" | "annual")}>
              <TabsList className="bg-card">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual
                  <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {schoolsPricing.map((tier) => (
            <PricingCard
              key={tier.id}
              {...tier}
              billingPeriod={billingPeriod}
              onCtaClick={() => handleCtaClick(tier.id)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include dedicated onboarding support and training for your staff.
          </p>
          <p className="text-sm text-muted-foreground">
            Prices in South African Rand (ZAR). +VAT applies. Volume discounts available for school districts.
          </p>
        </div>
      </div>
    </section>

    {/* School Lead Form Dialog */}
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Get Started with StudyBuddy</DialogTitle>
        </DialogHeader>
        <SchoolLeadForm onSuccess={() => setShowForm(false)} />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default PricingSchools;
