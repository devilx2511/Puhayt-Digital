import React from "react";
import { BLOG_POSTS } from "../data/agencyData";
import { Sparkles, ArrowRight, Clock, User } from "lucide-react";

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEO & Digital Strategy Insights</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest Industry <span className="gold-gradient-text">Articles</span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
            Stay ahead of search algorithm updates, AI marketing trends, and modern conversion tactics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[11px] text-[#D4AF37]">
                    <span className="font-bold uppercase tracking-wider">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center text-neutral-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[11px] text-neutral-300 font-medium">{post.author.name}</div>
                  </div>

                  <button className="text-xs font-semibold text-[#D4AF37] hover:text-white flex items-center space-x-1 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
