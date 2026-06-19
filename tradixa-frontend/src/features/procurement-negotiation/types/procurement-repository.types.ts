import type { NegotiationNote, NegotiationSession } from "./negotiation.types";
import type { PODraft } from "./po-draft.types";
import type { PriceComparisonMatrix } from "./price-comparison.types";
import type { ProcurementItem } from "./procurement-item.types";
import type {
  ProcurementActivity,
  ProcurementAuditLog,
  ProcurementDashboardSummary,
  ProcurementNotification,
} from "./procurement-projection.types";
import type { SPKRecord } from "./spk.types";
import type { VendorOffer } from "./vendor-offer.types";
import type { Vendor } from "./vendor.types";

export type ProcurementMockDatabase = {
  spkRecords: SPKRecord[];
  procurementItems: ProcurementItem[];
  vendors: Vendor[];
  vendorOffers: VendorOffer[];
  negotiationSessions: NegotiationSession[];
  negotiationNotes: NegotiationNote[];
  priceComparisonMatrices: PriceComparisonMatrix[];
  poDrafts: PODraft[];
  activities: ProcurementActivity[];
  auditLogs: ProcurementAuditLog[];
  notifications: ProcurementNotification[];
  dashboardSummary: ProcurementDashboardSummary;
};

export type ProcurementRepository = {
  getDatabaseSnapshot: () => ProcurementMockDatabase;
  getSPKRecords: () => SPKRecord[];
  getSPKById: (spkId: string) => SPKRecord | undefined;
  getProcurementItemsBySPKId: (spkId: string) => ProcurementItem[];
  getVendors: () => Vendor[];
  getVendorById: (vendorId: string) => Vendor | undefined;
  getVendorOffersBySPKId: (spkId: string) => VendorOffer[];
  getNegotiationBySPKId: (spkId: string) => NegotiationSession | undefined;
  getNegotiationNotesByNegotiationId: (negotiationId: string) => NegotiationNote[];
  getPriceComparisonByNegotiationId: (negotiationId: string) => PriceComparisonMatrix | undefined;
  getPODraftBySPKId: (spkId: string) => PODraft | undefined;
  getDashboardSummary: () => ProcurementDashboardSummary;
  getRecentActivities: () => ProcurementActivity[];
};
