import type { PermissionKey, PermissionScope, UserRole } from "./roles.types";

export type PermissionRule = {
  role: UserRole;
  permission: PermissionKey;
  scope: PermissionScope;
};

export const permissionRules: PermissionRule[] = [
  { role: "ADMIN", permission: "spk:create", scope: "ALL" },
  { role: "ADMIN", permission: "spk:edit", scope: "ALL" },
  { role: "ADMIN", permission: "spk:view", scope: "ALL" },
  { role: "ADMIN", permission: "vendor:manage", scope: "ALL" },

  { role: "SALES", permission: "spk:create", scope: "OWN" },
  { role: "SALES", permission: "spk:edit", scope: "OWN" },
  { role: "SALES", permission: "spk:view", scope: "OWN" },
  { role: "SALES", permission: "negotiation:create", scope: "OWN" },
  { role: "SALES", permission: "negotiation:submit", scope: "OWN" },

  { role: "MANAGER", permission: "spk:view", scope: "TEAM" },
  { role: "MANAGER", permission: "approval:decide", scope: "TEAM" },

  { role: "FINANCE", permission: "spk:view", scope: "ALL" },
  { role: "FINANCE", permission: "po-draft:generate", scope: "ALL" },
  { role: "FINANCE", permission: "report:view", scope: "ALL" },

  { role: "OWNER", permission: "spk:view", scope: "ALL" },
  { role: "OWNER", permission: "approval:decide", scope: "ALL" },
  { role: "OWNER", permission: "report:view", scope: "ALL" },

  { role: "DIREKTUR", permission: "spk:view", scope: "ALL" },
  { role: "DIREKTUR", permission: "approval:decide", scope: "ALL" },
];
