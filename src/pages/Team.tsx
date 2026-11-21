import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Mail, MapPin, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { contactInfo } from "@/data/team";
import TeamShowcase from "@/components/team/TeamShowcase";

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-pink-light/50 to-background relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-pink/10 text-pink border-0">
                <Users size={14} className="mr-1" />
                Our Team
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Meet the <span className="text-gradient">People</span> Behind VSS
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                A dedicated, youth-led team based in Katsina, Nigeria, committed to protecting and empowering children and young people.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 md:py-16">
          <div className="container">
            <TeamShowcase />
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact the Team
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Reach out to us for support, partnerships, or to get involved.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href={`mailto:${contactInfo.email}`}>
                <Card className="border-0 shadow-soft text-center p-6 h-full hover:shadow-card transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground break-all">{contactInfo.email}</p>
                </Card>
              </a>
              <a href={contactInfo.helplineHref}>
                <Card className="border-0 shadow-soft text-center p-6 h-full hover:shadow-card transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-pink/10 flex items-center justify-center mx-auto mb-4">
                    <Phone size={22} className="text-pink" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Helpline</p>
                  <p className="font-medium text-foreground">{contactInfo.helpline}</p>
                </Card>
              </a>
              <Card className="border-0 shadow-soft text-center p-6 h-full">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={22} className="text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-medium text-foreground">{contactInfo.location}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="bg-gradient-to-r from-primary via-accent to-pink rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
              
              <div className="relative z-10">
                <Heart size={40} className="mx-auto mb-4 animate-pulse" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Join Our Mission
                </h2>
                <p className="text-white/90 max-w-xl mx-auto mb-8">
                  We're always looking for passionate individuals to join our team. Whether as a volunteer, intern, or full-time member, make a difference today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="mailto:virtualsafespace2025@gmail.com">View Opportunities</a>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Volunteer With Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
