import React, { useState } from "react";
import { useAgency } from "../../context/AgencyContext";
import { AdCampaign } from "../../types";
import {
  Megaphone,
  Plus,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Sparkles,
  ExternalLink,
  BarChart2,
  Layers,
  ArrowRight,
  TrendingUp,
  Globe,
  Share2
} from "lucide-react";

export const MarketingAdsManager: React.FC = () => {
  const {
    campaigns,
    addCampaign,
    deleteCampaign,
    approveCampaign,
    publishCampaign,
  } = useAgency();

  const [isCreating, setIsCreating] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "https://",
    clientName: "",
    objective: "Lead Generation" as const,
    platform: "Website Banner" as const,
    aspectRatio: "16:9" as const,
    primaryHeadline: "",
    alternativeHeadline1: "",
    alternativeHeadline2: "",
    primaryText: "",
    description: "",
    ctaText: "Claim Free Audit & Strategy",
    targetUrl: "#contact",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.primaryHeadline) return;

    const headlines = [formData.primaryHeadline];
    if (formData.alternativeHeadline1) headlines.push(formData.alternativeHeadline1);
    if (formData.alternativeHeadline2) headlines.push(formData.alternativeHeadline2);

    addCampaign({
      name: formData.name,
      websiteUrl: formData.websiteUrl,
      clientName: formData.clientName || "Puhayt Digital",
      objective: formData.objective,
      platform: formData.platform,
      aspectRatio: formData.aspectRatio,
      status: "draft",
      approved: false,
      headlines,
      primaryText: formData.primaryText,
      description: formData.description,
      ctaText: formData.ctaText,
      targetUrl: formData.targetUrl,
      imageUrl: formData.imageUrl,
      variations: [
        {
          version: "Variation A (Authority)",
          headline: formData.primaryHeadline,
          copy: formData.primaryText,
          estimatedCtr: "4.8%"
        },
        ...(formData.alternativeHeadline1 ? [{
          version: "Variation B (Direct Action)",
          headline: formData.alternativeHeadline1,
          copy: formData.description || formData.primaryText,
          estimatedCtr: "5.4%"
        }] : [])
      ]
    });

    setIsCreating(false);
    setFormData({
      name: "",
      websiteUrl: "https://",
      clientName: "",
      objective: "Lead Generation",
      platform: "Website Banner",
      aspectRatio: "16:9",
      primaryHeadline: "",
      alternativeHeadline1: "",
      alternativeHeadline2: "",
      primaryText: "",
      description: "",
      ctaText: "Claim Free Audit & Strategy",
      targetUrl: "#contact",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    });
  };

  const filteredCampaigns = filterStatus === "all"
    ? campaigns
    : campaigns.filter((c) => c.status === filterStatus);

  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const publishedCount = campaigns.filter((c) => c.status === "published" && c.approved).length;

  return (
    <div className="space-y-6">
      
      {/* Header & KPI Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-[#D4AF37]" />
            <span>Marketing & Advertisement Operations</span>
          </h3>
          <p className="text-neutral-400 text-xs font-light">
            Manage multi-channel campaigns, approve drafts, and publish verified public announcements to website visitors.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 rounded-full font-bold text-xs text-[#0B0B0B] gold-gradient-bg flex items-center space-x-1.5 shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-3 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-neutral-400">Total Campaigns</div>
          <div className="text-xl font-mono font-bold text-white mt-1">{campaigns.length}</div>
        </div>

        <div className="glass-card p-3 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-emerald-400">Live Public Ads</div>
          <div className="text-xl font-mono font-bold text-emerald-400 mt-1">{publishedCount}</div>
        </div>

        <div className="glass-card p-3 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-[#D4AF37]">Total Impressions</div>
          <div className="text-xl font-mono font-bold text-[#D4AF37] mt-1">{totalImpressions}</div>
        </div>

        <div className="glass-card p-3 rounded-xl border border-white/10">
          <div className="text-[10px] uppercase font-bold text-sky-400">Total Clicks</div>
          <div className="text-xl font-mono font-bold text-sky-400 mt-1">{totalClicks}</div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 flex items-start space-x-2 text-[11px] text-amber-200/90">
        <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#D4AF37]">Public Display Policy:</span> ONLY advertisements marked both <span className="underline font-bold">APPROVED</span> and <span className="underline font-bold">PUBLISHED</span> are visible to website visitors on the live frontend. Drafts and unapproved items remain strictly private.
        </div>
      </div>

      {/* Create Campaign Modal / Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="glass-card p-5 rounded-2xl border border-[#D4AF37]/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Create Ad Campaign & Copywriting Matrix</span>
            </h4>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Campaign Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Q2 Enterprise SEO Growth Drive"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Client / Brand Name</label>
              <input
                type="text"
                placeholder="e.g. Puhayt Digital or Client Brand"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Target Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Website Banner">Website Banner (Top Bar)</option>
                <option value="Google Search">Google Search Ad</option>
                <option value="Meta Ads">Meta / Instagram Ad</option>
                <option value="LinkedIn">LinkedIn Sponsored</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Objective</label>
              <select
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Lead Generation">Lead Generation</option>
                <option value="Brand Awareness">Brand Awareness</option>
                <option value="Sales Conversion">Sales Conversion</option>
                <option value="Website Traffic">Website Traffic</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Aspect Ratio</label>
              <select
                value={formData.aspectRatio}
                onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="16:9">16:9 (Landscape / Banner)</option>
                <option value="1:1">1:1 (Square Feed)</option>
                <option value="9:16">9:16 (Vertical Story/Reel)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Primary Headline * (High-Impact)</label>
            <input
              type="text"
              required
              placeholder="e.g. Scale Smarter. Dominate Search in 2026 with Puhayt Digital."
              value={formData.primaryHeadline}
              onChange={(e) => setFormData({ ...formData, primaryHeadline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Alternative Headline 1</label>
              <input
                type="text"
                placeholder="e.g. Bespoke High-Speed Web Design & SEO Engine"
                value={formData.alternativeHeadline1}
                onChange={(e) => setFormData({ ...formData, alternativeHeadline1: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Alternative Headline 2</label>
              <input
                type="text"
                placeholder="e.g. Turn Website Visitors Into High-Value Paying Clients"
                value={formData.alternativeHeadline2}
                onChange={(e) => setFormData({ ...formData, alternativeHeadline2: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Primary Ad Copy (Body text)</label>
            <textarea
              rows={3}
              placeholder="Elevate your brand presence with sub-second responsive architecture, custom SEO ranking systems, and verified ROI marketing..."
              value={formData.primaryText}
              onChange={(e) => setFormData({ ...formData, primaryText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-neutral-200 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Call-to-Action Text</label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Target Destination URL / Anchor</label>
              <input
                type="text"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="block text-[11px] font-semibold text-neutral-300">
              Banner Background Image Address / Local Device File
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="e.g. /assets/ad-banner.jpg or image address"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />
              <label className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-white/10 shrink-0">
                <span>Browse File</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (uploadEv) => {
                        const imgAddr = uploadEv.target?.result as string;
                        setFormData({ ...formData, imageUrl: imgAddr });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            {formData.imageUrl && (
              <div className="mt-1 flex items-center space-x-3">
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-black">
                  <img src={formData.imageUrl} alt="Ad Preview" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Image Address Loaded</span>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl bg-white/5 text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-lg"
            >
              Save Campaign Draft
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {["all", "published", "approved", "draft"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              filterStatus === status
                ? "bg-[#D4AF37] text-[#0B0B0B]"
                : "bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <div className="p-8 rounded-2xl glass-card text-center text-neutral-400 text-xs">
            No campaigns found matching filter.
          </div>
        ) : (
          filteredCampaigns.map((camp) => {
            const isLive = camp.status === "published" && camp.approved;

            return (
              <div
                key={camp.id}
                className={`glass-card p-5 rounded-2xl border transition-all space-y-4 ${
                  isLive
                    ? "border-emerald-500/40 shadow-lg shadow-emerald-950/20"
                    : "border-white/10"
                }`}
              >
                {/* Campaign Header & Status Pills */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{camp.name}</span>
                      <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-neutral-300">
                        {camp.platform}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Client: <span className="text-[#D4AF37]">{camp.clientName}</span> • Objective: {camp.objective}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center space-x-2">
                    {camp.approved ? (
                      <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>APPROVED</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-400 border border-amber-800/50">
                        <span>PENDING APPROVAL</span>
                      </span>
                    )}

                    {camp.status === "published" && camp.approved && (
                      <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-950/80 text-sky-400 border border-sky-800/50 animate-pulse">
                        <Globe className="w-3 h-3" />
                        <span>PUBLIC LIVE</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Preview & Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left 2 Cols: Copy & Headlines */}
                  <div className="lg:col-span-2 space-y-3">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase text-neutral-400">Headlines ({camp.headlines.length})</div>
                      <div className="space-y-1">
                        {camp.headlines.map((hl, idx) => (
                          <div key={idx} className="text-xs font-semibold text-white bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            {hl}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase text-neutral-400">Ad Body Copy</div>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                        {camp.primaryText}
                      </p>
                    </div>

                    {/* Variations Preview */}
                    {camp.variations && camp.variations.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[10px] font-bold uppercase text-[#D4AF37]">A/B Copy Variations & Projected CTR</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {camp.variations.map((v, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] space-y-1">
                              <div className="flex items-center justify-between font-bold text-white">
                                <span>{v.version}</span>
                                <span className="text-emerald-400 font-mono">{v.estimatedCtr} CTR</span>
                              </div>
                              <div className="text-neutral-300 line-clamp-1">{v.headline}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Col: Performance & Controls */}
                  <div className="space-y-3 flex flex-col justify-between">
                    <div className="glass-card p-3 rounded-xl border border-white/10 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center space-x-1">
                        <BarChart2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Performance Telemetry</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-white/5 p-2 rounded-lg">
                          <div className="text-xs font-mono font-bold text-white">{camp.impressions || 0}</div>
                          <div className="text-[9px] text-neutral-400">Impressions</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg">
                          <div className="text-xs font-mono font-bold text-sky-400">{camp.clicks || 0}</div>
                          <div className="text-[9px] text-neutral-400">Clicks</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-neutral-400 text-center font-mono">
                        CTR: {camp.impressions && camp.impressions > 0 ? (((camp.clicks || 0) / camp.impressions) * 100).toFixed(2) : "0.00"}%
                      </div>
                    </div>

                    {/* Operational Action Buttons */}
                    <div className="space-y-2">
                      {/* Approval Toggle */}
                      <button
                        onClick={() => approveCampaign(camp.id, !camp.approved)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                          camp.approved
                            ? "bg-amber-900/30 text-amber-300 hover:bg-amber-900/50 border border-amber-700/40"
                            : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md"
                        }`}
                      >
                        {camp.approved ? (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Revoke Approval (Un-approve)</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Campaign</span>
                          </>
                        )}
                      </button>

                      {/* Public Publish Toggle */}
                      {camp.approved && (
                        <button
                          onClick={() => publishCampaign(camp.id, camp.status !== "published")}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                            camp.status === "published"
                              ? "bg-sky-950 text-sky-300 border border-sky-700/50 hover:bg-sky-900/50"
                              : "gold-gradient-bg text-[#0B0B0B] hover:scale-[1.02]"
                          }`}
                        >
                          {camp.status === "published" ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Unpublish from Live Banner</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Publish to Live Banner (Public)</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => deleteCampaign(camp.id)}
                        className="w-full py-1.5 px-3 rounded-xl text-xs text-neutral-400 hover:text-red-400 hover:bg-red-950/20 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Campaign</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
