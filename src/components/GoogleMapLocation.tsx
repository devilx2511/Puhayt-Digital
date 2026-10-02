import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { MapPin, Navigation, Compass, ExternalLink, Building2 } from "lucide-react";

export const GoogleMapLocation: React.FC = () => {
  const { locationPin, contactInfo } = useAgency();

  // Create Google Maps directions URL based on coordinates or address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationPin.lat + "," + locationPin.lng
  )}`;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>HQ Location</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">{locationPin.mapTitle || "Our Agency Headquarters"}</h3>
          <p className="text-xs text-neutral-400 mt-1 font-light">{locationPin.address}</p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-bold text-[#0B0B0B] gold-gradient-bg rounded-full hover:scale-105 transition-all flex items-center space-x-2 shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Get Directions</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Map Embed Frame with Custom Pin Overlay */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-white/10 group">
        <iframe
          title="Agency Location Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${locationPin.lat},${locationPin.lng}&z=15&output=embed`}
          className="w-full h-full filter grayscale contrast-125 brightness-90 hover:filter-none transition-all duration-500"
        />

        {/* Custom Agency Gold Pin Badge on Map */}
        <div className="absolute top-4 left-4 glass-card-gold px-3.5 py-2 rounded-xl border border-[#D4AF37]/50 flex items-center space-x-2.5 shadow-xl backdrop-blur-md">
          <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center text-[#0B0B0B] font-bold text-xs shadow-md animate-pulse">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white leading-none">{locationPin.mapTitle}</div>
            <div className="text-[10px] text-[#D4AF37] font-mono mt-0.5">
              {locationPin.lat.toFixed(4)}° N, {locationPin.lng.toFixed(4)}° E
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
