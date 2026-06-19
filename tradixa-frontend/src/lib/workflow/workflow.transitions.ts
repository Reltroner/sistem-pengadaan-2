import { DIRECTOR_APPROVAL_THRESHOLD, workflowStageOrder } from "./workflow.config";
import type {
  WorkflowAction,
  WorkflowDocumentSnapshot,
  WorkflowNextAction,
  WorkflowStage,
  WorkflowTransition,
} from "./workflow.types";

export const workflowTransitions: WorkflowTransition[] = [
  {
    from: "SPK_INPUT",
    to: "NEGOTIATION",
    action: "SUBMIT",
    label: "Submit SPK to negotiation",
  },
  {
    from: "NEGOTIATION",
    to: "MANAGER_APPROVAL",
    action: "SUBMIT",
    label: "Submit negotiation to manager approval",
    requiresApproval: true,
  },
  {
    from: "MANAGER_APPROVAL",
    to: "FINANCE_VERIFICATION",
    action: "APPROVE",
    label: "Manager approves and sends to finance",
    requiresApproval: true,
  },
  {
    from: "MANAGER_APPROVAL",
    to: "NEGOTIATION",
    action: "REQUEST_REVISION",
    label: "Manager requests negotiation revision",
  },
  {
    from: "FINANCE_VERIFICATION",
    to: "DIRECTOR_APPROVAL",
    action: "ESCALATE",
    label: "Finance escalates high-value transaction to director",
    requiresApproval: true,
    requiresThreshold: true,
  },
  {
    from: "FINANCE_VERIFICATION",
    to: "PO_VENDOR",
    action: "APPROVE",
    label: "Finance approves and creates PO handoff",
    requiresApproval: true,
  },
  {
    from: "FINANCE_VERIFICATION",
    to: "NEGOTIATION",
    action: "REQUEST_REVISION",
    label: "Finance requests negotiation revision",
  },
  {
    from: "DIRECTOR_APPROVAL",
    to: "PO_VENDOR",
    action: "APPROVE",
    label: "Director approves high-value transaction",
    requiresApproval: true,
  },
  {
    from: "DIRECTOR_APPROVAL",
    to: "NEGOTIATION",
    action: "REQUEST_REVISION",
    label: "Director requests negotiation revision",
  },
  {
    from: "PO_VENDOR",
    to: "DELIVERY",
    action: "HANDOFF",
    label: "PO issued and handed off to delivery",
  },
  {
    from: "DELIVERY",
    to: "BAST",
    action: "CONFIRM",
    label: "Delivery confirmed and ready for BAST",
  },
  {
    from: "BAST",
    to: "INVOICE_FP",
    action: "GENERATE",
    label: "BAST confirmed and invoice can be generated",
  },
  {
    from: "INVOICE_FP",
    to: "AR_SP2D",
    action: "HANDOFF",
    label: "Invoice submitted and handed off to AR/SP2D",
  },
  {
    from: "AR_SP2D",
    to: "CLOSED",
    action: "CLOSE",
    label: "Payment received and AR closed",
  },
];

export function getNextWorkflowStages(stage: WorkflowStage): WorkflowStage[] {
  return workflowTransitions
    .filter((transition) => transition.from === stage)
    .map((transition) => transition.to);
}

export function getAvailableTransitions(stage: WorkflowStage): WorkflowTransition[] {
  return workflowTransitions.filter((transition) => transition.from === stage);
}

export function isValidWorkflowTransition(from: WorkflowStage, to: WorkflowStage): boolean {
  return workflowTransitions.some((transition) => transition.from === from && transition.to === to);
}

export function getWorkflowTransition(
  from: WorkflowStage,
  action: WorkflowAction,
): WorkflowTransition | undefined {
  return workflowTransitions.find(
    (transition) => transition.from === from && transition.action === action,
  );
}

export function requiresDirectorApproval(totalValue: number): boolean {
  return totalValue > DIRECTOR_APPROVAL_THRESHOLD;
}

export function resolveFinanceApprovalTarget(totalValue: number): WorkflowStage {
  return requiresDirectorApproval(totalValue) ? "DIRECTOR_APPROVAL" : "PO_VENDOR";
}

export function getWorkflowNextActions(
  snapshot: WorkflowDocumentSnapshot,
): WorkflowNextAction[] {
  return getAvailableTransitions(snapshot.currentStage).map((transition) => {
    if (
      transition.from === "FINANCE_VERIFICATION" &&
      transition.to === "DIRECTOR_APPROVAL" &&
      !requiresDirectorApproval(snapshot.totalValue ?? 0)
    ) {
      return {
        action: transition.action,
        label: transition.label,
        targetStage: transition.to,
        allowed: false,
        reason: "Director approval is only required for high-value transactions.",
      };
    }

    return {
      action: transition.action,
      label: transition.label,
      targetStage: transition.to,
      allowed: true,
    };
  });
}

export function compareWorkflowStageProgress(left: WorkflowStage, right: WorkflowStage): number {
  return workflowStageOrder.indexOf(left) - workflowStageOrder.indexOf(right);
}
