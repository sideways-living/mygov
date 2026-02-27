import { Pencil, Plus, ChevronRight, ArrowUpRight } from "lucide-react";

const services = [
  { name: "Medicare", date: "Linked 21 Jun 2025" },
  { name: "My Health Record", date: "Linked 21 Jun 2025" },
  { name: "National Redress Scheme", date: "Linked 28 Apr 2025" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4">
        <div className="flex items-center justify-end gap-5 mb-1">
          <Pencil size={18} className="text-black" />
          <Plus size={22} className="text-black" />
        </div>
        <h1 className="text-black font-bold text-2xl">Services</h1>
      </div>

      {/* Content */}
      <div className="flex-1 pb-24">
        {/* Forms and Applications */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <span className="text-gray-900 text-sm">Forms and Applications</span>
          <ChevronRight size={18} className="text-gray-400" />
        </div>

        {/* Linked services */}
        <div className="mt-5">
          <p className="text-gray-500 text-sm px-4 mb-2">Linked services</p>
          <div className="bg-white">
            {services.map((svc, i) => (
              <div key={i} className="px-4 py-4 border-b border-gray-100 flex items-center justify-between cursor-pointer active:bg-gray-50">
                <div>
                  <p className="text-gray-900 text-sm font-medium">{svc.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{svc.date}</p>
                </div>
                <ArrowUpRight size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}