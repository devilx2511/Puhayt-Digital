import React, { useState } from "react";
import { PortfolioProject } from "../types";
import {
  X,
  ExternalLink,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  RotateCw,
  Lock,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Calendar,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
  Star,
  Phone,
  Maximize2,
  Minimize2,
  Code2,
  Eye,
  BarChart3,
} from "lucide-react";

interface PortfolioWebsiteViewerModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenCaseStudy?: (project: PortfolioProject) => void;
  whatsappNumber?: string;
}

export function isExternalWebsiteUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) return false;
  if (trimmed.includes("wa.me/") || trimmed.includes("api.whatsapp.com")) return false;
  return true;
}

export function getDisplayDomainForProject(project: PortfolioProject): string {
  if (isExternalWebsiteUrl(project.liveUrl)) {
    return project.liveUrl!;
  }
  const domainMap: Record<string, string> = {
    "furniture-store": "https://luxehomeliving.in",
    "p2p-crypto": "https://nexuspeerexchange.io",
    "restaurant-website": "https://savoriabistro.in",
    "real-estate-website": "https://horizonrealtygroup.in",
    "startup-landing-page": "https://novustech.ai",
    "clinic-website": "https://auracareclinic.in",
    "tuition-website": "https://apexacademytutors.in",
  };
  if (domainMap[project.id]) return domainMap[project.id];
  const slug = (project.client || project.title || "client-site")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
  return `https://${slug}.in`;
}

export const PortfolioWebsiteViewerModal: React.FC<PortfolioWebsiteViewerModalProps> = ({
  project,
  onClose,
  onOpenCaseStudy,
  whatsappNumber = "917044811476",
}) => {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"interactive" | "iframe">(
    project && isExternalWebsiteUrl(project.liveUrl) ? "iframe" : "interactive"
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Interactive states for the live websites
  const [activeSubPage, setActiveSubPage] = useState<string>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cartItems, setCartItems] = useState<{ name: string; price: string }[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("Tomorrow, 11:00 AM");
  const [cryptoAmount, setCryptoAmount] = useState<number>(1000);
  const [cryptoAsset, setCryptoAsset] = useState<"USDT" | "BTC" | "ETH">("USDT");
  const [propertyBhk, setPropertyBhk] = useState<string>("All");

  if (!project) return null;

  const hasExternalUrl = isExternalWebsiteUrl(project.liveUrl);
  const displayUrl = getDisplayDomainForProject(project);
  const standaloneNewTabUrl = hasExternalUrl
    ? project.liveUrl!
    : `${window.location.origin}${window.location.pathname}?openWebsite=${encodeURIComponent(project.id)}#/portfolio`;

  const viewportWidthClass =
    viewport === "desktop"
      ? "w-full"
      : viewport === "tablet"
      ? "w-full max-w-[768px] mx-auto my-4 rounded-2xl border-4 border-neutral-800 shadow-2xl"
      : "w-full max-w-[390px] mx-auto my-4 rounded-[32px] border-[6px] border-neutral-800 shadow-2xl";

  const handleAddToCart = (name: string, price: string) => {
    setCartItems((prev) => [...prev, { name, price }]);
    setBookingSuccess(`Added "${name}" (${price}) to your order inquiry list!`);
    setTimeout(() => setBookingSuccess(null), 3500);
  };

  const handleConfirmAction = (msg: string) => {
    setBookingSuccess(msg);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Live Website Preview: ${project.title}`}
    >
      <div
        className={`bg-[#0B0B0B] border border-[#D4AF37]/40 flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
          isFullscreen
            ? "w-screen h-screen rounded-none"
            : "w-full max-w-7xl h-[95dvh] sm:h-[92dvh] rounded-none sm:rounded-3xl"
        }`}
      >
        {/* Top Browser Chrome Bar */}
        <div className="bg-[#141414] border-b border-white/10 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Left: Window Controls & Project Identity */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center group"
                title="Close Website Viewer"
                aria-label="Close Website Viewer"
              >
                <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-300"
                title="Toggle Fullscreen"
                aria-label="Toggle Fullscreen"
              />
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400"
                title="Reload Website"
                aria-label="Reload Website"
              />
            </div>

            <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-white/10">
              <span className="text-xs font-bold text-white truncate max-w-[180px]">
                {project.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Live Production Build
              </span>
            </div>
          </div>

          {/* Center: Simulated Browser URL Address Bar */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="flex items-center justify-between bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-neutral-300 font-mono truncate text-[11px]">
                  {displayUrl}
                  {activeSubPage !== "home" ? `/${activeSubPage}` : ""}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                <button
                  onClick={() => {
                    setRefreshKey((k) => k + 1);
                    setActiveSubPage("home");
                  }}
                  className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="Reload Website"
                  aria-label="Reload Website"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Device Switcher & Open in New Tab / Case Study */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Viewport Switcher */}
            <div className="hidden sm:flex items-center bg-black/60 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewport("desktop")}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewport === "desktop"
                    ? "gold-gradient-bg text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Desktop View"
                aria-label="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewport === "tablet"
                    ? "gold-gradient-bg text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Tablet View"
                aria-label="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewport === "mobile"
                    ? "gold-gradient-bg text-black font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="Mobile View"
                aria-label="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {hasExternalUrl && (
              <button
                onClick={() =>
                  setViewMode(viewMode === "iframe" ? "interactive" : "iframe")
                }
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-[11px] font-semibold flex items-center space-x-1 border border-white/10"
                title="Switch between Live Embed and Interactive Showcase"
              >
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden lg:inline">
                  {viewMode === "iframe" ? "Interactive Mode" : "Live Embed"}
                </span>
              </button>
            )}

            {onOpenCaseStudy && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCaseStudy(project);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold hidden md:flex items-center space-x-1 border border-white/10"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Case Study</span>
              </button>
            )}

            <a
              href={standaloneNewTabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl gold-gradient-bg text-black font-bold text-[11px] flex items-center space-x-1.5 shadow-lg hover:scale-105 transition-transform"
              title="Open Website in New Browser Tab"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 hidden sm:inline-flex"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-300 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-xl transition-colors"
              title="Close Website"
              aria-label="Close Website"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toast feedback banner inside the simulated website */}
        {bookingSuccess && (
          <div className="bg-emerald-950/95 border-b border-emerald-500/40 px-4 py-2.5 text-xs text-emerald-200 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">{bookingSuccess}</span>
            </div>
            <button
              onClick={() => setBookingSuccess(null)}
              className="text-emerald-400 hover:text-white text-[11px] underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Browser Viewport Area */}
        <div
          key={refreshKey}
          className="flex-1 overflow-y-auto bg-[#09090B] flex flex-col items-center"
        >
          <div className={`${viewportWidthClass} flex-1 flex flex-col bg-[#0D0D11] text-white overflow-x-hidden`}>
            {hasExternalUrl && viewMode === "iframe" ? (
              <div className="w-full h-full flex-1 flex flex-col min-h-[600px] relative">
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="w-full flex-1 border-0 bg-white min-h-[600px]"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                <div className="bg-[#121216] border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-400">
                    Viewing live external website:{" "}
                    <strong className="text-white font-mono">{project.liveUrl}</strong>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode("interactive")}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[#FFDF73] font-semibold"
                    >
                      Switch to Interactive Showcase View
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg gold-gradient-bg text-black font-bold flex items-center space-x-1"
                    >
                      <span>Open Direct URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* INTERACTIVE LIVE CLIENT WEBSITE RENDERER */
              <div className="flex-1 flex flex-col">
                {/* Simulated Client Website Navbar */}
                <header className="sticky top-0 z-30 bg-[#111116]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project.logoUrl ? (
                      <img
                        src={project.logoUrl}
                        alt={project.client}
                        className="w-9 h-9 rounded-xl object-contain bg-white/10 p-1"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B2C] flex items-center justify-center text-black font-extrabold text-sm shadow-md">
                        {(project.client || project.title).charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-serif font-bold text-base sm:text-lg text-white leading-none">
                        {project.client || project.title}
                      </div>
                      <div className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mt-0.5">
                        {project.industry}
                      </div>
                    </div>
                  </div>

                  {/* Client Website Internal Navigation */}
                  <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-neutral-300">
                    <button
                      onClick={() => setActiveSubPage("home")}
                      className={`hover:text-white transition-colors ${
                        activeSubPage === "home" ? "text-[#D4AF37] font-bold" : ""
                      }`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setActiveSubPage("catalog")}
                      className={`hover:text-white transition-colors ${
                        activeSubPage === "catalog" ? "text-[#D4AF37] font-bold" : ""
                      }`}
                    >
                      {project.id === "furniture-store"
                        ? "Showroom Catalog"
                        : project.id === "p2p-crypto"
                        ? "Live OTC Desk"
                        : project.id === "restaurant-website"
                        ? "Digital Menu"
                        : project.id === "real-estate-website"
                        ? "Luxury Listings"
                        : project.id === "startup-landing-page"
                        ? "Product Features"
                        : project.id === "clinic-website"
                        ? "Doctors & Specialties"
                        : project.id === "tuition-website"
                        ? "Courses & Batches"
                        : "Solutions & Services"}
                    </button>
                    <button
                      onClick={() => setActiveSubPage("gallery")}
                      className={`hover:text-white transition-colors ${
                        activeSubPage === "gallery" ? "text-[#D4AF37] font-bold" : ""
                      }`}
                    >
                      Visual Tour
                    </button>
                    <button
                      onClick={() => setActiveSubPage("book")}
                      className={`hover:text-white transition-colors ${
                        activeSubPage === "book" ? "text-[#D4AF37] font-bold" : ""
                      }`}
                    >
                      {project.id === "restaurant-website"
                        ? "Table Reservation"
                        : project.id === "clinic-website"
                        ? "Book Appointment"
                        : project.id === "tuition-website"
                        ? "Student Enrollment"
                        : "Contact & Inquiry"}
                    </button>
                  </nav>

                  {/* Right CTA inside simulated website */}
                  <div className="flex items-center space-x-2">
                    {cartItems.length > 0 && (
                      <button
                        onClick={() => setActiveSubPage("book")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{cartItems.length}</span>
                      </button>
                    )}
                    <button
                      onClick={() => setActiveSubPage("book")}
                      className="px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#FFDF73] text-black font-bold text-xs transition-colors"
                    >
                      {project.id === "furniture-store"
                        ? "Order Inquiry"
                        : project.id === "p2p-crypto"
                        ? "Start OTC Trade"
                        : project.id === "restaurant-website"
                        ? "Reserve Table"
                        : project.id === "real-estate-website"
                        ? "Book Site Visit"
                        : project.id === "startup-landing-page"
                        ? "Join Beta Waitlist"
                        : project.id === "clinic-website"
                        ? "Book Doctor Slot"
                        : project.id === "tuition-website"
                        ? "Register Batch"
                        : "Get Started"}
                    </button>
                  </div>
                </header>

                {/* Mobile Sub-Nav inside simulated website */}
                <div className="flex md:hidden items-center justify-around bg-[#16161D] border-b border-white/10 py-2 px-2 text-[11px] font-semibold">
                  {[
                    { id: "home", label: "Home" },
                    { id: "catalog", label: "Explore" },
                    { id: "gallery", label: "Gallery" },
                    { id: "book", label: "Book / Act" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubPage(tab.id)}
                      className={`px-3 py-1 rounded-lg ${
                        activeSubPage === tab.id
                          ? "bg-[#D4AF37] text-black font-bold"
                          : "text-neutral-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* HERO BANNER OF THE CLIENT WEBSITE */}
                <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#16151C] to-[#0D0D11] px-4 sm:px-10 py-10 sm:py-14">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{project.client} • Official Digital Experience</span>
                      </div>
                      <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                        {project.id === "furniture-store" &&
                          "Handcrafted Bespoke Furniture for Modern Luxury Living"}
                        {project.id === "p2p-crypto" &&
                          "Institutional-Grade P2P & OTC Digital Asset Liquidity Desk"}
                        {project.id === "restaurant-website" &&
                          "Artisanal Wood-Fired Gastronomy & Curated Fine Dining"}
                        {project.id === "real-estate-website" &&
                          "Discover Architectural Penthouses & Verified Luxury Estates"}
                        {project.id === "startup-landing-page" &&
                          "Autonomous AI Workflows that Scale Engineering Velocity 10x"}
                        {project.id === "clinic-website" &&
                          "Compassionate Multi-Specialty Healthcare & Instant Online Booking"}
                        {project.id === "tuition-website" &&
                          "Top-Rank IIT-JEE, NEET & Board Exam Mentorship Platform"}
                        {![
                          "furniture-store",
                          "p2p-crypto",
                          "restaurant-website",
                          "real-estate-website",
                          "startup-landing-page",
                          "clinic-website",
                          "tuition-website",
                        ].includes(project.id) && project.title}
                      </h1>
                      <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={() => setActiveSubPage("catalog")}
                          className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform"
                        >
                          <span>
                            {project.id === "furniture-store"
                              ? "Explore Furniture Catalog"
                              : project.id === "p2p-crypto"
                              ? "Launch OTC Rate Calculator"
                              : project.id === "restaurant-website"
                              ? "Explore Interactive Menu"
                              : project.id === "real-estate-website"
                              ? "Search Luxury Properties"
                              : project.id === "startup-landing-page"
                              ? "Try Live Product Tour"
                              : project.id === "clinic-website"
                              ? "Find a Specialist Doctor"
                              : project.id === "tuition-website"
                              ? "Browse Courses & Batches"
                              : "Explore Live Platform"}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveSubPage("book")}
                          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-colors"
                        >
                          {project.id === "restaurant-website"
                            ? "Book a Table Online"
                            : project.id === "clinic-website"
                            ? "Schedule Appointment"
                            : project.id === "tuition-website"
                            ? "Download Free Study Pack"
                            : "Instant WhatsApp Desk"}
                        </button>
                      </div>

                      {/* Trust Metrics Strip */}
                      {project.impactMetrics && project.impactMetrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                          {project.impactMetrics.map((m, idx) => (
                            <div key={idx} className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                              <div className="text-[#D4AF37] font-bold text-xs sm:text-sm">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-neutral-400">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5">
                      <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl group">
                        <img
                          src={project.mockupDesktop || project.image}
                          alt={project.title}
                          className="w-full h-64 sm:h-80 object-cover"
                        />
                        <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <div className="text-white font-bold">{project.client}</div>
                            <div className="text-[10px] text-emerald-400 font-mono">
                              Core Web Vitals: {project.caseStudyResults?.pageSpeed || "99/100"}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#FFDF73] font-mono text-[10px] font-bold">
                            Verified Live
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE FUNCTIONAL MODULE PER WEBSITE */}
                <div className="max-w-6xl w-full mx-auto px-4 sm:px-10 py-10 space-y-10">
                  {/* 1. FURNITURE STORE INTERACTIVE CATALOG */}
                  {project.id === "furniture-store" && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <h2 className="font-serif text-2xl font-bold text-white">
                            Signature Showroom Collection
                          </h2>
                          <p className="text-xs text-neutral-400">
                            Filter by room category and select bespoke wood finishes for instant factory-direct pricing.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Living Room", "Bedroom", "Dining", "Study"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                selectedCategory === cat
                                  ? "bg-[#D4AF37] text-black font-bold"
                                  : "bg-white/5 text-neutral-300 hover:bg-white/10"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            name: "Milano Italian Leather Sectional Sofa",
                            cat: "Living Room",
                            price: "₹1,45,000",
                            finish: "Italian Walnut & Tan Leather",
                            img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            name: "Royal Burmese Teak King Bedstead",
                            cat: "Bedroom",
                            price: "₹98,500",
                            finish: "Hand-Polished Burmese Teak",
                            img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            name: "Carrara Marble 8-Seater Dining Table",
                            cat: "Dining",
                            price: "₹1,82,000",
                            finish: "Imported White Marble & Brass",
                            img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            name: "Nordic Oak Executive Lounge Chair",
                            cat: "Living Room",
                            price: "₹42,000",
                            finish: "Natural Smoked Oak",
                            img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            name: "Architect Minimalist Walnut Study Desk",
                            cat: "Study",
                            price: "₹54,000",
                            finish: "Matte American Walnut",
                            img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            name: "Velvet Tufted Modular Ottoman Suite",
                            cat: "Bedroom",
                            price: "₹36,500",
                            finish: "Emerald Velvet & Gold Base",
                            img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80",
                          },
                        ]
                          .filter(
                            (item) =>
                              selectedCategory === "All" || item.cat === selectedCategory
                          )
                          .map((item, i) => (
                            <div
                              key={i}
                              className="bg-[#15151C] rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="h-48 overflow-hidden relative">
                                  <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  />
                                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-[#D4AF37] text-[10px] font-bold">
                                    {item.cat}
                                  </span>
                                </div>
                                <div className="p-4 space-y-1.5">
                                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                                  <p className="text-[11px] text-neutral-400">
                                    Finish: {item.finish}
                                  </p>
                                  <div className="text-lg font-extrabold text-[#FFDF73] font-mono pt-1">
                                    {item.price}
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 pt-0 flex gap-2">
                                <button
                                  onClick={() => handleAddToCart(item.name, item.price)}
                                  className="flex-1 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#FFDF73] text-black font-bold text-xs transition-colors"
                                >
                                  Add to Showroom Inquiry
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 2. P2P CRYPTO OTC DESK CALCULATOR */}
                  {project.id === "p2p-crypto" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-6 bg-[#14151F] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4">
                          <div className="flex items-center justify-between">
                            <h2 className="font-serif text-xl font-bold text-white">
                              Live OTC Settlement Calculator
                            </h2>
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                              0% Slippage Lock
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {(["USDT", "BTC", "ETH"] as const).map((asset) => (
                              <button
                                key={asset}
                                onClick={() => setCryptoAsset(asset)}
                                className={`py-2 rounded-xl font-mono text-xs font-bold border ${
                                  cryptoAsset === asset
                                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                                    : "bg-black/50 text-neutral-300 border-white/10"
                                }`}
                              >
                                {asset} / INR
                              </button>
                            ))}
                          </div>
                          <div>
                            <label className="block text-xs text-neutral-400 mb-1">
                              Enter Trade Volume ({cryptoAsset})
                            </label>
                            <input
                              type="number"
                              value={cryptoAmount}
                              onChange={(e) =>
                                setCryptoAmount(Math.max(1, Number(e.target.value)))
                              }
                              className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-mono text-base"
                            />
                          </div>
                          <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Institutional Reference Rate:</span>
                              <span className="text-white font-mono">
                                {cryptoAsset === "USDT"
                                  ? "₹86.45 / USDT"
                                  : cryptoAsset === "BTC"
                                  ? "₹78,40,000 / BTC"
                                  : "₹2,65,000 / ETH"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Escrow Settlement Time:</span>
                              <span className="text-emerald-400 font-mono">
                                &lt; 12 Minutes (RTGS / IMPS)
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                              <span className="text-neutral-200">Estimated INR Payout:</span>
                              <span className="text-[#FFDF73] font-mono">
                                ₹
                                {(
                                  cryptoAmount *
                                  (cryptoAsset === "USDT"
                                    ? 86.45
                                    : cryptoAsset === "BTC"
                                    ? 7840000
                                    : 265000)
                                ).toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleConfirmAction(
                                `OTC Trade Ticket locked for ${cryptoAmount} ${cryptoAsset}. Senior Trade Desk notified!`
                              )
                            }
                            className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-lg"
                          >
                            Lock Institutional Rate &amp; Open Escrow Ticket
                          </button>
                        </div>

                        <div className="lg:col-span-6 bg-[#14151F] p-6 rounded-2xl border border-white/10 space-y-4">
                          <h3 className="font-serif text-xl font-bold text-white">
                            Verified Institutional Liquidity Book
                          </h3>
                          <div className="space-y-2.5 text-xs">
                            {[
                              { desk: "Alpha Custody LLP", pair: "USDT/INR", limit: "₹5L – ₹2.5Cr", status: "KYB Verified" },
                              { desk: "Apex Prime OTC", pair: "BTC/INR", limit: "₹10L – ₹5Cr", status: "FIU Compliant" },
                              { desk: "Quantum Treasury", pair: "ETH/INR", limit: "₹2L – ₹80L", status: "Instant RTGS" },
                            ].map((row, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between"
                              >
                                <div>
                                  <div className="font-bold text-white">{row.desk}</div>
                                  <div className="text-[11px] text-neutral-400">
                                    {row.pair} • Limit: {row.limit}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono">
                                    {row.status}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleConfirmAction(`Connected with ${row.desk} escrow desk!`)
                                    }
                                    className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold"
                                  >
                                    Trade
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. RESTAURANT WEBSITE INTERACTIVE MENU & TABLE BOOKING */}
                  {project.id === "restaurant-website" && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                        <h2 className="font-serif text-2xl font-bold text-white">
                          Chef&apos;s Signature Interactive Menu
                        </h2>
                        <div className="flex gap-2">
                          {["All", "Starters", "Wood-Fired Mains", "Desserts"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                                selectedCategory === cat
                                  ? "bg-[#D4AF37] text-black font-bold"
                                  : "bg-white/5 text-neutral-300"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: "Truffle Burrata & Charred Sourdough", cat: "Starters", price: "₹640", tag: "Chef Special" },
                          { name: "Smoked Burrata Neapolitan Wood-Fired Pizza", cat: "Wood-Fired Mains", price: "₹890", tag: "Bestseller" },
                          { name: "Wild Mushroom & Aged Parmesan Risotto", cat: "Wood-Fired Mains", price: "₹950", tag: "Gluten Free" },
                          { name: "Belgian Dark Chocolate Hazelnut Fondant", cat: "Desserts", price: "₹520", tag: "Signature" },
                        ]
                          .filter((m) => selectedCategory === "All" || m.cat === selectedCategory)
                          .map((dish, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-2xl bg-[#15151C] border border-white/10 flex items-center justify-between gap-4"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-white text-sm">{dish.name}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#FFDF73]">
                                    {dish.tag}
                                  </span>
                                </div>
                                <div className="text-xs text-neutral-400">{dish.cat}</div>
                              </div>
                              <div className="flex items-center space-x-3 shrink-0">
                                <span className="font-mono font-bold text-[#FFDF73] text-sm">
                                  {dish.price}
                                </span>
                                <button
                                  onClick={() => handleAddToCart(dish.name, dish.price)}
                                  className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
                                >
                                  Pre-Order
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 4. REAL ESTATE PROPERTY FILTER MATRIX */}
                  {project.id === "real-estate-website" && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                        <h2 className="font-serif text-2xl font-bold text-white">
                          Verified RERA Luxury Residences
                        </h2>
                        <div className="flex gap-2">
                          {["All", "3 BHK", "4 BHK Sky Villa", "Penthouse"].map((bhk) => (
                            <button
                              key={bhk}
                              onClick={() => setPropertyBhk(bhk)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                                propertyBhk === bhk
                                  ? "bg-[#D4AF37] text-black font-bold"
                                  : "bg-white/5 text-neutral-300"
                              }`}
                            >
                              {bhk}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          {
                            title: "The Aurelia Sky Residences",
                            bhk: "4 BHK Sky Villa",
                            area: "3,850 Sq.Ft.",
                            price: "₹4.85 Cr",
                            loc: "EM Bypass / Salt Lake",
                            img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            title: "Horizon Crest Golf Towers",
                            bhk: "3 BHK",
                            area: "2,420 Sq.Ft.",
                            price: "₹2.65 Cr",
                            loc: "New Town Action Area I",
                            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                          },
                          {
                            title: "Sovereign Crown Duplex Penthouse",
                            bhk: "Penthouse",
                            area: "6,200 Sq.Ft.",
                            price: "₹9.40 Cr",
                            loc: "Ballygunge / Alipore",
                            img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                          },
                        ]
                          .filter((p) => propertyBhk === "All" || p.bhk === propertyBhk)
                          .map((prop, idx) => (
                            <div
                              key={idx}
                              className="bg-[#15151C] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
                            >
                              <img src={prop.img} alt={prop.title} className="h-44 w-full object-cover" />
                              <div className="p-4 space-y-2">
                                <div className="text-[10px] font-mono text-[#D4AF37] uppercase">
                                  {prop.bhk} • {prop.area}
                                </div>
                                <h3 className="font-bold text-white text-base">{prop.title}</h3>
                                <div className="text-xs text-neutral-400 flex items-center space-x-1">
                                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{prop.loc}</span>
                                </div>
                                <div className="text-lg font-extrabold text-[#FFDF73] font-mono">
                                  {prop.price}
                                </div>
                                <button
                                  onClick={() =>
                                    handleConfirmAction(
                                      `Private Site Visit & Floor Plan Brochure requested for ${prop.title}!`
                                    )
                                  }
                                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs mt-2"
                                >
                                  Schedule Private Site Visit
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 5. STARTUP LANDING PAGE INTERACTIVE TOUR */}
                  {project.id === "startup-landing-page" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Autonomous PR & Code Review Agent",
                          metric: "10x Faster Releases",
                          desc: "Zero-latency static analysis, automated unit test generation, and one-click cloud previews.",
                        },
                        {
                          title: "Sub-Millisecond Edge Telemetry",
                          metric: "99.999% Uptime SLA",
                          desc: "Real-time distributed tracing across 300+ global edge PoPs with automated anomaly rollback.",
                        },
                        {
                          title: "SOC2 Type II Enterprise Vault",
                          metric: "Zero-Trust Encryption",
                          desc: "End-to-end hardware security module key rotation and role-based access governance.",
                        },
                      ].map((feat, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl bg-[#15151C] border border-white/10 space-y-2"
                        >
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400">
                            {feat.metric}
                          </span>
                          <h3 className="font-bold text-white text-base pt-1">{feat.title}</h3>
                          <p className="text-xs text-neutral-400 leading-relaxed">{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 6. CLINIC WEBSITE DOCTOR DIRECTORY */}
                  {project.id === "clinic-website" && (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        Consult Senior Medical Specialists
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                          {
                            doc: "Dr. Ananya Sen, MD (Gold Medalist)",
                            spec: "Senior Interventional Cardiologist",
                            exp: "18+ Yrs Experience",
                            fee: "₹800 Consultation",
                          },
                          {
                            doc: "Dr. Rohit Chatterjee, MS Ortho",
                            spec: "Joint Replacement & Sports Specialist",
                            exp: "15+ Yrs Experience",
                            fee: "₹700 Consultation",
                          },
                          {
                            doc: "Dr. Meera Banerjee, MD",
                            spec: "Clinical Dermatology & Laser Aesthetics",
                            exp: "12+ Yrs Experience",
                            fee: "₹650 Consultation",
                          },
                        ].map((d, i) => (
                          <div
                            key={i}
                            className="p-5 rounded-2xl bg-[#15151C] border border-white/10 space-y-3 flex flex-col justify-between"
                          >
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                                {d.exp}
                              </span>
                              <h3 className="font-bold text-white text-base pt-1">{d.doc}</h3>
                              <p className="text-xs text-[#D4AF37]">{d.spec}</p>
                              <p className="text-xs text-neutral-400 font-mono pt-1">{d.fee}</p>
                            </div>
                            <button
                              onClick={() =>
                                handleConfirmAction(
                                  `Confirmed priority appointment slot with ${d.doc} for ${bookingDate}!`
                                )
                              }
                              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
                            >
                              Book Instant Slot
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 7. TUITION WEBSITE COURSE & BATCH EXPLORER */}
                  {project.id === "tuition-website" && (
                    <div className="space-y-4">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        Active Academic Batches &amp; Live Mentorship
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                          {
                            batch: "IIT-JEE Advanced Rankers Batch",
                            schedule: "Mon / Wed / Fri • 5:00 PM",
                            seats: "Only 6 Seats Left",
                            fee: "₹4,500 / month",
                          },
                          {
                            batch: "NEET Medical Excellence Batch",
                            schedule: "Tue / Thu / Sat • 4:30 PM",
                            seats: "Open Enrollment",
                            fee: "₹4,200 / month",
                          },
                          {
                            batch: "Class 10 & 12 Board 98%+ Mastery",
                            schedule: "Weekend Intensive + Daily Doubt Desk",
                            seats: "Free Demo Available",
                            fee: "₹2,800 / month",
                          },
                        ].map((b, i) => (
                          <div
                            key={i}
                            className="p-5 rounded-2xl bg-[#15151C] border border-white/10 space-y-3 flex flex-col justify-between"
                          >
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-[#FFDF73] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full">
                                {b.seats}
                              </span>
                              <h3 className="font-bold text-white text-base pt-1">{b.batch}</h3>
                              <p className="text-xs text-neutral-400">{b.schedule}</p>
                              <p className="text-sm font-bold text-emerald-400 font-mono pt-1">
                                {b.fee}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                handleConfirmAction(
                                  `Registered free trial class & downloaded study syllabus for ${b.batch}!`
                                )
                              }
                              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
                            >
                              Enroll / Download Syllabus
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE BOOKING / INQUIRY / RESERVATION DESK (Works for all projects) */}
                  <div className="bg-gradient-to-r from-[#18150C] to-[#121218] p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-2">
                      <div className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                        Interactive Live Conversion Funnel
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        Test the Live Booking &amp; Lead Capture Engine
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Every website crafted by Puhayt Digital includes an ultra-fast, zero-friction booking and WhatsApp conversion pipeline. Try submitting a test reservation or inquiry below:
                      </p>
                    </div>
                    <div className="lg:col-span-5 space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name / Company Name"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-xs text-white"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/15 text-xs text-white"
                        />
                        <button
                          onClick={() =>
                            handleConfirmAction(
                              `Confirmed instant booking for ${
                                bookingName || "Guest"
                              } (${bookingDate}) on ${project.client}!`
                            )
                          }
                          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs shrink-0"
                        >
                          Test Submit
                        </button>
                      </div>
                      <a
                        href={`https://wa.me/${whatsappNumber.replace(
                          /[^0-9]/g,
                          ""
                        )}?text=${encodeURIComponent(
                          `Hello Puhayt Digital! I just explored the live interactive ${project.title} (${displayUrl}) in your Portfolio and want a similar website built for my business.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <span>Build a Website Like This on WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Simulated Client Website Footer */}
                <footer className="mt-auto bg-[#09090C] border-t border-white/10 px-4 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
                  <div>
                    © {new Date().getFullYear()} <strong className="text-white">{project.client}</strong>. Engineered &amp; Optimized by{" "}
                    <span className="text-[#D4AF37] font-semibold">Puhayt Digital</span>.
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-emerald-400 font-mono text-[11px]">
                      ● 99/100 Google PageSpeed
                    </span>
                    <button
                      onClick={onClose}
                      className="text-neutral-300 hover:text-white underline"
                    >
                      Back to Puhayt Portfolio
                    </button>
                  </div>
                </footer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
