import type { ProcurementActorRef } from "../types";

export const mockActors = {
  salesAyu: {
    id: "user-sales-ayu",
    name: "Ayu Pratama",
    role: "SALES",
  },
  salesBima: {
    id: "user-sales-bima",
    name: "Bima Santoso",
    role: "SALES",
  },
  managerRaka: {
    id: "user-manager-raka",
    name: "Raka Wijaya",
    role: "MANAGER",
  },
  financeNadia: {
    id: "user-finance-nadia",
    name: "Nadia Putri",
    role: "FINANCE",
  },
  ownerDimas: {
    id: "user-owner-dimas",
    name: "Dimas Rahardian",
    role: "OWNER",
  },
  adminSystem: {
    id: "user-admin-system",
    name: "System Admin",
    role: "ADMIN",
  },
} as const satisfies Record<string, ProcurementActorRef>;
