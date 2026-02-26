import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  School,
  ArrowRight,
  Calculator,
  MapPin,
  FileText,
  Award,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Shield,
  ChevronRight,
  Brain,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppAssistanceBanner from "@/components/shared/WhatsAppAssistanceBanner";

const provinces = [
  { name: "Gauteng", slug: "gauteng" },
  { name: "Western Cape", slug: "western-cape" },
  { name: "KwaZulu-Natal", slug: "kwazulu-natal" },
  { name: "Eastern Cape", slug: "eastern-cape" },
  { name: "Limpopo", slug: "limpopo" },
  { name: "Mpumalanga", slug: "mpumalanga" },
  { name: "North West", slug: "north-west" },
  { name: "Free State", slug: "free-state" },
  { name: "Northern Cape", slug: "northern-cape" },
];

const popularArticles = [
  {
    slug: "pain-failing-mathematics-grade-12-need-help-fast",
    title: "Failing Maths Grade 12?",
    desc: "Turn your grades around with step-by-step 24/7 AI help.",
  },
  {
    slug: "pain-failing-physical-sciences-grade-12-need-help-fast",
    title: "Struggling with Physical Sciences?",
    desc: "Master chemistry & physics with CAPS-aligned AI tutoring.",
  },
  {
    slug: "pain-failing-accounting-grade-10-need-help-fast",
    title: "Accounting Giving You Trouble?",
    desc: "Step-by-step help with financial statements and ledgers.",
  },
  {
    slug: "how-to-pass-matric-with-distinction",
    title: "How to Pass Matric with Distinction",
    desc: "Proven strategies to ace your NSC exams and unlock bursaries.",
  },
  {
    slug: "matric-exam-preparation-guide",
    title: "Complete Matric Exam Prep Guide",
    desc: "Everything you need to prepare for your final exams.",
  },
  {
    slug: "best-universities-in-south-africa",
    title: "Best Universities in South Africa",
    desc: "Compare top SA universities and find the right fit for you.",
  },
];

const stats = [
  { value: "50 000+", label: "Students Learning", icon: Users },
  { value: "24/7", label: "AI Tutor Available", icon: Zap },
  { value: "40%", label: "Grade Improvement", icon: TrendingUp },
  { value: "99.9%", label: "Platform Uptime", icon: Shield },
];

const MarketSelector = () => {
  return (
    <>
      <Helmet>
        <title>StudyBuddy Works | #1 AI Tutor for South African Students & Schools</title>
        <meta
          name="description"
          content="South Africa's leading AI-powered tutoring platform. CAPS-aligned 24/7 homework help, matric exam prep, APS calculator, bursary finder & more. From R99/month. Try free."
        />
        <meta
          name="keywords"
          content="AI tutoring South Africa, CAPS tutoring, online tutor, matric help, homework help, APS calculator, bursaries South Africa, school AI platform"
        />
        <meta property="og:title" content="StudyBuddy Works | #1 AI Tutor for South African Students & Schools" />
        <meta
          property="og:description"
          content="24/7 CAPS-aligned AI tutoring from R99/month. Matric exam prep, APS calculator, bursary finder & more. Start free today."
        />
        <meta property="og:url" content="https://studybuddy.works/" />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content="StudyBuddy Works | #1 AI Tutor for South African Students" />
        <meta
          property="twitter:description"
          content="24/7 AI tutoring for South African students. CAPS-aligned, R99/month, 7-day free trial."
        />
        <link rel="canonical" href="https://studybuddy.works/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "StudyBuddy Works",
          url: "https://studybuddy.works/",
          description: "AI-powered tutoring for South African students and schools. CAPS-aligned, affordable, accessible.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://studybuddy.works/resources?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is StudyBuddy Works?",
              acceptedAnswer: { "@type": "Answer", text: "StudyBuddy Works is a CAPS-aligned AI tutoring platform for South African students in Grades 10–12. It provides 24/7 homework help and exam preparation for R99/month with a 7-day free trial." },
            },
            {
              "@type": "Question",
              name: "How much does StudyBuddy Works cost?",
              acceptedAnswer: { "@type": "Answer", text: "StudyBuddy Works costs R99 per month for students, with unlimited access to all CAPS subjects and a 7-day free trial. No credit card is required to start." },
            },
            {
              "@type": "Question",
              name: "Which subjects does StudyBuddy cover?",
              acceptedAnswer: { "@type": "Answer", text: "StudyBuddy covers all major CAPS subjects including Mathematics, Physical Sciences, Life Sciences, English, Afrikaans, Accounting, History, Geography, Business Studies, and Economics for Grades 10–12." },
            },
            {
              "@type": "Question",
              name: "Is StudyBuddy Works aligned to the South African curriculum?",
              acceptedAnswer: { "@type": "Answer", text: "Yes. StudyBuddy Works is fully aligned to the CAPS (Curriculum and Assessment Policy Statement) and is also compatible with the IEB curriculum." },
            },
            {
              "@type": "Question",
              name: "Can schools use StudyBuddy Works?",
              acceptedAnswer: { "@type": "Answer", text: "Yes. Schools can get a white-label branded platform for R150 per student per year, with their own custom domain, logo, and school colors. Minimum 100 students. The platform can be live in 14 days." },
            },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* ── Hero ── */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-24 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Brain className="w-4 h-4" />
                South Africa's #1 AI Learning Platform
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Ace Your Studies with{" "}
                <span className="text-gradient">AI Tutoring</span>{" "}
                Built for South Africa
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                CAPS-aligned 24/7 homework help, matric exam prep, APS calculator, bursary finder, and
                personalised tutoring — all in one platform. From R99/month.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/students">
                    Start Learning Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/schools">
                    I'm a School
                    <School className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> No credit card needed</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> 7-day free trial</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> CAPS & IEB aligned</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> POPIA compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-14 bg-foreground text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-6 h-6 mx-auto mb-2 text-primary-foreground/70" />
                  <div className="text-3xl md:text-4xl font-extrabold mb-1">{s.value}</div>
                  <div className="text-sm text-primary-foreground/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Market Cards ── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Who Are You?
              </h2>
              <p className="text-muted-foreground text-lg">
                Get a tailored experience designed for your specific needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Students Card */}
              <Link
                to="/students"
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-5">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  For Students & Parents
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get 24/7 AI homework help, matric exam preparation, and a personalised learning path — all CAPS-aligned.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "24/7 AI Tutor for all subjects",
                    "Homework help & exam prep",
                    "APS calculator & course finder",
                    "Bursary & scholarship search",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">From R99/month <span aria-hidden="true">·</span> 7-day free trial</span>
                  <span className="flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                    Get started <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              {/* Schools Card */}
              <Link
                to="/schools"
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                  <School className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  For Schools & Institutions
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Launch a branded AI tutoring platform, monitor usage, empower teachers, and keep the profit.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    "Admin dashboard & analytics",
                    "Teacher insights & reports",
                    "White-label branded platform",
                    "POPIA compliant & secure",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-end">
                  <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Explore for schools <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tools & Resources ── */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground text-lg">
                Free tools and resources designed for South African learners.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                to="/aps-calculator"
                className="group bg-background p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <Calculator className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">APS Calculator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate your Admission Point Score and find which university courses you qualify for.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Calculate now <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/bursaries"
                className="group bg-background p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <Award className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Bursaries & Funding</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find NSFAS, Funza Lushaka, corporate bursaries and scholarships available to you.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Find bursaries <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/high-school-scholarships"
                className="group bg-background p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <GraduationCap className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">High School Scholarships</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse 150+ high school scholarships across South Africa — national, corporate, mining and private school.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  View scholarships <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/courses"
                className="group bg-background p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <BookOpen className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">University Courses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse course requirements, APS scores, and study options at every SA university.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Browse courses <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/resources"
                className="group bg-background p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <FileText className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Study Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  CAPS-aligned subject guides, past exam papers, study notes and tips for every grade.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Browse resources <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/locations"
                className="group bg-background p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <MapPin className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Find a Tutor Near You</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Locate AI tutoring services in your city or town across all 9 provinces.
                </p>
                <span className="text-primary text-sm font-semibold flex items-center gap-1">
                  Search locations <ChevronRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                to="/how-it-works"
                className="group bg-background p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all"
              >
                <Globe className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">How It Works</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See exactly how our AI tutor guides students to answers step-by-step without cheating.
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Popular Articles ── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Get Help Right Now
              </h2>
              <p className="text-muted-foreground text-lg">
                Struggling with a subject? These guides can turn things around fast.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {popularArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/${article.slug}`}
                  className="group bg-muted/30 p-6 rounded-xl border border-border hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all"
                >
                  <TrendingUp className="w-7 h-7 text-primary mb-3" />
                  <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{article.desc}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/resources">
                  View All Study Resources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Provinces ── */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                AI Tutoring Across South Africa
              </h2>
              <p className="text-muted-foreground">
                Find local AI tutoring support in your province.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {provinces.map((p) => (
                <Link
                  key={p.slug}
                  to={`/province/${p.slug}`}
                  className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {p.name}
                </Link>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/locations">
                  Browse All Locations
                  <MapPin className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Loved by Students & Schools
              </h2>
              <p className="text-muted-foreground text-lg">
                Real results from real South African learners.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote:
                    "My maths went from 42% to 71% in one term. The AI explains every step and doesn't just give me the answer.",
                  author: "Thabo M.",
                  role: "Grade 12 Student, Soweto",
                  rating: 5,
                },
                {
                  quote:
                    "StudyBuddy helped me find the right bursary and calculate my APS. I'm now studying Engineering at Wits!",
                  author: "Zanele K.",
                  role: "First-year student, University of the Witwatersrand",
                  rating: 5,
                },
                {
                  quote:
                    "Our school uses StudyBuddy and the dashboard gives us incredible insight into where learners are struggling.",
                  author: "Mr. Dlamini",
                  role: "Head of Department, Cape Town High School",
                  rating: 5,
                },
              ].map((t) => (
                <div
                  key={t.author}
                  className="p-8 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-6 leading-relaxed text-sm">
                    "{t.quote}"
                  </blockquote>
                  <div className="border-t border-border pt-5">
                    <div className="font-semibold text-foreground text-sm">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application Assistance ── */}
        <section className="py-6 bg-background">
          <WhatsAppAssistanceBanner />
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Join thousands of South African students and schools already using StudyBuddy Works to achieve better results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 font-bold shadow-xl"
                asChild
              >
                <Link to="/students">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/40 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
              <Link to="/how-it-works" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                How It Works
              </Link>
              <Link to="/bursaries" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                Find Bursaries
              </Link>
              <Link to="/high-school-scholarships" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                High School Scholarships
              </Link>
              <Link to="/aps-calculator" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                APS Calculator
              </Link>
              <Link to="/courses" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                University Courses
              </Link>
              <Link to="/resources" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                Study Resources
              </Link>
              <Link to="/locations" className="hover:text-primary-foreground transition-colors underline underline-offset-2">
                Find a Tutor
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MarketSelector;
