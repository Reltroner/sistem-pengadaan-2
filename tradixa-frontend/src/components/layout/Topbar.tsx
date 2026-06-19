"use client";

import { usePathname } from "next/navigation";
import { procurementNavigationItems } from "@/features/procurement-negotiation/config/procurement-navigation.config";
import { BackendHealthBadge } from "@/components/BackendHealthBadge";

export function Topbar() {
  const pathname = usePathname();
  
  const currentNav = procurementNavigationItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {currentNav ? currentNav.label : "Tradixa E-Procurement"}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <BackendHealthBadge />
        <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
          <span className="sr-only">Notifications</span>
        </button>
      </div>
    </header>
  );
}
