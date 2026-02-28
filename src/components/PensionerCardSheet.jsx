import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MoreHorizontal, QrCode } from "lucide-react";
import { createPageUrl } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function PensionerCardSheet({ open, onClose, profile }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [open]);

  if (!visible) return null;

  const fullName = [profile.firstName, profile.surname].filter(Boolean).join(" ");
  const address = [profile.address1, profile.address2, profile.suburb, profile.state, profile.postcode]
    .filter(Boolean)
    .join("\n");
  const now = new Date();
  const lastUpdated = now.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) +
    " at " + now.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        style={{ opacity: animate ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#f0f0f0] rounded-t-2xl transition-transform duration-300 overflow-y-auto"
        style={{ transform: animate ? "translateY(0)" : "translateY(100%)", maxHeight: "92vh" }}
      >
        {/* Header bar */}
        <div className="bg-[#4dcfef] rounded-t-2xl px-5 py-4 flex items-center justify-between">
          <button onClick={onClose}>
            <X size={22} className="text-black" />
          </button>
          <button>
            <MoreHorizontal size={22} className="text-black" />
          </button>
        </div>

        {/* Card */}
        <div className="mx-4 mt-5 rounded-2xl overflow-hidden shadow-md">
          {/* Purple header */}
          <div className="bg-[#8b3a5a] px-5 py-5">
            <span className="text-white font-bold text-xl">Pensioner Concession Card</span>
          </div>

          {/* Card body with watermark pattern */}
          <div className="relative bg-[#dceef8] px-5 py-4" style={{ minHeight: 80 }}>
            {/* Watermark text */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none select-none"
              style={{ opacity: 0.18, fontSize: "0.7rem", lineHeight: "1.6", letterSpacing: "0.15em", color: "#4a90b8", fontWeight: "bold", padding: "4px" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>PCC PCC PCC PCC PCC PCC PCC PCC PCC PCC PCC PCC</div>
              ))}
            </div>

            <div className="relative z-10">
              {profile.state && <p className="text-black text-sm font-medium mb-1">{profile.state === "VIC" ? "Victoria" : profile.state === "NSW" ? "New South Wales" : profile.state === "QLD" ? "Queensland" : profile.state === "SA" ? "South Australia" : profile.state === "WA" ? "Western Australia" : profile.state === "TAS" ? "Tasmania" : profile.state === "ACT" ? "Australian Capital Territory" : profile.state === "NT" ? "Northern Territory" : profile.state}</p>}
              <div className="flex items-center justify-between">
                <span className="text-black font-bold text-lg">CRN {profile.pensionerCRN || "—"}</span>
                <span className="text-black font-semibold text-sm">JSP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mx-4 mt-4 bg-[#eef5fb] rounded-2xl px-5 py-5 space-y-4 relative overflow-hidden">
          {/* Big watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ opacity: 0.06, fontSize: "8rem", fontWeight: "bold", color: "#4a90b8" }}>
            DV
          </div>

          <div className="relative z-10 space-y-4">
            <div>
              <p className="text-gray-400 text-xs">Name</p>
              <p className="text-black text-base">{fullName || "—"}</p>
            </div>
            {address && (
              <div>
                <p className="text-gray-400 text-xs">Address</p>
                {address.split("\n").map((line, i) => (
                  <p key={i} className="text-black text-base">{line}</p>
                ))}
              </div>
            )}
            {profile.pensionerStartDate && (
              <div>
                <p className="text-gray-400 text-xs">Card Start</p>
                <p className="text-black text-base">{profile.pensionerStartDate}</p>
              </div>
            )}
            {profile.pensionerExpiryDate && (
              <div>
                <p className="text-gray-400 text-xs">Expires</p>
                <p className="text-black text-base">{profile.pensionerExpiryDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Verify button */}
        <div className="mx-4 mt-5">
          <button
            className="w-full border border-gray-300 bg-white rounded-xl py-4 flex items-center justify-center gap-2 text-black font-semibold text-base"
            onClick={() => { onClose(); navigate(createPageUrl("VerifyCard")); }}
          >
            <QrCode size={20} />
            Verify card
          </button>
        </div>

        {/* Last updated */}
        <p className="text-center text-gray-400 text-xs mt-4 mb-8">Last updated {lastUpdated}</p>
      </div>
    </>,
    document.body
  );
}