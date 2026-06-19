export type AuditEntityType =
  | "SPK"
  | "PROCUREMENT_ITEM"
  | "VENDOR"
  | "VENDOR_OFFER"
  | "NEGOTIATION"
  | "APPROVAL"
  | "PO_DRAFT"
  | "DELIVERY"
  | "BAST"
  | "INVOICE"
  | "AR_SP2D";

export type AuditLog = {
  id: string;
  entityType: AuditEntityType;
  entityId: string;
  action: string;
  actorId: string;
  before?: unknown;
  after?: unknown;
  createdAt: string;
};
