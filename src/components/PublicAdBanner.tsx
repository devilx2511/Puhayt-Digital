import React, { useState, useMemo } from "react";
import { useAgency } from "../context/AgencyContext";
import { ArrowRight, X, Megaphone } from "lucide-react";

export const PublicAdBanner: React.FC = () => {
  const { campaigns, recordCampaignClick } = useAgency();
  const [isDismissed, setIsDismissed] = useState(false);

  // ONLY select campaigns where status === "published" && approved === true
  const activeCampaign = useMemo(() => {
    return campaigns.find(
      (c) => c.status === "published" && c.approved === true
    ) || null;
  }, [campaigns]);

  if (!activeCampaign || isDismissed) return null;

  const handleClick = () => {
    recordCampaignClick(activeCampaign.id);
    if (activeCampaign.targetUrl.startsWith("#")) {
      const el = document.querySelector(activeCampaign.targetUrl);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = activeCampaign.targetUrl;
    }
  };

  return (
    <div
      role="region"
      aria-label="Official Announcement"
      className="relative z-40 bg-gradient-to-r from-[#141414] via-[#1C1608] to-[#141414] border-b border-[#D4AF37]/30 text-white shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Badge & Text */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className="shrink-0 flex items-center space-x-1.5 glass-card-gold px-2.5 py-1 rounded-full text-[10px] font-bold text-[#FFDF73] uppercase tracking-wider border border-[#D4AF37]/40">
            <Megaphone className="w-3 h-3" aria-hidden="true" />
            <span>Official Announcement</span>
          </span>

          <p className="text-xs sm:text-sm font-medium text-neutral-200 truncate">
            <span className="text-[#FFDF73] font-semibold">
              {activeCampaign.headlines[0] || activeCampaign.name}
            </span>
            <span className="hidden md:inline text-neutral-300 ml-2 font-light">
              — {activeCampaign.primaryText.slice(0, 90)}...
            </span>
          </p>
        </div>

        {/* Action CTA & Close Button */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0B0B0B] gold-gradient-bg hover:scale-105 transition-all shadow-md"
          >
            <span>{activeCampaign.ctaText || "Learn More"}</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss Announcement"
            className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
