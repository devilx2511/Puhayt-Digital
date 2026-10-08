import React, { useState } from "react";
import { Globe, ArrowUp, CheckCircle2 } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useAgency } from "../context/AgencyContext";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { addLead } = useAgency();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newsletterEmail.trim();
    if (cleanEmail) {
      addLead({
        name: "Growth Dispatch Subscriber",
        email: cleanEmail,
        phone: "N/A",
        company: "Newsletter Subscription",
        service: "Weekly SEO & Growth Dispatch",
        budget: "Newsletter",
        message: `Subscribed to Puhayt Growth Dispatch via Footer (${cleanEmail})`,
      });
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Growth Dispatch Subscriber",
          email: cleanEmail,
          phone: "N/A",
          company: "Newsletter Subscription",
          service: "Weekly SEO & Growth Dispatch",
          budget: "Newsletter",
          message: `Subscribed to Puhayt Growth Dispatch via Footer (${cleanEmail})`,
        }),
      }).catch(() => {});
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-16 pb-24 lg:pb-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo onClick={() => { onNavigate("home"); scrollToTop(); }} size="lg" showTagline={false} />

            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-sm">
              We Don't Just Market Brands. We Build Digital Empires. Elite 3D web development, technical SEO, performance advertising, and AI automation.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <label htmlFor="footer-newsletter-email" className="block text-xs font-bold text-white mb-2">
                Subscribe to Puhayt Growth Dispatch
              </label>
              {subscribed ? (
                <div className="text-xs text-emerald-400 font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Subscribed to weekly strategy teardowns!</span>
                </div>
              ) : (
                <form
                  id="newsletter-form"
                  onSubmit={handleSubscribe}
                  className="flex gap-2 max-w-sm"
                  {...({
                    toolname: "subscribe_newsletter",
                    tooldescription:
                      "Subscribe to the Puhayt Digital weekly growth and technical SEO strategy newsletter",
                  } as any)}
                >
                  <input
                    id="footer-newsletter-email"
                    name="newsletterEmail"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter corporate email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button type="submit" className="px-4 py-2.5 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-lg">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-xs font-bold text-[#FFDF73] uppercase tracking-wider mb-4">Core Pages</h2>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li><a href="/" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} className="inline-block py-1 hover:text-white transition-colors">Home — Digital Agency Hub</a></li>
              <li><a href="/about" onClick={(e) => { e.preventDefault(); onNavigate("about"); }} className="inline-block py-1 hover:text-white transition-colors">About Founders &amp; Mission</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate("services"); }} className="inline-block py-1 hover:text-white transition-colors">SEO, Web Design &amp; Hosting Services</a></li>
              <li><a href="/portfolio" onClick={(e) => { e.preventDefault(); onNavigate("portfolio"); }} className="inline-block py-1 hover:text-white transition-colors">Live Website Portfolio</a></li>
              <li><a href="/referrals" onClick={(e) => { e.preventDefault(); onNavigate("referrals"); }} className="inline-block py-1 hover:text-white transition-colors">Pricing, Referrals &amp; Discounts</a></li>
              <li><a href="/industries" onClick={(e) => { e.preventDefault(); onNavigate("industries"); }} className="inline-block py-1 hover:text-white transition-colors">Industries We Scale</a></li>
            </ul>
          </div>

          {/* Capabilities & Intelligence */}
          <div>
            <h2 className="text-xs font-bold text-[#FFDF73] uppercase tracking-wider mb-4">SEO, GEO &amp; Trust</h2>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li><a href="/kolkata-geo" onClick={(e) => { e.preventDefault(); onNavigate("kolkata-geo"); }} className="inline-block py-1 text-[#FFDF73] font-semibold hover:text-white transition-colors">GEO &amp; Local SEO Authority Hub</a></li>
              <li><a href="/off-page-seo" onClick={(e) => { e.preventDefault(); onNavigate("off-page-seo"); }} className="inline-block py-1 hover:text-white transition-colors">Off-Page SEO &amp; Citations</a></li>
              <li><a href="/ai-suite" onClick={(e) => { e.preventDefault(); onNavigate("ai-suite"); }} className="inline-block py-1 hover:text-white transition-colors">Interactive SEO &amp; GEO Audit</a></li>
              <li><a href="/testimonials" onClick={(e) => { e.preventDefault(); onNavigate("testimonials"); }} className="inline-block py-1 hover:text-white transition-colors">Verified Client Reviews (5.0★)</a></li>
              <li><a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate("blog"); }} className="inline-block py-1 hover:text-white transition-colors">Technical SEO &amp; Growth Blog</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }} className="inline-block py-1 hover:text-white transition-colors">Contact &amp; Consultation Desk</a></li>
            </ul>
          </div>

          {/* Core Search Pillars */}
          <div>
            <h2 className="text-xs font-bold text-[#FFDF73] uppercase tracking-wider mb-4">Core Specializations</h2>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate("services"); }} className="inline-block py-1 hover:text-white transition-colors">Best SEO &amp; GEO Engineering</a></li>
              <li><a href="/portfolio" onClick={(e) => { e.preventDefault(); onNavigate("portfolio"); }} className="inline-block py-1 hover:text-white transition-colors">Custom Website Building (React SSR)</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate("services"); }} className="inline-block py-1 hover:text-white transition-colors">3D WebGL &amp; Mobile Web Design</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate("services"); }} className="inline-block py-1 hover:text-white transition-colors">Domain, Cloud Hosting &amp; Auth</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }} className="inline-block py-1 hover:text-white transition-colors">Google &amp; Meta Digital Marketing</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Multilingual Indicators */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-300 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>© 2026 Puhayt Digital. All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-500" aria-hidden="true">•</span>
            <div className="flex items-center space-x-2 text-[11px] text-neutral-300">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span className="text-[#FFDF73] font-semibold">EN</span>
              <span aria-hidden="true">·</span>
              <span className="hover:text-white transition-colors">हिन्दी</span>
              <span aria-hidden="true">·</span>
              <span className="hover:text-white transition-colors">বাংলা</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-neutral-300 hover:text-white transition-colors"
            >
              Sitemap
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-neutral-300 hover:text-white transition-colors"
            >
              Robots.txt
            </a>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-neutral-300 hover:text-white transition-colors"
            >
              RSS
            </a>
            <a
              href="/citations.json"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-neutral-300 hover:text-white transition-colors"
            >
              Citations
            </a>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-neutral-300 hover:text-white transition-colors"
            >
              LLMs.txt
            </a>
            <a
              href="/llms-full.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-[#FFDF73] hover:text-white transition-colors font-mono"
            >
              GEO-Full.txt
            </a>
            <a
              href="/geo-knowledge-graph.json"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-1 text-[11px] text-emerald-400 hover:text-white transition-colors font-mono"
            >
              KnowledgeGraph.json
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to Top"
              className="p-2.5 glass-card rounded-full text-neutral-200 hover:text-white hover:border-[#D4AF37]"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
