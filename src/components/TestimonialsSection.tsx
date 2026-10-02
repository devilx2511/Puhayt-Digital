import React from "react";
import { TESTIMONIALS } from "../data/agencyData";
import { Star, Quote, CheckCircle2, Award } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Client Endorsements</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved By <span className="gold-gradient-text">Market Leaders</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
            Read what founders and managing directors say about our 3D web craftsmanship and campaign ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono bg-white/5 px-2.5 py-1 rounded">
                    via {t.platform}
                  </span>
                </div>

                <p className="text-xs text-neutral-200 font-light italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{t.clientName}</div>
                    <div className="text-[10px] text-neutral-400">{t.role}, {t.company}</div>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-1 rounded font-mono">
                  {t.resultsAchieved}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
