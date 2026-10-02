import React from "react";
import { GoogleMapLocation } from "./GoogleMapLocation";
import { Sparkles, CheckCircle2, ShieldCheck, Award } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excellence In Execution</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight">
            About <span className="gold-gradient-text">Puhayt Digital</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            We are an elite team of senior digital architects, brand designers, SEO directors, and AI engineers who craft high-performing digital engines for ambitious brands.
          </p>
        </div>

        {/* Founder Vision Manifesto */}
        <div className="glass-card-gold p-4 sm:p-7 md:p-9 lg:p-10 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/40 mb-8 sm:mb-12 shadow-2xl relative overflow-hidden bg-gradient-to-r from-[#18130B] via-[#14100C] to-[#0D0A08]">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6D1F] flex items-center justify-center font-serif text-xl sm:text-2xl md:text-3xl font-black text-[#0B0B0B] shrink-0 shadow-xl">
              TD
            </div>
            <div className="space-y-2.5 sm:space-y-3 text-center md:text-left flex-1">
              <div className="inline-flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#FFDF73] bg-[#2A1D0B]/80 px-2.5 sm:px-3 py-1 rounded-full border border-[#D4AF37]/30">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Founder's Executive Statement</span>
              </div>
              <blockquote className="font-serif text-base sm:text-xl md:text-2xl text-white font-medium italic leading-relaxed">
                "We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them"
              </blockquote>
              <div className="text-[11px] sm:text-xs text-[#D4AF37] font-semibold tracking-wide">
                ~ Trishanjit Dalal <span className="text-neutral-400 font-normal">| Founder &amp; Lead Architect, Puhayt Digital</span>
              </div>
            </div>
            
            {/* Live Benchmarks Pill */}
            <div className="flex flex-wrap sm:flex-nowrap md:flex-col gap-2.5 sm:gap-3 shrink-0 text-left w-full sm:w-auto justify-center">
              <div className="bg-[#0B0B0B]/80 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/10 flex-1 sm:flex-initial">
                <div className="text-[9px] sm:text-[10px] text-neutral-400">Target ROAS</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono">1.3X Attained</div>
              </div>
              <div className="bg-[#0B0B0B]/80 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/10 flex-1 sm:flex-initial">
                <div className="text-[9px] sm:text-[10px] text-neutral-400">Search Rank</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">Good Quality</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-12 sm:mb-16">
          
          <div className="glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 space-y-3.5 sm:space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              To eradicate generic, low-converting digital presence and replace it with Apple-tier design, sub-second web speed, and autonomous AI marketing systems that guarantee high-margin client growth.
            </p>
            <div className="pt-3 sm:pt-4 border-t border-white/10 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero Subcontracting</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Transparent Growth SLAs</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 space-y-3.5 sm:space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Core Pillars</h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs text-neutral-300">
                <span className="font-bold text-[#D4AF37] shrink-0">01. Precision Craftsmanship:</span>
                <span>Every line of code and visual pixel is engineered for perfection.</span>
              </div>
              <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs text-neutral-300">
                <span className="font-bold text-[#D4AF37] shrink-0">02. Verified ROI Data:</span>
                <span>Campaign decisions are driven strictly by validated revenue metrics.</span>
              </div>
              <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs text-neutral-300">
                <span className="font-bold text-[#D4AF37] shrink-0">03. Autonomous AI Systems:</span>
                <span>We leverage custom fine-tuned Gemini models for exponential scale.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Agency HQ Location Google Map Section */}
        <div className="mt-8">
          <GoogleMapLocation />
        </div>

      </div>
    </section>
  );
};

