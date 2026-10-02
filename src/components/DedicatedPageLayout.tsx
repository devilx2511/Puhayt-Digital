import React from "react";
import { ArrowLeft, Sparkles, MessageCircle, Calendar, ShieldCheck, Phone } from "lucide-react";
import { useAgency } from "../context/AgencyContext";

interface DedicatedPageLayoutProps {
  pageId: string;
  pageTitle: string;
  pageSubtitle: string;
  badgeText?: string;
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateToContact: () => void;
  onOpenAudit: () => void;
  onNavigate?: (pageId: string) => void;
}

const PAGE_NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "case-studies", label: "Case Studies" },
  { id: "industries", label: "Industries" },
  { id: "ai-suite", label: "AI Suite" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Reviews" },
  { id: "blog", label: "Blog" },
  { id: "kolkata-geo", label: "Kolkata HQ" },
  { id: "client-portal", label: "Client Portal" },
  { id: "contact", label: "Contact" },
];

export const DedicatedPageLayout: React.FC<DedicatedPageLayoutProps> = ({
  pageId,
  pageTitle,
  pageSubtitle,
  badgeText,
  children,
  onNavigateHome,
  onNavigateToContact,
  onOpenAudit,
  onNavigate,
}) => {
  const { contactInfo } = useAgency();
  const primaryWhatsapp = contactInfo?.whatsapps?.[0] || "+91 7044811476";
  const cleanPhone = primaryWhatsapp.replace(/[^0-9]/g, "");

  const handlePageClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else if (id === "home") {
      onNavigateHome();
    } else if (id === "contact") {
      onNavigateToContact();
    }
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 min-h-[85vh] animate-fadeIn">
      {/* Top Breadcrumb & Page Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#120F0C]/80 border border-[#D4AF37]/30 backdrop-blur-xl shadow-lg">
          <div className="flex items-center space-x-2 text-xs truncate">
            <button
              onClick={onNavigateHome}
              className="text-neutral-400 hover:text-white transition-colors flex items-center space-x-1.5 font-medium shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Back to Home</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-[#FFDF73] font-bold truncate">{pageTitle}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {badgeText && (
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FFDF73] border border-[#D4AF37]/30">
                {badgeText}
              </span>
            )}
            <button
              onClick={onNavigateHome}
              className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
            >
              Home Page
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold gold-gradient-bg text-black shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Contact Desk
            </button>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mt-6 sm:mt-8 mb-5 sm:mb-6 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#18120B] border border-[#D4AF37]/40 text-[#FFDF73] text-[10px] sm:text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Puhayt Digital Dedicated Page</span>
          </div>
          <h1 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>

        {/* Quick Page Switcher Bar with touch-friendly scroll */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full px-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold mr-1 shrink-0">
            Pages:
          </span>
          {PAGE_NAV_ITEMS.map((item) => {
            const isActive = pageId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePageClick(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold shadow-md"
                    : "bg-[#14100C] text-neutral-300 hover:text-white hover:bg-[#221A12] border border-white/5 hover:border-[#D4AF37]/30"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Section Content */}
      <div className="relative z-10">{children}</div>

      {/* Dedicated Page Bottom Conversion Strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A140E] via-[#0E0C09] to-[#0A0806] border border-[#D4AF37]/40 shadow-2xl text-center space-y-5">
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold text-[#FFDF73] uppercase tracking-wider bg-[#FFDF73]/10 px-3 py-1 rounded-full border border-[#FFDF73]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kolkata's #1 Rated Growth Agency</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
            Ready to Dominate Online With Puhayt Digital?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
            Whether you need a bespoke 3D WebGL website, technical SEO ranking dominance, or high-ROAS ad campaigns, our executive team in Salt Lake Sector V is ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-full gold-gradient-bg text-black font-extrabold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Consultation</span>
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello Puhayt Digital! I would like to consult on my digital growth.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#122415] hover:bg-[#18331d] text-emerald-400 font-bold text-xs border border-emerald-500/40 transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Desk</span>
            </a>

            <button
              onClick={onOpenAudit}
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFDF73]" />
              <span>Free Technical Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
