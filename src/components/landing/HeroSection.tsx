import { Link } from "react-router-dom";
import { Shield, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-teal-light rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-light rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-light rounded-full blur-3xl opacity-40" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up opacity-0">
            <Shield size={16} />
            <span>A Safe Space for Young Voices</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up opacity-0 animation-delay-100">
            Protecting Youth,{" "}
            <span className="text-gradient">Empowering Voices</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 animation-delay-200">
            Virtual Safe Space provides a confidential platform for children and youth to report harassment, seek protection, and be heard — because every voice matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0 animation-delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup" className="group">
                Get Help / Report Safely
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#about">
                Learn More
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-muted-foreground animate-fade-up opacity-0 animation-delay-400">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium">100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-pink-light flex items-center justify-center">
                <Heart size={20} className="text-pink" />
              </div>
              <span className="text-sm font-medium">Youth-Led Initiative</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
