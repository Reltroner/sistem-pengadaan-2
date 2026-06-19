import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { ProcurementActivity, ProcurementDashboardSummary } from "../types";

export function getProcurementDashboardSummary(): ProcurementDashboardSummary {
  return procurementMockRepository.getDashboardSummary();
}

export function getRecentProcurementActivities(limit = 5): ProcurementActivity[] {
  return procurementMockRepository
    .getRecentActivities()
    .slice()
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, limit);
}

export function getProcurementDashboardSummaryWithLimitedActivities(
  limit = 5,
): ProcurementDashboardSummary {
  return {
    ...getProcurementDashboardSummary(),
    recentActivities: getRecentProcurementActivities(limit),
  };
}

export function getProcurementPipelineCount(): {
  draft: number;
  negotiation: number;
  waitingApproval: number;
  poDraft: number;
} {
  const summary = getProcurementDashboardSummary();

  return {
    draft: summary.draftSpk,
    negotiation: summary.inNegotiation,
    waitingApproval: summary.waitingManagerApproval,
    poDraft: summary.poDraftCreated,
  };
}
