import type { AuditLog } from "./audit.types";

const auditLogs: AuditLog[] = [];

export function recordAuditLog(log: AuditLog): AuditLog {
  auditLogs.push(log);
  return log;
}

export function getAuditLogsByEntity(entityId: string): AuditLog[] {
  return auditLogs.filter((log) => log.entityId === entityId);
}
