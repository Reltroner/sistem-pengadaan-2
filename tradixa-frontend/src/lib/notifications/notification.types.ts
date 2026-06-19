import type { UserRole } from "../rbac/roles.types";

export type NotificationSourceType =
  | "SPK"
  | "NEGOTIATION"
  | "APPROVAL"
  | "PO_DRAFT"
  | "DELIVERY"
  | "BAST"
  | "INVOICE"
  | "AR_SP2D";

export type AppNotification = {
  id: string;
  recipientRole: UserRole;
  title: string;
  message: string;
  sourceType: NotificationSourceType;
  sourceId: string;
  readAt?: string;
  createdAt: string;
};
