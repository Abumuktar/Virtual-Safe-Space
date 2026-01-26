import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Shield, Users, AlertTriangle, CheckCircle, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-accent/10 to-background">
          <div className="container">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            
            <Badge className="mb-4 bg-accent/10 text-accent border-0">
              <FileText size={14} className="mr-1" />
              Legal
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              {/* Intro */}
              <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8 mb-8">
                <p className="text-muted-foreground mb-0">
                  Welcome to Virtual Safe Space. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle size={20} className="text-primary" />
                    <h2 className="font-display text-2xl font-bold m-0">Acceptance of Terms</h2>
                  </div>
                  <p className="text-muted-foreground">
                    By creating an account or using Virtual Safe Space (VSS), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Users size={20} className="text-accent" />
                    <h2 className="font-display text-2xl font-bold m-0">Eligibility</h2>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Our platform is designed for children, youth, and adults seeking to report harassment or access support services.</li>
                    <li>Users under 13 should use the platform with parental/guardian awareness.</li>
                    <li>By using our services, you represent that you are using the platform for its intended purpose.</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={20} className="text-primary" />
                    <h2 className="font-display text-2xl font-bold m-0">User Responsibilities</h2>
                  </div>
                  <p className="text-muted-foreground">
                    When using our platform, you agree to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Provide accurate information in your reports and communications</li>
                    <li>Not misuse the platform to make false reports</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Respect the privacy and dignity of others</li>
                    <li>Not attempt to access other users' accounts or data</li>
                    <li>Not use the platform for any illegal purposes</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle size={20} className="text-pink" />
                    <h2 className="font-display text-2xl font-bold m-0">Prohibited Conduct</h2>
                  </div>
                  <p className="text-muted-foreground">
                    The following actions are strictly prohibited:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Submitting false or malicious reports</li>
                    <li>Harassing, threatening, or intimidating other users or staff</li>
                    <li>Attempting to compromise platform security</li>
                    <li>Sharing confidential information from reports</li>
                    <li>Using the platform to perpetrate abuse or harassment</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText size={20} className="text-accent" />
                    <h2 className="font-display text-2xl font-bold m-0">Our Services</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Virtual Safe Space provides:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>A confidential platform for reporting harassment and abuse</li>
                    <li>Connection to support services and resources</li>
                    <li>Secure communication with our support team</li>
                    <li>Educational resources on child protection</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    We strive to respond to reports within 24-48 hours, though response times may vary based on case complexity and volume.
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Scale size={20} className="text-primary" />
                    <h2 className="font-display text-2xl font-bold m-0">Limitation of Liability</h2>
                  </div>
                  <p className="text-muted-foreground">
                    While we strive to provide reliable and secure services:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>VSS is not a substitute for emergency services. In immediate danger, contact local authorities.</li>
                    <li>We cannot guarantee specific outcomes for reported cases.</li>
                    <li>We are not liable for actions of third-party service providers we may refer you to.</li>
                    <li>Our platform is provided "as is" without warranties of any kind.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-bold">Account Termination</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to suspend or terminate accounts that violate these terms. You may also request to delete your account at any time by contacting our support team.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-bold">Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We may update these Terms of Service from time to time. We will notify users of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-bold">Governing Law</h2>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of Kenya and applicable international child protection conventions. Any disputes will be resolved through appropriate legal channels.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-bold">Contact</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms of Service:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <p className="text-foreground font-medium mb-1">Virtual Safe Space</p>
                    <p className="text-muted-foreground text-sm">
                      Email: legal@virtualsafespace.org<br />
                      Phone: +254 700 123 456
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
