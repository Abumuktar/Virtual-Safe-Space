import { useState } from "react";
import { Send, MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent! ✨",
      description: "Thank you for reaching out. We'll get back to you within 24-48 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@virtualsafespace.org",
      href: "mailto:support@virtualsafespace.org",
    },
    {
      icon: Phone,
      label: "Helpline",
      value: "+234 800 SAFE SPACE",
      href: "tel:+234800723372",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lagos, Nigeria",
      href: "#",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-24 bg-gradient-to-b from-muted/30 to-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 text-pink text-sm font-medium mb-4">
            <MessageCircle size={16} />
            Get In Touch
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We're Here to <span className="text-pink">Help</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions, want to partner with us, or need support? Reach out and our team will respond promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-pink to-primary rounded-3xl p-8 text-white">
              <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-white/80 mb-8">
                Fill up the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 group hover:translate-x-2 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Decorative circles */}
              <div className="relative mt-12">
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-white/5" />
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-primary flex items-center justify-center text-white text-sm font-bold border-2 border-background"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">500+ Partners</p>
                  <p className="text-sm text-muted-foreground">Trust Virtual Safe Space</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 shadow-lg border border-border">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-pink to-primary hover:opacity-90 text-white font-semibold h-14"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send size={18} />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
