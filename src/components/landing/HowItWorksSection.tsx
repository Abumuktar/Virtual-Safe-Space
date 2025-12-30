import { UserPlus, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Sign Up Securely",
    description: "Create your confidential account in seconds. Your privacy is our priority.",
    color: "primary",
  },
  {
    step: 2,
    icon: FileText,
    title: "Report an Incident",
    description: "Share what happened safely. We guide you through every step of the process.",
    color: "pink",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Get Support",
    description: "Our team reviews your report and responds with care and action.",
    color: "accent",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-primary text-sm font-medium mb-6">
            <CheckCircle size={16} />
            <span>Simple Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting help is easy and safe. Here's how we support you.
          </p>
        </div>

        {/* Steps - Desktop horizontal, Mobile vertical */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line - Desktop */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((item, index) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                {/* Step number with icon */}
                <div className={`relative z-10 w-32 h-32 rounded-full bg-card shadow-card flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105`}>
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-${item.color}/10 to-transparent" />
                  <div className="relative">
                    <item.icon size={40} className={`text-${item.color}`} />
                    <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-${item.color} text-${item.color === 'primary' ? 'primary' : item.color}-foreground text-xs font-bold flex items-center justify-center`}>
                      {item.step}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground max-w-xs">
                  {item.description}
                </p>

                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-border mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
