import { Link } from "react-router-dom";
import { Shield, Mail, Heart, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import vssLogo from "@/assets/vss-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/90 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2">
            <img src={vssLogo} alt="Virtual Safe Space" className="h-10 md:h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-background/70 max-w-sm leading-relaxed text-sm md:text-base mb-6">
              Virtual Safe Space is a youth-led initiative focused on protecting children and young people through advocacy, awareness, and action.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-base md:text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="text-background/70 hover:text-background transition-colors">
                  About VSS
                </a>
              </li>
              <li>
                <a href="#mission" className="text-background/70 hover:text-background transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#focus" className="text-background/70 hover:text-background transition-colors">
                  Focus Areas
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-background/70 hover:text-background transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-base md:text-lg mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/resources" className="text-background/70 hover:text-background transition-colors">
                  Resource Center
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-background/70 hover:text-background transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-background/70 hover:text-background transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="mailto:support@virtualsafespace.org" className="text-background/70 hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-base md:text-lg mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/signup" className="text-background/70 hover:text-background transition-colors flex items-center gap-2">
                  <Shield size={14} />
                  Report Safely
                </Link>
              </li>
              <li>
                <a href="mailto:support@virtualsafespace.org" className="text-background/70 hover:text-background transition-colors flex items-center gap-2">
                  <Mail size={14} />
                  Get Help
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
          <p>© {currentYear} Virtual Safe Space. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart size={14} className="text-pink" />
            <span>for young voices everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
