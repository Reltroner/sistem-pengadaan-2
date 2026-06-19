import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { VendorOffer, VendorOfferStatus } from "../types";

export function getVendorOffersBySPKId(spkId: string): VendorOffer[] {
  return procurementMockRepository.getVendorOffersBySPKId(spkId);
}

export function getVendorOffersByStatus(spkId: string, status: VendorOfferStatus): VendorOffer[] {
  return getVendorOffersBySPKId(spkId).filter((offer) => offer.status === status);
}

export function getSelectedVendorOffer(spkId: string): VendorOffer | undefined {
  return getVendorOffersBySPKId(spkId).find((offer) => offer.status === "SELECTED");
}

export function getLowestVendorOffer(spkId: string): VendorOffer | undefined {
  return getVendorOffersBySPKId(spkId).reduce<VendorOffer | undefined>((lowest, offer) => {
    if (!lowest || offer.grandTotal < lowest.grandTotal) {
      return offer;
    }

    return lowest;
  }, undefined);
}

export function getVendorOfferCount(spkId: string): number {
  return getVendorOffersBySPKId(spkId).length;
}
