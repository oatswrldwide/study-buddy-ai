import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Calculator, Share2, Download, TrendingUp, GraduationCap, BookOpen, Info, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// ─── APS scoring scale ───────────────────────────────────────────────────────
function markToAPS(mark: number): number {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

// ─── Subject data ────────────────────────────────────────────────────────────
const DEFAULT_SUBJECTS = [
  { id: "home_lang",   label: "Home Language",            mark: "" as string | number, isLO: false },
  { id: "first_add",   label: "First Additional Language", mark: "" as string | number, isLO: false },
  { id: "maths",       label: "Mathematics",              mark: "" as string | number, isLO: false },
  { id: "subject4",    label: "Subject 4",                mark: "" as string | number, isLO: false },
  { id: "subject5",    label: "Subject 5",                mark: "" as string | number, isLO: false },
  { id: "subject6",    label: "Subject 6",                mark: "" as string | number, isLO: false },
  { id: "lo",          label: "Life Orientation",         mark: "" as string | number, isLO: true  },
];

// ─── University data ─────────────────────────────────────────────────────────
interface University {
  name: string;
  shortName: string;
  minAPS: number;
  website: string;
  description: string;
  type: "research" | "comprehensive" | "open";
}

const UNIVERSITIES: University[] = [
  { name: "University of Cape Town",              shortName: "UCT",    minAPS: 36, website: "https://uct.ac.za",    description: "Top-ranked African university, strong research focus.", type: "research" },
  { name: "University of the Witwatersrand",       shortName: "Wits",   minAPS: 35, website: "https://wits.ac.za",   description: "Leading Johannesburg university with world-class faculties.", type: "research" },
  { name: "Stellenbosch University",               shortName: "SU",     minAPS: 34, website: "https://sun.ac.za",    description: "Premier Afrikaans research university in the Western Cape.", type: "research" },
  { name: "University of Pretoria",                shortName: "UP",     minAPS: 30, website: "https://up.ac.za",     description: "Largest residential university in South Africa.", type: "research" },
  { name: "University of Johannesburg",            shortName: "UJ",     minAPS: 26, website: "https://uj.ac.za",     description: "Dynamic comprehensive university in Gauteng.", type: "comprehensive" },
  { name: "University of KwaZulu-Natal",           shortName: "UKZN",   minAPS: 24, website: "https://ukzn.ac.za",   description: "Premier university in KwaZulu-Natal province.", type: "research" },
  { name: "University of the Free State",          shortName: "UFS",    minAPS: 26, website: "https://ufs.ac.za",    description: "Central South Africa's leading comprehensive university.", type: "research" },
  { name: "University of the Western Cape",        shortName: "UWC",    minAPS: 26, website: "https://uwc.ac.za",    description: "Historically significant university in Bellville.", type: "comprehensive" },
  { name: "North-West University",                 shortName: "NWU",    minAPS: 24, website: "https://nwu.ac.za",    description: "Multi-campus university across three provinces.", type: "comprehensive" },
  { name: "Rhodes University",                     shortName: "Rhodes", minAPS: 28, website: "https://ru.ac.za",     description: "Boutique research university in Makhanda, Eastern Cape.", type: "research" },
  { name: "Nelson Mandela University",             shortName: "NMU",    minAPS: 24, website: "https://mandela.ac.za",description: "Coastal university in the Eastern Cape.", type: "comprehensive" },
  { name: "Cape Peninsula University of Technology", shortName: "CPUT", minAPS: 20, website: "https://cput.ac.za",  description: "Largest university of technology in the Western Cape.", type: "comprehensive" },
  { name: "Durban University of Technology",       shortName: "DUT",    minAPS: 20, website: "https://dut.ac.za",    description: "Technology-focused university in Durban.", type: "comprehensive" },
  { name: "Tshwane University of Technology",      shortName: "TUT",    minAPS: 20, website: "https://tut.ac.za",    description: "Large technology university in Pretoria.", type: "comprehensive" },
  { name: "UNISA",                                 shortName: "UNISA",  minAPS: 15, website: "https://unisa.ac.za",  description: "World's largest distance learning university — open admission.", type: "open" },
];

// ─── Course requirements ─────────────────────────────────────────────────────
interface CourseRequirement {
  course: string;
  faculty: string;
  university: string;
  aps: number;
  mathsRequired?: number;
  physicsRequired?: number;
  notes: string;
}

const COURSE_REQUIREMENTS: CourseRequirement[] = [
  { course: "BSc Engineering (Civil/Mechanical/Electrical)", faculty: "Engineering",          university: "UCT",    aps: 38, mathsRequired: 70, physicsRequired: 70, notes: "Maths and Physical Sciences minimum 70% each." },
  { course: "BSc Engineering",                               faculty: "Engineering",          university: "Wits",   aps: 36, mathsRequired: 70, physicsRequired: 60, notes: "Maths min 70%, Physical Sciences min 60%." },
  { course: "MBChB (Medicine)",                              faculty: "Health Sciences",      university: "UCT",    aps: 42, mathsRequired: 70, physicsRequired: 70, notes: "Highly competitive. Requires NBT Academic Literacy and Maths." },
  { course: "MBChB (Medicine)",                              faculty: "Health Sciences",      university: "Wits",   aps: 40, mathsRequired: 70, physicsRequired: 70, notes: "Competitive entry. Also requires Wits placement test." },
  { course: "BCom (Accounting / Finance)",                   faculty: "Commerce",             university: "UCT",    aps: 36, mathsRequired: 60, notes: "Mathematics minimum 60%." },
  { course: "BCom (Accounting)",                             faculty: "Commerce",             university: "Wits",   aps: 34, mathsRequired: 60, notes: "Mathematics minimum 60%." },
  { course: "LLB (Law)",                                     faculty: "Law",                  university: "UCT",    aps: 38, notes: "Strong English & maths literacy recommended." },
  { course: "BA (Humanities / Social Science)",              faculty: "Humanities",           university: "UCT",    aps: 36, notes: "Language requirements apply." },
  { course: "BSc Computer Science",                          faculty: "Science",              university: "UP",     aps: 32, mathsRequired: 70, notes: "Maths minimum 70%." },
  { course: "BEng (Engineering)",                            faculty: "Engineering",          university: "UP",     aps: 32, mathsRequired: 70, physicsRequired: 60, notes: "Maths 70%, Physical Sciences 60%." },
  { course: "BSc Engineering",                               faculty: "Engineering",          university: "SU",     aps: 36, mathsRequired: 70, physicsRequired: 70, notes: "Maths and Physical Sciences both 70%+." },
  { course: "BCom (Accounting)",                             faculty: "Commerce",             university: "UKZN",   aps: 28, mathsRequired: 60, notes: "Maths minimum 60%." },
  { course: "BSc Nursing",                                   faculty: "Health Sciences",      university: "UKZN",   aps: 24, notes: "Life Sciences and English recommended." },
  { course: "BCom (General)",                                faculty: "Commerce",             university: "UJ",     aps: 26, mathsRequired: 50, notes: "Maths minimum 50%." },
  { course: "BSc Information Technology",                    faculty: "Science & Technology", university: "UJ",     aps: 26, mathsRequired: 60, notes: "Maths minimum 60%." },
  { course: "Bachelor of Education (BEd)",                   faculty: "Education",            university: "UFS",    aps: 26, notes: "Good language proficiency required." },
  { course: "BSc Agriculture",                               faculty: "Natural Sciences",     university: "UFS",    aps: 26, mathsRequired: 50, notes: "Maths or Maths Literacy accepted." },
  { course: "BCom (Economics)",                              faculty: "Commerce",             university: "SU",     aps: 34, mathsRequired: 60, notes: "Maths minimum 60%." },
  { course: "BEng (Computer Engineering)",                   faculty: "Engineering",          university: "CPUT",   aps: 26, mathsRequired: 60, notes: "Maths minimum 60%, Physical Sciences recommended." },
  { course: "National Diploma (Engineering)",                faculty: "Engineering",          university: "TUT",    aps: 20, mathsRequired: 50, notes: "Maths minimum 50%." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function calculateAPS(subjects: typeof DEFAULT_SUBJECTS): number {
  return subjects.reduce((sum, s) => {
    const mark = Number(s.mark);
    if (!mark) return sum;
    const pts = markToAPS(mark);
    return sum + (s.isLO ? Math.min(pts, 4) : pts);
  }, 0);
}

function getMathsMark(subjects: typeof DEFAULT_SUBJECTS): number {
  return Number(subjects.find(s => s.id === "maths")?.mark) || 0;
}

function eligibilityLabel(aps: number, minAPS: number): "qualify" | "close" | "notYet" {
  if (aps >= minAPS) return "qualify";
  if (aps >= minAPS - 3) return "close";
  return "notYet";
}

// ─── Main component ──────────────────────────────────────────────────────────
const APSCalculator = () => {
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [whatIfSubject, setWhatIfSubject] = useState("maths");
  const [whatIfMark, setWhatIfMark] = useState<number | "">(75);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [filterFaculty, setFilterFaculty] = useState<string>("All");

  const aps = calculateAPS(subjects);
  const mathsMark = getMathsMark(subjects);

  // What-if calculation
  const whatIfSubjects = subjects.map(s =>
    s.id === whatIfSubject ? { ...s, mark: whatIfMark || s.mark } : s
  );
  const whatIfAPS = calculateAPS(whatIfSubjects);
  const whatIfDiff = whatIfAPS - aps;

  const updateMark = useCallback((id: string, value: string) => {
    const num = value === "" ? "" : Math.min(100, Math.max(0, Number(value)));
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, mark: num } : s));
  }, []);

  // Share text for WhatsApp
  const qualifyingUnivs = UNIVERSITIES.filter(u => aps >= u.minAPS).map(u => u.shortName).join(", ");
  const shareText = encodeURIComponent(
    `🎓 My APS Score: ${aps}/42\n\nI qualify for: ${qualifyingUnivs || "Keep studying — you're getting there!"}\n\nCalculate yours at: https://studybuddy.works/aps-calculator`
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  const handlePrint = () => window.print();

  const faculties = ["All", ...Array.from(new Set(COURSE_REQUIREMENTS.map(c => c.faculty))).sort()];
  const filteredCourses = COURSE_REQUIREMENTS.filter(c => filterFaculty === "All" || c.faculty === filterFaculty);
  const displayedCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>APS Calculator 2025 | South African University Eligibility Checker | StudyBuddy</title>
        <meta name="description" content="Calculate your APS score instantly. See which South African universities you qualify for, check course-specific requirements, and explore what-if scenarios to improve your results." />
        <meta name="keywords" content="APS calculator, APS score South Africa, university eligibility checker, NSC APS, UCT APS, Wits APS, university requirements South Africa" />
        <meta property="og:title" content="APS Calculator 2025 | University Eligibility Checker" />
        <meta property="og:description" content="Calculate your APS and see which universities you qualify for. Course requirements, what-if scenarios, WhatsApp share." />
        <meta property="og:url" content="https://studybuddy.works/aps-calculator" />
        <link rel="canonical" href="https://studybuddy.works/aps-calculator" />
      </Helmet>

      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          .print-section { page-break-inside: avoid; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Hero */}
        <section className="py-12 md:py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Free APS Calculator 2025
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              South African APS Calculator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Enter your NSC subject marks to instantly see your APS score, which universities you qualify for, and what happens if you improve a subject.
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Real-time calculation</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> 15 universities</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Course requirements</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> WhatsApp share</span>
            </div>
          </div>
        </section>

        {/* Main calculator + results */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* ── Subject marks input ── */}
            <Card className="print-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Enter Your Subject Marks
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Enter your percentage mark (0–100) for each subject. Leave blank to skip.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjects.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <Label htmlFor={s.id} className="w-44 text-sm shrink-0">
                      {s.label}
                      {s.isLO && <span className="text-xs text-muted-foreground ml-1">(max 4 pts)</span>}
                    </Label>
                    <Input
                      id={s.id}
                      type="number"
                      min={0}
                      max={100}
                      placeholder="%"
                      value={s.mark}
                      onChange={e => updateMark(s.id, e.target.value)}
                      className="w-24 text-center"
                    />
                    {s.mark !== "" && (
                      <Badge variant="secondary" className="shrink-0">
                        {markToAPS(Number(s.mark))} pts
                      </Badge>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total APS Score</span>
                  <span className="text-3xl font-bold text-primary">{aps} <span className="text-base text-muted-foreground">/ 42</span></span>
                </div>

                {/* APS band description */}
                {aps > 0 && (
                  <div className={`p-3 rounded-lg text-sm ${
                    aps >= 36 ? "bg-green-50 text-green-800 border border-green-200" :
                    aps >= 28 ? "bg-blue-50 text-blue-800 border border-blue-200" :
                    aps >= 20 ? "bg-yellow-50 text-yellow-800 border border-yellow-200" :
                    "bg-orange-50 text-orange-800 border border-orange-200"
                  }`}>
                    {aps >= 36 ? "🏆 Excellent! You qualify for top research universities." :
                     aps >= 28 ? "✅ Good score — many universities and courses are open to you." :
                     aps >= 20 ? "📚 Fair score — several universities accept you. Focus on improving key subjects." :
                     "💪 Keep pushing! Improving 2–3 subjects can make a big difference."}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── University eligibility ── */}
            <Card className="print-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  University Eligibility
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {aps > 0
                    ? `With your APS of ${aps}, here is where you stand:`
                    : "Enter your marks above to see which universities you qualify for."}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                  {UNIVERSITIES.map(u => {
                    const status = aps > 0 ? eligibilityLabel(aps, u.minAPS) : null;
                    return (
                      <div
                        key={u.shortName}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                          status === "qualify" ? "bg-green-50 border-green-200" :
                          status === "close"   ? "bg-yellow-50 border-yellow-200" :
                          status === "notYet"  ? "bg-red-50 border-red-100 opacity-60" :
                          "border-border"
                        }`}
                      >
                        {status === "qualify" && <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />}
                        {status === "close"   && <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />}
                        {status === "notYet"  && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                        {!status              && <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">{u.shortName}</span>
                            <span className="text-xs text-muted-foreground truncate hidden sm:block">{u.name}</span>
                          </div>
                          {status === "close" && (
                            <p className="text-xs text-yellow-700 mt-0.5">
                              {u.minAPS - aps} point{u.minAPS - aps !== 1 ? "s" : ""} short — almost there!
                            </p>
                          )}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground shrink-0">min {u.minAPS}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Share buttons */}
                {aps > 0 && (
                  <div className="flex gap-2 mt-4 no-print">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => window.open(whatsappUrl, "_blank")}
                    >
                      <Share2 className="w-4 h-4" />
                      Share on WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={handlePrint}
                    >
                      <Download className="w-4 h-4" />
                      Save / Print
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What-if scenarios */}
        <section className="bg-white py-12 no-print">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-3">
                <TrendingUp className="w-4 h-4" />
                What-If Simulator
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                "What if I improve a subject?"
              </h2>
              <p className="text-muted-foreground">
                See how boosting one subject changes your APS and university options.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Which subject would you improve?</Label>
                      <select
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                        value={whatIfSubject}
                        onChange={e => setWhatIfSubject(e.target.value)}
                      >
                        {subjects.map(s => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">
                        Improved mark: <span className="text-primary font-bold">{whatIfMark}%</span>
                      </Label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={whatIfMark || 0}
                        onChange={e => setWhatIfMark(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span><span>50%</span><span>100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Your APS would become</p>
                      <p className="text-4xl font-bold text-primary">{whatIfAPS}</p>
                      <p className="text-sm text-muted-foreground">/ 42</p>
                    </div>
                    {whatIfDiff !== 0 && (
                      <div className={`text-center text-sm font-semibold ${whatIfDiff > 0 ? "text-green-700" : "text-red-600"}`}>
                        {whatIfDiff > 0 ? `▲ +${whatIfDiff} points` : `▼ ${whatIfDiff} points`}
                      </div>
                    )}
                    {whatIfDiff > 0 && (
                      <p className="text-xs text-muted-foreground text-center">
                        {UNIVERSITIES.filter(u => whatIfAPS >= u.minAPS && aps < u.minAPS).length > 0
                          ? `🎉 You'd unlock ${UNIVERSITIES.filter(u => whatIfAPS >= u.minAPS && aps < u.minAPS).map(u => u.shortName).join(", ")}!`
                          : "Keep improving to unlock more universities."}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Course-specific requirements */}
        <section className="py-12 container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Course-Specific Requirements
            </h2>
            <p className="text-muted-foreground">
              Each programme has its own APS and subject minimums. Check what your dream course requires.
            </p>
          </div>

          {/* Faculty filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {faculties.map(f => (
              <button
                key={f}
                onClick={() => setFilterFaculty(f)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  filterFaculty === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {displayedCourses.map((c, i) => {
              const qualifies = aps >= c.aps && (!c.mathsRequired || mathsMark >= c.mathsRequired);
              return (
                <Card key={i} className={`border transition-colors ${qualifies && aps > 0 ? "border-green-300 bg-green-50/30" : ""}`}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-sm leading-tight">{c.course}</h3>
                        <p className="text-xs text-muted-foreground">{c.university} · {c.faculty}</p>
                      </div>
                      {aps > 0 && (
                        <Badge variant={qualifies ? "default" : "secondary"} className="shrink-0 text-xs">
                          {qualifies ? "✓ You qualify" : "Not yet"}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                      <span className="font-medium text-foreground">APS: {c.aps}+</span>
                      {c.mathsRequired && <span>Maths: {c.mathsRequired}%+</span>}
                      {c.physicsRequired && <span>Physics: {c.physicsRequired}%+</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{c.notes}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredCourses.length > 6 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAllCourses(!showAllCourses)}
                className="gap-2"
              >
                {showAllCourses ? (<><ChevronUp className="w-4 h-4" /> Show less</>) : (<><ChevronDown className="w-4 h-4" /> Show all {filteredCourses.length} courses</>)}
              </Button>
            </div>
          )}
        </section>

        {/* How APS is calculated */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              How Is Your APS Calculated?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">NSC APS Scoring Scale</h3>
                <div className="space-y-2">
                  {[
                    { range: "80 – 100%", pts: 7, level: "Outstanding" },
                    { range: "70 – 79%",  pts: 6, level: "Meritorious" },
                    { range: "60 – 69%",  pts: 5, level: "Substantial" },
                    { range: "50 – 59%",  pts: 4, level: "Adequate" },
                    { range: "40 – 49%",  pts: 3, level: "Moderate" },
                    { range: "30 – 39%",  pts: 2, level: "Elementary" },
                    { range: "0 – 29%",   pts: 1, level: "Not Achieved" },
                  ].map(r => (
                    <div key={r.pts} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                      <span className="w-24 text-sm font-medium text-muted-foreground">{r.range}</span>
                      <Badge variant="secondary" className="w-16 justify-center">{r.pts} points</Badge>
                      <span className="text-sm text-muted-foreground">{r.level}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Rules to Remember</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><Info className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Your APS is the <strong>sum of all subject points</strong> (usually 7 subjects).</span></li>
                    <li className="flex gap-2"><Info className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Life Orientation contributes a <strong>maximum of 4 APS points</strong> regardless of your mark.</span></li>
                    <li className="flex gap-2"><Info className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Maximum possible APS is <strong>42 points</strong> (6 subjects × 7 + LO 4).</span></li>
                    <li className="flex gap-2"><Info className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Some universities calculate APS from your <strong>best 6 subjects</strong>, excluding LO.</span></li>
                    <li className="flex gap-2"><Info className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Always check each university's own <strong>faculty-specific requirements</strong> — a minimum APS is just the starting point.</span></li>
                    <li className="flex gap-2"><Info className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>Many courses require a <strong>minimum percentage in Mathematics</strong> and/or Physical Sciences.</span></li>
                  </ul>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-foreground mb-1">Example Calculation</p>
                  <p className="text-xs text-muted-foreground">
                    English Home Language 72% (6) + Afrikaans 65% (5) + Maths 78% (6) + Physics 68% (5) + Chemistry 74% (6) + History 55% (4) + Life Orientation 80% (4 capped) = <strong>36 APS</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* University profiles */}
        <section className="py-12 container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            South African University Profiles
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Get to know the universities. Minimum APS requirements vary by faculty — check each institution's prospectus for your specific programme.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {UNIVERSITIES.map(u => (
              <Card key={u.shortName} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary">{u.shortName}</span>
                    <Badge variant={u.type === "research" ? "default" : u.type === "open" ? "secondary" : "outline"} className="text-xs capitalize">
                      {u.type}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-tight mb-1">{u.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{u.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Min APS: <span className="text-primary">{u.minAPS}</span></span>
                    {aps > 0 && (
                      <Badge variant={aps >= u.minAPS ? "default" : "secondary"} className="text-xs">
                        {aps >= u.minAPS ? "You qualify" : `Need ${u.minAPS - aps} more`}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips to improve APS */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              How to Improve Your APS Score
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Even a 3-point increase in APS can unlock an entirely new set of universities and faculties. Here is how to get there.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Focus on your weakest subject first", body: "Improving a subject from 40% (3 pts) to 50% (4 pts) gains 1 APS point. A jump from 60% to 70% adds another. Identify the subject with the largest potential gain." },
                { title: "Maths is the highest-value subject", body: "Most high-APS programmes require strong Mathematics. A 10% improvement in Maths can be the difference between qualifying and not — especially for Engineering, Science, and Commerce." },
                { title: "Don't neglect your languages", body: "Home Language and First Additional Language are compulsory APS subjects. Scoring 60%+ in both adds up to 10 APS points and opens the door to language-sensitive programmes like Law and Education." },
                { title: "Use past papers to practise", body: "Exam technique and time management are learnable skills. Download NSC past papers and practise under timed conditions. StudyBuddy's AI tutor can explain mark schemes and work through solutions with you." },
                { title: "Get help early, not the night before", body: "Consistent weekly study — even 30 minutes a day — compounds dramatically. Start working on weak subjects at least 8 weeks before exams for maximum impact." },
                { title: "Understand what the examiner wants", body: "Many marks are lost through poor exam structure rather than lack of knowledge. Study the National Senior Certificate examiner's reports to see exactly where marks are awarded." },
              ].map((tip, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "What is a good APS score in South Africa?", a: "An APS of 30+ is generally considered a good score and opens doors to most South African universities. An APS of 36+ qualifies you for the most competitive programmes at UCT, Wits, and Stellenbosch. However, every faculty and programme sets its own minimum, so always check the specific course requirements." },
              { q: "Does Life Orientation count in my APS?", a: "Yes — Life Orientation contributes to your total APS but is capped at 4 points regardless of your actual percentage. Some universities also have an APS calculation that excludes LO entirely, so confirm which method a specific institution uses." },
              { q: "Is this calculator official?", a: "This calculator uses the standard NSC APS scoring scale as defined by the Department of Basic Education. However, university admission requirements change annually and vary by faculty, so always verify with the institution directly before applying." },
              { q: "What if my APS is below the minimum?", a: "You still have options. UNISA offers distance learning with a minimum APS of 15. Many universities also offer extended curriculum programmes (ECP) or alternative access routes for students who narrowly miss the standard APS. Use the What-If Simulator above to identify which subjects, if improved, would help you the most." },
              { q: "Can I improve my APS after matric?", a: "Yes. If you are dissatisfied with your NSC results, you can rewrite up to 6 subjects in subsequent years. Many students improve their APS significantly through a gap year of focused study, sometimes using AI tutoring platforms like StudyBuddy for affordable, flexible preparation." },
              { q: "What is NBT and does it affect APS?", a: "The National Benchmark Test (NBT) is a separate assessment used by some universities (notably UCT and Wits) in addition to APS. It tests Academic Literacy, Quantitative Literacy, and Mathematics. A strong NBT can supplement a borderline APS score at institutions that use it." },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-white no-print">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need help improving your marks?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              StudyBuddy's AI tutor is available 24/7, CAPS-aligned, and costs less than a single extra lesson — perfect for boosting the subjects that matter most for your APS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/students">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/courses">Explore Course Requirements</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default APSCalculator;
