import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck, Zap, Lock, Cpu, Globe, CheckCircle2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SECURE ENCRYPTED HANDSHAKE...");
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: "SSL Handshake", icon: Lock },
    { label: "3D WebGL Engine", icon: Cpu },
    { label: "Portfolio Matrix", icon: Globe },
    { label: "Ready to Launch", icon: Sparkles }
  ];

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4s luxury cinematic duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProg = Math.min((elapsed / duration) * 100, 100);
      const currentProg = Math.floor(rawProg);
      setProgress(currentProg);

      if (currentProg < 28) {
        setStatusText("INITIALIZING SECURE AES-256 HANDSHAKE...");
        setActiveStep(0);
      } else if (currentProg < 58) {
        setStatusText("LOADING 3D WEBGL GRAPHICS & BRAND ASSETS...");
        setActiveStep(1);
      } else if (currentProg < 88) {
        setStatusText("SYNCHRONIZING LIVE VERIFIED PORTFOLIOS & CLOUD DB...");
        setActiveStep(2);
      } else {
        setStatusText("SYSTEM DEPLOYED • ENTERING PUHAYT DIGITAL...");
        setActiveStep(3);
      }

      if (currentProg >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      id="puhayt-loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#040404] text-white flex flex-col items-center justify-center p-6 selection:bg-[#D4AF37] selection:text-[#0B0B0B]"
    >
      {/* Background Ambience Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-[170px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#AA7E18]/25 rounded-full blur-[100px]" />
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-md w-full text-center space-y-8 flex flex-col items-center">
        
        {/* Animated 3D Monogram Logo Emblem with Orbital Rings */}
        <div className="relative">
          {/* Pulsating Orbital Shimmer Rings */}
          <div className="absolute -inset-5 rounded-full border border-[#D4AF37]/30 animate-spin" style={{ animationDuration: "10s" }} />
          <div className="absolute -inset-9 rounded-full border border-[#D4AF37]/15 animate-spin" style={{ animationDuration: "16s", animationDirection: "reverse" }} />

          {/* Core Logo Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#2E2211] via-[#141008] to-[#070503] p-[2.5px] border border-[#D4AF37]/70 shadow-[0_0_50px_rgba(212,175,55,0.45)] flex items-center justify-center"
          >
            <div className="w-full h-full rounded-[21px] bg-[#0A0805] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/25 via-transparent to-white/15" />
              
              {/* Stylized P Vector Mark */}
              <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] animate-pulse">
                <defs>
                  <linearGradient id="loadGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF5BA" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#875E0D" />
                  </linearGradient>
                  <linearGradient id="loadSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#D0D0D0" />
                    <stop offset="100%" stopColor="#757575" />
                  </linearGradient>
                </defs>
                {/* Top Gold Geometric Loop */}
                <path
                  d="M26 18 H60 C76 18 82 28 82 40 C82 52 74 62 60 62 H44 V82 H26 Z"
                  fill="url(#loadGoldGrad)"
                />
                {/* Inner Counter Cutout */}
                <path
                  d="M44 32 H58 C66 32 68 36 68 40 C68 44 65 48 58 48 H44 Z"
                  fill="#0A0805"
                />
                {/* Lower-Right Silver 3D Chevron Accent */}
                <path
                  d="M56 64 L78 64 L62 82 L42 82 Z"
                  fill="url(#loadSilverGrad)"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1">
          <div className="font-serif text-3xl sm:text-4xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C0] via-[#D4AF37] to-[#A87B15]">
            PUHAYT
          </div>
          <div className="text-[11px] font-mono tracking-[0.45em] text-neutral-400 uppercase">
            DIGITAL AGENCY
          </div>
        </div>

        {/* Multi-Step Readiness Indicator */}
        <div className="grid grid-cols-4 gap-2 w-full pt-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isPassed = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                className={`p-2 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${
                  isPassed
                    ? "bg-[#18140B] border-[#D4AF37]/50 text-[#FFDF73]"
                    : isCurrent
                    ? "bg-[#2A2010] border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-white/[0.02] border-white/5 text-neutral-500"
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-[#FFDF73] animate-bounce" : ""}`} />
                )}
                <span className="text-[9px] font-mono leading-none truncate max-w-full font-semibold">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Subtle Gold Gradient Progress Bar & Telemetry */}
        <div className="w-full space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400 text-[11px] truncate max-w-[260px]">{statusText}</span>
            <span className="text-[#FFDF73] font-bold text-sm tracking-wider">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#875E0D] via-[#D4AF37] to-[#FFF4A8] rounded-full relative shadow-[0_0_15px_#D4AF37]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              {/* Glowing Leading Head Pip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
            </motion.div>
          </div>
        </div>

        {/* High-Tech Security Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>AES-256 SSL ENCRYPTED CONNECTION</span>
        </div>

      </div>
    </motion.div>
  );
};
