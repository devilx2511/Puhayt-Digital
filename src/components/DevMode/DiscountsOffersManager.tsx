import React, { useState } from "react";
import { useAgency } from "../../context/AgencyContext";
import { DiscountOffer, DiscountOfferImage, OfferType } from "../../types";
import { 
  Gift, 
  Plus, 
  Trash2, 
  Edit2, 
  Image as ImageIcon, 
  CheckCircle2, 
  Tag, 
  Percent, 
  Upload, 
  Sparkles, 
  Save, 
  X, 
  Calendar, 
  MessageCircle, 
  Eye, 
  EyeOff,
  Dices,
  Layers,
  Check
} from "lucide-react";

export const DiscountsOffersManager: React.FC = () => {
  const { discounts, addDiscount, updateDiscount, deleteDiscount } = useAgency();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter State
  const [filterType, setFilterType] = useState<"ALL" | OfferType>("ALL");

  // Form State
  const [offerType, setOfferType] = useState<OfferType>("Offer");
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("Special Offer");
  const [discountPercentage, setDiscountPercentage] = useState("20% OFF");
  const [discountAmount, setDiscountAmount] = useState("");
  const [code, setCode] = useState("PUHAYT-OFFER");
  const [description, setDescription] = useState("");
  const [validUntil, setValidUntil] = useState("Limited Time");
  const [terms, setTerms] = useState("");
  const [active, setActive] = useState(true);
  const [images, setImages] = useState<DiscountOfferImage[]>([]);

  // New Image Input State
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");

  const generateRandomReferralCode = () => {
    return "PUHAYT-REF-" + Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const resetForm = () => {
    setOfferType("Offer");
    setTitle("");
    setBadge("Special Offer");
    setDiscountPercentage("20% OFF");
    setDiscountAmount("");
    setCode("PUHAYT-" + Math.random().toString(36).substring(2, 6).toUpperCase());
    setDescription("");
    setValidUntil("Limited Time");
    setTerms("");
    setActive(true);
    setImages([]);
    setNewImageUrl("");
    setNewImageCaption("");
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleStartEdit = (offer: DiscountOffer) => {
    setEditingId(offer.id);
    const resolvedType = offer.offerType || (offer.title.toLowerCase().includes("referral") ? "Referral" : offer.discountPercentage ? "Discount" : "Offer");
    setOfferType(resolvedType);
    setTitle(offer.title);
    setBadge(offer.badge || (resolvedType === "Referral" ? "Dynamic Referral" : resolvedType === "Discount" ? "Discount Special" : "Special Offer"));
    setDiscountPercentage(offer.discountPercentage || "");
    setDiscountAmount(offer.discountAmount || "");
    setCode(offer.code || (resolvedType === "Referral" ? generateRandomReferralCode() : "PUHAYT-OFFER"));
    setDescription(offer.description);
    setValidUntil(offer.validUntil || "");
    setTerms(offer.terms || "");
    setActive(offer.active !== false);
    setImages(offer.images || []);
    setIsAddingNew(true);
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const newImg: DiscountOfferImage = {
      id: "img-" + Date.now(),
      url: newImageUrl.trim(),
      caption: newImageCaption.trim(),
    };
    setImages((prev) => [...prev, newImg]);
    setNewImageUrl("");
    setNewImageCaption("");
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const newImg: DiscountOfferImage = {
          id: "img-" + Date.now(),
          url: dataUrl,
          caption: newImageCaption.trim() || file.name,
        };
        setImages((prev) => [...prev, newImg]);
        setNewImageCaption("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imgId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // For referral, auto-generate fresh random code on the fly if needed
    const finalCode = offerType === "Referral"
      ? (code.startsWith("PUHAYT-REF-") ? code : generateRandomReferralCode())
      : (code.trim() || "PUHAYT-OFFER");

    if (editingId) {
      await updateDiscount(editingId, {
        title,
        badge,
        offerType,
        discountPercentage: discountPercentage || undefined,
        discountAmount: discountAmount || undefined,
        code: finalCode,
        description,
        validUntil,
        terms,
        active,
        images,
      });
    } else {
      await addDiscount({
        title,
        badge,
        offerType,
        discountPercentage: discountPercentage || undefined,
        discountAmount: discountAmount || undefined,
        code: finalCode,
        description,
        validUntil,
        terms,
        active,
        images,
      });
    }

    resetForm();
  };

  // Filtered List
  const filteredDiscounts = discounts.filter((d) => {
    if (filterType === "ALL") return true;
    const resolvedType = d.offerType || (d.title.toLowerCase().includes("referral") ? "Referral" : d.discountPercentage ? "Discount" : "Offer");
    return resolvedType === filterType;
  });

  const offerCount = discounts.filter((d) => (d.offerType || "Offer") === "Offer").length;
  const discountCount = discounts.filter((d) => d.offerType === "Discount").length;
  const referralCount = discounts.filter((d) => d.offerType === "Referral").length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
            <Gift className="w-3.5 h-3.5" />
            <span>DevMode Marketing Suite</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Offers, Discounts &amp; Referral Packages
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Manage agency offers, discounts, and referral programs. Promotional codes are configured here for Offers and Discounts, while Referral codes are generated randomly on the fly every time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setIsAddingNew(true);
          }}
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg hover:scale-105 active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Filter Tabs by Type */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setFilterType("ALL")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterType === "ALL"
              ? "bg-[#D4AF37] text-black shadow-md"
              : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
          }`}
        >
          All Packages ({discounts.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType("Offer")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            filterType === "Offer"
              ? "bg-[#FFDF73] text-black shadow-md"
              : "bg-[#FFDF73]/10 text-[#FFDF73] hover:bg-[#FFDF73]/20"
          }`}
        >
          <Tag className="w-3 h-3" />
          <span>Offers ({offerCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType("Discount")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            filterType === "Discount"
              ? "bg-emerald-400 text-black shadow-md"
              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          }`}
        >
          <Percent className="w-3 h-3" />
          <span>Discounts ({discountCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType("Referral")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            filterType === "Referral"
              ? "bg-cyan-400 text-black shadow-md"
              : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
          }`}
        >
          <Dices className="w-3 h-3" />
          <span>Referral ({referralCount})</span>
        </button>
      </div>

      {/* Add / Edit Form Modal */}
      {isAddingNew && (
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-black/80 border border-[#D4AF37]/50 shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="font-serif text-lg font-bold text-white">
                {editingId ? `Edit ${offerType}` : `Create New ${offerType}`}
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
            
            {/* TYPE SELECTION: Referral | Discount | Offer */}
            <div className="sm:col-span-2 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <label className="text-white block font-bold">
                Select Package Type *
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(["Offer", "Discount", "Referral"] as OfferType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setOfferType(t);
                      if (t === "Referral") {
                        setCode(generateRandomReferralCode());
                        setBadge("Dynamic Referral");
                      } else if (t === "Discount") {
                        if (!code || code.startsWith("PUHAYT-REF-")) setCode("PUHAYT-DISC-20");
                        setBadge("Special Discount");
                      } else {
                        if (!code || code.startsWith("PUHAYT-REF-")) setCode("KOLKATA-DIRECT-10K");
                        setBadge("Promotional Offer");
                      }
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-2 ${
                      offerType === t
                        ? t === "Offer"
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg"
                          : t === "Discount"
                          ? "bg-emerald-400 text-black border-emerald-400 shadow-lg"
                          : "bg-cyan-400 text-black border-cyan-400 shadow-lg"
                        : "bg-black/40 text-neutral-300 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {t === "Offer" && <Tag className="w-3.5 h-3.5" />}
                    {t === "Discount" && <Percent className="w-3.5 h-3.5" />}
                    {t === "Referral" && <Dices className="w-3.5 h-3.5" />}
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  offerType === "Referral"
                    ? "e.g. 1-Click Friend Referral Program"
                    : offerType === "Discount"
                    ? "e.g. Kolkata 20% Founder Discount"
                    : "e.g. Kolkata Local Business Growth Booster"
                }
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. In-Person Special, Limited Time"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Discount % or Flat Amount</label>
              <input
                type="text"
                value={discountPercentage || discountAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.includes("%")) {
                    setDiscountPercentage(val);
                    setDiscountAmount("");
                  } else {
                    setDiscountAmount(val);
                    setDiscountPercentage("");
                  }
                }}
                placeholder="e.g. 20% OFF or ₹10,000 Flat Credit"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* PROMO CODE SECTION: Hidden for Referral (random on the fly), Configured in DevMode for Offer and Discount */}
            {offerType === "Referral" ? (
              <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/40 space-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-300 font-bold text-xs">
                  <Dices className="w-3.5 h-3.5" />
                  <span>Random Referral Code Generated On-the-Fly</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-tight">
                  For referrals, no manual code section is used in DevMode. Every time a referral link is generated, a fresh random code is produced dynamically on the fly.
                </p>
                <div className="pt-1 flex items-center space-x-2">
                  <span className="text-[10px] text-neutral-400 font-mono">Sample code:</span>
                  <span className="font-mono text-xs font-bold text-cyan-300 bg-black/60 px-2 py-0.5 rounded">
                    {code}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCode(generateRandomReferralCode())}
                    className="text-[10px] text-neutral-400 hover:text-white underline"
                  >
                    Reroll
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-neutral-400 block mb-1">
                  Promo Code (Configured in DevMode) *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder={offerType === "Offer" ? "e.g. KOLKATA-DIRECT-10K" : "e.g. PUHAYT-LAUNCH-20"}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white font-mono uppercase font-bold text-[#FFDF73] focus:outline-none focus:border-[#D4AF37]"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Promo code specified directly here in DevMode for clients to apply.
                </span>
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="text-neutral-400 block mb-1">Description / Details *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the offer, benefits, what services it covers..."
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Validity Period</label>
              <input
                type="text"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                placeholder="e.g. End of Current Quarter, Always Active"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Terms &amp; Conditions</label>
              <input
                type="text"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="e.g. Valid on 3-month retainers, Kolkata in-person meetings"
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Multiple Images with Captioned Texts */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>Package Images with Captions ({images.length})</span>
              </div>
              <span className="text-[10px] text-neutral-400">Add multiple visual banners &amp; captions</span>
            </div>

            {/* List Existing Attached Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.map((img) => (
                  <div key={img.id} className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-2">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-auto object-contain rounded-lg bg-black/80 mx-auto block"
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-white font-medium truncate">{img.caption || "Full Picture Attached"}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded-lg bg-red-950/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Image Input Controls */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="url"
                  placeholder="Paste image URL (https://...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Image caption / text description"
                  value={newImageCaption}
                  onChange={(e) => setNewImageCaption(e.target.value)}
                  className="px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-300 hover:text-white text-xs">
                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Upload Local File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleAddImage}
                  disabled={!newImageUrl.trim()}
                  className="px-3 py-1.5 rounded-lg gold-gradient-bg text-black font-bold text-xs disabled:opacity-40"
                >
                  Attach Image to Package
                </button>
              </div>
            </div>
          </div>

          {/* Active Status Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div>
              <div className="font-bold text-white">Active &amp; Visible to Clients</div>
              <div className="text-[10px] text-neutral-400">Clients can see and redeem this package</div>
            </div>
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                active ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-white/10 text-neutral-400"
              }`}
            >
              {active ? "Active" : "Hidden"}
            </button>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3">
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
              <span>{editingId ? "Save Changes" : `Create ${offerType}`}</span>
            </button>
          </div>
        </form>
      )}

      {/* Existing Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDiscounts.map((offer) => {
          const type = offer.offerType || (offer.title.toLowerCase().includes("referral") ? "Referral" : offer.discountPercentage ? "Discount" : "Offer");
          const isReferral = type === "Referral";

          return (
            <div
              key={offer.id}
              className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* TYPE BADGE: Referral | Discount | Offer */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${
                        type === "Offer"
                          ? "bg-[#FFDF73]/20 border-[#FFDF73]/40 text-[#FFDF73]"
                          : type === "Discount"
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      }`}
                    >
                      {type}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[9px] font-mono font-bold uppercase">
                      {offer.badge}
                    </span>
                  </div>

                  <span className="font-mono font-bold text-sm text-[#FFDF73]">
                    {offer.discountPercentage || offer.discountAmount}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-lg text-white">{offer.title}</h4>
                <p className="text-xs text-neutral-300 line-clamp-2">{offer.description}</p>

                {/* Code display based on type */}
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="text-neutral-500">Code:</span>
                  {isReferral ? (
                    <span className="text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30 text-[11px] flex items-center space-x-1">
                      <Dices className="w-3 h-3 text-cyan-400 inline" />
                      <span>Random every time (on-the-fly)</span>
                    </span>
                  ) : (
                    <span className="text-[#FFDF73] bg-black/80 px-2 py-0.5 rounded border border-white/10 font-bold">
                      {offer.code} <span className="text-[9px] text-neutral-400 font-sans font-normal">(DevMode)</span>
                    </span>
                  )}
                </div>

                {offer.images && offer.images.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {offer.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-auto object-contain rounded-xl border border-white/10 bg-black/80 mx-auto block"
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={`text-[10px] font-mono ${offer.active !== false ? "text-emerald-400" : "text-neutral-500"}`}>
                  ● {offer.active !== false ? "Active on site" : "Hidden"}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(offer)}
                    className="p-1.5 text-neutral-300 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    title={`Edit ${type}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDiscount(offer.id)}
                    className="p-1.5 text-red-400 hover:text-red-300 rounded-lg bg-red-950/20 hover:bg-red-950/40 transition-colors"
                    title={`Delete ${type}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
