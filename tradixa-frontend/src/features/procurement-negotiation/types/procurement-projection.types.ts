import type {
  ISODateTimeString,
  ProcurementActorRef,
  ProcurementId,
} from "./procurement-common.types";
import type { SPKRecordStatus } from "./spk.types";

export type ProcurementActivityType =
  | "SPK_CREATED"
  | "SPK_SUBMITTED"
  | "NEGOTIATION_OPENED"
  | "VENDOR_OFFER_ADDED"
  | "VENDOR_SELECTED"
  | "NEGOTIATION_SUBMITTED"
  | "PO_DRAFT_CREATED";

export type ProcurementActivity = {
  id: ProcurementId;
  spkId: ProcurementId;
  type: ProcurementActivityType;
  title: string;
  description: string;
  actor: ProcurementActorRef;
  createdAt: ISODateTimeString;
};

export type ProcurementDashboardSummary = {
  totalSpk: number;
  draftSpk: number;
  submittedSpk: number;
  inNegotiation: number;
  waitingManagerApproval: number;
  poDraftCreated: number;
  highValueProcurement: number;
  recentActivities: ProcurementActivity[];
};

export type ProcurementAuditLog = {
  id: ProcurementId;
  spkId: ProcurementId;
  entityType:
    | "SPK"
    | "PROCUREMENT_ITEM"
    | "VENDOR"
    | "VENDOR_OFFER"
    | "NEGOTIATION"
    | "PO_DRAFT";
  entityId: ProcurementId;
  action: string;
  actor: ProcurementActorRef;
  before?: unknown;
  after?: unknown;
  createdAt: ISODateTimeString;
};

export type ProcurementNotification = {
  id: ProcurementId;
  spkId: ProcurementId;
  recipientRole: ProcurementActorRef["role"];
  title: string;
  message: string;
  status: SPKRecordStatus;
  readAt?: ISODateTimeString;
  createdAt: ISODateTimeString;
};
