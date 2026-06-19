export type WorkflowStage =
  | "SPK_INPUT"
  | "NEGOTIATION"
  | "MANAGER_APPROVAL"
  | "FINANCE_VERIFICATION"
  | "DIRECTOR_APPROVAL"
  | "PO_VENDOR"
  | "DELIVERY"
  | "BAST"
  | "INVOICE_FP"
  | "AR_SP2D"
  | "CLOSED";

export type WorkflowStatus =
  | "DRAFT"
  | "IN_PROGRESS"
  | "WAITING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "REVISION_REQUIRED"
  | "OVERDUE"
  | "COMPLETED";

export type WorkflowAction =
  | "CREATE"
  | "SUBMIT"
  | "APPROVE"
  | "REJECT"
  | "REQUEST_REVISION"
  | "ESCALATE"
  | "GENERATE"
  | "HANDOFF"
  | "CLOSE";

export type WorkflowTransition = {
  from: WorkflowStage;
  to: WorkflowStage;
  action: WorkflowAction;
  requiresApproval?: boolean;
};
