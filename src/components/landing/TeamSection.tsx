import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import TeamShowcase from "@/components/team/TeamShowcase";

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="team"
      className={`py-16 md:py-24 bg-muted/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-primary text-sm font-medium mb-4">
              <Users size={16} />
              Our Team
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              The People Behind <span className="text-primary">VSS</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A youth-led team from Katsina, Nigeria working to keep children and young people safe.
            </p>
          </div>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0"
          >
            Meet the full team
            <ArrowRight size={18} />
          </Link>
        </div>

        <TeamShowcase />
      </div>
    </section>
  );
};

export default TeamSection;
