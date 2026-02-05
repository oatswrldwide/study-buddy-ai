import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProvinceBySlug, getLocationsByProvince } from "@/data/southAfricaLocations";
import { MapPin } from "lucide-react";

const ProvincePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const province = getProvinceBySlug(slug || "");
  const locations = getLocationsByProvince(slug || "");

  if (!province) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Province not found</h1>
            <Button asChild><Link to="/locations">Browse All Locations</Link></Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 section-padding">
        <div className="container-wide">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            AI Tutoring in <span className="text-gradient">{province.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            StudyBuddy Works provides CAPS-aligned AI tutoring across {locations.length} towns and suburbs in {province.name}. Find your local area below.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            All Locations in {province.name}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {locations.map((location) => (
              <Link
                key={location.slug}
                to={`/tutor/${location.slug}`}
                className="card-elevated p-3 hover:-translate-y-0.5 transition-all group text-center"
              >
                <span className="font-medium group-hover:text-primary transition-colors text-sm">
                  {location.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProvincePage;
