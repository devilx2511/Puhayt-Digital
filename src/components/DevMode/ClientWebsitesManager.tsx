import React, { useState } from "react";
import { useAgency } from "../../context/AgencyContext";
import { ClientWebsite } from "../../types";
import {
  Globe,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Save,
  X,
  User,
  Crown
} from "lucide-react";

export const ClientWebsitesManager: React.FC = () => {
  const { clientWebsites, addOrUpdateClientWebsite, deleteClientWebsite, leads, transactions } = useAgency();

  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [editingWebsiteId, setEditingWebsiteId] = useState<string | null>(null);

  // Form State
  const [userEmail, setUserEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [liveUrl, setLiveUrl] = useState("https://");
  const [previewUrl, setPreviewUrl] = useState("");
  const [planName, setPlanName] = useState("Enterprise Luxury Plan");
  const [subscriptionStatus, setSubscriptionStatus] = useState<"Active" | "VIP" | "Trial" | "Expired">("Active");
  const [deploymentStatus, setDeploymentStatus] = useState<"Live" | "Staging" | "Deploying" | "Maintenance">("Live");
  const [techStackInput, setTechStackInput] = useState("React 19, Tailwind CSS, Cloudflare Edge, Stripe");
  const [credentialsNote, setCredentialsNote] = useState("CMS and administrative credentials sent to verified email.");

  const resetForm = () => {
    setUserEmail("");
    setClientName("");
    setWebsiteName("");
    setLiveUrl("https://");
    setPreviewUrl("");
    setPlanName("Enterprise Luxury Plan");
    setSubscriptionStatus("Active");
    setDeploymentStatus("Live");
    setTechStackInput("React 19, Tailwind CSS, Cloudflare Edge, Stripe");
    setCredentialsNote("CMS and administrative credentials sent to verified email.");
    setIsAddingWebsite(false);
    setEditingWebsiteId(null);
  };

  const handleStartEdit = (site: ClientWebsite) => {
    setEditingWebsiteId(site.id);
    setUserEmail(site.userEmail);
    setClientName(site.clientName);
    setWebsiteName(site.websiteName);
    setLiveUrl(site.liveUrl);
    setPreviewUrl(site.previewUrl || "");
    setPlanName(site.planName);
    setSubscriptionStatus(site.subscriptionStatus);
    setDeploymentStatus(site.deploymentStatus);
    setTechStackInput(site.techStack.join(", "));
    setCredentialsNote(site.credentialsNote || "");
    setIsAddingWebsite(true);
  };

  const handleSaveWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim() || !websiteName.trim() || !liveUrl.trim()) return;

    const parsedTech = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const site: ClientWebsite = {
      id: editingWebsiteId || `site-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userEmail: userEmail.trim().toLowerCase(),
      clientName: clientName.trim() || "Subscribed Client",
      websiteName: websiteName.trim(),
      liveUrl: liveUrl.trim(),
      previewUrl: previewUrl.trim() || liveUrl.trim(),
      planName,
      subscriptionStatus,
      deploymentStatus,
      techStack: parsedTech.length > 0 ? parsedTech : ["React", "Tailwind CSS"],
      credentialsNote: credentialsNote.trim(),
      deliveryDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addOrUpdateClientWebsite(site);
    resetForm();
  };

  // Quick email suggestions from leads or transactions
  const knownEmails = Array.from(
    new Set([
      ...leads.map((l) => l.email.toLowerCase()),
      ...transactions.map((t) => t.clientEmail.toLowerCase()),
      "aayushcps0907@gmail.com",
    ])
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 glass-card rounded-2xl border border-white/10 bg-gradient-to-r from-[#17120B] to-black">
        <div>
          <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-[10px] font-bold uppercase">
            <Crown className="w-3.5 h-3.5" />
            <span>DevMode Subscribed Client Handoff</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
            Assigned Websites for Subscribed Users
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Websites added here are exclusively sent to the specified subscribed user email and appear in their private dashboard under the "Websites" section.
          </p>
        </div>

        <button
          onClick={() => {
            if (isAddingWebsite) resetForm();
            else setIsAddingWebsite(true);
          }}
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-1.5 shrink-0 hover:scale-105 transition-transform"
        >
          {isAddingWebsite ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isAddingWebsite ? "Cancel" : "Assign New Website"}</span>
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {isAddingWebsite && (
        <form onSubmit={handleSaveWebsite} className="glass-card p-5 rounded-2xl border border-[#D4AF37]/50 bg-black/60 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="text-xs font-bold text-[#FFDF73] uppercase tracking-wider font-mono flex items-center space-x-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <span>{editingWebsiteId ? "Edit Assigned Website" : "Assign Website to Subscribed Client"}</span>
            </h4>
            <span className="text-[10px] text-neutral-400 font-mono">Real-time Firestore Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Target Client Email */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Subscribed Client Email *</label>
              <input
                type="email"
                required
                placeholder="client@company.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
              {knownEmails.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] text-neutral-500">Suggested:</span>
                  {knownEmails.slice(0, 3).map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setUserEmail(em)}
                      className="text-[10px] text-[#FFDF73] hover:underline font-mono"
                    >
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Name */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Client Contact Name</label>
              <input
                type="text"
                placeholder="Alexander Vance / Brand Manager"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Website Name */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Website Brand Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aura Luxe Headless E-Commerce"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Plan Name */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Subscription Plan Tier</label>
              <select
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Growth Plan" className="bg-black">Growth Plan (₹10,000/mo)</option>
                <option value="Enterprise Luxury Plan" className="bg-black">Enterprise Luxury Plan (₹25,000/mo)</option>
                <option value="Custom Engine VIP" className="bg-black">Custom Engine VIP (₹50,000/mo)</option>
                <option value="Bespoke Contract" className="bg-black">Bespoke Contract</option>
              </select>
            </div>

            {/* Live URL */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Live Website URL *</label>
              <input
                type="url"
                required
                placeholder="https://client-brand.puhayt.digital"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37] font-mono text-[11px]"
              />
            </div>

            {/* Preview URL */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Preview / Staging URL (Optional)</label>
              <input
                type="url"
                placeholder="https://staging.client-brand.com"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37] font-mono text-[11px]"
              />
            </div>

            {/* Subscription Status */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Subscription Status</label>
              <select
                value={subscriptionStatus}
                onChange={(e) => setSubscriptionStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Active" className="bg-black">Active</option>
                <option value="VIP" className="bg-black">VIP</option>
                <option value="Trial" className="bg-black">Trial</option>
                <option value="Expired" className="bg-black">Expired</option>
              </select>
            </div>

            {/* Deployment Status */}
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Deployment Status</label>
              <select
                value={deploymentStatus}
                onChange={(e) => setDeploymentStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Live" className="bg-black">Live on Production</option>
                <option value="Staging" className="bg-black">Staging Review</option>
                <option value="Deploying" className="bg-black">Deploying (Sprint In Progress)</option>
                <option value="Maintenance" className="bg-black">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-1 text-xs">
            <label className="text-neutral-300 font-medium">Technologies (Comma separated)</label>
            <input
              type="text"
              placeholder="React 19, Tailwind CSS, Cloudflare Edge, Stripe, Headless CMS"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Credentials / Handoff Notes */}
          <div className="space-y-1 text-xs">
            <label className="text-neutral-300 font-medium">Credentials &amp; Access Notes for Client</label>
            <textarea
              rows={2}
              placeholder="e.g. CMS login at /admin with provisioned agency token. SSL auto-renewed."
              value={credentialsNote}
              onChange={(e) => setCredentialsNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 gold-gradient-bg text-black font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{editingWebsiteId ? "Update Website" : "Save & Assign Website"}</span>
            </button>
          </div>
        </form>
      )}

      {/* CURRENT ASSIGNED WEBSITES LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>Active Client Websites in Firestore ({clientWebsites.length})</span>
          <span className="font-mono text-[10px]">Collection: /client_websites</span>
        </div>

        {clientWebsites.length === 0 ? (
          <div className="p-8 text-center glass-card rounded-2xl border border-white/10 text-neutral-400 text-xs">
            No client websites assigned yet. Click "Assign New Website" above to send a website to a subscribed client email.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clientWebsites.map((site) => (
              <div
                key={site.id}
                className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all bg-black/40 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-white text-sm">{site.websiteName}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#FFDF73] font-mono font-bold">
                          {site.subscriptionStatus}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#D4AF37] font-mono mt-0.5">
                        Assigned To: <strong className="text-white">{site.userEmail}</strong>
                      </div>
                    </div>

                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
                      {site.deploymentStatus}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-400 font-mono truncate">
                    Live URL: <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">{site.liveUrl}</a>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {site.techStack.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {site.credentialsNote && (
                    <p className="text-[10px] text-neutral-400 bg-white/[0.02] p-2 rounded-lg font-mono">
                      {site.credentialsNote}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs">
                  <span className="text-[10px] text-neutral-500 font-mono">Added: {site.deliveryDate || "Recent"}</span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleStartEdit(site)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
                      title="Edit Website"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteClientWebsite(site.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                      title="Delete Website"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
