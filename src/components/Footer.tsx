import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { Globe, ArrowUp, Send, CheckCircle2, Lock } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { openDevMode } = useAgency();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo onClick={() => { onNavigate("home"); scrollToTop(); }} size="lg" showTagline={false} />

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              We Don't Just Market Brands. We Build Digital Empires. Elite 3D web development, technical SEO, performance advertising, and AI automation.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-2">Subscribe to Puhayt Growth Dispatch</div>
              {subscribed ? (
                <div className="text-xs text-emerald-400 font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed to weekly strategy teardowns!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button type="submit" className="px-4 py-2 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-lg">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Core Pages</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => onNavigate("home")} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate("about")} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate("services")} className="hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => onNavigate("portfolio")} className="hover:text-white transition-colors">Portfolio</button></li>
              <li><button onClick={() => onNavigate("case-studies")} className="hover:text-white transition-colors">Case Studies</button></li>
              <li><button onClick={() => onNavigate("industries")} className="hover:text-white transition-colors">Industries</button></li>
            </ul>
          </div>

          {/* Capabilities & Intelligence */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Solutions &amp; Trust</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => onNavigate("pricing")} className="hover:text-white transition-colors">Pricing &amp; Retainers</button></li>
              <li><button onClick={() => onNavigate("testimonials")} className="hover:text-white transition-colors">Client Reviews (5.0★)</button></li>
              <li><button onClick={() => onNavigate("ai-suite")} className="hover:text-white transition-colors">Puhayt AI Suite</button></li>
              <li><button onClick={() => onNavigate("blog")} className="hover:text-white transition-colors">Tech &amp; Strategy Blog</button></li>
              <li><button onClick={() => onNavigate("kolkata-geo")} className="hover:text-white transition-colors">Kolkata HQ (Sector V)</button></li>
              <li><button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors">Contact Desk</button></li>
            </ul>
          </div>

          {/* Solutions & Admin */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Enterprise &amp; Portal</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => onNavigate("client-portal")} className="hover:text-white transition-colors">Client Portal &amp; Sprints</button></li>
              <li><button onClick={() => onNavigate("ai-suite")} className="hover:text-white transition-colors">AI Proposal Generator</button></li>
              <li><button onClick={() => onNavigate("pricing")} className="hover:text-white transition-colors">Growth Investment Tiers</button></li>
              <li><button onClick={() => onNavigate("about")} className="hover:text-white transition-colors">Zero Subcontracting SLA</button></li>
              <li>
                <button
                  onClick={openDevMode}
                  className="hover:text-[#D4AF37] text-[#D4AF37] transition-colors flex items-center space-x-1 font-semibold"
                >
                  <Lock className="w-3 h-3" />
                  <span>DevMode Master Control</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Multilingual Indicators */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>© 2026 Puhayt Digital. All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[#FFDF73] font-semibold">EN</span>
              <span>·</span>
              <span className="hover:text-white transition-colors cursor-pointer" title="Hindi Version">हिन्दी</span>
              <span>·</span>
              <span className="hover:text-white transition-colors cursor-pointer" title="Bengali Version">বাংলা</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-neutral-500 hover:text-white transition-colors"
            >
              Sitemap
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-neutral-500 hover:text-white transition-colors"
            >
              Robots.txt
            </a>
            <button
              onClick={openDevMode}
              className="text-[11px] text-neutral-500 hover:text-[#D4AF37] flex items-center space-x-1.5 font-mono transition-colors"
            >
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>Admin Console</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 glass-card rounded-full text-neutral-300 hover:text-white hover:border-[#D4AF37]"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

