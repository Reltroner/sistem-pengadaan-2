export const PROCUREMENT_STORE_BOUNDARY = [
  "procurement.store",
  "negotiation.store",
  "vendor.store",
] as const;

export type ProcurementStoreName = (typeof PROCUREMENT_STORE_BOUNDARY)[number];
