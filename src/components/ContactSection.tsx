import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { executeRecaptcha, RECAPTCHA_SITE_KEY } from "../utils/recaptcha";
import { Sparkles, Send, Phone, Mail, MapPin, Calendar, CheckCircle2, MessageSquare, ArrowRight, Instagram, ShieldCheck } from "lucide-react";

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = "" }) => {
  const { contactInfo, addLead } = useAgency();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: initialService || "Corporate 3D Website & Full-Stack Growth",
    budget: "₹10,000 - ₹25,000 / mo",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);

    try {
      // Execute Google reCAPTCHA Enterprise verification
      const recaptchaToken = await executeRecaptcha("submit");

      // Send to server-side lead pipeline with reCAPTCHA token assessment
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          token: recaptchaToken,
          recaptchaAction: "submit",
        }),
      }).catch((err) => console.warn("Background API lead submission notice:", err));

      addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
      });

      setSubmitted(true);
      import("canvas-confetti")
        .then((mod: any) => {
          const confettiFn = typeof mod.default === "function" ? mod.default : mod;
          if (typeof confettiFn === "function") {
            confettiFn({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#D4AF37", "#FFFFFF", "#B8860B"],
            });
          }
        })
        .catch(() => {});
    } catch (err) {
      console.error("Failed to submit form", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const primaryEmail = contactInfo.emails[0] || "growth@puhayt.digital";
  const primaryPhone = contactInfo.phones[0] || "+91 7044811476";
  const primaryWhatsapp = contactInfo.whatsapps[0] || "+91 7044811476";

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] sm:text-xs font-semibold text-[#FFDF73] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ready To Scale Your Brand?</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            Start Your <span className="gold-gradient-text">Project</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Fill out the strategy request form below or connect directly with our agency leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Left Contact Form */}
          <div className="lg:col-span-7 glass-card p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 space-y-5 sm:space-y-6">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto text-[#0B0B0B]">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Strategy Request Captured!
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#FFDF73] font-bold">{formData.name}</span>. Our growth director will review your specs and contact you at <span className="text-white font-medium">{formData.email}</span> within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 glass-card-gold text-[#FFDF73] text-xs font-bold rounded-full border border-[#D4AF37]/40"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                id="demo-form"
                onSubmit={handleSubmit}
                className="space-y-4"
                {...({
                  toolname: "submit_strategy_inquiry",
                  tooldescription: "Submit a digital marketing, 3D web development, or SEO inquiry to Puhayt Digital",
                } as any)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-full-name" className="block text-xs font-semibold text-neutral-200 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-full-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Aayush Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-200 mb-1">
                      Corporate Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="aayushcps0907@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-neutral-200 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-semibold text-neutral-200 mb-1">
                      Company / Brand Name
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Apex Global"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-neutral-200 mb-1">
                      Primary Capability Needed
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      aria-label="Primary Capability Needed"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Corporate 3D Website & Full-Stack Growth">Corporate 3D Website &amp; Growth</option>
                      <option value="Omnichannel SEO & Organic Search Domination">Omnichannel SEO Domination</option>
                      <option value="Google & Meta Performance Ads Scaling">Google &amp; Meta Ads Scaling</option>
                      <option value="AI Chatbots & CRM Workflow Automation">AI Chatbots &amp; CRM Automation</option>
                      <option value="Complete Brand Identity & Guidelines">Brand Identity &amp; UI/UX</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-semibold text-neutral-200 mb-1">
                      Target Monthly Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      aria-label="Target Monthly Budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="₹10,000 - ₹25,000 / mo">₹10,000 - ₹25,000 / mo</option>
                      <option value="₹25,000 - ₹50,000 / mo">₹25,000 - ₹50,000 / mo</option>
                      <option value="₹50,000+ / mo">₹50,000+ / mo (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-200 mb-1">
                    Project Goals &amp; Details
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Describe your current revenue goals, target audience, and digital marketing pain points..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 gold-gradient-bg text-[#0B0B0B] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center space-x-2 g-recaptcha"
                  data-sitekey={RECAPTCHA_SITE_KEY}
                  data-callback="onSubmit"
                  data-action="submit"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{loading ? "Verifying & Submitting..." : "Submit Strategy Inquiry"}</span>
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-neutral-300 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  <span>Protected by Google reCAPTCHA Enterprise</span>
                </div>
              </form>
            )}

          </div>

          {/* Right Direct Channels & Calendly Booking Card */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Calendly Booking Card */}
            <div className="glass-card-gold p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/40 space-y-3.5 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">Book 1-on-1 Strategy Call</h3>
                  <p className="text-[10px] sm:text-[11px] text-neutral-300">30-Min Executive Session with Puhayt Digital</p>
                </div>
              </div>

              <p className="text-xs text-neutral-200 font-light leading-relaxed">
                Prefer to discuss your expansion plans live? Choose a time directly on our partners' schedule.
              </p>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 sm:py-3 glass-card text-xs font-bold text-white rounded-xl border border-white/20 hover:border-[#D4AF37] flex items-center justify-center space-x-2 transition-all block text-center"
              >
                <span>Open Calendly Booking</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              </a>
            </div>

            {/* Direct Contact Channels */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Direct Channels</h3>
                <span className="text-[10px] text-[#FFDF73] font-mono">Live Updated</span>
              </div>
              
              <div className="space-y-3 text-xs">
                {/* Emails */}
                {contactInfo.emails && contactInfo.emails.length > 0 ? (
                  contactInfo.emails.map((em, idx) => (
                    <a
                      key={`em-${idx}`}
                      href={`mailto:${em}`}
                      className="flex items-center space-x-3 text-neutral-200 hover:text-white transition-colors group py-0.5"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span className="truncate">{em}</span>
                    </a>
                  ))
                ) : (
                  <a
                    href={`mailto:${primaryEmail}`}
                    className="flex items-center space-x-3 text-neutral-200 hover:text-white transition-colors py-0.5"
                  >
                    <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
                    <span>{primaryEmail}</span>
                  </a>
                )}

                {/* Direct Calling Phones */}
                {contactInfo.phones && contactInfo.phones.length > 0 ? (
                  contactInfo.phones.map((ph, idx) => (
                    <a
                      key={`ph-${idx}`}
                      href={`tel:${ph.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center space-x-3 text-neutral-200 hover:text-white transition-colors group py-0.5"
                    >
                      <Phone className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>{ph}</span>
                    </a>
                  ))
                ) : (
                  <a
                    href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center space-x-3 text-neutral-200 hover:text-white transition-colors py-0.5"
                  >
                    <Phone className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                    <span>{primaryPhone}</span>
                  </a>
                )}

                {/* WhatsApp Direct */}
                {contactInfo.whatsapps && contactInfo.whatsapps.length > 0 ? (
                  contactInfo.whatsapps.map((wa, idx) => (
                    <a
                      key={`wa-${idx}`}
                      href={`https://wa.me/${wa.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Puhayt Digital! I would like to discuss a new digital growth project.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-neutral-200 hover:text-emerald-400 transition-colors group py-0.5"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>WhatsApp: {wa}</span>
                    </a>
                  ))
                ) : (
                  <a
                    href={`https://wa.me/${primaryWhatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Puhayt Digital! I would like to discuss a new digital growth project.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-neutral-200 hover:text-emerald-400 transition-colors py-0.5"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>WhatsApp: {primaryWhatsapp}</span>
                  </a>
                )}

                {/* Instagram Profiles */}
                {contactInfo.instagrams && contactInfo.instagrams.length > 0 &&
                  contactInfo.instagrams.map((insta, idx) => {
                    const cleanHandle = insta.replace("@", "").trim();
                    const instaUrl = insta.startsWith("http") ? insta : `https://www.instagram.com/${cleanHandle}/`;
                    return (
                      <a
                        key={`ig-${idx}`}
                        href={instaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-neutral-200 hover:text-pink-400 transition-colors group py-0.5"
                      >
                        <Instagram className="w-4 h-4 text-pink-400 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                        <span>Instagram: {insta}</span>
                      </a>
                    );
                  })
                }

                {/* Physical HQ Address */}
                {contactInfo.address && (
                  <div className="pt-2 border-t border-white/10 flex items-start space-x-3 text-neutral-300">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed text-[11px]">{contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
