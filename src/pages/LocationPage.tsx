import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getLocationBySlug, getNearbyLocations } from "@/data/southAfricaLocations";
import { BookOpen, CheckCircle, GraduationCap, MapPin, Sparkles } from "lucide-react";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = getLocationBySlug(slug || "");
  const nearbyLocations = getNearbyLocations(slug || "", 6);

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Location not found</h1>
            <Button asChild><Link to="/locations">Browse All Locations</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subjects = ["Mathematics", "Physical Science", "Life Sciences", "English", "Afrikaans", "Accounting", "History", "Geography"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <MapPin className="h-4 w-4" />
              {location.province}
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              AI Tutor in <span className="text-gradient">{location.name}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              Get personalized, CAPS-aligned tutoring for students in {location.name}, {location.province}. Our AI tutor helps with homework, exam prep, and understanding difficult concepts—available 24/7.
            </p>
            
            <Button variant="default" size="xl" onClick={() => navigate("/students")}>
              Start Learning in {location.name}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Why Choose StudyBuddy Works in {location.name}?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "24/7 availability - study whenever you need",
              "Aligned with South African CAPS curriculum",
              "Instant help with homework and assignments",
              "Exam preparation for all grade levels",
              "Personalized learning pace",
              "Covers all subjects from Grade 1-12"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Subjects We Cover in {location.name}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div key={subject} className="card-elevated p-4 text-center">
                <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
                <span className="font-medium">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Also Available Near {location.name}
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nearbyLocations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/tutor/${loc.slug}`}
                className="card-elevated p-4 hover:-translate-y-1 transition-all group"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  AI Tutor in {loc.name}
                </h3>
                <p className="text-sm text-muted-foreground">{loc.province}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Learning in {location.name}?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Join students across {location.province} who are improving their grades with AI tutoring.
          </p>
          <Button variant="accent" size="xl" onClick={() => navigate("/students")}>
            Get Started Free
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
