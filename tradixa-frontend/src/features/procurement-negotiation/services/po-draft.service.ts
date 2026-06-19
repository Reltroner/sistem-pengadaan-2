import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { CreatePODraftPayload, PODraft, PODraftStatus } from "../types";

export function getPODraftBySPKId(spkId: string): PODraft | undefined {
  return procurementMockRepository.getPODraftBySPKId(spkId);
}

export function getPODraftsByStatus(status: PODraftStatus): PODraft[] {
  return procurementMockRepository
    .getDatabaseSnapshot()
    .poDrafts.filter((poDraft) => poDraft.status === status);
}

export function createPODraftPreview(payload: CreatePODraftPayload): CreatePODraftPayload {
  return payload;
}

export function hasPODraft(spkId: string): boolean {
  return getPODraftBySPKId(spkId) !== undefined;
}

export function getPODraftGrandTotal(spkId: string): number {
  return getPODraftBySPKId(spkId)?.grandTotal ?? 0;
}
