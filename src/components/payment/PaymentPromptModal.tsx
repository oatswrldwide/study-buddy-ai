import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Sparkles, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentPromptModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const PaymentPromptModal = ({ onClose, onUpgrade }: PaymentPromptModalProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <Card className="max-w-lg w-full p-6 relative animate-in slide-in-from-bottom-4 duration-300">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome to StudyBuddy! 🎉
          </h2>
          <p className="text-slate-600">
            Your account is ready. Start learning with our AI tutor!
          </p>
        </div>

        {/* Special Offer */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide mb-1 opacity-90">
                Special Launch Offer
              </div>
              <div className="text-3xl font-bold">
                R200<span className="text-lg">/year</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-90">Limited time only</div>
              <div className="text-sm font-semibold">Save 60%!</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Unlimited Questions</p>
              <p className="text-xs text-slate-600">Ask as many questions as you want, anytime</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">5 Free Daily Questions</p>
              <p className="text-xs text-slate-600">Try it out with 5 questions per day - no payment required</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => {
              onClose();
              navigate("/student-portal");
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            size="lg"
          >
            Try Free Questions
          </Button>
          <Button
            onClick={() => {
              onUpgrade();
              navigate("/student-portal");
            }}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Upgrade Now - R200/Year
          </Button>
        </div>

        <p className="text-xs text-center text-slate-500 mt-4">
          You can upgrade anytime from your dashboard
        </p>
      </Card>
    </div>
  );
};

export default PaymentPromptModal;
