import type { DomainEventName } from "../../../lib/events/domain-events.types";

export type ProcurementEventDirection = "OUTBOUND" | "INBOUND" | "INTERNAL";

export type ProcurementEventDefinition = {
  name: DomainEventName;
  direction: ProcurementEventDirection;
  description: string;
};

export const procurementEventDefinitions: ProcurementEventDefinition[] = [
  {
    name: "SPK_CREATED",
    direction: "OUTBOUND",
    description: "SPK draft has been created and dashboard/audit projection should update.",
  },
  {
    name: "SPK_SUBMITTED",
    direction: "OUTBOUND",
    description: "SPK has been submitted and negotiation can be opened.",
  },
  {
    name: "NEGOTIATION_OPENED",
    direction: "INTERNAL",
    description: "Negotiation session has been opened for submitted SPK.",
  },
  {
    name: "VENDOR_OFFER_ADDED",
    direction: "INTERNAL",
    description: "Vendor offer has been added and price comparison should recalculate.",
  },
  {
    name: "VENDOR_SELECTED",
    direction: "INTERNAL",
    description: "Vendor recommendation has been selected for approval submission.",
  },
  {
    name: "NEGOTIATION_SUBMITTED",
    direction: "OUTBOUND",
    description: "Negotiation result is submitted to M2 Approval Management.",
  },
  {
    name: "APPROVAL_APPROVED",
    direction: "INBOUND",
    description: "Approval has been completed and M1 can generate PO draft handoff.",
  },
  {
    name: "PO_DRAFT_CREATED",
    direction: "OUTBOUND",
    description: "PO draft has been generated and handed off to M3 PO Vendor Management.",
  },
  {
    name: "AUDIT_LOG_CREATED",
    direction: "INTERNAL",
    description: "Important procurement action has been recorded into audit trail.",
  },
  {
    name: "NOTIFICATION_CREATED",
    direction: "OUTBOUND",
    description: "Role-based notification has been created from procurement action.",
  },
];
