import React, { useState } from "react";
import { useAgency } from "../../context/AgencyContext";
import { BlogPost } from "../../types";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Save,
  X,
  Clock,
  Calendar,
  User,
  RotateCcw,
  FileText,
} from "lucide-react";

const CATEGORY_PRESETS = [
  "SEO",
  "Web Design",
  "AI Marketing",
  "PPC & Ads",
  "Growth",
  "Case Study",
  "Digital Strategy",
];

export const BlogArticlesManager: React.FC = () => {
  const {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    restoreDefaultBlogPosts,
    teamMembers,
  } = useAgency();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SEO");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [publishedAt, setPublishedAt] = useState(() =>
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  );
  const [readTime, setReadTime] = useState("5 min read");
  const [image, setImage] = useState("");
  const [authorName, setAuthorName] = useState("Aayush Ghosh");
  const [authorRole, setAuthorRole] = useState("Co-Founder & Web/SEO Architect");
  const [authorAvatar, setAuthorAvatar] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  );

  const resetForm = () => {
    setTitle("");
    setCategory("SEO");
    setExcerpt("");
    setContent("");
    setPublishedAt(
      new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    );
    setReadTime("5 min read");
    setImage("");
    setAuthorName("Aayush Ghosh");
    setAuthorRole("Co-Founder & Web/SEO Architect");
    const aayushProfile = teamMembers.find((m) => m.name.toLowerCase().includes("aayush"));
    setAuthorAvatar(
      aayushProfile?.imageUrl ||
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    );
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleStartEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setCategory(post.category || "SEO");
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setPublishedAt(post.publishedAt || "Oct 2026");
    setReadTime(post.readTime || "5 min read");
    setImage(post.image || "");
    setAuthorName(post.author?.name || "Aayush Ghosh");
    setAuthorRole(post.author?.role || "Co-Founder & Web/SEO Architect");
    setAuthorAvatar(
      post.author?.avatar ||
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    );
    setIsAddingNew(true);
  };

  const handleCoverFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setAuthorAvatar(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const applyAuthorPreset = (preset: "aayush" | "trishanjit" | "editorial") => {
    if (preset === "aayush") {
      const aayush = teamMembers.find((m) => m.name.toLowerCase().includes("aayush"));
      setAuthorName("Aayush Ghosh");
      setAuthorRole(aayush?.roleTitle || "Co-Founder & Web/SEO Architect");
      if (aayush?.imageUrl) setAuthorAvatar(aayush.imageUrl);
    } else if (preset === "trishanjit") {
      const trishanjit = teamMembers.find((m) => m.name.toLowerCase().includes("trishanjit"));
      setAuthorName("Trishanjit Dalal");
      setAuthorRole(trishanjit?.roleTitle || "Co-Founder & Ads/Marketing Lead");
      if (trishanjit?.imageUrl) setAuthorAvatar(trishanjit.imageUrl);
    } else {
      setAuthorName("Puhayt Digital Editorial");
      setAuthorRole("Kolkata Growth & Strategy Desk");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const finalExcerpt =
      excerpt.trim() ||
      (content.trim().length > 160
        ? content.trim().substring(0, 157) + "..."
        : content.trim() || "Read our latest strategy insights and growth breakdown.");

    const finalImage =
      image.trim() ||
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";

    const payload: Omit<BlogPost, "id"> = {
      title: title.trim(),
      slug: generatedSlug || `article-${Date.now()}`,
      category: category.trim() || "SEO",
      excerpt: finalExcerpt,
      content: content.trim() || finalExcerpt,
      publishedAt: publishedAt.trim() || "Oct 2026",
      readTime: readTime.trim() || "5 min read",
      image: finalImage,
      author: {
        name: authorName.trim() || "Aayush Ghosh",
        role: authorRole.trim() || "Co-Founder & Web/SEO Architect",
        avatar:
          authorAvatar.trim() ||
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      },
    };

    if (editingId) {
      await updateBlogPost(editingId, payload);
    } else {
      await addBlogPost(payload);
    }

    resetForm();
  };

  const uniqueCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
  const filteredPosts = blogPosts.filter((p) =>
    filterCategory === "ALL" ? true : p.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>DevMode Editorial &amp; Blog CMS</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Blog &amp; Industry Articles Manager ({blogPosts.length})
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Publish, edit, or remove SEO articles, growth guides, and case studies shown in the public &ldquo;Blog&rdquo; section. Synced live across all devices.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsAddingNew(true);
            }}
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add New Blog / Article</span>
          </button>

          <button
            type="button"
            onClick={() => restoreDefaultBlogPosts()}
            className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-all"
            title="Restore sample default articles"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Restore Defaults</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setFilterCategory("ALL")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterCategory === "ALL"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
          }`}
        >
          All Articles ({blogPosts.length})
        </button>

        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              filterCategory === cat
                ? "bg-[#FFDF73] text-black shadow-md"
                : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat} ({blogPosts.filter((b) => b.category === cat).length})
          </button>
        ))}
      </div>

      {/* Add / Edit Article Form */}
      {isAddingNew && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-black/80 border border-[#D4AF37]/50 shadow-2xl space-y-5 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif text-lg font-bold text-white">
                {editingId ? "Edit Blog Article" : "Publish New Blog / Article"}
              </h4>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Article Title */}
            <div className="sm:col-span-2">
              <label className="text-neutral-300 font-semibold block mb-1">
                Article / Blog Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How Local Kolkata Businesses Can Rank #1 on Google Search in 2026"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Category Selection */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-neutral-300 font-semibold block">Category *</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCategory(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      category === preset
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : "bg-black/50 text-neutral-300 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Or type custom category..."
                className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Publish Date & Read Time */}
            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Published Date</label>
              <input
                type="text"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                placeholder="e.g. Oct 5, 2026"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Estimated Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Short Summary / Excerpt */}
            <div className="sm:col-span-2">
              <label className="text-neutral-300 font-semibold block mb-1">
                Short Summary / Card Excerpt *
              </label>
              <textarea
                required
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief 1-2 sentence hook shown on the blog card preview..."
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Full Article Content */}
            <div className="sm:col-span-2">
              <label className="text-neutral-300 font-semibold block mb-1">
                Full Article Content / Body *
              </label>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the complete article here. Use blank lines for new paragraphs and bullet points (•) for key takeaways..."
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] leading-relaxed"
              />
            </div>
          </div>

          {/* Cover Photo Upload / URL */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold text-white flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>Article Cover Photo / Banner</span>
              </div>
              <span className="text-[10px] text-neutral-400">Displayed in full without cropping</span>
            </div>

            {image && (
              <div className="p-2 rounded-xl bg-black/80 border border-white/10">
                <img
                  src={image}
                  alt="Article Cover Preview"
                  className="w-full h-auto block rounded-lg mx-auto"
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <input
                type="url"
                placeholder="Paste cover image URL (https://...)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-black/60 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#D4AF37]"
              />

              <label className="cursor-pointer inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white text-xs font-semibold shrink-0 border border-white/10">
                <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Upload Local Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCoverFileUpload(file);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Author Selection & Custom Info */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="font-bold text-white flex items-center space-x-2">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>Article Author Profile</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-neutral-400 mr-1">Quick Select:</span>
                <button
                  type="button"
                  onClick={() => applyAuthorPreset("aayush")}
                  className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#FFDF73] border border-[#D4AF37]/30 text-[11px] font-bold"
                >
                  Aayush Ghosh
                </button>
                <button
                  type="button"
                  onClick={() => applyAuthorPreset("trishanjit")}
                  className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#FFDF73] border border-[#D4AF37]/30 text-[11px] font-bold"
                >
                  Trishanjit Dalal
                </button>
                <button
                  type="button"
                  onClick={() => applyAuthorPreset("editorial")}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 text-[11px] font-semibold"
                >
                  Puhayt Editorial
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-neutral-400 block mb-1">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Author Role</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Author Avatar URL / Upload</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white min-w-0"
                  />
                  <label className="cursor-pointer p-2 rounded-xl bg-white/10 hover:bg-white/15 text-[#D4AF37] shrink-0" title="Upload Avatar">
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleAvatarFileUpload(file);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg"
            >
              <Save className="w-4 h-4 text-black" />
              <span>{editingId ? "Save Article Changes" : "Publish Article to Blog"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Existing Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {post.image && (
                <div className="rounded-xl overflow-hidden bg-black/90 border border-white/10 p-1">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto block rounded-lg mx-auto"
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFDF73] font-mono font-bold uppercase">
                  {post.category}
                </span>
                <div className="flex items-center space-x-2 text-neutral-400">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-[#D4AF37]" />
                    {post.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-[#D4AF37]" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h4 className="font-serif font-bold text-lg text-white leading-snug">
                {post.title}
              </h4>

              <p className="text-xs text-neutral-300 line-clamp-2">{post.excerpt}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                {post.author?.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#D4AF37]"
                  />
                )}
                <div>
                  <div className="text-[11px] font-bold text-white">{post.author?.name}</div>
                  <div className="text-[9px] text-neutral-400">{post.author?.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleStartEdit(post)}
                  className="p-1.5 text-neutral-300 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="Edit Article"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteBlogPost(post.id)}
                  className="p-1.5 text-red-400 hover:text-red-300 rounded-lg bg-red-950/20 hover:bg-red-950/40 transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
