import React, { useState } from "react";
import { useAgency } from "../context/AgencyContext";
import { MapPin, Navigation, ExternalLink, Building2, MessageCircle, Globe2 } from "lucide-react";

export const GoogleMapLocation: React.FC = () => {
  const { locationPin } = useAgency();
  const [loadInteractiveMap, setLoadInteractiveMap] = useState(false);

  // Create Google Maps directions URL based on coordinates or address
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationPin.lat + "," + locationPin.lng
  )}`;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#120E09] to-[#0A0805]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#FFDF73] uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span>Kolkata Operations &amp; Client Premises Briefings</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            We Still Lack Our First Office — <span className="gold-gradient-text">We Come to Your Premises</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 font-light leading-relaxed max-w-2xl">
            We are completely honest: we do not have our first commercial office yet. Trishanjit Dalal operates out of Kolkata (West Bengal). For all Kolkata clients, <strong>we travel directly to your office, store, or business premises</strong> for in-person strategy sessions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="https://wa.me/917044811476?text=Hello%20Trishanjit!%20I%20would%20like%20to%20schedule%20an%20in-person%20meeting%20at%20our%20premises."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-bold text-[#0B0B0B] gold-gradient-bg rounded-full hover:scale-105 transition-all flex items-center space-x-1.5 shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Meet at Your Office</span>
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white glass-card rounded-full border border-white/15 hover:scale-105 transition-all flex items-center space-x-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 text-neutral-300" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Zero-Blocking Interactive Map Facade (Loads third-party Google Maps iframe only on user click) */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#0D1117] group">
        {loadInteractiveMap ? (
          <iframe
            title="Kolkata Service Area Map"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Kolkata,West+Bengal,India&z=12&output=embed"
            className="w-full h-full border-0 filter grayscale contrast-125 brightness-90 hover:filter-none transition-all duration-500"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
            {/* Architectural Vector Grid Map Preview of Greater Kolkata */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
              viewBox="0 0 800 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="800" height="320" fill="#0B0E14" />
              <g stroke="#D4AF37" strokeOpacity="0.18" strokeWidth="1">
                <line x1="0" y1="64" x2="800" y2="64" />
                <line x1="0" y1="128" x2="800" y2="128" />
                <line x1="0" y1="192" x2="800" y2="192" />
                <line x1="0" y1="256" x2="800" y2="256" />
                <line x1="160" y1="0" x2="160" y2="320" />
                <line x1="320" y1="0" x2="320" y2="320" />
                <line x1="480" y1="0" x2="480" y2="320" />
                <line x1="640" y1="0" x2="640" y2="320" />
              </g>
              {/* Hooghly River & Corridor Curves */}
              <path
                d="M230 0 C255 95, 210 180, 245 320"
                stroke="#38BDF8"
                strokeOpacity="0.3"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M120 260 Q 380 150 690 70"
                stroke="#D4AF37"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle cx="480" cy="135" r="42" fill="#D4AF37" fillOpacity="0.12" />
              <circle cx="480" cy="135" r="18" fill="#D4AF37" fillOpacity="0.25" />
              <circle cx="480" cy="135" r="6" fill="#FFDF73" />
              <circle cx="340" cy="180" r="4" fill="#D4AF37" fillOpacity="0.7" />
              <circle cx="560" cy="105" r="4" fill="#D4AF37" fillOpacity="0.7" />
              <circle cx="370" cy="230" r="4" fill="#D4AF37" fillOpacity="0.7" />
            </svg>

            <div className="relative z-10 max-w-md space-y-3 bg-black/75 backdrop-blur-md p-5 rounded-2xl border border-[#D4AF37]/40 shadow-2xl">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#FFDF73] uppercase">
                <Globe2 className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span>Salt Lake Sector V • New Town • Park Street • Ballygunge</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                Interactive Kolkata service corridor map (22.5804° N, 88.4378° E). Click below to load the live Google Maps embed or open directions directly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setLoadInteractiveMap(true)}
                  className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform flex items-center space-x-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                  <span>Load Live Interactive Map</span>
                </button>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <span>Google Maps App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Custom Agency Gold Pin Badge on Map */}
        <div className="absolute top-4 left-4 glass-card-gold p-3 rounded-2xl border border-[#D4AF37]/50 flex items-center space-x-3 shadow-xl backdrop-blur-md max-w-sm pointer-events-none">
          <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-[#0B0B0B] font-bold text-xs shadow-md shrink-0">
            <Building2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs font-bold text-white leading-tight">Trishanjit's Kolkata Operational Base</div>
            <div className="text-[10px] text-[#FFDF73] font-medium mt-0.5">
              Serving All Kolkata Premises &amp; Remote Globally
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
