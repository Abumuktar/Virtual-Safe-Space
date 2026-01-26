import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-teal-light/30 to-background">
          <div className="container">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            
            <Badge className="mb-4 bg-primary/10 text-primary border-0">
              <Shield size={14} className="mr-1" />
              Legal
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold mb-2 mt-0">Our Commitment to Your Privacy</h2>
                    <p className="text-muted-foreground mb-0">
                      At Virtual Safe Space (VSS), protecting your privacy is fundamental to our mission. We understand that the information you share with us is sensitive, and we are committed to handling it with the utmost care and security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Database size={20} className="text-primary" />
                    <h2 className="font-display text-2xl font-bold m-0">Information We Collect</h2>
                  </div>
                  <p className="text-muted-foreground">
                    We collect information that you voluntarily provide when using our platform:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Account Information:</strong> Email address, name (optional), and password for account creation.</li>
                    <li><strong>Report Information:</strong> Details about incidents you choose to report, including descriptions, dates, and any supporting evidence.</li>
                    <li><strong>Communication Data:</strong> Messages exchanged through our secure messaging system.</li>
                    <li><strong>Anonymous Reports:</strong> For anonymous submissions, we do not collect identifying information.</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye size={20} className="text-accent" />
                    <h2 className="font-display text-2xl font-bold m-0">How We Use Your Information</h2>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>To process and respond to your reports and inquiries</li>
                    <li>To connect you with appropriate support services</li>
                    <li>To improve our platform and services</li>
                    <li>To communicate important updates about your reports</li>
                    <li>To comply with legal obligations when required</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={20} className="text-pink" />
                    <h2 className="font-display text-2xl font-bold m-0">Data Security</h2>
                  </div>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>End-to-end encryption for all sensitive communications</li>
                    <li>Secure, encrypted database storage</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to data by trained personnel only</li>
                    <li>Automatic data anonymization protocols</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <UserCheck size={20} className="text-primary" />
                    <h2 className="font-display text-2xl font-bold m-0">Your Rights</h2>
                  </div>
                  <p className="text-muted-foreground">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Access your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (subject to legal requirements)</li>
                    <li>Withdraw consent at any time</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe size={20} className="text-accent" />
                    <h2 className="font-display text-2xl font-bold m-0">Information Sharing</h2>
                  </div>
                  <p className="text-muted-foreground">
                    We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes. We may share information only:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements or court orders</li>
                    <li>To protect the safety of a child or individual at risk</li>
                    <li>With trusted partner organizations for service delivery (with consent)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-bold">Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Our platform is designed to be safe for young users. We take additional precautions when handling data from users under 18, including parental/guardian notification where appropriate and enhanced privacy protections.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-bold">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <p className="text-foreground font-medium mb-1">Virtual Safe Space</p>
                    <p className="text-muted-foreground text-sm">
                      Email: privacy@virtualsafespace.org<br />
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

export default Privacy;
