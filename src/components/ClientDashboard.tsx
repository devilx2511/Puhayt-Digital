import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAgency } from "../context/AgencyContext";
import { BrandLogo } from "./BrandLogo";
import { ClientWebsite, ClientMilestone, ClientInvoice, ClientChatMessage } from "../types";
import {
  ShieldCheck,
  Lock,
  LogIn,
  LogOut,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Download,
  ExternalLink,
  Globe,
  Send,
  MessageSquare,
  Layers,
  ChevronRight,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Check,
  Crown,
  FileText,
  User,
  Zap,
  ArrowUpRight
} from "lucide-react";

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    userProfile,
    openAuthModal,
    logout,
    clientWebsites,
    clientProjects,
    clientChatMessages,
    clientInvoices,
    transactions,
    sendClientChatMessage,
    openPaymentModal
  } = useAgency();

  const [activeTab, setActiveTab] = useState<"progress" | "milestones" | "invoices" | "websites" | "chat">("progress");
  const [chatInput, setChatInput] = useState("");
  const [previewWebsite, setPreviewWebsite] = useState<ClientWebsite | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null);

  // Authenticated user's specific project or fallback to active project
  const userEmail = currentUser?.email?.toLowerCase() || "";

  const activeProject = useMemo(() => {
    if (!currentUser) return null;
    const found = clientProjects.find(
      (p) => p.userEmail.toLowerCase() === userEmail || p.userId === currentUser.uid
    );
    return found || clientProjects[0] || null;
  }, [clientProjects, currentUser, userEmail]);

  // Websites sent from DevMode specifically matching this user's email or VIP role
  const userWebsites = useMemo(() => {
    if (!currentUser) return [];
    return clientWebsites.filter(
      (w) =>
        w.userEmail.toLowerCase() === userEmail ||
        (userProfile?.role === "vip" && w.subscriptionStatus === "VIP") ||
        (userProfile?.role === "admin")
    );
  }, [clientWebsites, currentUser, userEmail, userProfile]);

  const isUserSubscribed = useMemo(() => {
    if (!currentUser) return false;
    if (userProfile?.role === "vip" || userProfile?.role === "admin") return true;
    if (userWebsites.length > 0) return true;
    // Check if user has any completed transaction
    const hasPaidTxn = transactions.some(
      (t) => (t.clientEmail?.toLowerCase() === userEmail) && t.status === "Success"
    );
    return hasPaidTxn;
  }, [currentUser, userProfile, userWebsites, transactions, userEmail]);

  // Authenticated user's specific invoices + payment transactions
  const userInvoices = useMemo(() => {
    if (!currentUser) return [];
    const directInvoices = clientInvoices.filter(
      (i) => i.userEmail.toLowerCase() === userEmail || !i.userEmail
    );
    return directInvoices;
  }, [clientInvoices, currentUser, userEmail]);

  // User chat thread with DevMode
  const userChatThread = useMemo(() => {
    if (!currentUser) return [];
    return clientChatMessages.filter(
      (m) =>
        m.senderEmail.toLowerCase() === userEmail ||
        m.senderId === currentUser.uid ||
        (m.isFromDevMode && (!m.recipientEmail || m.recipientEmail.toLowerCase() === userEmail))
    );
  }, [clientChatMessages, currentUser, userEmail]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentUser) return;

    const messageText = chatInput.trim();
    setChatInput("");

    await sendClientChatMessage({
      senderId: currentUser.uid,
      senderName: userProfile?.displayName || currentUser.displayName || currentUser.email?.split("@")[0] || "Client",
      senderEmail: currentUser.email || "client@puhayt.digital",
      recipientEmail: "devmode@puhayt.digital",
      isFromDevMode: false,
      message: messageText,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      {/* Container Card */}
      <div className="glass-card bg-[#0A0A0A]/95 border border-[#D4AF37]/40 w-full max-w-6xl max-h-[94vh] rounded-3xl flex flex-col shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden relative">
        
        {/* TOP BAR */}
        <div className="px-5 py-3.5 border-b border-white/10 bg-black/70 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <BrandLogo size="md" />
            <div className="flex items-center space-x-2 pl-3 border-l border-white/10">
              <span className="text-[10px] bg-[#D4AF37]/20 text-[#FFDF73] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider flex items-center space-x-1">
                <Crown className="w-3 h-3 text-[#D4AF37]" />
                <span>Private Client Portal</span>
              </span>
              <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">
                Puhayt Cloud Engine
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {currentUser ? (
              <button
                onClick={() => logout()}
                className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 rounded-xl flex items-center space-x-1.5 transition-colors font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            ) : null}

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATE BARRIER */}
        {!currentUser ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto space-y-6 my-auto">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl glass-card-gold flex items-center justify-center mx-auto text-[#D4AF37] border border-[#D4AF37]/50 shadow-2xl">
                <Lock className="w-9 h-9" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500/20 border border-red-500 text-red-400 flex items-center justify-center text-[10px] font-bold">
                !
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                Zero-Trust Protected Area
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Client Authentication Required
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                Sign in with your verified client Google account or agency credentials to access your real-time project progress, milestone sprint telemetry, invoice history, assigned websites, and direct DevMode engineering chat.
              </p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <button
                onClick={() => openAuthModal("google")}
                className="w-full py-3.5 rounded-full font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In With Google / Account</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-full text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all font-medium"
              >
                Back to Public Agency Site
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-center space-x-4 text-[11px] text-neutral-500 font-mono">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-bit Encrypted</span>
              </span>
              <span>•</span>
              <span>Firestore Sync</span>
              <span>•</span>
              <span>DevMode Guard</span>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED CLIENT DASHBOARD */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* USER PROFILE INFO BANNER */}
            <div className="px-6 py-3 bg-[#110E09] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FFDF73] via-[#D4AF37] to-[#8C6B1F] text-black font-bold flex items-center justify-center text-sm shadow-md border border-[#FFDF73]/50">
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      (userProfile?.displayName || currentUser.email || "C").charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">
                      {userProfile?.displayName || currentUser.displayName || currentUser.email?.split("@")[0] || "Client Member"}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#FFDF73] font-bold border border-[#D4AF37]/30 uppercase">
                      {isUserSubscribed ? "Subscribed Client" : "Standard Client"}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono flex items-center space-x-2">
                    <span>{currentUser.email}</span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Session</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Status Pill */}
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
                  <span className="text-neutral-400 text-[11px]">Sprint Phase:</span>
                  <span className="text-[#FFDF73] font-bold text-xs font-mono">
                    {activeProject?.currentPhase.split(":")[0] || "Active Sprint"}
                  </span>
                </div>
              </div>
            </div>

            {/* TAB NAVIGATION */}
            <div className="px-6 py-2 border-b border-white/10 bg-black/40 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => setActiveTab("progress")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "progress"
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Project Progress ({activeProject?.progressPercent || 80}%)</span>
              </button>

              <button
                onClick={() => setActiveTab("milestones")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "milestones"
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Upcoming Milestones ({activeProject?.milestones.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab("invoices")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "invoices"
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Invoice History ({userInvoices.length + transactions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("websites")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "websites"
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="flex items-center space-x-1.5">
                  <span>Websites</span>
                  {userWebsites.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                      {userWebsites.length}
                    </span>
                  )}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "chat"
                    ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span className="flex items-center space-x-1.5">
                  <span>DevMode Chat</span>
                  {userChatThread.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37]/30 text-[#FFDF73] text-[10px] font-mono">
                      {userChatThread.length}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

              {/* 1. PROJECT PROGRESS */}
              {activeTab === "progress" && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Hero Project Banner */}
                  <div className="glass-card p-6 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#181208] via-[#0E0B07] to-[#0A0A0A] space-y-5 relative overflow-hidden shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Active Engineering Contract</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                          {activeProject?.projectName || "Ultra-Luxury Bespoke Web & AI Engine"}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1">
                          Company: <strong className="text-neutral-200">{activeProject?.company || "Puhayt Client Enterprise"}</strong> • Target Completion: <strong className="text-[#FFDF73]">{activeProject?.targetCompletionDate || "Oct 2026"}</strong>
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 shrink-0">
                        <div>
                          <div className="text-[10px] text-neutral-400 font-mono uppercase">Completion</div>
                          <div className="text-xl font-bold text-[#FFDF73] font-mono">
                            {activeProject?.progressPercent || 82}%
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#D4AF37]/10 text-xs font-mono font-bold text-white">
                          S3
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar with Glow */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-300 font-medium">{activeProject?.currentPhase}</span>
                        <span className="text-[#FFDF73] font-mono font-bold">{activeProject?.progressPercent || 82}% Complete</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeProject?.progressPercent || 82}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-[#8C6B1F] via-[#D4AF37] to-[#FFDF73] shadow-[0_0_15px_#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Assigned Manager Card */}
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-3">
                        <img
                          src={activeProject?.assignedManager?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                          alt="Manager"
                          className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">
                            {activeProject?.assignedManager?.name || "Alexander Vance"}
                          </div>
                          <div className="text-[#D4AF37] text-[11px]">
                            {activeProject?.assignedManager?.role || "Senior Growth Director"} • {activeProject?.assignedManager?.email || "alexander@puhayt.digital"}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab("chat")}
                        className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-1.5 hover:scale-105 transition-transform"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat With DevMode</span>
                      </button>
                    </div>
                  </div>

                  {/* 4-KPI Telemetry Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="glass-card p-4 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">Page Speed Index</span>
                      <div className="font-serif text-2xl font-bold text-emerald-400 mt-1">99/100</div>
                      <div className="text-[10px] text-emerald-300 font-medium mt-1">Core Web Vitals Pass</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">Current Phase</span>
                      <div className="font-serif text-lg font-bold text-white mt-1">Stage 3</div>
                      <div className="text-[10px] text-[#FFDF73] font-medium mt-1">API &amp; UI Integration</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">Assigned Websites</span>
                      <div className="font-serif text-2xl font-bold gold-gradient-text mt-1">{userWebsites.length} Active</div>
                      <div className="text-[10px] text-neutral-400 font-medium mt-1">Live in Website Section</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">Security Tier</span>
                      <div className="font-serif text-xl font-bold text-emerald-400 mt-1">Enterprise</div>
                      <div className="text-[10px] text-neutral-400 font-medium mt-1">Zero-Trust Protected</div>
                    </div>
                  </div>

                  {/* Active Sprints List */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Sprint Deliverables &amp; Roadmap
                      </h4>
                      <button
                        onClick={() => setActiveTab("milestones")}
                        className="text-xs text-[#FFDF73] hover:text-white flex items-center space-x-1"
                      >
                        <span>View All Milestones</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {activeProject?.milestones.slice(0, 3).map((ms) => (
                        <div key={ms.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2.5">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${ms.status === "Completed" ? "text-emerald-400" : "text-amber-400"}`} />
                            <div>
                              <div className="text-white font-medium">{ms.title}</div>
                              <div className="text-[10px] text-neutral-400">{ms.phase} • Due: {ms.dueDate}</div>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            ms.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}>
                            {ms.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* 2. UPCOMING MILESTONES */}
              {activeTab === "milestones" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white">Upcoming Milestones &amp; Sprints</h3>
                      <p className="text-xs text-neutral-400">Detailed deliverables, due dates, and technical acceptance milestones.</p>
                    </div>
                    <span className="text-xs font-mono bg-white/5 px-2.5 py-1 rounded-full text-[#FFDF73] border border-white/10">
                      {activeProject?.milestones.length || 0} Total Milestones
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeProject?.milestones.map((ms, index) => (
                      <div
                        key={ms.id}
                        className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all bg-black/40 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start space-x-3">
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-mono mt-0.5 ${
                              ms.status === "Completed"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : ms.status === "In Progress"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "bg-white/5 text-neutral-400 border border-white/10"
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white flex items-center space-x-2">
                                <span>{ms.title}</span>
                              </div>
                              <div className="text-xs text-neutral-400 mt-0.5">
                                {ms.phase} • Target Delivery: <strong className="text-neutral-200">{ms.dueDate}</strong>
                              </div>
                            </div>
                          </div>

                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                            ms.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : ms.status === "In Progress"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-white/10 text-neutral-400 border border-white/10"
                          }`}>
                            {ms.status}
                          </span>
                        </div>

                        {ms.notes && (
                          <div className="text-[11px] text-neutral-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                            {ms.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. INVOICE HISTORY */}
              {activeTab === "invoices" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white">Invoice History &amp; Verified Receipts</h3>
                      <p className="text-xs text-neutral-400">All contract billings, verified UPI / Card payments, and NPCI audit receipts.</p>
                    </div>
                  </div>

                  {userInvoices.length === 0 && transactions.length === 0 ? (
                    <div className="glass-card p-8 rounded-2xl border border-white/10 text-center space-y-3">
                      <CreditCard className="w-10 h-10 text-[#D4AF37] mx-auto opacity-50" />
                      <p className="text-sm text-neutral-200 font-semibold">No Invoices Recorded Yet</p>
                      <p className="text-xs text-neutral-500 max-w-md mx-auto">
                        Invoices generated for your development sprints or payments made via the Payment Modal will appear here automatically with downloadable receipts.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Standard Invoices */}
                      {userInvoices.map((inv) => (
                        <div
                          key={inv.id}
                          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/40"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white flex items-center space-x-2">
                                <span>{inv.invoiceNo}</span>
                                <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-mono font-bold">
                                  {inv.planName}
                                </span>
                              </div>
                              <div className="text-xs text-neutral-400 font-mono mt-0.5">
                                Issued: {inv.date} {inv.dueDate ? `• Due: ${inv.dueDate}` : ""} {inv.paymentMethod ? `• ${inv.paymentMethod}` : ""}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
                            <div className="text-right">
                              <div className="text-base font-bold text-emerald-400 font-mono">
                                ₹{inv.amount.toLocaleString("en-IN")}
                              </div>
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold">
                                {inv.status}
                              </span>
                            </div>

                            <button
                              onClick={() => setSelectedInvoice(inv)}
                              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center space-x-1.5 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>View Receipt</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Real-time Transactions from App Store/UPI */}
                      {transactions.map((txn) => (
                        <div
                          key={txn.id}
                          className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-[#0C1A10]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white flex items-center space-x-2">
                                <span>{txn.planName}</span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                                  Ref: {txn.referenceId}
                                </span>
                              </div>
                              <div className="text-xs text-neutral-400 font-mono mt-0.5">
                                {txn.date} • Method: {txn.paymentMethod} ({txn.bankUsed || txn.upiAppUsed || "Instant"})
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-base font-bold text-emerald-400 font-mono">
                              ₹{txn.amount.toLocaleString("en-IN")}
                            </div>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono font-bold">
                              VERIFIED NPCI TOKEN
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4. WEBSITES (SENT FROM DEVMODE TO SUBSCRIBED USERS) */}
              {activeTab === "websites" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-[#D4AF37]" />
                        <span>Assigned Client Websites</span>
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Websites engineered, hosted, and assigned from DevMode to your subscribed account.
                      </p>
                    </div>

                    <span className="text-xs font-mono bg-white/5 px-2.5 py-1 rounded-full text-emerald-400 border border-emerald-500/30">
                      {userWebsites.length} Active Deployments
                    </span>
                  </div>

                  {userWebsites.length === 0 ? (
                    /* Locked / Not yet subscribed or assigned callout */
                    <div className="glass-card p-8 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#14100A] to-[#0A0A0A] text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
                      <div className="w-16 h-16 rounded-2xl glass-card-gold flex items-center justify-center mx-auto text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl">
                        <Globe className="w-8 h-8" />
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase">
                          Subscribed &amp; Paid User Access Only
                        </span>
                        <h4 className="font-serif text-xl font-bold text-white">
                          No Custom Website Assigned Yet
                        </h4>
                        <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                          Your custom web deployment, staging link, and CMS credentials are provisioned directly from DevMode once your subscription tier is activated.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          onClick={() => openPaymentModal()}
                          className="px-5 py-2.5 rounded-full gold-gradient-bg text-black font-bold text-xs shadow-lg hover:scale-105 transition-transform"
                        >
                          View Subscription Pricing Plans
                        </button>

                        <button
                          onClick={() => setActiveTab("chat")}
                          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
                        >
                          Request Website in DevMode Chat
                        </button>
                      </div>

                      <div className="text-[10px] text-neutral-500 font-mono pt-2 border-t border-white/5">
                        DevMode administrators can assign your live URL via DevMode &gt; Subscriptions &gt; Assign Website.
                      </div>
                    </div>
                  ) : (
                    /* Active Assigned Websites Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userWebsites.map((site) => (
                        <div
                          key={site.id}
                          className="glass-card p-5 rounded-3xl border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all bg-black/50 space-y-4 shadow-xl flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 uppercase">
                                  {site.subscriptionStatus} Subscription
                                </span>
                                <h4 className="text-base font-bold text-white mt-1.5">{site.websiteName}</h4>
                                <div className="text-xs text-[#FFDF73] font-mono">{site.planName}</div>
                              </div>

                              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono font-bold">
                                {site.deploymentStatus}
                              </span>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {site.techStack.map((tech, i) => (
                                <span key={i} className="text-[10px] bg-white/5 text-neutral-300 px-2 py-0.5 rounded-md border border-white/5">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Credentials / Notes */}
                            {site.credentialsNote && (
                              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 text-xs text-neutral-300 font-mono">
                                <span className="text-[#D4AF37] font-bold">Access Notes:</span> {site.credentialsNote}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                            <a
                              href={site.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-1.5 hover:scale-105 transition-transform"
                            >
                              <span>Visit Live Website</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => setPreviewWebsite(site)}
                              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center space-x-1.5 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#FFDF73]" />
                              <span>Live Preview</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 5. DIRECT CHAT WITH DEVMODE */}
              {activeTab === "chat" && (
                <div className="space-y-4 animate-fadeIn flex flex-col h-[480px]">
                  <div className="flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/10 shrink-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <span>DevMode Direct Engineering Line</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          Dedicated communication channel with Puhayt Digital core engineers
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-black/60 rounded-2xl border border-white/5">
                    {userChatThread.map((msg) => {
                      const isMe = !msg.isFromDevMode;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs space-y-1 ${
                            isMe
                              ? "gold-gradient-bg text-black font-medium shadow-lg"
                              : "glass-card text-neutral-200 border border-white/10 bg-[#16120C]"
                          }`}>
                            <div className="flex items-center justify-between text-[10px] opacity-75 font-mono">
                              <span className="font-bold">{isMe ? "You" : "DevMode Engineer"}</span>
                              <span>{msg.timestamp}</span>
                            </div>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message or sprint question to DevMode engineers..."
                      className="flex-1 px-4 py-3 bg-black/80 border border-white/15 rounded-2xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="px-5 py-3 gold-gradient-bg text-black font-bold text-xs rounded-2xl flex items-center space-x-1.5 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL: EMBEDDED WEBSITE LIVE PREVIEW */}
      {previewWebsite && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn">
          <div className="glass-card bg-[#0D0D0D] border border-[#D4AF37]/50 w-full max-w-5xl h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl">
            {/* Preview Header */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-black/80">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-white">{previewWebsite.websiteName}</span>
                <span className="text-[10px] text-[#FFDF73] font-mono bg-white/5 px-2 py-0.5 rounded">
                  {previewWebsite.liveUrl}
                </span>
              </div>

              {/* Device switchers */}
              <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded-lg text-xs ${previewDevice === "desktop" ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"}`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`p-1.5 rounded-lg text-xs ${previewDevice === "tablet" ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"}`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded-lg text-xs ${previewDevice === "mobile" ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={previewWebsite.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-1"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setPreviewWebsite(null)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Iframe Container */}
            <div className="flex-1 bg-neutral-900 flex items-center justify-center p-4 overflow-hidden">
              <div
                className={`h-full bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-all ${
                  previewDevice === "desktop"
                    ? "w-full"
                    : previewDevice === "tablet"
                    ? "w-[768px]"
                    : "w-[390px]"
                }`}
              >
                <iframe
                  src={previewWebsite.previewUrl || previewWebsite.liveUrl}
                  title="Website Preview"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INVOICE RECEIPT VIEW */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="glass-card bg-[#0F0C08] border border-[#D4AF37]/50 w-full max-w-lg p-6 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <BrandLogo size="md" />
                <span className="text-xs font-mono text-[#D4AF37] font-bold">Official Invoice Receipt</span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Invoice Number:</span>
                <span className="font-mono font-bold text-white">{selectedInvoice.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Date:</span>
                <span className="text-white">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Client:</span>
                <span className="text-white font-medium">{selectedInvoice.clientName} ({selectedInvoice.userEmail})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Plan / Scope:</span>
                <span className="text-[#FFDF73] font-bold">{selectedInvoice.planName}</span>
              </div>
              {selectedInvoice.transactionRef && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Verification Ref:</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedInvoice.transactionRef}</span>
                </div>
              )}
            </div>

            {/* Items */}
            {selectedInvoice.items && selectedInvoice.items.length > 0 && (
              <div className="space-y-1.5 border-t border-b border-white/10 py-3">
                <div className="text-[10px] font-mono text-neutral-400 uppercase">Itemized Breakdown</div>
                {selectedInvoice.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-neutral-300">{it.description}</span>
                    <span className="font-mono text-white">₹{it.amount.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center text-sm font-bold pt-1">
              <span className="text-white">Total Amount Paid:</span>
              <span className="text-xl font-mono text-emerald-400 font-bold">
                ₹{selectedInvoice.amount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center space-x-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Payment status verified by Puhayt Digital Cloud Engine.</span>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full py-2.5 rounded-full gold-gradient-bg text-black font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
