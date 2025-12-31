import { BookOpen, AlertTriangle, MessageCircle, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const focusAreas = [
  {
    icon: BookOpen,
    title: "Child Education",
    description: "Empowering young minds through accessible learning resources and educational advocacy.",
    color: "primary",
    bgLight: "teal-light",
  },
  {
    icon: AlertTriangle,
    title: "Abuse & Harassment Awareness",
    description: "Breaking the silence by raising awareness and providing vital information on recognizing abuse.",
    color: "pink",
    bgLight: "pink-light",
  },
  {
    icon: MessageCircle,
    title: "Safe Expression Platforms",
    description: "Creating secure spaces where youth can share their experiences without fear of judgment.",
    color: "accent",
    bgLight: "purple-light",
  },
  {
    icon: Sparkles,
    title: "Empowerment Through Creativity",
    description: "Nurturing talents and self-expression as pathways to healing and personal growth.",
    color: "primary",
    bgLight: "teal-light",
  },
];

const FocusAreasSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      id="focus" 
      className={`py-20 md:py-28 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-light text-pink text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>What We Do</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Core Focus Areas
          </h2>
          <p className="text-lg text-muted-foreground">
            Our initiatives are designed to create a safer, more supportive world for every child.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {focusAreas.map((area, index) => (
            <div
              key={area.title}
              className={`group relative bg-card rounded-3xl shadow-soft p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-card ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-${area.bgLight} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <area.icon size={28} className={`text-${area.color}`} />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {area.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {area.description}
              </p>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-${area.bgLight} rounded-bl-3xl rounded-tr-3xl opacity-50 group-hover:opacity-80 transition-opacity`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreasSection;
