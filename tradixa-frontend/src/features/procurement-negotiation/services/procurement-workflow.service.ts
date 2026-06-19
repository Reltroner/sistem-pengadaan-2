import { getWorkflowNextActions, getWorkflowRoute } from "../../../lib/workflow";
import type { WorkflowNextAction, WorkflowStage } from "../../../lib/workflow";
import {
  isProcurementHandoffStage,
  isProcurementOwnedStage,
} from "./procurement-boundary.service";
import type { SPKRecord } from "../types";

export function getSPKWorkflowStage(spk: SPKRecord): WorkflowStage {
  return spk.workflow.stage;
}

export function getSPKWorkflowRoute(spk: SPKRecord): string {
  return getWorkflowRoute(spk.workflow.stage);
}

export function getSPKNextActions(spk: SPKRecord): WorkflowNextAction[] {
  return getWorkflowNextActions({
    documentId: spk.id,
    currentStage: spk.workflow.stage,
    status: spk.workflow.status,
    updatedAt: spk.workflow.updatedAt,
  });
}

export function isSPKInsideProcurementModule(spk: SPKRecord): boolean {
  return isProcurementOwnedStage(spk.workflow.stage);
}

export function isSPKReadyForHandoff(spk: SPKRecord): boolean {
  return isProcurementHandoffStage(spk.workflow.stage);
}

export function getWorkflowStageLabelForSPK(spk: SPKRecord): string {
  return `${spk.workflow.stage} / ${spk.workflow.status}`;
}
