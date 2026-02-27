import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const DEFAULTS = {
  // Common profile information
  firstName: "Daniel",
  middleName: "",
  surname: "Greenyer",
  address1: "",
  address2: "",
  suburb: "",
  state: "NSW",
  postcode: "",
  
  // Medicare card
  medicareNumber: "2555 69143 6",
  medicareCardPosition: "1",
  medicareMiddleInitial: "",
  medicareValidTo: "Jul 27",
  
  // Pensioner Concession card
  pensionerCRN: "",
  pensionerStartDate: "",
  pensionerExpiryDate: "",
  
  // Organ Donor card
  organDonorID: "",
  
  screenLockPin: "",
  requiredCards: {
    pensionConcession: false,
    medicare: true,
    organ: true,
  },
};

export function getProfile() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("mygov_profile") || "{}") };
  } catch {
    return DEFAULTS;
  }
}

export function saveProfile(data) {
  localStorage.setItem("mygov_profile", JSON.stringify(data));
}

export default function Profile() {
  const [form, setForm] = useState(getProfile);

  const handle = (key, val) => {
    const updated = { ...form, [key]: val };
    setForm(updated);
    saveProfile(updated);
  };

  const handleCardToggle = (card) => {
    const currentCount = Object.values(form.requiredCards).filter(Boolean).length;
    const isEnabling = !form.requiredCards[card];
    
    // Prevent enabling more than 2 cards
    if (isEnabling && currentCount >= 2) {
      return;
    }
    
    const updated = {
      ...form,
      requiredCards: {
        ...form.requiredCards,
        [card]: !form.requiredCards[card],
      },
    };
    setForm(updated);
    saveProfile(updated);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col max-w-sm mx-auto">
      <div className="bg-[#4dcfef] px-5 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <Link to={createPageUrl("Home")}>
            <ArrowLeft size={22} className="text-black" />
          </Link>
          <span className="text-black font-semibold text-lg">Profile / Card Details</span>
        </div>
      </div>

      <div className="flex-1 px-4 pt-6 pb-24 space-y-6">
        {/* Common Profile Information */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <p className="font-semibold text-gray-800 mb-3">Personal Information</p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={e => handle("firstName", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. Daniel"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Middle Name</label>
              <input
                type="text"
                value={form.middleName}
                onChange={e => handle("middleName", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Surname</label>
              <input
                type="text"
                value={form.surname}
                onChange={e => handle("surname", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. Greenyer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Address Line 1</label>
            <input
              type="text"
              value={form.address1}
              onChange={e => handle("address1", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
              placeholder="Street address"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Address Line 2</label>
            <input
              type="text"
              value={form.address2}
              onChange={e => handle("address2", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
              placeholder="Unit/Suite (optional)"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Suburb</label>
              <input
                type="text"
                value={form.suburb}
                onChange={e => handle("suburb", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="Suburb"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">State</label>
              <input
                type="text"
                value={form.state}
                onChange={e => handle("state", e.target.value.toUpperCase())}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="NSW"
                maxLength="3"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Postcode</label>
              <input
                type="text"
                value={form.postcode}
                onChange={e => handle("postcode", e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. 2000"
                maxLength="4"
              />
            </div>
          </div>
        </div>

         {/* Required Cards Section */}
         <div className="bg-white rounded-xl p-4 shadow-sm">
           <p className="font-semibold text-gray-800 mb-3">Which cards are required in your wallet? (Max 2)</p>
           <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.requiredCards?.pensionConcession || false}
                onChange={() => handleCardToggle("pensionConcession")}
                className="w-5 h-5 accent-teal-500"
              />
              <span className="text-sm text-gray-700">Pension Concession Card</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.requiredCards?.medicare || false}
                onChange={() => handleCardToggle("medicare")}
                className="w-5 h-5 accent-teal-500"
              />
              <span className="text-sm text-gray-700">Medicare</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.requiredCards?.organ || false}
                onChange={() => handleCardToggle("organ")}
                className="w-5 h-5 accent-teal-500"
              />
              <span className="text-sm text-gray-700">Organ Donor</span>
            </label>
          </div>
        </div>
        {/* Organ Donor */}
        {form.requiredCards?.organ && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <p className="font-semibold text-gray-800">Organ Donor Card</p>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Donor ID</label>
              <input
                type="text"
                value={form.organDonorID}
                onChange={e => handle("organDonorID", e.target.value.toUpperCase())}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. A12-345-678"
              />
            </div>
          </div>
          </div>
          )}

          {/* Medicare */}
        {form.requiredCards?.medicare && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <p className="font-semibold text-gray-800">Medicare Card</p>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Medicare Number</label>
              <input
                type="text"
                value={form.medicareNumber}
                onChange={e => handle("medicareNumber", e.target.value.replace(/[^\d\s]/g, ""))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. 2555 69143 6"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Card Position Number</label>
              <input
                type="text"
                value={form.medicareCardPosition}
                onChange={e => handle("medicareCardPosition", e.target.value.replace(/\D/g, "").slice(0, 1))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. 1"
                maxLength="1"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Middle Initial</label>
              <input
                type="text"
                value={form.medicareMiddleInitial}
                onChange={e => handle("medicareMiddleInitial", e.target.value.slice(0, 1).toUpperCase())}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. A"
                maxLength="1"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Valid To</label>
              <input
                type="text"
                value={form.medicareValidTo}
                onChange={e => handle("medicareValidTo", e.target.value.toUpperCase())}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. Jul 27"
              />
            </div>
          </div>
        )}

        {/* Pensioner Concession Card */}
        {form.requiredCards?.pensionConcession && (
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
            <p className="font-semibold text-gray-800">Pensioner Concession Card</p>

            <div>
              <label className="block text-xs text-gray-500 mb-1">CRN</label>
              <input
                type="text"
                value={form.pensionerCRN}
                onChange={e => handle("pensionerCRN", e.target.value.toUpperCase().replace(/[^\d\w]/g, ""))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. 123 456 789Y"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="text"
                value={form.pensionerStartDate}
                onChange={e => handle("pensionerStartDate", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. DD/MM/YYYY"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Expiry Date</label>
              <input
                type="text"
                value={form.pensionerExpiryDate}
                onChange={e => handle("pensionerExpiryDate", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. DD/MM/YYYY"
              />
            </div>
          </div>
        )}

        {/* Screen Lock PIN */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <p className="font-semibold text-gray-800">Screen Lock</p>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Set PIN (6 digits)</label>
            <input
              type="password"
              value={form.screenLockPin}
              onChange={e => handle("screenLockPin", e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
              placeholder="Enter 6 digits"
              maxLength="6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}