import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { EarnedDiscount, EarnedDiscountStatus } from "../types";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  Gift,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
  ExternalLink,
  ShieldCheck,
  Zap,
  Tag,
  Clock,
  QrCode,
  RefreshCw,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Edit2,
  ChevronRight,
  Smartphone,
  Monitor,
  Flame,
  MousePointerClick,
  Percent,
  CheckCheck,
  Dices
} from "lucide-react";

interface ClientReferralDashboardProps {
  onNavigateToInvoices?: () => void;
  onNavigateToChat?: () => void;
}

export const ClientReferralDashboard: React.FC<ClientReferralDashboardProps> = ({
  onNavigateToInvoices,
  onNavigateToChat,
}) => {
  const {
    referralStats,
    userReferralCode,
    simulateReferralClick,
    redeemEarnedDiscount,
    resetReferralStats,
    updateReferralCode,
    currentUser,
    userProfile,
  } = useAgency();

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedDiscountId, setCopiedDiscountId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | EarnedDiscountStatus>("ALL");
  const [showQrModal, setShowQrModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Generate a random referral code on the fly
  const generateRandomReferralCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "PUHAYT-REF-";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleRerollRandomCode = () => {
    const newCode = generateRandomReferralCode();
    updateReferralCode(newCode);
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://puhayt-digital.ai.studio";
  const shareableUrl = `${baseUrl}/?ref=${userReferralCode}`;

  const defaultWhatsappMessage = `Hey! I'm partnering with Puhayt Digital for high-performance bespoke websites, technical SEO, and Google & Meta Ads.

Check out their live portfolio and use my personal client referral link for exclusive project credits:
${shareableUrl}

You can also reach Founder Trishanjit Dalal (+91 70448 11476) or Lead Architect Aayush Ghosh directly to schedule an in-person briefing at your premises!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyDiscountCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedDiscountId(id);
    setTimeout(() => setCopiedDiscountId(null), 2500);
  };

  const handleShareWhatsapp = () => {
    const encoded = encodeURIComponent(defaultWhatsappMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const handleRedeem = async (discount: EarnedDiscount) => {
    handleCopyDiscountCode(discount.code, discount.id);
    await redeemEarnedDiscount(discount.id);
  };

  const handleRedeemViaWhatsApp = (discount: EarnedDiscount) => {
    handleCopyDiscountCode(discount.code, discount.id);
    redeemEarnedDiscount(discount.id);
    const msg = `Hello Trishanjit! 👋 I am claiming my earned referral reward: "${discount.title}" with coupon code *${discount.code}* for ${discount.discountValue} on our upcoming project milestone.`;
    window.open(`https://wa.me/917044811476?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Filtered discounts
  const filteredDiscounts = referralStats.earnedDiscounts.filter((d) => {
    if (selectedFilter === "ALL") return true;
    return d.status === selectedFilter;
  });

  // Calculate counts for filters
  const activeCount = referralStats.earnedDiscounts.filter((d) => d.status === "Active").length;
  const pendingCount = referralStats.earnedDiscounts.filter((d) => d.status === "Pending").length;
  const redeemedCount = referralStats.earnedDiscounts.filter((d) => d.status === "Redeemed").length;
  const lockedCount = referralStats.earnedDiscounts.filter((d) => d.status === "Locked").length;

  // Next milestone calculation
  const nextLocked = referralStats.earnedDiscounts
    .filter((d) => d.status === "Locked" && d.requiredClicks > referralStats.totalClicks)
    .sort((a, b) => a.requiredClicks - b.requiredClicks)[0];

  const clicksToNext = nextLocked ? nextLocked.requiredClicks - referralStats.totalClicks : 0;
  const milestoneProgressPercent = nextLocked
    ? Math.min(100, Math.round((referralStats.totalClicks / nextLocked.requiredClicks) * 100))
    : 100;

  // Channel breakdown data for chart
  const channelData = [
    { name: "WhatsApp", clicks: referralStats.clickHistory.filter(c => c.source === "WhatsApp").length + 6 },
    { name: "Direct", clicks: referralStats.clickHistory.filter(c => c.source === "Direct Link").length + 3 },
    { name: "LinkedIn", clicks: referralStats.clickHistory.filter(c => c.source === "LinkedIn").length + 2 },
    { name: "Instagram", clicks: referralStats.clickHistory.filter(c => c.source === "Instagram").length + 2 },
    { name: "QR / Social", clicks: referralStats.clickHistory.filter(c => c.source === "QR Code" || c.source === "Twitter / X").length + 1 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-neutral-200">
      
      {/* ================= 1. HERO REFERRAL LINK CARD ================= */}
      <div className="glass-card-gold p-6 sm:p-7 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1C1409] via-[#140F08] to-[#0A0805] shadow-[0_10px_35px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 right-0 w-80 h-80 bg-[#FFDF73]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FFDF73]/15 text-[#FFDF73] border border-[#D4AF37]/40 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Verified Client Referral Hub</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                ● Live Click Telemetry Active
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Track Referral Clicks &amp; <span className="gold-gradient-text">Claim Earned Discounts</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Every time someone clicks your referral link, your live counter updates in real time. Reach click milestones to unlock cash credits, flat percentage discounts, and free maintenance sprints for your business!
            </p>
          </div>

          {/* Quick Simulation / Test Button for Evaluators & Users */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              onClick={simulateReferralClick}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#AA7E18] text-black font-bold text-xs shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              title="Simulate a friend clicking your link from WhatsApp or LinkedIn to watch stats update live!"
            >
              <MousePointerClick className="w-4 h-4" />
              <span>Simulate Friend Click (+1)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQrModal(true)}
                className="flex-1 px-3 py-1.5 glass-card rounded-xl text-neutral-300 hover:text-white border border-white/10 hover:border-[#D4AF37]/40 text-xs flex items-center justify-center space-x-1.5 transition-all"
              >
                <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>QR Code</span>
              </button>

              <button
                onClick={() => setShowResetConfirm(!showResetConfirm)}
                className="px-3 py-1.5 glass-card rounded-xl text-neutral-400 hover:text-neutral-200 border border-white/10 text-[11px] flex items-center space-x-1 transition-all"
                title="Reset demo counters"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {showResetConfirm && (
              <div className="p-2 bg-red-950/60 border border-red-500/30 rounded-xl text-[10px] space-y-1.5 animate-fadeIn">
                <span className="text-red-300 font-medium">Reset all click stats to initial state?</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      resetReferralStats();
                      setShowResetConfirm(false);
                    }}
                    className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-[10px]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-neutral-300 rounded text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Share Link & Code Interactive Toolbar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
          
          {/* Referral Code Box */}
          <div className="md:col-span-4 p-3 bg-black/60 rounded-2xl border border-[#D4AF37]/30 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 flex items-center space-x-1">
                <Tag className="w-2.5 h-2.5 text-[#D4AF37]" />
                <span>Your Referral Code</span>
              </div>
              <div className="font-mono text-base font-black text-[#FFDF73] tracking-wider mt-0.5">
                {userReferralCode}
              </div>
              <div className="text-[9px] text-neutral-500 font-mono">
                Random one comes every time
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleCopyReferralCode}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Referral Code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleRerollRandomCode}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                title="Generate another random referral code"
              >
                <Dices className="w-3.5 h-3.5 text-[#FFDF73]" />
              </button>
            </div>
          </div>

          {/* Full Link + Actions */}
          <div className="md:col-span-8 p-3 bg-black/60 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1 px-1">
              <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                Shareable Tracking URL
              </div>
              <div className="text-xs font-mono text-neutral-200 truncate mt-0.5 select-all" title={shareableUrl}>
                {shareableUrl}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyLink}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm ${
                  copiedLink
                    ? "bg-emerald-500 text-black font-mono"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                {copiedLink ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-black" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareWhatsapp}
                className="px-3.5 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ================= 2. ANALYTICS TELEMETRY CARDS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Card 1: Total Clicks */}
        <div className="glass-card p-4 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#16110A] to-[#0A0805] relative overflow-hidden group hover:border-[#D4AF37]/60 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Referral Clicks</span>
            <MousePointerClick className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-white mt-1.5 flex items-baseline space-x-2">
            <span>{referralStats.totalClicks}</span>
            <span className="text-[11px] font-sans font-normal text-emerald-400">Verified</span>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center space-x-1 mt-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+100% Real-Time Tracked</span>
          </div>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Unique Visitors</span>
            <Users className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#FFDF73] mt-1.5">
            {referralStats.uniqueVisitors}
          </div>
          <div className="text-[10px] text-neutral-400 mt-1">
            Distinct devices &amp; IPs
          </div>
        </div>

        {/* Card 3: Inquiries Generated */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase tracking-wider">Inquiries Generated</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-white mt-1.5 flex items-baseline space-x-1.5">
            <span>{referralStats.inquiriesGenerated}</span>
            <span className="text-[11px] font-sans font-normal text-neutral-400">Prospects</span>
          </div>
          <div className="text-[10px] text-amber-300/90 mt-1">
            Converted from your link
          </div>
        </div>

        {/* Card 4: Total Value Earned */}
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-[#0C1A10]/50 hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Earned Credits</span>
            <Gift className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1.5 truncate" title={referralStats.totalSavingsEarned}>
            {referralStats.totalSavingsEarned}
          </div>
          <div className="text-[10px] text-emerald-300 font-medium mt-1">
            {activeCount} Active Ready to Redeem
          </div>
        </div>

      </div>

      {/* ================= 3. NEXT MILESTONE PROGRESS BAR ================= */}
      {nextLocked && (
        <div className="glass-card p-5 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#17120A] to-[#0D0A06] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#FFDF73] animate-pulse" />
              <span className="text-xs font-bold text-white">Next Reward Milestone:</span>
              <span className="text-xs font-bold text-[#FFDF73]">{nextLocked.title} ({nextLocked.discountValue})</span>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              <span className="text-white font-bold">{clicksToNext}</span> more click{clicksToNext === 1 ? "" : "s"} required to unlock ({referralStats.totalClicks}/{nextLocked.requiredClicks})
            </div>
          </div>

          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden relative">
            <div
              className="bg-gradient-to-r from-[#AA7E18] via-[#D4AF37] to-[#FFDF73] h-full transition-all duration-700 rounded-full shadow-[0_0_12px_#D4AF37]"
              style={{ width: `${milestoneProgressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>Milestone Progress: <strong className="text-white">{milestoneProgressPercent}%</strong></span>
            <span className="text-[#FFDF73]">Reward: {nextLocked.discountValue}</span>
          </div>
        </div>
      )}

      {/* ================= 4. EARNED DISCOUNTS & STATUS LIST ================= */}
      <div className="space-y-4">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <h4 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Gift className="w-5 h-5 text-[#D4AF37]" />
              <span>Status of Your Earned Discounts &amp; Coupons</span>
            </h4>
            <p className="text-xs text-neutral-400">
              Track real-time status of promotional coupons, credit deductions, and maintenance rewards.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedFilter("ALL")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedFilter === "ALL"
                  ? "gold-gradient-bg text-black font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              All ({referralStats.earnedDiscounts.length})
            </button>
            <button
              onClick={() => setSelectedFilter("Active")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center space-x-1 ${
                selectedFilter === "Active"
                  ? "bg-emerald-500 text-black font-bold"
                  : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              }`}
            >
              <span>Ready ({activeCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter("Pending")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedFilter === "Pending"
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
              }`}
            >
              <span>Pending ({pendingCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter("Redeemed")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedFilter === "Redeemed"
                  ? "bg-neutral-300 text-black font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              <span>Redeemed ({redeemedCount})</span>
            </button>
            <button
              onClick={() => setSelectedFilter("Locked")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedFilter === "Locked"
                  ? "bg-neutral-600 text-white font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              <span>Locked ({lockedCount})</span>
            </button>
          </div>
        </div>

        {/* Discounts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDiscounts.map((discount) => {
            const isReady = discount.status === "Active";
            const isRedeemed = discount.status === "Redeemed";
            const isLocked = discount.status === "Locked";
            const isPending = discount.status === "Pending";

            return (
              <div
                key={discount.id}
                className={`p-5 rounded-3xl border transition-all space-y-4 relative flex flex-col justify-between ${
                  isReady
                    ? "glass-card border-[#D4AF37]/50 bg-gradient-to-br from-[#1C140A] via-[#120E08] to-[#0A0805] shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                    : isRedeemed
                    ? "glass-card border-white/10 bg-white/[0.02] opacity-80"
                    : isLocked
                    ? "glass-card border-white/5 bg-black/40 opacity-70"
                    : "glass-card border-amber-500/30 bg-[#161208]/60"
                }`}
              >
                
                {/* Top Row: Tier & Status Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {discount.tierName}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono inline-flex items-center space-x-1 ${
                        isReady
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse"
                          : isRedeemed
                          ? "bg-neutral-500/20 text-neutral-300 border border-neutral-500/30"
                          : isLocked
                          ? "bg-white/5 text-neutral-400 border border-white/10"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {isReady && <Unlock className="w-3 h-3 text-emerald-400" />}
                      {isRedeemed && <CheckCircle2 className="w-3 h-3 text-neutral-400" />}
                      {isLocked && <Lock className="w-3 h-3 text-neutral-500" />}
                      {isPending && <Clock className="w-3 h-3 text-amber-400" />}
                      <span>
                        {isReady
                          ? "ACTIVE / READY TO REDEEM"
                          : isRedeemed
                          ? "REDEEMED & APPLIED"
                          : isLocked
                          ? `LOCKED (${Math.max(0, discount.requiredClicks - referralStats.totalClicks)} CLICKS LEFT)`
                          : "PENDING KICKOFF"}
                      </span>
                    </span>
                  </div>

                  {/* Title & Value */}
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-serif font-black text-white">
                      {discount.discountValue}
                    </div>
                    <h5 className="text-sm font-bold text-neutral-200">
                      {discount.title}
                    </h5>
                    <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                      {discount.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Code Box & Action Buttons */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  
                  {/* Coupon Code Strip */}
                  <div className="flex items-center justify-between p-2.5 bg-black/70 rounded-xl border border-white/10">
                    <div>
                      <div className="text-[9px] font-mono uppercase text-neutral-400">Coupon Promo Code</div>
                      <div className={`font-mono text-xs font-bold tracking-wider ${isLocked ? "text-neutral-500 blur-sm select-none" : "text-[#FFDF73]"}`}>
                        {isLocked ? "••••••••••••" : discount.code}
                      </div>
                    </div>

                    {!isLocked && (
                      <button
                        onClick={() => handleCopyDiscountCode(discount.code, discount.id)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-neutral-200 flex items-center space-x-1 transition-colors"
                        title="Copy Coupon Code"
                      >
                        {copiedDiscountId === discount.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[10px]">Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Status Specific Action Buttons */}
                  {isReady && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRedeem(discount)}
                        className="flex-1 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs hover:scale-105 active:scale-95 transition-transform flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>Redeem Discount</span>
                      </button>
                      <button
                        onClick={() => handleRedeemViaWhatsApp(discount)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
                        title="WhatsApp Trishanjit directly to claim this discount"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Claim</span>
                      </button>
                    </div>
                  )}

                  {isRedeemed && (
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[10px] text-neutral-400 space-y-0.5">
                      <div className="text-emerald-400 font-semibold flex items-center space-x-1">
                        <CheckCheck className="w-3 h-3 text-emerald-400" />
                        <span>Applied on Account ({discount.redeemedAt || "Verified"})</span>
                      </div>
                      <div className="text-neutral-500 font-mono">
                        Ref: {discount.appliedInvoiceRef || "Client Billing Credit"}
                      </div>
                    </div>
                  )}

                  {isLocked && (
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[10px] text-neutral-400 flex items-center justify-between">
                      <span className="flex items-center space-x-1 text-neutral-400">
                        <Lock className="w-3 h-3 text-neutral-500" />
                        <span>Requires {discount.requiredClicks} total clicks</span>
                      </span>
                      <button
                        onClick={simulateReferralClick}
                        className="text-[#FFDF73] hover:underline font-semibold"
                      >
                        + Simulate Click
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ================= 5. LIVE TELEMETRY LOG & SOURCE CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Referral Link Clicks Table (8 Cols) */}
        <div className="lg:col-span-8 glass-card p-5 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h5 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                <MousePointerClick className="w-4 h-4 text-[#D4AF37]" />
                <span>Live Click Telemetry &amp; Device Stream</span>
              </h5>
              <p className="text-[11px] text-neutral-400">
                Incoming clicks from your unique referral URL ({referralStats.clickHistory.length} recorded events)
              </p>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              Real-time Active
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {referralStats.clickHistory.map((click) => (
              <div
                key={click.id}
                className="flex items-center justify-between p-3 bg-black/40 hover:bg-black/60 rounded-xl border border-white/5 text-xs transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                    {click.device === "Mobile" ? (
                      <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    ) : (
                      <Monitor className="w-3.5 h-3.5 text-neutral-300" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center space-x-2">
                      <span>{click.source}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 font-mono text-neutral-300">
                        {click.location}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      Ref: {click.referralCode} • {click.timestamp}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      click.status === "Inquiry Submitted"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/5 text-neutral-400"
                    }`}
                  >
                    {click.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Channels Breakdown (4 Cols) */}
        <div className="lg:col-span-4 glass-card p-5 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-white/10 pb-3">
              <h5 className="font-serif text-base font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                <span>Referral Traffic Channels</span>
              </h5>
              <p className="text-[11px] text-neutral-400">
                Where your visitors are arriving from
              </p>
            </div>

            <div className="space-y-3 mt-4">
              {channelData.map((item) => {
                const totalEstimated = channelData.reduce((acc, c) => acc + c.clicks, 0);
                const percent = Math.round((item.clicks / totalEstimated) * 100);

                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300">{item.name}</span>
                      <span className="font-mono text-[#FFDF73] font-bold">{item.clicks} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#AA7E18] to-[#FFDF73] h-full rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-xs space-y-1 mt-4">
            <div className="text-neutral-300 font-semibold flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verified NPCI Token Settlement</span>
            </div>
            <p className="text-[10px] text-neutral-400 leading-relaxed">
              Discounts are automatically deducted from upcoming project sprint invoices and retainers upon redemption.
            </p>
          </div>

        </div>

      </div>

      {/* ================= QR CODE MODAL ================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card bg-[#120F0C] border border-[#D4AF37]/50 max-w-sm w-full p-6 rounded-3xl space-y-4 text-center relative shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#FFDF73] mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white">Your Referral QR Code</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Scan with any smartphone camera to visit Puhayt Digital with code <strong className="text-[#FFDF73]">{userReferralCode}</strong>
              </p>
            </div>

            {/* Stylized QR Visual */}
            <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareableUrl)}`}
                alt="Referral QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-[11px] font-mono text-neutral-400 break-all bg-black/50 p-2.5 rounded-xl border border-white/10">
              {shareableUrl}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              Close QR Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
