import type {
  ISODateTimeString,
  ProcurementAddress,
  ProcurementId,
} from "./procurement-common.types";

export type VendorStatus = "ACTIVE" | "INACTIVE" | "BLACKLISTED" | "UNDER_REVIEW";

export type VendorRiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type Vendor = {
  id: ProcurementId;
  vendorCode: string;
  name: string;
  legalName?: string;
  status: VendorStatus;
  riskLevel: VendorRiskLevel;
  contactPerson: string;
  email?: string;
  phone?: string;
  address?: ProcurementAddress;
  taxNumber?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
};

export type CreateVendorPayload = {
  name: string;
  legalName?: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  address?: ProcurementAddress;
  taxNumber?: string;
};
