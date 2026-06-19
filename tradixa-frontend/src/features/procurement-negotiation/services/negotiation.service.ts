import { procurementMockRepository } from "./procurement-mock-repository.service";
import { getSelectedVendorOffer } from "./vendor-offer.service";
import type {
  NegotiationNote,
  NegotiationSession,
  SubmitNegotiationPayload,
} from "../types";

export function getNegotiationBySPKId(spkId: string): NegotiationSession | undefined {
  return procurementMockRepository.getNegotiationBySPKId(spkId);
}

export function getNegotiationNotesByNegotiationId(negotiationId: string): NegotiationNote[] {
  return procurementMockRepository.getNegotiationNotesByNegotiationId(negotiationId);
}

export function getNegotiationReadiness(spkId: string): {
  ready: boolean;
  reason?: string;
} {
  const negotiation = getNegotiationBySPKId(spkId);

  if (!negotiation) {
    return { ready: false, reason: "Negotiation session has not been opened." };
  }

  const selectedOffer = getSelectedVendorOffer(spkId);

  if (!selectedOffer) {
    return { ready: false, reason: "No selected vendor offer yet." };
  }

  return { ready: true };
}

export function createSubmitNegotiationPreview(
  payload: SubmitNegotiationPayload,
): SubmitNegotiationPayload {
  return payload;
}
