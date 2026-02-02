import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const SchoolContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to Google Form
    window.open("https://forms.gle/x6Hu6g8uKTo4xQRw6", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h3>
        <p className="text-muted-foreground">
          Click the button below to fill out our contact form. We'll respond within 24 hours.
        </p>
      </div>
      
      <Button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 text-white"
        size="lg"
      >
        <Send className="w-4 h-4 mr-2" />
        Open Contact Form
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We'll respond within 24 hours. All information is kept confidential.
      </p>
    </div>
  );
};
