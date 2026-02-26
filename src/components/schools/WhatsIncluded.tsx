import { Globe, Palette, UserCircle, MessageSquare, LayoutDashboard, HeadphonesIcon, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhatsIncluded = () => {
  const features = [
    {
      icon: Globe,
      title: "Custom Domain",
      description: "Your own branded domain (e.g., tutoring.yourschool.co.za) that reinforces your school's identity",
      highlight: "yourschool.co.za"
    },
    {
      icon: Palette,
      title: "Complete Branding",
      description: "School logo, custom colour scheme, and branded design throughout the entire platform",
      highlight: "Your colours, your logo"
    },
    {
      icon: UserCircle,
      title: "Branded Student Login",
      description: "Custom login page featuring your school's branding — students experience your school, not StudyBuddy",
      highlight: "White-labelled login"
    },
    {
      icon: MessageSquare,
      title: "CAPS-Aligned AI Tutors",
      description: "Each student gets a personal AI tutor aligned with the South African CAPS and IEB curriculum",
      highlight: "CAPS & IEB aligned"
    },
    {
      icon: LayoutDashboard,
      title: "School Admin Dashboard",
      description: "Comprehensive dashboard to manage students, monitor usage, and track academic progress",
      highlight: "Full admin visibility"
    },
    {
      icon: Shield,
      title: "POPIA Compliance & Security",
      description: "Student data is encrypted and managed in full compliance with South Africa's POPIA legislation",
      highlight: "Enterprise-grade security"
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Technical Support",
      description: "We handle all student-facing technical queries so your staff can focus on education and administration",
      highlight: "Support included"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
              <Palette className="w-4 h-4" />
              <span>Complete White-Label Solution</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything Your School Needs — Fully Managed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete, enterprise-ready AI tutoring platform deployed under your school's brand in 14 days
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium">
                    {feature.highlight}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-orange-50/30 border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-3">School's Responsibilities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Annual technology levy collection &amp; student billing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Student enrolment &amp; school administration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Setting your school's annual technology levy (R200+ recommended)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Governing body approval &amp; parent communication</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50/30 border-green-200">
              <h3 className="text-lg font-bold text-foreground mb-3">Our Responsibilities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>All technical infrastructure, hosting &amp; security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Student technical support (24/7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>AI tutoring technology, CAPS/IEB updates &amp; improvements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>POPIA compliance, platform maintenance &amp; SLA</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Timeline */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-orange-50/30 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Launch Timeline</h3>
                <p className="text-muted-foreground">From signup to live branded platform</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-1">
                    1
                  </div>
                  <p className="text-xs text-muted-foreground">Sign up</p>
                </div>
                <div className="w-8 h-0.5 bg-primary/30"></div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-1">
                    7
                  </div>
                  <p className="text-xs text-muted-foreground">Branding</p>
                </div>
                <div className="w-8 h-0.5 bg-primary/30"></div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-1">
                    14
                  </div>
                  <p className="text-xs text-muted-foreground">Go Live!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">14 Days</p>
                <p className="text-sm text-muted-foreground">Average launch time</p>
              </div>
            </div>
          </div>

          {/* Cross-promotion */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Want to see how students will experience the platform?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/students">View Student Experience</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/locations">Find Tutors in Your Area</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/resources">Browse Study Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
