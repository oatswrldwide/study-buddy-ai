import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, Sparkles, BookOpen, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | StudyBuddy Works - AI Tutoring for South African Students</title>
        <meta name="description" content="Learn about StudyBuddy Works - our mission, team, and commitment to making quality CAPS-aligned tutoring accessible and affordable for every South African student." />
        <meta property="og:title" content="About StudyBuddy Works" />
        <meta property="og:description" content="Our mission is to make quality, affordable AI tutoring available to every South African student." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://studybuddy.works/about" />
        <link rel="canonical" href="https://studybuddy.works/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Heart className="h-4 w-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Helping Every South African Student Succeed
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              StudyBuddy Works was built on a simple belief: every student deserves access to quality tutoring,
              regardless of where they live or how much money their family has.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-20">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  We exist to close the educational gap in South Africa by making 24/7, CAPS-aligned AI tutoring
                  available to every student—from Johannesburg to the smallest towns in Limpopo.
                </p>
                <p className="text-lg text-muted-foreground">
                  Traditional tutoring costs R350–R500 per hour. That's out of reach for most families.
                  At R99/month, StudyBuddy provides unlimited help at a fraction of the cost.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: GraduationCap, label: "759", sublabel: "Cities & Towns" },
                  { icon: BookOpen, label: "500+", sublabel: "Exam Papers" },
                  { icon: TrendingUp, label: "87%", sublabel: "Pass Rate" },
                ].map((stat, i) => (
                  <div key={i} className="bg-muted/30 rounded-xl p-6 text-center border border-border">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Accessibility",
                  desc: "Quality tutoring should not be a luxury. We've made it affordable for every student across South Africa's 759 towns and cities.",
                },
                {
                  icon: GraduationCap,
                  title: "Curriculum Alignment",
                  desc: "Everything we do is built around CAPS. Our AI tutor understands the South African curriculum from Grade 10 through Matric.",
                },
                {
                  icon: Heart,
                  title: "Student Success",
                  desc: "We measure our success by your results. Our goal is to help South African students pass their subjects and achieve their dreams.",
                },
              ].map((value, i) => (
                <div key={i} className="bg-background rounded-xl p-8 border border-border text-center">
                  <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-16 md:py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">How We Work</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              StudyBuddy combines advanced AI technology with deep knowledge of the South African education system
              to provide personalized 24/7 tutoring support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/students">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/locations">Find Tutors Near You</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Schools */}
        <section className="py-16 md:py-20 bg-primary text-white">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">We Partner With Schools Too</h2>
            <p className="text-lg text-white/90 mb-8">
              StudyBuddy Works offers white-label AI tutoring platforms for schools, giving every learner
              access to a branded, school-specific AI tutor. Used by schools across South Africa.
            </p>
            <Button asChild variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/schools">Learn About School Partnerships</Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
