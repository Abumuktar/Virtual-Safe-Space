import { CheckCircle, Shield, MessageCircle, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  { value: "10,000+", label: "Youth Protected", icon: Shield },
  { value: "95%", label: "Cases Resolved", icon: CheckCircle },
  { value: "24/7", label: "Support Available", icon: MessageCircle },
  { value: "50+", label: "Partner Organizations", icon: Users },
];

const testimonials = [
  {
    quote: "VSS gave me the courage to speak up. For the first time, I felt truly heard and protected.",
    author: "Sarah, 16",
    location: "Nairobi, Kenya",
  },
  {
    quote: "The confidential reporting system helped me get the help I needed without fear of judgment.",
    author: "Amara, 14",
    location: "Lagos, Nigeria",
  },
  {
    quote: "Thanks to VSS, my school now has proper anti-harassment policies. Many students feel safer now.",
    author: "Grace, 17",
    location: "Kampala, Uganda",
  },
];

const StatsSection = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-24 bg-gradient-to-b from-background to-pink-light/30">
      <div className="container">
        {/* Stats Grid */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className={`border-0 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1 bg-card ${
                statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-pink/10 flex items-center justify-center">
                  <stat.icon size={24} className="text-pink" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div 
          ref={testimonialsRef}
          className={`transition-all duration-700 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award size={16} />
              <span>Real Stories, Real Impact</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Voices of <span className="text-gradient">Hope</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`border-0 shadow-soft hover:shadow-card transition-all duration-500 group ${
                  testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-pink/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-primary flex items-center justify-center text-white font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
