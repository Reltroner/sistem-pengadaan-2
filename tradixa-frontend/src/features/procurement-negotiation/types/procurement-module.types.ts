import type { WorkflowModuleCode, WorkflowStage } from "../../../lib/workflow/workflow.types";
import type { UserRole } from "../../../lib/rbac/roles.types";

export type ProcurementSubdomain =
  | "SPK_INTAKE"
  | "PROCUREMENT_ITEM"
  | "VENDOR_MASTER"
  | "VENDOR_OFFER"
  | "NEGOTIATION"
  | "PRICE_COMPARISON"
  | "PO_DRAFT"
  | "PROCUREMENT_DASHBOARD";

export type ProcurementInternalService =
  | "SPK_INTAKE_SERVICE"
  | "PROCUREMENT_ITEM_SERVICE"
  | "VENDOR_MASTER_SERVICE"
  | "VENDOR_OFFER_SERVICE"
  | "NEGOTIATION_SERVICE"
  | "PRICE_COMPARISON_SERVICE"
  | "PROCUREMENT_WORKFLOW_SERVICE"
  | "PO_DRAFT_SERVICE"
  | "PROCUREMENT_AUDIT_SERVICE"
  | "PROCUREMENT_NOTIFICATION_SERVICE"
  | "PROCUREMENT_DASHBOARD_PROJECTION_SERVICE";

export type ProcurementRoute = {
  label: string;
  href: string;
  section: ProcurementSubdomain;
  ownerRoles: UserRole[];
  isPrimary?: boolean;
};

export type ProcurementModuleBoundary = {
  moduleCode: WorkflowModuleCode;
  moduleName: string;
  description: string;
  rootEntity: "SPK";
  ownedStages: WorkflowStage[];
  handoffStages: WorkflowStage[];
  subdomains: ProcurementSubdomain[];
  internalServices: ProcurementInternalService[];
  primaryRoutes: string[];
};
