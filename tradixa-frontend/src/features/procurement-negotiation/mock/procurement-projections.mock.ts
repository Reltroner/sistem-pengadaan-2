import { mockActors } from "./actors.mock";
import type {
  ProcurementActivity,
  ProcurementAuditLog,
  ProcurementDashboardSummary,
  ProcurementNotification,
} from "../types";

export const mockProcurementActivities: ProcurementActivity[] = [
  {
    id: "activity-001",
    spkId: "spk-001",
    type: "SPK_CREATED",
    title: "SPK draft created",
    description: "SPK-2026-0001 created as draft.",
    actor: mockActors.salesAyu,
    createdAt: "2026-06-10T03:00:00.000Z",
  },
  {
    id: "activity-002",
    spkId: "spk-002",
    type: "SPK_SUBMITTED",
    title: "SPK submitted",
    description: "SPK-2026-0002 submitted to negotiation.",
    actor: mockActors.salesBima,
    createdAt: "2026-06-11T04:00:00.000Z",
  },
  {
    id: "activity-003",
    spkId: "spk-002",
    type: "VENDOR_SELECTED",
    title: "Vendor selected",
    description: "PT Artha Infrastruktur Data selected as recommended vendor.",
    actor: mockActors.salesBima,
    createdAt: "2026-06-12T05:30:00.000Z",
  },
  {
    id: "activity-004",
    spkId: "spk-003",
    type: "NEGOTIATION_SUBMITTED",
    title: "Negotiation submitted",
    description: "Negotiation result submitted to manager approval.",
    actor: mockActors.salesAyu,
    createdAt: "2026-06-13T08:00:00.000Z",
  },
  {
    id: "activity-005",
    spkId: "spk-002",
    type: "PO_DRAFT_CREATED",
    title: "PO draft preview created",
    description: "PO draft preview generated for selected vendor.",
    actor: mockActors.financeNadia,
    createdAt: "2026-06-12T06:00:00.000Z",
  },
];

export const mockProcurementAuditLogs: ProcurementAuditLog[] = [
  {
    id: "audit-001",
    spkId: "spk-002",
    entityType: "NEGOTIATION",
    entityId: "negotiation-002",
    action: "VENDOR_SELECTED",
    actor: mockActors.salesBima,
    createdAt: "2026-06-12T05:30:00.000Z",
  },
  {
    id: "audit-002",
    spkId: "spk-003",
    entityType: "NEGOTIATION",
    entityId: "negotiation-003",
    action: "NEGOTIATION_SUBMITTED",
    actor: mockActors.salesAyu,
    createdAt: "2026-06-13T08:00:00.000Z",
  },
];

export const mockProcurementNotifications: ProcurementNotification[] = [
  {
    id: "notification-001",
    spkId: "spk-003",
    recipientRole: "MANAGER",
    title: "Approval Required",
    message: "SPK-2026-0003 is waiting for manager approval.",
    status: "WAITING_MANAGER_APPROVAL",
    createdAt: "2026-06-13T08:00:00.000Z",
  },
];

export const mockProcurementDashboardSummary: ProcurementDashboardSummary = {
  totalSpk: 3,
  draftSpk: 1,
  submittedSpk: 2,
  inNegotiation: 1,
  waitingManagerApproval: 1,
  poDraftCreated: 1,
  highValueProcurement: 2,
  recentActivities: mockProcurementActivities,
};
