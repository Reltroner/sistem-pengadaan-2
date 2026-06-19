import type {
  IDRAmount,
  ISODateTimeString,
  ProcurementActorRef,
  ProcurementId,
} from "./procurement-common.types";

export type NegotiationStatus =
  | "OPEN"
  | "VENDOR_OFFERS_COLLECTED"
  | "VENDOR_SELECTED"
  | "SUBMITTED_TO_APPROVAL"
  | "REVISION_REQUIRED"
  | "CLOSED";

export type NegotiationDecisionReason =
  | "BEST_PRICE"
  | "BEST_VALUE"
  | "FASTEST_DELIVERY"
  | "LOWEST_RISK"
  | "MANUAL_DECISION";

export type NegotiationSession = {
  id: ProcurementId;
  spkId: ProcurementId;
  status: NegotiationStatus;
  openedBy: ProcurementActorRef;
  selectedVendorOfferId?: ProcurementId;
  decisionReason?: NegotiationDecisionReason;
  decisionNote?: string;
  targetBudget?: IDRAmount;
  openedAt: ISODateTimeString;
  submittedAt?: ISODateTimeString;
  closedAt?: ISODateTimeString;
  updatedAt: ISODateTimeString;
};

export type NegotiationNoteVisibility = "INTERNAL" | "MANAGER" | "FINANCE" | "OWNER";

export type NegotiationNote = {
  id: ProcurementId;
  negotiationId: ProcurementId;
  spkId: ProcurementId;
  author: ProcurementActorRef;
  visibility: NegotiationNoteVisibility;
  content: string;
  createdAt: ISODateTimeString;
};

export type SubmitNegotiationPayload = {
  negotiationId: ProcurementId;
  selectedVendorOfferId: ProcurementId;
  decisionReason: NegotiationDecisionReason;
  decisionNote: string;
};
