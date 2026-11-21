import { Shield, Users, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={ref}
      id="about" 
      className={`py-16 md:py-24 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-primary text-sm font-medium">
              <Users size={16} />
              <span>About VSS</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              A Youth-Led Initiative for{" "}
              <span className="text-primary">Protection & Advocacy</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Virtual Safe Space (VSS) is a youth-led initiative focused on protecting children and young people from abuse, harassment, and neglect through advocacy, awareness, and action.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              We believe every child deserves to feel safe, valued, and heard. Our platform provides a secure environment where young voices can speak up without fear, knowing they will be supported and protected.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Confidential</div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold text-pink">Safe</div>
                <div className="text-sm text-muted-foreground">Platform</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`relative transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="relative z-10 bg-card rounded-3xl shadow-card p-8 md:p-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-light flex items-center justify-center flex-shrink-0">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">Protection First</h3>
                    <p className="text-muted-foreground text-sm">Your safety is our priority. Every report is handled with care and confidentiality.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-light flex items-center justify-center flex-shrink-0">
                    <Heart size={24} className="text-pink" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">Empathetic Support</h3>
                    <p className="text-muted-foreground text-sm">Our team understands and provides compassionate guidance throughout your journey.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-light flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">Youth-Led Team</h3>
                    <p className="text-muted-foreground text-sm">Built by young people who understand the challenges you face.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-teal-light rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-pink-light rounded-full blur-2xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
