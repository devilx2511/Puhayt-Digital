import React, { useState } from "react";
import { useAgency } from "../../context/AgencyContext";
import { TeamMemberProfile } from "../../types";
import { 
  Users, 
  Upload, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Clock, 
  Sparkles, 
  Image as ImageIcon,
  Flame,
  ShieldCheck,
  Save
} from "lucide-react";

export const TeamProfilesManager: React.FC = () => {
  const { teamMembers, updateTeamMember } = useAgency();
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);

  // Local state for editing to ensure smooth typing
  const [localMembers, setLocalMembers] = useState<TeamMemberProfile[]>(teamMembers);

  React.useEffect(() => {
    setLocalMembers(teamMembers);
  }, [teamMembers]);

  const handleChange = (id: string, field: keyof TeamMemberProfile, value: any) => {
    setLocalMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        handleChange(id, "imageUrl", dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (member: TeamMemberProfile) => {
    await updateTeamMember(member.id, member);
    setSaveSuccessId(member.id);
    setTimeout(() => setSaveSuccessId(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Leadership &amp; Team Profiles</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Founder &amp; Architect Profile Manager
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Upload custom portrait images and manage contact numbers, Instagram usernames, and calling hours for Trishanjit Dalal and Aayush Ghosh.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {localMembers.map((member) => (
          <div
            key={member.id}
            className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/15 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="font-serif font-bold text-lg text-white">{member.name}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFDF73]/15 text-[#FFDF73] text-[10px] font-mono font-bold uppercase">
                  {member.age} Years Old
                </span>
              </div>

              {/* Photo Upload & Preview */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="text-xs font-bold text-neutral-300 flex items-center space-x-2">
                  <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Profile Photo</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-2xl border-2 border-[#D4AF37]/50 bg-black/80 overflow-hidden flex items-center justify-center shrink-0 shadow-lg relative group">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8C6D1F] flex items-center justify-center font-serif text-2xl font-black text-black">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl gold-gradient-bg text-black font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(member.id, file);
                        }}
                      />
                    </label>

                    <div className="text-[10px] text-neutral-400">Or paste direct image URL:</div>
                    <input
                      type="url"
                      placeholder="https://... photo url"
                      value={member.imageUrl || ""}
                      onChange={(e) => handleChange(member.id, "imageUrl", e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleChange(member.id, "name", e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Age</label>
                    <input
                      type="number"
                      value={member.age}
                      onChange={(e) => handleChange(member.id, "age", parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Role Title</label>
                    <input
                      type="text"
                      value={member.roleTitle}
                      onChange={(e) => handleChange(member.id, "roleTitle", e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={member.phone}
                      onChange={(e) => handleChange(member.id, "phone", e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={member.whatsapp}
                      onChange={(e) => handleChange(member.id, "whatsapp", e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Calling Hours</label>
                  <input
                    type="text"
                    value={member.callingHours}
                    onChange={(e) => handleChange(member.id, "callingHours", e.target.value)}
                    placeholder="e.g. 10 AM to 10 PM"
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Instagram Username</label>
                    <input
                      type="text"
                      value={member.instagramUsername}
                      onChange={(e) => handleChange(member.id, "instagramUsername", e.target.value)}
                      placeholder="@username"
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Instagram Full URL</label>
                    <input
                      type="url"
                      value={member.instagramUrl}
                      onChange={(e) => handleChange(member.id, "instagramUrl", e.target.value)}
                      placeholder="https://www.instagram.com/..."
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={member.skills.join(", ")}
                    onChange={(e) =>
                      handleChange(
                        member.id,
                        "skills",
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleSave(member)}
                className="w-full py-3 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                {saveSuccessId === member.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Saved &amp; Updated Live Across Site!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-black" />
                    <span>Save {member.name}'s Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
