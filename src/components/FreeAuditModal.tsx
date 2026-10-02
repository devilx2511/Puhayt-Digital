import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useAgency } from "../context/AgencyContext";
import { executeRecaptcha } from "../utils/recaptcha";
import { Sparkles, X, CheckCircle2, RefreshCw, Send, ArrowRight, ShieldCheck } from "lucide-react";

interface FreeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeAuditModal: React.FC<FreeAuditModalProps> = ({ isOpen, onClose }) => {
  const { addLead } = useAgency();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email) return;

    setLoading(true);

    try {
      // Execute Google reCAPTCHA Enterprise verification
      await executeRecaptcha("audit_submit");

      // Register lead in agency context (triggers live toast notification for agency)
      addLead({
        name: "Free Website Audit Lead",
        email,
        phone: "N/A",
        company: url,
        service: "Free Technical Website & SEO Audit",
        budget: "Free Audit",
        message: `Requested automated SEO & Web Vitals Audit report for website URL: ${url}`,
      });

      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#FFFFFF", "#B8860B"],
      });
    } catch (err) {
      console.error("Failed to process audit request", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setUrl("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="glass-card bg-[#0B0B0B] border border-[#D4AF37]/50 max-w-lg w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white glass-card rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl gold-gradient-bg p-[1px] mx-auto shadow-xl">
            <div className="w-full h-full bg-[#0B0B0B] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#D4AF37] animate-pulse" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Get Your Free <span className="gold-gradient-text">SEO & Web Audit</span>
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
            Our proprietary AI engine & senior technical SEO team will analyze your site and deliver a 12-page breakdown within 2 hours.
          </p>
        </div>

        {submitted ? (
          /* Animated Success State */
          <div className="text-center py-6 space-y-5 animate-scaleUp">
            <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto text-[#0B0B0B] shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="text-lg font-bold text-white font-serif">Audit Request Captured!</div>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                We are compiling Core Web Vitals, Schema markup, and keyword ranking potential for{" "}
                <span className="text-[#D4AF37] font-bold font-mono">{url}</span>.
              </p>
            </div>

            <div className="glass-card-gold p-4 rounded-2xl border border-[#D4AF37]/30 text-left space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Agency Notification System Triggered</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Your report is queued. Destination inbox: <strong className="text-white font-mono">{email}</strong>.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2"
            >
              <span>Done & Return to Agency</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Form Input */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Website URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://yourbrand.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Work Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 gold-gradient-bg text-[#0B0B0B] font-bold text-xs rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Audit Engine...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Free Technical Audit</span>
                </>
              )}
            </button>

            <div className="text-[10px] text-neutral-500 text-center font-mono">
              🔒 100% Confidential • No Credit Card Required
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

