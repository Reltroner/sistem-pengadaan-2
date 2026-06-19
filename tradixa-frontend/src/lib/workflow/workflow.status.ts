import type { WorkflowStage, WorkflowStatus } from "./workflow.types";

export const defaultStatusByStage: Record<WorkflowStage, WorkflowStatus> = {
  SPK_INPUT: "DRAFT",
  NEGOTIATION: "IN_PROGRESS",
  MANAGER_APPROVAL: "WAITING_APPROVAL",
  FINANCE_VERIFICATION: "WAITING_APPROVAL",
  DIRECTOR_APPROVAL: "WAITING_APPROVAL",
  PO_VENDOR: "DRAFT",
  DELIVERY: "IN_PROGRESS",
  BAST: "DRAFT",
  INVOICE_FP: "DRAFT",
  AR_SP2D: "IN_PROGRESS",
  CLOSED: "CLOSED",
};

export const completedStatusByStage: Record<WorkflowStage, WorkflowStatus> = {
  SPK_INPUT: "COMPLETED",
  NEGOTIATION: "COMPLETED",
  MANAGER_APPROVAL: "APPROVED",
  FINANCE_VERIFICATION: "APPROVED",
  DIRECTOR_APPROVAL: "APPROVED",
  PO_VENDOR: "COMPLETED",
  DELIVERY: "COMPLETED",
  BAST: "COMPLETED",
  INVOICE_FP: "COMPLETED",
  AR_SP2D: "CLOSED",
  CLOSED: "CLOSED",
};

export function getDefaultStatusForStage(stage: WorkflowStage): WorkflowStatus {
  return defaultStatusByStage[stage];
}

export function getCompletedStatusForStage(stage: WorkflowStage): WorkflowStatus {
  return completedStatusByStage[stage];
}
