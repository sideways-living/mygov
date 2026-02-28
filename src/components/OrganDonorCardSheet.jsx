import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MoreHorizontal, ChevronRight, ArrowUpRight } from "lucide-react";

export default function OrganDonorCardSheet({ open, onClose, profile }) {
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

  const now = new Date();
  const lastUpdated = now.toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: animate ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="relative bg-[#f0f0f0] rounded-t-2xl w-full transition-transform duration-300 pb-10"
        style={{ transform: animate ? "translateY(0)" : "translateY(100%)" }}
      >
        {/* Top bar */}
        <div className="bg-[#4dcfef] rounded-t-2xl px-5 pt-5 pb-4 flex items-center justify-between">
          <button onClick={onClose}>
            <X size={22} className="text-black" />
          </button>
          <button>
            <MoreHorizontal size={22} className="text-black" />
          </button>
        </div>

        {/* Pink header */}
        <div className="bg-[#d0047a] px-5 py-6 text-center">
          <p className="text-white font-bold text-2xl">Organ donor card</p>
          <p className="text-white/90 text-sm mt-1">Australian Organ Donor Registry</p>
        </div>

        {/* Card details */}
        <div className="mx-4 mt-4 bg-white rounded-xl px-5 py-5 space-y-4 relative overflow-hidden">
          {/* Watermark */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[48px] font-bold text-[#4dcfef]/20 select-none pointer-events-none leading-none">
            myGov
          </span>

          <div>
            <p className="text-gray-500 text-xs">Name</p>
            <p className="text-black font-semibold text-base">
              {[profile?.firstName, profile?.surname].filter(Boolean).join(" ") || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Donor ID</p>
            <p className="text-black font-semibold text-base">{profile?.organDonorID || "—"}</p>
          </div>
        </div>

        {/* Action rows */}
        <div className="mx-4 mt-4 bg-white rounded-xl overflow-hidden divide-y divide-gray-100">
          <div className="flex items-center justify-between px-5 py-4 cursor-pointer active:bg-gray-50">
            <span className="text-black text-base">Donation preferences</span>
            <ChevronRight size={18} className="text-gray-500" />
          </div>
          <div className="flex items-center justify-between px-5 py-4 cursor-pointer active:bg-gray-50">
            <span className="text-black text-base">Manage preferences</span>
            <ArrowUpRight size={18} className="text-gray-500" />
          </div>
        </div>

        {/* Last updated */}
        <p className="text-center text-gray-400 text-xs mt-5">Last updated {lastUpdated}</p>
      </div>
    </div>,
    document.body
  );
}