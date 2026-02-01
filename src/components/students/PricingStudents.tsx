import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingCard from "@/components/shared/PricingCard";
import StudentSignupForm from "@/components/forms/StudentSignupForm";
import { studentsPricing } from "@/config/pricing";

const PricingStudents = () => {
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
            Choose Your{" "}
            <span className="text-gradient">Study Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Start with 5 free questions daily. Upgrade to unlimited for just R200/year!
          </p>
          
          {/* Special Offer Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold mb-8 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Special Launch Offer - R200 for Full Year Access!</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {studentsPricing.map((tier) => (
            <PricingCard
              key={tier.id}
              {...tier}
              billingPeriod={billingPeriod}
              onCtaClick={() => handleCtaClick(tier.id)}
            />
          ))}
        </div>

        {/* Comparison Note */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 text-center">
            <h3 className="font-bold text-foreground mb-2">
              R200/year = Just R16.67 per month!
            </h3>
            <p className="text-muted-foreground text-sm">
              Compare to private tutors at R300-500/hour. StudyBuddy gives you unlimited AI help 24/7 for an entire year.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include progress tracking and CAPS/IEB curriculum alignment. Payment via EFT, card, or SnapScan.
          </p>
        </div>
      </div>
    </section>

    {/* Student Signup Form Dialog */}
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start Your Learning Journey</DialogTitle>
        </DialogHeader>
        <StudentSignupForm onSuccess={() => setShowForm(false)} />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default PricingStudents;
