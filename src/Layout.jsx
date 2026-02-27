import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, CreditCard, Mail, LayoutGrid } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, page: "Home" },
  { label: "Wallet", icon: CreditCard, page: "Wallet" },
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
          {navItems.map(({ label, icon: Icon, page }) => {
            const isActive = currentPageName === page;
            return (
              <Link
                key={page}
                to={createPageUrl(page)}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.5}
                  className={isActive ? "text-gray-900" : "text-gray-500"}
                  fill={isActive && label === "Home" ? "currentColor" : "none"}
                />
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    isActive ? "text-gray-900" : "text-gray-500"
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