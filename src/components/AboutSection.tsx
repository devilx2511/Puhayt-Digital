import React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Phone, 
  MessageCircle, 
  Clock, 
  Instagram, 
  MapPin, 
  Building2, 
  User, 
  ExternalLink,
  Laptop,
  Flame,
  ArrowRight
} from "lucide-react";
import { useAgency } from "../context/AgencyContext";

export const AboutSection: React.FC = () => {
  const { teamMembers, openDevMode } = useAgency();

  // Helper to resolve clean Instagram HTTPS URL that opens in Instagram App on Mobile (via Universal Links) and Web on Laptop/Desktop
  const getInstagramUrl = (usernameOrHandle: string | undefined, fallbackUrl: string) => {
    const cleanUsername = (usernameOrHandle || "")
      .replace(/^@/, "")
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
      .replace(/\/+$/, "")
      .trim();
    if (cleanUsername) {
      return `https://www.instagram.com/${cleanUsername}/`;
    }
    return fallbackUrl;
  };

  const trishanjit = teamMembers.find((m) => m.id === "trishanjit-dalal") || teamMembers[0];
  const aayush = teamMembers.find((m) => m.id === "aayush-ghosh") || teamMembers[1];

  return (
    <section id="about" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting safely constrained to viewport */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[90vw] sm:max-w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founders &amp; Leadership</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight">
            Meet The <span className="gold-gradient-text">Leadership</span> Behind Puhayt
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            We are passionate young builders and growth engineers combining cutting-edge 3D web architecture, technical SEO, and algorithmic ad scaling.
          </p>
        </div>

        {/* ================= FOUNDER PROFILES (TRISHANJIT DALAL & AAYUSH GHOSH) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* CARD 1: TRISHANJIT DALAL */}
          {trishanjit && (
            <div className="glass-card-gold p-5 sm:p-7 md:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#1A130A] via-[#120E08] to-[#0A0805] group">
              <div className="space-y-5">
                
                {/* Header with Photo / Avatar & Age Tag */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-[#D4AF37] bg-[#120E08] overflow-hidden flex items-center justify-center shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      {trishanjit.imageUrl ? (
                        <img
                          src={trishanjit.imageUrl}
                          alt={trishanjit.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6D1F] flex items-center justify-center font-serif text-2xl sm:text-3xl font-black text-[#0B0B0B]">
                          TD
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={openDevMode}
                        className="absolute bottom-0.5 right-0.5 px-1 py-0.5 rounded bg-black/85 text-[8px] font-mono text-[#FFDF73] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-colors"
                        title="Upload/Change Photo in DevMode"
                      >
                        DevMode
                      </button>
                    </div>
                    <div>
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#FFDF73]/10 border border-[#D4AF37]/40 text-[#FFDF73] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                        <Flame className="w-3 h-3 text-[#FFDF73]" />
                        <span>16 Years Old</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {trishanjit.name}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-[#D4AF37] tracking-wide mt-0.5">
                        ~ Ads Runner &amp; Marketing Lead
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Responsibilities / Skills */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Core Specializations &amp; Responsibilities:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white">
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="font-medium">Ads Runner</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="font-medium">Marketing</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="font-medium">Payment</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="font-medium">Enquires</span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Details Block */}
                <div className="p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/30 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFDF73] font-bold flex items-center justify-between">
                    <span>Direct Founder Contact</span>
                    <span className="flex items-center space-x-1 text-[10px] text-neutral-400 font-normal">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>Calling: 10 AM to 10 PM</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* Phone */}
                    <a
                      href={`tel:${trishanjit.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors group/btn"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#FFDF73] group-hover/btn:bg-[#D4AF37] group-hover/btn:text-black transition-colors shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-neutral-400">Phone Call</div>
                        <div className="font-mono font-bold text-xs truncate">{trishanjit.phone}</div>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${trishanjit.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Trishanjit! I would like to inquire about ads and digital marketing for my business.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-white border border-emerald-500/30 transition-colors group/btn"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover/btn:bg-emerald-500 group-hover/btn:text-black transition-colors shrink-0">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-emerald-400 font-semibold">WhatsApp Chat</div>
                        <div className="font-mono font-bold text-xs truncate">{trishanjit.whatsapp}</div>
                      </div>
                    </a>
                  </div>

                  {/* Instagram Direct Link (Works on Mobile App & Laptop Browser) */}
                  <div className="pt-1">
                    <a
                      href={getInstagramUrl(trishanjit.instagramUsername || "itz___.unknown_13", "https://www.instagram.com/itz___.unknown_13/")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-950/50 via-pink-950/40 to-rose-950/50 border border-pink-500/40 text-white hover:border-pink-400 transition-all group/ig"
                      title="Open @itz___.unknown_13 on Instagram"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Instagram className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] text-neutral-300">Instagram</div>
                          <div className="font-mono font-bold text-xs sm:text-sm text-[#FFDF73] group-hover/ig:text-white transition-colors">
                            {trishanjit.instagramUsername || "@itz___.unknown_13"}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-300 font-mono flex items-center space-x-1.5 group-hover/ig:text-[#FFDF73]">
                        <span>Open Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* CARD 2: AAYUSH GHOSH */}
          {aayush && (
            <div className="glass-card-gold p-5 sm:p-7 md:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#10141A] via-[#0D1017] to-[#080A0E] group">
              <div className="space-y-5">
                
                {/* Header with Photo / Avatar & Age Tag */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-cyan-400/60 bg-[#0A0E14] overflow-hidden flex items-center justify-center shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      {aayush.imageUrl ? (
                        <img
                          src={aayush.imageUrl}
                          alt={aayush.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 flex items-center justify-center font-serif text-2xl sm:text-3xl font-black text-white">
                          AG
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={openDevMode}
                        className="absolute bottom-0.5 right-0.5 px-1 py-0.5 rounded bg-black/85 text-[8px] font-mono text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black transition-colors"
                        title="Upload/Change Photo in DevMode"
                      >
                        DevMode
                      </button>
                    </div>
                    <div>
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                        <Flame className="w-3 h-3 text-cyan-400" />
                        <span>17 Years Old</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {aayush.name}
                      </h3>
                      <div className="text-xs sm:text-sm font-semibold text-cyan-300 tracking-wide mt-0.5">
                        Website Developer &amp; SEO Expert
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Responsibilities / Skills */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Core Specializations &amp; Responsibilities:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white">
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-medium">Website Developer</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-medium">Website Designer</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-medium">Website Builder</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-medium">SEO Expert</span>
                    </div>
                    <div className="col-span-2 flex items-center space-x-2 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="font-medium">Domain, Hosting, and Authentication</span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Details Block */}
                <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center justify-between">
                    <span>Direct Technical Contact</span>
                    <span className="flex items-center space-x-1 text-[10px] text-neutral-400 font-normal">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Calling: 12:30 PM to 10:30 PM</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* Phone */}
                    <a
                      href={`tel:${aayush.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors group/btn"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-400/20 flex items-center justify-center text-cyan-300 group-hover/btn:bg-cyan-400 group-hover/btn:text-black transition-colors shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-neutral-400">Phone Call</div>
                        <div className="font-mono font-bold text-xs truncate">{aayush.phone}</div>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${aayush.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Aayush! I would like to discuss building a website and technical SEO for my business.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-white border border-emerald-500/30 transition-colors group/btn"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover/btn:bg-emerald-500 group-hover/btn:text-black transition-colors shrink-0">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] text-emerald-400 font-semibold">WhatsApp Chat</div>
                        <div className="font-mono font-bold text-xs truncate">{aayush.whatsapp}</div>
                      </div>
                    </a>
                  </div>

                  {/* Instagram Direct Link (Works on Mobile App & Laptop Browser) */}
                  <div className="pt-1">
                    <a
                      href={getInstagramUrl(aayush.instagramUsername || "aayushg.dev", "https://www.instagram.com/aayushg.dev/")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-950/50 via-purple-950/40 to-pink-950/50 border border-purple-500/40 text-white hover:border-purple-400 transition-all group/ig"
                      title="Open @aayushg.dev on Instagram"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Instagram className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] text-neutral-300">Instagram</div>
                          <div className="font-mono font-bold text-xs sm:text-sm text-cyan-300 group-hover/ig:text-white transition-colors">
                            {aayush.instagramUsername || "@aayushg.dev"}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-300 font-mono flex items-center space-x-1.5 group-hover/ig:text-cyan-300">
                        <span>Open Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ================= HONEST OFFICE POLICY & CLIENT PREMISES MEETINGS ================= */}
        <div className="glass-card-gold p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/50 mb-12 sm:mb-16 bg-gradient-to-r from-[#1A1308] via-[#140F08] to-[#0D0A06] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#FFDF73] bg-[#2A1D08] px-3 py-1 rounded-full border border-[#D4AF37]/40 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Our Operational Model &amp; Office Policy</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                We Still Lack Our First Office — <span className="gold-gradient-text">So We Meet Directly at Your Premises!</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                We believe in 100% transparency. As an ambitious young digital agency, <strong>we still lack our first commercial office</strong>. Trishanjit Dalal operates out of Kolkata (West Bengal). Rather than asking you to travel, <strong>we come directly to your office, store, showroom, or business premises anywhere across Kolkata</strong> for executive strategy meetings. For clients outside Kolkata, we meet seamlessly via Google Meet and Zoom worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
              <a
                href={`https://wa.me/917044811476?text=${encodeURIComponent("Hello Trishanjit & Aayush! We would like to schedule an in-person briefing at our office/premises in Kolkata.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-black" />
                <span>Book Meeting at Your Premises</span>
              </a>
              <a
                href="tel:+917044811476"
                className="px-5 py-3 glass-card text-neutral-300 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Trishanjit (+91 70448 11476)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Story & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-12 sm:mb-16">
          
          <div className="glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 space-y-3.5 sm:space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              To eradicate generic, slow templates and replace them with Apple-tier craftsmanship, sub-second web speed, technical SEO rankings, and high-ROAS ad campaigns that generate real paying customers for our clients.
            </p>
            <div className="pt-3 sm:pt-4 border-t border-white/10 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero Subcontracting</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% In-House Code</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 space-y-3.5 sm:space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Core Pillars</h3>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs text-neutral-300">
                <span className="font-bold text-[#D4AF37] shrink-0">01. Precision Craftsmanship:</span>
                <span>Custom design, clean code, modern UX, and instant loading speed.</span>
              </div>
              <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs text-neutral-300">
                <span className="font-bold text-[#D4AF37] shrink-0">02. Verified ROI Data:</span>
                <span>Real metrics, transactional keyword SEO, and validated revenue.</span>
              </div>
              <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs text-neutral-300">
                <span className="font-bold text-[#D4AF37] shrink-0">03. Direct Founder Attention:</span>
                <span>Work directly with Trishanjit and Aayush with zero middlemen.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
