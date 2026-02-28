import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ClipboardList } from "lucide-react";
import ScreenLock from "@/components/ScreenLock";
import { getProfile } from "@/pages/Profile";

const HomeIcon = ({ active }) => {
  const fill = active ? "#111827" : "#9ca3af";
  const stroke = "white";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill={fill}>
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

const MailIcon = ({ active }) => {
  const fill = active ? "#111827" : "#9ca3af";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      {/* Envelope body */}
      <rect x="2" y="5" width="20" height="14" rx="1" fill={fill} />
      {/* X lines */}
      <line x1="2" y1="5" x2="12" y2="13" stroke="white" strokeWidth="1.5" />
      <line x1="22" y1="5" x2="12" y2="13" stroke="white" strokeWidth="1.5" />
    </svg>
  );
};

const ServicesIcon = ({ active }) => {
  const fill = active ? "#111827" : "#9ca3af";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="1" fill={fill} />
      <rect x="13" y="2" width="9" height="9" rx="1" fill={fill} />
      <rect x="2" y="13" width="9" height="9" rx="1" fill={fill} />
      <rect x="13" y="13" width="9" height="9" rx="1" fill={fill} />
    </svg>
  );
};

const navItems = [
  { label: "Home", icon: null, page: "Home", custom: "home" },
  { label: "Wallet", icon: ClipboardList, page: "Wallet" },
  { label: "Inbox", icon: null, page: "Inbox", custom: "mail" },
  { label: "Services", icon: null, page: "Services", custom: "services" },
];

export default function Layout({ children, currentPageName }) {
  const [isLocked, setIsLocked] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState(null);

  useEffect(() => {
    // Preload all images
    const images = [
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/d34c12912_Australian-government-stacked-black.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/8b73f081a_color-replaced1.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/4be0a3ce6_info1.png",
      "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a10b3e254d206639198071/myGov-logo.png",
    ];
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const profile = getProfile();
    const hasPin = profile.screenLockPin && profile.screenLockPin.length > 0;
    setIsLocked(hasPin);
  }, []);

  useEffect(() => {
    // Set statusbar color based on page
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const tealHeaderPages = ["Profile", "Home", "Wallet", "Inbox", "Services"];
    if (tealHeaderPages.includes(currentPageName)) {
      themeColor.setAttribute('content', '#4dcfef');
    } else {
      themeColor.setAttribute('content', '#f0f0f0');
    }
  }, [currentPageName]);

  useEffect(() => {
    if (!isLocked) {
      let timerId = null;

      const handleActivity = () => {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
          const profile = getProfile();
          if (profile.screenLockPin && profile.screenLockPin.length > 0) {
            setIsLocked(true);
          }
        }, 2 * 60 * 1000); // 2 minutes
      };

      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keypress", handleActivity);
      window.addEventListener("click", handleActivity);
      window.addEventListener("touch", handleActivity);

      handleActivity();

      return () => {
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keypress", handleActivity);
        window.removeEventListener("click", handleActivity);
        window.removeEventListener("touch", handleActivity);
        if (timerId) clearTimeout(timerId);
      };
    }
  }, [isLocked]);

  if (isLocked) {
    return <ScreenLock onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#f0f0f0]">
      <style>{`
        * { 
          -webkit-touch-callout: none;
          -webkit-user-select: none;
        }
        html, body { 
          background: #4dcfef;
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        @supports (viewport-fit: cover) {
          body {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>

      {/* Page content */}
      <div>{children}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 w-screen flex justify-center">
        <div className="flex items-stretch w-4/5">
          {navItems.map(({ label, icon: Icon, page, custom }) => {
            const isActive = currentPageName === page;
            return (
              <Link
                key={page}
                to={createPageUrl(page)}
                className="flex-1 flex flex-col items-center justify-center py-4 gap-1"
              >
                {custom === "home" ? (
                  <HomeIcon active={isActive} />
                ) : custom === "mail" ? (
                  <MailIcon active={isActive} />
                ) : custom === "services" ? (
                  <ServicesIcon active={isActive} />
                ) : (
                  <Icon
                    size={28}
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