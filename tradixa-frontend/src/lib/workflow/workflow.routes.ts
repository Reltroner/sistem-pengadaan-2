import { workflowStageDefinitions } from "./workflow.config";
import type { WorkflowStage } from "./workflow.types";

export const workflowRoutes: Record<WorkflowStage, string> = {
  SPK_INPUT: workflowStageDefinitions.SPK_INPUT.route,
  NEGOTIATION: workflowStageDefinitions.NEGOTIATION.route,
  MANAGER_APPROVAL: workflowStageDefinitions.MANAGER_APPROVAL.route,
  FINANCE_VERIFICATION: workflowStageDefinitions.FINANCE_VERIFICATION.route,
  DIRECTOR_APPROVAL: workflowStageDefinitions.DIRECTOR_APPROVAL.route,
  PO_VENDOR: workflowStageDefinitions.PO_VENDOR.route,
  DELIVERY: workflowStageDefinitions.DELIVERY.route,
  BAST: workflowStageDefinitions.BAST.route,
  INVOICE_FP: workflowStageDefinitions.INVOICE_FP.route,
  AR_SP2D: workflowStageDefinitions.AR_SP2D.route,
  CLOSED: workflowStageDefinitions.CLOSED.route,
};

export function getWorkflowRoute(stage: WorkflowStage): string {
  return workflowRoutes[stage];
}
