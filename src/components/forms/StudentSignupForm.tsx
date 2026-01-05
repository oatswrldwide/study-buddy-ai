import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle, GraduationCap, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  grade: z.string().min(1, "Grade is required"),
  parentEmail: z.string().email("Valid parent email is required").optional().or(z.literal("")),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  referralSource: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine((data) => {
  // If under 18, parent email is required
  const birthDate = new Date(data.dateOfBirth);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  if (age < 18) {
    return data.parentEmail && data.parentEmail.length > 0;
  }
  return true;
}, {
  message: "Parent/guardian email is required for learners under 18",
  path: ["parentEmail"],
});

type FormData = z.infer<typeof formSchema>;

interface StudentSignupFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const StudentSignupForm = ({ onSuccess, onClose }: StudentSignupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showParentEmail, setShowParentEmail] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      grade: "",
      parentEmail: "",
      subjects: [],
      referralSource: "",
      gdprConsent: false,
    },
  });

  const watchDOB = form.watch("dateOfBirth");

  // Check age when DOB changes
  const checkAge = (dob: string) => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    setShowParentEmail(age < 18);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('student_signups')
        .insert({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.dateOfBirth,
          grade: parseInt(data.grade),
          parent_email: data.parentEmail || null,
          subjects: data.subjects,
          referral_source: data.referralSource || null,
          gdpr_consent: data.gdprConsent,
          status: 'trial'
        });
      
      if (error) {
        console.error("Supabase error:", error);
        alert("There was an error creating your account. Please try again.");
        return;
      }
      
      setIsSuccess(true);
      
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error creating your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to StudyBuddy!</h3>
        <p className="text-muted-foreground mb-6">
          Your 7-day free trial starts now. Check your email for login details.
        </p>
        <p className="text-sm text-muted-foreground">
          Email sent to <span className="font-medium text-foreground">{form.getValues("email")}</span>
        </p>
      </div>
    );
  }

  const saSubjects = [
    "Mathematics",
    "Mathematical Literacy",
    "Physical Sciences",
    "Life Sciences",
    "Accounting",
    "Business Studies",
    "Economics",
    "English Home Language",
    "English First Additional Language",
    "Afrikaans Home Language",
    "Afrikaans First Additional Language",
    "History",
    "Geography",
    "Life Orientation",
    "Information Technology",
    "Computer Applications Technology",
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-accent" />
        <div>
          <h3 className="text-xl font-bold text-foreground">Start Your Free Trial</h3>
          <p className="text-sm text-muted-foreground">7 days free, no credit card required</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            {...form.register("fullName")}
            placeholder="e.g., Thabo Mbeki"
            className="mt-1"
          />
          {form.formState.errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.fullName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="your.email@example.com"
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
              placeholder="082 123 4567"
              className="mt-1"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...form.register("dateOfBirth")}
              onChange={(e) => {
                form.register("dateOfBirth").onChange(e);
                checkAge(e.target.value);
              }}
              max={new Date().toISOString().split('T')[0]}
              className="mt-1"
            />
            {form.formState.errors.dateOfBirth && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="grade">Current Grade *</Label>
            <Select onValueChange={(value) => form.setValue("grade", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12 (Matric)</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.grade && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.grade.message}</p>
            )}
          </div>
        </div>

        {showParentEmail && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Parent/Guardian Consent Required:</strong> Since you're under 18, 
                we need a parent or guardian's email address for account verification.
              </p>
            </div>
            <div>
              <Label htmlFor="parentEmail">Parent/Guardian Email *</Label>
              <Input
                id="parentEmail"
                type="email"
                {...form.register("parentEmail")}
                placeholder="parent@example.com"
                className="mt-1"
              />
              {form.formState.errors.parentEmail && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.parentEmail.message}</p>
              )}
            </div>
          </div>
        )}

        <div>
          <Label>Subjects You Need Help With *</Label>
          <p className="text-xs text-muted-foreground mb-2">Select all that apply</p>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
            {saSubjects.map((subject) => (
              <div key={subject} className="flex items-center gap-2">
                <Checkbox
                  id={subject}
                  onCheckedChange={(checked) => {
                    const current = form.getValues("subjects");
                    if (checked) {
                      form.setValue("subjects", [...current, subject]);
                    } else {
                      form.setValue(
                        "subjects",
                        current.filter((s) => s !== subject)
                      );
                    }
                  }}
                />
                <Label htmlFor={subject} className="font-normal text-sm cursor-pointer">
                  {subject}
                </Label>
              </div>
            ))}
          </div>
          {form.formState.errors.subjects && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.subjects.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="referralSource">How did you hear about us? (Optional)</Label>
          <Select onValueChange={(value) => form.setValue("referralSource", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">My school</SelectItem>
              <SelectItem value="friend">Friend/Family</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
              <SelectItem value="google">Google Search</SelectItem>
              <SelectItem value="teacher">Teacher recommendation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <Checkbox
            id="gdprConsent"
            onCheckedChange={(checked) => form.setValue("gdprConsent", checked as boolean)}
          />
          <Label htmlFor="gdprConsent" className="font-normal text-sm leading-relaxed cursor-pointer">
            I agree to the{" "}
            <a href="/terms" className="text-primary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary underline">
              Privacy Policy
            </a>.
            {showParentEmail && " My parent/guardian will receive a verification email."}
          </Label>
        </div>
        {form.formState.errors.gdprConsent && (
          <p className="text-sm text-red-600">{form.formState.errors.gdprConsent.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        {onClose && (
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="accent" className="ml-auto" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Start Free Trial"}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {form.formState.errors.root && (
        <p className="text-sm text-red-600 text-center">{form.formState.errors.root.message}</p>
      )}
    </form>
  );
};

export default StudentSignupForm;
