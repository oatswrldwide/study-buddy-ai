import { useState, useCallback } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Calculator,
  GraduationCap,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  ArrowLeft,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Award,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourseById, COURSES } from "@/data/courseRequirements";
import {
  BURSARIES,
  BURSARY_FIELD_SLUGS,
  COURSE_CATEGORY_TO_BURSARY_FIELD,
} from "@/data/bursaries";

const WHATSAPP_NUMBER = "27680187300";

// ─── APS helpers (duplicated to keep this page self-contained) ────────────────
const DEFAULT_SUBJECTS = [
  { id: "home_lang",  label: "Home Language",             mark: "" as string | number, isLO: false },
  { id: "first_add",  label: "First Additional Language", mark: "" as string | number, isLO: false },
  { id: "maths",      label: "Mathematics",               mark: "" as string | number, isLO: false },
  { id: "subject4",   label: "Subject 4",                 mark: "" as string | number, isLO: false },
  { id: "subject5",   label: "Subject 5",                 mark: "" as string | number, isLO: false },
  { id: "subject6",   label: "Subject 6",                 mark: "" as string | number, isLO: false },
  { id: "lo",         label: "Life Orientation",          mark: "" as string | number, isLO: true  },
];

function markToAPS(mark: number): number {
  if (mark >= 80) return 7;
  if (mark >= 70) return 6;
  if (mark >= 60) return 5;
  if (mark >= 50) return 4;
  if (mark >= 40) return 3;
  if (mark >= 30) return 2;
  return 1;
}

function calculateAPS(subjects: typeof DEFAULT_SUBJECTS): number {
  return subjects.reduce((sum, s) => {
    const mark = Number(s.mark);
    if (!mark) return sum;
    const pts = markToAPS(mark);
    return sum + (s.isLO ? Math.min(pts, 4) : pts);
  }, 0);
}

function eligibilityLabel(aps: number, minAPS: number): "qualify" | "close" | "notYet" {
  if (aps >= minAPS) return "qualify";
  if (aps >= minAPS - 3) return "close";
  return "notYet";
}

// ─── Fee colour helper ────────────────────────────────────────────────────────
function feeColour(fees: string): string {
  const low = parseInt(fees.replace(/[^0-9]/g, ""), 10);
  if (low >= 70000) return "text-red-600";
  if (low >= 50000) return "text-yellow-600";
  return "text-green-700";
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId ?? "");

  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [showCalculator, setShowCalculator] = useState(false);
  const aps = calculateAPS(subjects);

  const updateMark = useCallback((id: string, value: string) => {
    const num = value === "" ? "" : Math.min(100, Math.max(0, Number(value)));
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, mark: num } : s));
  }, []);

  if (!course) return <Navigate to="/courses" replace />;

  // Sort universities: highest APS first
  const sortedUniversities = [...course.universities].sort((a, b) => b.aps - a.aps);

  // Related courses (same category, different id)
  const relatedCourses = COURSES.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

  // Bursaries for this course's field
  const bursaryField = COURSE_CATEGORY_TO_BURSARY_FIELD[course.category];
  const fieldBursaries = bursaryField
    ? BURSARIES.filter((b) => b.field === bursaryField).slice(0, 3)
    : [];
  const bursaryFieldSlug = bursaryField ? BURSARY_FIELD_SLUGS[bursaryField] : null;

  const lowestAPS = Math.min(...course.universities.map(u => u.aps));
  const highestAPS = Math.max(...course.universities.map(u => u.aps));

  return (
    <>
      <Helmet>
        <title>{course.name} Requirements 2025 | APS Scores & Fees at SA Universities</title>
        <meta
          name="description"
          content={`Compare ${course.name} APS requirements, university fees and entry criteria at ${course.universities.length} South African universities. APS range: ${lowestAPS}–${highestAPS}.`}
        />
        <meta
          name="keywords"
          content={`${course.name} APS, ${course.name} requirements South Africa, ${course.universities.map(u => `${u.shortName} ${course.name}`).join(", ")}`}
        />
        <meta property="og:title" content={`${course.name} Requirements 2025 | SA Universities`} />
        <meta
          property="og:description"
          content={`APS range ${lowestAPS}–${highestAPS}. Compare requirements and fees at ${course.universities.length} South African universities.`}
        />
        <meta property="og:url" content={`https://studybuddy.works/courses/${course.id}`} />
        <link rel="canonical" href={`https://studybuddy.works/courses/${course.id}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
            { "@type": "ListItem", position: 2, name: "Courses", item: "https://studybuddy.works/courses" },
            { "@type": "ListItem", position: 3, name: course.name, item: `https://studybuddy.works/courses/${course.id}` },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.name,
          description: course.description,
          timeRequired: `P${parseInt(course.duration)}Y`,
          educationalLevel: "Undergraduate",
          provider: course.universities.map(u => ({
            "@type": "EducationalOrganization",
            name: u.university,
            url: u.website,
          })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-orange-50/30">
        <Header />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              All Courses
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{course.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-3">{course.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{course.name}</h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">{course.description}</p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border p-4 text-center">
                <div className="text-2xl font-bold text-primary">{lowestAPS}–{highestAPS}</div>
                <div className="text-xs text-muted-foreground mt-1">APS Range</div>
              </div>
              <div className="bg-white rounded-xl border p-4 text-center">
                <div className="text-2xl font-bold text-primary">{course.universities.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Universities</div>
              </div>
              <div className="bg-white rounded-xl border p-4 text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-bold text-primary">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration.split(" ")[0]}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Duration</div>
              </div>
              <div className="bg-white rounded-xl border p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {course.universities.filter(u => u.nsfasEligible).length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">NSFAS Eligible</div>
              </div>
            </div>
          </div>
        </section>

        {/* APS Calculator (collapsible) */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <button
                onClick={() => setShowCalculator(v => !v)}
                className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Check Your Eligibility</div>
                    <div className="text-sm text-muted-foreground">
                      {aps > 0
                        ? `Your APS: ${aps} — see which universities you qualify for below`
                        : "Enter your matric marks to see which universities you qualify for"}
                    </div>
                  </div>
                </div>
                {showCalculator
                  ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                }
              </button>

              {showCalculator && (
                <div className="border-t p-5">
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {subjects.map(s => (
                      <div key={s.id} className="flex items-center gap-3">
                        <Label htmlFor={`cd-${s.id}`} className="w-44 text-sm shrink-0">
                          {s.label}
                          {s.isLO && <span className="text-xs text-muted-foreground ml-1">(max 4 pts)</span>}
                        </Label>
                        <Input
                          id={`cd-${s.id}`}
                          type="number"
                          min={0}
                          max={100}
                          placeholder="%"
                          value={s.mark}
                          onChange={e => updateMark(s.id, e.target.value)}
                          className="w-24 text-center"
                        />
                        {s.mark !== "" && (
                          <Badge variant="secondary" className="shrink-0 text-xs">
                            {markToAPS(Number(s.mark))} pts
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  {aps > 0 && (
                    <div className={`flex items-center justify-between p-4 rounded-lg border ${
                      aps >= highestAPS ? "bg-green-50 border-green-200" :
                      aps >= lowestAPS  ? "bg-blue-50 border-blue-200" :
                      aps >= lowestAPS - 3 ? "bg-yellow-50 border-yellow-200" :
                      "bg-orange-50 border-orange-200"
                    }`}>
                      <div>
                        <div className="font-semibold">Your APS: {aps} / 42</div>
                        <div className="text-sm text-muted-foreground">
                          {aps >= highestAPS
                            ? `🏆 You qualify for ALL ${course.universities.length} universities listed below!`
                            : aps >= lowestAPS
                            ? `✅ You qualify for ${course.universities.filter(u => aps >= u.aps).length} of ${course.universities.length} universities`
                            : aps >= lowestAPS - 3
                            ? `📈 Almost there! You're close to the minimum APS of ${lowestAPS}`
                            : `💪 You need APS ${lowestAPS - aps} more points for the most accessible option`}
                        </div>
                      </div>
                      <Link to="/aps-calculator">
                        <Button variant="outline" size="sm" className="gap-1 text-xs shrink-0">
                          Full Calculator <ExternalLink className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* University Comparison Table */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-1">University Comparison</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Sorted by APS requirement (highest to lowest). Fees are approximate tuition costs for 2024/2025.
            </p>

            <div className="space-y-4">
              {sortedUniversities.map(u => {
                const status = aps > 0 ? eligibilityLabel(aps, u.aps) : null;
                return (
                  <Card
                    key={u.shortName}
                    className={`transition-colors ${
                      status === "qualify" ? "border-green-300 bg-green-50/30" :
                      status === "close"   ? "border-yellow-300 bg-yellow-50/30" :
                      status === "notYet"  ? "opacity-70" :
                      ""
                    }`}
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-start gap-4">
                        {/* Status icon */}
                        <div className="shrink-0 mt-1">
                          {status === "qualify" && <CheckCircle className="w-6 h-6 text-green-600" />}
                          {status === "close"   && <AlertCircle className="w-6 h-6 text-yellow-600" />}
                          {status === "notYet"  && <XCircle    className="w-6 h-6 text-red-400"    />}
                          {!status              && <GraduationCap className="w-6 h-6 text-muted-foreground" />}
                        </div>

                        {/* University info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-bold text-lg">{u.shortName}</span>
                            <span className="text-muted-foreground text-sm">{u.university}</span>
                            {u.nsfasEligible && (
                              <Badge variant="outline" className="text-green-700 border-green-300 text-xs">
                                NSFAS eligible
                              </Badge>
                            )}
                          </div>

                          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            {/* APS */}
                            <div className="bg-white rounded-lg p-3 border text-center">
                              <div className={`text-xl font-bold ${
                                status === "qualify" ? "text-green-600" :
                                status === "close"   ? "text-yellow-600" :
                                status === "notYet"  ? "text-red-500" :
                                "text-primary"
                              }`}>{u.aps}</div>
                              <div className="text-xs text-muted-foreground">Min APS</div>
                            </div>

                            {/* Fees */}
                            <div className="bg-white rounded-lg p-3 border text-center">
                              <div className={`text-sm font-bold ${feeColour(u.annualFees)}`}>
                                {u.annualFees}
                              </div>
                              <div className="text-xs text-muted-foreground">Annual Fees</div>
                            </div>

                            {/* Maths requirement */}
                            {u.mathsRequired && (
                              <div className="bg-white rounded-lg p-3 border text-center">
                                <div className="text-xl font-bold text-purple-600">{u.mathsRequired}%+</div>
                                <div className="text-xs text-muted-foreground">Maths Required</div>
                              </div>
                            )}

                            {/* Application deadline */}
                            {u.applicationDeadline && (
                              <div className="bg-white rounded-lg p-3 border text-center">
                                <div className="text-sm font-bold text-orange-600">{u.applicationDeadline}</div>
                                <div className="text-xs text-muted-foreground">Apply By</div>
                              </div>
                            )}
                          </div>

                          {/* Additional requirements */}
                          {u.additionalRequirements && (
                            <p className="text-xs text-muted-foreground bg-white rounded-lg p-2 border mb-3">
                              📋 {u.additionalRequirements}
                            </p>
                          )}

                          {/* Status message */}
                          {status === "close" && aps > 0 && (
                            <p className="text-xs text-yellow-700 font-medium">
                              You're {u.aps - aps} APS point{u.aps - aps !== 1 ? "s" : ""} short — close!
                            </p>
                          )}

                          {/* Apply link */}
                          <a
                            href={u.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline mt-1"
                          >
                            Visit {u.shortName} admissions <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Subject Recommendations + Careers */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Recommended subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.subjectRecommendations.map(s => (
                    <li key={s} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Careers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.careers.map(c => (
                    <li key={c} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bursaries for this course */}
        {fieldBursaries.length > 0 && bursaryFieldSlug && (
          <section className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Bursaries Available for {course.name} Students
                </h2>
                <Link
                  to={`/bursaries/${bursaryFieldSlug}`}
                  className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 shrink-0"
                >
                  View all {bursaryField} bursaries →
                </Link>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                These bursaries are specifically available for students studying in the {bursaryField} field.
                Apply early — most deadlines are August to October.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {fieldBursaries.map((b) => (
                  <Card key={b.id} className="hover:shadow-md transition-shadow border-2 hover:border-primary/30">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm mb-1">{b.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{b.provider}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{b.value}</p>
                      <a
                        href={b.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                      >
                        Apply / Learn More <ExternalLink className="w-3 h-3" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Bursary application CTA */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-bold text-base mb-1">Need help applying for {bursaryField} bursaries?</p>
                  <p className="text-sm text-muted-foreground">
                    Get personal 1-on-1 WhatsApp assistance — we'll shortlist the right bursaries for you
                    and help you submit complete, winning applications.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I need help applying for ${bursaryField} bursaries for my ${course.name} studies.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white w-full">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp for Help
                    </Button>
                  </a>
                  <Link to={`/bursaries/${bursaryFieldSlug}`}>
                    <Button variant="outline" size="sm" className="gap-1 w-full text-xs">
                      <Award className="w-3.5 h-3.5" />
                      See All {bursaryField} Bursaries
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related courses */}
        {relatedCourses.length > 0 && (
          <section className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Related Courses in {course.category}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedCourses.map(rc => (
                  <Link key={rc.id} to={`/courses/${rc.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30 group h-full">
                      <CardContent className="p-4">
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors mb-1">{rc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          APS {Math.min(...rc.universities.map(u => u.aps))}–{Math.max(...rc.universities.map(u => u.aps))}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white text-center">
            <DollarSign className="w-10 h-10 mx-auto mb-3 opacity-90" />
            <h2 className="text-xl md:text-2xl font-bold mb-2">Need help preparing for your matric exams?</h2>
            <p className="text-white/80 mb-5 max-w-xl mx-auto text-sm">
              StudyBuddy's AI tutor gives 24/7 CAPS-aligned homework help and exam prep for R99/month. Boost your marks and your APS.
            </p>
            <Link to="/students">
              <Button variant="secondary" size="lg" className="gap-2 font-semibold">
                Start Free 7-Day Trial
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CourseDetailPage;
