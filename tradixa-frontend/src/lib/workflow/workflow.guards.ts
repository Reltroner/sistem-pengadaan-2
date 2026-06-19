import { workflowStageDefinitions } from "./workflow.config";
import { isValidWorkflowTransition } from "./workflow.transitions";
import type { WorkflowStage, WorkflowStatus } from "./workflow.types";

export type WorkflowGuardResult = {
  allowed: boolean;
  reason?: string;
};

export function canUseStatusForStage(
  stage: WorkflowStage,
  status: WorkflowStatus,
): WorkflowGuardResult {
  const definition = workflowStageDefinitions[stage];

  if (!definition.allowedStatuses.includes(status)) {
    return {
      allowed: false,
      reason: `${status} is not allowed for ${stage}.`,
    };
  }

  return { allowed: true };
}

export function canMoveWorkflowStage(
  from: WorkflowStage,
  to: WorkflowStage,
): WorkflowGuardResult {
  if (!isValidWorkflowTransition(from, to)) {
    return {
      allowed: false,
      reason: `Transition from ${from} to ${to} is not allowed.`,
    };
  }

  return { allowed: true };
}

export function assertWorkflowTransition(from: WorkflowStage, to: WorkflowStage): void {
  const result = canMoveWorkflowStage(from, to);

  if (!result.allowed) {
    throw new Error(result.reason);
  }
}
