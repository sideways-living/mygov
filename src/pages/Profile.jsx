import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const DEFAULTS = {
  organDonor: true,
  medicareNumber: "2555 69143 6",
  medicareFirstName: "Daniel",
  medicareMiddleInitial: "",
  medicareLastName: "Greenyer",
  medicarePosition: "1",
  medicareValidTo: "Jul 2027",
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
        {/* Required Cards Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="font-semibold text-gray-800 mb-3">Which cards are required in your wallet?</p>
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
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="font-semibold text-gray-800 mb-3">Organ Donor Card</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.organDonor}
              onChange={e => handle("organDonor", e.target.checked)}
              className="w-5 h-5 accent-pink-600"
            />
            <span className="text-sm text-gray-700">I am registered as an organ donor</span>
          </label>
        </div>

        {/* Medicare */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <p className="font-semibold text-gray-800">Medicare Card</p>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Card Number</label>
            <input
              type="text"
              value={form.medicareNumber}
              onChange={e => handle("medicareNumber", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
              placeholder="e.g. 2555 69143 6"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">First Name</label>
              <input
                type="text"
                value={form.medicareFirstName}
                onChange={e => handle("medicareFirstName", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. Daniel"
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
              <label className="block text-xs text-gray-500 mb-1">Last Name</label>
              <input
                type="text"
                value={form.medicareLastName}
                onChange={e => handle("medicareLastName", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
                placeholder="e.g. Greenyer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Position on Card</label>
            <input
              type="text"
              value={form.medicarePosition}
              onChange={e => handle("medicarePosition", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
              placeholder="e.g. 1"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Valid To</label>
            <input
              type="text"
              value={form.medicareValidTo}
              onChange={e => handle("medicareValidTo", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dcfef]"
              placeholder="e.g. Jul 2027"
            />
          </div>
        </div>

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