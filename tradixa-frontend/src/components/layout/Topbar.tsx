"use client";

import { usePathname } from "next/navigation";
import { procurementNavigationItems } from "@/features/procurement-negotiation/config/procurement-navigation.config";

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
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div>prototype mode</div>
      </div>
    </header>
  );
}
