import { Star } from "lucide-react";
import { schoolsConfig } from "@/config/schools";

const TestimonialsSchools = () => {
  const { testimonials, trustLogos } = schoolsConfig;

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by{" "}
            <span className="text-gradient">South African Educators</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from schools that have transformed their approach to AI in education.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                <div className="text-sm text-primary font-medium">{testimonial.school}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Logos */}
        <div>
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wide">
            Trusted by Leading South African Schools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustLogos.map((name, index) => (
              <div
                key={index}
                className="text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSchools;
