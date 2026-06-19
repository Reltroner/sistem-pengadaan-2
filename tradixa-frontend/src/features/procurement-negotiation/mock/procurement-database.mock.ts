import { mockNegotiationNotes, mockNegotiationSessions } from "./negotiations.mock";
import { mockPODrafts } from "./po-drafts.mock";
import { mockPriceComparisonMatrices } from "./price-comparisons.mock";
import { mockProcurementItems } from "./procurement-items.mock";
import {
  mockProcurementActivities,
  mockProcurementAuditLogs,
  mockProcurementDashboardSummary,
  mockProcurementNotifications,
} from "./procurement-projections.mock";
import { mockSPKRecords } from "./spk.mock";
import { mockVendorOffers } from "./vendor-offers.mock";
import { mockVendors } from "./vendors.mock";
import type { ProcurementMockDatabase } from "../types";

export const procurementMockDatabase: ProcurementMockDatabase = {
  spkRecords: mockSPKRecords,
  procurementItems: mockProcurementItems,
  vendors: mockVendors,
  vendorOffers: mockVendorOffers,
  negotiationSessions: mockNegotiationSessions,
  negotiationNotes: mockNegotiationNotes,
  priceComparisonMatrices: mockPriceComparisonMatrices,
  poDrafts: mockPODrafts,
  activities: mockProcurementActivities,
  auditLogs: mockProcurementAuditLogs,
  notifications: mockProcurementNotifications,
  dashboardSummary: mockProcurementDashboardSummary,
};
