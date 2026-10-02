import React from "react";
import { Sparkles, Building2, Stethoscope, Landmark, ShoppingBag, Car, Scale, Shield, Rocket, Gem, Utensils, Plane, HardHat, GraduationCap } from "lucide-react";

export const IndustriesSection: React.FC = () => {
  const industries = [
    { name: "Luxury Real Estate", icon: Building2, desc: "High-net-worth lead gen & 3D property walkthroughs" },
    { name: "Healthcare & AI Medicine", icon: Stethoscope, desc: "Patient intake automation & medical SEO rank #1" },
    { name: "Finance & Fintech", icon: Landmark, desc: "Compliance-ready Google Ads & institutional investment funnels" },
    { name: "E-Commerce & Luxury Retail", icon: ShoppingBag, desc: "Sub-second headless Shopify stores & 8x ROAS Meta ads" },
    { name: "Automotive & Electric Vehicles", icon: Car, desc: "3D supercar configurators & test-drive booking portals" },
    { name: "Legal & Law Firms", icon: Scale, desc: "High-intent case acquisition & local map pack supremacy" },
    { name: "Tech & SaaS Startups", icon: Rocket, desc: "Product-led growth UI, conversion landing pages & B2B PPC" },
    { name: "Luxury Brands & Jewelry", icon: Gem, desc: "High-fashion visual identity & VIP exclusive client portals" },
    { name: "Hospitality & Hotels", icon: Utensils, desc: "Direct booking engines & localized Meta influencer campaigns" }
  ];

  return (
    <section className="py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Domain Expertise</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Industries We <span className="gold-gradient-text">Dominate</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
            We build specialized growth engines tailored to the exact buyer psychology and regulatory requirements of your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl gold-gradient-bg p-[1px] mb-4">
                  <div className="w-full h-full bg-[#0B0B0B] rounded-[11px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {ind.name}
                </h3>

                <p className="text-xs text-neutral-400 font-light mt-1.5 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
