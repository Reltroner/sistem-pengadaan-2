"use client";

import { useEffect, useState } from "react";
import { checkBackendHealth } from "@/features/procurement-negotiation/services/procurement-data-source.service";

export function BackendHealthBadge() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const check = async () => {
      const online = await checkBackendHealth();
      if (mounted) setIsOnline(online);
    };
    
    check();
    const interval = setInterval(check, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (isOnline === null) return null;

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
      <span className="text-xs font-medium text-gray-700">
        {isOnline ? "Backend Online" : "Mock Fallback"}
      </span>
    </div>
  );
}
