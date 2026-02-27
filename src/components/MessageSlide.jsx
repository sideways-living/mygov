import { X } from "lucide-react";
import MessageMyGov from "@/pages/MessageMyGov";
import MessageMyHealth from "@/pages/MessageMyHealth";

const messageComponents = {
  MessageMyGov: MessageMyGov,
  MessageMyHealth: MessageMyHealth,
};

export default function MessageSlide({ message, onClose }) {
  const MessageComponent = messageComponents[message.page];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        style={{ opacity: message ? 1 : 0, pointerEvents: message ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Slide panel */}
      <div
        className="fixed top-0 right-0 h-screen w-screen bg-white z-50 overflow-y-auto transition-transform duration-300"
        style={{ transform: message ? "translateX(0)" : "translateX(100%)" }}
      >
        {MessageComponent && <MessageComponent onClose={onClose} />}
      </div>
    </>
  );
}