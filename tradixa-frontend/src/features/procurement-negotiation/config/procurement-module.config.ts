import type { ProcurementModuleBoundary } from "../types/procurement-module.types";

export const procurementModuleBoundary: ProcurementModuleBoundary = {
  moduleCode: "M1_PROCUREMENT_NEGOTIATION",
  moduleName: "M1 Procurement & Negotiation Management",
  description:
    "Procurement intake and vendor decision engine from SPK input to negotiation and PO draft handoff.",
  rootEntity: "SPK",
  ownedStages: ["SPK_INPUT", "NEGOTIATION"],
  handoffStages: ["MANAGER_APPROVAL", "PO_VENDOR"],
  subdomains: [
    "SPK_INTAKE",
    "PROCUREMENT_ITEM",
    "VENDOR_MASTER",
    "VENDOR_OFFER",
    "NEGOTIATION",
    "PRICE_COMPARISON",
    "PO_DRAFT",
    "PROCUREMENT_DASHBOARD",
  ],
  internalServices: [
    "SPK_INTAKE_SERVICE",
    "PROCUREMENT_ITEM_SERVICE",
    "VENDOR_MASTER_SERVICE",
    "VENDOR_OFFER_SERVICE",
    "NEGOTIATION_SERVICE",
    "PRICE_COMPARISON_SERVICE",
    "PROCUREMENT_WORKFLOW_SERVICE",
    "PO_DRAFT_SERVICE",
    "PROCUREMENT_AUDIT_SERVICE",
    "PROCUREMENT_NOTIFICATION_SERVICE",
    "PROCUREMENT_DASHBOARD_PROJECTION_SERVICE",
  ],
  primaryRoutes: [
    "/procurement/overview",
    "/procurement/pipeline",
    "/procurement/activities",
    "/spk/list",
    "/spk/create",
    "/negotiations/list",
    "/vendors/list",
    "/purchase-orders/draft",
  ],
};
