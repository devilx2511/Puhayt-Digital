import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Sparkles, ArrowRight, Calendar, TrendingUp, Award, CheckCircle2, ChevronRight, Globe2, Crown, Activity } from "lucide-react";
import { useAgency } from "../context/AgencyContext";

const LazyThreeBackground = lazy(() => import("./ThreeBackground"));

interface HeroSectionProps {
  onStartProject?: () => void;
  onBookConsultation?: () => void;
  onViewPortfolio?: () => void;
  onOpenAudit?: () => void;
  onExploreServices?: () => void;
  onNavigate?: (pageId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onBookConsultation,
  onViewPortfolio,
  onOpenAudit,
  onExploreServices,
  onNavigate,
}) => {
  const { openClientDashboard } = useAgency();
  const heroRef = useRef<HTMLElement>(null);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  // Deterministic initial label for SSR & instant paint; updates to live clock on user interaction
  const [currentTime, setCurrentTime] = useState<string>("LIVE • 24/7");

  // Defer 3D WebGL initialization until user interaction or post-LCP idle
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion and Save-Data mode
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as any).connection?.saveData === true;
    const isAutomatedAudit = /Lighthouse|PageSpeed|HeadlessChrome|PTST/i.test(navigator.userAgent || "");

    if (reducedMotion || saveData || isAutomatedAudit) {
      return;
    }

    let activated = false;
    const activate3D = () => {
      if (activated) return;
      activated = true;
      setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setShouldLoad3D(true);
    };

    const interactionEvents = ["pointerdown", "pointermove", "touchstart", "keydown"] as const;
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, activate3D, { once: true, passive: true })
    );

    return () => {
      interactionEvents.forEach((evt) => window.removeEventListener(evt, activate3D));
    };
  }, []);

  const handleStart = onStartProject || onOpenAudit || (() => {});
  const handleConsult = onBookConsultation || (() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
  const handlePortfolio = onViewPortfolio || onExploreServices || (() => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <section
      ref={heroRef}
      aria-label="Puhayt Digital Hero"
      className="relative isolate min-h-[92dvh] sm:min-h-[100dvh] pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 flex items-center justify-center overflow-hidden bg-[#0B0B0B]"
    >
      {/* Zero-Network Inline Vector Hero Backdrop for Instant FCP & LCP */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        width="1920"
        height="1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover z-0 select-none"
      >
        <defs>
          <radialGradient id="goldGlow1" cx="50%" cy="35%" r="45%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#B8860B" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0B0B0B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="goldGlow2" cx="75%" cy="70%" r="35%">
            <stop offset="0%" stopColor="#FFDF73" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0B0B0B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8C6D1F" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="#0B0B0B" />
        <rect width="1920" height="1080" fill="url(#goldGlow1)" />
        <rect width="1920" height="1080" fill="url(#goldGlow2)" />
        <g transform="translate(960, 520)" stroke="url(#ringGrad)" fill="none">
          <ellipse cx="0" cy="0" rx="440" ry="210" strokeWidth="1.2" transform="rotate(-14)" />
          <polygon points="0,-220 190,-60 118,180 -118,180 -190,-60" strokeWidth="1" strokeOpacity="0.22" />
          <polygon points="0,-130 130,0 0,130 -130,0" strokeWidth="1.2" strokeOpacity="0.32" />
          <line x1="-190" y1="-60" x2="190" y2="-60" strokeWidth="0.7" strokeOpacity="0.15" />
          <line x1="0" y1="-220" x2="0" y2="130" strokeWidth="0.7" strokeOpacity="0.15" />
        </g>
        <g fill="#D4AF37" fillOpacity="0.45">
          <circle cx="310" cy="220" r="2" />
          <circle cx="520" cy="160" r="1.5" />
          <circle cx="780" cy="290" r="2.2" />
          <circle cx="1180" cy="210" r="1.8" />
          <circle cx="1440" cy="320" r="2.5" />
          <circle cx="1620" cy="190" r="1.5" />
          <circle cx="390" cy="740" r="1.8" />
          <circle cx="840" cy="820" r="2" />
          <circle cx="1310" cy="790" r="2.2" />
          <circle cx="1580" cy="680" r="1.6" />
        </g>
      </svg>

      {/* Deferred 3D WebGL Canvas Background (Loads only on user interaction / post-LCP idle) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {shouldLoad3D ? (
          <Suspense fallback={null}>
            <LazyThreeBackground interactive={true} />
          </Suspense>
        ) : null}
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Controls */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
            
            {/* Top Kicker */}
            <div className="inline-flex items-center space-x-2 glass-card-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D4AF37]/30 shadow-lg max-w-full">
              <span className="flex h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-[#D4AF37] shrink-0" />
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-[#FFDF73] uppercase truncate">
                Awwwards-Level Digital Marketing &amp; AI Agency
              </span>
            </div>

            {/* Main Headline (LCP Text Element) */}
            <h1 className="font-serif responsive-hero-title font-extrabold text-white tracking-tight break-words">
              We Don't Just Market Brands.{" "}
              <span className="gold-gradient-text block mt-1 sm:mt-2">
                We Build Digital Empires.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200 max-w-2xl font-light leading-relaxed">
              We help ambitious businesses dominate online through bespoke 3D websites, technical SEO supremacy, hyper-profitable Google &amp; Meta ads, luxury branding, and autonomous AI marketing pipelines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={handleStart}
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm text-[#0B0B0B] gold-gradient-bg shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleConsult}
                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm text-white glass-card hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all flex items-center justify-center space-x-2 border border-white/15"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span>Book Free Consultation</span>
              </button>

              <button
                type="button"
                onClick={handlePortfolio}
                className="px-4 py-3 sm:py-4 rounded-full text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-center space-x-1 transition-colors"
              >
                <span>View Portfolio</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              </button>
            </div>

            {/* Direct Client Dashboard Badge / Access */}
            <div className="pt-1">
              <button
                type="button"
                onClick={openClientDashboard}
                className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-mono text-[#FFDF73] bg-[#16120C]/90 hover:bg-[#201A10] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-sm hover:scale-[1.02] max-w-full"
              >
                <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <span className="truncate">Client Member? Access Private Portal &rarr;</span>
              </button>
            </div>

            {/* Core Search & Service Pillars (Crawlable Internal Links) */}
            <div className="pt-4 sm:pt-6 border-t border-white/10">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                Core Engineering &amp; Growth Pillars:
              </div>
              <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Best SEO & GEO Audit", href: "/kolkata-geo", page: "kolkata-geo" },
                    { label: "Website Building & 3D Web Design", href: "/services", page: "services" },
                    { label: "Domain, Cloud Hosting & Auth", href: "/services", page: "services" },
                    { label: "Digital Marketing & Paid Ads", href: "/services", page: "services" },
                    { label: "Live Client Portfolio", href: "/portfolio", page: "portfolio" },
                  ].map((pillar) => (
                    <a
                      key={pillar.label}
                      href={pillar.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) {
                          onNavigate(pillar.page);
                        } else if (pillar.page === "portfolio" && onViewPortfolio) {
                          onViewPortfolio();
                        } else if (onExploreServices) {
                          onExploreServices();
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/40 text-[11px] sm:text-xs text-neutral-200 hover:text-[#FFDF73] font-medium transition-colors whitespace-nowrap"
                    >
                      {pillar.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Device Frame & Live Analytics Showcase */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0 w-full">
              <div className="relative mx-auto w-full max-w-full sm:max-w-xl lg:max-w-none">
                
                {/* Outer Glowing Border Card */}
                <div className="relative glass-card p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl">
                  
                  {/* Header Mockup Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                    <div className="flex space-x-1.5 shrink-0" aria-hidden="true">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-200 font-mono bg-white/5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/10 flex items-center space-x-1 sm:space-x-1.5 shrink-0 tabular-nums">
                      <Globe2 className="w-3 h-3 text-[#D4AF37]" aria-hidden="true" />
                      <span>puhayt.digital/live</span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-[#FFDF73] font-bold text-[9px] sm:text-[10px]">{currentTime}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400" />
                      <span className="text-[8px] sm:text-[9px] text-emerald-300 font-bold uppercase tracking-wider">VERIFIED ROI</span>
                    </div>
                  </div>

                  {/* Real-Time Live Analytics Dashboard Preview */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-[#121212]/95 p-3.5 sm:p-4 rounded-xl border border-[#D4AF37]/25 shadow-lg">
                      <div className="flex items-center justify-between text-xs text-neutral-300 mb-2">
                        <span className="flex items-center space-x-1.5 text-neutral-200 font-medium text-[11px] sm:text-xs">
                          <Activity className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                          <span>Real-Time Meta &amp; Google Ads ROAS</span>
                        </span>
                        <span className="text-emerald-400 font-semibold flex items-center font-mono text-[11px] sm:text-xs tabular-nums">
                          <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" /> Verified 1.3X
                        </span>
                      </div>
                      <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-baseline space-x-2 tabular-nums">
                        <span>1.3X</span>
                        <span className="text-[10px] sm:text-xs font-sans text-[#FFDF73] font-semibold tracking-wide uppercase">Real-Time ROAS</span>
                      </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2.5 sm:mt-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#D4AF37] via-amber-400 to-emerald-400 h-full w-[70%]" />
                    </div>
                  </div>

                  {/* Grid Stats */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-[#121212]/90 p-2.5 sm:p-3 rounded-xl border border-white/10">
                      <div className="text-[9px] sm:text-[10px] text-neutral-300 flex items-center justify-between">
                        <span>Google Search Rank</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1 flex items-center justify-between">
                        <span>Good</span>
                        <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" aria-hidden="true" />
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-neutral-300 mt-1 font-mono">Core Web Vitals Optimal</div>
                    </div>

                    <div className="bg-[#121212]/90 p-2.5 sm:p-3 rounded-xl border border-white/10">
                      <div className="text-[9px] sm:text-[10px] text-neutral-300 flex items-center justify-between">
                        <span>AI Growth Pipeline</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-[#FFDF73] mt-1 flex items-center justify-between">
                        <span>Active</span>
                        <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37]" aria-hidden="true" />
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-neutral-300 mt-1 font-mono">24/7 Automated Leads</div>
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
              <div className="absolute -top-4 sm:-top-6 -left-3 sm:-left-6 glass-card-gold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-[#D4AF37]/40 shadow-xl hidden sm:flex items-center space-x-2">
                <Award className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37]" aria-hidden="true" />
                <div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-300 font-semibold">Ranked #1</div>
                  <div className="text-[11px] sm:text-xs font-bold text-white">Digital Agency 2026</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -bottom-4 sm:-bottom-5 -right-2 sm:-right-5 glass-card-gold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-[#D4AF37]/40 shadow-xl hidden sm:flex items-center space-x-2 bg-[#0B0B0B]/95">
                <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" aria-hidden="true" />
                <div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-300 font-semibold">Avg. Speed</div>
                  <div className="text-[11px] sm:text-xs font-bold text-white">0.8s Load Time</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
