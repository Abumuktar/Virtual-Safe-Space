import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Linkedin, Mail, Twitter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const teamMembers = [
  {
    name: "Amina Okonkwo",
    role: "Founder & Executive Director",
    bio: "A passionate advocate for child protection with over 10 years of experience in youth empowerment across Africa.",
    image: "AO",
    color: "from-primary to-accent",
  },
  {
    name: "David Mensah",
    role: "Head of Programs",
    bio: "Former educator dedicated to creating safe learning environments and implementing child protection policies.",
    image: "DM",
    color: "from-pink to-primary",
  },
  {
    name: "Grace Wanjiku",
    role: "Community Outreach Lead",
    bio: "Community organizer with expertise in grassroots mobilization and youth engagement programs.",
    image: "GW",
    color: "from-accent to-pink",
  },
  {
    name: "Samuel Osei",
    role: "Technology Director",
    bio: "Tech innovator focused on building secure platforms that prioritize user privacy and safety.",
    image: "SO",
    color: "from-primary to-pink",
  },
  {
    name: "Fatima Hassan",
    role: "Counseling Coordinator",
    bio: "Licensed psychologist specializing in trauma-informed care and youth mental health support.",
    image: "FH",
    color: "from-pink to-accent",
  },
  {
    name: "John Kamau",
    role: "Partnerships Manager",
    bio: "Strategic relationship builder with experience in NGO collaborations and government partnerships.",
    image: "JK",
    color: "from-accent to-primary",
  },
];

const advisors = [
  {
    name: "Dr. Ngozi Okafor",
    role: "Child Psychology Expert",
    organization: "University of Lagos",
  },
  {
    name: "Prof. Kwame Asante",
    role: "Education Policy Advisor",
    organization: "Ghana Education Service",
  },
  {
    name: "Hon. Sarah Muthoni",
    role: "Legal & Policy Advisor",
    organization: "Kenya Children's Court",
  },
];

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
                A dedicated team of young professionals committed to protecting and empowering youth across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index} 
                  className="group border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        {member.image}
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                      
                      {/* Social Links */}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                          <Linkedin size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                          <Twitter size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                          <Mail size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advisors Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Advisory Board
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Guiding our mission with expertise and experience in child protection, education, and policy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {advisors.map((advisor, index) => (
                <Card key={index} className="border-0 shadow-soft text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1">{advisor.name}</h3>
                  <p className="text-primary text-sm font-medium mb-1">{advisor.role}</p>
                  <p className="text-muted-foreground text-xs">{advisor.organization}</p>
                </Card>
              ))}
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
                    <a href="mailto:careers@virtualsafespace.org">View Opportunities</a>
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
