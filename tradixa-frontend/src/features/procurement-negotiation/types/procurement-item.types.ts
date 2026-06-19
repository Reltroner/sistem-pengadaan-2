import type { IDRAmount, ProcurementId } from "./procurement-common.types";

export type ProcurementItemCategory =
  | "GOODS"
  | "SERVICE"
  | "SOFTWARE"
  | "HARDWARE"
  | "SUBSCRIPTION"
  | "OTHER";

export type ProcurementItemUnit =
  | "PCS"
  | "UNIT"
  | "SET"
  | "PACKAGE"
  | "MONTH"
  | "YEAR"
  | "SERVICE";

export type ProcurementItem = {
  id: ProcurementId;
  spkId: ProcurementId;
  name: string;
  description?: string;
  category: ProcurementItemCategory;
  quantity: number;
  unit: ProcurementItemUnit;
  estimatedUnitPrice?: IDRAmount;
  estimatedTotalPrice?: IDRAmount;
  requiredSpecification?: string;
};

export type CreateProcurementItemPayload = {
  spkId: ProcurementId;
  name: string;
  description?: string;
  category: ProcurementItemCategory;
  quantity: number;
  unit: ProcurementItemUnit;
  estimatedUnitPrice?: IDRAmount;
  requiredSpecification?: string;
};
