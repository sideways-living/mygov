import { Pencil, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { getProfile } from "./Profile";
import MedicareCardSheet from "../components/MedicareCardSheet";

export default function Wallet() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile);
  const [medicareOpen, setMedicareOpen] = useState(false);

  useEffect(() => {
    const onFocus = () => setProfile(getProfile());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const num = (profile.medicareNumber || "").replace(/\s/g, "");
  const last4 = num.slice(-4);
  const formatted = `${last4.slice(0, 3)} ${last4.slice(3)}`;

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4" style={{ minHeight: 110 }}>
        <div className="flex items-center justify-end gap-5 mb-1">
          <Pencil size={18} className="text-black" />
          <Plus size={22} className="text-black" />
        </div>
        <h1 className="text-black font-bold text-2xl">Wallet</h1>
      </div>

      {/* Cards */}
      <div className="flex-1 px-4 pt-5 pb-28 space-y-5">

        {/* Organ Donor Card */}
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: "1.586" }}>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/39641633c_organdonor.jpg"
            alt="Organ donor card"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Medicare Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-sm cursor-pointer relative"
          style={{ aspectRatio: "1.586" }}
          onClick={() => navigate(createPageUrl("MedicareCard"))}
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/37f9c6da5_medicarecard.png"
            alt="Medicare card"
            className="w-full h-full object-cover"
          />
          <div className="absolute" style={{ top: "26.5%", left: "29.5%" }}>
            <span
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "1.15rem",
                fontWeight: "bold",
                letterSpacing: "0.15em",
                color: "#111",
              }}
            >
              {formatted}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}