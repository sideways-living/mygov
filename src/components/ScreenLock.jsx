import { useState } from "react";
import { getProfile } from "@/pages/Profile";
import PINEntry from "./PINEntry";
import MyGovLogo from "./MyGovLogo";

export default function ScreenLock({ onUnlock }) {
  const [showPINEntry, setShowPINEntry] = useState(false);
  const profile = getProfile();
  const firstName = profile.medicareFirstName.charAt(0).toUpperCase() + profile.medicareFirstName.slice(1).toLowerCase();

  if (showPINEntry) {
    return <PINEntry onSuccess={onUnlock} onBack={() => setShowPINEntry(false)} />;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#4dcfef] flex flex-col items-center justify-center w-screen">

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/d34c12912_Australian-government-stacked-black.png"
            alt="Australian Government"
            className="h-12"
          />
          <div className="flex items-center gap-1.5">
            <MyGovLogo size={20} />
            <span className="text-black font-semibold text-lg">myGov</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* 3D Barcode icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="3" height="6" fill="black" />
            <rect x="7" y="4" width="2" height="6" fill="black" />
            <rect x="10" y="4" width="3" height="6" fill="black" />
            <rect x="14" y="4" width="2" height="6" fill="black" />
            <rect x="17" y="4" width="3" height="6" fill="black" />
            <rect x="3" y="11" width="3" height="2" fill="black" />
            <rect x="7" y="11" width="2" height="2" fill="black" />
            <rect x="10" y="11" width="3" height="2" fill="black" />
            <rect x="14" y="11" width="2" height="2" fill="black" />
            <rect x="17" y="11" width="3" height="2" fill="black" />
            <rect x="4" y="14" width="2" height="5" fill="black" />
            <rect x="7" y="14" width="3" height="5" fill="black" />
            <rect x="11" y="14" width="2" height="5" fill="black" />
            <rect x="14" y="14" width="3" height="5" fill="black" />
            <rect x="18" y="14" width="2" height="5" fill="black" />
          </svg>
          
          {/* Info icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
            <text x="12" y="16" textAnchor="middle" fontSize="16" fontWeight="bold" fill="black">i</text>
          </svg>
        </div>
      </div>

      {/* Welcome message */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 mt-12">
        <p className="text-black text-lg">Welcome back</p>
        <h1 className="text-black text-5xl font-bold">{firstName}</h1>
      </div>

      {/* Acknowledgment text */}
      <p className="text-black text-xs text-center px-6 mb-8">
        We acknowledge the Traditional Custodians of the lands we live on. We pay our respects to all Elders, past and present, of all Aboriginal and Torres Strait Islander nations.
      </p>

      {/* Buttons */}
      <div className="w-full px-5 pb-8 space-y-3">
        <button
          onClick={() => setShowPINEntry(true)}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold text-base"
        >
          Continue
        </button>
        <button
          onClick={() => {}} 
          className="w-full text-black text-base font-normal"
        >
          Sign in as someone else
        </button>
      </div>
    </div>
  );
}