"use client";

import { useRole, Role } from "@/hooks/useRole";

const roles: Role[] = ["SALES", "MANAGER", "FINANCE", "OWNER", "DIREKTUR", "ADMIN"];

export function RoleSwitcher() {
  const { role, changeRole, isMounted } = useRole();

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="space-y-1 text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Prototype Role</h2>
        <p className="text-sm text-gray-500">
          Select a role to view the app from their perspective.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => changeRole(r)}
            className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors border ${
              role === r
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
