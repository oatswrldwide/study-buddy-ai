import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle, School, Users, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  // Step 1: Contact Info
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(2, "Position is required"),
  
  // Step 2: School Details
  schoolName: z.string().min(2, "School name is required"),
  province: z.string().min(1, "Province is required"),
  schoolType: z.string().min(1, "School type is required"),
  learnerCount: z.string().min(1, "Learner count is required"),
  curriculum: z.array(z.string()).min(1, "Select at least one curriculum"),
  
  // Step 3: Requirements
  subjects: z.string().optional(),
  currentSolution: z.string().optional(),
  challenges: z.string().min(10, "Please describe your challenges (min 10 characters)"),
  preferredStartDate: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type FormData = z.infer<typeof formSchema>;

interface SchoolLeadFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const SchoolLeadForm = ({ onSuccess, onClose }: SchoolLeadFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      schoolName: "",
      province: "",
      schoolType: "",
      learnerCount: "",
      curriculum: [],
      subjects: "",
      currentSolution: "",
      challenges: "",
      preferredStartDate: "",
      gdprConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('school_leads')
        .insert({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          position: data.position,
          school_name: data.schoolName,
          province: data.province,
          school_type: data.schoolType,
          learner_count: parseInt(data.learnerCount),
          curriculum: data.curriculum,
          subjects: data.subjects ? [data.subjects] : [],
          current_solution: data.currentSolution || null,
          challenges: data.challenges,
          preferred_start_date: data.preferredStartDate || null,
          gdpr_consent: data.gdprConsent,
          status: 'new'
        });
      
      if (error) {
        console.error("Supabase error:", error);
        alert("There was an error submitting your request. Please try again.");
        return;
      }
      
      setIsSuccess(true);
      
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (step === 1) {
      fieldsToValidate = ["fullName", "email", "phone", "position"];
    } else if (step === 2) {
      fieldsToValidate = ["schoolName", "province", "schoolType", "learnerCount", "curriculum"];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Request Received!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your interest. We'll be in touch within 24 hours to schedule your demo.
        </p>
        <p className="text-sm text-muted-foreground">
          Check your email at <span className="font-medium text-foreground">{form.getValues("email")}</span>
        </p>
      </div>
    );
  }

  const saProvinces = [
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape",
    "Free State",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                s === step
                  ? "bg-primary text-white"
                  : s < step
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s < step ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`h-1 flex-1 mx-2 transition-colors ${
                  s < step ? "bg-green-500" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Contact Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <School className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          </div>

          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...form.register("fullName")}
              placeholder="e.g., John Smith"
              className="mt-1"
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="john.smith@school.co.za"
              className="mt-1"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="012 345 6789"
              className="mt-1"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="position">Position/Role *</Label>
            <Input
              id="position"
              {...form.register("position")}
              placeholder="e.g., Principal, IT Manager"
              className="mt-1"
            />
            {form.formState.errors.position && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.position.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: School Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">School Details</h3>
          </div>

          <div>
            <Label htmlFor="schoolName">School Name *</Label>
            <Input
              id="schoolName"
              {...form.register("schoolName")}
              placeholder="e.g., Hoërskool Stellenbosch"
              className="mt-1"
            />
            {form.formState.errors.schoolName && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.schoolName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="province">Province *</Label>
            <Select onValueChange={(value) => form.setValue("province", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {saProvinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.province && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.province.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="schoolType">School Type *</Label>
            <Select onValueChange={(value) => form.setValue("schoolType", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public School</SelectItem>
                <SelectItem value="private">Private School</SelectItem>
                <SelectItem value="independent">Independent School</SelectItem>
                <SelectItem value="tvet">TVET College</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.schoolType && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.schoolType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="learnerCount">Number of Learners *</Label>
            <Select onValueChange={(value) => form.setValue("learnerCount", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-200">1 - 200</SelectItem>
                <SelectItem value="201-500">201 - 500</SelectItem>
                <SelectItem value="501-1000">501 - 1,000</SelectItem>
                <SelectItem value="1001-2000">1,001 - 2,000</SelectItem>
                <SelectItem value="2000+">2,000+</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.learnerCount && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.learnerCount.message}</p>
            )}
          </div>

          <div>
            <Label>Curriculum(s) *</Label>
            <div className="space-y-2 mt-2">
              {[
                { id: "caps", label: "CAPS (National Curriculum)" },
                { id: "ieb", label: "IEB (Independent Examinations Board)" },
                { id: "cambridge", label: "Cambridge International" },
                { id: "ib", label: "International Baccalaureate (IB)" },
              ].map((curriculum) => (
                <div key={curriculum.id} className="flex items-center gap-2">
                  <Checkbox
                    id={curriculum.id}
                    onCheckedChange={(checked) => {
                      const current = form.getValues("curriculum");
                      if (checked) {
                        form.setValue("curriculum", [...current, curriculum.id]);
                      } else {
                        form.setValue(
                          "curriculum",
                          current.filter((c) => c !== curriculum.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={curriculum.id} className="font-normal cursor-pointer">
                    {curriculum.label}
                  </Label>
                </div>
              ))}
            </div>
            {form.formState.errors.curriculum && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.curriculum.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Requirements */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Your Requirements</h3>
          </div>

          <div>
            <Label htmlFor="subjects">Priority Subjects (Optional)</Label>
            <Input
              id="subjects"
              {...form.register("subjects")}
              placeholder="e.g., Mathematics, Physical Sciences"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Which subjects need the most support?
            </p>
          </div>

          <div>
            <Label htmlFor="currentSolution">Current Solution (Optional)</Label>
            <Input
              id="currentSolution"
              {...form.register("currentSolution")}
              placeholder="e.g., No current AI tools, using X platform"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="challenges">Main Challenges *</Label>
            <Textarea
              id="challenges"
              {...form.register("challenges")}
              placeholder="Tell us about your main challenges with AI usage, student performance, or teacher support..."
              rows={4}
              className="mt-1"
            />
            {form.formState.errors.challenges && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.challenges.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="preferredStartDate">Preferred Start Date (Optional)</Label>
            <Select onValueChange={(value) => form.setValue("preferredStartDate", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">As soon as possible</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="next-month">Next month</SelectItem>
                <SelectItem value="this-quarter">This quarter</SelectItem>
                <SelectItem value="next-quarter">Next quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="gdprConsent"
              onCheckedChange={(checked) => form.setValue("gdprConsent", checked as boolean)}
            />
            <Label htmlFor="gdprConsent" className="font-normal text-sm leading-relaxed cursor-pointer">
              I agree to StudyBuddy contacting me about their services and confirm that the information provided
              is accurate. I understand my data will be processed according to the{" "}
              <a href="/privacy" className="text-primary underline">
                Privacy Policy
              </a>{" "}
              (POPIA compliant).
            </Label>
          </div>
          {form.formState.errors.gdprConsent && (
            <p className="text-sm text-red-600">{form.formState.errors.gdprConsent.message}</p>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Demo"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {form.formState.errors.root && (
        <p className="text-sm text-red-600 text-center">{form.formState.errors.root.message}</p>
      )}
    </form>
  );
};

export default SchoolLeadForm;
