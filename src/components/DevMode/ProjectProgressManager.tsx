import React, { useState } from "react";
import { useAgency } from "../../context/AgencyContext";
import { ClientProject, ClientMilestone } from "../../types";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  Sparkles,
  User,
  Building,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Check
} from "lucide-react";

export const ProjectProgressManager: React.FC = () => {
  const { clientProjects, addOrUpdateClientProject, isCloudSyncing } = useAgency();

  // Active project being edited (defaults to the first project or creates a standard one)
  const currentProject: ClientProject = clientProjects[0] || {
    id: "proj-enterprise-main",
    userId: "vip-client",
    userEmail: "aayushcps0907@gmail.com",
    company: "Puhayt Enterprise Client",
    projectName: "Ultra-Luxury Bespoke Web & AI Engine",
    currentPhase: "Phase 3: Full-Stack Engineering & Lead Funnels",
    progressPercent: 75,
    targetCompletionDate: "Oct 24, 2026",
    assignedManager: {
      name: "Alexander Vance",
      role: "Senior Growth Director",
      email: "alexander@puhayt.digital",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    milestones: [
      {
        id: "ms-1",
        title: "Discovery, Brand Architecture & Technical Specification",
        phase: "Phase 1: Architecture",
        status: "Completed",
        dueDate: "Sept 12, 2026",
        notes: "High-level architecture, user flow, and luxury dark color palette approved.",
      },
      {
        id: "ms-2",
        title: "Interactive 3D WebGL Monogram & Luxury Design System",
        phase: "Phase 2: UI/UX Engineering",
        status: "Completed",
        dueDate: "Sept 20, 2026",
        notes: "Shader animations, responsive typography, and mobile bottom dock complete.",
      },
      {
        id: "ms-3",
        title: "Full-Stack Express Backend Proxy & Client Dashboard",
        phase: "Phase 3: Development",
        status: "In Progress",
        dueDate: "Oct 10, 2026",
        notes: "Firestore client portal telemetry and secure authenticated routes.",
      },
      {
        id: "ms-4",
        title: "Core Web Vitals 99+, Custom Domain SSL & Global CDN Go-Live",
        phase: "Phase 4: Launch",
        status: "Upcoming",
        dueDate: "Oct 24, 2026",
        notes: "Edge caching, multi-region Cloud Run verification, and Search Console indexation.",
      },
    ],
    updatedAt: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<ClientProject>(currentProject);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMilestone, setNewMilestone] = useState<Partial<ClientMilestone>>({
    title: "",
    phase: "Phase 3: Development",
    status: "Upcoming",
    dueDate: "Nov 2026",
    notes: "",
  });

  const handleSaveToCloud = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updated = {
      ...formData,
      progressPercent: Math.min(100, Math.max(0, Number(formData.progressPercent))),
      updatedAt: new Date().toISOString(),
    };
    await addOrUpdateClientProject(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleUpdateMilestoneStatus = (index: number, status: "Completed" | "In Progress" | "Upcoming") => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], status };
    
    // Auto-calculate progress percentage based on completed milestones
    const completedCount = updatedMilestones.filter((m) => m.status === "Completed").length;
    const inProgressCount = updatedMilestones.filter((m) => m.status === "In Progress").length;
    const autoProgress = Math.round(
      ((completedCount + inProgressCount * 0.5) / updatedMilestones.length) * 100
    );

    setFormData((prev) => ({
      ...prev,
      progressPercent: autoProgress,
      milestones: updatedMilestones,
    }));
  };

  const handleDeleteMilestone = (index: number) => {
    const updated = formData.milestones.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.title) return;
    const item: ClientMilestone = {
      id: `ms-${Date.now()}`,
      title: newMilestone.title,
      phase: newMilestone.phase || "Phase 3: Development",
      status: (newMilestone.status as any) || "Upcoming",
      dueDate: newMilestone.dueDate || "Nov 2026",
      notes: newMilestone.notes || "Sprint deliverable scheduled by engineering team.",
    };
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, item],
    }));
    setIsAddingMilestone(false);
    setNewMilestone({
      title: "",
      phase: "Phase 3: Development",
      status: "Upcoming",
      dueDate: "Nov 2026",
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Save to Cloud Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold text-[#FFDF73] uppercase tracking-wider">
              Real Project Progress
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2 mt-0.5">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Client Project Progress &amp; Sprints</span>
          </h3>
          <p className="text-neutral-400 text-xs font-light mt-0.5">
            Update actual project progress, active phases, and real milestone sprint status. Persists instantly to Cloud Firestore!
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>Saved Live in Cloud!</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSaveToCloud()}
            disabled={isCloudSyncing}
            className="px-4 py-2 rounded-full font-bold text-xs text-[#0B0B0B] gold-gradient-bg flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isCloudSyncing ? "Saving to Cloud..." : "Save to Cloud Live"}</span>
          </button>
        </div>
      </div>

      {/* Progress Editor Card */}
      <div className="bg-[#120F0C] p-5 rounded-2xl border border-[#D4AF37]/30 space-y-4">
        <h4 className="text-xs font-bold text-[#FFDF73] uppercase tracking-wider flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Project Details</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Project Name</label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Client Company / Brand</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Target Completion Date</label>
            <input
              type="text"
              value={formData.targetCompletionDate}
              onChange={(e) => setFormData({ ...formData, targetCompletionDate: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Current Active Phase</label>
            <input
              type="text"
              value={formData.currentPhase}
              onChange={(e) => setFormData({ ...formData, currentPhase: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
              Overall Progress Completion ({formData.progressPercent}%)
            </label>
            <div className="flex items-center space-x-3 pt-1">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progressPercent}
                onChange={(e) => setFormData({ ...formData, progressPercent: Number(e.target.value) })}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <span className="text-sm font-mono font-bold text-[#FFDF73] min-w-[40px] text-right">
                {formData.progressPercent}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Assigned Growth Director</label>
            <input
              type="text"
              value={formData.assignedManager?.name || "Alexander Vance"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedManager: {
                    ...formData.assignedManager!,
                    name: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="bg-[#120F0C] p-5 rounded-2xl border border-[#D4AF37]/30 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#FFDF73] uppercase tracking-wider flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Sprint Milestones ({formData.milestones.length})</span>
          </h4>
          <button
            type="button"
            onClick={() => setIsAddingMilestone(!isAddingMilestone)}
            className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-[#FFDF73] border border-[#D4AF37]/30 flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAddingMilestone ? "Cancel" : "Add Milestone"}</span>
          </button>
        </div>

        {/* Add Milestone Form */}
        {isAddingMilestone && (
          <form onSubmit={handleAddMilestone} className="p-4 rounded-xl bg-black/60 border border-[#D4AF37]/40 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-neutral-300 mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Core Web Vitals Optimization"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-300 mb-1">Phase</label>
                <input
                  type="text"
                  placeholder="Phase 4: Launch"
                  value={newMilestone.phase}
                  onChange={(e) => setNewMilestone({ ...newMilestone, phase: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-300 mb-1">Due Date</label>
                <input
                  type="text"
                  placeholder="Oct 28, 2026"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-neutral-300 mb-1">Notes / Deliverables</label>
              <input
                type="text"
                placeholder="High-level description of what is delivered in this milestone"
                value={newMilestone.notes}
                onChange={(e) => setNewMilestone({ ...newMilestone, notes: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg gold-gradient-bg text-black font-bold text-xs shadow-md"
            >
              Add to Sprint
            </button>
          </form>
        )}

        {/* Milestone Cards */}
        <div className="space-y-2.5">
          {formData.milestones.map((m, idx) => (
            <div
              key={m.id || idx}
              className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37]">{m.phase}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-[10px] text-neutral-400">Due: {m.dueDate}</span>
                </div>
                <div className="font-bold text-white text-sm">{m.title}</div>
                <div className="text-[11px] text-neutral-400">{m.notes}</div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                {/* Status Switcher Chips */}
                <button
                  type="button"
                  onClick={() => handleUpdateMilestoneStatus(idx, "Completed")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    m.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                      : "bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  Completed
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateMilestoneStatus(idx, "In Progress")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    m.status === "In Progress"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                      : "bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateMilestoneStatus(idx, "Upcoming")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    m.status === "Upcoming"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                      : "bg-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  Upcoming
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteMilestone(idx)}
                  className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                  title="Delete Milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
