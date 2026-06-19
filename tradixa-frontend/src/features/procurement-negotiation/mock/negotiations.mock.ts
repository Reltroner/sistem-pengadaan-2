import { mockActors } from "./actors.mock";
import type { NegotiationNote, NegotiationSession } from "../types";

export const mockNegotiationSessions: NegotiationSession[] = [
  {
    id: "negotiation-002",
    spkId: "spk-002",
    status: "VENDOR_SELECTED",
    openedBy: mockActors.salesBima,
    selectedVendorOfferId: "offer-002-002",
    decisionReason: "BEST_VALUE",
    decisionNote: "Vendor selected because total score is strongest across price, delivery, and risk.",
    targetBudget: 106000000,
    openedAt: "2026-06-11T04:30:00.000Z",
    updatedAt: "2026-06-12T05:30:00.000Z",
  },
  {
    id: "negotiation-003",
    spkId: "spk-003",
    status: "SUBMITTED_TO_APPROVAL",
    openedBy: mockActors.salesAyu,
    selectedVendorOfferId: "offer-003-001",
    decisionReason: "BEST_PRICE",
    decisionNote: "Vendor selected because it provides the lowest price while meeting license requirements.",
    targetBudget: 100000000,
    openedAt: "2026-06-13T03:30:00.000Z",
    submittedAt: "2026-06-13T08:00:00.000Z",
    updatedAt: "2026-06-13T08:00:00.000Z",
  },
];

export const mockNegotiationNotes: NegotiationNote[] = [
  {
    id: "note-002-001",
    negotiationId: "negotiation-002",
    spkId: "spk-002",
    author: mockActors.salesBima,
    visibility: "INTERNAL",
    content: "Initial vendor offers collected. Need compare server lead time and warranty.",
    createdAt: "2026-06-11T05:00:00.000Z",
  },
  {
    id: "note-002-002",
    negotiationId: "negotiation-002",
    spkId: "spk-002",
    author: mockActors.managerRaka,
    visibility: "MANAGER",
    content: "Check whether vendor can include on-site setup in final offer.",
    createdAt: "2026-06-12T02:00:00.000Z",
  },
  {
    id: "note-003-001",
    negotiationId: "negotiation-003",
    spkId: "spk-003",
    author: mockActors.salesAyu,
    visibility: "MANAGER",
    content: "Selected vendor gives lowest price and includes annual support.",
    createdAt: "2026-06-13T07:45:00.000Z",
  },
];
