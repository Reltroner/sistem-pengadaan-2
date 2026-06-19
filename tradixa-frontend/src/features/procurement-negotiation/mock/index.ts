export const PROCUREMENT_MOCK_BOUNDARY = [
  "spk.mock",
  "vendors.mock",
  "vendor-offers.mock",
  "negotiations.mock",
  "po-drafts.mock",
  "procurement-activities.mock",
] as const;

export type ProcurementMockName = (typeof PROCUREMENT_MOCK_BOUNDARY)[number];
