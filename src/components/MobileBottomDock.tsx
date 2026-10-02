import React from "react";
import { Compass, Layers, Bot, Briefcase, Menu, Sparkles, MoreVertical, SlidersHorizontal } from "lucide-react";

interface MobileBottomDockProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenDrawer: () => void;
  onOpenAISuite: () => void;
  onOpenAudit: () => void;
  onOpenOptions?: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  currentSection,
  onNavigate,
  onOpenDrawer,
  onOpenAISuite,
  onOpenOptions,
}) => {
  return (
    <nav
      id="mobile-bottom-navigation-dock"
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-3 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none lg:hidden flex justify-center"
    >
      <div className="pointer-events-auto w-full max-w-md bg-[#0D0B08]/95 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-between relative">
        
        {/* Subtle Ambient Gold Gradient Line at Top */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

        {/* 1. Home Button */}
        <button
          id="dock-nav-home"
          onClick={() => onNavigate("home")}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all group relative ${
            currentSection === "home" ? "text-[#D4AF37]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              currentSection === "home"
                ? "bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                : "group-hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Home</span>
          {currentSection === "home" && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37] mt-0.5" />
          )}
        </button>

        {/* 2. Services Button */}
        <button
          id="dock-nav-services"
          onClick={() => onNavigate("services")}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all group ${
            currentSection === "services" ? "text-[#D4AF37]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              currentSection === "services"
                ? "bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                : "group-hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Services</span>
        </button>

        {/* 3. Elevated Center Action: Puhayt AI ✨ */}
        <div className="flex-1 flex justify-center -translate-y-4 relative">
          <button
            id="dock-nav-ai-center"
            onClick={onOpenAISuite}
            aria-label="Open Puhayt AI Strategist"
            className="group relative flex flex-col items-center focus:outline-none"
          >
            {/* Glowing Aura Ring */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
            
            {/* Elevated Gold/Crimson Circular Button */}
            <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#734B0B] shadow-[0_4px_20px_rgba(212,175,55,0.5)] group-hover:scale-105 group-active:scale-95 transition-all">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#3D1414] via-[#1A0A0A] to-[#0A0505] flex items-center justify-center border border-[#D4AF37]/40">
                <Bot className="w-5 h-5 text-[#FFDF73] group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            {/* Label Under Elevated Center */}
            <div className="mt-1 flex items-center space-x-0.5 bg-[#0D0B08]/90 px-2 py-0.5 rounded-full border border-[#D4AF37]/30 shadow-md">
              <span className="text-[9px] font-extrabold text-[#FFDF73] tracking-tight">Puhayt AI</span>
              <Sparkles className="w-2.5 h-2.5 text-[#FFDF73] animate-pulse" />
            </div>
          </button>
        </div>

        {/* 4. Portfolio / Work Button */}
        <button
          id="dock-nav-portfolio"
          onClick={() => onNavigate("portfolio")}
          className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all group ${
            currentSection === "portfolio" ? "text-[#D4AF37]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              currentSection === "portfolio"
                ? "bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                : "group-hover:bg-white/5"
            }`}
          >
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Portfolio</span>
        </button>

        {/* 5. Google Stitch Three-Dot Options & Sitemap Trigger */}
        <button
          id="dock-nav-options-dots"
          onClick={onOpenOptions || onOpenDrawer}
          className="flex-1 py-1.5 flex flex-col items-center justify-center transition-all text-neutral-400 hover:text-[#FFDF73] group"
          title="Google Stitch Quick Options & Visual Sitemap"
        >
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center group-hover:bg-[#FFDF73]/10 border border-transparent group-hover:border-[#D4AF37]/40 transition-all">
            <MoreVertical className="w-4 h-4 text-[#FFDF73]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5 text-neutral-300 group-hover:text-[#FFDF73]">Options</span>
        </button>

      </div>
    </nav>
  );
};
