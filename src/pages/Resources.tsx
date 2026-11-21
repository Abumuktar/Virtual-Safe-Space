import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, ExternalLink, FileText, Heart, Shield, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const resources = {
  guides: [
    {
      title: "Child Safety Essentials",
      description: "A comprehensive guide on recognizing warning signs of abuse and taking action to protect children.",
      type: "PDF Guide",
      icon: Shield,
      color: "primary",
    },
    {
      title: "Digital Safety for Youth",
      description: "Learn how to stay safe online, recognize cyberbullying, and protect your digital identity.",
      type: "Interactive Guide",
      icon: FileText,
      color: "accent",
    },
    {
      title: "Parent's Handbook",
      description: "Essential information for parents on how to talk to children about safety and recognize signs of distress.",
      type: "PDF Guide",
      icon: Users,
      color: "pink",
    },
    {
      title: "Educator's Toolkit",
      description: "Resources for teachers and school staff to create safe learning environments.",
      type: "Toolkit",
      icon: BookOpen,
      color: "primary",
    },
  ],
  videos: [
    {
      title: "Understanding Consent",
      description: "Age-appropriate explanation of consent and personal boundaries for young people.",
      duration: "8 min",
      icon: Video,
    },
    {
      title: "Speak Up, Stay Safe",
      description: "Empowering youth to report harassment and seek help when needed.",
      duration: "12 min",
      icon: Video,
    },
    {
      title: "Building Resilience",
      description: "Mental health strategies for coping with trauma and building emotional strength.",
      duration: "15 min",
      icon: Video,
    },
  ],
  support: [
    {
      title: "24/7 Helplines",
      description: "Emergency contact numbers for child protection services across Africa.",
      icon: Heart,
    },
    {
      title: "Counseling Services",
      description: "Free and confidential counseling services for survivors of abuse.",
      icon: Users,
    },
    {
      title: "Legal Aid Resources",
      description: "Information on legal rights and access to legal support services.",
      icon: FileText,
    },
  ],
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState("guides");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-teal-light/50 to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink/10 rounded-full blur-3xl" />
          
          <div className="container relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                <BookOpen size={14} className="mr-1" />
                Resource Center
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Educational <span className="text-gradient">Resources</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Access guides, videos, and support materials designed to help protect and empower young people across Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
                <TabsTrigger value="guides" className="text-sm">
                  <FileText size={16} className="mr-2" />
                  Guides
                </TabsTrigger>
                <TabsTrigger value="videos" className="text-sm">
                  <Video size={16} className="mr-2" />
                  Videos
                </TabsTrigger>
                <TabsTrigger value="support" className="text-sm">
                  <Heart size={16} className="mr-2" />
                  Support
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {resources.guides.map((resource, index) => (
                    <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 shadow-soft">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl bg-${resource.color}/10 flex items-center justify-center mb-4`}>
                            <resource.icon size={24} className={`text-${resource.color}`} />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download size={16} />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {resources.videos.map((video, index) => (
                    <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 shadow-soft overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Video size={24} className="text-primary ml-1" />
                        </div>
                        <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">
                          {video.duration}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="font-display text-lg group-hover:text-primary transition-colors">
                          {video.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="support" className="mt-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {resources.support.map((item, index) => (
                    <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 shadow-soft text-center p-8">
                      <div className="w-16 h-16 rounded-2xl bg-pink/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <item.icon size={28} className="text-pink" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{item.description}</p>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink size={16} />
                        Learn More
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-pink/10 to-accent/10">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Need More Help?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our team is here to support you. Reach out for personalized assistance or to request specific resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:virtualsafespace2025@gmail.com">Contact Support</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
