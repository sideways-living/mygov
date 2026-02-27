import { ChevronLeft, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MessageMyHealth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-1">
          <button onClick={() => navigate(-1)} className="text-black">
            <ChevronLeft size={24} />
          </button>
          <Folder size={24} className="text-black" />
        </div>
        <h1 className="text-black font-bold text-2xl mt-1">Message</h1>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 pt-4 pb-24">
        <p className="text-gray-500 text-sm mb-1">My Health Record</p>
        <h2 className="text-gray-900 font-bold text-xl leading-snug mb-3">
          A new myGov account has been linked to your My Health Record
        </h2>

        <div className="flex items-center gap-3 mb-1">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">21/6/2025, 7:31 pm</span>
          <span className="text-gray-400 text-xs">Expires 21/6/2030</span>
        </div>

        <div className="border-t border-gray-200 mt-3 pt-4 text-sm text-gray-800 space-y-4 leading-relaxed">
          <p>Dear DANIEL</p>
          <p>A new myGov account has been linked to your My Health Record and can be used to access your information.</p>
          <p>The myGov account that was previously linked has been 'de-linked'.</p>
          <p>If you did not create the new myGov link, please contact the My Health Record Help line immediately on 1800 723 471.</p>
          <p>Regards,</p>
          <p>Australian Digital Health Agency (My Health Record System Operator)</p>
        </div>
      </div>
    </div>
  );
}