import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { CreateProcurementItemPayload, ProcurementItem } from "../types";

export function getProcurementItemsBySPKId(spkId: string): ProcurementItem[] {
  return procurementMockRepository.getProcurementItemsBySPKId(spkId);
}

export function getEstimatedProcurementTotal(spkId: string): number {
  return getProcurementItemsBySPKId(spkId).reduce(
    (sum, item) => sum + (item.estimatedTotalPrice ?? 0),
    0,
  );
}

export function createProcurementItemPreview(
  payload: CreateProcurementItemPayload,
): Omit<ProcurementItem, "id"> {
  return {
    spkId: payload.spkId,
    name: payload.name,
    description: payload.description,
    category: payload.category,
    quantity: payload.quantity,
    unit: payload.unit,
    estimatedUnitPrice: payload.estimatedUnitPrice,
    estimatedTotalPrice:
      payload.estimatedUnitPrice === undefined
        ? undefined
        : payload.estimatedUnitPrice * payload.quantity,
    requiredSpecification: payload.requiredSpecification,
  };
}

export function hasProcurementItems(spkId: string): boolean {
  return getProcurementItemsBySPKId(spkId).length > 0;
}
