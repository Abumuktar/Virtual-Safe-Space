import { Link } from "react-router-dom";
import { Shield, Mail, Heart } from "lucide-react";
import vssLogo from "@/assets/vss-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/90 py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={vssLogo} alt="Virtual Safe Space" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-background/70 max-w-sm leading-relaxed">
              Virtual Safe Space is a youth-led initiative focused on protecting children and young people through advocacy, awareness, and action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
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

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/report" className="text-background/70 hover:text-background transition-colors flex items-center gap-2">
                  <Shield size={16} />
                  Report Safely
                </Link>
              </li>
              <li>
                <a href="mailto:support@virtualsafespace.org" className="text-background/70 hover:text-background transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  Contact Us
                </a>
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
