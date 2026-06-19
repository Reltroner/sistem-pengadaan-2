export type DomainEventName =
  | "SPK_CREATED"
  | "SPK_SUBMITTED"
  | "NEGOTIATION_OPENED"
  | "VENDOR_OFFER_ADDED"
  | "VENDOR_SELECTED"
  | "NEGOTIATION_SUBMITTED"
  | "APPROVAL_REQUIRED"
  | "APPROVAL_APPROVED"
  | "REVISION_REQUIRED"
  | "PO_DRAFT_CREATED"
  | "DASHBOARD_UPDATED"
  | "NOTIFICATION_CREATED"
  | "AUDIT_LOG_CREATED";

export type DomainEvent<TPayload = unknown> = {
  id: string;
  name: DomainEventName;
  payload: TPayload;
  occurredAt: string;
  actorId?: string;
};
