import type { UserRole } from "../../../lib/rbac/roles.types";
import type { WorkflowStage, WorkflowStatus } from "../../../lib/workflow";

export type ProcurementId = string;
export type ISODateTimeString = string;
export type ISODateString = string;
export type IDRAmount = number;

export type ProcurementPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type ProcurementDocumentType =
  | "SPK"
  | "QUOTATION"
  | "NEGOTIATION_NOTE"
  | "VENDOR_PROPOSAL"
  | "PO_DRAFT"
  | "BAST"
  | "INVOICE"
  | "FAKTUR_PAJAK"
  | "SP2D"
  | "OTHER";

export type ProcurementDocumentRef = {
  id: ProcurementId;
  type: ProcurementDocumentType;
  fileName: string;
  fileUrl?: string;
  uploadedBy: string;
  uploadedAt: ISODateTimeString;
};

export type ProcurementActorRef = {
  id: string;
  name: string;
  role: UserRole;
};

export type ProcurementWorkflowSnapshot = {
  stage: WorkflowStage;
  status: WorkflowStatus;
  ownerRole: UserRole;
  nextActionLabel: string;
  updatedAt: ISODateTimeString;
};

export type ProcurementMoney = {
  amount: IDRAmount;
  currency: "IDR";
};

export type ProcurementAddress = {
  line1: string;
  line2?: string;
  city: string;
  province?: string;
  postalCode?: string;
  country: string;
};
