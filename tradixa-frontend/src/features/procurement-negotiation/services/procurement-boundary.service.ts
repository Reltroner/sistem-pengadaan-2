import { procurementEventDefinitions } from "../config/procurement-events.config";
import { procurementModuleBoundary } from "../config/procurement-module.config";
import { procurementNavigationItems } from "../config/procurement-navigation.config";
import type { WorkflowStage } from "../../../lib/workflow";

export function getProcurementModuleBoundary() {
  return procurementModuleBoundary;
}

export function getProcurementNavigationItems() {
  return procurementNavigationItems;
}

export function getProcurementEventDefinitions() {
  return procurementEventDefinitions;
}

export function isProcurementOwnedStage(stage: WorkflowStage): boolean {
  return procurementModuleBoundary.ownedStages.includes(stage);
}

export function isProcurementHandoffStage(stage: WorkflowStage): boolean {
  return procurementModuleBoundary.handoffStages.includes(stage);
}

export function isProcurementRoute(pathname: string): boolean {
  return procurementModuleBoundary.primaryRoutes.some((route) => pathname.startsWith(route));
}

export function resolveProcurementNavigationItem(pathname: string) {
  return procurementNavigationItems.find((item) => pathname.startsWith(item.href));
}
