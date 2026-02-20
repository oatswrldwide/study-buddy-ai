import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle, GraduationCap } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  grade: z.string().min(1, "Grade is required"),
  primarySubject: z.string().min(1, "Select your main subject"),
  gdprConsent: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type FormData = z.infer<typeof formSchema>;

interface StudentSignupFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const StudentSignupForm = ({ onSuccess, onClose }: StudentSignupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      grade: "",
      primarySubject: "",
      gdprConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Step 1: Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      
      const userId = userCredential.user.uid;
      
      // Step 2: Send email verification
      await sendEmailVerification(userCredential.user);
      
      // Step 3: Create student document in Firestore with matching UID
      const studentDocRef = doc(db, 'student_signups', userId);
      await setDoc(studentDocRef, {
        full_name: data.fullName,
        email: data.email,
        grade: parseInt(data.grade),
        primary_subject: data.primarySubject,
        gdpr_consent: data.gdprConsent,
        status: 'trial',
        created_at: serverTimestamp(),
        trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });
      
      setIsSuccess(true);
      
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (error: unknown) {
      console.error("Form submission error:", error);
      
      // Show user-friendly error messages
      const code = (error as { code?: string }).code;
      if (code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please log in instead.");
      } else if (code === 'auth/weak-password') {
        alert("Password is too weak. Please use at least 6 characters.");
      } else if (code === 'auth/invalid-email') {
        alert("Invalid email address. Please check and try again.");
      } else {
        alert("There was an error creating your account. Please try again.");
      }
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
          Your 7-day free trial starts now. Please verify your email to get started.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <p className="text-sm text-blue-800 mb-2">
            <strong>📧 Verification email sent to:</strong>
          </p>
          <p className="text-sm font-medium text-blue-900">
            {form.getValues("email")}
          </p>
          <p className="text-xs text-blue-600 mt-2">
            Check your inbox and click the verification link to activate your account.
          </p>
        </div>
      </div>
    );
  }

  const topSubjects = [
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "English",
    "Accounting",
    "Other",
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-6 h-6 text-accent" />
        <div>
          <h3 className="text-xl font-bold text-foreground">Start Your Free Trial</h3>
          <p className="text-sm text-muted-foreground">7 days free, no payment required</p>
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
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            placeholder="At least 6 characters"
            className="mt-1"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
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

          <div>
            <Label htmlFor="primarySubject">Main Subject *</Label>
            <Select onValueChange={(value) => form.setValue("primarySubject", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {topSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.primarySubject && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.primarySubject.message}</p>
            )}
          </div>
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
            </a>
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
