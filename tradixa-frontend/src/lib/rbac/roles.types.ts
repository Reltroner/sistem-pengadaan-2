export type UserRole =
  | "ADMIN"
  | "SALES"
  | "MANAGER"
  | "FINANCE"
  | "OWNER"
  | "DIREKTUR"
  | "VENDOR";

export type PermissionScope = "OWN" | "TEAM" | "ALL" | "NONE";

export type PermissionKey =
  | "spk:create"
  | "spk:edit"
  | "spk:view"
  | "negotiation:create"
  | "negotiation:submit"
  | "approval:decide"
  | "po-draft:generate"
  | "vendor:manage"
  | "report:view";
