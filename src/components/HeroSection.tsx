import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Calendar, ShieldCheck, TrendingUp, Award, CheckCircle2, ChevronRight, Globe2, Crown, Activity } from "lucide-react";
import { ThreeBackground } from "./ThreeBackground";
import { useAgency } from "../context/AgencyContext";

interface HeroSectionProps {
  onStartProject?: () => void;
  onBookConsultation?: () => void;
  onViewPortfolio?: () => void;
  onOpenAudit?: () => void;
  onExploreServices?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onBookConsultation,
  onViewPortfolio,
  onOpenAudit,
  onExploreServices,
}) => {
  const { openClientDashboard } = useAgency();

  // Real-time live system clock & telemetry
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = onStartProject || onOpenAudit || (() => {});
  const handleConsult = onBookConsultation || (() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
  const handlePortfolio = onViewPortfolio || onExploreServices || (() => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
      {/* 3D WebGL Canvas Background */}
      <ThreeBackground interactive={true} />

      {/* Subtle Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#B8860B]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Controls */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 glass-card-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D4AF37]/30 shadow-lg animate-fadeIn max-w-full">
              <span className="flex h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37] shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-[#D4AF37] uppercase truncate">
                Awwwards-Level Digital Marketing & AI Agency
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif responsive-hero-title font-extrabold text-white tracking-tight break-words">
              We Don't Just Market Brands.{" "}
              <span className="gold-gradient-text block mt-1 sm:mt-2">
                We Build Digital Empires.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
              We help ambitious businesses dominate online through bespoke 3D websites, technical SEO supremacy, hyper-profitable Google & Meta ads, luxury branding, and autonomous AI marketing pipelines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <button
                onClick={handleStart}
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm text-[#0B0B0B] gold-gradient-bg shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleConsult}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm text-white glass-card hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all flex items-center justify-center space-x-2 border border-white/15"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Free Consultation</span>
              </button>

              <button
                onClick={handlePortfolio}
                className="px-4 py-3 sm:py-4 rounded-full text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center space-x-1 transition-colors"
              >
                <span>View Portfolio</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Direct Client Dashboard Badge / Access */}
            <div className="pt-1">
              <button
                onClick={openClientDashboard}
                className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-mono text-[#FFDF73] bg-[#16120C]/80 hover:bg-[#201A10] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all shadow-sm hover:scale-[1.02] max-w-full"
              >
                <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="truncate">Client Member? Access Private Portal &rarr;</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div>
                <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white gold-gradient-text">
                  $150M+
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5 sm:mt-1">
                  Client Revenue
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white gold-gradient-text">
                  340+
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5 sm:mt-1">
                  Brands Scaled
                </div>
              </div>

              <div>
                <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white gold-gradient-text">
                  98.4%
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-medium mt-0.5 sm:mt-1">
                  Client Retention
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Device Frame & Live Analytics Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Border Card */}
              <div className="relative glass-card p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl animate-float-slow">
                
                {/* Header Mockup Controls */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <div className="flex space-x-1.5 shrink-0">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-300 font-mono bg-white/5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                    <Globe2 className="w-3 h-3 text-[#D4AF37]" />
                    <span>puhayt.digital/live</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-[#FFDF73] font-bold text-[9px] sm:text-[10px]">{currentTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] sm:text-[9px] text-emerald-400 font-bold uppercase tracking-wider">LIVE TELEMETRY</span>
                  </div>
                </div>

                {/* Real-Time Live Analytics Dashboard Preview */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-[#121212]/95 p-3.5 sm:p-4 rounded-xl border border-[#D4AF37]/25 shadow-lg">
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="flex items-center space-x-1.5 text-neutral-300 font-medium text-[11px] sm:text-xs">
                        <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Real-Time Meta &amp; Google Ads ROAS</span>
                      </span>
                      <span className="text-emerald-400 font-semibold flex items-center font-mono text-[11px] sm:text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" /> Verified 1.3X
                      </span>
                    </div>
                    <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-baseline space-x-2">
                      <span>1.3X</span>
                      <span className="text-[10px] sm:text-xs font-sans text-[#D4AF37] font-semibold tracking-wide uppercase">Real-Time ROAS</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2.5 sm:mt-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#D4AF37] via-amber-400 to-emerald-400 h-full w-[70%]" />
                    </div>
                  </div>

                  {/* Grid Stats */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-[#121212]/90 p-2.5 sm:p-3 rounded-xl border border-white/10">
                      <div className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center justify-between">
                        <span>Google Search Rank</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1 flex items-center justify-between">
                        <span>Good</span>
                        <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" />
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-neutral-400 mt-1 font-mono">Core Web Vitals Optimal</div>
                    </div>

                    <div className="bg-[#121212]/90 p-2.5 sm:p-3 rounded-xl border border-white/10">
                      <div className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center justify-between">
                        <span>AI Assistant Engine</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-[#FFDF73] mt-1 flex items-center justify-between">
                        <span>Active</span>
                        <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37]" />
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-neutral-400 mt-1 font-mono">24/7 Automated Leads</div>
                    </div>
                  </div>

                  {/* Trishanjit Dalal Quote Card */}
                  <div className="glass-card-gold p-3 sm:p-3.5 rounded-xl border border-[#D4AF37]/40 flex items-center space-x-2.5 sm:space-x-3.5 shadow-xl bg-gradient-to-r from-[#18130B]/90 via-[#1C150A]/90 to-[#120F0C]/90">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#FFDF73] to-[#B8860B] flex items-center justify-center font-serif font-black text-[10px] sm:text-xs text-[#0B0B0B] shrink-0 shadow-md">
                      TD
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs text-white font-medium italic leading-relaxed">
                        "We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them"
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#FFDF73] font-bold mt-0.5 sm:mt-1 font-sans">
                        ~ Trishanjit Dalal
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-4 sm:-top-6 -left-3 sm:-left-6 glass-card-gold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-[#D4AF37]/40 shadow-xl hidden sm:flex items-center space-x-2 animate-bounce">
                <Award className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37]" />
                <div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-300 font-semibold">Ranked #1</div>
                  <div className="text-[11px] sm:text-xs font-bold text-white">Digital Agency 2026</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-6 -right-6 glass-card px-4 py-2.5 rounded-xl border border-white/20 shadow-2xl hidden sm:flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-neutral-400">Guaranteed ROI</div>
                  <div className="text-xs font-bold text-white">Data-Driven Growth</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
