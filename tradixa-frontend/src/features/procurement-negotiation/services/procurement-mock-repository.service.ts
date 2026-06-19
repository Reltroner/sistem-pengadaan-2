import { procurementMockDatabase } from "../mock/procurement-database.mock";
import type {
  NegotiationNote,
  NegotiationSession,
  PODraft,
  PriceComparisonMatrix,
  ProcurementActivity,
  ProcurementDashboardSummary,
  ProcurementItem,
  ProcurementMockDatabase,
  ProcurementRepository,
  SPKRecord,
  Vendor,
  VendorOffer,
} from "../types";

export const procurementMockRepository: ProcurementRepository = {
  getDatabaseSnapshot(): ProcurementMockDatabase {
    return procurementMockDatabase;
  },

  getSPKRecords(): SPKRecord[] {
    return procurementMockDatabase.spkRecords;
  },

  getSPKById(spkId: string): SPKRecord | undefined {
    return procurementMockDatabase.spkRecords.find((spk) => spk.id === spkId);
  },

  getProcurementItemsBySPKId(spkId: string): ProcurementItem[] {
    return procurementMockDatabase.procurementItems.filter((item) => item.spkId === spkId);
  },

  getVendors(): Vendor[] {
    return procurementMockDatabase.vendors;
  },

  getVendorById(vendorId: string): Vendor | undefined {
    return procurementMockDatabase.vendors.find((vendor) => vendor.id === vendorId);
  },

  getVendorOffersBySPKId(spkId: string): VendorOffer[] {
    return procurementMockDatabase.vendorOffers.filter((offer) => offer.spkId === spkId);
  },

  getNegotiationBySPKId(spkId: string): NegotiationSession | undefined {
    return procurementMockDatabase.negotiationSessions.find(
      (negotiation) => negotiation.spkId === spkId,
    );
  },

  getNegotiationNotesByNegotiationId(negotiationId: string): NegotiationNote[] {
    return procurementMockDatabase.negotiationNotes.filter(
      (note) => note.negotiationId === negotiationId,
    );
  },

  getPriceComparisonByNegotiationId(
    negotiationId: string,
  ): PriceComparisonMatrix | undefined {
    return procurementMockDatabase.priceComparisonMatrices.find(
      (matrix) => matrix.negotiationId === negotiationId,
    );
  },

  getPODraftBySPKId(spkId: string): PODraft | undefined {
    return procurementMockDatabase.poDrafts.find((poDraft) => poDraft.spkId === spkId);
  },

  getDashboardSummary(): ProcurementDashboardSummary {
    return procurementMockDatabase.dashboardSummary;
  },

  getRecentActivities(): ProcurementActivity[] {
    return procurementMockDatabase.activities;
  },
};
