import React from "react";
import { 
  X, 
  Compass, 
  Layers, 
  Briefcase, 
  Sparkles, 
  Bot, 
  CreditCard, 
  Star, 
  Phone, 
  LogIn, 
  ShieldCheck, 
  MessageCircle,
  Calculator,
  Lock,
  ChevronRight,
  Send,
  Crown,
  SlidersHorizontal,
  MapPin,
  Building2,
  BookOpen,
  FileText
} from "lucide-react";
import { useAgency } from "../context/AgencyContext";
import { BrandLogo } from "./BrandLogo";
import { motion, AnimatePresence } from "motion/react";

interface MobileSlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAudit: () => void;
  onOpenSearch: () => void;
  onOpenAISuite: () => void;
  onOpenOptions?: () => void;
}

export const MobileSlideDrawer: React.FC<MobileSlideDrawerProps> = ({
  isOpen,
  onClose,
  currentSection,
  onNavigate,
  onOpenAudit,
  onOpenSearch,
  onOpenAISuite,
  onOpenOptions,
}) => {
  const {
    openDevMode,
    contactInfo,
    isDevModeAuthenticated,
    currentUser,
    userProfile,
    openAuthModal,
    logout,
    openClientDashboard,
  } = useAgency();

  const handleItemClick = (action: () => void) => {
    action();
    onClose();
  };

  const primaryWhatsapp = contactInfo?.whatsapps?.[0] || "+919876543210";
  const cleanWhatsapp = primaryWhatsapp.replace(/[^0-9]/g, "");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navMenuItems = [
    {
      id: "home",
      title: "HOME EXPERIENCE",
      badge: "Main",
      badgeClass: "bg-[#451414] text-[#FFDF73] border border-[#D4AF37]/40",
      icon: Compass,
      onClick: () => onNavigate("home"),
    },
    {
      id: "about",
      title: "ABOUT PUHAYT DIGITAL",
      badge: "Agency Team",
      badgeClass: "bg-[#251D10] text-[#FFDF73] border border-[#D4AF37]/30",
      icon: ShieldCheck,
      onClick: () => onNavigate("about"),
    },
    {
      id: "services",
      title: "DIGITAL SERVICES & DEV",
      badge: "12 Services",
      badgeClass: "bg-[#3D260D] text-[#FFDF73] border border-[#D4AF37]/30",
      icon: Layers,
      onClick: () => onNavigate("services"),
    },
    {
      id: "portfolio",
      title: "PORTFOLIO & WORK",
      badge: "Live Proof",
      badgeClass: "bg-[#1A2E1A] text-emerald-300 border border-emerald-500/30",
      icon: Briefcase,
      onClick: () => onNavigate("portfolio"),
    },
    {
      id: "case-studies",
      title: "CASE STUDIES & METRICS",
      badge: "ROI Proof",
      badgeClass: "bg-[#1B2A1B] text-emerald-300 border border-emerald-500/40",
      icon: Star,
      onClick: () => onNavigate("case-studies"),
    },
    {
      id: "industries",
      title: "INDUSTRIES WE SERVE",
      badge: "Sectors",
      badgeClass: "bg-[#18233C] text-blue-300 border border-blue-500/30",
      icon: Building2,
      onClick: () => onNavigate("industries"),
    },
    {
      id: "ai-suite",
      title: "PUHAYT AI MARKETING SUITE",
      badge: "Gemini",
      badgeClass: "bg-gradient-to-r from-[#4A1515] to-[#2B0B0B] text-[#FFDF73] border border-[#D4AF37]/50",
      icon: Bot,
      onClick: () => onNavigate("ai-suite"),
    },
    {
      id: "pricing",
      title: "TRANSPARENT PRICING & ROI",
      badge: "Packages",
      badgeClass: "bg-[#1E293B] text-sky-300 border border-sky-500/30",
      icon: CreditCard,
      onClick: () => onNavigate("pricing"),
    },
    {
      id: "testimonials",
      title: "CLIENT REVIEWS & TRUST",
      badge: "5.0 Stars",
      badgeClass: "bg-[#3D260D] text-[#FFDF73] border border-[#D4AF37]/30",
      icon: Star,
      onClick: () => onNavigate("testimonials"),
    },
    {
      id: "blog",
      title: "TECH & STRATEGY BLOG",
      badge: "Articles",
      badgeClass: "bg-[#1A1A2E] text-purple-300 border border-purple-500/30",
      icon: BookOpen,
      onClick: () => onNavigate("blog"),
    },
    {
      id: "kolkata-geo",
      title: "KOLKATA HQ & SERVICES",
      badge: "Sector V",
      badgeClass: "bg-[#2A1E0E] text-[#FFDF73] border border-[#D4AF37]/40 font-bold",
      icon: MapPin,
      onClick: () => onNavigate("kolkata-geo"),
    },
    {
      id: "contact",
      title: "CONTACT & CALENDLY DESK",
      badge: "Direct",
      badgeClass: "bg-[#0E2818] text-emerald-300 border border-emerald-500/40",
      icon: Phone,
      onClick: () => onNavigate("contact"),
    },
    {
      id: "client-portal",
      title: "CLIENT PORTAL & WEBSITES",
      badge: currentUser ? "Private Dashboard" : "Sign In",
      badgeClass: "bg-[#2E1E09] text-[#FFDF73] border border-[#D4AF37]/50 font-bold",
      icon: Crown,
      onClick: () => {
        onNavigate("client-portal");
        openClientDashboard();
      },
    },
    {
      id: "audit",
      title: "FREE INSTANT SEO AUDIT",
      badge: "Live Score",
      badgeClass: "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold",
      icon: Sparkles,
      onClick: () => onOpenAudit(),
    },
    {
      id: "stitch-options",
      title: "GOOGLE STITCH SUITE & SITEMAP",
      badge: "Options Hub",
      badgeClass: "bg-[#251D10] text-[#FFDF73] border border-[#D4AF37]/50 font-bold",
      icon: SlidersHorizontal,
      onClick: () => {
        if (onOpenOptions) onOpenOptions();
      },
    },
    {
      id: "devmode",
      title: "DEVMODE MASTER CONSOLE",
      badge: isDevModeAuthenticated ? "Active" : "Protected",
      badgeClass: "bg-[#451414] text-[#FFDF73] border border-[#D4AF37]/50",
      icon: Lock,
      onClick: () => openDevMode(),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Luxury Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg bg-[#0A0806] border-l border-[#D4AF37]/35 h-full shadow-[0_0_60px_rgba(0,0,0,0.98)] flex flex-col z-50"
          >
            {/* Ambient Gold Header Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#8B6508] via-[#FFDF73] to-[#8B6508]" />

            {/* Header: Exact Shikor Restro Style from Video (Logo on Left, Sign In, Free Audit, Close on Right) */}
            <div className="p-4 sm:p-5 border-b border-[#D4AF37]/20 flex items-center justify-between shrink-0 bg-[#0E0C09]/90 backdrop-blur-md">
              <BrandLogo size="md" showTagline={false} />

              <div className="flex items-center space-x-2">
                {currentUser ? (
                  <button
                    onClick={() => handleItemClick(openClientDashboard)}
                    className="px-2.5 py-1 rounded-full bg-[#18120B] border border-[#D4AF37]/50 text-[#FFDF73] text-[11px] font-bold flex items-center space-x-1.5 shadow-sm"
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#FFDF73] to-[#D4AF37] text-black flex items-center justify-center font-bold text-[9px]">
                      {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="truncate max-w-[80px]">{userProfile?.displayName?.split(" ")[0] || "Account"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleItemClick(() => openAuthModal("google"))}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-[#FFDF73] bg-[#16120C] hover:bg-[#241A0E] border border-[#D4AF37]/50 flex items-center space-x-1 transition-all"
                  >
                    <LogIn className="w-3 h-3 text-[#FFDF73]" />
                    <span>SIGN IN</span>
                  </button>
                )}

                <button
                  onClick={() => handleItemClick(onOpenAudit)}
                  className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold text-black gold-gradient-bg shadow-sm"
                >
                  AUDIT
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close Drawer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Body: Clean, elegant, spacious luxury menu items */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-1">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.onClick)}
                    className={`w-full py-3.5 px-3 rounded-xl flex items-center text-left transition-all group border-b border-white/[0.04] ${
                      isActive
                        ? "text-[#FFDF73] font-bold bg-[#18120A]/70 border-[#D4AF37]/30"
                        : "text-neutral-300 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className={`w-2 h-2 rounded-full transition-all shrink-0 ${
                        isActive ? "bg-[#FFDF73] scale-125" : "bg-neutral-600 group-hover:bg-[#FFDF73]"
                      }`} />
                      <span className="font-serif text-xs sm:text-sm tracking-[0.14em] uppercase truncate font-medium group-hover:text-[#FFDF73]">
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* DevMode & Sign In Quick Utility Links (like in Shikor Restro video) */}
              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <button
                  onClick={() => handleItemClick(openDevMode)}
                  className="w-full py-2.5 px-3 rounded-xl flex items-center text-left text-neutral-400 hover:text-[#FFDF73] hover:bg-white/5 transition-all text-xs font-mono"
                >
                  <span className="flex items-center space-x-2">
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>⚙ OPEN DEVMODE ADMIN</span>
                  </span>
                </button>

                {currentUser ? (
                  <button
                    onClick={async () => {
                      await logout();
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-left text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all text-xs font-mono"
                  >
                    <span className="flex items-center space-x-2">
                      <LogIn className="w-3.5 h-3.5" />
                      <span>SIGN OUT ({currentUser.email || (currentUser.isAnonymous ? "GUEST" : "USER")})</span>
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleItemClick(() => openAuthModal("google"))}
                    className="w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-left text-neutral-400 hover:text-white hover:bg-white/5 transition-all text-xs font-mono"
                  >
                    <span className="flex items-center space-x-2">
                      <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>👤 SIGN IN (PHONE, GUEST, EMAIL, GOOGLE)</span>
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Fixed Full-Width CTA (Exact Shikor Restro Style from Video) */}
            <div className="p-4 sm:p-5 border-t border-[#D4AF37]/30 bg-[#0E0C09] shrink-0">
              <button
                onClick={() => handleItemClick(onOpenAudit)}
                className="w-full py-3.5 px-4 rounded-xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>CLAIM FREE 45-POINT AUDIT</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
