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
      <div className="absolute top-0 left-0 right-0 bg-[#4dcfef] px-5 py-4 flex items-center justify-between border-b border-[#3ba5c4]">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.1113 57.3535" className="h-8">
            <g>
              <path d="M45.7759,33.8682c-0.0381,0.0644-0.0845,0.1162-0.1485,0.1484"/>
              <path d="M47.1255,23.3135c0.1567,0-0.126-0.2832c0-0.1563-0.126-0.2852-0.2827-0.2852c-0.1553,0-0.2817,0.1289-0.2817,0.2852C46.8438,23.1875,46.9702,23.3135,47.1255,23.3135L47.1255,23.3135z"/>
              <path d="M60.2026,11.3916v-0.0039H50.0337v0.0039h-0.0015l0.0083,8.2129c0,0.793,0.335,1.4863,0.7984,1.6992l3.9111,2.336c0.0869,0.0986,0.2139,0.1601,0.3574,0.1601c0.1231,0,0.2339-0.0478,0.3174-0.123l3.9717-2.3731c0.4643-0.2129,0.7998-0.9062,0.7998-1.6992l0.0078-8.2129H60.2026L60.2026,11.3916z M53.4131,13.7696h-0.8794V11.666h0.8794V13.7696L53.4131,13.7696z M52.7744,14.502l0.1255-0.1299l-0.0791-0.1436l0.1655,0.0176l0.0977-0.1748l0.0981,0.1719l0.166-0.0147l-0.0776,0.1436l0.125,0.1299l-0.1592,0.0312v0.1778l-0.1523-0.1133l-0.1504,0.1133v-0.1778L52.7744,14.502L52.7744,14.502z M50.3198,17.1182v-1.9961h1.0679v1.9961H50.3198L50.3198,17.1182z M50.4961,14.2285l0.1636,0.0176l0.0996-0.1748l0.0971,0.1719l0.1656-0.0147l-0.0767,0.1436l0.1245,0.1299l-0.1592,0.0312v0.1778l-0.1513-0.1133l-0.1514,0.1133v-0.1778l-0.1587-0.0312l0.125-0.1299L50.4961,14.2285L50.4961,14.2285z M51.7022,16.2588l0.164,0.0166l0.0991-0.1728l0.0967,0.1709l0.1665-0.0147l-0.0776,0.1426l0.1245,0.1309l-0.1592,0.0302v0.1787l-0.1509-0.1132l-0.1513,0.1132v-0.1787l-0.1597-0.0302l0.125-0.1309L51.7022,16.2588L51.7022,16.2588z"/>
            </g>
          </svg>
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