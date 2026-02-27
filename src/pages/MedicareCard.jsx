import { useState, useEffect } from "react";
import { X, MoreHorizontal, QrCode, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "./Profile";
import { format } from "date-fns";

export default function MedicareCard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const now = new Date();
  const lastUpdated = format(now, "d MMM yyyy 'at' h:mm aa").replace("AM", "am").replace("PM", "pm");

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4 bg-[#4dcfef]">
        <button onClick={() => navigate(-1)}>
          <X size={22} className="text-black" />
        </button>
        <button>
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
            <MoreHorizontal size={18} className="text-black" />
          </div>
        </button>
      </div>

      {/* Green header */}
      <div
        className="mx-0 px-6 py-8 flex items-center justify-center"
        style={{
          background: "repeating-linear-gradient(45deg, #8fca8f, #8fca8f 2px, #7dbf7d 2px, #7dbf7d 8px)",
        }}
      >
        <span className="text-2xl font-bold text-gray-900">Medicare card</span>
      </div>

      {/* Card details */}
      <div className="mx-4 mt-4 bg-white rounded-xl border border-gray-200 px-5 py-5 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-10" style={{ gap: 8 }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-4xl font-black text-[#4dcfef] tracking-widest" style={{ letterSpacing: 8 }}>
              myGov myGov
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 mb-1">Card number</p>
        <p className="text-2xl font-bold text-gray-900 mb-4">{profile.medicareNumber || "2555 69143 6"}</p>

        <p className="text-base font-medium text-gray-900 mb-4">
          {profile.medicarePosition || "1"}.{"  "}{profile.medicareName || "Daniel Greenyer"}
        </p>

        <p className="text-xs text-gray-500 mb-1">Valid to</p>
        <p className="text-base font-medium text-gray-900">{profile.medicareValidTo || "Jul 2027"}</p>
      </div>

      {/* Manage your card */}
      <div className="mx-4 mt-3 bg-gray-100 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer active:bg-gray-200">
        <span className="text-sm font-medium text-gray-800">Manage your card</span>
        <ArrowUpRight size={18} className="text-gray-600" />
      </div>

      {/* Verify card */}
      <div className="mx-4 mt-3 border border-black rounded-xl px-5 py-4 flex items-center justify-center gap-3 cursor-pointer active:bg-gray-50" onClick={() => navigate(createPageUrl("VerifyCard"))}>
        <QrCode size={20} className="text-black" />
        <span className="text-sm font-semibold text-black">Verify card</span>
      </div>

      {/* Last updated */}
      <p className="text-center text-xs text-gray-400 mt-6">Last updated {lastUpdated}</p>
    </div>
  );
}