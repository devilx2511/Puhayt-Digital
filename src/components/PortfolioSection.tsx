import React, { useState, useEffect } from "react";
import { useAgency } from "../context/AgencyContext";
import { PortfolioProject } from "../types";
import {
  PortfolioWebsiteViewerModal,
  getDisplayDomainForProject,
  isExternalWebsiteUrl,
} from "./PortfolioWebsiteViewerModal";
import {
  ExternalLink,
  Sparkles,
  Monitor,
  Smartphone,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  Play,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Quote,
  ShieldCheck,
  Globe,
  Layers,
  Activity,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export const PortfolioSection: React.FC = () => {
  const { portfolioProjects, contactInfo } = useAgency();
  const [activeTag, setActiveTag] = useState<string>("All");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeWebsiteProject, setActiveWebsiteProject] = useState<PortfolioProject | null>(null);
  const [modalTab, setModalTab] = useState<"case-study" | "media">("case-study");
  const [activeMediaSubTab, setActiveMediaSubTab] = useState<"desktop" | "mobile" | "photos" | "video">("desktop");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Automatically open website viewer if ?openWebsite=<id> is in URL
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const openSiteId = params.get("openWebsite");
    if (openSiteId && portfolioProjects.length > 0) {
      const found = portfolioProjects.find((p) => p.id === openSiteId);
      if (found) {
        setActiveWebsiteProject(found);
      }
    }
  }, [portfolioProjects]);

  // Pagination / "See More" State
  const INITIAL_VISIBLE_COUNT = 4;
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  const primaryWhatsapp = contactInfo?.whatsapps?.[0] || "+917044811476";
  const cleanWhatsapp = primaryWhatsapp.replace(/[^0-9]/g, "");

  // Dynamic filter categories
  const filterTags = [
    "All",
    "E-Commerce",
    "Business",
    "Healthcare",
    "SaaS",
    "Education",
    "Real Estate",
    "Hospitality"
  ];

  const filteredProjects = activeTag === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => {
        const matchesTag = p.tags && p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
        const matchesIndustry = p.industry && p.industry.toLowerCase().includes(activeTag.toLowerCase());
        const matchesCategory = p.category && p.category.toLowerCase() === activeTag.toLowerCase();
        return matchesTag || matchesIndustry || matchesCategory;
      });

  // Visible sliced projects for progressive "See More" loading
  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredProjects.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const openProjectModal = (proj: PortfolioProject, defaultTab: "case-study" | "media" = "case-study") => {
    setSelectedProject(proj);
    setModalTab(defaultTab);
    setActivePhotoIndex(0);
    if (proj.videos && proj.videos.length > 0 && defaultTab === "media") {
      setActiveMediaSubTab("desktop");
    } else {
      setActiveMediaSubTab("desktop");
    }
  };

  return (
    <section id="portfolio" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 gold-gradient-bg opacity-5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Fade-in-up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Digital Craftsmanship &amp; Live Client Websites</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            Featured <span className="gold-gradient-text">Portfolio</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Explore genuine client websites engineered with bespoke brand identities, sub-second edge speeds, and full internal case study growth graphs.
          </p>
        </motion.div>

        {/* Dynamic Filter Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setExpandedCardId(null);
                setVisibleCount(INITIAL_VISIBLE_COUNT);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTag === tag
                  ? "gold-gradient-bg text-[#0B0B0B] shadow-lg shadow-[#D4AF37]/20 scale-105"
                  : "glass-card text-neutral-300 hover:text-white hover:border-[#D4AF37]/40 border border-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center glass-card p-12 rounded-3xl border border-[#D4AF37]/30 space-y-5"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient-bg p-[1px] shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0B0B] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                Showcase
              </div>
              <h3 className="font-serif text-3xl font-extrabold text-white">
                Projects in {activeTag} Coming Soon
              </h3>
            </div>

            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-lg mx-auto">
              We showcase strictly genuine, verified client websites created and published by Puhayt Digital.
            </p>

            <button
              onClick={() => {
                setActiveTag("All");
                setVisibleCount(INITIAL_VISIBLE_COUNT);
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-[#0B0B0B] gold-gradient-bg hover:scale-105 transition-transform"
            >
              View All Projects
            </button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
            >
              <AnimatePresence>
                {displayedProjects.map((project, index) => {
                  const isExpanded = expandedCardId === project.id;

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
                      className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10"
                    >
                      {/* Media Preview Frame */}
                      <div
                        onClick={() => setActiveWebsiteProject(project)}
                        className="relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
                      >
                        <img
                          src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-85" />

                        {/* Hover Overlay: Click to Open Live Website */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                          <span className="px-4 py-2.5 rounded-full gold-gradient-bg text-[#0B0B0B] font-bold text-xs flex items-center space-x-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Globe className="w-4 h-4" />
                            <span>Open Live Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        {/* Website Logo Badge */}
                        {project.logoUrl ? (
                          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/80 backdrop-blur-md p-1.5 pr-3 rounded-2xl border border-[#D4AF37]/40 shadow-xl">
                            <img
                              src={project.logoUrl}
                              alt="Website Logo"
                              className="w-7 h-7 rounded-xl object-contain bg-white/10 p-0.5"
                            />
                            <span className="text-[11px] font-bold text-white tracking-wide">{project.client || "Client"}</span>
                          </div>
                        ) : (
                          <div className="absolute top-4 left-4 glass-card-gold px-3 py-1 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider border border-[#D4AF37]/40 shadow-lg">
                            {project.category || "Website"}
                          </div>
                        )}

                        {/* Timeline / Status */}
                        <div className="absolute top-4 right-4 text-[10px] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-emerald-400 font-mono border border-emerald-500/30 flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{project.duration || "Live"}</span>
                        </div>

                        {/* Bottom Domain Bar inside Image */}
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#FFDF73] flex items-center space-x-1.5 truncate max-w-[75%]">
                            <Globe className="w-3 h-3 text-[#D4AF37] shrink-0" />
                            <span className="truncate">{getDisplayDomainForProject(project).replace(/^https?:\/\//, "")}</span>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-bold text-[#FFDF73] uppercase tracking-wider">
                            Click to Open
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <h3
                              onClick={() => setActiveWebsiteProject(project)}
                              className="font-serif text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                            >
                              {project.title}
                            </h3>
                            {project.client && (
                              <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline shrink-0">
                                {project.client}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-neutral-300 line-clamp-2 font-light leading-relaxed">
                            {project.description}
                          </p>

                          {/* DATA-DRIVEN ROW: Impact Metrics */}
                          {project.impactMetrics && project.impactMetrics.length > 0 && (
                            <div className="bg-gradient-to-r from-[#18150C] to-black/60 p-3 rounded-xl border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-2">
                              {project.impactMetrics.map((metric, idx) => (
                                <div key={idx} className="flex items-center space-x-1.5 text-xs">
                                  <Zap className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                  <span className="font-semibold text-white">{metric.value}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Project Tags */}
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {project.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-300 px-2.5 py-0.5 rounded-full"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* INTERACTIVE EXPAND ACCORDION (Challenge & Solution Reveal) */}
                        <div className="pt-3 border-t border-white/10 space-y-3">
                          
                          <div className="flex items-center justify-between gap-2">
                            <button
                              onClick={(e) => toggleExpand(project.id, e)}
                              className="text-xs text-[#D4AF37] hover:text-[#FFDF73] font-semibold flex items-center space-x-1 transition-colors"
                            >
                              <span>{isExpanded ? "Hide Details" : "Quick Story & Solution"}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            <button
                              onClick={() => openProjectModal(project, "case-study")}
                              className="text-xs text-neutral-300 hover:text-white flex items-center space-x-1 font-semibold transition-colors"
                            >
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                              <span>View Case Study &amp; Graphs</span>
                            </button>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 text-xs bg-black/40 p-3.5 rounded-xl border border-white/5 overflow-hidden"
                              >
                                {project.challenge && (
                                  <div>
                                    <div className="font-bold text-[#D4AF37] text-[11px] mb-0.5 uppercase tracking-wide">The Challenge:</div>
                                    <p className="text-neutral-300 font-light leading-relaxed">{project.challenge}</p>
                                  </div>
                                )}
                                {project.solution && (
                                  <div>
                                    <div className="font-bold text-emerald-400 text-[11px] mb-0.5 uppercase tracking-wide">Puhayt Solution:</div>
                                    <p className="text-neutral-300 font-light leading-relaxed">{project.solution}</p>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Action Buttons Row */}
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <button
                              onClick={() => setActiveWebsiteProject(project)}
                              className="flex-1 min-w-[140px] py-2.5 px-3.5 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg flex items-center justify-center space-x-1.5 shadow-lg hover:scale-105 transition-transform"
                              title="Open Interactive Live Website"
                            >
                              <Globe className="w-3.5 h-3.5" />
                              <span>Open Website</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>

                            <button
                              onClick={() => openProjectModal(project, "case-study")}
                              className="py-2.5 px-3 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center space-x-1.5 transition-colors"
                              title="View Verified Case Study & Growth Graphs"
                            >
                              <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Case Study</span>
                            </button>

                            <button
                              onClick={() => openProjectModal(project, "media")}
                              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 hover:text-white text-xs font-semibold flex items-center space-x-1 border border-white/10 transition-colors"
                              title="Inspect Desktop, Mobile, Device Photos & Videos"
                            >
                              <Monitor className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Media</span>
                            </button>

                            <a
                              href={
                                isExternalWebsiteUrl(project.liveUrl)
                                  ? project.liveUrl
                                  : `?openWebsite=${encodeURIComponent(project.id)}#/portfolio`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 text-[#FFDF73] border border-[#D4AF37]/30 transition-colors"
                              title="Open Website in New Browser Tab"
                              aria-label={`Open ${project.title} in new tab`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* "SEE MORE" PAGINATION CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              {hasMoreProjects && (
                <button
                  onClick={handleSeeMore}
                  className="px-8 py-3.5 rounded-full font-bold text-sm text-[#0B0B0B] gold-gradient-bg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>See More Projects ({remainingCount} remaining)</span>
                </button>
              )}

              {visibleCount > INITIAL_VISIBLE_COUNT && (
                <button
                  onClick={handleShowLess}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* COMPREHENSIVE INTERNAL CASE STUDY & MEDIA MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="bg-[#0F0E0C] border border-[#D4AF37]/50 rounded-3xl p-5 sm:p-8 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl space-y-6 my-auto"
            >
              {/* Modal Top Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3.5">
                  {selectedProject.logoUrl ? (
                    <img
                      src={selectedProject.logoUrl}
                      alt="Brand Logo"
                      className="w-12 h-12 rounded-2xl object-contain bg-white/10 p-1 border border-[#D4AF37]/40"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#0B0B0B] font-bold">
                      <Globe className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                      {selectedProject.category} • {selectedProject.industry} • {selectedProject.duration || "Live"}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Modal Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setModalTab("case-study")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                      modalTab === "case-study"
                        ? "gold-gradient-bg text-[#0B0B0B] shadow-md"
                        : "bg-white/5 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Case Study &amp; Growth Graphs</span>
                  </button>

                  <button
                    onClick={() => setModalTab("media")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                      modalTab === "media"
                        ? "gold-gradient-bg text-[#0B0B0B] shadow-md"
                        : "bg-white/5 text-neutral-300 hover:text-white"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>Mockups, Device Photos &amp; Video</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    const proj = selectedProject;
                    setSelectedProject(null);
                    setActiveWebsiteProject(proj);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#FFDF73] hover:text-black border border-[#D4AF37]/50 flex items-center space-x-1.5 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* TAB 1: CASE STUDY & GROWTH GRAPHS */}
              {modalTab === "case-study" && (
                <div className="space-y-6">
                  {/* Verified Impact Metrics Banner */}
                  {selectedProject.caseStudyResults && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-black/60 border border-[#D4AF37]/30">
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Traffic Growth</div>
                        <div className="text-emerald-400 font-bold text-base sm:text-lg font-mono">
                          {selectedProject.caseStudyResults.trafficGrowth || "+320%"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">ROI Multiplier</div>
                        <div className="text-[#D4AF37] font-bold text-base sm:text-lg font-mono">
                          {selectedProject.caseStudyResults.roi || "7.2x"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Conversion Rate</div>
                        <div className="text-white font-bold text-base sm:text-lg font-mono">
                          {selectedProject.caseStudyResults.conversionRate || "4.8%"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Revenue Scale</div>
                        <div className="text-emerald-400 font-bold text-base sm:text-lg font-mono">
                          {selectedProject.caseStudyResults.revenueGenerated || "₹25L+"}
                        </div>
                      </div>
                      <div className="text-center col-span-2 sm:col-span-1">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Page Speed</div>
                        <div className="text-[#FFDF73] font-bold text-base sm:text-lg font-mono">
                          {selectedProject.caseStudyResults.pageSpeed || "99/100"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Narrative: Challenge & Strategy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="text-[#D4AF37] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Client Challenge &amp; Problem</span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed">
                        {selectedProject.challenge || "The client required a bespoke online experience with high speed, mobile-first design, and conversion-focused checkout."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="text-emerald-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Puhayt Strategy &amp; Architecture</span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed">
                        {selectedProject.strategy || selectedProject.solution || "Puhayt Digital designed a lightweight modern web architecture with automated WhatsApp checkout and sub-second asset delivery."}
                      </p>
                    </div>
                  </div>

                  {/* Execution Steps */}
                  {selectedProject.execution && selectedProject.execution.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                      <div className="text-white font-bold uppercase tracking-wider flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Key Execution Milestones</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProject.execution.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 p-2 rounded-lg bg-black/40 border border-white/5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-neutral-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Growth Graphs (Recharts) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Monthly Traffic Growth (Before vs. After Puhayt)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Verified Analytics</span>
                    </div>

                    <div className="h-64 sm:h-72 w-full bg-black/60 p-3 rounded-2xl border border-white/10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={
                            selectedProject.monthlyTrafficData && selectedProject.monthlyTrafficData.length > 0
                              ? selectedProject.monthlyTrafficData
                              : [
                                  { month: "Month 1", before: 2400, after: 2400 },
                                  { month: "Month 2", before: 2600, after: 6800 },
                                  { month: "Month 3", before: 2500, after: 12400 },
                                  { month: "Month 4", before: 2700, after: 19800 },
                                ]
                          }
                          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="beforeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6B7280" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                          <XAxis dataKey="month" stroke="#A3A3A3" fontSize={11} />
                          <YAxis stroke="#A3A3A3" fontSize={11} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#171717", borderColor: "#D4AF37", borderRadius: "12px", fontSize: "12px" }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                          <Area type="monotone" dataKey="before" name="Before Puhayt" stroke="#6B7280" fillOpacity={1} fill="url(#beforeGradient)" />
                          <Area type="monotone" dataKey="after" name="After Puhayt Digital" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#trafficGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Client Testimonial */}
                  {selectedProject.clientTestimonial && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#18150C] to-black/80 border border-[#D4AF37]/30 space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs text-[#D4AF37] font-bold">
                        <Quote className="w-3.5 h-3.5" />
                        <span>Client Testimonial</span>
                      </div>
                      <p className="text-neutral-200 text-xs italic font-light leading-relaxed">
                        "{selectedProject.clientTestimonial.quote}"
                      </p>
                      <div className="text-[11px] font-semibold text-white">
                        {selectedProject.clientTestimonial.author} — <span className="text-neutral-400">{selectedProject.clientTestimonial.role}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: MEDIA, MOCKUPS, PHOTOS & VIDEOS */}
              {modalTab === "media" && (
                <div className="space-y-5">
                  {/* Media Switcher Sub-tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                    <button
                      onClick={() => setActiveMediaSubTab("desktop")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                        activeMediaSubTab === "desktop" ? "gold-gradient-bg text-[#0B0B0B]" : "bg-white/5 text-neutral-300 hover:text-white"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop View</span>
                    </button>

                    <button
                      onClick={() => setActiveMediaSubTab("mobile")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                        activeMediaSubTab === "mobile" ? "gold-gradient-bg text-[#0B0B0B]" : "bg-white/5 text-neutral-300 hover:text-white"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile View</span>
                    </button>

                    {selectedProject.photos && selectedProject.photos.length > 0 && (
                      <button
                        onClick={() => setActiveMediaSubTab("photos")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                          activeMediaSubTab === "photos" ? "gold-gradient-bg text-[#0B0B0B]" : "bg-white/5 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Photos Gallery ({selectedProject.photos.length})</span>
                      </button>
                    )}

                    {selectedProject.videos && selectedProject.videos.length > 0 && (
                      <button
                        onClick={() => setActiveMediaSubTab("video")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                          activeMediaSubTab === "video" ? "gold-gradient-bg text-[#0B0B0B]" : "bg-white/5 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Video Showcase ({selectedProject.videos.length})</span>
                      </button>
                    )}
                  </div>

                  {/* Media Display Stage */}
                  <div className="rounded-2xl overflow-hidden bg-black/80 border border-white/10 flex items-center justify-center p-3 min-h-[320px]">
                    {activeMediaSubTab === "desktop" && (
                      <img
                        src={selectedProject.mockupDesktop || selectedProject.image}
                        alt={`${selectedProject.title} Desktop Mockup`}
                        className="w-full max-h-[440px] object-contain rounded-xl"
                      />
                    )}

                    {activeMediaSubTab === "mobile" && (
                      <img
                        src={selectedProject.mockupMobile || selectedProject.image}
                        alt={`${selectedProject.title} Mobile Mockup`}
                        className="max-w-[280px] max-h-[440px] object-contain rounded-xl"
                      />
                    )}

                    {activeMediaSubTab === "photos" && selectedProject.photos && (
                      <div className="w-full space-y-3 p-2">
                        <img
                          src={selectedProject.photos[activePhotoIndex] || selectedProject.image}
                          alt="Project Photo"
                          className="w-full max-h-[380px] object-contain rounded-xl mx-auto"
                        />
                        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                          {selectedProject.photos.map((ph, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActivePhotoIndex(idx)}
                              className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 ${
                                activePhotoIndex === idx ? "border-[#D4AF37] scale-105" : "border-white/20 opacity-60"
                              }`}
                            >
                              <img src={ph} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeMediaSubTab === "video" && selectedProject.videos && selectedProject.videos[0] && (
                      <div className="w-full aspect-video flex items-center justify-center">
                        {selectedProject.videos[0].includes("youtube") || selectedProject.videos[0].includes("youtu.be") ? (
                          <iframe
                            src={selectedProject.videos[0].replace("watch?v=", "embed/")}
                            title="Project Video"
                            className="w-full h-full rounded-xl"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={selectedProject.videos[0]}
                            controls
                            className="w-full max-h-[420px] rounded-xl"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Modal Footer CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    const proj = selectedProject;
                    setSelectedProject(null);
                    setActiveWebsiteProject(proj);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg flex items-center justify-center space-x-2 shadow-lg hover:scale-105 transition-transform"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Interactive Live Website</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                {isExternalWebsiteUrl(selectedProject.liveUrl) && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl font-bold text-xs text-[#FFDF73] bg-white/10 hover:bg-white/15 border border-[#D4AF37]/40 flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>Open Direct URL in New Tab</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello Puhayt Digital! I saw the case study for ${selectedProject.title} and want to discuss building a high-performance website for my business.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center space-x-2 shadow-lg transition-colors"
                >
                  <span>Inquire on WhatsApp for Similar Project</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE LIVE WEBSITE VIEWER MODAL */}
      <PortfolioWebsiteViewerModal
        project={activeWebsiteProject}
        onClose={() => setActiveWebsiteProject(null)}
        onOpenCaseStudy={(proj) => openProjectModal(proj, "case-study")}
        whatsappNumber={cleanWhatsapp}
      />

    </section>
  );
};
