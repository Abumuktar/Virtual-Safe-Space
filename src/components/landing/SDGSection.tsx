import { Target } from "lucide-react";

const sdgs = [
  {
    number: 3,
    title: "Good Health & Well-Being",
    description: "Ensuring healthy lives and promoting well-being for all ages through mental health support and trauma care",
    color: "bg-[#4c9f38]",
    textColor: "text-[#4c9f38]",
  },
  {
    number: 4,
    title: "Quality Education",
    description: "Creating safe learning environments where every child can thrive without fear of harassment",
    color: "bg-[#c5192d]",
    textColor: "text-[#c5192d]",
  },
  {
    number: 5,
    title: "Gender Equality",
    description: "Empowering girls and women by addressing gender-based violence and discrimination",
    color: "bg-[#ff3a21]",
    textColor: "text-[#ff3a21]",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    description: "Ensuring marginalized youth have equal access to protection and support services",
    color: "bg-[#dd1367]",
    textColor: "text-[#dd1367]",
  },
  {
    number: 16,
    title: "Peace, Justice & Strong Institutions",
    description: "Building accountable institutions that protect children's rights and ensure access to justice",
    color: "bg-[#00689d]",
    textColor: "text-[#00689d]",
  },
];

const SDGSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-pink-light/20 to-background overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 text-pink text-sm font-medium mb-6">
            <Target size={16} />
            <span>UN Sustainable Development Goals</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Aligned with <span className="text-gradient">Global Goals</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our mission directly contributes to achieving these United Nations Sustainable Development Goals, 
            creating a safer world for children and youth across Africa.
          </p>
        </div>

        {/* SDG Cards with prominent numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {sdgs.map((sdg, index) => (
            <div
              key={sdg.number}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* SDG Number Header */}
              <div className={`${sdg.color} p-4 flex items-center justify-center`}>
                <div className="text-center">
                  <span className="text-white/80 text-xs font-medium uppercase tracking-wider">SDG</span>
                  <div className="text-white font-bold text-5xl">{sdg.number}</div>
                </div>
              </div>
              
              {/* Content */}
              <div className="bg-card p-4">
                <h3 className={`font-display font-bold text-sm ${sdg.textColor} mb-2 leading-tight`}>
                  {sdg.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {sdg.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className={`absolute inset-0 ${sdg.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            </div>
          ))}
        </div>

        {/* SDG Wheel and commitment */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-card rounded-3xl shadow-soft">
          <div className="flex-shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/d/df/Sustainable_Development_Goals.png" 
              alt="UN SDG Wheel" 
              className="w-32 h-32 md:w-40 md:h-40"
            />
          </div>
          <div className="text-center md:text-left max-w-xl">
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Committed to the 2030 Agenda
            </h3>
            <p className="text-muted-foreground">
              Virtual Safe Space is proud to contribute to the United Nations 2030 Agenda for Sustainable Development. 
              By protecting youth from harassment and violence, we're building the foundation for a more peaceful, 
              just, and inclusive world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
