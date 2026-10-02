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
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchItems = [
    { title: "Corporate 3D Websites", category: "Services", section: "services" },
    { title: "SEO & Search Domination", category: "Services", section: "services" },
    { title: "Google & Meta Paid Ads", category: "Services", section: "services" },
    { title: "AI Chatbots & CRM Automation", category: "AI Services", section: "ai-suite" },
    { title: "Apex Luxury Case Study", category: "Case Studies", section: "case-studies" },
    { title: "Verified Portfolio & Case Studies", category: "Portfolio", section: "portfolio" },
    { title: "Industries We Serve (E-Com, Real Estate, Health, SaaS)", category: "Industries", section: "industries" },
    { title: "Pricing & Growth Packages", category: "Pricing", section: "pricing" },
    { title: "About Puhayt Digital & Team", category: "Company", section: "about" },
    { title: "Client Testimonials & 5.0 Star Reviews", category: "Social Proof", section: "testimonials" },
    { title: "Tech & Growth Strategy Blog", category: "Insights", section: "blog" },
    { title: "Kolkata HQ Hub & Sector V Presence", category: "Local SEO", section: "kolkata-geo" },
    { title: "Client Portal & Live Project Tracking", category: "Client Portal", section: "client-portal" },
    { title: "Schedule Strategic Consultation", category: "Contact", section: "contact" },
  ];

  const filtered = query.trim() === ""
    ? searchItems
    : searchItems.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card bg-[#0B0B0B] border border-[#D4AF37]/40 max-w-xl w-full rounded-2xl p-4 shadow-2xl relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              autoFocus
              placeholder="Type to search agency services, tools, case studies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1">
          {filtered.map((item, idx) => (
            <button
              key={idx}
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
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#D4AF37]" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
