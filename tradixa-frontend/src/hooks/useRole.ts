"use client";

import { useEffect, useState } from "react";

export type Role = "SALES" | "MANAGER" | "FINANCE" | "OWNER" | "DIREKTUR" | "ADMIN";

const ROLE_STORAGE_KEY = "tradixa_prototype_role";

export function useRole() {
  const [role, setRole] = useState<Role>("ADMIN");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
      const storedRole = localStorage.getItem(ROLE_STORAGE_KEY) as Role | null;
      if (storedRole) {
        setRole(storedRole);
      }
    }, 0);
  }, []);

  const changeRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    // Optional: trigger an event or reload to update server components,
    // For prototype, we might just reload the window to force SSR refetch.
    window.location.reload();
  };

  return { role, changeRole, isMounted };
}
