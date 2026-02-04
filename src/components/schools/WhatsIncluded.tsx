import { Globe, Palette, UserCircle, MessageSquare, LayoutDashboard, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      description: "School logo, custom color scheme, and branded design throughout the entire platform",
      highlight: "Your colors, your logo"
    },
    {
      icon: UserCircle,
      title: "Branded Student Login",
      description: "Custom login page featuring your school's branding - students see your school, not StudyBuddy",
      highlight: "White-labeled login"
    },
    {
      icon: MessageSquare,
      title: "Personalized AI Tutors",
      description: "Each student gets their own AI tutor branded with your school's identity and values",
      highlight: "Per-student customization"
    },
    {
      icon: LayoutDashboard,
      title: "School Admin Dashboard",
      description: "Comprehensive dashboard to manage students, monitor usage, and track learning progress",
      highlight: "Full admin control"
    },
    {
      icon: HeadphonesIcon,
      title: "Student Tech Support",
      description: "We handle all student technical support - you focus on billing and administration",
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
              What's Included in Your Branded Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to launch your school's own AI tutoring platform in 14 days
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
              <h3 className="text-lg font-bold text-foreground mb-3">You Handle</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Student billing & payment collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>School administration & enrollment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Setting your own student pricing (R200+ minimum)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Keeping the profit margin</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50/30 border-green-200">
              <h3 className="text-lg font-bold text-foreground mb-3">We Handle</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>All technical infrastructure & hosting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Student technical support (24/7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>AI tutor technology & updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Platform maintenance & security</span>
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
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
