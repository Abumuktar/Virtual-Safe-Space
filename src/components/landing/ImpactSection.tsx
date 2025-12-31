import { TrendingUp, Users, Shield, Heart } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Youth Reached",
    color: "text-primary",
    bgColor: "bg-teal-light",
  },
  {
    icon: Shield,
    value: "500+",
    label: "Cases Resolved",
    color: "text-pink",
    bgColor: "bg-pink-light",
  },
  {
    icon: Heart,
    value: "50+",
    label: "Communities Served",
    color: "text-accent",
    bgColor: "bg-purple-light",
  },
  {
    icon: TrendingUp,
    value: "100%",
    label: "Confidential",
    color: "text-primary",
    bgColor: "bg-teal-light",
  },
];

const ImpactSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Impact</span> Across Africa
          </h2>
          <p className="text-lg text-muted-foreground">
            Together, we are building a safer future for children and youth across the continent.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-background hover:shadow-card transition-all duration-300 animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={28} className={stat.color} />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop" 
              alt="African children in school"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=400&fit=crop" 
              alt="Youth empowerment session"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1529390079861-591f5c2c2531?w=400&h=400&fit=crop" 
              alt="Community support"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=400&fit=crop" 
              alt="Safe learning environment"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
