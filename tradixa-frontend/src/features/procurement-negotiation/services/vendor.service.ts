import { procurementMockRepository } from "./procurement-mock-repository.service";
import type { Vendor, VendorRiskLevel, VendorStatus } from "../types";

export function getVendors(): Vendor[] {
  return procurementMockRepository.getVendors();
}

export function getVendorById(vendorId: string): Vendor | undefined {
  return procurementMockRepository.getVendorById(vendorId);
}

export function getVendorsByStatus(status: VendorStatus): Vendor[] {
  return getVendors().filter((vendor) => vendor.status === status);
}

export function getVendorsByRiskLevel(riskLevel: VendorRiskLevel): Vendor[] {
  return getVendors().filter((vendor) => vendor.riskLevel === riskLevel);
}

export function getActiveVendors(): Vendor[] {
  return getVendorsByStatus("ACTIVE");
}

export function searchVendors(query: string): Vendor[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return getVendors();
  }

  return getVendors().filter((vendor) =>
    [vendor.name, vendor.legalName, vendor.vendorCode, vendor.contactPerson]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(normalizedQuery)),
  );
}
