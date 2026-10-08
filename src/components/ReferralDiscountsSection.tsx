import React, { useState } from "react";
import { 
  Sparkles, 
  Gift, 
  Copy, 
  Check, 
  MessageCircle, 
  Tag, 
  ArrowRight, 
  Calendar, 
  MapPin,
  Dices,
  Maximize2,
  X,
  PlusCircle
} from "lucide-react";
import { useAgency } from "../context/AgencyContext";
import { OfferType } from "../types";

interface ReferralDiscountsSectionProps {
  onNavigateToContact?: () => void;
}

export const ReferralDiscountsSection: React.FC<ReferralDiscountsSectionProps> = () => {
  const { discounts, openDevMode } = useAgency();

  // Generate a random unique referral code every time
  const generateFreshCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "PUHAYT-REF-";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const [currentCode, setCurrentCode] = useState<string>(generateFreshCode);
  const [copiedOfferCode, setCopiedOfferCode] = useState<string | null>(null);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<"ALL" | OfferType>("ALL");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string; title?: string } | null>(null);

  const handleCopyOfferCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedOfferCode(code);
    setTimeout(() => setCopiedOfferCode(null), 2500);
  };

  const activeDiscounts = discounts.filter((d) => {
    if (d.active === false) return false;
    if (selectedTypeFilter === "ALL") return true;
    const resolvedType: OfferType =
      d.offerType ||
      (d.title.toLowerCase().includes("referral")
        ? "Referral"
        : d.discountPercentage
        ? "Discount"
        : "Offer");
    return resolvedType === selectedTypeFilter;
  });

  return (
    <section id="referrals" className="py-12 sm:py-16 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow safely constrained to viewport */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[90vw] sm:max-w-[650px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs sm:text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Gift className="w-4 h-4" />
            <span>Referral, Discount &amp; Offer Hub</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight">
            Special Discounts &amp; <span className="gold-gradient-text">Referral Rewards</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Explore our verified promotional offers, discounts, and dynamic referral packages.
          </p>
        </div>

        {/* ================= ACTIVE PACKAGES: REFERRAL, DISCOUNT & OFFER ================= */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                <Tag className="w-4 h-4" />
                <span>Verified Agency Packages</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Active Offers, Discounts &amp; Referrals
              </h3>
            </div>

            {/* Filter by OfferType: ALL | Offer | Discount | Referral */}
            <div className="flex items-center flex-wrap gap-2">
              {(["ALL", "Offer", "Discount", "Referral"] as const).map((typeTab) => (
                <button
                  key={typeTab}
                  type="button"
                  onClick={() => setSelectedTypeFilter(typeTab)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    selectedTypeFilter === typeTab
                      ? "gold-gradient-bg text-black shadow-md"
                      : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                  }`}
                >
                  {typeTab === "ALL" ? "All Packages" : typeTab}
                </button>
              ))}
            </div>
          </div>

          {activeDiscounts.length === 0 ? (
            <div className="glass-card rounded-3xl border border-[#D4AF37]/30 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 bg-[#0E0B07]/90">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] mx-auto">
                <Gift className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                No {selectedTypeFilter === "ALL" ? "Packages" : `${selectedTypeFilter} Packages`} Published Yet
              </h4>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Add your custom Referral, Discount, or Offer packages with full promotional posters directly inside DevMode.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={openDevMode}
                  className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Package in DevMode</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              {activeDiscounts.map((offer) => {
                const resolvedType: OfferType =
                  offer.offerType ||
                  (offer.title.toLowerCase().includes("referral")
                    ? "Referral"
                    : offer.discountPercentage
                    ? "Discount"
                    : "Offer");
                const isReferralType = resolvedType === "Referral";
                const displayCode = isReferralType ? currentCode : offer.code;

                return (
                  <div
                    key={offer.id}
                    className="glass-card rounded-3xl border border-white/15 hover:border-[#D4AF37]/60 transition-all p-5 sm:p-7 flex flex-col justify-between space-y-5 group bg-[#0D0B08]/95 shadow-2xl"
                  >
                    <div className="space-y-4">
                      {/* Top Type Pill, Badge & Discount Amount */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${
                              resolvedType === "Offer"
                                ? "bg-[#FFDF73]/20 border-[#FFDF73]/40 text-[#FFDF73]"
                                : resolvedType === "Discount"
                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                                : "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                            }`}
                          >
                            {resolvedType}
                          </span>
                          {offer.badge && (
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-xs font-mono uppercase">
                              {offer.badge}
                            </span>
                          )}
                        </div>

                        {(offer.discountPercentage || offer.discountAmount) && (
                          <span className="font-serif text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#D4AF37] to-[#AA7E18]">
                            {offer.discountPercentage || offer.discountAmount}
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-[#FFDF73] transition-colors">
                          {offer.title}
                        </h4>
                        <p className="text-sm sm:text-base text-neutral-300 font-light mt-2 leading-relaxed">
                          {offer.description}
                        </p>
                      </div>

                      {/* FULL UNCROPPED PICTURES WITH LIGHTBOX VIEW */}
                      {offer.images && offer.images.length > 0 && (
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-1 gap-4">
                            {offer.images.map((img, i) => (
                              <div
                                key={img.id || i}
                                className="rounded-2xl border border-[#D4AF37]/30 bg-[#070707] group/img shadow-lg overflow-hidden"
                              >
                                <div
                                  onClick={() => setLightboxImage({ url: img.url, caption: img.caption, title: offer.title })}
                                  className="w-full relative cursor-pointer bg-[#070707] p-2 sm:p-3 block"
                                  title="Click to view full picture"
                                >
                                  <img
                                    src={img.url}
                                    alt={img.caption || offer.title}
                                    className="w-full h-auto object-contain rounded-xl mx-auto block"
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      maxHeight: "none",
                                      objectFit: "contain",
                                      display: "block",
                                    }}
                                    referrerPolicy="no-referrer"
                                    loading="lazy"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-4 right-4 px-2.5 py-1.5 rounded-lg bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-md"
                                  >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span>Full View</span>
                                  </button>
                                </div>
                                {img.caption && (
                                  <div className="p-3.5 text-xs sm:text-sm text-neutral-200 bg-[#120F0C] border-t border-white/10 flex items-center space-x-2">
                                    <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                                    <span>{img.caption}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Terms & Validity */}
                      {(offer.terms || offer.validUntil) && (
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-300 space-y-1.5">
                          {offer.validUntil && (
                            <div className="flex items-center space-x-2 text-white font-medium">
                              <Calendar className="w-4 h-4 text-[#D4AF37]" />
                              <span>Valid: {offer.validUntil}</span>
                            </div>
                          )}
                          {offer.terms && <div className="text-xs leading-relaxed text-neutral-400">{offer.terms}</div>}
                        </div>
                      )}
                    </div>

                    {/* Promo Code & WhatsApp Claim */}
                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex items-center justify-between sm:justify-start space-x-2.5 bg-black/70 px-4 py-2.5 rounded-xl border border-[#D4AF37]/30">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-neutral-400 uppercase font-mono">
                            {isReferralType ? "Random Code:" : "Offer Code:"}
                          </span>
                          <span className="font-mono font-bold text-sm text-[#FFDF73]">{displayCode}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {isReferralType && (
                            <button
                              type="button"
                              onClick={() => setCurrentCode(generateFreshCode())}
                              className="p-1.5 hover:text-white text-cyan-400 transition-colors rounded-lg hover:bg-white/10"
                              title="Generate new random referral code"
                            >
                              <Dices className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleCopyOfferCode(displayCode)}
                            className="p-1.5 hover:text-white text-neutral-300 transition-colors rounded-lg hover:bg-white/10"
                            title="Copy code"
                          >
                            {copiedOfferCode === displayCode ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-[#D4AF37]" />
                            )}
                          </button>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/917044811476?text=${encodeURIComponent(
                          `Hello Trishanjit & Aayush! I want to claim ${resolvedType.toLowerCase()}: "${offer.title}" with code "${displayCode}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (isReferralType) {
                            setTimeout(() => setCurrentCode(generateFreshCode()), 600);
                          }
                        }}
                        className="px-5 py-3 gold-gradient-bg text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Claim on WhatsApp</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Client Premises In-Person Meeting Notice Banner */}
        <div className="p-5 sm:p-7 rounded-2xl glass-card border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#140F08] via-[#0E0C0A] to-[#0A0806]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif font-bold text-white text-base sm:text-lg">
                Kolkata In-Person Strategy Sessions at Your Premises
              </div>
              <div className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                We still lack our first office, so we save you time and travel directly to your business across Kolkata.
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/917044811476?text=Hello%20Trishanjit!%20I%20would%20like%20to%20discuss%20our%20project%20and%20claim%20available%20discounts."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs sm:text-sm uppercase tracking-wider shrink-0 hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <span>Inquire With Founders</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Full Picture Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-2 right-0 sm:top-2 sm:right-2 z-10 p-2.5 rounded-full bg-black/80 text-white hover:bg-[#D4AF37] hover:text-black border border-white/20 transition-colors"
              title="Close Full View"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption || lightboxImage.title || "Full Offer Image"}
              className="w-auto max-w-full max-h-[82vh] object-contain rounded-2xl border border-[#D4AF37]/40 shadow-2xl"
            />
            {(lightboxImage.caption || lightboxImage.title) && (
              <div className="mt-3 px-4 py-2 rounded-xl bg-black/80 border border-white/10 text-center">
                {lightboxImage.title && <div className="text-sm font-bold text-[#FFDF73]">{lightboxImage.title}</div>}
                {lightboxImage.caption && <div className="text-xs sm:text-sm text-neutral-300">{lightboxImage.caption}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
