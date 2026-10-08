import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchItems = [
    { title: "Corporate 3D Websites & React SSR Building", category: "Website Building & Design", section: "services" },
    { title: "Best SEO & Technical Search Domination", category: "SEO & Search Engineering", section: "services" },
    { title: "Best Domain Registration, Cloud Hosting & SSL Setup", category: "Domain, Hosting & Auth", section: "services" },
    { title: "Google Search & Meta Paid Ads (1.3X+ ROAS)", category: "Digital Marketing", section: "services" },
    { title: "AI Chatbots, Custom CRM Integration & SEO Audit Suite", category: "AI Suite & Audits", section: "ai-suite" },
    { title: "Off-Page SEO, White-Hat Backlinks & Citations", category: "Off-Page SEO Authority", section: "off-page-seo" },
    { title: "Verified Live Client Portfolio & Case Studies", category: "Portfolio", section: "portfolio" },
    { title: "Referrals, Pricing Packages & Special Discounts", category: "Offers & Pricing", section: "referrals" },
    { title: "Industries We Serve (E-Com, Real Estate, Health, SaaS)", category: "Industries", section: "industries" },
    { title: "About Puhayt Digital Founders (Trishanjit Dalal & Aayush Ghosh)", category: "Company & Leadership", section: "about" },
    { title: "Verified Client Testimonials & 5.0 Star Reviews", category: "Social Proof", section: "testimonials" },
    { title: "Technical SEO & Growth Strategy Blog", category: "Insights", section: "blog" },
    { title: "Kolkata Operational Base, GEO Hub & Premises Meetings", category: "Local & GEO Authority", section: "kolkata-geo" },
    { title: "Schedule Free Strategy Consultation Desk", category: "Contact", section: "contact" },
  ];

  const filtered = query.trim() === ""
    ? searchItems
    : searchItems.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Puhayt Digital"
    >
      <div
        className="glass-card bg-[#0B0B0B] border border-[#D4AF37]/40 max-w-xl w-full rounded-2xl p-4 shadow-2xl relative space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <input
              type="text"
              autoFocus
              aria-label="Search agency services, portfolio, and pages"
              placeholder="Search SEO, 3D web design, domain & hosting, portfolio..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search modal"
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onNavigate(item.section);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs text-neutral-200 group transition-colors"
              >
                <div>
                  <div className="font-semibold group-hover:text-[#D4AF37]">{item.title}</div>
                  <div className="text-[10px] text-neutral-400">{item.category}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37] shrink-0" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs text-neutral-400">
                No direct matches for <span className="text-white font-semibold">"{query}"</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  onNavigate("contact");
                  onClose();
                }}
                className="px-4 py-2 rounded-full gold-gradient-bg text-black font-bold text-xs inline-flex items-center space-x-1.5"
              >
                <span>Ask Our Strategy Desk Directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
