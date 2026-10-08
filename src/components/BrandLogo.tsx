import React, { useState } from "react";
import { Sparkles, Crown, Shield, Flame, Gem, Zap, Globe } from "lucide-react";
import { useAgency } from "../context/AgencyContext";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon-only" | "text-only";
  onClick?: () => void;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  size = "md",
  variant = "full",
  onClick,
  showTagline = false,
}) => {
  const { brandLogo } = useAgency();
  const [imageError, setImageError] = useState(false);

  // Safe fallbacks to prevent ANY white screen errors or undefined issues
  const logoUrl = brandLogo?.logoUrl?.trim();
  const brandName = brandLogo?.brandName?.trim() || "PUHAYT";
  const brandSuffix = brandLogo?.brandSuffix?.trim() || "DIGITAL";
  const tagline = brandLogo?.tagline?.trim() || "Digital Growth Agency";
  const emblemLetter = (brandLogo?.emblemLetter?.trim() || brandName.charAt(0) || "P").toUpperCase();
  const showDot = brandLogo?.showDot !== false;
  const emblemIcon = brandLogo?.emblemIcon || "sparkles";
  const emblemGradient = brandLogo?.emblemGradient || "gold";
  const logoType = brandLogo?.logoType || (logoUrl ? "custom_image" : "emblem_letter");

  // Gradient styles for fallback emblem
  const gradientStyles: Record<string, string> = {
    gold: "from-[#FFE57F] via-[#D4AF37] to-[#8C6D1F] border-[#D4AF37]/50 text-black",
    cyber: "from-cyan-400 via-blue-500 to-indigo-600 border-cyan-400/50 text-white",
    ruby: "from-rose-400 via-red-500 to-amber-600 border-rose-400/50 text-white",
    emerald: "from-emerald-400 via-teal-500 to-green-700 border-emerald-400/50 text-black",
    platinum: "from-neutral-100 via-neutral-300 to-neutral-500 border-neutral-300/50 text-black",
  };

  const selectedGradient = gradientStyles[emblemGradient] || gradientStyles.gold;

  // Sizing definitions — Big, prominent logo emblem mark with refined typography
  const sizeConfig = {
    sm: {
      box: "w-11 h-11 min-w-[44px]",
      img: "h-11 max-w-[190px]",
      icon: "w-5.5 h-5.5",
      letter: "text-2xl font-black",
      text: "text-base sm:text-lg font-bold",
      subText: "text-[10px] sm:text-[11px] font-semibold",
      tag: "text-[9px]",
    },
    md: {
      box: "w-14 h-14 sm:w-16 sm:h-16 min-w-[56px] sm:min-w-[64px]",
      img: "h-14 sm:h-16 max-w-[240px]",
      icon: "w-7 h-7 sm:w-8 sm:h-8",
      letter: "text-2xl sm:text-3xl font-black",
      text: "text-lg sm:text-xl font-bold",
      subText: "text-xs sm:text-sm font-bold tracking-wider",
      tag: "text-[10px] sm:text-[11px]",
    },
    lg: {
      box: "w-16 h-16 sm:w-20 sm:h-20 min-w-[64px] sm:min-w-[80px]",
      img: "h-16 sm:h-20 max-w-[300px]",
      icon: "w-8 h-8 sm:w-10 sm:h-10",
      letter: "text-3xl sm:text-4xl font-black",
      text: "text-xl sm:text-2xl font-bold",
      subText: "text-xs sm:text-sm font-bold tracking-widest",
      tag: "text-xs",
    },
    xl: {
      box: "w-20 h-20 sm:w-24 sm:h-24 min-w-[80px] sm:min-w-[96px]",
      img: "h-20 sm:h-24 max-w-[360px]",
      icon: "w-10 h-10 sm:w-12 sm:h-12",
      letter: "text-4xl sm:text-5xl font-black",
      text: "text-2xl sm:text-3xl font-bold",
      subText: "text-sm sm:text-base font-bold tracking-widest",
      tag: "text-xs sm:text-sm",
    },
  };

  const cfg = sizeConfig[size] || sizeConfig.md;

  const renderEmblemIcon = () => {
    switch (emblemIcon) {
      case "crown":
        return <Crown className={cfg.icon} aria-hidden="true" />;
      case "shield":
        return <Shield className={cfg.icon} aria-hidden="true" />;
      case "flame":
        return <Flame className={cfg.icon} aria-hidden="true" />;
      case "gem":
        return <Gem className={cfg.icon} aria-hidden="true" />;
      case "zap":
        return <Zap className={cfg.icon} aria-hidden="true" />;
      case "globe":
        return <Globe className={cfg.icon} aria-hidden="true" />;
      case "sparkles":
      default:
        return <Sparkles className={cfg.icon} aria-hidden="true" />;
    }
  };

  // Render the visual logo mark
  const renderLogoMark = () => {
    if (logoType === "custom_image" && logoUrl && !imageError) {
      return (
        <div className="relative flex items-center justify-center shrink-0">
          <img
            src={logoUrl}
            alt={`${brandName} ${brandSuffix}`}
            width={64}
            height={64}
            className={`${cfg.img} object-contain rounded-lg drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-105`}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    if (logoType === "emblem_icon") {
      return (
        <div
          className={`${cfg.box} rounded-2xl bg-gradient-to-tr ${selectedGradient} border p-1 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-105 shrink-0`}
          aria-hidden="true"
        >
          {renderEmblemIcon()}
        </div>
      );
    }

    return (
      <div
        className={`${cfg.box} rounded-2xl bg-gradient-to-tr ${selectedGradient} border flex items-center justify-center font-black font-serif shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-105 shrink-0`}
        aria-hidden="true"
      >
        <span className={`leading-none text-current font-black tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] ${cfg.letter}`}>
          {emblemLetter}
        </span>
      </div>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const interactiveProps = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick,
        onKeyDown: handleKeyDown,
        ...(variant === "icon-only" ? { "aria-label": `${brandName} ${brandSuffix} Home` } : {}),
      }
    : {};

  // Icon only
  if (variant === "icon-only") {
    return (
      <div
        {...interactiveProps}
        className={`inline-flex items-center justify-center cursor-pointer group ${className}`}
      >
        {renderLogoMark()}
      </div>
    );
  }

  // Text only
  if (variant === "text-only") {
    return (
      <div
        {...interactiveProps}
        className={`flex flex-col cursor-pointer leading-none group select-none ${className}`}
      >
        <div className={`font-serif font-bold tracking-wider text-white ${cfg.text} flex items-center gap-1`}>
          <span>{brandName}</span>
          {showDot && <span className="text-[#D4AF37]">.</span>}
          {brandSuffix && (
            <span className={`text-[#D4AF37] font-medium tracking-widest ${cfg.subText}`}>
              {brandSuffix}
            </span>
          )}
        </div>
        {showTagline && tagline && (
          <span className={`text-neutral-300 font-sans tracking-wide mt-0.5 ${cfg.tag}`}>
            {tagline}
          </span>
        )}
      </div>
    );
  }

  // Full: Mark + Text
  return (
    <div
      {...interactiveProps}
      className={`inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none ${className}`}
    >
      {renderLogoMark()}

      <div className="flex flex-col leading-none">
        <div className={`font-serif font-bold tracking-wider text-white ${cfg.text} flex items-center gap-1`}>
          <span className="transition-colors group-hover:text-[#FFF2B2]">{brandName}</span>
          {showDot && <span className="text-[#D4AF37]">.</span>}
          {brandSuffix && (
            <span className={`text-[#D4AF37] font-medium tracking-widest ${cfg.subText}`}>
              {brandSuffix}
            </span>
          )}
        </div>
        {showTagline && tagline && (
          <span className={`text-neutral-300 font-sans tracking-wide mt-1 font-normal ${cfg.tag}`}>
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
