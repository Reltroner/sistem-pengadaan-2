import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { PriceComparisonMatrix, VendorComparisonResult } from "../types";

export function getPriceComparisonByNegotiationId(
  negotiationId: string,
): PriceComparisonMatrix | undefined {
  return procurementMockRepository.getPriceComparisonByNegotiationId(negotiationId);
}

export function getRankedVendorComparisonResults(
  negotiationId: string,
): VendorComparisonResult[] {
  return (
    getPriceComparisonByNegotiationId(negotiationId)?.results
      .slice()
      .sort((left, right) => left.rank - right.rank) ?? []
  );
}

export function getRecommendedVendorComparison(
  negotiationId: string,
): VendorComparisonResult | undefined {
  return getPriceComparisonByNegotiationId(negotiationId)?.results.find(
    (result) => result.isRecommended,
  );
}

export function getBestPriceVendorComparison(
  negotiationId: string,
): VendorComparisonResult | undefined {
  return getPriceComparisonByNegotiationId(negotiationId)?.results.reduce<
    VendorComparisonResult | undefined
  >((best, result) => {
    if (!best || result.grandTotal < best.grandTotal) {
      return result;
    }

    return best;
  }, undefined);
}
