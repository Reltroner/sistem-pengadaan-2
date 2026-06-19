import type { WorkflowStage, WorkflowTransition } from "./workflow.types";

export const workflowTransitions: WorkflowTransition[] = [
  { from: "SPK_INPUT", to: "NEGOTIATION", action: "SUBMIT" },
  { from: "NEGOTIATION", to: "MANAGER_APPROVAL", action: "SUBMIT", requiresApproval: true },
  { from: "MANAGER_APPROVAL", to: "FINANCE_VERIFICATION", action: "APPROVE", requiresApproval: true },
  { from: "FINANCE_VERIFICATION", to: "DIRECTOR_APPROVAL", action: "ESCALATE", requiresApproval: true },
  { from: "FINANCE_VERIFICATION", to: "PO_VENDOR", action: "APPROVE", requiresApproval: true },
  { from: "DIRECTOR_APPROVAL", to: "PO_VENDOR", action: "APPROVE", requiresApproval: true },
  { from: "PO_VENDOR", to: "DELIVERY", action: "HANDOFF" },
  { from: "DELIVERY", to: "BAST", action: "HANDOFF" },
  { from: "BAST", to: "INVOICE_FP", action: "GENERATE" },
  { from: "INVOICE_FP", to: "AR_SP2D", action: "HANDOFF" },
  { from: "AR_SP2D", to: "CLOSED", action: "CLOSE" },
];

export function getNextWorkflowStages(stage: WorkflowStage): WorkflowStage[] {
  return workflowTransitions
    .filter((transition) => transition.from === stage)
    .map((transition) => transition.to);
}
