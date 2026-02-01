import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";

const SchoolContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Let the form submit naturally to Formspree
    setLoading(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          We've received your message and will contact you shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form 
      action="https://public.herotofu.com/v1/8e7b0a20-e0f4-11ef-a448-a3e390a5b43f" 
      method="POST"
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      <input type="hidden" name="_redirect" value="https://studybuddy.works/schools?success=true" />
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            School Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g., Greenside High School"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
            Contact Person *
          </label>
          <Input
            id="contact"
            name="contact"
            type="text"
            required
            placeholder="e.g., John Smith"
            className="w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="principal@school.co.za"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+27 11 123 4567"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="students" className="block text-sm font-medium text-foreground mb-2">
          Number of Students
        </label>
        <Input
          id="students"
          name="students"
          type="number"
          placeholder="e.g., 500"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your school and what you're looking for..."
          className="w-full min-h-[120px]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 text-white"
        size="lg"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We'll respond within 24 hours. All information is kept confidential.
      </p>
    </form>
  );
};

export default SchoolContactForm;
