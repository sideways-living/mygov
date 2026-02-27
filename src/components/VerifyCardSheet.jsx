import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, RefreshCw, AlertCircle } from "lucide-react";

export default function VerifyCardSheet({ open, onClose }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [status, setStatus] = useState("loading"); // "loading" | "error"

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

  const startLoad = () => {
    setStatus("loading");
    setTimeout(() => setStatus("error"), 2000);
  };

  useEffect(() => {
    if (visible) {
      startLoad();
    }
  }, [visible]);

  if (!visible) return null;

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
          <span className="text-base font-semibold text-black">Verify card</span>
          <div className="w-6" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
          {/* Barcode placeholder */}
          <div
            className="w-full rounded-2xl border-4 border-gray-300 flex items-center justify-center"
            style={{ aspectRatio: "1", borderStyle: "dashed" }}
          >
            {status === "loading" && (
              <RefreshCw size={60} className="text-gray-300 animate-spin" />
            )}
            {status === "error" && (
              <AlertCircle size={60} className="text-red-500" />
            )}
          </div>

          {/* Status message */}
          <p className="text-sm text-gray-500 text-center">
            {status === "loading"
              ? "Loading verification code"
              : "Problem loading verification code."}
          </p>

          {/* Refresh button (shown when error) */}
          {status === "error" && (
            <button
              onClick={startLoad}
              className="flex items-center gap-2 border border-black rounded-xl px-5 py-3 text-sm font-semibold text-black active:bg-gray-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}