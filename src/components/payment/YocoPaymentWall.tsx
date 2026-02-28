import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Lock, Zap, Shield, TrendingUp, CreditCard } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

interface YocoPaymentWallProps {
  questionsRemaining: number;
  onPaymentSuccess: () => void;
}

interface YocoSDKInstance {
  showPopup: (options: {
    amountInCents: number;
    currency: string;
    name: string;
    description: string;
    metadata?: Record<string, unknown>;
    callback: (result: YocoPaymentResult) => void;
  }) => void;
}

interface YocoPaymentResult {
  error?: { message: string };
  id?: string;
}

declare global {
  interface Window {
    YocoSDK: new (options: { publicKey: string }) => YocoSDKInstance;
  }
}

const YocoPaymentWall = ({ questionsRemaining, onPaymentSuccess }: YocoPaymentWallProps) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!user) return;

    try {
      setIsProcessing(true);
      setError(null);

      const yoco = new window.YocoSDK({
        publicKey: import.meta.env.VITE_YOCO_PUBLIC_KEY,
      });

      // Open Yoco payment popup
      yoco.showPopup({
        amountInCents: 20000, // R200.00
        currency: "ZAR",
        name: "StudyBuddy Premium",
        description: "Annual Subscription - Special Launch Offer",
        metadata: {
          studentId: user.uid,
          email: user.email,
          plan: "annual_special",
        },
        callback: async function (result: YocoPaymentResult) {
          if (result.error) {
            console.error("Payment error:", result.error);
            setError(result.error.message || "Payment failed. Please try again.");
            setIsProcessing(false);
          } else {
            // Payment successful - update Firestore
            try {
              const studentRef = doc(db, "student_signups", user.uid);
              
              // Calculate subscription end date (365 days from now)
              const subscriptionEnd = new Date();
              subscriptionEnd.setDate(subscriptionEnd.getDate() + 365);

              await updateDoc(studentRef, {
                payment_status: "paid",
                status: "active",
                payment_date: serverTimestamp(),
                subscription_end: subscriptionEnd.toISOString(),
                transaction_id: result.id,
                amount_paid: 200,
                currency: "ZAR",
              });

              // Store transaction record
              await fetch("/api/store-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  student_id: user.uid,
                  transaction_id: result.id,
                  amount: 200,
                  currency: "ZAR",
                  status: "success",
                }),
              }).catch(() => {
                // Optional: If API endpoint doesn't exist, fail silently
                console.log("Payment recorded in Firestore only");
              });

              onPaymentSuccess();
            } catch (err) {
              console.error("Error updating payment status:", err);
              setError("Payment processed but failed to update account. Please contact support.");
            }
            setIsProcessing(false);
          }
        },
      });
    } catch (err: unknown) {
      console.error("Payment initialization error:", err);
      setError((err as Error).message || "Failed to initialize payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const features = [
    { icon: Zap, text: "Unlimited AI tutor questions" },
    { icon: TrendingUp, text: "Personalized learning paths" },
    { icon: Shield, text: "Study progress tracking" },
    { icon: CreditCard, text: "Cancel anytime - no hidden fees" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-white/95 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Unlock Your Learning Potential
          </h2>
          <p className="text-lg text-slate-600">
            You have <span className="font-bold text-purple-600">{questionsRemaining} free questions</span> remaining today
          </p>
        </div>

        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 mb-6 text-center">
          <div className="text-sm font-semibold uppercase tracking-wide mb-2">
            🎉 Special Launch Offer
          </div>
          <div className="text-4xl font-bold mb-2">
            R200<span className="text-xl">/year</span>
          </div>
          <div className="text-sm opacity-90">
            Limited time - Get unlimited access for a full year
          </div>
        </div>

        {/* Features List */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4 text-purple-600" />
                  <p className="text-sm font-medium text-slate-700">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Upgrade Now - R200/Year
            </>
          )}
        </Button>

        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Powered by Yoco</span>
            </div>
          </div>
        </div>

        {/* Free Daily Questions Note */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            💡 <strong>Good news!</strong> You'll continue to get 5 free questions daily even without upgrading.
            Upgrade now to unlock unlimited questions anytime!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default YocoPaymentWall;
