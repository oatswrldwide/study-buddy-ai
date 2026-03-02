import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { provinces, getTotalLocationCount } from "@/data/southAfricaLocations";
import { MapPin, BookOpen, School } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationsDirectory = () => {
  const totalLocations = getTotalLocationCount();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Tutoring Locations in South Africa | {totalLocations}+ Towns & Cities | StudyBuddy Works</title>
        <meta name="description" content={`Find CAPS-aligned AI tutoring in ${totalLocations}+ South African towns and cities. StudyBuddy Works covers all 9 provinces — from Johannesburg to Cape Town, Durban to Pretoria and beyond.`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://studybuddy.works/locations" />
        <meta property="og:title" content={`AI Tutoring Locations in South Africa | ${totalLocations}+ Towns & Cities | StudyBuddy Works`} />
        <meta property="og:description" content={`Find CAPS-aligned AI tutoring in ${totalLocations}+ South African towns and cities across all 9 provinces.`} />
        <meta property="og:url" content="https://studybuddy.works/locations" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://studybuddy.works/" },
            { "@type": "ListItem", position: 2, name: "Locations", item: "https://studybuddy.works/locations" },
          ],
        })}</script>
      </Helmet>
      <Header />
      
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            AI Tutoring in {totalLocations}+ South African Locations
          </h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find StudyBuddy Works AI tutoring in your town or suburb. CAPS-aligned learning for every student.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Button variant="outline" size="sm" asChild>
              <Link to="/students">
                <BookOpen className="h-4 w-4 mr-2" />
                Get AI Tutoring
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/resources">📚 Study Resources</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/schools">
                <School className="h-4 w-4 mr-2" />
                For Schools
              </Link>
            </Button>
          </div>

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
