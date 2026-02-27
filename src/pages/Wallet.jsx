import { CreditCard } from "lucide-react";

export default function Wallet() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col max-w-sm mx-auto">
      <div className="bg-[#4dcfef] px-5 pt-10 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polygon points="6,4 22,14 6,24" fill="black" />
              <polygon points="14,4 28,14 14,24" fill="black" opacity="0.4" />
            </svg>
            <span className="text-black font-semibold text-xl tracking-tight">myGov</span>
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 pt-8 pb-24 flex flex-col items-center justify-center text-center">
        <CreditCard size={48} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Wallet</h2>
        <p className="text-sm text-gray-400">Your digital cards and documents will appear here.</p>
      </div>
    </div>
  );
}