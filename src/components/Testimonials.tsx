import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "StudyBuddy Works gave us complete visibility into AI usage. Now we can embrace AI confidently while maintaining academic integrity.",
    author: "Dr. Sarah Chen",
    role: "Superintendent",
    school: "Lincoln Unified School District",
    rating: 5,
  },
  {
    quote: "The teacher insights are incredible. I can finally see which concepts my students struggle with and adjust my teaching accordingly.",
    author: "Michael Torres",
    role: "High School Math Teacher",
    school: "Riverside Academy",
    rating: 5,
  },
  {
    quote: "It's like having a tutor that actually helps me understand, not just gives me answers. My grades have improved so much!",
    author: "Emma Johnson",
    role: "11th Grade Student",
    school: "Westfield High School",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Loved by{" "}
            <span className="text-gradient">Educators & Students</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from schools that have transformed their approach to AI in education.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="p-8 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
                <div className="text-sm text-primary font-medium">
                  {testimonial.school}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Logos */}
        <div className="mt-20">
          <p className="text-center text-sm text-muted-foreground mb-8">
            TRUSTED BY LEADING EDUCATIONAL INSTITUTIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
            {["Stanford", "MIT", "Harvard", "Berkeley", "Yale"].map((name) => (
              <div
                key={name}
                className="text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
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

export default Testimonials;
