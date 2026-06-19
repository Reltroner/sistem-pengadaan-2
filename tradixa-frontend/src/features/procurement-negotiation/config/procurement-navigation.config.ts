import type { ProcurementRoute } from "../types/procurement-module.types";

export const procurementNavigationItems: ProcurementRoute[] = [
  {
    label: "Procurement Overview",
    href: "/procurement/overview",
    section: "PROCUREMENT_DASHBOARD",
    ownerRoles: ["SALES", "MANAGER", "FINANCE", "OWNER", "DIREKTUR", "ADMIN"],
    isPrimary: true,
  },
  {
    label: "Procurement Pipeline",
    href: "/procurement/pipeline",
    section: "PROCUREMENT_DASHBOARD",
    ownerRoles: ["SALES", "MANAGER", "FINANCE", "OWNER", "DIREKTUR", "ADMIN"],
  },
  {
    label: "SPK List",
    href: "/spk/list",
    section: "SPK_INTAKE",
    ownerRoles: ["SALES", "MANAGER", "FINANCE", "OWNER", "DIREKTUR", "ADMIN"],
    isPrimary: true,
  },
  {
    label: "Create SPK",
    href: "/spk/create",
    section: "SPK_INTAKE",
    ownerRoles: ["SALES", "ADMIN"],
    isPrimary: true,
  },
  {
    label: "Negotiations",
    href: "/negotiations/list",
    section: "NEGOTIATION",
    ownerRoles: ["SALES", "MANAGER", "FINANCE", "OWNER", "DIREKTUR", "ADMIN"],
    isPrimary: true,
  },
  {
    label: "Vendor Database",
    href: "/vendors/list",
    section: "VENDOR_MASTER",
    ownerRoles: ["SALES", "MANAGER", "FINANCE", "OWNER", "DIREKTUR", "ADMIN"],
    isPrimary: true,
  },
  {
    label: "PO Draft",
    href: "/purchase-orders/draft",
    section: "PO_DRAFT",
    ownerRoles: ["FINANCE", "ADMIN"],
  },
];
