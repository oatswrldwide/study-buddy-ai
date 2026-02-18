import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, BookOpen, CheckCircle, Star, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Star,
      title: "Sign Up Free",
      desc: "Create your account in under a minute. No credit card required. Get a 7-day free trial with full access to all features.",
      detail: "Start at /students and sign up with your email or Google account.",
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Choose Your Subject",
      desc: "Select your subject and grade. StudyBuddy supports all CAPS subjects across Grade 10, 11, and 12.",
      detail: "From Mathematics and Physical Sciences to Accounting, English, and more.",
    },
    {
      number: "03",
      icon: MessageSquare,
      title: "Ask Anything",
      desc: "Type your question just like you'd message a friend. Get a clear, step-by-step explanation instantly.",
      detail: "Struggling with a theorem? Confused by a past paper question? Just ask.",
    },
    {
      number: "04",
      icon: Zap,
      title: "Get Instant Help",
      desc: "Our AI tutor responds in seconds with CAPS-aligned explanations tailored to your grade and subject.",
      detail: "Available 24/7 — midnight before exams? No problem.",
    },
    {
      number: "05",
      icon: CheckCircle,
      title: "Practice & Improve",
      desc: "Access 500+ past NSC exam papers. Practice with real questions and review detailed memorandums.",
      detail: "Track your understanding and see your confidence grow over time.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>How It Works | StudyBuddy Works - AI Tutoring in 5 Simple Steps</title>
        <meta name="description" content="Learn how StudyBuddy Works provides 24/7 CAPS-aligned AI tutoring for South African students. Sign up free, ask questions, get instant help. It really is that simple." />
        <meta property="og:title" content="How StudyBuddy Works | AI Tutoring for South African Students" />
        <meta property="og:description" content="Get 24/7 CAPS-aligned AI tutoring in 5 simple steps. Sign up free, ask a question, get instant help." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://studybuddy.works/how-it-works" />
        <link rel="canonical" href="https://studybuddy.works/how-it-works" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Zap className="h-4 w-4" />
              Simple & Fast
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How StudyBuddy Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Get 24/7 CAPS-aligned AI tutoring in minutes. No appointments, no waiting, no expensive hourly rates.
              Just ask a question and get help instantly.
            </p>
            <Button asChild size="lg">
              <Link to="/students">Try It Free for 7 Days</Link>
            </Button>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary text-lg">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1 pb-12 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-2">{step.desc}</p>
                    <p className="text-sm text-muted-foreground/70">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Makes StudyBuddy Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "CAPS-Aligned", desc: "Built specifically for the South African national curriculum. Every answer is aligned to your grade and subject requirements." },
                { title: "24/7 Available", desc: "No schedules, no appointments. Study at midnight before exams, early morning, or weekends—whenever you need help." },
                { title: "All Subjects", desc: "Mathematics, Physical Sciences, Accounting, English, Afrikaans, Life Sciences, History, Geography, and more." },
                { title: "Affordable at R99/Month", desc: "Less than a single hour with a traditional tutor. Unlimited questions, unlimited subjects, unlimited access." },
                { title: "Instant Explanations", desc: "Get step-by-step breakdowns that build understanding, not just answers. Learn the method, not just the result." },
                { title: "Free Past Papers", desc: "Access 500+ NSC exam papers and memorandums to practice with real exam questions." },
              ].map((feature, i) => (
                <div key={i} className="bg-background rounded-xl p-6 border border-border">
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Schools */}
        <section className="py-16 md:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-border">
              <h2 className="text-2xl font-bold mb-4">Using StudyBuddy at Your School?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Schools across South Africa use StudyBuddy Works to give their students 24/7 AI tutoring support.
                We offer white-label solutions with your school's branding.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/schools">Learn About School Plans</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/locations">
                    Find Tutors in Your City
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-white">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Try It?</h2>
            <p className="text-lg text-white/90 mb-8">
              Join 12,000+ South African students who are already improving their grades with AI tutoring.
              Start your free 7-day trial today—no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/students">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorks;
