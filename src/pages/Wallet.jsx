import { Pencil, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { getProfile } from "./Profile";

export default function Wallet() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile);

  useEffect(() => {
    const onFocus = () => setProfile(getProfile());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          {/* Wallet icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8">
            <rect x="2" y="5" width="20" height="15" rx="2" />
            <path d="M16 12h2" strokeLinecap="round" />
          </svg>
          <span className="text-black font-semibold text-lg">Wallet</span>
          <div className="flex items-center gap-4">
            <Pencil size={18} className="text-black" />
            <Plus size={22} className="text-black" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 px-4 pt-5 pb-28 space-y-5">

        {/* Organ Donor Card */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 60%, #ad1457 100%)", minHeight: 180 }}>
          <div className="relative p-5 h-full">
            {/* Blob decoration */}
            <div className="absolute bottom-0 left-0 w-40 h-32 rounded-full opacity-20" style={{ background: "#ff80ab", transform: "translate(-20%, 30%)" }} />
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#e91e8c">
                <path d="M12 21C12 21 3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 13-9 13z" />
              </svg>
            </div>
            <p className="text-white text-xl font-semibold mb-12">Organ donor card</p>
            {profile.organDonor && (
              <div className="inline-block bg-white rounded-full px-4 py-1.5 mt-2">
                <span className="text-[#e91e8c] text-sm font-semibold">I am registered as an organ donor.</span>
              </div>
            )}
          </div>
        </div>

        {/* Medicare Card */}
        <div className="rounded-2xl overflow-hidden shadow-sm cursor-pointer" style={{ background: "#8fca8f", minHeight: 140 }} onClick={() => navigate(createPageUrl("MedicareCard"))}>
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-900 text-xl font-semibold">Medicare card</p>
              <div className="bg-[#007b40] rounded px-3 py-1">
                <span className="text-white text-sm font-bold italic">medicare</span>
              </div>
            </div>
            <p className="text-gray-800 text-2xl font-mono tracking-widest">{profile.medicareNumber}</p>
          </div>
        </div>

      </div>
    </div>
  );
}