import { Pencil, Plus, ChevronRight, ArrowUpRight } from "lucide-react";

const services = [
  { name: "Medicare", date: "Linked 21 Jun 2025" },
  { name: "My Health Record", date: "Linked 21 Jun 2025" },
  { name: "National Redress Scheme", date: "Linked 28 Apr 2025" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4">
        <div className="flex items-center justify-end gap-5 mb-1">
          <Pencil size={18} className="text-black" />
          <Plus size={22} className="text-black" />
        </div>
        <h1 className="text-black font-bold text-2xl">Services</h1>
      </div>

      {/* Content */}
      <div className="flex-1 pb-24 bg-white">
        {/* Forms and Applications */}
        <div className="mx-auto mt-4" style={{ width: "95%" }}>
          <div className="bg-gray-100 px-4 py-4 flex items-center justify-between">
            <span className="text-gray-900 text-sm">Forms and Applications</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>

        {/* Linked services */}
        <div className="mt-5 mx-auto" style={{ width: "95%" }}>
          <p className="text-gray-500 text-sm mb-2">Linked services</p>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {services.map((svc, i) => (
              <div key={i}>
                <div className="px-4 py-4 flex items-center justify-between cursor-pointer active:bg-gray-200">
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{svc.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{svc.date}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-gray-400" />
                </div>
                {i < services.length - 1 && <div className="border-t border-black/10 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}