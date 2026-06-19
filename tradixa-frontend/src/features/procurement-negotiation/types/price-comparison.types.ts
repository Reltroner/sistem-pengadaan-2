import type { IDRAmount, ProcurementId } from "./procurement-common.types";
import type { NegotiationDecisionReason } from "./negotiation.types";

export type VendorComparisonScore = {
  priceScore: number;
  deliveryScore: number;
  riskScore: number;
  complianceScore: number;
  totalScore: number;
};

export type VendorComparisonResult = {
  id: ProcurementId;
  negotiationId: ProcurementId;
  vendorOfferId: ProcurementId;
  vendorId: ProcurementId;
  vendorName: string;
  grandTotal: IDRAmount;
  leadTimeDays: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  score: VendorComparisonScore;
  rank: number;
  recommendedReason?: NegotiationDecisionReason;
  isRecommended: boolean;
};

export type PriceComparisonMatrix = {
  negotiationId: ProcurementId;
  spkId: ProcurementId;
  results: VendorComparisonResult[];
  recommendedVendorOfferId?: ProcurementId;
};
