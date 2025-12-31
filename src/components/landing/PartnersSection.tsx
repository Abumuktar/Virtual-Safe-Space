import { Handshake, Building, School, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const partnerTypes = [
  {
    icon: School,
    title: "Schools & Universities",
    description: "Partner with us to create harassment-free educational environments for your students.",
  },
  {
    icon: Building,
    title: "NGOs & Foundations",
    description: "Join our network of child protection organizations making a difference across Africa.",
  },
  {
    icon: Globe,
    title: "Government Agencies",
    description: "Collaborate with us on policy development and youth protection initiatives.",
  },
  {
    icon: Heart,
    title: "Individual Volunteers",
    description: "Contribute your skills and time to help protect and empower young people.",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Handshake size={16} />
              <span>Partner With Us</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Together, We Can <span className="text-gradient">Protect More</span> Youth
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We believe in the power of collaboration. By joining forces with schools, organizations, 
              and individuals, we can extend our reach and create safer spaces for children across Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Become a Partner</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:partners@virtualsafespace.org">Contact Us</a>
              </Button>
            </div>
          </div>

          {/* Right - Partner Types Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {partnerTypes.map((partner, index) => (
              <Card 
                key={partner.title}
                className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <CardContent className="p-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <partner.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {partner.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Logos */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-8">Trusted by organizations across Africa</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="h-12 w-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">UNICEF</div>
            <div className="h-12 w-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">Save the Children</div>
            <div className="h-12 w-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">Plan International</div>
            <div className="h-12 w-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">World Vision</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
