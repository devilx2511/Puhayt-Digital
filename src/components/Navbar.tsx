import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, Menu, X, Shield, MessageCircle, LogIn, User, LogOut, LayoutDashboard, ChevronDown, Crown, MoreVertical } from "lucide-react";
import { useAgency } from "../context/AgencyContext";
import { BrandLogo } from "./BrandLogo";

interface NavbarProps {
  onOpenAuditModal?: () => void;
  onOpenAudit?: () => void;
  onOpenSearchModal?: () => void;
  onOpenSearch?: () => void;
  currentSection?: string;
  onNavigate: (sectionId: string) => void;
  onToggleDrawer?: () => void;
  onOpenOptions?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuditModal,
  onOpenAudit,
  onOpenSearchModal,
  onOpenSearch,
  currentSection,
  onNavigate,
  onToggleDrawer,
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
  const handleAudit = onOpenAuditModal || onOpenAudit || (() => {});
  const handleSearch = onOpenSearchModal || onOpenSearch || (() => {});
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const primaryWhatsapp = contactInfo?.whatsapps?.[0] || "+919876543210";
  const cleanWhatsapp = primaryWhatsapp.replace(/[^0-9]/g, "");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", hideOnLg: false },
    { id: "about", label: "About", hideOnLg: false },
    { id: "services", label: "Services", hideOnLg: false },
    { id: "portfolio", label: "Portfolio", hideOnLg: false },
    { id: "case-studies", label: "Case Studies", hideOnLg: true },
    { id: "industries", label: "Industries", hideOnLg: true },
    { id: "pricing", label: "Pricing", hideOnLg: false },
    { id: "testimonials", label: "Reviews", hideOnLg: true },
    { id: "blog", label: "Blog", hideOnLg: true },
    { id: "kolkata-geo", label: "Kolkata HQ", hideOnLg: true },
    { id: "ai-suite", label: "AI Suite", hideOnLg: true },
    { id: "contact", label: "Contact", hideOnLg: false },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <header
      id="main-app-navigation"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#090806]/90 backdrop-blur-2xl border-b border-[#D4AF37]/30 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-[#090806]/70 backdrop-blur-md border-b border-white/5 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Brand Link */}
          <div id="navbar-brand-logo" className="shrink-0 py-0.5">
            <div className="block sm:hidden">
              <BrandLogo onClick={() => handleLinkClick("home")} size="sm" />
            </div>
            <div className="hidden sm:block">
              <BrandLogo onClick={() => handleLinkClick("home")} size="md" />
            </div>
          </div>

          {/* Center Navigation Links for Laptop / Desktop */}
          <nav aria-label="Desktop Main Navigation" className="hidden lg:flex items-center space-x-1 bg-[#120F0C]/80 px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-inner">
            {navLinks.filter(l => !l.hideOnLg).map((link) => (
              <button
                key={link.id}
                id={`desktop-nav-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  currentSection === link.id
                    ? "text-[#0B0B0B] bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)] font-bold"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Middle Sign In Pill for Mobile & Tablet */}
          <div className="flex lg:hidden items-center justify-center flex-1 px-1.5 sm:px-2 min-w-0">
            {currentUser ? (
              <button
                id="mobile-nav-portal-pill"
                onClick={openClientDashboard}
                className="px-2.5 sm:px-3 py-1 rounded-full bg-[#18120B] border border-[#D4AF37]/50 text-[#FFDF73] flex items-center space-x-1.5 text-xs font-bold shadow-sm active:scale-95 transition-all truncate"
                title="Open Client Dashboard"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#FFDF73] to-[#D4AF37] text-black flex items-center justify-center font-bold text-[9px] shrink-0">
                  {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-neutral-200 truncate max-w-[70px] sm:max-w-[100px]">
                  {userProfile?.displayName?.split(" ")[0] || "Client"}
                </span>
              </button>
            ) : (
              <button
                id="mobile-nav-signin-pill"
                onClick={() => openAuthModal("google")}
                className="px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold text-[#FFDF73] bg-[#16120C] hover:bg-[#221A0F] border border-[#D4AF37]/50 rounded-full flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all shrink-0"
                title="Sign In"
              >
                <LogIn className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FFDF73] shrink-0" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Right Action Controls for Desktop */}
          <div className="hidden lg:flex items-center space-x-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              id="navbar-search-btn"
              onClick={handleSearch}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full border border-white/10 transition-colors flex items-center space-x-1.5 text-xs px-3"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#FFDF73]" />
              <span className="hidden xl:inline text-neutral-300 text-xs">Search</span>
              <kbd className="hidden xl:inline text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-400 font-mono">⌘K</kbd>
            </button>

            {/* Firebase Auth User / Sign In Button */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  id="navbar-user-profile-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1A140E] hover:bg-[#2A2015] border border-[#D4AF37]/50 rounded-full flex items-center space-x-2 transition-all shadow-sm group"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FFDF73] to-[#D4AF37] text-black flex items-center justify-center font-bold text-[10px]">
                    {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[100px] truncate text-neutral-200 group-hover:text-white font-medium">
                    {userProfile?.displayName || (currentUser.isAnonymous ? "Guest" : "Client")}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#FFDF73] opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0E0C0A] border border-[#D4AF37]/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] p-2 z-50 animate-fade-in text-xs space-y-1">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 space-y-0.5">
                      <p className="font-bold text-white truncate">
                        {userProfile?.displayName || (currentUser.isAnonymous ? "Guest Session" : "Client Account")}
                      </p>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {currentUser.email || currentUser.phoneNumber || (currentUser.isAnonymous ? "Anonymous Guest" : "Verified User")}
                      </p>
                      <div className="pt-1 flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-bold bg-[#FFDF73]/20 text-[#FFDF73] px-1.5 py-0.5 rounded uppercase">
                          {userProfile?.authProvider || (currentUser.isAnonymous ? "guest" : "firebase")}
                        </span>
                        <span className="text-[9px] font-mono bg-white/10 text-neutral-300 px-1.5 py-0.5 rounded uppercase">
                          {userProfile?.role || "client"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        openClientDashboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 flex items-center space-x-2 transition-colors"
                    >
                      <Crown className="w-3.5 h-3.5 text-[#FFDF73]" />
                      <span>Client Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        openDevMode();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 flex items-center space-x-2 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#FFDF73]" />
                      <span>DevMode Console</span>
                    </button>

                    <div className="h-[1px] bg-white/10 my-1" />

                    <button
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/40 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-signin-btn"
                onClick={() => openAuthModal("google")}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#FFDF73] bg-[#16120C] hover:bg-[#201A10] border border-[#D4AF37]/50 rounded-full flex items-center space-x-1.5 transition-all shadow-sm hover:scale-[1.02]"
                title="Sign in with Google, Email, Phone, or Guest"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Free Audit CTA Button */}
            <button
              id="navbar-free-audit-btn"
              onClick={handleAudit}
              className="px-4 py-1.5 text-xs font-extrabold text-[#0B0B0B] bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#C99E2A] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-[1.03] active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Free Audit</span>
            </button>

            {/* Circular Three Bar Menu Button for Laptops / Desktops */}
            <button
              id="navbar-desktop-drawer-toggle"
              onClick={onToggleDrawer}
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-full border border-[#D4AF37]/60 hover:border-[#FFDF73] bg-[#140F0A] hover:bg-[#241A0E] flex flex-col items-center justify-center gap-[3px] text-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95 group shrink-0"
              title="All Pages & Menu (☰)"
            >
              <span className="w-4 h-[2px] bg-[#FFDF73] rounded-full group-hover:w-5 group-hover:bg-white transition-all duration-200" />
              <span className="w-3 h-[2px] bg-[#FFDF73] rounded-full group-hover:w-4 group-hover:bg-white transition-all duration-200" />
              <span className="w-4 h-[2px] bg-[#FFDF73] rounded-full group-hover:w-5 group-hover:bg-white transition-all duration-200" />
            </button>
          </div>

          {/* Tablet & Mobile Right Action Group */}
          <div className="flex lg:hidden items-center space-x-2 shrink-0">
            {/* Tablet Free Audit CTA */}
            <button
              onClick={handleAudit}
              className="hidden sm:flex md:flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold text-black gold-gradient-bg shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3 h-3 text-black" />
              <span>Free Audit</span>
            </button>

            {/* Circular Three Bar Menu Trigger (☰) for Mobile & Tablet */}
            <button
              id="mobile-nav-drawer-toggle"
              onClick={onToggleDrawer}
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-full border border-[#D4AF37]/60 hover:border-[#FFDF73] bg-[#140F0A] hover:bg-[#241A0E] flex flex-col items-center justify-center gap-[3px] text-[#FFDF73] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-105 active:scale-95 group shrink-0"
              title="All Pages & Menu"
            >
              <span className="w-4 h-[2px] bg-[#FFDF73] rounded-full group-hover:w-5 group-hover:bg-white transition-all duration-200" />
              <span className="w-3 h-[2px] bg-[#FFDF73] rounded-full group-hover:w-4 group-hover:bg-white transition-all duration-200" />
              <span className="w-4 h-[2px] bg-[#FFDF73] rounded-full group-hover:w-5 group-hover:bg-white transition-all duration-200" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
