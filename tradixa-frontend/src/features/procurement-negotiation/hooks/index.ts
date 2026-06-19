export const PROCUREMENT_HOOK_BOUNDARY = [
  "useSPK",
  "useSPKItems",
  "useVendors",
  "useVendorOffers",
  "useNegotiation",
  "usePriceComparison",
  "useProcurementWorkflow",
] as const;

export type ProcurementHookName = (typeof PROCUREMENT_HOOK_BOUNDARY)[number];
