import { studentsConfig } from "@/config/students";

const StatsStudents = () => {
  const { stats } = studentsConfig;

  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-1 text-primary-foreground/90">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/70">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStudents;
