import { Target, Users, Heart, Scale, BookOpen, Shield } from "lucide-react";

const sdgs = [
  {
    number: 3,
    title: "Good Health & Well-Being",
    description: "Ensuring healthy lives and promoting well-being for all ages",
    icon: Heart,
    color: "bg-green-500",
  },
  {
    number: 4,
    title: "Quality Education",
    description: "Ensuring inclusive and equitable quality education for all",
    icon: BookOpen,
    color: "bg-red-500",
  },
  {
    number: 5,
    title: "Gender Equality",
    description: "Achieving gender equality and empowering all women and girls",
    icon: Users,
    color: "bg-orange-500",
  },
  {
    number: 10,
    title: "Reduced Inequalities",
    description: "Reducing inequality within and among countries",
    icon: Scale,
    color: "bg-pink",
  },
  {
    number: 16,
    title: "Peace, Justice & Strong Institutions",
    description: "Promoting peaceful and inclusive societies for sustainable development",
    icon: Shield,
    color: "bg-blue-600",
  },
];

const SDGSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sdgs.map((sdg, index) => (
            <div
              key={sdg.number}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 ${sdg.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xl">{sdg.number}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {sdg.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {sdg.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <sdg.icon size={24} className="text-primary/20" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft">
            <img 
              src="https://sdgs.un.org/sites/default/files/2020-10/E_SDG_logo_without_UN_emblem_horizontal_WEB.png" 
              alt="UN SDG Logo" 
              className="h-8 w-auto"
            />
            <span className="text-sm text-muted-foreground">
              Committed to the 2030 Agenda
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
