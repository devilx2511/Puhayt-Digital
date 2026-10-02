import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICE_CATEGORIES } from "../data/agencyData";
import { Globe, TrendingUp, Palette, Bot, Check, ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>("web-dev");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-5 h-5" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "Bot":
        return <Bot className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const selectedCategory = SERVICE_CATEGORIES.find((cat) => cat.id === activeTab) || SERVICE_CATEGORIES[0];

  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Fade-in-up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mastery Across All Digital Touchpoints</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight break-words">
            Our Enterprise <span className="gold-gradient-text">Capabilities</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            We deliver bespoke, high-converting digital solutions engineered to scale your revenue and position your brand as the undisputed market leader.
          </p>
        </motion.div>

        {/* Category Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-3 rounded-full text-xs font-semibold flex items-center space-x-2.5 transition-all duration-300 ${
                activeTab === cat.id
                  ? "gold-gradient-bg text-[#0B0B0B] shadow-xl scale-105"
                  : "glass-card text-neutral-300 hover:text-white hover:border-[#D4AF37]/40"
              }`}
            >
              <span>{getIcon(cat.iconName)}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Selected Category Details Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="glass-card-gold p-6 rounded-2xl mb-10 border border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2 flex items-center space-x-2">
              <span className="text-[#D4AF37]">{getIcon(selectedCategory.iconName)}</span>
              <span>{selectedCategory.title}</span>
            </h3>
            <p className="text-sm text-neutral-300 max-w-2xl">
              {selectedCategory.description}
            </p>
          </div>

          <button
            onClick={() => onSelectService(selectedCategory.title)}
            className="px-6 py-3 rounded-full text-xs font-bold text-[#0B0B0B] gold-gradient-bg hover:scale-105 transition-transform flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Inquire About {selectedCategory.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Service Cards Grid with Staggered Fade-in-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {selectedCategory.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              className={`glass-card p-5 sm:p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group ${
                item.popular
                  ? "border-[#D4AF37]/50 shadow-2xl relative bg-gradient-to-b from-[#D4AF37]/10 to-transparent"
                  : "border-white/10 hover:border-[#D4AF37]/30"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3.5 right-6 bg-[#D4AF37] text-[#0B0B0B] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                  Most Requested
                </div>
              )}

              <div className="space-y-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  {item.tagline}
                </div>

                <h4 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.name}
                </h4>

                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => onSelectService(item.name)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white glass-card hover:bg-[#D4AF37] hover:text-[#0B0B0B] transition-all flex items-center justify-center space-x-2 group-hover:border-[#D4AF37]/50"
                >
                  <span>Request Custom Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
