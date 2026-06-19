import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { ProcurementAuditLog } from "../types";

export function getProcurementAuditLogs(): ProcurementAuditLog[] {
  return procurementMockRepository.getDatabaseSnapshot().auditLogs;
}

export function getProcurementAuditLogsBySPKId(spkId: string): ProcurementAuditLog[] {
  return getProcurementAuditLogs().filter((auditLog) => auditLog.spkId === spkId);
}

export function getProcurementAuditLogsByEntity(entityId: string): ProcurementAuditLog[] {
  return getProcurementAuditLogs().filter((auditLog) => auditLog.entityId === entityId);
}

export function getLatestProcurementAuditLog(spkId: string): ProcurementAuditLog | undefined {
  return getProcurementAuditLogsBySPKId(spkId)
    .slice()
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))[0];
}
