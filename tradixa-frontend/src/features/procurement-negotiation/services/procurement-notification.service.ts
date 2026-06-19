import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { UserRole } from "../../../lib/rbac/roles.types";
import type { ProcurementNotification } from "../types";

export function getProcurementNotifications(): ProcurementNotification[] {
  return procurementMockRepository.getDatabaseSnapshot().notifications;
}

export function getProcurementNotificationsByRole(role: UserRole): ProcurementNotification[] {
  return getProcurementNotifications().filter((notification) => notification.recipientRole === role);
}

export function getUnreadProcurementNotificationsByRole(role: UserRole): ProcurementNotification[] {
  return getProcurementNotificationsByRole(role).filter((notification) => !notification.readAt);
}

export function getProcurementNotificationsBySPKId(spkId: string): ProcurementNotification[] {
  return getProcurementNotifications().filter((notification) => notification.spkId === spkId);
}
