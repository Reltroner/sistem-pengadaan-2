import type {
  ISODateString,
  ISODateTimeString,
  ProcurementActorRef,
  ProcurementDocumentRef,
  ProcurementId,
  ProcurementPriority,
  ProcurementWorkflowSnapshot,
} from "./procurement-common.types";

export type SPKSourceType = "CUSTOMER_REQUEST" | "SALES_OPPORTUNITY" | "INTERNAL_PROJECT";

export type SPKRecordStatus =
  | "SPK_DRAFT"
  | "SPK_SUBMITTED"
  | "NEGOTIATION_OPEN"
  | "VENDOR_OFFERS_COLLECTED"
  | "VENDOR_SELECTED"
  | "NEGOTIATION_SUBMITTED"
  | "WAITING_MANAGER_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "REVISION_REQUIRED"
  | "PO_DRAFT_CREATED"
  | "HANDOFF_TO_PO_VENDOR_MODULE";

export type CreateSPKPayload = {
  title: string;
  sourceType: SPKSourceType;
  customerName: string;
  customerReference?: string;
  projectName: string;
  requestedBy: string;
  expectedDeliveryDate?: ISODateString;
  priority: ProcurementPriority;
  notes?: string;
};

export type UpdateSPKPayload = Partial<CreateSPKPayload> & {
  spkId: ProcurementId;
};

export type SPKRecord = {
  id: ProcurementId;
  spkNumber: string;
  title: string;
  sourceType: SPKSourceType;
  customerName: string;
  customerReference?: string;
  projectName: string;
  requestedBy: string;
  owner: ProcurementActorRef;
  expectedDeliveryDate?: ISODateString;
  priority: ProcurementPriority;
  status: SPKRecordStatus;
  workflow: ProcurementWorkflowSnapshot;
  documents: ProcurementDocumentRef[];
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
  submittedAt?: ISODateTimeString;
  notes?: string;
};
