export type WorkflowModuleCode =
  | "M1_PROCUREMENT_NEGOTIATION"
  | "M2_APPROVAL"
  | "M3_PO_VENDOR"
  | "M4_DELIVERY_BAST"
  | "M5_INVOICE_FP"
  | "M6_AR_SP2D_FINANCE";

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
  | "COMPLETED"
  | "CLOSED";

export type WorkflowAction =
  | "CREATE"
  | "SAVE_DRAFT"
  | "SUBMIT"
  | "APPROVE"
  | "REJECT"
  | "REQUEST_REVISION"
  | "ESCALATE"
  | "GENERATE"
  | "HANDOFF"
  | "CONFIRM"
  | "CLOSE";

export type WorkflowStageKind =
  | "INTAKE"
  | "NEGOTIATION"
  | "APPROVAL"
  | "FULFILLMENT"
  | "DOCUMENTATION"
  | "FINANCE"
  | "TERMINAL";

export type WorkflowStageDefinition = {
  stage: WorkflowStage;
  label: string;
  shortLabel: string;
  description: string;
  moduleCode: WorkflowModuleCode;
  kind: WorkflowStageKind;
  route: string;
  ownerRoles: string[];
  allowedStatuses: WorkflowStatus[];
  isOptional?: boolean;
};

export type WorkflowTransition = {
  from: WorkflowStage;
  to: WorkflowStage;
  action: WorkflowAction;
  label: string;
  requiresApproval?: boolean;
  requiresThreshold?: boolean;
};

export type WorkflowDocumentSnapshot = {
  documentId: string;
  currentStage: WorkflowStage;
  status: WorkflowStatus;
  totalValue?: number;
  ownerRole?: string;
  updatedAt: string;
};

export type WorkflowNextAction = {
  action: WorkflowAction;
  label: string;
  targetStage: WorkflowStage;
  allowed: boolean;
  reason?: string;
};
