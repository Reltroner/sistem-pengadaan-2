import type { WorkflowStage } from "./workflow.types";

export const workflowStageLabels: Record<WorkflowStage, string> = {
  SPK_INPUT: "SPK Input",
  NEGOTIATION: "Negosiasi",
  MANAGER_APPROVAL: "Manager Approval",
  FINANCE_VERIFICATION: "Finance Verification",
  DIRECTOR_APPROVAL: "Director Approval",
  PO_VENDOR: "PO Vendor",
  DELIVERY: "Delivery",
  BAST: "BAST",
  INVOICE_FP: "Invoice / FP",
  AR_SP2D: "AR / SP2D",
  CLOSED: "Closed",
};

export const workflowStageOrder: WorkflowStage[] = [
  "SPK_INPUT",
  "NEGOTIATION",
  "MANAGER_APPROVAL",
  "FINANCE_VERIFICATION",
  "DIRECTOR_APPROVAL",
  "PO_VENDOR",
  "DELIVERY",
  "BAST",
  "INVOICE_FP",
  "AR_SP2D",
  "CLOSED",
];
