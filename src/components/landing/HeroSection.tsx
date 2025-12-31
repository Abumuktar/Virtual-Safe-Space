import { Link } from "react-router-dom";
import { Shield, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African children in a safe learning environment"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay - Vibrant Pink to Teal */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink/80 via-pink/60 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-1/3 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float animation-delay-200" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float animation-delay-400" />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 animate-fade-up opacity-0 border border-white/30">
            <Sparkles size={16} className="text-yellow-300" />
            <span>A Safe Space for Young Voices</span>
            <Shield size={16} />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up opacity-0 animation-delay-100 drop-shadow-lg">
            Protecting Youth,{" "}
            <span className="text-yellow-300 relative">
              Empowering Voices
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-yellow-300/50" />
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 animation-delay-200 drop-shadow">
            Virtual Safe Space provides a confidential platform for children and youth to report harassment, seek protection, and be heard — because every voice matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0 animation-delay-300">
            <Button 
              size="xl" 
              asChild 
              className="bg-white text-pink hover:bg-white/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-bold"
            >
              <Link to="/signup" className="group flex items-center gap-2">
                Get Help / Report Safely
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              asChild 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <a href="#about">
                Learn More
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-up opacity-0 animation-delay-400">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white">100% Confidential</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Heart size={20} className="text-pink-200" />
              </div>
              <span className="text-sm font-semibold text-white">Youth-Led Initiative</span>
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

      {/* Scroll indicator */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
