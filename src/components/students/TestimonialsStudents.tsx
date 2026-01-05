import { Star } from "lucide-react";
import { studentsConfig } from "@/config/students";

const TestimonialsStudents = () => {
  const { testimonials, parentTestimonials } = studentsConfig;

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real Students,{" "}
            <span className="text-gradient">Real Results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how StudyBuddy is helping South African students improve their grades and confidence.
          </p>
        </div>

        {/* Student Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                <div className="text-sm text-accent font-medium">{testimonial.school}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Parent Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            What Parents Say
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {parentTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow duration-300"
              >
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.school}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Join thousands of South African students who are already improving their grades
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">12,000+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">45%</div>
              <div className="text-sm text-muted-foreground">Avg. Grade Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">4.9/5</div>
              <div className="text-sm text-muted-foreground">Student Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStudents;
