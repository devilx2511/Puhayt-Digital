import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Layers, 
  Briefcase, 
  DollarSign, 
  FileText, 
  ExternalLink, 
  Navigation, 
  Sparkles, 
  Crown, 
  Bot, 
  Globe2, 
  ArrowUpRight, 
  ChevronRight, 
  SlidersHorizontal, 
  Lock, 
  Compass, 
  CheckCircle2,
  Share2,
  Smartphone,
  Tablet,
  Monitor
} from "lucide-react";
import { useAgency } from "../context/AgencyContext";
import { SITE_CONFIG } from "../config/siteConfig";

interface GoogleStitchOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenAudit: () => void;
  onOpenSearch: () => void;
}

export const GoogleStitchOptionsModal: React.FC<GoogleStitchOptionsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAudit,
  onOpenSearch,
}) => {
  const { contactInfo, openDevMode, openClientDashboard, currentUser } = useAgency();
  const [activeTab, setActiveTab] = useState<"quick" | "sitemap">("quick");
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const primaryPhone = contactInfo.phones[0] || "+91 7044811476";
  const primaryWhatsapp = contactInfo.whatsapps[0] || "+91 7044811476";
  const cleanPhone = primaryWhatsapp.replace(/[^0-9]/g, "");

  const handleJump = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Puhayt Digital — Best Digital Marketing Agency in Kolkata",
        text: "Grow Smarter. Scale Faster with Puhayt Digital.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const sitemapGroups = [
    {
      title: "Core Agency Sections",
      items: [
        { label: "Home Experience", id: "home", desc: "Hero, 3D WebGL experience & growth manifesto" },
        { label: "About Agency", id: "about", desc: "Our executive team, technical stack, mission & office premises policy" },
        { label: "Digital Services", id: "services", desc: "3D Web Development, SEO, Paid Ads & AI Automation" },
        { label: "Portfolio Showcase", id: "portfolio", desc: "Real verified client projects & interactive builds" },
        { label: "Referrals & Special Discounts", id: "referrals", desc: "Active promotional savings & custom referral links" },
        { label: "Industries We Serve", id: "industries", desc: "Specialized solutions for E-Commerce, Real Estate, Health, SaaS" },
        { label: "Client Testimonials", id: "testimonials", desc: "Verified 5.0 star ratings from founders & CEOs" },
        { label: "Tech & Strategy Blog", id: "blog", desc: "Actionable playbooks on Core Web Vitals & organic growth" },
        { label: "Kolkata Operational Base", id: "kolkata-geo", desc: "Premises meetings across Kolkata & remote globally" },
        { label: "Off-Page SEO & Authority Citations", id: "off-page-seo", desc: "White-hat backlink engineering, digital PR & NAP citations" },
        { label: "Direct Contact Desk", id: "contact", desc: "Inquiry submission & Calendly strategy booking" },
      ],
    },
    {
      title: "Specialized Services Catalog",
      items: [
        { label: "Technical & Local SEO Kolkata", id: "services", desc: "Google Search & Map 3-Pack ranking dominance" },
        { label: "High-ROAS Google & Meta Ads", id: "services", desc: "Algorithmic PPC campaigns & buyer remarketing" },
        { label: "Custom 3D WebGL Web Design", id: "services", desc: "Ultra-fast mobile & tablet responsive experiences" },
        { label: "AI Marketing & CRM Workflows", id: "ai-suite", desc: "24/7 lead intake & intelligent automation" },
      ],
    },
    {
      title: "Trust & Compliance",
      items: [
        { label: "Instant Website Audit", action: () => { onOpenAudit(); onClose(); }, desc: "Real-time Google Lighthouse, SEO & performance analysis" },
        { label: "Google reCAPTCHA Enterprise", desc: "Protected by Google Cloud enterprise token assessments" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Navigator Card Container */}
      <div 
        id="quick-navigator-options-modal"
        className="relative w-full max-w-lg sm:max-w-xl bg-[#0C0A08] text-white rounded-t-[32px] sm:rounded-3xl border border-[#D4AF37]/40 ring-1 ring-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Top Decorative Drag Bar on Mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-12 h-1.5 rounded-full bg-white/20 border border-white/5" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D4AF37]/20 flex items-center justify-between shrink-0 bg-[#120F0C]">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6212] flex items-center justify-center text-[#0B0B0B] font-bold shadow-md">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono font-bold text-[#FFDF73] uppercase tracking-wider">Agency Navigator</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                Quick Options &amp; Visual Sitemap
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stitched Switcher Tabs */}
        <div className="p-3 bg-[#0A0806] border-b border-white/5 flex items-center justify-center shrink-0">
          <div className="grid grid-cols-2 p-1 bg-white/5 rounded-2xl border border-white/10 w-full max-w-xs">
            <button
              onClick={() => setActiveTab("quick")}
              className={`py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === "quick"
                  ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Options &amp; Actions</span>
            </button>
            <button
              onClick={() => setActiveTab("sitemap")}
              className={`py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === "sitemap"
                  ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Visual Sitemap</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {activeTab === "quick" ? (
            <>
              {/* Primary Direct Actions Grid */}
              <div>
                <h3 className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Immediate Direct Controls</span>
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* WhatsApp Quick Desk */}
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello Puhayt Digital! I would like to consult with your Kolkata growth team.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-gradient-to-br from-[#122415] to-[#0A120B] border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center space-x-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">WhatsApp Desk</div>
                      <div className="text-[10px] text-emerald-400/80">Direct Strategist</div>
                    </div>
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                    className="p-3 rounded-2xl bg-gradient-to-br from-[#241A0A] to-[#140E05] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all flex items-center space-x-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Call Kolkata HQ</div>
                      <div className="text-[10px] text-neutral-400">{primaryPhone}</div>
                    </div>
                  </a>

                  {/* Instant Technical Audit */}
                  <button
                    onClick={() => { onOpenAudit(); onClose(); }}
                    className="p-3 rounded-2xl bg-gradient-to-br from-[#1E172E] to-[#0E0C17] border border-purple-500/40 hover:border-purple-400 transition-all flex items-center space-x-2.5 text-left group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Instant SEO Audit</div>
                      <div className="text-[10px] text-purple-400/80">Free Live Analysis</div>
                    </div>
                  </button>

                  {/* Blog & Articles */}
                  <button
                    onClick={() => handleJump("blog")}
                    className="p-3 rounded-2xl bg-gradient-to-br from-[#2E1E09] to-[#120B04] border border-[#FFDF73]/40 hover:border-[#FFDF73] transition-all flex items-center space-x-2.5 text-left group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#FFDF73]/20 text-[#FFDF73] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Articles &amp; Blog</div>
                      <div className="text-[10px] text-[#FFDF73]/80">Growth Insights</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Location Card: Kolkata Operational Base */}
              <div className="p-4 rounded-2xl bg-[#14100A] border border-[#D4AF37]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#FFDF73]">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>Trishanjit's Kolkata Operational Base</span>
                  </div>
                  <span className="text-[9px] font-mono bg-[#D4AF37]/15 text-[#FFDF73] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 font-bold uppercase">
                    We Meet At Your Premises
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  We are 100% transparent: we still lack our first physical office. Founder Trishanjit Dalal operates out of Kolkata (West Bengal). For all Kolkata business clients, we travel directly to your office, store, or business premises for in-person strategy briefings.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => handleJump("kolkata-geo")}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>View Section &amp; Coverage</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                  <a
                    href="https://maps.google.com/?q=Kolkata+West+Bengal+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-xs font-bold text-[#FFDF73] flex items-center justify-center space-x-1 border border-[#D4AF37]/40 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Maps</span>
                  </a>
                </div>
              </div>

              {/* Responsive Architecture Engine */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#120F0B] to-[#0A0806] border border-dashed border-[#D4AF37]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#FFDF73]">
                    <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                    <span>Adaptive Responsive Engine</span>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold uppercase">
                    Cross-Device Optimized
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed font-light">
                  Tailored responsive layouts engineered for normal Mobile, Tablet, and Desktop viewport expectations:
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <Smartphone className="w-4 h-4 text-[#FFDF73] mx-auto" />
                    <div className="font-bold text-white text-[11px]">Phone View</div>
                    <div className="text-[9px] text-neutral-400">Thumb Bottom Dock, 48px touch targets, quick hub</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <Tablet className="w-4 h-4 text-emerald-400 mx-auto" />
                    <div className="font-bold text-white text-[11px]">Tablet View</div>
                    <div className="text-[9px] text-neutral-400">Balanced 2-col grids, responsive chips, gesture drawer</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <Monitor className="w-4 h-4 text-sky-400 mx-auto" />
                    <div className="font-bold text-white text-[11px]">Desktop Ultra</div>
                    <div className="text-[9px] text-neutral-400">WebGL canvas, 3D monograms &amp; keyboard shortcuts</div>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div>
                <h3 className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2.5">
                  Direct Section Jump
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { label: "Services", id: "services" },
                    { label: "Portfolio", id: "portfolio" },
                    { label: "Referrals & Discounts", id: "referrals" },
                    { label: "AI Suite", id: "ai-suite" },
                    { label: "About Us", id: "about" },
                    { label: "Reviews", id: "testimonials" },
                    { label: "Contact", id: "contact" },
                    { label: "Search (Cmd+K)", action: () => { onOpenSearch(); onClose(); } },
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => (btn.action ? btn.action() : btn.id && handleJump(btn.id))}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/40 text-neutral-300 hover:text-white transition-all text-center font-medium truncate"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Visual Hierarchical Sitemap View */
            <div className="space-y-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <span className="text-neutral-300 font-medium">Interactive XML &amp; Visual Sitemap</span>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFDF73] font-bold hover:underline flex items-center space-x-1"
                >
                  <span>Open sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {sitemapGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2.5">
                  <h3 className="text-xs font-mono font-bold text-[#FFDF73] uppercase tracking-wider">
                    {group.title}
                  </h3>
                  <div className="space-y-1.5">
                    {group.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        onClick={() => {
                          if (item.action) {
                            item.action();
                          } else if (item.id) {
                            handleJump(item.id);
                          }
                        }}
                        className={`p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between transition-all ${
                          item.id || item.action ? "cursor-pointer hover:border-[#D4AF37]/50 hover:bg-white/10" : ""
                        }`}
                      >
                        <div className="pr-3">
                          <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                            <span>{item.label}</span>
                            {(item.id || item.action) && <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />}
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-0.5">{item.desc}</div>
                        </div>
                        {item.id && (
                          <span className="text-[10px] font-mono text-neutral-500 bg-black/40 px-2 py-0.5 rounded border border-white/5 shrink-0">
                            #{item.id}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="p-3.5 bg-[#090705] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 shrink-0">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Puhayt Digital Kolkata</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400">Kolkata &amp; Global Delivery</span>
        </div>
      </div>
    </div>
  );
};
