import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getInitials, teamMembers } from "@/data/team";

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="team"
      className={`py-20 md:py-28 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-primary text-sm font-medium mb-4">
            <Users size={16} />
            Our Team
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Young People Behind <span className="text-primary">VSS</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A youth-led team from Katsina, Nigeria working to keep children and young people safe.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="group text-center w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-soft mb-3">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-pink flex items-center justify-center text-white font-display font-bold text-3xl md:text-4xl">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm md:text-base leading-tight">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link to="/team" className="inline-flex items-center gap-2">
              Meet the full team
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
