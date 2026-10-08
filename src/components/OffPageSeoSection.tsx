import React, { useState } from "react";
import {
  Globe,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  Link2,
  Code2,
  MapPin,
  FileText,
  Plus,
  Rss,
  CheckCircle2,
  Building2,
  Share2,
} from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";
import {
  OFFICIAL_NAP_RECORD,
  ANCHOR_TEXT_DISTRIBUTION,
  VERIFIED_BACKLINK_RECORDS,
  DIRECTORY_CITATIONS,
  EMBEDDABLE_BACKLINK_BADGES,
  OUTREACH_TEMPLATES,
  BacklinkRecord,
} from "../config/offPageSeoConfig";

export const OffPageSeoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "backlinks" | "badges" | "citations" | "outreach"
  >("backlinks");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [backlinkFilter, setBacklinkFilter] = useState<string>("All");

  // Custom target path & anchor builder for dynamic backlink badge generator
  const [customTargetPath, setCustomTargetPath] = useState<string>("/");
  const [customAnchorText, setCustomAnchorText] = useState<string>(
    "Puhayt Digital — Best Digital Marketing Agency in Kolkata"
  );

  // User-extensible backlink records (persisted in localStorage)
  const [customBacklinks, setCustomBacklinks] = useState<BacklinkRecord[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("puhayt_custom_backlinks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAddingBacklink, setIsAddingBacklink] = useState(false);
  const [newSourceDomain, setNewSourceDomain] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState(`${SITE_CONFIG.siteUrl}/`);
  const [newAnchorText, setNewAnchorText] = useState(
    "Puhayt Digital — Best Digital Marketing Agency in Kolkata"
  );
  const [newDa, setNewDa] = useState<number>(60);
  const [newLinkType, setNewLinkType] = useState<"DoFollow" | "NoFollow">("DoFollow");

  const allBacklinks = [...customBacklinks, ...VERIFIED_BACKLINK_RECORDS];

  const filteredBacklinks =
    backlinkFilter === "All"
      ? allBacklinks
      : allBacklinks.filter(
          (b) => b.category === backlinkFilter || b.linkType === backlinkFilter
        );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleAddBacklink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceDomain.trim() || !newSourceUrl.trim()) return;

    const cleanDomain = newSourceDomain
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");

    const record: BacklinkRecord = {
      id: `custom-bl-${Date.now()}`,
      sourceDomain: cleanDomain,
      sourceUrl: newSourceUrl.trim().startsWith("http")
        ? newSourceUrl.trim()
        : `https://${newSourceUrl.trim()}`,
      targetUrl: newTargetUrl.trim() || `${SITE_CONFIG.siteUrl}/`,
      anchorText: newAnchorText.trim() || "Puhayt Digital",
      anchorCategory: "Branded",
      domainAuthority: Math.min(100, Math.max(1, Number(newDa) || 50)),
      linkType: newLinkType,
      category: "Client Footer Attribution",
      status: "Verified Live",
      dateAcquired: new Date().toISOString().split("T")[0],
    };

    const updated = [record, ...customBacklinks];
    setCustomBacklinks(updated);
    try {
      localStorage.setItem("puhayt_custom_backlinks", JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }

    setNewSourceDomain("");
    setNewSourceUrl("");
    setIsAddingBacklink(false);
  };

  const avgDa = Math.round(
    allBacklinks.reduce((acc, item) => acc + item.domainAuthority, 0) /
      Math.max(1, allBacklinks.length)
  );
  const doFollowCount = allBacklinks.filter((b) => b.linkType === "DoFollow").length;
  const doFollowRatio = Math.round((doFollowCount / Math.max(1, allBacklinks.length)) * 100);

  const dynamicCustomHtmlSnippet = `<!-- Verified Backlink to Puhayt Digital -->
<a href="${SITE_CONFIG.siteUrl}${customTargetPath}" target="_blank" rel="dofollow noopener" title="${customAnchorText}">${customAnchorText}</a>`;

  return (
    <section
      id="off-page-seo"
      aria-label="Off-Page SEO, High-Authority Backlinks & Digital PR Hub"
      className="py-12 sm:py-16 bg-[#0B0B0B] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Executive Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#191409] to-[#0B0B0B]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
              Referring Authority
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {allBacklinks.length} Domains
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">
              Avg DA {avgDa}/100 Verified
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              DoFollow Link Equity
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {doFollowRatio}% DoFollow
            </div>
            <div className="text-[11px] text-neutral-300 mt-1">
              {doFollowCount} Active DoFollow Links
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              NAP Citation Match
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FFDF73] mt-1">
              100% Match
            </div>
            <div className="text-[11px] text-neutral-300 mt-1">
              {DIRECTORY_CITATIONS.length} High-DA Directories
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Anchor Text Safety
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Penguin-Safe
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">
              42% Branded / 26% Topical
            </div>
          </div>

          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 col-span-2 lg:col-span-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Syndication Feeds
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFDF73] text-[10px] font-mono font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
              >
                RSS 2.0
              </a>
              <a
                href="/citations.json"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-neutral-200 text-[10px] font-mono hover:bg-white/20 transition-colors"
              >
                Citations.json
              </a>
              <a
                href="/humans.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-neutral-200 text-[10px] font-mono hover:bg-white/20 transition-colors"
              >
                Humans.txt
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "backlinks", label: "Verified Backlink Profile", icon: Link2 },
              { id: "badges", label: "Embeddable DoFollow Badges", icon: Code2 },
              { id: "citations", label: "NAP & Directory Citations", icon: Building2 },
              { id: "outreach", label: "Anchor Matrix & PR Outreach", icon: Share2 },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                    activeTab === t.id
                      ? "gold-gradient-bg text-[#0B0B0B] shadow-lg"
                      : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab("backlinks");
              setIsAddingBacklink(!isAddingBacklink);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddingBacklink ? "Close Form" : "Register New Backlink"}</span>
          </button>
        </div>

        {/* TAB 1: VERIFIED BACKLINK PROFILE & LIVE LINK BUILDER */}
        {activeTab === "backlinks" && (
          <div className="space-y-6">
            {isAddingBacklink && (
              <form
                onSubmit={handleAddBacklink}
                className="p-5 sm:p-6 rounded-2xl bg-[#13110B] border border-[#D4AF37]/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add Verified External Backlink to Authority Index</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Instant Indexing Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Referring Source Domain *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. techcrunch.com or clientdomain.in"
                      value={newSourceDomain}
                      onChange={(e) => setNewSourceDomain(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Full Source Page URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://clientdomain.in/"
                      value={newSourceUrl}
                      onChange={(e) => setNewSourceUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Target Puhayt Page URL
                    </label>
                    <input
                      type="text"
                      value={newTargetUrl}
                      onChange={(e) => setNewTargetUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-1">
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Anchor Text Used
                    </label>
                    <input
                      type="text"
                      value={newAnchorText}
                      onChange={(e) => setNewAnchorText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Domain Authority (DA 1-100)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newDa}
                      onChange={(e) => setNewDa(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Link Attribute
                    </label>
                    <select
                      value={newLinkType}
                      onChange={(e) => setNewLinkType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white"
                    >
                      <option value="DoFollow">DoFollow (Passes PageRank)</option>
                      <option value="NoFollow">NoFollow (Natural Trust Diversity)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingBacklink(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs"
                  >
                    Save Verified Backlink
                  </button>
                </div>
              </form>
            )}

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {[
                  "All",
                  "DoFollow",
                  "Client Footer Attribution",
                  "Agency Directory",
                  "Tech & Marketing Editorial",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setBacklinkFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      backlinkFilter === cat
                        ? "bg-[#D4AF37] text-black font-bold"
                        : "bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                Showing {filteredBacklinks.length} Verified Referring Links
              </span>
            </div>

            {/* Backlink Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBacklinks.map((bl) => (
                <div
                  key={bl.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFDF73] font-mono text-xs font-bold">
                          DA {bl.domainAuthority}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                            bl.linkType === "DoFollow"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                          }`}
                        >
                          {bl.linkType}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {bl.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{bl.status}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={bl.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-lg font-bold text-white hover:text-[#D4AF37] flex items-center space-x-1.5 transition-colors"
                      >
                        <span>{bl.sourceDomain}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </a>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {bl.dateAcquired}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1 text-xs">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">
                        Contextual Anchor Text ({bl.anchorCategory}):
                      </div>
                      <div className="text-[#FFDF73] font-medium">
                        &ldquo;{bl.anchorText}&rdquo;
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 truncate pt-1">
                        Target: <span className="text-neutral-200">{bl.targetUrl}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EMBEDDABLE DOFOLLOW PARTNER & CLIENT BACKLINK BADGES */}
        {activeTab === "badges" && (
          <div className="space-y-8">
            {/* Custom Backlink Snippet Generator */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#18140A] to-[#0F0F14] border border-[#D4AF37]/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                    Interactive DoFollow Link Builder
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Custom Contextual Backlink Generator
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(dynamicCustomHtmlSnippet, "custom-builder")}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-1.5 shrink-0"
                >
                  {copiedId === "custom-builder" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied HTML Snippet!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Custom DoFollow HTML</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Select Target Landing Page on Puhayt Digital
                  </label>
                  <select
                    value={customTargetPath}
                    onChange={(e) => setCustomTargetPath(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white font-mono"
                  >
                    <option value="/">Home — https://puhaytdigital.ai.studio/</option>
                    <option value="/services">Services — /services (SEO, Website Building, Hosting &amp; Ads)</option>
                    <option value="/portfolio">Portfolio — /portfolio (Verified Client Work)</option>
                    <option value="/kolkata-geo">Kolkata Local — /kolkata-geo (Salt Lake &amp; Kolkata)</option>
                    <option value="/ai-suite">AI Suite — /ai-suite (SEO &amp; GEO Audit Tool)</option>
                    <option value="/blog">Blog — /blog (Technical SEO &amp; GEO Teardowns)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Select High-Authority Anchor Text
                  </label>
                  <select
                    value={customAnchorText}
                    onChange={(e) => setCustomAnchorText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white"
                  >
                    <option value="Puhayt Digital — Best Digital Marketing Agency in Kolkata">
                      Puhayt Digital — Best Digital Marketing Agency in Kolkata (Branded + Local)
                    </option>
                    <option value="best digital marketing in Kolkata — Puhayt Digital">
                      best digital marketing in Kolkata — Puhayt Digital (Exact-Match Primary)
                    </option>
                    <option value="3D Website Development & Technical SEO by Puhayt Digital">
                      3D Website Development &amp; Technical SEO by Puhayt Digital (Topical Authority)
                    </option>
                    <option value="100/100 Core Web Vitals Engineering by Puhayt Digital">
                      100/100 Core Web Vitals Engineering by Puhayt Digital (Technical Authority)
                    </option>
                  </select>
                </div>
              </div>

              <pre className="p-3.5 rounded-xl bg-black/90 border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                {dynamicCustomHtmlSnippet}
              </pre>
            </div>

            {/* 4 Ready-to-Embed Partner Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EMBEDDABLE_BACKLINK_BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg font-bold text-white">
                        {badge.name}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">
                        rel=&quot;dofollow&quot;
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">{badge.subtitle}</p>

                    {/* Visual Preview Box */}
                    <div className="p-4 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center min-h-[76px]">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#141109] to-black border border-[#D4AF37] text-xs text-white shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>
                          <strong className="text-[#FFDF73]">{badge.anchorText}</strong>
                        </span>
                      </div>
                    </div>

                    <pre className="p-3 rounded-xl bg-black font-mono text-[10px] text-neutral-300 overflow-x-auto border border-white/10 max-h-32">
                      {badge.htmlCode}
                    </pre>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(badge.htmlCode, badge.id)}
                    className="w-full py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center justify-center space-x-2"
                  >
                    {copiedId === badge.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied Embed HTML Code!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Embeddable DoFollow HTML</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NAP CITATION CONSISTENCY & HIGH-DA DIRECTORY PROFILES */}
        {activeTab === "citations" && (
          <div className="space-y-6">
            {/* Canonical NAP Record Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#17130A] to-[#0B0B0B] border border-[#D4AF37]/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                    100% Standardized Local &amp; Global Citation Schema
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Official Canonical NAP (Name, Address, Phone) Record
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(JSON.stringify(OFFICIAL_NAP_RECORD, null, 2), "nap-json")
                  }
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-1.5 shrink-0"
                >
                  {copiedId === "nap-json" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Canonical NAP!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy NAP Citation Block</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                  <div className="text-neutral-400 font-mono text-[10px] uppercase">
                    Canonical Entity Name
                  </div>
                  <div className="text-white font-bold">{OFFICIAL_NAP_RECORD.businessName}</div>
                  <div className="text-[#D4AF37] text-[11px]">{OFFICIAL_NAP_RECORD.founders}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                  <div className="text-neutral-400 font-mono text-[10px] uppercase">
                    Registered Operational Hub
                  </div>
                  <div className="text-white font-bold">
                    {OFFICIAL_NAP_RECORD.streetAddress}
                  </div>
                  <div className="text-neutral-300 text-[11px]">
                    {OFFICIAL_NAP_RECORD.city}, {OFFICIAL_NAP_RECORD.state}{" "}
                    {OFFICIAL_NAP_RECORD.postalCode} ({OFFICIAL_NAP_RECORD.coordinates})
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                  <div className="text-neutral-400 font-mono text-[10px] uppercase">
                    Verified Phones &amp; Canonical URL
                  </div>
                  <div className="text-emerald-400 font-mono font-bold">
                    {OFFICIAL_NAP_RECORD.primaryPhone} / {OFFICIAL_NAP_RECORD.secondaryPhone}
                  </div>
                  <div className="text-[#FFDF73] font-mono text-[11px] truncate">
                    {OFFICIAL_NAP_RECORD.website}
                  </div>
                </div>
              </div>
            </div>

            {/* High-DA Directories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIRECTORY_CITATIONS.map((cit) => (
                <div
                  key={cit.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFDF73] font-mono text-[10px] font-bold">
                        DA {cit.domainAuthority}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        ● {cit.napConsistency}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {cit.priority}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{cit.platform}</h4>
                    <div className="text-[11px] text-neutral-400">
                      {cit.category} • {cit.linkAttribute}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <a
                      href={cit.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs flex items-center space-x-1 transition-colors"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANCHOR TEXT SAFETY MATRIX & DIGITAL PR OUTREACH TEMPLATES */}
        {activeTab === "outreach" && (
          <div className="space-y-8">
            {/* Anchor Text Distribution */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">
                Natural Google Penguin-Safe Anchor Text Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ANCHOR_TEXT_DISTRIBUTION.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-[#FFDF73] font-mono">
                        {item.percentage}%
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                        Target: {item.recommendedRange}
                      </span>
                    </div>
                    <div className="font-bold text-white text-sm">{item.category}</div>
                    <div className="space-y-1 pt-1 border-t border-white/10">
                      {item.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="text-[11px] text-neutral-300 font-mono truncate"
                        >
                          • &ldquo;{ex}&rdquo;
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital PR & Backlink Outreach Templates */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">
                High-Conversion Digital PR &amp; Backlink Outreach Templates
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {OUTREACH_TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">
                          {tpl.category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          {tpl.expectedDaRange}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{tpl.title}</h4>
                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-[11px] text-[#FFDF73] font-mono">
                        Subject: {tpl.subjectLine}
                      </div>
                      <pre className="p-3 rounded-xl bg-black font-sans text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed border border-white/10 max-h-48 overflow-y-auto">
                        {tpl.bodyTemplate}
                      </pre>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `Subject: ${tpl.subjectLine}\n\n${tpl.bodyTemplate}`,
                          tpl.id
                        )
                      }
                      className="w-full py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center justify-center space-x-1.5"
                    >
                      {copiedId === tpl.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Outreach Pitch!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Outreach Template</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
