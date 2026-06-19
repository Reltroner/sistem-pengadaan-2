import type { UserRole } from "../rbac/roles.types";
import type { WorkflowAction, WorkflowStage } from "./workflow.types";

export type WorkflowPermissionRule = {
  stage: WorkflowStage;
  action: WorkflowAction;
  allowedRoles: UserRole[];
};

export const workflowPermissionRules: WorkflowPermissionRule[] = [
  { stage: "SPK_INPUT", action: "CREATE", allowedRoles: ["SALES", "ADMIN"] },
  { stage: "SPK_INPUT", action: "SUBMIT", allowedRoles: ["SALES", "ADMIN"] },
  { stage: "NEGOTIATION", action: "SUBMIT", allowedRoles: ["SALES", "ADMIN"] },
  { stage: "MANAGER_APPROVAL", action: "APPROVE", allowedRoles: ["MANAGER", "ADMIN"] },
  { stage: "MANAGER_APPROVAL", action: "REJECT", allowedRoles: ["MANAGER", "ADMIN"] },
  { stage: "FINANCE_VERIFICATION", action: "APPROVE", allowedRoles: ["FINANCE", "ADMIN"] },
  { stage: "DIRECTOR_APPROVAL", action: "APPROVE", allowedRoles: ["DIREKTUR", "OWNER", "ADMIN"] },
  { stage: "PO_VENDOR", action: "GENERATE", allowedRoles: ["FINANCE", "ADMIN"] },
];
