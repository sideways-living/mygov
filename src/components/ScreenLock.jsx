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

      {/* Header logo */}
      <div className="absolute top-6 left-5 right-5 flex items-center gap-2">
        <MyGovLogo size={28} />
        <span className="text-black font-semibold text-xl">myGov</span>
      </div>

      {/* Welcome message */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
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