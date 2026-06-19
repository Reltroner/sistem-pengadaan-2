import { mockActors } from "./actors.mock";
import { mockProcurementItems } from "./procurement-items.mock";
import type { PODraft } from "../types";

export const mockPODrafts: PODraft[] = [
  {
    id: "po-draft-002",
    poDraftNumber: "POD-2026-0002",
    spkId: "spk-002",
    negotiationId: "negotiation-002",
    selectedVendorId: "vendor-003",
    selectedVendorOfferId: "offer-002-002",
    procurementItems: mockProcurementItems.filter((item) => item.spkId === "spk-002"),
    subtotal: 98200000,
    discountAmount: 2200000,
    taxAmount: 10560000,
    grandTotal: 106560000,
    status: "DRAFT",
    generatedBy: mockActors.financeNadia,
    documents: [],
    createdAt: "2026-06-12T06:00:00.000Z",
  },
];
