import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  Send,
  FileText,
  ArrowRight,
  RefreshCw,
  Cpu,
  MessageSquare,
  Trash2,
  HelpCircle,
  PhoneCall,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Clock,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Compass,
  MessageCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAgency } from "../context/AgencyContext";
import { solveUserQuery } from "../utils/aiAssistantSolver";

interface DoubtItem {
  id: string;
  category: "all" | "roas" | "seo" | "web" | "pricing" | "founder";
  label: string;
  query: string;
  hint: string;
}

const CATEGORIES = [
  { id: "all", label: "All Doubts" },
  { id: "roas", label: "1.3X ROAS & Ads" },
  { id: "seo", label: "Search Rank 'Good'" },
  { id: "web", label: "3D WebGL Design" },
  { id: "pricing", label: "Pricing & Retainers" },
  { id: "founder", label: "Founder & Mission" },
];

const DOUBTS: DoubtItem[] = [
  {
    id: "roas",
    category: "roas",
    label: "💡 How does 1.3X ROAS work?",
    query: "How does Puhayt Digital achieve and verify the 1.3X ROAS benchmark on Google & Meta Ads?",
    hint: "Verified real-time ad spend return",
  },
  {
    id: "realestate",
    category: "roas",
    label: "🏢 Real Estate $10M to $42M?",
    query: "How did Puhayt Digital scale real estate revenue from $10M to $42M in 90 days?",
    hint: "High-net-worth client acquisition",
  },
  {
    id: "seo",
    category: "seo",
    label: "📈 What is Google Search Rank 'Good'?",
    query: "What does Google Search Rank 'Good' mean and how do you optimize technical SEO?",
    hint: "Core Web Vitals & JSON-LD schema",
  },
  {
    id: "web",
    category: "web",
    label: "🎨 What is 3D WebGL Web Design?",
    query: "What makes your 3D WebGL websites different from normal WordPress or Shopify websites?",
    hint: "Sub-second speed & interactive 3D",
  },
  {
    id: "profile",
    category: "founder",
    label: "🌐 What is a Digital Profile?",
    query: "What does Trishanjit Dalal mean by 'making a Digital Profile' for businesses?",
    hint: "Authority assets & lead engines",
  },
  {
    id: "pricing",
    category: "pricing",
    label: "💰 Pricing & Monthly Retainers?",
    query: "What are your pricing plans and packages for local businesses vs international brands?",
    hint: "₹10,000 - ₹50,000+ transparent tiers",
  },
  {
    id: "timelines",
    category: "web",
    label: "⏱️ Delivery Timelines?",
    query: "How long does it take from project kickoff to live website launch and ads setup?",
    hint: "10-14 days to 4 weeks",
  },
  {
    id: "founder",
    category: "founder",
    label: "👤 Who is Trishanjit Dalal?",
    query: "Tell me about your founder Trishanjit Dalal and the agency's mission.",
    hint: "Founder & Lead Architect",
  },
  {
    id: "kolkata",
    category: "founder",
    label: "📍 Kolkata Office & Meetings?",
    query: "Where is your Salt Lake Sector V office in Kolkata and can we meet in person?",
    hint: "Sector V near College More",
  },
  {
    id: "onboard",
    category: "pricing",
    label: "🚀 How do we start?",
    query: "What are the exact onboarding steps to start a project with Puhayt Digital?",
    hint: "4-step executive kickoff",
  },
];

const FOLLOW_UP_SUGGESTIONS = [
  "What budget do I need to start?",
  "How fast can we launch my website?",
  "Can I schedule an in-person meeting in Kolkata?",
  "What is the expected ROI for my industry?",
];

export const AISuiteSection: React.FC = () => {
  const { contactInfo } = useAgency();
  const primaryWhatsapp = contactInfo?.whatsapps?.[0] || "+91 7044811476";
  const cleanPhone = primaryWhatsapp.replace(/[^0-9]/g, "");

  const [activeTab, setActiveTab] = useState<"chat" | "proposal">("chat");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [dynamicFollowUps, setDynamicFollowUps] = useState<string[]>(FOLLOW_UP_SUGGESTIONS);

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "user" | "ai"; text: string; time: string; model?: string }[]
  >([
    {
      sender: "ai",
      text: `### Welcome to Puhayt AI Assistant 👋\n\nI am your dedicated digital growth assistant at **Puhayt Digital**, powered by Google Gemini.\n\nFounder **Trishanjit Dalal**'s vision is:\n> *"We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them"*\n\nAsk me any doubts about:\n- **1.3X ROAS**: How our verified ad campaigns deliver real-time return on spend\n- **Google Search Rank 'Good'**: Core Web Vitals (0.8s) & technical JSON-LD schema\n- **Bespoke 3D WebGL Websites**: Custom interactive platforms built without templates\n- **Real Estate Scaling**: How we scaled revenue from $10M to $42M in 90 days\n- **Pricing & Timelines**: Clear monthly retainers and rapid turnaround times\n\n*Click any doubt chip above or type your question below to start our conversation!*`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      model: "Gemini 3.8 Flash",
    },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, chatLoading]);

  // Subtle web audio chime for AI replies
  const playReplyChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio context silenced or not permitted
    }
  };

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Robust Client-Side Intelligent Knowledge Base & Problem Solver
  const getClientFallback = (query: string): string => {
    const solved = solveUserQuery(query);
    if (solved.suggestedFollowUps && solved.suggestedFollowUps.length > 0) {
      setDynamicFollowUps(solved.suggestedFollowUps);
    }
    return solved.markdownResponse;
  };

  const executeSend = async (messageText: string) => {
    if (!messageText.trim() || chatLoading) return;

    const userMsg = messageText.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Append user message immediately
    const updatedMessages = [...chatMessages, { sender: "user" as const, text: userMsg, time: currentTime }];
    setChatMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: updatedMessages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const replyText = data.response || data.fallback || getClientFallback(userMsg);

      if (data.followUps && Array.isArray(data.followUps) && data.followUps.length > 0) {
        setDynamicFollowUps(data.followUps);
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: replyText,
          time: replyTime,
          model: "Gemini 3.8 Flash • AI Problem Solver",
        },
      ]);
      playReplyChime();
    } catch {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: getClientFallback(userMsg),
          time: replyTime,
          model: "Puhayt AI Problem Solver",
        },
      ]);
      playReplyChime();
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    executeSend(chatInput);
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        sender: "ai",
        text: `### Conversation Reset 🔄\n\nI am **Puhayt AI Assistant**, ready to resolve any doubts or questions you have about Puhayt Digital.\n\nFounder Trishanjit Dalal's motto:\n> *"We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them"*\n\nHow can I help you scale today?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        model: "Gemini 3.8 Flash",
      },
    ]);
  };

  // Proposal Generator State
  const [proposalForm, setProposalForm] = useState({
    companyName: "",
    goals: "Scale qualified buyer leads and establish top-tier Google search visibility",
    targetAudience: "High-value clients, local buyers & corporate decision makers",
    monthlyBudget: "₹10,000 - ₹25,000 / mo",
  });
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalResult, setProposalResult] = useState<any>(null);

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalForm.companyName) return;

    setProposalLoading(true);
    setProposalResult(null);

    try {
      const response = await fetch("/api/ai/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposalForm),
      });
      const data = await response.json();
      setProposalResult(data);
    } catch {
      setProposalResult({
        proposalTitle: `Puhayt Growth Blueprint for ${proposalForm.companyName}`,
        executiveSummary: `Tailored high-performance strategy designed to maximize ROI, scale lead acquisition, and dominate search rankings.`,
        recommendedServices: [
          { name: "3D Custom Web & Experience Design", cost: "₹45,000 one-time", roi: "Sub-Second Speed (0.8s)" },
          { name: "Omnichannel SEO & Schema Markup", cost: "₹18,000 / mo", roi: "Google Search Rank 'Good'" },
          { name: "Meta & Google Ads Campaign Scaling", cost: "₹25,000 / mo", roi: "Verified 1.3X ROAS Target" },
        ],
        expected6MonthRevenue: "₹8.5 Lakh - ₹22 Lakh+",
        timelineWeeks: 4,
      });
    } finally {
      setProposalLoading(false);
    }
  };

  const filteredDoubts =
    selectedCategory === "all"
      ? DOUBTS
      : DOUBTS.filter((d) => d.category === selectedCategory);

  return (
    <section id="ai-suite" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      {/* Ambient Lighting & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-[#F3E5AB]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Header Showcase */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider shadow-lg">
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Google Gemini AI Intelligent Assistant</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            Puhayt <span className="gold-gradient-text">AI Marketing Suite</span>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Have a real-time conversation with our Gemini AI Assistant to clear any doubts about our 1.3X ROAS ads, Google Search Rank &ldquo;Good&rdquo; technical SEO, bespoke 3D WebGL websites, pricing, and growth strategy.
          </p>

          {/* Founder Quote Card Badge */}
          <div className="glass-card-gold p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/30 max-w-2xl mx-auto text-left flex items-start space-x-3.5 bg-gradient-to-r from-[#17120C] to-[#0D0A08]">
            <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-[#0B0B0B] font-bold text-xs shrink-0 shadow-md">
              TD
            </div>
            <div>
              <p className="text-xs sm:text-[13px] text-neutral-200 italic leading-snug">
                &ldquo;We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them&rdquo;
              </p>
              <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-[#D4AF37] font-medium">
                <span>~ Trishanjit Dalal</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400">Founder &amp; Lead Architect</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === "chat"
                ? "gold-gradient-bg text-[#0B0B0B] shadow-xl scale-105"
                : "glass-card text-neutral-300 hover:text-white border border-white/10"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Gemini AI Assistant &amp; Doubt Solver</span>
          </button>

          <button
            onClick={() => setActiveTab("proposal")}
            className={`px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === "proposal"
                ? "gold-gradient-bg text-[#0B0B0B] shadow-xl scale-105"
                : "glass-card text-neutral-300 hover:text-white border border-white/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>AI Growth Proposal Generator</span>
          </button>
        </div>

        {/* TAB 1: GEMINI AI ASSISTANT & DOUBT SOLVER */}
        {activeTab === "chat" && (
          <div className="max-w-4xl mx-auto space-y-5 animate-fadeIn">
            {/* Category Filter Bar */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-medium">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Explore Common Doubts by Topic:</span>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-[11px] text-neutral-400 hover:text-[#D4AF37] flex items-center space-x-1 transition-colors px-2 py-1 rounded bg-white/5"
                  title="Toggle response sound chime"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3 h-3 text-[#D4AF37]" />
                      <span>Audio On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3 h-3 text-neutral-500" />
                      <span>Audio Off</span>
                    </>
                  )}
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-[11px] px-3 py-1 rounded-full font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-[#D4AF37] text-[#0B0B0B] font-bold shadow-md"
                        : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Doubt Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {filteredDoubts.map((doubt) => (
                  <button
                    key={doubt.id}
                    onClick={() => executeSend(doubt.query)}
                    disabled={chatLoading}
                    className="p-2.5 text-left rounded-xl bg-[#16120C]/90 hover:bg-[#261E14] text-neutral-200 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex items-start justify-between group shadow-sm disabled:opacity-50"
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="text-xs font-semibold text-[#FFDF73] group-hover:text-white transition-colors">
                        {doubt.label}
                      </div>
                      <div className="text-[10px] text-neutral-400 line-clamp-1">{doubt.hint}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Container */}
            <div className="glass-card p-4 sm:p-6 rounded-3xl border border-[#D4AF37]/35 shadow-2xl space-y-4 bg-gradient-to-b from-[#13100D] via-[#0E0B09] to-[#080605]">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl gold-gradient-bg p-[1px] shadow-lg relative">
                    <div className="w-full h-full bg-[#0B0B0B] rounded-2xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B0B0B]" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                        Puhayt AI Assistant
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#FFDF73] border border-[#D4AF37]/40 font-semibold flex items-center space-x-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>Gemini 3.8 Flash</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online • Real-Time Conversation Ready</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleClearChat}
                    className="px-2.5 py-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors text-xs flex items-center space-x-1.5 border border-white/10"
                    title="Clear Conversation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Clear</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Stream */}
              <div className="h-[350px] sm:h-[420px] md:h-[460px] overflow-y-auto space-y-4 p-3.5 sm:p-4 bg-black/70 rounded-2xl border border-white/5 scrollbar-thin">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[92%] sm:max-w-[85%] p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                        msg.sender === "user"
                          ? "gold-gradient-bg text-[#0B0B0B] font-medium rounded-br-none"
                          : "glass-card text-neutral-200 border border-[#D4AF37]/25 rounded-bl-none bg-[#15110D]/95"
                      }`}
                    >
                      {msg.sender === "ai" ? (
                        <div className="space-y-3">
                          <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-neutral-200 leading-relaxed space-y-2.5">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>

                          {/* Action Toolbar on AI reply */}
                          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-[10px] text-[#D4AF37]/90 bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/25 flex items-center space-x-1">
                                <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                                <span>{msg.model || "Gemini 3.8 Flash"}</span>
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <a
                                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello Trishanjit! I'm reviewing your AI Assistant's solution for my project and would like to discuss next steps.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#FFDF73] flex items-center space-x-1 transition-colors px-2.5 py-0.5 rounded-full bg-[#1F170D] text-[#FFDF73] border border-[#D4AF37]/30 text-[10px] font-semibold"
                                title="Chat directly with Founder on WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3 text-[#25D366]" />
                                <span>WhatsApp Founder</span>
                              </a>

                              <button
                                onClick={() => handleCopyMessage(msg.text, idx)}
                                className="hover:text-white flex items-center space-x-1 transition-colors px-2 py-0.5 rounded bg-white/5 text-[10px]"
                                title="Copy answer"
                              >
                                {copiedIndex === idx ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="glass-card p-3.5 rounded-2xl text-xs text-neutral-300 flex items-center space-x-3 border border-[#D4AF37]/35 bg-[#16120D]">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                      <div className="flex items-center space-x-1">
                        <span>Puhayt AI Assistant is analyzing and drafting response</span>
                        <span className="inline-flex space-x-0.5">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-100">.</span>
                          <span className="animate-bounce delay-200">.</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Follow-Up Quick Suggestions */}
              <div className="flex items-center space-x-2 overflow-x-auto py-1 scrollbar-none">
                <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider shrink-0 flex items-center space-x-1">
                  <Compass className="w-3 h-3 text-[#D4AF37]" />
                  <span>Explore Solution:</span>
                </span>
                {dynamicFollowUps.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => executeSend(suggestion)}
                    disabled={chatLoading}
                    className="text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#FFDF73] text-neutral-300 border border-white/10 hover:border-[#D4AF37]/40 shrink-0 transition-all disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendChat} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask any doubt about our websites, 1.3X ROAS, SEO, pricing, or start your project..."
                  disabled={chatLoading}
                  className="flex-1 px-4 py-3 bg-black/80 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-6 py-3 gold-gradient-bg text-[#0B0B0B] font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 disabled:opacity-40 disabled:hover:scale-100"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Direct Strategy CTA Footer Strip */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 text-[11px] flex items-center space-x-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Want direct human consultation with Founder Trishanjit Dalal?</span>
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      "Hello Trishanjit! I talked with Puhayt AI Assistant and would like to discuss my project requirements."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>WhatsApp Trishanjit</span>
                  </a>
                  <a
                    href="#contact"
                    className="px-3.5 py-1.5 rounded-lg gold-gradient-bg text-[#0B0B0B] font-bold text-xs flex items-center space-x-1"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI PROPOSAL GENERATOR */}
        {activeTab === "proposal" && (
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Generate Custom AI Digital Growth Proposal
              </h3>
              <p className="text-xs text-neutral-400">
                Input your company details to generate a tailored 6-month growth roadmap with ROI projections and scope.
              </p>
            </div>

            <form onSubmit={handleGenerateProposal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Company / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Group"
                    value={proposalForm.companyName}
                    onChange={(e) => setProposalForm({ ...proposalForm, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Monthly Budget Range</label>
                  <select
                    value={proposalForm.monthlyBudget}
                    onChange={(e) => setProposalForm({ ...proposalForm, monthlyBudget: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="₹10,000 - ₹25,000 / mo">₹10,000 - ₹25,000 / mo (Starter Growth)</option>
                    <option value="₹25,000 - ₹50,000 / mo">₹25,000 - ₹50,000 / mo (Scale Retainer)</option>
                    <option value="₹50,000+ / mo">₹50,000+ / mo (Enterprise Dominance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Primary Growth Goal</label>
                <input
                  type="text"
                  value={proposalForm.goals}
                  onChange={(e) => setProposalForm({ ...proposalForm, goals: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={proposalLoading}
                className="w-full py-3.5 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-xl shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center space-x-2"
              >
                {proposalLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Growth Roadmap...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom AI Proposal</span>
                  </>
                )}
              </button>
            </form>

            {/* Proposal Output Card */}
            {proposalResult && (
              <div className="glass-card-gold p-6 rounded-2xl border border-[#D4AF37]/40 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                  <h4 className="font-serif text-xl font-bold gold-gradient-text">
                    {proposalResult.proposalTitle}
                  </h4>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold">
                    Estimated 6Mo Revenue: {proposalResult.expected6MonthRevenue}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {proposalResult.executiveSummary}
                </p>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Recommended Growth Modules</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {proposalResult.recommendedServices?.map((serv: any, idx: number) => (
                      <div key={idx} className="bg-black/60 p-3.5 rounded-xl border border-white/10 space-y-1">
                        <div className="text-xs font-bold text-white">{serv.name}</div>
                        <div className="text-[11px] text-[#D4AF37] font-semibold">{serv.cost}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">{serv.roi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
