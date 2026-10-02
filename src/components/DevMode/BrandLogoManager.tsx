import React, { useState, useRef } from "react";
import { useAgency } from "../../context/AgencyContext";
import { BrandLogo } from "../BrandLogo";
import { BrandLogoConfig } from "../../types";
import {
  Sparkles,
  Crown,
  Shield,
  Flame,
  Gem,
  Zap,
  Globe,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Eye,
  Trash2,
  Link,
  Layers,
  Palette,
  Type,
  Sliders,
  Check,
  AlertCircle,
  HelpCircle,
  Laptop,
  Smartphone,
} from "lucide-react";

export const BrandLogoManager: React.FC = () => {
  const { brandLogo, updateBrandLogo } = useAgency();

  // Local draft state
  const [formData, setFormData] = useState<BrandLogoConfig>({
    logoUrl: brandLogo?.logoUrl || "",
    logoType: brandLogo?.logoType || "emblem_letter",
    brandName: brandLogo?.brandName || "PUHAYT",
    brandSuffix: brandLogo?.brandSuffix || "DIGITAL",
    tagline: brandLogo?.tagline || "Digital Growth Agency",
    emblemLetter: brandLogo?.emblemLetter || "P",
    emblemIcon: brandLogo?.emblemIcon || "sparkles",
    emblemGradient: brandLogo?.emblemGradient || "gold",
    showDot: brandLogo?.showDot !== false,
    faviconUrl: brandLogo?.faviconUrl || "",
    updatedAt: brandLogo?.updatedAt || new Date().toISOString(),
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activePreviewDevice, setActivePreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick Preset Themes
  const presets: { name: string; icon: string; config: Partial<BrandLogoConfig> }[] = [
    {
      name: "Puhayt Signature Gold",
      icon: "✨",
      config: {
        logoType: "emblem_letter",
        emblemLetter: "P",
        emblemGradient: "gold",
        brandName: "PUHAYT",
        brandSuffix: "DIGITAL",
        tagline: "Digital Growth Agency",
        showDot: true,
      },
    },
    {
      name: "Imperial Royal Crown",
      icon: "👑",
      config: {
        logoType: "emblem_icon",
        emblemIcon: "crown",
        emblemGradient: "gold",
        brandName: "PUHAYT",
        brandSuffix: "ENTERPRISE",
        tagline: "Elite Web & Growth Architect",
        showDot: true,
      },
    },
    {
      name: "Cyber Velocity",
      icon: "⚡",
      config: {
        logoType: "emblem_icon",
        emblemIcon: "zap",
        emblemGradient: "cyber",
        brandName: "PUHAYT",
        brandSuffix: "TECH",
        tagline: "High-Speed NextGen Systems",
        showDot: true,
      },
    },
    {
      name: "Vanguard Shield",
      icon: "🛡️",
      config: {
        logoType: "emblem_icon",
        emblemIcon: "shield",
        emblemGradient: "platinum",
        brandName: "PUHAYT",
        brandSuffix: "SECURITY",
        tagline: "Sub-Second Edge Infrastructure",
        showDot: false,
      },
    },
    {
      name: "Emerald Sovereign",
      icon: "💎",
      config: {
        logoType: "emblem_icon",
        emblemIcon: "gem",
        emblemGradient: "emerald",
        brandName: "PUHAYT",
        brandSuffix: "CAPITAL",
        tagline: "Scale & Revenue Domination",
        showDot: true,
      },
    },
  ];

  // Handle local form modification
  const handleChange = <K extends keyof BrandLogoConfig>(key: K, value: BrandLogoConfig[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Image Upload Handler with safe Base64 encoding & compression
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file (PNG, SVG, JPG, WebP).");
      return;
    }

    // If file is larger than 1.5MB, warn or compress
    if (file.size > 1.5 * 1024 * 1024) {
      setUploadError("File is larger than 1.5MB. Compressing image for optimal performance...");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        // If image is a raster, create an off-screen canvas to downscale if huge
        if (file.type !== "image/svg+xml") {
          const img = new Image();
          img.onload = () => {
            const maxDimension = 480;
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL("image/webp", 0.9);
              setFormData((prev) => ({
                ...prev,
                logoUrl: compressedDataUrl,
                logoType: "custom_image",
              }));
              setUploadError(null);
            }
          };
          img.onerror = () => {
            setFormData((prev) => ({
              ...prev,
              logoUrl: result,
              logoType: "custom_image",
            }));
          };
          img.src = result;
        } else {
          // SVG direct Data URL
          setFormData((prev) => ({
            ...prev,
            logoUrl: result,
            logoType: "custom_image",
          }));
        }
      }
    };
    reader.onerror = () => {
      setUploadError("Error reading image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  // Save to Site
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandLogo(formData);

    // Update dynamic browser favicon if provided
    if (formData.faviconUrl) {
      const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = formData.faviconUrl;
      }
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleApplyPreset = (presetConfig: Partial<BrandLogoConfig>) => {
    setFormData((prev) => ({
      ...prev,
      ...presetConfig,
    }));
  };

  const handleResetToDefault = () => {
    const defaultVals: BrandLogoConfig = {
      logoType: "emblem_letter",
      logoUrl: "",
      brandName: "PUHAYT",
      brandSuffix: "DIGITAL",
      tagline: "Digital Growth Agency",
      emblemLetter: "P",
      emblemIcon: "sparkles",
      emblemGradient: "gold",
      showDot: true,
      faviconUrl: "",
      updatedAt: new Date().toISOString(),
    };
    setFormData(defaultVals);
    updateBrandLogo(defaultVals);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="devmode-brand-logo-manager">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1A140E] via-[#0E0C0A] to-[#1A140E] border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider">
            <Palette className="w-4 h-4" />
            <span>Master Identity & Logo Engine</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-white mt-1">
            Website Brand & Global Logo Customizer
          </h3>
          <p className="text-xs text-neutral-400 font-light mt-0.5 max-w-xl">
            Upload your official agency or company logo image, or customize the high-resolution vector monogram. Changes apply in real-time across the Navbar, Footer, Mobile Drawer, and Invoices.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold flex items-center space-x-1.5 border border-white/10 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-lg hover:scale-105 transition-all flex items-center space-x-1.5"
          >
            {saveSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Saved to Whole Site!</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>Save & Apply Logo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Configuration Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Quick Presets */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Instant Identity Presets</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-normal">Click to apply template</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p.config)}
                  className="p-2.5 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 hover:border-[#D4AF37]/50 text-left transition-all group"
                >
                  <div className="text-base mb-1">{p.icon}</div>
                  <div className="text-xs font-semibold text-neutral-200 group-hover:text-[#FFDF73] transition-colors truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                    {p.config.logoType === "custom_image" ? "Custom" : p.config.emblemGradient}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Logo Type Selector */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <label className="text-xs font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>1. Choose Logo Mode</span>
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleChange("logoType", "custom_image")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all ${
                  formData.logoType === "custom_image"
                    ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md"
                    : "bg-black/30 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-5 h-5 text-[#FFDF73]" />
                <span className="font-semibold text-xs">Custom Image</span>
                <span className="text-[10px] text-neutral-400">PNG / SVG / JPG</span>
              </button>

              <button
                type="button"
                onClick={() => handleChange("logoType", "emblem_letter")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all ${
                  formData.logoType === "emblem_letter"
                    ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md"
                    : "bg-black/30 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                <Type className="w-5 h-5 text-[#FFDF73]" />
                <span className="font-semibold text-xs">Monogram Letter</span>
                <span className="text-[10px] text-neutral-400">P / Bespoke Initials</span>
              </button>

              <button
                type="button"
                onClick={() => handleChange("logoType", "emblem_icon")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all ${
                  formData.logoType === "emblem_icon"
                    ? "bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-md"
                    : "bg-black/30 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#FFDF73]" />
                <span className="font-semibold text-xs">Vector Emblem</span>
                <span className="text-[10px] text-neutral-400">Crown / Shield / Flame</span>
              </button>
            </div>

            {/* Custom Image Upload & URL Section */}
            {formData.logoType === "custom_image" && (
              <div className="p-4 rounded-xl bg-black/40 border border-[#D4AF37]/30 space-y-3.5 animate-fade-in">
                <div className="text-xs font-semibold text-neutral-200 flex items-center justify-between">
                  <span>Upload Logo File or Enter Direct Image URL</span>
                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange("logoUrl", "")}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove Image</span>
                    </button>
                  )}
                </div>

                {/* File Upload Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl p-4 text-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.06] transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                    className="hidden"
                    onChange={handleImageFileChange}
                  />
                  <Upload className="w-7 h-7 mx-auto text-[#D4AF37] mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-white">
                    Click to browse or drop brand image file here
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Supports transparent PNG, SVG vector, WebP, or high-res JPG
                  </p>
                </div>

                {uploadError && (
                  <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-300 text-[11px] flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Direct Image URL Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-neutral-300 flex items-center space-x-1">
                    <Link className="w-3 h-3 text-[#D4AF37]" />
                    <span>Or Direct Image URL (HTTPS link)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/assets/logo.png"
                      value={formData.logoUrl}
                      onChange={(e) => handleChange("logoUrl", e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                    {formData.logoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          // Quick test render
                          const img = new Image();
                          img.onload = () => alert("Image link verified successfully!");
                          img.onerror = () => alert("Could not load image from URL. Check permissions or URL.");
                          img.src = formData.logoUrl || "";
                        }}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Emblem Settings (Letter or Icon) */}
            {(formData.logoType === "emblem_letter" || formData.logoType === "emblem_icon") && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4 animate-fade-in">
                {formData.logoType === "emblem_letter" && (
                  <div>
                    <label className="text-xs font-semibold text-white block mb-1.5">
                      Monogram Letter (1-2 characters)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={formData.emblemLetter}
                      onChange={(e) => handleChange("emblemLetter", e.target.value.toUpperCase())}
                      className="w-24 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-center text-white text-base font-serif font-black focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                )}

                {formData.logoType === "emblem_icon" && (
                  <div>
                    <label className="text-xs font-semibold text-white block mb-1.5">
                      Select Vector Icon
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {[
                        { id: "sparkles", label: "Sparkle", icon: <Sparkles className="w-4 h-4" /> },
                        { id: "crown", label: "Crown", icon: <Crown className="w-4 h-4" /> },
                        { id: "shield", label: "Shield", icon: <Shield className="w-4 h-4" /> },
                        { id: "flame", label: "Flame", icon: <Flame className="w-4 h-4" /> },
                        { id: "gem", label: "Gem", icon: <Gem className="w-4 h-4" /> },
                        { id: "zap", label: "Zap", icon: <Zap className="w-4 h-4" /> },
                        { id: "globe", label: "Globe", icon: <Globe className="w-4 h-4" /> },
                      ].map((ic) => (
                        <button
                          key={ic.id}
                          type="button"
                          onClick={() => handleChange("emblemIcon", ic.id as any)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                            formData.emblemIcon === ic.id
                              ? "bg-[#D4AF37] text-black font-bold border-[#D4AF37]"
                              : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {ic.icon}
                          <span className="text-[9px]">{ic.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gradient Palette Selection */}
                <div>
                  <label className="text-xs font-semibold text-white block mb-1.5">
                    Emblem Gradient & Metal Tone
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: "gold", name: "Sovereign Gold", bg: "from-[#FFE57F] via-[#D4AF37] to-[#8C6D1F]" },
                      { id: "cyber", name: "Cyber Neon", bg: "from-cyan-400 via-blue-500 to-indigo-600" },
                      { id: "ruby", name: "Crimson Ruby", bg: "from-rose-400 via-red-500 to-amber-600" },
                      { id: "emerald", name: "Emerald Mint", bg: "from-emerald-400 via-teal-500 to-green-700" },
                      { id: "platinum", name: "Platinum Ice", bg: "from-neutral-100 via-neutral-300 to-neutral-500" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleChange("emblemGradient", g.id as any)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          formData.emblemGradient === g.id
                            ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/40 bg-white/10"
                            : "border-white/10 bg-black/40 hover:bg-white/5"
                        }`}
                      >
                        <div className={`w-full h-4 rounded-md bg-gradient-to-r ${g.bg} mb-1.5 shadow-sm`} />
                        <div className="text-[10px] font-medium text-neutral-200 truncate">{g.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Typography & Brand Text Fields */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3.5">
            <label className="text-xs font-bold text-white flex items-center space-x-2">
              <Type className="w-4 h-4 text-[#D4AF37]" />
              <span>2. Brand Typography & Titles</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">
                  Primary Brand Name
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleChange("brandName", e.target.value)}
                  placeholder="e.g. PUHAYT"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-serif font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">
                  Brand Suffix (Accent Text)
                </label>
                <input
                  type="text"
                  value={formData.brandSuffix}
                  onChange={(e) => handleChange("brandSuffix", e.target.value)}
                  placeholder="e.g. DIGITAL"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[#FFDF73] text-xs font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300">
                  Brand Tagline / Sub-heading
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  placeholder="e.g. Digital Growth Agency"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-neutral-300 flex items-center justify-between">
                  <span>Show Golden Dot Separator</span>
                  <span className="text-[10px] text-neutral-400 font-mono">({formData.brandName}.{formData.brandSuffix})</span>
                </label>
                <div className="flex items-center space-x-3 pt-1">
                  <label className="flex items-center space-x-2 text-xs text-neutral-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showDot}
                      onChange={(e) => handleChange("showDot", e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37] rounded"
                    />
                    <span>Include Golden Dot</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Mockup Previews (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#14100C] to-[#0A0806] border border-[#D4AF37]/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <Eye className="w-4 h-4 text-[#D4AF37]" />
                <span>Live Omnichannel Previews</span>
              </div>

              <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setActivePreviewDevice("desktop")}
                  className={`p-1.5 rounded-md ${
                    activePreviewDevice === "desktop" ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Desktop Preview"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewDevice("mobile")}
                  className={`p-1.5 rounded-md ${
                    activePreviewDevice === "mobile" ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Preview 1: Dark Navigation Bar Simulation */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-neutral-400 flex items-center justify-between">
                <span>Top Header / Navigation Bar</span>
                <span className="text-[#D4AF37]">size="md"</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#090806] border border-[#D4AF37]/30 shadow-lg flex items-center justify-between overflow-hidden">
                <BrandLogo size="md" />
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-12 h-5 rounded-full bg-white/10" />
                  <div className="w-16 h-5 rounded-full bg-gradient-to-r from-[#FFDF73] to-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Preview 2: Mobile Slide-over Drawer Header Simulation */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-neutral-400 flex items-center justify-between">
                <span>Mobile Drawer & Header Menu</span>
                <span className="text-[#D4AF37]">size="md"</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0E0C0A] border border-white/10 shadow-lg flex items-center justify-between">
                <BrandLogo size="md" showTagline={false} />
              </div>
            </div>

            {/* Preview 3: Footer Large Display */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-neutral-400 flex items-center justify-between">
                <span>Footer & Brand Empire Card</span>
                <span className="text-[#D4AF37]">size="lg"</span>
              </div>
              <div className="p-5 rounded-xl bg-[#050505] border border-white/10 shadow-lg space-y-2">
                <BrandLogo size="lg" showTagline={false} />
                <p className="text-[10px] text-neutral-400 line-clamp-2">
                  We Don't Just Market Brands. We Build Digital Empires. Elite 3D web development, technical SEO, and AI systems.
                </p>
              </div>
            </div>

            {/* Preview 4: Icon-Only / App Icon */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase text-neutral-400">
                Icon-Only / Favicon / App Dock Mark
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center space-x-4">
                <div className="flex flex-col items-center space-y-1">
                  <BrandLogo size="sm" variant="icon-only" />
                  <span className="text-[8px] text-neutral-500 font-mono">Small</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <BrandLogo size="md" variant="icon-only" />
                  <span className="text-[8px] text-neutral-500 font-mono">Medium</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <BrandLogo size="lg" variant="icon-only" />
                  <span className="text-[8px] text-neutral-500 font-mono">Large</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <BrandLogo size="xl" variant="icon-only" />
                  <span className="text-[8px] text-neutral-500 font-mono">Hero</span>
                </div>
              </div>
            </div>

            {/* Bottom Save Action Button in Preview */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>{saveSuccess ? "Applied Successfully Across Site!" : "Apply Logo Across Site"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
