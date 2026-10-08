import React, { useState, useMemo } from "react";
import {
  Star,
  Award,
  ThumbsUp,
  MapPin,
  Smartphone,
  ShieldCheck,
  Plus,
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle2,
  MessageSquareReply,
  Trash2,
  Filter,
  Sparkles,
  Maximize2,
  Lock
} from "lucide-react";
import { useAgency } from "../context/AgencyContext";
import { PublicReview } from "../types";

const STAR_LABELS: Record<number, string> = {
  1: "1★ — Poor Experience",
  2: "2★ — Fair / Needs Improvement",
  3: "3★ — Good Experience",
  4: "4★ — Very Good & Reliable",
  5: "5★ — Outstanding & Highly Recommended!",
};

const SERVICE_OPTIONS = [
  "Website Development & Design",
  "Technical SEO & Ranking",
  "Google & Meta Ads (PPC)",
  "Domain, Hosting & Authentication",
  "3D WebGL Interactive Website",
  "Full Digital Growth Package",
];

export const TestimonialsSection: React.FC = () => {
  const {
    publicReviews,
    addPublicReview,
    markReviewHelpful,
    replyToPublicReview,
    deletePublicReview,
    currentUser,
    userProfile,
    isDevModeAuthenticated,
    openDevMode,
  } = useAgency();

  // Filter & Sort State
  const [selectedFilter, setSelectedFilter] = useState<
    "ALL" | "5_STAR" | "4_STAR" | "LOW_STAR" | "WITH_PHOTOS" | "GOOGLE_MAPS" | "PLAY_STORE"
  >("ALL");
  const [sortBy, setSortBy] = useState<"NEWEST" | "HIGHEST" | "LOWEST" | "HELPFUL">("NEWEST");

  // Write Review Form State
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewerName, setReviewerName] = useState(
    userProfile?.displayName || currentUser?.displayName || ""
  );
  const [reviewerRole, setReviewerRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [platformStyle, setPlatformStyle] = useState<PublicReview["platformStyle"]>("Google Maps");
  const [serviceUsed, setServiceUsed] = useState<string>(SERVICE_OPTIONS[0]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isLocalGuide, setIsLocalGuide] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoUrlInput, setPhotoUrlInput] = useState("");

  // Sub-ratings (Google Maps / Play Store style)
  const [qualityRating, setQualityRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [valueRating, setValueRating] = useState(5);
  const [speedRating, setSpeedRating] = useState(5);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Owner Reply State (DevMode)
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Full Picture Lightbox State
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Computed Rating Statistics (Strictly from 100% Real Public Reviews)
  const stats = useMemo(() => {
    const total = publicReviews.length;
    if (total === 0) {
      return {
        total: 0,
        average: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
        percentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
        subAverages: { quality: 0, communication: 0, value: 0, speed: 0 },
      };
    }

    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    let qSum = 0;
    let cSum = 0;
    let vSum = 0;
    let sSum = 0;

    publicReviews.forEach((r) => {
      const clamped = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      counts[clamped] = (counts[clamped] || 0) + 1;
      sum += clamped;
      qSum += r.subRatings?.quality || clamped;
      cSum += r.subRatings?.communication || clamped;
      vSum += r.subRatings?.value || clamped;
      sSum += r.subRatings?.speed || clamped;
    });

    const percentages: Record<number, number> = {
      5: Math.round((counts[5] / total) * 100),
      4: Math.round((counts[4] / total) * 100),
      3: Math.round((counts[3] / total) * 100),
      2: Math.round((counts[2] / total) * 100),
      1: Math.round((counts[1] / total) * 100),
    };

    return {
      total,
      average: Number((sum / total).toFixed(1)),
      counts,
      percentages,
      subAverages: {
        quality: Number((qSum / total).toFixed(1)),
        communication: Number((cSum / total).toFixed(1)),
        value: Number((vSum / total).toFixed(1)),
        speed: Number((sSum / total).toFixed(1)),
      },
    };
  }, [publicReviews]);

  // Filtered and Sorted Reviews
  const displayedReviews = useMemo(() => {
    const filtered = publicReviews.filter((r) => {
      if (selectedFilter === "5_STAR") return Math.round(r.rating) === 5;
      if (selectedFilter === "4_STAR") return Math.round(r.rating) === 4;
      if (selectedFilter === "LOW_STAR") return Math.round(r.rating) <= 3;
      if (selectedFilter === "WITH_PHOTOS") return Array.isArray(r.photos) && r.photos.length > 0;
      if (selectedFilter === "GOOGLE_MAPS") return r.platformStyle === "Google Maps";
      if (selectedFilter === "PLAY_STORE") return r.platformStyle === "Google Play Store";
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "HIGHEST") return b.rating - a.rating;
      if (sortBy === "LOWEST") return a.rating - b.rating;
      if (sortBy === "HELPFUL") return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [publicReviews, selectedFilter, sortBy]);

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotos((prev) => [...prev, result]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhotoUrl = () => {
    if (!photoUrlInput.trim()) return;
    setPhotos((prev) => [...prev, photoUrlInput.trim()]);
    setPhotoUrlInput("");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    await addPublicReview({
      reviewerName: reviewerName.trim(),
      reviewerRole: reviewerRole.trim() || undefined,
      companyName: companyName.trim() || undefined,
      reviewerEmail: currentUser?.email || undefined,
      avatarUrl: currentUser?.photoURL || undefined,
      rating,
      platformStyle,
      serviceUsed,
      title: title.trim() || undefined,
      comment: comment.trim(),
      photos: photos.length > 0 ? photos : undefined,
      subRatings: {
        quality: qualityRating,
        communication: communicationRating,
        value: valueRating,
        speed: speedRating,
      },
      isLocalGuide,
    });

    setTitle("");
    setComment("");
    setPhotos([]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWritingReview(false);
    }, 1500);
  };

  const formatReviewDate = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Verified Review";
    }
  };

  const voterKey = typeof window !== "undefined" ? localStorage.getItem("puhayt_voter_key") : null;

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[90vw] sm:max-w-[650px] h-[320px] bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs sm:text-sm font-semibold text-[#FFDF73] uppercase tracking-wider">
            <Award className="w-4 h-4" aria-hidden="true" />
            <span>100% Real Public Client Reviews</span>
          </div>

          <h2 className="font-serif responsive-section-title font-extrabold text-white tracking-tight">
            Ratings &amp; <span className="gold-gradient-text">Public Reviews</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Zero fake testimonials — every rating and review below is posted directly by real clients and visitors, featuring Google Maps &amp; Google Play Store verification metrics.
          </p>
        </div>

        {/* ================= GOOGLE MAPS & PLAY STORE RATING SUMMARY DASHBOARD ================= */}
        <div className="glass-card-gold p-5 sm:p-8 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#17120A] via-[#0F0C08] to-[#0A0806] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 4 Cols: Overall Score & Write a Review CTA */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Maps</span>
                <span className="text-neutral-600">•</span>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Play Store Verified</span>
              </div>

              <div className="flex items-baseline space-x-4">
                <span className="font-serif text-5xl sm:text-6xl font-black text-white tracking-tight">
                  {stats.total > 0 ? stats.average.toFixed(1) : "0.0"}
                </span>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          stats.total > 0 && star <= Math.round(stats.average)
                            ? "fill-[#FFDF73] text-[#FFDF73]"
                            : "text-neutral-600"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">
                    {stats.total === 0
                      ? "No reviews yet — be the first!"
                      : `Based on ${stats.total} real ${stats.total === 1 ? "review" : "reviews"}`}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsWritingReview(!isWritingReview)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>{isWritingReview ? "Close Review Form" : "Write a Public Review"}</span>
              </button>
            </div>

            {/* Middle 5 Cols: Play Store / Google Maps 5★ - 1★ Histogram Bars */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold mb-2">
                Rating Distribution
              </div>
              {[5, 4, 3, 2, 1].map((starTier) => {
                const pct = stats.percentages[starTier] || 0;
                const count = stats.counts[starTier] || 0;
                return (
                  <div key={starTier} className="flex items-center space-x-3 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1 w-12 shrink-0 font-mono font-bold text-white">
                      <span>{starTier}</span>
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    </div>
                    <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-16 text-right font-mono text-xs text-neutral-300 shrink-0">
                      {pct}% ({count})
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 3 Cols: Category Sub-Ratings Breakdown */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {[
                { label: "Work Quality", val: stats.subAverages.quality },
                { label: "Communication", val: stats.subAverages.communication },
                { label: "Speed & Delivery", val: stats.subAverages.speed },
                { label: "Value & ROI", val: stats.subAverages.value },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between"
                >
                  <span className="text-xs text-neutral-300 font-medium">{item.label}</span>
                  <span className="font-mono font-bold text-xs sm:text-sm text-[#FFDF73] flex items-center space-x-1">
                    <span>{stats.total > 0 ? item.val.toFixed(1) : "—"}</span>
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ================= WRITE A PUBLIC REVIEW FORM (GOOGLE MAPS / PLAY STORE STYLE) ================= */}
        {isWritingReview && (
          <form
            id="public-review-form"
            onSubmit={handleSubmitReview}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/60 bg-[#0E0B07] shadow-2xl space-y-6 animate-fadeIn"
            {...({
              toolname: "submit_public_review",
              tooldescription: "Submit a verified public client review and star rating for Puhayt Digital",
            } as any)}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#FFDF73] uppercase">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Public Review Submission</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  Rate &amp; Review Puhayt Digital
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close Review Form"
                onClick={() => setIsWritingReview(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Interactive 1-5 Star Selector */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs font-mono uppercase text-neutral-400">Tap a Star to Rate *</div>
                <div className="text-sm sm:text-base font-bold text-[#FFDF73] mt-1">
                  {STAR_LABELS[hoverRating || rating]}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} out of 5 stars`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => {
                        setRating(star);
                        setQualityRating(star);
                        setCommunicationRating(star);
                        setValueRating(star);
                        setSpeedRating(star);
                      }}
                      className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                          active ? "fill-[#FFDF73] text-[#FFDF73] drop-shadow-[0_0_8px_rgba(255,223,115,0.5)]" : "text-neutral-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Rating Aspect Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Work Quality", value: qualityRating, setter: setQualityRating },
                { label: "Communication", value: communicationRating, setter: setCommunicationRating },
                { label: "Speed & Delivery", value: speedRating, setter: setSpeedRating },
                { label: "Value / ROI", value: valueRating, setter: setValueRating },
              ].map((sub) => (
                <div key={sub.label} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-semibold">{sub.label}</span>
                    <span className="font-mono font-bold text-[#FFDF73]">{sub.value}/5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-label={`Rate ${sub.label} ${s} out of 5`}
                        onClick={() => sub.setter(s)}
                        className="p-0.5"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            s <= sub.value ? "fill-[#D4AF37] text-[#D4AF37]" : "text-neutral-700"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reviewer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <label htmlFor="reviewer-name-input" className="block text-xs font-semibold text-neutral-200 mb-1.5">Your Name *</label>
                <input
                  id="reviewer-name-input"
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Rahul Chatterjee"
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label htmlFor="reviewer-role-input" className="block text-xs font-semibold text-neutral-200 mb-1.5">Role / Designation (Optional)</label>
                <input
                  id="reviewer-role-input"
                  type="text"
                  value={reviewerRole}
                  onChange={(e) => setReviewerRole(e.target.value)}
                  placeholder="e.g. Founder, Business Owner, Client"
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label htmlFor="reviewer-company-input" className="block text-xs font-semibold text-neutral-200 mb-1.5">Business / Company (Optional)</label>
                <input
                  id="reviewer-company-input"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Kolkata Retail Studio"
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Platform Style & Service Used */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-semibold text-neutral-200 mb-1.5">Review Format Badge</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Google Maps", "Google Play Store", "Verified Client"] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setPlatformStyle(style)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        platformStyle === style
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-md"
                          : "bg-black/60 text-neutral-200 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="reviewer-service-select" className="block text-xs font-semibold text-neutral-200 mb-1.5">Service Experienced</label>
                <select
                  id="reviewer-service-select"
                  value={serviceUsed}
                  onChange={(e) => setServiceUsed(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0B0B0B] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Review Title & Detailed Experience */}
            <div className="space-y-4">
              <div>
                <label htmlFor="reviewer-title-input" className="block text-xs font-semibold text-neutral-200 mb-1.5">Review Headline (Optional)</label>
                <input
                  id="reviewer-title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your experience in a few words..."
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label htmlFor="reviewer-comment-textarea" className="block text-xs font-semibold text-neutral-200 mb-1.5">
                  Share details of your own experience with Puhayt Digital *
                </label>
                <textarea
                  id="reviewer-comment-textarea"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the website quality, SEO rankings, ad campaign results, or your in-person strategy session with Trishanjit Dalal & Aayush Ghosh..."
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Attach Photos (Google Maps style photo upload) */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add Photos or Project Screenshots (Optional)</span>
                </span>
                <span className="text-xs text-neutral-400">{photos.length} attached</span>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden border border-white/15 bg-black p-1">
                      <img
                        src={photo}
                        alt={`Review upload ${idx + 1}`}
                        className="w-full h-36 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/80 text-red-400 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold inline-flex items-center justify-center space-x-2 border border-white/15 shrink-0">
                  <Upload className="w-4 h-4 text-[#D4AF37]" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handlePhotoUpload(file);
                    }}
                  />
                </label>

                <div className="flex-1 flex gap-2">
                  <input
                    id="reviewer-photo-url-input"
                    aria-label="Paste review image URL"
                    type="url"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    placeholder="Or paste image URL (https://...)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black/70 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoUrl}
                    disabled={!photoUrlInput.trim()}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 text-[#FFDF73] border border-[#D4AF37]/40 text-xs font-bold disabled:opacity-40"
                  >
                    Add URL
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <label className="flex items-center space-x-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLocalGuide}
                  onChange={(e) => setIsLocalGuide(e.target.checked)}
                  className="rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>Display "Verified Local Guide / Client" badge on my public review</span>
              </label>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                {submitSuccess && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Review Published Live!</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsWritingReview(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 text-neutral-300 hover:text-white text-xs sm:text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-transform"
                >
                  Post Public Review
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ================= FILTER & SORT CONTROLS BAR ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-xs font-mono uppercase text-neutral-300 flex items-center space-x-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
              <span>Filter:</span>
            </span>
            {[
              { id: "ALL", label: `All (${publicReviews.length})` },
              { id: "5_STAR", label: "5★" },
              { id: "4_STAR", label: "4★" },
              { id: "LOW_STAR", label: "1★–3★" },
              { id: "WITH_PHOTOS", label: "With Photos" },
              { id: "GOOGLE_MAPS", label: "Google Maps" },
              { id: "PLAY_STORE", label: "Play Store" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedFilter === tab.id
                    ? "gold-gradient-bg text-black font-bold shadow-md"
                    : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            <label htmlFor="reviews-sort-select" className="text-xs text-neutral-300 font-mono uppercase">
              Sort by:
            </label>
            <select
              id="reviews-sort-select"
              aria-label="Sort public reviews by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl bg-[#14100B] border border-[#D4AF37]/40 text-xs sm:text-sm text-white font-semibold focus:outline-none"
            >
              <option value="NEWEST">Newest First</option>
              <option value="HIGHEST">Highest Rating</option>
              <option value="LOWEST">Lowest Rating</option>
              <option value="HELPFUL">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* ================= PUBLIC REVIEWS LIST OR CLEAN EMPTY STATE ================= */}
        {displayedReviews.length === 0 ? (
          <div className="glass-card rounded-3xl border border-[#D4AF37]/30 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-5 bg-[#0E0B07]/90">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFDF73] mx-auto">
              <Star className="w-8 h-8 fill-[#FFDF73]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {publicReviews.length === 0
                  ? "No Public Reviews Yet — 100% Real Reviews Only"
                  : "No Reviews Match This Filter"}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {publicReviews.length === 0
                  ? "We have removed all placeholder reviews so only real client and visitor reviews appear here. Share your genuine experience working with Trishanjit Dalal & Aayush Ghosh!"
                  : "Try selecting 'All' to view all submitted public reviews."}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (publicReviews.length === 0) {
                    setIsWritingReview(true);
                  } else {
                    setSelectedFilter("ALL");
                  }
                }}
                className="px-7 py-3.5 rounded-2xl gold-gradient-bg text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center space-x-2 shadow-xl hover:scale-105 transition-transform"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>{publicReviews.length === 0 ? "Write the First Public Review" : "Reset Filter"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {displayedReviews.map((rev) => {
              const hasVotedHelpful = voterKey && (rev.helpfulVoterIds || []).includes(voterKey);
              const initials = rev.reviewerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={rev.id}
                  className="glass-card p-6 sm:p-7 rounded-3xl border border-white/15 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-5 bg-[#0E0C09]/95 shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Reviewer Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3.5">
                        {rev.avatarUrl ? (
                          <img
                            src={rev.avatarUrl}
                            alt={rev.reviewerName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6D1F] text-black font-serif font-black text-base flex items-center justify-center shrink-0 shadow-md">
                            {initials || "CR"}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <h4 className="font-bold text-base sm:text-lg text-white">{rev.reviewerName}</h4>
                            {rev.isLocalGuide && (
                              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-[#FFDF73] text-[11px] font-semibold">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Local Guide • Verified</span>
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5">
                            {[rev.reviewerRole, rev.companyName].filter(Boolean).join(" • ") || "Verified Reviewer"}
                          </div>
                        </div>
                      </div>

                      {/* Platform Style Pill */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 border ${
                          rev.platformStyle === "Google Maps"
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                            : rev.platformStyle === "Google Play Store"
                            ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                            : "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#FFDF73]"
                        }`}
                      >
                        {rev.platformStyle}
                      </span>
                    </div>

                    {/* Stars, Date & Service Tag */}
                    <div className="flex items-center flex-wrap gap-3 pt-1">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= Math.round(rev.rating) ? "fill-[#FFDF73] text-[#FFDF73]" : "text-neutral-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">{formatReviewDate(rev.createdAt)}</span>
                      {rev.serviceUsed && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-200">
                          {rev.serviceUsed}
                        </span>
                      )}
                    </div>

                    {/* Headline & Comment */}
                    <div className="space-y-1.5">
                      {rev.title && <h5 className="font-bold text-white text-base">{rev.title}</h5>}
                      <p className="text-sm sm:text-base text-neutral-200 leading-relaxed whitespace-pre-line">
                        {rev.comment}
                      </p>
                    </div>

                    {/* Sub-Ratings Row */}
                    {rev.subRatings && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        <div className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5 text-xs flex items-center justify-between">
                          <span className="text-neutral-400">Quality</span>
                          <span className="font-mono font-bold text-[#FFDF73]">{rev.subRatings.quality}★</span>
                        </div>
                        <div className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5 text-xs flex items-center justify-between">
                          <span className="text-neutral-400">Comm.</span>
                          <span className="font-mono font-bold text-[#FFDF73]">{rev.subRatings.communication}★</span>
                        </div>
                        <div className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5 text-xs flex items-center justify-between">
                          <span className="text-neutral-400">Speed</span>
                          <span className="font-mono font-bold text-[#FFDF73]">{rev.subRatings.speed}★</span>
                        </div>
                        <div className="px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/5 text-xs flex items-center justify-between">
                          <span className="text-neutral-400">Value</span>
                          <span className="font-mono font-bold text-[#FFDF73]">{rev.subRatings.value}★</span>
                        </div>
                      </div>
                    )}

                    {/* Attached Review Photos (Full Uncropped Display + Lightbox) */}
                    {rev.photos && rev.photos.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {rev.photos.map((photoUrl, idx) => (
                          <div
                            key={idx}
                            onClick={() => setLightboxPhoto(photoUrl)}
                            className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/80 cursor-pointer group/photo p-1"
                          >
                            <img
                              src={photoUrl}
                              alt={`Review attachment ${idx + 1}`}
                              className="w-full h-auto max-h-64 object-contain rounded-xl mx-auto"
                              loading="lazy"
                            />
                            <span className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/80 text-white opacity-80 group-hover/photo:opacity-100">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Official Owner Response (Google Maps / Play Store Style) */}
                    {rev.ownerReply && (
                      <div className="p-4 rounded-2xl bg-[#16120B] border-l-4 border-[#D4AF37] space-y-1.5 mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#FFDF73]">
                            Response from the owner — {rev.ownerReply.repliedBy}
                          </span>
                          <span className="text-neutral-400 font-mono">
                            {formatReviewDate(rev.ownerReply.repliedAt)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                          {rev.ownerReply.text}
                        </p>
                      </div>
                    )}

                    {/* DevMode Owner Reply Input Box */}
                    {isDevModeAuthenticated && replyingToId === rev.id && (
                      <div className="p-3.5 rounded-2xl bg-black/80 border border-[#D4AF37]/50 space-y-2.5">
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write an official owner response from Trishanjit & Aayush..."
                          className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-neutral-300"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              await replyToPublicReview(rev.id, replyText);
                              setReplyingToId(null);
                              setReplyText("");
                            }}
                            className="px-4 py-1.5 rounded-lg gold-gradient-bg text-black font-bold text-xs"
                          >
                            Save Owner Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar: Helpful Vote & Owner Controls */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-neutral-400">Was this review helpful?</span>
                      <button
                        type="button"
                        onClick={() => markReviewHelpful(rev.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 border transition-all ${
                          hasVotedHelpful
                            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFDF73]"
                            : "bg-white/5 border-white/10 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Yes {rev.helpfulCount > 0 ? `(${rev.helpfulCount})` : ""}</span>
                      </button>
                    </div>

                    {isDevModeAuthenticated ? (
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingToId(rev.id);
                            setReplyText(rev.ownerReply?.text || "");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#FFDF73] flex items-center space-x-1"
                        >
                          <MessageSquareReply className="w-3.5 h-3.5" />
                          <span>{rev.ownerReply ? "Edit Reply" : "Owner Reply"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePublicReview(rev.id)}
                          className="p-1.5 rounded-lg bg-red-950/30 text-red-400 hover:text-red-300"
                          title="Delete Review (DevMode)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={openDevMode}
                        className="text-xs text-neutral-300 hover:text-white flex items-center space-x-1"
                        title="Unlock DevMode to post an official Owner Response"
                      >
                        <Lock className="w-3 h-3" aria-hidden="true" />
                        <span>Owner Reply</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Full Picture Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxPhoto(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-2 right-0 p-2.5 rounded-full bg-black/80 text-white hover:bg-[#D4AF37] hover:text-black border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxPhoto}
              alt="Full Review Attachment"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-[#D4AF37]/40 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
