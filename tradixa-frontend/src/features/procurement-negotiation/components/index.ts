export const PROCUREMENT_COMPONENT_BOUNDARY = [
  "SPKForm",
  "SPKHeader",
  "SPKItemTable",
  "SPKDocumentUpload",
  "VendorSelector",
  "VendorOfferTable",
  "VendorComparisonMatrix",
  "NegotiationTimeline",
  "NegotiationNotes",
  "SelectedVendorCard",
  "ProcurementStatusBadge",
  "ProcurementNextActionPanel",
  "PODraftPreview",
] as const;

export type ProcurementComponentName = (typeof PROCUREMENT_COMPONENT_BOUNDARY)[number];
