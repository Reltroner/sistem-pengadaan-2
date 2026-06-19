import type { WorkflowStage, WorkflowStageDefinition } from "./workflow.types";

export const DIRECTOR_APPROVAL_THRESHOLD = 50000000;

export const workflowStageDefinitions: Record<WorkflowStage, WorkflowStageDefinition> = {
  SPK_INPUT: {
    stage: "SPK_INPUT",
    label: "SPK Input",
    shortLabel: "SPK",
    description: "Initial SPK intake and procurement request capture.",
    moduleCode: "M1_PROCUREMENT_NEGOTIATION",
    kind: "INTAKE",
    route: "/spk",
    ownerRoles: ["SALES", "ADMIN"],
    allowedStatuses: ["DRAFT", "IN_PROGRESS", "COMPLETED"],
  },
  NEGOTIATION: {
    stage: "NEGOTIATION",
    label: "Negosiasi",
    shortLabel: "Nego",
    description: "Vendor offer collection, negotiation notes, and vendor comparison.",
    moduleCode: "M1_PROCUREMENT_NEGOTIATION",
    kind: "NEGOTIATION",
    route: "/negotiations",
    ownerRoles: ["SALES", "ADMIN"],
    allowedStatuses: ["IN_PROGRESS", "REVISION_REQUIRED", "COMPLETED"],
  },
  MANAGER_APPROVAL: {
    stage: "MANAGER_APPROVAL",
    label: "Manager Approval",
    shortLabel: "Manager",
    description: "Manager review of negotiation result and selected vendor recommendation.",
    moduleCode: "M2_APPROVAL",
    kind: "APPROVAL",
    route: "/approvals/inbox",
    ownerRoles: ["MANAGER", "ADMIN"],
    allowedStatuses: ["WAITING_APPROVAL", "APPROVED", "REJECTED", "REVISION_REQUIRED"],
  },
  FINANCE_VERIFICATION: {
    stage: "FINANCE_VERIFICATION",
    label: "Finance Verification",
    shortLabel: "Finance",
    description: "Finance verification for budget, costing, and payable context.",
    moduleCode: "M2_APPROVAL",
    kind: "APPROVAL",
    route: "/approvals/inbox",
    ownerRoles: ["FINANCE", "ADMIN"],
    allowedStatuses: ["WAITING_APPROVAL", "APPROVED", "REJECTED", "REVISION_REQUIRED"],
  },
  DIRECTOR_APPROVAL: {
    stage: "DIRECTOR_APPROVAL",
    label: "Director Approval",
    shortLabel: "Director",
    description: "Optional director approval for high-value transactions.",
    moduleCode: "M2_APPROVAL",
    kind: "APPROVAL",
    route: "/approvals/inbox",
    ownerRoles: ["DIREKTUR", "OWNER", "ADMIN"],
    allowedStatuses: ["WAITING_APPROVAL", "APPROVED", "REJECTED", "REVISION_REQUIRED"],
    isOptional: true,
  },
  PO_VENDOR: {
    stage: "PO_VENDOR",
    label: "PO Vendor",
    shortLabel: "PO",
    description: "Purchase order generation, vendor handoff, and PO lifecycle start.",
    moduleCode: "M3_PO_VENDOR",
    kind: "FULFILLMENT",
    route: "/purchase-orders",
    ownerRoles: ["FINANCE", "ADMIN"],
    allowedStatuses: ["DRAFT", "IN_PROGRESS", "COMPLETED"],
  },
  DELIVERY: {
    stage: "DELIVERY",
    label: "Delivery",
    shortLabel: "Delivery",
    description: "Shipment tracking, delivery deadline, and logistics status.",
    moduleCode: "M4_DELIVERY_BAST",
    kind: "FULFILLMENT",
    route: "/deliveries",
    ownerRoles: ["SALES", "FINANCE", "ADMIN"],
    allowedStatuses: ["IN_PROGRESS", "OVERDUE", "COMPLETED"],
  },
  BAST: {
    stage: "BAST",
    label: "BAST",
    shortLabel: "BAST",
    description: "Berita Acara Serah Terima confirmation and document lock for invoicing.",
    moduleCode: "M4_DELIVERY_BAST",
    kind: "DOCUMENTATION",
    route: "/bast",
    ownerRoles: ["SALES", "ADMIN"],
    allowedStatuses: ["DRAFT", "IN_PROGRESS", "COMPLETED"],
  },
  INVOICE_FP: {
    stage: "INVOICE_FP",
    label: "Invoice / FP",
    shortLabel: "Invoice",
    description: "Invoice and faktur pajak generation and submission tracking.",
    moduleCode: "M5_INVOICE_FP",
    kind: "FINANCE",
    route: "/invoices",
    ownerRoles: ["FINANCE", "ADMIN"],
    allowedStatuses: ["DRAFT", "IN_PROGRESS", "WAITING_APPROVAL", "COMPLETED"],
  },
  AR_SP2D: {
    stage: "AR_SP2D",
    label: "AR / SP2D",
    shortLabel: "AR",
    description: "Accounts receivable, SP2D tracking, payment receipt, and AR closure.",
    moduleCode: "M6_AR_SP2D_FINANCE",
    kind: "FINANCE",
    route: "/ar-sp2d",
    ownerRoles: ["FINANCE", "OWNER", "ADMIN"],
    allowedStatuses: ["IN_PROGRESS", "OVERDUE", "COMPLETED", "CLOSED"],
  },
  CLOSED: {
    stage: "CLOSED",
    label: "Closed",
    shortLabel: "Closed",
    description: "Workflow completed and business transaction closed.",
    moduleCode: "M6_AR_SP2D_FINANCE",
    kind: "TERMINAL",
    route: "/dashboard",
    ownerRoles: ["ADMIN"],
    allowedStatuses: ["CLOSED"],
  },
};

export const workflowStageOrder: WorkflowStage[] = [
  "SPK_INPUT",
  "NEGOTIATION",
  "MANAGER_APPROVAL",
  "FINANCE_VERIFICATION",
  "DIRECTOR_APPROVAL",
  "PO_VENDOR",
  "DELIVERY",
  "BAST",
  "INVOICE_FP",
  "AR_SP2D",
  "CLOSED",
];

export const workflowStageLabels: Record<WorkflowStage, string> = Object.fromEntries(
  workflowStageOrder.map((stage) => [stage, workflowStageDefinitions[stage].label]),
) as Record<WorkflowStage, string>;

export function getWorkflowStageDefinition(stage: WorkflowStage): WorkflowStageDefinition {
  return workflowStageDefinitions[stage];
}

export function getWorkflowStageIndex(stage: WorkflowStage): number {
  return workflowStageOrder.indexOf(stage);
}

export function isWorkflowStageOptional(stage: WorkflowStage): boolean {
  return workflowStageDefinitions[stage].isOptional === true;
}
