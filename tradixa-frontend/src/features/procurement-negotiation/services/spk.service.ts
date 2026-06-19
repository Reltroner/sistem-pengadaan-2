import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { CreateSPKPayload, SPKRecord, SPKRecordStatus } from "../types";

export function getSPKRecords(): SPKRecord[] {
  return procurementMockRepository.getSPKRecords();
}

export function getSPKById(spkId: string): SPKRecord | undefined {
  return procurementMockRepository.getSPKById(spkId);
}

export function getSPKRecordsByStatus(status: SPKRecordStatus): SPKRecord[] {
  return getSPKRecords().filter((spk) => spk.status === status);
}

export function getSPKRecordsByOwner(ownerId: string): SPKRecord[] {
  return getSPKRecords().filter((spk) => spk.owner.id === ownerId);
}

export function createSPKPreview(payload: CreateSPKPayload): Pick<
  SPKRecord,
  "title" | "sourceType" | "customerName" | "projectName" | "requestedBy" | "priority" | "notes"
> {
  return {
    title: payload.title,
    sourceType: payload.sourceType,
    customerName: payload.customerName,
    projectName: payload.projectName,
    requestedBy: payload.requestedBy,
    priority: payload.priority,
    notes: payload.notes,
  };
}

export function getHighValueSPKRecords(threshold: number): SPKRecord[] {
  return getSPKRecords().filter((spk) => {
    const items = procurementMockRepository.getProcurementItemsBySPKId(spk.id);
    const total = items.reduce((sum, item) => sum + (item.estimatedTotalPrice ?? 0), 0);

    return total >= threshold;
  });
}
