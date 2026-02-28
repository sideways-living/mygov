import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Inbox, Trash2, FolderPlus } from "lucide-react";

export default function FoldersSheet({ open, onClose, totalMessages = 0 }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [open]);

  if (!visible) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        style={{ opacity: animate ? 1 : 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#f0f0f0] rounded-t-2xl transition-transform duration-300"
        style={{ transform: animate ? "translateY(0)" : "translateY(100%)", minHeight: "60vh" }}
      >
        {/* Header */}
        <div className="bg-[#4dcfef] rounded-t-2xl px-5 py-4 flex items-center justify-between">
          <span className="font-bold text-black text-lg">Folders</span>
          <button onClick={onClose}>
            <X size={22} className="text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pt-5 space-y-1">
          {/* Inbox row - highlighted */}
          <div className="bg-[#c8eef8] rounded-xl px-4 py-3 flex items-center gap-3">
            <Inbox size={20} className="text-black" />
            <span className="font-bold text-black text-base">Inbox</span>
          </div>

          {/* Trash row */}
          <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3">
            <Trash2 size={20} className="text-red-500" />
            <span className="text-black text-base">Trash</span>
          </div>
        </div>

        {/* Create new folder */}
        <div className="px-4 pt-5">
          <button className="flex items-center gap-2 text-[#1a7fc1] text-base font-medium">
            <FolderPlus size={20} />
            Create new folder
          </button>
        </div>

        {/* Stats */}
        <div className="px-4 pt-6 space-y-1">
          <p className="text-gray-400 text-sm">Unread messages: 0</p>
          <p className="text-gray-400 text-sm">Total messages: {totalMessages}</p>
          <p className="text-gray-400 text-sm mt-2">Inbox notifications are sent by SMS</p>
        </div>
      </div>
    </>,
    document.body
  );
}