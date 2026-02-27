import { Search, Paperclip, ChevronRight, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useRef, useState } from "react";

const messages = [
  {
    id: 1,
    from: "My Health Record",
    date: "21/6/2025",
    subject: "A new myGov account has been linked to your My Health Record",
    hasAttachment: false,
    page: "MessageMyHealth",
  },
  {
    id: 2,
    from: "myGov",
    date: "4/5/2025",
    subject: "Important information about your myGov account",
    hasAttachment: true,
    page: "MessageMyGov",
  },
];

const PULL_THRESHOLD = 60;

export default function Inbox() {
  const navigate = useNavigate();
  const [pullDistance, setPullDistance] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const touchStartY = useRef(null);
  const listRef = useRef(null);

  const handleTouchStart = (e) => {
    if (listRef.current?.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      setPullDistance(Math.min(delta, PULL_THRESHOLD + 20));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance >= PULL_THRESHOLD) {
      setRevealed(true);
    } else {
      setPullDistance(0);
    }
    touchStartY.current = null;
    setPullDistance(0);
  };

  const searchBarHeight = revealed ? 56 : Math.min(pullDistance, PULL_THRESHOLD) * (56 / PULL_THRESHOLD);
  const searchBarOpacity = revealed ? 1 : Math.min(pullDistance / PULL_THRESHOLD, 1);

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4" style={{ minHeight: 110 }}>
        <div className="flex items-center justify-end gap-5 mb-1">
          <Folder size={24} className="text-black" />
        </div>
        <span className="text-black font-bold text-2xl">Inbox</span>
      </div>

      {/* Pull-to-reveal search bar — teal extension */}
      <div
        className="bg-[#4dcfef] overflow-hidden transition-all duration-200 flex items-center justify-center"
        style={{ height: revealed ? 56 : searchBarHeight, opacity: searchBarOpacity }}
      >
        <div className="flex items-center gap-2 bg-white/30 rounded-full px-4 py-2" style={{ width: "95%" }}>
          <Search size={16} className="text-black/60 flex-shrink-0" />
          <span className="text-black/60 text-sm">Search</span>
        </div>
      </div>

      {/* Message list */}
      <div
        ref={listRef}
        className="flex-1 pb-24 bg-white overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="px-4 py-4 border-b border-gray-200 flex items-center justify-between gap-2 cursor-pointer active:bg-gray-50"
            onClick={() => navigate(createPageUrl(msg.page))}
          >
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