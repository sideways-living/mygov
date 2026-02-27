import { Search, Paperclip, ChevronRight, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const messages = [
  {
    id: 1,
    from: "My Health Record",
    date: "21/6/2025",
    subject: "A new myGov account has been linked to your My Health Record",
    hasAttachment: false,
  },
  {
    id: 2,
    from: "myGov",
    date: "4/5/2025",
    subject: "Important information about your myGov account",
    hasAttachment: true,
  },
];

export default function Inbox() {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-black font-bold text-2xl">Inbox</span>
          <Folder size={24} className="text-black" />
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mt-3">
          <Search size={16} className="text-gray-400" />
          <span className="text-gray-400 text-sm">Search</span>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 pb-24 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className="px-4 py-4 border-b border-gray-200 flex items-center justify-between gap-2 cursor-pointer active:bg-gray-50">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 text-sm">{msg.from}</span>
                <span className="text-gray-400 text-xs ml-2 whitespace-nowrap">{msg.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 text-sm truncate">{msg.subject}</span>
                {msg.hasAttachment && <Paperclip size={13} className="text-gray-400 flex-shrink-0" />}
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}