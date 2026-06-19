import type {
  IDRAmount,
  ISODateTimeString,
  ProcurementActorRef,
  ProcurementDocumentRef,
  ProcurementId,
} from "./procurement-common.types";
import type { ProcurementItem } from "./procurement-item.types";

export type PODraftStatus =
  | "DRAFT"
  | "READY_FOR_PO_VENDOR"
  | "HANDED_OFF"
  | "CANCELLED";

export type PODraft = {
  id: ProcurementId;
  poDraftNumber: string;
  spkId: ProcurementId;
  negotiationId: ProcurementId;
  selectedVendorId: ProcurementId;
  selectedVendorOfferId: ProcurementId;
  procurementItems: ProcurementItem[];
  subtotal: IDRAmount;
  discountAmount: IDRAmount;
  taxAmount: IDRAmount;
  grandTotal: IDRAmount;
  status: PODraftStatus;
  generatedBy: ProcurementActorRef;
  documents: ProcurementDocumentRef[];
  createdAt: ISODateTimeString;
  handedOffAt?: ISODateTimeString;
};

export type CreatePODraftPayload = {
  spkId: ProcurementId;
  negotiationId: ProcurementId;
  selectedVendorId: ProcurementId;
  selectedVendorOfferId: ProcurementId;
  generatedBy: ProcurementActorRef;
};
