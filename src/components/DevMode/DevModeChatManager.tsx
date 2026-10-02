import React, { useState, useMemo } from "react";
import { useAgency } from "../../context/AgencyContext";
import { ClientChatMessage } from "../../types";
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  RefreshCw,
  Search
} from "lucide-react";

export const DevModeChatManager: React.FC = () => {
  const { clientChatMessages, sendClientChatMessage, leads, currentUser } = useAgency();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClientEmail, setSelectedClientEmail] = useState<string>("");
  const [replyText, setReplyText] = useState("");

  // Group messages by client email (excluding messages sent to "devmode" without client email)
  const clientEmails = useMemo(() => {
    const emails = new Set<string>();
    clientChatMessages.forEach((m) => {
      if (!m.isFromDevMode && m.senderEmail) {
        emails.add(m.senderEmail.toLowerCase());
      } else if (m.isFromDevMode && m.recipientEmail) {
        emails.add(m.recipientEmail.toLowerCase());
      }
    });

    // Also include any leads that asked for a proposal
    leads.forEach((l) => {
      if (l.email) emails.add(l.email.toLowerCase());
    });

    // Default primary test client
    emails.add("aayushcps0907@gmail.com");

    return Array.from(emails);
  }, [clientChatMessages, leads]);

  // Set default selected client if not set
  React.useEffect(() => {
    if (!selectedClientEmail && clientEmails.length > 0) {
      setSelectedClientEmail(clientEmails[0]);
    }
  }, [clientEmails, selectedClientEmail]);

  // Messages for the active selected client thread
  const activeThread = useMemo(() => {
    if (!selectedClientEmail) return [];
    return clientChatMessages.filter((m) => {
      const email = selectedClientEmail.toLowerCase();
      if (!m.isFromDevMode && m.senderEmail?.toLowerCase() === email) return true;
      if (m.isFromDevMode && (!m.recipientEmail || m.recipientEmail.toLowerCase() === email)) return true;
      return false;
    });
  }, [clientChatMessages, selectedClientEmail]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedClientEmail) return;

    const text = replyText.trim();
    setReplyText("");

    await sendClientChatMessage({
      senderId: "devmode-director",
      senderName: "DevMode Engineering Director",
      senderEmail: "devmode@puhayt.digital",
      recipientEmail: selectedClientEmail.toLowerCase(),
      isFromDevMode: true,
      message: text,
    });
  };

  const handleQuickReply = (text: string) => {
    setReplyText(text);
  };

  const filteredClients = clientEmails.filter((em) =>
    em.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 glass-card rounded-2xl border border-white/10 bg-gradient-to-r from-[#17120B] to-black flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-[#D4AF37] font-mono text-[10px] font-bold uppercase">
            <Zap className="w-3.5 h-3.5 text-[#FFDF73]" />
            <span>DevMode Direct Client Communications Line</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-white mt-0.5">
            Client Chat &amp; Support Console
          </h3>
          <p className="text-xs text-neutral-400">
            Real-time Firestore sync with authenticated clients on their private dashboard.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Live Sync Active
        </span>
      </div>

      {/* Main Chat Interface Split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[520px]">
        
        {/* Left: Client Threads List */}
        <div className="glass-card rounded-2xl border border-white/10 bg-black/40 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/10 space-y-2">
            <div className="text-xs font-bold text-neutral-300 font-mono uppercase">
              Client Conversations ({clientEmails.length})
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search client email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredClients.map((email) => {
              const isSelected = selectedClientEmail.toLowerCase() === email.toLowerCase();
              const threadMsgs = clientChatMessages.filter(
                (m) => m.senderEmail?.toLowerCase() === email || m.recipientEmail?.toLowerCase() === email
              );
              const lastMsg = threadMsgs[threadMsgs.length - 1];

              return (
                <button
                  key={email}
                  onClick={() => setSelectedClientEmail(email)}
                  className={`w-full p-3 text-left transition-colors flex items-start space-x-2.5 ${
                    isSelected ? "bg-[#D4AF37]/15 border-l-2 border-[#D4AF37]" : "hover:bg-white/5"
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFDF73] to-[#D4AF37] text-black font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs truncate">{email}</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                      {lastMsg ? lastMsg.message : "Start communication..."}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Conversation */}
        <div className="md:col-span-2 glass-card rounded-2xl border border-white/10 bg-black/60 flex flex-col overflow-hidden">
          
          {/* Thread Header */}
          <div className="p-3 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFDF73] font-bold flex items-center justify-center text-xs">
                {selectedClientEmail.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-white text-xs flex items-center space-x-2">
                  <span>{selectedClientEmail}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  Replying as: DevMode Engineering Director
                </div>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeThread.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 text-xs space-y-2">
                <MessageSquare className="w-8 h-8 text-[#D4AF37]/40" />
                <p>No messages in this client thread yet.</p>
                <p className="text-[10px] text-neutral-600">Send an onboarding greeting or milestone update below.</p>
              </div>
            ) : (
              activeThread.map((msg) => {
                const isDev = msg.isFromDevMode;
                return (
                  <div key={msg.id} className={`flex ${isDev ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                      isDev
                        ? "bg-[#D4AF37] text-black font-medium shadow-md"
                        : "glass-card text-neutral-200 border border-white/10 bg-[#16120C]"
                    }`}>
                      <div className="flex items-center justify-between text-[10px] opacity-75 font-mono">
                        <span className="font-bold">{isDev ? "DevMode Director" : msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Reply Suggestions */}
          <div className="px-3 py-1.5 border-t border-white/5 bg-black/40 flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-[10px]">
            <span className="text-neutral-500 shrink-0">Quick reply:</span>
            <button
              onClick={() => handleQuickReply("Your bespoke website deployment is live and passing all 99+ Core Web Vitals checks!")}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-[#FFDF73] shrink-0 font-mono"
            >
              Deployment Live
            </button>
            <button
              onClick={() => handleQuickReply("We have updated your project timeline sprint. Please review the new milestone in your dashboard.")}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 shrink-0 font-mono"
            >
              Milestone Update
            </button>
            <button
              onClick={() => handleQuickReply("Your staging preview URL and administrative CMS access token have been provisioned in your Websites section.")}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 shrink-0 font-mono"
            >
              CMS Access Ready
            </button>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="p-3 border-t border-white/10 bg-black/50 flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Send message to ${selectedClientEmail}...`}
              className="flex-1 px-4 py-2.5 bg-black/80 border border-white/15 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-4 py-2.5 gold-gradient-bg text-black font-bold text-xs rounded-xl flex items-center space-x-1.5 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
            >
              <span>Reply</span>
              <Send className="w-3 h-3" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
