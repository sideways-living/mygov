import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MoreHorizontal, QrCode, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function MedicareCardSheet({ open, onClose, profile }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    } else {
      setAnimate(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible) return null;

  const now = new Date();
  const lastUpdated = format(now, "d MMM yyyy 'at' h:mm aa").replace("AM", "am").replace("PM", "pm");

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: animate ? 0.4 : 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="relative w-full max-w-sm bg-white flex flex-col overflow-y-auto transition-transform duration-300"
        style={{
          transform: animate ? "translateY(0)" : "translateY(100%)",
          borderRadius: "16px 16px 0 0",
          height: "calc(100vh - 19px)", // ~0.5cm from top
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-8 pb-4 bg-[#4dcfef] flex-shrink-0">
          <button onClick={onClose}>
            <X size={22} className="text-black" />
          </button>
          <button>
            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
              <MoreHorizontal size={18} className="text-black" />
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 pb-10">
          {/* Green header + Card details */}
          <div className="mx-auto mt-4" style={{ width: "90%" }}>
            <div
              className="px-6 py-4 flex items-center justify-center rounded-t-lg"
              style={{
                background: "repeating-linear-gradient(45deg, #8fca8f, #8fca8f 2px, #7dbf7d 2px, #7dbf7d 8px)",
              }}
            >
              <span className="text-xl font-bold text-gray-900">Medicare card</span>
            </div>

            <div className="bg-white rounded-b-lg border border-gray-200 px-5 py-3 relative overflow-hidden">
              {/* Watermark */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-10" style={{ gap: 8 }}>
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-4xl font-black text-[#4dcfef] tracking-widest" style={{ letterSpacing: 8 }}>
                    myGov myGov
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-0.5">Card number</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{profile?.medicareNumber || "2555 69143 6"}</p>

              <p className="text-sm font-medium text-gray-900 mb-2">
                {profile?.medicarePosition || "1"}.{"  "}
                {`${profile?.medicareFirstName || "Daniel"} ${profile?.medicareMiddleInitial || ""} ${profile?.medicareLastName || "Greenyer"}`.trim()}
              </p>

              <p className="text-xs text-gray-500 mb-0.5">Valid to</p>
              <p className="text-sm font-medium text-gray-900">{profile?.medicareValidTo || "Jul 2027"}</p>
            </div>
          </div>

          {/* Manage your card */}
          <div className="mx-auto mt-3" style={{ width: "90%" }}>
            <div className="bg-gray-100 px-5 py-4 flex items-center justify-between cursor-pointer active:bg-gray-200">
              <span className="text-sm font-medium text-gray-800">Manage your card</span>
              <ArrowUpRight size={18} className="text-gray-600" />
            </div>
          </div>

          {/* Verify card */}
          <div className="mx-auto mt-3" style={{ width: "90%" }}>
            <div
              className="border border-black rounded-lg px-5 py-4 flex items-center justify-center gap-3 cursor-pointer active:bg-gray-50"
              onClick={() => { onClose(); navigate(createPageUrl("VerifyCard")); }}
            >
              <QrCode size={20} className="text-black" />
              <span className="text-sm font-semibold text-black">Verify card</span>
            </div>
          </div>

          {/* Last updated */}
          <p className="text-center text-xs text-gray-400 mt-6">Last updated {lastUpdated}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}