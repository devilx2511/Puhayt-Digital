import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, MessageCircle, CreditCard } from "lucide-react";
import { PricingPlan } from "../types";

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const { pricingPlans, openPaymentModal, contactInfo } = useAgency();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const primaryWhatsapp = contactInfo?.whatsapps?.[0] || "+917044811476";
  const cleanWhatsapp = primaryWhatsapp.replace(/[^0-9]/g, "");

  const handleChoosePlanPayment = (plan: PricingPlan) => {
    openPaymentModal(plan, billingCycle);
    if (onSelectPlan) onSelectPlan(plan.name);
  };

  const getWhatsappUrl = (plan: PricingPlan) => {
    const cycleText = billingCycle === "yearly" ? "Yearly (Save 20%)" : "Monthly";
    const priceText = `₹${(billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly).toLocaleString("en-IN")}/mo`;
    const defaultMsg = `Hello Puhayt Digital! 👋\n\nI want to get started with the *${plan.name}* (${priceText}, ${cycleText} billing).\n\nPlease share the onboarding steps and timeline!`;
    const rawMsg = plan.whatsappMessage || defaultMsg;
    const encoded = encodeURIComponent(rawMsg);
    const targetNumber = plan.whatsappNumber ? plan.whatsappNumber.replace(/[^0-9]/g, "") : cleanWhatsapp;
    return `https://wa.me/${targetNumber}?text=${encoded}`;
  };

  return (
    <section id="pricing" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment &amp; Direct WhatsApp Booking</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            Transparent <span className="gold-gradient-text">Pricing Plans</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Choose your growth tier and send an instant pre-written WhatsApp message to our strategy team, or proceed directly with online checkout.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center justify-center space-x-3 pt-4">
            <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-white" : "text-neutral-500"}`}>
              Monthly Billing
            </span>

            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-14 h-7 glass-card rounded-full p-1 border border-[#D4AF37]/40 relative flex items-center transition-colors"
              aria-label="Toggle Billing Cycle"
            >
              <div
                className={`w-5 h-5 rounded-full gold-gradient-bg transition-transform duration-300 ${
                  billingCycle === "yearly" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <div className="flex items-center space-x-1.5">
              <span className={`text-xs font-semibold ${billingCycle === "yearly" ? "text-white" : "text-neutral-500"}`}>
                Yearly Billing
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        {pricingPlans.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center glass-card p-12 rounded-3xl border border-[#D4AF37]/30 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient-bg p-[1px] shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0B0B] rounded-[15px] flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                Custom Solutions
              </div>
              <h3 className="font-serif text-3xl font-extrabold text-white">
                Custom Pricing on Request
              </h3>
            </div>

            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-lg mx-auto">
              We provide tailored solutions suited to your specific scope and business requirements. Contact us on WhatsApp for a custom proposal.
            </p>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hi Puhayt Digital, I'd like to get a custom quote for my project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-bold text-[#0B0B0B] gold-gradient-bg hover:scale-105 transition-transform shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Custom Quote on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {pricingPlans.map((plan) => {
              const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
              const waUrl = getWhatsappUrl(plan);

              return (
                <div
                  key={plan.id}
                  className={`glass-card p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative shadow-xl ${
                    plan.popular
                      ? "border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)] bg-gradient-to-b from-[#1C160B] via-[#0B0B0B] to-[#0B0B0B]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gold-gradient-bg text-[#0B0B0B] text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider shadow-lg">
                    ★ Most Popular Choice
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-neutral-400 font-light mt-1.5 leading-relaxed">{plan.subtitle}</p>
                  </div>

                  <div className="pt-3.5 sm:pt-4 border-t border-white/10">
                    <div className="flex items-baseline space-x-1">
                      <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white gold-gradient-text">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-neutral-400 font-normal">/ month</span>
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1 font-mono">
                      {billingCycle === "yearly" ? "Billed annually • Save 20%" : "Billed month-to-month"}
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                      Included Features ({plan.features.length})
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-200">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DUAL ACTION BUTTONS: WhatsApp Automatic Message + Online Checkout */}
                <div className="pt-8 mt-8 border-t border-white/10 space-y-3">
                  
                  {/* Primary WhatsApp Action */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
                    <span>Send WhatsApp Order &amp; Message</span>
                  </a>

                  {/* Secondary Instant Online Checkout */}
                  <button
                    onClick={() => handleChoosePlanPayment(plan)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? "gold-gradient-bg text-[#0B0B0B] hover:scale-[1.02]"
                        : "glass-card text-neutral-300 hover:text-white border border-white/15 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                    <span>Pay Online &amp; Invoice</span>
                  </button>

                  <div className="text-center text-[10px] text-neutral-500 font-mono">
                    Instant response via WhatsApp (+91 {primaryWhatsapp.replace(/[^0-9]/g, "").slice(-10)})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      </div>
    </section>
  );
};
