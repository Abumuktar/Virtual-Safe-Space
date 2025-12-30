import { Eye, Target } from "lucide-react";

const MissionSection = () => {
  return (
    <section id="mission" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Target size={16} />
            <span>Our Purpose</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Vision & Mission
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className="group relative bg-card rounded-3xl shadow-card p-8 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A society where every child is <span className="text-primary font-semibold">safe</span>, <span className="text-pink font-semibold">educated</span>, <span className="text-accent font-semibold">protected</span>, and <span className="text-primary font-semibold">empowered</span>.
              </p>
            </div>
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Mission Card */}
          <div className="group relative bg-card rounded-3xl shadow-card p-8 md:p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Target size={28} className="text-accent" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Promote child education and protection through accessible platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink mt-2 flex-shrink-0" />
                  <span>Raise awareness on abuse and harassment in communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>Support mental and emotional safety for all young people</span>
                </li>
              </ul>
            </div>
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
