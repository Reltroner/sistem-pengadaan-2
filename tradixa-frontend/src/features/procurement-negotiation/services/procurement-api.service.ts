import { apiClient } from "@/lib/api/client";
import type { 
  ProcurementDashboardSummary, 
  SPKRecord, 
  Vendor, 
  NegotiationSession, 
  NegotiationNote, 
  PODraft,
  ProcurementItem,
  VendorOffer,
  ProcurementActivity,
  PriceComparisonMatrix
} from "../types";

export const getProcurementOverviewFromApi = () => 
  apiClient<ProcurementDashboardSummary>("/procurement/overview");

export const getProcurementActivitiesFromApi = () => 
  apiClient<ProcurementActivity[]>("/procurement/activities");

type PipelineStage = {
  stageId: string;
  title: string;
  order: number;
  items: SPKRecord[];
};

export const getProcurementPipelineFromApi = () => 
  apiClient<PipelineStage[]>("/procurement/pipeline");

export const getSPKRecordsFromApi = () => 
  apiClient<SPKRecord[]>("/spk");

export const createSPKFromApi = (payload: any) => 
  apiClient<SPKRecord>("/spk", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getSPKByIdFromApi = (spkId: string) => 
  apiClient<SPKRecord>(`/spk/${spkId}`);

export const getProcurementItemsBySPKIdFromApi = (spkId: string) => 
  apiClient<ProcurementItem[]>(`/spk/${spkId}/items`);

export const getVendorOffersBySPKIdFromApi = (spkId: string) => 
  apiClient<VendorOffer[]>(`/spk/${spkId}/vendor-offers`);

export const getVendorsFromApi = () => 
  apiClient<Vendor[]>("/vendors");

export const getVendorByIdFromApi = (vendorId: string) => 
  apiClient<Vendor>(`/vendors/${vendorId}`);

export const getNegotiationsFromApi = () => 
  apiClient<NegotiationSession[]>("/negotiations");

export const getNegotiationByIdFromApi = (negotiationId: string) => 
  apiClient<NegotiationSession>(`/negotiations/${negotiationId}`);

export const getNegotiationNotesFromApi = (negotiationId: string) => 
  apiClient<NegotiationNote[]>(`/negotiations/${negotiationId}/notes`);

export const getPriceComparisonFromApi = (negotiationId: string) => 
  apiClient<PriceComparisonMatrix>(`/negotiations/${negotiationId}/comparison`);

export const getPODraftsFromApi = () => 
  apiClient<PODraft[]>("/purchase-orders/draft");
