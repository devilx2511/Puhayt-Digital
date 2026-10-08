import React from "react";
import { ArrowLeft, Sparkles, MessageCircle, Calendar, ShieldCheck, CheckCircle2, Globe2 } from "lucide-react";
import { useAgency } from "../context/AgencyContext";
import { getPageSEOConfig } from "../config/siteConfig";

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
  { id: "referrals", label: "Discounts & Referrals" },
  { id: "industries", label: "Industries" },
  { id: "ai-suite", label: "AI Suite" },
  { id: "testimonials", label: "Reviews" },
  { id: "blog", label: "Blog" },
  { id: "kolkata-geo", label: "Kolkata Base" },
  { id: "off-page-seo", label: "Off-Page SEO" },
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
  const pageSeo = getPageSEOConfig(pageId);

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
      {/* Top Semantic Breadcrumb & Page Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#120F0C]/80 border border-[#D4AF37]/30 backdrop-blur-xl shadow-lg"
        >
          <ol className="flex items-center space-x-2 text-xs truncate">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="text-neutral-300 hover:text-white transition-colors flex items-center space-x-1.5 font-medium shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Back to Home</span>
              </a>
            </li>
            <li aria-hidden="true" className="text-neutral-600">
              /
            </li>
            <li aria-current="page" className="text-[#FFDF73] font-bold truncate">
              {pageTitle}
            </li>
          </ol>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {badgeText && (
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FFDF73] border border-[#D4AF37]/30">
                {badgeText}
              </span>
            )}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
            >
              Home Page
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToContact();
              }}
              className="px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold gold-gradient-bg text-black shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Contact Desk
            </a>
          </div>
        </nav>

        {/* Page Hero Header */}
        <header className="text-center max-w-3xl mx-auto mt-6 sm:mt-8 mb-5 sm:mb-6 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#18120B] border border-[#D4AF37]/40 text-[#FFDF73] text-[10px] sm:text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Puhayt Digital — Verified Authority Hub</span>
          </div>
          <h1 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </header>

        {/* Quick Page Switcher Bar with touch-friendly scroll */}
        <div
          role="navigation"
          aria-label="Page Switcher"
          className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full px-1"
        >
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold mr-1 shrink-0">
            Pages:
          </span>
          {PAGE_NAV_ITEMS.map((item) => {
            const isActive = pageId === item.id;
            return (
              <a
                key={item.id}
                href={item.id === "home" ? "/" : `/${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(item.id);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold shadow-md"
                    : "bg-[#14100C] text-neutral-300 hover:text-white hover:bg-[#221A12] border border-white/5 hover:border-[#D4AF37]/30"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Section Content */}
      <div className="relative z-10">{children}</div>

      {/* On-Page SEO Topic Cluster, Search Intent & FAQ Authority Block */}
      <section
        aria-label={`${pageTitle} Search Authority & Key Capabilities`}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-[#110E0A]/90 border border-white/10 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold text-[#FFDF73] uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>Verified Search &amp; Topic Authority — Kolkata &amp; Global</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {pageSeo.topicClusterTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-4xl">
              {pageSeo.topicClusterDescription}
            </p>
          </div>

          {/* Core Search Intent Highlights */}
          {pageSeo.searchIntentTags.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {pageSeo.searchIntentTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-black/50 border border-[#D4AF37]/25 text-xs text-neutral-200 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Page-Specific Structured FAQs */}
          {pageSeo.faqs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              {pageSeo.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-[#FFDF73]">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Targeted Page Keyword Index */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Indexed Search Terms &amp; Specializations:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pageSeo.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] text-neutral-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Page Bottom Conversion Strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A140E] via-[#0E0C09] to-[#0A0806] border border-[#D4AF37]/40 shadow-2xl text-center space-y-5">
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-bold text-[#FFDF73] uppercase tracking-wider bg-[#FFDF73]/10 px-3 py-1 rounded-full border border-[#FFDF73]/30">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
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
              type="button"
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-full gold-gradient-bg text-black font-extrabold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Strategy Consultation</span>
            </button>

            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello Puhayt Digital! I would like to consult on my digital growth.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#122415] hover:bg-[#18331d] text-emerald-400 font-bold text-xs border border-emerald-500/40 transition-all flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp Desk</span>
            </a>

            <button
              type="button"
              onClick={onOpenAudit}
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFDF73]" aria-hidden="true" />
              <span>Free Technical Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
