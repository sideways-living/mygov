import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ClipboardList } from "lucide-react";

const HomeIcon = ({ active }) => {
  const fill = active ? "#111827" : "#9ca3af";
  const stroke = "white";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={fill}>
      {/* Chimney */}
      <rect x="14" y="2" width="3" height="5" fill={fill} />
      {/* Roof */}
      <polygon points="2,12 12,3 22,12" fill={fill} />
      {/* Body */}
      <rect x="4" y="11" width="16" height="11" fill={fill} />
      {/* Door */}
      <rect x="9.5" y="16" width="5" height="6" fill={stroke} />
    </svg>
  );
};

const navItems = [
  { label: "Home", icon: null, page: "Home", custom: "home" },
  { label: "Wallet", icon: ClipboardList, page: "Wallet" },
  { label: "Inbox", icon: Mail, page: "Inbox" },
  { label: "Services", icon: LayoutGrid, page: "Services" },
];

export default function Layout({ children, currentPageName }) {
  return (
    <div className="relative min-h-screen bg-[#f0f0f0]">
      <style>{`
        body { background: #f0f0f0; }
      `}</style>

      {/* Page content */}
      <div>{children}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 z-50">
        <div className="flex items-stretch">
          {navItems.map(({ label, icon: Icon, page, custom }) => {
            const isActive = currentPageName === page;
            return (
              <Link
                key={page}
                to={createPageUrl(page)}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
              >
                {custom === "home" ? (
                  <HomeIcon active={isActive} />
                ) : (
                  <Icon
                    size={22}
                    style={
                      isActive
                        ? { fill: "#111827", stroke: "white", strokeWidth: 1.5 }
                        : { fill: "#9ca3af", stroke: "white", strokeWidth: 1.5 }
                    }
                  />
                )}
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}