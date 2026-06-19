import { permissionRules } from "./permissions.config";
import type { PermissionKey, PermissionScope, UserRole } from "./roles.types";

export function getPermissionScope(role: UserRole, permission: PermissionKey): PermissionScope {
  return (
    permissionRules.find((rule) => rule.role === role && rule.permission === permission)?.scope ??
    "NONE"
  );
}

export function can(role: UserRole, permission: PermissionKey): boolean {
  return getPermissionScope(role, permission) !== "NONE";
}
