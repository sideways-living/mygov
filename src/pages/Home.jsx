import { useState } from "react";
import { Shield, Settings, MoreHorizontal, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const userName = "Daniel";
  const lastSigned = new Date();

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col max-w-sm mx-auto relative">
      {/* Cyan Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-8 rounded-b-3xl relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* myGov play button logo */}
            <div className="flex items-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <polygon points="6,4 22,14 6,24" fill="black" />
                <polygon points="14,4 28,14 14,24" fill="black" opacity="0.4" />
              </svg>
            </div>
            <span className="text-black font-semibold text-xl tracking-tight">myGov</span>
          </div>
          <button className="text-black">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 pt-5 pb-24">
        {/* Greeting */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Hi, {userName}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Last signed into the app:</p>
          <p className="text-sm text-gray-500">{format(lastSigned, "d MMM yyyy 'at' h:mm aa")}</p>
        </div>

        {/* Alerts Card */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">Alerts</h2>
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-gray-700" strokeWidth={1.5} />
              </div>
              <p className="text-sm text-gray-800 font-medium leading-snug">
                New details from your<br />Digital ID
              </p>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MoreHorizontal size={18} />
              <ChevronRight size={18} />
            </div>
          </div>
        </div>

        {/* Manage Home Button */}
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 border border-gray-400 rounded-full px-5 py-2.5 text-sm text-gray-700 font-medium bg-white hover:bg-gray-50 transition-colors">
            <Settings size={16} />
            Manage home
          </button>
        </div>
      </div>
    </div>
  );
}