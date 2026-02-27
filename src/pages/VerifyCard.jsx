import { useState, useEffect } from "react";
import { X, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VerifyCard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "error"

  const startLoad = () => {
    setStatus("loading");
    setTimeout(() => setStatus("error"), 2000);
  };

  useEffect(() => {
    startLoad();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4 bg-[#4dcfef]">
        <button onClick={() => navigate(-1)}>
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
            <RefreshCw size={40} className="text-gray-300 animate-spin" />
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
  );
}