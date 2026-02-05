import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { provinces, getTotalLocationCount } from "@/data/southAfricaLocations";
import { MapPin } from "lucide-react";

const LocationsDirectory = () => {
  const totalLocations = getTotalLocationCount();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `AI Tutoring in ${totalLocations}+ South African Locations`,
    "description": "Complete directory of StudyBuddy Works AI tutoring locations across South Africa. Find CAPS-aligned tutoring in your town or suburb.",
    "url": "https://studybuddy.works/locations"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Tutor Locations - {totalLocations}+ Towns & Suburbs in South Africa | StudyBuddy Works</title>
        <meta name="description" content={`Find AI tutoring in ${totalLocations}+ locations across South Africa. CAPS-aligned help for Grade 1-12 students in every province. Browse all towns and suburbs.`} />
        <meta property="og:title" content={`AI Tutor in ${totalLocations}+ SA Locations | StudyBuddy Works`} />
        <meta property="og:description" content="Complete directory of AI tutoring locations across South Africa" />
        <meta property="og:url" content="https://studybuddy.works/locations" />
        <link rel="canonical" href="https://studybuddy.works/locations" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      
      <Header />
      
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            AI Tutoring in {totalLocations}+ South African Locations
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Find StudyBuddy Works AI tutoring in your town or suburb. CAPS-aligned learning for every student.
          </p>

          {provinces.map((province) => (
            <div key={province.slug} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl font-bold">{province.name}</h2>
                <span className="text-sm text-muted-foreground">({province.locations.length} locations)</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {province.locations.map((location) => (
                  <Link
                    key={location.slug}
                    to={`/tutor/${location.slug}`}
                    className="text-sm px-3 py-2 rounded-lg bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-colors truncate"
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationsDirectory;
