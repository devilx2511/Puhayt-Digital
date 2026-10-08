import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { BlogPost } from "../types";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  X,
  PlusCircle,
  MessageCircle,
  BookOpen,
} from "lucide-react";

export const BlogSection: React.FC = () => {
  const { blogPosts, openDevMode } = useAgency();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ["ALL", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const visiblePosts =
    selectedCategory === "ALL"
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="blog"
      className="py-16 sm:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEO &amp; Digital Strategy Insights</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest Industry <span className="gold-gradient-text">Articles &amp; Blogs</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-lg font-light leading-relaxed">
            Stay ahead of search algorithm updates, AI marketing trends, and modern conversion tactics published by our founders.
          </p>
        </div>

        {/* Category Filter & DevMode Quick Add */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "gold-gradient-bg text-black shadow-md"
                    : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                }`}
              >
                {cat === "ALL" ? "All Articles" : cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={openDevMode}
            className="px-4 py-2 rounded-full bg-[#18120B] hover:bg-[#241A0E] text-[#FFDF73] border border-[#D4AF37]/40 text-xs font-bold inline-flex items-center space-x-1.5 self-start sm:self-auto transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Add / Manage Articles in DevMode</span>
          </button>
        </div>

        {/* Blog Cards Grid */}
        {visiblePosts.length === 0 ? (
          <div className="glass-card rounded-3xl border border-[#D4AF37]/30 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 bg-[#0E0B07]/90">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              No Articles Published Yet
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Open DevMode and go to the &ldquo;Blog &amp; Articles&rdquo; tab to publish your first article or blog post.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={openDevMode}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Blog in DevMode</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActivePost(post)}
                className="glass-card rounded-3xl border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col justify-between cursor-pointer bg-[#0D0B08]/95 shadow-2xl overflow-hidden"
              >
                {/* Full Uncropped Article Cover Photo */}
                {post.image && (
                  <div className="w-full bg-[#070707] p-2 sm:p-3 border-b border-white/10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto block rounded-2xl mx-auto"
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4AF37]">
                      <span className="font-bold uppercase tracking-wider">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center text-neutral-300">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
                        {post.publishedAt}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center text-neutral-300">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFDF73] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      {post.author?.avatar && (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <div className="text-xs text-white font-semibold">{post.author?.name}</div>
                        <div className="text-[10px] text-neutral-400">{post.author?.role}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePost(post);
                      }}
                      className="text-xs font-bold text-[#FFDF73] group-hover:text-white flex items-center space-x-1.5 transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0D0B08] border border-[#D4AF37]/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#120F0C] shrink-0">
              <div className="flex items-center space-x-2 text-xs text-[#FFDF73] font-mono font-bold uppercase">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>{activePost.category}</span>
                <span>·</span>
                <span className="text-neutral-300 font-sans font-normal">{activePost.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                aria-label="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Article Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              {activePost.image && (
                <div className="rounded-2xl bg-black p-2 border border-white/10">
                  <img
                    src={activePost.image}
                    alt={activePost.title}
                    className="w-full h-auto block rounded-xl mx-auto"
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center text-[#FFDF73] font-medium">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                    Published {activePost.publishedAt}
                  </span>
                  <span>·</span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                    {activePost.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {activePost.title}
                </h2>

                <div className="flex items-center space-x-3 pt-2">
                  {activePost.author?.avatar && (
                    <img
                      src={activePost.author.avatar}
                      alt={activePost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <div className="text-sm font-bold text-white">{activePost.author?.name}</div>
                    <div className="text-xs text-[#D4AF37]">{activePost.author?.role}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/20 text-sm sm:text-base text-neutral-200 font-medium leading-relaxed">
                {activePost.excerpt}
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed whitespace-pre-line">
                {activePost.content || activePost.excerpt}
              </div>

              {/* Bottom Consultation Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif font-bold text-white text-base">
                    Want to implement this strategy for your brand?
                  </div>
                  <div className="text-xs text-neutral-400">
                    Discuss directly with Trishanjit Dalal &amp; Aayush Ghosh on WhatsApp.
                  </div>
                </div>
                <a
                  href={`https://wa.me/917044811476?text=${encodeURIComponent(
                    `Hello Puhayt Digital! I just read your article "${activePost.title}" and would like to discuss growing our business.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shrink-0 shadow-lg hover:scale-105 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
