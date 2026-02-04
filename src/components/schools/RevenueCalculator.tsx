import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RevenueCalculator = () => {
  const [studentCount, setStudentCount] = useState(500);
  const [studentPrice, setStudentPrice] = useState(250);

  const platformCost = studentCount * 150;
  const schoolRevenue = studentCount * studentPrice;
  const netProfit = schoolRevenue - platformCost;
  const profitMargin = schoolRevenue > 0 ? ((netProfit / schoolRevenue) * 100).toFixed(1) : 0;

  const handleStudentCountChange = (value: string) => {
    const num = parseInt(value) || 0;
    setStudentCount(Math.max(100, num));
  };

  const handleStudentPriceChange = (value: string) => {
    const num = parseInt(value) || 0;
    setStudentPrice(Math.max(200, num));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-orange-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              <span>Revenue Calculator</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calculate Your School's Potential Revenue
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how much your school can earn by offering branded AI tutoring to students
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Card */}
            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Your Numbers</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="studentCount" className="text-base font-semibold mb-2 block">
                    Number of Students
                  </Label>
                  <Input
                    id="studentCount"
                    type="number"
                    min="100"
                    value={studentCount}
                    onChange={(e) => handleStudentCountChange(e.target.value)}
                    className="text-lg h-12"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Minimum 100 students required</p>
                </div>

                <div>
                  <Label htmlFor="studentPrice" className="text-base font-semibold mb-2 block">
                    Price Per Student (Annual)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">R</span>
                    <Input
                      id="studentPrice"
                      type="number"
                      min="200"
                      value={studentPrice}
                      onChange={(e) => handleStudentPriceChange(e.target.value)}
                      className="text-lg h-12 pl-8"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Minimum R200 (recommended R250-R300)</p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>Platform cost: R150/student/year</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Card */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-orange-50/50 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-6">Your Revenue Breakdown</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue from Students</p>
                  <p className="text-3xl font-bold text-foreground">
                    R{schoolRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="h-px bg-border"></div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Platform Cost (Annual)</p>
                  <p className="text-xl font-semibold text-red-600">
                    - R{platformCost.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Billed annually at enrollment ({studentCount} students × R150)
                  </p>
                </div>

                <div className="h-px bg-border"></div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-primary mb-1 font-medium">Your Net Profit</p>
                  <p className="text-4xl font-bold text-primary mb-1">
                    R{netProfit.toLocaleString()}
                  </p>
                  <p className="text-sm text-primary/80">
                    {profitMargin}% profit margin • Locked in for full year
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    💡 <strong>Pro tip:</strong> Most schools charge R250-R300 per student for higher margins while remaining affordable for families.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-white rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-3">How the Reseller Model Works</h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-2">1</div>
                <p className="text-foreground font-medium mb-1">You collect payments</p>
                <p className="text-muted-foreground">Charge students R{studentPrice}+ annually and collect directly</p>
              </div>
              <div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-2">2</div>
                <p className="text-foreground font-medium mb-1">We bill you once</p>
                <p className="text-muted-foreground">Annual bill of R150 per enrolled student</p>
              </div>
              <div>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-2">3</div>
                <p className="text-foreground font-medium mb-1">Keep the profit</p>
                <p className="text-muted-foreground">You keep R{studentPrice - 150}+ per student as school revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueCalculator;
