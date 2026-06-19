import * as api from "./procurement-api.service";
import * as mock from "./procurement-dashboard.service";
import * as mockSpk from "./spk.service";
import * as mockVendors from "./vendor.service";
import * as mockNeg from "./negotiation.service";
import * as mockPo from "./po-draft.service";
import * as mockVendorOffers from "./vendor-offer.service";
import * as mockItems from "./procurement-item.service";
import * as mockPriceComp from "./price-comparison.service";
import { procurementMockRepository } from "./procurement-mock-repository.service";

export let isBackendAvailable: boolean | null = null;

// Call this from health badge
export const checkBackendHealth = async () => {
  const { apiClient } = await import("@/lib/api/client");
  const res = await apiClient<{status: string}>("/health");
  const isUp = !!res;
  isBackendAvailable = isUp;
  return isUp;
};

// Fallback wrapper
async function withFallback<T>(apiCall: () => Promise<T | null>, mockCall: () => T | Promise<T>): Promise<T> {
  try {
    const data = await apiCall();
    if (data !== null) {
      isBackendAvailable = true;
      return data;
    }
  } catch {
    console.warn("API Call Failed, using fallback");
  }
  isBackendAvailable = false;
  return await mockCall();
}

export const getProcurementOverviewData = () => 
  withFallback(api.getProcurementOverviewFromApi, mock.getProcurementDashboardSummary);

export const getProcurementActivitiesData = () => 
  withFallback(api.getProcurementActivitiesFromApi, () => mock.getRecentProcurementActivities(50));

const mockGetProcurementPipeline = () => {
  const spks = mockSpk.getSPKRecords();
  return [
    {
      stageId: "SPK_INPUT",
      title: "SPK Input",
      order: 1,
      items: spks.filter(s => s.workflow.stage === "SPK_INPUT")
    },
    {
      stageId: "NEGOTIATION",
      title: "Vendor Negotiation",
      order: 2,
      items: spks.filter(s => s.workflow.stage === "NEGOTIATION")
    },
    {
      stageId: "MANAGER_APPROVAL",
      title: "Manager Approval",
      order: 3,
      items: spks.filter(s => s.workflow.stage === "MANAGER_APPROVAL")
    },
    {
      stageId: "PO_VENDOR",
      title: "PO Drafting",
      order: 4,
      items: spks.filter(s => s.workflow.stage === "PO_VENDOR")
    }
  ];
};

export const getProcurementPipelineData = () => 
  withFallback(api.getProcurementPipelineFromApi, mockGetProcurementPipeline);

export const getSPKRecordsData = () => 
  withFallback(api.getSPKRecordsFromApi, mockSpk.getSPKRecords);

export const createSPKData = async (payload: any) => {
  try {
    const res = await api.createSPKFromApi(payload);
    if (res) return res;
  } catch (err) {
    console.error("API Create Failed", err);
  }
  // Mock fallback
  return {
    id: `spk-${Date.now()}`,
    spkNumber: `SPK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    title: payload.title,
    sourceType: payload.sourceType,
    customerName: payload.customerName,
    projectName: payload.projectName,
    requestedBy: payload.requestedBy,
    owner: { id: "usr-sales-01", name: "Ayu (Sales)", role: "SALES_REPRESENTATIVE" } as any,
    priority: payload.priority,
    status: "SPK_DRAFT" as any,
    workflow: { stage: "SPK_INPUT", status: "SPK_DRAFT", ownerRole: "SALES_REPRESENTATIVE", nextActionLabel: "Submit SPK" } as any,
    documents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const getSPKByIdData = (id: string) => 
  withFallback(() => api.getSPKByIdFromApi(id), () => {
    const res = mockSpk.getSPKById(id);
    return res || null;
  });

export const getProcurementItemsBySPKIdData = (id: string) => 
  withFallback(() => api.getProcurementItemsBySPKIdFromApi(id), () => mockItems.getProcurementItemsBySPKId(id));

export const getVendorOffersBySPKIdData = (id: string) => 
  withFallback(() => api.getVendorOffersBySPKIdFromApi(id), () => mockVendorOffers.getVendorOffersBySPKId(id));

export const getVendorsData = () => 
  withFallback(api.getVendorsFromApi, mockVendors.getVendors);

export const getVendorByIdData = (id: string) => 
  withFallback(() => api.getVendorByIdFromApi(id), () => {
    const res = mockVendors.getVendorById(id);
    return res || null;
  });

export const getNegotiationsData = () => 
  withFallback(api.getNegotiationsFromApi, () => procurementMockRepository.getDatabaseSnapshot().negotiationSessions);

export const getNegotiationByIdData = (id: string) => 
  withFallback(() => api.getNegotiationByIdFromApi(id), () => {
    const res = procurementMockRepository.getDatabaseSnapshot().negotiationSessions.find(n => n.id === id);
    return res || null;
  });

export const getNegotiationNotesData = (id: string) => 
  withFallback(() => api.getNegotiationNotesFromApi(id), () => mockNeg.getNegotiationNotesByNegotiationId(id));

export const getPriceComparisonData = (id: string) => 
  withFallback(() => api.getPriceComparisonFromApi(id), () => mockPriceComp.getPriceComparisonByNegotiationId(id));

export const getPODraftsData = () => 
  withFallback(api.getPODraftsFromApi, () => mockPo.getPODraftsByStatus("DRAFT"));
