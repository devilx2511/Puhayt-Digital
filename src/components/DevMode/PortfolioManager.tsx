import React, { useState } from "react";
import { PortfolioProject } from "../../types";
import { useAgency } from "../../context/AgencyContext";
import {
  PortfolioWebsiteViewerModal,
  getDisplayDomainForProject,
  isExternalWebsiteUrl,
} from "../PortfolioWebsiteViewerModal";
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Video,
  TrendingUp,
  BarChart3,
  CheckCircle,
  ExternalLink,
  Upload,
  Globe,
  Zap,
  Quote,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Save,
  X
} from "lucide-react";

export const PortfolioManager: React.FC = () => {
  const {
    portfolioProjects,
    updatePortfolioProjects,
    addPortfolioProject,
    deletePortfolioProject,
    clearAllPortfolioProjects,
    restoreDefaultPortfolioProjects,
    isCloudSyncing,
    syncAllToLiveCloud,
  } = useAgency();

  const [isAdding, setIsAdding] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [previewingWebsite, setPreviewingWebsite] = useState<PortfolioProject | null>(null);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL portfolio projects? This will completely empty the portfolio showcase on the website.")) {
      clearAllPortfolioProjects();
      setSaveSuccessNotice("All portfolio projects deleted successfully.");
      setTimeout(() => setSaveSuccessNotice(null), 4000);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("Restore sample default portfolio projects?")) {
      restoreDefaultPortfolioProjects();
      setSaveSuccessNotice("Sample portfolio projects restored successfully.");
      setTimeout(() => setSaveSuccessNotice(null), 4000);
    }
  };

  // Form State
  const [formProject, setFormProject] = useState<Partial<PortfolioProject>>({
    title: "",
    client: "",
    industry: "E-Commerce",
    category: "Website",
    duration: "3 Weeks",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    logoUrl: "",
    mockupDesktop: "",
    mockupMobile: "",
    photos: [],
    videos: [],
    description: "",
    challenge: "",
    solution: "",
    strategy: "",
    execution: [],
    tags: ["E-Commerce", "Responsive", "UI/UX Design"],
    liveUrl: "",
    caseStudyResults: {
      trafficGrowth: "+350%",
      roi: "7.5x",
      conversionRate: "5.2%",
      revenueGenerated: "₹25 Lakh",
      pageSpeed: "99/100",
    },
    monthlyTrafficData: [
      { month: "Month 1", before: 2000, after: 2000 },
      { month: "Month 2", before: 2100, after: 4800 },
      { month: "Month 3", before: 2050, after: 8900 },
      { month: "Month 4", before: 2200, after: 14200 },
    ],
    revenueData: [
      { month: "Month 1", revenue: 200000 },
      { month: "Month 2", revenue: 550000 },
      { month: "Month 3", revenue: 1100000 },
      { month: "Month 4", revenue: 1850000 },
    ],
    clientTestimonial: {
      quote: "Puhayt Digital revolutionized our digital visibility and conversion rate.",
      author: "Client Founder",
      role: "Managing Director",
    },
    impactMetrics: [
      { label: "Traffic Surge", value: "+350% Organic Growth" },
      { label: "Load Speed", value: "0.7s Core Web Vitals" },
    ],
  });

  // Aux inputs
  const [tagsString, setTagsString] = useState("E-Commerce, Responsive, UI/UX Design");
  const [executionInput, setExecutionInput] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [trafficMonth, setTrafficMonth] = useState("");
  const [trafficBefore, setTrafficBefore] = useState<number>(0);
  const [trafficAfter, setTrafficAfter] = useState<number>(0);
  const [revMonth, setRevMonth] = useState("");
  const [revAmount, setRevAmount] = useState<number>(0);

  const startEdit = (proj: PortfolioProject) => {
    setEditingProjectId(proj.id);
    setFormProject({ ...proj });
    setTagsString(proj.tags?.join(", ") || "");
    setIsAdding(true);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingProjectId(null);
    setFormProject({
      title: "",
      client: "",
      industry: "E-Commerce",
      category: "Website",
      duration: "3 Weeks",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      logoUrl: "",
      mockupDesktop: "",
      mockupMobile: "",
      photos: [],
      videos: [],
      description: "",
      challenge: "",
      solution: "",
      strategy: "",
      execution: [],
      tags: ["E-Commerce", "Responsive"],
      liveUrl: "",
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject.title) return;

    const parsedTags = tagsString
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectToSave: PortfolioProject = {
      id: editingProjectId || `proj-${Date.now()}`,
      title: formProject.title || "Untitled Project",
      client: formProject.client || "Client",
      industry: formProject.industry || "General",
      category: formProject.category || "Website",
      duration: formProject.duration || "4 Weeks",
      image: formProject.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      logoUrl: formProject.logoUrl || "",
      mockupDesktop: formProject.mockupDesktop || formProject.image,
      mockupMobile: formProject.mockupMobile || formProject.image,
      photos: formProject.photos && formProject.photos.length > 0 ? formProject.photos : [formProject.image || ""],
      videos: formProject.videos || [],
      description: formProject.description || "",
      challenge: formProject.challenge || "",
      solution: formProject.solution || "",
      strategy: formProject.strategy || "",
      execution: formProject.execution || [],
      technologies: formProject.technologies && formProject.technologies.length > 0 ? formProject.technologies : parsedTags,
      tags: parsedTags,
      liveUrl: formProject.liveUrl || "",
      impactMetrics: formProject.impactMetrics || [
        { label: "Speed", value: "99/100 Score" },
        { label: "Conversions", value: "+250% Inquiries" },
      ],
      caseStudyResults: formProject.caseStudyResults || {
        trafficGrowth: "+320%",
        roi: "6.8x",
        conversionRate: "4.8%",
        revenueGenerated: "₹20 Lakh",
        pageSpeed: "99/100",
      },
      monthlyTrafficData: formProject.monthlyTrafficData && formProject.monthlyTrafficData.length > 0
        ? formProject.monthlyTrafficData
        : [
            { month: "Month 1", before: 2000, after: 2000 },
            { month: "Month 2", before: 2100, after: 5000 },
            { month: "Month 3", before: 2200, after: 9500 },
          ],
      revenueData: formProject.revenueData && formProject.revenueData.length > 0
        ? formProject.revenueData
        : [
            { month: "Month 1", revenue: 200000 },
            { month: "Month 2", revenue: 600000 },
            { month: "Month 3", revenue: 1200000 },
          ],
      ...(formProject.clientTestimonial && formProject.clientTestimonial.quote ? { clientTestimonial: formProject.clientTestimonial } : {}),
      approvalStatus: "published",
    };

    if (editingProjectId) {
      updatePortfolioProjects(
        portfolioProjects.map((p) => (p.id === editingProjectId ? projectToSave : p))
      );
      setSaveSuccessNotice(`Project "${projectToSave.title}" updated and synced live!`);
    } else {
      addPortfolioProject(projectToSave);
      setSaveSuccessNotice(`New Project "${projectToSave.title}" published live for all visitors!`);
    }

    setTimeout(() => {
      setSaveSuccessNotice(null);
    }, 4000);

    cancelForm();
  };

  const handleRemoveProject = (id: string, projectTitle?: string) => {
    if (confirm(`Are you sure you want to remove "${projectTitle || 'this project'}" from the live portfolio?`)) {
      deletePortfolioProject(id);
      setSaveSuccessNotice(`Project removed and database updated live.`);
      setTimeout(() => setSaveSuccessNotice(null), 3000);
    }
  };

  // Device File Upload helper for Images
  const handleDeviceImageUpload = (
    field: "image" | "logoUrl" | "mockupDesktop" | "mockupMobile",
    file?: File
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      setFormProject((prev) => ({ ...prev, [field]: base64 }));
    };
    reader.readAsDataURL(file);
  };

  // Device File Upload helper for Photos array
  const handleDevicePhotoUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      setFormProject((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), base64],
      }));
    };
    reader.readAsDataURL(file);
  };

  // Device File Upload helper for Videos
  const handleDeviceVideoUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      setFormProject((prev) => ({
        ...prev,
        videos: [...(prev.videos || []), base64],
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-serif text-lg font-bold text-white">Live Portfolio &amp; Case Study Suite</h3>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
              {portfolioProjects.length} Websites Live
            </span>
            <span className="text-[10px] font-mono bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
              <span>Real-Time Cloud Synced</span>
            </span>
          </div>
          <p className="text-neutral-400 text-xs font-light">
            Every website includes an internal case study with graphs, device videos, photos, and genuine client metrics. Changes appear instantly for all users.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {portfolioProjects.length > 0 ? (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl font-bold text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 flex items-center space-x-1.5 transition-colors"
              title="Delete all projects from the portfolio"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestoreDefaults}
              className="px-3 py-2 rounded-xl font-bold text-xs bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 border border-white/10 flex items-center space-x-1.5 transition-colors"
              title="Restore sample demo projects"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Restore Samples</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => syncAllToLiveCloud()}
            disabled={isCloudSyncing}
            className="px-3.5 py-2 rounded-xl font-bold text-xs bg-white/10 text-neutral-200 hover:text-white hover:bg-white/20 border border-white/10 flex items-center space-x-1.5 transition-all disabled:opacity-50"
            title="Force immediate broadcast of all portfolio items to live cloud"
          >
            <Sparkles className={`w-3.5 h-3.5 text-[#D4AF37] ${isCloudSyncing ? 'animate-spin' : ''}`} />
            <span>{isCloudSyncing ? "Broadcasting..." : "Sync Cloud"}</span>
          </button>

          {!isAdding && (
            <button
              onClick={() => {
                cancelForm();
                setIsAdding(true);
              }}
              className="px-4 py-2 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg flex items-center space-x-1.5 shadow-lg hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{saveSuccessNotice}</span>
        </div>
      )}

      {/* Project Form (Add or Edit) */}
      {isAdding && (
        <form onSubmit={handleSave} className="bg-white/[0.03] p-5 rounded-2xl border border-[#D4AF37]/40 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold text-sm text-[#D4AF37]">
                {editingProjectId ? `Edit: ${formProject.title}` : "Create New Client Website & Case Study"}
              </span>
            </div>
            <button
              type="button"
              onClick={cancelForm}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: Core Website Identity */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>1. Core Website Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Luxury Real Estate"
                  value={formProject.title}
                  onChange={(e) => setFormProject({ ...formProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Client / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Horizon Realty Corp"
                  value={formProject.client}
                  onChange={(e) => setFormProject({ ...formProject, client: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Industry</label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Real Estate, Healthcare, E-Commerce"
                  value={formProject.industry}
                  onChange={(e) => setFormProject({ ...formProject, industry: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Category</label>
                <select
                  value={formProject.category}
                  onChange={(e) => setFormProject({ ...formProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Website">Website</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Branding">Branding</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Software">Software</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Duration / Timeline</label>
                <input
                  type="text"
                  placeholder="e.g. 4 Weeks"
                  value={formProject.duration}
                  onChange={(e) => setFormProject({ ...formProject, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#FFDF73] mb-1">Live Website Link / WhatsApp URL</label>
                <input
                  type="text"
                  placeholder="https://example.com or WhatsApp link"
                  value={formProject.liveUrl}
                  onChange={(e) => setFormProject({ ...formProject, liveUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-[#D4AF37]/30 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Filter Tags (Comma Separated)</label>
              <input
                type="text"
                placeholder="E-Commerce, Real Estate, Responsive, UI/UX Design, Lead Gen"
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Executive Summary / Description</label>
              <textarea
                rows={2}
                placeholder="A modern high-speed website with product catalog, booking engine, and mobile optimization..."
                value={formProject.description}
                onChange={(e) => setFormProject({ ...formProject, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Section 2: Media, Device Photos & Videos */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>2. Visual Assets &amp; Device Uploads</span>
            </div>

            {/* Main Preview Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-neutral-300">
                  Featured Cover Image URL or Device File
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formProject.image}
                    onChange={(e) => setFormProject({ ...formProject, image: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center space-x-1 shrink-0 border border-white/10">
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleDeviceImageUpload("image", e.target.files?.[0])}
                    />
                  </label>
                </div>
                {formProject.image && (
                  <img src={formProject.image} alt="Preview" className="w-24 h-16 object-cover rounded-lg border border-white/10 mt-1" />
                )}
              </div>

              {/* Website Logo */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-neutral-300">
                  Client / Website Brand Logo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Logo URL..."
                    value={formProject.logoUrl}
                    onChange={(e) => setFormProject({ ...formProject, logoUrl: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center space-x-1 shrink-0 border border-white/10">
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleDeviceImageUpload("logoUrl", e.target.files?.[0])}
                    />
                  </label>
                </div>
                {formProject.logoUrl && (
                  <img src={formProject.logoUrl} alt="Logo Preview" className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1 border border-white/10 mt-1" />
                )}
              </div>
            </div>

            {/* Desktop and Mobile Mockups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-neutral-300">Desktop Mockup Preview</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Desktop screen mockup URL..."
                    value={formProject.mockupDesktop}
                    onChange={(e) => setFormProject({ ...formProject, mockupDesktop: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center space-x-1 shrink-0 border border-white/10">
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleDeviceImageUpload("mockupDesktop", e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-neutral-300">Mobile Mockup Preview</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mobile screen mockup URL..."
                    value={formProject.mockupMobile}
                    onChange={(e) => setFormProject({ ...formProject, mockupMobile: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center space-x-1 shrink-0 border border-white/10">
                    <Upload className="w-3 h-3" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleDeviceImageUpload("mockupMobile", e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Photos Gallery Manager (Device uploads & URLs) */}
            <div className="space-y-2 bg-black/40 p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-neutral-300">
                  Photos Gallery ({formProject.photos?.length || 0} images)
                </label>
                <label className="cursor-pointer px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center space-x-1 border border-white/10">
                  <Upload className="w-3 h-3" />
                  <span>+ Upload Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleDevicePhotoUpload(e.target.files?.[0])}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Or paste photo image URL..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPhotoUrl.trim()) {
                      setFormProject({
                        ...formProject,
                        photos: [...(formProject.photos || []), newPhotoUrl.trim()],
                      });
                      setNewPhotoUrl("");
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-bold"
                >
                  Add URL
                </button>
              </div>

              {/* Photo thumbnails list */}
              {formProject.photos && formProject.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formProject.photos.map((ph, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 group">
                      <img src={ph} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setFormProject({
                            ...formProject,
                            photos: formProject.photos?.filter((_, i) => i !== idx),
                          });
                        }}
                        className="absolute inset-0 bg-red-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Showcase Manager (Device upload & Embed Links) */}
            <div className="space-y-2 bg-black/40 p-3 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-neutral-300">
                  Video Showcases ({formProject.videos?.length || 0} videos)
                </label>
                <label className="cursor-pointer px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center space-x-1 border border-white/10">
                  <Upload className="w-3 h-3" />
                  <span>+ Upload Video from Device</span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleDeviceVideoUpload(e.target.files?.[0])}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Or paste video link (YouTube, MP4, WebM)..."
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newVideoUrl.trim()) {
                      setFormProject({
                        ...formProject,
                        videos: [...(formProject.videos || []), newVideoUrl.trim()],
                      });
                      setNewVideoUrl("");
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-bold"
                >
                  Add Video
                </button>
              </div>

              {formProject.videos && formProject.videos.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {formProject.videos.map((vid, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                      <div className="flex items-center space-x-2 truncate">
                        <Video className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate font-mono text-[11px] text-neutral-300">{vid}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormProject({
                            ...formProject,
                            videos: formProject.videos?.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Case Study Narrative (Challenge, Strategy, Execution) */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>3. Internal Case Study Strategy &amp; Problem Solving</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-red-300 mb-1">The Challenge / Client Problem</label>
                <textarea
                  rows={2}
                  placeholder="Low mobile conversion, slow legacy site, weak lead routing..."
                  value={formProject.challenge}
                  onChange={(e) => setFormProject({ ...formProject, challenge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-300 mb-1">Puhayt Solution</label>
                <textarea
                  rows={2}
                  placeholder="Engineered custom responsive framework with instant WhatsApp inquiry pipeline..."
                  value={formProject.solution}
                  onChange={(e) => setFormProject({ ...formProject, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Strategic Approach</label>
              <textarea
                rows={2}
                placeholder="Targeted SEO strategy, conversion-rate optimization funnel, and edge performance..."
                value={formProject.strategy}
                onChange={(e) => setFormProject({ ...formProject, strategy: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Execution Steps */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-neutral-300">
                Key Execution Milestones ({formProject.execution?.length || 0})
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Sub-second image optimization achieving 99/100 Core Web Vitals"
                  value={executionInput}
                  onChange={(e) => setExecutionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (executionInput.trim()) {
                        setFormProject({
                          ...formProject,
                          execution: [...(formProject.execution || []), executionInput.trim()],
                        });
                        setExecutionInput("");
                      }
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (executionInput.trim()) {
                      setFormProject({
                        ...formProject,
                        execution: [...(formProject.execution || []), executionInput.trim()],
                      });
                      setExecutionInput("");
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-bold"
                >
                  + Add Step
                </button>
              </div>

              {formProject.execution && formProject.execution.length > 0 && (
                <ul className="space-y-1 pt-1">
                  {formProject.execution.map((step, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-xs text-neutral-300">
                      <span className="flex items-center space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{step}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormProject({
                            ...formProject,
                            execution: formProject.execution?.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Section 4: Interactive Growth Graphs & Verified Data */}
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>4. Growth Graphs &amp; Key Metrics</span>
            </div>

            {/* Case Study Key Results */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">Traffic Growth</label>
                <input
                  type="text"
                  placeholder="+350%"
                  value={formProject.caseStudyResults?.trafficGrowth}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      caseStudyResults: { ...formProject.caseStudyResults, trafficGrowth: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-emerald-400 font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">ROI Multiplier</label>
                <input
                  type="text"
                  placeholder="7.5x"
                  value={formProject.caseStudyResults?.roi}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      caseStudyResults: { ...formProject.caseStudyResults, roi: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-[#D4AF37] font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">Conversion Rate</label>
                <input
                  type="text"
                  placeholder="5.2%"
                  value={formProject.caseStudyResults?.conversionRate}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      caseStudyResults: { ...formProject.caseStudyResults, conversionRate: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-white font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">Revenue / Vol</label>
                <input
                  type="text"
                  placeholder="₹25 Lakh"
                  value={formProject.caseStudyResults?.revenueGenerated}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      caseStudyResults: { ...formProject.caseStudyResults, revenueGenerated: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-emerald-400 font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">Page Speed</label>
                <input
                  type="text"
                  placeholder="99/100"
                  value={formProject.caseStudyResults?.pageSpeed}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      caseStudyResults: { ...formProject.caseStudyResults, pageSpeed: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/15 text-[#FFDF73] font-mono font-bold text-xs"
                />
              </div>
            </div>

            {/* Traffic Growth Data Points (Before vs After) */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-neutral-200">
                  Monthly Traffic Graph Points ({formProject.monthlyTrafficData?.length || 0})
                </label>
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Month (e.g. Month 1)"
                  value={trafficMonth}
                  onChange={(e) => setTrafficMonth(e.target.value)}
                  className="w-24 px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Before (e.g. 2000)"
                  value={trafficBefore || ""}
                  onChange={(e) => setTrafficBefore(Number(e.target.value))}
                  className="w-28 px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-neutral-300"
                />
                <input
                  type="number"
                  placeholder="After (e.g. 8500)"
                  value={trafficAfter || ""}
                  onChange={(e) => setTrafficAfter(Number(e.target.value))}
                  className="w-28 px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-emerald-400 font-bold"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (trafficMonth.trim()) {
                      setFormProject({
                        ...formProject,
                        monthlyTrafficData: [
                          ...(formProject.monthlyTrafficData || []),
                          { month: trafficMonth.trim(), before: trafficBefore, after: trafficAfter },
                        ],
                      });
                      setTrafficMonth("");
                      setTrafficBefore(0);
                      setTrafficAfter(0);
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-white/10 text-[#D4AF37] font-bold text-xs"
                >
                  + Add Point
                </button>
              </div>

              {formProject.monthlyTrafficData && formProject.monthlyTrafficData.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {formProject.monthlyTrafficData.map((pt, idx) => (
                    <div key={idx} className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                      <span className="font-bold text-white">{pt.month}:</span>
                      <span className="text-neutral-400">{pt.before}</span>
                      <span className="text-neutral-500">→</span>
                      <span className="text-emerald-400 font-bold">{pt.after}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormProject({
                            ...formProject,
                            monthlyTrafficData: formProject.monthlyTrafficData?.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400 ml-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Revenue Growth Data Points */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
              <label className="text-[11px] font-semibold text-neutral-200">
                Monthly Revenue Scale Data ({formProject.revenueData?.length || 0})
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Month (e.g. Month 1)"
                  value={revMonth}
                  onChange={(e) => setRevMonth(e.target.value)}
                  className="w-28 px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Revenue Amount (₹)"
                  value={revAmount || ""}
                  onChange={(e) => setRevAmount(Number(e.target.value))}
                  className="w-36 px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-emerald-400 font-bold"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (revMonth.trim() && revAmount > 0) {
                      setFormProject({
                        ...formProject,
                        revenueData: [
                          ...(formProject.revenueData || []),
                          { month: revMonth.trim(), revenue: revAmount },
                        ],
                      });
                      setRevMonth("");
                      setRevAmount(0);
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-white/10 text-[#D4AF37] font-bold text-xs"
                >
                  + Add Point
                </button>
              </div>

              {formProject.revenueData && formProject.revenueData.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {formProject.revenueData.map((pt, idx) => (
                    <div key={idx} className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px]">
                      <span className="font-bold text-white">{pt.month}:</span>
                      <span className="text-emerald-400 font-mono">₹{pt.revenue.toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormProject({
                            ...formProject,
                            revenueData: formProject.revenueData?.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-neutral-500 hover:text-red-400 ml-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Client Testimonial */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
              <label className="text-[11px] font-semibold text-neutral-200 flex items-center space-x-1.5">
                <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Client Quote / Testimonial</span>
              </label>
              <textarea
                rows={2}
                placeholder="What did the client say about working with Puhayt Digital?"
                value={formProject.clientTestimonial?.quote}
                onChange={(e) =>
                  setFormProject({
                    ...formProject,
                    clientTestimonial: {
                      author: formProject.clientTestimonial?.author || formProject.client || "Client Founder",
                      role: formProject.clientTestimonial?.role || "Founder & CEO",
                      quote: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-neutral-300"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Author Name (e.g. Rajesh Malhotra)"
                  value={formProject.clientTestimonial?.author || ""}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      clientTestimonial: {
                        quote: formProject.clientTestimonial?.quote || "",
                        role: formProject.clientTestimonial?.role || "Founder",
                        author: e.target.value,
                      },
                    })
                  }
                  className="px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Managing Director)"
                  value={formProject.clientTestimonial?.role || ""}
                  onChange={(e) =>
                    setFormProject({
                      ...formProject,
                      clientTestimonial: {
                        quote: formProject.clientTestimonial?.quote || "",
                        author: formProject.clientTestimonial?.author || "",
                        role: e.target.value,
                      },
                    })
                  }
                  className="px-2.5 py-1 rounded-lg bg-black border border-white/15 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={cancelForm}
              className="px-4 py-2 rounded-xl bg-white/5 text-neutral-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-lg hover:scale-105 transition-transform flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{editingProjectId ? "Save Changes" : "Publish Project & Case Study"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Existing Portfolio Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-3 relative group"
          >
            <div className="flex items-start space-x-3.5">
              <img
                src={project.image}
                alt={project.title}
                className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{project.category} • {project.industry}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">{project.duration}</span>
                </div>
                <h4 className="font-bold text-sm text-white truncate">{project.title}</h4>
                <div className="text-[11px] text-neutral-300 font-mono">Client: {project.client}</div>
                <p className="text-[11px] text-neutral-400 line-clamp-2 font-light">{project.description}</p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            {project.caseStudyResults && (
              <div className="bg-black/60 p-2 rounded-xl border border-white/5 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div>
                  <span className="text-neutral-500 block">Growth</span>
                  <span className="text-emerald-400 font-bold font-mono">{project.caseStudyResults.trafficGrowth || "N/A"}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">ROI</span>
                  <span className="text-[#D4AF37] font-bold font-mono">{project.caseStudyResults.roi || "N/A"}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Speed</span>
                  <span className="text-sky-400 font-bold font-mono">{project.caseStudyResults.pageSpeed || "99/100"}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center space-x-2 text-[10px] text-neutral-400">
                {project.photos && project.photos.length > 0 && (
                  <span>📷 {project.photos.length} photos</span>
                )}
                {project.videos && project.videos.length > 0 && (
                  <span>🎥 {project.videos.length} videos</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setPreviewingWebsite(project)}
                  className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#0B0B0B] font-bold text-xs flex items-center space-x-1 shadow hover:scale-105 transition-transform"
                  title={`Open ${getDisplayDomainForProject(project)}`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Open Website</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                {isExternalWebsiteUrl(project.liveUrl) && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFDF73]"
                    title="Open Direct External URL in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(project)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] font-bold text-xs flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(project.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-white/5"
                  title="Delete Website Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PortfolioWebsiteViewerModal
        project={previewingWebsite}
        onClose={() => setPreviewingWebsite(null)}
      />
    </div>
  );
};
