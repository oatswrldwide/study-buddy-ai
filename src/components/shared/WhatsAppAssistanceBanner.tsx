import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "27680187300";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'd like 1-on-1 help with my application. Can you assist me?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

interface WhatsAppAssistanceBannerProps {
  /** Override the heading text */
  heading?: string;
  /** Override the body text */
  description?: string;
}

const WhatsAppAssistanceBanner = ({
  heading = "Need Help With Your Application?",
  description = "Get dedicated 1-on-1 assistance — I'll personally guide you through your university or bursary application from start to finish.",
}: WhatsAppAssistanceBannerProps) => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon */}
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              <PhoneCall className="w-3.5 h-3.5" />
              Free Application Assistance
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{heading}</h2>
            <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-xl">
              {description}
            </p>
            <p className="text-white/70 text-xs mt-2">
              WhatsApp: <span className="font-semibold text-white">068 018 7300</span>
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-white/90 font-bold shadow-md gap-2"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Me Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppAssistanceBanner;
