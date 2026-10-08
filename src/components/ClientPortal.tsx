import React, { useState, useEffect } from "react";
import { DEMO_CLIENT_PORTAL } from "../data/agencyData";
import { Lead } from "../types";
import { useAgency } from "../context/AgencyContext";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  CreditCard,
  MessageSquare,
  FileText,
  TrendingUp,
  LogOut,
  Send,
  Plus,
  RefreshCw,
  X,
  Shield,
  Sparkles,
  KeyRound,
  AlertTriangle,
  LogIn,
  Compass,
  Palette,
  Code2,
  Rocket,
  ChevronRight,
  Layers,
  Gift,
  Tag,
  Share2,
  MousePointerClick
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { ClientReferralDashboard } from "./ClientReferralDashboard";

interface ClientPortalProps {
  isOpen?: boolean;
  onClose?: () => void;
  embedded?: boolean;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ isOpen = true, onClose, embedded = false }) => {
  const {
    transactions,
    currentUser,
    userProfile,
    openAuthModal,
    logout,
    referralStats,
    userReferralCode,
    simulateReferralClick,
  } = useAgency();
  const [userRole, setUserRole] = useState<"client" | "admin">(
    userProfile?.role === "admin" ? "admin" : "client"
  );
  const [activeTab, setActiveTab] = useState<"dashboard" | "referrals" | "invoices" | "deliverables" | "chat" | "crm">("dashboard");

  // Keep userRole in sync if profile updates
  useEffect(() => {
    if (userProfile?.role === "admin") {
      setUserRole("admin");
    }
  }, [userProfile]);

  // CRM State for Admin
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  // Chat with Manager State
  const [managerMessages, setManagerMessages] = useState([
    { sender: "manager", text: "Hello Alexander! The 3D estate visualizer deployment is live and generating a 4.8% conversion rate. Let me know if you'd like to review the Q3 ad budget.", time: "10:14 AM" }
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    if (userRole === "admin") {
      fetchLeads();
    }
  }, [userRole]);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleSendManagerChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setManagerMessages(prev => [...prev, { sender: "client", text: userText, time: "Just now" }]);
    setChatInput("");

    setTimeout(() => {
      setManagerMessages(prev => [
        ...prev,
        { sender: "manager", text: "Received! Our growth team will adjust the ad targeting and send an updated report shortly.", time: "Just now" }
      ]);
    }, 1200);
  };

  if (!embedded && !isOpen) return null;

  const content = (
    <div className={`glass-card bg-[#0B0B0B] border border-[#D4AF37]/40 w-full overflow-hidden rounded-3xl flex flex-col shadow-2xl relative ${embedded ? 'max-h-[70vh]' : 'max-w-6xl max-h-[95vh]'}`}>
      
      {/* Top Portal Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/60 shrink-0">
        <div className="flex items-center space-x-3">
          <BrandLogo size="md" />
          <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-white/10">
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-mono font-bold uppercase">
              {userRole === "client" ? "Client View" : "Admin CRM"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Switch Role Demo Button */}
          <button
            onClick={() => {
              const nextRole = userRole === "client" ? "admin" : "client";
              setUserRole(nextRole);
              setActiveTab(nextRole === "admin" ? "crm" : "dashboard");
            }}
            className="px-3 py-1.5 glass-card-gold text-[11px] font-bold text-[#D4AF37] rounded-full border border-[#D4AF37]/40 hover:scale-105 transition-transform"
          >
            Switch to {userRole === "client" ? "Admin CRM Mode" : "Client Portal View"}
          </button>

          {!embedded && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white glass-card rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* User Account Bar */}
      <div className="px-6 py-2.5 bg-[#120F0C] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFDF73] to-[#D4AF37] text-black flex items-center justify-center font-bold text-xs shadow-sm">
            {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : currentUser ? "U" : "G"}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">
                {userProfile?.displayName || (currentUser?.isAnonymous ? "Guest Session" : currentUser?.email || "Guest Client")}
              </span>
              <span className="text-[9px] font-mono bg-[#FFDF73]/20 text-[#FFDF73] px-1.5 py-0.5 rounded font-bold uppercase">
                {currentUser ? (userProfile?.authProvider || "Firebase") : "Not Signed In"}
              </span>
            </div>
            <p className="text-[10px] text-neutral-400">
              {currentUser?.email || currentUser?.phoneNumber || (currentUser ? "Instant Guest Mode" : "Sign in to save reports and deliverables")}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {currentUser ? (
            <button
              onClick={() => logout()}
              className="px-3 py-1 text-[11px] font-medium text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 rounded-lg flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal("google")}
              className="px-3.5 py-1 text-[11px] font-bold text-black bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] rounded-lg flex items-center space-x-1.5 shadow-sm hover:scale-105 transition-transform"
            >
              <LogIn className="w-3 h-3" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>

        {/* Navigation Bar inside Portal */}
        <div className="px-6 py-2 border-b border-white/10 bg-white/5 flex items-center space-x-2 overflow-x-auto shrink-0">
          {userRole === "client" ? (
            <>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === "dashboard" ? "gold-gradient-bg text-[#0B0B0B]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Campaign Analytics
              </button>
              <button
                onClick={() => setActiveTab("referrals")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center space-x-1.5 ${
                  activeTab === "referrals" ? "gold-gradient-bg text-[#0B0B0B]" : "text-neutral-400 hover:text-white"
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Referral &amp; Earned Discounts</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold font-mono ${
                  activeTab === "referrals" ? "bg-black text-[#FFDF73]" : "bg-[#D4AF37]/20 text-[#FFDF73]"
                }`}>
                  {referralStats.totalClicks} Clicks
                </span>
              </button>
              <button
                onClick={() => setActiveTab("invoices")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === "invoices" ? "gold-gradient-bg text-[#0B0B0B]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Invoices & Payments
              </button>
              <button
                onClick={() => setActiveTab("deliverables")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === "deliverables" ? "gold-gradient-bg text-[#0B0B0B]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Deliverables & Code
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === "chat" ? "gold-gradient-bg text-[#0B0B0B]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Direct Manager Chat
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("crm")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  activeTab === "crm" ? "gold-gradient-bg text-[#0B0B0B]" : "text-neutral-400 hover:text-white"
                }`}
              >
                Incoming CRM Leads ({leads.length})
              </button>
            </>
          )}
        </div>

        {/* Main Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* CLIENT DASHBOARD */}
          {userRole === "client" && activeTab === "dashboard" && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Project Timeline & Multi-Stage Progress Bar */}
              <div className="glass-card p-6 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#14100A] to-[#0A0805] space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.7)] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live Milestone Telemetry</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                      Enterprise Project Timeline &amp; Sprints
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 bg-white/5 px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
                    <span className="text-neutral-400">Total Completion:</span>
                    <span className="font-bold text-[#FFDF73] font-mono text-sm">88%</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">On Schedule</span>
                  </div>
                </div>

                {/* 4-Stage Connected Timeline Track */}
                <div className="relative pt-4 pb-2">
                  {/* Connecting Background Line */}
                  <div className="hidden md:block absolute top-[42px] left-[8%] right-[8%] h-1 bg-white/10 rounded-full z-0" />
                  
                  {/* Active Gold Progress Fill Line (reaching 75% through stage 3) */}
                  <div className="hidden md:block absolute top-[42px] left-[8%] w-[68%] h-1 bg-gradient-to-r from-emerald-400 via-[#D4AF37] to-[#FFDF73] rounded-full z-0 shadow-[0_0_10px_#D4AF37]" />

                  {/* Stage Nodes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    
                    {/* Stage 1: Discovery */}
                    <div className="glass-card p-3.5 rounded-2xl border border-emerald-500/40 bg-[#0C1A10]/60 space-y-2 relative group hover:border-emerald-400 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-sm">
                          <Compass className="w-4 h-4" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">
                          100% DONE
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">1. Discovery</div>
                        <div className="text-[10px] text-neutral-400">Architecture &amp; Strategy Audit</div>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-full" />
                      </div>
                      <ul className="text-[10px] text-neutral-400 space-y-1 pt-1 border-t border-white/5">
                        <li className="flex items-center space-x-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Competitive Market Audit</span>
                        </li>
                        <li className="flex items-center space-x-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Architecture &amp; Tech Stack</span>
                        </li>
                      </ul>
                    </div>

                    {/* Stage 2: Design */}
                    <div className="glass-card p-3.5 rounded-2xl border border-emerald-500/40 bg-[#0C1A10]/60 space-y-2 relative group hover:border-emerald-400 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-sm">
                          <Palette className="w-4 h-4" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">
                          100% DONE
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">2. Design</div>
                        <div className="text-[10px] text-neutral-400">3D Mockups &amp; UI System</div>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-full" />
                      </div>
                      <ul className="text-[10px] text-neutral-400 space-y-1 pt-1 border-t border-white/5">
                        <li className="flex items-center space-x-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Figma Bespoke Components</span>
                        </li>
                        <li className="flex items-center space-x-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>WebGL Interactive Shaders</span>
                        </li>
                      </ul>
                    </div>

                    {/* Stage 3: Development */}
                    <div className="glass-card p-3.5 rounded-2xl border border-[#D4AF37] bg-[#241A0B]/80 space-y-2 relative group shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/70 flex items-center justify-center text-[#FFDF73] shadow-sm">
                          <Code2 className="w-4 h-4 animate-pulse" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/30 text-[#FFDF73] text-[10px] font-bold font-mono border border-[#D4AF37]/40 animate-pulse">
                          IN SPRINT
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">3. Development</div>
                        <div className="text-[10px] text-[#FFDF73]">Full-Stack &amp; Cloud Database</div>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#AA7E18] to-[#FFDF73] h-full w-[75%]" />
                      </div>
                      <ul className="text-[10px] text-neutral-300 space-y-1 pt-1 border-t border-white/5">
                        <li className="flex items-center space-x-1.5 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>React 19 &amp; Tailwind Engine</span>
                        </li>
                        <li className="flex items-center space-x-1.5 text-[#FFDF73] font-semibold">
                          <Clock className="w-3 h-3 text-[#D4AF37] shrink-0 animate-spin" style={{ animationDuration: "4s" }} />
                          <span>Database &amp; API Integration (75%)</span>
                        </li>
                      </ul>
                    </div>

                    {/* Stage 4: Launch */}
                    <div className="glass-card p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2 relative group hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 shadow-sm">
                          <Rocket className="w-4 h-4" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-400 text-[10px] font-bold font-mono">
                          SCHEDULED
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-200">4. Launch</div>
                        <div className="text-[10px] text-neutral-400">QA, SEO &amp; Cloud Deployment</div>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white/20 h-full w-0" />
                      </div>
                      <ul className="text-[10px] text-neutral-400 space-y-1 pt-1 border-t border-white/5">
                        <li className="flex items-center space-x-1.5 text-neutral-400">
                          <Clock className="w-3 h-3 text-neutral-500 shrink-0" />
                          <span>Technical SEO &amp; Core Web Vitals</span>
                        </li>
                        <li className="flex items-center space-x-1.5 text-neutral-400">
                          <Clock className="w-3 h-3 text-neutral-500 shrink-0" />
                          <span>Global CDN Production Go-Live</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Bottom Timeline Summary Banner */}
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2 text-neutral-300">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Next Milestone: <strong className="text-white">API Cloud Run Release Candidate</strong> on Sept 2, 2026</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("deliverables")}
                    className="text-[#FFDF73] hover:text-white text-xs font-semibold flex items-center space-x-1 underline decoration-[#D4AF37]/50"
                  >
                    <span>View All Phase Deliverables &amp; Code</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] text-neutral-400 uppercase">Organic Traffic</div>
                  <div className="font-serif text-2xl font-bold text-white mt-1">
                    {DEMO_CLIENT_PORTAL.campaignMetrics.organicTraffic.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1">↑ 280% YoY</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] text-neutral-400 uppercase">Paid Conversions</div>
                  <div className="font-serif text-2xl font-bold text-emerald-400 mt-1">
                    {DEMO_CLIENT_PORTAL.campaignMetrics.paidConversions}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">This Month</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] text-neutral-400 uppercase">Return On Ad Spend</div>
                  <div className="font-serif text-2xl font-bold gold-gradient-text mt-1">
                    {DEMO_CLIENT_PORTAL.campaignMetrics.roas}x ROAS
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">Target Met</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-[10px] text-neutral-400 uppercase">Primary Keyword Rank</div>
                  <div className="font-serif text-2xl font-bold text-white mt-1">
                    #{DEMO_CLIENT_PORTAL.campaignMetrics.topKeywordRank} Position
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-1">Google Search</div>
                </div>
              </div>

              {/* Quick Referral & Earned Discounts Snapshot Widget */}
              <div className="glass-card-gold p-5 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#1A1309] to-[#0E0A05] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73] shrink-0 shadow-sm">
                    <Gift className="w-5 h-5 text-[#FFDF73]" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">Your Referral Tracking &amp; Earned Discounts</span>
                      <span className="px-2 py-0.2 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 font-bold">
                        {referralStats.totalClicks} Live Clicks
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Referral Code: <span className="font-mono text-[#FFDF73] font-bold">{userReferralCode}</span> •{" "}
                      <span className="text-emerald-400 font-medium">
                        {referralStats.earnedDiscounts.filter(d => d.status === "Active").length} Active Discounts Ready
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={simulateReferralClick}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all"
                    title="Simulate a friend clicking your link (+1)"
                  >
                    <MousePointerClick className="w-3.5 h-3.5 text-[#FFDF73]" />
                    <span>+1 Click Test</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("referrals")}
                    className="flex-1 md:flex-initial px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center justify-center space-x-1 hover:scale-105 transition-transform shadow-md"
                  >
                    <span>Open Referral Dashboard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Task Milestones Table */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Sprint Deliverables & Tasks
                </h4>
                <div className="space-y-2">
                  {DEMO_CLIENT_PORTAL.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 text-xs">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className={`w-4 h-4 ${task.status === "Completed" ? "text-emerald-400" : "text-amber-400"}`} />
                        <span className="text-neutral-200">{task.title}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-[10px] text-neutral-400">Due: {task.dueDate}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* REFERRAL LINK TRACKING & EARNED DISCOUNTS VIEW */}
          {userRole === "client" && activeTab === "referrals" && (
            <ClientReferralDashboard
              onNavigateToInvoices={() => setActiveTab("invoices")}
              onNavigateToChat={() => setActiveTab("chat")}
            />
          )}

          {/* INVOICES & PAYMENTS */}
          {userRole === "client" && activeTab === "invoices" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                    <span>Real-Time Verified Payments Dashboard</span>
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {transactions.length} Recorded Transactions
                  </span>
                </div>

                {transactions.length === 0 ? (
                  <div className="glass-card p-6 rounded-2xl border border-white/10 text-center space-y-2">
                    <ShieldCheck className="w-8 h-8 text-[#D4AF37] mx-auto opacity-60" />
                    <p className="text-sm text-neutral-300 font-medium">No active transactions initiated yet.</p>
                    <p className="text-xs text-neutral-500">
                      When you subscribe or complete a payment via UPI/Card in the Payment Modal, verified transactions with NPCI tokens will appear here automatically in real time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((txn) => (
                      <div key={txn.id} className="glass-card p-4 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all space-y-3 bg-black/40">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                          <div>
                            <div className="text-sm font-bold text-white flex items-center space-x-2">
                              <span>{txn.planName}</span>
                              <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-mono font-bold">
                                Ref: {txn.referenceId}
                              </span>
                            </div>
                            <div className="text-xs text-neutral-400 font-mono mt-0.5">
                              {txn.date} • Client: <span className="text-neutral-200">{txn.clientName}</span> ({txn.clientEmail})
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-base font-bold text-emerald-400 font-mono">
                              ₹{txn.amount.toLocaleString("en-IN")}
                            </div>
                            <span
                              className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold inline-flex items-center space-x-1 ${
                                txn.status === "Success"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : txn.status === "Pending"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-red-500/20 text-red-300 border border-red-500/30"
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3 inline mr-1" />
                              <span>{txn.status.toUpperCase()}</span>
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-neutral-400 font-mono pt-1">
                          <div>
                            <span className="text-neutral-500">Method:</span>{" "}
                            <span className="text-white font-semibold">{txn.paymentMethod} ({txn.upiAppUsed || "Direct Switch"})</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Bank Switch:</span>{" "}
                            <span className="text-[#D4AF37] font-semibold">{txn.bankUsed}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Verification:</span>{" "}
                            <span className="text-emerald-400 font-bold">NPCI Token Validated</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">Contract Invoices</h3>
                <div className="space-y-3">
                  {DEMO_CLIENT_PORTAL.invoices.map((inv) => (
                    <div key={inv.id} className="glass-card p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                        <div>
                          <div className="text-xs font-bold text-white">{inv.invoiceNo}</div>
                          <div className="text-[10px] text-neutral-400">{inv.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-xs font-bold text-white">{inv.amount}</div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                            {inv.status}
                          </span>
                        </div>
                        <button className="p-2 glass-card rounded-lg text-neutral-300 hover:text-white" title="Download PDF">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DELIVERABLES */}
          {userRole === "client" && activeTab === "deliverables" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-serif text-xl font-bold text-white mb-2">Download Deliverables & Code</h3>
              <div className="space-y-3">
                {DEMO_CLIENT_PORTAL.deliverables.map((del) => (
                  <div key={del.id} className="glass-card p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-[#D4AF37]" />
                      <div>
                        <div className="text-xs font-bold text-white">{del.title}</div>
                        <div className="text-[10px] text-neutral-400">{del.size} • Uploaded {del.date}</div>
                      </div>
                    </div>

                    <button className="px-3.5 py-1.5 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-lg flex items-center space-x-1 hover:scale-105 transition-transform">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DIRECT MANAGER CHAT */}
          {userRole === "client" && activeTab === "chat" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <img
                  src={DEMO_CLIENT_PORTAL.assignedManager.avatar}
                  alt="Manager"
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-white">{DEMO_CLIENT_PORTAL.assignedManager.name}</div>
                  <div className="text-[10px] text-[#D4AF37]">{DEMO_CLIENT_PORTAL.assignedManager.role}</div>
                </div>
              </div>

              <div className="h-64 overflow-y-auto space-y-3 p-3 bg-black/50 rounded-2xl border border-white/5">
                {managerMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-xs ${
                      msg.sender === "client" ? "gold-gradient-bg text-[#0B0B0B] font-semibold" : "glass-card text-neutral-200 border border-white/10"
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-[9px] opacity-60 block mt-1 text-right">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendManagerChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message to your growth director..."
                  className="flex-1 px-4 py-2.5 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button type="submit" className="px-4 py-2.5 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-xl">
                  Send
                </button>
              </form>
            </div>
          )}

          {/* ADMIN CRM VIEW */}
          {userRole === "admin" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Agency Lead Management CRM</h3>
                  <p className="text-xs text-neutral-400">Captured inquiries from contact forms, free audit requests, and AI proposal generators.</p>
                </div>
                <button onClick={fetchLeads} className="p-2 glass-card rounded-lg text-neutral-300 hover:text-white" title="Refresh Leads">
                  <RefreshCw className={`w-4 h-4 ${leadsLoading ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{lead.name}</span>
                        <span className="text-[10px] text-neutral-400">({lead.company || "Individual"})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.status === "New" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300">
                      Email: <span className="text-[#D4AF37]">{lead.email}</span> • Service: <span className="text-white font-medium">{lead.service}</span>
                    </div>

                    {lead.message && (
                      <p className="text-[11px] text-neutral-400 bg-black/40 p-2 rounded-lg font-light italic">
                        "{lead.message}"
                      </p>
                    )}

                    <div className="text-[10px] text-neutral-500 font-mono">
                      Received: {new Date(lead.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );

  if (embedded) return content;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {content}
    </div>
  );
};
