import React, { useState } from "react";
import {
  Target,
  TrendingUp,
  Globe,
  Megaphone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Rocket,
  ShoppingCart,
  GraduationCap,
  Building2,
  HeartPulse,
  Info,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrandLogo } from "./BrandLogo";

interface OpeningPageProps {
  onEnter: (isAdult: boolean) => void;
}

export const OpeningPage: React.FC<OpeningPageProps> = ({ onEnter }) => {
  const [showUnder18Advisory, setShowUnder18Advisory] = useState(false);

  const handleAdultEnter = () => {
    onEnter(true);
  };

  const handleUnder18Click = () => {
    setShowUnder18Advisory(true);
  };

  const handleUnder18Proceed = () => {
    setShowUnder18Advisory(false);
    onEnter(false);
  };

  return (
    <div
      id="puhayt-opening-experience"
      className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#0B0B0B]"
    >
      {/* Background Ambient Lighting & Luxury Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Deep gold radial glow top-left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[160px]" />
        {/* Subtle warm amber rim light bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-[#7A5816]/15 rounded-full blur-[180px]" />
        {/* Subtle grid texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: HERO CONTENT & ACCESS GATE ================= */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-7 sm:space-y-8">
            
            {/* Top Brand Identity Mark */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-2"
            >
              {/* Dual-Tone 3D Metallic Monogram Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#2A2010] via-[#120F08] to-[#080603] p-[3px] border border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.45)] flex items-center justify-center group shrink-0">
                  {/* Subtle Inner Bevel */}
                  <div className="w-full h-full rounded-[22px] bg-[#0A0805] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/25 via-transparent to-white/15 opacity-80" />
                    {/* Stylized P Vector Mark */}
                    <svg viewBox="0 0 100 100" className="w-13 h-13 sm:w-16 sm:h-16 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]">
                      <defs>
                        <linearGradient id="goldMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFF2A3" />
                          <stop offset="50%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#8A6514" />
                        </linearGradient>
                        <linearGradient id="silverMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="60%" stopColor="#C0C0C0" />
                          <stop offset="100%" stopColor="#707070" />
                        </linearGradient>
                      </defs>
                      {/* Top Gold Geometric Loop of 'P' */}
                      <path
                        d="M26 18 H60 C76 18 82 28 82 40 C82 52 74 62 60 62 H44 V82 H26 Z"
                        fill="url(#goldMarkGrad)"
                      />
                      {/* Inner Counter Cutout */}
                      <path
                        d="M44 32 H58 C66 32 68 36 68 40 C68 44 65 48 58 48 H44 Z"
                        fill="#0A0805"
                      />
                      {/* Lower-Right Silver 3D Chevron Accent */}
                      <path
                        d="M56 64 L78 64 L62 82 L42 82 Z"
                        fill="url(#silverMarkGrad)"
                        opacity="0.95"
                      />
                    </svg>
                  </div>
                </div>

                {/* Brand Name Typography — Small and refined like before */}
                <div className="space-y-0.5">
                  <div className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#D4AF37] to-[#A87B15]">
                    PUHAYT
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono tracking-[0.35em] text-neutral-400 uppercase">
                    <span className="w-5 h-[1px] bg-[#D4AF37]/60" />
                    <span className="text-[#FFDF73] font-bold">DIGITAL</span>
                    <span className="w-5 h-[1px] bg-[#D4AF37]/60" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="space-y-3"
            >
              <h2 className="font-serif text-3xl sm:text-5xl xl:text-[54px] font-extrabold text-white leading-[1.1] tracking-tight">
                WE DON&apos;T JUST <br className="hidden sm:inline" />
                MARKET BRANDS. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0A0] via-[#D4AF37] to-[#AA7E18] drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                  WE GROW THEM.
                </span>
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                Strategic Digital Marketing that delivers real results, builds trust, and scales your business.
              </p>
            </motion.div>

            {/* 4 Feature Badges (Brand Strategy, Performance Marketing, Web & SEO, Creative Advertising) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1"
            >
              {/* Feature 1: Brand Strategy */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <Target className="w-4 h-4 text-[#FFDF73]" />
                </div>
                <span className="text-xs font-semibold text-neutral-200">Brand Strategy</span>
              </div>

              {/* Feature 2: Performance Marketing */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4 text-[#FFDF73]" />
                </div>
                <span className="text-xs font-semibold text-neutral-200">Performance Marketing</span>
              </div>

              {/* Feature 3: Web & SEO */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <Globe className="w-4 h-4 text-[#FFDF73]" />
                </div>
                <span className="text-xs font-semibold text-neutral-200">Web &amp; SEO</span>
              </div>

              {/* Feature 4: Creative Advertising */}
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#2A1E0E] to-[#120D05] border border-[#D4AF37]/30 flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform">
                  <Megaphone className="w-4 h-4 text-[#FFDF73]" />
                </div>
                <span className="text-xs font-semibold text-neutral-200">Creative Advertising</span>
              </div>
            </motion.div>

            {/* AGE VERIFICATION ACCESS GATE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="space-y-3 pt-2"
            >
              <div className="text-center sm:text-left">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#FFDF73] font-bold">
                  ARE YOU 18 YEARS OR OLDER?
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* YES, I AM 18+ (Primary Gold Button) */}
                <button
                  id="opening-btn-enter-adult"
                  onClick={handleAdultEnter}
                  className="py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wide text-[#0B0B0B] bg-gradient-to-r from-[#FFE07A] via-[#D4AF37] to-[#B8860B] shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 group cursor-pointer"
                >
                  <span className="font-extrabold uppercase tracking-wider">YES, I AM 18+</span>
                  <ArrowRight className="w-4 h-4 text-[#0B0B0B] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* NO, I AM UNDER 18 (Dark Outlined Button) */}
                <button
                  id="opening-btn-under-18"
                  onClick={handleUnder18Click}
                  className="py-3.5 px-6 rounded-2xl font-semibold text-xs sm:text-sm tracking-wide text-neutral-300 bg-white/[0.04] border border-white/20 hover:border-[#D4AF37]/50 hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center space-x-2.5 group cursor-pointer"
                >
                  <span className="uppercase tracking-wider">NO, I AM UNDER 18</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN: LUXURY PENTHOUSE & GLOWING RESULTS HUD ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-6 relative"
          >
            {/* Visual Glass Frame Container */}
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-[#14100A] via-[#090805] to-[#040404] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)] p-5 sm:p-7 space-y-6">
              
              {/* Penthouse Skyline & CEO Scene Mockup Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-black/60 border border-white/10 shadow-2xl">
                {/* High Resolution Night Skyline Background Image */}
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
                  alt="Puhayt Digital Executive Growth Suite"
                  className="w-full h-full object-cover opacity-35 mix-blend-luminosity scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette & Gold Atmospheric Fog */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-transparent to-[#090806]/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090806]/90 via-transparent to-transparent" />

                {/* 3D Glowing Gold Sculpture in Scene */}
                <div className="absolute right-4 bottom-4 w-32 sm:w-40 h-32 sm:h-40 pointer-events-none flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-2xl animate-pulse" />
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_25px_rgba(212,175,55,0.7)] transform rotate-[-6deg]">
                    <path
                      d="M26 18 H60 C76 18 82 28 82 40 C82 52 74 62 60 62 H44 V82 H26 Z"
                      fill="url(#goldMarkGrad)"
                    />
                    <path
                      d="M44 32 H58 C66 32 68 36 68 40 C68 44 65 48 58 48 H44 Z"
                      fill="#090806"
                    />
                    <path
                      d="M56 64 L78 64 L62 82 L42 82 Z"
                      fill="url(#silverMarkGrad)"
                    />
                  </svg>
                </div>

                {/* Subtle CEO Silhouette representation */}
                <div className="absolute left-6 bottom-4 flex items-center space-x-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-neutral-300">Live Client Systems Active</span>
                </div>
              </div>

              {/* FLOATING HUD RESULTS BOARD (Results that speak for themselves) */}
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-5 border border-[#D4AF37]/35 shadow-2xl space-y-4">
                
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFDF73] font-bold">
                      VERIFIED PERFORMANCE
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                      RESULTS THAT SPEAK FOR THEMSELVES.
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFDF73]" />
                    <span className="text-[10px] font-bold text-[#FFDF73]">Audited 2026</span>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="font-serif text-lg sm:text-2xl font-extrabold text-white">250+</div>
                    <div className="text-[10px] text-neutral-400 font-light">Projects Done</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="font-serif text-lg sm:text-2xl font-extrabold text-[#FFDF73]">98%</div>
                    <div className="text-[10px] text-neutral-400 font-light">Client Satisfaction</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="font-serif text-lg sm:text-2xl font-extrabold text-white">5M+</div>
                    <div className="text-[10px] text-neutral-400 font-light">Ad Impressions</div>
                  </div>
                </div>

                {/* Glowing Growth Trajectory Chart & ROI Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Left Chart: Rising Curve */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A140A] to-black border border-[#D4AF37]/20 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span>Traffic Growth</span>
                      <span className="text-emerald-400 font-bold">+340%</span>
                    </div>
                    {/* SVG Curve */}
                    <div className="h-12 w-full pt-2">
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7A5816" />
                            <stop offset="50%" stopColor="#D4AF37" />
                            <stop offset="100%" stopColor="#FFF2A3" />
                          </linearGradient>
                        </defs>
                        {/* Glow filter line */}
                        <path
                          d="M0 35 Q 25 30, 45 22 T 80 12 T 100 4"
                          fill="none"
                          stroke="url(#chartGrad)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        {/* Shimmer dot at peak */}
                        <circle cx="100" cy="4" r="3.5" fill="#FFF2A3" className="animate-ping" />
                        <circle cx="100" cy="4" r="2.5" fill="#D4AF37" />
                      </svg>
                    </div>
                  </div>

                  {/* Right Chart: Average ROI */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A140A] to-black border border-[#D4AF37]/20 flex flex-col justify-between">
                    <div className="text-[10px] uppercase font-bold text-neutral-400">BRAND GROWTH</div>
                    <div className="flex items-baseline space-x-1.5 my-1">
                      <span className="font-serif text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0A0] to-[#D4AF37]">
                        +320%
                      </span>
                      <span className="text-[10px] text-neutral-400">Average ROI</span>
                    </div>
                    {/* Mini Bar Chart */}
                    <div className="flex items-end space-x-1.5 h-6 pt-1">
                      <div className="w-1/5 bg-white/20 rounded-t h-[35%]" />
                      <div className="w-1/5 bg-white/30 rounded-t h-[50%]" />
                      <div className="w-1/5 bg-[#D4AF37]/60 rounded-t h-[70%]" />
                      <div className="w-1/5 bg-[#D4AF37]/80 rounded-t h-[85%]" />
                      <div className="w-1/5 bg-gradient-to-t from-[#D4AF37] to-[#FFF0A0] rounded-t h-[100%] shadow-[0_0_8px_#D4AF37]" />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR (Trusted Industries & Copyright) ================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#070604]/90 backdrop-blur-md py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          {/* Trusted Industries Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-neutral-400">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
              TRUSTED BY BUSINESSES ACROSS INDUSTRIES
            </span>
            <div className="hidden sm:block w-[1px] h-3 bg-white/20" />
            <div className="flex items-center space-x-1.5 text-neutral-300">
              <Rocket className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>Startups</span>
            </div>
            <div className="flex items-center space-x-1.5 text-neutral-300">
              <ShoppingCart className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>E-Commerce</span>
            </div>
            <div className="flex items-center space-x-1.5 text-neutral-300">
              <GraduationCap className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>EdTech</span>
            </div>
            <div className="flex items-center space-x-1.5 text-neutral-300">
              <Building2 className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>Real Estate</span>
            </div>
            <div className="flex items-center space-x-1.5 text-neutral-300">
              <HeartPulse className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span>Healthcare</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-neutral-500 font-light">
            © 2026 <span className="text-[#D4AF37] font-semibold">Puahyt Digital</span>. All rights reserved.
          </div>

        </div>
      </footer>

      {/* Under 18 Advisory Modal */}
      <AnimatePresence>
        {showUnder18Advisory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0F0D0A] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73]">
                <Info className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">
                  Age Guidance &amp; Public Access
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  Enterprise contract signing, payment billing, and official ad campaigns require age 18+. However, you are welcome to browse our public website portfolio, case studies, and educational digital tools in student mode!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={handleUnder18Proceed}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg hover:scale-105 transition-transform"
                >
                  Explore in Public Mode
                </button>
                <button
                  onClick={() => setShowUnder18Advisory(false)}
                  className="py-3 px-4 rounded-xl text-xs text-neutral-400 hover:text-white bg-white/5"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
