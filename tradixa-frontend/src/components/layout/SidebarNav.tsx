"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { procurementNavigationItems } from "@/features/procurement-negotiation/config/procurement-navigation.config";
import { useRole } from "@/hooks/useRole";

export function SidebarNav() {
  const pathname = usePathname();
  const { role, isMounted } = useRole();

  if (!isMounted) return <aside className="w-64 bg-slate-900 flex-shrink-0 flex flex-col h-screen" />;

  const visibleNavItems = procurementNavigationItems.filter((item) =>
    item.ownerRoles.includes(role)
  );

  return (
    <aside className="w-64 bg-slate-900 flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Tradixa<span className="text-blue-400">.</span>
        </h1>
      </div>
      <div className="px-4 py-6 flex-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Procurement (M1)
        </div>
        <nav className="flex flex-col gap-1">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800 shrink-0">
        <Link
          href="/prototype-role-switcher"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
            {role.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-white truncate">{role}</div>
            <div className="text-xs text-slate-400 truncate">Change Role</div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
